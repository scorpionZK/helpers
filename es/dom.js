/**
 * calc element
 * @param {Element} element 
 * @return {number}
 */
function height(element){
    var height = window.getComputedStyle(element, null).getPropertyValue('height');
	var returnHeight = parseFloat(height);
	if(isNaN(returnHeight) || returnHeight < 0){
		returnHeight = element.offsetHeight - window.getComputedStyle(element, null).getPropertyValue('padding-top')
		-window.getComputedStyle(element, null).getPropertyValue('padding-bottom');
	}
	return returnHeight;
}

/**
 * calc element
 * @param {Element} element 
 * @return {number}
 */
function width(element){
    var width = window.getComputedStyle(element, null).getPropertyValue('width');
	var returnWidth = parseFloat(width);
	if(isNaN(returnWidth) || returnWidth < 0){
		returnWidth = element.offsetWidth - window.getComputedStyle(element, null).getPropertyValue('padding-left')
		-window.getComputedStyle(element, null).getPropertyValue('padding-right');
	}
	return returnWidth;
}

/**
 * 事件委托
 * @param {Event} e 
 * @param {ElementName} nodeName 
 * @return {Element}
 */
function delegate(e, nodeName){
    var target = (e || window.event).target;
    while(target && target.tagName.toUpperCase() !== 'HTML'){
        if(target.tagName.toLowerCase() == nodeName) {
            return target;
        }
        target = target.parentNode;
    }
    return null;
}

/**
 * 
 * @param {Element} element 
 */
function getBoundingClientRect(element){
    if(element && element.getBoundingClientRect && element.parentNode){
        var rect = element.getBoundingClientRect,
            result = {};
        
        ['top', 'right', 'bottom', 'left', 'width', 'height'].forEach(function(val){
            if(rect[val]) {
                result[val] = rect[val];
            }
        });

        if(!rect.height) {
            result.height = height(element);
        }
        if(!rect.width) {
            result.width = width(element);
        }

        return result;
    }
}

/**
 * 获取一个元素的位置
 * @param {Element} element 
 */
function findPosition(element) {
    var box = void 0;
    if(element.getBoundingClientRect && element.parentNode) {
        box = element.getBoundingClientRect();
    }
    if(!box) {
        return {
            left: 0,
            top: 0
        }
    }
    // 高版本
    var docEl = document.documentElement;
    //ie
    var body = document.body;

    var clientLeft = docEl.clientLeft || body.clientLeft || 0;
    var scrollLeft = window.pageXOffset || body.scrollLeft;
    var left = box.left + scrollLeft - clientLeft;
  
    var clientTop = docEl.clientTop || body.clientTop || 0;
    var scrollTop = window.pageYOffset || body.scrollTop;
    var top = box.top + scrollTop - clientTop;

    return {
        left: Math.round(left),
        top: Math.round(top)
    }
}


export default {
    height,
    width,
    delegate,
    getBoundingClientRect,
    findPosition
}

