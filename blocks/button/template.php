<?php
/**
 * Button Block template.
 *
 * @package uikit-blocks
 */

use UIkit_Blocks\Helpers\Utils;

$attributes = $arguments['attributes'];

$div = array(
	'uk-lightbox' => 'lightbox' === $attributes['target'],
);

$button = array(
	'class'     => array(
		'uk-button',
		"uk-button-{$attributes['style']}" => $attributes['style'],
		"uk-button-{$attributes['size']}"  => $attributes['size'],
	),
	'href'      => $attributes['url'],
	'target'    => array(
		'_blank' => '_blank' === $attributes['target'],
	),
	'rel'       => $attributes['rel'],
	'data-type' => array(
		'iframe' => 'lightbox' === $attributes['target'],
	),
);

?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?> <?php Utils::attributes( $div ); ?>>
	<a <?php Utils::attributes( $button ); ?>>
		<?php echo esc_html( $attributes['text'] ); ?>
	</a>
</div>
