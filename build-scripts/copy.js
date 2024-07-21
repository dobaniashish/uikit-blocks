const fs = require( 'fs-extra' );
const path = require( 'path' );

const { copy, getBlocks } = require( './util' );

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
