import generalAttributes, {
	scrollspy,
	transition,
	effect,
} from '../general-attributes';

export default {
	$schema: 'https://schemas.wp.org/trunk/block.json',
	apiVersion: 3,
	name: 'uikit-blocks/list',
	title: 'List (UIkit)',
	category: 'uikit-blocks',
	keywords: [ 'List', 'UIkit List', 'UIkit' ],
	textdomain: 'uikit-blocks',
	version: '1.0',
	allowedBlocks: [ 'uikit-blocks/list-item' ],
	attributes: {
		...generalAttributes,
		...scrollspy,
		...transition,
		...effect,
		marker: {
			type: 'string',
			enum: [
				'',
				'disc',
				'circle',
				'square',
				'decimal',
				'hyphen',
				'bullet', // Image bullet.
			],
		},
		markerColor: {
			type: 'string',
			enum: [ '', 'muted', 'emphasis', 'primary', 'secondary' ],
		},
		style: {
			type: 'string',
			enum: [ '', 'divider', 'striped' ],
		},
		size: {
			type: 'string',
			enum: [ '', 'large', 'collapse' ],
		},
	},
};
