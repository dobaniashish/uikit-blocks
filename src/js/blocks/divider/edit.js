import { __ } from '@wordpress/i18n';

import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import { PanelBody, SelectControl } from '@wordpress/components';

import clsx from 'clsx';

import GeneralOptions from '../general-options';
import generalBlockProps from '../general-block-props';

export default function Edit( { attributes, setAttributes } ) {
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

			<div
				{ ...useBlockProps( {
					...generalBlockProps( attributes ),
					className: 'uk-padding-small', // For editor selection.
				} ) }
			>
				<div
					className={ clsx( {
						'uk-hr': ! attributes.style,
						[ `uk-divider-${ attributes.style }` ]:
							attributes.style,
					} ) }
				></div>
			</div>

			<GeneralOptions { ...arguments[ 0 ] } />
		</>
	);
}
