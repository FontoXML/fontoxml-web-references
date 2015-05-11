define([
	'fontoxml-modular-ui/uiManager',
	'fontoxml-operations/operationsManager',

	'./ui/WebReferenceModalController',
	'./ui/createUiWebReferencePopoverDirective',

	'text!./sx/operations.json'
], function (
	uiManager,
	operationsManager,

	WebReferenceModalController,
	createUiWebReferencePopoverDirective,

	operationsJson
	) {
	'use strict';

	return function install () {
		uiManager.addController('WebReferenceModalController', WebReferenceModalController);
		uiManager.addDirective('uiWebReferencePopover', createUiWebReferencePopoverDirective);

		operationsManager.addOperations(JSON.parse(operationsJson));
	};
});