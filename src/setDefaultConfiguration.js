define([
	'fontoxml-configuration/configurationManager'
], function (
	configurationManager
) {
	'use strict';

	return function () {
		// By default: turn validity checking just about off.
		configurationManager.setDefault('web-reference-url-validity-regular-expression', /^(https?|ftp):\/\/[^\s]+$/);

		var emailProtocol = 'mailto:',
		emailUser = '[a-z0-9!#$%&\'*+/=?^_`{|}~\\-]+(\\.[a-z0-9!#$%&\'*+/=?^_`{|}~\\-]+)*',
		emailDomain = '([a-z0-9]([a-z0-9-]*[a-z0-9])?\\.)*([a-z0-9]([a-z0-9-]*[a-z0-9]))?';
		configurationManager.setDefault('web-reference-email-validity-regular-expression', new RegExp('^(' + emailProtocol + emailUser + '@' + emailDomain + ')$', 'i'));
	};
});
