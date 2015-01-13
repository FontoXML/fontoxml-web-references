fontoxml-references-web
------------------

Provide UI components for creating references to the web.

## How to integrate

1. Add uiModule to app-ui
1. Integrate the styles into styles.scss

## Example usage

Use the web reference modal in an operation for example.

```
"xref-web-insert": {
	"label": "Web reference",
	"description": "Insert a reference to a web resource",
	"icon": "link",
	"steps": [
		{
			"type": "modal/WebReference",
			"options": {
				"controller": "WebReferenceModalController",
				"templateUrl": "fontoxml-references-web/ui/web-reference-modal-template.html",
				"windowClass": "modal-md"
			}
		},
		{
			"type": "editor-method/transformReferenceToPermanentId"
		},
		{
			"type": "command/xref-insert"
		}
	]
},
"xref-web-edit": {
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
				"modalTitle": "Edit this web reference"
			},
			"options": {
				"controller": "WebReferenceModalController",
				"templateUrl": "fontoxml-references-web/ui/web-reference-modal-template.html",
				"windowClass": "modal-md"
			}
		},
		{
			"type": "editor-method/transformReferenceToPermanentId"
		},
		{
			"type": "command/set-attributes"
		}
	]
},
"xref-web-mark-as-valid": {
	"label": "Mark as valid",
	"description": "Mark this web reference as valid",
	"flags": [
		"exclude-from-operations-list"
	],
	"steps": [
		{
			"type": "editor-method/markReferenceAsValid"
		}
	]
}
```
