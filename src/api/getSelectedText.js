define([
	'fontoxml-dom-utils/domInfo',
	'fontoxml-dom-utils/domRangeQuery',
	'fontoxml-dom-utils/domQuery',
	'fontoxml-selection/selectionManager'
], function (
	domInfo,
	domRangeQuery,
	domQuery,
	selectionManager
) {
	'use strict';

	// TODO: move this to the public API some day, see also domQuery.getTextContent
	return function getSelectedText () {
		var startContainer = selectionManager.getStartContainer();
		var endContainer = selectionManager.getEndContainer();
		var startOffset = selectionManager.getStartOffset();
		var endOffset = selectionManager.getEndOffset();

		if (startContainer === endContainer && domInfo.isTextNode(startContainer)) {
			return startContainer.data.substring(startOffset, endOffset);
		}

		var range = domQuery.getDocumentNode(startContainer).createRange();
		range.setStart(startContainer, startOffset);
		range.setEnd(endContainer, endOffset);

		var textInRange = domRangeQuery.findNodesContainedInRange(range, domInfo.isTextNode)
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
	};
});
