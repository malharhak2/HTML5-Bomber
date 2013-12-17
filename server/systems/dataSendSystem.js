var entities = require('entity-system');
var network = require('./networkReceiver');
var DataSendSystem = function () {
	
};
DataSendSystem.prototype.setup = function () {
	var that = this;
	setInterval (function () {
		that.sendData();
	}, 15);
};
DataSendSystem.prototype.sendData = function () {
	var comps = {};
	var entitiesList = entities.entities;
	for (var i in entitiesList) {
		comps[i] = entities.getComponentsForEntity (entitiesList[i], ["position", "renderer"])
	}
	//network.emit("gametick", comps);
	//console.log(network.io.sockets.sockets);
	var users = entities.getComponentsData ("user");
	var d = Date.now();
	for (var i in users) {
		if (d - users[i].lastUpdate >= users[i].updateRate) {
			network.emitTo(users[i].socketId, 'gametick', comps);
			users[i].lastUpdate = d;
			entities.setComponentData("user", users[i]);
		}
	}
};

module.exports = new DataSendSystem ();