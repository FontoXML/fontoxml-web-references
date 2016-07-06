define([

], function (

	) {
	'use strict';

	function UrlValidator () {
		var protocol = '(((https?)|(ftp)):\/\/)?',
			domainLabel = '([a-z\\d]+(-[a-z\\d]+)*\\.*)+',
			topLabel = '([a-z]+([a-z\\d-]*[a-z\\d])?)',
			hostname = '(' + domainLabel + topLabel + ')',
			ipv4 = '((\\d{1,3}\\.){3}\\d{1,3})',
			port = '(\\:\\d+)?',
			path = '(\\/[-a-z\\d%_.~+\\\':\\\(\\\)]*)*',
			query = '(\\?[;&a-z\\d%_.~+=-]*)?',
			fragmentIdentifier = '(\\#[-a-z\\d_\\/]*)?';

		var url = protocol + '(' + hostname + '|' + ipv4 + ')' + port + path + query + fragmentIdentifier;

		var emailProtocol = 'mailto:',
			emailUser = '[a-z0-9!#$%&\'*+/=?^_`{|}~\\-]+(\\.[a-z0-9!#$%&\'*+/=?^_`{|}~\\-]+)*',
			emailDomain = '([a-z0-9]([a-z0-9-]*[a-z0-9])?\\.)*([a-z0-9]([a-z0-9-]*[a-z0-9]))?';

		var mailto = emailProtocol + emailUser + '@' + emailDomain;

		this._test = new RegExp('^(' + url + '|' + mailto + ')$', 'i');
	}

	UrlValidator.prototype.getRegExp = function () {
		return this._test;
	};

	UrlValidator.prototype.validate = function (url) {
		return this._test.test(url);
	};

	return new UrlValidator();
});
