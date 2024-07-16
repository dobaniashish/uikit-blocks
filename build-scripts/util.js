const fs = require( 'fs-extra' );
const path = require( 'path' );
const webpack = require( 'webpack' );
const { createHash } = webpack.util;

exports.copy = async function ( source, destination, force = false ) {
	source = path.resolve( source );
	destination = path.resolve( destination );

	if ( ! fs.existsSync( source ) ) {
		const err = new Error( `Error! ${ source } does not exist.` );
		console.log( err );
		throw err;
	}

	if ( ! force && fs.existsSync( destination ) ) {
		const sourcemtime = fs.statSync( source ).mtime;
		const destmtime = fs.statSync( destination ).mtime;

		if ( sourcemtime.getTime() <= destmtime.getTime() ) {
			console.log(
				`${ source } is not older then destination, skipping.`
			);
			return;
		}
	}

	// Make dir if does not exist.
	await fs.mkdir( path.dirname( destination ), { recursive: true } );

	// Dir
	if ( fs.lstatSync( source ).isDirectory() ) {
		await fs.copy( source, destination, ( err ) => {
			if ( err ) {
				console.log( err );
			}
		} );

		return;
	}

	// File
	const err = await fs.copyFile( source, destination );

	if ( err ) {
		console.log( err );
		throw err;
	}

	return;
};

/**
 * Creates asset hash like wp
 *
 * @see @wordpress/dependency-extraction-webpack-plugin
 *
 * @param string data Data to hash.
 */
exports.createHashLikeWP = function ( data ) {
	// Create a webpack compiler with the our config
	const config = require( '../webpack.config' );
	const compiler = webpack( config );

	// Get the compiler output options
	const { hashFunction, hashDigest, hashDigestLength } =
		compiler.options.output;

	// Create hash
	let hash = createHash( hashFunction )
		.update( data )
		.digest( hashDigest )
		.slice( 0, hashDigestLength );

	return hash;
};
