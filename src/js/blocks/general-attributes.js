const breakpointOptions = [
	'', // None
	's',
	'm',
	'l',
	'xl',
];

export const margin = {
	margin: {
		type: 'string',
		enum: [
			'', // Keep defaults
			'small',
			'default',
			'medium',
			'large',
			'xlarge',
			'remove-vertical',
		],
	},
	marginRemoveTop: {
		type: 'boolean',
	},
	marginRemoveBottom: {
		type: 'boolean',
	},
};

export const textAlign = {
	textAlign: {
		type: 'string',
		enum: [
			'', // Inherit
			'left',
			'center',
			'right',
			'justify',
		],
	},
	textAlignBreakpoint: {
		type: 'string',
		enum: breakpointOptions,
	},
	textAlignFallback: {
		type: 'string',
		enum: [
			'', // Inherit
			'left',
			'center',
			'right',
			// No Justify
		],
	},
};

export const visiblity = {
	visiblity: {
		type: 'string',
		enum: [
			'', // Always
			's',
			'm',
			'l',
			'xl',
			'hidden-s',
			'hidden-m',
			'hidden-l',
			'hidden-xl',
		],
	},
};

export const position = {
	position: {
		type: 'string',
		enum: [
			'', // Static
			'relative',
			'absolute',
		],
	},
	positionLeft: {
		type: 'integer',
	},
	positionRight: {
		type: 'integer',
	},
	positionTop: {
		type: 'integer',
	},
	positionBottom: {
		type: 'integer',
	},
	positionZIndex: {
		type: 'integer',
	},
};

export default {
	...margin,
	...textAlign,
	...visiblity,
	...position,
};
