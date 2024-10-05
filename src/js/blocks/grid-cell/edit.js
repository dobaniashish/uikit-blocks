import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import { PanelBody, SelectControl } from '@wordpress/components';

import { useSelect } from '@wordpress/data';

import clsx from 'clsx';

const widthResponsiveOptions = [
	{
		label: __( 'Inherit', 'uikit-blocks' ),
		value: '',
	},
	{
		label: __( 'Expand', 'uikit-blocks' ),
		value: 'expand',
	},
	{
		label: __( 'Auto', 'uikit-blocks' ),
		value: 'auto',
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
];

const widthOptions = [
	...widthResponsiveOptions,
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
];

const flexOptions = [
	{
		label: __( 'None', 'uikit-blocks' ),
		value: '',
	},
	{
		label: __( 'First', 'uikit-blocks' ),
		value: 'first',
	},
	{
		label: __( 'Last', 'uikit-blocks' ),
		value: 'last',
	},
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const hasInnerBlocks = useSelect(
		( select ) =>
			select( blockEditorStore ).getBlocks( clientId ).length > 0,
		[ clientId ]
	);

	const blockProps = useBlockProps( {
		className: clsx( {
			[ `uk-width-${ attributes.width }` ]: attributes.width,
			[ `uk-width-${ attributes.widthS }@s` ]: attributes.widthS,
			[ `uk-width-${ attributes.widthM }@m` ]: attributes.widthM,
			[ `uk-width-${ attributes.widthL }@l` ]: attributes.widthL,
			[ `uk-width-${ attributes.widthXL }@xl` ]: attributes.widthXL,
			[ `uk-flex-${ attributes.flexOrder }` ]: attributes.flexOrder,
			[ `uk-flex-${ attributes.flexOrderS }@s` ]: attributes.flexOrderS,
			[ `uk-flex-${ attributes.flexOrderM }@m` ]: attributes.flexOrderM,
			[ `uk-flex-${ attributes.flexOrderL }@l` ]: attributes.flexOrderL,
			[ `uk-flex-${ attributes.flexOrderXL }@xl` ]:
				attributes.flexOrderXL,
		} ),
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		renderAppender: hasInnerBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Width Settings', 'uikit-blocks' ) }>
					<p>
						{ __(
							'Set the column width for each breakpoint. If "Inherit" is selected, the column width of the next smaller screen size is applied. If all options are set to "Inherit", the "Child width" from the parent grid block is applied.',
							'uikit-blocks'
						) }
					</p>

					<SelectControl
						label={ __(
							'Width @ Mobile Portrait',
							'uikit-blocks'
						) }
						value={ attributes.width }
						options={ widthOptions }
						onChange={ ( value ) => {
							setAttributes( { width: value } );
						} }
					/>
					<SelectControl
						label={ __(
							'Width @ Mobile Landscape',
							'uikit-blocks'
						) }
						value={ attributes.widthS }
						options={ widthResponsiveOptions }
						onChange={ ( value ) => {
							setAttributes( { widthS: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Width @ Tablet', 'uikit-blocks' ) }
						value={ attributes.widthM }
						options={ widthResponsiveOptions }
						onChange={ ( value ) => {
							setAttributes( { widthM: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Width @ Desktop', 'uikit-blocks' ) }
						value={ attributes.widthL }
						options={ widthResponsiveOptions }
						onChange={ ( value ) => {
							setAttributes( { widthL: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Width @ Large Screen', 'uikit-blocks' ) }
						value={ attributes.widthXL }
						options={ widthResponsiveOptions }
						onChange={ ( value ) => {
							setAttributes( { widthXL: value } );
						} }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Flex Settings', 'uikit-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __(
							'Order @ Mobile Portrait',
							'uikit-blocks'
						) }
						value={ attributes.flexOrder }
						options={ flexOptions }
						onChange={ ( value ) => {
							setAttributes( { flexOrder: value } );
						} }
					/>
					<SelectControl
						label={ __(
							'Order @ Mobile Landscape',
							'uikit-blocks'
						) }
						value={ attributes.flexOrderS }
						options={ flexOptions }
						onChange={ ( value ) => {
							setAttributes( { flexOrderS: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Order @ Tablet', 'uikit-blocks' ) }
						value={ attributes.flexOrderM }
						options={ flexOptions }
						onChange={ ( value ) => {
							setAttributes( { flexOrderM: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Order @ Desktop', 'uikit-blocks' ) }
						value={ attributes.flexOrderL }
						options={ flexOptions }
						onChange={ ( value ) => {
							setAttributes( { flexOrderL: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Order @ Large Screen', 'uikit-blocks' ) }
						value={ attributes.flexOrderXL }
						options={ flexOptions }
						onChange={ ( value ) => {
							setAttributes( { flexOrderXL: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...innerBlocksProps }></div>
		</>
	);
}
