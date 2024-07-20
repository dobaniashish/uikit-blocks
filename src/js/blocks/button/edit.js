import { __ } from '@wordpress/i18n';

import { useEffect, useState } from '@wordpress/element';

import {
	useBlockProps,
	RichText,
	InspectorControls,
	URLInput,
	BlockControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	ToolbarButton,
	Popover,
	CheckboxControl,
	TextControl,
	Flex,
	FlexBlock,
} from '@wordpress/components';

import { link, linkOff } from '@wordpress/icons';

import clsx from 'clsx';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const newTabValue = '_blank';
	const newTabRel = [ 'noreferrer', 'noopener' ];
	const nofollowRel = 'nofollow';

	const [ popoverAnchor, setPopoverAnchor ] = useState();
	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! attributes.url;

	const nofollow = attributes.rel
		? attributes.rel.split( ' ' ).includes( nofollowRel )
		: false;

	function startEditing( event ) {
		event.preventDefault();
		setIsEditingURL( true );
	}

	function unlink() {
		setAttributes( {
			url: undefined,
		} );
		setIsEditingURL( false );
	}

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

	useEffect( () => {
		if ( ! isSelected ) {
			setIsEditingURL( false );
		}
	}, [ isSelected ] );

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
								label: __( 'Danger', 'uikit-blocks' ),
								value: 'danger',
							},
							{
								label: __( 'Text', 'uikit-blocks' ),
								value: 'text',
							},
							{
								label: __( 'Link', 'uikit-blocks' ),
								value: 'link',
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
								label: __( 'Small', 'uikit-blocks' ),
								value: 'small',
							},
							{
								label: __( 'Large', 'uikit-blocks' ),
								value: 'large',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { size: value } );
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
				{ ! isURLSet && (
					<ToolbarButton
						name="link"
						icon={ link }
						title={ __( 'Link', 'uikit-blocks' ) }
						onClick={ startEditing }
					/>
				) }
				{ isURLSet && (
					<ToolbarButton
						name="link"
						icon={ linkOff }
						title={ __( 'Unlink', 'uikit-blocks' ) }
						onClick={ unlink }
						isActive
					/>
				) }
			</BlockControls>

			{ isSelected && ( isEditingURL || isURLSet ) && (
				<Popover
					placement="bottom"
					anchor={ popoverAnchor }
					onClose={ () => {
						setIsEditingURL( false );
					} }
					focusOnMount={ isEditingURL ? 'firstElement' : false }
				>
					<div style={ { padding: '10px' } }>
						<Flex direction="column">
							<FlexBlock>
								<URLInput
									label={ __( 'Url', 'uikit-blocks' ) }
									value={ attributes.url }
									onChange={ ( value ) => {
										setAttributes( { url: value } );
									} }
									onKeyDown={ () => {
										setIsEditingURL( true );
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
				</Popover>
			) }

			<div { ...useBlockProps() }>
				<span
					className={ clsx( {
						[ `ukb-button` ]: true,
						[ `ukb-button-${ attributes.style }` ]:
							attributes.style,
						[ `ukb-button-${ attributes.size }` ]: attributes.size,
					} ) }
					ref={ setPopoverAnchor }
				>
					<RichText
						aria-label={ __( 'Button text', 'uikit-blocks' ) }
						placeholder={ __( 'Add text…', 'uikit-blocks' ) }
						value={ attributes.text }
						onChange={ ( value ) =>
							setAttributes( { text: value } )
						}
						withoutInteractiveFormatting
					/>
				</span>
			</div>
		</>
	);
}
