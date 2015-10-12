define([
], function (
	) {
	'use strict';

	return function createUiWebReferencePopoverDirective () {
		return {
			restrict: 'E',
			templateUrl: require.toUrl('fontoxml-references-web/ui/ui-web-reference-popover.html'),
			scope: {},
			require: '^uiReferencePopover',
			link: function (scope, element, attrs, uiReferencePopoverController) {
				scope.uiWebReferencePopover = {
					uiReferencePopover: uiReferencePopoverController
				};
			}
		};
	};
});
