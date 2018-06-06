var gdpr_from_ajax;
var domestic = 'NA';

function checkCookie() {
  return Cookies.get('gdpr');
}

function loadZendeskChat() {
  window.$zopim||(function(d,s){var z=$zopim=function(c){z._.push(c)},$=z.s=
  d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
  _.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute("charset","utf-8");
  $.src="https://v2.zopim.com/?qif1YM3xWvEX7OzRI0uwgImo1WMtvRRu";z.t=+new Date;$.
  type="text/javascript";e.parentNode.insertBefore($,e)})(document,"script");
}

var gdprcookie = String( checkCookie() );

function check_gdpr() {
  if ( gdprcookie === "undefined" ) {
    jQuery.get('/wp-content/plugins/salient-gdpr/includes/get-ip.php', function(data) {
      gdpr_from_ajax = String(data);
      gdprCookie();
    });
  }
  if ( gdprcookie === 'domestic' || gdprcookie === 'non-eu' || gdprcookie === 'eu-consented' ) {
    loadZendeskChat();
  }
  function gdprCookie() {
    gdpr_from_ajax = 'NA';
    if ( gdpr_from_ajax === domestic ) {
      Cookies.set('gdpr', 'domestic');
      jQuery('.gdpr-cookie-banner').addClass('gdpr-show');
      jQuery('.gdpr-cookie-banner').removeClass('gdpr-hide');
      jQuery('form .gdpr-hide').addClass('gdpr-show');
      jQuery('form .gdpr-hide').removeClass('gdpr-hide');
    } else if ( gdpr_from_ajax != 'EU' ){
      jQuery('.gdpr-cookie-banner').addClass('gdpr-show');
      jQuery('.gdpr-cookie-banner').removeClass('gdpr-hide');
      jQuery('form .gdpr-hide').addClass('gdpr-show');
      jQuery('form .gdpr-hide').removeClass('gdpr-hide');
      Cookies.set('gdpr', 'non-eu');
    } else if ( gdpr_from_ajax === 'EU') {
        jQuery('.gdpr-cookie-banner').addClass('gdpr-show');
        jQuery('.gdpr-cookie-banner').removeClass('gdpr-hide');
        jQuery('form .gdpr-hide').addClass('gdpr-show');
        jQuery('form .gdpr-hide').removeClass('gdpr-hide');
    }
  }
  if ( gdprcookie === 'eu-consented' ) {
    jQuery('form .gdpr-hide').addClass('gdpr-show');
    jQuery('form .gdpr-hide').removeClass('gdpr-hide');
  }
}
check_gdpr();

document.querySelector("button.cookie-agree-btn").addEventListener("click", cookieConsent);

function cookieConsent() {
  Cookies.set('gdpr', 'eu-consented');
  jQuery('.gdpr-cookie-banner').removeClass('gdpr-show');
  jQuery('.gdpr-cookie-banner').addClass('gdpr-hide');
}
if ( gdprcookie !== 'eu-consented' ) {
  jQuery('.gdpr-cookie-banner').addClass('gdpr-show');
  jQuery('.gdpr-cookie-banner').removeClass('gdpr-hide');
  jQuery('form .gdpr-hide').addClass('gdpr-show');
  jQuery('form .gdpr-hide').removeClass('gdpr-hide');
}