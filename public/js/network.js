define (["debug", "io"], function (Debug, io) {
	var debug = new Debug('network');
	var Network = function () {
	};

	Network.prototype.setup = function (callback) {
		debug.log("Setup");
		var self = this;
		this.socket = io.connect("http://" + location.host);
		this.socket.on('connected', function (info) {
			self.id = info.id;
			debug.log("Connected as ", info.nickname);
			callback();
		});
	};

	Network.prototype.subscribe = function (evt, callback)  {
		debug.log("subscribed event ", evt);
		this.socket.on(evt, function (data) {
			callback (data);
		});
	};

	Network.prototype.emit = function (evt, data) {
		this.socket.emit (evt, data, this.id);
	};

	return new Network();
});