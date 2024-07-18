# UIkit Blocks

UIkit Gutenberg Blocks for WordPress.

Inspired by [liip/bootstrap-blocks-wordpress-plugin](https://github.com/liip/bootstrap-blocks-wordpress-plugin) and [UIkit](https://github.com/uikit/uikit).

## Features

-   Supports UIkit 3
-   Block templates can be overwritten in your theme

## Available blocks

-   Button

## UIkit library

Please be aware that this plugin does not include the UIkit library in your website. You need to do this by yourself. We decided not to include the library so that you can modify UIkit to your own needs before loading it.

The easiest way to do this is to add the following to your theme's `functions.php`:

```php
function mytheme_load_uikit() {
    if ( is_admin() ) {
        return;
    }

    wp_enqueue_style( 'uikit', 'https://cdn.jsdelivr.net/npm/uikit@3.21.7/dist/css/uikit.min.css', array(), '3.21.7' );
    wp_enqueue_script( 'uikit', 'https://cdn.jsdelivr.net/npm/uikit@3.21.7/dist/js/uikit.min.js', array(), '3.21.7', true );
    wp_enqueue_script( 'uikit-icons', 'https://cdn.jsdelivr.net/npm/uikit@3.21.7/dist/js/uikit-icons.min.js', array(), '3.21.7', true );
}
add_action( 'wp_enqueue_scripts', 'mytheme_load_uikit' );
```

## Templates

All blocks are implemented as [dynamic blocks](https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/block-tutorial/creating-dynamic-blocks/). This makes it possible to overwrite the template of a block in your theme.

To overwrite a block template, you can copy the original template from the plugin into your theme directory in the same path as a starting point and adjust it to your needs.

## Developer information

### Requirements

-   Node.js version with long-term support status
-   Docker

### Installation

1. Clone this repository

1. Install composer dependencies

    ```bash
    curl -s https://getcomposer.org/installer | php
    php composer.phar install
    ```

1. Install Node dependencies

    ```bash
    npm install
    ```

### Compile assets

The build process is based on the official [`@wordpress/scripts`](https://developer.wordpress.org/block-editor/packages/packages-scripts/) package but modified to our needs.

The plugin uses Less CSS and it is compiled directly from `build-scripts/less.js` instead of using webpack less-loader. The css for editor.less is prefixed with `.ukb-` from the default `.uk-`. The less build script also creates `asset.php` file and claculates version hash like `@wordpress/dependency-extraction-webpack-plugin`.

-   `npm run build:dev`: Compiles the files in development mode with wp-scripts, compiles less and copies assets to proper directories.
-   `npm run watch`: Watches for any changes in `src` directory and runs `build:dev`.
-   `npm run build`: Same as `build:dev` but in production mode.

### Setup local dev environment

The following commands can be used to set up a local dev environment. See the official [documentation of `@wordpress/env`](https://developer.wordpress.org/block-editor/packages/packages-env/#command-reference) for a complete list of commands.

-   `npm run wp-env start`: Starts the Docker containers.
-   `npm run wp-env stop`: Stops the Docker containers.
