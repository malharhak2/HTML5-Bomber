var mongoose = require('mongoose');
var schema = new mongoose.Schema ({
	ip : String,
	nickname : String,
	updateRate : {type : Number, default : 20},
	lastUpdate : {type : Number, default : Date.now()},
	socketId : String
});

module.exports = {
	name : "user",
	description : "A user informations",
	schema : schema
};