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
	.option('-bc, --burningcrusade', 'Use for Burning Crusade realms', false)
	.arguments('<region> <realm>')
	.action(async (region, realm) => {
		const options = program.opts();
		let spinner;

		if (!options.simple) {
			spinner = ora('Checking').start();
		}

		try {
			if (options.classic && options.burningcrusade) {
				throw new Error('You can only choose one game version');
			}

			let version = 'retail';
			if (options.classic) {
				version = 'classic';
			} else if (options.burningcrusade) {
				version = 'bc';
			}

			let data = await fetchRealm(region, realm, version);

			if (!data) {
				throw new Error('That realm doesn’t exist');
			}

			data = normalizeRealm(data);

			const fields = options.fields.split(',');
			if (options.fields && fields.length > 0) {
				data = filterFields(data, fields);
			}

			if (!options.simple) {
				spinner.stop();
			}

			if (options.json) {
				outputAsJson(data);
			} else {
				outputAsHuman(data);
			}
		} catch (error) {
			spinner.stop();
			if (options.json) {
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
