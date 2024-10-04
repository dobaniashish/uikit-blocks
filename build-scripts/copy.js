const fs = require( 'fs-extra' );
const path = require( 'path' );

const { copy, getBlocks } = require( './helpers/util' );

const copyConfig = [
	// Editor - All blocks.
	{
		source: path.resolve( process.cwd(), 'dist/js/', 'editor.js' ),
		destination: path.resolve(
			process.cwd(),
			'assets/admin/js/',
			'editor.js'
		),
	},
	{
		source: path.resolve( process.cwd(), 'dist/js/', 'editor.asset.php' ),
		destination: path.resolve(
			process.cwd(),
			'assets/admin/js/',
			'editor.asset.php'
		),
	},

	// Editor css.
	{
		source: path.resolve( process.cwd(), 'dist/css/', 'editor.css' ),
		destination: path.resolve(
			process.cwd(),
			'assets/admin/css/',
			'editor.css'
		),
	},
	{
		source: path.resolve(
			process.cwd(),
			'dist/css/',
			'editor.css.asset.php'
		),
		destination: path.resolve(
			process.cwd(),
			'assets/admin/css/',
			'editor.css.asset.php'
		),
	},

	// WP assets.
	{
		source: path.resolve(
			process.cwd(),
			'dist/wp-assets/',
			'banner-1544x500.png'
		),
		destination: path.resolve(
			process.cwd(),
			'.wordpress/assets/',
			'banner-1544x500.png'
		),
	},
	{
		source: path.resolve(
			process.cwd(),
			'dist/wp-assets/',
			'banner-772x250.png'
		),
		destination: path.resolve(
			process.cwd(),
			'.wordpress/assets/',
			'banner-772x250.png'
		),
	},
	{
		source: path.resolve(
			process.cwd(),
			'dist/wp-assets/',
			'icon-256x256.png'
		),
		destination: path.resolve(
			process.cwd(),
			'.wordpress/assets/',
			'icon-256x256.png'
		),
	},
	{
		source: path.resolve(
			process.cwd(),
			'dist/wp-assets/',
			'icon-128x128.png'
		),
		destination: path.resolve(
			process.cwd(),
			'.wordpress/assets/',
			'icon-128x128.png'
		),
	},
	{
		source: path.resolve( process.cwd(), 'src/wp-assets/', 'icon.svg' ),
		destination: path.resolve(
			process.cwd(),
			'.wordpress/assets/',
			'icon.svg'
		),
	},
	{
		source: path.resolve(
			process.cwd(),
			'src/wp-assets/',
			'screenshot-1.png'
		),
		destination: path.resolve(
			process.cwd(),
			'.wordpress/assets/',
			'screenshot-1.png'
		),
	},
	{
		source: path.resolve(
			process.cwd(),
			'src/wp-assets/',
			'screenshot-2.png'
		),
		destination: path.resolve(
			process.cwd(),
			'.wordpress/assets/',
			'screenshot-2.png'
		),
	},
	{
		source: path.resolve(
			process.cwd(),
			'src/wp-assets/',
			'screenshot-3.png'
		),
		destination: path.resolve(
			process.cwd(),
			'.wordpress/assets/',
			'screenshot-3.png'
		),
	},
	{
		source: path.resolve(
			process.cwd(),
			'src/wp-assets/',
			'screenshot-4.png'
		),
		destination: path.resolve(
			process.cwd(),
			'.wordpress/assets/',
			'screenshot-4.png'
		),
	},
];

// Add Blocks Json.
const blocks = getBlocks();

blocks.forEach( ( block ) => {
	copyConfig.push( {
		source: path.resolve(
			process.cwd(),
			`dist/blocks/${ block }/`,
			'block.json'
		),
		destination: path.resolve(
			process.cwd(),
			`blocks/${ block }/`,
			'block.json'
		),
	} );
} );

run();

async function run() {
	console.log( `Copying files ...` );

	for ( const config of copyConfig ) {
		await copy( config.source, config.destination );
	}

	console.log( `Copied.` );
}
