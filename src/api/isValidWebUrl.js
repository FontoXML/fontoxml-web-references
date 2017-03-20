define([
	'fontoxml-configuration/get!web-reference-url-validity-regular-expression'
], function (
	configuredWebReferenceUrlValidityRegExp
) {
	'use strict';

	return function isValidWebUrl (url) {
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
