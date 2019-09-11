#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const ora = require('ora');
const {fetchRealm} = require('wow-realm-status');
const {
	normalizeRealm,
	filterFields,
	outputAsJson,
	outputAsHuman
} = require('.');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

program
	.version(pkg.version, '-v, --version', 'Output the current version')
	.option('-j, --json', 'Format output as JSON', false)
	.option('-s, --simple', 'Hide spinner', false)
	.option('-f, --fields <name,...>', 'Filter fields', '')
	.option('-c, --classic', 'Use for classic realms', false)
	.arguments('<region> <realm>')
	.action(async (region, realm) => {
		let spinner;

		if (!program.simple) {
			spinner = ora('Checking').start();
		}

		try {
			let data = await fetchRealm(region, realm, program.classic);
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
			console.error(`DIE INSECT! ${error.message}!`);
		}
	});

program.parse(process.argv);

if (process.argv.length <= 2) {
	program.help();
}
