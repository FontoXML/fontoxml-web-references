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

	var module = angular.module('fontoxml-references-web', [
			referencesUiModule
		]);

	module.controller('WebReferenceModalController', WebReferenceModalController);
	module.controller('WebReferencePopoverController', WebReferencePopoverController);

	// Register the template for web references
	references.referencePopoverContentService.setContentTemplateForReferenceType(
		'web',
		'fontoxml-references-web/ui/web-reference-popover-content-template.html');

	return module.name;
});
