var express = require('express');
var entities = require('entity-system');
var _ = require('underscore');
var path = require('path');
var routes = require('./routes');
var gameServer = require('./server/game');
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);

var	server = require('http').createServer(app).listen(app.get('port'), function () {
	var io = require('socket.io').listen(server);
	console.log('Express server listening on port ' + app.get('port'));
	gameServer.setup(io);
});