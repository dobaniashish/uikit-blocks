const fs = require( 'fs-extra' );
const path = require( 'path' );
const prettier = require( 'prettier' );

const requireEsm = require( './helpers/require-esm' );
const { getBlocks } = require( './helpers/util' );

const prettierConfig = path.resolve( process.cwd(), '.prettierrc.js' );

const metadataConfig = [];
const blocks = getBlocks();

blocks.forEach( ( block ) => {
	metadataConfig.push( {
		source: path.resolve(
			process.cwd(),
			`src/js/blocks/${ block }/`,
			'metadata.js'
		),
		destination: path.resolve(
			process.cwd(),
			`dist/blocks/${ block }/`,
			'block.json'
		),
	} );
} );

run();

async function run() {
	console.log( `Building block metadata files ...` );

	const prettierOptions = {
		...( await prettier.resolveConfig( prettierConfig ) ),
		parser: 'json',
	};

	for ( const config of metadataConfig ) {
		const source = path.resolve( config.source );
		const destination = path.resolve( config.destination );

		if ( ! fs.existsSync( source ) ) {
			const err = new Error( `Error! ${ source } does not exist.` );
			console.log( err );
			throw err;
		}

		const { default: metadata } = requireEsm.require( source );

		let data = JSON.stringify( metadata );

		data = await prettier.format( data, prettierOptions );

		// Make dir if does not exist.
		await fs.mkdir( path.dirname( destination ), { recursive: true } );

		// Save
		await fs.writeFile( destination, data, 'utf8' );
	}

	console.log( `Block metadata files built.` );
}
