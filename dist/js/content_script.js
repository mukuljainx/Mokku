/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/decode-uri-component/index.js":
/*!****************************************************!*\
  !*** ./node_modules/decode-uri-component/index.js ***!
  \****************************************************/
/***/ ((module) => {


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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
/***/ ((module) => {



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
/***/ ((module) => {


module.exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);


/***/ }),

/***/ "./src/contentScript/injectToDom.ts":
/*!******************************************!*\
  !*** ./src/contentScript/injectToDom.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const inject = () => {
    // Inject Script to user's DOM
    const s = document.createElement("script");
    s.src = chrome.runtime.getURL("js/inject.js");
    (document.head || document.documentElement).appendChild(s);
};
exports["default"] = inject;


/***/ }),

/***/ "./src/mokku-web-app-connector/contentScriptV2.ts":
/*!********************************************************!*\
  !*** ./src/mokku-web-app-connector/contentScriptV2.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.contentScriptV2 = void 0;
const injectToDom_1 = __importDefault(__webpack_require__(/*! ../contentScript/injectToDom */ "./src/contentScript/injectToDom.ts"));
const service_1 = __webpack_require__(/*! ../panel/App/service */ "./src/panel/App/service/index.ts");
const functionExecutor_1 = __webpack_require__(/*! ./functionExecutor */ "./src/mokku-web-app-connector/functionExecutor.ts");
console.log("Content Script v2");
const port = chrome.runtime.connect({ name: "mokku-content-script" });
const contentScriptV2 = () => {
    const init = () => {
        port.onMessage.addListener((message) => __awaiter(void 0, void 0, void 0, function* () {
            // messaged received from service worker
            const mock = message === null || message === void 0 ? void 0 : message.mockResponse;
            const request = message === null || message === void 0 ? void 0 : message.request;
            if (!mock) {
                service_1.messageService.send({
                    from: "CONTENT",
                    to: "HOOK",
                    extensionName: "MOKKU",
                    message,
                    id: message.id,
                });
            }
            else {
                if (mock.type === "FUNCTION" && mock.function && mock.active) {
                    const result = yield (0, functionExecutor_1.runFunction)(mock.function, request.queryParams, request.body);
                    mock.response = result;
                }
                service_1.messageService.send({
                    from: "CONTENT",
                    to: "HOOK",
                    extensionName: "MOKKU",
                    message,
                    id: message.id,
                });
                service_1.messageService.send({
                    from: "CONTENT",
                    to: "PANEL",
                    extensionName: "MOKKU",
                    message,
                    id: message.id,
                });
            }
        }));
        service_1.messageService.listen("CONTENT", (data) => {
            if (data.type === "CHECK_MOCK") {
                port.postMessage(data);
            }
            if (data.type === "LOG") {
                service_1.messageService.send(Object.assign(Object.assign({}, data), { from: "CONTENT", to: "PANEL" }));
            }
        });
    };
    const host = location.host;
    const isLocalhost = location.href.includes("http://localhost");
    chrome.storage.local.get([`mokku.extension.active.${host}`], function (result) {
        let active = result[`mokku.extension.active.${host}`];
        if (isLocalhost && active === undefined) {
            active = true;
        }
        if (active) {
            // injects script to page's DOM
            (0, injectToDom_1.default)();
            init();
        }
        // tell the panel about the new injection (host might have changed)
        service_1.messageService.send({
            message: host,
            type: "INIT",
            from: "CONTENT",
            to: "PANEL",
            extensionName: "MOKKU",
        });
    });
};
exports.contentScriptV2 = contentScriptV2;


/***/ }),

/***/ "./src/mokku-web-app-connector/functionExecutor.ts":
/*!*********************************************************!*\
  !*** ./src/mokku-web-app-connector/functionExecutor.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.runFunction = void 0;
const query_string_1 = __importDefault(__webpack_require__(/*! query-string */ "./node_modules/query-string/index.js"));
const fixedHeader = "function handler(req, res) {";
const fixedFooter = "}";
// Initialize the worker
function runFunction(funcString, queriesString, body) {
    return new Promise((resolve, reject) => {
        // Create worker from a Blob URL to embed worker code directly
        const workerCode = `
                // --- Web Worker Script ---

                // 1. Neuter/Undefine sensitive APIs
                // Strict mode for the worker
                'use strict';

                const originalConsole = self.console;
                self.console = undefined; 

                // Network
                self.fetch = () => Promise.reject(new Error('Fetch API is disabled in this sandbox.'));
                self.XMLHttpRequest = function() { throw new Error('XMLHttpRequest is disabled in this sandbox.'); };
                self.WebSocket = function() { throw new Error('WebSocket is disabled in this sandbox.'); };
                self.EventSource = function() { throw new Error('EventSource is disabled in this sandbox.'); };

                // Storage
                try {
                    Object.defineProperty(self, 'localStorage', { get: () => { throw new Error('localStorage is disabled.'); } });
                    Object.defineProperty(self, 'sessionStorage', { get: () => { throw new Error('sessionStorage is disabled.'); } });
                    Object.defineProperty(self, 'indexedDB', { get: () => { throw new Error('indexedDB is disabled.'); } });
                    Object.defineProperty(self, 'caches', { get: () => { throw new Error('Caches API is disabled.'); } });
                } catch (e) {
                    originalConsole.warn('Could not redefine storage properties:', e.message);
                }


                // Worker control
                self.importScripts = function() { throw new Error('importScripts is disabled in this sandbox.'); };
                if (self.navigator && self.navigator.serviceWorker) {
                    self.navigator.serviceWorker = undefined;
                }
                
                // Location
                if (self.navigator && self.navigator.geolocation) {
                    self.navigator.geolocation = undefined;
                }

                // Other potentially sensitive global properties (this is not exhaustive)
                // self.open = undefined; // for window.open like behavior if ever possible in worker
                // self.alert = undefined; // not typically available but good practice
                // self.confirm = undefined;
                // self.prompt = undefined;
                
                // DOM related (mostly not available, but to be sure)
                self.document = undefined;
                self.window = undefined; // self is the global scope, but good to undefine 'window' explicitly

                // Access to global constructors that might be misused for prototype pollution or other attacks
                // (Be careful with this, as it might break legitimate user code if they rely on these for type checks etc.)
                // Example:
                Object.constructor = undefined; 
                Array.constructor = undefined;
                
                self.onmessage = function(event) {
                    originalConsole.log('Worker received message:', event.data);
                    const { queries, body } = event.data;
                    


                    const finalFunction = ${fixedHeader}${funcString}${fixedFooter};

                    try {
                        // 2. Create the function using new Function.
                        // The userFunctionString is the BODY of the function.
                        // 'queries' and 'body' are the parameter names.
                        
                        Function.constructor = undefined; // This would break our own use of new Function if done before it.
                        
                        // 3. Execute the user's function
                        const result = finalFunction(queries, body);

                        
                        // 4. Send the result back
                        self.postMessage({ success: true, result: result });
                    } catch (error) {
                        self.postMessage({ 
                            success: false, 
                            error: { 
                                name: error.name, 
                                message: error.message, 
                                stack: error.stack // Be cautious about sending full stack traces to the client
                            }
                        });
                    }
                };
            `;
        const blob = new Blob([workerCode], { type: "application/javascript" });
        const worker = new Worker(URL.createObjectURL(blob));
        worker.onmessage = function (event) {
            console.log("worker", event);
            if (event.data.success) {
                console.log("Result:\n" + JSON.stringify(event.data.result, null, 2));
                resolve(event.data.result);
            }
            else {
                let errorMessage = "Error: " +
                    event.data.error.name +
                    " - " +
                    event.data.error.message;
                if (event.data.error.stack) {
                    // Optionally, include stack for debugging, but be mindful of info disclosure
                    // errorMessage += '\nStack: ' + event.data.error.stack;
                }
                console.log("errorMessage", errorMessage);
                reject(errorMessage);
            }
        };
        worker.onerror = function (error) {
            console.error("Worker error:", error);
            reject(error);
            // Re-initialize worker on catastrophic error if needed, or provide a reset button
            // initializeWorker();
        };
        worker.postMessage({
            queries: query_string_1.default.parse(queriesString),
            body: body,
        });
    });
}
exports.runFunction = runFunction;


/***/ }),

/***/ "./src/panel/App/service/index.ts":
/*!****************************************!*\
  !*** ./src/panel/App/service/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.messageService = void 0;
const messageService_1 = __importDefault(__webpack_require__(/*! ./messageService */ "./src/panel/App/service/messageService.ts"));
exports.messageService = messageService_1.default;


/***/ }),

/***/ "./src/panel/App/service/messageService.ts":
/*!*************************************************!*\
  !*** ./src/panel/App/service/messageService.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
    "CONTENT:PANEL": "runtime",
    "CONTENT:SERVICE_WORKER": "runtime",
    "PANEL:CONTENT": "tab",
    "SERVICE_WORKER:CONTENT": "runtime",
    "SERVICE_WORKER:PANEL": "runtime",
};
const send = (props, tabId) => {
    const pathKey = `${props.from}:${props.to}`;
    const path = tunnelMap[pathKey];
    const service = {
        window: () => window.postMessage(props, "*"),
        runtime: () => chrome.runtime.sendMessage(props),
        tab: () => chrome.tabs.sendMessage(tabId, props),
    };
    if (service[path]) {
        service[path](props);
    }
    else {
        console.error(`Mokku MessageService: No path defined for ${pathKey}`);
    }
};
const listen = (entity, callback) => {
    const service = {
        runtime: () => {
            const func = (message, _sender, sendResponse) => {
                if (message.to !== entity)
                    return;
                callback(message, _sender, sendResponse);
            };
            chrome.runtime.onMessage.addListener(func);
            return () => chrome.runtime.onMessage.removeListener(func);
        },
        window: () => {
            const func = (event) => {
                // We only accept messages from ourselves
                if (event.source !== window)
                    return;
                const data = event.data;
                if (data.to !== entity)
                    return;
                callback(data);
            };
            window.addEventListener("message", func);
            return () => window.removeEventListener("message", func);
        },
    };
    switch (entity) {
        case "HOOK": {
            return [service["window"]()];
        }
        case "CONTENT": {
            return [service["window"](), service["runtime"]()];
        }
        case "PANEL": {
            return [service["runtime"]()];
        }
        case "SERVICE_WORKER": {
            return [service["runtime"]()];
        }
    }
};
exports["default"] = { send, listen };


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*******************************!*\
  !*** ./src/content_script.ts ***!
  \*******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const contentScriptV2_1 = __webpack_require__(/*! ./mokku-web-app-connector/contentScriptV2 */ "./src/mokku-web-app-connector/contentScriptV2.ts");
// const init = () => {
//     let store, urlMap, dynamicUrlMap: IDynamicURLMap;
//     getStore().then((a) => {
//         store = a.store;
//         urlMap = a.urlMap;
//         dynamicUrlMap = a.dynamicUrlMap;
//     });
//     const getMockPath = (url: string, method: string) => {
//         // this will moved to store.ts
//         if (urlMap[url]) {
//             if (urlMap[url][method]) {
//                 return urlMap[url][method];
//             }
//         }
//         const url1 = url.replace("://", "-");
//         const key = url1.split("/").length;
//         // match all dynamics route
//         const stack = dynamicUrlMap[key];
//         if (!stack) return [];
//         let i = 0;
//         while (i < stack.length) {
//             // there is more to it will be used when
//             // action are introduced
//             const s = stack[i];
//             if (s.method === method && !!s.match(url1)) {
//                 return [s.getterKey];
//             }
//             i++;
//         }
//         return [];
//     };
//     const updateStore = () => {
//         getStore().then((x) => {
//             store = x.store;
//             urlMap = x.urlMap;
//             dynamicUrlMap = x.dynamicUrlMap;
//         });
//     };
//     const getActiveMockWithPath = (paths: string[]) => {
//         let mock = null;
//         let path = null;
//         paths.some((tempPath) => {
//             const tempMock = get(store, tempPath, null);
//             if (tempMock.active) {
//                 mock = tempMock;
//                 path = path;
//                 return true;
//             }
//             return false;
//         });
//         if (mock) {
//             return { mock, path };
//         }
//         return { mock: null, path: null };
//     };
//     messageService.listen("CONTENT", (data: IEventMessage) => {
//         if (data.type === "LOG") {
//             const message = data.message as ILog;
//             const mockPaths = getMockPath(
//                 message.request.url,
//                 message.request.method,
//             );
//             const { mock, path } = getActiveMockWithPath(mockPaths);
//             if (mock) {
//                 message.isMocked = mock.active;
//                 message.mockPath = path;
//             }
//             messageService.send({
//                 message,
//                 type: "LOG",
//                 from: "CONTENT",
//                 to: "PANEL",
//                 extensionName: "MOKKU",
//             });
//             return;
//         }
//         if (data.type === "NOTIFICATION" && data.message === "UPDATE_STORE") {
//             updateStore();
//             return;
//         }
//         const response: Omit<IEventMessage, "type"> = {
//             id: data.id,
//             from: "CONTENT",
//             to: "HOOK",
//             extensionName: "MOKKU",
//             message: {},
//         };
//         const request = (data.message as ILog).request;
//         const mockPaths = getMockPath(request.url, request.method);
//         const { mock } = getActiveMockWithPath(mockPaths);
//         if (mock && mock.active) {
//             (response.message as ILog).mockResponse = mock;
//         }
//         messageService.send(response);
//     });
// };
// const host = location.host;
// const isLocalhost = location.href.includes("http://localhost");
// chrome.storage.local.get([`mokku.extension.active.${host}`], function (result) {
//     let active = result[`mokku.extension.active.${host}`];
//     if (isLocalhost && active === undefined) {
//         active = true;
//     }
//     if (active) {
//         // injects script to page's DOM
//         inject();
//         init();
//     }
//     // tell the panel about the new injection (host might have changed)
//     messageService.send({
//         message: host,
//         type: "INIT",
//         from: "CONTENT",
//         to: "PANEL",
//         extensionName: "MOKKU",
//     });
// });
(0, contentScriptV2_1.contentScriptV2)();
// console.log("XZ");
// inject();
// messageService.listen("CONTENT", (data: IEventMessage) => {
//     console.log("content: \n", data);
//     if (data.type === "LOG") {
//         const message = data.message as ILog;
//         console.log("Sending to panel");
//         messageService.send({
//             message,
//             type: "LOG",
//             from: "CONTENT",
//             to: "PANEL",
//             extensionName: "MOKKU",
//         });
//         console.log("Sending to service worker");
//         messageService.send({
//             message,
//             type: "LOG",
//             from: "CONTENT",
//             to: "SERVICE_WORKER",
//             extensionName: "MOKKU",
//         });
//     }
// });

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudF9zY3JpcHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsdUJBQXVCLEVBQUU7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsa0JBQWtCLG1CQUFtQjtBQUNyQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsaUJBQWlCLG9CQUFvQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM3RmE7QUFDYix3QkFBd0IsbUJBQU8sQ0FBQyxvRUFBbUI7QUFDbkQsd0JBQXdCLG1CQUFPLENBQUMsMEVBQXNCO0FBQ3RELHFCQUFxQixtQkFBTyxDQUFDLDhEQUFnQjs7QUFFN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7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QkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixhQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsdURBQXVELEtBQUs7QUFDNUQscURBQXFELEtBQUs7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL01va2t1Ly4vbm9kZV9tb2R1bGVzL2RlY29kZS11cmktY29tcG9uZW50L2luZGV4LmpzIiwid2VicGFjazovL01va2t1Ly4vbm9kZV9tb2R1bGVzL3F1ZXJ5LXN0cmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9Nb2trdS8uL25vZGVfbW9kdWxlcy9zcGxpdC1vbi1maXJzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9Nb2trdS8uL25vZGVfbW9kdWxlcy9zdHJpY3QtdXJpLWVuY29kZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9Nb2trdS8uL3NyYy9jb250ZW50U2NyaXB0L2luamVjdFRvRG9tLnRzIiwid2VicGFjazovL01va2t1Ly4vc3JjL21va2t1LXdlYi1hcHAtY29ubmVjdG9yL2NvbnRlbnRTY3JpcHRWMi50cyIsIndlYnBhY2s6Ly9Nb2trdS8uL3NyYy9tb2trdS13ZWItYXBwLWNvbm5lY3Rvci9mdW5jdGlvbkV4ZWN1dG9yLnRzIiwid2VicGFjazovL01va2t1Ly4vc3JjL3BhbmVsL0FwcC9zZXJ2aWNlL2luZGV4LnRzIiwid2VicGFjazovL01va2t1Ly4vc3JjL3BhbmVsL0FwcC9zZXJ2aWNlL21lc3NhZ2VTZXJ2aWNlLnRzIiwid2VicGFjazovL01va2t1L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL01va2t1Ly4vc3JjL2NvbnRlbnRfc2NyaXB0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbnZhciB0b2tlbiA9ICclW2EtZjAtOV17Mn0nO1xudmFyIHNpbmdsZU1hdGNoZXIgPSBuZXcgUmVnRXhwKHRva2VuLCAnZ2knKTtcbnZhciBtdWx0aU1hdGNoZXIgPSBuZXcgUmVnRXhwKCcoJyArIHRva2VuICsgJykrJywgJ2dpJyk7XG5cbmZ1bmN0aW9uIGRlY29kZUNvbXBvbmVudHMoY29tcG9uZW50cywgc3BsaXQpIHtcblx0dHJ5IHtcblx0XHQvLyBUcnkgdG8gZGVjb2RlIHRoZSBlbnRpcmUgc3RyaW5nIGZpcnN0XG5cdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChjb21wb25lbnRzLmpvaW4oJycpKTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gRG8gbm90aGluZ1xuXHR9XG5cblx0aWYgKGNvbXBvbmVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0cmV0dXJuIGNvbXBvbmVudHM7XG5cdH1cblxuXHRzcGxpdCA9IHNwbGl0IHx8IDE7XG5cblx0Ly8gU3BsaXQgdGhlIGFycmF5IGluIDIgcGFydHNcblx0dmFyIGxlZnQgPSBjb21wb25lbnRzLnNsaWNlKDAsIHNwbGl0KTtcblx0dmFyIHJpZ2h0ID0gY29tcG9uZW50cy5zbGljZShzcGxpdCk7XG5cblx0cmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuY2FsbChbXSwgZGVjb2RlQ29tcG9uZW50cyhsZWZ0KSwgZGVjb2RlQ29tcG9uZW50cyhyaWdodCkpO1xufVxuXG5mdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGlucHV0KTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0dmFyIHRva2VucyA9IGlucHV0Lm1hdGNoKHNpbmdsZU1hdGNoZXIpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDE7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlucHV0ID0gZGVjb2RlQ29tcG9uZW50cyh0b2tlbnMsIGkpLmpvaW4oJycpO1xuXG5cdFx0XHR0b2tlbnMgPSBpbnB1dC5tYXRjaChzaW5nbGVNYXRjaGVyKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gaW5wdXQ7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3VzdG9tRGVjb2RlVVJJQ29tcG9uZW50KGlucHV0KSB7XG5cdC8vIEtlZXAgdHJhY2sgb2YgYWxsIHRoZSByZXBsYWNlbWVudHMgYW5kIHByZWZpbGwgdGhlIG1hcCB3aXRoIHRoZSBgQk9NYFxuXHR2YXIgcmVwbGFjZU1hcCA9IHtcblx0XHQnJUZFJUZGJzogJ1xcdUZGRkRcXHVGRkZEJyxcblx0XHQnJUZGJUZFJzogJ1xcdUZGRkRcXHVGRkZEJ1xuXHR9O1xuXG5cdHZhciBtYXRjaCA9IG11bHRpTWF0Y2hlci5leGVjKGlucHV0KTtcblx0d2hpbGUgKG1hdGNoKSB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIERlY29kZSBhcyBiaWcgY2h1bmtzIGFzIHBvc3NpYmxlXG5cdFx0XHRyZXBsYWNlTWFwW21hdGNoWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFswXSk7XG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZGVjb2RlKG1hdGNoWzBdKTtcblxuXHRcdFx0aWYgKHJlc3VsdCAhPT0gbWF0Y2hbMF0pIHtcblx0XHRcdFx0cmVwbGFjZU1hcFttYXRjaFswXV0gPSByZXN1bHQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bWF0Y2ggPSBtdWx0aU1hdGNoZXIuZXhlYyhpbnB1dCk7XG5cdH1cblxuXHQvLyBBZGQgYCVDMmAgYXQgdGhlIGVuZCBvZiB0aGUgbWFwIHRvIG1ha2Ugc3VyZSBpdCBkb2VzIG5vdCByZXBsYWNlIHRoZSBjb21iaW5hdG9yIGJlZm9yZSBldmVyeXRoaW5nIGVsc2Vcblx0cmVwbGFjZU1hcFsnJUMyJ10gPSAnXFx1RkZGRCc7XG5cblx0dmFyIGVudHJpZXMgPSBPYmplY3Qua2V5cyhyZXBsYWNlTWFwKTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcblx0XHQvLyBSZXBsYWNlIGFsbCBkZWNvZGVkIGNvbXBvbmVudHNcblx0XHR2YXIga2V5ID0gZW50cmllc1tpXTtcblx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UobmV3IFJlZ0V4cChrZXksICdnJyksIHJlcGxhY2VNYXBba2V5XSk7XG5cdH1cblxuXHRyZXR1cm4gaW5wdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVuY29kZWRVUkkpIHtcblx0aWYgKHR5cGVvZiBlbmNvZGVkVVJJICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGBlbmNvZGVkVVJJYCB0byBiZSBvZiB0eXBlIGBzdHJpbmdgLCBnb3QgYCcgKyB0eXBlb2YgZW5jb2RlZFVSSSArICdgJyk7XG5cdH1cblxuXHR0cnkge1xuXHRcdGVuY29kZWRVUkkgPSBlbmNvZGVkVVJJLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuXG5cdFx0Ly8gVHJ5IHRoZSBidWlsdCBpbiBkZWNvZGVyIGZpcnN0XG5cdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlbmNvZGVkVVJJKTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gRmFsbGJhY2sgdG8gYSBtb3JlIGFkdmFuY2VkIGRlY29kZXJcblx0XHRyZXR1cm4gY3VzdG9tRGVjb2RlVVJJQ29tcG9uZW50KGVuY29kZWRVUkkpO1xuXHR9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3Qgc3RyaWN0VXJpRW5jb2RlID0gcmVxdWlyZSgnc3RyaWN0LXVyaS1lbmNvZGUnKTtcbmNvbnN0IGRlY29kZUNvbXBvbmVudCA9IHJlcXVpcmUoJ2RlY29kZS11cmktY29tcG9uZW50Jyk7XG5jb25zdCBzcGxpdE9uRmlyc3QgPSByZXF1aXJlKCdzcGxpdC1vbi1maXJzdCcpO1xuXG5jb25zdCBpc051bGxPclVuZGVmaW5lZCA9IHZhbHVlID0+IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGVuY29kZXJGb3JBcnJheUZvcm1hdChvcHRpb25zKSB7XG5cdHN3aXRjaCAob3B0aW9ucy5hcnJheUZvcm1hdCkge1xuXHRcdGNhc2UgJ2luZGV4Jzpcblx0XHRcdHJldHVybiBrZXkgPT4gKHJlc3VsdCwgdmFsdWUpID0+IHtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSByZXN1bHQubGVuZ3RoO1xuXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcE51bGwgJiYgdmFsdWUgPT09IG51bGwpIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcEVtcHR5U3RyaW5nICYmIHZhbHVlID09PSAnJylcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBbZW5jb2RlKGtleSwgb3B0aW9ucyksICdbJywgaW5kZXgsICddJ10uam9pbignJyldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0XHQuLi5yZXN1bHQsXG5cdFx0XHRcdFx0W2VuY29kZShrZXksIG9wdGlvbnMpLCAnWycsIGVuY29kZShpbmRleCwgb3B0aW9ucyksICddPScsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4oJycpXG5cdFx0XHRcdF07XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnYnJhY2tldCc6XG5cdFx0XHRyZXR1cm4ga2V5ID0+IChyZXN1bHQsIHZhbHVlKSA9PiB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcE51bGwgJiYgdmFsdWUgPT09IG51bGwpIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcEVtcHR5U3RyaW5nICYmIHZhbHVlID09PSAnJylcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBbZW5jb2RlKGtleSwgb3B0aW9ucyksICdbXSddLmpvaW4oJycpXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBbZW5jb2RlKGtleSwgb3B0aW9ucyksICdbXT0nLCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKCcnKV07XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnY29tbWEnOlxuXHRcdGNhc2UgJ3NlcGFyYXRvcic6XG5cdFx0XHRyZXR1cm4ga2V5ID0+IChyZXN1bHQsIHZhbHVlKSA9PiB7XG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHJldHVybiBbW2VuY29kZShrZXksIG9wdGlvbnMpLCAnPScsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4oJycpXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbW3Jlc3VsdCwgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbihvcHRpb25zLmFycmF5Rm9ybWF0U2VwYXJhdG9yKV07XG5cdFx0XHR9O1xuXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBrZXkgPT4gKHJlc3VsdCwgdmFsdWUpID0+IHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHZhbHVlID09PSB1bmRlZmluZWQgfHxcblx0XHRcdFx0XHQob3B0aW9ucy5za2lwTnVsbCAmJiB2YWx1ZSA9PT0gbnVsbCkgfHxcblx0XHRcdFx0XHQob3B0aW9ucy5za2lwRW1wdHlTdHJpbmcgJiYgdmFsdWUgPT09ICcnKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFsuLi5yZXN1bHQsIGVuY29kZShrZXksIG9wdGlvbnMpXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBbZW5jb2RlKGtleSwgb3B0aW9ucyksICc9JywgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbignJyldO1xuXHRcdFx0fTtcblx0fVxufVxuXG5mdW5jdGlvbiBwYXJzZXJGb3JBcnJheUZvcm1hdChvcHRpb25zKSB7XG5cdGxldCByZXN1bHQ7XG5cblx0c3dpdGNoIChvcHRpb25zLmFycmF5Rm9ybWF0KSB7XG5cdFx0Y2FzZSAnaW5kZXgnOlxuXHRcdFx0cmV0dXJuIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikgPT4ge1xuXHRcdFx0XHRyZXN1bHQgPSAvXFxbKFxcZCopXFxdJC8uZXhlYyhrZXkpO1xuXG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC9cXFtcXGQqXFxdJC8sICcnKTtcblxuXHRcdFx0XHRpZiAoIXJlc3VsdCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYWNjdW11bGF0b3Jba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHt9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XVtyZXN1bHRbMV1dID0gdmFsdWU7XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnYnJhY2tldCc6XG5cdFx0XHRyZXR1cm4gKGtleSwgdmFsdWUsIGFjY3VtdWxhdG9yKSA9PiB7XG5cdFx0XHRcdHJlc3VsdCA9IC8oXFxbXFxdKSQvLmV4ZWMoa2V5KTtcblx0XHRcdFx0a2V5ID0ga2V5LnJlcGxhY2UoL1xcW1xcXSQvLCAnJyk7XG5cblx0XHRcdFx0aWYgKCFyZXN1bHQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbdmFsdWVdO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbXS5jb25jYXQoYWNjdW11bGF0b3Jba2V5XSwgdmFsdWUpO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2NvbW1hJzpcblx0XHRjYXNlICdzZXBhcmF0b3InOlxuXHRcdFx0cmV0dXJuIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikgPT4ge1xuXHRcdFx0XHRjb25zdCBpc0FycmF5ID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5zcGxpdCgnJykuaW5kZXhPZihvcHRpb25zLmFycmF5Rm9ybWF0U2VwYXJhdG9yKSA+IC0xO1xuXHRcdFx0XHRjb25zdCBuZXdWYWx1ZSA9IGlzQXJyYXkgPyB2YWx1ZS5zcGxpdChvcHRpb25zLmFycmF5Rm9ybWF0U2VwYXJhdG9yKS5tYXAoaXRlbSA9PiBkZWNvZGUoaXRlbSwgb3B0aW9ucykpIDogdmFsdWUgPT09IG51bGwgPyB2YWx1ZSA6IGRlY29kZSh2YWx1ZSwgb3B0aW9ucyk7XG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBuZXdWYWx1ZTtcblx0XHRcdH07XG5cblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikgPT4ge1xuXHRcdFx0XHRpZiAoYWNjdW11bGF0b3Jba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbXS5jb25jYXQoYWNjdW11bGF0b3Jba2V5XSwgdmFsdWUpO1xuXHRcdFx0fTtcblx0fVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUFycmF5Rm9ybWF0U2VwYXJhdG9yKHZhbHVlKSB7XG5cdGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnIHx8IHZhbHVlLmxlbmd0aCAhPT0gMSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2FycmF5Rm9ybWF0U2VwYXJhdG9yIG11c3QgYmUgc2luZ2xlIGNoYXJhY3RlciBzdHJpbmcnKTtcblx0fVxufVxuXG5mdW5jdGlvbiBlbmNvZGUodmFsdWUsIG9wdGlvbnMpIHtcblx0aWYgKG9wdGlvbnMuZW5jb2RlKSB7XG5cdFx0cmV0dXJuIG9wdGlvbnMuc3RyaWN0ID8gc3RyaWN0VXJpRW5jb2RlKHZhbHVlKSA6IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGRlY29kZSh2YWx1ZSwgb3B0aW9ucykge1xuXHRpZiAob3B0aW9ucy5kZWNvZGUpIHtcblx0XHRyZXR1cm4gZGVjb2RlQ29tcG9uZW50KHZhbHVlKTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24ga2V5c1NvcnRlcihpbnB1dCkge1xuXHRpZiAoQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcblx0XHRyZXR1cm4gaW5wdXQuc29ydCgpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcpIHtcblx0XHRyZXR1cm4ga2V5c1NvcnRlcihPYmplY3Qua2V5cyhpbnB1dCkpXG5cdFx0XHQuc29ydCgoYSwgYikgPT4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpKVxuXHRcdFx0Lm1hcChrZXkgPT4gaW5wdXRba2V5XSk7XG5cdH1cblxuXHRyZXR1cm4gaW5wdXQ7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUhhc2goaW5wdXQpIHtcblx0Y29uc3QgaGFzaFN0YXJ0ID0gaW5wdXQuaW5kZXhPZignIycpO1xuXHRpZiAoaGFzaFN0YXJ0ICE9PSAtMSkge1xuXHRcdGlucHV0ID0gaW5wdXQuc2xpY2UoMCwgaGFzaFN0YXJ0KTtcblx0fVxuXG5cdHJldHVybiBpbnB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0SGFzaCh1cmwpIHtcblx0bGV0IGhhc2ggPSAnJztcblx0Y29uc3QgaGFzaFN0YXJ0ID0gdXJsLmluZGV4T2YoJyMnKTtcblx0aWYgKGhhc2hTdGFydCAhPT0gLTEpIHtcblx0XHRoYXNoID0gdXJsLnNsaWNlKGhhc2hTdGFydCk7XG5cdH1cblxuXHRyZXR1cm4gaGFzaDtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdChpbnB1dCkge1xuXHRpbnB1dCA9IHJlbW92ZUhhc2goaW5wdXQpO1xuXHRjb25zdCBxdWVyeVN0YXJ0ID0gaW5wdXQuaW5kZXhPZignPycpO1xuXHRpZiAocXVlcnlTdGFydCA9PT0gLTEpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRyZXR1cm4gaW5wdXQuc2xpY2UocXVlcnlTdGFydCArIDEpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVZhbHVlKHZhbHVlLCBvcHRpb25zKSB7XG5cdGlmIChvcHRpb25zLnBhcnNlTnVtYmVycyAmJiAhTnVtYmVyLmlzTmFOKE51bWJlcih2YWx1ZSkpICYmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLnRyaW0oKSAhPT0gJycpKSB7XG5cdFx0dmFsdWUgPSBOdW1iZXIodmFsdWUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMucGFyc2VCb29sZWFucyAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAodmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnIHx8IHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICdmYWxzZScpKSB7XG5cdFx0dmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSc7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHBhcnNlKGlucHV0LCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRkZWNvZGU6IHRydWUsXG5cdFx0c29ydDogdHJ1ZSxcblx0XHRhcnJheUZvcm1hdDogJ25vbmUnLFxuXHRcdGFycmF5Rm9ybWF0U2VwYXJhdG9yOiAnLCcsXG5cdFx0cGFyc2VOdW1iZXJzOiBmYWxzZSxcblx0XHRwYXJzZUJvb2xlYW5zOiBmYWxzZVxuXHR9LCBvcHRpb25zKTtcblxuXHR2YWxpZGF0ZUFycmF5Rm9ybWF0U2VwYXJhdG9yKG9wdGlvbnMuYXJyYXlGb3JtYXRTZXBhcmF0b3IpO1xuXG5cdGNvbnN0IGZvcm1hdHRlciA9IHBhcnNlckZvckFycmF5Rm9ybWF0KG9wdGlvbnMpO1xuXG5cdC8vIENyZWF0ZSBhbiBvYmplY3Qgd2l0aCBubyBwcm90b3R5cGVcblx0Y29uc3QgcmV0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuXHRpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRpbnB1dCA9IGlucHV0LnRyaW0oKS5yZXBsYWNlKC9eWz8jJl0vLCAnJyk7XG5cblx0aWYgKCFpbnB1dCkge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRmb3IgKGNvbnN0IHBhcmFtIG9mIGlucHV0LnNwbGl0KCcmJykpIHtcblx0XHRsZXQgW2tleSwgdmFsdWVdID0gc3BsaXRPbkZpcnN0KG9wdGlvbnMuZGVjb2RlID8gcGFyYW0ucmVwbGFjZSgvXFwrL2csICcgJykgOiBwYXJhbSwgJz0nKTtcblxuXHRcdC8vIE1pc3NpbmcgYD1gIHNob3VsZCBiZSBgbnVsbGA6XG5cdFx0Ly8gaHR0cDovL3czLm9yZy9UUi8yMDEyL1dELXVybC0yMDEyMDUyNC8jY29sbGVjdC11cmwtcGFyYW1ldGVyc1xuXHRcdHZhbHVlID0gdmFsdWUgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBbJ2NvbW1hJywgJ3NlcGFyYXRvciddLmluY2x1ZGVzKG9wdGlvbnMuYXJyYXlGb3JtYXQpID8gdmFsdWUgOiBkZWNvZGUodmFsdWUsIG9wdGlvbnMpO1xuXHRcdGZvcm1hdHRlcihkZWNvZGUoa2V5LCBvcHRpb25zKSwgdmFsdWUsIHJldCk7XG5cdH1cblxuXHRmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZXQpKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSByZXRba2V5XTtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuXHRcdFx0Zm9yIChjb25zdCBrIG9mIE9iamVjdC5rZXlzKHZhbHVlKSkge1xuXHRcdFx0XHR2YWx1ZVtrXSA9IHBhcnNlVmFsdWUodmFsdWVba10sIG9wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXRba2V5XSA9IHBhcnNlVmFsdWUodmFsdWUsIG9wdGlvbnMpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNvcnQgPT09IGZhbHNlKSB7XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXG5cdHJldHVybiAob3B0aW9ucy5zb3J0ID09PSB0cnVlID8gT2JqZWN0LmtleXMocmV0KS5zb3J0KCkgOiBPYmplY3Qua2V5cyhyZXQpLnNvcnQob3B0aW9ucy5zb3J0KSkucmVkdWNlKChyZXN1bHQsIGtleSkgPT4ge1xuXHRcdGNvbnN0IHZhbHVlID0gcmV0W2tleV07XG5cdFx0aWYgKEJvb2xlYW4odmFsdWUpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHQvLyBTb3J0IG9iamVjdCBrZXlzLCBub3QgdmFsdWVzXG5cdFx0XHRyZXN1bHRba2V5XSA9IGtleXNTb3J0ZXIodmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHRba2V5XSA9IHZhbHVlO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sIE9iamVjdC5jcmVhdGUobnVsbCkpO1xufVxuXG5leHBvcnRzLmV4dHJhY3QgPSBleHRyYWN0O1xuZXhwb3J0cy5wYXJzZSA9IHBhcnNlO1xuXG5leHBvcnRzLnN0cmluZ2lmeSA9IChvYmplY3QsIG9wdGlvbnMpID0+IHtcblx0aWYgKCFvYmplY3QpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0ZW5jb2RlOiB0cnVlLFxuXHRcdHN0cmljdDogdHJ1ZSxcblx0XHRhcnJheUZvcm1hdDogJ25vbmUnLFxuXHRcdGFycmF5Rm9ybWF0U2VwYXJhdG9yOiAnLCdcblx0fSwgb3B0aW9ucyk7XG5cblx0dmFsaWRhdGVBcnJheUZvcm1hdFNlcGFyYXRvcihvcHRpb25zLmFycmF5Rm9ybWF0U2VwYXJhdG9yKTtcblxuXHRjb25zdCBzaG91bGRGaWx0ZXIgPSBrZXkgPT4gKFxuXHRcdChvcHRpb25zLnNraXBOdWxsICYmIGlzTnVsbE9yVW5kZWZpbmVkKG9iamVjdFtrZXldKSkgfHxcblx0XHQob3B0aW9ucy5za2lwRW1wdHlTdHJpbmcgJiYgb2JqZWN0W2tleV0gPT09ICcnKVxuXHQpO1xuXG5cdGNvbnN0IGZvcm1hdHRlciA9IGVuY29kZXJGb3JBcnJheUZvcm1hdChvcHRpb25zKTtcblxuXHRjb25zdCBvYmplY3RDb3B5ID0ge307XG5cblx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqZWN0KSkge1xuXHRcdGlmICghc2hvdWxkRmlsdGVyKGtleSkpIHtcblx0XHRcdG9iamVjdENvcHlba2V5XSA9IG9iamVjdFtrZXldO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3RDb3B5KTtcblxuXHRpZiAob3B0aW9ucy5zb3J0ICE9PSBmYWxzZSkge1xuXHRcdGtleXMuc29ydChvcHRpb25zLnNvcnQpO1xuXHR9XG5cblx0cmV0dXJuIGtleXMubWFwKGtleSA9PiB7XG5cdFx0Y29uc3QgdmFsdWUgPSBvYmplY3Rba2V5XTtcblxuXHRcdGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXG5cdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gZW5jb2RlKGtleSwgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHRcdFx0LnJlZHVjZShmb3JtYXR0ZXIoa2V5KSwgW10pXG5cdFx0XHRcdC5qb2luKCcmJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGVuY29kZShrZXksIG9wdGlvbnMpICsgJz0nICsgZW5jb2RlKHZhbHVlLCBvcHRpb25zKTtcblx0fSkuZmlsdGVyKHggPT4geC5sZW5ndGggPiAwKS5qb2luKCcmJyk7XG59O1xuXG5leHBvcnRzLnBhcnNlVXJsID0gKGlucHV0LCBvcHRpb25zKSA9PiB7XG5cdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRkZWNvZGU6IHRydWVcblx0fSwgb3B0aW9ucyk7XG5cblx0Y29uc3QgW3VybCwgaGFzaF0gPSBzcGxpdE9uRmlyc3QoaW5wdXQsICcjJyk7XG5cblx0cmV0dXJuIE9iamVjdC5hc3NpZ24oXG5cdFx0e1xuXHRcdFx0dXJsOiB1cmwuc3BsaXQoJz8nKVswXSB8fCAnJyxcblx0XHRcdHF1ZXJ5OiBwYXJzZShleHRyYWN0KGlucHV0KSwgb3B0aW9ucylcblx0XHR9LFxuXHRcdG9wdGlvbnMgJiYgb3B0aW9ucy5wYXJzZUZyYWdtZW50SWRlbnRpZmllciAmJiBoYXNoID8ge2ZyYWdtZW50SWRlbnRpZmllcjogZGVjb2RlKGhhc2gsIG9wdGlvbnMpfSA6IHt9XG5cdCk7XG59O1xuXG5leHBvcnRzLnN0cmluZ2lmeVVybCA9IChpbnB1dCwgb3B0aW9ucykgPT4ge1xuXHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0ZW5jb2RlOiB0cnVlLFxuXHRcdHN0cmljdDogdHJ1ZVxuXHR9LCBvcHRpb25zKTtcblxuXHRjb25zdCB1cmwgPSByZW1vdmVIYXNoKGlucHV0LnVybCkuc3BsaXQoJz8nKVswXSB8fCAnJztcblx0Y29uc3QgcXVlcnlGcm9tVXJsID0gZXhwb3J0cy5leHRyYWN0KGlucHV0LnVybCk7XG5cdGNvbnN0IHBhcnNlZFF1ZXJ5RnJvbVVybCA9IGV4cG9ydHMucGFyc2UocXVlcnlGcm9tVXJsLCB7c29ydDogZmFsc2V9KTtcblxuXHRjb25zdCBxdWVyeSA9IE9iamVjdC5hc3NpZ24ocGFyc2VkUXVlcnlGcm9tVXJsLCBpbnB1dC5xdWVyeSk7XG5cdGxldCBxdWVyeVN0cmluZyA9IGV4cG9ydHMuc3RyaW5naWZ5KHF1ZXJ5LCBvcHRpb25zKTtcblx0aWYgKHF1ZXJ5U3RyaW5nKSB7XG5cdFx0cXVlcnlTdHJpbmcgPSBgPyR7cXVlcnlTdHJpbmd9YDtcblx0fVxuXG5cdGxldCBoYXNoID0gZ2V0SGFzaChpbnB1dC51cmwpO1xuXHRpZiAoaW5wdXQuZnJhZ21lbnRJZGVudGlmaWVyKSB7XG5cdFx0aGFzaCA9IGAjJHtlbmNvZGUoaW5wdXQuZnJhZ21lbnRJZGVudGlmaWVyLCBvcHRpb25zKX1gO1xuXHR9XG5cblx0cmV0dXJuIGAke3VybH0ke3F1ZXJ5U3RyaW5nfSR7aGFzaH1gO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAoc3RyaW5nLCBzZXBhcmF0b3IpID0+IHtcblx0aWYgKCEodHlwZW9mIHN0cmluZyA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHNlcGFyYXRvciA9PT0gJ3N0cmluZycpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIGFyZ3VtZW50cyB0byBiZSBvZiB0eXBlIGBzdHJpbmdgJyk7XG5cdH1cblxuXHRpZiAoc2VwYXJhdG9yID09PSAnJykge1xuXHRcdHJldHVybiBbc3RyaW5nXTtcblx0fVxuXG5cdGNvbnN0IHNlcGFyYXRvckluZGV4ID0gc3RyaW5nLmluZGV4T2Yoc2VwYXJhdG9yKTtcblxuXHRpZiAoc2VwYXJhdG9ySW5kZXggPT09IC0xKSB7XG5cdFx0cmV0dXJuIFtzdHJpbmddO1xuXHR9XG5cblx0cmV0dXJuIFtcblx0XHRzdHJpbmcuc2xpY2UoMCwgc2VwYXJhdG9ySW5kZXgpLFxuXHRcdHN0cmluZy5zbGljZShzZXBhcmF0b3JJbmRleCArIHNlcGFyYXRvci5sZW5ndGgpXG5cdF07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBzdHIgPT4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCkqXS9nLCB4ID0+IGAlJHt4LmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9YCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGluamVjdCA9ICgpID0+IHtcbiAgICAvLyBJbmplY3QgU2NyaXB0IHRvIHVzZXIncyBET01cbiAgICBjb25zdCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBzLnNyYyA9IGNocm9tZS5ydW50aW1lLmdldFVSTChcImpzL2luamVjdC5qc1wiKTtcbiAgICAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmFwcGVuZENoaWxkKHMpO1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGluamVjdDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbnRlbnRTY3JpcHRWMiA9IHZvaWQgMDtcbmNvbnN0IGluamVjdFRvRG9tXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2NvbnRlbnRTY3JpcHQvaW5qZWN0VG9Eb21cIikpO1xuY29uc3Qgc2VydmljZV8xID0gcmVxdWlyZShcIi4uL3BhbmVsL0FwcC9zZXJ2aWNlXCIpO1xuY29uc3QgZnVuY3Rpb25FeGVjdXRvcl8xID0gcmVxdWlyZShcIi4vZnVuY3Rpb25FeGVjdXRvclwiKTtcbmNvbnNvbGUubG9nKFwiQ29udGVudCBTY3JpcHQgdjJcIik7XG5jb25zdCBwb3J0ID0gY2hyb21lLnJ1bnRpbWUuY29ubmVjdCh7IG5hbWU6IFwibW9ra3UtY29udGVudC1zY3JpcHRcIiB9KTtcbmNvbnN0IGNvbnRlbnRTY3JpcHRWMiA9ICgpID0+IHtcbiAgICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgICAgICBwb3J0Lm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAvLyBtZXNzYWdlZCByZWNlaXZlZCBmcm9tIHNlcnZpY2Ugd29ya2VyXG4gICAgICAgICAgICBjb25zdCBtb2NrID0gbWVzc2FnZSA9PT0gbnVsbCB8fCBtZXNzYWdlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNzYWdlLm1vY2tSZXNwb25zZTtcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBtZXNzYWdlID09PSBudWxsIHx8IG1lc3NhZ2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc3NhZ2UucmVxdWVzdDtcbiAgICAgICAgICAgIGlmICghbW9jaykge1xuICAgICAgICAgICAgICAgIHNlcnZpY2VfMS5tZXNzYWdlU2VydmljZS5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogXCJDT05URU5UXCIsXG4gICAgICAgICAgICAgICAgICAgIHRvOiBcIkhPT0tcIixcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uTmFtZTogXCJNT0tLVVwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBpZDogbWVzc2FnZS5pZCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChtb2NrLnR5cGUgPT09IFwiRlVOQ1RJT05cIiAmJiBtb2NrLmZ1bmN0aW9uICYmIG1vY2suYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHlpZWxkICgwLCBmdW5jdGlvbkV4ZWN1dG9yXzEucnVuRnVuY3Rpb24pKG1vY2suZnVuY3Rpb24sIHJlcXVlc3QucXVlcnlQYXJhbXMsIHJlcXVlc3QuYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIG1vY2sucmVzcG9uc2UgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlcnZpY2VfMS5tZXNzYWdlU2VydmljZS5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogXCJDT05URU5UXCIsXG4gICAgICAgICAgICAgICAgICAgIHRvOiBcIkhPT0tcIixcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uTmFtZTogXCJNT0tLVVwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBpZDogbWVzc2FnZS5pZCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlXzEubWVzc2FnZVNlcnZpY2Uuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIGZyb206IFwiQ09OVEVOVFwiLFxuICAgICAgICAgICAgICAgICAgICB0bzogXCJQQU5FTFwiLFxuICAgICAgICAgICAgICAgICAgICBleHRlbnNpb25OYW1lOiBcIk1PS0tVXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBtZXNzYWdlLmlkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICAgIHNlcnZpY2VfMS5tZXNzYWdlU2VydmljZS5saXN0ZW4oXCJDT05URU5UXCIsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSBcIkNIRUNLX01PQ0tcIikge1xuICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSBcIkxPR1wiKSB7XG4gICAgICAgICAgICAgICAgc2VydmljZV8xLm1lc3NhZ2VTZXJ2aWNlLnNlbmQoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBkYXRhKSwgeyBmcm9tOiBcIkNPTlRFTlRcIiwgdG86IFwiUEFORUxcIiB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc3QgaG9zdCA9IGxvY2F0aW9uLmhvc3Q7XG4gICAgY29uc3QgaXNMb2NhbGhvc3QgPSBsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFwiaHR0cDovL2xvY2FsaG9zdFwiKTtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW2Btb2trdS5leHRlbnNpb24uYWN0aXZlLiR7aG9zdH1gXSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICBsZXQgYWN0aXZlID0gcmVzdWx0W2Btb2trdS5leHRlbnNpb24uYWN0aXZlLiR7aG9zdH1gXTtcbiAgICAgICAgaWYgKGlzTG9jYWxob3N0ICYmIGFjdGl2ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICAgIC8vIGluamVjdHMgc2NyaXB0IHRvIHBhZ2UncyBET01cbiAgICAgICAgICAgICgwLCBpbmplY3RUb0RvbV8xLmRlZmF1bHQpKCk7XG4gICAgICAgICAgICBpbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGVsbCB0aGUgcGFuZWwgYWJvdXQgdGhlIG5ldyBpbmplY3Rpb24gKGhvc3QgbWlnaHQgaGF2ZSBjaGFuZ2VkKVxuICAgICAgICBzZXJ2aWNlXzEubWVzc2FnZVNlcnZpY2Uuc2VuZCh7XG4gICAgICAgICAgICBtZXNzYWdlOiBob3N0LFxuICAgICAgICAgICAgdHlwZTogXCJJTklUXCIsXG4gICAgICAgICAgICBmcm9tOiBcIkNPTlRFTlRcIixcbiAgICAgICAgICAgIHRvOiBcIlBBTkVMXCIsXG4gICAgICAgICAgICBleHRlbnNpb25OYW1lOiBcIk1PS0tVXCIsXG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbmV4cG9ydHMuY29udGVudFNjcmlwdFYyID0gY29udGVudFNjcmlwdFYyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJ1bkZ1bmN0aW9uID0gdm9pZCAwO1xuY29uc3QgcXVlcnlfc3RyaW5nXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInF1ZXJ5LXN0cmluZ1wiKSk7XG5jb25zdCBmaXhlZEhlYWRlciA9IFwiZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1wiO1xuY29uc3QgZml4ZWRGb290ZXIgPSBcIn1cIjtcbi8vIEluaXRpYWxpemUgdGhlIHdvcmtlclxuZnVuY3Rpb24gcnVuRnVuY3Rpb24oZnVuY1N0cmluZywgcXVlcmllc1N0cmluZywgYm9keSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIENyZWF0ZSB3b3JrZXIgZnJvbSBhIEJsb2IgVVJMIHRvIGVtYmVkIHdvcmtlciBjb2RlIGRpcmVjdGx5XG4gICAgICAgIGNvbnN0IHdvcmtlckNvZGUgPSBgXG4gICAgICAgICAgICAgICAgLy8gLS0tIFdlYiBXb3JrZXIgU2NyaXB0IC0tLVxuXG4gICAgICAgICAgICAgICAgLy8gMS4gTmV1dGVyL1VuZGVmaW5lIHNlbnNpdGl2ZSBBUElzXG4gICAgICAgICAgICAgICAgLy8gU3RyaWN0IG1vZGUgZm9yIHRoZSB3b3JrZXJcbiAgICAgICAgICAgICAgICAndXNlIHN0cmljdCc7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbENvbnNvbGUgPSBzZWxmLmNvbnNvbGU7XG4gICAgICAgICAgICAgICAgc2VsZi5jb25zb2xlID0gdW5kZWZpbmVkOyBcblxuICAgICAgICAgICAgICAgIC8vIE5ldHdvcmtcbiAgICAgICAgICAgICAgICBzZWxmLmZldGNoID0gKCkgPT4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdGZXRjaCBBUEkgaXMgZGlzYWJsZWQgaW4gdGhpcyBzYW5kYm94LicpKTtcbiAgICAgICAgICAgICAgICBzZWxmLlhNTEh0dHBSZXF1ZXN0ID0gZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcignWE1MSHR0cFJlcXVlc3QgaXMgZGlzYWJsZWQgaW4gdGhpcyBzYW5kYm94LicpOyB9O1xuICAgICAgICAgICAgICAgIHNlbGYuV2ViU29ja2V0ID0gZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcignV2ViU29ja2V0IGlzIGRpc2FibGVkIGluIHRoaXMgc2FuZGJveC4nKTsgfTtcbiAgICAgICAgICAgICAgICBzZWxmLkV2ZW50U291cmNlID0gZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcignRXZlbnRTb3VyY2UgaXMgZGlzYWJsZWQgaW4gdGhpcyBzYW5kYm94LicpOyB9O1xuXG4gICAgICAgICAgICAgICAgLy8gU3RvcmFnZVxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCAnbG9jYWxTdG9yYWdlJywgeyBnZXQ6ICgpID0+IHsgdGhyb3cgbmV3IEVycm9yKCdsb2NhbFN0b3JhZ2UgaXMgZGlzYWJsZWQuJyk7IH0gfSk7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCAnc2Vzc2lvblN0b3JhZ2UnLCB7IGdldDogKCkgPT4geyB0aHJvdyBuZXcgRXJyb3IoJ3Nlc3Npb25TdG9yYWdlIGlzIGRpc2FibGVkLicpOyB9IH0pO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwgJ2luZGV4ZWREQicsIHsgZ2V0OiAoKSA9PiB7IHRocm93IG5ldyBFcnJvcignaW5kZXhlZERCIGlzIGRpc2FibGVkLicpOyB9IH0pO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwgJ2NhY2hlcycsIHsgZ2V0OiAoKSA9PiB7IHRocm93IG5ldyBFcnJvcignQ2FjaGVzIEFQSSBpcyBkaXNhYmxlZC4nKTsgfSB9KTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsQ29uc29sZS53YXJuKCdDb3VsZCBub3QgcmVkZWZpbmUgc3RvcmFnZSBwcm9wZXJ0aWVzOicsIGUubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAvLyBXb3JrZXIgY29udHJvbFxuICAgICAgICAgICAgICAgIHNlbGYuaW1wb3J0U2NyaXB0cyA9IGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoJ2ltcG9ydFNjcmlwdHMgaXMgZGlzYWJsZWQgaW4gdGhpcyBzYW5kYm94LicpOyB9O1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLm5hdmlnYXRvciAmJiBzZWxmLm5hdmlnYXRvci5zZXJ2aWNlV29ya2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIExvY2F0aW9uXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYubmF2aWdhdG9yICYmIHNlbGYubmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubmF2aWdhdG9yLmdlb2xvY2F0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIE90aGVyIHBvdGVudGlhbGx5IHNlbnNpdGl2ZSBnbG9iYWwgcHJvcGVydGllcyAodGhpcyBpcyBub3QgZXhoYXVzdGl2ZSlcbiAgICAgICAgICAgICAgICAvLyBzZWxmLm9wZW4gPSB1bmRlZmluZWQ7IC8vIGZvciB3aW5kb3cub3BlbiBsaWtlIGJlaGF2aW9yIGlmIGV2ZXIgcG9zc2libGUgaW4gd29ya2VyXG4gICAgICAgICAgICAgICAgLy8gc2VsZi5hbGVydCA9IHVuZGVmaW5lZDsgLy8gbm90IHR5cGljYWxseSBhdmFpbGFibGUgYnV0IGdvb2QgcHJhY3RpY2VcbiAgICAgICAgICAgICAgICAvLyBzZWxmLmNvbmZpcm0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgLy8gc2VsZi5wcm9tcHQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gRE9NIHJlbGF0ZWQgKG1vc3RseSBub3QgYXZhaWxhYmxlLCBidXQgdG8gYmUgc3VyZSlcbiAgICAgICAgICAgICAgICBzZWxmLmRvY3VtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHNlbGYud2luZG93ID0gdW5kZWZpbmVkOyAvLyBzZWxmIGlzIHRoZSBnbG9iYWwgc2NvcGUsIGJ1dCBnb29kIHRvIHVuZGVmaW5lICd3aW5kb3cnIGV4cGxpY2l0bHlcblxuICAgICAgICAgICAgICAgIC8vIEFjY2VzcyB0byBnbG9iYWwgY29uc3RydWN0b3JzIHRoYXQgbWlnaHQgYmUgbWlzdXNlZCBmb3IgcHJvdG90eXBlIHBvbGx1dGlvbiBvciBvdGhlciBhdHRhY2tzXG4gICAgICAgICAgICAgICAgLy8gKEJlIGNhcmVmdWwgd2l0aCB0aGlzLCBhcyBpdCBtaWdodCBicmVhayBsZWdpdGltYXRlIHVzZXIgY29kZSBpZiB0aGV5IHJlbHkgb24gdGhlc2UgZm9yIHR5cGUgY2hlY2tzIGV0Yy4pXG4gICAgICAgICAgICAgICAgLy8gRXhhbXBsZTpcbiAgICAgICAgICAgICAgICBPYmplY3QuY29uc3RydWN0b3IgPSB1bmRlZmluZWQ7IFxuICAgICAgICAgICAgICAgIEFycmF5LmNvbnN0cnVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNlbGYub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxDb25zb2xlLmxvZygnV29ya2VyIHJlY2VpdmVkIG1lc3NhZ2U6JywgZXZlbnQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgcXVlcmllcywgYm9keSB9ID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgXG5cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaW5hbEZ1bmN0aW9uID0gJHtmaXhlZEhlYWRlcn0ke2Z1bmNTdHJpbmd9JHtmaXhlZEZvb3Rlcn07XG5cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDIuIENyZWF0ZSB0aGUgZnVuY3Rpb24gdXNpbmcgbmV3IEZ1bmN0aW9uLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHVzZXJGdW5jdGlvblN0cmluZyBpcyB0aGUgQk9EWSBvZiB0aGUgZnVuY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAncXVlcmllcycgYW5kICdib2R5JyBhcmUgdGhlIHBhcmFtZXRlciBuYW1lcy5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgRnVuY3Rpb24uY29uc3RydWN0b3IgPSB1bmRlZmluZWQ7IC8vIFRoaXMgd291bGQgYnJlYWsgb3VyIG93biB1c2Ugb2YgbmV3IEZ1bmN0aW9uIGlmIGRvbmUgYmVmb3JlIGl0LlxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAzLiBFeGVjdXRlIHRoZSB1c2VyJ3MgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZpbmFsRnVuY3Rpb24ocXVlcmllcywgYm9keSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gNC4gU2VuZCB0aGUgcmVzdWx0IGJhY2tcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyBzdWNjZXNzOiB0cnVlLCByZXN1bHQ6IHJlc3VsdCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGVycm9yLm5hbWUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2s6IGVycm9yLnN0YWNrIC8vIEJlIGNhdXRpb3VzIGFib3V0IHNlbmRpbmcgZnVsbCBzdGFjayB0cmFjZXMgdG8gdGhlIGNsaWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGA7XG4gICAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbd29ya2VyQ29kZV0sIHsgdHlwZTogXCJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0XCIgfSk7XG4gICAgICAgIGNvbnN0IHdvcmtlciA9IG5ldyBXb3JrZXIoVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKSk7XG4gICAgICAgIHdvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid29ya2VyXCIsIGV2ZW50KTtcbiAgICAgICAgICAgIGlmIChldmVudC5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3VsdDpcXG5cIiArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRhdGEucmVzdWx0LCBudWxsLCAyKSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShldmVudC5kYXRhLnJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gXCJFcnJvcjogXCIgK1xuICAgICAgICAgICAgICAgICAgICBldmVudC5kYXRhLmVycm9yLm5hbWUgK1xuICAgICAgICAgICAgICAgICAgICBcIiAtIFwiICtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5lcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5kYXRhLmVycm9yLnN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHksIGluY2x1ZGUgc3RhY2sgZm9yIGRlYnVnZ2luZywgYnV0IGJlIG1pbmRmdWwgb2YgaW5mbyBkaXNjbG9zdXJlXG4gICAgICAgICAgICAgICAgICAgIC8vIGVycm9yTWVzc2FnZSArPSAnXFxuU3RhY2s6ICcgKyBldmVudC5kYXRhLmVycm9yLnN0YWNrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yTWVzc2FnZVwiLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB3b3JrZXIub25lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIldvcmtlciBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIC8vIFJlLWluaXRpYWxpemUgd29ya2VyIG9uIGNhdGFzdHJvcGhpYyBlcnJvciBpZiBuZWVkZWQsIG9yIHByb3ZpZGUgYSByZXNldCBidXR0b25cbiAgICAgICAgICAgIC8vIGluaXRpYWxpemVXb3JrZXIoKTtcbiAgICAgICAgfTtcbiAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIHF1ZXJpZXM6IHF1ZXJ5X3N0cmluZ18xLmRlZmF1bHQucGFyc2UocXVlcmllc1N0cmluZyksXG4gICAgICAgICAgICBib2R5OiBib2R5LFxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHMucnVuRnVuY3Rpb24gPSBydW5GdW5jdGlvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tZXNzYWdlU2VydmljZSA9IHZvaWQgMDtcbmNvbnN0IG1lc3NhZ2VTZXJ2aWNlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vbWVzc2FnZVNlcnZpY2VcIikpO1xuZXhwb3J0cy5tZXNzYWdlU2VydmljZSA9IG1lc3NhZ2VTZXJ2aWNlXzEuZGVmYXVsdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKlxuICogSW5qZWN0XG4gKiAgICAgLT4gQ29udGVudCBTY3JpcHRcbiAqXG4gKiBDb250ZW50IHNjcmlwdCBpcyBicmlkZ2UgYmV0d2VlbiBwYW5lbCBhbmQgaW5qZWN0IGZvciBjb21tdW5pY2F0aW9uXG4gKiBhcyBpdCBoYXMgYm90aCB3aW5kb3dzIGV2ZW50IGxpc3Rlcm4gYW5kIGNocm9tZSBydW50aW1lIG1lc3NhZ2UgbGlzdG5lclxuICogQ29udGVudCBTY3JpcHRcbiAqICAgICAtPiBQYW5lbFxuICogICAgIC0+IEhvb2tcbiAqXG4gKiBQYW5lbFxuICogICAgIC0+IENvbnRlbnQgU2NyaXB0XG4gKi9cbmNvbnN0IHR1bm5lbE1hcCA9IHtcbiAgICBcIkhPT0s6Q09OVEVOVFwiOiBcIndpbmRvd1wiLFxuICAgIFwiQ09OVEVOVDpIT09LXCI6IFwid2luZG93XCIsXG4gICAgXCJDT05URU5UOlBBTkVMXCI6IFwicnVudGltZVwiLFxuICAgIFwiQ09OVEVOVDpTRVJWSUNFX1dPUktFUlwiOiBcInJ1bnRpbWVcIixcbiAgICBcIlBBTkVMOkNPTlRFTlRcIjogXCJ0YWJcIixcbiAgICBcIlNFUlZJQ0VfV09SS0VSOkNPTlRFTlRcIjogXCJydW50aW1lXCIsXG4gICAgXCJTRVJWSUNFX1dPUktFUjpQQU5FTFwiOiBcInJ1bnRpbWVcIixcbn07XG5jb25zdCBzZW5kID0gKHByb3BzLCB0YWJJZCkgPT4ge1xuICAgIGNvbnN0IHBhdGhLZXkgPSBgJHtwcm9wcy5mcm9tfToke3Byb3BzLnRvfWA7XG4gICAgY29uc3QgcGF0aCA9IHR1bm5lbE1hcFtwYXRoS2V5XTtcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xuICAgICAgICB3aW5kb3c6ICgpID0+IHdpbmRvdy5wb3N0TWVzc2FnZShwcm9wcywgXCIqXCIpLFxuICAgICAgICBydW50aW1lOiAoKSA9PiBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShwcm9wcyksXG4gICAgICAgIHRhYjogKCkgPT4gY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiSWQsIHByb3BzKSxcbiAgICB9O1xuICAgIGlmIChzZXJ2aWNlW3BhdGhdKSB7XG4gICAgICAgIHNlcnZpY2VbcGF0aF0ocHJvcHMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgTW9ra3UgTWVzc2FnZVNlcnZpY2U6IE5vIHBhdGggZGVmaW5lZCBmb3IgJHtwYXRoS2V5fWApO1xuICAgIH1cbn07XG5jb25zdCBsaXN0ZW4gPSAoZW50aXR5LCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHNlcnZpY2UgPSB7XG4gICAgICAgIHJ1bnRpbWU6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZ1bmMgPSAobWVzc2FnZSwgX3NlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UudG8gIT09IGVudGl0eSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG1lc3NhZ2UsIF9zZW5kZXIsIHNlbmRSZXNwb25zZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmMpO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5yZW1vdmVMaXN0ZW5lcihmdW5jKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2luZG93OiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmdW5jID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gV2Ugb25seSBhY2NlcHQgbWVzc2FnZXMgZnJvbSBvdXJzZWx2ZXNcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlICE9PSB3aW5kb3cpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS50byAhPT0gZW50aXR5KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmMpO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBmdW5jKTtcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHN3aXRjaCAoZW50aXR5KSB7XG4gICAgICAgIGNhc2UgXCJIT09LXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBbc2VydmljZVtcIndpbmRvd1wiXSgpXTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiQ09OVEVOVFwiOiB7XG4gICAgICAgICAgICByZXR1cm4gW3NlcnZpY2VbXCJ3aW5kb3dcIl0oKSwgc2VydmljZVtcInJ1bnRpbWVcIl0oKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIlBBTkVMXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBbc2VydmljZVtcInJ1bnRpbWVcIl0oKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIlNFUlZJQ0VfV09SS0VSXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBbc2VydmljZVtcInJ1bnRpbWVcIl0oKV07XG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0geyBzZW5kLCBsaXN0ZW4gfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvbnRlbnRTY3JpcHRWMl8xID0gcmVxdWlyZShcIi4vbW9ra3Utd2ViLWFwcC1jb25uZWN0b3IvY29udGVudFNjcmlwdFYyXCIpO1xuLy8gY29uc3QgaW5pdCA9ICgpID0+IHtcbi8vICAgICBsZXQgc3RvcmUsIHVybE1hcCwgZHluYW1pY1VybE1hcDogSUR5bmFtaWNVUkxNYXA7XG4vLyAgICAgZ2V0U3RvcmUoKS50aGVuKChhKSA9PiB7XG4vLyAgICAgICAgIHN0b3JlID0gYS5zdG9yZTtcbi8vICAgICAgICAgdXJsTWFwID0gYS51cmxNYXA7XG4vLyAgICAgICAgIGR5bmFtaWNVcmxNYXAgPSBhLmR5bmFtaWNVcmxNYXA7XG4vLyAgICAgfSk7XG4vLyAgICAgY29uc3QgZ2V0TW9ja1BhdGggPSAodXJsOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nKSA9PiB7XG4vLyAgICAgICAgIC8vIHRoaXMgd2lsbCBtb3ZlZCB0byBzdG9yZS50c1xuLy8gICAgICAgICBpZiAodXJsTWFwW3VybF0pIHtcbi8vICAgICAgICAgICAgIGlmICh1cmxNYXBbdXJsXVttZXRob2RdKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHVybE1hcFt1cmxdW21ldGhvZF07XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgY29uc3QgdXJsMSA9IHVybC5yZXBsYWNlKFwiOi8vXCIsIFwiLVwiKTtcbi8vICAgICAgICAgY29uc3Qga2V5ID0gdXJsMS5zcGxpdChcIi9cIikubGVuZ3RoO1xuLy8gICAgICAgICAvLyBtYXRjaCBhbGwgZHluYW1pY3Mgcm91dGVcbi8vICAgICAgICAgY29uc3Qgc3RhY2sgPSBkeW5hbWljVXJsTWFwW2tleV07XG4vLyAgICAgICAgIGlmICghc3RhY2spIHJldHVybiBbXTtcbi8vICAgICAgICAgbGV0IGkgPSAwO1xuLy8gICAgICAgICB3aGlsZSAoaSA8IHN0YWNrLmxlbmd0aCkge1xuLy8gICAgICAgICAgICAgLy8gdGhlcmUgaXMgbW9yZSB0byBpdCB3aWxsIGJlIHVzZWQgd2hlblxuLy8gICAgICAgICAgICAgLy8gYWN0aW9uIGFyZSBpbnRyb2R1Y2VkXG4vLyAgICAgICAgICAgICBjb25zdCBzID0gc3RhY2tbaV07XG4vLyAgICAgICAgICAgICBpZiAocy5tZXRob2QgPT09IG1ldGhvZCAmJiAhIXMubWF0Y2godXJsMSkpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gW3MuZ2V0dGVyS2V5XTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIGkrKztcbi8vICAgICAgICAgfVxuLy8gICAgICAgICByZXR1cm4gW107XG4vLyAgICAgfTtcbi8vICAgICBjb25zdCB1cGRhdGVTdG9yZSA9ICgpID0+IHtcbi8vICAgICAgICAgZ2V0U3RvcmUoKS50aGVuKCh4KSA9PiB7XG4vLyAgICAgICAgICAgICBzdG9yZSA9IHguc3RvcmU7XG4vLyAgICAgICAgICAgICB1cmxNYXAgPSB4LnVybE1hcDtcbi8vICAgICAgICAgICAgIGR5bmFtaWNVcmxNYXAgPSB4LmR5bmFtaWNVcmxNYXA7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgIH07XG4vLyAgICAgY29uc3QgZ2V0QWN0aXZlTW9ja1dpdGhQYXRoID0gKHBhdGhzOiBzdHJpbmdbXSkgPT4ge1xuLy8gICAgICAgICBsZXQgbW9jayA9IG51bGw7XG4vLyAgICAgICAgIGxldCBwYXRoID0gbnVsbDtcbi8vICAgICAgICAgcGF0aHMuc29tZSgodGVtcFBhdGgpID0+IHtcbi8vICAgICAgICAgICAgIGNvbnN0IHRlbXBNb2NrID0gZ2V0KHN0b3JlLCB0ZW1wUGF0aCwgbnVsbCk7XG4vLyAgICAgICAgICAgICBpZiAodGVtcE1vY2suYWN0aXZlKSB7XG4vLyAgICAgICAgICAgICAgICAgbW9jayA9IHRlbXBNb2NrO1xuLy8gICAgICAgICAgICAgICAgIHBhdGggPSBwYXRoO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuLy8gICAgICAgICB9KTtcbi8vICAgICAgICAgaWYgKG1vY2spIHtcbi8vICAgICAgICAgICAgIHJldHVybiB7IG1vY2ssIHBhdGggfTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICByZXR1cm4geyBtb2NrOiBudWxsLCBwYXRoOiBudWxsIH07XG4vLyAgICAgfTtcbi8vICAgICBtZXNzYWdlU2VydmljZS5saXN0ZW4oXCJDT05URU5UXCIsIChkYXRhOiBJRXZlbnRNZXNzYWdlKSA9PiB7XG4vLyAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09IFwiTE9HXCIpIHtcbi8vICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2UgYXMgSUxvZztcbi8vICAgICAgICAgICAgIGNvbnN0IG1vY2tQYXRocyA9IGdldE1vY2tQYXRoKFxuLy8gICAgICAgICAgICAgICAgIG1lc3NhZ2UucmVxdWVzdC51cmwsXG4vLyAgICAgICAgICAgICAgICAgbWVzc2FnZS5yZXF1ZXN0Lm1ldGhvZCxcbi8vICAgICAgICAgICAgICk7XG4vLyAgICAgICAgICAgICBjb25zdCB7IG1vY2ssIHBhdGggfSA9IGdldEFjdGl2ZU1vY2tXaXRoUGF0aChtb2NrUGF0aHMpO1xuLy8gICAgICAgICAgICAgaWYgKG1vY2spIHtcbi8vICAgICAgICAgICAgICAgICBtZXNzYWdlLmlzTW9ja2VkID0gbW9jay5hY3RpdmU7XG4vLyAgICAgICAgICAgICAgICAgbWVzc2FnZS5tb2NrUGF0aCA9IHBhdGg7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBtZXNzYWdlU2VydmljZS5zZW5kKHtcbi8vICAgICAgICAgICAgICAgICBtZXNzYWdlLFxuLy8gICAgICAgICAgICAgICAgIHR5cGU6IFwiTE9HXCIsXG4vLyAgICAgICAgICAgICAgICAgZnJvbTogXCJDT05URU5UXCIsXG4vLyAgICAgICAgICAgICAgICAgdG86IFwiUEFORUxcIixcbi8vICAgICAgICAgICAgICAgICBleHRlbnNpb25OYW1lOiBcIk1PS0tVXCIsXG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICAgIHJldHVybjtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBpZiAoZGF0YS50eXBlID09PSBcIk5PVElGSUNBVElPTlwiICYmIGRhdGEubWVzc2FnZSA9PT0gXCJVUERBVEVfU1RPUkVcIikge1xuLy8gICAgICAgICAgICAgdXBkYXRlU3RvcmUoKTtcbi8vICAgICAgICAgICAgIHJldHVybjtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBjb25zdCByZXNwb25zZTogT21pdDxJRXZlbnRNZXNzYWdlLCBcInR5cGVcIj4gPSB7XG4vLyAgICAgICAgICAgICBpZDogZGF0YS5pZCxcbi8vICAgICAgICAgICAgIGZyb206IFwiQ09OVEVOVFwiLFxuLy8gICAgICAgICAgICAgdG86IFwiSE9PS1wiLFxuLy8gICAgICAgICAgICAgZXh0ZW5zaW9uTmFtZTogXCJNT0tLVVwiLFxuLy8gICAgICAgICAgICAgbWVzc2FnZToge30sXG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSAoZGF0YS5tZXNzYWdlIGFzIElMb2cpLnJlcXVlc3Q7XG4vLyAgICAgICAgIGNvbnN0IG1vY2tQYXRocyA9IGdldE1vY2tQYXRoKHJlcXVlc3QudXJsLCByZXF1ZXN0Lm1ldGhvZCk7XG4vLyAgICAgICAgIGNvbnN0IHsgbW9jayB9ID0gZ2V0QWN0aXZlTW9ja1dpdGhQYXRoKG1vY2tQYXRocyk7XG4vLyAgICAgICAgIGlmIChtb2NrICYmIG1vY2suYWN0aXZlKSB7XG4vLyAgICAgICAgICAgICAocmVzcG9uc2UubWVzc2FnZSBhcyBJTG9nKS5tb2NrUmVzcG9uc2UgPSBtb2NrO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLnNlbmQocmVzcG9uc2UpO1xuLy8gICAgIH0pO1xuLy8gfTtcbi8vIGNvbnN0IGhvc3QgPSBsb2NhdGlvbi5ob3N0O1xuLy8gY29uc3QgaXNMb2NhbGhvc3QgPSBsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFwiaHR0cDovL2xvY2FsaG9zdFwiKTtcbi8vIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbYG1va2t1LmV4dGVuc2lvbi5hY3RpdmUuJHtob3N0fWBdLCBmdW5jdGlvbiAocmVzdWx0KSB7XG4vLyAgICAgbGV0IGFjdGl2ZSA9IHJlc3VsdFtgbW9ra3UuZXh0ZW5zaW9uLmFjdGl2ZS4ke2hvc3R9YF07XG4vLyAgICAgaWYgKGlzTG9jYWxob3N0ICYmIGFjdGl2ZSA9PT0gdW5kZWZpbmVkKSB7XG4vLyAgICAgICAgIGFjdGl2ZSA9IHRydWU7XG4vLyAgICAgfVxuLy8gICAgIGlmIChhY3RpdmUpIHtcbi8vICAgICAgICAgLy8gaW5qZWN0cyBzY3JpcHQgdG8gcGFnZSdzIERPTVxuLy8gICAgICAgICBpbmplY3QoKTtcbi8vICAgICAgICAgaW5pdCgpO1xuLy8gICAgIH1cbi8vICAgICAvLyB0ZWxsIHRoZSBwYW5lbCBhYm91dCB0aGUgbmV3IGluamVjdGlvbiAoaG9zdCBtaWdodCBoYXZlIGNoYW5nZWQpXG4vLyAgICAgbWVzc2FnZVNlcnZpY2Uuc2VuZCh7XG4vLyAgICAgICAgIG1lc3NhZ2U6IGhvc3QsXG4vLyAgICAgICAgIHR5cGU6IFwiSU5JVFwiLFxuLy8gICAgICAgICBmcm9tOiBcIkNPTlRFTlRcIixcbi8vICAgICAgICAgdG86IFwiUEFORUxcIixcbi8vICAgICAgICAgZXh0ZW5zaW9uTmFtZTogXCJNT0tLVVwiLFxuLy8gICAgIH0pO1xuLy8gfSk7XG4oMCwgY29udGVudFNjcmlwdFYyXzEuY29udGVudFNjcmlwdFYyKSgpO1xuLy8gY29uc29sZS5sb2coXCJYWlwiKTtcbi8vIGluamVjdCgpO1xuLy8gbWVzc2FnZVNlcnZpY2UubGlzdGVuKFwiQ09OVEVOVFwiLCAoZGF0YTogSUV2ZW50TWVzc2FnZSkgPT4ge1xuLy8gICAgIGNvbnNvbGUubG9nKFwiY29udGVudDogXFxuXCIsIGRhdGEpO1xuLy8gICAgIGlmIChkYXRhLnR5cGUgPT09IFwiTE9HXCIpIHtcbi8vICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGRhdGEubWVzc2FnZSBhcyBJTG9nO1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlNlbmRpbmcgdG8gcGFuZWxcIik7XG4vLyAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLnNlbmQoe1xuLy8gICAgICAgICAgICAgbWVzc2FnZSxcbi8vICAgICAgICAgICAgIHR5cGU6IFwiTE9HXCIsXG4vLyAgICAgICAgICAgICBmcm9tOiBcIkNPTlRFTlRcIixcbi8vICAgICAgICAgICAgIHRvOiBcIlBBTkVMXCIsXG4vLyAgICAgICAgICAgICBleHRlbnNpb25OYW1lOiBcIk1PS0tVXCIsXG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlNlbmRpbmcgdG8gc2VydmljZSB3b3JrZXJcIik7XG4vLyAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLnNlbmQoe1xuLy8gICAgICAgICAgICAgbWVzc2FnZSxcbi8vICAgICAgICAgICAgIHR5cGU6IFwiTE9HXCIsXG4vLyAgICAgICAgICAgICBmcm9tOiBcIkNPTlRFTlRcIixcbi8vICAgICAgICAgICAgIHRvOiBcIlNFUlZJQ0VfV09SS0VSXCIsXG4vLyAgICAgICAgICAgICBleHRlbnNpb25OYW1lOiBcIk1PS0tVXCIsXG4vLyAgICAgICAgIH0pO1xuLy8gICAgIH1cbi8vIH0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9