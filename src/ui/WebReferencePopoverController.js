define([
	'editor'
], function (
	editor) {
	'use strict';

	return /* @ngInject */ function WebReferencePopoverController ($scope) {
		$scope.templateData.editReference = function () {
			editor.executeOperation('xref-web-edit', {
				contextNodeId: $scope.templateData.nodeId,
				target: $scope.templateData.reference.target,
				permanentId: $scope.templateData.reference.permanentId
			});

			$scope.templateData.hidePopover();
		};
	};
});

