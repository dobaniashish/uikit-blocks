<?php
/**
 * Container Block template.
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
		'class' => array(
			'uk-container'                        => 'none' !== $attributes['width'],
			"uk-container-{$attributes['width']}" => $attributes['width'] && 'none' !== $attributes['width'],
			'uk-container-expand-left'            => $attributes['width'] && 'none' !== $attributes['width'] && $attributes['expandLeft'],
			'uk-container-expand-right'           => $attributes['width'] && 'none' !== $attributes['width'] && $attributes['expandRight'],
		),
	)
);

$prepared_wrapper_attributes = Utils::prepare_wrapper_attributes( $wrapper_attributes );

?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes( $prepared_wrapper_attributes[0] ) ); ?><?php Utils::attributes( $prepared_wrapper_attributes[1], true ); ?>>
	<?php echo $arguments['content']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
