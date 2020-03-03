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
 * Version:     1.0.13
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
	wp_register_script( 'salient_gdpr_scripts', plugins_url( '/assets/js/compiled/scripts.js', __FILE__ ), 'jquery', '1.0.13', true );
	wp_enqueue_script( 'salient_gdpr_scripts' );
	wp_enqueue_style( 'salient-gdpr-styles', plugins_url( '/assets/css/styles.css', __FILE__ ), '', '1.0.13' );
}
add_action( 'wp_enqueue_scripts', 'load_salient_gdpr_plugin_assets' );

if ( function_exists( 'acf_add_options_page' ) ) {

	acf_add_options_page(array(
		'page_title' => 'GDPR Settings',
		'menu_title' => 'GDPR',
		'menu_slug'  => 'gdpr-settings',
		'capability' => 'edit_posts',
		'redirect'   => false,
	));
}

if ( function_exists( 'acf_add_local_field_group' ) ) :

	acf_add_local_field_group(array(
		'key' => 'group_5afc21f3da625',
		'title' => 'GDPR',
		'fields' => array(
			array(
				'key' => 'field_5afc21ff0178d',
				'label' => 'GDPR Cookies Message',
				'name' => 'gdpr_cookies_message',
				'type' => 'wysiwyg',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'tabs' => 'all',
				'toolbar' => 'full',
				'media_upload' => 1,
				'delay' => 0,
			),
			array(
				'key' => 'field_5afc22170178e',
				'label' => 'GDPR Consent Message',
				'name' => 'gdpr_consent_message',
				'type' => 'wysiwyg',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'tabs' => 'all',
				'toolbar' => 'full',
				'media_upload' => 1,
				'delay' => 0,
			),
			array(
				'key' => 'field_5afc23a1b6124',
				'label' => 'GDPR Privacy Message',
				'name' => 'gdpr_privacy_message',
				'type' => 'wysiwyg',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'tabs' => 'all',
				'toolbar' => 'full',
				'media_upload' => 1,
				'delay' => 0,
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'options_page',
					'operator' => '==',
					'value' => 'gdpr-settings',
				),
			),
		),
		'menu_order' => 0,
		'position' => 'normal',
		'style' => 'default',
		'label_placement' => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen' => '',
		'active' => 1,
		'description' => '',
	));

endif;
