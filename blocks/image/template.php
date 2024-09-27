<?php
/**
 * Image Block template.
 *
 * @package uikit-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

use UIkit_Blocks\Helpers\Utils;

$attributes         = $arguments['attributes'];
$general_attributes = $arguments['general_attributes'];

$wrapper_attributes = Utils::attributes_merge(
	$general_attributes,
	array(
		'data-uk-lightbox' => 'lightbox' === $attributes['target'],
	)
);

$image = array( $attributes['image'] );
if ( $attributes['imageId'] ) {
	$image = wp_get_attachment_image_src( $attributes['imageId'], $attributes['sizeSlug'] );
}
if ( ! $image ) {
	return;
}

$a_attributes = array(
	'href'      => $attributes['url'],
	'target'    => array(
		'_blank' => '_blank' === $attributes['target'],
	),
	'rel'       => $attributes['rel'],
	'data-type' => array(
		$attributes['lightboxType'] => ( 'lightbox' === $attributes['target'] ) && $attributes['lightboxType'],
	),
);

$image_attributes = array(
	'class'   => array(
		"uk-box-shadow-{$attributes['imageBoxShadow']}" => $attributes['imageBoxShadow'],
		"uk-box-shadow-hover-{$attributes['imageHoverBoxShadow']}" => $attributes['imageHoverBoxShadow'],
		'uk-object-cover'                               => $attributes['width'] && $attributes['height'],
		"uk-object-{$attributes['focalPoint']}"         => $attributes['width'] && $attributes['height'] && $attributes['focalPoint'],
	),
	'src'     => $image[0],
	'alt'     => $attributes['imageAlt'],
	'loading' => array(
		'lazy'                 => ! $attributes['loading'],
		$attributes['loading'] => $attributes['loading'],
	),
	'width'   => $attributes['width'],
	'height'  => $attributes['height'],
	'style'   => array(
		"aspect-ratio: {$attributes['width']} / {$attributes['height']};" => $attributes['width'] && $attributes['height'],
	),
);

$prepared_wrapper_attributes = Utils::prepare_wrapper_attributes( $wrapper_attributes );

?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes( $prepared_wrapper_attributes[0] ) ); ?><?php Utils::attributes( $prepared_wrapper_attributes[1], true ); ?>>
	<?php if ( $attributes['url'] ) : ?>
		<a <?php Utils::attributes( $a_attributes ); ?>>
			<img <?php Utils::attributes( $image_attributes ); ?>>
		</a>
	<?php else : ?>
		<img <?php Utils::attributes( $image_attributes ); ?>>
	<?php endif; ?>
</div>
