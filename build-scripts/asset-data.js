const fs = require( 'fs-extra' );
const path = require( 'path' );
const { createHashLikeWP } = require( './helpers/util' );

const assetDataConfig = [
	{
		source: path.resolve( process.cwd(), 'dist/css/', 'editor.css' ),
		destination: path.resolve(
			process.cwd(),
			'dist/css/',
			'editor.css.asset.php'
		),
		dependencies: [],
	},
	{
		source: path.resolve(
			process.cwd(),
			'dist/js/react-jsx-runtime/',
			'react-jsx-runtime.js'
		),
		destination: path.resolve(
			process.cwd(),
			'dist/js/react-jsx-runtime/',
			'react-jsx-runtime.asset.php'
		),
		dependencies: [ 'react' ],
	},
];

run();

async function run() {
	// Generate asset data.
	for ( const config of assetDataConfig ) {
		await generate( config );
	}
}

async function generate( config ) {
	const source = path.resolve( config.source );
	const destination = path.resolve( config.destination );
	const dependencies = config.dependencies.length
		? `'${ config.dependencies.join( `','` ) }'`
		: '';

	console.log( `Generating asset data for ${ source } ...` );

	// Make dir if does not exist.
	await fs.mkdir( path.dirname( destination ), { recursive: true } );

	const data = await fs.readFile( source, 'utf8' );

	// Create hash and save asset data
	const hash = createHashLikeWP( data );

	const assetData = `<?php return array('dependencies' => array(${ dependencies }), 'version' => '${ hash }');`;
	fs.writeFile( destination, assetData, 'utf8' );

	console.log( `Asset data saved at ${ destination }` );
}
