"use strict";
/**
 * Module dependencies.
 */

var express = require('express')
  , path = require('path')
  , routes = require(path.join(__dirname, 'routes'))
  , db = require(path.join(__dirname, 'db'))
  , http = require('http')
  , app = express();

// all environments
app.set('port', process.env.PORT || 2323);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(
  path.join(__dirname, 'public', 'img', 'favicon.ico')
));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//some routes for get requests:
app.get('/', routes.get.share);
app.get('/share', routes.get.share);
app.get('/links', routes.get.links);
app.get('/links/:sort', routes.get.links);
app.get('/:category/links', routes.get.links);

//plus some post requests:
app.post('/share', routes.post.share);
app.post('/category/add', routes.post.category.add);

//starting the actual server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
