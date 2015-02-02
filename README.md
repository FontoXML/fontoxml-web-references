# FontoXML/references-web

Contains the web reference implementation of FontoXML. Provide UI components for creating references to the web.

## How to integrate

1. Implement ```FontoXML/references```.

1. Add this package to the dependencies of the target application.

1. Add ```uiModule``` to ```app-ui/uiModule```.

1. Add ```_styles``` to ```app-ui/_styles```.

1. Add the ```transformReferenceToWebReferenceElement``` or similar method to ```app-editor/AppEditor``` and adapt it to the used schema.

1. Add the ```reference-web-insert``` and ```reference-web-edit``` operations to the ```operations.json``` file in the ```sx-module``` used in the application, or in the applications own ```operations.json``` and adapt the last two operation steps of both operations to reflect the needed attributes transformation and element name.

1. See the 'IAEA' or 'Thieme' applications for inspiration on how to integrate web references, specially for the methods that need to be defined on ```AppEditor```. Once ```'Managers'``` are self registering there shouldn't be any need for this step anymore.

# Web reference popovers

When integrated, reference popover functionality will have support for web references. The operations used should be configured for the used schema.

# Operations

Add the following operations to the schema or application operations and change the last two steps of both operations to reflect the schema:
```
"reference-web-insert": {
	"label": "Web reference ",
	"description": "Insert a reference to a web resource",
	"icon": "link",
	"steps": [
		{
			"type": "modal/WebReference",
			"data": {
				"modalTitle": "Insert a web reference",
				"primaryButtonLabel": "Insert"
			},
			"options": {
				"controller": "WebReferenceModalController",
				"templateUrl": "fontoxml-references-web/ui/web-reference-modal-template.html",
				"windowClass": "modal-md"
			}
		},
		{
			"type": "set-step-data/resolvePermanentIdForReference"
		},
		{
			"type": "set-step-data/transformReferenceToWebReferenceElement"
		},
		{
			"type": "command/<elementName>-insert"
		}
	]
},
"reference-web-edit": {
	"label": "Edit web reference",
	"description": "Edit this web reference",
	"icon": "link",
	"flags": [
		"exclude-from-operations-list"
	],
	"steps": [
		{
			"type": "modal/WebReference",
			"data": {
				"modalTitle": "Edit this web reference",
				"primaryButtonLabel": "Save"
			},
			"options": {
				"controller": "WebReferenceModalController",
				"templateUrl": "fontoxml-references-web/ui/web-reference-modal-template.html",
				"windowClass": "modal-md"
			}
		},
		{
			"type": "set-step-data/resolvePermanentIdForReference"
		},
		{
			"type": "set-step-data/transformReferenceToWebReferenceElement"
		},
		{
			"type": "command/set-attributes"
		}
	]
}
```

## Example usage

The following example shows how to configure a popover content template for a reference of type 'web': 
```
referencePopoverContentService.setContentTemplateForReferenceType('web','fontoxml-references-web/ui/web-reference-popover-content-template.html');
```

The following example shows an example transform method used by the operations:
```
AppEditor.prototype.transformReferenceToWebReferenceElement = function (currentStepData) {
	currentStepData.attributes = {
		href: currentStepData.reference.permanentId,
		type: reference.type
	};

	return currentStepData;
};
```
