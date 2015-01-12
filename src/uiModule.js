define([
	'angular',

	'fontoxml-references',
	'fontoxml-references/uiModule',

	'./ui/WebReferenceModalController',
	'./ui/WebReferencePopoverController'
], function (
	angular,

	references,
	referencesUiModule,

	WebReferenceModalController,
	WebReferencePopoverController
	) {
	'use strict';

	// Register the template for web references
	references.referencesPopoverSectionService.setTemplate('web', 'fontoxml-references-web/ui/reference-type-web-template.html');

	var module = angular.module('fontoxml-references-web', [
			referencesUiModule
		]);

	module.controller('WebReferenceModalController', WebReferenceModalController);
	module.controller('WebReferencePopoverController', WebReferencePopoverController);

	return module.name;
});
