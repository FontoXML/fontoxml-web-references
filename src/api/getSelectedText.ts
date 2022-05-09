import blueprintQuery from 'fontoxml-blueprints/src/blueprintQuery';
import readOnlyBlueprint from 'fontoxml-blueprints/src/readOnlyBlueprint';
import domInfo from 'fontoxml-dom-utils/src/domInfo';
import domRangeQuery from 'fontoxml-dom-utils/src/domRangeQuery';
import selectionManager from 'fontoxml-selection/src/selectionManager';

// TODO: move this to the public API some day, see also domQuery.getTextContent
export default function getSelectedText(): $TSFixMeAny {
	if (!selectionManager.hasSelection()) {
		return '';
	}
	const startContainer = selectionManager.getStartContainer();
	const endContainer = selectionManager.getEndContainer();
	const startOffset = selectionManager.getStartOffset();
	const endOffset = selectionManager.getEndOffset();

	if (startContainer === endContainer && domInfo.isTextNode(startContainer)) {
		return startContainer.data.substring(startOffset, endOffset);
	}

	const range = blueprintQuery
		.getDocumentNode(readOnlyBlueprint, startContainer)
		.createRange();
	range.setStart(startContainer, startOffset);
	range.setEnd(endContainer, endOffset);

	const textInRange = domRangeQuery
		.findNodesContainedInRange(range, domInfo.isTextNode)
		.map(function (textNode) {
			return textNode.data;
		});
	range.detach();

	if (domInfo.isTextNode(startContainer)) {
		textInRange.unshift(startContainer.data.substring(startOffset));
	}

	if (domInfo.isTextNode(endContainer)) {
		textInRange.push(endContainer.data.substring(0, endOffset));
	}

	return textInRange.join('');
}
