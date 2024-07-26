import { registerBlockType } from '@wordpress/blocks';

import { InnerBlocks } from '@wordpress/block-editor';

import { Path, SVG } from '@wordpress/components';

import edit from './edit';
import metadata from './metadata';

registerBlockType( metadata.name, {
	...metadata,
	icon: (
		<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<Path d="M18.7 4.635H5.3c-1.3 0-2.3 1-2.3 2.3v10.131c0 1.3 1 2.3 2.3 2.3h13.4c1.3 0 2.3-1 2.3-2.3V6.935c0-1.3-1-2.3-2.3-2.3Zm.8 6.666v5.764c0 .4-.4.8-.8.8H5.3c-.4 0-.8-.4-.8-.8V6.935c0-.4.4-.8.8-.8h13.4c.4 0 .8.4.8.8v4.367Z" />
		</SVG>
	),
	edit,
	save() {
		return <InnerBlocks.Content />;
	},
} );
