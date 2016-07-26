define([
	'fontoxml-configuration/get!web-reference-url-validity-regular-expression',
	'fontoxml-configuration/get!web-reference-email-validity-regular-expression'
], function (
	configuredWebReferenceUrlValidityRegExp,
	configuredWebReferenceEmailValidityRegExp
) {
	'use strict';

	return function (url) {
		if (url.startsWith('mailto:')) {
			return configuredWebReferenceEmailValidityRegExp.test(url);
		}

		var splittedUrl = url.split('://');

		if (splittedUrl.length !== 2) {
			return false;
		}

		if (splittedUrl[0] !== 'http' &&
			splittedUrl[0] !== 'https' &&
			splittedUrl[0] !== 'ftp') {
			return false;
		}

		return configuredWebReferenceUrlValidityRegExp.test(url);

	};
});