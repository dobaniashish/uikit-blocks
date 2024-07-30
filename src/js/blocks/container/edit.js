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
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';

import clsx from 'clsx';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const hasInnerBlocks = useSelect(
		( select ) =>
			select( blockEditorStore ).getBlocks( clientId ).length > 0,
		[ clientId ]
	);

	const blockProps = useBlockProps( {
		className: clsx( {
			'uk-container': attributes.width !== 'none',
			[ `uk-container-${ attributes.width }` ]:
				attributes.width && attributes.width !== 'none',
			'uk-container-expand-left':
				attributes.width !== 'none' && attributes.expandLeft,
			'uk-container-expand-right':
				attributes.width !== 'none' && attributes.expandRight,
		} ),
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		renderAppender: hasInnerBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'uikit-blocks' ) }>
					<SelectControl
						label={ __( 'Width', 'uikit-blocks' ) }
						value={ attributes.width }
						options={ [
							{
								label: __( 'Default', 'uikit-blocks' ),
								value: '',
							},
							{
								label: __( 'Extra Small', 'uikit-blocks' ),
								value: 'xsmall',
							},
							{
								label: __( 'Small', 'uikit-blocks' ),
								value: 'small',
							},
							{
								label: __( 'Large', 'uikit-blocks' ),
								value: 'large',
							},
							{
								label: __( 'Extra Large', 'uikit-blocks' ),
								value: 'xlarge',
							},
							{
								label: __( 'Expand', 'uikit-blocks' ),
								value: 'expand',
							},
							{
								label: __( 'None', 'uikit-blocks' ),
								value: 'none',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { width: value } );
						} }
					/>
					{ attributes.width !== 'none' && (
						<>
							<CheckboxControl
								label={ __( 'Expand Left', 'uikit-blocks' ) }
								checked={ attributes.expandLeft || false }
								onChange={ ( value ) => {
									setAttributes( {
										expandLeft: value,
									} );
								} }
							/>
							<CheckboxControl
								label={ __( 'Expand Right', 'uikit-blocks' ) }
								checked={ attributes.expandRight || false }
								onChange={ ( value ) => {
									setAttributes( {
										expandRight: value,
									} );
								} }
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...innerBlocksProps }></div>
		</>
	);
}
