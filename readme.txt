=== UIkit Blocks ===
Contributors: dobaniashish
Donate link: https://github.com/dobaniashish
Tags: gutenberg, blocks
Requires at least: 6.0
Tested up to: 6.6
Stable tag: 1.0.0
Requires PHP: 7.0
License: GPLv2
License URI: https://www.gnu.org/licenses/gpl-2.0.html

UIkit Gutenberg Blocks for WordPress.

== Description ==

This plugin adds UIkit components as Gutenberg blocks.

= Features =

-   Supports UIkit 3
-   Block templates can be overwritten in your theme

= Available Blocks =

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

= UIkit library =

Please be aware that this plugin does not include the UIkit library in your website. You need to do this by yourself. We decided not to include the library so that you can modify UIkit to your own needs before loading it.

You'll find an example how to include it in your theme's `functions.php` in the [documentation](https://github.com/dobaniashish/uikit-blocks#uikit-library).

= Templates =

All blocks are implemented as [dynamic blocks](https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/block-tutorial/creating-dynamic-blocks/). This makes it possible to overwrite the template of a block in your theme.

To overwrite a block template, you can copy the original template from the plugin into your theme directory in the same path as a starting point and adjust it to your needs.

= Further Information =

* Documentation: [https://github.com/dobaniashish/uikit-blocks#readme](https://github.com/dobaniashish/uikit-blocks#readme)
* WordPress Plugin: [https://wordpress.org/plugins/uikit-blocks](https://wordpress.org/plugins/uikit-blocks)
* GitHub Repository: [https://github.com/dobaniashish/uikit-blocks](https://github.com/dobaniashish/uikit-blocks)
* Changelog: [https://github.com/dobaniashish/uikit-blocks/releases](https://github.com/dobaniashish/uikit-blocks/releases)
* Issue tracker: [https://github.com/dobaniashish/uikit-blocks/issues](https://github.com/dobaniashish/uikit-blocks/issues)

== Installation ==

1. Upload the `uikit-blocks` directory into the `/wp-content/plugins/` directory
1. Activate the plugin through the `Plugins` menu in WordPress
1. Start adding blocks from the `UIkit Blocks` category

== Frequently Asked Questions ==

= Which versions of UIkit are supported? =

This plugin supports UIkit 3.

= Is UIkit included? =

No. This plugin doesn't load the UIkit library for you. You have to do this by yourself in your theme. Please read more about this in the [documentation](https://github.com/dobaniashish/uikit-blocks#uikit-library).

= Have you found a bug or do you have a feature request? =

Please create a new GitHub issue and let us know: [https://github.com/dobaniashish/uikit-blocks/issues](https://github.com/dobaniashish/uikit-blocks/issues)

== Screenshots ==

1. Grid block.
1. Grid block with Image, Text and Button.
1. Grid block with Accordian.
1. All Blocks list.

== Changelog ==

= 1.0.0 =

Initial release.

== Upgrade Notice ==

= 1.0.0 =

Initial release.
