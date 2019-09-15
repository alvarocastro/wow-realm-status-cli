# wow-realm-status-cli
[![NPM](https://img.shields.io/npm/v/wow-realm-status-cli.svg)](https://www.npmjs.com/package/wow-realm-status-cli) [![Build Status](https://travis-ci.com/alvarocastro/wow-realm-status-cli.svg?branch=master)](https://travis-ci.com/alvarocastro/wow-realm-status-cli) [![codebeat badge](https://codebeat.co/badges/2b41ed85-8f63-43bc-85f8-035b4751b8f9)](https://codebeat.co/projects/github-com-alvarocastro-wow-realm-status-cli-master) [![dependencies Status](https://david-dm.org/alvarocastro/wow-realm-status-cli/status.svg)](https://david-dm.org/alvarocastro/wow-realm-status-cli) [![devDependencies Status](https://david-dm.org/alvarocastro/wow-realm-status-cli/dev-status.svg)](https://david-dm.org/alvarocastro/wow-realm-status-cli?type=dev) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

---

Simple console utility to check the status and info of World of Warcraft realms.

- [Install](#install)
- [Usage](#usage)
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

## Related

* [wow-realm-status](https://github.com/alvarocastro/wow-realm-status) - Node.js library used to retrieve the realm status.
