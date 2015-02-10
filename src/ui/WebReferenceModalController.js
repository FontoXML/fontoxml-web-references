define([
	'editor'
], function (
	editor
	) {
	'use strict';

	return /* @ngInject */ function WebReferenceModalController ($scope, $modalInstance, operationData) {
		var pasteMutation = false;

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
			'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locater

		$scope.templateData.reference = {
			target: ''
		};

		// @developerquestion: what does this do exactly? ~ wybe, 3 feb '15
		function processInput () {
			if (!$scope.templateData.reference.target) {
				return;
			}
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

			var target = $scope.templateData.reference.target;

			if (target.indexOf('://') < 0) {
				// the urlPattern does not allow for URLs starting with just "//", so if there is no "://" in the target
				// we can assume the link has no protocol yet, and would erronously behave like a relative URL.
				target = 'http://' + target;
			}

			operationData = Object.assign({}, operationData, {
				reference: {
					metadata: {},
					target: target,
					type: 'web',
					originalPermanentId: operationData.permanentId
				}
			});

			if (operationData.operationBeforeClose) {
				// If the "operationBeforeClose" parameter is set, this operation will have to execute and finish first, before closing
				// this modal. The primary use case for this is resolving the permanentId for given URL. The modal is kept open during
				// this time to provide user feedback, and to prevent the cursor position to change to something with a different
				// content model.
				$scope.templateData.busy = true;
				editor.executeOperation(operationData.operationBeforeClose, operationData).then(function (newOperationData) {
					$modalInstance.close(newOperationData);
				}).catch(function (error) {
					console.error(error);
					$modalInstance.dismiss();
				});
			} else {
				$modalInstance.close(operationData);
			}
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
