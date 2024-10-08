const fs = require( 'fs-extra' );
const path = require( 'path' );

const { getPackage } = require( './helpers/util' );

const VERSION_REGEX = /\* Version:(.+)/;
const STABLE_TAG_REGEX = /Stable tag:\s*(.+)/;

const WP_VERSION_REGEX = /Requires at least:(.+)/;
const PHP_VERSION_REGEX = /Requires PHP:(.+)/;

run();

async function run() {
	const package = getPackage();
	const version = package.version;

	const readMePath = path.resolve( process.cwd(), 'readme.txt' );
	const pluginPath = path.resolve( process.cwd(), 'uikit-blocks.php' );

	const readMeFileContent = await fs.readFile( readMePath, 'utf8' );
	const pluginFileContent = await fs.readFile( pluginPath, 'utf8' );

	// Version
	const readMeVersion = readMeFileContent
		.match( STABLE_TAG_REGEX )[ 1 ]
		.trim();

	const pluginVersion = pluginFileContent.match( VERSION_REGEX )[ 1 ].trim();

	if ( version !== readMeVersion || version !== pluginVersion ) {
		console.log( 'Version mismatch' );
		console.log( `Package version: ${ version }` );
		console.log( `Readme stable tag: ${ readMeVersion }` );
		console.log( `Plugin version: ${ pluginVersion }` );
		process.exit( 1 );
	}

	// Minimum WP Version
	const readmeWPVersion = readMeFileContent
		.match( WP_VERSION_REGEX )[ 1 ]
		.trim();
	const pluginWPVersion = pluginFileContent
		.match( WP_VERSION_REGEX )[ 1 ]
		.trim();

	if ( readmeWPVersion !== pluginWPVersion ) {
		console.log( 'Minimum WP version mismatch' );
		console.log( `Readme WP version: ${ readmeWPVersion }` );
		console.log( `Plugin WP version: ${ pluginWPVersion }` );
		process.exit( 1 );
	}

	// Minimum PHP Version
	const readmePHPVersion = readMeFileContent
		.match( PHP_VERSION_REGEX )[ 1 ]
		.trim();
	const pluginPHPVersion = pluginFileContent
		.match( PHP_VERSION_REGEX )[ 1 ]
		.trim();

	if ( readmePHPVersion !== pluginPHPVersion ) {
		console.log( 'Minimum PHP version mismatch' );
		console.log( `Readme PHP version: ${ readmePHPVersion }` );
		console.log( `Plugin PHP version: ${ pluginPHPVersion }` );
		process.exit( 1 );
	}
}
