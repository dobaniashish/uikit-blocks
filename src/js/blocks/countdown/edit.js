import { __ } from '@wordpress/i18n';

import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import {
	DateTimePicker,
	PanelBody,
	Dropdown,
	Button,
	BaseControl,
	CheckboxControl,
	TextControl,
	SelectControl,
} from '@wordpress/components';

import { date } from '@wordpress/date';

import clsx from 'clsx';

const gapOptions = [
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
		label: __( 'Large', 'uikit-blocks' ),
		value: 'large',
	},
];

export default function Edit( { attributes, setAttributes } ) {
	const labelClassName = clsx( {
		[ `ukb-countdown-label ukb-text-center` ]: true,
		[ `ukb-margin-${ attributes.labelMargin }` ]: attributes.labelMargin,
		[ `ukb-margin` ]: ! attributes.labelMargin,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'uikit-blocks' ) }>
					<BaseControl
						help={ __(
							'Select a date for the countdown to expire.',
							'uikit-blocks'
						) }
					>
						<BaseControl.VisualLabel>
							{ __( 'Date', 'uikit-blocks' ) }
						</BaseControl.VisualLabel>

						<Dropdown
							renderToggle={ ( { isOpen, onToggle } ) => (
								<Button
									size="compact"
									onClick={ onToggle }
									aria-expanded={ isOpen }
									variant="tertiary"
									style={ { marginLeft: '12px' } }
								>
									{ attributes.date
										? date(
												'F j, Y, g:i a',
												attributes.date
										  )
										: 'Select a date' }
								</Button>
							) }
							renderContent={ () => (
								<DateTimePicker
									currentDate={ attributes.date }
									onChange={ ( value ) => {
										setAttributes( {
											date: date( 'c', value ),
										} );
									} }
									is12Hour={ true }
								/>
							) }
						></Dropdown>
					</BaseControl>

					<SelectControl
						label={ __( 'Column Gap', 'uikit-blocks' ) }
						value={ attributes.columnGap }
						options={ gapOptions }
						onChange={ ( value ) => {
							setAttributes( { columnGap: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Row Gap', 'uikit-blocks' ) }
						value={ attributes.rowGap }
						options={ gapOptions }
						onChange={ ( value ) => {
							setAttributes( { rowGap: value } );
						} }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Label Settings', 'uikit-blocks' ) }>
					<CheckboxControl
						label={ __( 'Show Labels', 'uikit-blocks' ) }
						checked={ attributes.showLabel }
						onChange={ ( value ) => {
							setAttributes( {
								showLabel: value,
							} );
						} }
						__nextHasNoMarginBottom
					/>

					{ attributes.showLabel && (
						<>
							<TextControl
								label={ __( 'Label for days', 'uikit-blocks' ) }
								value={ attributes.labelDays || '' }
								onChange={ ( value ) =>
									setAttributes( { labelDays: value } )
								}
							/>

							<TextControl
								label={ __(
									'Label for hours',
									'uikit-blocks'
								) }
								value={ attributes.labelHours || '' }
								onChange={ ( value ) =>
									setAttributes( { labelHours: value } )
								}
							/>

							<TextControl
								label={ __(
									'Label for minutes',
									'uikit-blocks'
								) }
								value={ attributes.labelMinutes || '' }
								onChange={ ( value ) =>
									setAttributes( { labelMinutes: value } )
								}
							/>
							<TextControl
								label={ __(
									'Label for seconds',
									'uikit-blocks'
								) }
								value={ attributes.labelSeconds || '' }
								onChange={ ( value ) =>
									setAttributes( { labelSeconds: value } )
								}
							/>

							<SelectControl
								label={ __( 'Label Margin', 'uikit-blocks' ) }
								value={ attributes.labelMargin }
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
										label: __( 'None', 'uikit-blocks' ),
										value: 'remove',
									},
								] }
								onChange={ ( value ) => {
									setAttributes( { labelMargin: value } );
								} }
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps() }>
				<div
					className={ clsx( {
						[ `ukb-grid ukb-child-width-auto` ]: true,
						[ `ukb-grid-${ attributes.columnGap }` ]:
							attributes.columnGap &&
							attributes.rowGap &&
							attributes.columnGap === attributes.rowGap,
						[ `ukb-grid-column-${ attributes.columnGap }` ]:
							attributes.columnGap &&
							attributes.columnGap !== attributes.rowGap,
						[ `ukb-grid-row-${ attributes.rowGap }` ]:
							attributes.rowGap &&
							attributes.rowGap !== attributes.columnGap,
					} ) }
				>
					<div>
						<div className="ukb-countdown-number ukb-countdown-days">
							00
						</div>
						{ attributes.showLabel && (
							<div className={ labelClassName }>
								{ attributes.labelDays || 'Days' }
							</div>
						) }
					</div>

					{ attributes.showSeparator && (
						<div className="ukb-countdown-separator">:</div>
					) }

					<div>
						<div className="ukb-countdown-number ukb-countdown-hours">
							00
						</div>
						{ attributes.showLabel && (
							<div className={ labelClassName }>
								{ attributes.labelHours || 'Hours' }
							</div>
						) }
					</div>

					{ attributes.showSeparator && (
						<div className="ukb-countdown-separator">:</div>
					) }

					<div>
						<div className="ukb-countdown-number ukb-countdown-minutes">
							00
						</div>
						{ attributes.showLabel && (
							<div className={ labelClassName }>
								{ attributes.labelMinutes || 'Minutes' }
							</div>
						) }
					</div>

					{ attributes.showSeparator && (
						<div className="ukb-countdown-separator">:</div>
					) }

					<div>
						<div className="ukb-countdown-number ukb-countdown-seconds">
							00
						</div>
						{ attributes.showLabel && (
							<div className={ labelClassName }>
								{ attributes.labelSeconds || 'Seconds' }
							</div>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
