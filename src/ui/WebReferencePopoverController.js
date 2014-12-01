define([
	'editor'
], function (
	editor
	) {
	'use strict';

	return /* @ngInject */ function WebReferencePopoverController ($scope) {
		$scope.editReference = function () {
			editor.executeOperation('web-reference-edit', {
				nodeId: $scope.templateData.nodeId,
				target: $scope.templateData.reference.target
			});
		};
	};
});
