// Require.js config
require.config({
	"baseUrl": "/test",

	"paths": {
		"text": "../node_modules/requirejs-text/text"
	},

	"packages": [
		{
			"name": "slimdom",
			"location": "../lib/slimdom/src"
		},
		{
			"name": "whynot",
			"location": "../lib/whynot/src"
		},

		{
			"name": "fontoxml-base-flow",
			"location": "../lib/fontoxml-base-flow/src"
		},
		{
			"name": "fontoxml-block-flow",
			"location": "../lib/fontoxml-block-flow/src"
		},
		{
			"name": "fontoxml-blueprints",
			"location": "../lib/fontoxml-blueprints/src"
		},
		{
			"name": "fontoxml-core",
			"location": "../lib/fontoxml-core/src"
		},
		{
			"name": "fontoxml-cursor-navigation",
			"location": "../lib/fontoxml-cursor-navigation/src"
		},
		{
			"name": "fontoxml-dita-sx-content-configurator",
			"location": "../lib/fontoxml-dita-sx-content-configurator/src"
		},
		{
			"name": "fontoxml-dom-identification",
			"location": "../lib/fontoxml-dom-identification/src"
		},
		{
			"name": "fontoxml-dom-utils",
			"location": "../lib/fontoxml-dom-utils/src"
		},
		{
			"name": "fontoxml-mathml-template",
			"location": "../lib/fontoxml-mathml-template/src"
		},
		{
			"name": "fontoxml-modular-schema-experience",
			"location": "../lib/fontoxml-modular-schema-experience/src"
		},
		{
			"name": "fontoxml-sectioning-flow",
			"location": "../lib/fontoxml-sectioning-flow/src"
		},
		{
			"name": "fontoxml-templated-views",
			"location": "../lib/fontoxml-templated-views/src"
		},
		{
			"name": "fontoxml-views",
			"location": "../lib/fontoxml-views/src"
		},
		{
			"name": "fontoxml-xml-parser",
			"location": "../lib/fontoxml-xml-parser/src"
		},

		{
			"name": "fontoxml-ui-references-hyperlinks",
			"location": "../src"
		}
	],

	"shim": {

	}
});
