define([
	'fontoxml-configuration/get!web-reference-email-validity-regular-expression'
], function (
	configuredWebReferenceEmailValidityRegExp
) {
	'use strict';

	return function isValidMailtoUrl (url) {
		return url.startsWith('mailto:') && configuredWebReferenceEmailValidityRegExp.test(url);
	};
});
