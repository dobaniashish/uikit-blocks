const { copy } = require( './util' );
const path = require( 'path' );

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

	// Blocks Json.
	{
		source: path.resolve(
			process.cwd(),
			'src/js/blocks/button/',
			'block.json'
		),
		destination: path.resolve(
			process.cwd(),
			'blocks/button/',
			'block.json'
		),
	},
	{
		source: path.resolve(
			process.cwd(),
			'src/js/blocks/heading/',
			'block.json'
		),
		destination: path.resolve(
			process.cwd(),
			'blocks/heading/',
			'block.json'
		),
	},
];

run();

async function run() {
	console.log( `Copying files ...` );

	for ( const config of copyConfig ) {
		await copy( config.source, config.destination );
	}

	console.log( `Copied.` );
}
