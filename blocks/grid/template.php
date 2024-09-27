<?php
/**
 * Grid Block template.
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
		'class'        => array(
			'uk-grid',

			"uk-grid-{$attributes['columnGap']}"           => $attributes['columnGap'] && $attributes['rowGap'] && $attributes['columnGap'] === $attributes['rowGap'],
			"uk-grid-column-{$attributes['columnGap']}"    => $attributes['columnGap'] && $attributes['columnGap'] !== $attributes['rowGap'],
			"uk-grid-row-{$attributes['rowGap']}"          => $attributes['rowGap'] && $attributes['columnGap'] !== $attributes['rowGap'],

			"uk-child-width-{$attributes['childWidth']}"   => $attributes['childWidth'],
			"uk-child-width-{$attributes['childWidthS']}@s" => $attributes['childWidthS'],
			"uk-child-width-{$attributes['childWidthM']}@m" => $attributes['childWidthM'],
			"uk-child-width-{$attributes['childWidthL']}@l" => $attributes['childWidthL'],
			"uk-child-width-{$attributes['childWidthXL']}@xl" => $attributes['childWidthXL'],

			"uk-flex-{$attributes['flexHorizontal']}"      => $attributes['flexHorizontal'],
			"uk-flex-{$attributes['flexHorizontalS']}@s"   => $attributes['flexHorizontalS'],
			"uk-flex-{$attributes['flexHorizontalM']}@m"   => $attributes['flexHorizontalM'],
			"uk-flex-{$attributes['flexHorizontalL']}@l"   => $attributes['flexHorizontalL'],
			"uk-flex-{$attributes['flexHorizontalXL']}@xl" => $attributes['flexHorizontalXL'],

			"uk-flex-{$attributes['flexVertical']}"        => $attributes['flexVertical'],

			'uk-grid-divider'                              => $attributes['divider'],
			'uk-grid-match'                                => $attributes['matchHeight'],
		),
		'data-uk-grid' => Utils::attribute_value(
			array(
				"masonry: {$attributes['masonry']};"   => $attributes['masonry'],
				"parallax: {$attributes['parallax']};" => $attributes['parallax'],
				"parallax-start: {$attributes['parallaxStart']};" => $attributes['parallaxStart'],
				"parallax-end: {$attributes['parallaxEnd']};" => $attributes['parallaxEnd'],
				'parallax-justify: true;'              => $attributes['parallaxJustify'],
			),
			true
		),
	)
);

$prepared_wrapper_attributes = Utils::prepare_wrapper_attributes( $wrapper_attributes );

?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes( $prepared_wrapper_attributes[0] ) ); ?><?php Utils::attributes( $prepared_wrapper_attributes[1], true ); ?>>
	<?php echo $arguments['content']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
