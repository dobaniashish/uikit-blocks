import generalAttributes, {
	scrollspy,
	transition,
	effect,
} from '../general-attributes';

export default {
	$schema: 'https://schemas.wp.org/trunk/block.json',
	apiVersion: 3,
	name: 'uikit-blocks/grid',
	title: 'Grid (UIkit)',
	category: 'uikit-blocks',
	keywords: [ 'Grid', 'UIkit Grid', 'UIkit' ],
	textdomain: 'uikit-blocks',
	version: '1.0',
	allowedBlocks: [ 'uikit-blocks/grid-cell' ],
	attributes: {
		...generalAttributes,
		...scrollspy,
		...transition,
		...effect,
		columnGap: {
			type: 'string',
			enum: [ '', 'small', 'medium', 'large', 'collapse' ],
		},
		rowGap: {
			type: 'string',
			enum: [ '', 'small', 'medium', 'large', 'collapse' ],
		},
		childWidth: {
			type: 'string',
			enum: [
				'',
				'expand',
				'auto',
				'1-1',
				'1-2',
				'1-3',
				'1-4',
				'1-5',
				'1-6',
			],
			default: 'expand',
		},
		childWidthS: {
			type: 'string',
			enum: [
				'',
				'expand',
				'auto',
				'1-1',
				'1-2',
				'1-3',
				'1-4',
				'1-5',
				'1-6',
			],
		},
		childWidthM: {
			type: 'string',
			enum: [
				'',
				'expand',
				'auto',
				'1-1',
				'1-2',
				'1-3',
				'1-4',
				'1-5',
				'1-6',
			],
		},
		childWidthL: {
			type: 'string',
			enum: [
				'',
				'expand',
				'auto',
				'1-1',
				'1-2',
				'1-3',
				'1-4',
				'1-5',
				'1-6',
			],
		},
		childWidthXL: {
			type: 'string',
			enum: [
				'',
				'expand',
				'auto',
				'1-1',
				'1-2',
				'1-3',
				'1-4',
				'1-5',
				'1-6',
			],
		},
		flexHorizontal: {
			type: 'string',
			enum: [ '', 'left', 'center', 'right', 'between', 'around' ],
		},
		flexHorizontalS: {
			type: 'string',
			enum: [ '', 'left', 'center', 'right', 'between', 'around' ],
		},
		flexHorizontalM: {
			type: 'string',
			enum: [ '', 'left', 'center', 'right', 'between', 'around' ],
		},
		flexHorizontalL: {
			type: 'string',
			enum: [ '', 'left', 'center', 'right', 'between', 'around' ],
		},
		flexHorizontalXL: {
			type: 'string',
			enum: [ '', 'left', 'center', 'right', 'between', 'around' ],
		},
		flexVertical: {
			type: 'string',
			enum: [ '', 'top', 'middle', 'bottom' ],
		},
		divider: {
			type: 'boolean',
		},
		matchHeight: {
			type: 'boolean',
		},
		masonry: {
			type: 'string',
			enum: [ '', 'pack', 'next' ],
		},
		parallax: {
			type: 'string',
		},
		parallaxStart: {
			type: 'string',
		},
		parallaxEnd: {
			type: 'string',
		},
		parallaxJustify: {
			type: 'boolean',
		},
	},
};
