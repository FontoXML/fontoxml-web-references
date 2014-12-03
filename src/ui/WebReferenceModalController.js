define([
], function (
	) {
	'use strict';

	return /* @ngInject */ function WebReferenceModalController ($scope, $modalInstance, operationData, bufferDigest) {
		var pasteMutation = false;

		$scope.templateData = {};

		// Does not allow spaces
		// Does not allow IPv6 addresses
		// Does not allow hostnames (lacking TLD)
		$scope.templateData.urlPattern = new RegExp(
			'^' +
			'(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', 'i');

		$scope.templateData.protocolOptions = [
			'http://',
			'https://'
		];

		$scope.templateData.reference = {
			target: '',
			protocol: $scope.templateData.protocolOptions[0]
		};

		function processInput () {
			if (!$scope.templateData.reference.target) {
				return;
			}

			$scope.templateData.protocolOptions.forEach(function (protocolPrefix) {
				if ($scope.templateData.reference.target.indexOf(protocolPrefix) === 0) {
					$scope.templateData.reference.protocol = protocolPrefix;
					$scope.templateData.reference.target = $scope.templateData.reference.target.substr(protocolPrefix.length);
				}
			});
		}

		// The first mutation after a paste should be processed
		$scope.$watch('templateData.reference', function (newValue, oldValue) {
			if (pasteMutation) {
				processInput();
				pasteMutation = false;
			}
		}, true);

		// When the user manually inputs an url, process it on blur
		$scope.onBlur = function () {
			processInput();
		};

		// Make sure the mutation right after a paste action will be processed
		$scope.onPaste = function (event) {
			pasteMutation = true;
		};

		$scope.apply = function () {
			// Fallback for when the user or user agent somehow doesn't trigger a blur event when submitting
			processInput();

			operationData = Object.assign({}, operationData, {
				metadata: {},
				target: $scope.templateData.reference.protocol + $scope.templateData.reference.target,
				type: 'external'
			});
			
			$modalInstance.close(operationData);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss();
		};

		// Check if a reference if being updated
		if (operationData && operationData.target) {
			$scope.templateData.reference = {
				target: operationData.target
			};
			processInput();
		}
	};
});
