import { PopoverBody, Text, TextLink } from 'fds/components';
import React, { Component } from 'react';

import FxReferencePopover from 'fontoxml-fx/src/FxReferencePopover';
import t from 'fontoxml-localization/src/t';

function handleOpenPreview({ target }) {
	window.open(target);
}

type Props = {
	/**
	 * @type {WebReferencePopover~data}
	 */
	data: {
		contextNodeId: string;
		deleteOperationName?: string;
		editOperationName?: string;
		isReadOnly?: boolean;
		targetIsPermanentId?: boolean;
		targetQuery: string;
	};
};

/**
 * A popover used for web references.
 *
 * Is registered under the name `WebReferencePopover`.
 *
 * Use the popover in the family configuration by adding `visualization.popoverComponentName` and
 * `visualization.popoverData`.
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
 * @react
 * @category add-on/fontoxml-web-references
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
 * The popoverData that should be provided in the family configuration.
 *
 * @typedef   {Object}  data
 * @memberof  WebReferencePopover
 * @inner
 *
 * @property  {NodeId}     contextNodeId               A property that comes from the popover method
 *   self, contains the node ID of the node that is configured. Does not need to be added in the popoverData.
 * @property  {string}     [deleteOperationName='reference-delete'] The operation for removing the
 *   reference. Is by default {@link reference-delete}.
 * @property  {boolean}    [editOperationName]         Only when an editOperationName is used, a edit
 *   button is made. The edit operation should provide a way to edit the reference.
 * @property  {XPathQuery} targetQuery                 Determines the reference content with a xpath
 *   query, starting from the context node. Often this is just an attribute, for example `@href`.
 * @property  {boolean}    [targetIsPermanentId=false] Determines wether the reference contains
 *   permanentId's.
 *
 * @fontosdk  members
 */
