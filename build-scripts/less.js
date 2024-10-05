const fs = require( 'fs-extra' );
const less = require( 'less' );
const CleanCSS = require( 'clean-css' );
const postcss = require( 'postcss' );
const autoprefixer = require( 'autoprefixer' );
const path = require( 'path' );

const lessConfig = [
	{
		source: path.resolve( process.cwd(), 'src/less/', 'editor.less' ),
		destination: path.resolve( process.cwd(), 'dist/css/', 'editor.css' ),
	},
];

run();

async function run() {
	// Compile less.
	for ( const config of lessConfig ) {
		await compile( config );
	}
}

async function compile( config ) {
	const source = path.resolve( config.source );
	const destination = path.resolve( config.destination );

	console.log( `Compiling Less ${ source } ...` );

	const data = await fs.readFile( source, 'utf8' );

	let css = (
		await less.render( data, {
			filename: source,
			relativeUrls: true,
			math: 'always',
		} )
	).css;

	// Change prefix
	if ( config.prefix && config.prefix.from != config.prefix.to ) {
		css = css.replace(
			new RegExp(
				`${ config.prefix.from }-${ /([a-z\d-]+)/.source }`,
				'g'
			),
			`${ config.prefix.to }-$1`
		);
	}

	// Add browser prefixes.
	css = postcss( [ autoprefixer( { cascade: false } ) ] ).process( css ).css;

	// Minify and clean css.
	css = new CleanCSS( {
		advanced: false,
		keepSpecialComments: 0,
		rebase: false,
	} ).minify( css ).styles;

	// Make dir if does not exist.
	await fs.mkdir( path.dirname( destination ), { recursive: true } );

	// Save css.
	await fs.writeFile( destination, css, 'utf8' );

	console.log( `CSS saved at ${ destination }` );
}
