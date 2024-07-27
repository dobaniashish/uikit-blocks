import { registerBlockType } from '@wordpress/blocks';

import { InnerBlocks } from '@wordpress/block-editor';

import { Path, SVG } from '@wordpress/components';

import edit from './edit';
import metadata from './metadata';

registerBlockType( metadata.name, {
	...metadata,
	icon: (
		<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<Path d="M18,8H6c-1.1,0-2,.9-2,2v4c0,1.1.9,2,2,2h12c1.1,0,2-.9,2-2v-4c0-1.1-.9-2-2-2ZM18.5,14c0,.3-.2.5-.5.5H6c-.3,0-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5h12c.3,0,.5.2.5.5v4Z" />
		</SVG>
	),
	edit,
	save() {
		return <InnerBlocks.Content />;
	},
} );
