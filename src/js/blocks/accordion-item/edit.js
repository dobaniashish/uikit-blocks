import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
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

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'uikit-blocks' ) }>
					<CheckboxControl
						label={ __( 'Keep open', 'uikit-blocks' ) }
						checked={ attributes.open }
						onChange={ ( value ) => {
							setAttributes( { open: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>

			<li
				{ ...useBlockProps( {
					className: 'uk-open',
				} ) }
			>
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
				<div className="uk-accordion-content">
					<InnerBlocks
						renderAppender={
							hasInnerBlocks
								? undefined
								: () => <InnerBlocks.ButtonBlockAppender />
						}
					/>
				</div>
			</li>
		</>
	);
}
