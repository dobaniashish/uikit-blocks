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
		// Hook: Editor assets.
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ), 99 );
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_block_editor_assets' ), 99 );

		// Register block category.
		add_filter( 'block_categories_all', array( $this, 'block_categories_all' ), 10, 2 );

		add_action( 'init', array( $this, 'init_translations' ) );
	}

	/**
	 * Initializes translations.
	 */
	public function init_translations() {
		load_plugin_textdomain( 'uikit-blocks', false, UIKIT_BLOCKS_PATH . '/languages' );
		wp_set_script_translations( 'uikit-blocks-translations', 'uikit-blocks', UIKIT_BLOCKS_PATH . '/languages' );
	}

	/**
	 * Acts on enqueue_block_editor_assets.
	 */
	public function enqueue_block_editor_assets() {
		if ( is_admin() ) {
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
	}

	/**
	 * Registers block category.
	 *
	 * @param array[] $block_categories Array of categories for block types.
	 */
	public function block_categories_all( $block_categories ) {

		array_push(
			$block_categories,
			array(
				'slug'  => 'uikit-blocks',
				'title' => __( 'Uikit Blocks', 'uikit-blocks' ),
			)
		);

		return $block_categories;
	}

	/**
	 * Registers blocks.
	 */
	private function register_block_types() {

		$blocks = array(
			'button',
			'heading',
			'grid',
			'grid-cell',
			'countdown',
			'section',
			'container',
			'accordion',
			'accordion-item',
			'divider',
			'icon',
			'card',
			'image',
			'overlay',
			'list',
			'list-item',
		);

		foreach ( $blocks as $block_dir ) {
			new \UIkit_Blocks\Block_Type( "blocks/{$block_dir}" );
		}
	}
}
