var entities = require('entity-system');
var inputs = require ('../special/inputsContainer');
var config = require('../config');
var _ = require ('underscore');
var PhysicsSystem = function () {
		
};
PhysicsSystem.prototype.setup = function () {
	var that = this;
	setInterval (function () {
		that.update();
	}, 30);
};
PhysicsSystem.prototype.computeNextPosition = function (position, body) {
	if (body.mass && position.y > -100) {
		position.dy -= config.worldProperties.gravity * body.mass;
	}
	position.x += position.dx;
	position.y += position.dy;
	position.z += position.dz;
	return position;
}
PhysicsSystem.prototype.update = function () {
	var bodies = entities.getComponentsData ("body");
	for (var i in bodies) {
		var body = bodies[i];
		var position = entities.getOtherComponent("position", body);
		var np = this.computeNextPosition (_.clone(position), body);
		var b = config.worldProperties.boundaries;
		console.log(position)
		if (np.x > b.right || np.x < b.left || np.y > b.up || np.y < b.down || np.z > b.far || np.z < b.near) {
			continue;
		} else {
			entities.setComponentData ("position", np);
		}
	};
};

module.exports = new PhysicsSystem();