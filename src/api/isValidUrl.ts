import configurationManager from 'fontoxml-configuration/src/configurationManager';
let configuredWebReferenceUrlValidityRegExp = configurationManager.get(
	'web-reference-url-validity-regular-expression'
);
let configuredWebReferenceEmailValidityRegExp = configurationManager.get(
	'web-reference-email-validity-regular-expression'
);

export default function (url: $TSFixMeAny): $TSFixMeAny {
	if (url.startsWith('mailto:')) {
		return configuredWebReferenceEmailValidityRegExp.test(url);
	}

	var splittedUrl = url.split('://');

	if (splittedUrl.length !== 2) {
		return false;
	}

	if (
		splittedUrl[0] !== 'http' &&
		splittedUrl[0] !== 'https' &&
		splittedUrl[0] !== 'ftp'
	) {
		return false;
	}

	return configuredWebReferenceUrlValidityRegExp.test(url);
}
