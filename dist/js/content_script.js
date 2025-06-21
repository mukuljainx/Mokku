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
                        projectId: mock.projectId,
                        mockId: mock.id,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudF9zY3JpcHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsdUJBQXVCLEVBQUU7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsa0JBQWtCLG1CQUFtQjtBQUNyQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsaUJBQWlCLG9CQUFvQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM3RmE7QUFDYix3QkFBd0IsbUJBQU8sQ0FBQyxvRUFBbUI7QUFDbkQsd0JBQXdCLG1CQUFPLENBQUMsMEVBQXNCO0FBQ3RELHFCQUFxQixtQkFBTyxDQUFDLDhEQUFnQjs7QUFFN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7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QUNBLFlBQVk7QUFDWjtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGFBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsS0FBSztBQUM1RCxxREFBcUQsS0FBSztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSxJQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTW9ra3UvLi9ub2RlX21vZHVsZXMvZGVjb2RlLXVyaS1jb21wb25lbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9ub2RlX21vZHVsZXMvcXVlcnktc3RyaW5nL2luZGV4LmpzIiwid2VicGFjazovL01va2t1Ly4vbm9kZV9tb2R1bGVzL3NwbGl0LW9uLWZpcnN0L2luZGV4LmpzIiwid2VicGFjazovL01va2t1Ly4vbm9kZV9tb2R1bGVzL3N0cmljdC11cmktZW5jb2RlL2luZGV4LmpzIiwid2VicGFjazovL01va2t1Ly4vc3JjL2NvbnRlbnRTY3JpcHQvaW5qZWN0VG9Eb20udHMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9zcmMvbW9ra3Utd2ViLWFwcC1jb25uZWN0b3IvY29udGVudFNjcmlwdFYyLnRzIiwid2VicGFjazovL01va2t1Ly4vc3JjL21va2t1LXdlYi1hcHAtY29ubmVjdG9yL2Z1bmN0aW9uRXhlY3V0b3IudHMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9zcmMvcGFuZWwvQXBwL3NlcnZpY2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9zcmMvcGFuZWwvQXBwL3NlcnZpY2UvbWVzc2FnZVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vTW9ra3Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9zcmMvY29udGVudF9zY3JpcHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xudmFyIHRva2VuID0gJyVbYS1mMC05XXsyfSc7XG52YXIgc2luZ2xlTWF0Y2hlciA9IG5ldyBSZWdFeHAodG9rZW4sICdnaScpO1xudmFyIG11bHRpTWF0Y2hlciA9IG5ldyBSZWdFeHAoJygnICsgdG9rZW4gKyAnKSsnLCAnZ2knKTtcblxuZnVuY3Rpb24gZGVjb2RlQ29tcG9uZW50cyhjb21wb25lbnRzLCBzcGxpdCkge1xuXHR0cnkge1xuXHRcdC8vIFRyeSB0byBkZWNvZGUgdGhlIGVudGlyZSBzdHJpbmcgZmlyc3Rcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGNvbXBvbmVudHMuam9pbignJykpO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBEbyBub3RoaW5nXG5cdH1cblxuXHRpZiAoY29tcG9uZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50cztcblx0fVxuXG5cdHNwbGl0ID0gc3BsaXQgfHwgMTtcblxuXHQvLyBTcGxpdCB0aGUgYXJyYXkgaW4gMiBwYXJ0c1xuXHR2YXIgbGVmdCA9IGNvbXBvbmVudHMuc2xpY2UoMCwgc3BsaXQpO1xuXHR2YXIgcmlnaHQgPSBjb21wb25lbnRzLnNsaWNlKHNwbGl0KTtcblxuXHRyZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5jYWxsKFtdLCBkZWNvZGVDb21wb25lbnRzKGxlZnQpLCBkZWNvZGVDb21wb25lbnRzKHJpZ2h0KSk7XG59XG5cbmZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoaW5wdXQpO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHR2YXIgdG9rZW5zID0gaW5wdXQubWF0Y2goc2luZ2xlTWF0Y2hlcik7XG5cblx0XHRmb3IgKHZhciBpID0gMTsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aW5wdXQgPSBkZWNvZGVDb21wb25lbnRzKHRva2VucywgaSkuam9pbignJyk7XG5cblx0XHRcdHRva2VucyA9IGlucHV0Lm1hdGNoKHNpbmdsZU1hdGNoZXIpO1xuXHRcdH1cblxuXHRcdHJldHVybiBpbnB1dDtcblx0fVxufVxuXG5mdW5jdGlvbiBjdXN0b21EZWNvZGVVUklDb21wb25lbnQoaW5wdXQpIHtcblx0Ly8gS2VlcCB0cmFjayBvZiBhbGwgdGhlIHJlcGxhY2VtZW50cyBhbmQgcHJlZmlsbCB0aGUgbWFwIHdpdGggdGhlIGBCT01gXG5cdHZhciByZXBsYWNlTWFwID0ge1xuXHRcdCclRkUlRkYnOiAnXFx1RkZGRFxcdUZGRkQnLFxuXHRcdCclRkYlRkUnOiAnXFx1RkZGRFxcdUZGRkQnXG5cdH07XG5cblx0dmFyIG1hdGNoID0gbXVsdGlNYXRjaGVyLmV4ZWMoaW5wdXQpO1xuXHR3aGlsZSAobWF0Y2gpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gRGVjb2RlIGFzIGJpZyBjaHVua3MgYXMgcG9zc2libGVcblx0XHRcdHJlcGxhY2VNYXBbbWF0Y2hbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzBdKTtcblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdHZhciByZXN1bHQgPSBkZWNvZGUobWF0Y2hbMF0pO1xuXG5cdFx0XHRpZiAocmVzdWx0ICE9PSBtYXRjaFswXSkge1xuXHRcdFx0XHRyZXBsYWNlTWFwW21hdGNoWzBdXSA9IHJlc3VsdDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRtYXRjaCA9IG11bHRpTWF0Y2hlci5leGVjKGlucHV0KTtcblx0fVxuXG5cdC8vIEFkZCBgJUMyYCBhdCB0aGUgZW5kIG9mIHRoZSBtYXAgdG8gbWFrZSBzdXJlIGl0IGRvZXMgbm90IHJlcGxhY2UgdGhlIGNvbWJpbmF0b3IgYmVmb3JlIGV2ZXJ5dGhpbmcgZWxzZVxuXHRyZXBsYWNlTWFwWyclQzInXSA9ICdcXHVGRkZEJztcblxuXHR2YXIgZW50cmllcyA9IE9iamVjdC5rZXlzKHJlcGxhY2VNYXApO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkrKykge1xuXHRcdC8vIFJlcGxhY2UgYWxsIGRlY29kZWQgY29tcG9uZW50c1xuXHRcdHZhciBrZXkgPSBlbnRyaWVzW2ldO1xuXHRcdGlucHV0ID0gaW5wdXQucmVwbGFjZShuZXcgUmVnRXhwKGtleSwgJ2cnKSwgcmVwbGFjZU1hcFtrZXldKTtcblx0fVxuXG5cdHJldHVybiBpbnB1dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZW5jb2RlZFVSSSkge1xuXHRpZiAodHlwZW9mIGVuY29kZWRVUkkgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYGVuY29kZWRVUklgIHRvIGJlIG9mIHR5cGUgYHN0cmluZ2AsIGdvdCBgJyArIHR5cGVvZiBlbmNvZGVkVVJJICsgJ2AnKTtcblx0fVxuXG5cdHRyeSB7XG5cdFx0ZW5jb2RlZFVSSSA9IGVuY29kZWRVUkkucmVwbGFjZSgvXFwrL2csICcgJyk7XG5cblx0XHQvLyBUcnkgdGhlIGJ1aWx0IGluIGRlY29kZXIgZmlyc3Rcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVuY29kZWRVUkkpO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBGYWxsYmFjayB0byBhIG1vcmUgYWR2YW5jZWQgZGVjb2RlclxuXHRcdHJldHVybiBjdXN0b21EZWNvZGVVUklDb21wb25lbnQoZW5jb2RlZFVSSSk7XG5cdH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBzdHJpY3RVcmlFbmNvZGUgPSByZXF1aXJlKCdzdHJpY3QtdXJpLWVuY29kZScpO1xuY29uc3QgZGVjb2RlQ29tcG9uZW50ID0gcmVxdWlyZSgnZGVjb2RlLXVyaS1jb21wb25lbnQnKTtcbmNvbnN0IHNwbGl0T25GaXJzdCA9IHJlcXVpcmUoJ3NwbGl0LW9uLWZpcnN0Jyk7XG5cbmNvbnN0IGlzTnVsbE9yVW5kZWZpbmVkID0gdmFsdWUgPT4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZDtcblxuZnVuY3Rpb24gZW5jb2RlckZvckFycmF5Rm9ybWF0KG9wdGlvbnMpIHtcblx0c3dpdGNoIChvcHRpb25zLmFycmF5Rm9ybWF0KSB7XG5cdFx0Y2FzZSAnaW5kZXgnOlxuXHRcdFx0cmV0dXJuIGtleSA9PiAocmVzdWx0LCB2YWx1ZSkgPT4ge1xuXHRcdFx0XHRjb25zdCBpbmRleCA9IHJlc3VsdC5sZW5ndGg7XG5cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHZhbHVlID09PSB1bmRlZmluZWQgfHxcblx0XHRcdFx0XHQob3B0aW9ucy5za2lwTnVsbCAmJiB2YWx1ZSA9PT0gbnVsbCkgfHxcblx0XHRcdFx0XHQob3B0aW9ucy5za2lwRW1wdHlTdHJpbmcgJiYgdmFsdWUgPT09ICcnKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFsuLi5yZXN1bHQsIFtlbmNvZGUoa2V5LCBvcHRpb25zKSwgJ1snLCBpbmRleCwgJ10nXS5qb2luKCcnKV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRcdC4uLnJlc3VsdCxcblx0XHRcdFx0XHRbZW5jb2RlKGtleSwgb3B0aW9ucyksICdbJywgZW5jb2RlKGluZGV4LCBvcHRpb25zKSwgJ109JywgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbignJylcblx0XHRcdFx0XTtcblx0XHRcdH07XG5cblx0XHRjYXNlICdicmFja2V0Jzpcblx0XHRcdHJldHVybiBrZXkgPT4gKHJlc3VsdCwgdmFsdWUpID0+IHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHZhbHVlID09PSB1bmRlZmluZWQgfHxcblx0XHRcdFx0XHQob3B0aW9ucy5za2lwTnVsbCAmJiB2YWx1ZSA9PT0gbnVsbCkgfHxcblx0XHRcdFx0XHQob3B0aW9ucy5za2lwRW1wdHlTdHJpbmcgJiYgdmFsdWUgPT09ICcnKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFsuLi5yZXN1bHQsIFtlbmNvZGUoa2V5LCBvcHRpb25zKSwgJ1tdJ10uam9pbignJyldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIFsuLi5yZXN1bHQsIFtlbmNvZGUoa2V5LCBvcHRpb25zKSwgJ1tdPScsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4oJycpXTtcblx0XHRcdH07XG5cblx0XHRjYXNlICdjb21tYSc6XG5cdFx0Y2FzZSAnc2VwYXJhdG9yJzpcblx0XHRcdHJldHVybiBrZXkgPT4gKHJlc3VsdCwgdmFsdWUpID0+IHtcblx0XHRcdFx0aWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFtbZW5jb2RlKGtleSwgb3B0aW9ucyksICc9JywgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbignJyldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIFtbcmVzdWx0LCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKG9wdGlvbnMuYXJyYXlGb3JtYXRTZXBhcmF0b3IpXTtcblx0XHRcdH07XG5cblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIGtleSA9PiAocmVzdWx0LCB2YWx1ZSkgPT4ge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0dmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBOdWxsICYmIHZhbHVlID09PSBudWxsKSB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBFbXB0eVN0cmluZyAmJiB2YWx1ZSA9PT0gJycpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgZW5jb2RlKGtleSwgb3B0aW9ucyldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIFsuLi5yZXN1bHQsIFtlbmNvZGUoa2V5LCBvcHRpb25zKSwgJz0nLCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKCcnKV07XG5cdFx0XHR9O1xuXHR9XG59XG5cbmZ1bmN0aW9uIHBhcnNlckZvckFycmF5Rm9ybWF0KG9wdGlvbnMpIHtcblx0bGV0IHJlc3VsdDtcblxuXHRzd2l0Y2ggKG9wdGlvbnMuYXJyYXlGb3JtYXQpIHtcblx0XHRjYXNlICdpbmRleCc6XG5cdFx0XHRyZXR1cm4gKGtleSwgdmFsdWUsIGFjY3VtdWxhdG9yKSA9PiB7XG5cdFx0XHRcdHJlc3VsdCA9IC9cXFsoXFxkKilcXF0kLy5leGVjKGtleSk7XG5cblx0XHRcdFx0a2V5ID0ga2V5LnJlcGxhY2UoL1xcW1xcZCpcXF0kLywgJycpO1xuXG5cdFx0XHRcdGlmICghcmVzdWx0KSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChhY2N1bXVsYXRvcltrZXldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0ge307XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhY2N1bXVsYXRvcltrZXldW3Jlc3VsdFsxXV0gPSB2YWx1ZTtcblx0XHRcdH07XG5cblx0XHRjYXNlICdicmFja2V0Jzpcblx0XHRcdHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcblx0XHRcdFx0cmVzdWx0ID0gLyhcXFtcXF0pJC8uZXhlYyhrZXkpO1xuXHRcdFx0XHRrZXkgPSBrZXkucmVwbGFjZSgvXFxbXFxdJC8sICcnKTtcblxuXHRcdFx0XHRpZiAoIXJlc3VsdCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYWNjdW11bGF0b3Jba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IFt2YWx1ZV07XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IFtdLmNvbmNhdChhY2N1bXVsYXRvcltrZXldLCB2YWx1ZSk7XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnY29tbWEnOlxuXHRcdGNhc2UgJ3NlcGFyYXRvcic6XG5cdFx0XHRyZXR1cm4gKGtleSwgdmFsdWUsIGFjY3VtdWxhdG9yKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGlzQXJyYXkgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLnNwbGl0KCcnKS5pbmRleE9mKG9wdGlvbnMuYXJyYXlGb3JtYXRTZXBhcmF0b3IpID4gLTE7XG5cdFx0XHRcdGNvbnN0IG5ld1ZhbHVlID0gaXNBcnJheSA/IHZhbHVlLnNwbGl0KG9wdGlvbnMuYXJyYXlGb3JtYXRTZXBhcmF0b3IpLm1hcChpdGVtID0+IGRlY29kZShpdGVtLCBvcHRpb25zKSkgOiB2YWx1ZSA9PT0gbnVsbCA/IHZhbHVlIDogZGVjb2RlKHZhbHVlLCBvcHRpb25zKTtcblx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IG5ld1ZhbHVlO1xuXHRcdFx0fTtcblxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gKGtleSwgdmFsdWUsIGFjY3VtdWxhdG9yKSA9PiB7XG5cdFx0XHRcdGlmIChhY2N1bXVsYXRvcltrZXldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IFtdLmNvbmNhdChhY2N1bXVsYXRvcltrZXldLCB2YWx1ZSk7XG5cdFx0XHR9O1xuXHR9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQXJyYXlGb3JtYXRTZXBhcmF0b3IodmFsdWUpIHtcblx0aWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgfHwgdmFsdWUubGVuZ3RoICE9PSAxKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignYXJyYXlGb3JtYXRTZXBhcmF0b3IgbXVzdCBiZSBzaW5nbGUgY2hhcmFjdGVyIHN0cmluZycpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWx1ZSwgb3B0aW9ucykge1xuXHRpZiAob3B0aW9ucy5lbmNvZGUpIHtcblx0XHRyZXR1cm4gb3B0aW9ucy5zdHJpY3QgPyBzdHJpY3RVcmlFbmNvZGUodmFsdWUpIDogZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZGVjb2RlKHZhbHVlLCBvcHRpb25zKSB7XG5cdGlmIChvcHRpb25zLmRlY29kZSkge1xuXHRcdHJldHVybiBkZWNvZGVDb21wb25lbnQodmFsdWUpO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBrZXlzU29ydGVyKGlucHV0KSB7XG5cdGlmIChBcnJheS5pc0FycmF5KGlucHV0KSkge1xuXHRcdHJldHVybiBpbnB1dC5zb3J0KCk7XG5cdH1cblxuXHRpZiAodHlwZW9mIGlucHV0ID09PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBrZXlzU29ydGVyKE9iamVjdC5rZXlzKGlucHV0KSlcblx0XHRcdC5zb3J0KChhLCBiKSA9PiBOdW1iZXIoYSkgLSBOdW1iZXIoYikpXG5cdFx0XHQubWFwKGtleSA9PiBpbnB1dFtrZXldKTtcblx0fVxuXG5cdHJldHVybiBpbnB1dDtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSGFzaChpbnB1dCkge1xuXHRjb25zdCBoYXNoU3RhcnQgPSBpbnB1dC5pbmRleE9mKCcjJyk7XG5cdGlmIChoYXNoU3RhcnQgIT09IC0xKSB7XG5cdFx0aW5wdXQgPSBpbnB1dC5zbGljZSgwLCBoYXNoU3RhcnQpO1xuXHR9XG5cblx0cmV0dXJuIGlucHV0O1xufVxuXG5mdW5jdGlvbiBnZXRIYXNoKHVybCkge1xuXHRsZXQgaGFzaCA9ICcnO1xuXHRjb25zdCBoYXNoU3RhcnQgPSB1cmwuaW5kZXhPZignIycpO1xuXHRpZiAoaGFzaFN0YXJ0ICE9PSAtMSkge1xuXHRcdGhhc2ggPSB1cmwuc2xpY2UoaGFzaFN0YXJ0KTtcblx0fVxuXG5cdHJldHVybiBoYXNoO1xufVxuXG5mdW5jdGlvbiBleHRyYWN0KGlucHV0KSB7XG5cdGlucHV0ID0gcmVtb3ZlSGFzaChpbnB1dCk7XG5cdGNvbnN0IHF1ZXJ5U3RhcnQgPSBpbnB1dC5pbmRleE9mKCc/Jyk7XG5cdGlmIChxdWVyeVN0YXJ0ID09PSAtMSkge1xuXHRcdHJldHVybiAnJztcblx0fVxuXG5cdHJldHVybiBpbnB1dC5zbGljZShxdWVyeVN0YXJ0ICsgMSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVmFsdWUodmFsdWUsIG9wdGlvbnMpIHtcblx0aWYgKG9wdGlvbnMucGFyc2VOdW1iZXJzICYmICFOdW1iZXIuaXNOYU4oTnVtYmVyKHZhbHVlKSkgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUudHJpbSgpICE9PSAnJykpIHtcblx0XHR2YWx1ZSA9IE51bWJlcih2YWx1ZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5wYXJzZUJvb2xlYW5zICYmIHZhbHVlICE9PSBudWxsICYmICh2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZScgfHwgdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ2ZhbHNlJykpIHtcblx0XHR2YWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJztcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gcGFyc2UoaW5wdXQsIG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdGRlY29kZTogdHJ1ZSxcblx0XHRzb3J0OiB0cnVlLFxuXHRcdGFycmF5Rm9ybWF0OiAnbm9uZScsXG5cdFx0YXJyYXlGb3JtYXRTZXBhcmF0b3I6ICcsJyxcblx0XHRwYXJzZU51bWJlcnM6IGZhbHNlLFxuXHRcdHBhcnNlQm9vbGVhbnM6IGZhbHNlXG5cdH0sIG9wdGlvbnMpO1xuXG5cdHZhbGlkYXRlQXJyYXlGb3JtYXRTZXBhcmF0b3Iob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcik7XG5cblx0Y29uc3QgZm9ybWF0dGVyID0gcGFyc2VyRm9yQXJyYXlGb3JtYXQob3B0aW9ucyk7XG5cblx0Ly8gQ3JlYXRlIGFuIG9iamVjdCB3aXRoIG5vIHByb3RvdHlwZVxuXHRjb25zdCByZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5cdGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXG5cdGlucHV0ID0gaW5wdXQudHJpbSgpLnJlcGxhY2UoL15bPyMmXS8sICcnKTtcblxuXHRpZiAoIWlucHV0KSB7XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXG5cdGZvciAoY29uc3QgcGFyYW0gb2YgaW5wdXQuc3BsaXQoJyYnKSkge1xuXHRcdGxldCBba2V5LCB2YWx1ZV0gPSBzcGxpdE9uRmlyc3Qob3B0aW9ucy5kZWNvZGUgPyBwYXJhbS5yZXBsYWNlKC9cXCsvZywgJyAnKSA6IHBhcmFtLCAnPScpO1xuXG5cdFx0Ly8gTWlzc2luZyBgPWAgc2hvdWxkIGJlIGBudWxsYDpcblx0XHQvLyBodHRwOi8vdzMub3JnL1RSLzIwMTIvV0QtdXJsLTIwMTIwNTI0LyNjb2xsZWN0LXVybC1wYXJhbWV0ZXJzXG5cdFx0dmFsdWUgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IFsnY29tbWEnLCAnc2VwYXJhdG9yJ10uaW5jbHVkZXMob3B0aW9ucy5hcnJheUZvcm1hdCkgPyB2YWx1ZSA6IGRlY29kZSh2YWx1ZSwgb3B0aW9ucyk7XG5cdFx0Zm9ybWF0dGVyKGRlY29kZShrZXksIG9wdGlvbnMpLCB2YWx1ZSwgcmV0KTtcblx0fVxuXG5cdGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHJldCkpIHtcblx0XHRjb25zdCB2YWx1ZSA9IHJldFtrZXldO1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsKSB7XG5cdFx0XHRmb3IgKGNvbnN0IGsgb2YgT2JqZWN0LmtleXModmFsdWUpKSB7XG5cdFx0XHRcdHZhbHVlW2tdID0gcGFyc2VWYWx1ZSh2YWx1ZVtrXSwgb3B0aW9ucyk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldFtrZXldID0gcGFyc2VWYWx1ZSh2YWx1ZSwgb3B0aW9ucyk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc29ydCA9PT0gZmFsc2UpIHtcblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0cmV0dXJuIChvcHRpb25zLnNvcnQgPT09IHRydWUgPyBPYmplY3Qua2V5cyhyZXQpLnNvcnQoKSA6IE9iamVjdC5rZXlzKHJldCkuc29ydChvcHRpb25zLnNvcnQpKS5yZWR1Y2UoKHJlc3VsdCwga2V5KSA9PiB7XG5cdFx0Y29uc3QgdmFsdWUgPSByZXRba2V5XTtcblx0XHRpZiAoQm9vbGVhbih2YWx1ZSkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRcdC8vIFNvcnQgb2JqZWN0IGtleXMsIG5vdCB2YWx1ZXNcblx0XHRcdHJlc3VsdFtrZXldID0ga2V5c1NvcnRlcih2YWx1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdFtrZXldID0gdmFsdWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSwgT2JqZWN0LmNyZWF0ZShudWxsKSk7XG59XG5cbmV4cG9ydHMuZXh0cmFjdCA9IGV4dHJhY3Q7XG5leHBvcnRzLnBhcnNlID0gcGFyc2U7XG5cbmV4cG9ydHMuc3RyaW5naWZ5ID0gKG9iamVjdCwgb3B0aW9ucykgPT4ge1xuXHRpZiAoIW9iamVjdCkge1xuXHRcdHJldHVybiAnJztcblx0fVxuXG5cdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRlbmNvZGU6IHRydWUsXG5cdFx0c3RyaWN0OiB0cnVlLFxuXHRcdGFycmF5Rm9ybWF0OiAnbm9uZScsXG5cdFx0YXJyYXlGb3JtYXRTZXBhcmF0b3I6ICcsJ1xuXHR9LCBvcHRpb25zKTtcblxuXHR2YWxpZGF0ZUFycmF5Rm9ybWF0U2VwYXJhdG9yKG9wdGlvbnMuYXJyYXlGb3JtYXRTZXBhcmF0b3IpO1xuXG5cdGNvbnN0IHNob3VsZEZpbHRlciA9IGtleSA9PiAoXG5cdFx0KG9wdGlvbnMuc2tpcE51bGwgJiYgaXNOdWxsT3JVbmRlZmluZWQob2JqZWN0W2tleV0pKSB8fFxuXHRcdChvcHRpb25zLnNraXBFbXB0eVN0cmluZyAmJiBvYmplY3Rba2V5XSA9PT0gJycpXG5cdCk7XG5cblx0Y29uc3QgZm9ybWF0dGVyID0gZW5jb2RlckZvckFycmF5Rm9ybWF0KG9wdGlvbnMpO1xuXG5cdGNvbnN0IG9iamVjdENvcHkgPSB7fTtcblxuXHRmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhvYmplY3QpKSB7XG5cdFx0aWYgKCFzaG91bGRGaWx0ZXIoa2V5KSkge1xuXHRcdFx0b2JqZWN0Q29weVtrZXldID0gb2JqZWN0W2tleV07XG5cdFx0fVxuXHR9XG5cblx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdENvcHkpO1xuXG5cdGlmIChvcHRpb25zLnNvcnQgIT09IGZhbHNlKSB7XG5cdFx0a2V5cy5zb3J0KG9wdGlvbnMuc29ydCk7XG5cdH1cblxuXHRyZXR1cm4ga2V5cy5tYXAoa2V5ID0+IHtcblx0XHRjb25zdCB2YWx1ZSA9IG9iamVjdFtrZXldO1xuXG5cdFx0aWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cblx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBlbmNvZGUoa2V5LCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdFx0XHQucmVkdWNlKGZvcm1hdHRlcihrZXkpLCBbXSlcblx0XHRcdFx0LmpvaW4oJyYnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZW5jb2RlKGtleSwgb3B0aW9ucykgKyAnPScgKyBlbmNvZGUodmFsdWUsIG9wdGlvbnMpO1xuXHR9KS5maWx0ZXIoeCA9PiB4Lmxlbmd0aCA+IDApLmpvaW4oJyYnKTtcbn07XG5cbmV4cG9ydHMucGFyc2VVcmwgPSAoaW5wdXQsIG9wdGlvbnMpID0+IHtcblx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdGRlY29kZTogdHJ1ZVxuXHR9LCBvcHRpb25zKTtcblxuXHRjb25zdCBbdXJsLCBoYXNoXSA9IHNwbGl0T25GaXJzdChpbnB1dCwgJyMnKTtcblxuXHRyZXR1cm4gT2JqZWN0LmFzc2lnbihcblx0XHR7XG5cdFx0XHR1cmw6IHVybC5zcGxpdCgnPycpWzBdIHx8ICcnLFxuXHRcdFx0cXVlcnk6IHBhcnNlKGV4dHJhY3QoaW5wdXQpLCBvcHRpb25zKVxuXHRcdH0sXG5cdFx0b3B0aW9ucyAmJiBvcHRpb25zLnBhcnNlRnJhZ21lbnRJZGVudGlmaWVyICYmIGhhc2ggPyB7ZnJhZ21lbnRJZGVudGlmaWVyOiBkZWNvZGUoaGFzaCwgb3B0aW9ucyl9IDoge31cblx0KTtcbn07XG5cbmV4cG9ydHMuc3RyaW5naWZ5VXJsID0gKGlucHV0LCBvcHRpb25zKSA9PiB7XG5cdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRlbmNvZGU6IHRydWUsXG5cdFx0c3RyaWN0OiB0cnVlXG5cdH0sIG9wdGlvbnMpO1xuXG5cdGNvbnN0IHVybCA9IHJlbW92ZUhhc2goaW5wdXQudXJsKS5zcGxpdCgnPycpWzBdIHx8ICcnO1xuXHRjb25zdCBxdWVyeUZyb21VcmwgPSBleHBvcnRzLmV4dHJhY3QoaW5wdXQudXJsKTtcblx0Y29uc3QgcGFyc2VkUXVlcnlGcm9tVXJsID0gZXhwb3J0cy5wYXJzZShxdWVyeUZyb21VcmwsIHtzb3J0OiBmYWxzZX0pO1xuXG5cdGNvbnN0IHF1ZXJ5ID0gT2JqZWN0LmFzc2lnbihwYXJzZWRRdWVyeUZyb21VcmwsIGlucHV0LnF1ZXJ5KTtcblx0bGV0IHF1ZXJ5U3RyaW5nID0gZXhwb3J0cy5zdHJpbmdpZnkocXVlcnksIG9wdGlvbnMpO1xuXHRpZiAocXVlcnlTdHJpbmcpIHtcblx0XHRxdWVyeVN0cmluZyA9IGA/JHtxdWVyeVN0cmluZ31gO1xuXHR9XG5cblx0bGV0IGhhc2ggPSBnZXRIYXNoKGlucHV0LnVybCk7XG5cdGlmIChpbnB1dC5mcmFnbWVudElkZW50aWZpZXIpIHtcblx0XHRoYXNoID0gYCMke2VuY29kZShpbnB1dC5mcmFnbWVudElkZW50aWZpZXIsIG9wdGlvbnMpfWA7XG5cdH1cblxuXHRyZXR1cm4gYCR7dXJsfSR7cXVlcnlTdHJpbmd9JHtoYXNofWA7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzdHJpbmcsIHNlcGFyYXRvcikgPT4ge1xuXHRpZiAoISh0eXBlb2Ygc3RyaW5nID09PSAnc3RyaW5nJyAmJiB0eXBlb2Ygc2VwYXJhdG9yID09PSAnc3RyaW5nJykpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCB0aGUgYXJndW1lbnRzIHRvIGJlIG9mIHR5cGUgYHN0cmluZ2AnKTtcblx0fVxuXG5cdGlmIChzZXBhcmF0b3IgPT09ICcnKSB7XG5cdFx0cmV0dXJuIFtzdHJpbmddO1xuXHR9XG5cblx0Y29uc3Qgc2VwYXJhdG9ySW5kZXggPSBzdHJpbmcuaW5kZXhPZihzZXBhcmF0b3IpO1xuXG5cdGlmIChzZXBhcmF0b3JJbmRleCA9PT0gLTEpIHtcblx0XHRyZXR1cm4gW3N0cmluZ107XG5cdH1cblxuXHRyZXR1cm4gW1xuXHRcdHN0cmluZy5zbGljZSgwLCBzZXBhcmF0b3JJbmRleCksXG5cdFx0c3RyaW5nLnNsaWNlKHNlcGFyYXRvckluZGV4ICsgc2VwYXJhdG9yLmxlbmd0aClcblx0XTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHN0ciA9PiBlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC9bIScoKSpdL2csIHggPT4gYCUke3guY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKX1gKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaW5qZWN0ID0gKCkgPT4ge1xuICAgIC8vIEluamVjdCBTY3JpcHQgdG8gdXNlcidzIERPTVxuICAgIGNvbnN0IHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgIHMuc3JjID0gY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKFwianMvaW5qZWN0LmpzXCIpO1xuICAgIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuYXBwZW5kQ2hpbGQocyk7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gaW5qZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29udGVudFNjcmlwdFYyID0gdm9pZCAwO1xuY29uc3QgaW5qZWN0VG9Eb21fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vY29udGVudFNjcmlwdC9pbmplY3RUb0RvbVwiKSk7XG5jb25zdCBzZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi4vcGFuZWwvQXBwL3NlcnZpY2VcIik7XG5jb25zdCBmdW5jdGlvbkV4ZWN1dG9yXzEgPSByZXF1aXJlKFwiLi9mdW5jdGlvbkV4ZWN1dG9yXCIpO1xuY29uc29sZS5sb2coXCJDb250ZW50IFNjcmlwdCB2MlwiKTtcbmNvbnN0IHBvcnQgPSBjaHJvbWUucnVudGltZS5jb25uZWN0KHsgbmFtZTogXCJtb2trdS1jb250ZW50LXNjcmlwdFwiIH0pO1xuY29uc3QgY29udGVudFNjcmlwdFYyID0gKCkgPT4ge1xuICAgIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgICAgIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIC8vIG1lc3NhZ2VkIHJlY2VpdmVkIGZyb20gc2VydmljZSB3b3JrZXJcbiAgICAgICAgICAgIGNvbnN0IG1vY2sgPSBtZXNzYWdlID09PSBudWxsIHx8IG1lc3NhZ2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1lc3NhZ2UubW9ja1Jlc3BvbnNlO1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9IG1lc3NhZ2UgPT09IG51bGwgfHwgbWVzc2FnZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWVzc2FnZS5yZXF1ZXN0O1xuICAgICAgICAgICAgaWYgKCFtb2NrKSB7XG4gICAgICAgICAgICAgICAgc2VydmljZV8xLm1lc3NhZ2VTZXJ2aWNlLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBmcm9tOiBcIkNPTlRFTlRcIixcbiAgICAgICAgICAgICAgICAgICAgdG86IFwiSE9PS1wiLFxuICAgICAgICAgICAgICAgICAgICBleHRlbnNpb25OYW1lOiBcIk1PS0tVXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBtZXNzYWdlLmlkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG1vY2sudHlwZSA9PT0gXCJGVU5DVElPTlwiICYmIG1vY2suZnVuY3Rpb24gJiYgbW9jay5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geWllbGQgKDAsIGZ1bmN0aW9uRXhlY3V0b3JfMS5ydW5GdW5jdGlvbikobW9jay5mdW5jdGlvbiwgcmVxdWVzdC5xdWVyeVBhcmFtcywgcmVxdWVzdC5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgbW9jay5yZXNwb25zZSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VydmljZV8xLm1lc3NhZ2VTZXJ2aWNlLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBmcm9tOiBcIkNPTlRFTlRcIixcbiAgICAgICAgICAgICAgICAgICAgdG86IFwiSE9PS1wiLFxuICAgICAgICAgICAgICAgICAgICBleHRlbnNpb25OYW1lOiBcIk1PS0tVXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBtZXNzYWdlLmlkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNlcnZpY2VfMS5tZXNzYWdlU2VydmljZS5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogXCJDT05URU5UXCIsXG4gICAgICAgICAgICAgICAgICAgIHRvOiBcIlBBTkVMXCIsXG4gICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbk5hbWU6IFwiTU9LS1VcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJMT0dfTU9DS19TVEFUVVNcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNNb2NrZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogbWVzc2FnZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RJZDogbW9jay5wcm9qZWN0SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2NrSWQ6IG1vY2suaWQsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGlkOiBtZXNzYWdlLmlkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICAgIHNlcnZpY2VfMS5tZXNzYWdlU2VydmljZS5saXN0ZW4oXCJDT05URU5UXCIsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSBcIkNIRUNLX01PQ0tcIikge1xuICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSBcIkxPR1wiKSB7XG4gICAgICAgICAgICAgICAgc2VydmljZV8xLm1lc3NhZ2VTZXJ2aWNlLnNlbmQoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBkYXRhKSwgeyBmcm9tOiBcIkNPTlRFTlRcIiwgdG86IFwiUEFORUxcIiB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc3QgaG9zdCA9IGxvY2F0aW9uLmhvc3Q7XG4gICAgY29uc3QgaXNMb2NhbGhvc3QgPSBsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFwiaHR0cDovL2xvY2FsaG9zdFwiKTtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW2Btb2trdS5leHRlbnNpb24uYWN0aXZlLiR7aG9zdH1gXSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICBsZXQgYWN0aXZlID0gcmVzdWx0W2Btb2trdS5leHRlbnNpb24uYWN0aXZlLiR7aG9zdH1gXTtcbiAgICAgICAgaWYgKGlzTG9jYWxob3N0ICYmIGFjdGl2ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICAgIC8vIGluamVjdHMgc2NyaXB0IHRvIHBhZ2UncyBET01cbiAgICAgICAgICAgICgwLCBpbmplY3RUb0RvbV8xLmRlZmF1bHQpKCk7XG4gICAgICAgICAgICBpbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGVsbCB0aGUgcGFuZWwgYWJvdXQgdGhlIG5ldyBpbmplY3Rpb24gKGhvc3QgbWlnaHQgaGF2ZSBjaGFuZ2VkKVxuICAgICAgICBzZXJ2aWNlXzEubWVzc2FnZVNlcnZpY2Uuc2VuZCh7XG4gICAgICAgICAgICBtZXNzYWdlOiBob3N0LFxuICAgICAgICAgICAgdHlwZTogXCJJTklUXCIsXG4gICAgICAgICAgICBmcm9tOiBcIkNPTlRFTlRcIixcbiAgICAgICAgICAgIHRvOiBcIlBBTkVMXCIsXG4gICAgICAgICAgICBleHRlbnNpb25OYW1lOiBcIk1PS0tVXCIsXG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbmV4cG9ydHMuY29udGVudFNjcmlwdFYyID0gY29udGVudFNjcmlwdFYyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJ1bkZ1bmN0aW9uID0gdm9pZCAwO1xuY29uc3QgcXVlcnlfc3RyaW5nXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInF1ZXJ5LXN0cmluZ1wiKSk7XG5jb25zdCBmaXhlZEhlYWRlciA9IFwiZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1wiO1xuY29uc3QgZml4ZWRGb290ZXIgPSBcIn1cIjtcbi8vIEluaXRpYWxpemUgdGhlIHdvcmtlclxuZnVuY3Rpb24gcnVuRnVuY3Rpb24oZnVuY1N0cmluZywgcXVlcmllc1N0cmluZywgYm9keSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIENyZWF0ZSB3b3JrZXIgZnJvbSBhIEJsb2IgVVJMIHRvIGVtYmVkIHdvcmtlciBjb2RlIGRpcmVjdGx5XG4gICAgICAgIGNvbnN0IHdvcmtlckNvZGUgPSBgXG4gICAgICAgICAgICAgICAgLy8gLS0tIFdlYiBXb3JrZXIgU2NyaXB0IC0tLVxuXG4gICAgICAgICAgICAgICAgLy8gMS4gTmV1dGVyL1VuZGVmaW5lIHNlbnNpdGl2ZSBBUElzXG4gICAgICAgICAgICAgICAgLy8gU3RyaWN0IG1vZGUgZm9yIHRoZSB3b3JrZXJcbiAgICAgICAgICAgICAgICAndXNlIHN0cmljdCc7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbENvbnNvbGUgPSBzZWxmLmNvbnNvbGU7XG4gICAgICAgICAgICAgICAgc2VsZi5jb25zb2xlID0gdW5kZWZpbmVkOyBcblxuICAgICAgICAgICAgICAgIC8vIE5ldHdvcmtcbiAgICAgICAgICAgICAgICBzZWxmLmZldGNoID0gKCkgPT4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdGZXRjaCBBUEkgaXMgZGlzYWJsZWQgaW4gdGhpcyBzYW5kYm94LicpKTtcbiAgICAgICAgICAgICAgICBzZWxmLlhNTEh0dHBSZXF1ZXN0ID0gZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcignWE1MSHR0cFJlcXVlc3QgaXMgZGlzYWJsZWQgaW4gdGhpcyBzYW5kYm94LicpOyB9O1xuICAgICAgICAgICAgICAgIHNlbGYuV2ViU29ja2V0ID0gZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcignV2ViU29ja2V0IGlzIGRpc2FibGVkIGluIHRoaXMgc2FuZGJveC4nKTsgfTtcbiAgICAgICAgICAgICAgICBzZWxmLkV2ZW50U291cmNlID0gZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcignRXZlbnRTb3VyY2UgaXMgZGlzYWJsZWQgaW4gdGhpcyBzYW5kYm94LicpOyB9O1xuXG4gICAgICAgICAgICAgICAgLy8gU3RvcmFnZVxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCAnbG9jYWxTdG9yYWdlJywgeyBnZXQ6ICgpID0+IHsgdGhyb3cgbmV3IEVycm9yKCdsb2NhbFN0b3JhZ2UgaXMgZGlzYWJsZWQuJyk7IH0gfSk7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCAnc2Vzc2lvblN0b3JhZ2UnLCB7IGdldDogKCkgPT4geyB0aHJvdyBuZXcgRXJyb3IoJ3Nlc3Npb25TdG9yYWdlIGlzIGRpc2FibGVkLicpOyB9IH0pO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwgJ2luZGV4ZWREQicsIHsgZ2V0OiAoKSA9PiB7IHRocm93IG5ldyBFcnJvcignaW5kZXhlZERCIGlzIGRpc2FibGVkLicpOyB9IH0pO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwgJ2NhY2hlcycsIHsgZ2V0OiAoKSA9PiB7IHRocm93IG5ldyBFcnJvcignQ2FjaGVzIEFQSSBpcyBkaXNhYmxlZC4nKTsgfSB9KTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsQ29uc29sZS53YXJuKCdDb3VsZCBub3QgcmVkZWZpbmUgc3RvcmFnZSBwcm9wZXJ0aWVzOicsIGUubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAvLyBXb3JrZXIgY29udHJvbFxuICAgICAgICAgICAgICAgIHNlbGYuaW1wb3J0U2NyaXB0cyA9IGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoJ2ltcG9ydFNjcmlwdHMgaXMgZGlzYWJsZWQgaW4gdGhpcyBzYW5kYm94LicpOyB9O1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLm5hdmlnYXRvciAmJiBzZWxmLm5hdmlnYXRvci5zZXJ2aWNlV29ya2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIExvY2F0aW9uXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYubmF2aWdhdG9yICYmIHNlbGYubmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubmF2aWdhdG9yLmdlb2xvY2F0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIE90aGVyIHBvdGVudGlhbGx5IHNlbnNpdGl2ZSBnbG9iYWwgcHJvcGVydGllcyAodGhpcyBpcyBub3QgZXhoYXVzdGl2ZSlcbiAgICAgICAgICAgICAgICAvLyBzZWxmLm9wZW4gPSB1bmRlZmluZWQ7IC8vIGZvciB3aW5kb3cub3BlbiBsaWtlIGJlaGF2aW9yIGlmIGV2ZXIgcG9zc2libGUgaW4gd29ya2VyXG4gICAgICAgICAgICAgICAgLy8gc2VsZi5hbGVydCA9IHVuZGVmaW5lZDsgLy8gbm90IHR5cGljYWxseSBhdmFpbGFibGUgYnV0IGdvb2QgcHJhY3RpY2VcbiAgICAgICAgICAgICAgICAvLyBzZWxmLmNvbmZpcm0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgLy8gc2VsZi5wcm9tcHQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gRE9NIHJlbGF0ZWQgKG1vc3RseSBub3QgYXZhaWxhYmxlLCBidXQgdG8gYmUgc3VyZSlcbiAgICAgICAgICAgICAgICBzZWxmLmRvY3VtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHNlbGYud2luZG93ID0gdW5kZWZpbmVkOyAvLyBzZWxmIGlzIHRoZSBnbG9iYWwgc2NvcGUsIGJ1dCBnb29kIHRvIHVuZGVmaW5lICd3aW5kb3cnIGV4cGxpY2l0bHlcblxuICAgICAgICAgICAgICAgIC8vIEFjY2VzcyB0byBnbG9iYWwgY29uc3RydWN0b3JzIHRoYXQgbWlnaHQgYmUgbWlzdXNlZCBmb3IgcHJvdG90eXBlIHBvbGx1dGlvbiBvciBvdGhlciBhdHRhY2tzXG4gICAgICAgICAgICAgICAgLy8gKEJlIGNhcmVmdWwgd2l0aCB0aGlzLCBhcyBpdCBtaWdodCBicmVhayBsZWdpdGltYXRlIHVzZXIgY29kZSBpZiB0aGV5IHJlbHkgb24gdGhlc2UgZm9yIHR5cGUgY2hlY2tzIGV0Yy4pXG4gICAgICAgICAgICAgICAgLy8gRXhhbXBsZTpcbiAgICAgICAgICAgICAgICBPYmplY3QuY29uc3RydWN0b3IgPSB1bmRlZmluZWQ7IFxuICAgICAgICAgICAgICAgIEFycmF5LmNvbnN0cnVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNlbGYub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxDb25zb2xlLmxvZygnV29ya2VyIHJlY2VpdmVkIG1lc3NhZ2U6JywgZXZlbnQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgcXVlcmllcywgYm9keSB9ID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgXG5cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaW5hbEZ1bmN0aW9uID0gJHtmaXhlZEhlYWRlcn0ke2Z1bmNTdHJpbmd9JHtmaXhlZEZvb3Rlcn07XG5cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDIuIENyZWF0ZSB0aGUgZnVuY3Rpb24gdXNpbmcgbmV3IEZ1bmN0aW9uLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHVzZXJGdW5jdGlvblN0cmluZyBpcyB0aGUgQk9EWSBvZiB0aGUgZnVuY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAncXVlcmllcycgYW5kICdib2R5JyBhcmUgdGhlIHBhcmFtZXRlciBuYW1lcy5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgRnVuY3Rpb24uY29uc3RydWN0b3IgPSB1bmRlZmluZWQ7IC8vIFRoaXMgd291bGQgYnJlYWsgb3VyIG93biB1c2Ugb2YgbmV3IEZ1bmN0aW9uIGlmIGRvbmUgYmVmb3JlIGl0LlxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAzLiBFeGVjdXRlIHRoZSB1c2VyJ3MgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZpbmFsRnVuY3Rpb24ocXVlcmllcywgYm9keSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gNC4gU2VuZCB0aGUgcmVzdWx0IGJhY2tcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyBzdWNjZXNzOiB0cnVlLCByZXN1bHQ6IHJlc3VsdCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGVycm9yLm5hbWUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2s6IGVycm9yLnN0YWNrIC8vIEJlIGNhdXRpb3VzIGFib3V0IHNlbmRpbmcgZnVsbCBzdGFjayB0cmFjZXMgdG8gdGhlIGNsaWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGA7XG4gICAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbd29ya2VyQ29kZV0sIHsgdHlwZTogXCJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0XCIgfSk7XG4gICAgICAgIGNvbnN0IHdvcmtlciA9IG5ldyBXb3JrZXIoVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKSk7XG4gICAgICAgIHdvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid29ya2VyXCIsIGV2ZW50KTtcbiAgICAgICAgICAgIGlmIChldmVudC5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3VsdDpcXG5cIiArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRhdGEucmVzdWx0LCBudWxsLCAyKSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShldmVudC5kYXRhLnJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gXCJFcnJvcjogXCIgK1xuICAgICAgICAgICAgICAgICAgICBldmVudC5kYXRhLmVycm9yLm5hbWUgK1xuICAgICAgICAgICAgICAgICAgICBcIiAtIFwiICtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5lcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5kYXRhLmVycm9yLnN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHksIGluY2x1ZGUgc3RhY2sgZm9yIGRlYnVnZ2luZywgYnV0IGJlIG1pbmRmdWwgb2YgaW5mbyBkaXNjbG9zdXJlXG4gICAgICAgICAgICAgICAgICAgIC8vIGVycm9yTWVzc2FnZSArPSAnXFxuU3RhY2s6ICcgKyBldmVudC5kYXRhLmVycm9yLnN0YWNrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yTWVzc2FnZVwiLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB3b3JrZXIub25lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIldvcmtlciBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIC8vIFJlLWluaXRpYWxpemUgd29ya2VyIG9uIGNhdGFzdHJvcGhpYyBlcnJvciBpZiBuZWVkZWQsIG9yIHByb3ZpZGUgYSByZXNldCBidXR0b25cbiAgICAgICAgICAgIC8vIGluaXRpYWxpemVXb3JrZXIoKTtcbiAgICAgICAgfTtcbiAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIHF1ZXJpZXM6IHF1ZXJ5X3N0cmluZ18xLmRlZmF1bHQucGFyc2UocXVlcmllc1N0cmluZyksXG4gICAgICAgICAgICBib2R5OiBib2R5LFxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHMucnVuRnVuY3Rpb24gPSBydW5GdW5jdGlvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tZXNzYWdlU2VydmljZSA9IHZvaWQgMDtcbmNvbnN0IG1lc3NhZ2VTZXJ2aWNlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vbWVzc2FnZVNlcnZpY2VcIikpO1xuZXhwb3J0cy5tZXNzYWdlU2VydmljZSA9IG1lc3NhZ2VTZXJ2aWNlXzEuZGVmYXVsdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKlxuICogSW5qZWN0XG4gKiAgICAgLT4gQ29udGVudCBTY3JpcHRcbiAqXG4gKiBDb250ZW50IHNjcmlwdCBpcyBicmlkZ2UgYmV0d2VlbiBwYW5lbCBhbmQgaW5qZWN0IGZvciBjb21tdW5pY2F0aW9uXG4gKiBhcyBpdCBoYXMgYm90aCB3aW5kb3dzIGV2ZW50IGxpc3Rlcm4gYW5kIGNocm9tZSBydW50aW1lIG1lc3NhZ2UgbGlzdG5lclxuICogQ29udGVudCBTY3JpcHRcbiAqICAgICAtPiBQYW5lbFxuICogICAgIC0+IEhvb2tcbiAqXG4gKiBQYW5lbFxuICogICAgIC0+IENvbnRlbnQgU2NyaXB0XG4gKi9cbmNvbnN0IHR1bm5lbE1hcCA9IHtcbiAgICBcIkhPT0s6Q09OVEVOVFwiOiBcIndpbmRvd1wiLFxuICAgIFwiQ09OVEVOVDpIT09LXCI6IFwid2luZG93XCIsXG4gICAgXCJDT05URU5UOlBBTkVMXCI6IFwicnVudGltZVwiLFxuICAgIFwiQ09OVEVOVDpTRVJWSUNFX1dPUktFUlwiOiBcInJ1bnRpbWVcIixcbiAgICBcIlBBTkVMOkNPTlRFTlRcIjogXCJ0YWJcIixcbiAgICBcIlNFUlZJQ0VfV09SS0VSOkNPTlRFTlRcIjogXCJydW50aW1lXCIsXG4gICAgXCJTRVJWSUNFX1dPUktFUjpQQU5FTFwiOiBcInJ1bnRpbWVcIixcbn07XG5jb25zdCBzZW5kID0gKHByb3BzLCB0YWJJZCkgPT4ge1xuICAgIGNvbnN0IHBhdGhLZXkgPSBgJHtwcm9wcy5mcm9tfToke3Byb3BzLnRvfWA7XG4gICAgY29uc3QgcGF0aCA9IHR1bm5lbE1hcFtwYXRoS2V5XTtcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xuICAgICAgICB3aW5kb3c6ICgpID0+IHdpbmRvdy5wb3N0TWVzc2FnZShwcm9wcywgXCIqXCIpLFxuICAgICAgICBydW50aW1lOiAoKSA9PiBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShwcm9wcyksXG4gICAgICAgIHRhYjogKCkgPT4gY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiSWQsIHByb3BzKSxcbiAgICB9O1xuICAgIGlmIChzZXJ2aWNlW3BhdGhdKSB7XG4gICAgICAgIHNlcnZpY2VbcGF0aF0ocHJvcHMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgTW9ra3UgTWVzc2FnZVNlcnZpY2U6IE5vIHBhdGggZGVmaW5lZCBmb3IgJHtwYXRoS2V5fWApO1xuICAgIH1cbn07XG5jb25zdCBsaXN0ZW4gPSAoZW50aXR5LCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHNlcnZpY2UgPSB7XG4gICAgICAgIHJ1bnRpbWU6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZ1bmMgPSAobWVzc2FnZSwgX3NlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UudG8gIT09IGVudGl0eSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG1lc3NhZ2UsIF9zZW5kZXIsIHNlbmRSZXNwb25zZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmMpO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5yZW1vdmVMaXN0ZW5lcihmdW5jKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2luZG93OiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmdW5jID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gV2Ugb25seSBhY2NlcHQgbWVzc2FnZXMgZnJvbSBvdXJzZWx2ZXNcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlICE9PSB3aW5kb3cpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS50byAhPT0gZW50aXR5KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmMpO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBmdW5jKTtcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHN3aXRjaCAoZW50aXR5KSB7XG4gICAgICAgIGNhc2UgXCJIT09LXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBbc2VydmljZVtcIndpbmRvd1wiXSgpXTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiQ09OVEVOVFwiOiB7XG4gICAgICAgICAgICByZXR1cm4gW3NlcnZpY2VbXCJ3aW5kb3dcIl0oKSwgc2VydmljZVtcInJ1bnRpbWVcIl0oKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIlBBTkVMXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBbc2VydmljZVtcInJ1bnRpbWVcIl0oKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIlNFUlZJQ0VfV09SS0VSXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBbc2VydmljZVtcInJ1bnRpbWVcIl0oKV07XG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0geyBzZW5kLCBsaXN0ZW4gfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvbnRlbnRTY3JpcHRWMl8xID0gcmVxdWlyZShcIi4vbW9ra3Utd2ViLWFwcC1jb25uZWN0b3IvY29udGVudFNjcmlwdFYyXCIpO1xuLy8gY29uc3QgaW5pdCA9ICgpID0+IHtcbi8vICAgICBsZXQgc3RvcmUsIHVybE1hcCwgZHluYW1pY1VybE1hcDogSUR5bmFtaWNVUkxNYXA7XG4vLyAgICAgZ2V0U3RvcmUoKS50aGVuKChhKSA9PiB7XG4vLyAgICAgICAgIHN0b3JlID0gYS5zdG9yZTtcbi8vICAgICAgICAgdXJsTWFwID0gYS51cmxNYXA7XG4vLyAgICAgICAgIGR5bmFtaWNVcmxNYXAgPSBhLmR5bmFtaWNVcmxNYXA7XG4vLyAgICAgfSk7XG4vLyAgICAgY29uc3QgZ2V0TW9ja1BhdGggPSAodXJsOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nKSA9PiB7XG4vLyAgICAgICAgIC8vIHRoaXMgd2lsbCBtb3ZlZCB0byBzdG9yZS50c1xuLy8gICAgICAgICBpZiAodXJsTWFwW3VybF0pIHtcbi8vICAgICAgICAgICAgIGlmICh1cmxNYXBbdXJsXVttZXRob2RdKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHVybE1hcFt1cmxdW21ldGhvZF07XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgY29uc3QgdXJsMSA9IHVybC5yZXBsYWNlKFwiOi8vXCIsIFwiLVwiKTtcbi8vICAgICAgICAgY29uc3Qga2V5ID0gdXJsMS5zcGxpdChcIi9cIikubGVuZ3RoO1xuLy8gICAgICAgICAvLyBtYXRjaCBhbGwgZHluYW1pY3Mgcm91dGVcbi8vICAgICAgICAgY29uc3Qgc3RhY2sgPSBkeW5hbWljVXJsTWFwW2tleV07XG4vLyAgICAgICAgIGlmICghc3RhY2spIHJldHVybiBbXTtcbi8vICAgICAgICAgbGV0IGkgPSAwO1xuLy8gICAgICAgICB3aGlsZSAoaSA8IHN0YWNrLmxlbmd0aCkge1xuLy8gICAgICAgICAgICAgLy8gdGhlcmUgaXMgbW9yZSB0byBpdCB3aWxsIGJlIHVzZWQgd2hlblxuLy8gICAgICAgICAgICAgLy8gYWN0aW9uIGFyZSBpbnRyb2R1Y2VkXG4vLyAgICAgICAgICAgICBjb25zdCBzID0gc3RhY2tbaV07XG4vLyAgICAgICAgICAgICBpZiAocy5tZXRob2QgPT09IG1ldGhvZCAmJiAhIXMubWF0Y2godXJsMSkpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gW3MuZ2V0dGVyS2V5XTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIGkrKztcbi8vICAgICAgICAgfVxuLy8gICAgICAgICByZXR1cm4gW107XG4vLyAgICAgfTtcbi8vICAgICBjb25zdCB1cGRhdGVTdG9yZSA9ICgpID0+IHtcbi8vICAgICAgICAgZ2V0U3RvcmUoKS50aGVuKCh4KSA9PiB7XG4vLyAgICAgICAgICAgICBzdG9yZSA9IHguc3RvcmU7XG4vLyAgICAgICAgICAgICB1cmxNYXAgPSB4LnVybE1hcDtcbi8vICAgICAgICAgICAgIGR5bmFtaWNVcmxNYXAgPSB4LmR5bmFtaWNVcmxNYXA7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgIH07XG4vLyAgICAgY29uc3QgZ2V0QWN0aXZlTW9ja1dpdGhQYXRoID0gKHBhdGhzOiBzdHJpbmdbXSkgPT4ge1xuLy8gICAgICAgICBsZXQgbW9jayA9IG51bGw7XG4vLyAgICAgICAgIGxldCBwYXRoID0gbnVsbDtcbi8vICAgICAgICAgcGF0aHMuc29tZSgodGVtcFBhdGgpID0+IHtcbi8vICAgICAgICAgICAgIGNvbnN0IHRlbXBNb2NrID0gZ2V0KHN0b3JlLCB0ZW1wUGF0aCwgbnVsbCk7XG4vLyAgICAgICAgICAgICBpZiAodGVtcE1vY2suYWN0aXZlKSB7XG4vLyAgICAgICAgICAgICAgICAgbW9jayA9IHRlbXBNb2NrO1xuLy8gICAgICAgICAgICAgICAgIHBhdGggPSBwYXRoO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuLy8gICAgICAgICB9KTtcbi8vICAgICAgICAgaWYgKG1vY2spIHtcbi8vICAgICAgICAgICAgIHJldHVybiB7IG1vY2ssIHBhdGggfTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICByZXR1cm4geyBtb2NrOiBudWxsLCBwYXRoOiBudWxsIH07XG4vLyAgICAgfTtcbi8vICAgICBtZXNzYWdlU2VydmljZS5saXN0ZW4oXCJDT05URU5UXCIsIChkYXRhOiBJRXZlbnRNZXNzYWdlKSA9PiB7XG4vLyAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09IFwiTE9HXCIpIHtcbi8vICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2UgYXMgSUxvZztcbi8vICAgICAgICAgICAgIGNvbnN0IG1vY2tQYXRocyA9IGdldE1vY2tQYXRoKFxuLy8gICAgICAgICAgICAgICAgIG1lc3NhZ2UucmVxdWVzdC51cmwsXG4vLyAgICAgICAgICAgICAgICAgbWVzc2FnZS5yZXF1ZXN0Lm1ldGhvZCxcbi8vICAgICAgICAgICAgICk7XG4vLyAgICAgICAgICAgICBjb25zdCB7IG1vY2ssIHBhdGggfSA9IGdldEFjdGl2ZU1vY2tXaXRoUGF0aChtb2NrUGF0aHMpO1xuLy8gICAgICAgICAgICAgaWYgKG1vY2spIHtcbi8vICAgICAgICAgICAgICAgICBtZXNzYWdlLmlzTW9ja2VkID0gbW9jay5hY3RpdmU7XG4vLyAgICAgICAgICAgICAgICAgbWVzc2FnZS5tb2NrUGF0aCA9IHBhdGg7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBtZXNzYWdlU2VydmljZS5zZW5kKHtcbi8vICAgICAgICAgICAgICAgICBtZXNzYWdlLFxuLy8gICAgICAgICAgICAgICAgIHR5cGU6IFwiTE9HXCIsXG4vLyAgICAgICAgICAgICAgICAgZnJvbTogXCJDT05URU5UXCIsXG4vLyAgICAgICAgICAgICAgICAgdG86IFwiUEFORUxcIixcbi8vICAgICAgICAgICAgICAgICBleHRlbnNpb25OYW1lOiBcIk1PS0tVXCIsXG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICAgIHJldHVybjtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBpZiAoZGF0YS50eXBlID09PSBcIk5PVElGSUNBVElPTlwiICYmIGRhdGEubWVzc2FnZSA9PT0gXCJVUERBVEVfU1RPUkVcIikge1xuLy8gICAgICAgICAgICAgdXBkYXRlU3RvcmUoKTtcbi8vICAgICAgICAgICAgIHJldHVybjtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBjb25zdCByZXNwb25zZTogT21pdDxJRXZlbnRNZXNzYWdlLCBcInR5cGVcIj4gPSB7XG4vLyAgICAgICAgICAgICBpZDogZGF0YS5pZCxcbi8vICAgICAgICAgICAgIGZyb206IFwiQ09OVEVOVFwiLFxuLy8gICAgICAgICAgICAgdG86IFwiSE9PS1wiLFxuLy8gICAgICAgICAgICAgZXh0ZW5zaW9uTmFtZTogXCJNT0tLVVwiLFxuLy8gICAgICAgICAgICAgbWVzc2FnZToge30sXG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSAoZGF0YS5tZXNzYWdlIGFzIElMb2cpLnJlcXVlc3Q7XG4vLyAgICAgICAgIGNvbnN0IG1vY2tQYXRocyA9IGdldE1vY2tQYXRoKHJlcXVlc3QudXJsLCByZXF1ZXN0Lm1ldGhvZCk7XG4vLyAgICAgICAgIGNvbnN0IHsgbW9jayB9ID0gZ2V0QWN0aXZlTW9ja1dpdGhQYXRoKG1vY2tQYXRocyk7XG4vLyAgICAgICAgIGlmIChtb2NrICYmIG1vY2suYWN0aXZlKSB7XG4vLyAgICAgICAgICAgICAocmVzcG9uc2UubWVzc2FnZSBhcyBJTG9nKS5tb2NrUmVzcG9uc2UgPSBtb2NrO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLnNlbmQocmVzcG9uc2UpO1xuLy8gICAgIH0pO1xuLy8gfTtcbi8vIGNvbnN0IGhvc3QgPSBsb2NhdGlvbi5ob3N0O1xuLy8gY29uc3QgaXNMb2NhbGhvc3QgPSBsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKFwiaHR0cDovL2xvY2FsaG9zdFwiKTtcbi8vIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbYG1va2t1LmV4dGVuc2lvbi5hY3RpdmUuJHtob3N0fWBdLCBmdW5jdGlvbiAocmVzdWx0KSB7XG4vLyAgICAgbGV0IGFjdGl2ZSA9IHJlc3VsdFtgbW9ra3UuZXh0ZW5zaW9uLmFjdGl2ZS4ke2hvc3R9YF07XG4vLyAgICAgaWYgKGlzTG9jYWxob3N0ICYmIGFjdGl2ZSA9PT0gdW5kZWZpbmVkKSB7XG4vLyAgICAgICAgIGFjdGl2ZSA9IHRydWU7XG4vLyAgICAgfVxuLy8gICAgIGlmIChhY3RpdmUpIHtcbi8vICAgICAgICAgLy8gaW5qZWN0cyBzY3JpcHQgdG8gcGFnZSdzIERPTVxuLy8gICAgICAgICBpbmplY3QoKTtcbi8vICAgICAgICAgaW5pdCgpO1xuLy8gICAgIH1cbi8vICAgICAvLyB0ZWxsIHRoZSBwYW5lbCBhYm91dCB0aGUgbmV3IGluamVjdGlvbiAoaG9zdCBtaWdodCBoYXZlIGNoYW5nZWQpXG4vLyAgICAgbWVzc2FnZVNlcnZpY2Uuc2VuZCh7XG4vLyAgICAgICAgIG1lc3NhZ2U6IGhvc3QsXG4vLyAgICAgICAgIHR5cGU6IFwiSU5JVFwiLFxuLy8gICAgICAgICBmcm9tOiBcIkNPTlRFTlRcIixcbi8vICAgICAgICAgdG86IFwiUEFORUxcIixcbi8vICAgICAgICAgZXh0ZW5zaW9uTmFtZTogXCJNT0tLVVwiLFxuLy8gICAgIH0pO1xuLy8gfSk7XG4oMCwgY29udGVudFNjcmlwdFYyXzEuY29udGVudFNjcmlwdFYyKSgpO1xuLy8gY29uc29sZS5sb2coXCJYWlwiKTtcbi8vIGluamVjdCgpO1xuLy8gbWVzc2FnZVNlcnZpY2UubGlzdGVuKFwiQ09OVEVOVFwiLCAoZGF0YTogSUV2ZW50TWVzc2FnZSkgPT4ge1xuLy8gICAgIGNvbnNvbGUubG9nKFwiY29udGVudDogXFxuXCIsIGRhdGEpO1xuLy8gICAgIGlmIChkYXRhLnR5cGUgPT09IFwiTE9HXCIpIHtcbi8vICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGRhdGEubWVzc2FnZSBhcyBJTG9nO1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlNlbmRpbmcgdG8gcGFuZWxcIik7XG4vLyAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLnNlbmQoe1xuLy8gICAgICAgICAgICAgbWVzc2FnZSxcbi8vICAgICAgICAgICAgIHR5cGU6IFwiTE9HXCIsXG4vLyAgICAgICAgICAgICBmcm9tOiBcIkNPTlRFTlRcIixcbi8vICAgICAgICAgICAgIHRvOiBcIlBBTkVMXCIsXG4vLyAgICAgICAgICAgICBleHRlbnNpb25OYW1lOiBcIk1PS0tVXCIsXG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlNlbmRpbmcgdG8gc2VydmljZSB3b3JrZXJcIik7XG4vLyAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLnNlbmQoe1xuLy8gICAgICAgICAgICAgbWVzc2FnZSxcbi8vICAgICAgICAgICAgIHR5cGU6IFwiTE9HXCIsXG4vLyAgICAgICAgICAgICBmcm9tOiBcIkNPTlRFTlRcIixcbi8vICAgICAgICAgICAgIHRvOiBcIlNFUlZJQ0VfV09SS0VSXCIsXG4vLyAgICAgICAgICAgICBleHRlbnNpb25OYW1lOiBcIk1PS0tVXCIsXG4vLyAgICAgICAgIH0pO1xuLy8gICAgIH1cbi8vIH0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9