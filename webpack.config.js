import webpack from 'webpack'
import path from 'path'

let nodeModulesPath = path.resolve(__dirname, 'node_modules');
let buildPath = path.resolve(__dirname, 'public', 'build');
let clientEntryPath = path.resolve(__dirname, 'src/client', 'app.js');

module.exports = {
  devtool: 'eval',
  entry: [
    // Application
    clientEntryPath,

    // For hot style updates
    'webpack/hot/dev-server',

    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
    // We need to give Webpack a path. It does not actually need it,
    // because files are kept in memory in webpack-dev-server, but an
    // error will occur if nothing is specified. We use the buildPath
    // as that points to where the files will eventually be bundled
    // in production
    path: buildPath,
    filename: 'bundle.js',

    // Everything related to Webpack should go through a build path,
    // localhost:3000/build. That makes proxying easier to handle
    publicPath: '/build'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: nodeModulesPath
        //include: [__dirname + 'src/shared']
      }
    ]
  },

  // We have to manually add the Hot Replacement plugin when running
  // from Node
  plugin: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    hot: true
  }
}
