<?php
/**
 * Gets the header for the GDPR Cookie Banner
 *
 * @package SalientGDPR
 */

if ( get_field( 'gdpr_cookies_message', 'option' ) ) { ?>
	<div class="gdpr-cookie-banner"><?php the_field( 'gdpr_cookies_message', 'option' ); ?></div>
<?php } ?>
