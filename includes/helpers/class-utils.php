<?php
/**
 * Utils class
 *
 * Contains helper functions.
 *
 * @package uikit-blocks
 */

namespace UIkit_Blocks\Helpers;

/**
 * Class Utils
 */
class Utils {

	/**
	 * Utils constructor
	 */
	public function __construct() {}

	/**
	 * Converts html attributes array to string with conditions such as in array_filter similar to classnames package for react
	 *
	 * Example attributes array
	 *
	 * $attributes = array();
	 * $attributes['id'] = 'element-id';
	 * $attributes['class'] = array(
	 *    'class1' => true,
	 *    'class2' => false,
	 *    'class3',
	 * );
	 * $attributes['class']['class3'] = true;
	 * $attributes['uk-component']['option1: true;'] = true;
	 * $attributes['uk-component']['option2: red;'] = true;
	 * $attributes['uk-component'][] = 'option3: blue;';
	 *
	 * @param array   $attrs_array Attributes array.
	 * @param boolean $prefix_space Add a space before.
	 * @return string Generated Attributes string or void.
	 */
	public static function attributes( $attrs_array, $prefix_space = false, $return_buffer = false ) {

		$attrs = array();

		// Parse values
		foreach ( $attrs_array as $name => $value ) {

			if ( is_array( $value ) ) {
				$value = self::attribute_value( $value );
			}

			// if we dont add true value.
			if ( is_numeric( $name ) ) {
				$name  = $value;
				$value = true;
			}

			if ( true === $value ) {
				$attrs[ $name ] = '';
			} elseif ( $value ) {
				$attrs[ $name ] = $value;
			}
		}

		// Return string
		if ( $return_buffer ) {
			$attributes = implode( ' ', $attrs );

			if ( $attributes && $prefix_space ) {
				$attributes = ' ' . $attributes;
			}

			return $attributes;
		}

		// Print
		if ( ! empty( $attrs ) && $prefix_space ) {
			echo ' '; // Space.
		}

		$i = 0;
		foreach ( $attrs as $name => $value ) {
			if ( $i > 0 ) {
				echo ' '; // Space.
			}
			echo esc_attr( $name ) . '="' . esc_attr( $value ) . '"';
		}
	}

	/**
	 * Convert html attributes value array to string with conditions such as in array_filter
	 *
	 * Added coalescing because WPCS dissallows Short Ternary Operator and using Null Coalescing Operator doesn't work for empty strings, so we will return true from this function itself
	 *
	 * @see https://make.wordpress.org/core/2019/07/12/php-coding-standards-changes/
	 *
	 * @param array   $value_array Attributes value array.
	 * @param boolean $coalescing Return boolean if required.
	 * @return string Generated attribute value string.
	 */
	public static function attribute_value( $value_array, $coalescing = false ) {

		$value = array();
		foreach ( $value_array as $k => $v ) {
			if ( is_numeric( $k ) ) {
				$value[] = $v;
			} elseif ( $v ) {
				$value[] = $k;
			} elseif ( '0' === $v ) { // Allow falsy 0 string.
				$value[] = $k;
			}
		}
		$v = implode( ' ', $value );

		if ( ! $value ) {
			return $coalescing;
		}

		return $v;
	}

	/**
	 * Render a layout file
	 *
	 * @param string $slug name of layout.
	 * @param string $name specialised layout file.
	 * @param array  $arguments arguments to pass.
	 * @param bool   $return_buffer return buffer instead of echoing.
	 *
	 * @return string|void
	 */
	public static function view( $slug, $name = null, $arguments = array(), $return_buffer = false ) {

		// Theme location.
		$file = self::get_template_part( $slug, $name );

		if ( ! $file ) {
			return false;
		}

		// Extract in not recommended.
		if ( ! is_array( $arguments ) ) {
			$arguments = array();
		}

		if ( $return_buffer ) {
			ob_start();
			include $file;
			return ob_get_clean();
		}

		return include $file;
	}

	/**
	 * Retrieves the name of the highest priority template file that exists.
	 *
	 * @param string $slug The slug name for the generic template.
	 * @param string $name The name of the specialised template.
	 * @param array  $args Additional arguments passed to the template.
	 *
	 * @see https://developer.wordpress.org/reference/functions/get_template_part/
	 * @see https://developer.wordpress.org/reference/functions/locate_template/
	 * @see https://developer.wordpress.org/reference/functions/load_template/
	 *
	 * @return string Template location.
	 */
	public static function get_template_part( $slug, $name = null, $args = array() ) {

		do_action( "get_template_part_{$slug}", $slug, $name, $args );

		$templates = array();
		$name      = (string) $name;
		if ( '' !== $name ) {
			$templates[] = "{$slug}-{$name}.php";
		}

		$templates[] = "{$slug}.php";

		do_action( 'get_template_part', $slug, $name, $templates, $args );

		$located = locate_template( $templates );

		if ( $located ) {
			return $located;
		}

		// Get template from plugin directory.
		foreach ( $templates as $template_name ) {
			if ( ! $template_name ) {
				continue;
			}

			$path = UIKIT_BLOCKS_PATH . "/{$template_name}";

			if ( file_exists( $path ) ) {
				$located = $path;
			}
		}

		return $located;
	}
}
