define([], function () {
	'use strict';

	var emailUser = '[a-z0-9!#$%&\'*+/=?^_`{|}~\\-]+(\\.[a-z0-9!#$%&\'*+/=?^_`{|}~\\-]+)*',
		emailDomain = '([a-z0-9]([a-z0-9-]*[a-z0-9])?\\.)*([a-z0-9]([a-z0-9-]*[a-z0-9]))?',
		emailRegExp = new RegExp('^(' + emailUser + '@' +  emailDomain + ')$', 'i');

	return function isValidEmail (url) {
		return emailRegExp.test(url);
	};
});
