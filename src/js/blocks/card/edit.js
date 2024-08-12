import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	useInnerBlocksProps,
	MediaPlaceholder,
	InnerBlocks,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	CheckboxControl,
	Button,
	TextControl,
} from '@wordpress/components';

import { useDispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

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

	const { createErrorNotice } = useDispatch( noticesStore );
	function onUploadError( message ) {
		createErrorNotice( message, { type: 'snackbar' } );
		setAttributes( {
			background: undefined,
		} );
	}

	const generalBlockProps = useGeneralBlockProps( attributes, metadata );

	const blockProps = useBlockProps( {
		...generalBlockProps,
		className: clsx( generalBlockProps.className, 'uk-card', {
			[ `uk-card-${ attributes.style }` ]: attributes.style,
			[ `uk-card-${ attributes.padding }` ]: attributes.padding,
			'uk-card-hover': attributes.hover,
		} ),
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'uk-card-body',
		},
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
					<SelectControl
						label={ __( 'Style', 'uikit-blocks' ) }
						value={ attributes.style }
						options={ [
							{
								label: __( 'Default', 'uikit-blocks' ),
								value: 'default',
							},
							{
								label: __( 'Primary', 'uikit-blocks' ),
								value: 'primary',
							},
							{
								label: __( 'Secondary', 'uikit-blocks' ),
								value: 'secondary',
							},
							{
								label: __( 'None', 'uikit-blocks' ),
								value: '',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { style: value } );
						} }
					/>
					<CheckboxControl
						label={ __( 'Hover effect', 'uikit-blocks' ) }
						checked={ attributes.hover || false }
						onChange={ ( value ) => {
							setAttributes( { hover: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Padding', 'uikit-blocks' ) }
						value={ attributes.padding }
						options={ [
							{
								label: __( 'Default', 'uikit-blocks' ),
								value: '',
							},
							{
								label: __( 'Small', 'uikit-blocks' ),
								value: 'small',
							},
							{
								label: __( 'Large', 'uikit-blocks' ),
								value: 'large',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { padding: value } );
						} }
					/>

					{ ! attributes.image && (
						<MediaPlaceholder
							labels={ {
								title: __( 'Image', 'uikit-blocks' ),
							} }
							value={ { src: attributes.image } }
							onSelect={ ( el ) => {
								setAttributes( { image: el.url } );
							} }
							onSelectURL={ ( value ) => {
								setAttributes( { image: value } );
							} }
							onError={ onUploadError }
							accept="image/*"
							allowedTypes={ [ 'image' ] }
						/>
					) }

					{ attributes.image && (
						<>
							<img
								alt={ __( 'Edit image' ) }
								title={ __( 'Edit image' ) }
								src={ attributes.image }
							/>

							<Button
								size="compact"
								onClick={ () => {
									setAttributes( { image: undefined } );
								} }
								variant="link"
								style={ { marginBottom: '24px' } }
							>
								{ __( 'Remove image', 'uikit-blocks' ) }
							</Button>

							<TextControl
								label={ __( 'Image alt text', 'uikit-blocks' ) }
								help={ __(
									'Enter value for CSS left property.',
									'uikit-blocks'
								) }
								value={ attributes.imageAlt || '' }
								onChange={ ( value ) =>
									setAttributes( {
										imageAlt: value,
									} )
								}
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<GeneralOptions { ...arguments[ 0 ] } metadata={ metadata } />

			<div { ...blockProps }>
				{ attributes.image && (
					<div className="uk-card-media-top">
						<img
							src={ attributes.image }
							alt={ attributes.imageAlt }
						/>
					</div>
				) }

				<div { ...innerBlocksProps }></div>
			</div>
		</>
	);
}
