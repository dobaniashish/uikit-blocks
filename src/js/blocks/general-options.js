import { __ } from '@wordpress/i18n';

import { InspectorControls, BlockControls } from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	TextControl,
	Dropdown,
	ToolbarButton,
	CheckboxControl,
} from '@wordpress/components';

import {
	alignNone,
	alignLeft,
	alignCenter,
	alignRight,
	alignJustify,
} from '@wordpress/icons';

const alignmentIcons = {
	left: alignLeft,
	center: alignCenter,
	right: alignRight,
	justify: alignJustify,
};

const animationOptions = [
	{
		label: __( 'Fade', 'uikit-blocks' ),
		value: 'fade',
	},
	{
		label: __( 'Scale Up', 'uikit-blocks' ),
		value: 'scale-up',
	},
	{
		label: __( 'Scale Down', 'uikit-blocks' ),
		value: 'scale-down',
	},
	{
		label: __( 'Slide Top', 'uikit-blocks' ),
		value: 'slide-top',
	},
	{
		label: __( 'Slide Bottom', 'uikit-blocks' ),
		value: 'slide-bottom',
	},
	{
		label: __( 'Slide Left', 'uikit-blocks' ),
		value: 'slide-left',
	},
	{
		label: __( 'Slide Right', 'uikit-blocks' ),
		value: 'slide-right',
	},
	{
		label: __( 'Slide Top Small', 'uikit-blocks' ),
		value: 'slide-top-small',
	},
	{
		label: __( 'Slide Bottom Small', 'uikit-blocks' ),
		value: 'slide-bottom-small',
	},
	{
		label: __( 'Slide Left Small', 'uikit-blocks' ),
		value: 'slide-left-small',
	},
	{
		label: __( 'Slide Right Small', 'uikit-blocks' ),
		value: 'slide-right-small',
	},
	{
		label: __( 'Slide Top Medium', 'uikit-blocks' ),
		value: 'slide-top-medium',
	},
	{
		label: __( 'Slide Bottom Medium', 'uikit-blocks' ),
		value: 'slide-bottom-medium',
	},
	{
		label: __( 'Slide Left Medium', 'uikit-blocks' ),
		value: 'slide-left-medium',
	},
	{
		label: __( 'Slide Right Medium', 'uikit-blocks' ),
		value: 'slide-right-medium',
	},
];

const transitionOptions = [
	{
		label: __( 'None', 'uikit-blocks' ),
		value: '',
	},
	...animationOptions,
];

export default function ( { attributes, setAttributes, metadata } ) {
	const margin = 'generalMargin' in metadata.attributes;
	const textAlign = 'generalTextAlign' in metadata.attributes;
	const visiblity = 'generalVisiblity' in metadata.attributes;
	const position = 'generalPosition' in metadata.attributes;
	const scrollspy = 'generalScrollspy' in metadata.attributes;
	const transition = 'generalTransitionHover' in metadata.attributes;
	const effect = 'generalEffect' in metadata.attributes;

	return (
		<>
			{ ( margin || visiblity || position ) && (
				<InspectorControls>
					<PanelBody
						title={ __( 'General Settings', 'uikit-blocks' ) }
						initialOpen={ false }
					>
						{ /* Margin */ }
						{ margin && (
							<>
								<SelectControl
									label={ __( 'Margin', 'uikit-blocks' ) }
									help={ __(
										"Set the vertical margin. The first element's top margin and last element's bottom margin are always removed by UIkit.",
										'uikit-blocks'
									) }
									value={ attributes.generalMargin }
									options={ [
										{
											label: __(
												'Keep Defaults',
												'uikit-blocks'
											),
											value: '',
										},
										{
											label: __(
												'Small',
												'uikit-blocks'
											),
											value: 'small',
										},
										{
											label: __(
												'Default',
												'uikit-blocks'
											),
											value: 'default',
										},
										{
											label: __(
												'Medium',
												'uikit-blocks'
											),
											value: 'medium',
										},
										{
											label: __(
												'Large',
												'uikit-blocks'
											),
											value: 'large',
										},
										{
											label: __(
												'XLarge',
												'uikit-blocks'
											),
											value: 'xlarge',
										},
										{
											label: __(
												'Remove',
												'uikit-blocks'
											),
											value: 'remove-vertical',
										},
									] }
									onChange={ ( value ) => {
										setAttributes( {
											generalMargin: value,
										} );
									} }
								/>
								<CheckboxControl
									label={ __(
										'Remove top margin',
										'uikit-blocks'
									) }
									checked={
										attributes.generalMarginRemoveTop
									}
									onChange={ ( value ) => {
										setAttributes( {
											generalMarginRemoveTop: value,
										} );
									} }
								/>
								<CheckboxControl
									label={ __(
										'Remove bottom margin',
										'uikit-blocks'
									) }
									checked={
										attributes.generalMarginRemoveBottom
									}
									onChange={ ( value ) => {
										setAttributes( {
											generalMarginRemoveBottom: value,
										} );
									} }
								/>
							</>
						) }

						{ /* Visiblity */ }
						{ visiblity && (
							<>
								<SelectControl
									label={ __( 'Visiblity', 'uikit-blocks' ) }
									help={ __(
										'Show or hide the element on this device width and larger. Note: Visiblity is not previewed in editor.',
										'uikit-blocks'
									) }
									value={ attributes.generalVisiblity }
									options={ [
										{
											label: __(
												'Always',
												'uikit-blocks'
											),
											value: '',
										},
										{
											label: __(
												'Visible Small (Phone Landscape)',
												'uikit-blocks'
											),
											value: 'visible@s',
										},
										{
											label: __(
												'Visible Medium (Tablet Landscape)',
												'uikit-blocks'
											),
											value: 'visible@m',
										},
										{
											label: __(
												'Visible Large (Desktop)',
												'uikit-blocks'
											),
											value: 'visible@l',
										},
										{
											label: __(
												'Visible X-Large (Large Screens)',
												'uikit-blocks'
											),
											value: 'visible@xl',
										},
										{
											label: __(
												'Hidden Small (Phone Landscape)',
												'uikit-blocks'
											),
											value: 'hidden@s',
										},
										{
											label: __(
												'Hidden Medium (Tablet Landscape)',
												'uikit-blocks'
											),
											value: 'hidden@m',
										},
										{
											label: __(
												'Hidden Large (Desktop)',
												'uikit-blocks'
											),
											value: 'hidden@l',
										},
										{
											label: __(
												'Hidden X-Large (Large Screens)',
												'uikit-blocks'
											),
											value: 'hidden@xl',
										},
									] }
									onChange={ ( value ) => {
										setAttributes( {
											generalVisiblity: value,
										} );
									} }
								/>
							</>
						) }

						{ /* Position */ }
						{ position && (
							<>
								<SelectControl
									label={ __( 'Position', 'uikit-blocks' ) }
									help={ __(
										'Select element position. Note: Position is not previewed in editor.',
										'uikit-blocks'
									) }
									value={ attributes.generalPosition }
									options={ [
										{
											label: __(
												'Static',
												'uikit-blocks'
											),
											value: '',
										},
										{
											label: __(
												'Relative',
												'uikit-blocks'
											),
											value: 'relative',
										},
										{
											label: __(
												'Absolute',
												'uikit-blocks'
											),
											value: 'absolute',
										},
									] }
									onChange={ ( value ) => {
										setAttributes( {
											generalPosition: value,
										} );
									} }
								/>

								{ attributes.generalPosition && (
									<>
										<TextControl
											label={ __(
												'Position Left',
												'uikit-blocks'
											) }
											help={ __(
												'Enter value for CSS left property.',
												'uikit-blocks'
											) }
											value={
												attributes.generalPositionLeft ||
												''
											}
											onChange={ ( value ) =>
												setAttributes( {
													generalPositionLeft: value,
												} )
											}
										/>
										<TextControl
											label={ __(
												'Position Right',
												'uikit-blocks'
											) }
											help={ __(
												'Enter value for CSS right property.',
												'uikit-blocks'
											) }
											value={
												attributes.generalPositionRight ||
												''
											}
											onChange={ ( value ) =>
												setAttributes( {
													generalPositionRight: value,
												} )
											}
										/>
										<TextControl
											label={ __(
												'Position Top',
												'uikit-blocks'
											) }
											help={ __(
												'Enter value for CSS top property.',
												'uikit-blocks'
											) }
											value={
												attributes.generalPositionTop ||
												''
											}
											onChange={ ( value ) =>
												setAttributes( {
													generalPositionTop: value,
												} )
											}
										/>
										<TextControl
											label={ __(
												'Position Bottom',
												'uikit-blocks'
											) }
											help={ __(
												'Enter value for CSS bottom property.',
												'uikit-blocks'
											) }
											value={
												attributes.generalPositionBottom ||
												''
											}
											onChange={ ( value ) =>
												setAttributes( {
													generalPositionBottom:
														value,
												} )
											}
										/>
										<TextControl
											label={ __(
												'Z-Index',
												'uikit-blocks'
											) }
											help={ __(
												'Enter value for CSS z-index property.',
												'uikit-blocks'
											) }
											value={
												attributes.generalPositionZIndex ||
												''
											}
											onChange={ ( value ) =>
												setAttributes( {
													generalPositionZIndex:
														value,
												} )
											}
										/>
									</>
								) }
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			{ ( scrollspy || transition ) && (
				<InspectorControls>
					<PanelBody
						title={ __(
							'Animation/Transition (Parent)',
							'uikit-blocks'
						) }
						initialOpen={ false }
					>
						{ /* Scrollspy */ }
						{ scrollspy && (
							<>
								<SelectControl
									label={ __(
										'Scrollspy Animation',
										'uikit-blocks'
									) }
									help={ __(
										'Set Scrollspy to trigger child blocks animation once they enter the viewport. To enable animation you need to set "Effect" to "Animation" and "Animation" value to "Inherit" or an animation name on child blocks in "Animation/Transition (Child)" panel.',
										'uikit-blocks'
									) }
									value={ attributes.generalScrollspy }
									options={ [
										{
											label: __(
												'Disable',
												'uikit-blocks'
											),
											value: '',
										},
										...animationOptions,
									] }
									onChange={ ( value ) => {
										setAttributes( {
											generalScrollspy: value,
										} );
									} }
								/>
								{ attributes.generalScrollspy && (
									<TextControl
										label={ __(
											'Animation Delay',
											'uikit-blocks'
										) }
										help={ __(
											'Delay the element animations in milliseconds, e.g. 200.',
											'uikit-blocks'
										) }
										value={
											attributes.generalScrollspyDelay ||
											''
										}
										onChange={ ( value ) =>
											setAttributes( {
												generalScrollspyDelay: value,
											} )
										}
									/>
								) }
							</>
						) }

						{ /* Transition */ }
						{ transition && (
							<CheckboxControl
								label={ __(
									'Transition toggle',
									'uikit-blocks'
								) }
								help={ __(
									'Toggle a child blocks transition on hover or focus. To enable transition you need to set "Effect" to "Transition" and select a transition name on child blocks in "Animation/Transition (Child)" panel.',
									'uikit-blocks'
								) }
								checked={ attributes.generalTransitionHover }
								onChange={ ( value ) => {
									setAttributes( {
										generalTransitionHover: value,
									} );
								} }
							/>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			{ /* Effect */ }
			{ effect && (
				<InspectorControls>
					<PanelBody
						title={ __(
							'Animation/Transition (Child)',
							'uikit-blocks'
						) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Effect', 'uikit-blocks' ) }
							help={ __(
								'Select element effect like animation, transition or parallax.',
								'uikit-blocks'
							) }
							value={ attributes.generalEffect }
							options={ [
								{
									label: __( 'None', 'uikit-blocks' ),
									value: '',
								},
								{
									label: __( 'Animation', 'uikit-blocks' ),
									value: 'animation',
								},
								{
									label: __( 'Transition', 'uikit-blocks' ),
									value: 'transition',
								},
								{
									label: __( 'Parallax', 'uikit-blocks' ),
									value: 'parallax',
								},
							] }
							onChange={ ( value ) => {
								setAttributes( {
									generalEffect: value,
								} );
							} }
						/>

						{ attributes.generalEffect === 'animation' && (
							<SelectControl
								label={ __( 'Animation', 'uikit-blocks' ) }
								help={ __(
									'Make sure to set "Scrollspy" to "Animation" on any parent block in "Animation/Transition (Parent)" panel to enable animation.',
									'uikit-blocks'
								) }
								value={ attributes.generalAnimation }
								options={ [
									{
										label: __( 'None', 'uikit-blocks' ),
										value: '',
									},
									{
										label: __( 'Inherit', 'uikit-blocks' ),
										value: 'inherit',
									},
									...animationOptions,
								] }
								onChange={ ( value ) => {
									setAttributes( {
										generalAnimation: value,
									} );
								} }
							/>
						) }

						{ attributes.generalEffect === 'transition' && (
							<SelectControl
								label={ __( 'Transition', 'uikit-blocks' ) }
								help={ __(
									'Make sure to enable "Transition toggle" on any parent block in "Animation/Transition (Parent)" panel to enable transition.',
									'uikit-blocks'
								) }
								value={ attributes.generalTransition }
								options={ transitionOptions }
								onChange={ ( value ) => {
									setAttributes( {
										generalTransition: value,
									} );
								} }
							/>
						) }

						{ attributes.generalEffect === 'parallax' && (
							<>
								<TextControl
									label={ __(
										'Parallax Translate X',
										'uikit-blocks'
									) }
									value={ attributes.generalParallaxX || '' }
									onChange={ ( value ) =>
										setAttributes( {
											generalParallaxX: value,
										} )
									}
								/>
								<TextControl
									label={ __(
										'Parallax Translate Y',
										'uikit-blocks'
									) }
									value={ attributes.generalParallaxY || '' }
									onChange={ ( value ) =>
										setAttributes( {
											generalParallaxY: value,
										} )
									}
								/>
								<TextControl
									label={ __(
										'Parallax Scale',
										'uikit-blocks'
									) }
									value={
										attributes.generalParallaxScale || ''
									}
									onChange={ ( value ) =>
										setAttributes( {
											generalParallaxScale: value,
										} )
									}
								/>
								<TextControl
									label={ __(
										'Parallax Rotate',
										'uikit-blocks'
									) }
									value={
										attributes.generalParallaxRotate || ''
									}
									onChange={ ( value ) =>
										setAttributes( {
											generalParallaxRotate: value,
										} )
									}
								/>
								<TextControl
									label={ __(
										'Parallax Opacity',
										'uikit-blocks'
									) }
									value={
										attributes.generalParallaxOpacity || ''
									}
									onChange={ ( value ) =>
										setAttributes( {
											generalParallaxOpacity: value,
										} )
									}
								/>
								<TextControl
									label={ __(
										'Parallax Blur',
										'uikit-blocks'
									) }
									value={
										attributes.generalParallaxBlur || ''
									}
									onChange={ ( value ) =>
										setAttributes( {
											generalParallaxBlur: value,
										} )
									}
								/>
								<SelectControl
									label={ __(
										'Transform Origin',
										'uikit-blocks'
									) }
									help={ __(
										"Define the origin of the element's transformation when scaling or rotating the element.",
										'uikit-blocks'
									) }
									value={ attributes.generalParallaxOrigin }
									options={ [
										{
											label: __(
												'Top Left',
												'uikit-blocks'
											),
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
											value: '',
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
											generalParallaxOrigin: value,
										} );
									} }
								/>
								<TextControl
									label={ __(
										'Parallax Easing',
										'uikit-blocks'
									) }
									value={
										attributes.generalParallaxEasing || ''
									}
									onChange={ ( value ) =>
										setAttributes( {
											generalParallaxEasing: value,
										} )
									}
								/>
								<SelectControl
									label={ __(
										'Parallax Breakpoint',
										'uikit-blocks'
									) }
									help={ __(
										'Display the parallax effect only on this device width and larger.',
										'uikit-blocks'
									) }
									value={
										attributes.generalParallaxBreakpoint
									}
									options={ [
										{
											label: __(
												'Always',
												'uikit-blocks'
											),
											value: '',
										},
										{
											label: __(
												'Small (Phone Landscape)',
												'uikit-blocks'
											),
											value: 's',
										},
										{
											label: __(
												'Medium (Tablet Landscape)',
												'uikit-blocks'
											),
											value: 'm',
										},
										{
											label: __(
												'Large (Desktop)',
												'uikit-blocks'
											),
											value: 'l',
										},
										{
											label: __(
												'X-Large (Large Screens)',
												'uikit-blocks'
											),
											value: 'xl',
										},
									] }
									onChange={ ( value ) => {
										setAttributes( {
											generalParallaxBreakpoint: value,
										} );
									} }
								/>
								<TextControl
									label={ __(
										'Custom Parallax Options',
										'uikit-blocks'
									) }
									value={
										attributes.generalParallaxCustom || ''
									}
									onChange={ ( value ) =>
										setAttributes( {
											generalParallaxCustom: value,
										} )
									}
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			{ /* Text Alignment */ }
			{ textAlign && (
				<BlockControls group="block">
					<Dropdown
						renderToggle={ ( { isOpen, onToggle } ) => (
							<ToolbarButton
								icon={
									attributes.generalTextAlign in
									alignmentIcons
										? alignmentIcons[
												attributes.generalTextAlign
										  ]
										: alignNone
								}
								title={ __( 'Text Alignment', 'uikit-blocks' ) }
								onClick={ onToggle }
								aria-expanded={ isOpen }
							/>
						) }
						renderContent={ () => (
							<div
								style={ {
									maxWidth: '200px',
									minWidth: 'auto',
									width: '90vw',
								} }
							>
								<SelectControl
									label={ __(
										'Text Alignment',
										'uikit-blocks'
									) }
									value={ attributes.generalTextAlign }
									options={ [
										{
											label: __(
												'Inherit',
												'uikit-blocks'
											),
											value: '',
										},
										{
											label: __( 'Left', 'uikit-blocks' ),
											value: 'left',
										},
										{
											label: __(
												'Center',
												'uikit-blocks'
											),
											value: 'center',
										},
										{
											label: __(
												'Right',
												'uikit-blocks'
											),
											value: 'right',
										},
										{
											label: __(
												'Justify',
												'uikit-blocks'
											),
											value: 'justify',
										},
									] }
									onChange={ ( value ) => {
										setAttributes( {
											generalTextAlign: value,
										} );
									} }
								/>

								{ [ 'left', 'center', 'right' ].includes(
									attributes.generalTextAlign
								) && (
									<>
										<SelectControl
											label={ __(
												'Text Alignment Breakpoint',
												'uikit-blocks'
											) }
											value={
												attributes.generalTextAlignBreakpoint
											}
											options={ [
												{
													label: __(
														'Always',
														'uikit-blocks'
													),
													value: '',
												},
												{
													label: __(
														'Small (Phone Landscape)',
														'uikit-blocks'
													),
													value: 's',
												},
												{
													label: __(
														'Medium (Tablet Landscape)',
														'uikit-blocks'
													),
													value: 'm',
												},
												{
													label: __(
														'Large (Desktop)',
														'uikit-blocks'
													),
													value: 'l',
												},
												{
													label: __(
														'X-Large (Large Screens)',
														'uikit-blocks'
													),
													value: 'xl',
												},
											] }
											onChange={ ( value ) => {
												setAttributes( {
													generalTextAlignBreakpoint:
														value,
												} );
											} }
										/>

										{ attributes.generalTextAlignBreakpoint && (
											<SelectControl
												label={ __(
													'Text Alignment Fallback',
													'uikit-blocks'
												) }
												value={
													attributes.generalTextAlignFallback
												}
												options={ [
													{
														label: __(
															'Inherit',
															'uikit-blocks'
														),
														value: '',
													},
													{
														label: __(
															'Left',
															'uikit-blocks'
														),
														value: 'left',
													},
													{
														label: __(
															'Center',
															'uikit-blocks'
														),
														value: 'center',
													},
													{
														label: __(
															'Right',
															'uikit-blocks'
														),
														value: 'right',
													},
													// No Justify
												] }
												onChange={ ( value ) => {
													setAttributes( {
														generalTextAlignFallback:
															value,
													} );
												} }
											/>
										) }
									</>
								) }
							</div>
						) }
					></Dropdown>
				</BlockControls>
			) }
		</>
	);
}
