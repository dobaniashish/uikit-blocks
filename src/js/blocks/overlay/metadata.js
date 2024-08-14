import generalAttributes, { scrollspy, effect } from '../general-attributes';
import { basic as urlAttributes } from '../../components/url-control/attributes';

export default {
	$schema: 'https://schemas.wp.org/trunk/block.json',
	apiVersion: 3,
	name: 'uikit-blocks/overlay',
	title: 'Overlay (UIkit)',
	category: 'uikit-blocks',
	keywords: [ 'Overlay', 'UIkit Overlay', 'UIkit', 'Cover' ],
	textdomain: 'uikit-blocks',
	version: '1.0',
	attributes: {
		...generalAttributes,
		...scrollspy,
		...effect,
		...urlAttributes,

		// Main image.
		image: {
			type: 'string',
		},
		imageId: {
			type: 'integer',
		},
		width: {
			type: 'string',
		},
		height: {
			type: 'string',
		},
		loading: {
			type: 'string',
		},
		focalPoint: {
			type: 'string',
			enum: [
				'',
				'top-left',
				'top-center',
				'top-right',
				'center-left',
				'center-right',
				'bottom-left',
				'bottom-center',
				'bottom-right',
			],
		},
		sizeSlug: {
			type: 'string', // Attachment sizes.
		},
		imageAlt: {
			type: 'string',
		},

		// Hover image.
		hoverImage: {
			type: 'string',
		},
		hoverImageId: {
			type: 'integer',
		},
		hoverSizeSlug: {
			type: 'string', // Attachment sizes.
		},

		// Overlay.
		overlayMode: {
			type: 'string',
			enum: [ '', 'cover' ],
			default: 'cover',
		},
		overlayHover: {
			type: 'boolean',
		},
		overlayStyle: {
			type: 'string',
			enum: [
				'',
				'overlay-default',
				'overlay-primary',
				'tile-default',
				'tile-muted',
				'tile-primary',
				'tile-secondary',
			],
			default: 'overlay-default',
		},
		overlayMargin: {
			type: 'string',
			enum: [ '', 'small', 'medium', 'large' ],
		},
		overlayPadding: {
			type: 'string',
			enum: [ '', 'small', 'large', 'remove' ],
		},
		overlayPosition: {
			type: 'string',
			enum: [
				'top',
				'left',
				'right',
				'bottom',
				'center',
				'top-left',
				'top-center',
				'top-right',
				'center-left',
				'center-right',
				'bottom-left',
				'bottom-center',
				'bottom-right',
			],
			default: 'center',
		},
		overlayWidth: {
			type: 'string',
			enum: [
				'', // Auto.
				'small',
				'medium',
				'large',
				'xlarge',
			],
		},
		overlayColorMode: {
			type: 'string',
			enum: [ '', 'light', 'dark' ],
		},
		overlayTransition: {
			type: 'string',
			enum: [
				'fade',
				'scale-up',
				'scale-down',
				'slide-top',
				'slide-bottom',
				'slide-left',
				'slide-right',
				'slide-top-small',
				'slide-bottom-small',
				'slide-left-small',
				'slide-right-small',
				'slide-top-medium',
				'slide-bottom-medium',
				'slide-left-medium',
				'slide-right-medium',
			],
			default: 'fade',
		},
		overlayImageTransition: {
			type: 'string',
			enum: [ '', 'scale-up', 'scale-down' ],
		},
	},
};
