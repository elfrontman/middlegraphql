const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext  = require('webpack-shell-plugin-next');

const {
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  watch: NODE_ENV === 'development',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ['npm run run:dev']
      }
    })
  ]
}