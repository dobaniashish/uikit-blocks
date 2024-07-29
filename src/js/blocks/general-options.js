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
						value={ attributes.generalMargin }
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
							setAttributes( { generalMargin: value } );
						} }
					/>
					<CheckboxControl
						label={ __( 'Remove top margin', 'uikit-blocks' ) }
						checked={ attributes.generalMarginRemoveTop }
						onChange={ ( value ) => {
							setAttributes( { generalMarginRemoveTop: value } );
						} }
					/>
					<CheckboxControl
						label={ __( 'Remove bottom margin', 'uikit-blocks' ) }
						checked={ attributes.generalMarginRemoveBottom }
						onChange={ ( value ) => {
							setAttributes( {
								generalMarginRemoveBottom: value,
							} );
						} }
					/>

					{ /* Visiblity */ }
					<SelectControl
						label={ __( 'Visiblity', 'uikit-blocks' ) }
						help={ __(
							'Show or hide the element on this device width and larger. Note: Visiblity is not previewed in editor.',
							'uikit-blocks'
						) }
						value={ attributes.generalVisiblity }
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
							setAttributes( { generalVisiblity: value } );
						} }
					/>

					{ /* Position */ }
					<SelectControl
						label={ __( 'Position', 'uikit-blocks' ) }
						help={ __(
							'Select element position. Note: Position is not previewed in editor.',
							'uikit-blocks'
						) }
						value={ attributes.generalPosition }
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
							setAttributes( { generalPosition: value } );
						} }
					/>

					{ attributes.generalPosition && (
						<>
							<TextControl
								label={ __( 'Position Left', 'uikit-blocks' ) }
								help={ __(
									'Enter value for CSS left property.',
									'uikit-blocks'
								) }
								value={ attributes.generalPositionLeft || '' }
								onChange={ ( value ) =>
									setAttributes( {
										generalPositionLeft: value,
									} )
								}
							/>
							<TextControl
								label={ __( 'Position Right', 'uikit-blocks' ) }
								help={ __(
									'Enter value for CSS right property.',
									'uikit-blocks'
								) }
								value={ attributes.generalPositionRight || '' }
								onChange={ ( value ) =>
									setAttributes( {
										generalPositionRight: value,
									} )
								}
							/>
							<TextControl
								label={ __( 'Position Top', 'uikit-blocks' ) }
								help={ __(
									'Enter value for CSS top property.',
									'uikit-blocks'
								) }
								value={ attributes.generalPositionTop || '' }
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
								value={ attributes.generalPositionBottom || '' }
								onChange={ ( value ) =>
									setAttributes( {
										generalPositionBottom: value,
									} )
								}
							/>
							<TextControl
								label={ __( 'Z-Index', 'uikit-blocks' ) }
								help={ __(
									'Enter value for CSS z-index property.',
									'uikit-blocks'
								) }
								value={ attributes.generalPositionZIndex || '' }
								onChange={ ( value ) =>
									setAttributes( {
										generalPositionZIndex: value,
									} )
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
								attributes.generalTextAlign in alignmentIcons
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
								label={ __( 'Text Alignment', 'uikit-blocks' ) }
								value={ attributes.generalTextAlign }
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
		</>
	);
}
