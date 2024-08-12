import generalAttributes, { effect } from '../general-attributes';

export default {
	$schema: 'https://schemas.wp.org/trunk/block.json',
	apiVersion: 3,
	name: 'uikit-blocks/divider',
	title: 'Divider (UIkit)',
	category: 'uikit-blocks',
	keywords: [ 'Divider', 'UIkit Divider', 'UIkit' ],
	textdomain: 'uikit-blocks',
	version: '1.0',
	attributes: {
		...generalAttributes,
		...effect,
		style: {
			type: 'string',
			enum: [ '', 'icon', 'small', 'vertical' ],
		},
		tag: {
			type: 'string',
			enum: [ 'hr', 'div' ],
			default: 'hr',
		},
	},
};
