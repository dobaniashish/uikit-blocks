import clsx from 'clsx';

export default function ( attributes ) {
	return {
		className: clsx( {
			// Text alignment
			[ `ukb-text-${ attributes.textAlign }` ]:
				attributes.textAlign && ! attributes.textAlignBreakpoint,
			[ `ukb-text-${ attributes.textAlign }@${ attributes.textAlignBreakpoint }` ]:
				attributes.textAlign && attributes.textAlignBreakpoint,
			[ `ukb-text-${ attributes.textAlignFallback }` ]:
				attributes.textAlign &&
				attributes.textAlignBreakpoint &&
				attributes.textAlignFallback,

			// Margin
			'ukb-margin': attributes.margin && attributes.margin === 'default',
			[ `ukb-margin-${ attributes.margin }` ]:
				attributes.margin && attributes.margin !== 'default',
			'ukb-margin-remove-top': attributes.marginRemoveTop,
			'ukb-margin-remove-bottom': attributes.marginRemoveBottom,
		} ),

		style: {},
	};
}
