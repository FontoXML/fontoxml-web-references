import uiManager from 'fontoxml-modular-ui/src/uiManager.js';
import addTransform from 'fontoxml-operations/src/addTransform.js';
import addProtocol from './api/addProtocol.js';
import getSelectedText from './api/getSelectedText.js';
import isValidEmail from './api/isValidEmail.js';
import isValidMailtoUrl from './api/isValidMailtoUrl.js';
import isValidWebUrl from './api/isValidWebUrl.js';
import WebReferenceModal from './ui/WebReferenceModal.jsx';
import WebReferencePopover from './ui/WebReferencePopover.jsx';

export default function install() {
	addTransform(
		'setWebReferenceOperationNameBasedOnSelection',
		function setWebReferenceOperationNameBasedOnSelection(stepData) {
			var potentialUrl = getSelectedText().trim();

			var targetUrl = null;
			if (isValidMailtoUrl(potentialUrl)) {
				// Mailto link with protocol and everything
				targetUrl = potentialUrl;
			} else if (isValidEmail(potentialUrl)) {
				// Valid email adress but no mailto protocol
				targetUrl = 'mailto:' + potentialUrl;
			} else if (isValidWebUrl(potentialUrl) && potentialUrl === addProtocol(potentialUrl)) {
				// Valid URL with a protocol
				targetUrl = potentialUrl;
			} else {
				var intermediateUrl = addProtocol(potentialUrl);

				if (
					isValidWebUrl(intermediateUrl) &&
					potentialUrl.match(/\.[a-z]{2,}|:[0-9]{2,}/g)
				) {
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
		}
	);

	uiManager.registerReactComponent('WebReferenceModal', WebReferenceModal || WebReferenceModal);
	uiManager.registerReactComponent(
		'WebReferencePopover',
		WebReferencePopover || WebReferencePopover
	);
}
