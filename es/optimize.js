/**
 * 
 * @param {function} fn 
 * @param {number} interval 
 */
function throttle(fn, interval){
    var timer, first = true;
	return function(){
		if(first){
			fn.apply(this, arguments);
			return first = false;
		}
		if(timer) return false;
		timer = setTimeout(function(){
			clearTimeout(timer);
			timer = null;
			fn.apply(this, arguments);
		}.bind(this), interval || 500);
	}
}

export default {
    throttle
}