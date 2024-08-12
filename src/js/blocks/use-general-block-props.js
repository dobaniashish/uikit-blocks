import clsx from 'clsx';

export default function useGeneralBlockProps( attributes, metadata ) {
	const margin = 'generalMargin' in metadata.attributes;
	const textAlign = 'generalTextAlign' in metadata.attributes;

	return {
		className: clsx(
			textAlign && {
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
			},
			margin && {
				// Margin
				'uk-margin':
					attributes.generalMargin &&
					attributes.generalMargin === 'default',
				[ `uk-margin-${ attributes.generalMargin }` ]:
					attributes.generalMargin &&
					attributes.generalMargin !== 'default',
				'uk-margin-remove-top': attributes.generalMarginRemoveTop,
				'uk-margin-remove-bottom': attributes.generalMarginRemoveTop,
			}
		),

		style: {},
	};
}
