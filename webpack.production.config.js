let path = require('path')

let nodeModulesPath = path.resolve(__dirname, 'node_modules');
let buildPath = path.resolve(__dirname, 'public', 'build');
let clientEntryPath = path.resolve(__dirname, 'src/client', 'app.js');

module.exports = {
  devtool: 'source-map',
  entry: [
    // Application
    clientEntryPath
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: nodeModulesPath
      }
    ]
  }
}
