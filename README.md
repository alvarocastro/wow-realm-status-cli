# wow-realm-status-cli

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
