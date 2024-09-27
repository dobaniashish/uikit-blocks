<?php
/**
 * List Block template.
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
			'uk-list',
			"uk-list-{$attributes['marker']}"      => $attributes['marker'],
			"uk-list-{$attributes['markerColor']}" => 'bullet' !== $attributes['marker'] && $attributes['markerColor'],
			"uk-list-{$attributes['style']}"       => $attributes['style'],
			"uk-list-{$attributes['size']}"        => $attributes['size'],
		),
	)
);

$prepared_wrapper_attributes = Utils::prepare_wrapper_attributes( $wrapper_attributes );

?>
<ul <?php echo wp_kses_data( get_block_wrapper_attributes( $prepared_wrapper_attributes[0] ) ); ?><?php Utils::attributes( $prepared_wrapper_attributes[1], true ); ?>>
	<?php echo $arguments['content']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</ul>
