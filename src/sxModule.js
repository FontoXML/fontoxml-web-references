define([
	'fontoxml-modular-schema-experience',

	'text!./sx/operations.json'
], function (
	modularSchemaExperience,
	operationsJSON
) {
	'use strict';

	var module = modularSchemaExperience.configurator.module('fontoxml-references-web');

	module.register('operations')
		.addOperations(JSON.parse(operationsJSON));

	return module.getModuleName();
});
