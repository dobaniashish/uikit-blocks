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

export default function ( { attributes, setAttributes } ) {
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'General Settings', 'uikit-blocks' ) }>
					{ /* Margin */ }
					<SelectControl
						label={ __( 'Margin', 'uikit-blocks' ) }
						help={ __(
							"Set the vertical margin. The first element's top margin and last element's bottom margin are always removed by UIkit.",
							'uikit-blocks'
						) }
						value={ attributes.margin }
						options={ [
							{
								label: __( 'Keep Defaults', 'uikit-blocks' ),
								value: '',
							},
							{
								label: __( 'Small', 'uikit-blocks' ),
								value: 'small',
							},
							{
								label: __( 'Default', 'uikit-blocks' ),
								value: 'default',
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
							{
								label: __( 'Remove', 'uikit-blocks' ),
								value: 'remove-vertical',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { margin: value } );
						} }
					/>
					<CheckboxControl
						label={ __( 'Remove top margin', 'uikit-blocks' ) }
						checked={ attributes.marginRemoveTop }
						onChange={ ( value ) => {
							setAttributes( { marginRemoveTop: value } );
						} }
					/>
					<CheckboxControl
						label={ __( 'Remove bottom margin', 'uikit-blocks' ) }
						checked={ attributes.marginRemoveBottom }
						onChange={ ( value ) => {
							setAttributes( { marginRemoveBottom: value } );
						} }
					/>

					{ /* Visiblity */ }
					<SelectControl
						label={ __( 'Visiblity', 'uikit-blocks' ) }
						help={ __(
							'Show or hide the element on this device width and larger. Note: Visiblity is not previewed in editor.',
							'uikit-blocks'
						) }
						value={ attributes.visiblity }
						options={ [
							{
								label: __( 'Always', 'uikit-blocks' ),
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
							setAttributes( { visiblity: value } );
						} }
					/>

					{ /* Position */ }
					<SelectControl
						label={ __( 'Position', 'uikit-blocks' ) }
						help={ __(
							'Select element position. Note: Position is not previewed in editor.',
							'uikit-blocks'
						) }
						value={ attributes.position }
						options={ [
							{
								label: __( 'Static', 'uikit-blocks' ),
								value: '',
							},
							{
								label: __( 'Relative', 'uikit-blocks' ),
								value: 'relative',
							},
							{
								label: __( 'Absolute', 'uikit-blocks' ),
								value: 'absolute',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { position: value } );
						} }
					/>

					{ attributes.position && (
						<>
							<TextControl
								label={ __( 'Position Left', 'uikit-blocks' ) }
								help={ __(
									'Enter value for CSS left property.',
									'uikit-blocks'
								) }
								value={ attributes.positionLeft || '' }
								onChange={ ( value ) =>
									setAttributes( { positionLeft: value } )
								}
							/>
							<TextControl
								label={ __( 'Position Right', 'uikit-blocks' ) }
								help={ __(
									'Enter value for CSS right property.',
									'uikit-blocks'
								) }
								value={ attributes.positionRight || '' }
								onChange={ ( value ) =>
									setAttributes( { positionRight: value } )
								}
							/>
							<TextControl
								label={ __( 'Position Top', 'uikit-blocks' ) }
								help={ __(
									'Enter value for CSS top property.',
									'uikit-blocks'
								) }
								value={ attributes.positionTop || '' }
								onChange={ ( value ) =>
									setAttributes( { positionTop: value } )
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
								value={ attributes.positionBottom || '' }
								onChange={ ( value ) =>
									setAttributes( { positionBottom: value } )
								}
							/>
							<TextControl
								label={ __( 'Z-Index', 'uikit-blocks' ) }
								help={ __(
									'Enter value for CSS z-index property.',
									'uikit-blocks'
								) }
								value={ attributes.positionZIndex || '' }
								onChange={ ( value ) =>
									setAttributes( { positionZIndex: value } )
								}
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<BlockControls group="block">
				{ /* Text Alignment */ }
				<Dropdown
					renderToggle={ ( { isOpen, onToggle } ) => (
						<ToolbarButton
							icon={
								attributes.textAlign in alignmentIcons
									? alignmentIcons[ attributes.textAlign ]
									: alignNone
							}
							title={ __( 'Text Alignment', 'uikit-blocks' ) }
							onClick={ onToggle }
							aria-expanded={ isOpen }
						/>
					) }
					renderContent={ () => (
						<div style={ { width: '300px' } }>
							<SelectControl
								label={ __( 'Text Alignment', 'uikit-blocks' ) }
								value={ attributes.textAlign }
								options={ [
									{
										label: __( 'Inherit', 'uikit-blocks' ),
										value: '',
									},
									{
										label: __( 'Left', 'uikit-blocks' ),
										value: 'left',
									},
									{
										label: __( 'Center', 'uikit-blocks' ),
										value: 'center',
									},
									{
										label: __( 'Right', 'uikit-blocks' ),
										value: 'right',
									},
									{
										label: __( 'Justify', 'uikit-blocks' ),
										value: 'justify',
									},
								] }
								onChange={ ( value ) => {
									setAttributes( { textAlign: value } );
								} }
							/>

							{ [ 'left', 'center', 'right' ].includes(
								attributes.textAlign
							) && (
								<>
									<SelectControl
										label={ __(
											'Text Alignment Breakpoint',
											'uikit-blocks'
										) }
										value={ attributes.textAlignBreakpoint }
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
												textAlignBreakpoint: value,
											} );
										} }
									/>

									{ attributes.textAlignBreakpoint && (
										<SelectControl
											label={ __(
												'Text Alignment Fallback',
												'uikit-blocks'
											) }
											value={
												attributes.textAlignFallback
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
													textAlignFallback: value,
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
		</>
	);
}
