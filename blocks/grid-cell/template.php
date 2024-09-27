<?php
/**
 * Grid Cell Block template.
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
			"uk-width-{$attributes['width']}"         => $attributes['width'],
			"uk-width-{$attributes['widthS']}@s"      => $attributes['widthS'],
			"uk-width-{$attributes['widthM']}@m"      => $attributes['widthM'],
			"uk-width-{$attributes['widthL']}@l"      => $attributes['widthL'],
			"uk-width-{$attributes['widthXL']}@xl"    => $attributes['widthXL'],

			"uk-flex-{$attributes['flexOrder']}"      => $attributes['flexOrder'],
			"uk-flex-{$attributes['flexOrderS']}@s"   => $attributes['flexOrderS'],
			"uk-flex-{$attributes['flexOrderM']}@m"   => $attributes['flexOrderM'],
			"uk-flex-{$attributes['flexOrderL']}@l"   => $attributes['flexOrderL'],
			"uk-flex-{$attributes['flexOrderXL']}@xl" => $attributes['flexOrderXL'],
		),
	)
);

$prepared_wrapper_attributes = Utils::prepare_wrapper_attributes( $wrapper_attributes );

?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes( $prepared_wrapper_attributes[0] ) ); ?><?php Utils::attributes( $prepared_wrapper_attributes[1], true ); ?>>
	<?php echo $arguments['content']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
