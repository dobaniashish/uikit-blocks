export default {
	$schema: 'https://schemas.wp.org/trunk/block.json',
	apiVersion: 2,
	name: 'uikit-blocks/container',
	title: 'Container (UIkit)',
	category: 'uikit-blocks',
	keywords: [ 'Container', 'UIkit Container', 'UIkit' ],
	textdomain: 'uikit-blocks',
	version: '1.0',
	attributes: {
		width: {
			type: 'string',
			enum: [
				'',
				'xsmall',
				'small',
				'large',
				'xlarge',
				'expand',
				'none',
			],
		},
		expandLeft: {
			type: 'boolean',
		},
		expandRight: {
			type: 'boolean',
		},
	},
};