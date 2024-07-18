<?php
/**
 * Grid Cell Block template.
 *
 * @package uikit-blocks
 */

use UIkit_Blocks\Helpers\Utils;

$attributes = $arguments['attributes'];

$cell_classes = Utils::attribute_value(
	array(
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
	)
);

?>

<div <?php echo wp_kses_data( get_block_wrapper_attributes( array( 'class' => $cell_classes ) ) ); ?>>
	<?php echo $arguments['content']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
