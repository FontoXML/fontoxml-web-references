define([
	'fontoxml-modular-ui/uiManager',
	'fontoxml-operations/addTransform',

	'./api/addProtocol',
	'./api/getSelectedText',
	'./api/isValidEmail',
	'./api/isValidMailtoUrl',
	'./api/isValidWebUrl',
	'./ui/WebReferenceModalController',
	'./ui/createUiWebReferencePopoverDirective'
], function (
	uiManager,
	addTransform,

	addProtocol,
	getSelectedText,
	isValidEmail,
	isValidMailtoUrl,
	isValidWebUrl,
	WebReferenceModalController,
	createUiWebReferencePopoverDirective
) {
	'use strict';

	return function install () {
		addTransform(
			'setWebReferenceOperationNameBasedOnSelection',
			function setWebReferenceOperationNameBasedOnSelection (stepData) {
				var potentialUrl = getSelectedText().trim();

				var targetUrl = null;
				if (isValidMailtoUrl(potentialUrl)) {
					// Mailto link with protocol and everything
					targetUrl = potentialUrl;
				}
				else if (isValidEmail(potentialUrl)) {
					// Valid email adress but no mailto protocol
					targetUrl = 'mailto:' + potentialUrl;
				}
				else if (isValidWebUrl(potentialUrl) && potentialUrl === addProtocol(potentialUrl)) {
					// Valid URL with a protocol
					targetUrl = potentialUrl;
				}
				else {
					var intermediateUrl = addProtocol(potentialUrl);

					if (isValidWebUrl(intermediateUrl) && potentialUrl.match(/\.[a-z]{2,}|\:[0-9]{2,}/g)) {
						targetUrl = intermediateUrl;
					}
				}

				if (targetUrl) {
					// The selection contained a valid URL, skip the modal
					stepData.targetSpec = { url: targetUrl };
					stepData.operationName = 'do-nothing';
					return stepData;
				}

				stepData.operationName = 'open-reference-web-insert-modal';

				return stepData;
			});

		uiManager.addController('WebReferenceModalController', WebReferenceModalController);
		uiManager.addDirective('uiWebReferencePopover', createUiWebReferencePopoverDirective);
	};
});
