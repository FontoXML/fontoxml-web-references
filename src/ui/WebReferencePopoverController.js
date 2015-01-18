define([
	'editor'
], function (
	editor
	) {
	'use strict';

	return /* @ngInject */ function WebReferencePopoverController ($scope) {
		$scope.editReference = function () {
			// TODO: we need a better way to determine the operation to execute
			editor.executeOperation('xref-web-edit', {
				nodeId: $scope.templateData.nodeId,
				target: $scope.templateData.reference.target,
				permanentId: $scope.templateData.reference.permanentId
			});
		};

		//TODO: This is not specific to web references and should be moved to fontoxml-references
		$scope.markReferenceAsValid = function () {
			editor.executeOperation('xref-web-mark-as-valid', {
				nodeId: $scope.templateData.nodeId,
				permanentId: $scope.templateData.reference.permanentId,
				metadata: {
					// Only need to specify parts of metadata to update
					isSuspicious: false,
					suspiciousReason: null
				}
			}).then(function (operationData) {
				$scope.templateData.reference.metadata = operationData.metadata;
				$scope.templateData.hidePopover();
			});
		};
	};
});
