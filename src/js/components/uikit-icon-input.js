import { __ } from '@wordpress/i18n';

import { useState } from '@wordpress/element';

import {
	useBaseControlProps,
	Button,
	Modal,
	BaseControl,
	SearchControl,
	Flex,
	FlexBlock,
	FlexItem,
} from '@wordpress/components';

import { search } from '@wordpress/icons';

import clsx from 'clsx';

import icons from './icons';

export default function UIkitIconInput( props ) {
	const { label, help, value, onChange } = props;

	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const [ searchInput, setSearchInput ] = useState( '' );

	const openModal = () => {
		setIsModalOpen( true );
		setSearchInput( '' );
	};
	const closeModal = () => {
		setIsModalOpen( false );
	};

	const filteredIcons = icons.filter( ( icon ) =>
		icon.toLowerCase().includes( searchInput.toLowerCase() )
	);

	const { baseControlProps, controlProps } = useBaseControlProps( {
		label,
		help,
	} );

	return (
		<>
			{ isModalOpen && (
				<Modal
					title={ __( 'Icons', 'uikit-blocks' ) }
					size="large"
					onRequestClose={ closeModal }
				>
					<SearchControl
						label={ __( 'Search icon', 'uikit-blocks' ) }
						value={ searchInput }
						onChange={ setSearchInput }
					/>

					<Flex wrap={ true }>
						{ filteredIcons.map( ( icon ) => (
							<FlexItem key={ icon }>
								<button
									onClick={ () => {
										onChange( icon );
										closeModal();
									} }
									className="uk-button-clean"
								>
									<div
										className="uk-padding-small"
										style={ { width: '100px' } }
									>
										<span
											data-uk-icon={ clsx(
												`icon: ${ icon };`,
												'width: 40;',
												'height: 40;'
											) }
										></span>

										<div>{ icon }</div>
									</div>
								</button>
							</FlexItem>
						) ) }
					</Flex>
				</Modal>
			) }
			<BaseControl { ...baseControlProps }>
				<Flex>
					<FlexBlock>
						<input
							className="components-text-control__input"
							value={ value }
							placeholder={ __( 'Icon name…', 'uikit-blocks' ) }
							onChange={ ( event ) =>
								onChange( event.target.value )
							}
							{ ...controlProps }
						/>
					</FlexBlock>
					<FlexItem>
						<Button
							size="compact"
							icon={ search }
							onClick={ openModal }
							variant="secondary"
						></Button>
					</FlexItem>
				</Flex>
			</BaseControl>
		</>
	);
}
