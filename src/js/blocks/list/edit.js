import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import { PanelBody, SelectControl } from '@wordpress/components';

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
		className: clsx( generalBlockProps.className, 'uk-list', {
			[ `uk-list-${ attributes.marker }` ]: attributes.marker,
			[ `uk-list-${ attributes.markerColor }` ]:
				attributes.marker !== 'bullet' && attributes.markerColor,
			[ `uk-list-${ attributes.style }` ]: attributes.style,
			[ `uk-list-${ attributes.size }` ]: attributes.size,
		} ),
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: [
			[ 'uikit-blocks/list-item' ],
			[ 'uikit-blocks/list-item' ],
			[ 'uikit-blocks/list-item' ],
		],
		renderAppender: hasInnerBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'uikit-blocks' ) }>
					<SelectControl
						label={ __( 'Marker', 'uikit-blocks' ) }
						value={ attributes.marker }
						options={ [
							{
								label: __( 'Default', 'uikit-blocks' ),
								value: '',
							},
							{
								label: __( 'Disc', 'uikit-blocks' ),
								value: 'disc',
							},
							{
								label: __( 'Circle', 'uikit-blocks' ),
								value: 'circle',
							},
							{
								label: __( 'Square', 'uikit-blocks' ),
								value: 'square',
							},
							{
								label: __( 'Decimal', 'uikit-blocks' ),
								value: 'decimal',
							},
							{
								label: __( 'Hyphen', 'uikit-blocks' ),
								value: 'hyphen',
							},
							{
								label: __( 'Image bullet', 'uikit-blocks' ),
								value: 'bullet',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { marker: value } );
						} }
					/>
					{ attributes.marker !== 'bullet' && (
						<SelectControl
							label={ __( 'Marker Color', 'uikit-blocks' ) }
							value={ attributes.markerColor }
							options={ [
								{
									label: __( 'Default', 'uikit-blocks' ),
									value: '',
								},
								{
									label: __( 'Muted', 'uikit-blocks' ),
									value: 'muted',
								},
								{
									label: __( 'Emphasis', 'uikit-blocks' ),
									value: 'emphasis',
								},
								{
									label: __( 'Primary', 'uikit-blocks' ),
									value: 'primary',
								},
								{
									label: __( 'Secondary', 'uikit-blocks' ),
									value: 'secondary',
								},
							] }
							onChange={ ( value ) => {
								setAttributes( { markerColor: value } );
							} }
						/>
					) }
					<SelectControl
						label={ __( 'Style', 'uikit-blocks' ) }
						value={ attributes.style }
						options={ [
							{
								label: __( 'Default', 'uikit-blocks' ),
								value: '',
							},
							{
								label: __( 'Divider', 'uikit-blocks' ),
								value: 'divider',
							},
							{
								label: __( 'Striped', 'uikit-blocks' ),
								value: 'striped',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { style: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Size', 'uikit-blocks' ) }
						value={ attributes.size }
						options={ [
							{
								label: __( 'Default', 'uikit-blocks' ),
								value: '',
							},
							{
								label: __( 'Large', 'uikit-blocks' ),
								value: 'large',
							},
							{
								label: __( 'None', 'uikit-blocks' ),
								value: 'collapse',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { size: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>

			<GeneralOptions { ...arguments[ 0 ] } metadata={ metadata } />

			<ul { ...innerBlocksProps }></ul>
		</>
	);
}
