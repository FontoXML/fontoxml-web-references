import { PopoverBody, Text, TextLink } from 'fds/components';
import React, { Component } from 'react';

import FxReferencePopover from 'fontoxml-fx/src/FxReferencePopover';
import t from 'fontoxml-localization/src/t';
import type { OperationName } from 'fontoxml-operations/src/types';
import type { XPathQuery } from 'fontoxml-selectors/src/types';

function handleOpenPreview({ target }) {
	window.open(target);
}

type Props = {
	/**
	 * @fontosdk
	 */
	data: {
		/**
		 * @remarks
		 * A property that comes from the popover method self, contains the node ID of the
		 * node that is configured. Does not need to be added in the popoverData.
		 *
		 * @fontosdk
		 */
		contextNodeId: string;
		/**
		 * @remarks
		 * The operation for removing the reference. Is by default {@link
		 * reference-delete}.
		 *
		 * @fontosdk
		 */
		deleteOperationName?: OperationName;
		/**
		 * @remarks
		 * Only when an editOperationName is used, a edit button is made. The edit
		 * operation should provide a way to edit the reference.
		 *
		 * @fontosdk
		 */
		editOperationName?: OperationName;
		/**
		 * @fontosdk
		 */
		isReadOnly?: boolean;
		/**
		 * @remarks
		 * Determines wether the reference contains
		 *
		 * @fontosdk
		 */
		targetIsPermanentId?: boolean;
		/**
		 * @remarks
		 * Determines the reference content with a xpath query, starting from the context
		 * node. Often this is just an attribute, for example `@href`.
		 *
		 * @fontosdk
		 */
		targetQuery: XPathQuery;
	};
};

/**
 * @remarks
 * A popover used for web references.
 *
 * Is registered under the name `WebReferencePopover`.
 *
 * Use the popover in the family configuration by adding
 * `visualization.popoverComponentName` and `visualization.popoverData`.
 *
 * An example on how to use `WebReferencePopover` in the family configuration:
 *
 * ```javascript
 * configureAsInlineLink(sxModule, 'self::xref[@format="html"]', 'hyperlink', {
 * 	emptyElementPlaceholderText: 'type the link text',
 * 	popoverComponentName: 'WebReferencePopover',
 * 	popoverData: {
 * 		editOperationName: 'dita-web-reference-edit',
 * 		targetQuery: '@href'
 * 	},
 * 	referenceQuery: '@href'
 * });
 * ```
 *
 * @fontosdk
 */
class WebReferencePopover extends Component<Props> {
	renderReference = ({ openPreview, reference }) => {
		return (
			<PopoverBody>
				<Text colorName="text-muted-color">{t('Hyperlink to:')}</Text>
				<TextLink label={reference.target} onClick={openPreview} />
			</PopoverBody>
		);
	};

	render() {
		return (
			<FxReferencePopover
				{...this.props}
				renderReference={this.renderReference}
				openPreview={handleOpenPreview}
			/>
		);
	}
}

export default WebReferencePopover;

/**
 * @remarks
 * The popoverData that should be provided in the family configuration.
 *
 * @fontosdk
 */
