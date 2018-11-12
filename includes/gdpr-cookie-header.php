<?php
/**
 * Gets the header for the GDPR Cookie Banner
 *
 * @package SalientGDPR
 */

if ( get_field( 'gdpr_cookies_message', 'option' ) ) { ?>
	<div class="gdpr-cookie-banner">
		<?php the_field( 'gdpr_cookies_message', 'option' ); ?>
		<button class="close-banner">
			<?php echo '<img src="' . plugins_url( 'assets/img/close-X-icon.svg', dirname(__FILE__) ) . '" /> '; ?>
			<span class="screen-reader-text">Close Message Window</span>
		</button>
	</div>
<?php } ?>
