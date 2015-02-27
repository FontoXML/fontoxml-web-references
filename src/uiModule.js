define([
	'angular',

	'fontoxml-references',
	'fontoxml-references/uiModule',

	'./ui/WebReferenceModalController',
	'./ui/createUiWebReferencePopoverDirective'
], function (
	angular,

	references,
	referencesUiModule,

	WebReferenceModalController,
	createUiWebReferencePopoverDirective
) {
	'use strict';

	var module = angular.module(
			'fontoxml-references-web',
			[
				referencesUiModule
			]);

	module.controller('WebReferenceModalController', WebReferenceModalController);

	module.directive('uiWebReferencePopover', createUiWebReferencePopoverDirective);

	return module.name;
});
