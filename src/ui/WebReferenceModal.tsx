import * as React from 'react';

import {
	Block,
	Button,
	Flex,
	Form,
	FormRow,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextInput,
	TextLink,
} from 'fontoxml-design-system/src/components';
import type { ModalProps } from 'fontoxml-fx/src/types';
import t from 'fontoxml-localization/src/t';

import addProtocol from '../api/addProtocol';
import isValidUrl from '../api/isValidUrl';

function validateUrl(value: string) {
	if (!value || isValidUrl(addProtocol(value))) {
		return null;
	}

	return {
		message: t(
			'Looks like that URL may not work. Maybe try to visit it, just to be sure?'
		),
		connotation: 'warning',
	};
}

// To align the TextLink with the TextInput, uses the same padding as defined in TextInput.
const textLinkContainerStyles = { padding: '.1875rem 0' };

export default class WebReferenceModal extends React.Component<
	ModalProps<{
		modalIcon?: string;
		modalPrimaryButtonLabel?: string;
		modalTitle?: string;
		url?: string;
	}>
> {
	private textInputRef: HTMLElement | null = null;

	public override state = {
		feedbackByName: {
			url: null,
		},
		valueByName: {
			url: this.props.data.url || '',
		},
	};

	public handleSubmitButtonClick = (): void => {
		this.props.submitModal({
			url: addProtocol(this.state.valueByName.url),
		});
	};

	private readonly handleKeyDown = (event: React.KeyboardEvent) => {
		switch (event.key) {
			case 'Escape':
				event.preventDefault();
				this.props.cancelModal();
				break;
			case 'Enter':
				event.preventDefault();
				this.handleSubmitButtonClick();
				break;
		}
	};

	private readonly handleFormFieldChange = ({ name, feedback, value }) => {
		this.setState({
			feedbackByName: { [name]: feedback },
			valueByName: { [name]: value },
		});
	};

	private readonly handleTextInputRef = (textInputRef: HTMLElement) =>
		(this.textInputRef = textInputRef);

	public override render(): JSX.Element {
		const {
			cancelModal,
			data: { modalIcon, modalPrimaryButtonLabel, modalTitle },
		} = this.props;
		const { feedbackByName, valueByName } = this.state;

		return (
			<Modal size="s" onKeyDown={this.handleKeyDown}>
				<ModalHeader
					icon={modalIcon}
					title={modalTitle || t('Edit hyperlink')}
				/>

				<ModalBody>
					<Form
						feedbackByName={feedbackByName}
						labelPosition="before"
						onFieldChange={this.handleFormFieldChange}
						valueByName={valueByName}
					>
						<FormRow label={t('Web address (URL)')}>
							<Flex alignItems="center" spaceSize="l">
								<TextInput
									name="url"
									ref={this.handleTextInputRef}
									validate={validateUrl}
								/>

								<Block applyCss={textLinkContainerStyles}>
									<TextLink
										icon="external-link"
										isDisabled={!valueByName.url}
										label={t('Visit')}
										href={addProtocol(valueByName.url)}
									/>
								</Block>
							</Flex>
						</FormRow>
					</Form>
				</ModalBody>

				<ModalFooter>
					<Button label={t('Cancel')} onClick={cancelModal} />

					<Button
						isDisabled={!valueByName.url}
						label={modalPrimaryButtonLabel || t('Apply')}
						onClick={this.handleSubmitButtonClick}
						type="primary"
					/>
				</ModalFooter>
			</Modal>
		);
	}

	public override componentDidMount(): void {
		this.textInputRef.focus();
	}
}
