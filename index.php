<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link    https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package lazy-load
 */

get_header();
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

			<?php
			if ( have_posts() ) :

				if ( is_home() && ! is_front_page() ) :
					?>
					<header>
						<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
					</header>
				<?php
				endif;

				/* Start the Loop */
				while ( have_posts() ) :
					the_post();

					$img_src_array             = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'full' );
					$img_src_lightweight_array = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'lazy-12x8' );
					$img_srcset                = wp_get_attachment_image_srcset( get_post_thumbnail_id( get_the_ID() ) );

					?>
					<div class="post-container">
						<h3><?php the_title(); ?></h3>
						<?php

						if ( has_post_thumbnail() ) {
							?>
							<div class="lazy-image">
								<div class="thumbnail">
									<?php
									echo wp_get_attachment_image(
										get_post_thumbnail_id( get_the_ID() ),
										'full',
										false,
										[
											'data-src'    => esc_url( $img_src_array[0] ),
											'data-srcset' => $img_srcset,
											'src'         => esc_url( $img_src_lightweight_array[0] ),
											'alt'         => esc_html( get_the_title() ),
											'srcset'      => esc_url( $img_src_lightweight_array[0] ),
										]
									)
									?>
								</div>
							</div>
							<?php
						}
						?>
					</div>
				<?php

				endwhile;

				the_posts_navigation();

			else :

				get_template_part( 'template-parts/content', 'none' );

			endif;
			?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_sidebar();
get_footer();
