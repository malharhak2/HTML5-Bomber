var assemblages = require ('../assemblages');
var entities = require('entity-system');

module.exports = function () {
	entities.registerAssemblages (assemblages);
};