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
    loadDriftChat();
  };

  //document.querySelector('button.cookie-agree-btn').addEventListener("click", cookieConsent);
 jQuery('button.cookie-agree-btn').click(cookieConsent);
 jQuery('button.close-banner').click(cookieConsent);

  function loadDriftChat() {
    "use strict"; !function() { var t = window.driftt = window.drift = window.driftt || []; if (!t.init) { if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice.")); t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], t.factory = function(e) { return function() { var n = Array.prototype.slice.call(arguments); return n.unshift(e), t.push(n), t; }; }, t.methods.forEach(function(e) { t[e] = t.factory(e); }), t.load = function(t) { var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script"); o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js"; var i = document.getElementsByTagName("script")[0]; i.parentNode.insertBefore(o, i); }; } }(); drift.SNIPPET_VERSION = '0.3.1'; drift.load('wikyi8ewbsvw');
  }

  var gdprcookie = String( checkCookie() );

  function check_gdpr() {
    if ( gdprcookie === "undefined" ) {
      jQuery.get('/wp-content/plugins/salient-gdpr/includes/get-ip.php', function(data) {
        gdpr_from_ajax = String(data);
        gdprCookie();
      });
    }
    //if ( gdprcookie === 'eu-consented' ) {
      loadDriftChat();
    //}
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