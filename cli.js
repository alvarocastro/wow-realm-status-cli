#!/usr/bin/env node

const program = require('commander');
const ora = require('ora');
const {fetchRealm} = require('wow-realm-status');
const {version} = require('./package.json');
const {
	normalizeRealm,
	filterFields,
	outputAsJson,
	outputAsHuman
} = require('.');

program
	.version(version, '-v, --version', 'Output the current version')
	.option('-j, --json', 'Format output as JSON', false)
	.option('-s, --simple', 'Hide spinner', false)
	.option('-f, --fields <name,…>', 'Filter fields', '')
	.option('-c, --classic', 'Use for classic realms', false)
	.arguments('<region> <realm>')
	.action(async (region, realm) => {
		let spinner;

		if (!program.simple) {
			spinner = ora('Checking').start();
		}

		try {
			let data = await fetchRealm(region, realm, program.classic);

			if (!data) {
				throw new Error('That realm doesn’t exist');
			}

			data = normalizeRealm(data);

			const fields = program.fields.split(',');
			if (program.fields && fields.length > 0) {
				data = filterFields(data, fields);
			}

			if (!program.simple) {
				spinner.stop();
			}

			if (program.json) {
				outputAsJson(data);
			} else {
				outputAsHuman(data);
			}
		} catch (error) {
			spinner.stop();
			if (program.json) {
				console.error(JSON.stringify({error: error.message}));
			} else {
				console.error(`DIE INSECT! ${error.message}!`);
			}
		}
	});

program.parse(process.argv);

if (process.argv.length <= 2) {
	program.help();
}
