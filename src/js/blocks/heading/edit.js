import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';

import { DropdownMenu, PanelBody, SelectControl } from '@wordpress/components';

import {
	heading,
	headingLevel1,
	headingLevel2,
	headingLevel3,
	headingLevel4,
	headingLevel5,
	headingLevel6,
} from '@wordpress/icons';

import clsx from 'clsx';

import GeneralOptions from '../general-options';
import useGeneralBlockProps from '../use-general-block-props';

import metadata from './metadata';

const headingIcons = {
	div: heading,
	h1: headingLevel1,
	h2: headingLevel2,
	h3: headingLevel3,
	h4: headingLevel4,
	h5: headingLevel5,
	h6: headingLevel6,
};

export default function Edit( { attributes, setAttributes } ) {
	const generalBlockProps = useGeneralBlockProps( attributes, metadata );

	const blockProps = useBlockProps( {
		...generalBlockProps,
		className: clsx( generalBlockProps.className, {
			[ `uk-${ attributes.tag }` ]:
				attributes.tag !== 'div' && ! attributes.style,
			[ `uk-${ attributes.style }` ]: attributes.style,
			[ `uk-heading-${ attributes.decoration }` ]: attributes.decoration,
			[ `uk-text-${ attributes.color }` ]: attributes.color,
		} ),
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
								label: __(
									'Default (Inherit from tag)',
									'uikit-blocks'
								),
								value: '',
							},
							{
								label: __( 'Heading 3X-Large', 'uikit-blocks' ),
								value: 'heading-3xlarge',
							},
							{
								label: __( 'Heading 2X-Large', 'uikit-blocks' ),
								value: 'heading-2xlarge',
							},
							{
								label: __( 'Heading X-Large', 'uikit-blocks' ),
								value: 'heading-xlarge',
							},
							{
								label: __( 'Heading Large', 'uikit-blocks' ),
								value: 'heading-large',
							},
							{
								label: __( 'Heading Medium', 'uikit-blocks' ),
								value: 'heading-medium',
							},
							{
								label: __( 'Heading Small', 'uikit-blocks' ),
								value: 'heading-small',
							},
							{
								label: __( 'Heading H1', 'uikit-blocks' ),
								value: 'h1',
							},
							{
								label: __( 'Heading H2', 'uikit-blocks' ),
								value: 'h2',
							},
							{
								label: __( 'Heading H3', 'uikit-blocks' ),
								value: 'h3',
							},
							{
								label: __( 'Heading H4', 'uikit-blocks' ),
								value: 'h4',
							},
							{
								label: __( 'Heading H5', 'uikit-blocks' ),
								value: 'h5',
							},
							{
								label: __( 'Heading H6', 'uikit-blocks' ),
								value: 'h6',
							},
							{
								label: __( 'Text Meta', 'uikit-blocks' ),
								value: 'text-meta',
							},
							{
								label: __( 'Text Lead', 'uikit-blocks' ),
								value: 'text-lead',
							},
							{
								label: __( 'Text Small', 'uikit-blocks' ),
								value: 'text-small',
							},
							{
								label: __( 'Text Large', 'uikit-blocks' ),
								value: 'text-large',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { style: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Decoration', 'uikit-blocks' ) }
						value={ attributes.decoration }
						options={ [
							{
								label: __( 'None', 'uikit-blocks' ),
								value: '',
							},
							{
								label: __( 'Divider', 'uikit-blocks' ),
								value: 'divider',
							},
							{
								label: __( 'Bullet', 'uikit-blocks' ),
								value: 'bullet',
							},
							{
								label: __( 'Line', 'uikit-blocks' ),
								value: 'line',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { decoration: value } );
						} }
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
							{
								label: __( 'Background', 'uikit-blocks' ),
								value: 'background',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { color: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls group="block">
				<DropdownMenu
					icon={
						attributes.tag in headingIcons
							? headingIcons[ attributes.tag ]
							: heading
					}
					label="Select a direction"
					controls={ [
						{
							title: 'h1',
							icon: headingLevel1,
							onClick: () => setAttributes( { tag: 'h1' } ),
						},
						{
							title: 'h2',
							icon: headingLevel2,
							onClick: () => setAttributes( { tag: 'h2' } ),
						},
						{
							title: 'h3',
							icon: headingLevel3,
							onClick: () => setAttributes( { tag: 'h3' } ),
						},
						{
							title: 'h4',
							icon: headingLevel4,
							onClick: () => setAttributes( { tag: 'h4' } ),
						},
						{
							title: 'h5',
							icon: headingLevel5,
							onClick: () => setAttributes( { tag: 'h5' } ),
						},
						{
							title: 'h6',
							icon: headingLevel6,
							onClick: () => setAttributes( { tag: 'h6' } ),
						},
						{
							title: 'div',
							icon: heading,
							onClick: () => setAttributes( { tag: 'div' } ),
						},
					] }
				/>
			</BlockControls>

			<GeneralOptions { ...arguments[ 0 ] } metadata={ metadata } />

			<div { ...blockProps }>
				<RichText
					aria-label={ __( 'Heading text', 'uikit-blocks' ) }
					placeholder={ __( 'Heading…', 'uikit-blocks' ) }
					value={ attributes.text }
					onChange={ ( value ) => setAttributes( { text: value } ) }
				/>
			</div>
		</>
	);
}
