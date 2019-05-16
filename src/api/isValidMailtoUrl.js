import configurationManager from 'fontoxml-configuration/src/configurationManager.js';
let configuredWebReferenceEmailValidityRegExp = configurationManager.get(
	'web-reference-email-validity-regular-expression'
);

export default function isValidMailtoUrl(url) {
	return url.startsWith('mailto:') && configuredWebReferenceEmailValidityRegExp.test(url);
}
