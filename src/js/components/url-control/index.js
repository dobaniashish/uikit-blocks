import { __ } from '@wordpress/i18n';

import {
	InspectorControls,
	URLInput,
	BlockControls,
} from '@wordpress/block-editor';

import {
	Dropdown,
	TextControl,
	CheckboxControl,
	Flex,
	FlexBlock,
	ToolbarButton,
	SelectControl,
} from '@wordpress/components';

import { link } from '@wordpress/icons';

export default function URLControl( props ) {
	const { attributes, onChange, lightbox } = props;

	const newTabValue = '_blank';
	const newTabRel = [ 'noreferrer', 'noopener' ];
	const nofollowRel = 'nofollow';

	const nofollow = attributes.rel
		? attributes.rel.split( ' ' ).includes( nofollowRel )
		: false;

	function updateRel( add = [], remove = [] ) {
		let relParts = attributes.rel ? attributes.rel.split( ' ' ) : [];

		relParts.push( ...add );
		relParts = relParts.filter( ( el ) => ! remove.includes( el ) );
		relParts = relParts.filter( ( el ) => el );
		relParts = [ ...new Set( relParts ) ];

		onChangeValue( {
			rel: relParts.join( ' ' ),
		} );
	}

	const onChangeValue = ( newValue ) => {
		onChange( {
			...attributes,
			...newValue,
		} );
	};

	const targetOptions = [
		{
			label: __( 'Same Window', 'uikit-blocks' ),
			value: '',
		},
		{
			label: __( 'New Window', 'uikit-blocks' ),
			value: newTabValue,
		},
	];

	if ( lightbox ) {
		targetOptions.push( {
			label: __( 'Lightbox', 'uikit-blocks' ),
			value: 'lightbox',
		} );
	}

	return (
		<>
			<InspectorControls group="advanced">
				<TextControl
					label={ __( 'Link rel', 'uikit-blocks' ) }
					value={ attributes.rel || '' }
					onChange={ ( value ) => onChangeValue( { rel: value } ) }
				/>
			</InspectorControls>

			<BlockControls group="block">
				<Dropdown
					renderToggle={ ( { isOpen, onToggle } ) => (
						<ToolbarButton
							icon={ link }
							title={ __( 'Link', 'uikit-blocks' ) }
							onClick={ onToggle }
							aria-expanded={ isOpen }
							isActive={ !! attributes.url }
						/>
					) }
					renderContent={ () => (
						<div
							style={ {
								maxWidth: '100%',
								minWidth: 'auto',
								width: '250px',
							} }
						>
							<Flex direction="column">
								<FlexBlock>
									<URLInput
										label={ __( 'Url', 'uikit-blocks' ) }
										className="ukb-block-editor-url-input"
										value={ attributes.url }
										onChange={ ( value ) => {
											onChangeValue( { url: value } );
										} }
										__nextHasNoMarginBottom
									/>
								</FlexBlock>
								<FlexBlock>
									<SelectControl
										label={ __( 'Target', 'uikit-blocks' ) }
										value={ attributes.target }
										options={ targetOptions }
										onChange={ ( value ) => {
											const add =
												value === newTabValue
													? newTabRel
													: [];
											const remove =
												value === newTabValue
													? []
													: newTabRel;
											updateRel( add, remove );

											onChangeValue( {
												target: value,
											} );
										} }
									/>
								</FlexBlock>

								{ lightbox &&
									attributes.target === 'lightbox' && (
										<FlexBlock>
											<SelectControl
												label={ __(
													'Lightbox Type',
													'uikit-blocks'
												) }
												value={
													attributes.lightboxType
												}
												options={ [
													{
														label: __(
															'Default',
															'uikit-blocks'
														),
														value: '',
													},
													{
														label: __(
															'Image',
															'uikit-blocks'
														),
														value: 'image',
													},
													{
														label: __(
															'Video',
															'uikit-blocks'
														),
														value: 'video',
													},
													{
														label: __(
															'Iframe',
															'uikit-blocks'
														),
														value: 'iframe',
													},
												] }
												onChange={ ( value ) => {
													onChangeValue( {
														lightboxType: value,
													} );
												} }
											/>
										</FlexBlock>
									) }

								<FlexBlock>
									<CheckboxControl
										label={ __(
											'Mark as nofollow',
											'uikit-blocks'
										) }
										checked={ nofollow }
										onChange={ ( value ) => {
											const add = value
												? [ nofollowRel ]
												: [];
											const remove = value
												? []
												: [ nofollowRel ];
											updateRel( add, remove );
										} }
									/>
								</FlexBlock>
							</Flex>
						</div>
					) }
				></Dropdown>
			</BlockControls>
		</>
	);
}
