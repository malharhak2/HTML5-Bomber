var mongoose = require ('mongoose');
var schema = new mongoose.Schema ({
	mass : Number
});

module.exports = {
	name : "body",
	description : "The physics properties of an entity",
	schema : schema
};