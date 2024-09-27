<?php
/**
 * Divider Block template.
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
			"uk-divider-{$attributes['style']}" => $attributes['style'],
			'uk-hr'                             => ! $attributes['style'],
		),
	)
);

$tag_name = ! empty( $attributes['tag'] ) ? $attributes['tag'] : 'hr';

$prepared_wrapper_attributes = Utils::prepare_wrapper_attributes( $wrapper_attributes );

?>
<<?php echo tag_escape( $tag_name ); ?> <?php echo wp_kses_data( get_block_wrapper_attributes( $prepared_wrapper_attributes[0] ) ); ?><?php Utils::attributes( $prepared_wrapper_attributes[1], true ); ?>></<?php echo tag_escape( $tag_name ); ?>>
