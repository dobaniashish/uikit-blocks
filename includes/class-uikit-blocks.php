<?php
/**
 * Main class
 *
 * @package uikit-blocks
 */

namespace UIkit_Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class UIkit_Blocks
 */
class UIkit_Blocks {

	/**
	 * UIkit_Blocks instance.
	 *
	 * @var UIkit_Blocks
	 */
	protected static $instance = null;

	/**
	 * Main UIkit_Blocks Instance
	 * Ensures only one instance of UIkit_Blocks is loaded or can be loaded.
	 *
	 * @return UIkit_Blocks Plugin instance
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * UIkit_Blocks constructor.
	 */
	private function __construct() {
		$this->includes();
		$this->init_hooks();
	}

	/**
	 * Included required core files.
	 */
	private function includes() {}

	/**
	 * Initializes hooks.
	 */
	private function init_hooks() {
		add_action( 'plugins_loaded', array( $this, 'plugins_loaded' ) );
	}

	/**
	 * Acts on plugins_loaded.
	 */
	public function plugins_loaded() {
		// Initialize translations.
		load_plugin_textdomain( 'uikit-blocks', false, UIKIT_BLOCKS_PATH . '/languages' );
	}
}
