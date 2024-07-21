module.exports = {
	$schema: 'https://schemas.wp.org/trunk/block.json',
	apiVersion: 2,
	name: 'uikit-blocks/countdown',
	title: 'Countdown (UIkit)',
	category: 'uikit-blocks',
	keywords: [ 'Countdown', 'UIkit Countdown', 'UIkit' ],
	textdomain: 'uikit-blocks',
	version: '1.0',
	attributes: {
		date: {
			type: 'string',
		},
		showLabel: {
			type: 'boolean',
			default: true,
		},
		labelDays: {
			type: 'string',
		},
		labelHours: {
			type: 'string',
		},
		labelMinutes: {
			type: 'string',
		},
		labelSeconds: {
			type: 'string',
		},
		labelMargin: {
			type: 'string',
			enum: [ '', 'small', 'medium', 'none' ],
		},
		columnGap: {
			type: 'string',
			enum: [ '', 'small', 'medium', 'large', 'collapse' ],
			default: 'small',
		},
		rowGap: {
			type: 'string',
			enum: [ '', 'small', 'medium', 'large', 'collapse' ],
			default: 'small',
		},
		showSeparator: {
			type: 'boolean',
			default: true,
		},
	},
};
