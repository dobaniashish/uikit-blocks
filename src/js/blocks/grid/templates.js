import { __ } from '@wordpress/i18n';

import { Path, SVG } from '@wordpress/components';

export default [
	{
		name: '100',
		title: __( 'Whole', 'uikit-blocks' ),
		description: __( 'One whole column.', 'uikit-blocks' ),
		icon: (
			<SVG
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<Path d="M21,6c.551,0,1,.449,1,1v10c0,.551-.449,1-1,1H3c-.551,0-1-.449-1-1V7c0-.551.449-1,1-1h18M21,4H3c-1.657,0-3,1.343-3,3v10c0,1.657,1.343,3,3,3h18c1.657,0,3-1.343,3-3V7c0-1.657-1.343-3-3-3h0Z" />
			</SVG>
		),
		innerBlocks: [ [ 'uikit-blocks/grid-cell' ] ],
	},
	{
		name: '50-50',
		title: __( 'Halves', 'uikit-blocks' ),
		description: __( 'Two columns, equally split.', 'uikit-blocks' ),
		icon: (
			<SVG
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<Path d="M21,4H3c-1.657,0-3,1.343-3,3v10c0,1.657,1.343,3,3,3h18c1.657,0,3-1.343,3-3V7c0-1.657-1.343-3-3-3ZM3,18c-.551,0-1-.449-1-1V7c0-.551.449-1,1-1h8v12H3ZM22,17c0,.551-.449,1-1,1h-8V6h8c.551,0,1,.449,1,1v10Z" />
			</SVG>
		),
		innerBlocks: [
			[ 'uikit-blocks/grid-cell' ],
			[ 'uikit-blocks/grid-cell' ],
		],
	},
	{
		name: '66-33',
		title: __( 'Thirds 2–1', 'uikit-blocks' ),
		description: __(
			'Two columns, two-thirds, one-third split.',
			'uikit-blocks'
		),
		icon: (
			<SVG
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<Path d="M21,4H3c-1.657,0-3,1.343-3,3v10c0,1.657,1.343,3,3,3h18c1.657,0,3-1.343,3-3V7c0-1.657-1.343-3-3-3ZM3,18c-.551,0-1-.449-1-1V7c0-.551.449-1,1-1h11.139v12H3ZM22,17c0,.551-.449,1-1,1h-4.861V6h4.861c.551,0,1,.449,1,1v10Z" />
			</SVG>
		),
		innerBlocks: [
			[ 'uikit-blocks/grid-cell', { width: '2-3' } ],
			[ 'uikit-blocks/grid-cell', { width: '1-3' } ],
		],
	},
	{
		name: '33-33-33',
		title: __( 'Thirds', 'uikit-blocks' ),
		description: __( 'Three columns, equally split.', 'uikit-blocks' ),
		icon: (
			<SVG
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<Path d="M21,4H3c-1.657,0-3,1.343-3,3v10c0,1.657,1.343,3,3,3h18c1.657,0,3-1.343,3-3V7c0-1.657-1.343-3-3-3ZM3,18c-.551,0-1-.449-1-1V7c0-.551.449-1,1-1h4v12H3ZM9,18V6h6v12h-6ZM22,17c0,.551-.449,1-1,1h-4V6h4c.551,0,1,.449,1,1v10Z" />
			</SVG>
		),
		innerBlocks: [
			[ 'uikit-blocks/grid-cell' ],
			[ 'uikit-blocks/grid-cell' ],
			[ 'uikit-blocks/grid-cell' ],
		],
	},
	{
		name: '50-50--50-50',
		title: __( 'Halves x 2', 'uikit-blocks' ),
		description: __(
			'Two columns, equally split and two rows.',
			'uikit-blocks'
		),
		icon: (
			<SVG
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<Path d="M21,4H3c-1.657,0-3,1.343-3,3v10c0,1.657,1.343,3,3,3h18c1.657,0,3-1.343,3-3V7c0-1.657-1.343-3-3-3ZM21,6c.551,0,1,.449,1,1v4h-9v-5h8ZM3,6h8v5H2v-4c0-.551.449-1,1-1ZM3,18c-.551,0-1-.449-1-1v-4h9v5H3ZM21,18h-8v-5h9v4c0,.551-.449,1-1,1Z" />
			</SVG>
		),
		innerBlocks: [
			[ 'uikit-blocks/grid-cell' ],
			[ 'uikit-blocks/grid-cell' ],
			[ 'uikit-blocks/grid-cell' ],
			[ 'uikit-blocks/grid-cell' ],
		],
		attributes: {
			childWidth: '1-2',
		},
	},
	{
		name: '33-33-33--33-33-33',
		title: __( 'Thirds x 2', 'uikit-blocks' ),
		description: __(
			'Three columns, equally split and two rows.',
			'uikit-blocks'
		),
		icon: (
			<SVG
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<Path d="M21,4H3c-1.657,0-3,1.343-3,3v10c0,1.657,1.343,3,3,3h18c1.657,0,3-1.343,3-3V7c0-1.657-1.343-3-3-3ZM15,6v5h-6v-5h6ZM2,7c0-.551.449-1,1-1h4v5H2v-4ZM3,18c-.551,0-1-.449-1-1v-4h5v5H3ZM9,18v-5h6v5h-6ZM22,17c0,.551-.449,1-1,1h-4v-5h5v4ZM17,11v-5h4c.551,0,1,.449,1,1v4h-5Z" />
			</SVG>
		),
		innerBlocks: [
			[ 'uikit-blocks/grid-cell' ],
			[ 'uikit-blocks/grid-cell' ],
			[ 'uikit-blocks/grid-cell' ],
			[ 'uikit-blocks/grid-cell' ],
			[ 'uikit-blocks/grid-cell' ],
			[ 'uikit-blocks/grid-cell' ],
		],
		attributes: {
			childWidth: '1-3',
		},
	},
];
