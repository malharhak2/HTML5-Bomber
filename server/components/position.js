var mongoose = require('mongoose');
var schema = new mongoose.Schema ({
	x : {type : Number, default : 0},
	y : {type : Number, default : 0},
	z : {type : Number, default : 0},

	dx : {type : Number, default : 0},
	dy : {type : Number, default : 0},
	dz : {type : Number, default : 0}
});

module.exports = {
	name : "position",
	description : "A world position",
	schema : schema
};