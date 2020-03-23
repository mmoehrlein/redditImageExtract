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
const a = require('axios');
const sub = process.argv[2];
let after;
let count = 0;

download();

async function download() {
	console.log('Getting images from ' + sub);
	await fs.promises.mkdir('images/' + sub, {recursive: true});
	const url = `https://reddit.com/r/${sub}.json?limit=100&count=${count}${after ? '&after=' + after : ''}`;
	let data = (await a.get(url)).data.data;
	after = data.after;
	console.log(after);
	count += data.dist;
	console.log(count);
	let children = data.children;
	children.map(value => {
		const permasplit = value.data.permalink.split('/');
		const uid = permasplit[4];
		const user_title = permasplit[5];
		return {title: user_title + '_' + uid , url: value.data.url}
	}).filter(
		value => value.url.includes('.jpg')
	).forEach(
		async value => {

			try {
				console.log('Downloading ' + value.title);
				let resp = (await a.get(value.url, {responseType: 'stream'})).data;
				resp.pipe(fs.createWriteStream('images/' + sub + '/' + encodeURIComponent(value.title) + '.jpg'));
			} catch (e) {
				console.error(`Error ${e.code} for ${value.title} with message: ${e.message}`);
			}
		}
	);
	if (count < 200 && after) {
		setTimeout(download, 5000)
	}
}

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
