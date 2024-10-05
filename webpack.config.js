// WordPress webpack config.
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// Utilities.
const path = require( 'path' );

// React-jsx-runtime polyfill.
// @see https://github.com/WordPress/gutenberg/issues/62202
const reactJSXRuntimePolyfillConfig = {
	entry: {
		'react-jsx-runtime': {
			import: 'react/jsx-runtime',
		},
	},
	output: {
		path: path.resolve( process.cwd(), 'dist/js/react-jsx-runtime' ), // Use separate directory to prevent files getting deleted by CleanWebpackPlugin
		filename: 'react-jsx-runtime.js',
		library: {
			name: 'ReactJSXRuntime',
			type: 'window',
		},
	},
	externals: {
		react: 'React',
	},
};

const mainConfig = {
	...defaultConfig,
	...{
		entry: {
			editor: path.resolve( process.cwd(), 'src/js', 'editor.js' ),
		},
		output: {
			path: path.resolve( process.cwd(), 'dist/js/main' ),
			filename: '[name].js',
		},
		plugins: [
			// Include WP's plugin config.
			...defaultConfig.plugins,
		],
	},
};

// Add any new entry points by extending the webpack config.
module.exports = [ mainConfig, reactJSXRuntimePolyfillConfig ];
