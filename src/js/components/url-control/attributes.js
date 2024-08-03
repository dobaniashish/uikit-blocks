export const basic = {
	url: {
		type: 'string',
	},
	target: {
		type: 'string',
		enum: [ '', '_blank', 'lightbox' ],
	},
	rel: {
		type: 'string',
	},
};

export const lightbox = {
	lightboxType: {
		type: 'string',
	},
};

export default {
	...basic,
	...lightbox,
};
