import { scrollspy, transition } from '../general-attributes';

export default {
	$schema: 'https://schemas.wp.org/trunk/block.json',
	apiVersion: 3,
	name: 'uikit-blocks/section',
	title: 'Section (UIkit)',
	category: 'uikit-blocks',
	keywords: [ 'Section', 'UIkit Section', 'UIkit' ],
	textdomain: 'uikit-blocks',
	version: '1.0',
	allowedBlocks: [ 'uikit-blocks/container' ],
	attributes: {
		...scrollspy,
		...transition,
		style: {
			type: 'string',
			enum: [ 'default', 'muted', 'primary', 'secondary', '' ],
		},
		colorMode: {
			type: 'string',
			enum: [ '', 'light', 'dark' ],
		},
		padding: {
			type: 'string',
			enum: [
				'',
				'xsmall',
				'small',
				'large',
				'xlarge',
				'remove-vertical',
			],
		},
		paddingRemoveTop: {
			type: 'boolean',
		},
		paddingRemoveBottom: {
			type: 'boolean',
		},
		background: {
			type: 'string',
		},
		backgroundSize: {
			type: 'string',
			enum: [ '', 'cover', 'contain' ],
		},
		backgroundPosition: {
			type: 'string',
			enum: [
				'',
				'top-left',
				'top-center',
				'top-right',
				'center-left',
				'center-center',
				'center-right',
				'bottom-left',
				'bottom-center',
				'bottom-right',
			],
		},
		backgroundRepeat: {
			type: 'boolean',
		},
		backgroundEffect: {
			type: 'string',
			enum: [ '', 'fixed', 'parallax' ],
		},
		backgroundParallaxBGX: {
			type: 'string',
		},
		backgroundParallaxBGY: {
			type: 'string',
		},
	},
};
