import React, { Component } from 'react';
import t from 'fontoxml-localization/t';
import {
	Button,
	Form,
	FormRow,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextInput
} from 'fontoxml-vendor-fds/components';
import addProtocol from '../api/addProtocol';
import isValidUrl from '../api/isValidUrl';

function validateUrl (value) {
	if (value && isValidUrl(addProtocol(value))) {
		return null;
	}

	return { message: t('Please enter a valid URL in order to proceed.'), connotation: 'warning' };
}

export default class WebReferenceModal extends Component {
	state = {
		url: this.props.data.url || ''
	};

	handleTextInputChange = url => this.setState({ url });

	handleSubmitButtonClick = () => {
		const { submitModal } = this.props;
		const { url } = this.state;

		submitModal({ url: addProtocol(url) });
	}

	render () {
		const {
			cancelModal,
			data: {
				modalPrimaryButtonLabel,
				modalTitle
			}
		} = this.props;
		const { url } = this.state;

		return (
			<Modal size="m">
				<ModalHeader title={modalTitle || t('Edit hyperlink')} icon="globe" />
				<ModalBody>
					<Form labelPosition="before">
						<FormRow label={t('Web address')}>
							<TextInput
								name="url"
								onChange={this.handleTextInputChange}
								validate={validateUrl}
								value={url}
							/>
						</FormRow>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button
						label={t('Cancel')}
						onClick={cancelModal}
					/>
					<Button
						label={modalPrimaryButtonLabel || t('Save')}
						type="primary"
						onClick={this.handleSubmitButtonClick}
					/>
				</ModalFooter>
			</Modal>
		);
	}
}
