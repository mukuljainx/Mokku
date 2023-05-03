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

/***/ "./node_modules/xhook/es/main.js":
/*!***************************************!*\
  !*** ./node_modules/xhook/es/main.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return xhook; });
//if required, add 'indexOf' method to Array
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(item) {
    for (let i = 0; i < this.length; i++) {
      const x = this[i];
      if (x === item) {
        return i;
      }
    }
    return -1;
  };
}

const slice = (o, n) => Array.prototype.slice.call(o, n);

let result = null;

//find global object
if (
  typeof WorkerGlobalScope !== "undefined" &&
  self instanceof WorkerGlobalScope
) {
  result = self;
} else if (typeof global !== "undefined") {
  result = global;
} else if (window) {
  result = window;
}

//find IE version
const useragent =
  typeof navigator !== "undefined" && navigator["useragent"]
    ? navigator.userAgent
    : "";

let msie = null;
if (
  /msie (\d+)/.test(useragent.toLowerCase()) ||
  /trident\/.*; rv:(\d+)/.test(useragent.toLowerCase())
) {
  msie = parseInt(RegExp.$1, 10);
}

const windowRef = result;
const documentRef = result.document;

const UPLOAD_EVENTS = ["load", "loadend", "loadstart"];
const COMMON_EVENTS = ["progress", "abort", "error", "timeout"];

const depricatedProp = p =>
  ["returnValue", "totalSize", "position"].includes(p);

const mergeObjects = function(src, dst) {
  for (let k in src) {
    if (depricatedProp(k)) {
      continue;
    }
    const v = src[k];
    try {
      dst[k] = v;
    } catch (error) {}
  }
  return dst;
};

//proxy events from one emitter to another
const proxyEvents = function(events, src, dst) {
  const p = event =>
    function(e) {
      const clone = {};
      //copies event, with dst emitter inplace of src
      for (let k in e) {
        if (depricatedProp(k)) {
          continue;
        }
        const val = e[k];
        clone[k] = val === src ? dst : val;
      }
      //emits out the dst
      return dst.dispatchEvent(event, clone);
    };
  //dont proxy manual events
  for (let event of Array.from(events)) {
    if (dst._has(event)) {
      src[`on${event}`] = p(event);
    }
  }
};

//create fake event
const fakeEvent = function(type) {
  if (documentRef && documentRef.createEventObject != null) {
    const msieEventObject = documentRef.createEventObject();
    msieEventObject.type = type;
    return msieEventObject;
  }
  // on some platforms like android 4.1.2 and safari on windows, it appears
  // that new Event is not allowed
  try {
    return new Event(type);
  } catch (error) {
    return { type };
  }
};

//tiny event emitter
const EventEmitter = function(nodeStyle) {
  //private
  let events = {};
  const listeners = event => events[event] || [];
  //public
  const emitter = {};
  emitter.addEventListener = function(event, callback, i) {
    events[event] = listeners(event);
    if (events[event].indexOf(callback) >= 0) {
      return;
    }
    i = i === undefined ? events[event].length : i;
    events[event].splice(i, 0, callback);
  };
  emitter.removeEventListener = function(event, callback) {
    //remove all
    if (event === undefined) {
      events = {};
      return;
    }
    //remove all of type event
    if (callback === undefined) {
      events[event] = [];
    }
    //remove particular handler
    const i = listeners(event).indexOf(callback);
    if (i === -1) {
      return;
    }
    listeners(event).splice(i, 1);
  };
  emitter.dispatchEvent = function() {
    const args = slice(arguments);
    const event = args.shift();
    if (!nodeStyle) {
      args[0] = mergeObjects(args[0], fakeEvent(event));
    }
    const legacylistener = emitter[`on${event}`];
    if (legacylistener) {
      legacylistener.apply(emitter, args);
    }
    const iterable = listeners(event).concat(listeners("*"));
    for (let i = 0; i < iterable.length; i++) {
      const listener = iterable[i];
      listener.apply(emitter, args);
    }
  };
  emitter._has = event => !!(events[event] || emitter[`on${event}`]);
  //add extra aliases
  if (nodeStyle) {
    emitter.listeners = event => slice(listeners(event));
    emitter.on = emitter.addEventListener;
    emitter.off = emitter.removeEventListener;
    emitter.fire = emitter.dispatchEvent;
    emitter.once = function(e, fn) {
      var fire = function() {
        emitter.off(e, fire);
        return fn.apply(null, arguments);
      };
      return emitter.on(e, fire);
    };
    emitter.destroy = () => (events = {});
  }

  return emitter;
};

//helper
const convert = function(h, dest) {
  let name;
  if (dest == null) {
    dest = {};
  }
  switch (typeof h) {
    case "object":
      var headers = [];
      for (let k in h) {
        const v = h[k];
        name = k.toLowerCase();
        headers.push(`${name}:\t${v}`);
      }
      return headers.join("\n") + "\n";
    case "string":
      headers = h.split("\n");
      for (let header of Array.from(headers)) {
        if (/([^:]+):\s*(.+)/.test(header)) {
          name = RegExp.$1 != null ? RegExp.$1.toLowerCase() : undefined;
          const value = RegExp.$2;
          if (dest[name] == null) {
            dest[name] = value;
          }
        }
      }
      return dest;
  }
  return [];
};

var headers = { convert };

//global set of hook functions,
//uses event emitter to store hooks
const hooks = EventEmitter(true);

const nullify = res => (res === undefined ? null : res);

//browser's XMLHttpRequest
const Native$1 = windowRef.XMLHttpRequest;

//xhook's XMLHttpRequest
const Xhook$1 = function() {
  const ABORTED = -1;
  const xhr = new Native$1();

  //==========================
  // Extra state
  const request = {};
  let status = null;
  let hasError = undefined;
  let transiting = undefined;
  let response = undefined;
  var currentState = 0;

  //==========================
  // Private API

  //read results from real xhr into response
  const readHead = function() {
    // Accessing attributes on an aborted xhr object will
    // throw an 'c00c023f error' in IE9 and lower, don't touch it.
    response.status = status || xhr.status;
    if (status !== ABORTED || !(msie < 10)) {
      response.statusText = xhr.statusText;
    }
    if (status !== ABORTED) {
      const object = headers.convert(xhr.getAllResponseHeaders());
      for (let key in object) {
        const val = object[key];
        if (!response.headers[key]) {
          const name = key.toLowerCase();
          response.headers[name] = val;
        }
      }
      return;
    }
  };

  const readBody = function() {
    //https://xhr.spec.whatwg.org/
    if (!xhr.responseType || xhr.responseType === "text") {
      response.text = xhr.responseText;
      response.data = xhr.responseText;
      try {
        response.xml = xhr.responseXML;
      } catch (error) {}
      // unable to set responseXML due to response type, we attempt to assign responseXML
      // when the type is text even though it's against the spec due to several libraries
      // and browser vendors who allow this behavior. causing these requests to fail when
      // xhook is installed on a page.
    } else if (xhr.responseType === "document") {
      response.xml = xhr.responseXML;
      response.data = xhr.responseXML;
    } else {
      response.data = xhr.response;
    }
    //new in some browsers
    if ("responseURL" in xhr) {
      response.finalUrl = xhr.responseURL;
    }
  };

  //write response into facade xhr
  const writeHead = function() {
    facade.status = response.status;
    facade.statusText = response.statusText;
  };

  const writeBody = function() {
    if ("text" in response) {
      facade.responseText = response.text;
    }
    if ("xml" in response) {
      facade.responseXML = response.xml;
    }
    if ("data" in response) {
      facade.response = response.data;
    }
    if ("finalUrl" in response) {
      facade.responseURL = response.finalUrl;
    }
  };

  const emitFinal = function() {
    if (!hasError) {
      facade.dispatchEvent("load", {});
    }
    facade.dispatchEvent("loadend", {});
    if (hasError) {
      facade.readyState = 0;
    }
  };

  //ensure ready state 0 through 4 is handled
  const emitReadyState = function(n) {
    while (n > currentState && currentState < 4) {
      facade.readyState = ++currentState;
      // make fake events for libraries that actually check the type on
      // the event object
      if (currentState === 1) {
        facade.dispatchEvent("loadstart", {});
      }
      if (currentState === 2) {
        writeHead();
      }
      if (currentState === 4) {
        writeHead();
        writeBody();
      }
      facade.dispatchEvent("readystatechange", {});
      //delay final events incase of error
      if (currentState === 4) {
        if (request.async === false) {
          emitFinal();
        } else {
          setTimeout(emitFinal, 0);
        }
      }
    }
  };

  //control facade ready state
  const setReadyState = function(n) {
    //emit events until readyState reaches 4
    if (n !== 4) {
      emitReadyState(n);
      return;
    }
    //before emitting 4, run all 'after' hooks in sequence
    const afterHooks = hooks.listeners("after");
    var process = function() {
      if (afterHooks.length > 0) {
        //execute each 'before' hook one at a time
        const hook = afterHooks.shift();
        if (hook.length === 2) {
          hook(request, response);
          process();
        } else if (hook.length === 3 && request.async) {
          hook(request, response, process);
        } else {
          process();
        }
      } else {
        //response ready for reading
        emitReadyState(4);
      }
      return;
    };
    process();
  };

  //==========================
  // Facade XHR
  var facade = EventEmitter();
  request.xhr = facade;

  // Handle the underlying ready state
  xhr.onreadystatechange = function(event) {
    //pull status and headers
    try {
      if (xhr.readyState === 2) {
        readHead();
      }
    } catch (error) {}
    //pull response data
    if (xhr.readyState === 4) {
      transiting = false;
      readHead();
      readBody();
    }

    setReadyState(xhr.readyState);
  };

  //mark this xhr as errored
  const hasErrorHandler = function() {
    hasError = true;
  };
  facade.addEventListener("error", hasErrorHandler);
  facade.addEventListener("timeout", hasErrorHandler);
  facade.addEventListener("abort", hasErrorHandler);
  // progress means we're current downloading...
  facade.addEventListener("progress", function(event) {
    if (currentState < 3) {
      setReadyState(3);
    } else if (xhr.readyState <= 3) {
      //until ready (4), each progress event is followed by readystatechange...
      facade.dispatchEvent("readystatechange", {}); //TODO fake an XHR event
    }
  });

  // initialise 'withCredentials' on facade xhr in browsers with it
  // or if explicitly told to do so
  if ("withCredentials" in xhr) {
    facade.withCredentials = false;
  }
  facade.status = 0;

  // initialise all possible event handlers
  for (let event of Array.from(COMMON_EVENTS.concat(UPLOAD_EVENTS))) {
    facade[`on${event}`] = null;
  }

  facade.open = function(method, url, async, user, pass) {
    // Initailize empty XHR facade
    currentState = 0;
    hasError = false;
    transiting = false;
    //reset request
    request.headers = {};
    request.headerNames = {};
    request.status = 0;
    request.method = method;
    request.url = url;
    request.async = async !== false;
    request.user = user;
    request.pass = pass;
    //reset response
    response = {};
    response.headers = {};
    // openned facade xhr (not real xhr)
    setReadyState(1);
  };

  facade.send = function(body) {
    //read xhr settings before hooking
    let k, modk;
    for (k of ["type", "timeout", "withCredentials"]) {
      modk = k === "type" ? "responseType" : k;
      if (modk in facade) {
        request[k] = facade[modk];
      }
    }

    request.body = body;
    const send = function() {
      //proxy all events from real xhr to facade
      proxyEvents(COMMON_EVENTS, xhr, facade);
      //proxy all upload events from the real to the upload facade
      if (facade.upload) {
        proxyEvents(
          COMMON_EVENTS.concat(UPLOAD_EVENTS),
          xhr.upload,
          facade.upload
        );
      }

      //prepare request all at once
      transiting = true;
      //perform open
      xhr.open(
        request.method,
        request.url,
        request.async,
        request.user,
        request.pass
      );

      //write xhr settings
      for (k of ["type", "timeout", "withCredentials"]) {
        modk = k === "type" ? "responseType" : k;
        if (k in request) {
          xhr[modk] = request[k];
        }
      }

      //insert headers
      for (let header in request.headers) {
        const value = request.headers[header];
        if (header) {
          xhr.setRequestHeader(header, value);
        }
      }
      //real send!
      xhr.send(request.body);
    };

    const beforeHooks = hooks.listeners("before");
    //process beforeHooks sequentially
    var process = function() {
      if (!beforeHooks.length) {
        return send();
      }
      //go to next hook OR optionally provide response
      const done = function(userResponse) {
        //break chain - provide dummy response (readyState 4)
        if (
          typeof userResponse === "object" &&
          (typeof userResponse.status === "number" ||
            typeof response.status === "number")
        ) {
          mergeObjects(userResponse, response);
          if (!("data" in userResponse)) {
            userResponse.data = userResponse.response || userResponse.text;
          }
          setReadyState(4);
          return;
        }
        //continue processing until no beforeHooks left
        process();
      };
      //specifically provide headers (readyState 2)
      done.head = function(userResponse) {
        mergeObjects(userResponse, response);
        setReadyState(2);
      };
      //specifically provide partial text (responseText  readyState 3)
      done.progress = function(userResponse) {
        mergeObjects(userResponse, response);
        setReadyState(3);
      };

      const hook = beforeHooks.shift();
      //async or sync?
      if (hook.length === 1) {
        done(hook(request));
      } else if (hook.length === 2 && request.async) {
        //async handlers must use an async xhr
        hook(request, done);
      } else {
        //skip async hook on sync requests
        done();
      }
      return;
    };
    //kick off
    process();
  };

  facade.abort = function() {
    status = ABORTED;
    if (transiting) {
      xhr.abort(); //this will emit an 'abort' for us
    } else {
      facade.dispatchEvent("abort", {});
    }
  };

  facade.setRequestHeader = function(header, value) {
    //the first header set is used for all future case-alternatives of 'name'
    const lName = header != null ? header.toLowerCase() : undefined;
    const name = (request.headerNames[lName] =
      request.headerNames[lName] || header);
    //append header to any previous values
    if (request.headers[name]) {
      value = request.headers[name] + ", " + value;
    }
    request.headers[name] = value;
  };
  facade.getResponseHeader = header =>
    nullify(response.headers[header ? header.toLowerCase() : undefined]);

  facade.getAllResponseHeaders = () =>
    nullify(headers.convert(response.headers));

  //proxy call only when supported
  if (xhr.overrideMimeType) {
    facade.overrideMimeType = function() {
      xhr.overrideMimeType.apply(xhr, arguments);
    };
  }

  //create emitter when supported
  if (xhr.upload) {
    let up = EventEmitter();
    facade.upload = up;
    request.upload = up;
  }

  facade.UNSENT = 0;
  facade.OPENED = 1;
  facade.HEADERS_RECEIVED = 2;
  facade.LOADING = 3;
  facade.DONE = 4;

  // fill in default values for an empty XHR object according to the spec
  facade.response = "";
  facade.responseText = "";
  facade.responseXML = null;
  facade.readyState = 0;
  facade.statusText = "";

  return facade;
};

Xhook$1.UNSENT = 0;
Xhook$1.OPENED = 1;
Xhook$1.HEADERS_RECEIVED = 2;
Xhook$1.LOADING = 3;
Xhook$1.DONE = 4;

//patch interface
var XMLHttpRequest = {
  patch() {
    if (Native$1) {
      windowRef.XMLHttpRequest = Xhook$1;
    }
  },
  unpatch() {
    if (Native$1) {
      windowRef.XMLHttpRequest = Native$1;
    }
  },
  Native: Native$1,
  Xhook: Xhook$1
};

//browser's fetch
const Native = windowRef.fetch;

//xhook's fetch
const Xhook = function(url, options) {
  if (options == null) {
    options = { headers: {} };
  }

  let request = null;

  if (url instanceof Request) {
    request = url;
  } else {
    options.url = url;
  }

  const beforeHooks = hooks.listeners("before");
  const afterHooks = hooks.listeners("after");

  return new Promise(function(resolve, reject) {
    let fullfiled = resolve;
    const getRequest = function() {
      if (options.headers) {
        options.headers = new Headers(options.headers);
      }

      if (!request) {
        request = new Request(options.url, options);
      }

      return mergeObjects(options, request);
    };

    var processAfter = function(response) {
      if (!afterHooks.length) {
        return fullfiled(response);
      }

      const hook = afterHooks.shift();

      if (hook.length === 2) {
        hook(getRequest(), response);
        return processAfter(response);
      } else if (hook.length === 3) {
        return hook(getRequest(), response, processAfter);
      } else {
        return processAfter(response);
      }
    };

    const done = function(userResponse) {
      if (userResponse !== undefined) {
        const response = new Response(
          userResponse.body || userResponse.text,
          userResponse
        );
        resolve(response);
        processAfter(response);
        return;
      }

      //continue processing until no hooks left
      processBefore();
    };

    var processBefore = function() {
      if (!beforeHooks.length) {
        send();
        return;
      }

      const hook = beforeHooks.shift();

      if (hook.length === 1) {
        return done(hook(options));
      } else if (hook.length === 2) {
        return hook(getRequest(), done);
      }
    };

    var send = () =>
      Native(getRequest())
        .then(response => processAfter(response))
        .catch(function(err) {
          fullfiled = reject;
          processAfter(err);
          return reject(err);
        });

    processBefore();
  });
};

//patch interface
var fetch = {
  patch() {
    if (Native) {
      windowRef.fetch = Xhook;
    }
  },
  unpatch() {
    if (Native) {
      windowRef.fetch = Native;
    }
  },
  Native,
  Xhook
};

//the global hooks event emitter is also the global xhook object
//(not the best decision in hindsight)
const xhook = hooks;
xhook.EventEmitter = EventEmitter;
//modify hooks
xhook.before = function(handler, i) {
  if (handler.length < 1 || handler.length > 2) {
    throw "invalid hook";
  }
  return xhook.on("before", handler, i);
};
xhook.after = function(handler, i) {
  if (handler.length < 2 || handler.length > 3) {
    throw "invalid hook";
  }
  return xhook.on("after", handler, i);
};

//globally enable/disable
xhook.enable = function() {
  XMLHttpRequest.patch();
  fetch.patch();
};
xhook.disable = function() {
  XMLHttpRequest.unpatch();
  fetch.unpatch();
};
//expose native objects
xhook.XMLHttpRequest = XMLHttpRequest.Native;
xhook.fetch = fetch.Native;

//expose helpers
xhook.headers = headers.convert;

//enable by default
xhook.enable();



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/inject.ts":
/*!***********************!*\
  !*** ./src/inject.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xhook_1 = __importDefault(__webpack_require__(/*! xhook */ "./node_modules/xhook/es/main.js"));
const query_string_1 = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
const idFactory_1 = __importDefault(__webpack_require__(/*! ./services/idFactory */ "./src/services/idFactory.ts"));
const messageBus_1 = __importDefault(__webpack_require__(/*! ./services/message/messageBus */ "./src/services/message/messageBus.ts"));
const helper_1 = __webpack_require__(/*! ./services/helper */ "./src/services/helper.ts");
const message_1 = __importDefault(__webpack_require__(/*! ./services/message */ "./src/services/message/index.ts"));
const messageBus = new messageBus_1.default();
const messageIdFactory = new idFactory_1.default();
const logIdFactory = new idFactory_1.default();
message_1.default.listen("HOOK", (data) => {
    messageBus.dispatch(data.id, data.message);
});
/**
 * Promisify post message from window to window
 * ackRequired, if false, no id will be assigned hence, no method will be added in message
 * message id was not the problem but function in message bus was
 */
const postMessage = (message, type, ackRequired) => {
    const messageId = ackRequired ? messageIdFactory.getId() : null;
    const messageObject = {
        id: messageId,
        message,
        to: "CONTENT",
        from: "HOOK",
        extensionName: "MOKKU",
        type,
    };
    message_1.default.send(messageObject);
    if (messageId !== null) {
        return new Promise((reslove) => {
            messageBus.addLister(messageId, reslove);
        });
    }
};
xhook_1.default.before(function (request, callback) {
    const separator = request.url.indexOf("?");
    const url = separator !== -1 ? request.url.substr(0, separator) : request.url;
    const queryParams = separator !== -1
        ? JSON.stringify((0, query_string_1.parse)(request.url.substr(separator)))
        : undefined;
    request.mokku = {
        id: logIdFactory.getId(),
    };
    const data = getLog(request);
    postMessage(data, "LOG", false);
    postMessage(data, "NOTIFICATION", true)
        .then((data) => {
        if (data && data.mockResponse) {
            const mock = data.mockResponse;
            const headers = mock.headers
                ? mock.headers.reduce((final, header) => {
                    final[header.name] = header.value;
                    return final;
                }, {})
                : {
                    "content-type": "application/json; charset=UTF-8",
                };
            const finalResponse = {
                status: mock.status,
                text: mock.response ? mock.response : "",
                headers,
                type: "json",
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
        ? JSON.stringify((0, query_string_1.parse)(request.url.substr(separator)))
        : undefined;
    let body = request.body;
    try {
        if (typeof body === "object") {
            const stringifiedBody = JSON.stringify(body);
            body = stringifiedBody;
        }
    }
    catch (e) {
        body = "Unsupported body type!";
    }
    return {
        request: {
            url,
            body,
            queryParams,
            method: request.method,
            headers: (0, helper_1.getHeaders)(request.headers),
        },
        response,
        id: (_a = request.mokku) === null || _a === void 0 ? void 0 : _a.id,
    };
};
xhook_1.default.after(function (request, originalResponse) {
    try {
        if (typeof originalResponse.clone === "function") {
            const response = originalResponse.clone();
            if (typeof response.text === "string") {
                const data = getLog(request, {
                    status: response.status,
                    response: response.text,
                    headers: (0, helper_1.getHeaders)(response.headers),
                });
                postMessage(data, "LOG", false);
            }
            else {
                response.text().then((streamedResponse) => {
                    const data = getLog(request, {
                        status: response.status,
                        response: streamedResponse,
                        headers: (0, helper_1.getHeaders)(response.headers),
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
                headers: (0, helper_1.getHeaders)(originalResponse.headers),
            });
            postMessage(data, "LOG", false);
        }
    }
    catch (error) {
        const data = getLog(request, {
            status: 0,
            response: undefined,
            headers: [],
        });
        postMessage(data, "LOG", false);
        console.log("INJECT_ERROR", error);
    }
});


/***/ }),

/***/ "./src/services/helper.ts":
/*!********************************!*\
  !*** ./src/services/helper.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeaders = exports.getError = exports.isValidJSON = void 0;
const isValidJSON = (json) => {
    try {
        JSON.parse(json);
        return { error: undefined };
    }
    catch (e) {
        let position = undefined;
        let lineNumber = undefined;
        const jsonErrorRegex = new RegExp(/(?<=\bposition\s)(\w+)/g);
        const stringifiedError = e.toString();
        if (stringifiedError !== "Unexpected end of JSON input") {
            const x = jsonErrorRegex.exec(stringifiedError);
            position = x && x.length > 0 ? parseInt(x[0], 10) : undefined;
            if (position) {
                lineNumber = 1;
                for (let i = 0; i < json.length; i++) {
                    if (i === position) {
                        break;
                    }
                    if (json[i] === "\n") {
                        lineNumber++;
                    }
                }
            }
            jsonErrorRegex.lastIndex = 0;
        }
        return {
            error: `${stringifiedError}${lineNumber ? " and at line number " + lineNumber : ""}`,
            position,
            lineNumber,
        };
    }
};
exports.isValidJSON = isValidJSON;
const getError = (errors) => {
    const keys = Object.keys(errors);
    if (keys.length === 0) {
        return;
    }
    else {
        return errors[keys[0]];
    }
};
exports.getError = getError;
const getHeaders = (headers) => {
    return Object.keys(headers).map((name) => ({
        name,
        value: headers[name],
    }));
};
exports.getHeaders = getHeaders;


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

/***/ "./src/services/message/index.ts":
/*!***************************************!*\
  !*** ./src/services/message/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * Inject
 *     -> Content Script
 *
 * Content script is bridge between panel and inject for communication
 * as it has both windows event listern and chrome runtime message listner
 * Content Script
 *     -> Panel
 *     -> Hook
 *
 * Panel
 *     -> Content Script
 */
const tunnelMap = {
    "HOOK:CONTENT": "window",
    "CONTENT:HOOK": "window",
    "CONTENT:PANEL": "tab",
    "PANEL:CONTENT": "runtime",
};
const send = (props, tabId) => {
    const path = tunnelMap[`${props.to}:${props.from}`];
    const service = {
        window: () => window.postMessage(Object.assign(Object.assign({}, props), { extensionName: "MOKKU" }), "*"),
        runtime: () => chrome.runtime.sendMessage(Object.assign(Object.assign({}, props), { extensionName: "MOKKU" })),
        tab: () => {
            chrome.tabs.sendMessage(tabId, props);
        },
    };
    service[path](props);
};
const listen = (entity, callback) => {
    const service = {
        runtime: () => {
            chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
                if (message.to !== entity)
                    return;
                callback(message, _sender, sendResponse);
            });
        },
        window: () => {
            window.addEventListener("message", (event) => {
                // We only accept messages from ourselves
                if (event.source !== window)
                    return;
                const data = event.data;
                if (data.to !== entity)
                    return;
                callback(data);
            });
        },
    };
    switch (entity) {
        case "HOOK": {
            service["window"]();
            return;
        }
        case "CONTENT": {
            service["window"]();
            service["runtime"]();
            return;
        }
        case "PANEL": {
            service["runtime"]();
            return;
        }
    }
};
exports.default = { send, listen };


/***/ }),

/***/ "./src/services/message/messageBus.ts":
/*!********************************************!*\
  !*** ./src/services/message/messageBus.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class MessageBus {
    constructor() {
        this._collector = {};
        this._defaultListner = console.log;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlY29kZS11cmktY29tcG9uZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9xdWVyeS1zdHJpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NwbGl0LW9uLWZpcnN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHJpY3QtdXJpLWVuY29kZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94aG9vay9lcy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2hlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvaWRGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9tZXNzYWdlL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9tZXNzYWdlL21lc3NhZ2VCdXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTtBQUNiLHVCQUF1QixFQUFFO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBLGlCQUFpQixtQkFBbUI7QUFDcEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3RmE7QUFDYix3QkFBd0IsbUJBQU8sQ0FBQyxvRUFBbUI7QUFDbkQsd0JBQXdCLG1CQUFPLENBQUMsMEVBQXNCO0FBQ3RELHFCQUFxQixtQkFBTyxDQUFDLDhEQUFnQjs7QUFFN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILHdEQUF3RCwwQ0FBMEM7QUFDbEc7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLHlEQUF5RCxZQUFZOztBQUVyRTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQzs7QUFFQTtBQUNBO0FBQ0EsYUFBYSwwQ0FBMEM7QUFDdkQ7O0FBRUEsV0FBVyxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUs7QUFDcEM7Ozs7Ozs7Ozs7Ozs7QUN6WGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDckJhO0FBQ2IsNkVBQTZFLDJDQUEyQzs7Ozs7Ozs7Ozs7O0FDRHhIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLE1BQU07QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELE1BQU07QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsS0FBSyxLQUFLLEVBQUU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlOztBQUVmO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGlEQUFpRCxFQUFFO0FBQ25EO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLEtBQUs7QUFDTCxzQ0FBc0M7QUFDdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFlBQVk7QUFDM0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUU0Qjs7Ozs7Ozs7Ozs7Ozs7QUNqd0JmO0FBQ2I7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxnQ0FBZ0MsbUJBQU8sQ0FBQyw4Q0FBTztBQUMvQyx1QkFBdUIsbUJBQU8sQ0FBQywwREFBYztBQUM3QyxvQ0FBb0MsbUJBQU8sQ0FBQyx5REFBc0I7QUFDbEUscUNBQXFDLG1CQUFPLENBQUMsMkVBQStCO0FBQzVFLGlCQUFpQixtQkFBTyxDQUFDLG1EQUFtQjtBQUM1QyxrQ0FBa0MsbUJBQU8sQ0FBQywyREFBb0I7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsSUFBSTtBQUNyQjtBQUNBLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUM3Slk7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGlCQUFpQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQixFQUFFLHNEQUFzRDtBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyRGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1hhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFNBQVMsR0FBRyxXQUFXO0FBQ3JEO0FBQ0EsdUVBQXVFLFdBQVcseUJBQXlCO0FBQzNHLGdGQUFnRixXQUFXLHlCQUF5QjtBQUNwSDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7Ozs7Ozs7Ozs7Ozs7QUN0RU47QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbmplY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmplY3QudHNcIik7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9rZW4gPSAnJVthLWYwLTldezJ9JztcbnZhciBzaW5nbGVNYXRjaGVyID0gbmV3IFJlZ0V4cCh0b2tlbiwgJ2dpJyk7XG52YXIgbXVsdGlNYXRjaGVyID0gbmV3IFJlZ0V4cCgnKCcgKyB0b2tlbiArICcpKycsICdnaScpO1xuXG5mdW5jdGlvbiBkZWNvZGVDb21wb25lbnRzKGNvbXBvbmVudHMsIHNwbGl0KSB7XG5cdHRyeSB7XG5cdFx0Ly8gVHJ5IHRvIGRlY29kZSB0aGUgZW50aXJlIHN0cmluZyBmaXJzdFxuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoY29tcG9uZW50cy5qb2luKCcnKSk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIERvIG5vdGhpbmdcblx0fVxuXG5cdGlmIChjb21wb25lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdHJldHVybiBjb21wb25lbnRzO1xuXHR9XG5cblx0c3BsaXQgPSBzcGxpdCB8fCAxO1xuXG5cdC8vIFNwbGl0IHRoZSBhcnJheSBpbiAyIHBhcnRzXG5cdHZhciBsZWZ0ID0gY29tcG9uZW50cy5zbGljZSgwLCBzcGxpdCk7XG5cdHZhciByaWdodCA9IGNvbXBvbmVudHMuc2xpY2Uoc3BsaXQpO1xuXG5cdHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmNhbGwoW10sIGRlY29kZUNvbXBvbmVudHMobGVmdCksIGRlY29kZUNvbXBvbmVudHMocmlnaHQpKTtcbn1cblxuZnVuY3Rpb24gZGVjb2RlKGlucHV0KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChpbnB1dCk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdHZhciB0b2tlbnMgPSBpbnB1dC5tYXRjaChzaW5nbGVNYXRjaGVyKTtcblxuXHRcdGZvciAodmFyIGkgPSAxOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpbnB1dCA9IGRlY29kZUNvbXBvbmVudHModG9rZW5zLCBpKS5qb2luKCcnKTtcblxuXHRcdFx0dG9rZW5zID0gaW5wdXQubWF0Y2goc2luZ2xlTWF0Y2hlcik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGlucHV0O1xuXHR9XG59XG5cbmZ1bmN0aW9uIGN1c3RvbURlY29kZVVSSUNvbXBvbmVudChpbnB1dCkge1xuXHQvLyBLZWVwIHRyYWNrIG9mIGFsbCB0aGUgcmVwbGFjZW1lbnRzIGFuZCBwcmVmaWxsIHRoZSBtYXAgd2l0aCB0aGUgYEJPTWBcblx0dmFyIHJlcGxhY2VNYXAgPSB7XG5cdFx0JyVGRSVGRic6ICdcXHVGRkZEXFx1RkZGRCcsXG5cdFx0JyVGRiVGRSc6ICdcXHVGRkZEXFx1RkZGRCdcblx0fTtcblxuXHR2YXIgbWF0Y2ggPSBtdWx0aU1hdGNoZXIuZXhlYyhpbnB1dCk7XG5cdHdoaWxlIChtYXRjaCkge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBEZWNvZGUgYXMgYmlnIGNodW5rcyBhcyBwb3NzaWJsZVxuXHRcdFx0cmVwbGFjZU1hcFttYXRjaFswXV0gPSBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMF0pO1xuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlY29kZShtYXRjaFswXSk7XG5cblx0XHRcdGlmIChyZXN1bHQgIT09IG1hdGNoWzBdKSB7XG5cdFx0XHRcdHJlcGxhY2VNYXBbbWF0Y2hbMF1dID0gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdG1hdGNoID0gbXVsdGlNYXRjaGVyLmV4ZWMoaW5wdXQpO1xuXHR9XG5cblx0Ly8gQWRkIGAlQzJgIGF0IHRoZSBlbmQgb2YgdGhlIG1hcCB0byBtYWtlIHN1cmUgaXQgZG9lcyBub3QgcmVwbGFjZSB0aGUgY29tYmluYXRvciBiZWZvcmUgZXZlcnl0aGluZyBlbHNlXG5cdHJlcGxhY2VNYXBbJyVDMiddID0gJ1xcdUZGRkQnO1xuXG5cdHZhciBlbnRyaWVzID0gT2JqZWN0LmtleXMocmVwbGFjZU1hcCk7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Ly8gUmVwbGFjZSBhbGwgZGVjb2RlZCBjb21wb25lbnRzXG5cdFx0dmFyIGtleSA9IGVudHJpZXNbaV07XG5cdFx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoa2V5LCAnZycpLCByZXBsYWNlTWFwW2tleV0pO1xuXHR9XG5cblx0cmV0dXJuIGlucHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbmNvZGVkVVJJKSB7XG5cdGlmICh0eXBlb2YgZW5jb2RlZFVSSSAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBgZW5jb2RlZFVSSWAgdG8gYmUgb2YgdHlwZSBgc3RyaW5nYCwgZ290IGAnICsgdHlwZW9mIGVuY29kZWRVUkkgKyAnYCcpO1xuXHR9XG5cblx0dHJ5IHtcblx0XHRlbmNvZGVkVVJJID0gZW5jb2RlZFVSSS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcblxuXHRcdC8vIFRyeSB0aGUgYnVpbHQgaW4gZGVjb2RlciBmaXJzdFxuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZW5jb2RlZFVSSSk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIEZhbGxiYWNrIHRvIGEgbW9yZSBhZHZhbmNlZCBkZWNvZGVyXG5cdFx0cmV0dXJuIGN1c3RvbURlY29kZVVSSUNvbXBvbmVudChlbmNvZGVkVVJJKTtcblx0fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IHN0cmljdFVyaUVuY29kZSA9IHJlcXVpcmUoJ3N0cmljdC11cmktZW5jb2RlJyk7XG5jb25zdCBkZWNvZGVDb21wb25lbnQgPSByZXF1aXJlKCdkZWNvZGUtdXJpLWNvbXBvbmVudCcpO1xuY29uc3Qgc3BsaXRPbkZpcnN0ID0gcmVxdWlyZSgnc3BsaXQtb24tZmlyc3QnKTtcblxuY29uc3QgaXNOdWxsT3JVbmRlZmluZWQgPSB2YWx1ZSA9PiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBlbmNvZGVyRm9yQXJyYXlGb3JtYXQob3B0aW9ucykge1xuXHRzd2l0Y2ggKG9wdGlvbnMuYXJyYXlGb3JtYXQpIHtcblx0XHRjYXNlICdpbmRleCc6XG5cdFx0XHRyZXR1cm4ga2V5ID0+IChyZXN1bHQsIHZhbHVlKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gcmVzdWx0Lmxlbmd0aDtcblxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0dmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBOdWxsICYmIHZhbHVlID09PSBudWxsKSB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBFbXB0eVN0cmluZyAmJiB2YWx1ZSA9PT0gJycpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCAnWycsIGluZGV4LCAnXSddLmpvaW4oJycpXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFx0Li4ucmVzdWx0LFxuXHRcdFx0XHRcdFtlbmNvZGUoa2V5LCBvcHRpb25zKSwgJ1snLCBlbmNvZGUoaW5kZXgsIG9wdGlvbnMpLCAnXT0nLCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKCcnKVxuXHRcdFx0XHRdO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2JyYWNrZXQnOlxuXHRcdFx0cmV0dXJuIGtleSA9PiAocmVzdWx0LCB2YWx1ZSkgPT4ge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0dmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBOdWxsICYmIHZhbHVlID09PSBudWxsKSB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBFbXB0eVN0cmluZyAmJiB2YWx1ZSA9PT0gJycpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCAnW10nXS5qb2luKCcnKV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCAnW109JywgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbignJyldO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2NvbW1hJzpcblx0XHRjYXNlICdzZXBhcmF0b3InOlxuXHRcdFx0cmV0dXJuIGtleSA9PiAocmVzdWx0LCB2YWx1ZSkgPT4ge1xuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gW1tlbmNvZGUoa2V5LCBvcHRpb25zKSwgJz0nLCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKCcnKV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gW1tyZXN1bHQsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4ob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcildO1xuXHRcdFx0fTtcblxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4ga2V5ID0+IChyZXN1bHQsIHZhbHVlKSA9PiB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcE51bGwgJiYgdmFsdWUgPT09IG51bGwpIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcEVtcHR5U3RyaW5nICYmIHZhbHVlID09PSAnJylcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBlbmNvZGUoa2V5LCBvcHRpb25zKV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCAnPScsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4oJycpXTtcblx0XHRcdH07XG5cdH1cbn1cblxuZnVuY3Rpb24gcGFyc2VyRm9yQXJyYXlGb3JtYXQob3B0aW9ucykge1xuXHRsZXQgcmVzdWx0O1xuXG5cdHN3aXRjaCAob3B0aW9ucy5hcnJheUZvcm1hdCkge1xuXHRcdGNhc2UgJ2luZGV4Jzpcblx0XHRcdHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcblx0XHRcdFx0cmVzdWx0ID0gL1xcWyhcXGQqKVxcXSQvLmV4ZWMoa2V5KTtcblxuXHRcdFx0XHRrZXkgPSBrZXkucmVwbGFjZSgvXFxbXFxkKlxcXSQvLCAnJyk7XG5cblx0XHRcdFx0aWYgKCFyZXN1bHQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB7fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV1bcmVzdWx0WzFdXSA9IHZhbHVlO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2JyYWNrZXQnOlxuXHRcdFx0cmV0dXJuIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikgPT4ge1xuXHRcdFx0XHRyZXN1bHQgPSAvKFxcW1xcXSkkLy5leGVjKGtleSk7XG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC9cXFtcXF0kLywgJycpO1xuXG5cdFx0XHRcdGlmICghcmVzdWx0KSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChhY2N1bXVsYXRvcltrZXldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gW3ZhbHVlXTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gW10uY29uY2F0KGFjY3VtdWxhdG9yW2tleV0sIHZhbHVlKTtcblx0XHRcdH07XG5cblx0XHRjYXNlICdjb21tYSc6XG5cdFx0Y2FzZSAnc2VwYXJhdG9yJzpcblx0XHRcdHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcblx0XHRcdFx0Y29uc3QgaXNBcnJheSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUuc3BsaXQoJycpLmluZGV4T2Yob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcikgPiAtMTtcblx0XHRcdFx0Y29uc3QgbmV3VmFsdWUgPSBpc0FycmF5ID8gdmFsdWUuc3BsaXQob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcikubWFwKGl0ZW0gPT4gZGVjb2RlKGl0ZW0sIG9wdGlvbnMpKSA6IHZhbHVlID09PSBudWxsID8gdmFsdWUgOiBkZWNvZGUodmFsdWUsIG9wdGlvbnMpO1xuXHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gbmV3VmFsdWU7XG5cdFx0XHR9O1xuXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcblx0XHRcdFx0aWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gW10uY29uY2F0KGFjY3VtdWxhdG9yW2tleV0sIHZhbHVlKTtcblx0XHRcdH07XG5cdH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVBcnJheUZvcm1hdFNlcGFyYXRvcih2YWx1ZSkge1xuXHRpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyB8fCB2YWx1ZS5sZW5ndGggIT09IDEpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdhcnJheUZvcm1hdFNlcGFyYXRvciBtdXN0IGJlIHNpbmdsZSBjaGFyYWN0ZXIgc3RyaW5nJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gZW5jb2RlKHZhbHVlLCBvcHRpb25zKSB7XG5cdGlmIChvcHRpb25zLmVuY29kZSkge1xuXHRcdHJldHVybiBvcHRpb25zLnN0cmljdCA/IHN0cmljdFVyaUVuY29kZSh2YWx1ZSkgOiBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBkZWNvZGUodmFsdWUsIG9wdGlvbnMpIHtcblx0aWYgKG9wdGlvbnMuZGVjb2RlKSB7XG5cdFx0cmV0dXJuIGRlY29kZUNvbXBvbmVudCh2YWx1ZSk7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGtleXNTb3J0ZXIoaW5wdXQpIHtcblx0aWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG5cdFx0cmV0dXJuIGlucHV0LnNvcnQoKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIGtleXNTb3J0ZXIoT2JqZWN0LmtleXMoaW5wdXQpKVxuXHRcdFx0LnNvcnQoKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKSlcblx0XHRcdC5tYXAoa2V5ID0+IGlucHV0W2tleV0pO1xuXHR9XG5cblx0cmV0dXJuIGlucHV0O1xufVxuXG5mdW5jdGlvbiByZW1vdmVIYXNoKGlucHV0KSB7XG5cdGNvbnN0IGhhc2hTdGFydCA9IGlucHV0LmluZGV4T2YoJyMnKTtcblx0aWYgKGhhc2hTdGFydCAhPT0gLTEpIHtcblx0XHRpbnB1dCA9IGlucHV0LnNsaWNlKDAsIGhhc2hTdGFydCk7XG5cdH1cblxuXHRyZXR1cm4gaW5wdXQ7XG59XG5cbmZ1bmN0aW9uIGdldEhhc2godXJsKSB7XG5cdGxldCBoYXNoID0gJyc7XG5cdGNvbnN0IGhhc2hTdGFydCA9IHVybC5pbmRleE9mKCcjJyk7XG5cdGlmIChoYXNoU3RhcnQgIT09IC0xKSB7XG5cdFx0aGFzaCA9IHVybC5zbGljZShoYXNoU3RhcnQpO1xuXHR9XG5cblx0cmV0dXJuIGhhc2g7XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3QoaW5wdXQpIHtcblx0aW5wdXQgPSByZW1vdmVIYXNoKGlucHV0KTtcblx0Y29uc3QgcXVlcnlTdGFydCA9IGlucHV0LmluZGV4T2YoJz8nKTtcblx0aWYgKHF1ZXJ5U3RhcnQgPT09IC0xKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0cmV0dXJuIGlucHV0LnNsaWNlKHF1ZXJ5U3RhcnQgKyAxKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VWYWx1ZSh2YWx1ZSwgb3B0aW9ucykge1xuXHRpZiAob3B0aW9ucy5wYXJzZU51bWJlcnMgJiYgIU51bWJlci5pc05hTihOdW1iZXIodmFsdWUpKSAmJiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS50cmltKCkgIT09ICcnKSkge1xuXHRcdHZhbHVlID0gTnVtYmVyKHZhbHVlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLnBhcnNlQm9vbGVhbnMgJiYgdmFsdWUgIT09IG51bGwgJiYgKHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJyB8fCB2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSAnZmFsc2UnKSkge1xuXHRcdHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBwYXJzZShpbnB1dCwgb3B0aW9ucykge1xuXHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0ZGVjb2RlOiB0cnVlLFxuXHRcdHNvcnQ6IHRydWUsXG5cdFx0YXJyYXlGb3JtYXQ6ICdub25lJyxcblx0XHRhcnJheUZvcm1hdFNlcGFyYXRvcjogJywnLFxuXHRcdHBhcnNlTnVtYmVyczogZmFsc2UsXG5cdFx0cGFyc2VCb29sZWFuczogZmFsc2Vcblx0fSwgb3B0aW9ucyk7XG5cblx0dmFsaWRhdGVBcnJheUZvcm1hdFNlcGFyYXRvcihvcHRpb25zLmFycmF5Rm9ybWF0U2VwYXJhdG9yKTtcblxuXHRjb25zdCBmb3JtYXR0ZXIgPSBwYXJzZXJGb3JBcnJheUZvcm1hdChvcHRpb25zKTtcblxuXHQvLyBDcmVhdGUgYW4gb2JqZWN0IHdpdGggbm8gcHJvdG90eXBlXG5cdGNvbnN0IHJldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cblx0aWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0aW5wdXQgPSBpbnB1dC50cmltKCkucmVwbGFjZSgvXls/IyZdLywgJycpO1xuXG5cdGlmICghaW5wdXQpIHtcblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0Zm9yIChjb25zdCBwYXJhbSBvZiBpbnB1dC5zcGxpdCgnJicpKSB7XG5cdFx0bGV0IFtrZXksIHZhbHVlXSA9IHNwbGl0T25GaXJzdChvcHRpb25zLmRlY29kZSA/IHBhcmFtLnJlcGxhY2UoL1xcKy9nLCAnICcpIDogcGFyYW0sICc9Jyk7XG5cblx0XHQvLyBNaXNzaW5nIGA9YCBzaG91bGQgYmUgYG51bGxgOlxuXHRcdC8vIGh0dHA6Ly93My5vcmcvVFIvMjAxMi9XRC11cmwtMjAxMjA1MjQvI2NvbGxlY3QtdXJsLXBhcmFtZXRlcnNcblx0XHR2YWx1ZSA9IHZhbHVlID09PSB1bmRlZmluZWQgPyBudWxsIDogWydjb21tYScsICdzZXBhcmF0b3InXS5pbmNsdWRlcyhvcHRpb25zLmFycmF5Rm9ybWF0KSA/IHZhbHVlIDogZGVjb2RlKHZhbHVlLCBvcHRpb25zKTtcblx0XHRmb3JtYXR0ZXIoZGVjb2RlKGtleSwgb3B0aW9ucyksIHZhbHVlLCByZXQpO1xuXHR9XG5cblx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocmV0KSkge1xuXHRcdGNvbnN0IHZhbHVlID0gcmV0W2tleV07XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGwpIHtcblx0XHRcdGZvciAoY29uc3QgayBvZiBPYmplY3Qua2V5cyh2YWx1ZSkpIHtcblx0XHRcdFx0dmFsdWVba10gPSBwYXJzZVZhbHVlKHZhbHVlW2tdLCBvcHRpb25zKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0W2tleV0gPSBwYXJzZVZhbHVlKHZhbHVlLCBvcHRpb25zKTtcblx0XHR9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zb3J0ID09PSBmYWxzZSkge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRyZXR1cm4gKG9wdGlvbnMuc29ydCA9PT0gdHJ1ZSA/IE9iamVjdC5rZXlzKHJldCkuc29ydCgpIDogT2JqZWN0LmtleXMocmV0KS5zb3J0KG9wdGlvbnMuc29ydCkpLnJlZHVjZSgocmVzdWx0LCBrZXkpID0+IHtcblx0XHRjb25zdCB2YWx1ZSA9IHJldFtrZXldO1xuXHRcdGlmIChCb29sZWFuKHZhbHVlKSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0Ly8gU29ydCBvYmplY3Qga2V5cywgbm90IHZhbHVlc1xuXHRcdFx0cmVzdWx0W2tleV0gPSBrZXlzU29ydGVyKHZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0W2tleV0gPSB2YWx1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LCBPYmplY3QuY3JlYXRlKG51bGwpKTtcbn1cblxuZXhwb3J0cy5leHRyYWN0ID0gZXh0cmFjdDtcbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcblxuZXhwb3J0cy5zdHJpbmdpZnkgPSAob2JqZWN0LCBvcHRpb25zKSA9PiB7XG5cdGlmICghb2JqZWN0KSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdGVuY29kZTogdHJ1ZSxcblx0XHRzdHJpY3Q6IHRydWUsXG5cdFx0YXJyYXlGb3JtYXQ6ICdub25lJyxcblx0XHRhcnJheUZvcm1hdFNlcGFyYXRvcjogJywnXG5cdH0sIG9wdGlvbnMpO1xuXG5cdHZhbGlkYXRlQXJyYXlGb3JtYXRTZXBhcmF0b3Iob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcik7XG5cblx0Y29uc3Qgc2hvdWxkRmlsdGVyID0ga2V5ID0+IChcblx0XHQob3B0aW9ucy5za2lwTnVsbCAmJiBpc051bGxPclVuZGVmaW5lZChvYmplY3Rba2V5XSkpIHx8XG5cdFx0KG9wdGlvbnMuc2tpcEVtcHR5U3RyaW5nICYmIG9iamVjdFtrZXldID09PSAnJylcblx0KTtcblxuXHRjb25zdCBmb3JtYXR0ZXIgPSBlbmNvZGVyRm9yQXJyYXlGb3JtYXQob3B0aW9ucyk7XG5cblx0Y29uc3Qgb2JqZWN0Q29weSA9IHt9O1xuXG5cdGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iamVjdCkpIHtcblx0XHRpZiAoIXNob3VsZEZpbHRlcihrZXkpKSB7XG5cdFx0XHRvYmplY3RDb3B5W2tleV0gPSBvYmplY3Rba2V5XTtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0Q29weSk7XG5cblx0aWYgKG9wdGlvbnMuc29ydCAhPT0gZmFsc2UpIHtcblx0XHRrZXlzLnNvcnQob3B0aW9ucy5zb3J0KTtcblx0fVxuXG5cdHJldHVybiBrZXlzLm1hcChrZXkgPT4ge1xuXHRcdGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV07XG5cblx0XHRpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGVuY29kZShrZXksIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0XHRcdC5yZWR1Y2UoZm9ybWF0dGVyKGtleSksIFtdKVxuXHRcdFx0XHQuam9pbignJicpO1xuXHRcdH1cblxuXHRcdHJldHVybiBlbmNvZGUoa2V5LCBvcHRpb25zKSArICc9JyArIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyk7XG5cdH0pLmZpbHRlcih4ID0+IHgubGVuZ3RoID4gMCkuam9pbignJicpO1xufTtcblxuZXhwb3J0cy5wYXJzZVVybCA9IChpbnB1dCwgb3B0aW9ucykgPT4ge1xuXHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0ZGVjb2RlOiB0cnVlXG5cdH0sIG9wdGlvbnMpO1xuXG5cdGNvbnN0IFt1cmwsIGhhc2hdID0gc3BsaXRPbkZpcnN0KGlucHV0LCAnIycpO1xuXG5cdHJldHVybiBPYmplY3QuYXNzaWduKFxuXHRcdHtcblx0XHRcdHVybDogdXJsLnNwbGl0KCc/JylbMF0gfHwgJycsXG5cdFx0XHRxdWVyeTogcGFyc2UoZXh0cmFjdChpbnB1dCksIG9wdGlvbnMpXG5cdFx0fSxcblx0XHRvcHRpb25zICYmIG9wdGlvbnMucGFyc2VGcmFnbWVudElkZW50aWZpZXIgJiYgaGFzaCA/IHtmcmFnbWVudElkZW50aWZpZXI6IGRlY29kZShoYXNoLCBvcHRpb25zKX0gOiB7fVxuXHQpO1xufTtcblxuZXhwb3J0cy5zdHJpbmdpZnlVcmwgPSAoaW5wdXQsIG9wdGlvbnMpID0+IHtcblx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdGVuY29kZTogdHJ1ZSxcblx0XHRzdHJpY3Q6IHRydWVcblx0fSwgb3B0aW9ucyk7XG5cblx0Y29uc3QgdXJsID0gcmVtb3ZlSGFzaChpbnB1dC51cmwpLnNwbGl0KCc/JylbMF0gfHwgJyc7XG5cdGNvbnN0IHF1ZXJ5RnJvbVVybCA9IGV4cG9ydHMuZXh0cmFjdChpbnB1dC51cmwpO1xuXHRjb25zdCBwYXJzZWRRdWVyeUZyb21VcmwgPSBleHBvcnRzLnBhcnNlKHF1ZXJ5RnJvbVVybCwge3NvcnQ6IGZhbHNlfSk7XG5cblx0Y29uc3QgcXVlcnkgPSBPYmplY3QuYXNzaWduKHBhcnNlZFF1ZXJ5RnJvbVVybCwgaW5wdXQucXVlcnkpO1xuXHRsZXQgcXVlcnlTdHJpbmcgPSBleHBvcnRzLnN0cmluZ2lmeShxdWVyeSwgb3B0aW9ucyk7XG5cdGlmIChxdWVyeVN0cmluZykge1xuXHRcdHF1ZXJ5U3RyaW5nID0gYD8ke3F1ZXJ5U3RyaW5nfWA7XG5cdH1cblxuXHRsZXQgaGFzaCA9IGdldEhhc2goaW5wdXQudXJsKTtcblx0aWYgKGlucHV0LmZyYWdtZW50SWRlbnRpZmllcikge1xuXHRcdGhhc2ggPSBgIyR7ZW5jb2RlKGlucHV0LmZyYWdtZW50SWRlbnRpZmllciwgb3B0aW9ucyl9YDtcblx0fVxuXG5cdHJldHVybiBgJHt1cmx9JHtxdWVyeVN0cmluZ30ke2hhc2h9YDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gKHN0cmluZywgc2VwYXJhdG9yKSA9PiB7XG5cdGlmICghKHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBzZXBhcmF0b3IgPT09ICdzdHJpbmcnKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBhcmd1bWVudHMgdG8gYmUgb2YgdHlwZSBgc3RyaW5nYCcpO1xuXHR9XG5cblx0aWYgKHNlcGFyYXRvciA9PT0gJycpIHtcblx0XHRyZXR1cm4gW3N0cmluZ107XG5cdH1cblxuXHRjb25zdCBzZXBhcmF0b3JJbmRleCA9IHN0cmluZy5pbmRleE9mKHNlcGFyYXRvcik7XG5cblx0aWYgKHNlcGFyYXRvckluZGV4ID09PSAtMSkge1xuXHRcdHJldHVybiBbc3RyaW5nXTtcblx0fVxuXG5cdHJldHVybiBbXG5cdFx0c3RyaW5nLnNsaWNlKDAsIHNlcGFyYXRvckluZGV4KSxcblx0XHRzdHJpbmcuc2xpY2Uoc2VwYXJhdG9ySW5kZXggKyBzZXBhcmF0b3IubGVuZ3RoKVxuXHRdO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gc3RyID0+IGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpKl0vZywgeCA9PiBgJSR7eC5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpfWApO1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiLy9pZiByZXF1aXJlZCwgYWRkICdpbmRleE9mJyBtZXRob2QgdG8gQXJyYXlcbmlmICghQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIHtcbiAgQXJyYXkucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB4ID0gdGhpc1tpXTtcbiAgICAgIGlmICh4ID09PSBpdGVtKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH07XG59XG5cbmNvbnN0IHNsaWNlID0gKG8sIG4pID0+IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG8sIG4pO1xuXG5sZXQgcmVzdWx0ID0gbnVsbDtcblxuLy9maW5kIGdsb2JhbCBvYmplY3RcbmlmIChcbiAgdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSBcInVuZGVmaW5lZFwiICYmXG4gIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZVxuKSB7XG4gIHJlc3VsdCA9IHNlbGY7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgcmVzdWx0ID0gZ2xvYmFsO1xufSBlbHNlIGlmICh3aW5kb3cpIHtcbiAgcmVzdWx0ID0gd2luZG93O1xufVxuXG4vL2ZpbmQgSUUgdmVyc2lvblxuY29uc3QgdXNlcmFnZW50ID1cbiAgdHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIiAmJiBuYXZpZ2F0b3JbXCJ1c2VyYWdlbnRcIl1cbiAgICA/IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgICA6IFwiXCI7XG5cbmxldCBtc2llID0gbnVsbDtcbmlmIChcbiAgL21zaWUgKFxcZCspLy50ZXN0KHVzZXJhZ2VudC50b0xvd2VyQ2FzZSgpKSB8fFxuICAvdHJpZGVudFxcLy4qOyBydjooXFxkKykvLnRlc3QodXNlcmFnZW50LnRvTG93ZXJDYXNlKCkpXG4pIHtcbiAgbXNpZSA9IHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApO1xufVxuXG5jb25zdCB3aW5kb3dSZWYgPSByZXN1bHQ7XG5jb25zdCBkb2N1bWVudFJlZiA9IHJlc3VsdC5kb2N1bWVudDtcblxuY29uc3QgVVBMT0FEX0VWRU5UUyA9IFtcImxvYWRcIiwgXCJsb2FkZW5kXCIsIFwibG9hZHN0YXJ0XCJdO1xuY29uc3QgQ09NTU9OX0VWRU5UUyA9IFtcInByb2dyZXNzXCIsIFwiYWJvcnRcIiwgXCJlcnJvclwiLCBcInRpbWVvdXRcIl07XG5cbmNvbnN0IGRlcHJpY2F0ZWRQcm9wID0gcCA9PlxuICBbXCJyZXR1cm5WYWx1ZVwiLCBcInRvdGFsU2l6ZVwiLCBcInBvc2l0aW9uXCJdLmluY2x1ZGVzKHApO1xuXG5jb25zdCBtZXJnZU9iamVjdHMgPSBmdW5jdGlvbihzcmMsIGRzdCkge1xuICBmb3IgKGxldCBrIGluIHNyYykge1xuICAgIGlmIChkZXByaWNhdGVkUHJvcChrKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGNvbnN0IHYgPSBzcmNba107XG4gICAgdHJ5IHtcbiAgICAgIGRzdFtrXSA9IHY7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gIH1cbiAgcmV0dXJuIGRzdDtcbn07XG5cbi8vcHJveHkgZXZlbnRzIGZyb20gb25lIGVtaXR0ZXIgdG8gYW5vdGhlclxuY29uc3QgcHJveHlFdmVudHMgPSBmdW5jdGlvbihldmVudHMsIHNyYywgZHN0KSB7XG4gIGNvbnN0IHAgPSBldmVudCA9PlxuICAgIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGNvbnN0IGNsb25lID0ge307XG4gICAgICAvL2NvcGllcyBldmVudCwgd2l0aCBkc3QgZW1pdHRlciBpbnBsYWNlIG9mIHNyY1xuICAgICAgZm9yIChsZXQgayBpbiBlKSB7XG4gICAgICAgIGlmIChkZXByaWNhdGVkUHJvcChrKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbCA9IGVba107XG4gICAgICAgIGNsb25lW2tdID0gdmFsID09PSBzcmMgPyBkc3QgOiB2YWw7XG4gICAgICB9XG4gICAgICAvL2VtaXRzIG91dCB0aGUgZHN0XG4gICAgICByZXR1cm4gZHN0LmRpc3BhdGNoRXZlbnQoZXZlbnQsIGNsb25lKTtcbiAgICB9O1xuICAvL2RvbnQgcHJveHkgbWFudWFsIGV2ZW50c1xuICBmb3IgKGxldCBldmVudCBvZiBBcnJheS5mcm9tKGV2ZW50cykpIHtcbiAgICBpZiAoZHN0Ll9oYXMoZXZlbnQpKSB7XG4gICAgICBzcmNbYG9uJHtldmVudH1gXSA9IHAoZXZlbnQpO1xuICAgIH1cbiAgfVxufTtcblxuLy9jcmVhdGUgZmFrZSBldmVudFxuY29uc3QgZmFrZUV2ZW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAoZG9jdW1lbnRSZWYgJiYgZG9jdW1lbnRSZWYuY3JlYXRlRXZlbnRPYmplY3QgIT0gbnVsbCkge1xuICAgIGNvbnN0IG1zaWVFdmVudE9iamVjdCA9IGRvY3VtZW50UmVmLmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gICAgbXNpZUV2ZW50T2JqZWN0LnR5cGUgPSB0eXBlO1xuICAgIHJldHVybiBtc2llRXZlbnRPYmplY3Q7XG4gIH1cbiAgLy8gb24gc29tZSBwbGF0Zm9ybXMgbGlrZSBhbmRyb2lkIDQuMS4yIGFuZCBzYWZhcmkgb24gd2luZG93cywgaXQgYXBwZWFyc1xuICAvLyB0aGF0IG5ldyBFdmVudCBpcyBub3QgYWxsb3dlZFxuICB0cnkge1xuICAgIHJldHVybiBuZXcgRXZlbnQodHlwZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgdHlwZSB9O1xuICB9XG59O1xuXG4vL3RpbnkgZXZlbnQgZW1pdHRlclxuY29uc3QgRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24obm9kZVN0eWxlKSB7XG4gIC8vcHJpdmF0ZVxuICBsZXQgZXZlbnRzID0ge307XG4gIGNvbnN0IGxpc3RlbmVycyA9IGV2ZW50ID0+IGV2ZW50c1tldmVudF0gfHwgW107XG4gIC8vcHVibGljXG4gIGNvbnN0IGVtaXR0ZXIgPSB7fTtcbiAgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrLCBpKSB7XG4gICAgZXZlbnRzW2V2ZW50XSA9IGxpc3RlbmVycyhldmVudCk7XG4gICAgaWYgKGV2ZW50c1tldmVudF0uaW5kZXhPZihjYWxsYmFjaykgPj0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpID0gaSA9PT0gdW5kZWZpbmVkID8gZXZlbnRzW2V2ZW50XS5sZW5ndGggOiBpO1xuICAgIGV2ZW50c1tldmVudF0uc3BsaWNlKGksIDAsIGNhbGxiYWNrKTtcbiAgfTtcbiAgZW1pdHRlci5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgLy9yZW1vdmUgYWxsXG4gICAgaWYgKGV2ZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGV2ZW50cyA9IHt9O1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL3JlbW92ZSBhbGwgb2YgdHlwZSBldmVudFxuICAgIGlmIChjYWxsYmFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBldmVudHNbZXZlbnRdID0gW107XG4gICAgfVxuICAgIC8vcmVtb3ZlIHBhcnRpY3VsYXIgaGFuZGxlclxuICAgIGNvbnN0IGkgPSBsaXN0ZW5lcnMoZXZlbnQpLmluZGV4T2YoY2FsbGJhY2spO1xuICAgIGlmIChpID09PSAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsaXN0ZW5lcnMoZXZlbnQpLnNwbGljZShpLCAxKTtcbiAgfTtcbiAgZW1pdHRlci5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgYXJncyA9IHNsaWNlKGFyZ3VtZW50cyk7XG4gICAgY29uc3QgZXZlbnQgPSBhcmdzLnNoaWZ0KCk7XG4gICAgaWYgKCFub2RlU3R5bGUpIHtcbiAgICAgIGFyZ3NbMF0gPSBtZXJnZU9iamVjdHMoYXJnc1swXSwgZmFrZUV2ZW50KGV2ZW50KSk7XG4gICAgfVxuICAgIGNvbnN0IGxlZ2FjeWxpc3RlbmVyID0gZW1pdHRlcltgb24ke2V2ZW50fWBdO1xuICAgIGlmIChsZWdhY3lsaXN0ZW5lcikge1xuICAgICAgbGVnYWN5bGlzdGVuZXIuYXBwbHkoZW1pdHRlciwgYXJncyk7XG4gICAgfVxuICAgIGNvbnN0IGl0ZXJhYmxlID0gbGlzdGVuZXJzKGV2ZW50KS5jb25jYXQobGlzdGVuZXJzKFwiKlwiKSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyYWJsZS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbGlzdGVuZXIgPSBpdGVyYWJsZVtpXTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KGVtaXR0ZXIsIGFyZ3MpO1xuICAgIH1cbiAgfTtcbiAgZW1pdHRlci5faGFzID0gZXZlbnQgPT4gISEoZXZlbnRzW2V2ZW50XSB8fCBlbWl0dGVyW2BvbiR7ZXZlbnR9YF0pO1xuICAvL2FkZCBleHRyYSBhbGlhc2VzXG4gIGlmIChub2RlU3R5bGUpIHtcbiAgICBlbWl0dGVyLmxpc3RlbmVycyA9IGV2ZW50ID0+IHNsaWNlKGxpc3RlbmVycyhldmVudCkpO1xuICAgIGVtaXR0ZXIub24gPSBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXI7XG4gICAgZW1pdHRlci5vZmYgPSBlbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXI7XG4gICAgZW1pdHRlci5maXJlID0gZW1pdHRlci5kaXNwYXRjaEV2ZW50O1xuICAgIGVtaXR0ZXIub25jZSA9IGZ1bmN0aW9uKGUsIGZuKSB7XG4gICAgICB2YXIgZmlyZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBlbWl0dGVyLm9mZihlLCBmaXJlKTtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIGVtaXR0ZXIub24oZSwgZmlyZSk7XG4gICAgfTtcbiAgICBlbWl0dGVyLmRlc3Ryb3kgPSAoKSA9PiAoZXZlbnRzID0ge30pO1xuICB9XG5cbiAgcmV0dXJuIGVtaXR0ZXI7XG59O1xuXG4vL2hlbHBlclxuY29uc3QgY29udmVydCA9IGZ1bmN0aW9uKGgsIGRlc3QpIHtcbiAgbGV0IG5hbWU7XG4gIGlmIChkZXN0ID09IG51bGwpIHtcbiAgICBkZXN0ID0ge307XG4gIH1cbiAgc3dpdGNoICh0eXBlb2YgaCkge1xuICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgIHZhciBoZWFkZXJzID0gW107XG4gICAgICBmb3IgKGxldCBrIGluIGgpIHtcbiAgICAgICAgY29uc3QgdiA9IGhba107XG4gICAgICAgIG5hbWUgPSBrLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGhlYWRlcnMucHVzaChgJHtuYW1lfTpcXHQke3Z9YCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGVhZGVycy5qb2luKFwiXFxuXCIpICsgXCJcXG5cIjtcbiAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICBoZWFkZXJzID0gaC5zcGxpdChcIlxcblwiKTtcbiAgICAgIGZvciAobGV0IGhlYWRlciBvZiBBcnJheS5mcm9tKGhlYWRlcnMpKSB7XG4gICAgICAgIGlmICgvKFteOl0rKTpcXHMqKC4rKS8udGVzdChoZWFkZXIpKSB7XG4gICAgICAgICAgbmFtZSA9IFJlZ0V4cC4kMSAhPSBudWxsID8gUmVnRXhwLiQxLnRvTG93ZXJDYXNlKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBSZWdFeHAuJDI7XG4gICAgICAgICAgaWYgKGRlc3RbbmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgZGVzdFtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGRlc3Q7XG4gIH1cbiAgcmV0dXJuIFtdO1xufTtcblxudmFyIGhlYWRlcnMgPSB7IGNvbnZlcnQgfTtcblxuLy9nbG9iYWwgc2V0IG9mIGhvb2sgZnVuY3Rpb25zLFxuLy91c2VzIGV2ZW50IGVtaXR0ZXIgdG8gc3RvcmUgaG9va3NcbmNvbnN0IGhvb2tzID0gRXZlbnRFbWl0dGVyKHRydWUpO1xuXG5jb25zdCBudWxsaWZ5ID0gcmVzID0+IChyZXMgPT09IHVuZGVmaW5lZCA/IG51bGwgOiByZXMpO1xuXG4vL2Jyb3dzZXIncyBYTUxIdHRwUmVxdWVzdFxuY29uc3QgTmF0aXZlJDEgPSB3aW5kb3dSZWYuWE1MSHR0cFJlcXVlc3Q7XG5cbi8veGhvb2sncyBYTUxIdHRwUmVxdWVzdFxuY29uc3QgWGhvb2skMSA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBBQk9SVEVEID0gLTE7XG4gIGNvbnN0IHhociA9IG5ldyBOYXRpdmUkMSgpO1xuXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgLy8gRXh0cmEgc3RhdGVcbiAgY29uc3QgcmVxdWVzdCA9IHt9O1xuICBsZXQgc3RhdHVzID0gbnVsbDtcbiAgbGV0IGhhc0Vycm9yID0gdW5kZWZpbmVkO1xuICBsZXQgdHJhbnNpdGluZyA9IHVuZGVmaW5lZDtcbiAgbGV0IHJlc3BvbnNlID0gdW5kZWZpbmVkO1xuICB2YXIgY3VycmVudFN0YXRlID0gMDtcblxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIC8vIFByaXZhdGUgQVBJXG5cbiAgLy9yZWFkIHJlc3VsdHMgZnJvbSByZWFsIHhociBpbnRvIHJlc3BvbnNlXG4gIGNvbnN0IHJlYWRIZWFkID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gQWNjZXNzaW5nIGF0dHJpYnV0ZXMgb24gYW4gYWJvcnRlZCB4aHIgb2JqZWN0IHdpbGxcbiAgICAvLyB0aHJvdyBhbiAnYzAwYzAyM2YgZXJyb3InIGluIElFOSBhbmQgbG93ZXIsIGRvbid0IHRvdWNoIGl0LlxuICAgIHJlc3BvbnNlLnN0YXR1cyA9IHN0YXR1cyB8fCB4aHIuc3RhdHVzO1xuICAgIGlmIChzdGF0dXMgIT09IEFCT1JURUQgfHwgIShtc2llIDwgMTApKSB7XG4gICAgICByZXNwb25zZS5zdGF0dXNUZXh0ID0geGhyLnN0YXR1c1RleHQ7XG4gICAgfVxuICAgIGlmIChzdGF0dXMgIT09IEFCT1JURUQpIHtcbiAgICAgIGNvbnN0IG9iamVjdCA9IGhlYWRlcnMuY29udmVydCh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xuICAgICAgZm9yIChsZXQga2V5IGluIG9iamVjdCkge1xuICAgICAgICBjb25zdCB2YWwgPSBvYmplY3Rba2V5XTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5oZWFkZXJzW2tleV0pIHtcbiAgICAgICAgICBjb25zdCBuYW1lID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgcmVzcG9uc2UuaGVhZGVyc1tuYW1lXSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWFkQm9keSA9IGZ1bmN0aW9uKCkge1xuICAgIC8vaHR0cHM6Ly94aHIuc3BlYy53aGF0d2cub3JnL1xuICAgIGlmICgheGhyLnJlc3BvbnNlVHlwZSB8fCB4aHIucmVzcG9uc2VUeXBlID09PSBcInRleHRcIikge1xuICAgICAgcmVzcG9uc2UudGV4dCA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICByZXNwb25zZS5kYXRhID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3BvbnNlLnhtbCA9IHhoci5yZXNwb25zZVhNTDtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuICAgICAgLy8gdW5hYmxlIHRvIHNldCByZXNwb25zZVhNTCBkdWUgdG8gcmVzcG9uc2UgdHlwZSwgd2UgYXR0ZW1wdCB0byBhc3NpZ24gcmVzcG9uc2VYTUxcbiAgICAgIC8vIHdoZW4gdGhlIHR5cGUgaXMgdGV4dCBldmVuIHRob3VnaCBpdCdzIGFnYWluc3QgdGhlIHNwZWMgZHVlIHRvIHNldmVyYWwgbGlicmFyaWVzXG4gICAgICAvLyBhbmQgYnJvd3NlciB2ZW5kb3JzIHdobyBhbGxvdyB0aGlzIGJlaGF2aW9yLiBjYXVzaW5nIHRoZXNlIHJlcXVlc3RzIHRvIGZhaWwgd2hlblxuICAgICAgLy8geGhvb2sgaXMgaW5zdGFsbGVkIG9uIGEgcGFnZS5cbiAgICB9IGVsc2UgaWYgKHhoci5yZXNwb25zZVR5cGUgPT09IFwiZG9jdW1lbnRcIikge1xuICAgICAgcmVzcG9uc2UueG1sID0geGhyLnJlc3BvbnNlWE1MO1xuICAgICAgcmVzcG9uc2UuZGF0YSA9IHhoci5yZXNwb25zZVhNTDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzcG9uc2UuZGF0YSA9IHhoci5yZXNwb25zZTtcbiAgICB9XG4gICAgLy9uZXcgaW4gc29tZSBicm93c2Vyc1xuICAgIGlmIChcInJlc3BvbnNlVVJMXCIgaW4geGhyKSB7XG4gICAgICByZXNwb25zZS5maW5hbFVybCA9IHhoci5yZXNwb25zZVVSTDtcbiAgICB9XG4gIH07XG5cbiAgLy93cml0ZSByZXNwb25zZSBpbnRvIGZhY2FkZSB4aHJcbiAgY29uc3Qgd3JpdGVIZWFkID0gZnVuY3Rpb24oKSB7XG4gICAgZmFjYWRlLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICBmYWNhZGUuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gIH07XG5cbiAgY29uc3Qgd3JpdGVCb2R5ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKFwidGV4dFwiIGluIHJlc3BvbnNlKSB7XG4gICAgICBmYWNhZGUucmVzcG9uc2VUZXh0ID0gcmVzcG9uc2UudGV4dDtcbiAgICB9XG4gICAgaWYgKFwieG1sXCIgaW4gcmVzcG9uc2UpIHtcbiAgICAgIGZhY2FkZS5yZXNwb25zZVhNTCA9IHJlc3BvbnNlLnhtbDtcbiAgICB9XG4gICAgaWYgKFwiZGF0YVwiIGluIHJlc3BvbnNlKSB7XG4gICAgICBmYWNhZGUucmVzcG9uc2UgPSByZXNwb25zZS5kYXRhO1xuICAgIH1cbiAgICBpZiAoXCJmaW5hbFVybFwiIGluIHJlc3BvbnNlKSB7XG4gICAgICBmYWNhZGUucmVzcG9uc2VVUkwgPSByZXNwb25zZS5maW5hbFVybDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZW1pdEZpbmFsID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFoYXNFcnJvcikge1xuICAgICAgZmFjYWRlLmRpc3BhdGNoRXZlbnQoXCJsb2FkXCIsIHt9KTtcbiAgICB9XG4gICAgZmFjYWRlLmRpc3BhdGNoRXZlbnQoXCJsb2FkZW5kXCIsIHt9KTtcbiAgICBpZiAoaGFzRXJyb3IpIHtcbiAgICAgIGZhY2FkZS5yZWFkeVN0YXRlID0gMDtcbiAgICB9XG4gIH07XG5cbiAgLy9lbnN1cmUgcmVhZHkgc3RhdGUgMCB0aHJvdWdoIDQgaXMgaGFuZGxlZFxuICBjb25zdCBlbWl0UmVhZHlTdGF0ZSA9IGZ1bmN0aW9uKG4pIHtcbiAgICB3aGlsZSAobiA+IGN1cnJlbnRTdGF0ZSAmJiBjdXJyZW50U3RhdGUgPCA0KSB7XG4gICAgICBmYWNhZGUucmVhZHlTdGF0ZSA9ICsrY3VycmVudFN0YXRlO1xuICAgICAgLy8gbWFrZSBmYWtlIGV2ZW50cyBmb3IgbGlicmFyaWVzIHRoYXQgYWN0dWFsbHkgY2hlY2sgdGhlIHR5cGUgb25cbiAgICAgIC8vIHRoZSBldmVudCBvYmplY3RcbiAgICAgIGlmIChjdXJyZW50U3RhdGUgPT09IDEpIHtcbiAgICAgICAgZmFjYWRlLmRpc3BhdGNoRXZlbnQoXCJsb2Fkc3RhcnRcIiwge30pO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gMikge1xuICAgICAgICB3cml0ZUhlYWQoKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50U3RhdGUgPT09IDQpIHtcbiAgICAgICAgd3JpdGVIZWFkKCk7XG4gICAgICAgIHdyaXRlQm9keSgpO1xuICAgICAgfVxuICAgICAgZmFjYWRlLmRpc3BhdGNoRXZlbnQoXCJyZWFkeXN0YXRlY2hhbmdlXCIsIHt9KTtcbiAgICAgIC8vZGVsYXkgZmluYWwgZXZlbnRzIGluY2FzZSBvZiBlcnJvclxuICAgICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gNCkge1xuICAgICAgICBpZiAocmVxdWVzdC5hc3luYyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBlbWl0RmluYWwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGVtaXRGaW5hbCwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy9jb250cm9sIGZhY2FkZSByZWFkeSBzdGF0ZVxuICBjb25zdCBzZXRSZWFkeVN0YXRlID0gZnVuY3Rpb24obikge1xuICAgIC8vZW1pdCBldmVudHMgdW50aWwgcmVhZHlTdGF0ZSByZWFjaGVzIDRcbiAgICBpZiAobiAhPT0gNCkge1xuICAgICAgZW1pdFJlYWR5U3RhdGUobik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vYmVmb3JlIGVtaXR0aW5nIDQsIHJ1biBhbGwgJ2FmdGVyJyBob29rcyBpbiBzZXF1ZW5jZVxuICAgIGNvbnN0IGFmdGVySG9va3MgPSBob29rcy5saXN0ZW5lcnMoXCJhZnRlclwiKTtcbiAgICB2YXIgcHJvY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGFmdGVySG9va3MubGVuZ3RoID4gMCkge1xuICAgICAgICAvL2V4ZWN1dGUgZWFjaCAnYmVmb3JlJyBob29rIG9uZSBhdCBhIHRpbWVcbiAgICAgICAgY29uc3QgaG9vayA9IGFmdGVySG9va3Muc2hpZnQoKTtcbiAgICAgICAgaWYgKGhvb2subGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgaG9vayhyZXF1ZXN0LCByZXNwb25zZSk7XG4gICAgICAgICAgcHJvY2VzcygpO1xuICAgICAgICB9IGVsc2UgaWYgKGhvb2subGVuZ3RoID09PSAzICYmIHJlcXVlc3QuYXN5bmMpIHtcbiAgICAgICAgICBob29rKHJlcXVlc3QsIHJlc3BvbnNlLCBwcm9jZXNzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9jZXNzKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vcmVzcG9uc2UgcmVhZHkgZm9yIHJlYWRpbmdcbiAgICAgICAgZW1pdFJlYWR5U3RhdGUoNCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgICBwcm9jZXNzKCk7XG4gIH07XG5cbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLyBGYWNhZGUgWEhSXG4gIHZhciBmYWNhZGUgPSBFdmVudEVtaXR0ZXIoKTtcbiAgcmVxdWVzdC54aHIgPSBmYWNhZGU7XG5cbiAgLy8gSGFuZGxlIHRoZSB1bmRlcmx5aW5nIHJlYWR5IHN0YXRlXG4gIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgIC8vcHVsbCBzdGF0dXMgYW5kIGhlYWRlcnNcbiAgICB0cnkge1xuICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSAyKSB7XG4gICAgICAgIHJlYWRIZWFkKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgLy9wdWxsIHJlc3BvbnNlIGRhdGFcbiAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgIHRyYW5zaXRpbmcgPSBmYWxzZTtcbiAgICAgIHJlYWRIZWFkKCk7XG4gICAgICByZWFkQm9keSgpO1xuICAgIH1cblxuICAgIHNldFJlYWR5U3RhdGUoeGhyLnJlYWR5U3RhdGUpO1xuICB9O1xuXG4gIC8vbWFyayB0aGlzIHhociBhcyBlcnJvcmVkXG4gIGNvbnN0IGhhc0Vycm9ySGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgIGhhc0Vycm9yID0gdHJ1ZTtcbiAgfTtcbiAgZmFjYWRlLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBoYXNFcnJvckhhbmRsZXIpO1xuICBmYWNhZGUuYWRkRXZlbnRMaXN0ZW5lcihcInRpbWVvdXRcIiwgaGFzRXJyb3JIYW5kbGVyKTtcbiAgZmFjYWRlLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBoYXNFcnJvckhhbmRsZXIpO1xuICAvLyBwcm9ncmVzcyBtZWFucyB3ZSdyZSBjdXJyZW50IGRvd25sb2FkaW5nLi4uXG4gIGZhY2FkZS5hZGRFdmVudExpc3RlbmVyKFwicHJvZ3Jlc3NcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoY3VycmVudFN0YXRlIDwgMykge1xuICAgICAgc2V0UmVhZHlTdGF0ZSgzKTtcbiAgICB9IGVsc2UgaWYgKHhoci5yZWFkeVN0YXRlIDw9IDMpIHtcbiAgICAgIC8vdW50aWwgcmVhZHkgKDQpLCBlYWNoIHByb2dyZXNzIGV2ZW50IGlzIGZvbGxvd2VkIGJ5IHJlYWR5c3RhdGVjaGFuZ2UuLi5cbiAgICAgIGZhY2FkZS5kaXNwYXRjaEV2ZW50KFwicmVhZHlzdGF0ZWNoYW5nZVwiLCB7fSk7IC8vVE9ETyBmYWtlIGFuIFhIUiBldmVudFxuICAgIH1cbiAgfSk7XG5cbiAgLy8gaW5pdGlhbGlzZSAnd2l0aENyZWRlbnRpYWxzJyBvbiBmYWNhZGUgeGhyIGluIGJyb3dzZXJzIHdpdGggaXRcbiAgLy8gb3IgaWYgZXhwbGljaXRseSB0b2xkIHRvIGRvIHNvXG4gIGlmIChcIndpdGhDcmVkZW50aWFsc1wiIGluIHhocikge1xuICAgIGZhY2FkZS53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZTtcbiAgfVxuICBmYWNhZGUuc3RhdHVzID0gMDtcblxuICAvLyBpbml0aWFsaXNlIGFsbCBwb3NzaWJsZSBldmVudCBoYW5kbGVyc1xuICBmb3IgKGxldCBldmVudCBvZiBBcnJheS5mcm9tKENPTU1PTl9FVkVOVFMuY29uY2F0KFVQTE9BRF9FVkVOVFMpKSkge1xuICAgIGZhY2FkZVtgb24ke2V2ZW50fWBdID0gbnVsbDtcbiAgfVxuXG4gIGZhY2FkZS5vcGVuID0gZnVuY3Rpb24obWV0aG9kLCB1cmwsIGFzeW5jLCB1c2VyLCBwYXNzKSB7XG4gICAgLy8gSW5pdGFpbGl6ZSBlbXB0eSBYSFIgZmFjYWRlXG4gICAgY3VycmVudFN0YXRlID0gMDtcbiAgICBoYXNFcnJvciA9IGZhbHNlO1xuICAgIHRyYW5zaXRpbmcgPSBmYWxzZTtcbiAgICAvL3Jlc2V0IHJlcXVlc3RcbiAgICByZXF1ZXN0LmhlYWRlcnMgPSB7fTtcbiAgICByZXF1ZXN0LmhlYWRlck5hbWVzID0ge307XG4gICAgcmVxdWVzdC5zdGF0dXMgPSAwO1xuICAgIHJlcXVlc3QubWV0aG9kID0gbWV0aG9kO1xuICAgIHJlcXVlc3QudXJsID0gdXJsO1xuICAgIHJlcXVlc3QuYXN5bmMgPSBhc3luYyAhPT0gZmFsc2U7XG4gICAgcmVxdWVzdC51c2VyID0gdXNlcjtcbiAgICByZXF1ZXN0LnBhc3MgPSBwYXNzO1xuICAgIC8vcmVzZXQgcmVzcG9uc2VcbiAgICByZXNwb25zZSA9IHt9O1xuICAgIHJlc3BvbnNlLmhlYWRlcnMgPSB7fTtcbiAgICAvLyBvcGVubmVkIGZhY2FkZSB4aHIgKG5vdCByZWFsIHhocilcbiAgICBzZXRSZWFkeVN0YXRlKDEpO1xuICB9O1xuXG4gIGZhY2FkZS5zZW5kID0gZnVuY3Rpb24oYm9keSkge1xuICAgIC8vcmVhZCB4aHIgc2V0dGluZ3MgYmVmb3JlIGhvb2tpbmdcbiAgICBsZXQgaywgbW9kaztcbiAgICBmb3IgKGsgb2YgW1widHlwZVwiLCBcInRpbWVvdXRcIiwgXCJ3aXRoQ3JlZGVudGlhbHNcIl0pIHtcbiAgICAgIG1vZGsgPSBrID09PSBcInR5cGVcIiA/IFwicmVzcG9uc2VUeXBlXCIgOiBrO1xuICAgICAgaWYgKG1vZGsgaW4gZmFjYWRlKSB7XG4gICAgICAgIHJlcXVlc3Rba10gPSBmYWNhZGVbbW9ka107XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVxdWVzdC5ib2R5ID0gYm9keTtcbiAgICBjb25zdCBzZW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICAvL3Byb3h5IGFsbCBldmVudHMgZnJvbSByZWFsIHhociB0byBmYWNhZGVcbiAgICAgIHByb3h5RXZlbnRzKENPTU1PTl9FVkVOVFMsIHhociwgZmFjYWRlKTtcbiAgICAgIC8vcHJveHkgYWxsIHVwbG9hZCBldmVudHMgZnJvbSB0aGUgcmVhbCB0byB0aGUgdXBsb2FkIGZhY2FkZVxuICAgICAgaWYgKGZhY2FkZS51cGxvYWQpIHtcbiAgICAgICAgcHJveHlFdmVudHMoXG4gICAgICAgICAgQ09NTU9OX0VWRU5UUy5jb25jYXQoVVBMT0FEX0VWRU5UUyksXG4gICAgICAgICAgeGhyLnVwbG9hZCxcbiAgICAgICAgICBmYWNhZGUudXBsb2FkXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vcHJlcGFyZSByZXF1ZXN0IGFsbCBhdCBvbmNlXG4gICAgICB0cmFuc2l0aW5nID0gdHJ1ZTtcbiAgICAgIC8vcGVyZm9ybSBvcGVuXG4gICAgICB4aHIub3BlbihcbiAgICAgICAgcmVxdWVzdC5tZXRob2QsXG4gICAgICAgIHJlcXVlc3QudXJsLFxuICAgICAgICByZXF1ZXN0LmFzeW5jLFxuICAgICAgICByZXF1ZXN0LnVzZXIsXG4gICAgICAgIHJlcXVlc3QucGFzc1xuICAgICAgKTtcblxuICAgICAgLy93cml0ZSB4aHIgc2V0dGluZ3NcbiAgICAgIGZvciAoayBvZiBbXCJ0eXBlXCIsIFwidGltZW91dFwiLCBcIndpdGhDcmVkZW50aWFsc1wiXSkge1xuICAgICAgICBtb2RrID0gayA9PT0gXCJ0eXBlXCIgPyBcInJlc3BvbnNlVHlwZVwiIDogaztcbiAgICAgICAgaWYgKGsgaW4gcmVxdWVzdCkge1xuICAgICAgICAgIHhoclttb2RrXSA9IHJlcXVlc3Rba107XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy9pbnNlcnQgaGVhZGVyc1xuICAgICAgZm9yIChsZXQgaGVhZGVyIGluIHJlcXVlc3QuaGVhZGVycykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHJlcXVlc3QuaGVhZGVyc1toZWFkZXJdO1xuICAgICAgICBpZiAoaGVhZGVyKSB7XG4gICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vcmVhbCBzZW5kIVxuICAgICAgeGhyLnNlbmQocmVxdWVzdC5ib2R5KTtcbiAgICB9O1xuXG4gICAgY29uc3QgYmVmb3JlSG9va3MgPSBob29rcy5saXN0ZW5lcnMoXCJiZWZvcmVcIik7XG4gICAgLy9wcm9jZXNzIGJlZm9yZUhvb2tzIHNlcXVlbnRpYWxseVxuICAgIHZhciBwcm9jZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIWJlZm9yZUhvb2tzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gc2VuZCgpO1xuICAgICAgfVxuICAgICAgLy9nbyB0byBuZXh0IGhvb2sgT1Igb3B0aW9uYWxseSBwcm92aWRlIHJlc3BvbnNlXG4gICAgICBjb25zdCBkb25lID0gZnVuY3Rpb24odXNlclJlc3BvbnNlKSB7XG4gICAgICAgIC8vYnJlYWsgY2hhaW4gLSBwcm92aWRlIGR1bW15IHJlc3BvbnNlIChyZWFkeVN0YXRlIDQpXG4gICAgICAgIGlmIChcbiAgICAgICAgICB0eXBlb2YgdXNlclJlc3BvbnNlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgKHR5cGVvZiB1c2VyUmVzcG9uc2Uuc3RhdHVzID09PSBcIm51bWJlclwiIHx8XG4gICAgICAgICAgICB0eXBlb2YgcmVzcG9uc2Uuc3RhdHVzID09PSBcIm51bWJlclwiKVxuICAgICAgICApIHtcbiAgICAgICAgICBtZXJnZU9iamVjdHModXNlclJlc3BvbnNlLCByZXNwb25zZSk7XG4gICAgICAgICAgaWYgKCEoXCJkYXRhXCIgaW4gdXNlclJlc3BvbnNlKSkge1xuICAgICAgICAgICAgdXNlclJlc3BvbnNlLmRhdGEgPSB1c2VyUmVzcG9uc2UucmVzcG9uc2UgfHwgdXNlclJlc3BvbnNlLnRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldFJlYWR5U3RhdGUoNCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vY29udGludWUgcHJvY2Vzc2luZyB1bnRpbCBubyBiZWZvcmVIb29rcyBsZWZ0XG4gICAgICAgIHByb2Nlc3MoKTtcbiAgICAgIH07XG4gICAgICAvL3NwZWNpZmljYWxseSBwcm92aWRlIGhlYWRlcnMgKHJlYWR5U3RhdGUgMilcbiAgICAgIGRvbmUuaGVhZCA9IGZ1bmN0aW9uKHVzZXJSZXNwb25zZSkge1xuICAgICAgICBtZXJnZU9iamVjdHModXNlclJlc3BvbnNlLCByZXNwb25zZSk7XG4gICAgICAgIHNldFJlYWR5U3RhdGUoMik7XG4gICAgICB9O1xuICAgICAgLy9zcGVjaWZpY2FsbHkgcHJvdmlkZSBwYXJ0aWFsIHRleHQgKHJlc3BvbnNlVGV4dCAgcmVhZHlTdGF0ZSAzKVxuICAgICAgZG9uZS5wcm9ncmVzcyA9IGZ1bmN0aW9uKHVzZXJSZXNwb25zZSkge1xuICAgICAgICBtZXJnZU9iamVjdHModXNlclJlc3BvbnNlLCByZXNwb25zZSk7XG4gICAgICAgIHNldFJlYWR5U3RhdGUoMyk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBob29rID0gYmVmb3JlSG9va3Muc2hpZnQoKTtcbiAgICAgIC8vYXN5bmMgb3Igc3luYz9cbiAgICAgIGlmIChob29rLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBkb25lKGhvb2socmVxdWVzdCkpO1xuICAgICAgfSBlbHNlIGlmIChob29rLmxlbmd0aCA9PT0gMiAmJiByZXF1ZXN0LmFzeW5jKSB7XG4gICAgICAgIC8vYXN5bmMgaGFuZGxlcnMgbXVzdCB1c2UgYW4gYXN5bmMgeGhyXG4gICAgICAgIGhvb2socmVxdWVzdCwgZG9uZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL3NraXAgYXN5bmMgaG9vayBvbiBzeW5jIHJlcXVlc3RzXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8va2ljayBvZmZcbiAgICBwcm9jZXNzKCk7XG4gIH07XG5cbiAgZmFjYWRlLmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgc3RhdHVzID0gQUJPUlRFRDtcbiAgICBpZiAodHJhbnNpdGluZykge1xuICAgICAgeGhyLmFib3J0KCk7IC8vdGhpcyB3aWxsIGVtaXQgYW4gJ2Fib3J0JyBmb3IgdXNcbiAgICB9IGVsc2Uge1xuICAgICAgZmFjYWRlLmRpc3BhdGNoRXZlbnQoXCJhYm9ydFwiLCB7fSk7XG4gICAgfVxuICB9O1xuXG4gIGZhY2FkZS5zZXRSZXF1ZXN0SGVhZGVyID0gZnVuY3Rpb24oaGVhZGVyLCB2YWx1ZSkge1xuICAgIC8vdGhlIGZpcnN0IGhlYWRlciBzZXQgaXMgdXNlZCBmb3IgYWxsIGZ1dHVyZSBjYXNlLWFsdGVybmF0aXZlcyBvZiAnbmFtZSdcbiAgICBjb25zdCBsTmFtZSA9IGhlYWRlciAhPSBudWxsID8gaGVhZGVyLnRvTG93ZXJDYXNlKCkgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgbmFtZSA9IChyZXF1ZXN0LmhlYWRlck5hbWVzW2xOYW1lXSA9XG4gICAgICByZXF1ZXN0LmhlYWRlck5hbWVzW2xOYW1lXSB8fCBoZWFkZXIpO1xuICAgIC8vYXBwZW5kIGhlYWRlciB0byBhbnkgcHJldmlvdXMgdmFsdWVzXG4gICAgaWYgKHJlcXVlc3QuaGVhZGVyc1tuYW1lXSkge1xuICAgICAgdmFsdWUgPSByZXF1ZXN0LmhlYWRlcnNbbmFtZV0gKyBcIiwgXCIgKyB2YWx1ZTtcbiAgICB9XG4gICAgcmVxdWVzdC5oZWFkZXJzW25hbWVdID0gdmFsdWU7XG4gIH07XG4gIGZhY2FkZS5nZXRSZXNwb25zZUhlYWRlciA9IGhlYWRlciA9PlxuICAgIG51bGxpZnkocmVzcG9uc2UuaGVhZGVyc1toZWFkZXIgPyBoZWFkZXIudG9Mb3dlckNhc2UoKSA6IHVuZGVmaW5lZF0pO1xuXG4gIGZhY2FkZS5nZXRBbGxSZXNwb25zZUhlYWRlcnMgPSAoKSA9PlxuICAgIG51bGxpZnkoaGVhZGVycy5jb252ZXJ0KHJlc3BvbnNlLmhlYWRlcnMpKTtcblxuICAvL3Byb3h5IGNhbGwgb25seSB3aGVuIHN1cHBvcnRlZFxuICBpZiAoeGhyLm92ZXJyaWRlTWltZVR5cGUpIHtcbiAgICBmYWNhZGUub3ZlcnJpZGVNaW1lVHlwZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgeGhyLm92ZXJyaWRlTWltZVR5cGUuYXBwbHkoeGhyLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICAvL2NyZWF0ZSBlbWl0dGVyIHdoZW4gc3VwcG9ydGVkXG4gIGlmICh4aHIudXBsb2FkKSB7XG4gICAgbGV0IHVwID0gRXZlbnRFbWl0dGVyKCk7XG4gICAgZmFjYWRlLnVwbG9hZCA9IHVwO1xuICAgIHJlcXVlc3QudXBsb2FkID0gdXA7XG4gIH1cblxuICBmYWNhZGUuVU5TRU5UID0gMDtcbiAgZmFjYWRlLk9QRU5FRCA9IDE7XG4gIGZhY2FkZS5IRUFERVJTX1JFQ0VJVkVEID0gMjtcbiAgZmFjYWRlLkxPQURJTkcgPSAzO1xuICBmYWNhZGUuRE9ORSA9IDQ7XG5cbiAgLy8gZmlsbCBpbiBkZWZhdWx0IHZhbHVlcyBmb3IgYW4gZW1wdHkgWEhSIG9iamVjdCBhY2NvcmRpbmcgdG8gdGhlIHNwZWNcbiAgZmFjYWRlLnJlc3BvbnNlID0gXCJcIjtcbiAgZmFjYWRlLnJlc3BvbnNlVGV4dCA9IFwiXCI7XG4gIGZhY2FkZS5yZXNwb25zZVhNTCA9IG51bGw7XG4gIGZhY2FkZS5yZWFkeVN0YXRlID0gMDtcbiAgZmFjYWRlLnN0YXR1c1RleHQgPSBcIlwiO1xuXG4gIHJldHVybiBmYWNhZGU7XG59O1xuXG5YaG9vayQxLlVOU0VOVCA9IDA7XG5YaG9vayQxLk9QRU5FRCA9IDE7XG5YaG9vayQxLkhFQURFUlNfUkVDRUlWRUQgPSAyO1xuWGhvb2skMS5MT0FESU5HID0gMztcblhob29rJDEuRE9ORSA9IDQ7XG5cbi8vcGF0Y2ggaW50ZXJmYWNlXG52YXIgWE1MSHR0cFJlcXVlc3QgPSB7XG4gIHBhdGNoKCkge1xuICAgIGlmIChOYXRpdmUkMSkge1xuICAgICAgd2luZG93UmVmLlhNTEh0dHBSZXF1ZXN0ID0gWGhvb2skMTtcbiAgICB9XG4gIH0sXG4gIHVucGF0Y2goKSB7XG4gICAgaWYgKE5hdGl2ZSQxKSB7XG4gICAgICB3aW5kb3dSZWYuWE1MSHR0cFJlcXVlc3QgPSBOYXRpdmUkMTtcbiAgICB9XG4gIH0sXG4gIE5hdGl2ZTogTmF0aXZlJDEsXG4gIFhob29rOiBYaG9vayQxXG59O1xuXG4vL2Jyb3dzZXIncyBmZXRjaFxuY29uc3QgTmF0aXZlID0gd2luZG93UmVmLmZldGNoO1xuXG4vL3hob29rJ3MgZmV0Y2hcbmNvbnN0IFhob29rID0gZnVuY3Rpb24odXJsLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICBvcHRpb25zID0geyBoZWFkZXJzOiB7fSB9O1xuICB9XG5cbiAgbGV0IHJlcXVlc3QgPSBudWxsO1xuXG4gIGlmICh1cmwgaW5zdGFuY2VvZiBSZXF1ZXN0KSB7XG4gICAgcmVxdWVzdCA9IHVybDtcbiAgfSBlbHNlIHtcbiAgICBvcHRpb25zLnVybCA9IHVybDtcbiAgfVxuXG4gIGNvbnN0IGJlZm9yZUhvb2tzID0gaG9va3MubGlzdGVuZXJzKFwiYmVmb3JlXCIpO1xuICBjb25zdCBhZnRlckhvb2tzID0gaG9va3MubGlzdGVuZXJzKFwiYWZ0ZXJcIik7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGxldCBmdWxsZmlsZWQgPSByZXNvbHZlO1xuICAgIGNvbnN0IGdldFJlcXVlc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgb3B0aW9ucy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdChvcHRpb25zLnVybCwgb3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtZXJnZU9iamVjdHMob3B0aW9ucywgcmVxdWVzdCk7XG4gICAgfTtcblxuICAgIHZhciBwcm9jZXNzQWZ0ZXIgPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgaWYgKCFhZnRlckhvb2tzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZnVsbGZpbGVkKHJlc3BvbnNlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaG9vayA9IGFmdGVySG9va3Muc2hpZnQoKTtcblxuICAgICAgaWYgKGhvb2subGVuZ3RoID09PSAyKSB7XG4gICAgICAgIGhvb2soZ2V0UmVxdWVzdCgpLCByZXNwb25zZSk7XG4gICAgICAgIHJldHVybiBwcm9jZXNzQWZ0ZXIocmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIGlmIChob29rLmxlbmd0aCA9PT0gMykge1xuICAgICAgICByZXR1cm4gaG9vayhnZXRSZXF1ZXN0KCksIHJlc3BvbnNlLCBwcm9jZXNzQWZ0ZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NBZnRlcihyZXNwb25zZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGRvbmUgPSBmdW5jdGlvbih1c2VyUmVzcG9uc2UpIHtcbiAgICAgIGlmICh1c2VyUmVzcG9uc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZShcbiAgICAgICAgICB1c2VyUmVzcG9uc2UuYm9keSB8fCB1c2VyUmVzcG9uc2UudGV4dCxcbiAgICAgICAgICB1c2VyUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgIHByb2Nlc3NBZnRlcihyZXNwb25zZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy9jb250aW51ZSBwcm9jZXNzaW5nIHVudGlsIG5vIGhvb2tzIGxlZnRcbiAgICAgIHByb2Nlc3NCZWZvcmUoKTtcbiAgICB9O1xuXG4gICAgdmFyIHByb2Nlc3NCZWZvcmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghYmVmb3JlSG9va3MubGVuZ3RoKSB7XG4gICAgICAgIHNlbmQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBob29rID0gYmVmb3JlSG9va3Muc2hpZnQoKTtcblxuICAgICAgaWYgKGhvb2subGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBkb25lKGhvb2sob3B0aW9ucykpO1xuICAgICAgfSBlbHNlIGlmIChob29rLmxlbmd0aCA9PT0gMikge1xuICAgICAgICByZXR1cm4gaG9vayhnZXRSZXF1ZXN0KCksIGRvbmUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgc2VuZCA9ICgpID0+XG4gICAgICBOYXRpdmUoZ2V0UmVxdWVzdCgpKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiBwcm9jZXNzQWZ0ZXIocmVzcG9uc2UpKVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgZnVsbGZpbGVkID0gcmVqZWN0O1xuICAgICAgICAgIHByb2Nlc3NBZnRlcihlcnIpO1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICBwcm9jZXNzQmVmb3JlKCk7XG4gIH0pO1xufTtcblxuLy9wYXRjaCBpbnRlcmZhY2VcbnZhciBmZXRjaCA9IHtcbiAgcGF0Y2goKSB7XG4gICAgaWYgKE5hdGl2ZSkge1xuICAgICAgd2luZG93UmVmLmZldGNoID0gWGhvb2s7XG4gICAgfVxuICB9LFxuICB1bnBhdGNoKCkge1xuICAgIGlmIChOYXRpdmUpIHtcbiAgICAgIHdpbmRvd1JlZi5mZXRjaCA9IE5hdGl2ZTtcbiAgICB9XG4gIH0sXG4gIE5hdGl2ZSxcbiAgWGhvb2tcbn07XG5cbi8vdGhlIGdsb2JhbCBob29rcyBldmVudCBlbWl0dGVyIGlzIGFsc28gdGhlIGdsb2JhbCB4aG9vayBvYmplY3Rcbi8vKG5vdCB0aGUgYmVzdCBkZWNpc2lvbiBpbiBoaW5kc2lnaHQpXG5jb25zdCB4aG9vayA9IGhvb2tzO1xueGhvb2suRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuLy9tb2RpZnkgaG9va3Ncbnhob29rLmJlZm9yZSA9IGZ1bmN0aW9uKGhhbmRsZXIsIGkpIHtcbiAgaWYgKGhhbmRsZXIubGVuZ3RoIDwgMSB8fCBoYW5kbGVyLmxlbmd0aCA+IDIpIHtcbiAgICB0aHJvdyBcImludmFsaWQgaG9va1wiO1xuICB9XG4gIHJldHVybiB4aG9vay5vbihcImJlZm9yZVwiLCBoYW5kbGVyLCBpKTtcbn07XG54aG9vay5hZnRlciA9IGZ1bmN0aW9uKGhhbmRsZXIsIGkpIHtcbiAgaWYgKGhhbmRsZXIubGVuZ3RoIDwgMiB8fCBoYW5kbGVyLmxlbmd0aCA+IDMpIHtcbiAgICB0aHJvdyBcImludmFsaWQgaG9va1wiO1xuICB9XG4gIHJldHVybiB4aG9vay5vbihcImFmdGVyXCIsIGhhbmRsZXIsIGkpO1xufTtcblxuLy9nbG9iYWxseSBlbmFibGUvZGlzYWJsZVxueGhvb2suZW5hYmxlID0gZnVuY3Rpb24oKSB7XG4gIFhNTEh0dHBSZXF1ZXN0LnBhdGNoKCk7XG4gIGZldGNoLnBhdGNoKCk7XG59O1xueGhvb2suZGlzYWJsZSA9IGZ1bmN0aW9uKCkge1xuICBYTUxIdHRwUmVxdWVzdC51bnBhdGNoKCk7XG4gIGZldGNoLnVucGF0Y2goKTtcbn07XG4vL2V4cG9zZSBuYXRpdmUgb2JqZWN0c1xueGhvb2suWE1MSHR0cFJlcXVlc3QgPSBYTUxIdHRwUmVxdWVzdC5OYXRpdmU7XG54aG9vay5mZXRjaCA9IGZldGNoLk5hdGl2ZTtcblxuLy9leHBvc2UgaGVscGVyc1xueGhvb2suaGVhZGVycyA9IGhlYWRlcnMuY29udmVydDtcblxuLy9lbmFibGUgYnkgZGVmYXVsdFxueGhvb2suZW5hYmxlKCk7XG5cbmV4cG9ydCB7IHhob29rIGFzIGRlZmF1bHQgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgeGhvb2tfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwieGhvb2tcIikpO1xuY29uc3QgcXVlcnlfc3RyaW5nXzEgPSByZXF1aXJlKFwicXVlcnktc3RyaW5nXCIpO1xuY29uc3QgaWRGYWN0b3J5XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc2VydmljZXMvaWRGYWN0b3J5XCIpKTtcbmNvbnN0IG1lc3NhZ2VCdXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zZXJ2aWNlcy9tZXNzYWdlL21lc3NhZ2VCdXNcIikpO1xuY29uc3QgaGVscGVyXzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlcy9oZWxwZXJcIik7XG5jb25zdCBtZXNzYWdlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc2VydmljZXMvbWVzc2FnZVwiKSk7XG5jb25zdCBtZXNzYWdlQnVzID0gbmV3IG1lc3NhZ2VCdXNfMS5kZWZhdWx0KCk7XG5jb25zdCBtZXNzYWdlSWRGYWN0b3J5ID0gbmV3IGlkRmFjdG9yeV8xLmRlZmF1bHQoKTtcbmNvbnN0IGxvZ0lkRmFjdG9yeSA9IG5ldyBpZEZhY3RvcnlfMS5kZWZhdWx0KCk7XG5tZXNzYWdlXzEuZGVmYXVsdC5saXN0ZW4oXCJIT09LXCIsIChkYXRhKSA9PiB7XG4gICAgbWVzc2FnZUJ1cy5kaXNwYXRjaChkYXRhLmlkLCBkYXRhLm1lc3NhZ2UpO1xufSk7XG4vKipcbiAqIFByb21pc2lmeSBwb3N0IG1lc3NhZ2UgZnJvbSB3aW5kb3cgdG8gd2luZG93XG4gKiBhY2tSZXF1aXJlZCwgaWYgZmFsc2UsIG5vIGlkIHdpbGwgYmUgYXNzaWduZWQgaGVuY2UsIG5vIG1ldGhvZCB3aWxsIGJlIGFkZGVkIGluIG1lc3NhZ2VcbiAqIG1lc3NhZ2UgaWQgd2FzIG5vdCB0aGUgcHJvYmxlbSBidXQgZnVuY3Rpb24gaW4gbWVzc2FnZSBidXMgd2FzXG4gKi9cbmNvbnN0IHBvc3RNZXNzYWdlID0gKG1lc3NhZ2UsIHR5cGUsIGFja1JlcXVpcmVkKSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZUlkID0gYWNrUmVxdWlyZWQgPyBtZXNzYWdlSWRGYWN0b3J5LmdldElkKCkgOiBudWxsO1xuICAgIGNvbnN0IG1lc3NhZ2VPYmplY3QgPSB7XG4gICAgICAgIGlkOiBtZXNzYWdlSWQsXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIHRvOiBcIkNPTlRFTlRcIixcbiAgICAgICAgZnJvbTogXCJIT09LXCIsXG4gICAgICAgIGV4dGVuc2lvbk5hbWU6IFwiTU9LS1VcIixcbiAgICAgICAgdHlwZSxcbiAgICB9O1xuICAgIG1lc3NhZ2VfMS5kZWZhdWx0LnNlbmQobWVzc2FnZU9iamVjdCk7XG4gICAgaWYgKG1lc3NhZ2VJZCAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc2xvdmUpID0+IHtcbiAgICAgICAgICAgIG1lc3NhZ2VCdXMuYWRkTGlzdGVyKG1lc3NhZ2VJZCwgcmVzbG92ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG54aG9va18xLmRlZmF1bHQuYmVmb3JlKGZ1bmN0aW9uIChyZXF1ZXN0LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHNlcGFyYXRvciA9IHJlcXVlc3QudXJsLmluZGV4T2YoXCI/XCIpO1xuICAgIGNvbnN0IHVybCA9IHNlcGFyYXRvciAhPT0gLTEgPyByZXF1ZXN0LnVybC5zdWJzdHIoMCwgc2VwYXJhdG9yKSA6IHJlcXVlc3QudXJsO1xuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gc2VwYXJhdG9yICE9PSAtMVxuICAgICAgICA/IEpTT04uc3RyaW5naWZ5KCgwLCBxdWVyeV9zdHJpbmdfMS5wYXJzZSkocmVxdWVzdC51cmwuc3Vic3RyKHNlcGFyYXRvcikpKVxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICByZXF1ZXN0Lm1va2t1ID0ge1xuICAgICAgICBpZDogbG9nSWRGYWN0b3J5LmdldElkKCksXG4gICAgfTtcbiAgICBjb25zdCBkYXRhID0gZ2V0TG9nKHJlcXVlc3QpO1xuICAgIHBvc3RNZXNzYWdlKGRhdGEsIFwiTE9HXCIsIGZhbHNlKTtcbiAgICBwb3N0TWVzc2FnZShkYXRhLCBcIk5PVElGSUNBVElPTlwiLCB0cnVlKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLm1vY2tSZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc3QgbW9jayA9IGRhdGEubW9ja1Jlc3BvbnNlO1xuICAgICAgICAgICAgY29uc3QgaGVhZGVycyA9IG1vY2suaGVhZGVyc1xuICAgICAgICAgICAgICAgID8gbW9jay5oZWFkZXJzLnJlZHVjZSgoZmluYWwsIGhlYWRlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmaW5hbFtoZWFkZXIubmFtZV0gPSBoZWFkZXIudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaW5hbDtcbiAgICAgICAgICAgICAgICB9LCB7fSlcbiAgICAgICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XCIsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGZpbmFsUmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBtb2NrLnN0YXR1cyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBtb2NrLnJlc3BvbnNlID8gbW9jay5yZXNwb25zZSA6IFwiXCIsXG4gICAgICAgICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgICAgICAgICB0eXBlOiBcImpzb25cIixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAobW9jay5kZWxheSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhmaW5hbFJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9LCBtb2NrLmRlbGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZpbmFsUmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic29tZXRoaW5nIHdlbnQgd3JvbmchXCIpO1xuICAgIH0pO1xufSk7XG5jb25zdCBnZXRMb2cgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3Qgc2VwYXJhdG9yID0gcmVxdWVzdC51cmwuaW5kZXhPZihcIj9cIik7XG4gICAgY29uc3QgdXJsID0gc2VwYXJhdG9yICE9PSAtMSA/IHJlcXVlc3QudXJsLnN1YnN0cigwLCBzZXBhcmF0b3IpIDogcmVxdWVzdC51cmw7XG4gICAgY29uc3QgcXVlcnlQYXJhbXMgPSBzZXBhcmF0b3IgIT09IC0xXG4gICAgICAgID8gSlNPTi5zdHJpbmdpZnkoKDAsIHF1ZXJ5X3N0cmluZ18xLnBhcnNlKShyZXF1ZXN0LnVybC5zdWJzdHIoc2VwYXJhdG9yKSkpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIGxldCBib2R5ID0gcmVxdWVzdC5ib2R5O1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgY29uc3Qgc3RyaW5naWZpZWRCb2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgICAgICAgICBib2R5ID0gc3RyaW5naWZpZWRCb2R5O1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGJvZHkgPSBcIlVuc3VwcG9ydGVkIGJvZHkgdHlwZSFcIjtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVxdWVzdDoge1xuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zLFxuICAgICAgICAgICAgbWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcbiAgICAgICAgICAgIGhlYWRlcnM6ICgwLCBoZWxwZXJfMS5nZXRIZWFkZXJzKShyZXF1ZXN0LmhlYWRlcnMpLFxuICAgICAgICB9LFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICAgaWQ6IChfYSA9IHJlcXVlc3QubW9ra3UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pZCxcbiAgICB9O1xufTtcbnhob29rXzEuZGVmYXVsdC5hZnRlcihmdW5jdGlvbiAocmVxdWVzdCwgb3JpZ2luYWxSZXNwb25zZSkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3JpZ2luYWxSZXNwb25zZS5jbG9uZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IG9yaWdpbmFsUmVzcG9uc2UuY2xvbmUoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UudGV4dCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBnZXRMb2cocmVxdWVzdCwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLnRleHQsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6ICgwLCBoZWxwZXJfMS5nZXRIZWFkZXJzKShyZXNwb25zZS5oZWFkZXJzKSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZShkYXRhLCBcIkxPR1wiLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS50ZXh0KCkudGhlbigoc3RyZWFtZWRSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gZ2V0TG9nKHJlcXVlc3QsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IHN0cmVhbWVkUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiAoMCwgaGVscGVyXzEuZ2V0SGVhZGVycykocmVzcG9uc2UuaGVhZGVycyksXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZShkYXRhLCBcIkxPR1wiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gZ2V0TG9nKHJlcXVlc3QsIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IG9yaWdpbmFsUmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlOiB0eXBlb2Ygb3JpZ2luYWxSZXNwb25zZS50ZXh0ID09PSBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgID8gb3JpZ2luYWxSZXNwb25zZS50ZXh0XG4gICAgICAgICAgICAgICAgICAgIDogXCJDYW5ub3QgcGFyc2UgcmVzcG9uc2UsIGxvZ2dpbmcgbGlicmFyaWVzIGNhbiBjYXVzZSB0aGlzLlwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6ICgwLCBoZWxwZXJfMS5nZXRIZWFkZXJzKShvcmlnaW5hbFJlc3BvbnNlLmhlYWRlcnMpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwb3N0TWVzc2FnZShkYXRhLCBcIkxPR1wiLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBnZXRMb2cocmVxdWVzdCwge1xuICAgICAgICAgICAgc3RhdHVzOiAwLFxuICAgICAgICAgICAgcmVzcG9uc2U6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGhlYWRlcnM6IFtdLFxuICAgICAgICB9KTtcbiAgICAgICAgcG9zdE1lc3NhZ2UoZGF0YSwgXCJMT0dcIiwgZmFsc2UpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIklOSkVDVF9FUlJPUlwiLCBlcnJvcik7XG4gICAgfVxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0SGVhZGVycyA9IGV4cG9ydHMuZ2V0RXJyb3IgPSBleHBvcnRzLmlzVmFsaWRKU09OID0gdm9pZCAwO1xuY29uc3QgaXNWYWxpZEpTT04gPSAoanNvbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgIHJldHVybiB7IGVycm9yOiB1bmRlZmluZWQgfTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICBsZXQgbGluZU51bWJlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QganNvbkVycm9yUmVnZXggPSBuZXcgUmVnRXhwKC8oPzw9XFxicG9zaXRpb25cXHMpKFxcdyspL2cpO1xuICAgICAgICBjb25zdCBzdHJpbmdpZmllZEVycm9yID0gZS50b1N0cmluZygpO1xuICAgICAgICBpZiAoc3RyaW5naWZpZWRFcnJvciAhPT0gXCJVbmV4cGVjdGVkIGVuZCBvZiBKU09OIGlucHV0XCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBqc29uRXJyb3JSZWdleC5leGVjKHN0cmluZ2lmaWVkRXJyb3IpO1xuICAgICAgICAgICAgcG9zaXRpb24gPSB4ICYmIHgubGVuZ3RoID4gMCA/IHBhcnNlSW50KHhbMF0sIDEwKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIGxpbmVOdW1iZXIgPSAxO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwganNvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gcG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChqc29uW2ldID09PSBcIlxcblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lTnVtYmVyKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBqc29uRXJyb3JSZWdleC5sYXN0SW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlcnJvcjogYCR7c3RyaW5naWZpZWRFcnJvcn0ke2xpbmVOdW1iZXIgPyBcIiBhbmQgYXQgbGluZSBudW1iZXIgXCIgKyBsaW5lTnVtYmVyIDogXCJcIn1gLFxuICAgICAgICAgICAgcG9zaXRpb24sXG4gICAgICAgICAgICBsaW5lTnVtYmVyLFxuICAgICAgICB9O1xuICAgIH1cbn07XG5leHBvcnRzLmlzVmFsaWRKU09OID0gaXNWYWxpZEpTT047XG5jb25zdCBnZXRFcnJvciA9IChlcnJvcnMpID0+IHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZXJyb3JzKTtcbiAgICBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGVycm9yc1trZXlzWzBdXTtcbiAgICB9XG59O1xuZXhwb3J0cy5nZXRFcnJvciA9IGdldEVycm9yO1xuY29uc3QgZ2V0SGVhZGVycyA9IChoZWFkZXJzKSA9PiB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGhlYWRlcnMpLm1hcCgobmFtZSkgPT4gKHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgdmFsdWU6IGhlYWRlcnNbbmFtZV0sXG4gICAgfSkpO1xufTtcbmV4cG9ydHMuZ2V0SGVhZGVycyA9IGdldEhlYWRlcnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIElkRmFjdG9yeSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2lkID0gMDtcbiAgICB9XG4gICAgZ2V0SWQoKSB7XG4gICAgICAgIHRoaXMuX2lkKys7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBJZEZhY3Rvcnk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICpcbiAqIEluamVjdFxuICogICAgIC0+IENvbnRlbnQgU2NyaXB0XG4gKlxuICogQ29udGVudCBzY3JpcHQgaXMgYnJpZGdlIGJldHdlZW4gcGFuZWwgYW5kIGluamVjdCBmb3IgY29tbXVuaWNhdGlvblxuICogYXMgaXQgaGFzIGJvdGggd2luZG93cyBldmVudCBsaXN0ZXJuIGFuZCBjaHJvbWUgcnVudGltZSBtZXNzYWdlIGxpc3RuZXJcbiAqIENvbnRlbnQgU2NyaXB0XG4gKiAgICAgLT4gUGFuZWxcbiAqICAgICAtPiBIb29rXG4gKlxuICogUGFuZWxcbiAqICAgICAtPiBDb250ZW50IFNjcmlwdFxuICovXG5jb25zdCB0dW5uZWxNYXAgPSB7XG4gICAgXCJIT09LOkNPTlRFTlRcIjogXCJ3aW5kb3dcIixcbiAgICBcIkNPTlRFTlQ6SE9PS1wiOiBcIndpbmRvd1wiLFxuICAgIFwiQ09OVEVOVDpQQU5FTFwiOiBcInRhYlwiLFxuICAgIFwiUEFORUw6Q09OVEVOVFwiOiBcInJ1bnRpbWVcIixcbn07XG5jb25zdCBzZW5kID0gKHByb3BzLCB0YWJJZCkgPT4ge1xuICAgIGNvbnN0IHBhdGggPSB0dW5uZWxNYXBbYCR7cHJvcHMudG99OiR7cHJvcHMuZnJvbX1gXTtcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xuICAgICAgICB3aW5kb3c6ICgpID0+IHdpbmRvdy5wb3N0TWVzc2FnZShPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHByb3BzKSwgeyBleHRlbnNpb25OYW1lOiBcIk1PS0tVXCIgfSksIFwiKlwiKSxcbiAgICAgICAgcnVudGltZTogKCkgPT4gY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwcm9wcyksIHsgZXh0ZW5zaW9uTmFtZTogXCJNT0tLVVwiIH0pKSxcbiAgICAgICAgdGFiOiAoKSA9PiB7XG4gICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJJZCwgcHJvcHMpO1xuICAgICAgICB9LFxuICAgIH07XG4gICAgc2VydmljZVtwYXRoXShwcm9wcyk7XG59O1xuY29uc3QgbGlzdGVuID0gKGVudGl0eSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xuICAgICAgICBydW50aW1lOiAoKSA9PiB7XG4gICAgICAgICAgICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIF9zZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLnRvICE9PSBlbnRpdHkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhtZXNzYWdlLCBfc2VuZGVyLCBzZW5kUmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHdpbmRvdzogKCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFdlIG9ubHkgYWNjZXB0IG1lc3NhZ2VzIGZyb20gb3Vyc2VsdmVzXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSAhPT0gd2luZG93KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudG8gIT09IGVudGl0eSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfTtcbiAgICBzd2l0Y2ggKGVudGl0eSkge1xuICAgICAgICBjYXNlIFwiSE9PS1wiOiB7XG4gICAgICAgICAgICBzZXJ2aWNlW1wid2luZG93XCJdKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIkNPTlRFTlRcIjoge1xuICAgICAgICAgICAgc2VydmljZVtcIndpbmRvd1wiXSgpO1xuICAgICAgICAgICAgc2VydmljZVtcInJ1bnRpbWVcIl0oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiUEFORUxcIjoge1xuICAgICAgICAgICAgc2VydmljZVtcInJ1bnRpbWVcIl0oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbn07XG5leHBvcnRzLmRlZmF1bHQgPSB7IHNlbmQsIGxpc3RlbiB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBNZXNzYWdlQnVzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fY29sbGVjdG9yID0ge307XG4gICAgICAgIHRoaXMuX2RlZmF1bHRMaXN0bmVyID0gY29uc29sZS5sb2c7XG4gICAgICAgIHRoaXMuX2NvbGxlY3RvciA9IHt9O1xuICAgIH1cbiAgICBkaXNwYXRjaChpZCwgZXZlbnREYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLl9jb2xsZWN0b3JbaWRdKSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0b3JbaWRdKGV2ZW50RGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0TGlzdG5lcihldmVudERhdGEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFkZExpc3RlcihpZCwgZnVuYykge1xuICAgICAgICB0aGlzLl9jb2xsZWN0b3JbaWRdID0gZnVuYztcbiAgICB9XG4gICAgY3JlYXRlRGVmYXVsdExpc3RlbmVyKGZ1bmMpIHtcbiAgICAgICAgdGhpcy5fZGVmYXVsdExpc3RuZXIgPSBmdW5jO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IE1lc3NhZ2VCdXM7XG4iXSwic291cmNlUm9vdCI6IiJ9