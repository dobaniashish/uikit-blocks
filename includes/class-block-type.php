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
		if ( array_key_exists( 'generalMargin', $attributes ) && $attributes['generalMargin'] ) {
			$general_attributes = Utils::attributes_merge(
				$general_attributes,
				array(
					'class' => array(
						'uk-margin'               => $attributes['generalMargin'] && 'default' === $attributes['generalMargin'],
						"uk-margin-{$attributes['generalMargin']}" => $attributes['generalMargin'] && 'default' !== $attributes['generalMargin'],
						'uk-margin-remove-top'    => $attributes['generalMarginRemoveTop'],
						'uk-margin-remove-bottom' => $attributes['generalMarginRemoveBottom'],
					),
				)
			);
		}

		// Text alignment.
		if ( array_key_exists( 'generalTextAlign', $attributes ) && $attributes['generalTextAlign'] ) {
			$general_attributes = Utils::attributes_merge(
				$general_attributes,
				array(
					'class' => array(
						"uk-text-{$attributes['generalTextAlign']}" => ! $attributes['generalTextAlignBreakpoint'],
						"uk-text-{$attributes['generalTextAlign']}@{$attributes['generalTextAlignBreakpoint']}" => $attributes['generalTextAlignBreakpoint'],
						"uk-text-{$attributes['generalTextAlignFallback']}" => $attributes['generalTextAlignBreakpoint'] && $attributes['generalTextAlignFallback'],
					),
				)
			);
		}

		// Visiblity.
		if ( array_key_exists( 'generalVisiblity', $attributes ) && $attributes['generalVisiblity'] ) {
			$general_attributes = Utils::attributes_merge(
				$general_attributes,
				array(
					'class' => array(
						"uk-{$attributes['generalVisiblity']}",
					),
				)
			);
		}

		// Position.
		if ( array_key_exists( 'generalPosition', $attributes ) && $attributes['generalPosition'] ) {
			$general_attributes = Utils::attributes_merge(
				$general_attributes,
				array(
					'class' => array(
						"uk-position-{$attributes['generalPosition']}",
					),
					'style' => array(
						"left: {$attributes['generalPositionLeft']};" => $attributes['generalPositionLeft'],
						"right: {$attributes['generalPositionRight']};" => $attributes['generalPositionRight'],
						"top: {$attributes['generalPositionTop']};" => $attributes['generalPositionTop'],
						"bottom: {$attributes['generalPositionBottom']};" => $attributes['generalPositionBottom'],
						"z-index: {$attributes['generalPositionZIndex']};" => $attributes['generalPositionZIndex'],
					),
				)
			);
		}

		return $general_attributes;
	}
}
