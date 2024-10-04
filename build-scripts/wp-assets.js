const fs = require( 'fs-extra' );
const path = require( 'path' );
const sharp = require( 'sharp' );

const sharpConfig = [
	// Banner.
	{
		source: path.resolve( process.cwd(), 'src/wp-assets/', 'banner.svg' ),
		destination: path.resolve( process.cwd(), 'dist/wp-assets/' ),
		name: 'banner-1544x500',
		format: 'png',
		size: {
			width: 1544,
			height: 500,
		},
	},
	{
		source: path.resolve( process.cwd(), 'src/wp-assets/', 'banner.svg' ),
		destination: path.resolve( process.cwd(), 'dist/wp-assets/' ),
		name: 'banner-772x250',
		format: 'png',
		size: {
			width: 772,
			height: 250,
		},
	},

	// Icon.
	{
		source: path.resolve( process.cwd(), 'src/wp-assets/', 'icon.svg' ),
		destination: path.resolve( process.cwd(), 'dist/wp-assets/' ),
		name: 'icon-256x256',
		format: 'png',
		size: {
			width: 256,
			height: 256,
		},
	},
	{
		source: path.resolve( process.cwd(), 'src/wp-assets/', 'icon.svg' ),
		destination: path.resolve( process.cwd(), 'dist/wp-assets/' ),
		name: 'icon-128x128',
		format: 'png',
		size: {
			width: 128,
			height: 128,
		},
	},
];

run();

async function run() {
	// Compile less.
	for ( const config of sharpConfig ) {
		await generate( config );
	}

	console.log( `WP asset images generated.` );
}

async function generate( config ) {
	const source = path.resolve( config.source );
	const destination = path.resolve(
		config.destination,
		`${ config.name }.${ config.format }`
	);

	console.log( `Generating image ${ source } to  ${ destination } ...` );

	// Make dir if does not exist.
	await fs.mkdir( path.dirname( destination ), { recursive: true } );

	await sharp( source )
		.resize( { width: config.width, height: config.height } )
		.toFormat( config.format )
		.toFile( destination );
}
