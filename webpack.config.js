const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'worker.js',
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'cheap-module-source-map',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        include: path.resolve(__dirname, 'node_modules/@textile'),
        test: /\.js$/,
        loader: 'string-replace-loader',
        options: {
          // replacement from https://github.com/protocolbuffers/protobuf/pull/8864/files
          search: /Function\("return this"\)\(\)/,
          replace: '(function() { return this || window || global || self || Function(\'return this\')(); }).call(null)',
          flags: 'g',
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          // transpileOnly is useful to skip typescript checks occasionally:
          // transpileOnly: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      window: undefined
    })
  ]
}
