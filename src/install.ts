import uiManager from 'fontoxml-modular-ui/src/uiManager';
import addTransform from 'fontoxml-operations/src/addTransform';

import addProtocol from './api/addProtocol';
import getSelectedText from './api/getSelectedText';
import isValidEmail from './api/isValidEmail';
import isValidMailtoUrl from './api/isValidMailtoUrl';
import isValidWebUrl from './api/isValidWebUrl';
import WebReferenceModal from './ui/WebReferenceModal';
import WebReferencePopover from './WebReferencePopover';

export default function install(): void {
	addTransform(
		'setWebReferenceOperationNameBasedOnSelection',
		function setWebReferenceOperationNameBasedOnSelection(stepData) {
			const potentialUrl = getSelectedText().trim();

			let targetUrl = null;
			if (isValidMailtoUrl(potentialUrl)) {
				// Mailto link with protocol and everything
				targetUrl = potentialUrl;
			} else if (isValidEmail(potentialUrl)) {
				// Valid email adress but no mailto protocol
				targetUrl = `mailto:${potentialUrl}`;
			} else if (
				isValidWebUrl(potentialUrl) &&
				potentialUrl === addProtocol(potentialUrl)
			) {
				// Valid URL with a protocol
				targetUrl = potentialUrl;
			} else {
				const intermediateUrl = addProtocol(potentialUrl);

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

	uiManager.registerReactComponent('WebReferenceModal', WebReferenceModal);
	uiManager.registerReactComponent(
		'WebReferencePopover',
		WebReferencePopover
	);
}
