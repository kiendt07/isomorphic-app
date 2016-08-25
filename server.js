// Requirements
let path = require('path')
let express = require('express')
let express_hbs = require ('express-handlebars')

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

// Bootstrap the app
let app = express();

// Set views directory
app.set('views', __dirname + '/src/server/views');

// Set handlebars as the template engine
app.engine('handlebars', express_hbs({
  defaultLayout: process.cwd() + '/src/server/views/layouts/main'
}));
app.set('view engine', 'handlebars');

// Disable etag header on response
app.disable('etag');

// Set the webpack compiler
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);

// Add webpack dev middleware to the app
app.use(webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));
// Add webpack hot middleware to the app
app.use(webpackHotMiddleware(compiler));

// Define routers
var foobarController = require('./src/server/controllers/foobar.controller');
app.get('/', foobarController.getFoo);

var isProduction = process.env.NODE_ENV === 'production';
// Server up
var port = isProduction ? process.env.PORT : 3000;
var hostname = 'localhost';
app.listen(port, hostname, err => {
  if (err) console.log(err);
  console.log('Server running at http://localhost:' + port);
})
