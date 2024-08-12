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

import GeneralOptions from '../general-options';
import useGeneralBlockProps from '../use-general-block-props';

import metadata from './metadata';

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
		[ `uk-countdown-label uk-text-center` ]: true,
		[ `uk-margin-${ attributes.labelMargin }` ]: attributes.labelMargin,
		[ `uk-margin` ]: ! attributes.labelMargin,
	} );

	const blockProps = useBlockProps( {
		...useGeneralBlockProps( attributes, metadata ),
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
					<CheckboxControl
						label={ __( 'Show separator', 'uikit-blocks' ) }
						checked={ attributes.showSeparator }
						onChange={ ( value ) => {
							setAttributes( {
								showSeparator: value,
							} );
						} }
						__nextHasNoMarginBottom
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

			<GeneralOptions { ...arguments[ 0 ] } metadata={ metadata } />

			<div { ...blockProps }>
				<div
					className={ clsx( {
						[ `uk-grid uk-child-width-auto` ]: true,
						[ `uk-grid-${ attributes.columnGap }` ]:
							attributes.columnGap &&
							attributes.rowGap &&
							attributes.columnGap === attributes.rowGap,
						[ `uk-grid-column-${ attributes.columnGap }` ]:
							attributes.columnGap &&
							attributes.columnGap !== attributes.rowGap,
						[ `uk-grid-row-${ attributes.rowGap }` ]:
							attributes.rowGap &&
							attributes.rowGap !== attributes.columnGap,
					} ) }
					data-uk-grid=""
					data-uk-countdown={ clsx( {
						[ `date: ${ attributes.date }` ]: attributes.date,
					} ) }
				>
					<div>
						<div className="uk-countdown-number uk-countdown-days">
							00
						</div>
						{ attributes.showLabel && (
							<div className={ labelClassName }>
								{ attributes.labelDays || 'Days' }
							</div>
						) }
					</div>

					{ attributes.showSeparator && (
						<div className="uk-countdown-separator">:</div>
					) }

					<div>
						<div className="uk-countdown-number uk-countdown-hours">
							00
						</div>
						{ attributes.showLabel && (
							<div className={ labelClassName }>
								{ attributes.labelHours || 'Hours' }
							</div>
						) }
					</div>

					{ attributes.showSeparator && (
						<div className="uk-countdown-separator">:</div>
					) }

					<div>
						<div className="uk-countdown-number uk-countdown-minutes">
							00
						</div>
						{ attributes.showLabel && (
							<div className={ labelClassName }>
								{ attributes.labelMinutes || 'Minutes' }
							</div>
						) }
					</div>

					{ attributes.showSeparator && (
						<div className="uk-countdown-separator">:</div>
					) }

					<div>
						<div className="uk-countdown-number uk-countdown-seconds">
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
