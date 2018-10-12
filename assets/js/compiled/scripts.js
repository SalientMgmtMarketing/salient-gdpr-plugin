/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

window.addEventListener('load',function(){
  var gdpr_from_ajax;
  var domestic = 'NA';

  function checkCookie() {
    return Cookies.get('gdpr');
  }

  var cookieConsent = function() {
    Cookies.set('gdpr', 'eu-consented');
    jQuery('.gdpr-cookie-banner').removeClass('gdpr-show');
    jQuery('.gdpr-cookie-banner').addClass('gdpr-hide');
  };

  //document.querySelector('button.cookie-agree-btn').addEventListener("click", cookieConsent);
 jQuery('button.cookie-agree-btn').click(cookieConsent);

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





  if ( gdprcookie !== 'eu-consented' ) {
    jQuery('.gdpr-cookie-banner').addClass('gdpr-show');
    jQuery('.gdpr-cookie-banner').removeClass('gdpr-hide');
    jQuery('form .gdpr-hide').addClass('gdpr-show');
    jQuery('form .gdpr-hide').removeClass('gdpr-hide');
  }
});
//# sourceMappingURL=scripts.js.map
