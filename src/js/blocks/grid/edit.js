import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	CheckboxControl,
	TextControl,
} from '@wordpress/components';

import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';

import { Icon } from '@wordpress/icons';

import { useDispatch, useSelect } from '@wordpress/data';

import clsx from 'clsx';

import templates from './templates';

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
	{
		label: __( 'Collapse', 'uikit-blocks' ),
		value: 'collapse',
	},
];

const childWidthOptions = [
	{
		label: __( 'None', 'uikit-blocks' ),
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
		label: __( '100%', 'uikit-blocks' ),
		value: '1-1',
	},
	{
		label: __( '50%', 'uikit-blocks' ),
		value: '1-2',
	},
	{
		label: __( '33%', 'uikit-blocks' ),
		value: '1-3',
	},
	{
		label: __( '25%', 'uikit-blocks' ),
		value: '1-4',
	},
	{
		label: __( '20%', 'uikit-blocks' ),
		value: '1-5',
	},
	{
		label: __( '16%', 'uikit-blocks' ),
		value: '1-6',
	},
];

const flexHorizontalOptions = [
	{
		label: __( 'None', 'uikit-blocks' ),
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
		label: __( 'Between', 'uikit-blocks' ),
		value: 'between',
	},
	{
		label: __( 'Around', 'uikit-blocks' ),
		value: 'around',
	},
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const hasInnerBlocks = useSelect(
		( select ) =>
			select( blockEditorStore ).getBlocks( clientId ).length > 0,
		[ clientId ]
	);

	const { replaceInnerBlocks } = useDispatch( blockEditorStore );

	function setTemplate( template ) {
		if ( template.attributes ) {
			setAttributes( template.attributes );
		}

		if ( template.innerBlocks ) {
			replaceInnerBlocks(
				clientId,
				createBlocksFromInnerBlocksTemplate( template.innerBlocks ),
				true
			);
		}
	}

	const blockProps = useBlockProps( {
		className: clsx( {
			'uk-grid': true,

			[ `uk-grid-${ attributes.columnGap }` ]:
				attributes.columnGap &&
				attributes.rowGap &&
				attributes.columnGap === attributes.rowGap,
			[ `uk-grid-column-${ attributes.columnGap }` ]:
				attributes.columnGap &&
				attributes.columnGap !== attributes.rowGap,
			[ `uk-grid-row-${ attributes.rowGap }` ]:
				attributes.rowGap && attributes.columnGap !== attributes.rowGap,

			[ `uk-child-width-${ attributes.childWidth }` ]:
				attributes.childWidth,
			[ `uk-child-width-${ attributes.childWidthS }@s` ]:
				attributes.childWidthS,
			[ `uk-child-width-${ attributes.childWidthM }@m` ]:
				attributes.childWidthM,
			[ `uk-child-width-${ attributes.childWidthL }@l` ]:
				attributes.childWidthL,
			[ `uk-child-width-${ attributes.childWidthXL }@xl` ]:
				attributes.childWidthXL,

			[ `uk-flex-${ attributes.flexHorizontal }` ]:
				attributes.flexHorizontal,
			[ `uk-flex-${ attributes.flexHorizontalS }@s` ]:
				attributes.flexHorizontalS,
			[ `uk-flex-${ attributes.flexHorizontalM }@m` ]:
				attributes.flexHorizontalM,
			[ `uk-flex-${ attributes.flexHorizontalL }@l` ]:
				attributes.flexHorizontalL,
			[ `uk-flex-${ attributes.flexHorizontalXL }@xl` ]:
				attributes.flexHorizontalXL,
			[ `uk-flex-${ attributes.flexVertical }` ]: attributes.flexVertical,

			'uk-grid-divider': attributes.divider,
			'uk-grid-match': attributes.matchHeight,
		} ),
		'data-uk-grid': '',
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		renderAppender: hasInnerBlocks
			? undefined
			: InnerBlocks.DefaultBlockAppender,
		/*
		 * Orientation is required to fix 'Warning: Encountered two children with the same key' error because we use grid and it probably messes with useBlockDropZone hook which is used by InnerBlocks
		 *
		 * @see https://github.com/WordPress/gutenberg/blob/0a7e10db2037cb80e4ab8cda4363ba18d6a3a83f/packages/block-editor/src/components/use-block-drop-zone/index.js#L397
		 *
		 */
		orientation: 'horizontal',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Gap Settings', 'uikit-blocks' ) }
					initialOpen={ false }
				>
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
				<PanelBody
					title={ __( 'Child Width Settings', 'uikit-blocks' ) }
					initialOpen={ false }
				>
					<p>
						{ __(
							'Set the column child width for each breakpoint. If "Inherit" is selected, the column width of the next smaller screen size is applied. It can be overridden in each cell settings.',
							'uikit-blocks'
						) }
					</p>
					<SelectControl
						label={ __(
							'Child Width @ Mobile Portrait',
							'uikit-blocks'
						) }
						value={ attributes.childWidth }
						options={ childWidthOptions }
						onChange={ ( value ) => {
							setAttributes( { childWidth: value } );
						} }
					/>
					<SelectControl
						label={ __(
							'Child Width @ Mobile Landscape',
							'uikit-blocks'
						) }
						value={ attributes.childWidthS }
						options={ childWidthOptions }
						onChange={ ( value ) => {
							setAttributes( { childWidthS: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Child Width @ Tablet', 'uikit-blocks' ) }
						value={ attributes.childWidthM }
						options={ childWidthOptions }
						onChange={ ( value ) => {
							setAttributes( { childWidthM: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Child Width @ Desktop', 'uikit-blocks' ) }
						value={ attributes.childWidthL }
						options={ childWidthOptions }
						onChange={ ( value ) => {
							setAttributes( { childWidthL: value } );
						} }
					/>
					<SelectControl
						label={ __(
							'Child Width @ Large Screen',
							'uikit-blocks'
						) }
						value={ attributes.childWidthXL }
						options={ childWidthOptions }
						onChange={ ( value ) => {
							setAttributes( { childWidthXL: value } );
						} }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Flex Settings', 'uikit-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __(
							'Horizontal Alignment @ Mobile Portrait',
							'uikit-blocks'
						) }
						value={ attributes.flexHorizontal }
						options={ flexHorizontalOptions }
						onChange={ ( value ) => {
							setAttributes( { flexHorizontal: value } );
						} }
					/>
					<SelectControl
						label={ __(
							'Horizontal Alignment @ Mobile Landscape',
							'uikit-blocks'
						) }
						value={ attributes.flexHorizontalS }
						options={ flexHorizontalOptions }
						onChange={ ( value ) => {
							setAttributes( { flexHorizontalS: value } );
						} }
					/>
					<SelectControl
						label={ __(
							'Horizontal Alignment @ Tablet',
							'uikit-blocks'
						) }
						value={ attributes.flexHorizontalM }
						options={ flexHorizontalOptions }
						onChange={ ( value ) => {
							setAttributes( { flexHorizontalM: value } );
						} }
					/>
					<SelectControl
						label={ __(
							'Horizontal Alignment @ Desktop',
							'uikit-blocks'
						) }
						value={ attributes.flexHorizontalL }
						options={ flexHorizontalOptions }
						onChange={ ( value ) => {
							setAttributes( { flexHorizontalL: value } );
						} }
					/>
					<SelectControl
						label={ __(
							'Horizontal Alignment @ Large Screen',
							'uikit-blocks'
						) }
						value={ attributes.flexHorizontalXL }
						options={ flexHorizontalOptions }
						onChange={ ( value ) => {
							setAttributes( { flexHorizontalXL: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Vertical Alignment', 'uikit-blocks' ) }
						value={ attributes.flexVertical }
						options={ [
							{
								label: __( 'None', 'uikit-blocks' ),
								value: '',
							},
							{
								label: __( 'Top', 'uikit-blocks' ),
								value: 'top',
							},
							{
								label: __( 'Middle', 'uikit-blocks' ),
								value: 'middle',
							},
							{
								label: __( 'Bottom', 'uikit-blocks' ),
								value: 'bottom',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { flexVertical: value } );
						} }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Gird Settings', 'uikit-blocks' ) }
					initialOpen={ false }
				>
					<CheckboxControl
						label={ __(
							'Enable divider between grid cells',
							'uikit-blocks'
						) }
						checked={ attributes.divider }
						onChange={ ( value ) => {
							setAttributes( { divider: value } );
						} }
					/>
					<CheckboxControl
						label={ __( 'Match cell height', 'uikit-blocks' ) }
						checked={ attributes.matchHeight }
						onChange={ ( value ) => {
							setAttributes( { matchHeight: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Masonry', 'uikit-blocks' ) }
						value={ attributes.masonry }
						options={ [
							{
								label: __( 'None', 'uikit-blocks' ),
								value: '',
							},
							{
								label: __( 'Pack', 'uikit-blocks' ),
								value: 'pack',
							},
							{
								label: __( 'Next', 'uikit-blocks' ),
								value: 'next',
							},
						] }
						onChange={ ( value ) => {
							setAttributes( { masonry: value } );
						} }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Parallax Settings', 'uikit-blocks' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Parallax', 'uikit-blocks' ) }
						value={ attributes.parallax }
						help={ __(
							'To move single columns of a grid at different speeds while scrolling, just add parallax number. The number sets the parallax translation in pixels.',
							'uikit-blocks'
						) }
						onChange={ ( value ) =>
							setAttributes( { parallax: value } )
						}
					/>
					<TextControl
						label={ __( 'Parallax Start', 'uikit-blocks' ) }
						value={ attributes.parallaxStart }
						help={ __(
							"The parallax-start option defines when the animation starts. The default value of 0 means that the grid's top border and the viewport's bottom border intersect.",
							'uikit-blocks'
						) }
						onChange={ ( value ) =>
							setAttributes( { parallaxStart: value } )
						}
					/>
					<TextControl
						label={ __( 'Parallax End', 'uikit-blocks' ) }
						value={ attributes.parallaxEnd }
						help={ __(
							"The parallax-end option defines when the animation ends. The default value of 0 means that the grid's bottom border and the viewport's top border intersect.",
							'uikit-blocks'
						) }
						onChange={ ( value ) =>
							setAttributes( { parallaxEnd: value } )
						}
					/>
					<CheckboxControl
						label={ __( 'Justify Parallax', 'uikit-blocks' ) }
						checked={ attributes.parallaxJustify }
						help={ __(
							'To justify the grid parallax if columns have different heights, for example in masonry grids, Check the justify option so all grid columns reach the bottom at the same time.',
							'uikit-blocks'
						) }
						onChange={ ( value ) => {
							setAttributes( { parallaxJustify: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...innerBlocksProps }>
				{ hasInnerBlocks ? (
					innerBlocksProps.children
				) : (
					<div className="uk-width-1-1">
						<div className="uk-placeholder uk-padding-small uk-text-center">
							<div className="uk-flex uk-flex-center uk-flex-wrap uk-child-width-auto uk-text-small">
								{ templates.map( ( template ) => (
									<button
										key={ template.name }
										onClick={ () =>
											setTemplate( template )
										}
										className="uk-button-clean"
									>
										<div
											className="uk-padding-small"
											style={ { width: '100px' } }
										>
											<Icon
												icon={ template.icon }
												size={ 40 }
												className="uk-text-muted"
											/>

											<div>{ template.title }</div>
										</div>
									</button>
								) ) }
							</div>
							<div className="uk-margin-small-top">
								{ __(
									'Select a layout or add a grid cell block to start custom design.',
									'uikit-blocks'
								) }
							</div>
						</div>
					</div>
				) }
			</div>
		</>
	);
}
