var playerSystem = require('./playerSystem');

var NetworkReceiver = function () {
	this.subscribed = {};
};
NetworkReceiver.prototype.setup = function (io) {
	this.io = io;
	io.set('log level', 1);
	var that = this;
	io.sockets.on('connection', function (socket) {
		var info = playerSystem.newPlayer(socket.id);
		socket.emit('connected', info);
		
		for (var i in that.subscribed) {
			socket.on(i, function () {
				that.subscribed[i].apply (socket, arguments);
			});
		};
	});
};

NetworkReceiver.prototype.subscribe = function (evt, callback, label) {
	this.subscribed[evt] = callback
	console.log(label + " subscribed to " + evt);

	for (var i in this.io.sockets.sockets) {
		var s = this.io.sockets.sockets[i];
		s.on(evt, function ()  {
			callback.apply (s, arguments);
		});
	};
};

NetworkReceiver.prototype.emit = function (event, data) {
	this.io.sockets.emit(event, data);
};
NetworkReceiver.prototype.emitTo = function (id, event, data) {
	if (this.io.sockets.sockets[id]) {
		this.io.sockets.sockets[id].emit(event, data);
	}
};
module.exports = new NetworkReceiver();