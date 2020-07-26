/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/inject.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/decode-uri-component/index.js":
/*!****************************************************!*\
  !*** ./node_modules/decode-uri-component/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),

/***/ "./node_modules/query-string/index.js":
/*!********************************************!*\
  !*** ./node_modules/query-string/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const strictUriEncode = __webpack_require__(/*! strict-uri-encode */ "./node_modules/strict-uri-encode/index.js");
const decodeComponent = __webpack_require__(/*! decode-uri-component */ "./node_modules/decode-uri-component/index.js");
const splitOnFirst = __webpack_require__(/*! split-on-first */ "./node_modules/split-on-first/index.js");

const isNullOrUndefined = value => value === null || value === undefined;

function encoderForArrayFormat(options) {
	switch (options.arrayFormat) {
		case 'index':
			return key => (result, value) => {
				const index = result.length;

				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[', index, ']'].join('')];
				}

				return [
					...result,
					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
				];
			};

		case 'bracket':
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[]'].join('')];
				}

				return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
			};

		case 'comma':
		case 'separator':
			return key => (result, value) => {
				if (value === null || value === undefined || value.length === 0) {
					return result;
				}

				if (result.length === 0) {
					return [[encode(key, options), '=', encode(value, options)].join('')];
				}

				return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
			};

		default:
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, encode(key, options)];
				}

				return [...result, [encode(key, options), '=', encode(value, options)].join('')];
			};
	}
}

function parserForArrayFormat(options) {
	let result;

	switch (options.arrayFormat) {
		case 'index':
			return (key, value, accumulator) => {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return (key, value, accumulator) => {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		case 'comma':
		case 'separator':
			return (key, value, accumulator) => {
				const isArray = typeof value === 'string' && value.split('').indexOf(options.arrayFormatSeparator) > -1;
				const newValue = isArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
				accumulator[key] = newValue;
			};

		default:
			return (key, value, accumulator) => {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function validateArrayFormatSeparator(value) {
	if (typeof value !== 'string' || value.length !== 1) {
		throw new TypeError('arrayFormatSeparator must be single character string');
	}
}

function encode(value, options) {
	if (options.encode) {
		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function decode(value, options) {
	if (options.decode) {
		return decodeComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	}

	if (typeof input === 'object') {
		return keysSorter(Object.keys(input))
			.sort((a, b) => Number(a) - Number(b))
			.map(key => input[key]);
	}

	return input;
}

function removeHash(input) {
	const hashStart = input.indexOf('#');
	if (hashStart !== -1) {
		input = input.slice(0, hashStart);
	}

	return input;
}

function getHash(url) {
	let hash = '';
	const hashStart = url.indexOf('#');
	if (hashStart !== -1) {
		hash = url.slice(hashStart);
	}

	return hash;
}

function extract(input) {
	input = removeHash(input);
	const queryStart = input.indexOf('?');
	if (queryStart === -1) {
		return '';
	}

	return input.slice(queryStart + 1);
}

function parseValue(value, options) {
	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
		value = Number(value);
	} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
		value = value.toLowerCase() === 'true';
	}

	return value;
}

function parse(input, options) {
	options = Object.assign({
		decode: true,
		sort: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ',',
		parseNumbers: false,
		parseBooleans: false
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const formatter = parserForArrayFormat(options);

	// Create an object with no prototype
	const ret = Object.create(null);

	if (typeof input !== 'string') {
		return ret;
	}

	input = input.trim().replace(/^[?#&]/, '');

	if (!input) {
		return ret;
	}

	for (const param of input.split('&')) {
		let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');

		// Missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		value = value === undefined ? null : ['comma', 'separator'].includes(options.arrayFormat) ? value : decode(value, options);
		formatter(decode(key, options), value, ret);
	}

	for (const key of Object.keys(ret)) {
		const value = ret[key];
		if (typeof value === 'object' && value !== null) {
			for (const k of Object.keys(value)) {
				value[k] = parseValue(value[k], options);
			}
		} else {
			ret[key] = parseValue(value, options);
		}
	}

	if (options.sort === false) {
		return ret;
	}

	return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
		const value = ret[key];
		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
			// Sort object keys, not values
			result[key] = keysSorter(value);
		} else {
			result[key] = value;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = (object, options) => {
	if (!object) {
		return '';
	}

	options = Object.assign({
		encode: true,
		strict: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ','
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const shouldFilter = key => (
		(options.skipNull && isNullOrUndefined(object[key])) ||
		(options.skipEmptyString && object[key] === '')
	);

	const formatter = encoderForArrayFormat(options);

	const objectCopy = {};

	for (const key of Object.keys(object)) {
		if (!shouldFilter(key)) {
			objectCopy[key] = object[key];
		}
	}

	const keys = Object.keys(objectCopy);

	if (options.sort !== false) {
		keys.sort(options.sort);
	}

	return keys.map(key => {
		const value = object[key];

		if (value === undefined) {
			return '';
		}

		if (value === null) {
			return encode(key, options);
		}

		if (Array.isArray(value)) {
			return value
				.reduce(formatter(key), [])
				.join('&');
		}

		return encode(key, options) + '=' + encode(value, options);
	}).filter(x => x.length > 0).join('&');
};

exports.parseUrl = (input, options) => {
	options = Object.assign({
		decode: true
	}, options);

	const [url, hash] = splitOnFirst(input, '#');

	return Object.assign(
		{
			url: url.split('?')[0] || '',
			query: parse(extract(input), options)
		},
		options && options.parseFragmentIdentifier && hash ? {fragmentIdentifier: decode(hash, options)} : {}
	);
};

exports.stringifyUrl = (input, options) => {
	options = Object.assign({
		encode: true,
		strict: true
	}, options);

	const url = removeHash(input.url).split('?')[0] || '';
	const queryFromUrl = exports.extract(input.url);
	const parsedQueryFromUrl = exports.parse(queryFromUrl, {sort: false});

	const query = Object.assign(parsedQueryFromUrl, input.query);
	let queryString = exports.stringify(query, options);
	if (queryString) {
		queryString = `?${queryString}`;
	}

	let hash = getHash(input.url);
	if (input.fragmentIdentifier) {
		hash = `#${encode(input.fragmentIdentifier, options)}`;
	}

	return `${url}${queryString}${hash}`;
};


/***/ }),

/***/ "./node_modules/split-on-first/index.js":
/*!**********************************************!*\
  !*** ./node_modules/split-on-first/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (string, separator) => {
	if (!(typeof string === 'string' && typeof separator === 'string')) {
		throw new TypeError('Expected the arguments to be of type `string`');
	}

	if (separator === '') {
		return [string];
	}

	const separatorIndex = string.indexOf(separator);

	if (separatorIndex === -1) {
		return [string];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
};


/***/ }),

/***/ "./node_modules/strict-uri-encode/index.js":
/*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/xhook/dist/xhook.js":
/*!******************************************!*\
  !*** ./node_modules/xhook/dist/xhook.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// XHook - v1.4.9 - https://github.com/jpillora/xhook
// Jaime Pillora <dev@jpillora.com> - MIT Copyright 2018
(function(undefined) {
var AFTER, BEFORE, COMMON_EVENTS, EventEmitter, FETCH, FIRE, FormData, NativeFetch, NativeFormData, NativeXMLHttp, OFF, ON, READY_STATE, UPLOAD_EVENTS, WINDOW, XHookFetchRequest, XHookFormData, XHookHttpRequest, XMLHTTP, convertHeaders, depricatedProp, document, fakeEvent, mergeObjects, msie, nullify, proxyEvents, slice, useragent, xhook, _base,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

WINDOW = null;

if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
  WINDOW = self;
} else if (typeof global !== 'undefined') {
  WINDOW = global;
} else {
  WINDOW = window;
}

document = WINDOW.document;

BEFORE = 'before';

AFTER = 'after';

READY_STATE = 'readyState';

ON = 'addEventListener';

OFF = 'removeEventListener';

FIRE = 'dispatchEvent';

XMLHTTP = 'XMLHttpRequest';

FETCH = 'fetch';

FormData = 'FormData';

UPLOAD_EVENTS = ['load', 'loadend', 'loadstart'];

COMMON_EVENTS = ['progress', 'abort', 'error', 'timeout'];

useragent = typeof navigator !== 'undefined' && navigator['useragent'] ? navigator.userAgent : '';

msie = parseInt((/msie (\d+)/.exec(useragent.toLowerCase()) || [])[1]);

if (isNaN(msie)) {
  msie = parseInt((/trident\/.*; rv:(\d+)/.exec(useragent.toLowerCase()) || [])[1]);
}

(_base = Array.prototype).indexOf || (_base.indexOf = function(item) {
  var i, x, _i, _len;
  for (i = _i = 0, _len = this.length; _i < _len; i = ++_i) {
    x = this[i];
    if (x === item) {
      return i;
    }
  }
  return -1;
});

slice = function(o, n) {
  return Array.prototype.slice.call(o, n);
};

depricatedProp = function(p) {
  return p === "returnValue" || p === "totalSize" || p === "position";
};

mergeObjects = function(src, dst) {
  var k, v;
  for (k in src) {
    v = src[k];
    if (depricatedProp(k)) {
      continue;
    }
    try {
      dst[k] = src[k];
    } catch (_error) {}
  }
  return dst;
};

nullify = function(res) {
  if (res === void 0) {
    return null;
  }
  return res;
};

proxyEvents = function(events, src, dst) {
  var event, p, _i, _len;
  p = function(event) {
    return function(e) {
      var clone, k, val;
      clone = {};
      for (k in e) {
        if (depricatedProp(k)) {
          continue;
        }
        val = e[k];
        clone[k] = val === src ? dst : val;
      }
      return dst[FIRE](event, clone);
    };
  };
  for (_i = 0, _len = events.length; _i < _len; _i++) {
    event = events[_i];
    if (dst._has(event)) {
      src["on" + event] = p(event);
    }
  }
};

fakeEvent = function(type) {
  var msieEventObject;
  if (document && (document.createEventObject != null)) {
    msieEventObject = document.createEventObject();
    msieEventObject.type = type;
    return msieEventObject;
  } else {
    try {
      return new Event(type);
    } catch (_error) {
      return {
        type: type
      };
    }
  }
};

EventEmitter = function(nodeStyle) {
  var emitter, events, listeners;
  events = {};
  listeners = function(event) {
    return events[event] || [];
  };
  emitter = {};
  emitter[ON] = function(event, callback, i) {
    events[event] = listeners(event);
    if (events[event].indexOf(callback) >= 0) {
      return;
    }
    i = i === undefined ? events[event].length : i;
    events[event].splice(i, 0, callback);
  };
  emitter[OFF] = function(event, callback) {
    var i;
    if (event === undefined) {
      events = {};
      return;
    }
    if (callback === undefined) {
      events[event] = [];
    }
    i = listeners(event).indexOf(callback);
    if (i === -1) {
      return;
    }
    listeners(event).splice(i, 1);
  };
  emitter[FIRE] = function() {
    var args, event, i, legacylistener, listener, _i, _len, _ref;
    args = slice(arguments);
    event = args.shift();
    if (!nodeStyle) {
      args[0] = mergeObjects(args[0], fakeEvent(event));
    }
    legacylistener = emitter["on" + event];
    if (legacylistener) {
      legacylistener.apply(emitter, args);
    }
    _ref = listeners(event).concat(listeners("*"));
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      listener = _ref[i];
      listener.apply(emitter, args);
    }
  };
  emitter._has = function(event) {
    return !!(events[event] || emitter["on" + event]);
  };
  if (nodeStyle) {
    emitter.listeners = function(event) {
      return slice(listeners(event));
    };
    emitter.on = emitter[ON];
    emitter.off = emitter[OFF];
    emitter.fire = emitter[FIRE];
    emitter.once = function(e, fn) {
      var fire;
      fire = function() {
        emitter.off(e, fire);
        return fn.apply(null, arguments);
      };
      return emitter.on(e, fire);
    };
    emitter.destroy = function() {
      return events = {};
    };
  }
  return emitter;
};

xhook = EventEmitter(true);

xhook.EventEmitter = EventEmitter;

xhook[BEFORE] = function(handler, i) {
  if (handler.length < 1 || handler.length > 2) {
    throw "invalid hook";
  }
  return xhook[ON](BEFORE, handler, i);
};

xhook[AFTER] = function(handler, i) {
  if (handler.length < 2 || handler.length > 3) {
    throw "invalid hook";
  }
  return xhook[ON](AFTER, handler, i);
};

xhook.enable = function() {
  WINDOW[XMLHTTP] = XHookHttpRequest;
  if (typeof XHookFetchRequest === "function") {
    WINDOW[FETCH] = XHookFetchRequest;
  }
  if (NativeFormData) {
    WINDOW[FormData] = XHookFormData;
  }
};

xhook.disable = function() {
  WINDOW[XMLHTTP] = xhook[XMLHTTP];
  WINDOW[FETCH] = xhook[FETCH];
  if (NativeFormData) {
    WINDOW[FormData] = NativeFormData;
  }
};

convertHeaders = xhook.headers = function(h, dest) {
  var header, headers, k, name, v, value, _i, _len, _ref;
  if (dest == null) {
    dest = {};
  }
  switch (typeof h) {
    case "object":
      headers = [];
      for (k in h) {
        v = h[k];
        name = k.toLowerCase();
        headers.push("" + name + ":\t" + v);
      }
      return headers.join('\n') + '\n';
    case "string":
      headers = h.split('\n');
      for (_i = 0, _len = headers.length; _i < _len; _i++) {
        header = headers[_i];
        if (/([^:]+):\s*(.+)/.test(header)) {
          name = (_ref = RegExp.$1) != null ? _ref.toLowerCase() : void 0;
          value = RegExp.$2;
          if (dest[name] == null) {
            dest[name] = value;
          }
        }
      }
      return dest;
  }
};

NativeFormData = WINDOW[FormData];

XHookFormData = function(form) {
  var entries;
  this.fd = form ? new NativeFormData(form) : new NativeFormData();
  this.form = form;
  entries = [];
  Object.defineProperty(this, 'entries', {
    get: function() {
      var fentries;
      fentries = !form ? [] : slice(form.querySelectorAll("input,select")).filter(function(e) {
        var _ref;
        return ((_ref = e.type) !== 'checkbox' && _ref !== 'radio') || e.checked;
      }).map(function(e) {
        return [e.name, e.type === "file" ? e.files : e.value];
      });
      return fentries.concat(entries);
    }
  });
  this.append = (function(_this) {
    return function() {
      var args;
      args = slice(arguments);
      entries.push(args);
      return _this.fd.append.apply(_this.fd, args);
    };
  })(this);
};

if (NativeFormData) {
  xhook[FormData] = NativeFormData;
  WINDOW[FormData] = XHookFormData;
}

NativeXMLHttp = WINDOW[XMLHTTP];

xhook[XMLHTTP] = NativeXMLHttp;

XHookHttpRequest = WINDOW[XMLHTTP] = function() {
  var ABORTED, currentState, emitFinal, emitReadyState, event, facade, hasError, hasErrorHandler, readBody, readHead, request, response, setReadyState, status, transiting, writeBody, writeHead, xhr, _i, _len, _ref;
  ABORTED = -1;
  xhr = new xhook[XMLHTTP]();
  request = {};
  status = null;
  hasError = void 0;
  transiting = void 0;
  response = void 0;
  readHead = function() {
    var key, name, val, _ref;
    response.status = status || xhr.status;
    if (!(status === ABORTED && msie < 10)) {
      response.statusText = xhr.statusText;
    }
    if (status !== ABORTED) {
      _ref = convertHeaders(xhr.getAllResponseHeaders());
      for (key in _ref) {
        val = _ref[key];
        if (!response.headers[key]) {
          name = key.toLowerCase();
          response.headers[name] = val;
        }
      }
    }
  };
  readBody = function() {
    if (!xhr.responseType || xhr.responseType === "text") {
      response.text = xhr.responseText;
      response.data = xhr.responseText;
      try {
        response.xml = xhr.responseXML;
      } catch (_error) {

      }
    } else if (xhr.responseType === "document") {
      response.xml = xhr.responseXML;
      response.data = xhr.responseXML;
    } else {
      response.data = xhr.response;
    }
    if ("responseURL" in xhr) {
      response.finalUrl = xhr.responseURL;
    }
  };
  writeHead = function() {
    facade.status = response.status;
    facade.statusText = response.statusText;
  };
  writeBody = function() {
    if ('text' in response) {
      facade.responseText = response.text;
    }
    if ('xml' in response) {
      facade.responseXML = response.xml;
    }
    if ('data' in response) {
      facade.response = response.data;
    }
    if ('finalUrl' in response) {
      facade.responseURL = response.finalUrl;
    }
  };
  emitReadyState = function(n) {
    while (n > currentState && currentState < 4) {
      facade[READY_STATE] = ++currentState;
      if (currentState === 1) {
        facade[FIRE]("loadstart", {});
      }
      if (currentState === 2) {
        writeHead();
      }
      if (currentState === 4) {
        writeHead();
        writeBody();
      }
      facade[FIRE]("readystatechange", {});
      if (currentState === 4) {
        if (request.async === false) {
          emitFinal();
        } else {
          setTimeout(emitFinal, 0);
        }
      }
    }
  };
  emitFinal = function() {
    if (!hasError) {
      facade[FIRE]("load", {});
    }
    facade[FIRE]("loadend", {});
    if (hasError) {
      facade[READY_STATE] = 0;
    }
  };
  currentState = 0;
  setReadyState = function(n) {
    var hooks, process;
    if (n !== 4) {
      emitReadyState(n);
      return;
    }
    hooks = xhook.listeners(AFTER);
    process = function() {
      var hook;
      if (!hooks.length) {
        return emitReadyState(4);
      }
      hook = hooks.shift();
      if (hook.length === 2) {
        hook(request, response);
        return process();
      } else if (hook.length === 3 && request.async) {
        return hook(request, response, process);
      } else {
        return process();
      }
    };
    process();
  };
  facade = request.xhr = EventEmitter();
  xhr.onreadystatechange = function(event) {
    try {
      if (xhr[READY_STATE] === 2) {
        readHead();
      }
    } catch (_error) {}
    if (xhr[READY_STATE] === 4) {
      transiting = false;
      readHead();
      readBody();
    }
    setReadyState(xhr[READY_STATE]);
  };
  hasErrorHandler = function() {
    hasError = true;
  };
  facade[ON]('error', hasErrorHandler);
  facade[ON]('timeout', hasErrorHandler);
  facade[ON]('abort', hasErrorHandler);
  facade[ON]('progress', function() {
    if (currentState < 3) {
      setReadyState(3);
    } else {
      facade[FIRE]("readystatechange", {});
    }
  });
  if ('withCredentials' in xhr || xhook.addWithCredentials) {
    facade.withCredentials = false;
  }
  facade.status = 0;
  _ref = COMMON_EVENTS.concat(UPLOAD_EVENTS);
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    event = _ref[_i];
    facade["on" + event] = null;
  }
  facade.open = function(method, url, async, user, pass) {
    currentState = 0;
    hasError = false;
    transiting = false;
    request.headers = {};
    request.headerNames = {};
    request.status = 0;
    response = {};
    response.headers = {};
    request.method = method;
    request.url = url;
    request.async = async !== false;
    request.user = user;
    request.pass = pass;
    setReadyState(1);
  };
  facade.send = function(body) {
    var hooks, k, modk, process, send, _j, _len1, _ref1;
    _ref1 = ['type', 'timeout', 'withCredentials'];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      k = _ref1[_j];
      modk = k === "type" ? "responseType" : k;
      if (modk in facade) {
        request[k] = facade[modk];
      }
    }
    request.body = body;
    send = function() {
      var header, value, _k, _len2, _ref2, _ref3;
      proxyEvents(COMMON_EVENTS, xhr, facade);
      if (facade.upload) {
        proxyEvents(COMMON_EVENTS.concat(UPLOAD_EVENTS), xhr.upload, facade.upload);
      }
      transiting = true;
      xhr.open(request.method, request.url, request.async, request.user, request.pass);
      _ref2 = ['type', 'timeout', 'withCredentials'];
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        k = _ref2[_k];
        modk = k === "type" ? "responseType" : k;
        if (k in request) {
          xhr[modk] = request[k];
        }
      }
      _ref3 = request.headers;
      for (header in _ref3) {
        value = _ref3[header];
        if (header) {
          xhr.setRequestHeader(header, value);
        }
      }
      if (request.body instanceof XHookFormData) {
        request.body = request.body.fd;
      }
      xhr.send(request.body);
    };
    hooks = xhook.listeners(BEFORE);
    process = function() {
      var done, hook;
      if (!hooks.length) {
        return send();
      }
      done = function(userResponse) {
        if (typeof userResponse === 'object' && (typeof userResponse.status === 'number' || typeof response.status === 'number')) {
          mergeObjects(userResponse, response);
          if (__indexOf.call(userResponse, 'data') < 0) {
            userResponse.data = userResponse.response || userResponse.text;
          }
          setReadyState(4);
          return;
        }
        process();
      };
      done.head = function(userResponse) {
        mergeObjects(userResponse, response);
        return setReadyState(2);
      };
      done.progress = function(userResponse) {
        mergeObjects(userResponse, response);
        return setReadyState(3);
      };
      hook = hooks.shift();
      if (hook.length === 1) {
        return done(hook(request));
      } else if (hook.length === 2 && request.async) {
        return hook(request, done);
      } else {
        return done();
      }
    };
    process();
  };
  facade.abort = function() {
    status = ABORTED;
    if (transiting) {
      xhr.abort();
    } else {
      facade[FIRE]('abort', {});
    }
  };
  facade.setRequestHeader = function(header, value) {
    var lName, name;
    lName = header != null ? header.toLowerCase() : void 0;
    name = request.headerNames[lName] = request.headerNames[lName] || header;
    if (request.headers[name]) {
      value = request.headers[name] + ', ' + value;
    }
    request.headers[name] = value;
  };
  facade.getResponseHeader = function(header) {
    var name;
    name = header != null ? header.toLowerCase() : void 0;
    return nullify(response.headers[name]);
  };
  facade.getAllResponseHeaders = function() {
    return nullify(convertHeaders(response.headers));
  };
  if (xhr.overrideMimeType) {
    facade.overrideMimeType = function() {
      return xhr.overrideMimeType.apply(xhr, arguments);
    };
  }
  if (xhr.upload) {
    facade.upload = request.upload = EventEmitter();
  }
  facade.UNSENT = 0;
  facade.OPENED = 1;
  facade.HEADERS_RECEIVED = 2;
  facade.LOADING = 3;
  facade.DONE = 4;
  facade.response = '';
  facade.responseText = '';
  facade.responseXML = null;
  facade.readyState = 0;
  facade.statusText = '';
  return facade;
};

if (typeof WINDOW[FETCH] === "function") {
  NativeFetch = WINDOW[FETCH];
  xhook[FETCH] = NativeFetch;
  XHookFetchRequest = WINDOW[FETCH] = function(url, options) {
    var afterHooks, beforeHooks, request;
    if (options == null) {
      options = {
        headers: {}
      };
    }
    options.url = url;
    request = null;
    beforeHooks = xhook.listeners(BEFORE);
    afterHooks = xhook.listeners(AFTER);
    return new Promise(function(resolve, reject) {
      var done, getRequest, processAfter, processBefore, send;
      getRequest = function() {
        if (options.body instanceof XHookFormData) {
          options.body = options.body.fd;
        }
        if (options.headers) {
          options.headers = new Headers(options.headers);
        }
        if (!request) {
          request = new Request(options.url, options);
        }
        return mergeObjects(options, request);
      };
      processAfter = function(response) {
        var hook;
        if (!afterHooks.length) {
          return resolve(response);
        }
        hook = afterHooks.shift();
        if (hook.length === 2) {
          hook(getRequest(), response);
          return processAfter(response);
        } else if (hook.length === 3) {
          return hook(getRequest(), response, processAfter);
        } else {
          return processAfter(response);
        }
      };
      done = function(userResponse) {
        var response;
        if (userResponse !== void 0) {
          response = new Response(userResponse.body || userResponse.text, userResponse);
          resolve(response);
          processAfter(response);
          return;
        }
        processBefore();
      };
      processBefore = function() {
        var hook;
        if (!beforeHooks.length) {
          send();
          return;
        }
        hook = beforeHooks.shift();
        if (hook.length === 1) {
          return done(hook(options));
        } else if (hook.length === 2) {
          return hook(getRequest(), done);
        }
      };
      send = function() {
        return NativeFetch(getRequest()).then(function(response) {
          return processAfter(response);
        })["catch"](function(err) {
          processAfter(err);
          return reject(err);
        });
      };
      processBefore();
    });
  };
}

XHookHttpRequest.UNSENT = 0;

XHookHttpRequest.OPENED = 1;

XHookHttpRequest.HEADERS_RECEIVED = 2;

XHookHttpRequest.LOADING = 3;

XHookHttpRequest.DONE = 4;

if (true) {
  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
    return xhook;
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}

}.call(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/inject.ts":
/*!***********************!*\
  !*** ./src/inject.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const xhook = __webpack_require__(/*! xhook */ "./node_modules/xhook/dist/xhook.js");
const query_string_1 = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
const idFactory_1 = __webpack_require__(/*! ./services/idFactory */ "./src/services/idFactory.ts");
const messageBus_1 = __webpack_require__(/*! ./services/messageBus */ "./src/services/messageBus.ts");
const messageBus = new messageBus_1.default();
const messageIdFactory = new idFactory_1.default();
const logIdFactory = new idFactory_1.default();
window.addEventListener("message", function (event) {
    // We only accept messages from ourselves
    if (event.source != window)
        return;
    const data = event.data;
    if (data.to !== "HOOK_SCRIPT")
        return;
    messageBus.dispatch(data.id, data.message);
});
/**
 * Promisfy post message from window to window
 * ackRequired, if false, no id will be assigned hence, no method will be added in message
 * message id was not the problem but function in message bus was
 */
const postMessage = (message, type, ackRequired) => {
    const messageId = ackRequired ? messageIdFactory.getId() : null;
    const messageObject = {
        id: messageId,
        message,
        to: "CONTENT_SCRIPT",
        from: "HOOK_SCRIPT",
        extenstionName: "MOKKU",
        type,
    };
    window.postMessage(messageObject, "*");
    if (messageId !== null) {
        return new Promise((reslove) => {
            messageBus.addLister(messageId, reslove);
        });
    }
};
xhook.before(function (request, callback) {
    const separator = request.url.indexOf("?");
    const url = separator !== -1 ? request.url.substr(0, separator) : request.url;
    const queryParams = separator !== -1
        ? JSON.stringify(query_string_1.parse(request.url.substr(separator)))
        : undefined;
    request.mokku = {
        id: logIdFactory.getId(),
    };
    const data = getLog(request);
    postMessage(data, "LOG", false);
    postMessage(data, "QUERY", true)
        .then((data) => {
        if (data && data.mockResponse) {
            const mock = data.mockResponse;
            const finalResponse = {
                status: mock.status,
                text: mock.response ? mock.response : "",
                type: "json",
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                },
            };
            if (mock.delay) {
                setTimeout(() => {
                    callback(finalResponse);
                }, mock.delay);
            }
            else {
                callback(finalResponse);
            }
        }
        else {
            callback();
        }
    })
        .catch(() => {
        console.log("something went wrong!");
    });
});
const getLog = (request, response) => {
    var _a;
    const separator = request.url.indexOf("?");
    const url = separator !== -1 ? request.url.substr(0, separator) : request.url;
    const queryParams = separator !== -1
        ? JSON.stringify(query_string_1.parse(request.url.substr(separator)))
        : undefined;
    return {
        request: {
            url,
            body: request.body,
            queryParams,
            method: request.method,
        },
        response,
        id: (_a = request.mokku) === null || _a === void 0 ? void 0 : _a.id,
    };
};
xhook.after(function (request, originalResponse) {
    try {
        if (typeof originalResponse.clone === "function") {
            const response = originalResponse.clone();
            if (typeof response.text === "string") {
                const data = getLog(request, {
                    status: response.status,
                    response: response.text,
                });
                postMessage(data, "LOG", false);
            }
            else {
                response.text().then((streamedResponse) => {
                    const data = getLog(request, {
                        status: response.status,
                        response: streamedResponse,
                    });
                    postMessage(data, "LOG", false);
                });
            }
        }
        else {
            const data = getLog(request, {
                status: originalResponse.status,
                response: typeof originalResponse.text === "string"
                    ? originalResponse.text
                    : "Cannot parse response, logging libraries can cause this.",
            });
            postMessage(data, "LOG", false);
        }
    }
    catch (error) {
        console.log("INJECT_ERROR", error);
    }
});


/***/ }),

/***/ "./src/services/idFactory.ts":
/*!***********************************!*\
  !*** ./src/services/idFactory.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class IdFactory {
    constructor() {
        this._id = 0;
    }
    getId() {
        this._id++;
        return this._id;
    }
}
exports.default = IdFactory;


/***/ }),

/***/ "./src/services/messageBus.ts":
/*!************************************!*\
  !*** ./src/services/messageBus.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class MessageBus {
    constructor() {
        this._collector = {};
    }
    dispatch(id, eventData) {
        if (this._collector[id]) {
            this._collector[id](eventData);
        }
        else {
            this._defaultListner(eventData);
        }
    }
    addLister(id, func) {
        this._collector[id] = func;
    }
    createDefaultListener(func) {
        this._defaultListner = func;
    }
}
exports.default = MessageBus;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlY29kZS11cmktY29tcG9uZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9xdWVyeS1zdHJpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NwbGl0LW9uLWZpcnN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHJpY3QtdXJpLWVuY29kZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94aG9vay9kaXN0L3hob29rLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2lkRmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvbWVzc2FnZUJ1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2IsdUJBQXVCLEVBQUU7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUEsaUJBQWlCLG1CQUFtQjtBQUNwQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdGYTtBQUNiLHdCQUF3QixtQkFBTyxDQUFDLG9FQUFtQjtBQUNuRCx3QkFBd0IsbUJBQU8sQ0FBQywwRUFBc0I7QUFDdEQscUJBQXFCLG1CQUFPLENBQUMsOERBQWdCOztBQUU3Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsd0RBQXdELDBDQUEwQztBQUNsRztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EseURBQXlELFlBQVk7O0FBRXJFO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQSxhQUFhLDBDQUEwQztBQUN2RDs7QUFFQSxXQUFXLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSztBQUNwQzs7Ozs7Ozs7Ozs7OztBQ3pYYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyQmE7QUFDYiw2RUFBNkUsMkNBQTJDOzs7Ozs7Ozs7Ozs7QUNEeEg7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsaUNBQWlDLE9BQU8sT0FBTyw2Q0FBNkMsRUFBRSxXQUFXOztBQUVySjs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxnQ0FBZ0M7QUFDaEM7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQyxXQUFXO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxXQUFXO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsV0FBVztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wseUNBQXlDO0FBQ3pDO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsV0FBVztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxZQUFZO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFlBQVk7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLElBQUksSUFBMEM7QUFDOUMsRUFBRSxpQ0FBZ0IsRUFBRSxtQ0FBRTtBQUN0QjtBQUNBLEdBQUc7QUFBQSxvR0FBQztBQUNKLENBQUMsTUFBTSxFQU1OOztBQUVELENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDM3JCWTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGNBQWMsbUJBQU8sQ0FBQyxpREFBTztBQUM3Qix1QkFBdUIsbUJBQU8sQ0FBQywwREFBYztBQUM3QyxvQkFBb0IsbUJBQU8sQ0FBQyx5REFBc0I7QUFDbEQscUJBQXFCLG1CQUFPLENBQUMsMkRBQXVCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3BJWTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDWGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImluamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luamVjdC50c1wiKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b2tlbiA9ICclW2EtZjAtOV17Mn0nO1xudmFyIHNpbmdsZU1hdGNoZXIgPSBuZXcgUmVnRXhwKHRva2VuLCAnZ2knKTtcbnZhciBtdWx0aU1hdGNoZXIgPSBuZXcgUmVnRXhwKCcoJyArIHRva2VuICsgJykrJywgJ2dpJyk7XG5cbmZ1bmN0aW9uIGRlY29kZUNvbXBvbmVudHMoY29tcG9uZW50cywgc3BsaXQpIHtcblx0dHJ5IHtcblx0XHQvLyBUcnkgdG8gZGVjb2RlIHRoZSBlbnRpcmUgc3RyaW5nIGZpcnN0XG5cdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChjb21wb25lbnRzLmpvaW4oJycpKTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gRG8gbm90aGluZ1xuXHR9XG5cblx0aWYgKGNvbXBvbmVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0cmV0dXJuIGNvbXBvbmVudHM7XG5cdH1cblxuXHRzcGxpdCA9IHNwbGl0IHx8IDE7XG5cblx0Ly8gU3BsaXQgdGhlIGFycmF5IGluIDIgcGFydHNcblx0dmFyIGxlZnQgPSBjb21wb25lbnRzLnNsaWNlKDAsIHNwbGl0KTtcblx0dmFyIHJpZ2h0ID0gY29tcG9uZW50cy5zbGljZShzcGxpdCk7XG5cblx0cmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuY2FsbChbXSwgZGVjb2RlQ29tcG9uZW50cyhsZWZ0KSwgZGVjb2RlQ29tcG9uZW50cyhyaWdodCkpO1xufVxuXG5mdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGlucHV0KTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0dmFyIHRva2VucyA9IGlucHV0Lm1hdGNoKHNpbmdsZU1hdGNoZXIpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDE7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlucHV0ID0gZGVjb2RlQ29tcG9uZW50cyh0b2tlbnMsIGkpLmpvaW4oJycpO1xuXG5cdFx0XHR0b2tlbnMgPSBpbnB1dC5tYXRjaChzaW5nbGVNYXRjaGVyKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gaW5wdXQ7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3VzdG9tRGVjb2RlVVJJQ29tcG9uZW50KGlucHV0KSB7XG5cdC8vIEtlZXAgdHJhY2sgb2YgYWxsIHRoZSByZXBsYWNlbWVudHMgYW5kIHByZWZpbGwgdGhlIG1hcCB3aXRoIHRoZSBgQk9NYFxuXHR2YXIgcmVwbGFjZU1hcCA9IHtcblx0XHQnJUZFJUZGJzogJ1xcdUZGRkRcXHVGRkZEJyxcblx0XHQnJUZGJUZFJzogJ1xcdUZGRkRcXHVGRkZEJ1xuXHR9O1xuXG5cdHZhciBtYXRjaCA9IG11bHRpTWF0Y2hlci5leGVjKGlucHV0KTtcblx0d2hpbGUgKG1hdGNoKSB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIERlY29kZSBhcyBiaWcgY2h1bmtzIGFzIHBvc3NpYmxlXG5cdFx0XHRyZXBsYWNlTWFwW21hdGNoWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFswXSk7XG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZGVjb2RlKG1hdGNoWzBdKTtcblxuXHRcdFx0aWYgKHJlc3VsdCAhPT0gbWF0Y2hbMF0pIHtcblx0XHRcdFx0cmVwbGFjZU1hcFttYXRjaFswXV0gPSByZXN1bHQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bWF0Y2ggPSBtdWx0aU1hdGNoZXIuZXhlYyhpbnB1dCk7XG5cdH1cblxuXHQvLyBBZGQgYCVDMmAgYXQgdGhlIGVuZCBvZiB0aGUgbWFwIHRvIG1ha2Ugc3VyZSBpdCBkb2VzIG5vdCByZXBsYWNlIHRoZSBjb21iaW5hdG9yIGJlZm9yZSBldmVyeXRoaW5nIGVsc2Vcblx0cmVwbGFjZU1hcFsnJUMyJ10gPSAnXFx1RkZGRCc7XG5cblx0dmFyIGVudHJpZXMgPSBPYmplY3Qua2V5cyhyZXBsYWNlTWFwKTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcblx0XHQvLyBSZXBsYWNlIGFsbCBkZWNvZGVkIGNvbXBvbmVudHNcblx0XHR2YXIga2V5ID0gZW50cmllc1tpXTtcblx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UobmV3IFJlZ0V4cChrZXksICdnJyksIHJlcGxhY2VNYXBba2V5XSk7XG5cdH1cblxuXHRyZXR1cm4gaW5wdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVuY29kZWRVUkkpIHtcblx0aWYgKHR5cGVvZiBlbmNvZGVkVVJJICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGBlbmNvZGVkVVJJYCB0byBiZSBvZiB0eXBlIGBzdHJpbmdgLCBnb3QgYCcgKyB0eXBlb2YgZW5jb2RlZFVSSSArICdgJyk7XG5cdH1cblxuXHR0cnkge1xuXHRcdGVuY29kZWRVUkkgPSBlbmNvZGVkVVJJLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuXG5cdFx0Ly8gVHJ5IHRoZSBidWlsdCBpbiBkZWNvZGVyIGZpcnN0XG5cdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlbmNvZGVkVVJJKTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gRmFsbGJhY2sgdG8gYSBtb3JlIGFkdmFuY2VkIGRlY29kZXJcblx0XHRyZXR1cm4gY3VzdG9tRGVjb2RlVVJJQ29tcG9uZW50KGVuY29kZWRVUkkpO1xuXHR9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3Qgc3RyaWN0VXJpRW5jb2RlID0gcmVxdWlyZSgnc3RyaWN0LXVyaS1lbmNvZGUnKTtcbmNvbnN0IGRlY29kZUNvbXBvbmVudCA9IHJlcXVpcmUoJ2RlY29kZS11cmktY29tcG9uZW50Jyk7XG5jb25zdCBzcGxpdE9uRmlyc3QgPSByZXF1aXJlKCdzcGxpdC1vbi1maXJzdCcpO1xuXG5jb25zdCBpc051bGxPclVuZGVmaW5lZCA9IHZhbHVlID0+IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGVuY29kZXJGb3JBcnJheUZvcm1hdChvcHRpb25zKSB7XG5cdHN3aXRjaCAob3B0aW9ucy5hcnJheUZvcm1hdCkge1xuXHRcdGNhc2UgJ2luZGV4Jzpcblx0XHRcdHJldHVybiBrZXkgPT4gKHJlc3VsdCwgdmFsdWUpID0+IHtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSByZXN1bHQubGVuZ3RoO1xuXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcE51bGwgJiYgdmFsdWUgPT09IG51bGwpIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcEVtcHR5U3RyaW5nICYmIHZhbHVlID09PSAnJylcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBbZW5jb2RlKGtleSwgb3B0aW9ucyksICdbJywgaW5kZXgsICddJ10uam9pbignJyldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0XHQuLi5yZXN1bHQsXG5cdFx0XHRcdFx0W2VuY29kZShrZXksIG9wdGlvbnMpLCAnWycsIGVuY29kZShpbmRleCwgb3B0aW9ucyksICddPScsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4oJycpXG5cdFx0XHRcdF07XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnYnJhY2tldCc6XG5cdFx0XHRyZXR1cm4ga2V5ID0+IChyZXN1bHQsIHZhbHVlKSA9PiB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcE51bGwgJiYgdmFsdWUgPT09IG51bGwpIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcEVtcHR5U3RyaW5nICYmIHZhbHVlID09PSAnJylcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBbZW5jb2RlKGtleSwgb3B0aW9ucyksICdbXSddLmpvaW4oJycpXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBbZW5jb2RlKGtleSwgb3B0aW9ucyksICdbXT0nLCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKCcnKV07XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnY29tbWEnOlxuXHRcdGNhc2UgJ3NlcGFyYXRvcic6XG5cdFx0XHRyZXR1cm4ga2V5ID0+IChyZXN1bHQsIHZhbHVlKSA9PiB7XG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHJldHVybiBbW2VuY29kZShrZXksIG9wdGlvbnMpLCAnPScsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4oJycpXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbW3Jlc3VsdCwgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbihvcHRpb25zLmFycmF5Rm9ybWF0U2VwYXJhdG9yKV07XG5cdFx0XHR9O1xuXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBrZXkgPT4gKHJlc3VsdCwgdmFsdWUpID0+IHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHZhbHVlID09PSB1bmRlZmluZWQgfHxcblx0XHRcdFx0XHQob3B0aW9ucy5za2lwTnVsbCAmJiB2YWx1ZSA9PT0gbnVsbCkgfHxcblx0XHRcdFx0XHQob3B0aW9ucy5za2lwRW1wdHlTdHJpbmcgJiYgdmFsdWUgPT09ICcnKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFsuLi5yZXN1bHQsIGVuY29kZShrZXksIG9wdGlvbnMpXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBbZW5jb2RlKGtleSwgb3B0aW9ucyksICc9JywgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbignJyldO1xuXHRcdFx0fTtcblx0fVxufVxuXG5mdW5jdGlvbiBwYXJzZXJGb3JBcnJheUZvcm1hdChvcHRpb25zKSB7XG5cdGxldCByZXN1bHQ7XG5cblx0c3dpdGNoIChvcHRpb25zLmFycmF5Rm9ybWF0KSB7XG5cdFx0Y2FzZSAnaW5kZXgnOlxuXHRcdFx0cmV0dXJuIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikgPT4ge1xuXHRcdFx0XHRyZXN1bHQgPSAvXFxbKFxcZCopXFxdJC8uZXhlYyhrZXkpO1xuXG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC9cXFtcXGQqXFxdJC8sICcnKTtcblxuXHRcdFx0XHRpZiAoIXJlc3VsdCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYWNjdW11bGF0b3Jba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHt9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XVtyZXN1bHRbMV1dID0gdmFsdWU7XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnYnJhY2tldCc6XG5cdFx0XHRyZXR1cm4gKGtleSwgdmFsdWUsIGFjY3VtdWxhdG9yKSA9PiB7XG5cdFx0XHRcdHJlc3VsdCA9IC8oXFxbXFxdKSQvLmV4ZWMoa2V5KTtcblx0XHRcdFx0a2V5ID0ga2V5LnJlcGxhY2UoL1xcW1xcXSQvLCAnJyk7XG5cblx0XHRcdFx0aWYgKCFyZXN1bHQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbdmFsdWVdO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbXS5jb25jYXQoYWNjdW11bGF0b3Jba2V5XSwgdmFsdWUpO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2NvbW1hJzpcblx0XHRjYXNlICdzZXBhcmF0b3InOlxuXHRcdFx0cmV0dXJuIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikgPT4ge1xuXHRcdFx0XHRjb25zdCBpc0FycmF5ID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5zcGxpdCgnJykuaW5kZXhPZihvcHRpb25zLmFycmF5Rm9ybWF0U2VwYXJhdG9yKSA+IC0xO1xuXHRcdFx0XHRjb25zdCBuZXdWYWx1ZSA9IGlzQXJyYXkgPyB2YWx1ZS5zcGxpdChvcHRpb25zLmFycmF5Rm9ybWF0U2VwYXJhdG9yKS5tYXAoaXRlbSA9PiBkZWNvZGUoaXRlbSwgb3B0aW9ucykpIDogdmFsdWUgPT09IG51bGwgPyB2YWx1ZSA6IGRlY29kZSh2YWx1ZSwgb3B0aW9ucyk7XG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBuZXdWYWx1ZTtcblx0XHRcdH07XG5cblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikgPT4ge1xuXHRcdFx0XHRpZiAoYWNjdW11bGF0b3Jba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbXS5jb25jYXQoYWNjdW11bGF0b3Jba2V5XSwgdmFsdWUpO1xuXHRcdFx0fTtcblx0fVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUFycmF5Rm9ybWF0U2VwYXJhdG9yKHZhbHVlKSB7XG5cdGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnIHx8IHZhbHVlLmxlbmd0aCAhPT0gMSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2FycmF5Rm9ybWF0U2VwYXJhdG9yIG11c3QgYmUgc2luZ2xlIGNoYXJhY3RlciBzdHJpbmcnKTtcblx0fVxufVxuXG5mdW5jdGlvbiBlbmNvZGUodmFsdWUsIG9wdGlvbnMpIHtcblx0aWYgKG9wdGlvbnMuZW5jb2RlKSB7XG5cdFx0cmV0dXJuIG9wdGlvbnMuc3RyaWN0ID8gc3RyaWN0VXJpRW5jb2RlKHZhbHVlKSA6IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGRlY29kZSh2YWx1ZSwgb3B0aW9ucykge1xuXHRpZiAob3B0aW9ucy5kZWNvZGUpIHtcblx0XHRyZXR1cm4gZGVjb2RlQ29tcG9uZW50KHZhbHVlKTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24ga2V5c1NvcnRlcihpbnB1dCkge1xuXHRpZiAoQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcblx0XHRyZXR1cm4gaW5wdXQuc29ydCgpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcpIHtcblx0XHRyZXR1cm4ga2V5c1NvcnRlcihPYmplY3Qua2V5cyhpbnB1dCkpXG5cdFx0XHQuc29ydCgoYSwgYikgPT4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpKVxuXHRcdFx0Lm1hcChrZXkgPT4gaW5wdXRba2V5XSk7XG5cdH1cblxuXHRyZXR1cm4gaW5wdXQ7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUhhc2goaW5wdXQpIHtcblx0Y29uc3QgaGFzaFN0YXJ0ID0gaW5wdXQuaW5kZXhPZignIycpO1xuXHRpZiAoaGFzaFN0YXJ0ICE9PSAtMSkge1xuXHRcdGlucHV0ID0gaW5wdXQuc2xpY2UoMCwgaGFzaFN0YXJ0KTtcblx0fVxuXG5cdHJldHVybiBpbnB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0SGFzaCh1cmwpIHtcblx0bGV0IGhhc2ggPSAnJztcblx0Y29uc3QgaGFzaFN0YXJ0ID0gdXJsLmluZGV4T2YoJyMnKTtcblx0aWYgKGhhc2hTdGFydCAhPT0gLTEpIHtcblx0XHRoYXNoID0gdXJsLnNsaWNlKGhhc2hTdGFydCk7XG5cdH1cblxuXHRyZXR1cm4gaGFzaDtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdChpbnB1dCkge1xuXHRpbnB1dCA9IHJlbW92ZUhhc2goaW5wdXQpO1xuXHRjb25zdCBxdWVyeVN0YXJ0ID0gaW5wdXQuaW5kZXhPZignPycpO1xuXHRpZiAocXVlcnlTdGFydCA9PT0gLTEpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRyZXR1cm4gaW5wdXQuc2xpY2UocXVlcnlTdGFydCArIDEpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVZhbHVlKHZhbHVlLCBvcHRpb25zKSB7XG5cdGlmIChvcHRpb25zLnBhcnNlTnVtYmVycyAmJiAhTnVtYmVyLmlzTmFOKE51bWJlcih2YWx1ZSkpICYmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLnRyaW0oKSAhPT0gJycpKSB7XG5cdFx0dmFsdWUgPSBOdW1iZXIodmFsdWUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMucGFyc2VCb29sZWFucyAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAodmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnIHx8IHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICdmYWxzZScpKSB7XG5cdFx0dmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSc7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHBhcnNlKGlucHV0LCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRkZWNvZGU6IHRydWUsXG5cdFx0c29ydDogdHJ1ZSxcblx0XHRhcnJheUZvcm1hdDogJ25vbmUnLFxuXHRcdGFycmF5Rm9ybWF0U2VwYXJhdG9yOiAnLCcsXG5cdFx0cGFyc2VOdW1iZXJzOiBmYWxzZSxcblx0XHRwYXJzZUJvb2xlYW5zOiBmYWxzZVxuXHR9LCBvcHRpb25zKTtcblxuXHR2YWxpZGF0ZUFycmF5Rm9ybWF0U2VwYXJhdG9yKG9wdGlvbnMuYXJyYXlGb3JtYXRTZXBhcmF0b3IpO1xuXG5cdGNvbnN0IGZvcm1hdHRlciA9IHBhcnNlckZvckFycmF5Rm9ybWF0KG9wdGlvbnMpO1xuXG5cdC8vIENyZWF0ZSBhbiBvYmplY3Qgd2l0aCBubyBwcm90b3R5cGVcblx0Y29uc3QgcmV0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuXHRpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRpbnB1dCA9IGlucHV0LnRyaW0oKS5yZXBsYWNlKC9eWz8jJl0vLCAnJyk7XG5cblx0aWYgKCFpbnB1dCkge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRmb3IgKGNvbnN0IHBhcmFtIG9mIGlucHV0LnNwbGl0KCcmJykpIHtcblx0XHRsZXQgW2tleSwgdmFsdWVdID0gc3BsaXRPbkZpcnN0KG9wdGlvbnMuZGVjb2RlID8gcGFyYW0ucmVwbGFjZSgvXFwrL2csICcgJykgOiBwYXJhbSwgJz0nKTtcblxuXHRcdC8vIE1pc3NpbmcgYD1gIHNob3VsZCBiZSBgbnVsbGA6XG5cdFx0Ly8gaHR0cDovL3czLm9yZy9UUi8yMDEyL1dELXVybC0yMDEyMDUyNC8jY29sbGVjdC11cmwtcGFyYW1ldGVyc1xuXHRcdHZhbHVlID0gdmFsdWUgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBbJ2NvbW1hJywgJ3NlcGFyYXRvciddLmluY2x1ZGVzKG9wdGlvbnMuYXJyYXlGb3JtYXQpID8gdmFsdWUgOiBkZWNvZGUodmFsdWUsIG9wdGlvbnMpO1xuXHRcdGZvcm1hdHRlcihkZWNvZGUoa2V5LCBvcHRpb25zKSwgdmFsdWUsIHJldCk7XG5cdH1cblxuXHRmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZXQpKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSByZXRba2V5XTtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuXHRcdFx0Zm9yIChjb25zdCBrIG9mIE9iamVjdC5rZXlzKHZhbHVlKSkge1xuXHRcdFx0XHR2YWx1ZVtrXSA9IHBhcnNlVmFsdWUodmFsdWVba10sIG9wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXRba2V5XSA9IHBhcnNlVmFsdWUodmFsdWUsIG9wdGlvbnMpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNvcnQgPT09IGZhbHNlKSB7XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXG5cdHJldHVybiAob3B0aW9ucy5zb3J0ID09PSB0cnVlID8gT2JqZWN0LmtleXMocmV0KS5zb3J0KCkgOiBPYmplY3Qua2V5cyhyZXQpLnNvcnQob3B0aW9ucy5zb3J0KSkucmVkdWNlKChyZXN1bHQsIGtleSkgPT4ge1xuXHRcdGNvbnN0IHZhbHVlID0gcmV0W2tleV07XG5cdFx0aWYgKEJvb2xlYW4odmFsdWUpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHQvLyBTb3J0IG9iamVjdCBrZXlzLCBub3QgdmFsdWVzXG5cdFx0XHRyZXN1bHRba2V5XSA9IGtleXNTb3J0ZXIodmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHRba2V5XSA9IHZhbHVlO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sIE9iamVjdC5jcmVhdGUobnVsbCkpO1xufVxuXG5leHBvcnRzLmV4dHJhY3QgPSBleHRyYWN0O1xuZXhwb3J0cy5wYXJzZSA9IHBhcnNlO1xuXG5leHBvcnRzLnN0cmluZ2lmeSA9IChvYmplY3QsIG9wdGlvbnMpID0+IHtcblx0aWYgKCFvYmplY3QpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0ZW5jb2RlOiB0cnVlLFxuXHRcdHN0cmljdDogdHJ1ZSxcblx0XHRhcnJheUZvcm1hdDogJ25vbmUnLFxuXHRcdGFycmF5Rm9ybWF0U2VwYXJhdG9yOiAnLCdcblx0fSwgb3B0aW9ucyk7XG5cblx0dmFsaWRhdGVBcnJheUZvcm1hdFNlcGFyYXRvcihvcHRpb25zLmFycmF5Rm9ybWF0U2VwYXJhdG9yKTtcblxuXHRjb25zdCBzaG91bGRGaWx0ZXIgPSBrZXkgPT4gKFxuXHRcdChvcHRpb25zLnNraXBOdWxsICYmIGlzTnVsbE9yVW5kZWZpbmVkKG9iamVjdFtrZXldKSkgfHxcblx0XHQob3B0aW9ucy5za2lwRW1wdHlTdHJpbmcgJiYgb2JqZWN0W2tleV0gPT09ICcnKVxuXHQpO1xuXG5cdGNvbnN0IGZvcm1hdHRlciA9IGVuY29kZXJGb3JBcnJheUZvcm1hdChvcHRpb25zKTtcblxuXHRjb25zdCBvYmplY3RDb3B5ID0ge307XG5cblx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqZWN0KSkge1xuXHRcdGlmICghc2hvdWxkRmlsdGVyKGtleSkpIHtcblx0XHRcdG9iamVjdENvcHlba2V5XSA9IG9iamVjdFtrZXldO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3RDb3B5KTtcblxuXHRpZiAob3B0aW9ucy5zb3J0ICE9PSBmYWxzZSkge1xuXHRcdGtleXMuc29ydChvcHRpb25zLnNvcnQpO1xuXHR9XG5cblx0cmV0dXJuIGtleXMubWFwKGtleSA9PiB7XG5cdFx0Y29uc3QgdmFsdWUgPSBvYmplY3Rba2V5XTtcblxuXHRcdGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXG5cdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gZW5jb2RlKGtleSwgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHRcdFx0LnJlZHVjZShmb3JtYXR0ZXIoa2V5KSwgW10pXG5cdFx0XHRcdC5qb2luKCcmJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGVuY29kZShrZXksIG9wdGlvbnMpICsgJz0nICsgZW5jb2RlKHZhbHVlLCBvcHRpb25zKTtcblx0fSkuZmlsdGVyKHggPT4geC5sZW5ndGggPiAwKS5qb2luKCcmJyk7XG59O1xuXG5leHBvcnRzLnBhcnNlVXJsID0gKGlucHV0LCBvcHRpb25zKSA9PiB7XG5cdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRkZWNvZGU6IHRydWVcblx0fSwgb3B0aW9ucyk7XG5cblx0Y29uc3QgW3VybCwgaGFzaF0gPSBzcGxpdE9uRmlyc3QoaW5wdXQsICcjJyk7XG5cblx0cmV0dXJuIE9iamVjdC5hc3NpZ24oXG5cdFx0e1xuXHRcdFx0dXJsOiB1cmwuc3BsaXQoJz8nKVswXSB8fCAnJyxcblx0XHRcdHF1ZXJ5OiBwYXJzZShleHRyYWN0KGlucHV0KSwgb3B0aW9ucylcblx0XHR9LFxuXHRcdG9wdGlvbnMgJiYgb3B0aW9ucy5wYXJzZUZyYWdtZW50SWRlbnRpZmllciAmJiBoYXNoID8ge2ZyYWdtZW50SWRlbnRpZmllcjogZGVjb2RlKGhhc2gsIG9wdGlvbnMpfSA6IHt9XG5cdCk7XG59O1xuXG5leHBvcnRzLnN0cmluZ2lmeVVybCA9IChpbnB1dCwgb3B0aW9ucykgPT4ge1xuXHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0ZW5jb2RlOiB0cnVlLFxuXHRcdHN0cmljdDogdHJ1ZVxuXHR9LCBvcHRpb25zKTtcblxuXHRjb25zdCB1cmwgPSByZW1vdmVIYXNoKGlucHV0LnVybCkuc3BsaXQoJz8nKVswXSB8fCAnJztcblx0Y29uc3QgcXVlcnlGcm9tVXJsID0gZXhwb3J0cy5leHRyYWN0KGlucHV0LnVybCk7XG5cdGNvbnN0IHBhcnNlZFF1ZXJ5RnJvbVVybCA9IGV4cG9ydHMucGFyc2UocXVlcnlGcm9tVXJsLCB7c29ydDogZmFsc2V9KTtcblxuXHRjb25zdCBxdWVyeSA9IE9iamVjdC5hc3NpZ24ocGFyc2VkUXVlcnlGcm9tVXJsLCBpbnB1dC5xdWVyeSk7XG5cdGxldCBxdWVyeVN0cmluZyA9IGV4cG9ydHMuc3RyaW5naWZ5KHF1ZXJ5LCBvcHRpb25zKTtcblx0aWYgKHF1ZXJ5U3RyaW5nKSB7XG5cdFx0cXVlcnlTdHJpbmcgPSBgPyR7cXVlcnlTdHJpbmd9YDtcblx0fVxuXG5cdGxldCBoYXNoID0gZ2V0SGFzaChpbnB1dC51cmwpO1xuXHRpZiAoaW5wdXQuZnJhZ21lbnRJZGVudGlmaWVyKSB7XG5cdFx0aGFzaCA9IGAjJHtlbmNvZGUoaW5wdXQuZnJhZ21lbnRJZGVudGlmaWVyLCBvcHRpb25zKX1gO1xuXHR9XG5cblx0cmV0dXJuIGAke3VybH0ke3F1ZXJ5U3RyaW5nfSR7aGFzaH1gO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAoc3RyaW5nLCBzZXBhcmF0b3IpID0+IHtcblx0aWYgKCEodHlwZW9mIHN0cmluZyA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHNlcGFyYXRvciA9PT0gJ3N0cmluZycpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIGFyZ3VtZW50cyB0byBiZSBvZiB0eXBlIGBzdHJpbmdgJyk7XG5cdH1cblxuXHRpZiAoc2VwYXJhdG9yID09PSAnJykge1xuXHRcdHJldHVybiBbc3RyaW5nXTtcblx0fVxuXG5cdGNvbnN0IHNlcGFyYXRvckluZGV4ID0gc3RyaW5nLmluZGV4T2Yoc2VwYXJhdG9yKTtcblxuXHRpZiAoc2VwYXJhdG9ySW5kZXggPT09IC0xKSB7XG5cdFx0cmV0dXJuIFtzdHJpbmddO1xuXHR9XG5cblx0cmV0dXJuIFtcblx0XHRzdHJpbmcuc2xpY2UoMCwgc2VwYXJhdG9ySW5kZXgpLFxuXHRcdHN0cmluZy5zbGljZShzZXBhcmF0b3JJbmRleCArIHNlcGFyYXRvci5sZW5ndGgpXG5cdF07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBzdHIgPT4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCkqXS9nLCB4ID0+IGAlJHt4LmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9YCk7XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCIvLyBYSG9vayAtIHYxLjQuOSAtIGh0dHBzOi8vZ2l0aHViLmNvbS9qcGlsbG9yYS94aG9va1xuLy8gSmFpbWUgUGlsbG9yYSA8ZGV2QGpwaWxsb3JhLmNvbT4gLSBNSVQgQ29weXJpZ2h0IDIwMThcbihmdW5jdGlvbih1bmRlZmluZWQpIHtcbnZhciBBRlRFUiwgQkVGT1JFLCBDT01NT05fRVZFTlRTLCBFdmVudEVtaXR0ZXIsIEZFVENILCBGSVJFLCBGb3JtRGF0YSwgTmF0aXZlRmV0Y2gsIE5hdGl2ZUZvcm1EYXRhLCBOYXRpdmVYTUxIdHRwLCBPRkYsIE9OLCBSRUFEWV9TVEFURSwgVVBMT0FEX0VWRU5UUywgV0lORE9XLCBYSG9va0ZldGNoUmVxdWVzdCwgWEhvb2tGb3JtRGF0YSwgWEhvb2tIdHRwUmVxdWVzdCwgWE1MSFRUUCwgY29udmVydEhlYWRlcnMsIGRlcHJpY2F0ZWRQcm9wLCBkb2N1bWVudCwgZmFrZUV2ZW50LCBtZXJnZU9iamVjdHMsIG1zaWUsIG51bGxpZnksIHByb3h5RXZlbnRzLCBzbGljZSwgdXNlcmFnZW50LCB4aG9vaywgX2Jhc2UsXG4gIF9faW5kZXhPZiA9IFtdLmluZGV4T2YgfHwgZnVuY3Rpb24oaXRlbSkgeyBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7IGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkgcmV0dXJuIGk7IH0gcmV0dXJuIC0xOyB9O1xuXG5XSU5ET1cgPSBudWxsO1xuXG5pZiAodHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUpIHtcbiAgV0lORE9XID0gc2VsZjtcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgV0lORE9XID0gZ2xvYmFsO1xufSBlbHNlIHtcbiAgV0lORE9XID0gd2luZG93O1xufVxuXG5kb2N1bWVudCA9IFdJTkRPVy5kb2N1bWVudDtcblxuQkVGT1JFID0gJ2JlZm9yZSc7XG5cbkFGVEVSID0gJ2FmdGVyJztcblxuUkVBRFlfU1RBVEUgPSAncmVhZHlTdGF0ZSc7XG5cbk9OID0gJ2FkZEV2ZW50TGlzdGVuZXInO1xuXG5PRkYgPSAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG5cbkZJUkUgPSAnZGlzcGF0Y2hFdmVudCc7XG5cblhNTEhUVFAgPSAnWE1MSHR0cFJlcXVlc3QnO1xuXG5GRVRDSCA9ICdmZXRjaCc7XG5cbkZvcm1EYXRhID0gJ0Zvcm1EYXRhJztcblxuVVBMT0FEX0VWRU5UUyA9IFsnbG9hZCcsICdsb2FkZW5kJywgJ2xvYWRzdGFydCddO1xuXG5DT01NT05fRVZFTlRTID0gWydwcm9ncmVzcycsICdhYm9ydCcsICdlcnJvcicsICd0aW1lb3V0J107XG5cbnVzZXJhZ2VudCA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvclsndXNlcmFnZW50J10gPyBuYXZpZ2F0b3IudXNlckFnZW50IDogJyc7XG5cbm1zaWUgPSBwYXJzZUludCgoL21zaWUgKFxcZCspLy5leGVjKHVzZXJhZ2VudC50b0xvd2VyQ2FzZSgpKSB8fCBbXSlbMV0pO1xuXG5pZiAoaXNOYU4obXNpZSkpIHtcbiAgbXNpZSA9IHBhcnNlSW50KCgvdHJpZGVudFxcLy4qOyBydjooXFxkKykvLmV4ZWModXNlcmFnZW50LnRvTG93ZXJDYXNlKCkpIHx8IFtdKVsxXSk7XG59XG5cbihfYmFzZSA9IEFycmF5LnByb3RvdHlwZSkuaW5kZXhPZiB8fCAoX2Jhc2UuaW5kZXhPZiA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgdmFyIGksIHgsIF9pLCBfbGVuO1xuICBmb3IgKGkgPSBfaSA9IDAsIF9sZW4gPSB0aGlzLmxlbmd0aDsgX2kgPCBfbGVuOyBpID0gKytfaSkge1xuICAgIHggPSB0aGlzW2ldO1xuICAgIGlmICh4ID09PSBpdGVtKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufSk7XG5cbnNsaWNlID0gZnVuY3Rpb24obywgbikge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobywgbik7XG59O1xuXG5kZXByaWNhdGVkUHJvcCA9IGZ1bmN0aW9uKHApIHtcbiAgcmV0dXJuIHAgPT09IFwicmV0dXJuVmFsdWVcIiB8fCBwID09PSBcInRvdGFsU2l6ZVwiIHx8IHAgPT09IFwicG9zaXRpb25cIjtcbn07XG5cbm1lcmdlT2JqZWN0cyA9IGZ1bmN0aW9uKHNyYywgZHN0KSB7XG4gIHZhciBrLCB2O1xuICBmb3IgKGsgaW4gc3JjKSB7XG4gICAgdiA9IHNyY1trXTtcbiAgICBpZiAoZGVwcmljYXRlZFByb3AoaykpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgZHN0W2tdID0gc3JjW2tdO1xuICAgIH0gY2F0Y2ggKF9lcnJvcikge31cbiAgfVxuICByZXR1cm4gZHN0O1xufTtcblxubnVsbGlmeSA9IGZ1bmN0aW9uKHJlcykge1xuICBpZiAocmVzID09PSB2b2lkIDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxucHJveHlFdmVudHMgPSBmdW5jdGlvbihldmVudHMsIHNyYywgZHN0KSB7XG4gIHZhciBldmVudCwgcCwgX2ksIF9sZW47XG4gIHAgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICB2YXIgY2xvbmUsIGssIHZhbDtcbiAgICAgIGNsb25lID0ge307XG4gICAgICBmb3IgKGsgaW4gZSkge1xuICAgICAgICBpZiAoZGVwcmljYXRlZFByb3AoaykpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YWwgPSBlW2tdO1xuICAgICAgICBjbG9uZVtrXSA9IHZhbCA9PT0gc3JjID8gZHN0IDogdmFsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRzdFtGSVJFXShldmVudCwgY2xvbmUpO1xuICAgIH07XG4gIH07XG4gIGZvciAoX2kgPSAwLCBfbGVuID0gZXZlbnRzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgZXZlbnQgPSBldmVudHNbX2ldO1xuICAgIGlmIChkc3QuX2hhcyhldmVudCkpIHtcbiAgICAgIHNyY1tcIm9uXCIgKyBldmVudF0gPSBwKGV2ZW50KTtcbiAgICB9XG4gIH1cbn07XG5cbmZha2VFdmVudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIG1zaWVFdmVudE9iamVjdDtcbiAgaWYgKGRvY3VtZW50ICYmIChkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCAhPSBudWxsKSkge1xuICAgIG1zaWVFdmVudE9iamVjdCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gICAgbXNpZUV2ZW50T2JqZWN0LnR5cGUgPSB0eXBlO1xuICAgIHJldHVybiBtc2llRXZlbnRPYmplY3Q7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBuZXcgRXZlbnQodHlwZSk7XG4gICAgfSBjYXRjaCAoX2Vycm9yKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlXG4gICAgICB9O1xuICAgIH1cbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24obm9kZVN0eWxlKSB7XG4gIHZhciBlbWl0dGVyLCBldmVudHMsIGxpc3RlbmVycztcbiAgZXZlbnRzID0ge307XG4gIGxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgcmV0dXJuIGV2ZW50c1tldmVudF0gfHwgW107XG4gIH07XG4gIGVtaXR0ZXIgPSB7fTtcbiAgZW1pdHRlcltPTl0gPSBmdW5jdGlvbihldmVudCwgY2FsbGJhY2ssIGkpIHtcbiAgICBldmVudHNbZXZlbnRdID0gbGlzdGVuZXJzKGV2ZW50KTtcbiAgICBpZiAoZXZlbnRzW2V2ZW50XS5pbmRleE9mKGNhbGxiYWNrKSA+PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGkgPSBpID09PSB1bmRlZmluZWQgPyBldmVudHNbZXZlbnRdLmxlbmd0aCA6IGk7XG4gICAgZXZlbnRzW2V2ZW50XS5zcGxpY2UoaSwgMCwgY2FsbGJhY2spO1xuICB9O1xuICBlbWl0dGVyW09GRl0gPSBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spIHtcbiAgICB2YXIgaTtcbiAgICBpZiAoZXZlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXZlbnRzID0ge307XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjYWxsYmFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBldmVudHNbZXZlbnRdID0gW107XG4gICAgfVxuICAgIGkgPSBsaXN0ZW5lcnMoZXZlbnQpLmluZGV4T2YoY2FsbGJhY2spO1xuICAgIGlmIChpID09PSAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsaXN0ZW5lcnMoZXZlbnQpLnNwbGljZShpLCAxKTtcbiAgfTtcbiAgZW1pdHRlcltGSVJFXSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBldmVudCwgaSwgbGVnYWN5bGlzdGVuZXIsIGxpc3RlbmVyLCBfaSwgX2xlbiwgX3JlZjtcbiAgICBhcmdzID0gc2xpY2UoYXJndW1lbnRzKTtcbiAgICBldmVudCA9IGFyZ3Muc2hpZnQoKTtcbiAgICBpZiAoIW5vZGVTdHlsZSkge1xuICAgICAgYXJnc1swXSA9IG1lcmdlT2JqZWN0cyhhcmdzWzBdLCBmYWtlRXZlbnQoZXZlbnQpKTtcbiAgICB9XG4gICAgbGVnYWN5bGlzdGVuZXIgPSBlbWl0dGVyW1wib25cIiArIGV2ZW50XTtcbiAgICBpZiAobGVnYWN5bGlzdGVuZXIpIHtcbiAgICAgIGxlZ2FjeWxpc3RlbmVyLmFwcGx5KGVtaXR0ZXIsIGFyZ3MpO1xuICAgIH1cbiAgICBfcmVmID0gbGlzdGVuZXJzKGV2ZW50KS5jb25jYXQobGlzdGVuZXJzKFwiKlwiKSk7XG4gICAgZm9yIChpID0gX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgaSA9ICsrX2kpIHtcbiAgICAgIGxpc3RlbmVyID0gX3JlZltpXTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KGVtaXR0ZXIsIGFyZ3MpO1xuICAgIH1cbiAgfTtcbiAgZW1pdHRlci5faGFzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICByZXR1cm4gISEoZXZlbnRzW2V2ZW50XSB8fCBlbWl0dGVyW1wib25cIiArIGV2ZW50XSk7XG4gIH07XG4gIGlmIChub2RlU3R5bGUpIHtcbiAgICBlbWl0dGVyLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICByZXR1cm4gc2xpY2UobGlzdGVuZXJzKGV2ZW50KSk7XG4gICAgfTtcbiAgICBlbWl0dGVyLm9uID0gZW1pdHRlcltPTl07XG4gICAgZW1pdHRlci5vZmYgPSBlbWl0dGVyW09GRl07XG4gICAgZW1pdHRlci5maXJlID0gZW1pdHRlcltGSVJFXTtcbiAgICBlbWl0dGVyLm9uY2UgPSBmdW5jdGlvbihlLCBmbikge1xuICAgICAgdmFyIGZpcmU7XG4gICAgICBmaXJlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGVtaXR0ZXIub2ZmKGUsIGZpcmUpO1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gZW1pdHRlci5vbihlLCBmaXJlKTtcbiAgICB9O1xuICAgIGVtaXR0ZXIuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGV2ZW50cyA9IHt9O1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGVtaXR0ZXI7XG59O1xuXG54aG9vayA9IEV2ZW50RW1pdHRlcih0cnVlKTtcblxueGhvb2suRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG54aG9va1tCRUZPUkVdID0gZnVuY3Rpb24oaGFuZGxlciwgaSkge1xuICBpZiAoaGFuZGxlci5sZW5ndGggPCAxIHx8IGhhbmRsZXIubGVuZ3RoID4gMikge1xuICAgIHRocm93IFwiaW52YWxpZCBob29rXCI7XG4gIH1cbiAgcmV0dXJuIHhob29rW09OXShCRUZPUkUsIGhhbmRsZXIsIGkpO1xufTtcblxueGhvb2tbQUZURVJdID0gZnVuY3Rpb24oaGFuZGxlciwgaSkge1xuICBpZiAoaGFuZGxlci5sZW5ndGggPCAyIHx8IGhhbmRsZXIubGVuZ3RoID4gMykge1xuICAgIHRocm93IFwiaW52YWxpZCBob29rXCI7XG4gIH1cbiAgcmV0dXJuIHhob29rW09OXShBRlRFUiwgaGFuZGxlciwgaSk7XG59O1xuXG54aG9vay5lbmFibGUgPSBmdW5jdGlvbigpIHtcbiAgV0lORE9XW1hNTEhUVFBdID0gWEhvb2tIdHRwUmVxdWVzdDtcbiAgaWYgKHR5cGVvZiBYSG9va0ZldGNoUmVxdWVzdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgV0lORE9XW0ZFVENIXSA9IFhIb29rRmV0Y2hSZXF1ZXN0O1xuICB9XG4gIGlmIChOYXRpdmVGb3JtRGF0YSkge1xuICAgIFdJTkRPV1tGb3JtRGF0YV0gPSBYSG9va0Zvcm1EYXRhO1xuICB9XG59O1xuXG54aG9vay5kaXNhYmxlID0gZnVuY3Rpb24oKSB7XG4gIFdJTkRPV1tYTUxIVFRQXSA9IHhob29rW1hNTEhUVFBdO1xuICBXSU5ET1dbRkVUQ0hdID0geGhvb2tbRkVUQ0hdO1xuICBpZiAoTmF0aXZlRm9ybURhdGEpIHtcbiAgICBXSU5ET1dbRm9ybURhdGFdID0gTmF0aXZlRm9ybURhdGE7XG4gIH1cbn07XG5cbmNvbnZlcnRIZWFkZXJzID0geGhvb2suaGVhZGVycyA9IGZ1bmN0aW9uKGgsIGRlc3QpIHtcbiAgdmFyIGhlYWRlciwgaGVhZGVycywgaywgbmFtZSwgdiwgdmFsdWUsIF9pLCBfbGVuLCBfcmVmO1xuICBpZiAoZGVzdCA9PSBudWxsKSB7XG4gICAgZGVzdCA9IHt9O1xuICB9XG4gIHN3aXRjaCAodHlwZW9mIGgpIHtcbiAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICBoZWFkZXJzID0gW107XG4gICAgICBmb3IgKGsgaW4gaCkge1xuICAgICAgICB2ID0gaFtrXTtcbiAgICAgICAgbmFtZSA9IGsudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaGVhZGVycy5wdXNoKFwiXCIgKyBuYW1lICsgXCI6XFx0XCIgKyB2KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoZWFkZXJzLmpvaW4oJ1xcbicpICsgJ1xcbic7XG4gICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgaGVhZGVycyA9IGguc3BsaXQoJ1xcbicpO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBoZWFkZXJzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIGhlYWRlciA9IGhlYWRlcnNbX2ldO1xuICAgICAgICBpZiAoLyhbXjpdKyk6XFxzKiguKykvLnRlc3QoaGVhZGVyKSkge1xuICAgICAgICAgIG5hbWUgPSAoX3JlZiA9IFJlZ0V4cC4kMSkgIT0gbnVsbCA/IF9yZWYudG9Mb3dlckNhc2UoKSA6IHZvaWQgMDtcbiAgICAgICAgICB2YWx1ZSA9IFJlZ0V4cC4kMjtcbiAgICAgICAgICBpZiAoZGVzdFtuYW1lXSA9PSBudWxsKSB7XG4gICAgICAgICAgICBkZXN0W25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVzdDtcbiAgfVxufTtcblxuTmF0aXZlRm9ybURhdGEgPSBXSU5ET1dbRm9ybURhdGFdO1xuXG5YSG9va0Zvcm1EYXRhID0gZnVuY3Rpb24oZm9ybSkge1xuICB2YXIgZW50cmllcztcbiAgdGhpcy5mZCA9IGZvcm0gPyBuZXcgTmF0aXZlRm9ybURhdGEoZm9ybSkgOiBuZXcgTmF0aXZlRm9ybURhdGEoKTtcbiAgdGhpcy5mb3JtID0gZm9ybTtcbiAgZW50cmllcyA9IFtdO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2VudHJpZXMnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmZW50cmllcztcbiAgICAgIGZlbnRyaWVzID0gIWZvcm0gPyBbXSA6IHNsaWNlKGZvcm0ucXVlcnlTZWxlY3RvckFsbChcImlucHV0LHNlbGVjdFwiKSkuZmlsdGVyKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIF9yZWY7XG4gICAgICAgIHJldHVybiAoKF9yZWYgPSBlLnR5cGUpICE9PSAnY2hlY2tib3gnICYmIF9yZWYgIT09ICdyYWRpbycpIHx8IGUuY2hlY2tlZDtcbiAgICAgIH0pLm1hcChmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBbZS5uYW1lLCBlLnR5cGUgPT09IFwiZmlsZVwiID8gZS5maWxlcyA6IGUudmFsdWVdO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmVudHJpZXMuY29uY2F0KGVudHJpZXMpO1xuICAgIH1cbiAgfSk7XG4gIHRoaXMuYXBwZW5kID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3M7XG4gICAgICBhcmdzID0gc2xpY2UoYXJndW1lbnRzKTtcbiAgICAgIGVudHJpZXMucHVzaChhcmdzKTtcbiAgICAgIHJldHVybiBfdGhpcy5mZC5hcHBlbmQuYXBwbHkoX3RoaXMuZmQsIGFyZ3MpO1xuICAgIH07XG4gIH0pKHRoaXMpO1xufTtcblxuaWYgKE5hdGl2ZUZvcm1EYXRhKSB7XG4gIHhob29rW0Zvcm1EYXRhXSA9IE5hdGl2ZUZvcm1EYXRhO1xuICBXSU5ET1dbRm9ybURhdGFdID0gWEhvb2tGb3JtRGF0YTtcbn1cblxuTmF0aXZlWE1MSHR0cCA9IFdJTkRPV1tYTUxIVFRQXTtcblxueGhvb2tbWE1MSFRUUF0gPSBOYXRpdmVYTUxIdHRwO1xuXG5YSG9va0h0dHBSZXF1ZXN0ID0gV0lORE9XW1hNTEhUVFBdID0gZnVuY3Rpb24oKSB7XG4gIHZhciBBQk9SVEVELCBjdXJyZW50U3RhdGUsIGVtaXRGaW5hbCwgZW1pdFJlYWR5U3RhdGUsIGV2ZW50LCBmYWNhZGUsIGhhc0Vycm9yLCBoYXNFcnJvckhhbmRsZXIsIHJlYWRCb2R5LCByZWFkSGVhZCwgcmVxdWVzdCwgcmVzcG9uc2UsIHNldFJlYWR5U3RhdGUsIHN0YXR1cywgdHJhbnNpdGluZywgd3JpdGVCb2R5LCB3cml0ZUhlYWQsIHhociwgX2ksIF9sZW4sIF9yZWY7XG4gIEFCT1JURUQgPSAtMTtcbiAgeGhyID0gbmV3IHhob29rW1hNTEhUVFBdKCk7XG4gIHJlcXVlc3QgPSB7fTtcbiAgc3RhdHVzID0gbnVsbDtcbiAgaGFzRXJyb3IgPSB2b2lkIDA7XG4gIHRyYW5zaXRpbmcgPSB2b2lkIDA7XG4gIHJlc3BvbnNlID0gdm9pZCAwO1xuICByZWFkSGVhZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBrZXksIG5hbWUsIHZhbCwgX3JlZjtcbiAgICByZXNwb25zZS5zdGF0dXMgPSBzdGF0dXMgfHwgeGhyLnN0YXR1cztcbiAgICBpZiAoIShzdGF0dXMgPT09IEFCT1JURUQgJiYgbXNpZSA8IDEwKSkge1xuICAgICAgcmVzcG9uc2Uuc3RhdHVzVGV4dCA9IHhoci5zdGF0dXNUZXh0O1xuICAgIH1cbiAgICBpZiAoc3RhdHVzICE9PSBBQk9SVEVEKSB7XG4gICAgICBfcmVmID0gY29udmVydEhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcbiAgICAgIGZvciAoa2V5IGluIF9yZWYpIHtcbiAgICAgICAgdmFsID0gX3JlZltrZXldO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLmhlYWRlcnNba2V5XSkge1xuICAgICAgICAgIG5hbWUgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICByZXNwb25zZS5oZWFkZXJzW25hbWVdID0gdmFsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuICByZWFkQm9keSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICgheGhyLnJlc3BvbnNlVHlwZSB8fCB4aHIucmVzcG9uc2VUeXBlID09PSBcInRleHRcIikge1xuICAgICAgcmVzcG9uc2UudGV4dCA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICByZXNwb25zZS5kYXRhID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3BvbnNlLnhtbCA9IHhoci5yZXNwb25zZVhNTDtcbiAgICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh4aHIucmVzcG9uc2VUeXBlID09PSBcImRvY3VtZW50XCIpIHtcbiAgICAgIHJlc3BvbnNlLnhtbCA9IHhoci5yZXNwb25zZVhNTDtcbiAgICAgIHJlc3BvbnNlLmRhdGEgPSB4aHIucmVzcG9uc2VYTUw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3BvbnNlLmRhdGEgPSB4aHIucmVzcG9uc2U7XG4gICAgfVxuICAgIGlmIChcInJlc3BvbnNlVVJMXCIgaW4geGhyKSB7XG4gICAgICByZXNwb25zZS5maW5hbFVybCA9IHhoci5yZXNwb25zZVVSTDtcbiAgICB9XG4gIH07XG4gIHdyaXRlSGVhZCA9IGZ1bmN0aW9uKCkge1xuICAgIGZhY2FkZS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgZmFjYWRlLnN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0O1xuICB9O1xuICB3cml0ZUJvZHkgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoJ3RleHQnIGluIHJlc3BvbnNlKSB7XG4gICAgICBmYWNhZGUucmVzcG9uc2VUZXh0ID0gcmVzcG9uc2UudGV4dDtcbiAgICB9XG4gICAgaWYgKCd4bWwnIGluIHJlc3BvbnNlKSB7XG4gICAgICBmYWNhZGUucmVzcG9uc2VYTUwgPSByZXNwb25zZS54bWw7XG4gICAgfVxuICAgIGlmICgnZGF0YScgaW4gcmVzcG9uc2UpIHtcbiAgICAgIGZhY2FkZS5yZXNwb25zZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfVxuICAgIGlmICgnZmluYWxVcmwnIGluIHJlc3BvbnNlKSB7XG4gICAgICBmYWNhZGUucmVzcG9uc2VVUkwgPSByZXNwb25zZS5maW5hbFVybDtcbiAgICB9XG4gIH07XG4gIGVtaXRSZWFkeVN0YXRlID0gZnVuY3Rpb24obikge1xuICAgIHdoaWxlIChuID4gY3VycmVudFN0YXRlICYmIGN1cnJlbnRTdGF0ZSA8IDQpIHtcbiAgICAgIGZhY2FkZVtSRUFEWV9TVEFURV0gPSArK2N1cnJlbnRTdGF0ZTtcbiAgICAgIGlmIChjdXJyZW50U3RhdGUgPT09IDEpIHtcbiAgICAgICAgZmFjYWRlW0ZJUkVdKFwibG9hZHN0YXJ0XCIsIHt9KTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50U3RhdGUgPT09IDIpIHtcbiAgICAgICAgd3JpdGVIZWFkKCk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudFN0YXRlID09PSA0KSB7XG4gICAgICAgIHdyaXRlSGVhZCgpO1xuICAgICAgICB3cml0ZUJvZHkoKTtcbiAgICAgIH1cbiAgICAgIGZhY2FkZVtGSVJFXShcInJlYWR5c3RhdGVjaGFuZ2VcIiwge30pO1xuICAgICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gNCkge1xuICAgICAgICBpZiAocmVxdWVzdC5hc3luYyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBlbWl0RmluYWwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGVtaXRGaW5hbCwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIGVtaXRGaW5hbCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghaGFzRXJyb3IpIHtcbiAgICAgIGZhY2FkZVtGSVJFXShcImxvYWRcIiwge30pO1xuICAgIH1cbiAgICBmYWNhZGVbRklSRV0oXCJsb2FkZW5kXCIsIHt9KTtcbiAgICBpZiAoaGFzRXJyb3IpIHtcbiAgICAgIGZhY2FkZVtSRUFEWV9TVEFURV0gPSAwO1xuICAgIH1cbiAgfTtcbiAgY3VycmVudFN0YXRlID0gMDtcbiAgc2V0UmVhZHlTdGF0ZSA9IGZ1bmN0aW9uKG4pIHtcbiAgICB2YXIgaG9va3MsIHByb2Nlc3M7XG4gICAgaWYgKG4gIT09IDQpIHtcbiAgICAgIGVtaXRSZWFkeVN0YXRlKG4pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBob29rcyA9IHhob29rLmxpc3RlbmVycyhBRlRFUik7XG4gICAgcHJvY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGhvb2s7XG4gICAgICBpZiAoIWhvb2tzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZW1pdFJlYWR5U3RhdGUoNCk7XG4gICAgICB9XG4gICAgICBob29rID0gaG9va3Muc2hpZnQoKTtcbiAgICAgIGlmIChob29rLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBob29rKHJlcXVlc3QsIHJlc3BvbnNlKTtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3MoKTtcbiAgICAgIH0gZWxzZSBpZiAoaG9vay5sZW5ndGggPT09IDMgJiYgcmVxdWVzdC5hc3luYykge1xuICAgICAgICByZXR1cm4gaG9vayhyZXF1ZXN0LCByZXNwb25zZSwgcHJvY2Vzcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcHJvY2VzcygpO1xuICAgICAgfVxuICAgIH07XG4gICAgcHJvY2VzcygpO1xuICB9O1xuICBmYWNhZGUgPSByZXF1ZXN0LnhociA9IEV2ZW50RW1pdHRlcigpO1xuICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHhocltSRUFEWV9TVEFURV0gPT09IDIpIHtcbiAgICAgICAgcmVhZEhlYWQoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChfZXJyb3IpIHt9XG4gICAgaWYgKHhocltSRUFEWV9TVEFURV0gPT09IDQpIHtcbiAgICAgIHRyYW5zaXRpbmcgPSBmYWxzZTtcbiAgICAgIHJlYWRIZWFkKCk7XG4gICAgICByZWFkQm9keSgpO1xuICAgIH1cbiAgICBzZXRSZWFkeVN0YXRlKHhocltSRUFEWV9TVEFURV0pO1xuICB9O1xuICBoYXNFcnJvckhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICBoYXNFcnJvciA9IHRydWU7XG4gIH07XG4gIGZhY2FkZVtPTl0oJ2Vycm9yJywgaGFzRXJyb3JIYW5kbGVyKTtcbiAgZmFjYWRlW09OXSgndGltZW91dCcsIGhhc0Vycm9ySGFuZGxlcik7XG4gIGZhY2FkZVtPTl0oJ2Fib3J0JywgaGFzRXJyb3JIYW5kbGVyKTtcbiAgZmFjYWRlW09OXSgncHJvZ3Jlc3MnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoY3VycmVudFN0YXRlIDwgMykge1xuICAgICAgc2V0UmVhZHlTdGF0ZSgzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmFjYWRlW0ZJUkVdKFwicmVhZHlzdGF0ZWNoYW5nZVwiLCB7fSk7XG4gICAgfVxuICB9KTtcbiAgaWYgKCd3aXRoQ3JlZGVudGlhbHMnIGluIHhociB8fCB4aG9vay5hZGRXaXRoQ3JlZGVudGlhbHMpIHtcbiAgICBmYWNhZGUud2l0aENyZWRlbnRpYWxzID0gZmFsc2U7XG4gIH1cbiAgZmFjYWRlLnN0YXR1cyA9IDA7XG4gIF9yZWYgPSBDT01NT05fRVZFTlRTLmNvbmNhdChVUExPQURfRVZFTlRTKTtcbiAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgZXZlbnQgPSBfcmVmW19pXTtcbiAgICBmYWNhZGVbXCJvblwiICsgZXZlbnRdID0gbnVsbDtcbiAgfVxuICBmYWNhZGUub3BlbiA9IGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBhc3luYywgdXNlciwgcGFzcykge1xuICAgIGN1cnJlbnRTdGF0ZSA9IDA7XG4gICAgaGFzRXJyb3IgPSBmYWxzZTtcbiAgICB0cmFuc2l0aW5nID0gZmFsc2U7XG4gICAgcmVxdWVzdC5oZWFkZXJzID0ge307XG4gICAgcmVxdWVzdC5oZWFkZXJOYW1lcyA9IHt9O1xuICAgIHJlcXVlc3Quc3RhdHVzID0gMDtcbiAgICByZXNwb25zZSA9IHt9O1xuICAgIHJlc3BvbnNlLmhlYWRlcnMgPSB7fTtcbiAgICByZXF1ZXN0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICByZXF1ZXN0LnVybCA9IHVybDtcbiAgICByZXF1ZXN0LmFzeW5jID0gYXN5bmMgIT09IGZhbHNlO1xuICAgIHJlcXVlc3QudXNlciA9IHVzZXI7XG4gICAgcmVxdWVzdC5wYXNzID0gcGFzcztcbiAgICBzZXRSZWFkeVN0YXRlKDEpO1xuICB9O1xuICBmYWNhZGUuc2VuZCA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICB2YXIgaG9va3MsIGssIG1vZGssIHByb2Nlc3MsIHNlbmQsIF9qLCBfbGVuMSwgX3JlZjE7XG4gICAgX3JlZjEgPSBbJ3R5cGUnLCAndGltZW91dCcsICd3aXRoQ3JlZGVudGlhbHMnXTtcbiAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMS5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgIGsgPSBfcmVmMVtfal07XG4gICAgICBtb2RrID0gayA9PT0gXCJ0eXBlXCIgPyBcInJlc3BvbnNlVHlwZVwiIDogaztcbiAgICAgIGlmIChtb2RrIGluIGZhY2FkZSkge1xuICAgICAgICByZXF1ZXN0W2tdID0gZmFjYWRlW21vZGtdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXF1ZXN0LmJvZHkgPSBib2R5O1xuICAgIHNlbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBoZWFkZXIsIHZhbHVlLCBfaywgX2xlbjIsIF9yZWYyLCBfcmVmMztcbiAgICAgIHByb3h5RXZlbnRzKENPTU1PTl9FVkVOVFMsIHhociwgZmFjYWRlKTtcbiAgICAgIGlmIChmYWNhZGUudXBsb2FkKSB7XG4gICAgICAgIHByb3h5RXZlbnRzKENPTU1PTl9FVkVOVFMuY29uY2F0KFVQTE9BRF9FVkVOVFMpLCB4aHIudXBsb2FkLCBmYWNhZGUudXBsb2FkKTtcbiAgICAgIH1cbiAgICAgIHRyYW5zaXRpbmcgPSB0cnVlO1xuICAgICAgeGhyLm9wZW4ocmVxdWVzdC5tZXRob2QsIHJlcXVlc3QudXJsLCByZXF1ZXN0LmFzeW5jLCByZXF1ZXN0LnVzZXIsIHJlcXVlc3QucGFzcyk7XG4gICAgICBfcmVmMiA9IFsndHlwZScsICd0aW1lb3V0JywgJ3dpdGhDcmVkZW50aWFscyddO1xuICAgICAgZm9yIChfayA9IDAsIF9sZW4yID0gX3JlZjIubGVuZ3RoOyBfayA8IF9sZW4yOyBfaysrKSB7XG4gICAgICAgIGsgPSBfcmVmMltfa107XG4gICAgICAgIG1vZGsgPSBrID09PSBcInR5cGVcIiA/IFwicmVzcG9uc2VUeXBlXCIgOiBrO1xuICAgICAgICBpZiAoayBpbiByZXF1ZXN0KSB7XG4gICAgICAgICAgeGhyW21vZGtdID0gcmVxdWVzdFtrXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgX3JlZjMgPSByZXF1ZXN0LmhlYWRlcnM7XG4gICAgICBmb3IgKGhlYWRlciBpbiBfcmVmMykge1xuICAgICAgICB2YWx1ZSA9IF9yZWYzW2hlYWRlcl07XG4gICAgICAgIGlmIChoZWFkZXIpIHtcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHJlcXVlc3QuYm9keSBpbnN0YW5jZW9mIFhIb29rRm9ybURhdGEpIHtcbiAgICAgICAgcmVxdWVzdC5ib2R5ID0gcmVxdWVzdC5ib2R5LmZkO1xuICAgICAgfVxuICAgICAgeGhyLnNlbmQocmVxdWVzdC5ib2R5KTtcbiAgICB9O1xuICAgIGhvb2tzID0geGhvb2subGlzdGVuZXJzKEJFRk9SRSk7XG4gICAgcHJvY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGRvbmUsIGhvb2s7XG4gICAgICBpZiAoIWhvb2tzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gc2VuZCgpO1xuICAgICAgfVxuICAgICAgZG9uZSA9IGZ1bmN0aW9uKHVzZXJSZXNwb25zZSkge1xuICAgICAgICBpZiAodHlwZW9mIHVzZXJSZXNwb25zZSA9PT0gJ29iamVjdCcgJiYgKHR5cGVvZiB1c2VyUmVzcG9uc2Uuc3RhdHVzID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgcmVzcG9uc2Uuc3RhdHVzID09PSAnbnVtYmVyJykpIHtcbiAgICAgICAgICBtZXJnZU9iamVjdHModXNlclJlc3BvbnNlLCByZXNwb25zZSk7XG4gICAgICAgICAgaWYgKF9faW5kZXhPZi5jYWxsKHVzZXJSZXNwb25zZSwgJ2RhdGEnKSA8IDApIHtcbiAgICAgICAgICAgIHVzZXJSZXNwb25zZS5kYXRhID0gdXNlclJlc3BvbnNlLnJlc3BvbnNlIHx8IHVzZXJSZXNwb25zZS50ZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRSZWFkeVN0YXRlKDQpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBwcm9jZXNzKCk7XG4gICAgICB9O1xuICAgICAgZG9uZS5oZWFkID0gZnVuY3Rpb24odXNlclJlc3BvbnNlKSB7XG4gICAgICAgIG1lcmdlT2JqZWN0cyh1c2VyUmVzcG9uc2UsIHJlc3BvbnNlKTtcbiAgICAgICAgcmV0dXJuIHNldFJlYWR5U3RhdGUoMik7XG4gICAgICB9O1xuICAgICAgZG9uZS5wcm9ncmVzcyA9IGZ1bmN0aW9uKHVzZXJSZXNwb25zZSkge1xuICAgICAgICBtZXJnZU9iamVjdHModXNlclJlc3BvbnNlLCByZXNwb25zZSk7XG4gICAgICAgIHJldHVybiBzZXRSZWFkeVN0YXRlKDMpO1xuICAgICAgfTtcbiAgICAgIGhvb2sgPSBob29rcy5zaGlmdCgpO1xuICAgICAgaWYgKGhvb2subGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBkb25lKGhvb2socmVxdWVzdCkpO1xuICAgICAgfSBlbHNlIGlmIChob29rLmxlbmd0aCA9PT0gMiAmJiByZXF1ZXN0LmFzeW5jKSB7XG4gICAgICAgIHJldHVybiBob29rKHJlcXVlc3QsIGRvbmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHByb2Nlc3MoKTtcbiAgfTtcbiAgZmFjYWRlLmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgc3RhdHVzID0gQUJPUlRFRDtcbiAgICBpZiAodHJhbnNpdGluZykge1xuICAgICAgeGhyLmFib3J0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZhY2FkZVtGSVJFXSgnYWJvcnQnLCB7fSk7XG4gICAgfVxuICB9O1xuICBmYWNhZGUuc2V0UmVxdWVzdEhlYWRlciA9IGZ1bmN0aW9uKGhlYWRlciwgdmFsdWUpIHtcbiAgICB2YXIgbE5hbWUsIG5hbWU7XG4gICAgbE5hbWUgPSBoZWFkZXIgIT0gbnVsbCA/IGhlYWRlci50b0xvd2VyQ2FzZSgpIDogdm9pZCAwO1xuICAgIG5hbWUgPSByZXF1ZXN0LmhlYWRlck5hbWVzW2xOYW1lXSA9IHJlcXVlc3QuaGVhZGVyTmFtZXNbbE5hbWVdIHx8IGhlYWRlcjtcbiAgICBpZiAocmVxdWVzdC5oZWFkZXJzW25hbWVdKSB7XG4gICAgICB2YWx1ZSA9IHJlcXVlc3QuaGVhZGVyc1tuYW1lXSArICcsICcgKyB2YWx1ZTtcbiAgICB9XG4gICAgcmVxdWVzdC5oZWFkZXJzW25hbWVdID0gdmFsdWU7XG4gIH07XG4gIGZhY2FkZS5nZXRSZXNwb25zZUhlYWRlciA9IGZ1bmN0aW9uKGhlYWRlcikge1xuICAgIHZhciBuYW1lO1xuICAgIG5hbWUgPSBoZWFkZXIgIT0gbnVsbCA/IGhlYWRlci50b0xvd2VyQ2FzZSgpIDogdm9pZCAwO1xuICAgIHJldHVybiBudWxsaWZ5KHJlc3BvbnNlLmhlYWRlcnNbbmFtZV0pO1xuICB9O1xuICBmYWNhZGUuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG51bGxpZnkoY29udmVydEhlYWRlcnMocmVzcG9uc2UuaGVhZGVycykpO1xuICB9O1xuICBpZiAoeGhyLm92ZXJyaWRlTWltZVR5cGUpIHtcbiAgICBmYWNhZGUub3ZlcnJpZGVNaW1lVHlwZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHhoci5vdmVycmlkZU1pbWVUeXBlLmFwcGx5KHhociwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG4gIGlmICh4aHIudXBsb2FkKSB7XG4gICAgZmFjYWRlLnVwbG9hZCA9IHJlcXVlc3QudXBsb2FkID0gRXZlbnRFbWl0dGVyKCk7XG4gIH1cbiAgZmFjYWRlLlVOU0VOVCA9IDA7XG4gIGZhY2FkZS5PUEVORUQgPSAxO1xuICBmYWNhZGUuSEVBREVSU19SRUNFSVZFRCA9IDI7XG4gIGZhY2FkZS5MT0FESU5HID0gMztcbiAgZmFjYWRlLkRPTkUgPSA0O1xuICBmYWNhZGUucmVzcG9uc2UgPSAnJztcbiAgZmFjYWRlLnJlc3BvbnNlVGV4dCA9ICcnO1xuICBmYWNhZGUucmVzcG9uc2VYTUwgPSBudWxsO1xuICBmYWNhZGUucmVhZHlTdGF0ZSA9IDA7XG4gIGZhY2FkZS5zdGF0dXNUZXh0ID0gJyc7XG4gIHJldHVybiBmYWNhZGU7XG59O1xuXG5pZiAodHlwZW9mIFdJTkRPV1tGRVRDSF0gPT09IFwiZnVuY3Rpb25cIikge1xuICBOYXRpdmVGZXRjaCA9IFdJTkRPV1tGRVRDSF07XG4gIHhob29rW0ZFVENIXSA9IE5hdGl2ZUZldGNoO1xuICBYSG9va0ZldGNoUmVxdWVzdCA9IFdJTkRPV1tGRVRDSF0gPSBmdW5jdGlvbih1cmwsIG9wdGlvbnMpIHtcbiAgICB2YXIgYWZ0ZXJIb29rcywgYmVmb3JlSG9va3MsIHJlcXVlc3Q7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyczoge31cbiAgICAgIH07XG4gICAgfVxuICAgIG9wdGlvbnMudXJsID0gdXJsO1xuICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIGJlZm9yZUhvb2tzID0geGhvb2subGlzdGVuZXJzKEJFRk9SRSk7XG4gICAgYWZ0ZXJIb29rcyA9IHhob29rLmxpc3RlbmVycyhBRlRFUik7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGRvbmUsIGdldFJlcXVlc3QsIHByb2Nlc3NBZnRlciwgcHJvY2Vzc0JlZm9yZSwgc2VuZDtcbiAgICAgIGdldFJlcXVlc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYm9keSBpbnN0YW5jZW9mIFhIb29rRm9ybURhdGEpIHtcbiAgICAgICAgICBvcHRpb25zLmJvZHkgPSBvcHRpb25zLmJvZHkuZmQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICAgIG9wdGlvbnMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KG9wdGlvbnMudXJsLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVyZ2VPYmplY3RzKG9wdGlvbnMsIHJlcXVlc3QpO1xuICAgICAgfTtcbiAgICAgIHByb2Nlc3NBZnRlciA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBob29rO1xuICAgICAgICBpZiAoIWFmdGVySG9va3MubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIGhvb2sgPSBhZnRlckhvb2tzLnNoaWZ0KCk7XG4gICAgICAgIGlmIChob29rLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIGhvb2soZ2V0UmVxdWVzdCgpLCByZXNwb25zZSk7XG4gICAgICAgICAgcmV0dXJuIHByb2Nlc3NBZnRlcihyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaG9vay5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICByZXR1cm4gaG9vayhnZXRSZXF1ZXN0KCksIHJlc3BvbnNlLCBwcm9jZXNzQWZ0ZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBwcm9jZXNzQWZ0ZXIocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgZG9uZSA9IGZ1bmN0aW9uKHVzZXJSZXNwb25zZSkge1xuICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgIGlmICh1c2VyUmVzcG9uc2UgIT09IHZvaWQgMCkge1xuICAgICAgICAgIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKHVzZXJSZXNwb25zZS5ib2R5IHx8IHVzZXJSZXNwb25zZS50ZXh0LCB1c2VyUmVzcG9uc2UpO1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgIHByb2Nlc3NBZnRlcihyZXNwb25zZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHByb2Nlc3NCZWZvcmUoKTtcbiAgICAgIH07XG4gICAgICBwcm9jZXNzQmVmb3JlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBob29rO1xuICAgICAgICBpZiAoIWJlZm9yZUhvb2tzLmxlbmd0aCkge1xuICAgICAgICAgIHNlbmQoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaG9vayA9IGJlZm9yZUhvb2tzLnNoaWZ0KCk7XG4gICAgICAgIGlmIChob29rLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiBkb25lKGhvb2sob3B0aW9ucykpO1xuICAgICAgICB9IGVsc2UgaWYgKGhvb2subGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgcmV0dXJuIGhvb2soZ2V0UmVxdWVzdCgpLCBkb25lKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHNlbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE5hdGl2ZUZldGNoKGdldFJlcXVlc3QoKSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiBwcm9jZXNzQWZ0ZXIocmVzcG9uc2UpO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIHByb2Nlc3NBZnRlcihlcnIpO1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgcHJvY2Vzc0JlZm9yZSgpO1xuICAgIH0pO1xuICB9O1xufVxuXG5YSG9va0h0dHBSZXF1ZXN0LlVOU0VOVCA9IDA7XG5cblhIb29rSHR0cFJlcXVlc3QuT1BFTkVEID0gMTtcblxuWEhvb2tIdHRwUmVxdWVzdC5IRUFERVJTX1JFQ0VJVkVEID0gMjtcblxuWEhvb2tIdHRwUmVxdWVzdC5MT0FESU5HID0gMztcblxuWEhvb2tIdHRwUmVxdWVzdC5ET05FID0gNDtcblxuaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShcInhob29rXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4geGhvb2s7XG4gIH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0ge1xuICAgIHhob29rOiB4aG9va1xuICB9O1xufSBlbHNlIGlmIChXSU5ET1cpIHtcbiAgV0lORE9XLnhob29rID0geGhvb2s7XG59XG5cbn0uY2FsbCh0aGlzKSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHhob29rID0gcmVxdWlyZShcInhob29rXCIpO1xuY29uc3QgcXVlcnlfc3RyaW5nXzEgPSByZXF1aXJlKFwicXVlcnktc3RyaW5nXCIpO1xuY29uc3QgaWRGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlcy9pZEZhY3RvcnlcIik7XG5jb25zdCBtZXNzYWdlQnVzXzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlcy9tZXNzYWdlQnVzXCIpO1xuY29uc3QgbWVzc2FnZUJ1cyA9IG5ldyBtZXNzYWdlQnVzXzEuZGVmYXVsdCgpO1xuY29uc3QgbWVzc2FnZUlkRmFjdG9yeSA9IG5ldyBpZEZhY3RvcnlfMS5kZWZhdWx0KCk7XG5jb25zdCBsb2dJZEZhY3RvcnkgPSBuZXcgaWRGYWN0b3J5XzEuZGVmYXVsdCgpO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIC8vIFdlIG9ubHkgYWNjZXB0IG1lc3NhZ2VzIGZyb20gb3Vyc2VsdmVzXG4gICAgaWYgKGV2ZW50LnNvdXJjZSAhPSB3aW5kb3cpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBkYXRhID0gZXZlbnQuZGF0YTtcbiAgICBpZiAoZGF0YS50byAhPT0gXCJIT09LX1NDUklQVFwiKVxuICAgICAgICByZXR1cm47XG4gICAgbWVzc2FnZUJ1cy5kaXNwYXRjaChkYXRhLmlkLCBkYXRhLm1lc3NhZ2UpO1xufSk7XG4vKipcbiAqIFByb21pc2Z5IHBvc3QgbWVzc2FnZSBmcm9tIHdpbmRvdyB0byB3aW5kb3dcbiAqIGFja1JlcXVpcmVkLCBpZiBmYWxzZSwgbm8gaWQgd2lsbCBiZSBhc3NpZ25lZCBoZW5jZSwgbm8gbWV0aG9kIHdpbGwgYmUgYWRkZWQgaW4gbWVzc2FnZVxuICogbWVzc2FnZSBpZCB3YXMgbm90IHRoZSBwcm9ibGVtIGJ1dCBmdW5jdGlvbiBpbiBtZXNzYWdlIGJ1cyB3YXNcbiAqL1xuY29uc3QgcG9zdE1lc3NhZ2UgPSAobWVzc2FnZSwgdHlwZSwgYWNrUmVxdWlyZWQpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlSWQgPSBhY2tSZXF1aXJlZCA/IG1lc3NhZ2VJZEZhY3RvcnkuZ2V0SWQoKSA6IG51bGw7XG4gICAgY29uc3QgbWVzc2FnZU9iamVjdCA9IHtcbiAgICAgICAgaWQ6IG1lc3NhZ2VJZCxcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgdG86IFwiQ09OVEVOVF9TQ1JJUFRcIixcbiAgICAgICAgZnJvbTogXCJIT09LX1NDUklQVFwiLFxuICAgICAgICBleHRlbnN0aW9uTmFtZTogXCJNT0tLVVwiLFxuICAgICAgICB0eXBlLFxuICAgIH07XG4gICAgd2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2VPYmplY3QsIFwiKlwiKTtcbiAgICBpZiAobWVzc2FnZUlkICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzbG92ZSkgPT4ge1xuICAgICAgICAgICAgbWVzc2FnZUJ1cy5hZGRMaXN0ZXIobWVzc2FnZUlkLCByZXNsb3ZlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbnhob29rLmJlZm9yZShmdW5jdGlvbiAocmVxdWVzdCwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBzZXBhcmF0b3IgPSByZXF1ZXN0LnVybC5pbmRleE9mKFwiP1wiKTtcbiAgICBjb25zdCB1cmwgPSBzZXBhcmF0b3IgIT09IC0xID8gcmVxdWVzdC51cmwuc3Vic3RyKDAsIHNlcGFyYXRvcikgOiByZXF1ZXN0LnVybDtcbiAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHNlcGFyYXRvciAhPT0gLTFcbiAgICAgICAgPyBKU09OLnN0cmluZ2lmeShxdWVyeV9zdHJpbmdfMS5wYXJzZShyZXF1ZXN0LnVybC5zdWJzdHIoc2VwYXJhdG9yKSkpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIHJlcXVlc3QubW9ra3UgPSB7XG4gICAgICAgIGlkOiBsb2dJZEZhY3RvcnkuZ2V0SWQoKSxcbiAgICB9O1xuICAgIGNvbnN0IGRhdGEgPSBnZXRMb2cocmVxdWVzdCk7XG4gICAgcG9zdE1lc3NhZ2UoZGF0YSwgXCJMT0dcIiwgZmFsc2UpO1xuICAgIHBvc3RNZXNzYWdlKGRhdGEsIFwiUVVFUllcIiwgdHJ1ZSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5tb2NrUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IG1vY2sgPSBkYXRhLm1vY2tSZXNwb25zZTtcbiAgICAgICAgICAgIGNvbnN0IGZpbmFsUmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBtb2NrLnN0YXR1cyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBtb2NrLnJlc3BvbnNlID8gbW9jay5yZXNwb25zZSA6IFwiXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChtb2NrLmRlbGF5KSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZpbmFsUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0sIG1vY2suZGVsYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZmluYWxSZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzb21ldGhpbmcgd2VudCB3cm9uZyFcIik7XG4gICAgfSk7XG59KTtcbmNvbnN0IGdldExvZyA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBzZXBhcmF0b3IgPSByZXF1ZXN0LnVybC5pbmRleE9mKFwiP1wiKTtcbiAgICBjb25zdCB1cmwgPSBzZXBhcmF0b3IgIT09IC0xID8gcmVxdWVzdC51cmwuc3Vic3RyKDAsIHNlcGFyYXRvcikgOiByZXF1ZXN0LnVybDtcbiAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHNlcGFyYXRvciAhPT0gLTFcbiAgICAgICAgPyBKU09OLnN0cmluZ2lmeShxdWVyeV9zdHJpbmdfMS5wYXJzZShyZXF1ZXN0LnVybC5zdWJzdHIoc2VwYXJhdG9yKSkpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlcXVlc3Q6IHtcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIGJvZHk6IHJlcXVlc3QuYm9keSxcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zLFxuICAgICAgICAgICAgbWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcbiAgICAgICAgfSxcbiAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgIGlkOiAoX2EgPSByZXF1ZXN0Lm1va2t1KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWQsXG4gICAgfTtcbn07XG54aG9vay5hZnRlcihmdW5jdGlvbiAocmVxdWVzdCwgb3JpZ2luYWxSZXNwb25zZSkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3JpZ2luYWxSZXNwb25zZS5jbG9uZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IG9yaWdpbmFsUmVzcG9uc2UuY2xvbmUoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UudGV4dCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBnZXRMb2cocmVxdWVzdCwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLnRleHQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoZGF0YSwgXCJMT0dcIiwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UudGV4dCgpLnRoZW4oKHN0cmVhbWVkUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGdldExvZyhyZXF1ZXN0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBzdHJlYW1lZFJlc3BvbnNlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoZGF0YSwgXCJMT0dcIiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGdldExvZyhyZXF1ZXN0LCB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBvcmlnaW5hbFJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgICAgICByZXNwb25zZTogdHlwZW9mIG9yaWdpbmFsUmVzcG9uc2UudGV4dCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICA/IG9yaWdpbmFsUmVzcG9uc2UudGV4dFxuICAgICAgICAgICAgICAgICAgICA6IFwiQ2Fubm90IHBhcnNlIHJlc3BvbnNlLCBsb2dnaW5nIGxpYnJhcmllcyBjYW4gY2F1c2UgdGhpcy5cIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcG9zdE1lc3NhZ2UoZGF0YSwgXCJMT0dcIiwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIklOSkVDVF9FUlJPUlwiLCBlcnJvcik7XG4gICAgfVxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIElkRmFjdG9yeSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2lkID0gMDtcbiAgICB9XG4gICAgZ2V0SWQoKSB7XG4gICAgICAgIHRoaXMuX2lkKys7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBJZEZhY3Rvcnk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIE1lc3NhZ2VCdXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9jb2xsZWN0b3IgPSB7fTtcbiAgICB9XG4gICAgZGlzcGF0Y2goaWQsIGV2ZW50RGF0YSkge1xuICAgICAgICBpZiAodGhpcy5fY29sbGVjdG9yW2lkXSkge1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdG9yW2lkXShldmVudERhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZGVmYXVsdExpc3RuZXIoZXZlbnREYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhZGRMaXN0ZXIoaWQsIGZ1bmMpIHtcbiAgICAgICAgdGhpcy5fY29sbGVjdG9yW2lkXSA9IGZ1bmM7XG4gICAgfVxuICAgIGNyZWF0ZURlZmF1bHRMaXN0ZW5lcihmdW5jKSB7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRMaXN0bmVyID0gZnVuYztcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBNZXNzYWdlQnVzO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==