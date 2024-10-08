import generalAttributes, { effect } from '../general-attributes';

export default {
	$schema: 'https://schemas.wp.org/trunk/block.json',
	apiVersion: 3,
	name: 'uikit-blocks/heading',
	title: 'Heading (UIkit)',
	category: 'uikit-blocks',
	keywords: [ 'Heading', 'UIkit Heading', 'UIkit' ],
	textdomain: 'uikit-blocks',
	version: '1.0',
	attributes: {
		...generalAttributes,
		...effect,
		text: {
			type: 'string',
		},
		tag: {
			type: 'string',
			enum: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div' ],
			default: 'h1',
		},
		style: {
			type: 'string',
			enum: [
				'',
				'heading-3xlarge',
				'heading-2xlarge',
				'heading-xlarge',
				'heading-large',
				'heading-medium',
				'heading-small',
				'h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6',
				'text-meta',
				'text-lead',
				'text-small',
				'text-large',
			],
			default: '',
		},
		decoration: {
			type: 'string',
			enum: [ '', 'divider', 'bullet', 'line' ],
			default: '',
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
				'background',
			],
			default: '',
		},
	},
};
