define([
	'fontoxml-localization/t'
], function (
	t
) {
	'use strict';

	return function createUiWebReferencePopoverDirective () {
		return {
			restrict: 'E',
			templateUrl: require.toUrl('fontoxml-references-web/ui/ui-web-reference-popover.html'),
			scope: {},
			require: '^uiReferencePopover',
			link: function (scope, _element, _attrs, uiReferencePopoverController) {
				scope.uiWebReferencePopover = {
					uiReferencePopover: uiReferencePopoverController,
					messages: {
						caption: t('Hyperlink to:'),
						hyperlinkTooltip: t('Click to open this link in a new window')
					}
				};
			}
		};
	};
});
