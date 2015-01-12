define([
	'editor'
], function (
	editor
	) {
	'use strict';

	return /* @ngInject */ function WebReferencePopoverController ($scope) {
		$scope.editReference = function () {
			editor.executeOperation('xref-web-edit', {
				nodeId: $scope.templateData.nodeId,
				target: $scope.templateData.reference.target,
				permanentId: $scope.templateData.reference.permanentId
			});
		};
	};
});
