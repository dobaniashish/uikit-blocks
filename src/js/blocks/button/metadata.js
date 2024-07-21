module.exports = {
	$schema: 'https://schemas.wp.org/trunk/block.json',
	apiVersion: 2,
	name: 'uikit-blocks/button',
	title: 'Button (UIkit)',
	category: 'uikit-blocks',
	keywords: [ 'Button', 'UIkit Button', 'UIkit' ],
	textdomain: 'uikit-blocks',
	version: '1.0',
	attributes: {
		text: {
			type: 'string',
		},
		url: {
			type: 'string',
		},
		style: {
			type: 'string',
			enum: [
				'default',
				'primary',
				'secondary',
				'danger',
				'text',
				'link',
			],
			default: 'default',
		},
		size: {
			type: 'string',
			enum: [ '', 'small', 'large' ],
		},
		width: {
			type: 'string',
			enum: [
				'',
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
		target: {
			type: 'string',
			enum: [ '', '_blank', 'lightbox' ],
		},
		lightboxType: {
			type: 'string',
		},
		rel: {
			type: 'string',
		},
	},
};
