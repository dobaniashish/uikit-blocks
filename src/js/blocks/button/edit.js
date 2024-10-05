import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';

import { PanelBody, SelectControl } from '@wordpress/components';

import clsx from 'clsx';

import URLControl from '../../components/url-control';

import GeneralOptions from '../general-options';
import useGeneralBlockProps from '../use-general-block-props';

import metadata from './metadata';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		...useGeneralBlockProps( attributes, metadata ),
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
								label: __( '100% (1–1)', 'uikit-blocks' ),
								value: '1-1',
							},
							{
								label: __( '83% (5–6)', 'uikit-blocks' ),
								value: '5-6',
							},
							{
								label: __( '80% (4–5)', 'uikit-blocks' ),
								value: '4-5',
							},
							{
								label: __( '75% (3–4)', 'uikit-blocks' ),
								value: '3-4',
							},
							{
								label: __( '66% (2–3)', 'uikit-blocks' ),
								value: '2-3',
							},
							{
								label: __( '60% (3–5)', 'uikit-blocks' ),
								value: '3-5',
							},
							{
								label: __( '50% (1–2)', 'uikit-blocks' ),
								value: '1-2',
							},
							{
								label: __( '40% (2–5)', 'uikit-blocks' ),
								value: '2-5',
							},
							{
								label: __( '33% (1–3)', 'uikit-blocks' ),
								value: '1-3',
							},
							{
								label: __( '25% (1–4)', 'uikit-blocks' ),
								value: '1-4',
							},
							{
								label: __( '20% (1–5)', 'uikit-blocks' ),
								value: '1-5',
							},
							{
								label: __( '16% (1–6)', 'uikit-blocks' ),
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

			<URLControl
				attributes={ {
					url: attributes.url,
					target: attributes.target,
					lightboxType: attributes.lightboxType,
					rel: attributes.rel,
				} }
				onChange={ ( value ) => setAttributes( { ...value } ) }
				lightbox={ true }
			/>

			<GeneralOptions { ...arguments[ 0 ] } metadata={ metadata } />

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
