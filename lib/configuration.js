const nconf = require('nconf');

/* eslint import/no-unresolved: [2, { ignore: ['dotenv.*'] }] */
function init() {
	if ((process.env.ENVIRONMENT || process.env.NODE_ENV || '').toLowerCase().trim() !== 'production') {
		let dotenv;
		try {
			dotenv = require('dotenv-safe');
		} catch (error) {
			try {
				dotenv = require('dotenv');
			} catch (error) {
				dotenv = false;
			}
		}

		if (dotenv) {
			try {
				const dotenvexpand = require('dotenv-expand');
				dotenvexpand(dotenv.config());
			} catch (error) {
				dotenv.config();
			}
		}
	}

	nconf.argv()
		.env();
}

module.exports.init = init;
