const placeholdify = require('placeholdify');

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
	const out = {};

	for (const field of fields) {
		out[field] = data[field];
	}

	return out;
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

module.exports = {
	normalizeRealm,
	filterFields,
	outputAsJson,
	outputAsHuman
};
