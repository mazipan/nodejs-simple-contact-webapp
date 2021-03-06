/**
 * Created by irfan.maulana on 08/16/2016.
 */
'use strict';

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

var express = require('express');
var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

var config = require('./api/config'); // get our config file
app.set('superSecret', config.secret) // secret variable

// include index
var routes = require('./api/controllers/index');
app.use('/', routes);
// include api product file
var contacts = require('./api/controllers/contacts-api');
app.use('/api/contacts', contacts);
// include api auth file
var authenticate = require('./api/controllers/auth');
app.use('/api/authenticate', authenticate);

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};


SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  
  // Add swagger-ui (This must be before swaggerExpress.register)
  app.use(SwaggerUi(swaggerExpress.runner.swagger));
  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  // if (swaggerExpress.runner.swagger.paths['/hello']) {
  //   console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  // }
});
