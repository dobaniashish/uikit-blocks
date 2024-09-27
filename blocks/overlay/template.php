<?php
/**
 * Overlay Block template.
 *
 * @package uikit-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

use UIkit_Blocks\Helpers\Utils;

$attributes         = $arguments['attributes'];
$general_attributes = $arguments['general_attributes'];

$wrapper_attributes = $general_attributes;

$image = array( $attributes['image'] );
if ( $attributes['imageId'] ) {
	$image = wp_get_attachment_image_src( $attributes['imageId'], $attributes['sizeSlug'] );
}
if ( ! $image ) {
	return;
}

$hover_image = array( $attributes['hoverImage'] );
if ( $attributes['hoverImageId'] ) {
	$hover_image = wp_get_attachment_image_src( $attributes['hoverImageId'], $attributes['hoverSizeSlug'] );
}

$a_attributes = array(
	'class'  => 'uk-position-cover',
	'href'   => $attributes['url'],
	'target' => array(
		'_blank' => '_blank' === $attributes['target'],
	),
	'rel'    => $attributes['rel'],
);

$image_attributes = array(
	'class'   => array(
		'uk-object-cover'                       => $attributes['width'] && $attributes['height'],
		"uk-object-{$attributes['focalPoint']}" => $attributes['width'] && $attributes['height'] && $attributes['focalPoint'],
		"uk-transition-{$attributes['overlayImageTransition']}" => $attributes['overlayImageTransition'] && ! $hover_image,
		'uk-transition-opaque'                  => $attributes['overlayImageTransition'] && ! $hover_image,
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

$hover_image_attributes = array(
	'class'   => array(
		'uk-object-cover'                       => $attributes['width'] && $attributes['height'],
		"uk-object-{$attributes['focalPoint']}" => $attributes['width'] && $attributes['height'] && $attributes['focalPoint'],
		'uk-position-cover',
		'uk-transition-fade'                    => ! $attributes['overlayImageTransition'],
		"uk-transition-{$attributes['overlayImageTransition']}" => $attributes['overlayImageTransition'],
	),
	'src'     => $hover_image[0],
	'alt'     => $attributes['imageAlt'],
	'loading' => 'eager',
	'width'   => $attributes['width'],
	'height'  => $attributes['height'],
	'style'   => array(
		"aspect-ratio: {$attributes['width']} / {$attributes['height']};" => $attributes['width'] && $attributes['height'],
	),
);

$cover_attributes = array(
	'class' => array(
		'uk-position-cover',
		"uk-transition-{$attributes['overlayTransition']}" => $attributes['overlayTransition'] && $attributes['overlayHover'],
		"uk-position-{$attributes['overlayMargin']}"       => $attributes['overlayMargin'],
		'uk-overlay',
		"uk-{$attributes['overlayStyle']}"                 => $attributes['overlayStyle'] && ! $attributes['overlayColorMode'],
		'uk-padding'                                       => ! $attributes['overlayPadding'],
		"uk-padding-{$attributes['overlayPadding']}"       => $attributes['overlayPadding'],
		"uk-{$attributes['overlayColorMode']}"             => $attributes['overlayColorMode'],
	),
);

$position_attributes = array(
	'class' => array(
		"uk-position-{$attributes['overlayPosition']}" => $attributes['overlayPosition'],
		"uk-position-{$attributes['overlayMargin']}"   => $attributes['overlayMargin'],
		"uk-{$attributes['overlayStyle']}"             => $attributes['overlayStyle'] && 'cover' !== $attributes['overlayMode'],
	),
);

$overlay_attributes = array(
	'class' => array(
		"uk-transition-{$attributes['overlayTransition']}" => $attributes['overlayTransition'] && $attributes['overlayHover'],
		'uk-overlay',
		"uk-width-{$attributes['overlayWidth']}"           => $attributes['overlayWidth'] && ! in_array( $attributes['overlayPosition'], array( 'top', 'left' ), true ),
		'uk-padding'                                       => ! $attributes['overlayPadding'],
		"uk-padding-{$attributes['overlayPadding']}"       => $attributes['overlayPadding'],
		"uk-{$attributes['overlayColorMode']}"             => $attributes['overlayColorMode'],
	),
);

$prepared_wrapper_attributes = Utils::prepare_wrapper_attributes( $wrapper_attributes );

?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes( $prepared_wrapper_attributes[0] ) ); ?><?php Utils::attributes( $prepared_wrapper_attributes[1], true ); ?>>

	<div class="uk-inline-clip uk-transition-toggle">

		<img <?php Utils::attributes( $image_attributes ); ?>>

		<?php if ( $hover_image ) : ?>
			<img <?php Utils::attributes( $hover_image_attributes ); ?>>
		<?php endif; ?>

		<?php if ( 'cover' === $attributes['overlayMode'] ) : ?>
			<div <?php Utils::attributes( $cover_attributes ); ?>></div>
		<?php endif; ?>

		<div <?php Utils::attributes( $position_attributes ); ?>>
			<div <?php Utils::attributes( $overlay_attributes ); ?>>
				<?php
				echo $arguments['content']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				?>
			</div>
		</div>

		<?php if ( ! empty( $attributes['url'] ) ) : ?>
			<a <?php Utils::attributes( $a_attributes ); ?>></a>
		<?php endif; ?>

	</div>

</div>
