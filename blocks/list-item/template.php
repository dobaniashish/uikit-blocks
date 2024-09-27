<?php
/**
 * List Item Block template.
 *
 * @package uikit-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

use UIkit_Blocks\Helpers\Utils;

$attributes         = $arguments['attributes'];
$general_attributes = $arguments['general_attributes'];

$wrapper_attributes = $general_attributes;

$prepared_wrapper_attributes = Utils::prepare_wrapper_attributes( $wrapper_attributes );

?>
<li <?php echo wp_kses_data( get_block_wrapper_attributes( $prepared_wrapper_attributes[0] ) ); ?><?php Utils::attributes( $prepared_wrapper_attributes[1], true ); ?>>
	<?php echo $arguments['content']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</li>
