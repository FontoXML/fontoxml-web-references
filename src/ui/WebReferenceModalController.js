define([
	'../api/UrlValidator'
], function (
	UrlValidator
	) {
	'use strict';

	return /* @ngInject */ function WebReferenceModalController ($scope, $modalInstance, operationData) {
		$scope.templateData = {
			busy: false,
			operationData: operationData
		};

		$scope.templateData.urlPattern = UrlValidator.getRegExp();

		$scope.templateData.reference = {
			target: ''
		};

		$scope.apply = function () {
			var target = $scope.templateData.reference.target;

			if (!/(?::\/\/)|(?:mailto:)/i.exec(target)) {
				// The validator does not allow URLs starting with just "//", so if there is no "://" or "mailto:" in
				// the target, we can assume the link has no protocol yet, and would erroneously behave like a relative
				// URL.

				target = 'http://' + target;
			}

			operationData = Object.assign({}, operationData, {
					targetSpec: {
						url: target
					}
				});

			$modalInstance.close(operationData);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss();
		};

		if (operationData && operationData.reference) {
			$scope.templateData.reference = operationData.reference;
		}
	};
});
