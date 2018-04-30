<?php
/**
 * Gets the IP address of the visitor
 *
 * @package SalientGDPR
 *
 * @return void
 */

/**
 * Gets the location of the visitor based on the IP address
 *
 * @param string  $ip gets the IP address of the visitor.
 * @param string  $purpose gets the location of the visitor.
 * @param boolean $deep_detect double checks the IP address to see if it is going through a firewall.
 * @return string
 */
function ip_info( $ip = null, $purpose = 'location', $deep_detect = true ) {
	$output = null;
	if ( filter_var( $ip, FILTER_VALIDATE_IP ) === false ) {
		$ip = $_SERVER['REMOTE_ADDR'];
		if ( $deep_detect ) {
			if ( filter_var( @$_SERVER['HTTP_X_FORWARDED_FOR'], FILTER_VALIDATE_IP ) ) {
				$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
			}
			if ( filter_var( @$_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP ) ) {
				$ip = $_SERVER['HTTP_CLIENT_IP'];
			}
		}
	}
	$purpose    = str_replace( array( 'name', '\n', '\t', ' ', '-', '_' ), null, strtolower( trim( $purpose ) ) );
	$support    = array( 'country', 'countrycode', 'state', 'region', 'city', 'location', 'address', 'continent' );
	$continents = array(
		'AF' => 'Africa',
		'AN' => 'Antarctica',
		'AS' => 'Asia',
		'EU' => 'Europe',
		'OC' => 'Australia (Oceania)',
		'NA' => 'North America',
		'SA' => 'South America',
	);
	if ( filter_var( $ip, FILTER_VALIDATE_IP ) && in_array( $purpose, $support ) ) {
		$ipdat = @json_decode( file_get_contents( 'http://www.geoplugin.net/json.gp?ip=' . $ip ) );
		if ( @strlen( trim( $ipdat->geoplugin_countryCode ) ) == 2 ) {
			switch ( $purpose ) {
				case 'location':
					$output = array(
						'city'           => @$ipdat->geoplugin_city,
						'state'          => @$ipdat->geoplugin_regionName,
						'country'        => @$ipdat->geoplugin_countryName,
						'country_code'   => @$ipdat->geoplugin_countryCode,
						'continent'      => @$continents[ strtoupper( $ipdat->geoplugin_continentCode ) ],
						'continent_code' => @$ipdat->geoplugin_continentCode,
					);
					break;
				case 'address':
					$address = array( $ipdat->geoplugin_countryName );
					if ( @strlen( $ipdat->geoplugin_regionName ) >= 1) {
						$address[] = $ipdat->geoplugin_regionName;
					}
					if (@strlen($ipdat->geoplugin_city) >= 1) {
						$address[] = $ipdat->geoplugin_city;
					}
					$output = implode(', ', array_reverse( $address ) );
					break;
				case 'city':
					$output = @$ipdat->geoplugin_city;
					break;
				case 'state':
					$output = @$ipdat->geoplugin_regionName;
					break;
				case 'region':
					$output = @$ipdat->geoplugin_regionName;
					break;
				case 'country':
					$output = @$ipdat->geoplugin_countryName;
					break;
				case 'countrycode':
					$output = @$ipdat->geoplugin_countryCode;
					break;
				case 'continent':
					$output = @$ipdat->geoplugin_continentCode;
					break;
			}
		}
	}
	return $output;
}
print_r( ip_info( 'Visitor', 'location' ) );
//echo ip_info( 'Visitor', 'continent' );
