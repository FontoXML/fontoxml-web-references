define([
	'fontoxml-references-web/api/UrlValidator'
], function (
	UrlValidator
) {
	'use strict';

	describe('UrlValidator.validate() with valid Urls', function () {
		var validUrlsToTest = [
			// -- Domain names without http(s)
			'test',
			'test2',
			'te-st',
			'te-st2',
			'test.com',
			'test2.com',
			'te-st.com',
			'test.nl',
			'te-st.nl',
			'test.google',
			'www.test.com',
			'www2.test2.com',
			'some.extra.subdomains.test.com',
			'some.dash-ed.sub-domains.test.com',
			'test.com/',
			'www.test.com/',
			'test:8080',
			'test.com:8080',
			'www.test.com:8080',

			// -- Domain names with http(s)
			'http://www.te-st.com/',
			'http://www.test.com/',
			'http://test.com/',
			'https://www.test.com/',
			'https://test.com/',
			'http://localhost:8080', // FXC-447
			'http://localhost:8080/', // FXC-447
			'http://localhost',
			'http://localhost/',
			'http://a.com',

			// -- IPv4
			'123.123.123.123',
			'1.1.1.1',
			'123.123.123.123:8080',
			'1.1.1.1:8080',

			// -- IPv6 (8 groups of 4 hexadecimal digits)
			// '2001:0db8:85a3:08d3:1319:8a2e:0370:7344',
			// '2001:0db8:85a3:0000:1319:8a2e:0370:7344',
			// '2001:0db8:85a3:0:1319:8a2e:0370:7344', // Shorthand of address above
			// '2001:0db8:85a3::1319:8a2e:0370:7344',
			// '2001:0db8:0000:0000:0000:0000:1428:57ab', // Full size
			// '2001:0db8:0000:0000:0000::1428:57ab', // Shorter...
			// '2001:0db8:0:0:0:0:1428:57ab', // Again, shorter...
			// '2001:0db8:0::0:1428:57ab', // Almost there...
			// '2001:0db8::1428:57ab', // Shortest!
			// '2001:0db8:02de::0e13', // 'Full' size, with leading zeros
			// '2001:0db8:2de::e13', // Leading zeros aren't required

			// -- Some real world tests
			'https://calendar.google.com/calendar/render?pli=1#main_7',
			'https://app.teamweek.com/#timeline/grid/176517/23840',
			'https://liones.atlassian.net/secure/RapidBoard.jspa?rapidView=132&projectKey=FXC&view=detail&selectedIssue=FXC-575',
			'https://en.wiktionary.org/wiki/Special:Search', // FXC-575
			'http://graphemica.com/\'', // FXC-575
			'http://graphemica.com/%E2%A9%B0', // FXC-575
			'http://graphemica.com/f', // FXC-575
			'http://graphemica.com/%22', // FXC-575

			// -- Adapted from https://mathiasbynens.be/demo/url-regex
			'http://foo.com/blah_blah',
			'http://foo.com/blah_blah/',
			'http://foo.com/blah_blah_(wikipedia)',
			'http://foo.com/blah_blah_(wikipedia)_(again)',
			'http://www.example.com/wpstyle/?p=364',
			'https://www.example.com/foo/?bar=baz&inga=42&quux',
			'http://142.42.1.1/',
			'http://142.42.1.1:8080/',
			'http://foo.com/blah_(wikipedia)#cite-1',
			'http://foo.com/blah_(wikipedia)_blah#cite-1',
			'http://foo.com/(something)?after=parens',
			'ftp://foo.bar/baz',
			'http://foo.bar/?q=Test%20URL-encoded%20stuff',
			'http://1337.net',
			'http://a.b-c.de',
			'http://223.255.255.254',
			'http://foo.bar?q=Spaces%20should%20be%20encoded',
			// Usernames/passwords
			// 'http://userid:password@example.com:8080',
			// 'http://userid:password@example.com:8080/',
			// 'http://userid@example.com',
			// 'http://userid@example.com/',
			// 'http://userid@example.com:8080',
			// 'http://userid@example.com:8080/',
			// 'http://userid:password@example.com',
			// 'http://userid:password@example.com/',
			// 'http://-.~_!$&\'()*+,;=:%40:80%2f::::::@example.com',
			// Unicode stuff
			// 'http://✪df.ws/123',
			// 'http://➡.ws/䨹',
			// 'http://⌘.ws',
			// 'http://⌘.ws/',
			// 'http://foo.com/unicode_(✪)_in_parens',
			// 'http://☺.damowmow.com/',
			// 'http://مثال.إختبار',
			// 'http://例子.测试',
			// 'http://उदाहरण.परीक्षा',
		];

		validUrlsToTest.forEach(function (url) {
			it(url, function () {
				var result = UrlValidator.validate(url);

				chai.expect(result).to.equal(true);
			});
		});
	});

	describe('UrlValidator.validate() with invalid Urls', function () {
		var invalidUrlsToTest = [
			// -- Invalid ipv4 addresses
			'1..1',
			'1.1.1',
			'1.1.1.1.1',

			// -- Adapted from https://mathiasbynens.be/demo/url-regex
			'http://',
			'http://.',
			'http://.test.com',
			'http://..',
			'http://../',
			'http://?',
			'http://??',
			'http://??/',
			'http://#',
			'http://##',
			'http://##/',
			'http://test.com?q=Spaces should be encoded',
			'//',
			'//a',
			'///a',
			'///',
			'http:///a',
			'rdar://1234',
			'h://test',
			'http:// shouldfail.com',
			'://',
			':// should fail',
			'http://foo.bar/foo(bar)baz quux',
			'ftps://foo.bar/',
			'http://-error-.invalid/',
			'http://a.b--c.de/',
			'http://-a.b.co',
			'http://a.b-.co',
			'http://1.1.1.1.1',
			'http://123.123.123',
			'http://3628126748',
			'http://.www.foo.bar/',
			'http://www.foo.bar./',
			'http://.www.foo.bar./',
			'http://code.google.com/events/#&product=browser'
			// For now seen as valid, as we do not check for correctness of ip addresses
			// 'http://0.0.0.0',
			// 'http://10.1.1.0',
			// 'http://10.1.1.255',
			// 'http://224.1.1.1',
			// 'http://10.1.1.1',
			// 'http://10.1.1.254',
		];

		invalidUrlsToTest.forEach(function (url) {
			it(url, function () {
				var result = UrlValidator.validate(url);

				chai.expect(result).to.equal(false);
			});
		});
	});

	describe('UrlValidator.validate() with valid mailto: email adresses', function () {
		var validMailtoUrlsToTest = [
			// Adapted from https://en.wikipedia.org/wiki/Email_address
			'mailto:test@test.com',
			'mailto:test.test@test.com',
			'mailto:test.test.test.with+symbol@test.com',
			'mailto:other.dash-email-adress@test.com',
			'mailto:a@test.com',
			'mailto:example-indeed@strange-example.com',
			'mailto:admin@mailserver1',
			'mailto:#!$%&\'*+-/=?^_`{}|~@example.org',
			'mailto:example@localhost',
			'mailto:example@s.solutions',
			'mailto:user@com',
			'mailto:user@localserver',
			// Addresses with quoted strings
			// '"much.more unusual"@example.com',
			// '"very.unusual.@.unusual.com"@example.com',
			// '"very.(),:;<>[]\\".VERY.\\"very@\\\\ \\"very\\".unusual"@strange.example.com',
			// '#!$%&\'*+-/=?^_`{}|~@example.org',
			// '"()<>[]:,;@\\\\\\"!#$%&\'-/=?^_`{}| ~.a"@example.org',
			// '" "@example.org'
		];

		validMailtoUrlsToTest.forEach(function (url) {
			it(url, function () {
				var result = UrlValidator.validate(url);

				chai.expect(result).to.equal(true);
			});
		});
	});

	describe('UrlValidator.validate() with invalid mailto: email adresses', function () {
		var invalidMailtoUrlsToTest = [
			// Adapted from https://en.wikipedia.org/wiki/Email_address
			'mailto:Abc.example.com', // No @
			'mailto:A@b@c@example.com', // Multiple @'s
			'mailto:a"b(c)d,e:f;g<h>i[j\k]l@example.com', // Unallowed characters
			'mailto:just"not"right@example.com', // Quoted string
			'mailto:this is"not\allowed@example.com', // Unallowed characters (spaces, quotes, backslashes)
			'mailto:this\ still\"not\\allowed@example.com', // Unallowed characters (spaces, quotes, backslashes)
			'mailto:john..doe@example.com', // Double dot before @
			'mailto:john.doe@example..com', // Double dot after @
			'mailto: test@test.com', // Leading space
			'mailto:test@test.com ' // Trailing space
		];

		invalidMailtoUrlsToTest.forEach(function (url) {
			it(url, function () {
				var result = UrlValidator.validate(url);

				chai.expect(result).to.equal(false);
			});
		});
	});
});
