import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
	Button,
	Form,
	FormRow,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextInput
} from 'fds/components';
import { hasFormFeedback } from 'fds/system';
import t from 'fontoxml-localization/t';

import addProtocol from '../api/addProtocol';
import isValidUrl from '../api/isValidUrl';

function validateUrl(value) {
	if (value && isValidUrl(addProtocol(value))) {
		return null;
	}

	return { message: t('Please enter a valid URL in order to proceed.'), connotation: 'warning' };
}

export default class WebReferenceModal extends Component {
	static propTypes = {
		cancelModal: PropTypes.func.isRequired,
		data: PropTypes.shape({
			modalPrimaryButtonLabel: PropTypes.string,
			modalTitle: PropTypes.string,
			url: PropTypes.string
		}),
		submitModal: PropTypes.func.isRequired
	};

	state = {
		feedbackByName: {
			url: null
		},
		valueByName: {
			url: this.props.data.url || ''
		}
	};

	handleSubmitButtonClick = () =>
		this.props.submitModal({ url: addProtocol(this.state.valueByName.url) });

	handleKeyDown = event => {
		switch (event.key) {
			case 'Escape':
				this.props.cancelModal();
				break;
			case 'Enter':
				if (!hasFormFeedback(this.state.feedbackByName)) {
					this.handleSubmitButtonClick();
				}
				break;
		}
	};

	handleFormChange = ({ feedbackByName, valueByName }) =>
		this.setState({ feedbackByName, valueByName });

	render() {
		const { cancelModal, data: { modalPrimaryButtonLabel, modalTitle } } = this.props;
		const { feedbackByName, valueByName } = this.state;

		return (
			<Modal size="m" onKeyDown={this.handleKeyDown}>
				<ModalHeader title={modalTitle || t('Edit hyperlink')} icon="globe" />

				<ModalBody>
					<Form
						feedbackByName={feedbackByName}
						labelPosition="before"
						onChange={this.handleFormChange}
						valueByName={valueByName}
					>
						<FormRow label={t('Web address')}>
							<TextInput name="url" validate={validateUrl} />
						</FormRow>
					</Form>
				</ModalBody>

				<ModalFooter>
					<Button label={t('Cancel')} onClick={cancelModal} />

					<Button
						isDisabled={hasFormFeedback(feedbackByName)}
						label={modalPrimaryButtonLabel || t('Save')}
						onClick={this.handleSubmitButtonClick}
						type="primary"
					/>
				</ModalFooter>
			</Modal>
		);
	}
}
