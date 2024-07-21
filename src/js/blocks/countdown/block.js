import { registerBlockType } from '@wordpress/blocks';

import { scheduled as icon } from '@wordpress/icons';

import edit from './edit';
import metadata from './block.json';

registerBlockType( metadata.name, {
	...metadata,
	icon,
	edit,
} );
