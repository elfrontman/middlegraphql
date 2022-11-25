import * as express from 'express';
import * as cors from 'cors';

import { lastOfArray } from 'rxdb';
import { PubSub } from 'graphql-subscriptions';
import { graphQLSchemaFromRxSchema } from 'rxdb/plugins/replication-graphql';

import { graphqlHTTP } from 'express-graphql'
import { characterSchemaInput, continuitySchemaInput, daysSchemaInput, GRAPHQL_PATH } from './shared';
import { buildSchema } from 'graphql';
import { sortByUpdatedAtAndPrimary } from './utils';

import fetch from 'node-fetch';




const BASE_URL = 'https://pokeapi.co/api/v2/'

const {
    PORT = 5000,
} = process.env;

//let documents = [];
let characters = []
let continuities = []
let days = []

const app = express()
app.use(cors())


console.log(continuitySchemaInput)

function fetchResponseByURL(relativeURL) {
    return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
}

const fetchCharacters = async () => {
    
    const response = await fetchResponseByURL('pokemon?limit=100000000000&offset=0') //.then(json => json.people);
    const characters = response.results.map( (item, index) => (
        {
            id: `${index}`,
            cast_name: item.name,
            actor_name: '',
            picture: item.url,
            deleted: false,
            updatedAt: new Date().getTime()
        }
    ))
    return characters
}



const generatedSchemaContinuity = graphQLSchemaFromRxSchema(continuitySchemaInput)
const ghQlScContinuityInput = generatedSchemaContinuity.inputs
const ghQlScContinuityTypes = generatedSchemaContinuity.types
const graphQlSchemaContinuity = `${ghQlScContinuityInput}${ghQlScContinuityTypes}`

const generatedSchemaCharacters = graphQLSchemaFromRxSchema(characterSchemaInput)
const graphQlSchemaCharactersInput = generatedSchemaCharacters.inputs
const graphQlSchemaCharactersTypes = generatedSchemaCharacters.types
const graphQlSchemaCharacters = `${graphQlSchemaCharactersInput}${graphQlSchemaCharactersTypes}`

const generatedSchemaDays = graphQLSchemaFromRxSchema(daysSchemaInput)
const graphQlSchemaDaysInput = generatedSchemaDays.inputs
const graphQlSchemaDaysTypes = generatedSchemaDays.types
const graphQlSchemaDays = `${graphQlSchemaDaysInput}${graphQlSchemaDaysTypes}`

const graphQlSchemaDaysQueries = `
    type Query {
        pullContinuities(checkpoint: ContinuitiesInputCheckpoint, limit: Int!): ContinuitiesPullBulk!
        pullCharacters(checkpoint: CharactersInputCheckpoint, limit: Int!): CharactersPullBulk!
        pullDays(checkpoint: DaysInputCheckpoint, limit: Int!): DaysPullBulk!
    }
    type Mutation {
        pushContinuities(continuitiesPushRow: [ContinuitiesInputPushRow]): [Continuities!]!
        pushCharacters(charactersPushRow: [CharactersInputPushRow]): [Characters!]!
        pushDays(daysPushRow: [DaysInputPushRow]): [Days!]!
    }
      
    type Subscription {
        streamContinuities(headers: ContinuitiesInputHeaders): ContinuitiesPullBulk!
        streamCharacters(headers: CharactersInputHeaders): CharactersPullBulk!
        streamDays(headers: DaysInputHeaders): DaysPullBulk!
    }
`

const graphQlSchema = `${graphQlSchemaDaysQueries} ${graphQlSchemaContinuity} ${graphQlSchemaCharacters} ${graphQlSchemaDays}`

console.log('Server side GraphQL Schema:')
console.log(graphQlSchema)

const schema = buildSchema(graphQlSchema)

const pubsub = new PubSub();


const pull = async (args, request, _documents) => {
    console.log('## pullContinuities()');
    console.log(args);

    //Validate session
    //authenticateRequest(request);

    const lastId = args.checkpoint ? args.checkpoint.id : '';
    const minUpdatedAt = args.checkpoint
        ? args.checkpoint.updatedAt
        : 0;

    // sorted by updatedAt and primary
    const sortedDocuments = _documents.sort(sortByUpdatedAtAndPrimary);

    // only return where updatedAt >= minUpdatedAt
    const filterForMinUpdatedAtAndId = sortedDocuments.filter((doc) => {
        if (!args.checkpoint) {
            return true;
        }
        if (doc.updatedAt < minUpdatedAt) {
            return false;
        }
        if (doc.updatedAt > minUpdatedAt) {
            return true;
        }
        if (doc.updatedAt === minUpdatedAt) {
            if (doc.id > lastId) {
                return true;
            } else {
                return false;
            }
        }
    });

    // apply limit
    const limitedDocs = filterForMinUpdatedAtAndId.slice(0, args.limit);

    const last:any = lastOfArray(limitedDocs);
    const ret = {
        documents: limitedDocs,
        checkpoint: last
            ? {
                  id: last.id,
                  updatedAt: last.updatedAt,
              }
            : {
                  id: lastId,
                  updatedAt: minUpdatedAt,
              },
    };
    console.log('pullHero() ret:');
    console.log(JSON.stringify(ret, null, 4));
    return ret;
}

const push = (args, request, stream, row, documents) => {
    console.log('## pushContinuities()');
    console.log(args);
    //authenticateRequest(request);

    const rows = args[row];
    let lastCheckpoint = {
        id: '',
        updatedAt: 0,
    };

    const conflicts = [];

    const writtenDocs = [];
    rows.forEach((row) => {
        const docId = row.newDocumentState.id;
        const docCurrentMaster = documents.find((d) => d.id === docId);

        /**
         * Detect conflicts.
         */
        if (
            docCurrentMaster &&
            row.assumedMasterState &&
            docCurrentMaster.updatedAt !==
                row.assumedMasterState.updatedAt
        ) {
            conflicts.push(docCurrentMaster);
            return;
        }

        const doc = row.newDocumentState;
        documents = documents.filter((d) => d.id !== doc.id);
        documents.push(doc);

        console.log(documents)

        lastCheckpoint.id = doc.id;
        lastCheckpoint.updatedAt = doc.updatedAt;
        writtenDocs.push(doc);
    });

    pubsub.publish(stream, {
        [stream]: {
            documents: writtenDocs,
            checkpoint: lastCheckpoint,
        },
    });

    console.log('## current documents:');
    console.log(JSON.stringify(documents, null, 4));
    console.log('## conflicts:');
    console.log(JSON.stringify(conflicts, null, 4));

    return conflicts;
}

const stream = (args, stream) => {
    console.log(`## ${stream}()`);

    console.dir(args);
    const authHeaderValue = args.headers.Authorization;
    const bearerToken = authHeaderValue.split(' ')[1];

    //validateBearerToken(bearerToken);

    return pubsub.asyncIterator(stream);
}

// The root provides a resolver function for each API endpoint
const root = {
    pullContinuities: (args, request) => {
        return pull(args, request, continuities)
    },
    pushContinuities: (args, request) => {
        return push(args, request, 'streamContinuities', 'continuitiesPushRow', continuities)
    },
    streamContinuities: (args) => {
        return stream(args, 'streamContinuities')
    },
    pullCharacters: (args, request) => {
        return pull(args, request, characters)
    },
    pushCharacters: (args, request) => {
        return push(args, request, 'streamCharacters', 'charactersPushRow', characters)
    },
    streamCharacters: (args) => {
        return stream(args, 'streamCharacters')
    },
    pullDays: (args, request) => {
        return pull(args, request, days)
    },
    pushDays: (args, request) => {
        return push(args, request, 'streamDays', 'daysPushRow', days)
    },
    streamDays: (args) => {
        return stream(args, 'streamDays')
    },
};

fetchCharacters().then( data => {
   characters = data

    app.use(
        GRAPHQL_PATH,
            graphqlHTTP({
                schema: schema,
                rootValue: root,
                graphiql: true
            })
        )
    
    app.listen(PORT, () => {
        console.log(`Started graphql-endpoint at at http://localhost:${PORT}${GRAPHQL_PATH}`)
    })

})

