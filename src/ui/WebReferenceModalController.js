define([
	'../api/isValidUrl'
], function (
	isValidUrl
	) {
	'use strict';

	return /* @ngInject */ function WebReferenceModalController ($scope, $modalInstance, operationData) {
		$scope.templateData = {
			busy: false,
			operationData: operationData
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
