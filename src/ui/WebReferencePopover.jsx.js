import React, { Component } from 'react';
import FxReferencePopover from 'fontoxml-fx/FxReferencePopover.jsx';
import t from 'fontoxml-localization/t';
import {
	PopoverBody,
	Text,
	TextLink
} from 'fontoxml-vendor-fds/components';

function handleOpenPreview ({ target }) {
	window.open(target);
}

class WebReferencePopover extends Component {
	renderReference = ({ openPreview, reference }) => {
		return (
			<PopoverBody>
				<Text>{t('Hyperlink to:')}</Text>
				<TextLink
					label={reference.target}
					onClick={openPreview}
				/>
			</PopoverBody>
		);
	};

	render () {
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
