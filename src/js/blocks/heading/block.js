import { registerBlockType } from '@wordpress/blocks';

import { heading as icon } from '@wordpress/icons';

import edit from './edit';
import metadata from './metadata';

registerBlockType( metadata.name, {
	...metadata,
	icon,
	edit,
} );
