import { __ } from '@wordpress/i18n';

import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import { PanelBody, SelectControl, TextControl } from '@wordpress/components';

import clsx from 'clsx';

import UIkitIconInput from '../../components/uikit-icon-input';
import URLControl from '../../components/url-control';

import GeneralOptions from '../general-options';
import useGeneralBlockProps from '../use-general-block-props';

import metadata from './metadata';

export default function Edit( { attributes, setAttributes } ) {
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
		...useGeneralBlockProps( attributes, metadata ),
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
				{ !! attributes.url && (
					// eslint-disable-next-line jsx-a11y/anchor-is-valid
					<a href="#" { ...iconAttributes } aria-label="icon"></a>
				) }
				{ ! attributes.url && <span { ...iconAttributes }></span> }
			</div>
		</>
	);
}
