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
	BaseControl,
	Button,
	TextControl,
	Flex,
	FlexBlock,
	Placeholder,
} from '@wordpress/components';

import { trash } from '@wordpress/icons';

import { useDispatch, useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { store as noticesStore } from '@wordpress/notices';

import clsx from 'clsx';

import { humanize } from '../../helpers/util';

import URLControl from '../../components/url-control';

import GeneralOptions from '../general-options';
import useGeneralBlockProps from '../use-general-block-props';

import metadata from './metadata';

const defaultSizeSlug = 'full';

export default function Edit( { attributes, setAttributes, clientId } ) {
	// Main image.
	const hasImage = !! ( attributes.imageId || attributes.image );
	const imageMedia = useSelect( ( select ) =>
		select( coreDataStore ).getMedia( attributes.imageId )
	);

	const imageSizeOptions = [ { value: '', label: 'Default' } ];

	if ( imageMedia?.media_details?.sizes ) {
		imageSizeOptions.push(
			...Object.keys( imageMedia?.media_details?.sizes ).map(
				( slug ) => ( {
					value: slug,
					label: humanize( slug ),
				} )
			)
		);
	}

	const sizeSlug = attributes.sizeSlug || defaultSizeSlug;

	const imageUrl = attributes.imageId
		? imageMedia?.media_details?.sizes?.[ sizeSlug ]?.source_url
		: attributes.image;

	// Hover image.
	const hasHoverImage = !! (
		attributes.hoverImage || attributes.hoverImageId
	);
	const hoverImageMedia = useSelect( ( select ) =>
		select( coreDataStore ).getMedia( attributes.hoverImageId )
	);

	const hoverIimageSizeOptions = [ { value: '', label: 'Default' } ];

	if ( hoverImageMedia?.media_details?.sizes ) {
		hoverIimageSizeOptions.push(
			...Object.keys( hoverImageMedia?.media_details?.sizes ).map(
				( slug ) => ( {
					value: slug,
					label: humanize( slug ),
				} )
			)
		);
	}

	const hoverSizeSlug = attributes.hoverSizeSlug || defaultSizeSlug;

	const hoverImageUrl = attributes.hoverImageId
		? hoverImageMedia?.media_details?.sizes?.[ hoverSizeSlug ]?.source_url
		: attributes.hoverImage;

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

	const blockProps = useBlockProps( {
		...useGeneralBlockProps( attributes, metadata ),
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: clsx( {
				'uk-overlay': true,
				[ `uk-width-${ attributes.overlayWidth }` ]:
					attributes.overlayWidth,
				'uk-padding': ! attributes.overlayPadding,
				[ `uk-padding-${ attributes.overlayPadding }` ]:
					attributes.overlayPadding,
				[ `uk-${ attributes.overlayColorMode }` ]:
					attributes.overlayColorMode,
			} ),
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
				<PanelBody title={ __( 'Image Settings', 'uikit-blocks' ) }>
					<BaseControl>
						<BaseControl.VisualLabel>
							{ __( 'Image', 'uikit-blocks' ) }
						</BaseControl.VisualLabel>

						{ hasImage ? (
							<div className="uk-inline-clip">
								<img
									src={ imageUrl }
									alt={ attributes.imageAlt }
								/>

								<Button
									size="compact"
									onClick={ () => {
										setAttributes( {
											image: undefined,
											imageId: undefined,
											sizeSlug: undefined,
										} );
									} }
									variant="primary"
									isDestructive={ true }
									icon={ trash }
									className="uk-position-top-right"
									description={ __(
										'Remove image',
										'uikit-blocks'
									) }
								></Button>
							</div>
						) : (
							<MediaPlaceholder
								labels={ {
									title: __( 'Select Image', 'uikit-blocks' ),
								} }
								value={ {
									id: attributes.imageId,
									src: attributes.image,
								} }
								onSelect={ ( el ) => {
									setAttributes( {
										image: el.url,
										imageId: el.id,
										sizeSlug: defaultSizeSlug,
									} );
								} }
								onSelectURL={ ( value ) => {
									setAttributes( {
										image: value,
										imageId: undefined,
										sizeSlug: undefined,
									} );
								} }
								onError={ onUploadError }
								accept="image/*"
								allowedTypes={ [ 'image' ] }
							/>
						) }
					</BaseControl>

					<TextControl
						label={ __( 'Alternative text', 'uikit-blocks' ) }
						value={ attributes.imageAlt }
						onChange={ ( value ) =>
							setAttributes( { imageAlt: value } )
						}
					/>

					<BaseControl>
						<Flex>
							<FlexBlock>
								<TextControl
									label={ __( 'Width', 'uikit-blocks' ) }
									value={ attributes.width }
									type="number"
									onChange={ ( value ) =>
										setAttributes( { width: value } )
									}
								/>
							</FlexBlock>
							<FlexBlock>
								<TextControl
									label={ __( 'Height', 'uikit-blocks' ) }
									value={ attributes.height }
									type="number"
									onChange={ ( value ) =>
										setAttributes( { height: value } )
									}
								/>
							</FlexBlock>
						</Flex>
					</BaseControl>

					<CheckboxControl
						label={ __( 'Load image eagerly', 'uikit-blocks' ) }
						help={ __(
							'By default, images are loaded lazy. Enable eager loading for images in the initial viewport.',
							'uikit-blocks'
						) }
						checked={ attributes.loading === 'eager' }
						onChange={ ( value ) => {
							setAttributes( { loading: value ? 'eager' : '' } );
						} }
					/>

					{ imageMedia && imageSizeOptions && (
						<SelectControl
							label={ __( 'Resolution', 'uikit-blocks' ) }
							help={ __(
								'Select the size of the source image.',
								'uikit-blocks'
							) }
							value={ attributes.sizeSlug }
							options={ imageSizeOptions }
							onChange={ ( value ) => {
								setAttributes( { sizeSlug: value } );
							} }
						/>
					) }

					{ attributes.width && attributes.height && (
						<SelectControl
							label={ __( 'Focal Point', 'uikit-blocks' ) }
							value={ attributes.focalPoint }
							options={ [
								{
									label: __( 'Top Left', 'uikit-blocks' ),
									value: 'top-left',
								},
								{
									label: __( 'Top Center', 'uikit-blocks' ),
									value: 'top-center',
								},
								{
									label: __( 'Top Right', 'uikit-blocks' ),
									value: 'top-right',
								},
								{
									label: __( 'Center Left', 'uikit-blocks' ),
									value: 'center-left',
								},
								{
									label: __(
										'Center Center',
										'uikit-blocks'
									),
									value: '',
								},
								{
									label: __( 'Center Right', 'uikit-blocks' ),
									value: 'center-right',
								},
								{
									label: __( 'Bottom Left', 'uikit-blocks' ),
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
									label: __( 'Bottom Right', 'uikit-blocks' ),
									value: 'bottom-right',
								},
							] }
							onChange={ ( value ) => {
								setAttributes( { focalPoint: value } );
							} }
						/>
					) }

					<BaseControl>
						<BaseControl.VisualLabel>
							{ __( 'Hover Image', 'uikit-blocks' ) }
						</BaseControl.VisualLabel>

						{ hasHoverImage ? (
							<div className="uk-inline-clip">
								<img
									src={ hoverImageUrl }
									alt={ attributes.imageAlt }
								/>

								<Button
									size="compact"
									onClick={ () => {
										setAttributes( {
											hoverImage: undefined,
											hoverImageId: undefined,
											hoverSizeSlug: undefined,
										} );
									} }
									variant="primary"
									isDestructive={ true }
									icon={ trash }
									className="uk-position-top-right"
									description={ __(
										'Remove hover image',
										'uikit-blocks'
									) }
								></Button>
							</div>
						) : (
							<MediaPlaceholder
								labels={ {
									title: __(
										'Select Hover Image',
										'uikit-blocks'
									),
								} }
								value={ {
									id: attributes.hoverImageId,
									src: attributes.hoverImage,
								} }
								onSelect={ ( el ) => {
									setAttributes( {
										hoverImage: el.url,
										hoverImageId: el.id,
										sizeSlug: defaultSizeSlug,
									} );
								} }
								onSelectURL={ ( value ) => {
									setAttributes( {
										hoverImage: value,
										hoverImageId: undefined,
										sizeSlug: undefined,
									} );
								} }
								onError={ onUploadError }
								accept="image/*"
								allowedTypes={ [ 'image' ] }
							/>
						) }
					</BaseControl>

					{ hoverImageMedia && hoverIimageSizeOptions && (
						<SelectControl
							label={ __(
								'Hover Image Resolution',
								'uikit-blocks'
							) }
							help={ __(
								'Select the size of the source image.',
								'uikit-blocks'
							) }
							value={ attributes.hoverSizeSlug }
							options={ hoverIimageSizeOptions }
							onChange={ ( value ) => {
								setAttributes( { hoverSizeSlug: value } );
							} }
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Overlay Settings', 'uikit-blocks' ) }>
					<SelectControl
						label={ __( 'Mode', 'uikit-blocks' ) }
						value={ attributes.overlayMode }
						options={ [
							{
								label: __( 'Default', 'uikit-blocks' ),
								value: '',
							},
							{
								label: __( 'Cover', 'uikit-blocks' ),
								value: 'cover',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { overlayMode: value } );
						} }
					/>

					<CheckboxControl
						label={ __( 'Show overlay on hover', 'uikit-blocks' ) }
						help={ __(
							'Note: Overlay on hover is not previewed in editor.',
							'uikit-blocks'
						) }
						checked={ attributes.overlayHover }
						onChange={ ( value ) => {
							setAttributes( { overlayHover: value } );
						} }
					/>

					<SelectControl
						label={ __( 'Style', 'uikit-blocks' ) }
						value={ attributes.overlayStyle }
						options={ [
							{
								label: __( 'Default', 'uikit-blocks' ),
								value: '',
							},
							{
								label: __( 'Overlay Default', 'uikit-blocks' ),
								value: 'overlay-default',
							},
							{
								label: __( 'Overlay Primary', 'uikit-blocks' ),
								value: 'overlay-primary',
							},
							{
								label: __( 'Tile Default', 'uikit-blocks' ),
								value: 'tile-default',
							},
							{
								label: __( 'Tile Muted', 'uikit-blocks' ),
								value: 'tile-muted',
							},
							{
								label: __( 'Tile Primary', 'uikit-blocks' ),
								value: 'tile-primary',
							},
							{
								label: __( 'Tile Secondary', 'uikit-blocks' ),
								value: 'tile-secondary',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { overlayStyle: value } );
						} }
					/>

					<SelectControl
						label={ __( 'Margin', 'uikit-blocks' ) }
						value={ attributes.overlayMargin }
						options={ [
							{
								label: __( 'None', 'uikit-blocks' ),
								value: '',
							},
							{
								label: __( 'Small', 'uikit-blocks' ),
								value: 'small',
							},
							{
								label: __( 'Medium', 'uikit-blocks' ),
								value: 'medium',
							},
							{
								label: __( 'large', 'uikit-blocks' ),
								value: 'large',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { overlayMargin: value } );
						} }
					/>

					<SelectControl
						label={ __( 'Padding', 'uikit-blocks' ) }
						value={ attributes.overlayPadding }
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
								label: __( 'Medium', 'uikit-blocks' ),
								value: 'medium',
							},
							{
								label: __( 'Remove', 'uikit-blocks' ),
								value: 'remove',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { overlayPadding: value } );
						} }
					/>

					<SelectControl
						label={ __( 'Position', 'uikit-blocks' ) }
						value={ attributes.overlayPosition }
						options={ [
							{
								label: __( 'Top', 'uikit-blocks' ),
								value: 'top',
							},
							{
								label: __( 'Left', 'uikit-blocks' ),
								value: 'left',
							},
							{
								label: __( 'Right', 'uikit-blocks' ),
								value: 'right',
							},
							{
								label: __( 'Bottom', 'uikit-blocks' ),
								value: 'bottom',
							},
							{
								label: __( 'Center', 'uikit-blocks' ),
								value: 'center',
							},
							{
								label: __( 'Top Left', 'uikit-blocks' ),
								value: 'top-left',
							},
							{
								label: __( 'Top Center', 'uikit-blocks' ),
								value: 'top-center',
							},
							{
								label: __( 'Top Right', 'uikit-blocks' ),
								value: 'top-right',
							},
							{
								label: __( 'Center Left', 'uikit-blocks' ),
								value: 'center-left',
							},
							{
								label: __( 'Center Right', 'uikit-blocks' ),
								value: 'center-right',
							},
							{
								label: __( 'Bottom Left', 'uikit-blocks' ),
								value: 'bottom-left',
							},
							{
								label: __( 'Bottom Center', 'uikit-blocks' ),
								value: 'bottom-center',
							},
							{
								label: __( 'Bottom Right', 'uikit-blocks' ),
								value: 'bottom-right',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { overlayPosition: value } );
						} }
					/>

					{ ! [ 'top', 'left' ].includes(
						attributes.overlayPosition
					) && (
						<SelectControl
							label={ __( 'Width', 'uikit-blocks' ) }
							value={ attributes.overlayWidth }
							options={ [
								{
									label: __( 'Auto', 'uikit-blocks' ),
									value: '',
								},
								{
									label: __( 'Small', 'uikit-blocks' ),
									value: 'small',
								},
								{
									label: __( 'Medium', 'uikit-blocks' ),
									value: 'medium',
								},
								{
									label: __( 'Large', 'uikit-blocks' ),
									value: 'large',
								},
								{
									label: __( 'XLarge', 'uikit-blocks' ),
									value: 'xlarge',
								},
							] }
							onChange={ ( value ) => {
								setAttributes( { overlayWidth: value } );
							} }
						/>
					) }

					<SelectControl
						label={ __( 'Color Mode', 'uikit-blocks' ) }
						value={ attributes.overlayColorMode }
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
							setAttributes( { overlayColorMode: value } );
						} }
					/>

					{ attributes.overlayHover && (
						<>
							<SelectControl
								label={ __( 'Transition', 'uikit-blocks' ) }
								value={ attributes.overlayTransition }
								options={ [
									{
										label: __( 'Fade', 'uikit-blocks' ),
										value: 'fade',
									},
									{
										label: __( 'Scale Up', 'uikit-blocks' ),
										value: 'scale-up',
									},
									{
										label: __(
											'Scale Down',
											'uikit-blocks'
										),
										value: 'scale-down',
									},
									{
										label: __(
											'Slide Top',
											'uikit-blocks'
										),
										value: 'slide-top',
									},
									{
										label: __(
											'Slide Bottom',
											'uikit-blocks'
										),
										value: 'slide-bottom',
									},
									{
										label: __(
											'Slide Left',
											'uikit-blocks'
										),
										value: 'slide-left',
									},
									{
										label: __(
											'Slide Right',
											'uikit-blocks'
										),
										value: 'slide-right',
									},
									{
										label: __(
											'Slide Top Small',
											'uikit-blocks'
										),
										value: 'slide-top-small',
									},
									{
										label: __(
											'Slide Bottom Small',
											'uikit-blocks'
										),
										value: 'slide-bottom-small',
									},
									{
										label: __(
											'Slide Left Small',
											'uikit-blocks'
										),
										value: 'slide-left-small',
									},
									{
										label: __(
											'Slide Right Small',
											'uikit-blocks'
										),
										value: 'slide-right-small',
									},
									{
										label: __(
											'Slide Top Medium',
											'uikit-blocks'
										),
										value: 'slide-top-medium',
									},
									{
										label: __(
											'Slide Bottom Medium',
											'uikit-blocks'
										),
										value: 'slide-bottom-medium',
									},
									{
										label: __(
											'Slide Left Medium',
											'uikit-blocks'
										),
										value: 'slide-left-medium',
									},
									{
										label: __(
											'Slide Right Medium',
											'uikit-blocks'
										),
										value: 'slide-right-medium',
									},
								] }
								onChange={ ( value ) => {
									setAttributes( {
										overlayTransition: value,
									} );
								} }
							/>

							<SelectControl
								label={ __(
									'Image Transition',
									'uikit-blocks'
								) }
								value={ attributes.overlayImageTransition }
								options={ [
									{
										label: __( 'Fade', 'uikit-blocks' ),
										value: '',
									},
									{
										label: __( 'Scale Up', 'uikit-blocks' ),
										value: 'scale-up',
									},
									{
										label: __(
											'Scale Down',
											'uikit-blocks'
										),
										value: 'scale-down',
									},
								] }
								onChange={ ( value ) => {
									setAttributes( {
										overlayImageTransition: value,
									} );
								} }
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<URLControl
				attributes={ {
					url: attributes.url,
					target: attributes.target,
					rel: attributes.rel,
				} }
				onChange={ ( value ) => setAttributes( { ...value } ) }
				lightbox={ false }
			/>

			<GeneralOptions { ...arguments[ 0 ] } metadata={ metadata } />

			<div { ...blockProps }>
				<div className="uk-inline-clip uk-transition-toggle">
					{ hasImage ? (
						<img
							className={ clsx( {
								'uk-object-cover':
									attributes.width && attributes.height,
								[ `uk-object-${ attributes.focalPoint }` ]:
									attributes.width &&
									attributes.height &&
									attributes.focalPoint,
							} ) }
							src={ imageUrl }
							width={ attributes.width }
							height={ attributes.height }
							alt={ attributes.imageAlt }
							style={ {
								aspectRatio:
									attributes.width && attributes.height
										? `${ attributes.width } / ${ attributes.height }`
										: null,
							} }
						/>
					) : (
						<Placeholder
							withIllustration
							style={ {
								width: attributes.width || '2000px',
								height: attributes.height || '400px',
								maxWidth: '100%',
							} }
						/>
					) }

					{ hasHoverImage && (
						<img
							className={ clsx( {
								'uk-transition-fade': true,
								'uk-object-cover':
									attributes.width && attributes.height,
								[ `uk-object-${ attributes.focalPoint }` ]:
									attributes.width &&
									attributes.height &&
									attributes.focalPoint,
							} ) }
							data-uk-cover=""
							src={ hoverImageUrl }
							width={ attributes.width }
							height={ attributes.height }
							alt={ attributes.imageAlt }
							style={ {
								aspectRatio:
									attributes.width && attributes.height
										? `${ attributes.width } / ${ attributes.height }`
										: null,
							} }
						/>
					) }

					{ /* Cover. */ }
					{ attributes.overlayMode === 'cover' && (
						<div
							className={ clsx( {
								'uk-position-cover': true,
								[ `uk-position-${ attributes.overlayMargin }` ]:
									attributes.overlayMargin,
								'uk-overlay': true,
								[ `uk-${ attributes.overlayStyle }` ]:
									attributes.overlayStyle,
								'uk-padding': ! attributes.overlayPadding,
								[ `uk-padding-${ attributes.overlayPadding }` ]:
									attributes.overlayPadding,
							} ) }
						></div>
					) }

					{ /* Position. */ }
					<div
						className={ clsx( {
							[ `uk-position-${ attributes.overlayPosition }` ]:
								attributes.overlayPosition,
							[ `uk-position-${ attributes.overlayMargin }` ]:
								attributes.overlayMargin,
							[ `uk-${ attributes.overlayStyle }` ]:
								attributes.overlayStyle &&
								attributes.overlayMode !== 'cover',
						} ) }
					>
						{ /* Overlay. */ }
						<div { ...innerBlocksProps }></div>
					</div>
				</div>
			</div>
		</>
	);
}
