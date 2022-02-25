import configurationManager from 'fontoxml-configuration/src/configurationManager';

export default function setDefaultConfiguration(): void {
	configurationManager.setDefault(
		'web-reference-url-validity-regular-expression',
		/^(https?|ftp):\/\/[^\s]+$/
	);

	const emailProtocol = 'mailto:';
	const emailUser =
		"[a-z0-9!#$%&'*+/=?^_`{|}~\\-]+(\\.[a-z0-9!#$%&'*+/=?^_`{|}~\\-]+)*";
	const emailDomain =
		'([a-z0-9]([a-z0-9-]*[a-z0-9])?\\.)*([a-z0-9]([a-z0-9-]*[a-z0-9]))?';

	configurationManager.setDefault(
		'web-reference-email-validity-regular-expression',
		new RegExp(`^(${emailProtocol}${emailUser}@${emailDomain})$`, 'i')
	);
}
