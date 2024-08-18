const path = require( 'path' );

const AdmZip = require( 'adm-zip' );
const { sync: glob } = require( 'fast-glob' );

const packagePath = path.resolve( process.cwd(), 'package.json' );
const package = require( packagePath );
const fileName = `${ package.name }-${ package.version }.zip`;
const filePath = path.resolve( process.cwd(), 'dist', fileName );

const zip = new AdmZip();

let files = glob(
	[
		'assets/**',
		'blocks/**',
		'includes/**',
		'languages/**',
		'uikit-blocks.php',
		'LICENSE',
		'readme.txt',
	],
	{
		caseSensitiveMatch: false,
	}
);

files.forEach( ( file ) => {
	const zipDirectory = path.dirname( file );
	zip.addLocalFile( file, zipDirectory !== '.' ? zipDirectory : '' );
} );

zip.writeZip( filePath );
