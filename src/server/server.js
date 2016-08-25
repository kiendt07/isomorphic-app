import path from 'path'
import base from '../../base'
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();
let express = require('express')
let express_hbs = require ('express-handlebars')
let mongoose = require('mongoose')
let db = require('./configs/auth')
let fooController = require ('./controllers/foobar.controller')

let app = express();

// Check if it is production or development
let isProduction = process.env.NODE_ENV === 'production';
let port = isProduction ? process.env.PORT : 3000;
let publicPath = path.resolve(base.path, 'public');

// Set views directory
app.set('views', process.cwd() + '/src/server/views');

// Set handlebars as the template engine
app.engine('handlebars', express_hbs({
  defaultLayout: process.cwd() + '/src/server/views/layouts/main'
}));
app.set('view engine', 'handlebars');

// Disable etag header on response
app.disable('etag');

// Connect to mongodb
mongoose.connect('mongodb://localhost/' + db.uri);

// Create Exress router

app.get('/foo', fooController.getFoo);

// Set static content directory
app.use(express.static(publicPath));

if (!isProduction) {
  // Is development
  let bundle = require('./bundler');
  bundle();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });
}

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function () {
  console.log('Server running on port ' + port);
});
