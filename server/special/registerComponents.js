var components = [
	"position",
	"user",
	"renderer",
	"inputable",
	"body"
];
var entities = require('entity-system');

module.exports = function () {
	for (var i = 0; i < components.length; i++) {
		var comp = require('../components/' + components[i]);
		entities.registerComponent (comp);
	};
};
