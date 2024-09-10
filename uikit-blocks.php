<?php
/**
 * Plugin Name: UIkit Blocks
 * Plugin URI: https://github.com/dobaniashish/uikit-blocks
 * Description: UIkit Gutenberg Blocks for WordPress.
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 7.0
 * Author: dobaniashish
 * Author URI: https://github.com/dobaniashish
 * License: GPLv2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: uikit-blocks
 * Domain Path: /languages/
 *
 * @package uikit-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'UIKIT_BLOCKS_PATH' ) ) {
	define( 'UIKIT_BLOCKS_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
}


if ( ! defined( 'UIKIT_BLOCKS_URL' ) ) {
	define( 'UIKIT_BLOCKS_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );
}

require_once UIKIT_BLOCKS_PATH . '/includes/class-uikit-blocks.php';
UIkit_Blocks\UIkit_Blocks::get_instance();
