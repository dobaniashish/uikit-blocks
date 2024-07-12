<?php // phpcs:ignore Squiz.Commenting.FileComment.Missing
get_header();

if ( have_posts() ) {

	// Load posts loop.
	while ( have_posts() ) {
		the_post();
		?>
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<header class="entry-header">
			<?php the_title( '<h1>', '</h1>' ); ?>
			</header>

			<div class="entry-content">
			<?php the_content(); ?>
			</div>
		</article>
		<?php
	}
}

get_footer();
