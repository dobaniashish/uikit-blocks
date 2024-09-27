<?php
/**
 * Countdown Block template.
 *
 * @package uikit-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

use UIkit_Blocks\Helpers\Utils;

$attributes         = $arguments['attributes'];
$general_attributes = $arguments['general_attributes'];

$date = isset( $attributes['date'] ) ? $attributes['date'] : '';

$wrapper_attributes = Utils::attributes_merge(
	$general_attributes,
	array(
		'class'             => array(
			'uk-grid',
			'uk-child-width-auto',
			'uk-text-center',
			"uk-grid-{$attributes['columnGap']}"        => $attributes['columnGap'] && $attributes['rowGap'] && $attributes['columnGap'] === $attributes['rowGap'],
			"uk-grid-column-{$attributes['columnGap']}" => $attributes['columnGap'] && $attributes['columnGap'] !== $attributes['rowGap'],
			"uk-grid-row-{$attributes['rowGap']}"       => $attributes['rowGap'] && $attributes['columnGap'] !== $attributes['rowGap'],
		),
		'data-uk-grid'      => true,
		'data-uk-countdown' => Utils::attribute_value(
			array(
				"date: {$date};" => $date,
			),
			true
		),
	)
);

$prepared_wrapper_attributes = Utils::prepare_wrapper_attributes( $wrapper_attributes );

?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes( $prepared_wrapper_attributes[0] ) ); ?><?php Utils::attributes( $prepared_wrapper_attributes[1], true ); ?>>

	<div>
		<div class="uk-countdown-number uk-countdown-days"></div>
		<?php if ( $attributes['showLabel'] ) : ?>
			<div class="uk-countdown-label uk-margin-small uk-text-center"><?php echo $attributes['labelDays'] ? esc_html( $attributes['labelDays'] ) : 'Days'; ?></div>
		<?php endif; ?>
	</div>

	<?php if ( $attributes['showSeparator'] ) : ?>
		<div class="uk-countdown-separator">:</div>
	<?php endif; ?>

	<div>
		<div class="uk-countdown-number uk-countdown-hours"></div>
		<?php if ( $attributes['showLabel'] ) : ?>
			<div class="uk-countdown-label uk-margin-small uk-text-center"><?php echo $attributes['labelHours'] ? esc_html( $attributes['labelHours'] ) : 'Hours'; ?></div>
		<?php endif; ?>
	</div>

	<?php if ( $attributes['showSeparator'] ) : ?>
		<div class="uk-countdown-separator">:</div>
	<?php endif; ?>

	<div>
		<div class="uk-countdown-number uk-countdown-minutes"></div>
		<?php if ( $attributes['showLabel'] ) : ?>
			<div class="uk-countdown-label uk-margin-small uk-text-center"><?php echo $attributes['labelMinutes'] ? esc_html( $attributes['labelMinutes'] ) : 'Minutes'; ?></div>
		<?php endif; ?>
	</div>

	<?php if ( $attributes['showSeparator'] ) : ?>
		<div class="uk-countdown-separator">:</div>
	<?php endif; ?>

	<div>
		<div class="uk-countdown-number uk-countdown-seconds"></div>
		<?php if ( $attributes['showLabel'] ) : ?>
			<div class="uk-countdown-label uk-margin-small uk-text-center"><?php echo $attributes['labelSeconds'] ? esc_html( $attributes['labelSeconds'] ) : 'Seconds'; ?></div>
		<?php endif; ?>
	</div>

</div>
