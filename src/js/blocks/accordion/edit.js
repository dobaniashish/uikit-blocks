import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	CheckboxControl,
	TextControl,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';

import clsx from 'clsx';

import GeneralOptions from '../general-options';
import useGeneralBlockProps from '../use-general-block-props';

import metadata from './metadata';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const hasInnerBlocks = useSelect(
		( select ) =>
			select( blockEditorStore ).getBlocks( clientId ).length > 0,
		[ clientId ]
	);

	const generalBlockProps = useGeneralBlockProps( attributes, metadata );

	const blockProps = useBlockProps( {
		...generalBlockProps,
		className: clsx( generalBlockProps.className, 'uk-accordion' ),
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: [
			[ 'uikit-blocks/accordion-item', { title: 'Item 1' } ],
			[ 'uikit-blocks/accordion-item', { title: 'Item 2' } ],
			[ 'uikit-blocks/accordion-item', { title: 'Item 3' } ],
		],
		renderAppender: hasInnerBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'uikit-blocks' ) }>
					<CheckboxControl
						label={ __( 'Enable collapsing', 'uikit-blocks' ) }
						checked={ attributes.collapsible }
						onChange={ ( value ) => {
							setAttributes( { collapsible: value } );
						} }
					/>
					<CheckboxControl
						label={ __( 'Allow multiple open', 'uikit-blocks' ) }
						checked={ attributes.multiple }
						onChange={ ( value ) => {
							setAttributes( { multiple: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Transition', 'uikit-blocks' ) }
						value={ attributes.transition }
						options={ [
							{
								label: __( 'Default', 'uikit-blocks' ),
								value: '',
							},
							{
								label: __( 'Linear', 'uikit-blocks' ),
								value: 'linear',
							},
							{
								label: __( 'Ease', 'uikit-blocks' ),
								value: 'ease',
							},
							{
								label: __( 'Ease In', 'uikit-blocks' ),
								value: 'ease-in',
							},
							{
								label: __( 'Ease In Out', 'uikit-blocks' ),
								value: 'ease-in-out',
							},
							{
								label: __( 'Ease Out', 'uikit-blocks' ),
								value: 'ease-out',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { transition: value } );
						} }
					/>
					<TextControl
						label={ __( 'Transition duration', 'uikit-blocks' ) }
						value={ attributes.duration || '' }
						onChange={ ( value ) =>
							setAttributes( {
								duration: value,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<GeneralOptions { ...arguments[ 0 ] } metadata={ metadata } />

			<ul { ...innerBlocksProps }></ul>
		</>
	);
}
