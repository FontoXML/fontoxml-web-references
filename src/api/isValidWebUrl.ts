import configurationManager from 'fontoxml-configuration/src/configurationManager';
let configuredWebReferenceUrlValidityRegExp = configurationManager.get(
	'web-reference-url-validity-regular-expression'
);

export default function isValidWebUrl(url: $TSFixMeAny): $TSFixMeAny {
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
