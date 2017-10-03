define([
	'fontoxml-configuration/configurationManager'
], function (
	configurationManager
) {
	'use strict';

	return function () {
		/**
		 * Set the regular expression used to check the validity of web references
		 *
		 * Defaults to a very forgiving check.
		 *
		 * @const  {RegExp}  web-reference-url-validity-regular-expression
		 * @category  configuration
		 */
		configurationManager.setDefault('web-reference-url-validity-regular-expression', /^(https?|ftp):\/\/[^\s]+$/);

		var emailProtocol = 'mailto:',
		emailUser = '[a-z0-9!#$%&\'*+/=?^_`{|}~\\-]+(\\.[a-z0-9!#$%&\'*+/=?^_`{|}~\\-]+)*',
		emailDomain = '([a-z0-9]([a-z0-9-]*[a-z0-9])?\\.)*([a-z0-9]([a-z0-9-]*[a-z0-9]))?';

		/**
		 * Set the regular expression used to check the validity of e-mail references.
		 *
		 * @const  {RegExp}  web-reference-email-validity-regular-expression
		 * @category  configuration
		 */
		configurationManager.setDefault('web-reference-email-validity-regular-expression', new RegExp('^(' + emailProtocol + emailUser + '@' + emailDomain + ')$', 'i'));
	};
});
