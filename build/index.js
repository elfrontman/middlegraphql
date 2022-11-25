/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nexports.__esModule = true;\r\nvar express = __webpack_require__(/*! express */ \"express\");\r\nvar cors = __webpack_require__(/*! cors */ \"cors\");\r\nvar rxdb_1 = __webpack_require__(/*! rxdb */ \"rxdb\");\r\nvar graphql_subscriptions_1 = __webpack_require__(/*! graphql-subscriptions */ \"graphql-subscriptions\");\r\nvar replication_graphql_1 = __webpack_require__(/*! rxdb/plugins/replication-graphql */ \"rxdb/plugins/replication-graphql\");\r\nvar express_graphql_1 = __webpack_require__(/*! express-graphql */ \"express-graphql\");\r\nvar shared_1 = __webpack_require__(/*! ./shared */ \"./src/shared.ts\");\r\nvar graphql_1 = __webpack_require__(/*! graphql */ \"graphql\");\r\nvar utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\r\nvar node_fetch_1 = __webpack_require__(/*! node-fetch */ \"node-fetch\");\r\nvar BASE_URL = 'https://pokeapi.co/api/v2/';\r\nvar _a = process.env.PORT, PORT = _a === void 0 ? 5000 : _a;\r\n//let documents = [];\r\nvar characters = [];\r\nvar continuities = [];\r\nvar days = [];\r\nvar app = express();\r\napp.use(cors());\r\nconsole.log(shared_1.continuitySchemaInput);\r\nfunction fetchResponseByURL(relativeURL) {\r\n    return (0, node_fetch_1[\"default\"])(\"\".concat(BASE_URL).concat(relativeURL)).then(function (res) { return res.json(); });\r\n}\r\nvar fetchCharacters = function () { return __awaiter(void 0, void 0, void 0, function () {\r\n    var response, characters;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0: return [4 /*yield*/, fetchResponseByURL('pokemon?limit=100000000000&offset=0')]; //.then(json => json.people);\r\n            case 1:\r\n                response = _a.sent() //.then(json => json.people);\r\n                ;\r\n                characters = response.results.map(function (item, index) { return ({\r\n                    id: \"\".concat(index),\r\n                    cast_name: item.name,\r\n                    actor_name: '',\r\n                    picture: item.url,\r\n                    deleted: false,\r\n                    updatedAt: new Date().getTime()\r\n                }); });\r\n                return [2 /*return*/, characters];\r\n        }\r\n    });\r\n}); };\r\nvar generatedSchemaContinuity = (0, replication_graphql_1.graphQLSchemaFromRxSchema)(shared_1.continuitySchemaInput);\r\nvar ghQlScContinuityInput = generatedSchemaContinuity.inputs;\r\nvar ghQlScContinuityTypes = generatedSchemaContinuity.types;\r\nvar graphQlSchemaContinuity = \"\".concat(ghQlScContinuityInput).concat(ghQlScContinuityTypes);\r\nvar generatedSchemaCharacters = (0, replication_graphql_1.graphQLSchemaFromRxSchema)(shared_1.characterSchemaInput);\r\nvar graphQlSchemaCharactersInput = generatedSchemaCharacters.inputs;\r\nvar graphQlSchemaCharactersTypes = generatedSchemaCharacters.types;\r\nvar graphQlSchemaCharacters = \"\".concat(graphQlSchemaCharactersInput).concat(graphQlSchemaCharactersTypes);\r\nvar generatedSchemaDays = (0, replication_graphql_1.graphQLSchemaFromRxSchema)(shared_1.daysSchemaInput);\r\nvar graphQlSchemaDaysInput = generatedSchemaDays.inputs;\r\nvar graphQlSchemaDaysTypes = generatedSchemaDays.types;\r\nvar graphQlSchemaDays = \"\".concat(graphQlSchemaDaysInput).concat(graphQlSchemaDaysTypes);\r\nvar graphQlSchemaDaysQueries = \"\\n    type Query {\\n        pullContinuities(checkpoint: ContinuitiesInputCheckpoint, limit: Int!): ContinuitiesPullBulk!\\n        pullCharacters(checkpoint: CharactersInputCheckpoint, limit: Int!): CharactersPullBulk!\\n        pullDays(checkpoint: DaysInputCheckpoint, limit: Int!): DaysPullBulk!\\n    }\\n    type Mutation {\\n        pushContinuities(continuitiesPushRow: [ContinuitiesInputPushRow]): [Continuities!]!\\n        pushCharacters(charactersPushRow: [CharactersInputPushRow]): [Characters!]!\\n        pushDays(daysPushRow: [DaysInputPushRow]): [Days!]!\\n    }\\n      \\n    type Subscription {\\n        streamContinuities(headers: ContinuitiesInputHeaders): ContinuitiesPullBulk!\\n        streamCharacters(headers: CharactersInputHeaders): CharactersPullBulk!\\n        streamDays(headers: DaysInputHeaders): DaysPullBulk!\\n    }\\n\";\r\nvar graphQlSchema = \"\".concat(graphQlSchemaDaysQueries, \" \").concat(graphQlSchemaContinuity, \" \").concat(graphQlSchemaCharacters, \" \").concat(graphQlSchemaDays);\r\nconsole.log('Server side GraphQL Schema:');\r\nconsole.log(graphQlSchema);\r\nvar schema = (0, graphql_1.buildSchema)(graphQlSchema);\r\nvar pubsub = new graphql_subscriptions_1.PubSub();\r\nvar pull = function (args, request, _documents) { return __awaiter(void 0, void 0, void 0, function () {\r\n    var lastId, minUpdatedAt, sortedDocuments, filterForMinUpdatedAtAndId, limitedDocs, last, ret;\r\n    return __generator(this, function (_a) {\r\n        console.log('## pullContinuities()');\r\n        console.log(args);\r\n        lastId = args.checkpoint ? args.checkpoint.id : '';\r\n        minUpdatedAt = args.checkpoint\r\n            ? args.checkpoint.updatedAt\r\n            : 0;\r\n        sortedDocuments = _documents.sort(utils_1.sortByUpdatedAtAndPrimary);\r\n        filterForMinUpdatedAtAndId = sortedDocuments.filter(function (doc) {\r\n            if (!args.checkpoint) {\r\n                return true;\r\n            }\r\n            if (doc.updatedAt < minUpdatedAt) {\r\n                return false;\r\n            }\r\n            if (doc.updatedAt > minUpdatedAt) {\r\n                return true;\r\n            }\r\n            if (doc.updatedAt === minUpdatedAt) {\r\n                if (doc.id > lastId) {\r\n                    return true;\r\n                }\r\n                else {\r\n                    return false;\r\n                }\r\n            }\r\n        });\r\n        limitedDocs = filterForMinUpdatedAtAndId.slice(0, args.limit);\r\n        last = (0, rxdb_1.lastOfArray)(limitedDocs);\r\n        ret = {\r\n            documents: limitedDocs,\r\n            checkpoint: last\r\n                ? {\r\n                    id: last.id,\r\n                    updatedAt: last.updatedAt\r\n                }\r\n                : {\r\n                    id: lastId,\r\n                    updatedAt: minUpdatedAt\r\n                }\r\n        };\r\n        console.log('pullHero() ret:');\r\n        console.log(JSON.stringify(ret, null, 4));\r\n        return [2 /*return*/, ret];\r\n    });\r\n}); };\r\nvar push = function (args, request, stream, row, documents) {\r\n    var _a;\r\n    console.log('## pushContinuities()');\r\n    console.log(args);\r\n    //authenticateRequest(request);\r\n    var rows = args[row];\r\n    var lastCheckpoint = {\r\n        id: '',\r\n        updatedAt: 0\r\n    };\r\n    var conflicts = [];\r\n    var writtenDocs = [];\r\n    rows.forEach(function (row) {\r\n        var docId = row.newDocumentState.id;\r\n        var docCurrentMaster = documents.find(function (d) { return d.id === docId; });\r\n        /**\r\n         * Detect conflicts.\r\n         */\r\n        if (docCurrentMaster &&\r\n            row.assumedMasterState &&\r\n            docCurrentMaster.updatedAt !==\r\n                row.assumedMasterState.updatedAt) {\r\n            conflicts.push(docCurrentMaster);\r\n            return;\r\n        }\r\n        var doc = row.newDocumentState;\r\n        documents = documents.filter(function (d) { return d.id !== doc.id; });\r\n        documents.push(doc);\r\n        console.log(documents);\r\n        lastCheckpoint.id = doc.id;\r\n        lastCheckpoint.updatedAt = doc.updatedAt;\r\n        writtenDocs.push(doc);\r\n    });\r\n    pubsub.publish(stream, (_a = {},\r\n        _a[stream] = {\r\n            documents: writtenDocs,\r\n            checkpoint: lastCheckpoint\r\n        },\r\n        _a));\r\n    console.log('## current documents:');\r\n    console.log(JSON.stringify(documents, null, 4));\r\n    console.log('## conflicts:');\r\n    console.log(JSON.stringify(conflicts, null, 4));\r\n    return conflicts;\r\n};\r\nvar stream = function (args, stream) {\r\n    console.log(\"## \".concat(stream, \"()\"));\r\n    console.dir(args);\r\n    var authHeaderValue = args.headers.Authorization;\r\n    var bearerToken = authHeaderValue.split(' ')[1];\r\n    //validateBearerToken(bearerToken);\r\n    return pubsub.asyncIterator(stream);\r\n};\r\n// The root provides a resolver function for each API endpoint\r\nvar root = {\r\n    pullContinuities: function (args, request) {\r\n        return pull(args, request, continuities);\r\n    },\r\n    pushContinuities: function (args, request) {\r\n        return push(args, request, 'streamContinuities', 'continuitiesPushRow', continuities);\r\n    },\r\n    streamContinuities: function (args) {\r\n        return stream(args, 'streamContinuities');\r\n    },\r\n    pullCharacters: function (args, request) {\r\n        return pull(args, request, characters);\r\n    },\r\n    pushCharacters: function (args, request) {\r\n        return push(args, request, 'streamCharacters', 'charactersPushRow', characters);\r\n    },\r\n    streamCharacters: function (args) {\r\n        return stream(args, 'streamCharacters');\r\n    },\r\n    pullDays: function (args, request) {\r\n        return pull(args, request, days);\r\n    },\r\n    pushDays: function (args, request) {\r\n        return push(args, request, 'streamDays', 'daysPushRow', days);\r\n    },\r\n    streamDays: function (args) {\r\n        return stream(args, 'streamDays');\r\n    }\r\n};\r\nfetchCharacters().then(function (data) {\r\n    characters = data;\r\n    app.use(shared_1.GRAPHQL_PATH, (0, express_graphql_1.graphqlHTTP)({\r\n        schema: schema,\r\n        rootValue: root,\r\n        graphiql: true\r\n    }));\r\n    app.listen(PORT, function () {\r\n        console.log(\"Started graphql-endpoint at at http://localhost:\".concat(PORT).concat(shared_1.GRAPHQL_PATH));\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://middlegraphql/./src/index.ts?");

/***/ }),

/***/ "./src/shared.ts":
/*!***********************!*\
  !*** ./src/shared.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nexports.__esModule = true;\r\nexports.continuitySchemaInput = exports.daysSchemaInput = exports.characterSchemaInput = exports.continuitySchema = exports.daySchema = exports.characterSchema = exports.GRAPHQL_PATH = void 0;\r\nexports.GRAPHQL_PATH = '/graphql';\r\n/** Schemes RxDB */\r\nexports.characterSchema = {\r\n    version: 0,\r\n    primaryKey: 'id',\r\n    type: 'object',\r\n    properties: {\r\n        id: {\r\n            type: 'string',\r\n            maxLength: 500\r\n        },\r\n        cast_name: {\r\n            type: 'string',\r\n            maxLength: 500\r\n        },\r\n        actor_name: {\r\n            type: 'string'\r\n        },\r\n        picture: {\r\n            type: 'string'\r\n        },\r\n        updatedAt: {\r\n            type: 'number',\r\n            minimum: 0,\r\n            maximum: 10000000000000000,\r\n            multipleOf: 1\r\n        }\r\n    },\r\n    indexes: ['cast_name', 'updatedAt'],\r\n    required: ['id', 'name', 'updatedAt']\r\n};\r\nexports.daySchema = {\r\n    version: 0,\r\n    primaryKey: 'id',\r\n    type: 'object',\r\n    properties: {\r\n        id: {\r\n            type: 'string',\r\n            maxLength: 100\r\n        },\r\n        scenes_participation: {\r\n            type: 'integer'\r\n        },\r\n        scenes_produced: {\r\n            type: 'integer'\r\n        },\r\n        total_images_continuity: {\r\n            type: 'integer'\r\n        },\r\n        status_continuity: {\r\n            type: 'string',\r\n            maxLength: 100\r\n        },\r\n        picture: {\r\n            type: 'string'\r\n        },\r\n        characters: {\r\n            type: 'array',\r\n            uniqueItems: true,\r\n            items: {\r\n                type: 'string'\r\n            }\r\n        },\r\n        updatedAt: {\r\n            type: 'number',\r\n            minimum: 0,\r\n            maximum: 10000000000000000,\r\n            multipleOf: 1\r\n        }\r\n    },\r\n    indexes: ['status_continuity', 'updatedAt'],\r\n    required: ['id', 'status_continuity', 'updatedAt']\r\n};\r\nexports.continuitySchema = {\r\n    version: 0,\r\n    primaryKey: 'id',\r\n    type: 'object',\r\n    properties: {\r\n        id: {\r\n            type: 'string',\r\n            maxLength: 10000000\r\n        },\r\n        day_story: {\r\n            type: 'string',\r\n            maxLength: 1000\r\n        },\r\n        character: {\r\n            type: 'string',\r\n            maxLength: 1000\r\n        },\r\n        picture: {\r\n            type: 'string'\r\n        },\r\n        updatedAt: {\r\n            type: 'number',\r\n            minimum: 0,\r\n            maximum: 10000000000000000,\r\n            multipleOf: 1\r\n        }\r\n    },\r\n    indexes: ['day_story', 'character', 'updatedAt'],\r\n    required: ['id', 'name', 'updatedAt']\r\n};\r\n/** Inputs for create GraphQL Schemes */\r\nexports.characterSchemaInput = {\r\n    characters: {\r\n        schema: exports.characterSchema,\r\n        checkpointFields: [\r\n            'id',\r\n            'updatedAt'\r\n        ],\r\n        deletedField: 'deleted',\r\n        headerFields: ['Authorization']\r\n    }\r\n};\r\nexports.daysSchemaInput = {\r\n    days: {\r\n        schema: exports.daySchema,\r\n        checkpointFields: [\r\n            'id',\r\n            'updatedAt'\r\n        ],\r\n        deletedField: 'deleted',\r\n        headerFields: ['Authorization']\r\n    }\r\n};\r\nexports.continuitySchemaInput = {\r\n    continuities: {\r\n        schema: exports.continuitySchema,\r\n        checkpointFields: [\r\n            'id',\r\n            'updatedAt'\r\n        ],\r\n        deletedField: 'deleted',\r\n        headerFields: ['Authorization']\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://middlegraphql/./src/shared.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nexports.__esModule = true;\r\nexports.sortByUpdatedAtAndPrimary = void 0;\r\nfunction sortByUpdatedAtAndPrimary(a, b) {\r\n    if (a.updatedAt > b.updatedAt)\r\n        return 1;\r\n    if (a.updatedAt < b.updatedAt)\r\n        return -1;\r\n    if (a.updatedAt === b.updatedAt) {\r\n        if (a.id > b.id)\r\n            return 1;\r\n        if (a.id < b.id)\r\n            return -1;\r\n        else\r\n            return 0;\r\n    }\r\n}\r\nexports.sortByUpdatedAtAndPrimary = sortByUpdatedAtAndPrimary;\r\n\n\n//# sourceURL=webpack://middlegraphql/./src/utils.ts?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-graphql":
/*!**********************************!*\
  !*** external "express-graphql" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("express-graphql");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("graphql");

/***/ }),

/***/ "graphql-subscriptions":
/*!****************************************!*\
  !*** external "graphql-subscriptions" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("graphql-subscriptions");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("node-fetch");

/***/ }),

/***/ "rxdb":
/*!***********************!*\
  !*** external "rxdb" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxdb");

/***/ }),

/***/ "rxdb/plugins/replication-graphql":
/*!***************************************************!*\
  !*** external "rxdb/plugins/replication-graphql" ***!
  \***************************************************/
/***/ ((module) => {

module.exports = require("rxdb/plugins/replication-graphql");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;