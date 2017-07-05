define([
	'fontoxml-modular-ui/uiManager',
	'fontoxml-operations/addTransform',

	'./api/addProtocol',
	'./api/getSelectedText',
	'./api/isValidEmail',
	'./api/isValidMailtoUrl',
	'./api/isValidWebUrl',
	'./ui/WebReferenceModal.jsx',
	'./ui/WebReferencePopover.jsx'
], function (
	uiManager,
	addTransform,

	addProtocol,
	getSelectedText,
	isValidEmail,
	isValidMailtoUrl,
	isValidWebUrl,
	WebReferenceModal,
	WebReferencePopover
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

					if (isValidWebUrl(intermediateUrl) && potentialUrl.match(/\.[a-z]{2,}|:[0-9]{2,}/g)) {
						targetUrl = intermediateUrl;
					}
				}

				if (targetUrl) {
					// The selection contained a valid URL, skip the modal
					stepData.url = targetUrl;
					stepData.operationName = 'do-nothing';
					return stepData;
				}

				stepData.operationName = '_open-web-reference-modal-for-insert';

				return stepData;
			});

		uiManager.registerReactComponent('WebReferenceModal', WebReferenceModal.default || WebReferenceModal);
		uiManager.registerReactComponent('WebReferencePopover', WebReferencePopover.default || WebReferencePopover);
	};
});
