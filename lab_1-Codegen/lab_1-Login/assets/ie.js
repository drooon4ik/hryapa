/*! HTML5 Shiv pre3.6 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
 Uncompressed source: https://github.com/aFarkas/html5shiv  */
(function (l, f) {
    function m() {
        var a = e.elements;
        return "string" == typeof a ? a.split(" ") : a
    }

    function i(a) {
        var b = n[a[o]];
        b || (b = {}, h++, a[o] = h, n[h] = b);
        return b
    }

    function p(a, b, c) {
        b || (b = f);
        if (g)return b.createElement(a);
        c || (c = i(b));
        b = c.cache[a] ? c.cache[a].cloneNode() : r.test(a) ? (c.cache[a] = c.createElem(a)).cloneNode() : c.createElem(a);
        return b.canHaveChildren && !s.test(a) ? c.frag.appendChild(b) : b
    }

    function t(a, b) {
        if (!b.cache)b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag();
        a.createElement = function (c) {
            return !e.shivMethods ? b.createElem(c) : p(c, a, b)
        };
        a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/\w+/g, function (a) {
            b.createElem(a);
            b.frag.createElement(a);
            return 'c("' + a + '")'
        }) + ");return n}")(e, b.frag)
    }

    function q(a) {
        a || (a = f);
        var b = i(a);
        if (e.shivCSS && !j && !b.hasCSS) {
            var c, d = a;
            c = d.createElement("p");
            d = d.getElementsByTagName("head")[0] || d.documentElement;
            c.innerHTML = "x<style>article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}</style>";
            c = d.insertBefore(c.lastChild, d.firstChild);
            b.hasCSS = !!c
        }
        g || t(a, b);
        return a
    }

    var k = l.html5 || {}, s = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, r = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, j, o = "_html5shiv", h = 0, n = {}, g;
    (function () {
        try {
            var a = f.createElement("a");
            a.innerHTML = "<xyz></xyz>";
            j = "hidden"in a;
            var b;
            if (!(b = 1 == a.childNodes.length)) {
                f.createElement("a");
                var c = f.createDocumentFragment();
                b = "undefined" == typeof c.cloneNode ||
                    "undefined" == typeof c.createDocumentFragment || "undefined" == typeof c.createElement
            }
            g = b
        } catch (d) {
            g = j = !0
        }
    })();
    var e = {
        elements: k.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
        shivCSS: !1 !== k.shivCSS,
        supportsUnknownElements: g,
        shivMethods: !1 !== k.shivMethods,
        type: "default",
        shivDocument: q,
        createElement: p,
        createDocumentFragment: function (a, b) {
            a || (a = f);
            if (g)return a.createDocumentFragment();
            for (var b = b || i(a), c = b.frag.cloneNode(), d = 0, e = m(), h = e.length; d < h; d++)c.createElement(e[d]);
            return c
        }
    };
    l.html5 = e;
    q(f)
})(this, document);

/* ES5-shim
 https://github.com/kriskowal/es5-shim
 Copyright 2009-2012 by contributors, MIT License */
(function (definition) {
    if (typeof define == "function")define(definition); else if (typeof YUI == "function")YUI.add("es5", definition); else definition()
})(function () {
    if (!Function.prototype.bind)Function.prototype.bind = function bind(that) {
        var target = this;
        if (typeof target != "function")throw new TypeError("Function.prototype.bind called on incompatible " + target);
        var args = slice.call(arguments, 1);
        var bound = function () {
            if (this instanceof bound) {
                var result = target.apply(this, args.concat(slice.call(arguments)));
                if (Object(result) ===
                    result)return result;
                return this
            } else return target.apply(that, args.concat(slice.call(arguments)))
        };
        if (target.prototype)bound.prototype = Object.create(target.prototype);
        return bound
    };
    var call = Function.prototype.call;
    var prototypeOfArray = Array.prototype;
    var prototypeOfObject = Object.prototype;
    var slice = prototypeOfArray.slice;
    var _toString = call.bind(prototypeOfObject.toString);
    var owns = call.bind(prototypeOfObject.hasOwnProperty);
    var defineGetter;
    var defineSetter;
    var lookupGetter;
    var lookupSetter;
    var supportsAccessors;
    if (supportsAccessors = owns(prototypeOfObject, "__defineGetter__")) {
        defineGetter = call.bind(prototypeOfObject.__defineGetter__);
        defineSetter = call.bind(prototypeOfObject.__defineSetter__);
        lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
        lookupSetter = call.bind(prototypeOfObject.__lookupSetter__)
    }
    if ([1, 2].splice(0).length != 2) {
        var array_splice = Array.prototype.splice;
        Array.prototype.splice = function (start, deleteCount) {
            if (!arguments.length)return []; else return array_splice.apply(this, [start === void 0 ?
                0 : start, deleteCount === void 0 ? this.length - start : deleteCount].concat(slice.call(arguments, 2)))
        }
    }
    if (!Array.isArray)Array.isArray = function isArray(obj) {
        return _toString(obj) == "[object Array]"
    };
    var boxedString = Object("a"), splitString = boxedString[0] != "a" || !(0 in boxedString);
    if (!Array.prototype.forEach)Array.prototype.forEach = function forEach(fun) {
        var object = toObject(this), self = splitString && _toString(this) == "[object String]" ? this.split("") : object, thisp = arguments[1], i = -1, length = self.length >>> 0;
        if (_toString(fun) !=
            "[object Function]")throw new TypeError;
        while (++i < length)if (i in self)fun.call(thisp, self[i], i, object)
    };
    if (!Array.prototype.map)Array.prototype.map = function map(fun) {
        var object = toObject(this), self = splitString && _toString(this) == "[object String]" ? this.split("") : object, length = self.length >>> 0, result = Array(length), thisp = arguments[1];
        if (_toString(fun) != "[object Function]")throw new TypeError(fun + " is not a function");
        for (var i = 0; i < length; i++)if (i in self)result[i] = fun.call(thisp, self[i], i, object);
        return result
    };
    if (!Array.prototype.filter)Array.prototype.filter = function filter(fun) {
        var object = toObject(this), self = splitString && _toString(this) == "[object String]" ? this.split("") : object, length = self.length >>> 0, result = [], value, thisp = arguments[1];
        if (_toString(fun) != "[object Function]")throw new TypeError(fun + " is not a function");
        for (var i = 0; i < length; i++)if (i in self) {
            value = self[i];
            if (fun.call(thisp, value, i, object))result.push(value)
        }
        return result
    };
    if (!Array.prototype.every)Array.prototype.every = function every(fun) {
        var object =
            toObject(this), self = splitString && _toString(this) == "[object String]" ? this.split("") : object, length = self.length >>> 0, thisp = arguments[1];
        if (_toString(fun) != "[object Function]")throw new TypeError(fun + " is not a function");
        for (var i = 0; i < length; i++)if (i in self && !fun.call(thisp, self[i], i, object))return false;
        return true
    };
    if (!Array.prototype.some)Array.prototype.some = function some(fun) {
        var object = toObject(this), self = splitString && _toString(this) == "[object String]" ? this.split("") : object, length = self.length >>>
            0, thisp = arguments[1];
        if (_toString(fun) != "[object Function]")throw new TypeError(fun + " is not a function");
        for (var i = 0; i < length; i++)if (i in self && fun.call(thisp, self[i], i, object))return true;
        return false
    };
    if (!Array.prototype.reduce)Array.prototype.reduce = function reduce(fun) {
        var object = toObject(this), self = splitString && _toString(this) == "[object String]" ? this.split("") : object, length = self.length >>> 0;
        if (_toString(fun) != "[object Function]")throw new TypeError(fun + " is not a function");
        if (!length && arguments.length ==
            1)throw new TypeError("reduce of empty array with no initial value");
        var i = 0;
        var result;
        if (arguments.length >= 2)result = arguments[1]; else {
            do {
                if (i in self) {
                    result = self[i++];
                    break
                }
                if (++i >= length)throw new TypeError("reduce of empty array with no initial value");
            } while (true)
        }
        for (; i < length; i++)if (i in self)result = fun.call(void 0, result, self[i], i, object);
        return result
    };
    if (!Array.prototype.reduceRight)Array.prototype.reduceRight = function reduceRight(fun) {
        var object = toObject(this), self = splitString && _toString(this) ==
        "[object String]" ? this.split("") : object, length = self.length >>> 0;
        if (_toString(fun) != "[object Function]")throw new TypeError(fun + " is not a function");
        if (!length && arguments.length == 1)throw new TypeError("reduceRight of empty array with no initial value");
        var result, i = length - 1;
        if (arguments.length >= 2)result = arguments[1]; else {
            do {
                if (i in self) {
                    result = self[i--];
                    break
                }
                if (--i < 0)throw new TypeError("reduceRight of empty array with no initial value");
            } while (true)
        }
        do if (i in this)result = fun.call(void 0, result,
            self[i], i, object); while (i--);
        return result
    };
    if (!Array.prototype.indexOf || [0, 1].indexOf(1, 2) != -1)Array.prototype.indexOf = function indexOf(sought) {
        var self = splitString && _toString(this) == "[object String]" ? this.split("") : toObject(this), length = self.length >>> 0;
        if (!length)return -1;
        var i = 0;
        if (arguments.length > 1)i = toInteger(arguments[1]);
        i = i >= 0 ? i : Math.max(0, length + i);
        for (; i < length; i++)if (i in self && self[i] === sought)return i;
        return -1
    };
    if (!Array.prototype.lastIndexOf || [0, 1].lastIndexOf(0, -3) != -1)Array.prototype.lastIndexOf =
        function lastIndexOf(sought) {
            var self = splitString && _toString(this) == "[object String]" ? this.split("") : toObject(this), length = self.length >>> 0;
            if (!length)return -1;
            var i = length - 1;
            if (arguments.length > 1)i = Math.min(i, toInteger(arguments[1]));
            i = i >= 0 ? i : length - Math.abs(i);
            for (; i >= 0; i--)if (i in self && sought === self[i])return i;
            return -1
        };
    if (!Object.keys) {
        var hasDontEnumBug = true, dontEnums = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], dontEnumsLength =
            dontEnums.length;
        for (var key in{"toString": null})hasDontEnumBug = false;
        Object.keys = function keys(object) {
            if (typeof object != "object" && typeof object != "function" || object === null)throw new TypeError("Object.keys called on a non-object");
            var keys = [];
            for (var name in object)if (owns(object, name))keys.push(name);
            if (hasDontEnumBug)for (var i = 0, ii = dontEnumsLength; i < ii; i++) {
                var dontEnum = dontEnums[i];
                if (owns(object, dontEnum))keys.push(dontEnum)
            }
            return keys
        }
    }
    var negativeDate = -621987552E5, negativeYearString = "-000001";
    if (!Date.prototype.toISOString || (new Date(negativeDate)).toISOString().indexOf(negativeYearString) === -1)Date.prototype.toISOString = function toISOString() {
        var result, length, value, year, month;
        if (!isFinite(this))throw new RangeError("Date.prototype.toISOString called on non-finite value.");
        year = this.getUTCFullYear();
        month = this.getUTCMonth();
        year += Math.floor(month / 12);
        month = (month % 12 + 12) % 12;
        result = [month + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()];
        year = (year < 0 ? "-" :
                year > 9999 ? "+" : "") + ("00000" + Math.abs(year)).slice(0 <= year && year <= 9999 ? -4 : -6);
        length = result.length;
        while (length--) {
            value = result[length];
            if (value < 10)result[length] = "0" + value
        }
        return year + "-" + result.slice(0, 2).join("-") + "T" + result.slice(2).join(":") + "." + ("000" + this.getUTCMilliseconds()).slice(-3) + "Z"
    };
    var dateToJSONIsSupported = false;
    try {
        dateToJSONIsSupported = Date.prototype.toJSON && (new Date(NaN)).toJSON() === null && (new Date(negativeDate)).toJSON().indexOf(negativeYearString) !== -1 && Date.prototype.toJSON.call({
                toISOString: function () {
                    return true
                }
            })
    } catch (e) {
    }
    if (!dateToJSONIsSupported)Date.prototype.toJSON =
        function toJSON(key) {
            var o = Object(this), tv = toPrimitive(o), toISO;
            if (typeof tv === "number" && !isFinite(tv))return null;
            toISO = o.toISOString;
            if (typeof toISO != "function")throw new TypeError("toISOString property is not callable");
            return toISO.call(o)
        };
    if (!Date.parse || "Date.parse is buggy")Date = function (NativeDate) {
        function Date(Y, M, D, h, m, s, ms) {
            var length = arguments.length;
            if (this instanceof NativeDate) {
                var date = length == 1 && String(Y) === Y ? new NativeDate(Date.parse(Y)) : length >= 7 ? new NativeDate(Y, M, D, h, m, s, ms) :
                    length >= 6 ? new NativeDate(Y, M, D, h, m, s) : length >= 5 ? new NativeDate(Y, M, D, h, m) : length >= 4 ? new NativeDate(Y, M, D, h) : length >= 3 ? new NativeDate(Y, M, D) : length >= 2 ? new NativeDate(Y, M) : length >= 1 ? new NativeDate(Y) : new NativeDate;
                date.constructor = Date;
                return date
            }
            return NativeDate.apply(this, arguments)
        }

        var isoDateExpression = new RegExp("^" + "(\\d{4}|[+-]\\d{6})" + "(?:-(\\d{2})" + "(?:-(\\d{2})" + "(?:" + "T(\\d{2})" + ":(\\d{2})" + "(?:" + ":(\\d{2})" + "(?:\\.(\\d{3}))?" + ")?" + "(" + "Z|" + "(?:" + "([-+])" + "(\\d{2})" + ":(\\d{2})" + ")" + ")?)?)?)?" +
        "$");
        var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

        function dayFromMonth(year, month) {
            var t = month > 1 ? 1 : 0;
            return months[month] + Math.floor((year - 1969 + t) / 4) - Math.floor((year - 1901 + t) / 100) + Math.floor((year - 1601 + t) / 400) + 365 * (year - 1970)
        }

        for (var key in NativeDate)Date[key] = NativeDate[key];
        Date.now = NativeDate.now;
        Date.UTC = NativeDate.UTC;
        Date.prototype = NativeDate.prototype;
        Date.prototype.constructor = Date;
        Date.parse = function parse(string) {
            var match = isoDateExpression.exec(string);
            if (match) {
                var year =
                    Number(match[1]), month = Number(match[2] || 1) - 1, day = Number(match[3] || 1) - 1, hour = Number(match[4] || 0), minute = Number(match[5] || 0), second = Number(match[6] || 0), millisecond = Number(match[7] || 0), offset = !match[4] || match[8] ? 0 : Number(new NativeDate(1970, 0)), signOffset = match[9] === "-" ? 1 : -1, hourOffset = Number(match[10] || 0), minuteOffset = Number(match[11] || 0), result;
                if (hour < (minute > 0 || second > 0 || millisecond > 0 ? 24 : 25) && minute < 60 && second < 60 && millisecond < 1E3 && month > -1 && month < 12 && hourOffset < 24 && minuteOffset < 60 && day > -1 && day < dayFromMonth(year,
                        month + 1) - dayFromMonth(year, month)) {
                    result = ((dayFromMonth(year, month) + day) * 24 + hour + hourOffset * signOffset) * 60;
                    result = ((result + minute + minuteOffset * signOffset) * 60 + second) * 1E3 + millisecond + offset;
                    if (-864E13 <= result && result <= 864E13)return result
                }
                return NaN
            }
            return NativeDate.parse.apply(this, arguments)
        };
        return Date
    }(Date);
    if (!Date.now)Date.now = function now() {
        return (new Date).getTime()
    };
    if ("0".split(void 0, 0).length) {
        var string_split = String.prototype.split;
        String.prototype.split = function (separator, limit) {
            if (separator === void 0 && limit === 0)return [];
            return string_split.apply(this, arguments)
        }
    }
    if ("".substr && "0b".substr(-1) !== "b") {
        var string_substr = String.prototype.substr;
        String.prototype.substr = function (start, length) {
            return string_substr.call(this, start < 0 ? (start = this.length + start) < 0 ? 0 : start : start, length)
        }
    }
    var ws = "\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003" + "\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028" + "\u2029\ufeff";
    if (!String.prototype.trim || ws.trim()) {
        ws = "[" + ws + "]";
        var trimBeginRegexp =
            new RegExp("^" + ws + ws + "*"), trimEndRegexp = new RegExp(ws + ws + "*$");
        String.prototype.trim = function trim() {
            if (this === undefined || this === null)throw new TypeError("can't convert " + this + " to object");
            return String(this).replace(trimBeginRegexp, "").replace(trimEndRegexp, "")
        }
    }
    function toInteger(n) {
        n = +n;
        if (n !== n)n = 0; else if (n !== 0 && n !== 1 / 0 && n !== -(1 / 0))n = (n > 0 || -1) * Math.floor(Math.abs(n));
        return n
    }

    function isPrimitive(input) {
        var type = typeof input;
        return input === null || type === "undefined" || type === "boolean" || type ===
            "number" || type === "string"
    }

    function toPrimitive(input) {
        var val, valueOf, toString;
        if (isPrimitive(input))return input;
        valueOf = input.valueOf;
        if (typeof valueOf === "function") {
            val = valueOf.call(input);
            if (isPrimitive(val))return val
        }
        toString = input.toString;
        if (typeof toString === "function") {
            val = toString.call(input);
            if (isPrimitive(val))return val
        }
        throw new TypeError;
    }

    var toObject = function (o) {
        if (o == null)throw new TypeError("can't convert " + o + " to object");
        return Object(o)
    }
});
