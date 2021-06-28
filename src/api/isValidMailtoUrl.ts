import configurationManager from 'fontoxml-configuration/src/configurationManager';
let configuredWebReferenceEmailValidityRegExp = configurationManager.get(
	'web-reference-email-validity-regular-expression'
);

export default function isValidMailtoUrl(url: $TSFixMeAny): $TSFixMeAny {
	return (
		url.startsWith('mailto:') &&
		configuredWebReferenceEmailValidityRegExp.test(url)
	);
}
