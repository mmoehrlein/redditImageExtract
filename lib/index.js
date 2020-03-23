const logger = require('./logger');
const configuration = require('./configuration');

function initAll() {
	logger.init();
	configuration.init();
}

module.exports = {
	initAll,
	logger,
	configuration
};
