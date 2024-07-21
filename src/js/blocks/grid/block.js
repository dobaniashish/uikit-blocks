import { registerBlockType } from '@wordpress/blocks';

import { InnerBlocks } from '@wordpress/block-editor';

import { grid as icon } from '@wordpress/icons';

import edit from './edit';
import metadata from './metadata';

registerBlockType( metadata.name, {
	...metadata,
	icon,
	edit,
	save() {
		return <InnerBlocks.Content />;
	},
} );
