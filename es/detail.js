var toString = Object.prototype.toString;
var hasOwn = Object.prototype.hasOwnProperty;

var details = {};

['Array', 'Number', 'Arguments', 'Function', 'String', 'Date', 'RegExp', 'Error']
.forEach(function(name){
    details[name] = function(obj){
        return toString.call(obj) === '[object' + name + ']';
    }
})

details.isEmptyObject = function(obj){
    for(var i in obj) {
        if(obj[i]) return false;
    }
    return true;
}

details.isContext = function(str){
    return str === '';
}

details.isNull = function(str){
    return str === null;
}

details.isUndefined = function(str){
    return str === void 0;
}

details.isObject = function(obj){
    var type = typeof obj;
    return !!obj && type === 'object' || type === 'function';
}

details.isEl = function(element){
    return !!element && element.nodeType === 1;
}

details.extend = function(){
    var options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
        deep = target;

        // Skip the boolean and the target
        target = arguments[i] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !this.isFunction(target)) {
        target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if (i === length) {
        target = this;
        i--;
    }

    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {

            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (this.isObject(copy) ||
                    (copyIsArray = Array.isArray(copy)))) {

                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];

                    } else {
                        clone = src && this.isObject(src) ? src : {};
                    }
                    // Never move original objects, clone them
                    target[name] = this.extend(deep, clone, copy);

                    // Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
}

details.inherits = function(subClass, superClass) {
    if(typeof superClass !== 'function' && superClass !== null){
        throw new Error('must be function!');
    }

    subClass.prototype = Object.create(superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true,
            enumerable: false
        }
    })
}

details.possibleConstructorReturn = function(self, call){
    if(!self){
        throw new Error("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === 'function' && typeof call === 'object') ? call : self;
}

export default details;