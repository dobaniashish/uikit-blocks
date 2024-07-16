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
		$this->register_block_types();
	}

	/**
	 * Included required core files.
	 */
	private function includes() {
		require_once UIKIT_BLOCKS_PATH . '/includes/helpers/class-utils.php';
		require_once UIKIT_BLOCKS_PATH . '/includes/class-block-type.php';
	}

	/**
	 * Initializes hooks.
	 */
	private function init_hooks() {
		add_action( 'plugins_loaded', array( $this, 'plugins_loaded' ) );

		// Hook: Editor assets.
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ), 99 );
	}

	/**
	 * Acts on plugins_loaded.
	 */
	public function plugins_loaded() {
		// Initialize translations.
		load_plugin_textdomain( 'uikit-blocks', false, UIKIT_BLOCKS_PATH . '/languages' );
	}

	/**
	 * Acts on enqueue_block_editor_assets.
	 */
	public function enqueue_block_editor_assets() {
		// Editor css.
		$css_asset_file = include UIKIT_BLOCKS_PATH . '/assets/admin/css/editor.css.asset.php';
		wp_enqueue_style(
			'uikit-blocks-editor-style',
			UIKIT_BLOCKS_URL . '/assets/admin/css/editor.css',
			$css_asset_file['dependencies'],
			$css_asset_file['version'],
		);

		// Editor js.
		$js_asset_file = include UIKIT_BLOCKS_PATH . '/assets/admin/js/editor.asset.php';

		wp_enqueue_script(
			'uikit-blocks-editor-js',
			UIKIT_BLOCKS_URL . '/assets/admin/js/editor.js',
			$js_asset_file['dependencies'],
			$js_asset_file['version'],
			false // Enqueue the script in the footer.
		);
	}

	/**
	 * Registers blocks.
	 */
	private function register_block_types() {

		$blocks = array(
			'button',
		);

		foreach ( $blocks as $block_dir ) {
			new \UIkit_Blocks\Block_Type( "blocks/{$block_dir}" );
		}
	}
}
