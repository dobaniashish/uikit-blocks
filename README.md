# UIkit Blocks

[![Lint Status](https://github.com/dobaniashish/uikit-blocks/workflows/Lint/badge.svg)](https://github.com/dobaniashish/uikit-blocks/actions/workflows/lint.yml)
[![Build Status](https://github.com/dobaniashish/uikit-blocks/workflows/Build/badge.svg)](https://github.com/dobaniashish/uikit-blocks/actions/workflows/build.yml)

UIkit Gutenberg Blocks for WordPress.

Inspired by [liip/bootstrap-blocks-wordpress-plugin](https://github.com/liip/bootstrap-blocks-wordpress-plugin) and [UIkit](https://github.com/uikit/uikit).

## TODO

This project is a Work In Progress. Commits can have breaking changes to plugin architecture.

-   [ ] Add all basic UIkit components
    -   [x] Button
    -   [x] Heading
    -   [x] Grid
        -   [x] Grid Cell
    -   [x] Countdown
    -   [x] Section
    -   [x] Container
    -   [x] Accordion
        -   [x] Accordion Item
    -   [x] Divider
    -   [x] Icon
    -   [x] Card
    -   [x] Image
    -   [x] Overlay (Cover)
    -   [x] List
        -   [x] List Item
    -   [ ] Breadcrumb (dynamic)
    -   [ ] Text
    -   [ ] Slider
    -   [ ] Subnav
    -   [ ] Tabs
    -   [ ] Alert
    -   [ ] ...more
-   [x] Add general dynamic block options/attributes
    -   [x] Margin
    -   [x] Text Alignment
    -   [x] Visiblity
    -   [x] Position
    -   [x] Transition/Animation/Paralax
-   [ ] Option to include UIkit assets on frontend
-   [ ] Filters
-   [ ] Translations
-   [ ] Documentation for contributers
-   [ ] Documentation for users
-   [ ] Documentation for theme developers
-   [ ] Tests and Backward compatibility
-   [ ] Playground
-   [x] Lint
-   [x] Plugin zip (Use `wp-scripts plugin-zip` or write custom build script)
-   [ ] Publish v1.0.0

## Features

-   Supports UIkit 3
-   Block templates can be overwritten in your theme

## Available blocks

-   Button
-   Heading
-   Grid
    -   Grid Cell
-   Countdown
-   Section
-   Container
-   Accordion
    -   Accordion Item
-   Divider
-   Icon
-   Card
-   Image
-   Overlay (Cover)
-   List
    -   List Item

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
-   Docker (Required only if using `wp-env`)

### Installation

1. Clone this repository
1. Install Node dependencies

    ```bash
    npm install
    ```

### Block Metadata (`block.json`)

Block Metadata (`block.json`) file contents are stored in file called `metadata.js` in each block directory in `src`. These files export metadata object which are used by `block.js` for registering block type and `build-scripts/metadata.js` to compile into `block.json` files.

Metadata build script uses prettier with `.prettierrc.js` to pretty print json into `block.js`.

### CSS Styles

The plugin uses Less CSS and it is compiled directly from `build-scripts/less.js` instead of using webpack `less-loader`.

The less build script also creates `asset.php` file and claculates version hash like `@wordpress/dependency-extraction-webpack-plugin`.

### Compile assets

The build process is based on the official [`@wordpress/scripts`](https://developer.wordpress.org/block-editor/packages/packages-scripts/) package but modified to our needs.

The compiled files are built into `dist` directory which are then copied to final location by `build-scripts/copy.js`

-   `npm run build:dev`: Compiles the files in development mode with wp-scripts, compiles metadata, compiles less and copies assets to proper directories.
-   `npm run watch`: Watches for any changes in `src` directory and runs `build:dev`.
-   `npm run build`: Same as `build:dev` but in production mode.
-   `npm run plugin-zip`: Runs `build` and creates a zip file for the plugin in `dist` directory exactly like `wp-scripts plugin-zip`.

### Setup local dev environment

The following commands can be used to set up a local dev environment. See the official [documentation of `@wordpress/env`](https://developer.wordpress.org/block-editor/packages/packages-env/#command-reference) for a complete list of commands.

-   `npm run wp-env start`: Starts the Docker containers.
-   `npm run wp-env stop`: Stops the Docker containers.

## Credits

-   [`liip/bootstrap-blocks-wordpress-plugin`](https://github.com/liip/bootstrap-blocks-wordpress-plugin) - Inspiration for creating this plugin.
-   [`UIkit`](https://github.com/uikit/uikit) - Using UIkit framework.
-   [`fix-esm`](https://www.npmjs.com/package/fix-esm) - For `build-scripts/helpers/require-esm.js` - Require esm metadata files into cjs build script with `babel`.
