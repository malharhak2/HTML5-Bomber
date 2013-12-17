var mongoose = require('mongoose');
var schema = new mongoose.Schema ({
	socketId : String
});

module.exports = {
	name : "inputable",
	description : "Makes an entity inputable",
	schema : schema
};