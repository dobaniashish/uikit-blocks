import { __ } from '@wordpress/i18n';

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
	CheckboxControl,
	TextControl,
	Flex,
	FlexBlock,
	Dropdown,
} from '@wordpress/components';

import { link } from '@wordpress/icons';

import clsx from 'clsx';

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

	const blockProps = useBlockProps( {
		...generalBlockProps( attributes ),
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
					<SelectControl
						label={ __( 'Width', 'uikit-blocks' ) }
						value={ attributes.width }
						options={ [
							{
								label: __( 'Auto', 'uikit-blocks' ),
								value: '',
							},
							{
								label: __( '100% (1-1)', 'uikit-blocks' ),
								value: '1-1',
							},
							{
								label: __( '83% (5-6)', 'uikit-blocks' ),
								value: '5-6',
							},
							{
								label: __( '80% (4-5)', 'uikit-blocks' ),
								value: '4-5',
							},
							{
								label: __( '75% (3-4)', 'uikit-blocks' ),
								value: '3-4',
							},
							{
								label: __( '66% (2-3)', 'uikit-blocks' ),
								value: '2-3',
							},
							{
								label: __( '60% (3-5)', 'uikit-blocks' ),
								value: '3-5',
							},
							{
								label: __( '50% (1-2)', 'uikit-blocks' ),
								value: '1-2',
							},
							{
								label: __( '40% (2-5)', 'uikit-blocks' ),
								value: '2-5',
							},
							{
								label: __( '33% (1-3)', 'uikit-blocks' ),
								value: '1-3',
							},
							{
								label: __( '25% (1-4)', 'uikit-blocks' ),
								value: '1-4',
							},
							{
								label: __( '20% (1-5)', 'uikit-blocks' ),
								value: '1-5',
							},
							{
								label: __( '16% (1-6)', 'uikit-blocks' ),
								value: '1-6',
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
							{
								label: __( '2X-Large', 'uikit-blocks' ),
								value: '2xlarge',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { width: value } );
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

			<GeneralOptions { ...arguments[ 0 ] } />

			<div { ...blockProps }>
				<span
					className={ clsx( {
						[ `uk-button` ]: true,
						[ `uk-button-${ attributes.style }` ]: attributes.style,
						[ `uk-button-${ attributes.size }` ]: attributes.size,
						[ `uk-width-${ attributes.width }` ]: attributes.width,
					} ) }
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
