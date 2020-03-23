const {format, loggers, transports} = require('winston');

let label = '';

function init() {
	const myform = format.printf(info => {
		return `${info.timestamp}${info.label ? ' [' + info.label + ']' : info.label} ${info.level}: ${info.message}`;
	});

	const processInfo = format(info => {
		if (info.label) {
			label = info.label;
		} else {
			info.label = label;
		}

		return info;
	})();
	const environment = process.env.ENVIRONMENT || process.env.NODE_ENV || '';

	loggers.add('standard', {
		level: environment.toLowerCase().trim() === 'production' ? 'info' : 'debug',
		format: format.combine(
			format.timestamp({format: 'YYYY-MM-DDTHH:mm:ssZZ:'}),
			processInfo,
			myform
		),
		transports: [
			new transports.Console()
		]
	});
}

module.exports.init = init;
