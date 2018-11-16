<?php 
get_header(); 
do_action('unnecesary_scripts');
?>
<main class="main" style="width:100%;float:left;position:relative" id="main_content">
</main>
<div id="div-hiden" style="display:none;">
        <?php
       echo do_shortcode( '[contact-form-7 id="10" title="Contact form"]' );
		// Show the selected front page content.
		if ( have_posts() ) :
			while ( have_posts() ) :
                the_post();
            endwhile;    
        endif;
        ?>
</div>	
<?php get_footer();