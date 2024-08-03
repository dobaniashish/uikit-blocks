import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	InspectorControls,
	URLInput,
	BlockControls,
	MediaPlaceholder,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	ToolbarButton,
	ToolbarGroup,
	CheckboxControl,
	TextControl,
	Flex,
	FlexBlock,
	Dropdown,
} from '@wordpress/components';

import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { store as noticesStore } from '@wordpress/notices';

import { link } from '@wordpress/icons';

import clsx from 'clsx';

import { humanize } from '../../helpers/util';

import GeneralOptions from '../general-options';
import generalBlockProps from '../general-block-props';

const defaultSizeSlug = 'full';

export default function Edit( { attributes, setAttributes } ) {
	const newTabValue = '_blank';
	const newTabRel = [ 'noreferrer', 'noopener' ];
	const nofollowRel = 'nofollow';

	const nofollow = attributes.rel
		? attributes.rel.split( ' ' ).includes( nofollowRel )
		: false;

	function updateRel( add = [], remove = [] ) {
		let relParts = attributes.rel ? attributes.rel.split( ' ' ) : [];

		relParts.push( ...add );
		relParts = relParts.filter( ( el ) => ! remove.includes( el ) );
		relParts = relParts.filter( ( el ) => el );
		relParts = [ ...new Set( relParts ) ];

		setAttributes( {
			rel: relParts.join( ' ' ),
		} );
	}

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

	const { createErrorNotice } = useDispatch( noticesStore );
	function onUploadError( message ) {
		createErrorNotice( message, { type: 'snackbar' } );
		setAttributes( {
			image: undefined,
		} );
	}

	const blockProps = useBlockProps( {
		...generalBlockProps( attributes ),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'uikit-blocks' ) }>
					<TextControl
						label={ __( 'Alternative text', 'uikit-blocks' ) }
						value={ attributes.imageAlt }
						onChange={ ( value ) =>
							setAttributes( { imageAlt: value } )
						}
					/>
					<TextControl
						label={ __( 'Width', 'uikit-blocks' ) }
						value={ attributes.width }
						type="number"
						onChange={ ( value ) =>
							setAttributes( { width: value } )
						}
					/>
					<TextControl
						label={ __( 'Height', 'uikit-blocks' ) }
						value={ attributes.height }
						type="number"
						onChange={ ( value ) =>
							setAttributes( { height: value } )
						}
					/>
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
							lahelpel={ __(
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
					<SelectControl
						label={ __( 'Box Shadow', 'uikit-blocks' ) }
						value={ attributes.imageBoxShadow }
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
								label: __( 'Large', 'uikit-blocks' ),
								value: 'large',
							},
							{
								label: __( 'X-Large', 'uikit-blocks' ),
								value: 'xlarge',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { imageBoxShadow: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Hover Box Shadow', 'uikit-blocks' ) }
						value={ attributes.imageHoverBoxShadow }
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
								label: __( 'Large', 'uikit-blocks' ),
								value: 'large',
							},
							{
								label: __( 'X-Large', 'uikit-blocks' ),
								value: 'xlarge',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { imageHoverBoxShadow: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="advanced">
				<TextControl
					label={ __( 'Link rel', 'uikit-blocks' ) }
					value={ attributes.rel || '' }
					onChange={ ( value ) => setAttributes( { rel: value } ) }
				/>
			</InspectorControls>

			<BlockControls group="block">
				<Dropdown
					renderToggle={ ( { isOpen, onToggle } ) => (
						<ToolbarButton
							icon={ link }
							title={ __( 'Link', 'uikit-blocks' ) }
							onClick={ onToggle }
							aria-expanded={ isOpen }
							isActive={ !! attributes.url }
						/>
					) }
					renderContent={ () => (
						<div
							style={ {
								maxWidth: '100%',
								minWidth: 'auto',
								width: '250px',
							} }
						>
							<Flex direction="column">
								<FlexBlock>
									<URLInput
										label={ __( 'Url', 'uikit-blocks' ) }
										className="ukb-block-editor-url-input"
										value={ attributes.url }
										onChange={ ( value ) => {
											setAttributes( { url: value } );
										} }
										__nextHasNoMarginBottom
									/>
								</FlexBlock>
								<FlexBlock>
									<SelectControl
										label={ __( 'Target', 'uikit-blocks' ) }
										value={ attributes.target }
										options={ [
											{
												label: __(
													'Same Window',
													'uikit-blocks'
												),
												value: '',
											},
											{
												label: __(
													'New Window',
													'uikit-blocks'
												),
												value: newTabValue,
											},
											{
												label: __(
													'Lightbox',
													'uikit-blocks'
												),
												value: 'lightbox',
											},
										] }
										onChange={ ( value ) => {
											const add =
												value === newTabValue
													? newTabRel
													: [];
											const remove =
												value === newTabValue
													? []
													: newTabRel;
											updateRel( add, remove );

											setAttributes( {
												target: value,
											} );
										} }
									/>
								</FlexBlock>

								{ attributes.target === 'lightbox' && (
									<FlexBlock>
										<SelectControl
											label={ __(
												'Lightbox Type',
												'uikit-blocks'
											) }
											value={ attributes.lightboxType }
											options={ [
												{
													label: __(
														'Default',
														'uikit-blocks'
													),
													value: '',
												},
												{
													label: __(
														'Image',
														'uikit-blocks'
													),
													value: 'image',
												},
												{
													label: __(
														'Video',
														'uikit-blocks'
													),
													value: 'video',
												},
												{
													label: __(
														'Iframe',
														'uikit-blocks'
													),
													value: 'iframe',
												},
											] }
											onChange={ ( value ) => {
												setAttributes( {
													lightboxType: value,
												} );
											} }
										/>
									</FlexBlock>
								) }

								<FlexBlock>
									<CheckboxControl
										label={ __(
											'Mark as nofollow',
											'uikit-blocks'
										) }
										checked={ nofollow }
										onChange={ ( value ) => {
											const add = value
												? [ nofollowRel ]
												: [];
											const remove = value
												? []
												: [ nofollowRel ];
											updateRel( add, remove );
										} }
									/>
								</FlexBlock>
							</Flex>
						</div>
					) }
				></Dropdown>
			</BlockControls>

			{ hasImage && (
				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							onClick={ () => {
								setAttributes( {
									image: undefined,
									imageId: undefined,
									sizeSlug: undefined,
								} );
							} }
						>
							{ __( 'Replace', 'uikit-blocks' ) }
						</ToolbarButton>
					</ToolbarGroup>
				</BlockControls>
			) }

			<GeneralOptions { ...arguments[ 0 ] } />

			<div { ...blockProps }>
				{ ! hasImage && (
					<MediaPlaceholder
						labels={ {
							title: __( 'Image', 'uikit-blocks' ),
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
								imageAlt: '',
							} );
						} }
						onSelectURL={ ( value ) => {
							setAttributes( {
								image: value,
								imageId: undefined,
								sizeSlug: undefined,
								imageAlt: undefined,
							} );
						} }
						onError={ onUploadError }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
					/>
				) }

				{ hasImage && (
					<img
						className={ clsx( {
							[ `uk-box-shadow-${ attributes.imageBoxShadow }` ]:
								attributes.imageBoxShadow,
							[ `uk-box-shadow-hover-${ attributes.imageHoverBoxShadow }` ]:
								attributes.imageHoverBoxShadow,
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
				) }
			</div>
		</>
	);
}
