define([
	'fontoxml-modular-ui/uiManager',

	'./ui/WebReferenceModalController',
	'./ui/createUiWebReferencePopoverDirective'
], function (
	uiManager,

	WebReferenceModalController,
	createUiWebReferencePopoverDirective
	) {
	'use strict';

	return function install () {
		uiManager.addController('WebReferenceModalController', WebReferenceModalController);
		uiManager.addDirective('uiWebReferencePopover', createUiWebReferencePopoverDirective);
	};
});
