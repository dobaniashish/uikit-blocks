<?php
/**
 * Button Block template.
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

$button_attributes = array(
	'class'     => array(
		'uk-button',
		"uk-button-{$attributes['style']}" => $attributes['style'],
		"uk-button-{$attributes['size']}"  => $attributes['size'],
		"uk-width-{$attributes['width']}"  => $attributes['width'],
	),
	'href'      => $attributes['url'],
	'target'    => array(
		'_blank' => '_blank' === $attributes['target'],
	),
	'rel'       => $attributes['rel'],
	'data-type' => array(
		$attributes['lightboxType'] => ( 'lightbox' === $attributes['target'] ) && $attributes['lightboxType'],
	),
);

$prepared_wrapper_attributes = Utils::prepare_wrapper_attributes( $wrapper_attributes );

?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes( $prepared_wrapper_attributes[0] ) ); ?><?php Utils::attributes( $prepared_wrapper_attributes[1], true ); ?>>
	<a <?php Utils::attributes( $button_attributes ); ?>>
		<?php echo wp_kses_data( $attributes['text'] ); ?>
	</a>
</div>
