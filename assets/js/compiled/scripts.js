var gdpr_from_ajax;!function(e){var o=!1;if("function"==typeof define&&define.amd&&(define(e),o=!0),"object"==typeof exports&&(module.exports=e(),o=!0),!o){var r=window.Cookies,n=window.Cookies=e();n.noConflict=function(){return window.Cookies=r,n}}}(function(){function m(){for(var e=0,o={};e<arguments.length;e++){var r=arguments[e];for(var n in r)o[n]=r[n]}return o}return function e(f){function l(e,o,r){var n;if("undefined"!=typeof document){if(1<arguments.length){if("number"==typeof(r=m({path:"/"},l.defaults,r)).expires){var t=new Date;t.setMilliseconds(t.getMilliseconds()+864e5*r.expires),r.expires=t}r.expires=r.expires?r.expires.toUTCString():"";try{n=JSON.stringify(o),/^[\{\[]/.test(n)&&(o=n)}catch(e){}o=f.write?f.write(o,e):encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),e=(e=(e=encodeURIComponent(String(e))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var i="";for(var d in r)r[d]&&(i+="; "+d,!0!==r[d]&&(i+="="+r[d]));return document.cookie=e+"="+o+i}e||(n={});for(var c=document.cookie?document.cookie.split("; "):[],s=/(%[0-9A-Z]{2})+/g,a=0;a<c.length;a++){var p=c[a].split("="),u=p.slice(1).join("=");this.json||'"'!==u.charAt(0)||(u=u.slice(1,-1));try{var g=p[0].replace(s,decodeURIComponent);if(u=f.read?f.read(u,g):f(u,g)||u.replace(s,decodeURIComponent),this.json)try{u=JSON.parse(u)}catch(e){}if(e===g){n=u;break}e||(n[g]=u)}catch(e){}}return n}}return(l.set=l).get=function(e){return l.call(l,e)},l.getJSON=function(){return l.apply({json:!0},[].slice.call(arguments))},l.defaults={},l.remove=function(e,o){l(e,"",m(o,{expires:-1}))},l.withConverter=e,l}(function(){})});var domestic="NA";function checkCookie(){return Cookies.get("gdpr")}function loadZendeskChat(){var e,o,r,n,t;window.$zopim||(e=document,o="script",r=$zopim=function(e){r._.push(e)},n=r.s=e.createElement(o),t=e.getElementsByTagName(o)[0],r.set=function(e){r.set._.push(e)},r._=[],r.set._=[],n.async=!0,n.setAttribute("charset","utf-8"),n.src="https://v2.zopim.com/?qif1YM3xWvEX7OzRI0uwgImo1WMtvRRu",r.t=+new Date,n.type="text/javascript",t.parentNode.insertBefore(n,t))}var gdprcookie=String(checkCookie());function check_gdpr(){"undefined"===gdprcookie&&jQuery.get("https://www.salient.com/wp-content/plugins/salient-gdpr/includes/get-ip.php",function(e){gdpr_from_ajax=String(e),(gdpr_from_ajax="EU")===domestic?Cookies.set("gdpr","domestic"):"EU"!=gdpr_from_ajax?Cookies.set("gdpr","non-eu"):"EU"===gdpr_from_ajax&&(jQuery(".gdpr-cookie-banner").addClass("gdpr-show"),jQuery(".gdpr-cookie-banner").removeClass("gdpr-hide"),jQuery("form .gdpr-hide").addClass("gdpr-show"),jQuery("form .gdpr-hide").removeClass("gdpr-hide"))}),gdprcookie===domestic&&loadZendeskChat(),"non-eu"===gdprcookie&&loadZendeskChat(),"eu-consented"===gdprcookie&&(jQuery("form .gdpr-hide").addClass("gdpr-show"),jQuery("form .gdpr-hide").removeClass("gdpr-hide"))}function cookieConsent(){Cookies.set("gdpr","eu-consented"),jQuery(".gdpr-cookie-banner").removeClass("gdpr-show"),jQuery(".gdpr-cookie-banner").addClass("gdpr-hide")}check_gdpr(),document.querySelector("button.cookie-agree-btn").addEventListener("click",cookieConsent);