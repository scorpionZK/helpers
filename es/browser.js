'use strict'

/**
 * 获取浏览器版本
 */
var USER_URGENT = window.navigator && window.navigator.userAgent || '';

var IS_ANDROID = /Android/i.test(USER_URGENT);
var IS_FIREFOX = /Firefox/i.test(USER_URGENT);
var IS_EDGE = /Edge/i.test(USER_URGENT);
var IS_CHROME  = !IS_EDGE && /Chrome/i.test(USER_URGENT);
var IE_VERSION = function () {
	var result = /MSIE\s(\d+)\.\d/.exec(USER_URGENT);
	var version = result && parseFloat(result[1]);
	if (!version && /Trident\/7.0/i.test(USER_URGENT) && /rv:11.0/.test(USER_URGENT)) {
		// IE 11 has a different user agent string than other IE versions
		version = 11.0;
	}
	return version;
}();
var IS_SAFARI = /Safari/i.test(USER_URGENT) && !IS_CHROME && !IS_ANDROID && !IS_EDGE;

export default {
    IS_ANDROID,
    IS_FIREFOX,
    IS_EDGE,
    IS_CHROME,
    IS_SAFARI,
    IS_IE: IE_VERSION ? true : false,
    IE_VERSION
}