<?php
/**
 * Section Block template.
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
		'class'            => array(
			'uk-section',
			"uk-section-{$attributes['style']}"   => $attributes['style'],
			"uk-{$attributes['colorMode']}"       => $attributes['colorMode'],

			// Padding.
			"uk-section-{$attributes['padding']}" => $attributes['padding'] && 'remove-vertical' !== $attributes['padding'],
			'uk-padding-remove-vertical'          => 'remove-vertical' === $attributes['padding'],
			'uk-padding-remove-top'               => 'remove-vertical' !== $attributes['padding'] && $attributes['paddingRemoveTop'],
			'uk-padding-remove-bottom'            => 'remove-vertical' !== $attributes['padding'] && $attributes['paddingRemoveBottom'],

			// Background.
			"uk-background-{$attributes['backgroundSize']}" => $attributes['background'] && $attributes['backgroundSize'],
			"uk-background-{$attributes['backgroundPosition']}" => $attributes['background'] && $attributes['backgroundPosition'],
			'uk-background-norepeat'              => $attributes['background'] && ! $attributes['backgroundRepeat'],
			'uk-background-fixed'                 => $attributes['background'] && 'fixed' === $attributes['backgroundEffect'],
		),
		'style'            => array(
			"background-image: url({$attributes['background']})" => $attributes['background'],
		),
		'data-uk-parallax' => array(
			"bgx: {$attributes['backgroundParallaxBGX']};" => $attributes['background'] && 'parallax' === $attributes['backgroundEffect'] && '' !== $attributes['backgroundParallaxBGX'],
			"bgy: {$attributes['backgroundParallaxBGX']};" => $attributes['background'] && 'parallax' === $attributes['backgroundEffect'] && '' !== $attributes['backgroundParallaxBGX'],
		),
	)
);

$prepared_wrapper_attributes = Utils::prepare_wrapper_attributes( $wrapper_attributes );

?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes( $prepared_wrapper_attributes[0] ) ); ?><?php Utils::attributes( $prepared_wrapper_attributes[1], true ); ?>>
	<?php echo $arguments['content']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
