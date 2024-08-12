import { __ } from '@wordpress/i18n';

import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import { PanelBody, SelectControl } from '@wordpress/components';

import clsx from 'clsx';

import GeneralOptions from '../general-options';
import useGeneralBlockProps from '../use-general-block-props';

import metadata from './metadata';

export default function Edit( { attributes, setAttributes } ) {
	const generalBlockProps = useGeneralBlockProps( attributes, metadata );

	const blockProps = useBlockProps( {
		...generalBlockProps,
		className: clsx(
			generalBlockProps.className,
			'uk-padding-small' // For editor selection.
		),
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
								value: '',
							},
							{
								label: __( 'Icon', 'uikit-blocks' ),
								value: 'icon',
							},
							{
								label: __( 'Small', 'uikit-blocks' ),
								value: 'small',
							},
							{
								label: __( 'Vertical', 'uikit-blocks' ),
								value: 'vertical',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { style: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Tag', 'uikit-blocks' ) }
						value={ attributes.size }
						options={ [
							{
								label: __( 'Hr', 'uikit-blocks' ),
								value: 'hr',
							},
							{
								label: __( 'Div', 'uikit-blocks' ),
								value: 'div',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { size: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>

			<GeneralOptions { ...arguments[ 0 ] } metadata={ metadata } />

			<div { ...blockProps }>
				<div
					className={ clsx( {
						'uk-hr': ! attributes.style,
						[ `uk-divider-${ attributes.style }` ]:
							attributes.style,
						'uk-margin-remove': true,
					} ) }
				></div>
			</div>
		</>
	);
}
