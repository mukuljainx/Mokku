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
                    type: "LOG_MOCK_STATUS",
                    message: {
                        isMocked: true,
                        id: message.id,
                    },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudF9zY3JpcHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsdUJBQXVCLEVBQUU7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsa0JBQWtCLG1CQUFtQjtBQUNyQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsaUJBQWlCLG9CQUFvQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM3RmE7QUFDYix3QkFBd0IsbUJBQU8sQ0FBQyxvRUFBbUI7QUFDbkQsd0JBQXdCLG1CQUFPLENBQUMsMEVBQXNCO0FBQ3RELHFCQUFxQixtQkFBTyxDQUFDLDhEQUFnQjs7QUFFN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7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QUNaO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsYUFBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxLQUFLO0FBQzVELHFEQUFxRCxLQUFLO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUixJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLElBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Nb2trdS8uL25vZGVfbW9kdWxlcy9kZWNvZGUtdXJpLWNvbXBvbmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly9Nb2trdS8uL25vZGVfbW9kdWxlcy9xdWVyeS1zdHJpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9ub2RlX21vZHVsZXMvc3BsaXQtb24tZmlyc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9ub2RlX21vZHVsZXMvc3RyaWN0LXVyaS1lbmNvZGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9zcmMvY29udGVudFNjcmlwdC9pbmplY3RUb0RvbS50cyIsIndlYnBhY2s6Ly9Nb2trdS8uL3NyYy9tb2trdS13ZWItYXBwLWNvbm5lY3Rvci9jb250ZW50U2NyaXB0VjIudHMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9zcmMvbW9ra3Utd2ViLWFwcC1jb25uZWN0b3IvZnVuY3Rpb25FeGVjdXRvci50cyIsIndlYnBhY2s6Ly9Nb2trdS8uL3NyYy9wYW5lbC9BcHAvc2VydmljZS9pbmRleC50cyIsIndlYnBhY2s6Ly9Nb2trdS8uL3NyYy9wYW5lbC9BcHAvc2VydmljZS9tZXNzYWdlU2VydmljZS50cyIsIndlYnBhY2s6Ly9Nb2trdS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Nb2trdS8uL3NyYy9jb250ZW50X3NjcmlwdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG52YXIgdG9rZW4gPSAnJVthLWYwLTldezJ9JztcbnZhciBzaW5nbGVNYXRjaGVyID0gbmV3IFJlZ0V4cCh0b2tlbiwgJ2dpJyk7XG52YXIgbXVsdGlNYXRjaGVyID0gbmV3IFJlZ0V4cCgnKCcgKyB0b2tlbiArICcpKycsICdnaScpO1xuXG5mdW5jdGlvbiBkZWNvZGVDb21wb25lbnRzKGNvbXBvbmVudHMsIHNwbGl0KSB7XG5cdHRyeSB7XG5cdFx0Ly8gVHJ5IHRvIGRlY29kZSB0aGUgZW50aXJlIHN0cmluZyBmaXJzdFxuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoY29tcG9uZW50cy5qb2luKCcnKSk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIERvIG5vdGhpbmdcblx0fVxuXG5cdGlmIChjb21wb25lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdHJldHVybiBjb21wb25lbnRzO1xuXHR9XG5cblx0c3BsaXQgPSBzcGxpdCB8fCAxO1xuXG5cdC8vIFNwbGl0IHRoZSBhcnJheSBpbiAyIHBhcnRzXG5cdHZhciBsZWZ0ID0gY29tcG9uZW50cy5zbGljZSgwLCBzcGxpdCk7XG5cdHZhciByaWdodCA9IGNvbXBvbmVudHMuc2xpY2Uoc3BsaXQpO1xuXG5cdHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmNhbGwoW10sIGRlY29kZUNvbXBvbmVudHMobGVmdCksIGRlY29kZUNvbXBvbmVudHMocmlnaHQpKTtcbn1cblxuZnVuY3Rpb24gZGVjb2RlKGlucHV0KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChpbnB1dCk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdHZhciB0b2tlbnMgPSBpbnB1dC5tYXRjaChzaW5nbGVNYXRjaGVyKTtcblxuXHRcdGZvciAodmFyIGkgPSAxOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpbnB1dCA9IGRlY29kZUNvbXBvbmVudHModG9rZW5zLCBpKS5qb2luKCcnKTtcblxuXHRcdFx0dG9rZW5zID0gaW5wdXQubWF0Y2goc2luZ2xlTWF0Y2hlcik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGlucHV0O1xuXHR9XG59XG5cbmZ1bmN0aW9uIGN1c3RvbURlY29kZVVSSUNvbXBvbmVudChpbnB1dCkge1xuXHQvLyBLZWVwIHRyYWNrIG9mIGFsbCB0aGUgcmVwbGFjZW1lbnRzIGFuZCBwcmVmaWxsIHRoZSBtYXAgd2l0aCB0aGUgYEJPTWBcblx0dmFyIHJlcGxhY2VNYXAgPSB7XG5cdFx0JyVGRSVGRic6ICdcXHVGRkZEXFx1RkZGRCcsXG5cdFx0JyVGRiVGRSc6ICdcXHVGRkZEXFx1RkZGRCdcblx0fTtcblxuXHR2YXIgbWF0Y2ggPSBtdWx0aU1hdGNoZXIuZXhlYyhpbnB1dCk7XG5cdHdoaWxlIChtYXRjaCkge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBEZWNvZGUgYXMgYmlnIGNodW5rcyBhcyBwb3NzaWJsZVxuXHRcdFx0cmVwbGFjZU1hcFttYXRjaFswXV0gPSBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMF0pO1xuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlY29kZShtYXRjaFswXSk7XG5cblx0XHRcdGlmIChyZXN1bHQgIT09IG1hdGNoWzBdKSB7XG5cdFx0XHRcdHJlcGxhY2VNYXBbbWF0Y2hbMF1dID0gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdG1hdGNoID0gbXVsdGlNYXRjaGVyLmV4ZWMoaW5wdXQpO1xuXHR9XG5cblx0Ly8gQWRkIGAlQzJgIGF0IHRoZSBlbmQgb2YgdGhlIG1hcCB0byBtYWtlIHN1cmUgaXQgZG9lcyBub3QgcmVwbGFjZSB0aGUgY29tYmluYXRvciBiZWZvcmUgZXZlcnl0aGluZyBlbHNlXG5cdHJlcGxhY2VNYXBbJyVDMiddID0gJ1xcdUZGRkQnO1xuXG5cdHZhciBlbnRyaWVzID0gT2JqZWN0LmtleXMocmVwbGFjZU1hcCk7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Ly8gUmVwbGFjZSBhbGwgZGVjb2RlZCBjb21wb25lbnRzXG5cdFx0dmFyIGtleSA9IGVudHJpZXNbaV07XG5cdFx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoa2V5LCAnZycpLCByZXBsYWNlTWFwW2tleV0pO1xuXHR9XG5cblx0cmV0dXJuIGlucHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbmNvZGVkVVJJKSB7XG5cdGlmICh0eXBlb2YgZW5jb2RlZFVSSSAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBgZW5jb2RlZFVSSWAgdG8gYmUgb2YgdHlwZSBgc3RyaW5nYCwgZ290IGAnICsgdHlwZW9mIGVuY29kZWRVUkkgKyAnYCcpO1xuXHR9XG5cblx0dHJ5IHtcblx0XHRlbmNvZGVkVVJJID0gZW5jb2RlZFVSSS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcblxuXHRcdC8vIFRyeSB0aGUgYnVpbHQgaW4gZGVjb2RlciBmaXJzdFxuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZW5jb2RlZFVSSSk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIEZhbGxiYWNrIHRvIGEgbW9yZSBhZHZhbmNlZCBkZWNvZGVyXG5cdFx0cmV0dXJuIGN1c3RvbURlY29kZVVSSUNvbXBvbmVudChlbmNvZGVkVVJJKTtcblx0fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IHN0cmljdFVyaUVuY29kZSA9IHJlcXVpcmUoJ3N0cmljdC11cmktZW5jb2RlJyk7XG5jb25zdCBkZWNvZGVDb21wb25lbnQgPSByZXF1aXJlKCdkZWNvZGUtdXJpLWNvbXBvbmVudCcpO1xuY29uc3Qgc3BsaXRPbkZpcnN0ID0gcmVxdWlyZSgnc3BsaXQtb24tZmlyc3QnKTtcblxuY29uc3QgaXNOdWxsT3JVbmRlZmluZWQgPSB2YWx1ZSA9PiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBlbmNvZGVyRm9yQXJyYXlGb3JtYXQob3B0aW9ucykge1xuXHRzd2l0Y2ggKG9wdGlvbnMuYXJyYXlGb3JtYXQpIHtcblx0XHRjYXNlICdpbmRleCc6XG5cdFx0XHRyZXR1cm4ga2V5ID0+IChyZXN1bHQsIHZhbHVlKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gcmVzdWx0Lmxlbmd0aDtcblxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0dmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBOdWxsICYmIHZhbHVlID09PSBudWxsKSB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBFbXB0eVN0cmluZyAmJiB2YWx1ZSA9PT0gJycpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCAnWycsIGluZGV4LCAnXSddLmpvaW4oJycpXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFx0Li4ucmVzdWx0LFxuXHRcdFx0XHRcdFtlbmNvZGUoa2V5LCBvcHRpb25zKSwgJ1snLCBlbmNvZGUoaW5kZXgsIG9wdGlvbnMpLCAnXT0nLCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKCcnKVxuXHRcdFx0XHRdO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2JyYWNrZXQnOlxuXHRcdFx0cmV0dXJuIGtleSA9PiAocmVzdWx0LCB2YWx1ZSkgPT4ge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0dmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBOdWxsICYmIHZhbHVlID09PSBudWxsKSB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBFbXB0eVN0cmluZyAmJiB2YWx1ZSA9PT0gJycpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCAnW10nXS5qb2luKCcnKV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCAnW109JywgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbignJyldO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2NvbW1hJzpcblx0XHRjYXNlICdzZXBhcmF0b3InOlxuXHRcdFx0cmV0dXJuIGtleSA9PiAocmVzdWx0LCB2YWx1ZSkgPT4ge1xuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gW1tlbmNvZGUoa2V5LCBvcHRpb25zKSwgJz0nLCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKCcnKV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gW1tyZXN1bHQsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4ob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcildO1xuXHRcdFx0fTtcblxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4ga2V5ID0+IChyZXN1bHQsIHZhbHVlKSA9PiB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcE51bGwgJiYgdmFsdWUgPT09IG51bGwpIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcEVtcHR5U3RyaW5nICYmIHZhbHVlID09PSAnJylcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBlbmNvZGUoa2V5LCBvcHRpb25zKV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCAnPScsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4oJycpXTtcblx0XHRcdH07XG5cdH1cbn1cblxuZnVuY3Rpb24gcGFyc2VyRm9yQXJyYXlGb3JtYXQob3B0aW9ucykge1xuXHRsZXQgcmVzdWx0O1xuXG5cdHN3aXRjaCAob3B0aW9ucy5hcnJheUZvcm1hdCkge1xuXHRcdGNhc2UgJ2luZGV4Jzpcblx0XHRcdHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcblx0XHRcdFx0cmVzdWx0ID0gL1xcWyhcXGQqKVxcXSQvLmV4ZWMoa2V5KTtcblxuXHRcdFx0XHRrZXkgPSBrZXkucmVwbGFjZSgvXFxbXFxkKlxcXSQvLCAnJyk7XG5cblx0XHRcdFx0aWYgKCFyZXN1bHQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB7fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV1bcmVzdWx0WzFdXSA9IHZhbHVlO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2JyYWNrZXQnOlxuXHRcdFx0cmV0dXJuIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikgPT4ge1xuXHRcdFx0XHRyZXN1bHQgPSAvKFxcW1xcXSkkLy5leGVjKGtleSk7XG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC9cXFtcXF0kLywgJycpO1xuXG5cdFx0XHRcdGlmICghcmVzdWx0KSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChhY2N1bXVsYXRvcltrZXldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gW3ZhbHVlXTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gW10uY29uY2F0KGFjY3VtdWxhdG9yW2tleV0sIHZhbHVlKTtcblx0XHRcdH07XG5cblx0XHRjYXNlICdjb21tYSc6XG5cdFx0Y2FzZSAnc2VwYXJhdG9yJzpcblx0XHRcdHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcblx0XHRcdFx0Y29uc3QgaXNBcnJheSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUuc3BsaXQoJycpLmluZGV4T2Yob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcikgPiAtMTtcblx0XHRcdFx0Y29uc3QgbmV3VmFsdWUgPSBpc0FycmF5ID8gdmFsdWUuc3BsaXQob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcikubWFwKGl0ZW0gPT4gZGVjb2RlKGl0ZW0sIG9wdGlvbnMpKSA6IHZhbHVlID09PSBudWxsID8gdmFsdWUgOiBkZWNvZGUodmFsdWUsIG9wdGlvbnMpO1xuXHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gbmV3VmFsdWU7XG5cdFx0XHR9O1xuXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcblx0XHRcdFx0aWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gW10uY29uY2F0KGFjY3VtdWxhdG9yW2tleV0sIHZhbHVlKTtcblx0XHRcdH07XG5cdH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVBcnJheUZvcm1hdFNlcGFyYXRvcih2YWx1ZSkge1xuXHRpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyB8fCB2YWx1ZS5sZW5ndGggIT09IDEpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdhcnJheUZvcm1hdFNlcGFyYXRvciBtdXN0IGJlIHNpbmdsZSBjaGFyYWN0ZXIgc3RyaW5nJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gZW5jb2RlKHZhbHVlLCBvcHRpb25zKSB7XG5cdGlmIChvcHRpb25zLmVuY29kZSkge1xuXHRcdHJldHVybiBvcHRpb25zLnN0cmljdCA/IHN0cmljdFVyaUVuY29kZSh2YWx1ZSkgOiBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBkZWNvZGUodmFsdWUsIG9wdGlvbnMpIHtcblx0aWYgKG9wdGlvbnMuZGVjb2RlKSB7XG5cdFx0cmV0dXJuIGRlY29kZUNvbXBvbmVudCh2YWx1ZSk7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGtleXNTb3J0ZXIoaW5wdXQpIHtcblx0aWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG5cdFx0cmV0dXJuIGlucHV0LnNvcnQoKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIGtleXNTb3J0ZXIoT2JqZWN0LmtleXMoaW5wdXQpKVxuXHRcdFx0LnNvcnQoKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKSlcblx0XHRcdC5tYXAoa2V5ID0+IGlucHV0W2tleV0pO1xuXHR9XG5cblx0cmV0dXJuIGlucHV0O1xufVxuXG5mdW5jdGlvbiByZW1vdmVIYXNoKGlucHV0KSB7XG5cdGNvbnN0IGhhc2hTdGFydCA9IGlucHV0LmluZGV4T2YoJyMnKTtcblx0aWYgKGhhc2hTdGFydCAhPT0gLTEpIHtcblx0XHRpbnB1dCA9IGlucHV0LnNsaWNlKDAsIGhhc2hTdGFydCk7XG5cdH1cblxuXHRyZXR1cm4gaW5wdXQ7XG59XG5cbmZ1bmN0aW9uIGdldEhhc2godXJsKSB7XG5cdGxldCBoYXNoID0gJyc7XG5cdGNvbnN0IGhhc2hTdGFydCA9IHVybC5pbmRleE9mKCcjJyk7XG5cdGlmIChoYXNoU3RhcnQgIT09IC0xKSB7XG5cdFx0aGFzaCA9IHVybC5zbGljZShoYXNoU3RhcnQpO1xuXHR9XG5cblx0cmV0dXJuIGhhc2g7XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3QoaW5wdXQpIHtcblx0aW5wdXQgPSByZW1vdmVIYXNoKGlucHV0KTtcblx0Y29uc3QgcXVlcnlTdGFydCA9IGlucHV0LmluZGV4T2YoJz8nKTtcblx0aWYgKHF1ZXJ5U3RhcnQgPT09IC0xKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0cmV0dXJuIGlucHV0LnNsaWNlKHF1ZXJ5U3RhcnQgKyAxKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VWYWx1ZSh2YWx1ZSwgb3B0aW9ucykge1xuXHRpZiAob3B0aW9ucy5wYXJzZU51bWJlcnMgJiYgIU51bWJlci5pc05hTihOdW1iZXIodmFsdWUpKSAmJiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS50cmltKCkgIT09ICcnKSkge1xuXHRcdHZhbHVlID0gTnVtYmVyKHZhbHVlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLnBhcnNlQm9vbGVhbnMgJiYgdmFsdWUgIT09IG51bGwgJiYgKHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJyB8fCB2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSAnZmFsc2UnKSkge1xuXHRcdHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBwYXJzZShpbnB1dCwgb3B0aW9ucykge1xuXHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0ZGVjb2RlOiB0cnVlLFxuXHRcdHNvcnQ6IHRydWUsXG5cdFx0YXJyYXlGb3JtYXQ6ICdub25lJyxcblx0XHRhcnJheUZvcm1hdFNlcGFyYXRvcjogJywnLFxuXHRcdHBhcnNlTnVtYmVyczogZmFsc2UsXG5cdFx0cGFyc2VCb29sZWFuczogZmFsc2Vcblx0fSwgb3B0aW9ucyk7XG5cblx0dmFsaWRhdGVBcnJheUZvcm1hdFNlcGFyYXRvcihvcHRpb25zLmFycmF5Rm9ybWF0U2VwYXJhdG9yKTtcblxuXHRjb25zdCBmb3JtYXR0ZXIgPSBwYXJzZXJGb3JBcnJheUZvcm1hdChvcHRpb25zKTtcblxuXHQvLyBDcmVhdGUgYW4gb2JqZWN0IHdpdGggbm8gcHJvdG90eXBlXG5cdGNvbnN0IHJldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cblx0aWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0aW5wdXQgPSBpbnB1dC50cmltKCkucmVwbGFjZSgvXls/IyZdLywgJycpO1xuXG5cdGlmICghaW5wdXQpIHtcblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0Zm9yIChjb25zdCBwYXJhbSBvZiBpbnB1dC5zcGxpdCgnJicpKSB7XG5cdFx0bGV0IFtrZXksIHZhbHVlXSA9IHNwbGl0T25GaXJzdChvcHRpb25zLmRlY29kZSA/IHBhcmFtLnJlcGxhY2UoL1xcKy9nLCAnICcpIDogcGFyYW0sICc9Jyk7XG5cblx0XHQvLyBNaXNzaW5nIGA9YCBzaG91bGQgYmUgYG51bGxgOlxuXHRcdC8vIGh0dHA6Ly93My5vcmcvVFIvMjAxMi9XRC11cmwtMjAxMjA1MjQvI2NvbGxlY3QtdXJsLXBhcmFtZXRlcnNcblx0XHR2YWx1ZSA9IHZhbHVlID09PSB1bmRlZmluZWQgPyBudWxsIDogWydjb21tYScsICdzZXBhcmF0b3InXS5pbmNsdWRlcyhvcHRpb25zLmFycmF5Rm9ybWF0KSA/IHZhbHVlIDogZGVjb2RlKHZhbHVlLCBvcHRpb25zKTtcblx0XHRmb3JtYXR0ZXIoZGVjb2RlKGtleSwgb3B0aW9ucyksIHZhbHVlLCByZXQpO1xuXHR9XG5cblx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocmV0KSkge1xuXHRcdGNvbnN0IHZhbHVlID0gcmV0W2tleV07XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGwpIHtcblx0XHRcdGZvciAoY29uc3QgayBvZiBPYmplY3Qua2V5cyh2YWx1ZSkpIHtcblx0XHRcdFx0dmFsdWVba10gPSBwYXJzZVZhbHVlKHZhbHVlW2tdLCBvcHRpb25zKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0W2tleV0gPSBwYXJzZVZhbHVlKHZhbHVlLCBvcHRpb25zKTtcblx0XHR9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zb3J0ID09PSBmYWxzZSkge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRyZXR1cm4gKG9wdGlvbnMuc29ydCA9PT0gdHJ1ZSA/IE9iamVjdC5rZXlzKHJldCkuc29ydCgpIDogT2JqZWN0LmtleXMocmV0KS5zb3J0KG9wdGlvbnMuc29ydCkpLnJlZHVjZSgocmVzdWx0LCBrZXkpID0+IHtcblx0XHRjb25zdCB2YWx1ZSA9IHJldFtrZXldO1xuXHRcdGlmIChCb29sZWFuKHZhbHVlKSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0Ly8gU29ydCBvYmplY3Qga2V5cywgbm90IHZhbHVlc1xuXHRcdFx0cmVzdWx0W2tleV0gPSBrZXlzU29ydGVyKHZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0W2tleV0gPSB2YWx1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LCBPYmplY3QuY3JlYXRlKG51bGwpKTtcbn1cblxuZXhwb3J0cy5leHRyYWN0ID0gZXh0cmFjdDtcbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcblxuZXhwb3J0cy5zdHJpbmdpZnkgPSAob2JqZWN0LCBvcHRpb25zKSA9PiB7XG5cdGlmICghb2JqZWN0KSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdGVuY29kZTogdHJ1ZSxcblx0XHRzdHJpY3Q6IHRydWUsXG5cdFx0YXJyYXlGb3JtYXQ6ICdub25lJyxcblx0XHRhcnJheUZvcm1hdFNlcGFyYXRvcjogJywnXG5cdH0sIG9wdGlvbnMpO1xuXG5cdHZhbGlkYXRlQXJyYXlGb3JtYXRTZXBhcmF0b3Iob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcik7XG5cblx0Y29uc3Qgc2hvdWxkRmlsdGVyID0ga2V5ID0+IChcblx0XHQob3B0aW9ucy5za2lwTnVsbCAmJiBpc051bGxPclVuZGVmaW5lZChvYmplY3Rba2V5XSkpIHx8XG5cdFx0KG9wdGlvbnMuc2tpcEVtcHR5U3RyaW5nICYmIG9iamVjdFtrZXldID09PSAnJylcblx0KTtcblxuXHRjb25zdCBmb3JtYXR0ZXIgPSBlbmNvZGVyRm9yQXJyYXlGb3JtYXQob3B0aW9ucyk7XG5cblx0Y29uc3Qgb2JqZWN0Q29weSA9IHt9O1xuXG5cdGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iamVjdCkpIHtcblx0XHRpZiAoIXNob3VsZEZpbHRlcihrZXkpKSB7XG5cdFx0XHRvYmplY3RDb3B5W2tleV0gPSBvYmplY3Rba2V5XTtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0Q29weSk7XG5cblx0aWYgKG9wdGlvbnMuc29ydCAhPT0gZmFsc2UpIHtcblx0XHRrZXlzLnNvcnQob3B0aW9ucy5zb3J0KTtcblx0fVxuXG5cdHJldHVybiBrZXlzLm1hcChrZXkgPT4ge1xuXHRcdGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV07XG5cblx0XHRpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGVuY29kZShrZXksIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0XHRcdC5yZWR1Y2UoZm9ybWF0dGVyKGtleSksIFtdKVxuXHRcdFx0XHQuam9pbignJicpO1xuXHRcdH1cblxuXHRcdHJldHVybiBlbmNvZGUoa2V5LCBvcHRpb25zKSArICc9JyArIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyk7XG5cdH0pLmZpbHRlcih4ID0+IHgubGVuZ3RoID4gMCkuam9pbignJicpO1xufTtcblxuZXhwb3J0cy5wYXJzZVVybCA9IChpbnB1dCwgb3B0aW9ucykgPT4ge1xuXHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0ZGVjb2RlOiB0cnVlXG5cdH0sIG9wdGlvbnMpO1xuXG5cdGNvbnN0IFt1cmwsIGhhc2hdID0gc3BsaXRPbkZpcnN0KGlucHV0LCAnIycpO1xuXG5cdHJldHVybiBPYmplY3QuYXNzaWduKFxuXHRcdHtcblx0XHRcdHVybDogdXJsLnNwbGl0KCc/JylbMF0gfHwgJycsXG5cdFx0XHRxdWVyeTogcGFyc2UoZXh0cmFjdChpbnB1dCksIG9wdGlvbnMpXG5cdFx0fSxcblx0XHRvcHRpb25zICYmIG9wdGlvbnMucGFyc2VGcmFnbWVudElkZW50aWZpZXIgJiYgaGFzaCA/IHtmcmFnbWVudElkZW50aWZpZXI6IGRlY29kZShoYXNoLCBvcHRpb25zKX0gOiB7fVxuXHQpO1xufTtcblxuZXhwb3J0cy5zdHJpbmdpZnlVcmwgPSAoaW5wdXQsIG9wdGlvbnMpID0+IHtcblx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdGVuY29kZTogdHJ1ZSxcblx0XHRzdHJpY3Q6IHRydWVcblx0fSwgb3B0aW9ucyk7XG5cblx0Y29uc3QgdXJsID0gcmVtb3ZlSGFzaChpbnB1dC51cmwpLnNwbGl0KCc/JylbMF0gfHwgJyc7XG5cdGNvbnN0IHF1ZXJ5RnJvbVVybCA9IGV4cG9ydHMuZXh0cmFjdChpbnB1dC51cmwpO1xuXHRjb25zdCBwYXJzZWRRdWVyeUZyb21VcmwgPSBleHBvcnRzLnBhcnNlKHF1ZXJ5RnJvbVVybCwge3NvcnQ6IGZhbHNlfSk7XG5cblx0Y29uc3QgcXVlcnkgPSBPYmplY3QuYXNzaWduKHBhcnNlZFF1ZXJ5RnJvbVVybCwgaW5wdXQucXVlcnkpO1xuXHRsZXQgcXVlcnlTdHJpbmcgPSBleHBvcnRzLnN0cmluZ2lmeShxdWVyeSwgb3B0aW9ucyk7XG5cdGlmIChxdWVyeVN0cmluZykge1xuXHRcdHF1ZXJ5U3RyaW5nID0gYD8ke3F1ZXJ5U3RyaW5nfWA7XG5cdH1cblxuXHRsZXQgaGFzaCA9IGdldEhhc2goaW5wdXQudXJsKTtcblx0aWYgKGlucHV0LmZyYWdtZW50SWRlbnRpZmllcikge1xuXHRcdGhhc2ggPSBgIyR7ZW5jb2RlKGlucHV0LmZyYWdtZW50SWRlbnRpZmllciwgb3B0aW9ucyl9YDtcblx0fVxuXG5cdHJldHVybiBgJHt1cmx9JHtxdWVyeVN0cmluZ30ke2hhc2h9YDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gKHN0cmluZywgc2VwYXJhdG9yKSA9PiB7XG5cdGlmICghKHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBzZXBhcmF0b3IgPT09ICdzdHJpbmcnKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBhcmd1bWVudHMgdG8gYmUgb2YgdHlwZSBgc3RyaW5nYCcpO1xuXHR9XG5cblx0aWYgKHNlcGFyYXRvciA9PT0gJycpIHtcblx0XHRyZXR1cm4gW3N0cmluZ107XG5cdH1cblxuXHRjb25zdCBzZXBhcmF0b3JJbmRleCA9IHN0cmluZy5pbmRleE9mKHNlcGFyYXRvcik7XG5cblx0aWYgKHNlcGFyYXRvckluZGV4ID09PSAtMSkge1xuXHRcdHJldHVybiBbc3RyaW5nXTtcblx0fVxuXG5cdHJldHVybiBbXG5cdFx0c3RyaW5nLnNsaWNlKDAsIHNlcGFyYXRvckluZGV4KSxcblx0XHRzdHJpbmcuc2xpY2Uoc2VwYXJhdG9ySW5kZXggKyBzZXBhcmF0b3IubGVuZ3RoKVxuXHRdO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gc3RyID0+IGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpKl0vZywgeCA9PiBgJSR7eC5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpfWApO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBpbmplY3QgPSAoKSA9PiB7XG4gICAgLy8gSW5qZWN0IFNjcmlwdCB0byB1c2VyJ3MgRE9NXG4gICAgY29uc3QgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgcy5zcmMgPSBjaHJvbWUucnVudGltZS5nZXRVUkwoXCJqcy9pbmplY3QuanNcIik7XG4gICAgKGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5hcHBlbmRDaGlsZChzKTtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBpbmplY3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb250ZW50U2NyaXB0VjIgPSB2b2lkIDA7XG5jb25zdCBpbmplY3RUb0RvbV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9jb250ZW50U2NyaXB0L2luamVjdFRvRG9tXCIpKTtcbmNvbnN0IHNlcnZpY2VfMSA9IHJlcXVpcmUoXCIuLi9wYW5lbC9BcHAvc2VydmljZVwiKTtcbmNvbnN0IGZ1bmN0aW9uRXhlY3V0b3JfMSA9IHJlcXVpcmUoXCIuL2Z1bmN0aW9uRXhlY3V0b3JcIik7XG5jb25zb2xlLmxvZyhcIkNvbnRlbnQgU2NyaXB0IHYyXCIpO1xuY29uc3QgcG9ydCA9IGNocm9tZS5ydW50aW1lLmNvbm5lY3QoeyBuYW1lOiBcIm1va2t1LWNvbnRlbnQtc2NyaXB0XCIgfSk7XG5jb25zdCBjb250ZW50U2NyaXB0VjIgPSAoKSA9PiB7XG4gICAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICAgICAgcG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgLy8gbWVzc2FnZWQgcmVjZWl2ZWQgZnJvbSBzZXJ2aWNlIHdvcmtlclxuICAgICAgICAgICAgY29uc3QgbW9jayA9IG1lc3NhZ2UgPT09IG51bGwgfHwgbWVzc2FnZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWVzc2FnZS5tb2NrUmVzcG9uc2U7XG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gbWVzc2FnZSA9PT0gbnVsbCB8fCBtZXNzYWdlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtZXNzYWdlLnJlcXVlc3Q7XG4gICAgICAgICAgICBpZiAoIW1vY2spIHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlXzEubWVzc2FnZVNlcnZpY2Uuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIGZyb206IFwiQ09OVEVOVFwiLFxuICAgICAgICAgICAgICAgICAgICB0bzogXCJIT09LXCIsXG4gICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbk5hbWU6IFwiTU9LS1VcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG1lc3NhZ2UuaWQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAobW9jay50eXBlID09PSBcIkZVTkNUSU9OXCIgJiYgbW9jay5mdW5jdGlvbiAmJiBtb2NrLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB5aWVsZCAoMCwgZnVuY3Rpb25FeGVjdXRvcl8xLnJ1bkZ1bmN0aW9uKShtb2NrLmZ1bmN0aW9uLCByZXF1ZXN0LnF1ZXJ5UGFyYW1zLCByZXF1ZXN0LmJvZHkpO1xuICAgICAgICAgICAgICAgICAgICBtb2NrLnJlc3BvbnNlID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXJ2aWNlXzEubWVzc2FnZVNlcnZpY2Uuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIGZyb206IFwiQ09OVEVOVFwiLFxuICAgICAgICAgICAgICAgICAgICB0bzogXCJIT09LXCIsXG4gICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbk5hbWU6IFwiTU9LS1VcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG1lc3NhZ2UuaWQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2VydmljZV8xLm1lc3NhZ2VTZXJ2aWNlLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBmcm9tOiBcIkNPTlRFTlRcIixcbiAgICAgICAgICAgICAgICAgICAgdG86IFwiUEFORUxcIixcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uTmFtZTogXCJNT0tLVVwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkxPR19NT0NLX1NUQVRVU1wiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc01vY2tlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBtZXNzYWdlLmlkLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBpZDogbWVzc2FnZS5pZCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgICBzZXJ2aWNlXzEubWVzc2FnZVNlcnZpY2UubGlzdGVuKFwiQ09OVEVOVFwiLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gXCJDSEVDS19NT0NLXCIpIHtcbiAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gXCJMT0dcIikge1xuICAgICAgICAgICAgICAgIHNlcnZpY2VfMS5tZXNzYWdlU2VydmljZS5zZW5kKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZGF0YSksIHsgZnJvbTogXCJDT05URU5UXCIsIHRvOiBcIlBBTkVMXCIgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGNvbnN0IGhvc3QgPSBsb2NhdGlvbi5ob3N0O1xuICAgIGNvbnN0IGlzTG9jYWxob3N0ID0gbG9jYXRpb24uaHJlZi5pbmNsdWRlcyhcImh0dHA6Ly9sb2NhbGhvc3RcIik7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtgbW9ra3UuZXh0ZW5zaW9uLmFjdGl2ZS4ke2hvc3R9YF0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgbGV0IGFjdGl2ZSA9IHJlc3VsdFtgbW9ra3UuZXh0ZW5zaW9uLmFjdGl2ZS4ke2hvc3R9YF07XG4gICAgICAgIGlmIChpc0xvY2FsaG9zdCAmJiBhY3RpdmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgICAvLyBpbmplY3RzIHNjcmlwdCB0byBwYWdlJ3MgRE9NXG4gICAgICAgICAgICAoMCwgaW5qZWN0VG9Eb21fMS5kZWZhdWx0KSgpO1xuICAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRlbGwgdGhlIHBhbmVsIGFib3V0IHRoZSBuZXcgaW5qZWN0aW9uIChob3N0IG1pZ2h0IGhhdmUgY2hhbmdlZClcbiAgICAgICAgc2VydmljZV8xLm1lc3NhZ2VTZXJ2aWNlLnNlbmQoe1xuICAgICAgICAgICAgbWVzc2FnZTogaG9zdCxcbiAgICAgICAgICAgIHR5cGU6IFwiSU5JVFwiLFxuICAgICAgICAgICAgZnJvbTogXCJDT05URU5UXCIsXG4gICAgICAgICAgICB0bzogXCJQQU5FTFwiLFxuICAgICAgICAgICAgZXh0ZW5zaW9uTmFtZTogXCJNT0tLVVwiLFxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5leHBvcnRzLmNvbnRlbnRTY3JpcHRWMiA9IGNvbnRlbnRTY3JpcHRWMjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5ydW5GdW5jdGlvbiA9IHZvaWQgMDtcbmNvbnN0IHF1ZXJ5X3N0cmluZ18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJxdWVyeS1zdHJpbmdcIikpO1xuY29uc3QgZml4ZWRIZWFkZXIgPSBcImZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcIjtcbmNvbnN0IGZpeGVkRm9vdGVyID0gXCJ9XCI7XG4vLyBJbml0aWFsaXplIHRoZSB3b3JrZXJcbmZ1bmN0aW9uIHJ1bkZ1bmN0aW9uKGZ1bmNTdHJpbmcsIHF1ZXJpZXNTdHJpbmcsIGJvZHkpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyBDcmVhdGUgd29ya2VyIGZyb20gYSBCbG9iIFVSTCB0byBlbWJlZCB3b3JrZXIgY29kZSBkaXJlY3RseVxuICAgICAgICBjb25zdCB3b3JrZXJDb2RlID0gYFxuICAgICAgICAgICAgICAgIC8vIC0tLSBXZWIgV29ya2VyIFNjcmlwdCAtLS1cblxuICAgICAgICAgICAgICAgIC8vIDEuIE5ldXRlci9VbmRlZmluZSBzZW5zaXRpdmUgQVBJc1xuICAgICAgICAgICAgICAgIC8vIFN0cmljdCBtb2RlIGZvciB0aGUgd29ya2VyXG4gICAgICAgICAgICAgICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxDb25zb2xlID0gc2VsZi5jb25zb2xlO1xuICAgICAgICAgICAgICAgIHNlbGYuY29uc29sZSA9IHVuZGVmaW5lZDsgXG5cbiAgICAgICAgICAgICAgICAvLyBOZXR3b3JrXG4gICAgICAgICAgICAgICAgc2VsZi5mZXRjaCA9ICgpID0+IFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignRmV0Y2ggQVBJIGlzIGRpc2FibGVkIGluIHRoaXMgc2FuZGJveC4nKSk7XG4gICAgICAgICAgICAgICAgc2VsZi5YTUxIdHRwUmVxdWVzdCA9IGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoJ1hNTEh0dHBSZXF1ZXN0IGlzIGRpc2FibGVkIGluIHRoaXMgc2FuZGJveC4nKTsgfTtcbiAgICAgICAgICAgICAgICBzZWxmLldlYlNvY2tldCA9IGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoJ1dlYlNvY2tldCBpcyBkaXNhYmxlZCBpbiB0aGlzIHNhbmRib3guJyk7IH07XG4gICAgICAgICAgICAgICAgc2VsZi5FdmVudFNvdXJjZSA9IGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoJ0V2ZW50U291cmNlIGlzIGRpc2FibGVkIGluIHRoaXMgc2FuZGJveC4nKTsgfTtcblxuICAgICAgICAgICAgICAgIC8vIFN0b3JhZ2VcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwgJ2xvY2FsU3RvcmFnZScsIHsgZ2V0OiAoKSA9PiB7IHRocm93IG5ldyBFcnJvcignbG9jYWxTdG9yYWdlIGlzIGRpc2FibGVkLicpOyB9IH0pO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwgJ3Nlc3Npb25TdG9yYWdlJywgeyBnZXQ6ICgpID0+IHsgdGhyb3cgbmV3IEVycm9yKCdzZXNzaW9uU3RvcmFnZSBpcyBkaXNhYmxlZC4nKTsgfSB9KTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsICdpbmRleGVkREInLCB7IGdldDogKCkgPT4geyB0aHJvdyBuZXcgRXJyb3IoJ2luZGV4ZWREQiBpcyBkaXNhYmxlZC4nKTsgfSB9KTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsICdjYWNoZXMnLCB7IGdldDogKCkgPT4geyB0aHJvdyBuZXcgRXJyb3IoJ0NhY2hlcyBBUEkgaXMgZGlzYWJsZWQuJyk7IH0gfSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbENvbnNvbGUud2FybignQ291bGQgbm90IHJlZGVmaW5lIHN0b3JhZ2UgcHJvcGVydGllczonLCBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy8gV29ya2VyIGNvbnRyb2xcbiAgICAgICAgICAgICAgICBzZWxmLmltcG9ydFNjcmlwdHMgPSBmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKCdpbXBvcnRTY3JpcHRzIGlzIGRpc2FibGVkIGluIHRoaXMgc2FuZGJveC4nKTsgfTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5uYXZpZ2F0b3IgJiYgc2VsZi5uYXZpZ2F0b3Iuc2VydmljZVdvcmtlcikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5hdmlnYXRvci5zZXJ2aWNlV29ya2VyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBMb2NhdGlvblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm5hdmlnYXRvciAmJiBzZWxmLm5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm5hdmlnYXRvci5nZW9sb2NhdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBPdGhlciBwb3RlbnRpYWxseSBzZW5zaXRpdmUgZ2xvYmFsIHByb3BlcnRpZXMgKHRoaXMgaXMgbm90IGV4aGF1c3RpdmUpXG4gICAgICAgICAgICAgICAgLy8gc2VsZi5vcGVuID0gdW5kZWZpbmVkOyAvLyBmb3Igd2luZG93Lm9wZW4gbGlrZSBiZWhhdmlvciBpZiBldmVyIHBvc3NpYmxlIGluIHdvcmtlclxuICAgICAgICAgICAgICAgIC8vIHNlbGYuYWxlcnQgPSB1bmRlZmluZWQ7IC8vIG5vdCB0eXBpY2FsbHkgYXZhaWxhYmxlIGJ1dCBnb29kIHByYWN0aWNlXG4gICAgICAgICAgICAgICAgLy8gc2VsZi5jb25maXJtID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIC8vIHNlbGYucHJvbXB0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIERPTSByZWxhdGVkIChtb3N0bHkgbm90IGF2YWlsYWJsZSwgYnV0IHRvIGJlIHN1cmUpXG4gICAgICAgICAgICAgICAgc2VsZi5kb2N1bWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBzZWxmLndpbmRvdyA9IHVuZGVmaW5lZDsgLy8gc2VsZiBpcyB0aGUgZ2xvYmFsIHNjb3BlLCBidXQgZ29vZCB0byB1bmRlZmluZSAnd2luZG93JyBleHBsaWNpdGx5XG5cbiAgICAgICAgICAgICAgICAvLyBBY2Nlc3MgdG8gZ2xvYmFsIGNvbnN0cnVjdG9ycyB0aGF0IG1pZ2h0IGJlIG1pc3VzZWQgZm9yIHByb3RvdHlwZSBwb2xsdXRpb24gb3Igb3RoZXIgYXR0YWNrc1xuICAgICAgICAgICAgICAgIC8vIChCZSBjYXJlZnVsIHdpdGggdGhpcywgYXMgaXQgbWlnaHQgYnJlYWsgbGVnaXRpbWF0ZSB1c2VyIGNvZGUgaWYgdGhleSByZWx5IG9uIHRoZXNlIGZvciB0eXBlIGNoZWNrcyBldGMuKVxuICAgICAgICAgICAgICAgIC8vIEV4YW1wbGU6XG4gICAgICAgICAgICAgICAgT2JqZWN0LmNvbnN0cnVjdG9yID0gdW5kZWZpbmVkOyBcbiAgICAgICAgICAgICAgICBBcnJheS5jb25zdHJ1Y3RvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzZWxmLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsQ29uc29sZS5sb2coJ1dvcmtlciByZWNlaXZlZCBtZXNzYWdlOicsIGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHF1ZXJpZXMsIGJvZHkgfSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIFxuXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmluYWxGdW5jdGlvbiA9ICR7Zml4ZWRIZWFkZXJ9JHtmdW5jU3RyaW5nfSR7Zml4ZWRGb290ZXJ9O1xuXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAyLiBDcmVhdGUgdGhlIGZ1bmN0aW9uIHVzaW5nIG5ldyBGdW5jdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSB1c2VyRnVuY3Rpb25TdHJpbmcgaXMgdGhlIEJPRFkgb2YgdGhlIGZ1bmN0aW9uLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gJ3F1ZXJpZXMnIGFuZCAnYm9keScgYXJlIHRoZSBwYXJhbWV0ZXIgbmFtZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIEZ1bmN0aW9uLmNvbnN0cnVjdG9yID0gdW5kZWZpbmVkOyAvLyBUaGlzIHdvdWxkIGJyZWFrIG91ciBvd24gdXNlIG9mIG5ldyBGdW5jdGlvbiBpZiBkb25lIGJlZm9yZSBpdC5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMy4gRXhlY3V0ZSB0aGUgdXNlcidzIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmaW5hbEZ1bmN0aW9uKHF1ZXJpZXMsIGJvZHkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDQuIFNlbmQgdGhlIHJlc3VsdCBiYWNrXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgc3VjY2VzczogdHJ1ZSwgcmVzdWx0OiByZXN1bHQgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBlcnJvci5uYW1lLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrOiBlcnJvci5zdGFjayAvLyBCZSBjYXV0aW91cyBhYm91dCBzZW5kaW5nIGZ1bGwgc3RhY2sgdHJhY2VzIHRvIHRoZSBjbGllbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBgO1xuICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3dvcmtlckNvZGVdLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vamF2YXNjcmlwdFwiIH0pO1xuICAgICAgICBjb25zdCB3b3JrZXIgPSBuZXcgV29ya2VyKFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYikpO1xuICAgICAgICB3b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIndvcmtlclwiLCBldmVudCk7XG4gICAgICAgICAgICBpZiAoZXZlbnQuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXN1bHQ6XFxuXCIgKyBKU09OLnN0cmluZ2lmeShldmVudC5kYXRhLnJlc3VsdCwgbnVsbCwgMikpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZXZlbnQuZGF0YS5yZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IFwiRXJyb3I6IFwiICtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5lcnJvci5uYW1lICtcbiAgICAgICAgICAgICAgICAgICAgXCIgLSBcIiArXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuZGF0YS5lcnJvci5zdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAvLyBPcHRpb25hbGx5LCBpbmNsdWRlIHN0YWNrIGZvciBkZWJ1Z2dpbmcsIGJ1dCBiZSBtaW5kZnVsIG9mIGluZm8gZGlzY2xvc3VyZVxuICAgICAgICAgICAgICAgICAgICAvLyBlcnJvck1lc3NhZ2UgKz0gJ1xcblN0YWNrOiAnICsgZXZlbnQuZGF0YS5lcnJvci5zdGFjaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvck1lc3NhZ2VcIiwgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgd29ya2VyLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJXb3JrZXIgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAvLyBSZS1pbml0aWFsaXplIHdvcmtlciBvbiBjYXRhc3Ryb3BoaWMgZXJyb3IgaWYgbmVlZGVkLCBvciBwcm92aWRlIGEgcmVzZXQgYnV0dG9uXG4gICAgICAgICAgICAvLyBpbml0aWFsaXplV29ya2VyKCk7XG4gICAgICAgIH07XG4gICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBxdWVyaWVzOiBxdWVyeV9zdHJpbmdfMS5kZWZhdWx0LnBhcnNlKHF1ZXJpZXNTdHJpbmcpLFxuICAgICAgICAgICAgYm9keTogYm9keSxcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnRzLnJ1bkZ1bmN0aW9uID0gcnVuRnVuY3Rpb247XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWVzc2FnZVNlcnZpY2UgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlU2VydmljZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL21lc3NhZ2VTZXJ2aWNlXCIpKTtcbmV4cG9ydHMubWVzc2FnZVNlcnZpY2UgPSBtZXNzYWdlU2VydmljZV8xLmRlZmF1bHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICpcbiAqIEluamVjdFxuICogICAgIC0+IENvbnRlbnQgU2NyaXB0XG4gKlxuICogQ29udGVudCBzY3JpcHQgaXMgYnJpZGdlIGJldHdlZW4gcGFuZWwgYW5kIGluamVjdCBmb3IgY29tbXVuaWNhdGlvblxuICogYXMgaXQgaGFzIGJvdGggd2luZG93cyBldmVudCBsaXN0ZXJuIGFuZCBjaHJvbWUgcnVudGltZSBtZXNzYWdlIGxpc3RuZXJcbiAqIENvbnRlbnQgU2NyaXB0XG4gKiAgICAgLT4gUGFuZWxcbiAqICAgICAtPiBIb29rXG4gKlxuICogUGFuZWxcbiAqICAgICAtPiBDb250ZW50IFNjcmlwdFxuICovXG5jb25zdCB0dW5uZWxNYXAgPSB7XG4gICAgXCJIT09LOkNPTlRFTlRcIjogXCJ3aW5kb3dcIixcbiAgICBcIkNPTlRFTlQ6SE9PS1wiOiBcIndpbmRvd1wiLFxuICAgIFwiQ09OVEVOVDpQQU5FTFwiOiBcInJ1bnRpbWVcIixcbiAgICBcIkNPTlRFTlQ6U0VSVklDRV9XT1JLRVJcIjogXCJydW50aW1lXCIsXG4gICAgXCJQQU5FTDpDT05URU5UXCI6IFwidGFiXCIsXG4gICAgXCJTRVJWSUNFX1dPUktFUjpDT05URU5UXCI6IFwicnVudGltZVwiLFxuICAgIFwiU0VSVklDRV9XT1JLRVI6UEFORUxcIjogXCJydW50aW1lXCIsXG59O1xuY29uc3Qgc2VuZCA9IChwcm9wcywgdGFiSWQpID0+IHtcbiAgICBjb25zdCBwYXRoS2V5ID0gYCR7cHJvcHMuZnJvbX06JHtwcm9wcy50b31gO1xuICAgIGNvbnN0IHBhdGggPSB0dW5uZWxNYXBbcGF0aEtleV07XG4gICAgY29uc3Qgc2VydmljZSA9IHtcbiAgICAgICAgd2luZG93OiAoKSA9PiB3aW5kb3cucG9zdE1lc3NhZ2UocHJvcHMsIFwiKlwiKSxcbiAgICAgICAgcnVudGltZTogKCkgPT4gY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UocHJvcHMpLFxuICAgICAgICB0YWI6ICgpID0+IGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYklkLCBwcm9wcyksXG4gICAgfTtcbiAgICBpZiAoc2VydmljZVtwYXRoXSkge1xuICAgICAgICBzZXJ2aWNlW3BhdGhdKHByb3BzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYE1va2t1IE1lc3NhZ2VTZXJ2aWNlOiBObyBwYXRoIGRlZmluZWQgZm9yICR7cGF0aEtleX1gKTtcbiAgICB9XG59O1xuY29uc3QgbGlzdGVuID0gKGVudGl0eSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xuICAgICAgICBydW50aW1lOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmdW5jID0gKG1lc3NhZ2UsIF9zZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLnRvICE9PSBlbnRpdHkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhtZXNzYWdlLCBfc2VuZGVyLCBzZW5kUmVzcG9uc2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jKTtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UucmVtb3ZlTGlzdGVuZXIoZnVuYyk7XG4gICAgICAgIH0sXG4gICAgICAgIHdpbmRvdzogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZnVuYyA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFdlIG9ubHkgYWNjZXB0IG1lc3NhZ2VzIGZyb20gb3Vyc2VsdmVzXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSAhPT0gd2luZG93KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudG8gIT09IGVudGl0eSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBmdW5jKTtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZnVuYyk7XG4gICAgICAgIH0sXG4gICAgfTtcbiAgICBzd2l0Y2ggKGVudGl0eSkge1xuICAgICAgICBjYXNlIFwiSE9PS1wiOiB7XG4gICAgICAgICAgICByZXR1cm4gW3NlcnZpY2VbXCJ3aW5kb3dcIl0oKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIkNPTlRFTlRcIjoge1xuICAgICAgICAgICAgcmV0dXJuIFtzZXJ2aWNlW1wid2luZG93XCJdKCksIHNlcnZpY2VbXCJydW50aW1lXCJdKCldO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJQQU5FTFwiOiB7XG4gICAgICAgICAgICByZXR1cm4gW3NlcnZpY2VbXCJydW50aW1lXCJdKCldO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJTRVJWSUNFX1dPUktFUlwiOiB7XG4gICAgICAgICAgICByZXR1cm4gW3NlcnZpY2VbXCJydW50aW1lXCJdKCldO1xuICAgICAgICB9XG4gICAgfVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IHsgc2VuZCwgbGlzdGVuIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb250ZW50U2NyaXB0VjJfMSA9IHJlcXVpcmUoXCIuL21va2t1LXdlYi1hcHAtY29ubmVjdG9yL2NvbnRlbnRTY3JpcHRWMlwiKTtcbi8vIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4vLyAgICAgbGV0IHN0b3JlLCB1cmxNYXAsIGR5bmFtaWNVcmxNYXA6IElEeW5hbWljVVJMTWFwO1xuLy8gICAgIGdldFN0b3JlKCkudGhlbigoYSkgPT4ge1xuLy8gICAgICAgICBzdG9yZSA9IGEuc3RvcmU7XG4vLyAgICAgICAgIHVybE1hcCA9IGEudXJsTWFwO1xuLy8gICAgICAgICBkeW5hbWljVXJsTWFwID0gYS5keW5hbWljVXJsTWFwO1xuLy8gICAgIH0pO1xuLy8gICAgIGNvbnN0IGdldE1vY2tQYXRoID0gKHVybDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZykgPT4ge1xuLy8gICAgICAgICAvLyB0aGlzIHdpbGwgbW92ZWQgdG8gc3RvcmUudHNcbi8vICAgICAgICAgaWYgKHVybE1hcFt1cmxdKSB7XG4vLyAgICAgICAgICAgICBpZiAodXJsTWFwW3VybF1bbWV0aG9kXSkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiB1cmxNYXBbdXJsXVttZXRob2RdO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGNvbnN0IHVybDEgPSB1cmwucmVwbGFjZShcIjovL1wiLCBcIi1cIik7XG4vLyAgICAgICAgIGNvbnN0IGtleSA9IHVybDEuc3BsaXQoXCIvXCIpLmxlbmd0aDtcbi8vICAgICAgICAgLy8gbWF0Y2ggYWxsIGR5bmFtaWNzIHJvdXRlXG4vLyAgICAgICAgIGNvbnN0IHN0YWNrID0gZHluYW1pY1VybE1hcFtrZXldO1xuLy8gICAgICAgICBpZiAoIXN0YWNrKSByZXR1cm4gW107XG4vLyAgICAgICAgIGxldCBpID0gMDtcbi8vICAgICAgICAgd2hpbGUgKGkgPCBzdGFjay5sZW5ndGgpIHtcbi8vICAgICAgICAgICAgIC8vIHRoZXJlIGlzIG1vcmUgdG8gaXQgd2lsbCBiZSB1c2VkIHdoZW5cbi8vICAgICAgICAgICAgIC8vIGFjdGlvbiBhcmUgaW50cm9kdWNlZFxuLy8gICAgICAgICAgICAgY29uc3QgcyA9IHN0YWNrW2ldO1xuLy8gICAgICAgICAgICAgaWYgKHMubWV0aG9kID09PSBtZXRob2QgJiYgISFzLm1hdGNoKHVybDEpKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIFtzLmdldHRlcktleV07XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBpKys7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgcmV0dXJuIFtdO1xuLy8gICAgIH07XG4vLyAgICAgY29uc3QgdXBkYXRlU3RvcmUgPSAoKSA9PiB7XG4vLyAgICAgICAgIGdldFN0b3JlKCkudGhlbigoeCkgPT4ge1xuLy8gICAgICAgICAgICAgc3RvcmUgPSB4LnN0b3JlO1xuLy8gICAgICAgICAgICAgdXJsTWFwID0geC51cmxNYXA7XG4vLyAgICAgICAgICAgICBkeW5hbWljVXJsTWFwID0geC5keW5hbWljVXJsTWFwO1xuLy8gICAgICAgICB9KTtcbi8vICAgICB9O1xuLy8gICAgIGNvbnN0IGdldEFjdGl2ZU1vY2tXaXRoUGF0aCA9IChwYXRoczogc3RyaW5nW10pID0+IHtcbi8vICAgICAgICAgbGV0IG1vY2sgPSBudWxsO1xuLy8gICAgICAgICBsZXQgcGF0aCA9IG51bGw7XG4vLyAgICAgICAgIHBhdGhzLnNvbWUoKHRlbXBQYXRoKSA9PiB7XG4vLyAgICAgICAgICAgICBjb25zdCB0ZW1wTW9jayA9IGdldChzdG9yZSwgdGVtcFBhdGgsIG51bGwpO1xuLy8gICAgICAgICAgICAgaWYgKHRlbXBNb2NrLmFjdGl2ZSkge1xuLy8gICAgICAgICAgICAgICAgIG1vY2sgPSB0ZW1wTW9jaztcbi8vICAgICAgICAgICAgICAgICBwYXRoID0gcGF0aDtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbi8vICAgICAgICAgfSk7XG4vLyAgICAgICAgIGlmIChtb2NrKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4geyBtb2NrLCBwYXRoIH07XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgcmV0dXJuIHsgbW9jazogbnVsbCwgcGF0aDogbnVsbCB9O1xuLy8gICAgIH07XG4vLyAgICAgbWVzc2FnZVNlcnZpY2UubGlzdGVuKFwiQ09OVEVOVFwiLCAoZGF0YTogSUV2ZW50TWVzc2FnZSkgPT4ge1xuLy8gICAgICAgICBpZiAoZGF0YS50eXBlID09PSBcIkxPR1wiKSB7XG4vLyAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZGF0YS5tZXNzYWdlIGFzIElMb2c7XG4vLyAgICAgICAgICAgICBjb25zdCBtb2NrUGF0aHMgPSBnZXRNb2NrUGF0aChcbi8vICAgICAgICAgICAgICAgICBtZXNzYWdlLnJlcXVlc3QudXJsLFxuLy8gICAgICAgICAgICAgICAgIG1lc3NhZ2UucmVxdWVzdC5tZXRob2QsXG4vLyAgICAgICAgICAgICApO1xuLy8gICAgICAgICAgICAgY29uc3QgeyBtb2NrLCBwYXRoIH0gPSBnZXRBY3RpdmVNb2NrV2l0aFBhdGgobW9ja1BhdGhzKTtcbi8vICAgICAgICAgICAgIGlmIChtb2NrKSB7XG4vLyAgICAgICAgICAgICAgICAgbWVzc2FnZS5pc01vY2tlZCA9IG1vY2suYWN0aXZlO1xuLy8gICAgICAgICAgICAgICAgIG1lc3NhZ2UubW9ja1BhdGggPSBwYXRoO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgbWVzc2FnZVNlcnZpY2Uuc2VuZCh7XG4vLyAgICAgICAgICAgICAgICAgbWVzc2FnZSxcbi8vICAgICAgICAgICAgICAgICB0eXBlOiBcIkxPR1wiLFxuLy8gICAgICAgICAgICAgICAgIGZyb206IFwiQ09OVEVOVFwiLFxuLy8gICAgICAgICAgICAgICAgIHRvOiBcIlBBTkVMXCIsXG4vLyAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uTmFtZTogXCJNT0tLVVwiLFxuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgICByZXR1cm47XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gXCJOT1RJRklDQVRJT05cIiAmJiBkYXRhLm1lc3NhZ2UgPT09IFwiVVBEQVRFX1NUT1JFXCIpIHtcbi8vICAgICAgICAgICAgIHVwZGF0ZVN0b3JlKCk7XG4vLyAgICAgICAgICAgICByZXR1cm47XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgY29uc3QgcmVzcG9uc2U6IE9taXQ8SUV2ZW50TWVzc2FnZSwgXCJ0eXBlXCI+ID0ge1xuLy8gICAgICAgICAgICAgaWQ6IGRhdGEuaWQsXG4vLyAgICAgICAgICAgICBmcm9tOiBcIkNPTlRFTlRcIixcbi8vICAgICAgICAgICAgIHRvOiBcIkhPT0tcIixcbi8vICAgICAgICAgICAgIGV4dGVuc2lvbk5hbWU6IFwiTU9LS1VcIixcbi8vICAgICAgICAgICAgIG1lc3NhZ2U6IHt9LFxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICBjb25zdCByZXF1ZXN0ID0gKGRhdGEubWVzc2FnZSBhcyBJTG9nKS5yZXF1ZXN0O1xuLy8gICAgICAgICBjb25zdCBtb2NrUGF0aHMgPSBnZXRNb2NrUGF0aChyZXF1ZXN0LnVybCwgcmVxdWVzdC5tZXRob2QpO1xuLy8gICAgICAgICBjb25zdCB7IG1vY2sgfSA9IGdldEFjdGl2ZU1vY2tXaXRoUGF0aChtb2NrUGF0aHMpO1xuLy8gICAgICAgICBpZiAobW9jayAmJiBtb2NrLmFjdGl2ZSkge1xuLy8gICAgICAgICAgICAgKHJlc3BvbnNlLm1lc3NhZ2UgYXMgSUxvZykubW9ja1Jlc3BvbnNlID0gbW9jaztcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBtZXNzYWdlU2VydmljZS5zZW5kKHJlc3BvbnNlKTtcbi8vICAgICB9KTtcbi8vIH07XG4vLyBjb25zdCBob3N0ID0gbG9jYXRpb24uaG9zdDtcbi8vIGNvbnN0IGlzTG9jYWxob3N0ID0gbG9jYXRpb24uaHJlZi5pbmNsdWRlcyhcImh0dHA6Ly9sb2NhbGhvc3RcIik7XG4vLyBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW2Btb2trdS5leHRlbnNpb24uYWN0aXZlLiR7aG9zdH1gXSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuLy8gICAgIGxldCBhY3RpdmUgPSByZXN1bHRbYG1va2t1LmV4dGVuc2lvbi5hY3RpdmUuJHtob3N0fWBdO1xuLy8gICAgIGlmIChpc0xvY2FsaG9zdCAmJiBhY3RpdmUgPT09IHVuZGVmaW5lZCkge1xuLy8gICAgICAgICBhY3RpdmUgPSB0cnVlO1xuLy8gICAgIH1cbi8vICAgICBpZiAoYWN0aXZlKSB7XG4vLyAgICAgICAgIC8vIGluamVjdHMgc2NyaXB0IHRvIHBhZ2UncyBET01cbi8vICAgICAgICAgaW5qZWN0KCk7XG4vLyAgICAgICAgIGluaXQoKTtcbi8vICAgICB9XG4vLyAgICAgLy8gdGVsbCB0aGUgcGFuZWwgYWJvdXQgdGhlIG5ldyBpbmplY3Rpb24gKGhvc3QgbWlnaHQgaGF2ZSBjaGFuZ2VkKVxuLy8gICAgIG1lc3NhZ2VTZXJ2aWNlLnNlbmQoe1xuLy8gICAgICAgICBtZXNzYWdlOiBob3N0LFxuLy8gICAgICAgICB0eXBlOiBcIklOSVRcIixcbi8vICAgICAgICAgZnJvbTogXCJDT05URU5UXCIsXG4vLyAgICAgICAgIHRvOiBcIlBBTkVMXCIsXG4vLyAgICAgICAgIGV4dGVuc2lvbk5hbWU6IFwiTU9LS1VcIixcbi8vICAgICB9KTtcbi8vIH0pO1xuKDAsIGNvbnRlbnRTY3JpcHRWMl8xLmNvbnRlbnRTY3JpcHRWMikoKTtcbi8vIGNvbnNvbGUubG9nKFwiWFpcIik7XG4vLyBpbmplY3QoKTtcbi8vIG1lc3NhZ2VTZXJ2aWNlLmxpc3RlbihcIkNPTlRFTlRcIiwgKGRhdGE6IElFdmVudE1lc3NhZ2UpID0+IHtcbi8vICAgICBjb25zb2xlLmxvZyhcImNvbnRlbnQ6IFxcblwiLCBkYXRhKTtcbi8vICAgICBpZiAoZGF0YS50eXBlID09PSBcIkxPR1wiKSB7XG4vLyAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2UgYXMgSUxvZztcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJTZW5kaW5nIHRvIHBhbmVsXCIpO1xuLy8gICAgICAgICBtZXNzYWdlU2VydmljZS5zZW5kKHtcbi8vICAgICAgICAgICAgIG1lc3NhZ2UsXG4vLyAgICAgICAgICAgICB0eXBlOiBcIkxPR1wiLFxuLy8gICAgICAgICAgICAgZnJvbTogXCJDT05URU5UXCIsXG4vLyAgICAgICAgICAgICB0bzogXCJQQU5FTFwiLFxuLy8gICAgICAgICAgICAgZXh0ZW5zaW9uTmFtZTogXCJNT0tLVVwiLFxuLy8gICAgICAgICB9KTtcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJTZW5kaW5nIHRvIHNlcnZpY2Ugd29ya2VyXCIpO1xuLy8gICAgICAgICBtZXNzYWdlU2VydmljZS5zZW5kKHtcbi8vICAgICAgICAgICAgIG1lc3NhZ2UsXG4vLyAgICAgICAgICAgICB0eXBlOiBcIkxPR1wiLFxuLy8gICAgICAgICAgICAgZnJvbTogXCJDT05URU5UXCIsXG4vLyAgICAgICAgICAgICB0bzogXCJTRVJWSUNFX1dPUktFUlwiLFxuLy8gICAgICAgICAgICAgZXh0ZW5zaW9uTmFtZTogXCJNT0tLVVwiLFxuLy8gICAgICAgICB9KTtcbi8vICAgICB9XG4vLyB9KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==