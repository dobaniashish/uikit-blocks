import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	InnerBlocks,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import { PanelBody, CheckboxControl } from '@wordpress/components';

import { useSelect } from '@wordpress/data';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const hasInnerBlocks = useSelect(
		( select ) =>
			select( blockEditorStore ).getBlocks( clientId ).length > 0,
		[ clientId ]
	);

	const blockProps = useBlockProps( {
		className: 'uk-open',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'uikit-blocks' ) }>
					<CheckboxControl
						label={ __( 'Keep open initially', 'uikit-blocks' ) }
						checked={ attributes.open || false }
						onChange={ ( value ) => {
							setAttributes( { open: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>

			<li { ...blockProps }>
				<span className="uk-accordion-title">
					<RichText
						aria-label={ __( 'Accordion title', 'uikit-blocks' ) }
						placeholder={ __(
							'Add Accordion title…',
							'uikit-blocks'
						) }
						value={ attributes.title }
						onChange={ ( value ) =>
							setAttributes( { title: value } )
						}
						withoutInteractiveFormatting
					/>
				</span>
				<div { ...innerBlocksProps }></div>
			</li>
		</>
	);
}
