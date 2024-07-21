module.exports = {
	$schema: 'https://schemas.wp.org/trunk/block.json',
	apiVersion: 2,
	name: 'uikit-blocks/grid-cell',
	title: 'Grid Cell (UIkit)',
	category: 'uikit-blocks',
	keywords: [ 'Grid Cell', 'UIkit Grid Cell', 'UIkit' ],
	textdomain: 'uikit-blocks',
	version: '1.0',
	parent: [ 'uikit-blocks/grid' ],
	attributes: {
		width: {
			type: 'string',
			enum: [
				'',
				'expand',
				'auto',
				'1-1',
				'5-6',
				'4-5',
				'3-4',
				'2-3',
				'3-5',
				'1-2',
				'2-5',
				'1-3',
				'1-4',
				'1-5',
				'1-6',
				'small',
				'medium',
				'large',
				'xlarge',
				'2xlarge',
			],
		},
		widthS: {
			type: 'string',
			enum: [
				'',
				'expand',
				'auto',
				'1-1',
				'5-6',
				'4-5',
				'3-4',
				'2-3',
				'3-5',
				'1-2',
				'2-5',
				'1-3',
				'1-4',
				'1-5',
				'1-6',
			],
		},
		widthM: {
			type: 'string',
			enum: [
				'',
				'expand',
				'auto',
				'1-1',
				'5-6',
				'4-5',
				'3-4',
				'2-3',
				'3-5',
				'1-2',
				'2-5',
				'1-3',
				'1-4',
				'1-5',
				'1-6',
			],
		},
		widthL: {
			type: 'string',
			enum: [
				'',
				'expand',
				'auto',
				'1-1',
				'5-6',
				'4-5',
				'3-4',
				'2-3',
				'3-5',
				'1-2',
				'2-5',
				'1-3',
				'1-4',
				'1-5',
				'1-6',
			],
		},
		widthXL: {
			type: 'string',
			enum: [
				'',
				'expand',
				'auto',
				'1-1',
				'5-6',
				'4-5',
				'3-4',
				'2-3',
				'3-5',
				'1-2',
				'2-5',
				'1-3',
				'1-4',
				'1-5',
				'1-6',
			],
		},
		flexOrder: {
			type: 'string',
			enum: [ '', 'first', 'last' ],
		},
		flexOrderS: {
			type: 'string',
			enum: [ '', 'first', 'last' ],
		},
		flexOrderM: {
			type: 'string',
			enum: [ '', 'first', 'last' ],
		},
		flexOrderL: {
			type: 'string',
			enum: [ '', 'first', 'last' ],
		},
		flexOrderXL: {
			type: 'string',
			enum: [ '', 'first', 'last' ],
		},
	},
};
