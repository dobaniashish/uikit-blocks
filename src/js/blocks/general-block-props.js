import clsx from 'clsx';

export default function ( attributes ) {
	return {
		className: clsx( {
			// Text alignment
			[ `uk-text-${ attributes.textAlign }` ]:
				attributes.textAlign && ! attributes.textAlignBreakpoint,
			[ `uk-text-${ attributes.textAlign }@${ attributes.textAlignBreakpoint }` ]:
				attributes.textAlign && attributes.textAlignBreakpoint,
			[ `uk-text-${ attributes.textAlignFallback }` ]:
				attributes.textAlign &&
				attributes.textAlignBreakpoint &&
				attributes.textAlignFallback,

			// Margin
			'uk-margin': attributes.margin && attributes.margin === 'default',
			[ `uk-margin-${ attributes.margin }` ]:
				attributes.margin && attributes.margin !== 'default',
			'uk-margin-remove-top': attributes.marginRemoveTop,
			'uk-margin-remove-bottom': attributes.marginRemoveBottom,
		} ),

		style: {},
	};
}
