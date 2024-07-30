import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	InspectorControls,
	URLInput,
	BlockControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	ToolbarButton,
	CheckboxControl,
	TextControl,
	Flex,
	FlexBlock,
	Dropdown,
} from '@wordpress/components';

import { link } from '@wordpress/icons';

import clsx from 'clsx';

import UIkitIconInput from '../../components/uikit-icon-input';

import GeneralOptions from '../general-options';
import generalBlockProps from '../general-block-props';

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

	const iconAttributes = {
		className: clsx( {
			[ `uk-icon` ]: true,
			[ `uk-text-${ attributes.color }` ]: attributes.color,
			[ `uk-${ attributes.linkStyle }` ]:
				attributes.linkStyle && !! attributes.url,
		} ),
		'data-uk-icon': clsx( {
			[ `icon: ${ attributes.icon || 'star' };` ]: true,
			[ `width: ${ attributes.size };` ]:
				attributes.size && attributes.linkStyle !== 'icon-button',
			[ `height: ${ attributes.size };` ]:
				attributes.size && attributes.linkStyle !== 'icon-button',
			'width: 20;': attributes.linkStyle === 'icon-button',
			'height: 20;': attributes.linkStyle === 'icon-button',
		} ),
	};

	const blockProps = useBlockProps( {
		...generalBlockProps( attributes ),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'uikit-blocks' ) }>
					<UIkitIconInput
						label={ __( 'Icon', 'uikit-blocks' ) }
						help={ __(
							'Enter icon name from UIkit or select one.',
							'uikit-blocks'
						) }
						value={ attributes.icon || '' }
						onChange={ ( value ) =>
							setAttributes( { icon: value } )
						}
					/>
					<TextControl
						label={ __( 'Size', 'uikit-blocks' ) }
						help={ __(
							'Icon size in px without unit.',
							'uikit-blocks'
						) }
						type="number"
						value={ attributes.size || '' }
						onChange={ ( value ) =>
							setAttributes( { size: value } )
						}
					/>
					<SelectControl
						label={ __( 'Color', 'uikit-blocks' ) }
						value={ attributes.color }
						options={ [
							{
								label: __( 'None', 'uikit-blocks' ),
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
							{
								label: __( 'Success', 'uikit-blocks' ),
								value: 'success',
							},
							{
								label: __( 'Warning', 'uikit-blocks' ),
								value: 'warning',
							},
							{
								label: __( 'Danger', 'uikit-blocks' ),
								value: 'danger',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { color: value } );
						} }
					/>
					{ !! attributes.url && (
						<SelectControl
							label={ __( 'Link Style', 'uikit-blocks' ) }
							value={ attributes.linkStyle }
							options={ [
								{
									label: __( 'Link', 'uikit-blocks' ),
									value: '',
								},
								{
									label: __( 'Icon Link', 'uikit-blocks' ),
									value: 'icon-link',
								},
								{
									label: __( 'Icon Button', 'uikit-blocks' ),
									value: 'icon-button',
								},
								{
									label: __( 'Link Muted', 'uikit-blocks' ),
									value: 'link-muted',
								},
								{
									label: __( 'Link Text', 'uikit-blocks' ),
									value: 'link-text',
								},
								{
									label: __( 'Link Reset', 'uikit-blocks' ),
									value: 'link-reset',
								},
							] }
							onChange={ ( value ) => {
								setAttributes( { linkStyle: value } );
							} }
						/>
					) }
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

			<GeneralOptions { ...arguments[ 0 ] } />

			<div { ...blockProps }>
				{ !! attributes.url && (
					// eslint-disable-next-line jsx-a11y/anchor-is-valid
					<a href="#" { ...iconAttributes } aria-label="icon"></a>
				) }
				{ ! attributes.url && <span { ...iconAttributes }></span> }
			</div>
		</>
	);
}
