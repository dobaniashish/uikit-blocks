import clsx from 'clsx';

export default function ( attributes ) {
	return {
		className: clsx( {
			// Text alignment
			[ `uk-text-${ attributes.generalTextAlign }` ]:
				attributes.generalTextAlign &&
				! attributes.generalTextAlignBreakpoint,
			[ `uk-text-${ attributes.generalTextAlign }@${ attributes.generalTextAlignBreakpoint }` ]:
				attributes.generalTextAlign &&
				attributes.generalTextAlignBreakpoint,
			[ `uk-text-${ attributes.generalTextAlignFallback }` ]:
				attributes.generalTextAlign &&
				attributes.generalTextAlignBreakpoint &&
				attributes.generalTextAlignFallback,

			// Margin
			'uk-margin':
				attributes.generalMargin &&
				attributes.generalMargin === 'default',
			[ `uk-margin-${ attributes.generalMargin }` ]:
				attributes.generalMargin &&
				attributes.generalMargin !== 'default',
			'uk-margin-remove-top': attributes.generalMarginRemoveTop,
			'uk-margin-remove-bottom': attributes.generalMarginRemoveTop,
		} ),

		style: {},
	};
}
