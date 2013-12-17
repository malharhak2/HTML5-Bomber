var network = require('./networkReceiver');
var entities = require('entity-system');
var InputState = require('../special/InputState');
var inputsContainer = require('../special/inputsContainer');

// This system uses a class because inputs are not treated by the entity system
var InputProcessor = function () {

};

InputProcessor.prototype.setup = function () {
	var self = this;
	network.subscribe('input', function (data, sender) {
		self.receiveInput (data, sender);
	}, "inputProcessor");

};

InputProcessor.prototype.receiveInput = function (data, sender) {
	var inputable = entities.findComponent ("inputable", {_entityId : sender});
	
	if (inputable) {
		inputsContainer.inputs[sender] = new InputState (data);
	}
};

module.exports = new InputProcessor();