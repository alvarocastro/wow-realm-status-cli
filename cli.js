#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const ora = require('ora');
const {fetchRealm} = require('wow-realm-status');
const placeholdify = require('placeholdify');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const normalizeRealm = function (data) {
	return {
		name: data.name,
		locale: data.locale,
		timezone: data.timezone,
		status: data.online ? 'online' : 'offline',
		type: data.type,
		population: data.population
	};
};

const filterFields = function (data, fields = []) {
	return fields.reduce((out, field) => {
		out[field] = data[field];
		return out;
	}, {});
};

const outputAsJson = function (data) {
	console.log(JSON.stringify(data));
};

const outputAsHuman = function (data) {
	const labels = {
		name: 'Name: {0}',
		status: 'Status: {0}',
		population: 'Population: {0}',
		type: 'Type: {0}',
		locale: 'Locale: {0}',
		timezone: 'Timezone: {0}'
	};

	for (const key of Object.keys(labels)) {
		if (data[key] === undefined) {
			continue;
		}

		console.log(placeholdify(labels[key], data[key]));
	}
};

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
			console.log(`DIE INSECT! ${error.message}`);
		}
	});

program.parse(process.argv);

if (process.argv.length <= 2) {
	program.help();
}
