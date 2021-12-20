window.addEventListener('load',function(){
  var gdpr_from_ajax;
  var domestic = 'NA';

  function checkCookie() {
    return Cookies.get('gdpr');
  }

  var cookieConsent = function() {
    Cookies.set('gdpr', 'eu-consented');
    jQuery('body').removeClass('gdpr-banner-visible');
    jQuery('header#masthead').removeClass('gdpr-banner-visible');
    jQuery('.gdpr-cookie-banner').removeClass('gdpr-show');
    jQuery('.gdpr-cookie-banner').addClass('gdpr-hide');
  };

  //document.querySelector('button.cookie-agree-btn').addEventListener("click", cookieConsent);
 jQuery('button.cookie-agree-btn').click(cookieConsent);
 jQuery('button.close-banner').click(cookieConsent);

  var gdprcookie = String( checkCookie() );

  function check_gdpr() {
    if ( gdprcookie === "undefined" ) {
      jQuery.get('/wp-content/plugins/salient-gdpr/includes/get-ip.php', function(data) {
        gdpr_from_ajax = String(data);
        gdprCookie();
      });
    }
    function gdprCookie() {
      gdpr_from_ajax = 'NA';
      if ( gdpr_from_ajax === domestic ) {
        Cookies.set('gdpr', 'domestic');
        jQuery('body').addClass('gdpr-banner-visible');
        jQuery('header#masthead').addClass('gdpr-banner-visible');
        jQuery('.gdpr-cookie-banner').addClass('gdpr-show');
        jQuery('.gdpr-cookie-banner').removeClass('gdpr-hide');
        jQuery('form .gdpr-hide').addClass('gdpr-show');
        jQuery('form .gdpr-hide').removeClass('gdpr-hide');
      } else if ( gdpr_from_ajax != 'EU' ){
        jQuery('body').addClass('gdpr-banner-visible');
        jQuery('header#masthead').addClass('gdpr-banner-visible');
        jQuery('.gdpr-cookie-banner').addClass('gdpr-show');
        jQuery('.gdpr-cookie-banner').removeClass('gdpr-hide');
        jQuery('form .gdpr-hide').addClass('gdpr-show');
        jQuery('form .gdpr-hide').removeClass('gdpr-hide');
        Cookies.set('gdpr', 'non-eu');
      } else if ( gdpr_from_ajax === 'EU') {
          jQuery('body').addClass('gdpr-banner-visible');
          jQuery('header#masthead').addClass('gdpr-banner-visible');
          jQuery('.gdpr-cookie-banner').addClass('gdpr-show');
          jQuery('.gdpr-cookie-banner').removeClass('gdpr-hide');
          jQuery('form .gdpr-hide').addClass('gdpr-show');
          jQuery('form .gdpr-hide').removeClass('gdpr-hide');
      }
    }
    if ( gdprcookie === 'eu-consented' ) {
      jQuery('body').removeClass('gdpr-banner-visible');
      jQuery('header#masthead').removeClass('gdpr-banner-visible');
      jQuery('form .gdpr-hide').addClass('gdpr-show');
      jQuery('form .gdpr-hide').removeClass('gdpr-hide');
    }
    if ( gdprcookie !== 'eu-consented' ) {
      jQuery('body').addClass('gdpr-banner-visible');
      jQuery('header#masthead').addClass('gdpr-banner-visible');
    }
  }
  check_gdpr();





  if ( gdprcookie !== 'eu-consented' ) {
    jQuery('.gdpr-cookie-banner').addClass('gdpr-show');
    jQuery('.gdpr-cookie-banner').removeClass('gdpr-hide');
    jQuery('form .gdpr-hide').addClass('gdpr-show');
    jQuery('form .gdpr-hide').removeClass('gdpr-hide');
  }
});