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
const messageService_1 = __webpack_require__(/*! ../panel/App/service/messageService */ "./src/panel/App/service/messageService.ts");
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
                messageService_1.messageService.send({
                    from: "CONTENT",
                    to: "HOOK",
                    extensionName: "MOKKU",
                    message,
                    id: message.id,
                });
            }
            else {
                if (mock.responseType === "FUNCTION" &&
                    mock.function &&
                    mock.active) {
                    const result = yield (0, functionExecutor_1.runFunction)(mock.function, request.queryParams, request.body);
                    mock.response = result;
                }
                messageService_1.messageService.send({
                    from: "CONTENT",
                    to: "HOOK",
                    extensionName: "MOKKU",
                    message,
                    id: message.id,
                });
                messageService_1.messageService.send({
                    from: "CONTENT",
                    to: "PANEL",
                    extensionName: "MOKKU",
                    type: "LOG_MOCK_STATUS",
                    message: {
                        isMocked: true,
                        id: message.id,
                        projectId: mock.projectId,
                        mockId: mock.id,
                    },
                    id: message.id,
                });
            }
        }));
        messageService_1.messageService.listen("CONTENT", (data) => {
            if (data.type === "CHECK_MOCK") {
                port.postMessage(data);
            }
            if (data.type === "LOG") {
                messageService_1.messageService.send(Object.assign(Object.assign({}, data), { from: "CONTENT", to: "PANEL" }));
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
        messageService_1.messageService.send({
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

/***/ "./src/panel/App/service/messageService.ts":
/*!*************************************************!*\
  !*** ./src/panel/App/service/messageService.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.messageService = void 0;
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
exports.messageService = { send, listen };


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
// import { getStore } from "./panel/App/service/storeActions";
// import { messageService } from "./panel/App/service";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudF9zY3JpcHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsdUJBQXVCLEVBQUU7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsa0JBQWtCLG1CQUFtQjtBQUNyQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsaUJBQWlCLG9CQUFvQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM3RmE7QUFDYix3QkFBd0IsbUJBQU8sQ0FBQyxvRUFBbUI7QUFDbkQsd0JBQXdCLG1CQUFPLENBQUMsMEVBQXNCO0FBQ3RELHFCQUFxQixtQkFBTyxDQUFDLDhEQUFnQjs7QUFFN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsYUFBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxLQUFLO0FBQzVELHFEQUFxRCxLQUFLO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUixJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLElBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Nb2trdS8uL25vZGVfbW9kdWxlcy9kZWNvZGUtdXJpLWNvbXBvbmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly9Nb2trdS8uL25vZGVfbW9kdWxlcy9xdWVyeS1zdHJpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9ub2RlX21vZHVsZXMvc3BsaXQtb24tZmlyc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9ub2RlX21vZHVsZXMvc3RyaWN0LXVyaS1lbmNvZGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9zcmMvY29udGVudFNjcmlwdC9pbmplY3RUb0RvbS50cyIsIndlYnBhY2s6Ly9Nb2trdS8uL3NyYy9tb2trdS13ZWItYXBwLWNvbm5lY3Rvci9jb250ZW50U2NyaXB0VjIudHMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9zcmMvbW9ra3Utd2ViLWFwcC1jb25uZWN0b3IvZnVuY3Rpb25FeGVjdXRvci50cyIsIndlYnBhY2s6Ly9Nb2trdS8uL3NyYy9wYW5lbC9BcHAvc2VydmljZS9tZXNzYWdlU2VydmljZS50cyIsIndlYnBhY2s6Ly9Nb2trdS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Nb2trdS8uL3NyYy9jb250ZW50X3NjcmlwdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG52YXIgdG9rZW4gPSAnJVthLWYwLTldezJ9JztcbnZhciBzaW5nbGVNYXRjaGVyID0gbmV3IFJlZ0V4cCh0b2tlbiwgJ2dpJyk7XG52YXIgbXVsdGlNYXRjaGVyID0gbmV3IFJlZ0V4cCgnKCcgKyB0b2tlbiArICcpKycsICdnaScpO1xuXG5mdW5jdGlvbiBkZWNvZGVDb21wb25lbnRzKGNvbXBvbmVudHMsIHNwbGl0KSB7XG5cdHRyeSB7XG5cdFx0Ly8gVHJ5IHRvIGRlY29kZSB0aGUgZW50aXJlIHN0cmluZyBmaXJzdFxuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoY29tcG9uZW50cy5qb2luKCcnKSk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIERvIG5vdGhpbmdcblx0fVxuXG5cdGlmIChjb21wb25lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdHJldHVybiBjb21wb25lbnRzO1xuXHR9XG5cblx0c3BsaXQgPSBzcGxpdCB8fCAxO1xuXG5cdC8vIFNwbGl0IHRoZSBhcnJheSBpbiAyIHBhcnRzXG5cdHZhciBsZWZ0ID0gY29tcG9uZW50cy5zbGljZSgwLCBzcGxpdCk7XG5cdHZhciByaWdodCA9IGNvbXBvbmVudHMuc2xpY2Uoc3BsaXQpO1xuXG5cdHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmNhbGwoW10sIGRlY29kZUNvbXBvbmVudHMobGVmdCksIGRlY29kZUNvbXBvbmVudHMocmlnaHQpKTtcbn1cblxuZnVuY3Rpb24gZGVjb2RlKGlucHV0KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChpbnB1dCk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdHZhciB0b2tlbnMgPSBpbnB1dC5tYXRjaChzaW5nbGVNYXRjaGVyKTtcblxuXHRcdGZvciAodmFyIGkgPSAxOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpbnB1dCA9IGRlY29kZUNvbXBvbmVudHModG9rZW5zLCBpKS5qb2luKCcnKTtcblxuXHRcdFx0dG9rZW5zID0gaW5wdXQubWF0Y2goc2luZ2xlTWF0Y2hlcik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGlucHV0O1xuXHR9XG59XG5cbmZ1bmN0aW9uIGN1c3RvbURlY29kZVVSSUNvbXBvbmVudChpbnB1dCkge1xuXHQvLyBLZWVwIHRyYWNrIG9mIGFsbCB0aGUgcmVwbGFjZW1lbnRzIGFuZCBwcmVmaWxsIHRoZSBtYXAgd2l0aCB0aGUgYEJPTWBcblx0dmFyIHJlcGxhY2VNYXAgPSB7XG5cdFx0JyVGRSVGRic6ICdcXHVGRkZEXFx1RkZGRCcsXG5cdFx0JyVGRiVGRSc6ICdcXHVGRkZEXFx1RkZGRCdcblx0fTtcblxuXHR2YXIgbWF0Y2ggPSBtdWx0aU1hdGNoZXIuZXhlYyhpbnB1dCk7XG5cdHdoaWxlIChtYXRjaCkge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBEZWNvZGUgYXMgYmlnIGNodW5rcyBhcyBwb3NzaWJsZVxuXHRcdFx0cmVwbGFjZU1hcFttYXRjaFswXV0gPSBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMF0pO1xuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlY29kZShtYXRjaFswXSk7XG5cblx0XHRcdGlmIChyZXN1bHQgIT09IG1hdGNoWzBdKSB7XG5cdFx0XHRcdHJlcGxhY2VNYXBbbWF0Y2hbMF1dID0gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdG1hdGNoID0gbXVsdGlNYXRjaGVyLmV4ZWMoaW5wdXQpO1xuXHR9XG5cblx0Ly8gQWRkIGAlQzJgIGF0IHRoZSBlbmQgb2YgdGhlIG1hcCB0byBtYWtlIHN1cmUgaXQgZG9lcyBub3QgcmVwbGFjZSB0aGUgY29tYmluYXRvciBiZWZvcmUgZXZlcnl0aGluZyBlbHNlXG5cdHJlcGxhY2VNYXBbJyVDMiddID0gJ1xcdUZGRkQnO1xuXG5cdHZhciBlbnRyaWVzID0gT2JqZWN0LmtleXMocmVwbGFjZU1hcCk7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Ly8gUmVwbGFjZSBhbGwgZGVjb2RlZCBjb21wb25lbnRzXG5cdFx0dmFyIGtleSA9IGVudHJpZXNbaV07XG5cdFx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoa2V5LCAnZycpLCByZXBsYWNlTWFwW2tleV0pO1xuXHR9XG5cblx0cmV0dXJuIGlucHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbmNvZGVkVVJJKSB7XG5cdGlmICh0eXBlb2YgZW5jb2RlZFVSSSAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBgZW5jb2RlZFVSSWAgdG8gYmUgb2YgdHlwZSBgc3RyaW5nYCwgZ290IGAnICsgdHlwZW9mIGVuY29kZWRVUkkgKyAnYCcpO1xuXHR9XG5cblx0dHJ5IHtcblx0XHRlbmNvZGVkVVJJID0gZW5jb2RlZFVSSS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcblxuXHRcdC8vIFRyeSB0aGUgYnVpbHQgaW4gZGVjb2RlciBmaXJzdFxuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZW5jb2RlZFVSSSk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIEZhbGxiYWNrIHRvIGEgbW9yZSBhZHZhbmNlZCBkZWNvZGVyXG5cdFx0cmV0dXJuIGN1c3RvbURlY29kZVVSSUNvbXBvbmVudChlbmNvZGVkVVJJKTtcblx0fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IHN0cmljdFVyaUVuY29kZSA9IHJlcXVpcmUoJ3N0cmljdC11cmktZW5jb2RlJyk7XG5jb25zdCBkZWNvZGVDb21wb25lbnQgPSByZXF1aXJlKCdkZWNvZGUtdXJpLWNvbXBvbmVudCcpO1xuY29uc3Qgc3BsaXRPbkZpcnN0ID0gcmVxdWlyZSgnc3BsaXQtb24tZmlyc3QnKTtcblxuY29uc3QgaXNOdWxsT3JVbmRlZmluZWQgPSB2YWx1ZSA9PiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBlbmNvZGVyRm9yQXJyYXlGb3JtYXQob3B0aW9ucykge1xuXHRzd2l0Y2ggKG9wdGlvbnMuYXJyYXlGb3JtYXQpIHtcblx0XHRjYXNlICdpbmRleCc6XG5cdFx0XHRyZXR1cm4ga2V5ID0+IChyZXN1bHQsIHZhbHVlKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gcmVzdWx0Lmxlbmd0aDtcblxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0dmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBOdWxsICYmIHZhbHVlID09PSBudWxsKSB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBFbXB0eVN0cmluZyAmJiB2YWx1ZSA9PT0gJycpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCAnWycsIGluZGV4LCAnXSddLmpvaW4oJycpXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFx0Li4ucmVzdWx0LFxuXHRcdFx0XHRcdFtlbmNvZGUoa2V5LCBvcHRpb25zKSwgJ1snLCBlbmNvZGUoaW5kZXgsIG9wdGlvbnMpLCAnXT0nLCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKCcnKVxuXHRcdFx0XHRdO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2JyYWNrZXQnOlxuXHRcdFx0cmV0dXJuIGtleSA9PiAocmVzdWx0LCB2YWx1ZSkgPT4ge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0dmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBOdWxsICYmIHZhbHVlID09PSBudWxsKSB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBFbXB0eVN0cmluZyAmJiB2YWx1ZSA9PT0gJycpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCAnW10nXS5qb2luKCcnKV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCAnW109JywgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbignJyldO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2NvbW1hJzpcblx0XHRjYXNlICdzZXBhcmF0b3InOlxuXHRcdFx0cmV0dXJuIGtleSA9PiAocmVzdWx0LCB2YWx1ZSkgPT4ge1xuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gW1tlbmNvZGUoa2V5LCBvcHRpb25zKSwgJz0nLCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKCcnKV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gW1tyZXN1bHQsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4ob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcildO1xuXHRcdFx0fTtcblxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4ga2V5ID0+IChyZXN1bHQsIHZhbHVlKSA9PiB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcE51bGwgJiYgdmFsdWUgPT09IG51bGwpIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcEVtcHR5U3RyaW5nICYmIHZhbHVlID09PSAnJylcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBlbmNvZGUoa2V5LCBvcHRpb25zKV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCAnPScsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4oJycpXTtcblx0XHRcdH07XG5cdH1cbn1cblxuZnVuY3Rpb24gcGFyc2VyRm9yQXJyYXlGb3JtYXQob3B0aW9ucykge1xuXHRsZXQgcmVzdWx0O1xuXG5cdHN3aXRjaCAob3B0aW9ucy5hcnJheUZvcm1hdCkge1xuXHRcdGNhc2UgJ2luZGV4Jzpcblx0XHRcdHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcblx0XHRcdFx0cmVzdWx0ID0gL1xcWyhcXGQqKVxcXSQvLmV4ZWMoa2V5KTtcblxuXHRcdFx0XHRrZXkgPSBrZXkucmVwbGFjZSgvXFxbXFxkKlxcXSQvLCAnJyk7XG5cblx0XHRcdFx0aWYgKCFyZXN1bHQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB7fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV1bcmVzdWx0WzFdXSA9IHZhbHVlO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2JyYWNrZXQnOlxuXHRcdFx0cmV0dXJuIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikgPT4ge1xuXHRcdFx0XHRyZXN1bHQgPSAvKFxcW1xcXSkkLy5leGVjKGtleSk7XG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC9cXFtcXF0kLywgJycpO1xuXG5cdFx0XHRcdGlmICghcmVzdWx0KSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChhY2N1bXVsYXRvcltrZXldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gW3ZhbHVlXTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gW10uY29uY2F0KGFjY3VtdWxhdG9yW2tleV0sIHZhbHVlKTtcblx0XHRcdH07XG5cblx0XHRjYXNlICdjb21tYSc6XG5cdFx0Y2FzZSAnc2VwYXJhdG9yJzpcblx0XHRcdHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcblx0XHRcdFx0Y29uc3QgaXNBcnJheSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUuc3BsaXQoJycpLmluZGV4T2Yob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcikgPiAtMTtcblx0XHRcdFx0Y29uc3QgbmV3VmFsdWUgPSBpc0FycmF5ID8gdmFsdWUuc3BsaXQob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcikubWFwKGl0ZW0gPT4gZGVjb2RlKGl0ZW0sIG9wdGlvbnMpKSA6IHZhbHVlID09PSBudWxsID8gdmFsdWUgOiBkZWNvZGUodmFsdWUsIG9wdGlvbnMpO1xuXHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gbmV3VmFsdWU7XG5cdFx0XHR9O1xuXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcblx0XHRcdFx0aWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gW10uY29uY2F0KGFjY3VtdWxhdG9yW2tleV0sIHZhbHVlKTtcblx0XHRcdH07XG5cdH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVBcnJheUZvcm1hdFNlcGFyYXRvcih2YWx1ZSkge1xuXHRpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyB8fCB2YWx1ZS5sZW5ndGggIT09IDEpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdhcnJheUZvcm1hdFNlcGFyYXRvciBtdXN0IGJlIHNpbmdsZSBjaGFyYWN0ZXIgc3RyaW5nJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gZW5jb2RlKHZhbHVlLCBvcHRpb25zKSB7XG5cdGlmIChvcHRpb25zLmVuY29kZSkge1xuXHRcdHJldHVybiBvcHRpb25zLnN0cmljdCA/IHN0cmljdFVyaUVuY29kZSh2YWx1ZSkgOiBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBkZWNvZGUodmFsdWUsIG9wdGlvbnMpIHtcblx0aWYgKG9wdGlvbnMuZGVjb2RlKSB7XG5cdFx0cmV0dXJuIGRlY29kZUNvbXBvbmVudCh2YWx1ZSk7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGtleXNTb3J0ZXIoaW5wdXQpIHtcblx0aWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG5cdFx0cmV0dXJuIGlucHV0LnNvcnQoKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIGtleXNTb3J0ZXIoT2JqZWN0LmtleXMoaW5wdXQpKVxuXHRcdFx0LnNvcnQoKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKSlcblx0XHRcdC5tYXAoa2V5ID0+IGlucHV0W2tleV0pO1xuXHR9XG5cblx0cmV0dXJuIGlucHV0O1xufVxuXG5mdW5jdGlvbiByZW1vdmVIYXNoKGlucHV0KSB7XG5cdGNvbnN0IGhhc2hTdGFydCA9IGlucHV0LmluZGV4T2YoJyMnKTtcblx0aWYgKGhhc2hTdGFydCAhPT0gLTEpIHtcblx0XHRpbnB1dCA9IGlucHV0LnNsaWNlKDAsIGhhc2hTdGFydCk7XG5cdH1cblxuXHRyZXR1cm4gaW5wdXQ7XG59XG5cbmZ1bmN0aW9uIGdldEhhc2godXJsKSB7XG5cdGxldCBoYXNoID0gJyc7XG5cdGNvbnN0IGhhc2hTdGFydCA9IHVybC5pbmRleE9mKCcjJyk7XG5cdGlmIChoYXNoU3RhcnQgIT09IC0xKSB7XG5cdFx0aGFzaCA9IHVybC5zbGljZShoYXNoU3RhcnQpO1xuXHR9XG5cblx0cmV0dXJuIGhhc2g7XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3QoaW5wdXQpIHtcblx0aW5wdXQgPSByZW1vdmVIYXNoKGlucHV0KTtcblx0Y29uc3QgcXVlcnlTdGFydCA9IGlucHV0LmluZGV4T2YoJz8nKTtcblx0aWYgKHF1ZXJ5U3RhcnQgPT09IC0xKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0cmV0dXJuIGlucHV0LnNsaWNlKHF1ZXJ5U3RhcnQgKyAxKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VWYWx1ZSh2YWx1ZSwgb3B0aW9ucykge1xuXHRpZiAob3B0aW9ucy5wYXJzZU51bWJlcnMgJiYgIU51bWJlci5pc05hTihOdW1iZXIodmFsdWUpKSAmJiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS50cmltKCkgIT09ICcnKSkge1xuXHRcdHZhbHVlID0gTnVtYmVyKHZhbHVlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLnBhcnNlQm9vbGVhbnMgJiYgdmFsdWUgIT09IG51bGwgJiYgKHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJyB8fCB2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSAnZmFsc2UnKSkge1xuXHRcdHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBwYXJzZShpbnB1dCwgb3B0aW9ucykge1xuXHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0ZGVjb2RlOiB0cnVlLFxuXHRcdHNvcnQ6IHRydWUsXG5cdFx0YXJyYXlGb3JtYXQ6ICdub25lJyxcblx0XHRhcnJheUZvcm1hdFNlcGFyYXRvcjogJywnLFxuXHRcdHBhcnNlTnVtYmVyczogZmFsc2UsXG5cdFx0cGFyc2VCb29sZWFuczogZmFsc2Vcblx0fSwgb3B0aW9ucyk7XG5cblx0dmFsaWRhdGVBcnJheUZvcm1hdFNlcGFyYXRvcihvcHRpb25zLmFycmF5Rm9ybWF0U2VwYXJhdG9yKTtcblxuXHRjb25zdCBmb3JtYXR0ZXIgPSBwYXJzZXJGb3JBcnJheUZvcm1hdChvcHRpb25zKTtcblxuXHQvLyBDcmVhdGUgYW4gb2JqZWN0IHdpdGggbm8gcHJvdG90eXBlXG5cdGNvbnN0IHJldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cblx0aWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0aW5wdXQgPSBpbnB1dC50cmltKCkucmVwbGFjZSgvXls/IyZdLywgJycpO1xuXG5cdGlmICghaW5wdXQpIHtcblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0Zm9yIChjb25zdCBwYXJhbSBvZiBpbnB1dC5zcGxpdCgnJicpKSB7XG5cdFx0bGV0IFtrZXksIHZhbHVlXSA9IHNwbGl0T25GaXJzdChvcHRpb25zLmRlY29kZSA/IHBhcmFtLnJlcGxhY2UoL1xcKy9nLCAnICcpIDogcGFyYW0sICc9Jyk7XG5cblx0XHQvLyBNaXNzaW5nIGA9YCBzaG91bGQgYmUgYG51bGxgOlxuXHRcdC8vIGh0dHA6Ly93My5vcmcvVFIvMjAxMi9XRC11cmwtMjAxMjA1MjQvI2NvbGxlY3QtdXJsLXBhcmFtZXRlcnNcblx0XHR2YWx1ZSA9IHZhbHVlID09PSB1bmRlZmluZWQgPyBudWxsIDogWydjb21tYScsICdzZXBhcmF0b3InXS5pbmNsdWRlcyhvcHRpb25zLmFycmF5Rm9ybWF0KSA/IHZhbHVlIDogZGVjb2RlKHZhbHVlLCBvcHRpb25zKTtcblx0XHRmb3JtYXR0ZXIoZGVjb2RlKGtleSwgb3B0aW9ucyksIHZhbHVlLCByZXQpO1xuXHR9XG5cblx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocmV0KSkge1xuXHRcdGNvbnN0IHZhbHVlID0gcmV0W2tleV07XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGwpIHtcblx0XHRcdGZvciAoY29uc3QgayBvZiBPYmplY3Qua2V5cyh2YWx1ZSkpIHtcblx0XHRcdFx0dmFsdWVba10gPSBwYXJzZVZhbHVlKHZhbHVlW2tdLCBvcHRpb25zKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0W2tleV0gPSBwYXJzZVZhbHVlKHZhbHVlLCBvcHRpb25zKTtcblx0XHR9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zb3J0ID09PSBmYWxzZSkge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRyZXR1cm4gKG9wdGlvbnMuc29ydCA9PT0gdHJ1ZSA/IE9iamVjdC5rZXlzKHJldCkuc29ydCgpIDogT2JqZWN0LmtleXMocmV0KS5zb3J0KG9wdGlvbnMuc29ydCkpLnJlZHVjZSgocmVzdWx0LCBrZXkpID0+IHtcblx0XHRjb25zdCB2YWx1ZSA9IHJldFtrZXldO1xuXHRcdGlmIChCb29sZWFuKHZhbHVlKSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0Ly8gU29ydCBvYmplY3Qga2V5cywgbm90IHZhbHVlc1xuXHRcdFx0cmVzdWx0W2tleV0gPSBrZXlzU29ydGVyKHZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0W2tleV0gPSB2YWx1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LCBPYmplY3QuY3JlYXRlKG51bGwpKTtcbn1cblxuZXhwb3J0cy5leHRyYWN0ID0gZXh0cmFjdDtcbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcblxuZXhwb3J0cy5zdHJpbmdpZnkgPSAob2JqZWN0LCBvcHRpb25zKSA9PiB7XG5cdGlmICghb2JqZWN0KSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdGVuY29kZTogdHJ1ZSxcblx0XHRzdHJpY3Q6IHRydWUsXG5cdFx0YXJyYXlGb3JtYXQ6ICdub25lJyxcblx0XHRhcnJheUZvcm1hdFNlcGFyYXRvcjogJywnXG5cdH0sIG9wdGlvbnMpO1xuXG5cdHZhbGlkYXRlQXJyYXlGb3JtYXRTZXBhcmF0b3Iob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcik7XG5cblx0Y29uc3Qgc2hvdWxkRmlsdGVyID0ga2V5ID0+IChcblx0XHQob3B0aW9ucy5za2lwTnVsbCAmJiBpc051bGxPclVuZGVmaW5lZChvYmplY3Rba2V5XSkpIHx8XG5cdFx0KG9wdGlvbnMuc2tpcEVtcHR5U3RyaW5nICYmIG9iamVjdFtrZXldID09PSAnJylcblx0KTtcblxuXHRjb25zdCBmb3JtYXR0ZXIgPSBlbmNvZGVyRm9yQXJyYXlGb3JtYXQob3B0aW9ucyk7XG5cblx0Y29uc3Qgb2JqZWN0Q29weSA9IHt9O1xuXG5cdGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iamVjdCkpIHtcblx0XHRpZiAoIXNob3VsZEZpbHRlcihrZXkpKSB7XG5cdFx0XHRvYmplY3RDb3B5W2tleV0gPSBvYmplY3Rba2V5XTtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0Q29weSk7XG5cblx0aWYgKG9wdGlvbnMuc29ydCAhPT0gZmFsc2UpIHtcblx0XHRrZXlzLnNvcnQob3B0aW9ucy5zb3J0KTtcblx0fVxuXG5cdHJldHVybiBrZXlzLm1hcChrZXkgPT4ge1xuXHRcdGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV07XG5cblx0XHRpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGVuY29kZShrZXksIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0XHRcdC5yZWR1Y2UoZm9ybWF0dGVyKGtleSksIFtdKVxuXHRcdFx0XHQuam9pbignJicpO1xuXHRcdH1cblxuXHRcdHJldHVybiBlbmNvZGUoa2V5LCBvcHRpb25zKSArICc9JyArIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyk7XG5cdH0pLmZpbHRlcih4ID0+IHgubGVuZ3RoID4gMCkuam9pbignJicpO1xufTtcblxuZXhwb3J0cy5wYXJzZVVybCA9IChpbnB1dCwgb3B0aW9ucykgPT4ge1xuXHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0ZGVjb2RlOiB0cnVlXG5cdH0sIG9wdGlvbnMpO1xuXG5cdGNvbnN0IFt1cmwsIGhhc2hdID0gc3BsaXRPbkZpcnN0KGlucHV0LCAnIycpO1xuXG5cdHJldHVybiBPYmplY3QuYXNzaWduKFxuXHRcdHtcblx0XHRcdHVybDogdXJsLnNwbGl0KCc/JylbMF0gfHwgJycsXG5cdFx0XHRxdWVyeTogcGFyc2UoZXh0cmFjdChpbnB1dCksIG9wdGlvbnMpXG5cdFx0fSxcblx0XHRvcHRpb25zICYmIG9wdGlvbnMucGFyc2VGcmFnbWVudElkZW50aWZpZXIgJiYgaGFzaCA/IHtmcmFnbWVudElkZW50aWZpZXI6IGRlY29kZShoYXNoLCBvcHRpb25zKX0gOiB7fVxuXHQpO1xufTtcblxuZXhwb3J0cy5zdHJpbmdpZnlVcmwgPSAoaW5wdXQsIG9wdGlvbnMpID0+IHtcblx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdGVuY29kZTogdHJ1ZSxcblx0XHRzdHJpY3Q6IHRydWVcblx0fSwgb3B0aW9ucyk7XG5cblx0Y29uc3QgdXJsID0gcmVtb3ZlSGFzaChpbnB1dC51cmwpLnNwbGl0KCc/JylbMF0gfHwgJyc7XG5cdGNvbnN0IHF1ZXJ5RnJvbVVybCA9IGV4cG9ydHMuZXh0cmFjdChpbnB1dC51cmwpO1xuXHRjb25zdCBwYXJzZWRRdWVyeUZyb21VcmwgPSBleHBvcnRzLnBhcnNlKHF1ZXJ5RnJvbVVybCwge3NvcnQ6IGZhbHNlfSk7XG5cblx0Y29uc3QgcXVlcnkgPSBPYmplY3QuYXNzaWduKHBhcnNlZFF1ZXJ5RnJvbVVybCwgaW5wdXQucXVlcnkpO1xuXHRsZXQgcXVlcnlTdHJpbmcgPSBleHBvcnRzLnN0cmluZ2lmeShxdWVyeSwgb3B0aW9ucyk7XG5cdGlmIChxdWVyeVN0cmluZykge1xuXHRcdHF1ZXJ5U3RyaW5nID0gYD8ke3F1ZXJ5U3RyaW5nfWA7XG5cdH1cblxuXHRsZXQgaGFzaCA9IGdldEhhc2goaW5wdXQudXJsKTtcblx0aWYgKGlucHV0LmZyYWdtZW50SWRlbnRpZmllcikge1xuXHRcdGhhc2ggPSBgIyR7ZW5jb2RlKGlucHV0LmZyYWdtZW50SWRlbnRpZmllciwgb3B0aW9ucyl9YDtcblx0fVxuXG5cdHJldHVybiBgJHt1cmx9JHtxdWVyeVN0cmluZ30ke2hhc2h9YDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gKHN0cmluZywgc2VwYXJhdG9yKSA9PiB7XG5cdGlmICghKHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBzZXBhcmF0b3IgPT09ICdzdHJpbmcnKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBhcmd1bWVudHMgdG8gYmUgb2YgdHlwZSBgc3RyaW5nYCcpO1xuXHR9XG5cblx0aWYgKHNlcGFyYXRvciA9PT0gJycpIHtcblx0XHRyZXR1cm4gW3N0cmluZ107XG5cdH1cblxuXHRjb25zdCBzZXBhcmF0b3JJbmRleCA9IHN0cmluZy5pbmRleE9mKHNlcGFyYXRvcik7XG5cblx0aWYgKHNlcGFyYXRvckluZGV4ID09PSAtMSkge1xuXHRcdHJldHVybiBbc3RyaW5nXTtcblx0fVxuXG5cdHJldHVybiBbXG5cdFx0c3RyaW5nLnNsaWNlKDAsIHNlcGFyYXRvckluZGV4KSxcblx0XHRzdHJpbmcuc2xpY2Uoc2VwYXJhdG9ySW5kZXggKyBzZXBhcmF0b3IubGVuZ3RoKVxuXHRdO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gc3RyID0+IGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpKl0vZywgeCA9PiBgJSR7eC5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpfWApO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBpbmplY3QgPSAoKSA9PiB7XG4gICAgLy8gSW5qZWN0IFNjcmlwdCB0byB1c2VyJ3MgRE9NXG4gICAgY29uc3QgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgcy5zcmMgPSBjaHJvbWUucnVudGltZS5nZXRVUkwoXCJqcy9pbmplY3QuanNcIik7XG4gICAgKGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5hcHBlbmRDaGlsZChzKTtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBpbmplY3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb250ZW50U2NyaXB0VjIgPSB2b2lkIDA7XG5jb25zdCBpbmplY3RUb0RvbV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9jb250ZW50U2NyaXB0L2luamVjdFRvRG9tXCIpKTtcbmNvbnN0IG1lc3NhZ2VTZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vcGFuZWwvQXBwL3NlcnZpY2UvbWVzc2FnZVNlcnZpY2VcIik7XG5jb25zdCBmdW5jdGlvbkV4ZWN1dG9yXzEgPSByZXF1aXJlKFwiLi9mdW5jdGlvbkV4ZWN1dG9yXCIpO1xuY29uc29sZS5sb2coXCJDb250ZW50IFNjcmlwdCB2MlwiKTtcbmNvbnN0IHBvcnQgPSBjaHJvbWUucnVudGltZS5jb25uZWN0KHsgbmFtZTogXCJtb2trdS1jb250ZW50LXNjcmlwdFwiIH0pO1xuY29uc3QgY29udGVudFNjcmlwdFYyID0gKCkgPT4ge1xuICAgIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgICAgIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIC8vIG1lc3NhZ2VkIHJlY2VpdmVkIGZyb20gc2VydmljZSB3b3JrZXJcbiAgICAgICAgICAgIGNvbnN0IG1vY2sgPSBtZXNzYWdlID09PSBudWxsIHx8IG1lc3NhZ2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc3NhZ2UubW9ja1Jlc3BvbnNlO1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9IG1lc3NhZ2UgPT09IG51bGwgfHwgbWVzc2FnZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWVzc2FnZS5yZXF1ZXN0O1xuICAgICAgICAgICAgaWYgKCFtb2NrKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZVNlcnZpY2VfMS5tZXNzYWdlU2VydmljZS5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogXCJDT05URU5UXCIsXG4gICAgICAgICAgICAgICAgICAgIHRvOiBcIkhPT0tcIixcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uTmFtZTogXCJNT0tLVVwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBpZDogbWVzc2FnZS5pZCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChtb2NrLnJlc3BvbnNlVHlwZSA9PT0gXCJGVU5DVElPTlwiICYmXG4gICAgICAgICAgICAgICAgICAgIG1vY2suZnVuY3Rpb24gJiZcbiAgICAgICAgICAgICAgICAgICAgbW9jay5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geWllbGQgKDAsIGZ1bmN0aW9uRXhlY3V0b3JfMS5ydW5GdW5jdGlvbikobW9jay5mdW5jdGlvbiwgcmVxdWVzdC5xdWVyeVBhcmFtcywgcmVxdWVzdC5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgbW9jay5yZXNwb25zZSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbWVzc2FnZVNlcnZpY2VfMS5tZXNzYWdlU2VydmljZS5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogXCJDT05URU5UXCIsXG4gICAgICAgICAgICAgICAgICAgIHRvOiBcIkhPT0tcIixcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uTmFtZTogXCJNT0tLVVwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBpZDogbWVzc2FnZS5pZCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlU2VydmljZV8xLm1lc3NhZ2VTZXJ2aWNlLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBmcm9tOiBcIkNPTlRFTlRcIixcbiAgICAgICAgICAgICAgICAgICAgdG86IFwiUEFORUxcIixcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uTmFtZTogXCJNT0tLVVwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkxPR19NT0NLX1NUQVRVU1wiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc01vY2tlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBtZXNzYWdlLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdElkOiBtb2NrLnByb2plY3RJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vY2tJZDogbW9jay5pZCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG1lc3NhZ2UuaWQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgICAgbWVzc2FnZVNlcnZpY2VfMS5tZXNzYWdlU2VydmljZS5saXN0ZW4oXCJDT05URU5UXCIsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSBcIkNIRUNLX01PQ0tcIikge1xuICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSBcIkxPR1wiKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZVNlcnZpY2VfMS5tZXNzYWdlU2VydmljZS5zZW5kKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZGF0YSksIHsgZnJvbTogXCJDT05URU5UXCIsIHRvOiBcIlBBTkVMXCIgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGNvbnN0IGhvc3QgPSBsb2NhdGlvbi5ob3N0O1xuICAgIGNvbnN0IGlzTG9jYWxob3N0ID0gbG9jYXRpb24uaHJlZi5pbmNsdWRlcyhcImh0dHA6Ly9sb2NhbGhvc3RcIik7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtgbW9ra3UuZXh0ZW5zaW9uLmFjdGl2ZS4ke2hvc3R9YF0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgbGV0IGFjdGl2ZSA9IHJlc3VsdFtgbW9ra3UuZXh0ZW5zaW9uLmFjdGl2ZS4ke2hvc3R9YF07XG4gICAgICAgIGlmIChpc0xvY2FsaG9zdCAmJiBhY3RpdmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgICAvLyBpbmplY3RzIHNjcmlwdCB0byBwYWdlJ3MgRE9NXG4gICAgICAgICAgICAoMCwgaW5qZWN0VG9Eb21fMS5kZWZhdWx0KSgpO1xuICAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRlbGwgdGhlIHBhbmVsIGFib3V0IHRoZSBuZXcgaW5qZWN0aW9uIChob3N0IG1pZ2h0IGhhdmUgY2hhbmdlZClcbiAgICAgICAgbWVzc2FnZVNlcnZpY2VfMS5tZXNzYWdlU2VydmljZS5zZW5kKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGhvc3QsXG4gICAgICAgICAgICB0eXBlOiBcIklOSVRcIixcbiAgICAgICAgICAgIGZyb206IFwiQ09OVEVOVFwiLFxuICAgICAgICAgICAgdG86IFwiUEFORUxcIixcbiAgICAgICAgICAgIGV4dGVuc2lvbk5hbWU6IFwiTU9LS1VcIixcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5jb250ZW50U2NyaXB0VjIgPSBjb250ZW50U2NyaXB0VjI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucnVuRnVuY3Rpb24gPSB2b2lkIDA7XG5jb25zdCBxdWVyeV9zdHJpbmdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicXVlcnktc3RyaW5nXCIpKTtcbmNvbnN0IGZpeGVkSGVhZGVyID0gXCJmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XCI7XG5jb25zdCBmaXhlZEZvb3RlciA9IFwifVwiO1xuLy8gSW5pdGlhbGl6ZSB0aGUgd29ya2VyXG5mdW5jdGlvbiBydW5GdW5jdGlvbihmdW5jU3RyaW5nLCBxdWVyaWVzU3RyaW5nLCBib2R5KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgLy8gQ3JlYXRlIHdvcmtlciBmcm9tIGEgQmxvYiBVUkwgdG8gZW1iZWQgd29ya2VyIGNvZGUgZGlyZWN0bHlcbiAgICAgICAgY29uc3Qgd29ya2VyQ29kZSA9IGBcbiAgICAgICAgICAgICAgICAvLyAtLS0gV2ViIFdvcmtlciBTY3JpcHQgLS0tXG5cbiAgICAgICAgICAgICAgICAvLyAxLiBOZXV0ZXIvVW5kZWZpbmUgc2Vuc2l0aXZlIEFQSXNcbiAgICAgICAgICAgICAgICAvLyBTdHJpY3QgbW9kZSBmb3IgdGhlIHdvcmtlclxuICAgICAgICAgICAgICAgICd1c2Ugc3RyaWN0JztcblxuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsQ29uc29sZSA9IHNlbGYuY29uc29sZTtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbnNvbGUgPSB1bmRlZmluZWQ7IFxuXG4gICAgICAgICAgICAgICAgLy8gTmV0d29ya1xuICAgICAgICAgICAgICAgIHNlbGYuZmV0Y2ggPSAoKSA9PiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ0ZldGNoIEFQSSBpcyBkaXNhYmxlZCBpbiB0aGlzIHNhbmRib3guJykpO1xuICAgICAgICAgICAgICAgIHNlbGYuWE1MSHR0cFJlcXVlc3QgPSBmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKCdYTUxIdHRwUmVxdWVzdCBpcyBkaXNhYmxlZCBpbiB0aGlzIHNhbmRib3guJyk7IH07XG4gICAgICAgICAgICAgICAgc2VsZi5XZWJTb2NrZXQgPSBmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKCdXZWJTb2NrZXQgaXMgZGlzYWJsZWQgaW4gdGhpcyBzYW5kYm94LicpOyB9O1xuICAgICAgICAgICAgICAgIHNlbGYuRXZlbnRTb3VyY2UgPSBmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKCdFdmVudFNvdXJjZSBpcyBkaXNhYmxlZCBpbiB0aGlzIHNhbmRib3guJyk7IH07XG5cbiAgICAgICAgICAgICAgICAvLyBTdG9yYWdlXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsICdsb2NhbFN0b3JhZ2UnLCB7IGdldDogKCkgPT4geyB0aHJvdyBuZXcgRXJyb3IoJ2xvY2FsU3RvcmFnZSBpcyBkaXNhYmxlZC4nKTsgfSB9KTtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsICdzZXNzaW9uU3RvcmFnZScsIHsgZ2V0OiAoKSA9PiB7IHRocm93IG5ldyBFcnJvcignc2Vzc2lvblN0b3JhZ2UgaXMgZGlzYWJsZWQuJyk7IH0gfSk7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCAnaW5kZXhlZERCJywgeyBnZXQ6ICgpID0+IHsgdGhyb3cgbmV3IEVycm9yKCdpbmRleGVkREIgaXMgZGlzYWJsZWQuJyk7IH0gfSk7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCAnY2FjaGVzJywgeyBnZXQ6ICgpID0+IHsgdGhyb3cgbmV3IEVycm9yKCdDYWNoZXMgQVBJIGlzIGRpc2FibGVkLicpOyB9IH0pO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxDb25zb2xlLndhcm4oJ0NvdWxkIG5vdCByZWRlZmluZSBzdG9yYWdlIHByb3BlcnRpZXM6JywgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vIFdvcmtlciBjb250cm9sXG4gICAgICAgICAgICAgICAgc2VsZi5pbXBvcnRTY3JpcHRzID0gZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcignaW1wb3J0U2NyaXB0cyBpcyBkaXNhYmxlZCBpbiB0aGlzIHNhbmRib3guJyk7IH07XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYubmF2aWdhdG9yICYmIHNlbGYubmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5uYXZpZ2F0b3Iuc2VydmljZVdvcmtlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gTG9jYXRpb25cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5uYXZpZ2F0b3IgJiYgc2VsZi5uYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5uYXZpZ2F0b3IuZ2VvbG9jYXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gT3RoZXIgcG90ZW50aWFsbHkgc2Vuc2l0aXZlIGdsb2JhbCBwcm9wZXJ0aWVzICh0aGlzIGlzIG5vdCBleGhhdXN0aXZlKVxuICAgICAgICAgICAgICAgIC8vIHNlbGYub3BlbiA9IHVuZGVmaW5lZDsgLy8gZm9yIHdpbmRvdy5vcGVuIGxpa2UgYmVoYXZpb3IgaWYgZXZlciBwb3NzaWJsZSBpbiB3b3JrZXJcbiAgICAgICAgICAgICAgICAvLyBzZWxmLmFsZXJ0ID0gdW5kZWZpbmVkOyAvLyBub3QgdHlwaWNhbGx5IGF2YWlsYWJsZSBidXQgZ29vZCBwcmFjdGljZVxuICAgICAgICAgICAgICAgIC8vIHNlbGYuY29uZmlybSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAvLyBzZWxmLnByb21wdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBET00gcmVsYXRlZCAobW9zdGx5IG5vdCBhdmFpbGFibGUsIGJ1dCB0byBiZSBzdXJlKVxuICAgICAgICAgICAgICAgIHNlbGYuZG9jdW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgc2VsZi53aW5kb3cgPSB1bmRlZmluZWQ7IC8vIHNlbGYgaXMgdGhlIGdsb2JhbCBzY29wZSwgYnV0IGdvb2QgdG8gdW5kZWZpbmUgJ3dpbmRvdycgZXhwbGljaXRseVxuXG4gICAgICAgICAgICAgICAgLy8gQWNjZXNzIHRvIGdsb2JhbCBjb25zdHJ1Y3RvcnMgdGhhdCBtaWdodCBiZSBtaXN1c2VkIGZvciBwcm90b3R5cGUgcG9sbHV0aW9uIG9yIG90aGVyIGF0dGFja3NcbiAgICAgICAgICAgICAgICAvLyAoQmUgY2FyZWZ1bCB3aXRoIHRoaXMsIGFzIGl0IG1pZ2h0IGJyZWFrIGxlZ2l0aW1hdGUgdXNlciBjb2RlIGlmIHRoZXkgcmVseSBvbiB0aGVzZSBmb3IgdHlwZSBjaGVja3MgZXRjLilcbiAgICAgICAgICAgICAgICAvLyBFeGFtcGxlOlxuICAgICAgICAgICAgICAgIE9iamVjdC5jb25zdHJ1Y3RvciA9IHVuZGVmaW5lZDsgXG4gICAgICAgICAgICAgICAgQXJyYXkuY29uc3RydWN0b3IgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbENvbnNvbGUubG9nKCdXb3JrZXIgcmVjZWl2ZWQgbWVzc2FnZTonLCBldmVudC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBxdWVyaWVzLCBib2R5IH0gPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBcblxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbmFsRnVuY3Rpb24gPSAke2ZpeGVkSGVhZGVyfSR7ZnVuY1N0cmluZ30ke2ZpeGVkRm9vdGVyfTtcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMi4gQ3JlYXRlIHRoZSBmdW5jdGlvbiB1c2luZyBuZXcgRnVuY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgdXNlckZ1bmN0aW9uU3RyaW5nIGlzIHRoZSBCT0RZIG9mIHRoZSBmdW5jdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICdxdWVyaWVzJyBhbmQgJ2JvZHknIGFyZSB0aGUgcGFyYW1ldGVyIG5hbWVzLlxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBGdW5jdGlvbi5jb25zdHJ1Y3RvciA9IHVuZGVmaW5lZDsgLy8gVGhpcyB3b3VsZCBicmVhayBvdXIgb3duIHVzZSBvZiBuZXcgRnVuY3Rpb24gaWYgZG9uZSBiZWZvcmUgaXQuXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDMuIEV4ZWN1dGUgdGhlIHVzZXIncyBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZmluYWxGdW5jdGlvbihxdWVyaWVzLCBib2R5KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyA0LiBTZW5kIHRoZSByZXN1bHQgYmFja1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IHN1Y2Nlc3M6IHRydWUsIHJlc3VsdDogcmVzdWx0IH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZXJyb3IubmFtZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjazogZXJyb3Iuc3RhY2sgLy8gQmUgY2F1dGlvdXMgYWJvdXQgc2VuZGluZyBmdWxsIHN0YWNrIHRyYWNlcyB0byB0aGUgY2xpZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgYDtcbiAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFt3b3JrZXJDb2RlXSwgeyB0eXBlOiBcImFwcGxpY2F0aW9uL2phdmFzY3JpcHRcIiB9KTtcbiAgICAgICAgY29uc3Qgd29ya2VyID0gbmV3IFdvcmtlcihVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpKTtcbiAgICAgICAgd29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3b3JrZXJcIiwgZXZlbnQpO1xuICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVzdWx0OlxcblwiICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGF0YS5yZXN1bHQsIG51bGwsIDIpKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGV2ZW50LmRhdGEucmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBcIkVycm9yOiBcIiArXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEuZXJyb3IubmFtZSArXG4gICAgICAgICAgICAgICAgICAgIFwiIC0gXCIgK1xuICAgICAgICAgICAgICAgICAgICBldmVudC5kYXRhLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEuZXJyb3Iuc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gT3B0aW9uYWxseSwgaW5jbHVkZSBzdGFjayBmb3IgZGVidWdnaW5nLCBidXQgYmUgbWluZGZ1bCBvZiBpbmZvIGRpc2Nsb3N1cmVcbiAgICAgICAgICAgICAgICAgICAgLy8gZXJyb3JNZXNzYWdlICs9ICdcXG5TdGFjazogJyArIGV2ZW50LmRhdGEuZXJyb3Iuc3RhY2s7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JNZXNzYWdlXCIsIGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHdvcmtlci5vbmVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiV29ya2VyIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgLy8gUmUtaW5pdGlhbGl6ZSB3b3JrZXIgb24gY2F0YXN0cm9waGljIGVycm9yIGlmIG5lZWRlZCwgb3IgcHJvdmlkZSBhIHJlc2V0IGJ1dHRvblxuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZVdvcmtlcigpO1xuICAgICAgICB9O1xuICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgcXVlcmllczogcXVlcnlfc3RyaW5nXzEuZGVmYXVsdC5wYXJzZShxdWVyaWVzU3RyaW5nKSxcbiAgICAgICAgICAgIGJvZHk6IGJvZHksXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0cy5ydW5GdW5jdGlvbiA9IHJ1bkZ1bmN0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1lc3NhZ2VTZXJ2aWNlID0gdm9pZCAwO1xuLyoqXG4gKlxuICogSW5qZWN0XG4gKiAgICAgLT4gQ29udGVudCBTY3JpcHRcbiAqXG4gKiBDb250ZW50IHNjcmlwdCBpcyBicmlkZ2UgYmV0d2VlbiBwYW5lbCBhbmQgaW5qZWN0IGZvciBjb21tdW5pY2F0aW9uXG4gKiBhcyBpdCBoYXMgYm90aCB3aW5kb3dzIGV2ZW50IGxpc3Rlcm4gYW5kIGNocm9tZSBydW50aW1lIG1lc3NhZ2UgbGlzdG5lclxuICogQ29udGVudCBTY3JpcHRcbiAqICAgICAtPiBQYW5lbFxuICogICAgIC0+IEhvb2tcbiAqXG4gKiBQYW5lbFxuICogICAgIC0+IENvbnRlbnQgU2NyaXB0XG4gKi9cbmNvbnN0IHR1bm5lbE1hcCA9IHtcbiAgICBcIkhPT0s6Q09OVEVOVFwiOiBcIndpbmRvd1wiLFxuICAgIFwiQ09OVEVOVDpIT09LXCI6IFwid2luZG93XCIsXG4gICAgXCJDT05URU5UOlBBTkVMXCI6IFwicnVudGltZVwiLFxuICAgIFwiQ09OVEVOVDpTRVJWSUNFX1dPUktFUlwiOiBcInJ1bnRpbWVcIixcbiAgICBcIlBBTkVMOkNPTlRFTlRcIjogXCJ0YWJcIixcbiAgICBcIlNFUlZJQ0VfV09SS0VSOkNPTlRFTlRcIjogXCJydW50aW1lXCIsXG4gICAgXCJTRVJWSUNFX1dPUktFUjpQQU5FTFwiOiBcInJ1bnRpbWVcIixcbn07XG5jb25zdCBzZW5kID0gKHByb3BzLCB0YWJJZCkgPT4ge1xuICAgIGNvbnN0IHBhdGhLZXkgPSBgJHtwcm9wcy5mcm9tfToke3Byb3BzLnRvfWA7XG4gICAgY29uc3QgcGF0aCA9IHR1bm5lbE1hcFtwYXRoS2V5XTtcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xuICAgICAgICB3aW5kb3c6ICgpID0+IHdpbmRvdy5wb3N0TWVzc2FnZShwcm9wcywgXCIqXCIpLFxuICAgICAgICBydW50aW1lOiAoKSA9PiBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShwcm9wcyksXG4gICAgICAgIHRhYjogKCkgPT4gY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiSWQsIHByb3BzKSxcbiAgICB9O1xuICAgIGlmIChzZXJ2aWNlW3BhdGhdKSB7XG4gICAgICAgIHNlcnZpY2VbcGF0aF0ocHJvcHMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgTW9ra3UgTWVzc2FnZVNlcnZpY2U6IE5vIHBhdGggZGVmaW5lZCBmb3IgJHtwYXRoS2V5fWApO1xuICAgIH1cbn07XG5jb25zdCBsaXN0ZW4gPSAoZW50aXR5LCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHNlcnZpY2UgPSB7XG4gICAgICAgIHJ1bnRpbWU6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZ1bmMgPSAobWVzc2FnZSwgX3NlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UudG8gIT09IGVudGl0eSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG1lc3NhZ2UsIF9zZW5kZXIsIHNlbmRSZXNwb25zZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmMpO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5yZW1vdmVMaXN0ZW5lcihmdW5jKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2luZG93OiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmdW5jID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gV2Ugb25seSBhY2NlcHQgbWVzc2FnZXMgZnJvbSBvdXJzZWx2ZXNcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlICE9PSB3aW5kb3cpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS50byAhPT0gZW50aXR5KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmMpO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBmdW5jKTtcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHN3aXRjaCAoZW50aXR5KSB7XG4gICAgICAgIGNhc2UgXCJIT09LXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBbc2VydmljZVtcIndpbmRvd1wiXSgpXTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiQ09OVEVOVFwiOiB7XG4gICAgICAgICAgICByZXR1cm4gW3NlcnZpY2VbXCJ3aW5kb3dcIl0oKSwgc2VydmljZVtcInJ1bnRpbWVcIl0oKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIlBBTkVMXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBbc2VydmljZVtcInJ1bnRpbWVcIl0oKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIlNFUlZJQ0VfV09SS0VSXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBbc2VydmljZVtcInJ1bnRpbWVcIl0oKV07XG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0cy5tZXNzYWdlU2VydmljZSA9IHsgc2VuZCwgbGlzdGVuIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyBpbXBvcnQgeyBnZXRTdG9yZSB9IGZyb20gXCIuL3BhbmVsL0FwcC9zZXJ2aWNlL3N0b3JlQWN0aW9uc1wiO1xuLy8gaW1wb3J0IHsgbWVzc2FnZVNlcnZpY2UgfSBmcm9tIFwiLi9wYW5lbC9BcHAvc2VydmljZVwiO1xuY29uc3QgY29udGVudFNjcmlwdFYyXzEgPSByZXF1aXJlKFwiLi9tb2trdS13ZWItYXBwLWNvbm5lY3Rvci9jb250ZW50U2NyaXB0VjJcIik7XG4vLyBjb25zdCBpbml0ID0gKCkgPT4ge1xuLy8gICAgIGxldCBzdG9yZSwgdXJsTWFwLCBkeW5hbWljVXJsTWFwOiBJRHluYW1pY1VSTE1hcDtcbi8vICAgICBnZXRTdG9yZSgpLnRoZW4oKGEpID0+IHtcbi8vICAgICAgICAgc3RvcmUgPSBhLnN0b3JlO1xuLy8gICAgICAgICB1cmxNYXAgPSBhLnVybE1hcDtcbi8vICAgICAgICAgZHluYW1pY1VybE1hcCA9IGEuZHluYW1pY1VybE1hcDtcbi8vICAgICB9KTtcbi8vICAgICBjb25zdCBnZXRNb2NrUGF0aCA9ICh1cmw6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcpID0+IHtcbi8vICAgICAgICAgLy8gdGhpcyB3aWxsIG1vdmVkIHRvIHN0b3JlLnRzXG4vLyAgICAgICAgIGlmICh1cmxNYXBbdXJsXSkge1xuLy8gICAgICAgICAgICAgaWYgKHVybE1hcFt1cmxdW21ldGhvZF0pIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gdXJsTWFwW3VybF1bbWV0aG9kXTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgICAgICBjb25zdCB1cmwxID0gdXJsLnJlcGxhY2UoXCI6Ly9cIiwgXCItXCIpO1xuLy8gICAgICAgICBjb25zdCBrZXkgPSB1cmwxLnNwbGl0KFwiL1wiKS5sZW5ndGg7XG4vLyAgICAgICAgIC8vIG1hdGNoIGFsbCBkeW5hbWljcyByb3V0ZVxuLy8gICAgICAgICBjb25zdCBzdGFjayA9IGR5bmFtaWNVcmxNYXBba2V5XTtcbi8vICAgICAgICAgaWYgKCFzdGFjaykgcmV0dXJuIFtdO1xuLy8gICAgICAgICBsZXQgaSA9IDA7XG4vLyAgICAgICAgIHdoaWxlIChpIDwgc3RhY2subGVuZ3RoKSB7XG4vLyAgICAgICAgICAgICAvLyB0aGVyZSBpcyBtb3JlIHRvIGl0IHdpbGwgYmUgdXNlZCB3aGVuXG4vLyAgICAgICAgICAgICAvLyBhY3Rpb24gYXJlIGludHJvZHVjZWRcbi8vICAgICAgICAgICAgIGNvbnN0IHMgPSBzdGFja1tpXTtcbi8vICAgICAgICAgICAgIGlmIChzLm1ldGhvZCA9PT0gbWV0aG9kICYmICEhcy5tYXRjaCh1cmwxKSkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiBbcy5nZXR0ZXJLZXldO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgaSsrO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIHJldHVybiBbXTtcbi8vICAgICB9O1xuLy8gICAgIGNvbnN0IHVwZGF0ZVN0b3JlID0gKCkgPT4ge1xuLy8gICAgICAgICBnZXRTdG9yZSgpLnRoZW4oKHgpID0+IHtcbi8vICAgICAgICAgICAgIHN0b3JlID0geC5zdG9yZTtcbi8vICAgICAgICAgICAgIHVybE1hcCA9IHgudXJsTWFwO1xuLy8gICAgICAgICAgICAgZHluYW1pY1VybE1hcCA9IHguZHluYW1pY1VybE1hcDtcbi8vICAgICAgICAgfSk7XG4vLyAgICAgfTtcbi8vICAgICBjb25zdCBnZXRBY3RpdmVNb2NrV2l0aFBhdGggPSAocGF0aHM6IHN0cmluZ1tdKSA9PiB7XG4vLyAgICAgICAgIGxldCBtb2NrID0gbnVsbDtcbi8vICAgICAgICAgbGV0IHBhdGggPSBudWxsO1xuLy8gICAgICAgICBwYXRocy5zb21lKCh0ZW1wUGF0aCkgPT4ge1xuLy8gICAgICAgICAgICAgY29uc3QgdGVtcE1vY2sgPSBnZXQoc3RvcmUsIHRlbXBQYXRoLCBudWxsKTtcbi8vICAgICAgICAgICAgIGlmICh0ZW1wTW9jay5hY3RpdmUpIHtcbi8vICAgICAgICAgICAgICAgICBtb2NrID0gdGVtcE1vY2s7XG4vLyAgICAgICAgICAgICAgICAgcGF0aCA9IHBhdGg7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICBpZiAobW9jaykge1xuLy8gICAgICAgICAgICAgcmV0dXJuIHsgbW9jaywgcGF0aCB9O1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIHJldHVybiB7IG1vY2s6IG51bGwsIHBhdGg6IG51bGwgfTtcbi8vICAgICB9O1xuLy8gICAgIG1lc3NhZ2VTZXJ2aWNlLmxpc3RlbihcIkNPTlRFTlRcIiwgKGRhdGE6IElFdmVudE1lc3NhZ2UpID0+IHtcbi8vICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gXCJMT0dcIikge1xuLy8gICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGRhdGEubWVzc2FnZSBhcyBJTG9nO1xuLy8gICAgICAgICAgICAgY29uc3QgbW9ja1BhdGhzID0gZ2V0TW9ja1BhdGgoXG4vLyAgICAgICAgICAgICAgICAgbWVzc2FnZS5yZXF1ZXN0LnVybCxcbi8vICAgICAgICAgICAgICAgICBtZXNzYWdlLnJlcXVlc3QubWV0aG9kLFxuLy8gICAgICAgICAgICAgKTtcbi8vICAgICAgICAgICAgIGNvbnN0IHsgbW9jaywgcGF0aCB9ID0gZ2V0QWN0aXZlTW9ja1dpdGhQYXRoKG1vY2tQYXRocyk7XG4vLyAgICAgICAgICAgICBpZiAobW9jaykge1xuLy8gICAgICAgICAgICAgICAgIG1lc3NhZ2UuaXNNb2NrZWQgPSBtb2NrLmFjdGl2ZTtcbi8vICAgICAgICAgICAgICAgICBtZXNzYWdlLm1vY2tQYXRoID0gcGF0aDtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLnNlbmQoe1xuLy8gICAgICAgICAgICAgICAgIG1lc3NhZ2UsXG4vLyAgICAgICAgICAgICAgICAgdHlwZTogXCJMT0dcIixcbi8vICAgICAgICAgICAgICAgICBmcm9tOiBcIkNPTlRFTlRcIixcbi8vICAgICAgICAgICAgICAgICB0bzogXCJQQU5FTFwiLFxuLy8gICAgICAgICAgICAgICAgIGV4dGVuc2lvbk5hbWU6IFwiTU9LS1VcIixcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgICAgcmV0dXJuO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09IFwiTk9USUZJQ0FUSU9OXCIgJiYgZGF0YS5tZXNzYWdlID09PSBcIlVQREFURV9TVE9SRVwiKSB7XG4vLyAgICAgICAgICAgICB1cGRhdGVTdG9yZSgpO1xuLy8gICAgICAgICAgICAgcmV0dXJuO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBPbWl0PElFdmVudE1lc3NhZ2UsIFwidHlwZVwiPiA9IHtcbi8vICAgICAgICAgICAgIGlkOiBkYXRhLmlkLFxuLy8gICAgICAgICAgICAgZnJvbTogXCJDT05URU5UXCIsXG4vLyAgICAgICAgICAgICB0bzogXCJIT09LXCIsXG4vLyAgICAgICAgICAgICBleHRlbnNpb25OYW1lOiBcIk1PS0tVXCIsXG4vLyAgICAgICAgICAgICBtZXNzYWdlOiB7fSxcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgY29uc3QgcmVxdWVzdCA9IChkYXRhLm1lc3NhZ2UgYXMgSUxvZykucmVxdWVzdDtcbi8vICAgICAgICAgY29uc3QgbW9ja1BhdGhzID0gZ2V0TW9ja1BhdGgocmVxdWVzdC51cmwsIHJlcXVlc3QubWV0aG9kKTtcbi8vICAgICAgICAgY29uc3QgeyBtb2NrIH0gPSBnZXRBY3RpdmVNb2NrV2l0aFBhdGgobW9ja1BhdGhzKTtcbi8vICAgICAgICAgaWYgKG1vY2sgJiYgbW9jay5hY3RpdmUpIHtcbi8vICAgICAgICAgICAgIChyZXNwb25zZS5tZXNzYWdlIGFzIElMb2cpLm1vY2tSZXNwb25zZSA9IG1vY2s7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgbWVzc2FnZVNlcnZpY2Uuc2VuZChyZXNwb25zZSk7XG4vLyAgICAgfSk7XG4vLyB9O1xuLy8gY29uc3QgaG9zdCA9IGxvY2F0aW9uLmhvc3Q7XG4vLyBjb25zdCBpc0xvY2FsaG9zdCA9IGxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoXCJodHRwOi8vbG9jYWxob3N0XCIpO1xuLy8gY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtgbW9ra3UuZXh0ZW5zaW9uLmFjdGl2ZS4ke2hvc3R9YF0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbi8vICAgICBsZXQgYWN0aXZlID0gcmVzdWx0W2Btb2trdS5leHRlbnNpb24uYWN0aXZlLiR7aG9zdH1gXTtcbi8vICAgICBpZiAoaXNMb2NhbGhvc3QgJiYgYWN0aXZlID09PSB1bmRlZmluZWQpIHtcbi8vICAgICAgICAgYWN0aXZlID0gdHJ1ZTtcbi8vICAgICB9XG4vLyAgICAgaWYgKGFjdGl2ZSkge1xuLy8gICAgICAgICAvLyBpbmplY3RzIHNjcmlwdCB0byBwYWdlJ3MgRE9NXG4vLyAgICAgICAgIGluamVjdCgpO1xuLy8gICAgICAgICBpbml0KCk7XG4vLyAgICAgfVxuLy8gICAgIC8vIHRlbGwgdGhlIHBhbmVsIGFib3V0IHRoZSBuZXcgaW5qZWN0aW9uIChob3N0IG1pZ2h0IGhhdmUgY2hhbmdlZClcbi8vICAgICBtZXNzYWdlU2VydmljZS5zZW5kKHtcbi8vICAgICAgICAgbWVzc2FnZTogaG9zdCxcbi8vICAgICAgICAgdHlwZTogXCJJTklUXCIsXG4vLyAgICAgICAgIGZyb206IFwiQ09OVEVOVFwiLFxuLy8gICAgICAgICB0bzogXCJQQU5FTFwiLFxuLy8gICAgICAgICBleHRlbnNpb25OYW1lOiBcIk1PS0tVXCIsXG4vLyAgICAgfSk7XG4vLyB9KTtcbigwLCBjb250ZW50U2NyaXB0VjJfMS5jb250ZW50U2NyaXB0VjIpKCk7XG4vLyBjb25zb2xlLmxvZyhcIlhaXCIpO1xuLy8gaW5qZWN0KCk7XG4vLyBtZXNzYWdlU2VydmljZS5saXN0ZW4oXCJDT05URU5UXCIsIChkYXRhOiBJRXZlbnRNZXNzYWdlKSA9PiB7XG4vLyAgICAgY29uc29sZS5sb2coXCJjb250ZW50OiBcXG5cIiwgZGF0YSk7XG4vLyAgICAgaWYgKGRhdGEudHlwZSA9PT0gXCJMT0dcIikge1xuLy8gICAgICAgICBjb25zdCBtZXNzYWdlID0gZGF0YS5tZXNzYWdlIGFzIElMb2c7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VuZGluZyB0byBwYW5lbFwiKTtcbi8vICAgICAgICAgbWVzc2FnZVNlcnZpY2Uuc2VuZCh7XG4vLyAgICAgICAgICAgICBtZXNzYWdlLFxuLy8gICAgICAgICAgICAgdHlwZTogXCJMT0dcIixcbi8vICAgICAgICAgICAgIGZyb206IFwiQ09OVEVOVFwiLFxuLy8gICAgICAgICAgICAgdG86IFwiUEFORUxcIixcbi8vICAgICAgICAgICAgIGV4dGVuc2lvbk5hbWU6IFwiTU9LS1VcIixcbi8vICAgICAgICAgfSk7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VuZGluZyB0byBzZXJ2aWNlIHdvcmtlclwiKTtcbi8vICAgICAgICAgbWVzc2FnZVNlcnZpY2Uuc2VuZCh7XG4vLyAgICAgICAgICAgICBtZXNzYWdlLFxuLy8gICAgICAgICAgICAgdHlwZTogXCJMT0dcIixcbi8vICAgICAgICAgICAgIGZyb206IFwiQ09OVEVOVFwiLFxuLy8gICAgICAgICAgICAgdG86IFwiU0VSVklDRV9XT1JLRVJcIixcbi8vICAgICAgICAgICAgIGV4dGVuc2lvbk5hbWU6IFwiTU9LS1VcIixcbi8vICAgICAgICAgfSk7XG4vLyAgICAgfVxuLy8gfSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=