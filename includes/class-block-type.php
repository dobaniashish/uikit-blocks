<?php
/**
 * Block Type class
 *
 * @package uikit-blocks
 */

namespace UIkit_Blocks;

use UIkit_Blocks\Helpers\Utils;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Block_Type
 */
class Block_Type {
	/**
	 * Name of block type including namespace.
	 *
	 * @var string
	 */
	protected $name = '';

	/**
	 * Block.json file dir.
	 *
	 * @var string
	 */
	protected $block_dir = '';

	/**
	 * Block.json file path.
	 *
	 * @var string
	 */
	protected $block_schema_file = '';

	/**
	 * Block json array data.
	 *
	 * @var array
	 */
	protected $block = array();

	/**
	 * Block_Type constructor
	 *
	 * @param string $block_dir Block.json file dir.
	 *
	 * @todo Get attrs from json file.
	 */
	public function __construct( $block_dir ) {

		$this->block_dir         = $block_dir;
		$this->block_schema_file = UIKIT_BLOCKS_PATH . "/{$block_dir}/block.json";

		$json = wp_json_file_decode( $this->block_schema_file, array( 'associative' => true ) );

		if ( ! $json ) {
			return;
		}

		$this->block = $json;
		$this->name  = $json['name'];

		add_action( 'init', array( $this, 'register_block_type' ) );
	}

	/**
	 * Registers block type
	 *
	 * @todo Set attrs.
	 */
	public function register_block_type() {

		$block_type = $this->block_schema_file;

		register_block_type(
			$block_type,
			array(
				'render_callback' => array( $this, 'render' ),
			)
		);
	}

	/**
	 * Render callback for this block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content HTML content of block.
	 * @return string Rendered block.
	 */
	public function render( $attributes, $content ) {

		$attributes = $this->prepare_attributes_for_render( $attributes );

		$slug = $this->block_dir . '/template';

		$arguments = array(
			'attributes' => $attributes,
			'content'    => $content,
		);

		return Utils::view( $slug, null, $arguments, true );
	}

	/**
	 * Add value for attributes with no default value.
	 *
	 * WP_Block_Type::prepare_attributes_for_render does not set attributes with no default value.
	 *
	 * @param array $attributes Original block attributes.
	 * @return array Prepared block attributes.
	 */
	public function prepare_attributes_for_render( $attributes ) {

		if ( empty( $this->block['attributes'] ) ) {
			return $attributes;
		}

		// Add missing values as empty string boolean etc.
		$missing_schema_attributes = array_diff_key( $this->block['attributes'], $attributes );

		foreach ( $missing_schema_attributes as $attribute_name => $schema ) {

			switch ( $schema['type'] ) {
				case 'boolean':
					$attributes[ $attribute_name ] = false;
					break;
				case 'object':
				case 'array':
					$attributes[ $attribute_name ] = array();
					break;
				case 'string':
					$attributes[ $attribute_name ] = '';
					break;
				case 'integer':
				case 'number':
					$attributes[ $attribute_name ] = 0;
					break;
				case 'null':
				default:
					$attributes[ $attribute_name ] = null;
					break;
			}
		}

		return $attributes;
	}
}
