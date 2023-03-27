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
import type {
	FdsFormFeedbackByName,
	FdsFormValueByName,
} from 'fontoxml-design-system/src/types';
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

const WebReferenceModal: React.FC<
	ModalProps<{
		modalIcon?: string;
		modalPrimaryButtonLabel?: string;
		modalTitle?: string;
		url?: string;
	}>
> = ({
	cancelModal,
	data: { modalIcon, modalPrimaryButtonLabel, modalTitle, url },
	submitModal,
}) => {
	const [feedbackByName, setFeedbackByName] =
		React.useState<FdsFormFeedbackByName>({});
	const [valueByName, setValueByName] = React.useState<FdsFormValueByName>({
		url: url || '',
	});

	const handleSubmitButtonClick = (): void => {
		submitModal({
			url: addProtocol(valueByName['url'] as string),
		});
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		switch (event.key) {
			case 'Escape':
				event.preventDefault();
				cancelModal();
				break;
			case 'Enter':
				event.preventDefault();
				handleSubmitButtonClick();
				break;
		}
	};

	const handleFormFieldChange = React.useCallback(
		({ name, feedback, value }) => {
			setFeedbackByName({ [name]: feedback });
			setValueByName({ [name]: value });
		},
		[]
	);

	const textInputRef = React.useRef<HTMLElement>(null);
	React.useEffect(() => {
		if (textInputRef.current) {
			textInputRef.current.focus();
		}
	}, []);

	return (
		<Modal size="s" onKeyDown={handleKeyDown}>
			<ModalHeader
				icon={modalIcon}
				title={modalTitle || t('Edit hyperlink')}
			/>

			<ModalBody>
				<Form
					feedbackByName={feedbackByName}
					labelPosition="before"
					onFieldChange={handleFormFieldChange}
					valueByName={valueByName}
				>
					<FormRow label={t('Web address (URL)')}>
						<Flex alignItems="center" spaceSize="l">
							<TextInput
								name="url"
								ref={textInputRef}
								validate={validateUrl}
							/>

							<Block applyCss={textLinkContainerStyles}>
								<TextLink
									icon="external-link"
									isDisabled={!valueByName['url']}
									label={t('Visit')}
									href={addProtocol(valueByName['url'])}
								/>
							</Block>
						</Flex>
					</FormRow>
				</Form>
			</ModalBody>

			<ModalFooter>
				<Button label={t('Cancel')} onClick={cancelModal} />

				<Button
					isDisabled={!valueByName['url']}
					label={modalPrimaryButtonLabel || t('Apply')}
					onClick={handleSubmitButtonClick}
					type="primary"
				/>
			</ModalFooter>
		</Modal>
	);
};

export default WebReferenceModal;
