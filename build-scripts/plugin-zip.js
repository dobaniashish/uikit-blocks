const path = require( 'path' );

const AdmZip = require( 'adm-zip' );
const { sync: glob } = require( 'fast-glob' );

const { getPackage } = require( './helpers/util' );

const package = getPackage();
const fileName = `${ package.name }-${ package.version }.zip`;
const filePath = path.resolve( process.cwd(), 'dist', fileName );

console.log( `Creating plugin zip at ${ filePath } ...` );

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

console.log( `Plugin zip created at ${ filePath } ...` );
