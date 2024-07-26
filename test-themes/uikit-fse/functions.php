<?php // phpcs:ignore Squiz.Commenting.FileComment.Missing

// phpcs:ignore Squiz.Commenting.FunctionComment.Missing
function uikit_scripts() {
	wp_enqueue_style( 'uikit', 'https://cdn.jsdelivr.net/npm/uikit@3.21.6/dist/css/uikit.min.css', array(), '3.21.6' );
	wp_enqueue_script( 'uikit', 'https://cdn.jsdelivr.net/npm/uikit@3.21.6/dist/js/uikit.min.js', array(), '3.21.6', true );
	wp_enqueue_script( 'uikit-icons', 'https://cdn.jsdelivr.net/npm/uikit@3.21.6/dist/js/uikit-icons.min.js', array(), '3.21.6', true );
}
add_action( 'wp_enqueue_scripts', 'uikit_scripts' );
