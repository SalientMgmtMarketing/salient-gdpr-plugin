<?php
/**
 * Salient GDPR
 *
 * @package     SalientGDPR
 * @author      Paul Stonier
 * @copyright   2018 Salient Management Company
 * @license     GPL-2.0+
 *
 * @wordpress-plugin
 * Plugin Name: Salient GDPR
 * Plugin URI:  https://www.salient.com/
 * Description: Adds detection of whether someone is from the EU.
 * Version:     1.0.0
 * Author:      Paul Stonier
 * Author URI:  https://www.salient.com
 * Text Domain: salient-gdpr
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

/**
 * Loads the CSS file for the plugin.
 */
function load_salient_gdpr_plugin_assets() {
	wp_register_script( 'salient_gdpr_scripts', plugins_url( '/assets/scripts/scripts.js', __FILE__, 'jquery', true ) );
	wp_enqueue_script( 'salient_gdpr_scripts' );
}
add_action( 'wp_enqueue_scripts', 'load_salient_gdpr_plugin_assets' );
