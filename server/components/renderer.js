var mongoose = require('mongoose');
var schema = new mongoose.Schema ({
	color : String
});

module.exports = {
	name : "renderer",
	description : "A renderer",
	schema : schema
};