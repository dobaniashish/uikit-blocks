import generalAttributes from '../general-attributes';

export default {
	$schema: 'https://schemas.wp.org/trunk/block.json',
	apiVersion: 3,
	name: 'uikit-blocks/icon',
	title: 'Icon (UIkit)',
	category: 'uikit-blocks',
	keywords: [ 'Icon', 'UIkit Icon', 'UIkit' ],
	textdomain: 'uikit-blocks',
	version: '1.0',
	attributes: {
		...generalAttributes,
		icon: {
			type: 'string',
		},
		url: {
			type: 'string',
		},
		size: {
			type: 'integer',
			default: 60,
		},
		color: {
			type: 'string',
			enum: [
				'',
				'muted',
				'emphasis',
				'primary',
				'secondary',
				'success',
				'warning',
				'danger',
			],
			default: '',
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
		linkStyle: {
			type: 'string',
			enum: [
				'', // Link.
				'icon-link',
				'icon-button',
				'link-muted',
				'link-text',
				'link-reset',
			],
			default: 'icon-link',
		},
	},
};
