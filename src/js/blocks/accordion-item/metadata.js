export default {
	$schema: 'https://schemas.wp.org/trunk/block.json',
	apiVersion: 3,
	name: 'uikit-blocks/accordion-item',
	title: 'Accordion Item (UIkit)',
	category: 'uikit-blocks',
	keywords: [ 'Accordion Item', 'UIkit Accordion Item', 'UIkit' ],
	textdomain: 'uikit-blocks',
	version: '1.0',
	parent: [ 'uikit-blocks/accordion' ],
	attributes: {
		title: {
			type: 'string',
		},
		open: {
			type: 'boolean',
		},
	},
};
