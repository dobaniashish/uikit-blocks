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

export const scrollspy = {
	generalScrollspy: {
		type: 'string',
		enum: [
			'', // Disable scrollspy
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
			'kenburns',
			'shake',
		],
	},
	generalScrollspyDelay: {
		type: 'string',
	},
};

export const transition = {
	generalTransitionHover: {
		type: 'boolean', // Enable transition on hover
	},
};

export const effect = {
	generalEffect: {
		type: 'string',
		enum: [
			'', // No Effect
			'animation', // If scrollspy is set
			'transition', // If transition hover is enabled
			'parallax',
		],
	},
	generalAnimation: {
		type: 'string',
		enum: [
			'', // Disable
			'inherit', // Inherit from parent
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
		default: '',
	},
	generalTransition: {
		type: 'string',
		enum: [
			'',
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
		default: '',
	},
	generalParallaxX: {
		type: 'string',
	},
	generalParallaxY: {
		type: 'string',
	},
	generalParallaxScale: {
		type: 'string',
	},
	generalParallaxRotate: {
		type: 'string',
	},
	generalParallaxOpacity: {
		type: 'string',
	},
	generalParallaxBlur: {
		type: 'string',
	},
	generalParallaxOrigin: {
		type: 'string',
		enum: [
			'top-left',
			'top-center',
			'top-right',
			'center-left',
			'',
			'center-right',
			'bottom-left',
			'bottom-center',
			'bottom-right',
		],
		default: '',
	},
	generalParallaxEasing: {
		type: 'string',
	},
	generalParallaxBreakpoint: {
		type: 'string',
		enum: [ '', 's', 'm', 'l', 'xl' ],
	},
	generalParallaxCustom: {
		type: 'string',
	},
};

export default {
	...margin,
	...textAlign,
	...visiblity,
	...position,
};
