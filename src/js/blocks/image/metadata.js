import generalAttributes, { effect } from '../general-attributes';
import urlAttributes from '../../components/url-control/attributes';

export default {
	$schema: 'https://schemas.wp.org/trunk/block.json',
	apiVersion: 3,
	name: 'uikit-blocks/image',
	title: 'Image (UIkit)',
	category: 'uikit-blocks',
	keywords: [ 'Image', 'UIkit Image', 'UIkit' ],
	textdomain: 'uikit-blocks',
	version: '1.0',
	attributes: {
		...generalAttributes,
		...effect,
		...urlAttributes,
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
		imageBoxShadow: {
			type: 'string',
			enum: [ '', 'small', 'medium', 'large', 'xlarge' ],
		},
		imageHoverBoxShadow: {
			type: 'string',
			enum: [ '', 'small', 'medium', 'large', 'xlarge' ],
		},
	},
};
