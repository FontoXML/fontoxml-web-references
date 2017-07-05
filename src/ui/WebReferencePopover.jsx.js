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
	renderTarget = ({ openPreview, target }) => {
		return (
			<PopoverBody>
				<Text>{t('Hyperlink to:')}</Text>
				<TextLink
					label={target}
					onClick={openPreview}
				/>
			</PopoverBody>
		);
	};

	render () {
		return (
			<FxReferencePopover
				{...this.props}
				renderTarget={this.renderTarget}
				openPreview={handleOpenPreview}
			/>
		);
	}
}

export default WebReferencePopover;
