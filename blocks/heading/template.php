<?php
/**
 * Heading Block template.
 *
 * @package uikit-blocks
 */

use UIkit_Blocks\Helpers\Utils;

$attributes = $arguments['attributes'];

$tag_name = ! empty( $attributes['tag'] ) ? $attributes['tag'] : 'h1';

$title_classes = Utils::attribute_value(
	array(
		"uk-{$attributes['style']}"              => $attributes['style'],
		"uk-heading-{$attributes['decoration']}" => $attributes['decoration'],
		"uk-text-{$attributes['color']}"         => $attributes['color'],
	)
);

?>
<<?php echo tag_escape( $tag_name ); ?> <?php echo wp_kses_data( get_block_wrapper_attributes( array( 'class' => $title_classes ) ) ); ?>>
	<?php echo wp_kses_data( $attributes['text'] ); ?>
</<?php echo tag_escape( $tag_name ); ?>>
