var entities = require('entity-system');
var _ = require ('underscore');
var inputsContainer = require ('../special/inputsContainer');
var PlayerSystem = function () {
	
};

PlayerSystem.prototype.setup = function () {
	var self = this;
	setInterval ( function () {
		self.update ();
	}, 15);
};

PlayerSystem.prototype.generateColor = function () {
	return '0x'+Math.floor(Math.random()*16777215).toString(16);
};

PlayerSystem.prototype.newPlayer = function (socketId) {
	var nickname = "Player " + _.random(1000, 9999);
	var color = this.generateColor();
	var x = _.random (-10, 10);
	var y = 20;
	var z = _.random (-30, 10);
	var dx = 0;
	var dy = 0;
	var dz = 0;
	var player = entities.createAssemblage ("player", [
		{x : x, y : y, z : z,
		dx : dx, dy : dy, dz: dz}, // position
		{nickname : nickname, updateRate : (1000 / 20), lastUpdate : Date.now(), socketId : socketId}, // user
		{color : color}, // renderer
		{socketId : socketId}, // inputable
		{mass : 0.01} // physicsproperty

	], nickname);
	console.log("New player " + nickname + ":" + player._id);
	return {nickname : nickname, id : player._id};
};

PlayerSystem.prototype.update = function () {
	var players = entities.getEntitiesWith ("user");
	var playerComponents = entities.getComponentsForEntities (players, ["position"]);
	for (var i = 0; i < players.length; i++) {
		var position = playerComponents[i].position;
		var inputs = inputsContainer.inputs[players[i]._id];
		if (inputs) {
			if (inputs.mouse.buttons.left) {
				position.dy += 0.1;
			} else if (position.dy > 0.1) {
				position.dy -= 0.1;
			}
		}
		entities.setComponentData ("position", position);
	}

};

module.exports = new PlayerSystem();