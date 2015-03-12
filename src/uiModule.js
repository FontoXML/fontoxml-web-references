define([
	'angular',

	'fontoxml-references',
	'fontoxml-references/uiModule',

	'fontoxml-ui-buttons/uiModule',
	'fontoxml-ui-modal/uiModule',
	'fontoxml-ui-regions/uiModule',
	'fontoxml-ui-tooltips/uiModule',

	'./ui/WebReferenceModalController',
	'./ui/createUiWebReferencePopoverDirective'
], function (
	angular,

	references,
	referencesUiModule,

	uiButtonsUiModule,
	uiModalUiModule,
	uiRegionsUiModule,
	uiTooltipsUiModule,

	WebReferenceModalController,
	createUiWebReferencePopoverDirective
) {
	'use strict';

	var module = angular.module('fontoxml-references-web', [
			referencesUiModule,

			uiButtonsUiModule,
			uiModalUiModule,
			uiRegionsUiModule,
			uiTooltipsUiModule
		]);

	module.controller('WebReferenceModalController', WebReferenceModalController);
	module.directive('uiWebReferencePopover', createUiWebReferencePopoverDirective);

	return module.name;
});

