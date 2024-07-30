import generalAttributes from '../general-attributes';

export default {
	$schema: 'https://schemas.wp.org/trunk/block.json',
	apiVersion: 3,
	name: 'uikit-blocks/accordion',
	title: 'Accordion (UIkit)',
	category: 'uikit-blocks',
	keywords: [ 'Accordion', 'UIkit Accordion', 'UIkit' ],
	textdomain: 'uikit-blocks',
	version: '1.0',
	allowedBlocks: [ 'uikit-blocks/accordion-item' ],
	attributes: {
		...generalAttributes,
		collapsible: {
			type: 'boolean',
			default: true,
		},
		multiple: {
			type: 'boolean',
		},
		transition: {
			type: 'string',
			enum: [
				'',
				'linear',
				'ease',
				'ease-in',
				'ease-in-out',
				'ease-out',
			],
		},
		duration: {
			type: 'string',
		},
	},
};
