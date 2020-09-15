# wow-realm-status-cli
[![NPM](https://img.shields.io/npm/v/wow-realm-status-cli.svg)](https://www.npmjs.com/package/wow-realm-status-cli)
[![Build Status](https://travis-ci.com/alvarocastro/wow-realm-status-cli.svg?branch=master)](https://travis-ci.com/alvarocastro/wow-realm-status-cli)
[![Maintainability](https://api.codeclimate.com/v1/badges/62a11c0186fd767f6f7f/maintainability)](https://codeclimate.com/github/alvarocastro/wow-realm-status-cli/maintainability)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

Simple console utility to check the status and info of World of Warcraft realms.

- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [Support](#support)
- [Related](#related)

## Install

```bash
npm install -g wow-realm-status-cli
```

## Usage

```bash
$ wow-realm-status us ragnaros
Name: Ragnaros
Status: online
Population: full
Type: normal
Locale: es-MX
Timezone: CDT
```

### wow-realm-status [options] \<region\> \<realm\>

#### region

The region of the realm you want to fetch.<br>
Possible values are: `us`, `eu`, `kr`, `tw`

#### realm

The name of the realm.

#### Options

##### -c, --classic

Used to specify if it is a classic realm, to prevent name clashing.

```bash
$ wow-realm-status us kirtonos -c
Name: Kirtonos
Status: online
Population: medium
Type: pvp
Locale: en-US
Timezone: EDT
```

##### -f, --filter <field, ...>

Used to filter the output fields.<br>
Possible values: `name`, `status`, `population`, `type`, `locale`, `timezone`

```bash
$ wow-realm-status us ragnaros -f name,status,population
Name: Ragnaros
Status: online
Population: full
```

##### -s, --simple

Used to simplify the output and hide the loading spinner.

##### -j, --json

Used to format the output as JSON

```bash
$ wow-realm-status us ragnaros -j
{"name":"Ragnaros","locale":"es-MX","timezone":"CDT","status":"online","type":"normal","population":"full"}
```

##### -v, --version

Displays the current installed version of this utility.

##### -h, --help

Displays the help.

## Contributing

Contributions are always welcome! Please run `npm test` before hand to ensure everything is ok.

## Support

If you use this package please consider starring it :)

## Related

* [wow-realm-status](https://github.com/alvarocastro/wow-realm-status) - Node.js library used to retrieve the realm status.
