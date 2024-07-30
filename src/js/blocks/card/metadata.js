import generalAttributes from '../general-attributes';

export default {
	$schema: 'https://schemas.wp.org/trunk/block.json',
	apiVersion: 3,
	name: 'uikit-blocks/card',
	title: 'Card (UIkit)',
	category: 'uikit-blocks',
	keywords: [ 'Card', 'UIkit Card', 'UIkit' ],
	textdomain: 'uikit-blocks',
	version: '1.0',
	attributes: {
		...generalAttributes,
		style: {
			type: 'string',
			enum: [ 'default', 'primary', 'secondary', '' ],
			default: 'default',
		},
		hover: {
			type: 'boolean',
		},
		padding: {
			type: 'string',
			enum: [ '', 'small', 'large' ],
		},
		image: {
			type: 'string',
		},
		imageAlt: {
			type: 'string',
		},
	},
};
