<?php
/**
 * Accordion Block template.
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
		'class'             => array(
			'uk-accordion',
		),
		'data-uk-accordion' => array(
			'collapsible: false;'                      => $attributes['collapsible'],
			'multiple: true;'                          => $attributes['multiple'],
			"transition: {$attributes['transition']};" => $attributes['transition'],
			"duration: {$attributes['duration']};"     => $attributes['duration'],
		),
	)
);

$prepared_wrapper_attributes = Utils::prepare_wrapper_attributes( $wrapper_attributes );

?>
<ul <?php echo wp_kses_data( get_block_wrapper_attributes( $prepared_wrapper_attributes[0] ) ); ?><?php Utils::attributes( $prepared_wrapper_attributes[1], true ); ?>>
	<?php echo $arguments['content']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</ul>
