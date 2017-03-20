define([
	'fontoxml-localization/t',

	'../api/isValidUrl'
], function (
	t,

	isValidUrl
) {
	'use strict';

	return /* @ngInject */ function WebReferenceModalController ($scope, $modalInstance, operationData) { // eslint-disable-line no-inline-comments
		$scope.templateData = {
			busy: false,
			operationData: operationData,
			messages: {
				modalDefaultSubtitle: t('Enter the web address for this hyperlink'),
				invalidLinkWarning: t('Please enter a valid URL in order to proceed.'),
				cancelButtonLabel: t('Cancel'),
				applyButtonDefaultLabel: t('Insert')
			}
		};

		$scope.templateData.reference = {
			target: ''
		};

		// Add http:// if not already present
		function addProtocol (url) {
			url = url || '';
			var target = url.trim();

			if (!/(?::\/\/)|(?:mailto:)/i.exec(target)) {
				// The validator does not allow URLs starting with just "//", so if there is no "://" or "mailto:" in
				// the target, we can assume the link has no protocol yet, and would erroneously behave like a relative
				// URL.

				target = 'http://' + target;
			}
			return target;
		}

		$scope.apply = function () {

			operationData = Object.assign({}, operationData, {
					targetSpec: {
						url: addProtocol($scope.templateData.reference.target)
					}
				});

			$modalInstance.close(operationData);
		};

		$scope.isValid = function () {
			return isValidUrl(addProtocol($scope.templateData.reference.target));
		};

		$scope.cancel = function () {
			$modalInstance.dismiss();
		};

		if (operationData && operationData.reference) {
			$scope.templateData.reference = operationData.reference;
		}
	};
});
