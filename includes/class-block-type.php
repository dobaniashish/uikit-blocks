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

		// Block attributes.
		$attributes = $this->prepare_attributes_for_render( $attributes );

		// General attributes.
		$general_attributes = $this->get_general_attributes( $attributes );

		$slug = $this->block_dir . '/template';

		$arguments = array(
			'attributes'         => $attributes,
			'general_attributes' => $general_attributes,
			'content'            => $content,
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

	/**
	 * Generate general attributes.
	 *
	 * @param array $attributes Block attributes.
	 * @return array Generated general attributes array.
	 */
	public function get_general_attributes( $attributes ) {

		$general_attributes = array();

		// Margin.
		if ( array_key_exists( 'margin', $attributes ) && $attributes['margin'] ) {
			$general_attributes = Utils::attributes_merge(
				$general_attributes,
				array(
					'class' => array(
						'uk-margin'               => $attributes['margin'] && 'default' === $attributes['margin'],
						"uk-margin-{$attributes['margin']}" => $attributes['margin'] && 'default' !== $attributes['margin'],
						'uk-margin-remove-top'    => $attributes['marginRemoveTop'],
						'uk-margin-remove-bottom' => $attributes['marginRemoveBottom'],
					),
				)
			);
		}

		// Text alignment.
		if ( array_key_exists( 'textAlign', $attributes ) && $attributes['textAlign'] ) {
			$general_attributes = Utils::attributes_merge(
				$general_attributes,
				array(
					'class' => array(
						"uk-text-{$attributes['textAlign']}" => ! $attributes['textAlignBreakpoint'],
						"uk-text-{$attributes['textAlign']}@{$attributes['textAlignBreakpoint']}" => $attributes['textAlignBreakpoint'],
						"uk-text-{$attributes['textAlignFallback']}" => $attributes['textAlignBreakpoint'] && $attributes['textAlignFallback'],
					),
				)
			);
		}

		// Visiblity.
		if ( array_key_exists( 'visiblity', $attributes ) && $attributes['visiblity'] ) {
			$general_attributes = Utils::attributes_merge(
				$general_attributes,
				array(
					'class' => array(
						"uk-{$attributes['visiblity']}",
					),
				)
			);
		}

		// Position.
		if ( array_key_exists( 'position', $attributes ) && $attributes['position'] ) {
			$general_attributes = Utils::attributes_merge(
				$general_attributes,
				array(
					'class' => array(
						"uk-position-{$attributes['position']}",
					),
					'style' => array(
						"left: {$attributes['positionLeft']};" => $attributes['positionLeft'],
						"right: {$attributes['positionRight']};" => $attributes['positionRight'],
						"top: {$attributes['positionTop']};" => $attributes['positionTop'],
						"bottom: {$attributes['positionBottom']};" => $attributes['positionBottom'],
						"z-index: {$attributes['positionZIndex']};" => $attributes['positionZIndex'],
					),
				)
			);
		}

		return $general_attributes;
	}
}
