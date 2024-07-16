// WordPress webpack config.
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// Utilities.
const path = require( 'path' );

// Add any new entry points by extending the webpack config.
module.exports = {
	...defaultConfig,
	...{
		entry: {
			editor: path.resolve( process.cwd(), 'src/js', 'editor.js' ),
		},
		output: {
			path: path.resolve( process.cwd(), 'dist/js' ),
			filename: '[name].js',
		},
		plugins: [
			// Include WP's plugin config.
			...defaultConfig.plugins,
		],
	},
};
