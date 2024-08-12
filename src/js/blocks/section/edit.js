import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	InspectorControls,
	MediaPlaceholder,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	CheckboxControl,
	TextControl,
	Button,
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
		className: clsx( generalBlockProps.className, 'uk-section', {
			[ `uk-section-${ attributes.style }` ]: attributes.style,
			[ `uk-${ attributes.colorMode }` ]: attributes.colorMode,
			[ `uk-section-${ attributes.padding }` ]:
				attributes.padding && attributes.padding !== 'remove-vertical',
			'uk-padding-remove-vertical':
				attributes.padding === 'remove-vertical',
			'uk-padding-remove-top':
				attributes.paddingRemoveTop &&
				attributes.padding !== 'remove-vertical',
			'uk-padding-remove-bottom':
				attributes.paddingRemoveBottom &&
				attributes.padding !== 'remove-vertical',
			[ `uk-background-${ attributes.backgroundSize }` ]:
				attributes.background && attributes.backgroundSize,
			[ `uk-background-${ attributes.backgroundPosition }` ]:
				attributes.background && attributes.backgroundPosition,
			'uk-background-norepeat':
				attributes.background && ! attributes.backgroundRepeat,
			'uk-background-fixed':
				attributes.background &&
				attributes.backgroundEffect === 'fixed',
		} ),
		style: {
			...generalBlockProps.style,
			backgroundImage: attributes.background
				? `url(${ attributes.background })`
				: null,
		},
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: [ [ 'uikit-blocks/container' ] ],
		renderAppender: hasInnerBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	} );

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
								label: __( 'Muted', 'uikit-blocks' ),
								value: 'muted',
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
								label: __( 'Blank', 'uikit-blocks' ),
								value: '',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { style: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Color Mode', 'uikit-blocks' ) }
						value={ attributes.colorMode }
						options={ [
							{
								label: __( 'Auto', 'uikit-blocks' ),
								value: '',
							},
							{
								label: __( 'Light', 'uikit-blocks' ),
								value: 'light',
							},
							{
								label: __( 'Dark', 'uikit-blocks' ),
								value: 'dark',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { colorMode: value } );
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
								label: __( 'Remove', 'uikit-blocks' ),
								value: 'remove-vertical',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { padding: value } );
						} }
					/>
					{ attributes.padding !== 'remove-vertical' && (
						<>
							<CheckboxControl
								label={ __(
									'Remove top padding',
									'uikit-blocks'
								) }
								checked={ attributes.paddingRemoveTop }
								onChange={ ( value ) => {
									setAttributes( {
										paddingRemoveTop: value,
									} );
								} }
							/>
							<CheckboxControl
								label={ __(
									'Remove bottom padding',
									'uikit-blocks'
								) }
								checked={ attributes.paddingRemoveBottom }
								onChange={ ( value ) => {
									setAttributes( {
										paddingRemoveBottom: value,
									} );
								} }
							/>
						</>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Background Settings', 'uikit-blocks' ) }
					initialOpen={ false }
				>
					{ ! attributes.background && (
						<MediaPlaceholder
							labels={ {
								title: __( 'Background Image', 'uikit-blocks' ),
							} }
							value={ { src: attributes.background } }
							onSelect={ ( el ) => {
								setAttributes( { background: el.url } );
							} }
							onSelectURL={ ( value ) => {
								setAttributes( { background: value } );
							} }
							onError={ onUploadError }
							accept="image/*"
							allowedTypes={ [ 'image' ] }
						/>
					) }

					{ attributes.background && (
						<>
							<img
								alt={ __( 'Edit image' ) }
								title={ __( 'Edit image' ) }
								src={ attributes.background }
							/>

							<Button
								size="compact"
								onClick={ () => {
									setAttributes( { background: undefined } );
								} }
								variant="link"
								style={ { marginBottom: '24px' } }
							>
								{ __(
									'Remove background image',
									'uikit-blocks'
								) }
							</Button>

							<SelectControl
								label={ __(
									'Background Size',
									'uikit-blocks'
								) }
								value={ attributes.backgroundSize }
								options={ [
									{
										label: __( 'Auto', 'uikit-blocks' ),
										value: '',
									},
									{
										label: __( 'Cover', 'uikit-blocks' ),
										value: 'cover',
									},
									{
										label: __( 'Contain', 'uikit-blocks' ),
										value: 'contain',
									},
								] }
								onChange={ ( value ) => {
									setAttributes( { backgroundSize: value } );
								} }
							/>
							<SelectControl
								label={ __(
									'Background Position',
									'uikit-blocks'
								) }
								value={ attributes.backgroundPosition }
								options={ [
									{
										label: __( 'Auto', 'uikit-blocks' ),
										value: '',
									},
									{
										label: __( 'Top Left', 'uikit-blocks' ),
										value: 'top-left',
									},
									{
										label: __(
											'Top Center',
											'uikit-blocks'
										),
										value: 'top-center',
									},
									{
										label: __(
											'Top Right',
											'uikit-blocks'
										),
										value: 'top-right',
									},
									{
										label: __(
											'Center Left',
											'uikit-blocks'
										),
										value: 'center-left',
									},
									{
										label: __(
											'Center Center',
											'uikit-blocks'
										),
										value: 'center-center',
									},
									{
										label: __(
											'Center Right',
											'uikit-blocks'
										),
										value: 'center-right',
									},
									{
										label: __(
											'Bottom Left',
											'uikit-blocks'
										),
										value: 'bottom-left',
									},
									{
										label: __(
											'Bottom Center',
											'uikit-blocks'
										),
										value: 'bottom-center',
									},
									{
										label: __(
											'Bottom Right',
											'uikit-blocks'
										),
										value: 'bottom-right',
									},
								] }
								onChange={ ( value ) => {
									setAttributes( {
										backgroundPosition: value,
									} );
								} }
							/>
							<CheckboxControl
								label={ __(
									'Repeat background',
									'uikit-blocks'
								) }
								checked={ attributes.backgroundRepeat }
								onChange={ ( value ) => {
									setAttributes( {
										backgroundRepeat: value,
									} );
								} }
							/>
							<SelectControl
								label={ __(
									'Background Effect',
									'uikit-blocks'
								) }
								help={ __(
									'Note: Parallax is not previewed in editor.',
									'uikit-blocks'
								) }
								value={ attributes.backgroundEffect }
								options={ [
									{
										label: __( 'None', 'uikit-blocks' ),
										value: '',
									},
									{
										label: __( 'Fixed', 'uikit-blocks' ),
										value: 'fixed',
									},
									{
										label: __( 'Parallax', 'uikit-blocks' ),
										value: 'parallax',
									},
								] }
								onChange={ ( value ) => {
									setAttributes( {
										backgroundEffect: value,
									} );
								} }
							/>
							{ attributes.backgroundEffect === 'parallax' && (
								<>
									<TextControl
										label={ __(
											'Background Parallax Horizontal',
											'uikit-blocks'
										) }
										value={
											attributes.backgroundParallaxBGX ||
											''
										}
										onChange={ ( value ) =>
											setAttributes( {
												backgroundParallaxBGX: value,
											} )
										}
									/>
									<TextControl
										label={ __(
											'Background Parallax Vertical',
											'uikit-blocks'
										) }
										value={
											attributes.backgroundParallaxBGY ||
											''
										}
										onChange={ ( value ) =>
											setAttributes( {
												backgroundParallaxBGY: value,
											} )
										}
									/>
								</>
							) }
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<GeneralOptions { ...arguments[ 0 ] } metadata={ metadata } />

			<div { ...innerBlocksProps }></div>
		</>
	);
}
