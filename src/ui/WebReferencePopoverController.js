define([
	'editor'
], function (
	editor) {
	'use strict';

	return /* @ngInject */ function WebReferencePopoverController ($scope) {
		$scope.templateData.editReference = function () {
			// TODO: we need a better way to determine the operation to execute
			editor.executeOperation('xref-web-edit', {
				nodeId: $scope.templateData.nodeId,
				target: $scope.templateData.reference.target,
				permanentId: $scope.templateData.reference.permanentId
			});

			$scope.templateData.hidePopover();
		};
	};
});
