var networkReceiver = require('./systems/networkReceiver');
var entities = require('entity-system');
var registerComponents = require('./special/registerComponents');
var registerAssemblages = require('./special/registerAssemblages');

var dataSendSystem = require('./systems/dataSendSystem');
var physicsSystem = require('./systems/physicsSystem');
var inputProcessor = require('./systems/inputProcessor');
var playerSystem = require ('./systems/playerSystem');

var db = require('./config').db;

function setup (io) {
	entities.createConnection (db).then (function (done) {
		registerComponents();
		registerAssemblages();
		console.log("Entity System is set up");
		networkReceiver.setup(io);
		console.log("Network is set up");
		dataSendSystem.setup();
		console.log("Data sender is up");
		physicsSystem.setup();
		console.log("Physics system is set up");
		inputProcessor.setup();
		console.log("allo");
		console.log("Input processor system is set up");
		playerSystem.setup();
		console.log("player system is set up");
	}, function (err) {
		console.error ("Could not connect ", err);
	});
};

module.exports = {
	setup : setup
};