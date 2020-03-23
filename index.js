#!/bin/node
/**
 * Initialize logger and config
 */
require('./lib').initAll();

/**
 * Get configured logger and config
 *
 * @type {winston.Logger} logger
 * @type {Object} conf
 */
const logger = require('winston').loggers.get('standard');
const conf = require('nconf');

/**
 * Default config can be added
 */
conf.defaults({
	max: 100,
	timeout: 5000,
	dest: 'images'
});

const fs = require('fs');
const axios = require('axios');
const prompts = require('prompts');
const path = require('path');

let after, sub;
let count = 0;

(async function main() {
	let dist, children;

	// take param or get subreddit interactively
	if (!sub) {
		if (conf.get('sub')) {
			sub = conf.get('sub')
		} else {
			sub = (await prompts({
				type: 'text',
				name: 'value',
				message: 'Please enter a subreddit: '
			})).value;
		}
	}

	// make sure destination exists
	await fs.promises.mkdir(path.join(conf.get('dest'), sub), {recursive: true});

	logger.info('Getting posts from ' + sub);
	const url = `https://reddit.com/r/${sub}.json?limit=100&count=${count}${after ? '&after=' + after : ''}`;

	({after, dist, children} = (await axios.get(url)).data.data);

	logger.debug(after);
	count += dist;
	logger.debug(count);

	children.map(value => {
			const [, , , , uid, user_title] = value.data.permalink.split('/');
			return {
				title: user_title + '_' + uid,
				url: value.data.url
			}
		})
		.filter(value => value.url.includes('.jpg'))
		.forEach(async value => {
				try {
					let resp = (await axios.get(value.url, {responseType: 'stream'})).data;
					resp.pipe(fs.createWriteStream('images/' + sub + '/' + encodeURIComponent(value.title) + '.jpg'));
				} catch (e) {
					logger.error(`Error ${e.errorCode} for ${value.title} with message: ${e.message}`);
				}
			}
		);
	if (count < conf.get('max') && after) {
		setTimeout(main, conf.get('timeout'))
	}
})();
