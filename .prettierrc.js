module.exports = {
	...require( '@wordpress/prettier-config' ),
	overrides: [
		{
			files: [ '*.yml', '*.yaml' ],
			options: { useTabs: false, tabWidth: 2 },
		},
	],
};
