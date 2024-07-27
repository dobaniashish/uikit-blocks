const breakpointOptions = [
	'', // None
	's',
	'm',
	'l',
	'xl',
];

export const margin = {
	generalMargin: {
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
	generalMarginRemoveTop: {
		type: 'boolean',
	},
	generalMarginRemoveBottom: {
		type: 'boolean',
	},
};

export const textAlign = {
	generalTextAlign: {
		type: 'string',
		enum: [
			'', // Inherit
			'left',
			'center',
			'right',
			'justify',
		],
	},
	generalTextAlignBreakpoint: {
		type: 'string',
		enum: breakpointOptions,
	},
	generalTextAlignFallback: {
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
	generalVisiblity: {
		type: 'string',
		enum: [
			'', // Always
			'visible@s',
			'visible@m',
			'visible@l',
			'visible@xl',
			'hidden@s',
			'hidden@m',
			'hidden@l',
			'hidden@xl',
		],
	},
};

export const position = {
	generalPosition: {
		type: 'string',
		enum: [
			'', // Static
			'relative',
			'absolute',
		],
	},
	generalPositionLeft: {
		type: 'integer',
	},
	generalPositionRight: {
		type: 'integer',
	},
	generalPositionTop: {
		type: 'integer',
	},
	generalPositionBottom: {
		type: 'integer',
	},
	generalPositionZIndex: {
		type: 'integer',
	},
};

export default {
	...margin,
	...textAlign,
	...visiblity,
	...position,
};
