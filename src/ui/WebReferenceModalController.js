define([
	'editor'
], function (
	editor
) {
	'use strict';

	return /* @ngInject */ function WebReferenceModalController ($scope, $modalInstance, operationData) {
		$scope.templateData = {
			busy: false,
			operationData: operationData
		};

		// Allows URLs without a protocol, http or https
		// Does not allow spaces
		// Does not allow IPv6 addresses
		// Does not allow hostnames (lacking TLD)
		$scope.templateData.urlPattern = new RegExp(
			'^' +
			'(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])?)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', 'i'); // fragment identifier

		$scope.templateData.reference = {
			target: ''
		};

		$scope.apply = function () {
			var target = $scope.templateData.reference.target;
			if (target.indexOf('://') < 0) {
				// the urlPattern does not allow for URLs starting with just "//", so if there is no "://" in the target
				// we can assume the link has no protocol yet, and would erroneously behave like a relative URL.
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

		if (operationData && operationData.targetSpec) {
			$scope.templateData.reference = {
				target: operationData.targetSpec.url
			};
		}
	};
});
