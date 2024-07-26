import { registerBlockType } from '@wordpress/blocks';

import { InnerBlocks } from '@wordpress/block-editor';

import { Path, SVG } from '@wordpress/components';

import edit from './edit';
import metadata from './metadata';

registerBlockType( metadata.name, {
	...metadata,
	icon: (
		<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<Path d="M18.7,4.635H5.3c-1.3,0-2.3,1-2.3,2.3v10.131c0,1.3,1,2.3,2.3,2.3h13.4c1.3,0,2.3-1,2.3-2.3V6.935c0-1.3-1-2.3-2.3-2.3ZM19.5,11.301v5.764c0,.4-.4.8-.8.8H5.3c-.4,0-.8-.4-.8-.8V6.935c0-.4.4-.8.8-.8h13.4c.4,0,.8.4.8.8v4.367h0ZM15.978,7.357h-7.956c-1.3,0-2.3,1-2.3,2.3v4.687c0,1.3,1,2.3,2.3,2.3h7.956c1.3,0,2.3-1,2.3-2.3v-4.687c0-1.3-1-2.3-2.3-2.3ZM16.778,12.139v2.203c0,.4-.4.8-.8.8h-7.956c-.4,0-.8-.4-.8-.8v-4.686c0-.4.4-.8.8-.8h7.956c.4,0,.8.4.8.8v2.482Z" />
		</SVG>
	),
	edit,
	save() {
		return <InnerBlocks.Content />;
	},
} );
