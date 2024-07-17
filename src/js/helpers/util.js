export function parseAttributesString( attrsObject, prefixSpace = false ) {
	const attrs = parseAttributes( attrsObject );

	let attrsString = Object.entries( attrs )
		.map( ( [ key, val ] ) => `${ key }="${ val }"` )
		.join( ' ' );

	if ( attrsString && prefixSpace ) {
		attrsString = ' ' + attrsString;
	}

	return attrsString;
}

export function parseAttributes( attrsObject ) {
	const attrs = {};

	// Parse values
	for ( const name in attrsObject ) {
		let value = attrsObject[ name ];

		if ( isPlainObject( value ) ) {
			value = attributeValue( value );
		}

		if ( value === true ) {
			attrs[ name ] = '';
		} else if ( value ) {
			attrs[ name ] = value;
		}
	}

	return attrs;
}

export function attributeValue( valueObject ) {
	let values = [];

	// Key is attribute value here
	for ( const value in valueObject ) {
		const condition = valueObject[ value ];
		if ( condition || condition === '0' ) {
			// Allow falsy 0 string
			values.push( value );
		}
	}

	values = values.join( ' ' );

	if ( ! values.length ) {
		return null;
	}

	return values;
}

export function isPlainObject( obj ) {
	return toString.call( obj ) === '[object Object]';
}
