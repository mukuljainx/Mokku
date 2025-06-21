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

/***/ "./src/inject.ts":
/*!***********************!*\
  !*** ./src/inject.ts ***!
  \***********************/
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
const xhook_1 = __importDefault(__webpack_require__(/*! xhook */ "./node_modules/xhook/es/main.js"));
const query_string_1 = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
const idFactory_1 = __importDefault(__webpack_require__(/*! ./services/idFactory */ "./src/services/idFactory.ts"));
const messageBus_1 = __importDefault(__webpack_require__(/*! ./services/message/messageBus */ "./src/services/message/messageBus.ts"));
const helper_1 = __webpack_require__(/*! ./services/helper */ "./src/services/helper.ts");
const service_1 = __webpack_require__(/*! ./panel/App/service */ "./src/panel/App/service/index.ts");
const messageBus = new messageBus_1.default();
const messageIdFactory = new idFactory_1.default();
const logIdFactory = new idFactory_1.default();
service_1.messageService.listen("HOOK", (data) => {
    messageBus.dispatch(data.id, data.message);
});
/**
 * Promisify post message from window to window
 * ackRequired, if false, no id will be assigned hence, no method will be added in message
 * message id was not the problem but function in message bus was
 * @returns A promise that resolves with the response message if ackRequired is true, otherwise undefined.
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
    service_1.messageService.send(messageObject);
    if (messageId !== null) {
        return new Promise((resolve) => {
            messageBus.addLister(messageId, resolve);
        });
    }
    return undefined;
};
// Helper to convert request body to a string representation
function getRequestBodyAsString(body) {
    if (body === null || body === undefined) {
        return undefined;
    }
    if (typeof ReadableStream !== "undefined" &&
        body instanceof ReadableStream) {
        return "Unsupported body type: ReadableStream";
    }
    try {
        // JSON.stringify is primarily for plain objects/arrays.
        if (typeof body === "object" &&
            !(body instanceof FormData) &&
            !(body instanceof Blob) &&
            !(body instanceof ArrayBuffer) &&
            !(body instanceof URLSearchParams)) {
            return JSON.stringify(body);
        }
        return String(body); // Fallback for primitives, FormData, etc.
    }
    catch (e) {
        console.error("Mokku Inject: Error stringifying request body", e);
        return "Unsupported body type: Error during stringification";
    }
}
// Helper to parse URL and extract query parameters
function parseUrlAndQuery(requestUrlInput) {
    let requestUrlStr = "";
    if (requestUrlInput instanceof URL) {
        requestUrlStr = requestUrlInput.href;
    }
    else if (typeof Request !== "undefined" &&
        requestUrlInput instanceof Request) {
        requestUrlStr = requestUrlInput.url;
    }
    else {
        requestUrlStr = requestUrlInput;
    }
    const separator = requestUrlStr.indexOf("?");
    const url = separator !== -1
        ? requestUrlStr.substring(0, separator)
        : requestUrlStr;
    const queryParams = separator !== -1
        ? JSON.stringify((0, query_string_1.parse)(requestUrlStr.substring(separator)))
        : undefined;
    return { url, queryParams };
}
const getLogObject = (request, response) => {
    var _a, _b;
    const { url, queryParams } = parseUrlAndQuery(request.url);
    const requestBody = getRequestBodyAsString(request.body);
    return {
        id: (_a = request.mokku) === null || _a === void 0 ? void 0 : _a.id,
        request: {
            url,
            body: requestBody,
            queryParams,
            method: (((_b = request.method) === null || _b === void 0 ? void 0 : _b.toUpperCase()) || "GET"),
            headers: (0, helper_1.getHeaders)(request.headers),
        },
        response,
    };
};
function processMockingRequest(request, callback) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const logEntry = getLogObject(request);
        // Send initial log (fire and forget)
        postMessage(logEntry, "LOG", false);
        try {
            const mockServiceResponsePromise = postMessage(logEntry, "CHECK_MOCK", true);
            if (!mockServiceResponsePromise) {
                // Should not happen if ackRequired is true
                callback();
                return;
            }
            const mockServiceResponse = (yield mockServiceResponsePromise);
            console.log("Hook: ", mockServiceResponse);
            if (mockServiceResponse && mockServiceResponse.mockResponse) {
                const mock = mockServiceResponse.mockResponse;
                const headers = mock.headers
                    ? mock.headers.reduce((final, header) => {
                        final[header.name] = header.value;
                        return final;
                    }, {})
                    : { "content-type": "application/json; charset=UTF-8" }; // Default headers
                const finalMockedResponse = {
                    status: mock.status,
                    text: (_a = mock.response) !== null && _a !== void 0 ? _a : "",
                    headers,
                };
                if (mock.delay && mock.delay > 0) {
                    setTimeout(() => {
                        callback(finalMockedResponse);
                    }, mock.delay);
                }
                else {
                    callback(finalMockedResponse);
                }
            }
            else {
                callback(); // No mock, proceed with original request
            }
        }
        catch (error) {
            console.error("Mokku Inject: Error during mock processing:", error);
            callback(); // Proceed with original request on error
        }
    });
}
xhook_1.default.before(function (request, callback) {
    // Ensure a unique ID is associated with the request object for logging/correlation.
    if (!request.mokku) {
        request.mokku = { id: logIdFactory.getId() };
    }
    processMockingRequest(request, callback);
});
function sendLogAfterRequest(request, originalResponse) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("sendLogAfterRequest", request, originalResponse);
        let responseText;
        const responseStatus = originalResponse.status || 0;
        const responseHeaders = originalResponse.headers || {};
        try {
            if (typeof originalResponse.clone === "function") {
                // Likely a Fetch API Response
                const clonedResponse = originalResponse.clone();
                responseText = yield clonedResponse.text();
            }
            else if (typeof originalResponse.text === "string") {
                // Direct text property
                responseText = originalResponse.text;
            }
            else if (originalResponse.data) {
                // Fallback to data property
                responseText =
                    typeof originalResponse.data === "string"
                        ? originalResponse.data
                        : JSON.stringify(originalResponse.data);
            }
            else {
                responseText = "Mokku: Unable to determine response body.";
            }
        }
        catch (error) {
            console.error("Mokku Inject: Error extracting response text in xhook.after:", error);
            responseText = "Mokku: Error processing response text.";
        }
        const logEntry = getLogObject(request, {
            status: responseStatus,
            response: responseText,
            headers: (0, helper_1.getHeaders)(responseHeaders),
        });
        postMessage(logEntry, "LOG", false);
    });
}
xhook_1.default.after(function (request, originalResponse) {
    // Ensure request.mokku.id is available (should be set in 'before' hook)
    if (!request.mokku) {
        // This case should ideally not be hit if 'before' always runs and sets it.
        request.mokku = { id: logIdFactory.getId() };
        console.warn("Mokku Inject: request.mokku.id was not set in xhook.before, new ID generated in xhook.after.");
    }
    sendLogAfterRequest(request, originalResponse);
});


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


/***/ }),

/***/ "./src/services/helper.ts":
/*!********************************!*\
  !*** ./src/services/helper.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
    if (typeof headers === "object") {
        return Object.keys(headers).map((name) => ({
            name,
            value: headers[name],
        }));
    }
    return [];
};
exports.getHeaders = getHeaders;


/***/ }),

/***/ "./src/services/idFactory.ts":
/*!***********************************!*\
  !*** ./src/services/idFactory.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class IdFactory {
    constructor() {
        this._id = 0;
    }
    getId() {
        // skip 0, as it can lead to falsy
        this._id++;
        return this._id;
    }
}
exports["default"] = IdFactory;


/***/ }),

/***/ "./src/services/message/messageBus.ts":
/*!********************************************!*\
  !*** ./src/services/message/messageBus.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class MessageBus {
    constructor() {
        this._collector = {};
        this._defaultListner = () => { };
        this._collector = {};
    }
    dispatch(id, eventData) {
        if (this._collector[id]) {
            this._collector[id](eventData);
            delete this._collector[id];
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
exports["default"] = MessageBus;


/***/ }),

/***/ "./node_modules/xhook/es/main.js":
/*!***************************************!*\
  !*** ./node_modules/xhook/es/main.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ xhook)
/* harmony export */ });
const slice = (o, n) => Array.prototype.slice.call(o, n);

let result = null;

//find global object
if (
  typeof WorkerGlobalScope !== "undefined" &&
  self instanceof WorkerGlobalScope
) {
  result = self;
} else if (typeof __webpack_require__.g !== "undefined") {
  result = __webpack_require__.g;
} else if (window) {
  result = window;
}

const windowRef = result;
const documentRef = result.document;

const UPLOAD_EVENTS = ["load", "loadend", "loadstart"];
const COMMON_EVENTS = ["progress", "abort", "error", "timeout"];

const depricatedProp = p =>
  ["returnValue", "totalSize", "position"].includes(p);

const mergeObjects = function (src, dst) {
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
const proxyEvents = function (events, src, dst) {
  const p = event =>
    function (e) {
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
const fakeEvent = function (type) {
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
const EventEmitter = function (nodeStyle) {
  //private
  let events = {};
  const listeners = event => events[event] || [];
  //public
  const emitter = {};
  emitter.addEventListener = function (event, callback, i) {
    events[event] = listeners(event);
    if (events[event].indexOf(callback) >= 0) {
      return;
    }
    i = i === undefined ? events[event].length : i;
    events[event].splice(i, 0, callback);
  };
  emitter.removeEventListener = function (event, callback) {
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
  emitter.dispatchEvent = function () {
    const args = slice(arguments);
    const event = args.shift();
    if (!nodeStyle) {
      args[0] = mergeObjects(args[0], fakeEvent(event));
      Object.defineProperty(args[0], "target", {
        writable: false,
        value: this,
      });
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
    emitter.once = function (e, fn) {
      var fire = function () {
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
const CRLF = "\r\n";

const objectToString = function (headersObj) {
  const entries = Object.entries(headersObj);

  const headers = entries.map(([name, value]) => {
    return `${name.toLowerCase()}: ${value}`;
  });

  return headers.join(CRLF);
};

const stringToObject = function (headersString, dest) {
  const headers = headersString.split(CRLF);
  if (dest == null) {
    dest = {};
  }

  for (let header of headers) {
    if (/([^:]+):\s*(.+)/.test(header)) {
      const name = RegExp.$1 != null ? RegExp.$1.toLowerCase() : undefined;
      const value = RegExp.$2;
      if (dest[name] == null) {
        dest[name] = value;
      }
    }
  }

  return dest;
};

const convert = function (headers, dest) {
  switch (typeof headers) {
    case "object": {
      return objectToString(headers);
    }
    case "string": {
      return stringToObject(headers, dest);
    }
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
const Xhook$1 = function () {
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
  const readHead = function () {
    // Accessing attributes on an aborted xhr object will
    // throw an 'c00c023f error' in IE9 and lower, don't touch it.
    response.status = status || xhr.status;
    if (status !== ABORTED) {
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

  const readBody = function () {
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
  const writeHead = function () {
    facade.status = response.status;
    facade.statusText = response.statusText;
  };

  const writeBody = function () {
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

  const emitFinal = function () {
    if (!hasError) {
      facade.dispatchEvent("load", {});
    }
    facade.dispatchEvent("loadend", {});
    if (hasError) {
      facade.readyState = 0;
    }
  };

  //ensure ready state 0 through 4 is handled
  const emitReadyState = function (n) {
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
  const setReadyState = function (n) {
    //emit events until readyState reaches 4
    if (n !== 4) {
      emitReadyState(n);
      return;
    }
    //before emitting 4, run all 'after' hooks in sequence
    const afterHooks = hooks.listeners("after");
    var process = function () {
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
  xhr.onreadystatechange = function (event) {
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
  const hasErrorHandler = function () {
    hasError = true;
  };
  facade.addEventListener("error", hasErrorHandler);
  facade.addEventListener("timeout", hasErrorHandler);
  facade.addEventListener("abort", hasErrorHandler);
  // progress means we're current downloading...
  facade.addEventListener("progress", function (event) {
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

  facade.open = function (method, url, async, user, pass) {
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

  facade.send = function (body) {
    //read xhr settings before hooking
    let k, modk;
    for (k of ["type", "timeout", "withCredentials"]) {
      modk = k === "type" ? "responseType" : k;
      if (modk in facade) {
        request[k] = facade[modk];
      }
    }

    request.body = body;
    const send = function () {
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
    var process = function () {
      if (!beforeHooks.length) {
        return send();
      }
      //go to next hook OR optionally provide response
      const done = function (userResponse) {
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
      done.head = function (userResponse) {
        mergeObjects(userResponse, response);
        setReadyState(2);
      };
      //specifically provide partial text (responseText  readyState 3)
      done.progress = function (userResponse) {
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

  facade.abort = function () {
    status = ABORTED;
    if (transiting) {
      xhr.abort(); //this will emit an 'abort' for us
    } else {
      facade.dispatchEvent("abort", {});
    }
  };

  facade.setRequestHeader = function (header, value) {
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
    facade.overrideMimeType = function () {
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
  Xhook: Xhook$1,
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

//browser's fetch
const Native = windowRef.fetch;
function copyToObjFromRequest(req) {
    const copyedKeys = [
        "method",
        "headers",
        "body",
        "mode",
        "credentials",
        "cache",
        "redirect",
        "referrer",
        "referrerPolicy",
        "integrity",
        "keepalive",
        "signal",
        "url",
    ];
    let copyedObj = {};
    copyedKeys.forEach(key => (copyedObj[key] = req[key]));
    return copyedObj;
}
function covertHeaderToPlainObj(headers) {
    if (headers instanceof Headers) {
        return covertTDAarryToObj([...headers.entries()]);
    }
    if (Array.isArray(headers)) {
        return covertTDAarryToObj(headers);
    }
    return headers;
}
function covertTDAarryToObj(input) {
    return input.reduce((prev, [key, value]) => {
        prev[key] = value;
        return prev;
    }, {});
}
/**
 * if fetch(hacked by Xhook) accept a Request as a first parameter, it will be destrcuted to a plain object.
 * Finally the whole network request was convert to fectch(Request.url, other options)
 */
const Xhook = function (input, init = { headers: {} }) {
    let options = Object.assign(Object.assign({}, init), { isFetch: true });
    if (input instanceof Request) {
        const requestObj = copyToObjFromRequest(input);
        const prevHeaders = Object.assign(Object.assign({}, covertHeaderToPlainObj(requestObj.headers)), covertHeaderToPlainObj(options.headers));
        options = Object.assign(Object.assign(Object.assign({}, requestObj), init), { headers: prevHeaders, acceptedRequest: true });
    }
    else {
        options.url = input;
    }
    const beforeHooks = hooks.listeners("before");
    const afterHooks = hooks.listeners("after");
    return new Promise(function (resolve, reject) {
        let fullfiled = resolve;
        const processAfter = function (response) {
            if (!afterHooks.length) {
                return fullfiled(response);
            }
            const hook = afterHooks.shift();
            if (hook.length === 2) {
                hook(options, response);
                return processAfter(response);
            }
            else if (hook.length === 3) {
                return hook(options, response, processAfter);
            }
            else {
                return processAfter(response);
            }
        };
        const done = function (userResponse) {
            if (userResponse !== undefined) {
                const response = new Response(userResponse.body || userResponse.text, userResponse);
                resolve(response);
                processAfter(response);
                return;
            }
            //continue processing until no hooks left
            processBefore();
        };
        const processBefore = function () {
            if (!beforeHooks.length) {
                send();
                return;
            }
            const hook = beforeHooks.shift();
            if (hook.length === 1) {
                return done(hook(options));
            }
            else if (hook.length === 2) {
                return hook(options, done);
            }
        };
        const send = () => __awaiter(this, void 0, void 0, function* () {
            const { url, isFetch, acceptedRequest } = options, restInit = __rest(options, ["url", "isFetch", "acceptedRequest"]);
            if (input instanceof Request && restInit.body instanceof ReadableStream) {
                restInit.body = yield new Response(restInit.body).text();
            }
            return Native(url, restInit)
                .then(response => processAfter(response))
                .catch(function (err) {
                fullfiled = reject;
                processAfter(err);
                return reject(err);
            });
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
    Xhook,
};

//the global hooks event emitter is also the global xhook object
//(not the best decision in hindsight)
const xhook = hooks;
xhook.EventEmitter = EventEmitter;
//modify hooks
xhook.before = function (handler, i) {
  if (handler.length < 1 || handler.length > 2) {
    throw "invalid hook";
  }
  return xhook.on("before", handler, i);
};
xhook.after = function (handler, i) {
  if (handler.length < 2 || handler.length > 3) {
    throw "invalid hook";
  }
  return xhook.on("after", handler, i);
};

//globally enable/disable
xhook.enable = function () {
  XMLHttpRequest.patch();
  fetch.patch();
};
xhook.disable = function () {
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/inject.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLHVCQUF1QixFQUFFO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGtCQUFrQixtQkFBbUI7QUFDckM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLGlCQUFpQixvQkFBb0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0ZhO0FBQ2Isd0JBQXdCLG1CQUFPLENBQUMsb0VBQW1CO0FBQ25ELHdCQUF3QixtQkFBTyxDQUFDLDBFQUFzQjtBQUN0RCxxQkFBcUIsbUJBQU8sQ0FBQyw4REFBZ0I7O0FBRTdDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0EsRUFBRTtBQUNGOztBQUVBLGVB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLGlEQUFpRCxHQUFHO0FBQ3BEO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLE1BQU07QUFDTixz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O1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Nb2trdS8uL25vZGVfbW9kdWxlcy9kZWNvZGUtdXJpLWNvbXBvbmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly9Nb2trdS8uL25vZGVfbW9kdWxlcy9xdWVyeS1zdHJpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9ub2RlX21vZHVsZXMvc3BsaXQtb24tZmlyc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9ub2RlX21vZHVsZXMvc3RyaWN0LXVyaS1lbmNvZGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9zcmMvaW5qZWN0LnRzIiwid2VicGFjazovL01va2t1Ly4vc3JjL3BhbmVsL0FwcC9zZXJ2aWNlL2luZGV4LnRzIiwid2VicGFjazovL01va2t1Ly4vc3JjL3BhbmVsL0FwcC9zZXJ2aWNlL21lc3NhZ2VTZXJ2aWNlLnRzIiwid2VicGFjazovL01va2t1Ly4vc3JjL3NlcnZpY2VzL2hlbHBlci50cyIsIndlYnBhY2s6Ly9Nb2trdS8uL3NyYy9zZXJ2aWNlcy9pZEZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9zcmMvc2VydmljZXMvbWVzc2FnZS9tZXNzYWdlQnVzLnRzIiwid2VicGFjazovL01va2t1Ly4vbm9kZV9tb2R1bGVzL3hob29rL2VzL21haW4uanMiLCJ3ZWJwYWNrOi8vTW9ra3Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vTW9ra3Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL01va2t1L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vTW9ra3Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Nb2trdS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL01va2t1L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vTW9ra3Uvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL01va2t1L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG52YXIgdG9rZW4gPSAnJVthLWYwLTldezJ9JztcbnZhciBzaW5nbGVNYXRjaGVyID0gbmV3IFJlZ0V4cCh0b2tlbiwgJ2dpJyk7XG52YXIgbXVsdGlNYXRjaGVyID0gbmV3IFJlZ0V4cCgnKCcgKyB0b2tlbiArICcpKycsICdnaScpO1xuXG5mdW5jdGlvbiBkZWNvZGVDb21wb25lbnRzKGNvbXBvbmVudHMsIHNwbGl0KSB7XG5cdHRyeSB7XG5cdFx0Ly8gVHJ5IHRvIGRlY29kZSB0aGUgZW50aXJlIHN0cmluZyBmaXJzdFxuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoY29tcG9uZW50cy5qb2luKCcnKSk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIERvIG5vdGhpbmdcblx0fVxuXG5cdGlmIChjb21wb25lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdHJldHVybiBjb21wb25lbnRzO1xuXHR9XG5cblx0c3BsaXQgPSBzcGxpdCB8fCAxO1xuXG5cdC8vIFNwbGl0IHRoZSBhcnJheSBpbiAyIHBhcnRzXG5cdHZhciBsZWZ0ID0gY29tcG9uZW50cy5zbGljZSgwLCBzcGxpdCk7XG5cdHZhciByaWdodCA9IGNvbXBvbmVudHMuc2xpY2Uoc3BsaXQpO1xuXG5cdHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmNhbGwoW10sIGRlY29kZUNvbXBvbmVudHMobGVmdCksIGRlY29kZUNvbXBvbmVudHMocmlnaHQpKTtcbn1cblxuZnVuY3Rpb24gZGVjb2RlKGlucHV0KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChpbnB1dCk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdHZhciB0b2tlbnMgPSBpbnB1dC5tYXRjaChzaW5nbGVNYXRjaGVyKTtcblxuXHRcdGZvciAodmFyIGkgPSAxOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpbnB1dCA9IGRlY29kZUNvbXBvbmVudHModG9rZW5zLCBpKS5qb2luKCcnKTtcblxuXHRcdFx0dG9rZW5zID0gaW5wdXQubWF0Y2goc2luZ2xlTWF0Y2hlcik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGlucHV0O1xuXHR9XG59XG5cbmZ1bmN0aW9uIGN1c3RvbURlY29kZVVSSUNvbXBvbmVudChpbnB1dCkge1xuXHQvLyBLZWVwIHRyYWNrIG9mIGFsbCB0aGUgcmVwbGFjZW1lbnRzIGFuZCBwcmVmaWxsIHRoZSBtYXAgd2l0aCB0aGUgYEJPTWBcblx0dmFyIHJlcGxhY2VNYXAgPSB7XG5cdFx0JyVGRSVGRic6ICdcXHVGRkZEXFx1RkZGRCcsXG5cdFx0JyVGRiVGRSc6ICdcXHVGRkZEXFx1RkZGRCdcblx0fTtcblxuXHR2YXIgbWF0Y2ggPSBtdWx0aU1hdGNoZXIuZXhlYyhpbnB1dCk7XG5cdHdoaWxlIChtYXRjaCkge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBEZWNvZGUgYXMgYmlnIGNodW5rcyBhcyBwb3NzaWJsZVxuXHRcdFx0cmVwbGFjZU1hcFttYXRjaFswXV0gPSBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMF0pO1xuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlY29kZShtYXRjaFswXSk7XG5cblx0XHRcdGlmIChyZXN1bHQgIT09IG1hdGNoWzBdKSB7XG5cdFx0XHRcdHJlcGxhY2VNYXBbbWF0Y2hbMF1dID0gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdG1hdGNoID0gbXVsdGlNYXRjaGVyLmV4ZWMoaW5wdXQpO1xuXHR9XG5cblx0Ly8gQWRkIGAlQzJgIGF0IHRoZSBlbmQgb2YgdGhlIG1hcCB0byBtYWtlIHN1cmUgaXQgZG9lcyBub3QgcmVwbGFjZSB0aGUgY29tYmluYXRvciBiZWZvcmUgZXZlcnl0aGluZyBlbHNlXG5cdHJlcGxhY2VNYXBbJyVDMiddID0gJ1xcdUZGRkQnO1xuXG5cdHZhciBlbnRyaWVzID0gT2JqZWN0LmtleXMocmVwbGFjZU1hcCk7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Ly8gUmVwbGFjZSBhbGwgZGVjb2RlZCBjb21wb25lbnRzXG5cdFx0dmFyIGtleSA9IGVudHJpZXNbaV07XG5cdFx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoa2V5LCAnZycpLCByZXBsYWNlTWFwW2tleV0pO1xuXHR9XG5cblx0cmV0dXJuIGlucHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbmNvZGVkVVJJKSB7XG5cdGlmICh0eXBlb2YgZW5jb2RlZFVSSSAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBgZW5jb2RlZFVSSWAgdG8gYmUgb2YgdHlwZSBgc3RyaW5nYCwgZ290IGAnICsgdHlwZW9mIGVuY29kZWRVUkkgKyAnYCcpO1xuXHR9XG5cblx0dHJ5IHtcblx0XHRlbmNvZGVkVVJJID0gZW5jb2RlZFVSSS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcblxuXHRcdC8vIFRyeSB0aGUgYnVpbHQgaW4gZGVjb2RlciBmaXJzdFxuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZW5jb2RlZFVSSSk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIEZhbGxiYWNrIHRvIGEgbW9yZSBhZHZhbmNlZCBkZWNvZGVyXG5cdFx0cmV0dXJuIGN1c3RvbURlY29kZVVSSUNvbXBvbmVudChlbmNvZGVkVVJJKTtcblx0fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IHN0cmljdFVyaUVuY29kZSA9IHJlcXVpcmUoJ3N0cmljdC11cmktZW5jb2RlJyk7XG5jb25zdCBkZWNvZGVDb21wb25lbnQgPSByZXF1aXJlKCdkZWNvZGUtdXJpLWNvbXBvbmVudCcpO1xuY29uc3Qgc3BsaXRPbkZpcnN0ID0gcmVxdWlyZSgnc3BsaXQtb24tZmlyc3QnKTtcblxuY29uc3QgaXNOdWxsT3JVbmRlZmluZWQgPSB2YWx1ZSA9PiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBlbmNvZGVyRm9yQXJyYXlGb3JtYXQob3B0aW9ucykge1xuXHRzd2l0Y2ggKG9wdGlvbnMuYXJyYXlGb3JtYXQpIHtcblx0XHRjYXNlICdpbmRleCc6XG5cdFx0XHRyZXR1cm4ga2V5ID0+IChyZXN1bHQsIHZhbHVlKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gcmVzdWx0Lmxlbmd0aDtcblxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0dmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBOdWxsICYmIHZhbHVlID09PSBudWxsKSB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBFbXB0eVN0cmluZyAmJiB2YWx1ZSA9PT0gJycpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCAnWycsIGluZGV4LCAnXSddLmpvaW4oJycpXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFx0Li4ucmVzdWx0LFxuXHRcdFx0XHRcdFtlbmNvZGUoa2V5LCBvcHRpb25zKSwgJ1snLCBlbmNvZGUoaW5kZXgsIG9wdGlvbnMpLCAnXT0nLCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKCcnKVxuXHRcdFx0XHRdO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2JyYWNrZXQnOlxuXHRcdFx0cmV0dXJuIGtleSA9PiAocmVzdWx0LCB2YWx1ZSkgPT4ge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0dmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBOdWxsICYmIHZhbHVlID09PSBudWxsKSB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBFbXB0eVN0cmluZyAmJiB2YWx1ZSA9PT0gJycpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCAnW10nXS5qb2luKCcnKV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCAnW109JywgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbignJyldO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2NvbW1hJzpcblx0XHRjYXNlICdzZXBhcmF0b3InOlxuXHRcdFx0cmV0dXJuIGtleSA9PiAocmVzdWx0LCB2YWx1ZSkgPT4ge1xuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gW1tlbmNvZGUoa2V5LCBvcHRpb25zKSwgJz0nLCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKCcnKV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gW1tyZXN1bHQsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4ob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcildO1xuXHRcdFx0fTtcblxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4ga2V5ID0+IChyZXN1bHQsIHZhbHVlKSA9PiB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcE51bGwgJiYgdmFsdWUgPT09IG51bGwpIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcEVtcHR5U3RyaW5nICYmIHZhbHVlID09PSAnJylcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBlbmNvZGUoa2V5LCBvcHRpb25zKV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCAnPScsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4oJycpXTtcblx0XHRcdH07XG5cdH1cbn1cblxuZnVuY3Rpb24gcGFyc2VyRm9yQXJyYXlGb3JtYXQob3B0aW9ucykge1xuXHRsZXQgcmVzdWx0O1xuXG5cdHN3aXRjaCAob3B0aW9ucy5hcnJheUZvcm1hdCkge1xuXHRcdGNhc2UgJ2luZGV4Jzpcblx0XHRcdHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcblx0XHRcdFx0cmVzdWx0ID0gL1xcWyhcXGQqKVxcXSQvLmV4ZWMoa2V5KTtcblxuXHRcdFx0XHRrZXkgPSBrZXkucmVwbGFjZSgvXFxbXFxkKlxcXSQvLCAnJyk7XG5cblx0XHRcdFx0aWYgKCFyZXN1bHQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB7fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV1bcmVzdWx0WzFdXSA9IHZhbHVlO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2JyYWNrZXQnOlxuXHRcdFx0cmV0dXJuIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikgPT4ge1xuXHRcdFx0XHRyZXN1bHQgPSAvKFxcW1xcXSkkLy5leGVjKGtleSk7XG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC9cXFtcXF0kLywgJycpO1xuXG5cdFx0XHRcdGlmICghcmVzdWx0KSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChhY2N1bXVsYXRvcltrZXldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gW3ZhbHVlXTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gW10uY29uY2F0KGFjY3VtdWxhdG9yW2tleV0sIHZhbHVlKTtcblx0XHRcdH07XG5cblx0XHRjYXNlICdjb21tYSc6XG5cdFx0Y2FzZSAnc2VwYXJhdG9yJzpcblx0XHRcdHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcblx0XHRcdFx0Y29uc3QgaXNBcnJheSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUuc3BsaXQoJycpLmluZGV4T2Yob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcikgPiAtMTtcblx0XHRcdFx0Y29uc3QgbmV3VmFsdWUgPSBpc0FycmF5ID8gdmFsdWUuc3BsaXQob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcikubWFwKGl0ZW0gPT4gZGVjb2RlKGl0ZW0sIG9wdGlvbnMpKSA6IHZhbHVlID09PSBudWxsID8gdmFsdWUgOiBkZWNvZGUodmFsdWUsIG9wdGlvbnMpO1xuXHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gbmV3VmFsdWU7XG5cdFx0XHR9O1xuXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcblx0XHRcdFx0aWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gW10uY29uY2F0KGFjY3VtdWxhdG9yW2tleV0sIHZhbHVlKTtcblx0XHRcdH07XG5cdH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVBcnJheUZvcm1hdFNlcGFyYXRvcih2YWx1ZSkge1xuXHRpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyB8fCB2YWx1ZS5sZW5ndGggIT09IDEpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdhcnJheUZvcm1hdFNlcGFyYXRvciBtdXN0IGJlIHNpbmdsZSBjaGFyYWN0ZXIgc3RyaW5nJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gZW5jb2RlKHZhbHVlLCBvcHRpb25zKSB7XG5cdGlmIChvcHRpb25zLmVuY29kZSkge1xuXHRcdHJldHVybiBvcHRpb25zLnN0cmljdCA/IHN0cmljdFVyaUVuY29kZSh2YWx1ZSkgOiBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBkZWNvZGUodmFsdWUsIG9wdGlvbnMpIHtcblx0aWYgKG9wdGlvbnMuZGVjb2RlKSB7XG5cdFx0cmV0dXJuIGRlY29kZUNvbXBvbmVudCh2YWx1ZSk7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGtleXNTb3J0ZXIoaW5wdXQpIHtcblx0aWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG5cdFx0cmV0dXJuIGlucHV0LnNvcnQoKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIGtleXNTb3J0ZXIoT2JqZWN0LmtleXMoaW5wdXQpKVxuXHRcdFx0LnNvcnQoKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKSlcblx0XHRcdC5tYXAoa2V5ID0+IGlucHV0W2tleV0pO1xuXHR9XG5cblx0cmV0dXJuIGlucHV0O1xufVxuXG5mdW5jdGlvbiByZW1vdmVIYXNoKGlucHV0KSB7XG5cdGNvbnN0IGhhc2hTdGFydCA9IGlucHV0LmluZGV4T2YoJyMnKTtcblx0aWYgKGhhc2hTdGFydCAhPT0gLTEpIHtcblx0XHRpbnB1dCA9IGlucHV0LnNsaWNlKDAsIGhhc2hTdGFydCk7XG5cdH1cblxuXHRyZXR1cm4gaW5wdXQ7XG59XG5cbmZ1bmN0aW9uIGdldEhhc2godXJsKSB7XG5cdGxldCBoYXNoID0gJyc7XG5cdGNvbnN0IGhhc2hTdGFydCA9IHVybC5pbmRleE9mKCcjJyk7XG5cdGlmIChoYXNoU3RhcnQgIT09IC0xKSB7XG5cdFx0aGFzaCA9IHVybC5zbGljZShoYXNoU3RhcnQpO1xuXHR9XG5cblx0cmV0dXJuIGhhc2g7XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3QoaW5wdXQpIHtcblx0aW5wdXQgPSByZW1vdmVIYXNoKGlucHV0KTtcblx0Y29uc3QgcXVlcnlTdGFydCA9IGlucHV0LmluZGV4T2YoJz8nKTtcblx0aWYgKHF1ZXJ5U3RhcnQgPT09IC0xKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0cmV0dXJuIGlucHV0LnNsaWNlKHF1ZXJ5U3RhcnQgKyAxKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VWYWx1ZSh2YWx1ZSwgb3B0aW9ucykge1xuXHRpZiAob3B0aW9ucy5wYXJzZU51bWJlcnMgJiYgIU51bWJlci5pc05hTihOdW1iZXIodmFsdWUpKSAmJiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS50cmltKCkgIT09ICcnKSkge1xuXHRcdHZhbHVlID0gTnVtYmVyKHZhbHVlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLnBhcnNlQm9vbGVhbnMgJiYgdmFsdWUgIT09IG51bGwgJiYgKHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJyB8fCB2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSAnZmFsc2UnKSkge1xuXHRcdHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBwYXJzZShpbnB1dCwgb3B0aW9ucykge1xuXHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0ZGVjb2RlOiB0cnVlLFxuXHRcdHNvcnQ6IHRydWUsXG5cdFx0YXJyYXlGb3JtYXQ6ICdub25lJyxcblx0XHRhcnJheUZvcm1hdFNlcGFyYXRvcjogJywnLFxuXHRcdHBhcnNlTnVtYmVyczogZmFsc2UsXG5cdFx0cGFyc2VCb29sZWFuczogZmFsc2Vcblx0fSwgb3B0aW9ucyk7XG5cblx0dmFsaWRhdGVBcnJheUZvcm1hdFNlcGFyYXRvcihvcHRpb25zLmFycmF5Rm9ybWF0U2VwYXJhdG9yKTtcblxuXHRjb25zdCBmb3JtYXR0ZXIgPSBwYXJzZXJGb3JBcnJheUZvcm1hdChvcHRpb25zKTtcblxuXHQvLyBDcmVhdGUgYW4gb2JqZWN0IHdpdGggbm8gcHJvdG90eXBlXG5cdGNvbnN0IHJldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cblx0aWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0aW5wdXQgPSBpbnB1dC50cmltKCkucmVwbGFjZSgvXls/IyZdLywgJycpO1xuXG5cdGlmICghaW5wdXQpIHtcblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0Zm9yIChjb25zdCBwYXJhbSBvZiBpbnB1dC5zcGxpdCgnJicpKSB7XG5cdFx0bGV0IFtrZXksIHZhbHVlXSA9IHNwbGl0T25GaXJzdChvcHRpb25zLmRlY29kZSA/IHBhcmFtLnJlcGxhY2UoL1xcKy9nLCAnICcpIDogcGFyYW0sICc9Jyk7XG5cblx0XHQvLyBNaXNzaW5nIGA9YCBzaG91bGQgYmUgYG51bGxgOlxuXHRcdC8vIGh0dHA6Ly93My5vcmcvVFIvMjAxMi9XRC11cmwtMjAxMjA1MjQvI2NvbGxlY3QtdXJsLXBhcmFtZXRlcnNcblx0XHR2YWx1ZSA9IHZhbHVlID09PSB1bmRlZmluZWQgPyBudWxsIDogWydjb21tYScsICdzZXBhcmF0b3InXS5pbmNsdWRlcyhvcHRpb25zLmFycmF5Rm9ybWF0KSA/IHZhbHVlIDogZGVjb2RlKHZhbHVlLCBvcHRpb25zKTtcblx0XHRmb3JtYXR0ZXIoZGVjb2RlKGtleSwgb3B0aW9ucyksIHZhbHVlLCByZXQpO1xuXHR9XG5cblx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocmV0KSkge1xuXHRcdGNvbnN0IHZhbHVlID0gcmV0W2tleV07XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGwpIHtcblx0XHRcdGZvciAoY29uc3QgayBvZiBPYmplY3Qua2V5cyh2YWx1ZSkpIHtcblx0XHRcdFx0dmFsdWVba10gPSBwYXJzZVZhbHVlKHZhbHVlW2tdLCBvcHRpb25zKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0W2tleV0gPSBwYXJzZVZhbHVlKHZhbHVlLCBvcHRpb25zKTtcblx0XHR9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zb3J0ID09PSBmYWxzZSkge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRyZXR1cm4gKG9wdGlvbnMuc29ydCA9PT0gdHJ1ZSA/IE9iamVjdC5rZXlzKHJldCkuc29ydCgpIDogT2JqZWN0LmtleXMocmV0KS5zb3J0KG9wdGlvbnMuc29ydCkpLnJlZHVjZSgocmVzdWx0LCBrZXkpID0+IHtcblx0XHRjb25zdCB2YWx1ZSA9IHJldFtrZXldO1xuXHRcdGlmIChCb29sZWFuKHZhbHVlKSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0Ly8gU29ydCBvYmplY3Qga2V5cywgbm90IHZhbHVlc1xuXHRcdFx0cmVzdWx0W2tleV0gPSBrZXlzU29ydGVyKHZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0W2tleV0gPSB2YWx1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LCBPYmplY3QuY3JlYXRlKG51bGwpKTtcbn1cblxuZXhwb3J0cy5leHRyYWN0ID0gZXh0cmFjdDtcbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcblxuZXhwb3J0cy5zdHJpbmdpZnkgPSAob2JqZWN0LCBvcHRpb25zKSA9PiB7XG5cdGlmICghb2JqZWN0KSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdGVuY29kZTogdHJ1ZSxcblx0XHRzdHJpY3Q6IHRydWUsXG5cdFx0YXJyYXlGb3JtYXQ6ICdub25lJyxcblx0XHRhcnJheUZvcm1hdFNlcGFyYXRvcjogJywnXG5cdH0sIG9wdGlvbnMpO1xuXG5cdHZhbGlkYXRlQXJyYXlGb3JtYXRTZXBhcmF0b3Iob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcik7XG5cblx0Y29uc3Qgc2hvdWxkRmlsdGVyID0ga2V5ID0+IChcblx0XHQob3B0aW9ucy5za2lwTnVsbCAmJiBpc051bGxPclVuZGVmaW5lZChvYmplY3Rba2V5XSkpIHx8XG5cdFx0KG9wdGlvbnMuc2tpcEVtcHR5U3RyaW5nICYmIG9iamVjdFtrZXldID09PSAnJylcblx0KTtcblxuXHRjb25zdCBmb3JtYXR0ZXIgPSBlbmNvZGVyRm9yQXJyYXlGb3JtYXQob3B0aW9ucyk7XG5cblx0Y29uc3Qgb2JqZWN0Q29weSA9IHt9O1xuXG5cdGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iamVjdCkpIHtcblx0XHRpZiAoIXNob3VsZEZpbHRlcihrZXkpKSB7XG5cdFx0XHRvYmplY3RDb3B5W2tleV0gPSBvYmplY3Rba2V5XTtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0Q29weSk7XG5cblx0aWYgKG9wdGlvbnMuc29ydCAhPT0gZmFsc2UpIHtcblx0XHRrZXlzLnNvcnQob3B0aW9ucy5zb3J0KTtcblx0fVxuXG5cdHJldHVybiBrZXlzLm1hcChrZXkgPT4ge1xuXHRcdGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV07XG5cblx0XHRpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGVuY29kZShrZXksIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0XHRcdC5yZWR1Y2UoZm9ybWF0dGVyKGtleSksIFtdKVxuXHRcdFx0XHQuam9pbignJicpO1xuXHRcdH1cblxuXHRcdHJldHVybiBlbmNvZGUoa2V5LCBvcHRpb25zKSArICc9JyArIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyk7XG5cdH0pLmZpbHRlcih4ID0+IHgubGVuZ3RoID4gMCkuam9pbignJicpO1xufTtcblxuZXhwb3J0cy5wYXJzZVVybCA9IChpbnB1dCwgb3B0aW9ucykgPT4ge1xuXHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0ZGVjb2RlOiB0cnVlXG5cdH0sIG9wdGlvbnMpO1xuXG5cdGNvbnN0IFt1cmwsIGhhc2hdID0gc3BsaXRPbkZpcnN0KGlucHV0LCAnIycpO1xuXG5cdHJldHVybiBPYmplY3QuYXNzaWduKFxuXHRcdHtcblx0XHRcdHVybDogdXJsLnNwbGl0KCc/JylbMF0gfHwgJycsXG5cdFx0XHRxdWVyeTogcGFyc2UoZXh0cmFjdChpbnB1dCksIG9wdGlvbnMpXG5cdFx0fSxcblx0XHRvcHRpb25zICYmIG9wdGlvbnMucGFyc2VGcmFnbWVudElkZW50aWZpZXIgJiYgaGFzaCA/IHtmcmFnbWVudElkZW50aWZpZXI6IGRlY29kZShoYXNoLCBvcHRpb25zKX0gOiB7fVxuXHQpO1xufTtcblxuZXhwb3J0cy5zdHJpbmdpZnlVcmwgPSAoaW5wdXQsIG9wdGlvbnMpID0+IHtcblx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdGVuY29kZTogdHJ1ZSxcblx0XHRzdHJpY3Q6IHRydWVcblx0fSwgb3B0aW9ucyk7XG5cblx0Y29uc3QgdXJsID0gcmVtb3ZlSGFzaChpbnB1dC51cmwpLnNwbGl0KCc/JylbMF0gfHwgJyc7XG5cdGNvbnN0IHF1ZXJ5RnJvbVVybCA9IGV4cG9ydHMuZXh0cmFjdChpbnB1dC51cmwpO1xuXHRjb25zdCBwYXJzZWRRdWVyeUZyb21VcmwgPSBleHBvcnRzLnBhcnNlKHF1ZXJ5RnJvbVVybCwge3NvcnQ6IGZhbHNlfSk7XG5cblx0Y29uc3QgcXVlcnkgPSBPYmplY3QuYXNzaWduKHBhcnNlZFF1ZXJ5RnJvbVVybCwgaW5wdXQucXVlcnkpO1xuXHRsZXQgcXVlcnlTdHJpbmcgPSBleHBvcnRzLnN0cmluZ2lmeShxdWVyeSwgb3B0aW9ucyk7XG5cdGlmIChxdWVyeVN0cmluZykge1xuXHRcdHF1ZXJ5U3RyaW5nID0gYD8ke3F1ZXJ5U3RyaW5nfWA7XG5cdH1cblxuXHRsZXQgaGFzaCA9IGdldEhhc2goaW5wdXQudXJsKTtcblx0aWYgKGlucHV0LmZyYWdtZW50SWRlbnRpZmllcikge1xuXHRcdGhhc2ggPSBgIyR7ZW5jb2RlKGlucHV0LmZyYWdtZW50SWRlbnRpZmllciwgb3B0aW9ucyl9YDtcblx0fVxuXG5cdHJldHVybiBgJHt1cmx9JHtxdWVyeVN0cmluZ30ke2hhc2h9YDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gKHN0cmluZywgc2VwYXJhdG9yKSA9PiB7XG5cdGlmICghKHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBzZXBhcmF0b3IgPT09ICdzdHJpbmcnKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBhcmd1bWVudHMgdG8gYmUgb2YgdHlwZSBgc3RyaW5nYCcpO1xuXHR9XG5cblx0aWYgKHNlcGFyYXRvciA9PT0gJycpIHtcblx0XHRyZXR1cm4gW3N0cmluZ107XG5cdH1cblxuXHRjb25zdCBzZXBhcmF0b3JJbmRleCA9IHN0cmluZy5pbmRleE9mKHNlcGFyYXRvcik7XG5cblx0aWYgKHNlcGFyYXRvckluZGV4ID09PSAtMSkge1xuXHRcdHJldHVybiBbc3RyaW5nXTtcblx0fVxuXG5cdHJldHVybiBbXG5cdFx0c3RyaW5nLnNsaWNlKDAsIHNlcGFyYXRvckluZGV4KSxcblx0XHRzdHJpbmcuc2xpY2Uoc2VwYXJhdG9ySW5kZXggKyBzZXBhcmF0b3IubGVuZ3RoKVxuXHRdO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gc3RyID0+IGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpKl0vZywgeCA9PiBgJSR7eC5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpfWApO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHhob29rXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInhob29rXCIpKTtcbmNvbnN0IHF1ZXJ5X3N0cmluZ18xID0gcmVxdWlyZShcInF1ZXJ5LXN0cmluZ1wiKTtcbmNvbnN0IGlkRmFjdG9yeV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3NlcnZpY2VzL2lkRmFjdG9yeVwiKSk7XG5jb25zdCBtZXNzYWdlQnVzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc2VydmljZXMvbWVzc2FnZS9tZXNzYWdlQnVzXCIpKTtcbmNvbnN0IGhlbHBlcl8xID0gcmVxdWlyZShcIi4vc2VydmljZXMvaGVscGVyXCIpO1xuY29uc3Qgc2VydmljZV8xID0gcmVxdWlyZShcIi4vcGFuZWwvQXBwL3NlcnZpY2VcIik7XG5jb25zdCBtZXNzYWdlQnVzID0gbmV3IG1lc3NhZ2VCdXNfMS5kZWZhdWx0KCk7XG5jb25zdCBtZXNzYWdlSWRGYWN0b3J5ID0gbmV3IGlkRmFjdG9yeV8xLmRlZmF1bHQoKTtcbmNvbnN0IGxvZ0lkRmFjdG9yeSA9IG5ldyBpZEZhY3RvcnlfMS5kZWZhdWx0KCk7XG5zZXJ2aWNlXzEubWVzc2FnZVNlcnZpY2UubGlzdGVuKFwiSE9PS1wiLCAoZGF0YSkgPT4ge1xuICAgIG1lc3NhZ2VCdXMuZGlzcGF0Y2goZGF0YS5pZCwgZGF0YS5tZXNzYWdlKTtcbn0pO1xuLyoqXG4gKiBQcm9taXNpZnkgcG9zdCBtZXNzYWdlIGZyb20gd2luZG93IHRvIHdpbmRvd1xuICogYWNrUmVxdWlyZWQsIGlmIGZhbHNlLCBubyBpZCB3aWxsIGJlIGFzc2lnbmVkIGhlbmNlLCBubyBtZXRob2Qgd2lsbCBiZSBhZGRlZCBpbiBtZXNzYWdlXG4gKiBtZXNzYWdlIGlkIHdhcyBub3QgdGhlIHByb2JsZW0gYnV0IGZ1bmN0aW9uIGluIG1lc3NhZ2UgYnVzIHdhc1xuICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzcG9uc2UgbWVzc2FnZSBpZiBhY2tSZXF1aXJlZCBpcyB0cnVlLCBvdGhlcndpc2UgdW5kZWZpbmVkLlxuICovXG5jb25zdCBwb3N0TWVzc2FnZSA9IChtZXNzYWdlLCB0eXBlLCBhY2tSZXF1aXJlZCkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VJZCA9IGFja1JlcXVpcmVkID8gbWVzc2FnZUlkRmFjdG9yeS5nZXRJZCgpIDogbnVsbDtcbiAgICBjb25zdCBtZXNzYWdlT2JqZWN0ID0ge1xuICAgICAgICBpZDogbWVzc2FnZUlkLFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICB0bzogXCJDT05URU5UXCIsXG4gICAgICAgIGZyb206IFwiSE9PS1wiLFxuICAgICAgICBleHRlbnNpb25OYW1lOiBcIk1PS0tVXCIsXG4gICAgICAgIHR5cGUsXG4gICAgfTtcbiAgICBzZXJ2aWNlXzEubWVzc2FnZVNlcnZpY2Uuc2VuZChtZXNzYWdlT2JqZWN0KTtcbiAgICBpZiAobWVzc2FnZUlkICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgbWVzc2FnZUJ1cy5hZGRMaXN0ZXIobWVzc2FnZUlkLCByZXNvbHZlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59O1xuLy8gSGVscGVyIHRvIGNvbnZlcnQgcmVxdWVzdCBib2R5IHRvIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uXG5mdW5jdGlvbiBnZXRSZXF1ZXN0Qm9keUFzU3RyaW5nKGJvZHkpIHtcbiAgICBpZiAoYm9keSA9PT0gbnVsbCB8fCBib2R5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBSZWFkYWJsZVN0cmVhbSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICBib2R5IGluc3RhbmNlb2YgUmVhZGFibGVTdHJlYW0pIHtcbiAgICAgICAgcmV0dXJuIFwiVW5zdXBwb3J0ZWQgYm9keSB0eXBlOiBSZWFkYWJsZVN0cmVhbVwiO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyBKU09OLnN0cmluZ2lmeSBpcyBwcmltYXJpbHkgZm9yIHBsYWluIG9iamVjdHMvYXJyYXlzLlxuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgICEoYm9keSBpbnN0YW5jZW9mIEZvcm1EYXRhKSAmJlxuICAgICAgICAgICAgIShib2R5IGluc3RhbmNlb2YgQmxvYikgJiZcbiAgICAgICAgICAgICEoYm9keSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSAmJlxuICAgICAgICAgICAgIShib2R5IGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zKSkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTdHJpbmcoYm9keSk7IC8vIEZhbGxiYWNrIGZvciBwcmltaXRpdmVzLCBGb3JtRGF0YSwgZXRjLlxuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiTW9ra3UgSW5qZWN0OiBFcnJvciBzdHJpbmdpZnlpbmcgcmVxdWVzdCBib2R5XCIsIGUpO1xuICAgICAgICByZXR1cm4gXCJVbnN1cHBvcnRlZCBib2R5IHR5cGU6IEVycm9yIGR1cmluZyBzdHJpbmdpZmljYXRpb25cIjtcbiAgICB9XG59XG4vLyBIZWxwZXIgdG8gcGFyc2UgVVJMIGFuZCBleHRyYWN0IHF1ZXJ5IHBhcmFtZXRlcnNcbmZ1bmN0aW9uIHBhcnNlVXJsQW5kUXVlcnkocmVxdWVzdFVybElucHV0KSB7XG4gICAgbGV0IHJlcXVlc3RVcmxTdHIgPSBcIlwiO1xuICAgIGlmIChyZXF1ZXN0VXJsSW5wdXQgaW5zdGFuY2VvZiBVUkwpIHtcbiAgICAgICAgcmVxdWVzdFVybFN0ciA9IHJlcXVlc3RVcmxJbnB1dC5ocmVmO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgUmVxdWVzdCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICByZXF1ZXN0VXJsSW5wdXQgaW5zdGFuY2VvZiBSZXF1ZXN0KSB7XG4gICAgICAgIHJlcXVlc3RVcmxTdHIgPSByZXF1ZXN0VXJsSW5wdXQudXJsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVxdWVzdFVybFN0ciA9IHJlcXVlc3RVcmxJbnB1dDtcbiAgICB9XG4gICAgY29uc3Qgc2VwYXJhdG9yID0gcmVxdWVzdFVybFN0ci5pbmRleE9mKFwiP1wiKTtcbiAgICBjb25zdCB1cmwgPSBzZXBhcmF0b3IgIT09IC0xXG4gICAgICAgID8gcmVxdWVzdFVybFN0ci5zdWJzdHJpbmcoMCwgc2VwYXJhdG9yKVxuICAgICAgICA6IHJlcXVlc3RVcmxTdHI7XG4gICAgY29uc3QgcXVlcnlQYXJhbXMgPSBzZXBhcmF0b3IgIT09IC0xXG4gICAgICAgID8gSlNPTi5zdHJpbmdpZnkoKDAsIHF1ZXJ5X3N0cmluZ18xLnBhcnNlKShyZXF1ZXN0VXJsU3RyLnN1YnN0cmluZyhzZXBhcmF0b3IpKSlcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHsgdXJsLCBxdWVyeVBhcmFtcyB9O1xufVxuY29uc3QgZ2V0TG9nT2JqZWN0ID0gKHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBjb25zdCB7IHVybCwgcXVlcnlQYXJhbXMgfSA9IHBhcnNlVXJsQW5kUXVlcnkocmVxdWVzdC51cmwpO1xuICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0gZ2V0UmVxdWVzdEJvZHlBc1N0cmluZyhyZXF1ZXN0LmJvZHkpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGlkOiAoX2EgPSByZXF1ZXN0Lm1va2t1KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWQsXG4gICAgICAgIHJlcXVlc3Q6IHtcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIGJvZHk6IHJlcXVlc3RCb2R5LFxuICAgICAgICAgICAgcXVlcnlQYXJhbXMsXG4gICAgICAgICAgICBtZXRob2Q6ICgoKF9iID0gcmVxdWVzdC5tZXRob2QpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi50b1VwcGVyQ2FzZSgpKSB8fCBcIkdFVFwiKSxcbiAgICAgICAgICAgIGhlYWRlcnM6ICgwLCBoZWxwZXJfMS5nZXRIZWFkZXJzKShyZXF1ZXN0LmhlYWRlcnMpLFxuICAgICAgICB9LFxuICAgICAgICByZXNwb25zZSxcbiAgICB9O1xufTtcbmZ1bmN0aW9uIHByb2Nlc3NNb2NraW5nUmVxdWVzdChyZXF1ZXN0LCBjYWxsYmFjaykge1xuICAgIHZhciBfYTtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBsb2dFbnRyeSA9IGdldExvZ09iamVjdChyZXF1ZXN0KTtcbiAgICAgICAgLy8gU2VuZCBpbml0aWFsIGxvZyAoZmlyZSBhbmQgZm9yZ2V0KVxuICAgICAgICBwb3N0TWVzc2FnZShsb2dFbnRyeSwgXCJMT0dcIiwgZmFsc2UpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgbW9ja1NlcnZpY2VSZXNwb25zZVByb21pc2UgPSBwb3N0TWVzc2FnZShsb2dFbnRyeSwgXCJDSEVDS19NT0NLXCIsIHRydWUpO1xuICAgICAgICAgICAgaWYgKCFtb2NrU2VydmljZVJlc3BvbnNlUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIC8vIFNob3VsZCBub3QgaGFwcGVuIGlmIGFja1JlcXVpcmVkIGlzIHRydWVcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1vY2tTZXJ2aWNlUmVzcG9uc2UgPSAoeWllbGQgbW9ja1NlcnZpY2VSZXNwb25zZVByb21pc2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJIb29rOiBcIiwgbW9ja1NlcnZpY2VSZXNwb25zZSk7XG4gICAgICAgICAgICBpZiAobW9ja1NlcnZpY2VSZXNwb25zZSAmJiBtb2NrU2VydmljZVJlc3BvbnNlLm1vY2tSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vY2sgPSBtb2NrU2VydmljZVJlc3BvbnNlLm1vY2tSZXNwb25zZTtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJzID0gbW9jay5oZWFkZXJzXG4gICAgICAgICAgICAgICAgICAgID8gbW9jay5oZWFkZXJzLnJlZHVjZSgoZmluYWwsIGhlYWRlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxbaGVhZGVyLm5hbWVdID0gaGVhZGVyLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbmFsO1xuICAgICAgICAgICAgICAgICAgICB9LCB7fSlcbiAgICAgICAgICAgICAgICAgICAgOiB7IFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFwiIH07IC8vIERlZmF1bHQgaGVhZGVyc1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbmFsTW9ja2VkUmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogbW9jay5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IChfYSA9IG1vY2sucmVzcG9uc2UpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAobW9jay5kZWxheSAmJiBtb2NrLmRlbGF5ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZpbmFsTW9ja2VkUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9LCBtb2NrLmRlbGF5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZpbmFsTW9ja2VkUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7IC8vIE5vIG1vY2ssIHByb2NlZWQgd2l0aCBvcmlnaW5hbCByZXF1ZXN0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTW9ra3UgSW5qZWN0OiBFcnJvciBkdXJpbmcgbW9jayBwcm9jZXNzaW5nOlwiLCBlcnJvcik7XG4gICAgICAgICAgICBjYWxsYmFjaygpOyAvLyBQcm9jZWVkIHdpdGggb3JpZ2luYWwgcmVxdWVzdCBvbiBlcnJvclxuICAgICAgICB9XG4gICAgfSk7XG59XG54aG9va18xLmRlZmF1bHQuYmVmb3JlKGZ1bmN0aW9uIChyZXF1ZXN0LCBjYWxsYmFjaykge1xuICAgIC8vIEVuc3VyZSBhIHVuaXF1ZSBJRCBpcyBhc3NvY2lhdGVkIHdpdGggdGhlIHJlcXVlc3Qgb2JqZWN0IGZvciBsb2dnaW5nL2NvcnJlbGF0aW9uLlxuICAgIGlmICghcmVxdWVzdC5tb2trdSkge1xuICAgICAgICByZXF1ZXN0Lm1va2t1ID0geyBpZDogbG9nSWRGYWN0b3J5LmdldElkKCkgfTtcbiAgICB9XG4gICAgcHJvY2Vzc01vY2tpbmdSZXF1ZXN0KHJlcXVlc3QsIGNhbGxiYWNrKTtcbn0pO1xuZnVuY3Rpb24gc2VuZExvZ0FmdGVyUmVxdWVzdChyZXF1ZXN0LCBvcmlnaW5hbFJlc3BvbnNlKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzZW5kTG9nQWZ0ZXJSZXF1ZXN0XCIsIHJlcXVlc3QsIG9yaWdpbmFsUmVzcG9uc2UpO1xuICAgICAgICBsZXQgcmVzcG9uc2VUZXh0O1xuICAgICAgICBjb25zdCByZXNwb25zZVN0YXR1cyA9IG9yaWdpbmFsUmVzcG9uc2Uuc3RhdHVzIHx8IDA7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlSGVhZGVycyA9IG9yaWdpbmFsUmVzcG9uc2UuaGVhZGVycyB8fCB7fTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3JpZ2luYWxSZXNwb25zZS5jbG9uZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgLy8gTGlrZWx5IGEgRmV0Y2ggQVBJIFJlc3BvbnNlXG4gICAgICAgICAgICAgICAgY29uc3QgY2xvbmVkUmVzcG9uc2UgPSBvcmlnaW5hbFJlc3BvbnNlLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VUZXh0ID0geWllbGQgY2xvbmVkUmVzcG9uc2UudGV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9yaWdpbmFsUmVzcG9uc2UudGV4dCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIC8vIERpcmVjdCB0ZXh0IHByb3BlcnR5XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VUZXh0ID0gb3JpZ2luYWxSZXNwb25zZS50ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAob3JpZ2luYWxSZXNwb25zZS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgLy8gRmFsbGJhY2sgdG8gZGF0YSBwcm9wZXJ0eVxuICAgICAgICAgICAgICAgIHJlc3BvbnNlVGV4dCA9XG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBvcmlnaW5hbFJlc3BvbnNlLmRhdGEgPT09IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gb3JpZ2luYWxSZXNwb25zZS5kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICA6IEpTT04uc3RyaW5naWZ5KG9yaWdpbmFsUmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZVRleHQgPSBcIk1va2t1OiBVbmFibGUgdG8gZGV0ZXJtaW5lIHJlc3BvbnNlIGJvZHkuXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTW9ra3UgSW5qZWN0OiBFcnJvciBleHRyYWN0aW5nIHJlc3BvbnNlIHRleHQgaW4geGhvb2suYWZ0ZXI6XCIsIGVycm9yKTtcbiAgICAgICAgICAgIHJlc3BvbnNlVGV4dCA9IFwiTW9ra3U6IEVycm9yIHByb2Nlc3NpbmcgcmVzcG9uc2UgdGV4dC5cIjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsb2dFbnRyeSA9IGdldExvZ09iamVjdChyZXF1ZXN0LCB7XG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlU3RhdHVzLFxuICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlVGV4dCxcbiAgICAgICAgICAgIGhlYWRlcnM6ICgwLCBoZWxwZXJfMS5nZXRIZWFkZXJzKShyZXNwb25zZUhlYWRlcnMpLFxuICAgICAgICB9KTtcbiAgICAgICAgcG9zdE1lc3NhZ2UobG9nRW50cnksIFwiTE9HXCIsIGZhbHNlKTtcbiAgICB9KTtcbn1cbnhob29rXzEuZGVmYXVsdC5hZnRlcihmdW5jdGlvbiAocmVxdWVzdCwgb3JpZ2luYWxSZXNwb25zZSkge1xuICAgIC8vIEVuc3VyZSByZXF1ZXN0Lm1va2t1LmlkIGlzIGF2YWlsYWJsZSAoc2hvdWxkIGJlIHNldCBpbiAnYmVmb3JlJyBob29rKVxuICAgIGlmICghcmVxdWVzdC5tb2trdSkge1xuICAgICAgICAvLyBUaGlzIGNhc2Ugc2hvdWxkIGlkZWFsbHkgbm90IGJlIGhpdCBpZiAnYmVmb3JlJyBhbHdheXMgcnVucyBhbmQgc2V0cyBpdC5cbiAgICAgICAgcmVxdWVzdC5tb2trdSA9IHsgaWQ6IGxvZ0lkRmFjdG9yeS5nZXRJZCgpIH07XG4gICAgICAgIGNvbnNvbGUud2FybihcIk1va2t1IEluamVjdDogcmVxdWVzdC5tb2trdS5pZCB3YXMgbm90IHNldCBpbiB4aG9vay5iZWZvcmUsIG5ldyBJRCBnZW5lcmF0ZWQgaW4geGhvb2suYWZ0ZXIuXCIpO1xuICAgIH1cbiAgICBzZW5kTG9nQWZ0ZXJSZXF1ZXN0KHJlcXVlc3QsIG9yaWdpbmFsUmVzcG9uc2UpO1xufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWVzc2FnZVNlcnZpY2UgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlU2VydmljZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL21lc3NhZ2VTZXJ2aWNlXCIpKTtcbmV4cG9ydHMubWVzc2FnZVNlcnZpY2UgPSBtZXNzYWdlU2VydmljZV8xLmRlZmF1bHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICpcbiAqIEluamVjdFxuICogICAgIC0+IENvbnRlbnQgU2NyaXB0XG4gKlxuICogQ29udGVudCBzY3JpcHQgaXMgYnJpZGdlIGJldHdlZW4gcGFuZWwgYW5kIGluamVjdCBmb3IgY29tbXVuaWNhdGlvblxuICogYXMgaXQgaGFzIGJvdGggd2luZG93cyBldmVudCBsaXN0ZXJuIGFuZCBjaHJvbWUgcnVudGltZSBtZXNzYWdlIGxpc3RuZXJcbiAqIENvbnRlbnQgU2NyaXB0XG4gKiAgICAgLT4gUGFuZWxcbiAqICAgICAtPiBIb29rXG4gKlxuICogUGFuZWxcbiAqICAgICAtPiBDb250ZW50IFNjcmlwdFxuICovXG5jb25zdCB0dW5uZWxNYXAgPSB7XG4gICAgXCJIT09LOkNPTlRFTlRcIjogXCJ3aW5kb3dcIixcbiAgICBcIkNPTlRFTlQ6SE9PS1wiOiBcIndpbmRvd1wiLFxuICAgIFwiQ09OVEVOVDpQQU5FTFwiOiBcInJ1bnRpbWVcIixcbiAgICBcIkNPTlRFTlQ6U0VSVklDRV9XT1JLRVJcIjogXCJydW50aW1lXCIsXG4gICAgXCJQQU5FTDpDT05URU5UXCI6IFwidGFiXCIsXG4gICAgXCJTRVJWSUNFX1dPUktFUjpDT05URU5UXCI6IFwicnVudGltZVwiLFxuICAgIFwiU0VSVklDRV9XT1JLRVI6UEFORUxcIjogXCJydW50aW1lXCIsXG59O1xuY29uc3Qgc2VuZCA9IChwcm9wcywgdGFiSWQpID0+IHtcbiAgICBjb25zdCBwYXRoS2V5ID0gYCR7cHJvcHMuZnJvbX06JHtwcm9wcy50b31gO1xuICAgIGNvbnN0IHBhdGggPSB0dW5uZWxNYXBbcGF0aEtleV07XG4gICAgY29uc3Qgc2VydmljZSA9IHtcbiAgICAgICAgd2luZG93OiAoKSA9PiB3aW5kb3cucG9zdE1lc3NhZ2UocHJvcHMsIFwiKlwiKSxcbiAgICAgICAgcnVudGltZTogKCkgPT4gY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UocHJvcHMpLFxuICAgICAgICB0YWI6ICgpID0+IGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYklkLCBwcm9wcyksXG4gICAgfTtcbiAgICBpZiAoc2VydmljZVtwYXRoXSkge1xuICAgICAgICBzZXJ2aWNlW3BhdGhdKHByb3BzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYE1va2t1IE1lc3NhZ2VTZXJ2aWNlOiBObyBwYXRoIGRlZmluZWQgZm9yICR7cGF0aEtleX1gKTtcbiAgICB9XG59O1xuY29uc3QgbGlzdGVuID0gKGVudGl0eSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xuICAgICAgICBydW50aW1lOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmdW5jID0gKG1lc3NhZ2UsIF9zZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLnRvICE9PSBlbnRpdHkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhtZXNzYWdlLCBfc2VuZGVyLCBzZW5kUmVzcG9uc2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jKTtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UucmVtb3ZlTGlzdGVuZXIoZnVuYyk7XG4gICAgICAgIH0sXG4gICAgICAgIHdpbmRvdzogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZnVuYyA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFdlIG9ubHkgYWNjZXB0IG1lc3NhZ2VzIGZyb20gb3Vyc2VsdmVzXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSAhPT0gd2luZG93KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudG8gIT09IGVudGl0eSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBmdW5jKTtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZnVuYyk7XG4gICAgICAgIH0sXG4gICAgfTtcbiAgICBzd2l0Y2ggKGVudGl0eSkge1xuICAgICAgICBjYXNlIFwiSE9PS1wiOiB7XG4gICAgICAgICAgICByZXR1cm4gW3NlcnZpY2VbXCJ3aW5kb3dcIl0oKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIkNPTlRFTlRcIjoge1xuICAgICAgICAgICAgcmV0dXJuIFtzZXJ2aWNlW1wid2luZG93XCJdKCksIHNlcnZpY2VbXCJydW50aW1lXCJdKCldO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJQQU5FTFwiOiB7XG4gICAgICAgICAgICByZXR1cm4gW3NlcnZpY2VbXCJydW50aW1lXCJdKCldO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJTRVJWSUNFX1dPUktFUlwiOiB7XG4gICAgICAgICAgICByZXR1cm4gW3NlcnZpY2VbXCJydW50aW1lXCJdKCldO1xuICAgICAgICB9XG4gICAgfVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IHsgc2VuZCwgbGlzdGVuIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0SGVhZGVycyA9IGV4cG9ydHMuZ2V0RXJyb3IgPSBleHBvcnRzLmlzVmFsaWRKU09OID0gdm9pZCAwO1xuY29uc3QgaXNWYWxpZEpTT04gPSAoanNvbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgIHJldHVybiB7IGVycm9yOiB1bmRlZmluZWQgfTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICBsZXQgbGluZU51bWJlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QganNvbkVycm9yUmVnZXggPSBuZXcgUmVnRXhwKC8oPzw9XFxicG9zaXRpb25cXHMpKFxcdyspL2cpO1xuICAgICAgICBjb25zdCBzdHJpbmdpZmllZEVycm9yID0gZS50b1N0cmluZygpO1xuICAgICAgICBpZiAoc3RyaW5naWZpZWRFcnJvciAhPT0gXCJVbmV4cGVjdGVkIGVuZCBvZiBKU09OIGlucHV0XCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBqc29uRXJyb3JSZWdleC5leGVjKHN0cmluZ2lmaWVkRXJyb3IpO1xuICAgICAgICAgICAgcG9zaXRpb24gPSB4ICYmIHgubGVuZ3RoID4gMCA/IHBhcnNlSW50KHhbMF0sIDEwKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIGxpbmVOdW1iZXIgPSAxO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwganNvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gcG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChqc29uW2ldID09PSBcIlxcblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lTnVtYmVyKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBqc29uRXJyb3JSZWdleC5sYXN0SW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlcnJvcjogYCR7c3RyaW5naWZpZWRFcnJvcn0ke2xpbmVOdW1iZXIgPyBcIiBhbmQgYXQgbGluZSBudW1iZXIgXCIgKyBsaW5lTnVtYmVyIDogXCJcIn1gLFxuICAgICAgICAgICAgcG9zaXRpb24sXG4gICAgICAgICAgICBsaW5lTnVtYmVyLFxuICAgICAgICB9O1xuICAgIH1cbn07XG5leHBvcnRzLmlzVmFsaWRKU09OID0gaXNWYWxpZEpTT047XG5jb25zdCBnZXRFcnJvciA9IChlcnJvcnMpID0+IHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZXJyb3JzKTtcbiAgICBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGVycm9yc1trZXlzWzBdXTtcbiAgICB9XG59O1xuZXhwb3J0cy5nZXRFcnJvciA9IGdldEVycm9yO1xuY29uc3QgZ2V0SGVhZGVycyA9IChoZWFkZXJzKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBoZWFkZXJzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhoZWFkZXJzKS5tYXAoKG5hbWUpID0+ICh7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgdmFsdWU6IGhlYWRlcnNbbmFtZV0sXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xufTtcbmV4cG9ydHMuZ2V0SGVhZGVycyA9IGdldEhlYWRlcnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIElkRmFjdG9yeSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2lkID0gMDtcbiAgICB9XG4gICAgZ2V0SWQoKSB7XG4gICAgICAgIC8vIHNraXAgMCwgYXMgaXQgY2FuIGxlYWQgdG8gZmFsc3lcbiAgICAgICAgdGhpcy5faWQrKztcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IElkRmFjdG9yeTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgTWVzc2FnZUJ1cyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3RvciA9IHt9O1xuICAgICAgICB0aGlzLl9kZWZhdWx0TGlzdG5lciA9ICgpID0+IHsgfTtcbiAgICAgICAgdGhpcy5fY29sbGVjdG9yID0ge307XG4gICAgfVxuICAgIGRpc3BhdGNoKGlkLCBldmVudERhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbGxlY3RvcltpZF0pIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3RvcltpZF0oZXZlbnREYXRhKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jb2xsZWN0b3JbaWRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZGVmYXVsdExpc3RuZXIoZXZlbnREYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhZGRMaXN0ZXIoaWQsIGZ1bmMpIHtcbiAgICAgICAgdGhpcy5fY29sbGVjdG9yW2lkXSA9IGZ1bmM7XG4gICAgfVxuICAgIGNyZWF0ZURlZmF1bHRMaXN0ZW5lcihmdW5jKSB7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRMaXN0bmVyID0gZnVuYztcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBNZXNzYWdlQnVzO1xuIiwiY29uc3Qgc2xpY2UgPSAobywgbikgPT4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobywgbik7XG5cbmxldCByZXN1bHQgPSBudWxsO1xuXG4vL2ZpbmQgZ2xvYmFsIG9iamVjdFxuaWYgKFxuICB0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlXG4pIHtcbiAgcmVzdWx0ID0gc2VsZjtcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICByZXN1bHQgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHdpbmRvdykge1xuICByZXN1bHQgPSB3aW5kb3c7XG59XG5cbmNvbnN0IHdpbmRvd1JlZiA9IHJlc3VsdDtcbmNvbnN0IGRvY3VtZW50UmVmID0gcmVzdWx0LmRvY3VtZW50O1xuXG5jb25zdCBVUExPQURfRVZFTlRTID0gW1wibG9hZFwiLCBcImxvYWRlbmRcIiwgXCJsb2Fkc3RhcnRcIl07XG5jb25zdCBDT01NT05fRVZFTlRTID0gW1wicHJvZ3Jlc3NcIiwgXCJhYm9ydFwiLCBcImVycm9yXCIsIFwidGltZW91dFwiXTtcblxuY29uc3QgZGVwcmljYXRlZFByb3AgPSBwID0+XG4gIFtcInJldHVyblZhbHVlXCIsIFwidG90YWxTaXplXCIsIFwicG9zaXRpb25cIl0uaW5jbHVkZXMocCk7XG5cbmNvbnN0IG1lcmdlT2JqZWN0cyA9IGZ1bmN0aW9uIChzcmMsIGRzdCkge1xuICBmb3IgKGxldCBrIGluIHNyYykge1xuICAgIGlmIChkZXByaWNhdGVkUHJvcChrKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGNvbnN0IHYgPSBzcmNba107XG4gICAgdHJ5IHtcbiAgICAgIGRzdFtrXSA9IHY7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gIH1cbiAgcmV0dXJuIGRzdDtcbn07XG5cbi8vcHJveHkgZXZlbnRzIGZyb20gb25lIGVtaXR0ZXIgdG8gYW5vdGhlclxuY29uc3QgcHJveHlFdmVudHMgPSBmdW5jdGlvbiAoZXZlbnRzLCBzcmMsIGRzdCkge1xuICBjb25zdCBwID0gZXZlbnQgPT5cbiAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgY29uc3QgY2xvbmUgPSB7fTtcbiAgICAgIC8vY29waWVzIGV2ZW50LCB3aXRoIGRzdCBlbWl0dGVyIGlucGxhY2Ugb2Ygc3JjXG4gICAgICBmb3IgKGxldCBrIGluIGUpIHtcbiAgICAgICAgaWYgKGRlcHJpY2F0ZWRQcm9wKGspKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsID0gZVtrXTtcbiAgICAgICAgY2xvbmVba10gPSB2YWwgPT09IHNyYyA/IGRzdCA6IHZhbDtcbiAgICAgIH1cbiAgICAgIC8vZW1pdHMgb3V0IHRoZSBkc3RcbiAgICAgIHJldHVybiBkc3QuZGlzcGF0Y2hFdmVudChldmVudCwgY2xvbmUpO1xuICAgIH07XG4gIC8vZG9udCBwcm94eSBtYW51YWwgZXZlbnRzXG4gIGZvciAobGV0IGV2ZW50IG9mIEFycmF5LmZyb20oZXZlbnRzKSkge1xuICAgIGlmIChkc3QuX2hhcyhldmVudCkpIHtcbiAgICAgIHNyY1tgb24ke2V2ZW50fWBdID0gcChldmVudCk7XG4gICAgfVxuICB9XG59O1xuXG4vL2NyZWF0ZSBmYWtlIGV2ZW50XG5jb25zdCBmYWtlRXZlbnQgPSBmdW5jdGlvbiAodHlwZSkge1xuICBpZiAoZG9jdW1lbnRSZWYgJiYgZG9jdW1lbnRSZWYuY3JlYXRlRXZlbnRPYmplY3QgIT0gbnVsbCkge1xuICAgIGNvbnN0IG1zaWVFdmVudE9iamVjdCA9IGRvY3VtZW50UmVmLmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gICAgbXNpZUV2ZW50T2JqZWN0LnR5cGUgPSB0eXBlO1xuICAgIHJldHVybiBtc2llRXZlbnRPYmplY3Q7XG4gIH1cbiAgLy8gb24gc29tZSBwbGF0Zm9ybXMgbGlrZSBhbmRyb2lkIDQuMS4yIGFuZCBzYWZhcmkgb24gd2luZG93cywgaXQgYXBwZWFyc1xuICAvLyB0aGF0IG5ldyBFdmVudCBpcyBub3QgYWxsb3dlZFxuICB0cnkge1xuICAgIHJldHVybiBuZXcgRXZlbnQodHlwZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgdHlwZSB9O1xuICB9XG59O1xuXG4vL3RpbnkgZXZlbnQgZW1pdHRlclxuY29uc3QgRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24gKG5vZGVTdHlsZSkge1xuICAvL3ByaXZhdGVcbiAgbGV0IGV2ZW50cyA9IHt9O1xuICBjb25zdCBsaXN0ZW5lcnMgPSBldmVudCA9PiBldmVudHNbZXZlbnRdIHx8IFtdO1xuICAvL3B1YmxpY1xuICBjb25zdCBlbWl0dGVyID0ge307XG4gIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCwgY2FsbGJhY2ssIGkpIHtcbiAgICBldmVudHNbZXZlbnRdID0gbGlzdGVuZXJzKGV2ZW50KTtcbiAgICBpZiAoZXZlbnRzW2V2ZW50XS5pbmRleE9mKGNhbGxiYWNrKSA+PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGkgPSBpID09PSB1bmRlZmluZWQgPyBldmVudHNbZXZlbnRdLmxlbmd0aCA6IGk7XG4gICAgZXZlbnRzW2V2ZW50XS5zcGxpY2UoaSwgMCwgY2FsbGJhY2spO1xuICB9O1xuICBlbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgLy9yZW1vdmUgYWxsXG4gICAgaWYgKGV2ZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGV2ZW50cyA9IHt9O1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL3JlbW92ZSBhbGwgb2YgdHlwZSBldmVudFxuICAgIGlmIChjYWxsYmFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBldmVudHNbZXZlbnRdID0gW107XG4gICAgfVxuICAgIC8vcmVtb3ZlIHBhcnRpY3VsYXIgaGFuZGxlclxuICAgIGNvbnN0IGkgPSBsaXN0ZW5lcnMoZXZlbnQpLmluZGV4T2YoY2FsbGJhY2spO1xuICAgIGlmIChpID09PSAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsaXN0ZW5lcnMoZXZlbnQpLnNwbGljZShpLCAxKTtcbiAgfTtcbiAgZW1pdHRlci5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFyZ3MgPSBzbGljZShhcmd1bWVudHMpO1xuICAgIGNvbnN0IGV2ZW50ID0gYXJncy5zaGlmdCgpO1xuICAgIGlmICghbm9kZVN0eWxlKSB7XG4gICAgICBhcmdzWzBdID0gbWVyZ2VPYmplY3RzKGFyZ3NbMF0sIGZha2VFdmVudChldmVudCkpO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFyZ3NbMF0sIFwidGFyZ2V0XCIsIHtcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogdGhpcyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBsZWdhY3lsaXN0ZW5lciA9IGVtaXR0ZXJbYG9uJHtldmVudH1gXTtcbiAgICBpZiAobGVnYWN5bGlzdGVuZXIpIHtcbiAgICAgIGxlZ2FjeWxpc3RlbmVyLmFwcGx5KGVtaXR0ZXIsIGFyZ3MpO1xuICAgIH1cbiAgICBjb25zdCBpdGVyYWJsZSA9IGxpc3RlbmVycyhldmVudCkuY29uY2F0KGxpc3RlbmVycyhcIipcIikpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlcmFibGUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gaXRlcmFibGVbaV07XG4gICAgICBsaXN0ZW5lci5hcHBseShlbWl0dGVyLCBhcmdzKTtcbiAgICB9XG4gIH07XG4gIGVtaXR0ZXIuX2hhcyA9IGV2ZW50ID0+ICEhKGV2ZW50c1tldmVudF0gfHwgZW1pdHRlcltgb24ke2V2ZW50fWBdKTtcbiAgLy9hZGQgZXh0cmEgYWxpYXNlc1xuICBpZiAobm9kZVN0eWxlKSB7XG4gICAgZW1pdHRlci5saXN0ZW5lcnMgPSBldmVudCA9PiBzbGljZShsaXN0ZW5lcnMoZXZlbnQpKTtcbiAgICBlbWl0dGVyLm9uID0gZW1pdHRlci5hZGRFdmVudExpc3RlbmVyO1xuICAgIGVtaXR0ZXIub2ZmID0gZW1pdHRlci5yZW1vdmVFdmVudExpc3RlbmVyO1xuICAgIGVtaXR0ZXIuZmlyZSA9IGVtaXR0ZXIuZGlzcGF0Y2hFdmVudDtcbiAgICBlbWl0dGVyLm9uY2UgPSBmdW5jdGlvbiAoZSwgZm4pIHtcbiAgICAgIHZhciBmaXJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBlbWl0dGVyLm9mZihlLCBmaXJlKTtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIGVtaXR0ZXIub24oZSwgZmlyZSk7XG4gICAgfTtcbiAgICBlbWl0dGVyLmRlc3Ryb3kgPSAoKSA9PiAoZXZlbnRzID0ge30pO1xuICB9XG5cbiAgcmV0dXJuIGVtaXR0ZXI7XG59O1xuXG4vL2hlbHBlclxuY29uc3QgQ1JMRiA9IFwiXFxyXFxuXCI7XG5cbmNvbnN0IG9iamVjdFRvU3RyaW5nID0gZnVuY3Rpb24gKGhlYWRlcnNPYmopIHtcbiAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKGhlYWRlcnNPYmopO1xuXG4gIGNvbnN0IGhlYWRlcnMgPSBlbnRyaWVzLm1hcCgoW25hbWUsIHZhbHVlXSkgPT4ge1xuICAgIHJldHVybiBgJHtuYW1lLnRvTG93ZXJDYXNlKCl9OiAke3ZhbHVlfWA7XG4gIH0pO1xuXG4gIHJldHVybiBoZWFkZXJzLmpvaW4oQ1JMRik7XG59O1xuXG5jb25zdCBzdHJpbmdUb09iamVjdCA9IGZ1bmN0aW9uIChoZWFkZXJzU3RyaW5nLCBkZXN0KSB7XG4gIGNvbnN0IGhlYWRlcnMgPSBoZWFkZXJzU3RyaW5nLnNwbGl0KENSTEYpO1xuICBpZiAoZGVzdCA9PSBudWxsKSB7XG4gICAgZGVzdCA9IHt9O1xuICB9XG5cbiAgZm9yIChsZXQgaGVhZGVyIG9mIGhlYWRlcnMpIHtcbiAgICBpZiAoLyhbXjpdKyk6XFxzKiguKykvLnRlc3QoaGVhZGVyKSkge1xuICAgICAgY29uc3QgbmFtZSA9IFJlZ0V4cC4kMSAhPSBudWxsID8gUmVnRXhwLiQxLnRvTG93ZXJDYXNlKCkgOiB1bmRlZmluZWQ7XG4gICAgICBjb25zdCB2YWx1ZSA9IFJlZ0V4cC4kMjtcbiAgICAgIGlmIChkZXN0W25hbWVdID09IG51bGwpIHtcbiAgICAgICAgZGVzdFtuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkZXN0O1xufTtcblxuY29uc3QgY29udmVydCA9IGZ1bmN0aW9uIChoZWFkZXJzLCBkZXN0KSB7XG4gIHN3aXRjaCAodHlwZW9mIGhlYWRlcnMpIHtcbiAgICBjYXNlIFwib2JqZWN0XCI6IHtcbiAgICAgIHJldHVybiBvYmplY3RUb1N0cmluZyhoZWFkZXJzKTtcbiAgICB9XG4gICAgY2FzZSBcInN0cmluZ1wiOiB7XG4gICAgICByZXR1cm4gc3RyaW5nVG9PYmplY3QoaGVhZGVycywgZGVzdCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFtdO1xufTtcblxudmFyIGhlYWRlcnMgPSB7IGNvbnZlcnQgfTtcblxuLy9nbG9iYWwgc2V0IG9mIGhvb2sgZnVuY3Rpb25zLFxuLy91c2VzIGV2ZW50IGVtaXR0ZXIgdG8gc3RvcmUgaG9va3NcbmNvbnN0IGhvb2tzID0gRXZlbnRFbWl0dGVyKHRydWUpO1xuXG5jb25zdCBudWxsaWZ5ID0gcmVzID0+IChyZXMgPT09IHVuZGVmaW5lZCA/IG51bGwgOiByZXMpO1xuXG4vL2Jyb3dzZXIncyBYTUxIdHRwUmVxdWVzdFxuY29uc3QgTmF0aXZlJDEgPSB3aW5kb3dSZWYuWE1MSHR0cFJlcXVlc3Q7XG5cbi8veGhvb2sncyBYTUxIdHRwUmVxdWVzdFxuY29uc3QgWGhvb2skMSA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgQUJPUlRFRCA9IC0xO1xuICBjb25zdCB4aHIgPSBuZXcgTmF0aXZlJDEoKTtcblxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIC8vIEV4dHJhIHN0YXRlXG4gIGNvbnN0IHJlcXVlc3QgPSB7fTtcbiAgbGV0IHN0YXR1cyA9IG51bGw7XG4gIGxldCBoYXNFcnJvciA9IHVuZGVmaW5lZDtcbiAgbGV0IHRyYW5zaXRpbmcgPSB1bmRlZmluZWQ7XG4gIGxldCByZXNwb25zZSA9IHVuZGVmaW5lZDtcbiAgdmFyIGN1cnJlbnRTdGF0ZSA9IDA7XG5cbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLyBQcml2YXRlIEFQSVxuXG4gIC8vcmVhZCByZXN1bHRzIGZyb20gcmVhbCB4aHIgaW50byByZXNwb25zZVxuICBjb25zdCByZWFkSGVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBBY2Nlc3NpbmcgYXR0cmlidXRlcyBvbiBhbiBhYm9ydGVkIHhociBvYmplY3Qgd2lsbFxuICAgIC8vIHRocm93IGFuICdjMDBjMDIzZiBlcnJvcicgaW4gSUU5IGFuZCBsb3dlciwgZG9uJ3QgdG91Y2ggaXQuXG4gICAgcmVzcG9uc2Uuc3RhdHVzID0gc3RhdHVzIHx8IHhoci5zdGF0dXM7XG4gICAgaWYgKHN0YXR1cyAhPT0gQUJPUlRFRCkge1xuICAgICAgcmVzcG9uc2Uuc3RhdHVzVGV4dCA9IHhoci5zdGF0dXNUZXh0O1xuICAgIH1cbiAgICBpZiAoc3RhdHVzICE9PSBBQk9SVEVEKSB7XG4gICAgICBjb25zdCBvYmplY3QgPSBoZWFkZXJzLmNvbnZlcnQoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcbiAgICAgIGZvciAobGV0IGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgY29uc3QgdmFsID0gb2JqZWN0W2tleV07XG4gICAgICAgIGlmICghcmVzcG9uc2UuaGVhZGVyc1trZXldKSB7XG4gICAgICAgICAgY29uc3QgbmFtZSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIHJlc3BvbnNlLmhlYWRlcnNbbmFtZV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVhZEJvZHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy9odHRwczovL3hoci5zcGVjLndoYXR3Zy5vcmcvXG4gICAgaWYgKCF4aHIucmVzcG9uc2VUeXBlIHx8IHhoci5yZXNwb25zZVR5cGUgPT09IFwidGV4dFwiKSB7XG4gICAgICByZXNwb25zZS50ZXh0ID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgIHJlc3BvbnNlLmRhdGEgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzcG9uc2UueG1sID0geGhyLnJlc3BvbnNlWE1MO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgICAvLyB1bmFibGUgdG8gc2V0IHJlc3BvbnNlWE1MIGR1ZSB0byByZXNwb25zZSB0eXBlLCB3ZSBhdHRlbXB0IHRvIGFzc2lnbiByZXNwb25zZVhNTFxuICAgICAgLy8gd2hlbiB0aGUgdHlwZSBpcyB0ZXh0IGV2ZW4gdGhvdWdoIGl0J3MgYWdhaW5zdCB0aGUgc3BlYyBkdWUgdG8gc2V2ZXJhbCBsaWJyYXJpZXNcbiAgICAgIC8vIGFuZCBicm93c2VyIHZlbmRvcnMgd2hvIGFsbG93IHRoaXMgYmVoYXZpb3IuIGNhdXNpbmcgdGhlc2UgcmVxdWVzdHMgdG8gZmFpbCB3aGVuXG4gICAgICAvLyB4aG9vayBpcyBpbnN0YWxsZWQgb24gYSBwYWdlLlxuICAgIH0gZWxzZSBpZiAoeGhyLnJlc3BvbnNlVHlwZSA9PT0gXCJkb2N1bWVudFwiKSB7XG4gICAgICByZXNwb25zZS54bWwgPSB4aHIucmVzcG9uc2VYTUw7XG4gICAgICByZXNwb25zZS5kYXRhID0geGhyLnJlc3BvbnNlWE1MO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNwb25zZS5kYXRhID0geGhyLnJlc3BvbnNlO1xuICAgIH1cbiAgICAvL25ldyBpbiBzb21lIGJyb3dzZXJzXG4gICAgaWYgKFwicmVzcG9uc2VVUkxcIiBpbiB4aHIpIHtcbiAgICAgIHJlc3BvbnNlLmZpbmFsVXJsID0geGhyLnJlc3BvbnNlVVJMO1xuICAgIH1cbiAgfTtcblxuICAvL3dyaXRlIHJlc3BvbnNlIGludG8gZmFjYWRlIHhoclxuICBjb25zdCB3cml0ZUhlYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgZmFjYWRlLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICBmYWNhZGUuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gIH07XG5cbiAgY29uc3Qgd3JpdGVCb2R5ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChcInRleHRcIiBpbiByZXNwb25zZSkge1xuICAgICAgZmFjYWRlLnJlc3BvbnNlVGV4dCA9IHJlc3BvbnNlLnRleHQ7XG4gICAgfVxuICAgIGlmIChcInhtbFwiIGluIHJlc3BvbnNlKSB7XG4gICAgICBmYWNhZGUucmVzcG9uc2VYTUwgPSByZXNwb25zZS54bWw7XG4gICAgfVxuICAgIGlmIChcImRhdGFcIiBpbiByZXNwb25zZSkge1xuICAgICAgZmFjYWRlLnJlc3BvbnNlID0gcmVzcG9uc2UuZGF0YTtcbiAgICB9XG4gICAgaWYgKFwiZmluYWxVcmxcIiBpbiByZXNwb25zZSkge1xuICAgICAgZmFjYWRlLnJlc3BvbnNlVVJMID0gcmVzcG9uc2UuZmluYWxVcmw7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGVtaXRGaW5hbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIWhhc0Vycm9yKSB7XG4gICAgICBmYWNhZGUuZGlzcGF0Y2hFdmVudChcImxvYWRcIiwge30pO1xuICAgIH1cbiAgICBmYWNhZGUuZGlzcGF0Y2hFdmVudChcImxvYWRlbmRcIiwge30pO1xuICAgIGlmIChoYXNFcnJvcikge1xuICAgICAgZmFjYWRlLnJlYWR5U3RhdGUgPSAwO1xuICAgIH1cbiAgfTtcblxuICAvL2Vuc3VyZSByZWFkeSBzdGF0ZSAwIHRocm91Z2ggNCBpcyBoYW5kbGVkXG4gIGNvbnN0IGVtaXRSZWFkeVN0YXRlID0gZnVuY3Rpb24gKG4pIHtcbiAgICB3aGlsZSAobiA+IGN1cnJlbnRTdGF0ZSAmJiBjdXJyZW50U3RhdGUgPCA0KSB7XG4gICAgICBmYWNhZGUucmVhZHlTdGF0ZSA9ICsrY3VycmVudFN0YXRlO1xuICAgICAgLy8gbWFrZSBmYWtlIGV2ZW50cyBmb3IgbGlicmFyaWVzIHRoYXQgYWN0dWFsbHkgY2hlY2sgdGhlIHR5cGUgb25cbiAgICAgIC8vIHRoZSBldmVudCBvYmplY3RcbiAgICAgIGlmIChjdXJyZW50U3RhdGUgPT09IDEpIHtcbiAgICAgICAgZmFjYWRlLmRpc3BhdGNoRXZlbnQoXCJsb2Fkc3RhcnRcIiwge30pO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gMikge1xuICAgICAgICB3cml0ZUhlYWQoKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50U3RhdGUgPT09IDQpIHtcbiAgICAgICAgd3JpdGVIZWFkKCk7XG4gICAgICAgIHdyaXRlQm9keSgpO1xuICAgICAgfVxuICAgICAgZmFjYWRlLmRpc3BhdGNoRXZlbnQoXCJyZWFkeXN0YXRlY2hhbmdlXCIsIHt9KTtcbiAgICAgIC8vZGVsYXkgZmluYWwgZXZlbnRzIGluY2FzZSBvZiBlcnJvclxuICAgICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gNCkge1xuICAgICAgICBpZiAocmVxdWVzdC5hc3luYyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBlbWl0RmluYWwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGVtaXRGaW5hbCwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy9jb250cm9sIGZhY2FkZSByZWFkeSBzdGF0ZVxuICBjb25zdCBzZXRSZWFkeVN0YXRlID0gZnVuY3Rpb24gKG4pIHtcbiAgICAvL2VtaXQgZXZlbnRzIHVudGlsIHJlYWR5U3RhdGUgcmVhY2hlcyA0XG4gICAgaWYgKG4gIT09IDQpIHtcbiAgICAgIGVtaXRSZWFkeVN0YXRlKG4pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL2JlZm9yZSBlbWl0dGluZyA0LCBydW4gYWxsICdhZnRlcicgaG9va3MgaW4gc2VxdWVuY2VcbiAgICBjb25zdCBhZnRlckhvb2tzID0gaG9va3MubGlzdGVuZXJzKFwiYWZ0ZXJcIik7XG4gICAgdmFyIHByb2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoYWZ0ZXJIb29rcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vZXhlY3V0ZSBlYWNoICdiZWZvcmUnIGhvb2sgb25lIGF0IGEgdGltZVxuICAgICAgICBjb25zdCBob29rID0gYWZ0ZXJIb29rcy5zaGlmdCgpO1xuICAgICAgICBpZiAoaG9vay5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICBob29rKHJlcXVlc3QsIHJlc3BvbnNlKTtcbiAgICAgICAgICBwcm9jZXNzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaG9vay5sZW5ndGggPT09IDMgJiYgcmVxdWVzdC5hc3luYykge1xuICAgICAgICAgIGhvb2socmVxdWVzdCwgcmVzcG9uc2UsIHByb2Nlc3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb2Nlc3MoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9yZXNwb25zZSByZWFkeSBmb3IgcmVhZGluZ1xuICAgICAgICBlbWl0UmVhZHlTdGF0ZSg0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIHByb2Nlc3MoKTtcbiAgfTtcblxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIC8vIEZhY2FkZSBYSFJcbiAgdmFyIGZhY2FkZSA9IEV2ZW50RW1pdHRlcigpO1xuICByZXF1ZXN0LnhociA9IGZhY2FkZTtcblxuICAvLyBIYW5kbGUgdGhlIHVuZGVybHlpbmcgcmVhZHkgc3RhdGVcbiAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIC8vcHVsbCBzdGF0dXMgYW5kIGhlYWRlcnNcbiAgICB0cnkge1xuICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSAyKSB7XG4gICAgICAgIHJlYWRIZWFkKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgLy9wdWxsIHJlc3BvbnNlIGRhdGFcbiAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgIHRyYW5zaXRpbmcgPSBmYWxzZTtcbiAgICAgIHJlYWRIZWFkKCk7XG4gICAgICByZWFkQm9keSgpO1xuICAgIH1cblxuICAgIHNldFJlYWR5U3RhdGUoeGhyLnJlYWR5U3RhdGUpO1xuICB9O1xuXG4gIC8vbWFyayB0aGlzIHhociBhcyBlcnJvcmVkXG4gIGNvbnN0IGhhc0Vycm9ySGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBoYXNFcnJvciA9IHRydWU7XG4gIH07XG4gIGZhY2FkZS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgaGFzRXJyb3JIYW5kbGVyKTtcbiAgZmFjYWRlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1lb3V0XCIsIGhhc0Vycm9ySGFuZGxlcik7XG4gIGZhY2FkZS5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgaGFzRXJyb3JIYW5kbGVyKTtcbiAgLy8gcHJvZ3Jlc3MgbWVhbnMgd2UncmUgY3VycmVudCBkb3dubG9hZGluZy4uLlxuICBmYWNhZGUuYWRkRXZlbnRMaXN0ZW5lcihcInByb2dyZXNzXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmIChjdXJyZW50U3RhdGUgPCAzKSB7XG4gICAgICBzZXRSZWFkeVN0YXRlKDMpO1xuICAgIH0gZWxzZSBpZiAoeGhyLnJlYWR5U3RhdGUgPD0gMykge1xuICAgICAgLy91bnRpbCByZWFkeSAoNCksIGVhY2ggcHJvZ3Jlc3MgZXZlbnQgaXMgZm9sbG93ZWQgYnkgcmVhZHlzdGF0ZWNoYW5nZS4uLlxuICAgICAgZmFjYWRlLmRpc3BhdGNoRXZlbnQoXCJyZWFkeXN0YXRlY2hhbmdlXCIsIHt9KTsgLy9UT0RPIGZha2UgYW4gWEhSIGV2ZW50XG4gICAgfVxuICB9KTtcblxuICAvLyBpbml0aWFsaXNlICd3aXRoQ3JlZGVudGlhbHMnIG9uIGZhY2FkZSB4aHIgaW4gYnJvd3NlcnMgd2l0aCBpdFxuICAvLyBvciBpZiBleHBsaWNpdGx5IHRvbGQgdG8gZG8gc29cbiAgaWYgKFwid2l0aENyZWRlbnRpYWxzXCIgaW4geGhyKSB7XG4gICAgZmFjYWRlLndpdGhDcmVkZW50aWFscyA9IGZhbHNlO1xuICB9XG4gIGZhY2FkZS5zdGF0dXMgPSAwO1xuXG4gIC8vIGluaXRpYWxpc2UgYWxsIHBvc3NpYmxlIGV2ZW50IGhhbmRsZXJzXG4gIGZvciAobGV0IGV2ZW50IG9mIEFycmF5LmZyb20oQ09NTU9OX0VWRU5UUy5jb25jYXQoVVBMT0FEX0VWRU5UUykpKSB7XG4gICAgZmFjYWRlW2BvbiR7ZXZlbnR9YF0gPSBudWxsO1xuICB9XG5cbiAgZmFjYWRlLm9wZW4gPSBmdW5jdGlvbiAobWV0aG9kLCB1cmwsIGFzeW5jLCB1c2VyLCBwYXNzKSB7XG4gICAgLy8gSW5pdGFpbGl6ZSBlbXB0eSBYSFIgZmFjYWRlXG4gICAgY3VycmVudFN0YXRlID0gMDtcbiAgICBoYXNFcnJvciA9IGZhbHNlO1xuICAgIHRyYW5zaXRpbmcgPSBmYWxzZTtcbiAgICAvL3Jlc2V0IHJlcXVlc3RcbiAgICByZXF1ZXN0LmhlYWRlcnMgPSB7fTtcbiAgICByZXF1ZXN0LmhlYWRlck5hbWVzID0ge307XG4gICAgcmVxdWVzdC5zdGF0dXMgPSAwO1xuICAgIHJlcXVlc3QubWV0aG9kID0gbWV0aG9kO1xuICAgIHJlcXVlc3QudXJsID0gdXJsO1xuICAgIHJlcXVlc3QuYXN5bmMgPSBhc3luYyAhPT0gZmFsc2U7XG4gICAgcmVxdWVzdC51c2VyID0gdXNlcjtcbiAgICByZXF1ZXN0LnBhc3MgPSBwYXNzO1xuICAgIC8vcmVzZXQgcmVzcG9uc2VcbiAgICByZXNwb25zZSA9IHt9O1xuICAgIHJlc3BvbnNlLmhlYWRlcnMgPSB7fTtcbiAgICAvLyBvcGVubmVkIGZhY2FkZSB4aHIgKG5vdCByZWFsIHhocilcbiAgICBzZXRSZWFkeVN0YXRlKDEpO1xuICB9O1xuXG4gIGZhY2FkZS5zZW5kID0gZnVuY3Rpb24gKGJvZHkpIHtcbiAgICAvL3JlYWQgeGhyIHNldHRpbmdzIGJlZm9yZSBob29raW5nXG4gICAgbGV0IGssIG1vZGs7XG4gICAgZm9yIChrIG9mIFtcInR5cGVcIiwgXCJ0aW1lb3V0XCIsIFwid2l0aENyZWRlbnRpYWxzXCJdKSB7XG4gICAgICBtb2RrID0gayA9PT0gXCJ0eXBlXCIgPyBcInJlc3BvbnNlVHlwZVwiIDogaztcbiAgICAgIGlmIChtb2RrIGluIGZhY2FkZSkge1xuICAgICAgICByZXF1ZXN0W2tdID0gZmFjYWRlW21vZGtdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlcXVlc3QuYm9keSA9IGJvZHk7XG4gICAgY29uc3Qgc2VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vcHJveHkgYWxsIGV2ZW50cyBmcm9tIHJlYWwgeGhyIHRvIGZhY2FkZVxuICAgICAgcHJveHlFdmVudHMoQ09NTU9OX0VWRU5UUywgeGhyLCBmYWNhZGUpO1xuICAgICAgLy9wcm94eSBhbGwgdXBsb2FkIGV2ZW50cyBmcm9tIHRoZSByZWFsIHRvIHRoZSB1cGxvYWQgZmFjYWRlXG4gICAgICBpZiAoZmFjYWRlLnVwbG9hZCkge1xuICAgICAgICBwcm94eUV2ZW50cyhcbiAgICAgICAgICBDT01NT05fRVZFTlRTLmNvbmNhdChVUExPQURfRVZFTlRTKSxcbiAgICAgICAgICB4aHIudXBsb2FkLFxuICAgICAgICAgIGZhY2FkZS51cGxvYWRcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy9wcmVwYXJlIHJlcXVlc3QgYWxsIGF0IG9uY2VcbiAgICAgIHRyYW5zaXRpbmcgPSB0cnVlO1xuICAgICAgLy9wZXJmb3JtIG9wZW5cbiAgICAgIHhoci5vcGVuKFxuICAgICAgICByZXF1ZXN0Lm1ldGhvZCxcbiAgICAgICAgcmVxdWVzdC51cmwsXG4gICAgICAgIHJlcXVlc3QuYXN5bmMsXG4gICAgICAgIHJlcXVlc3QudXNlcixcbiAgICAgICAgcmVxdWVzdC5wYXNzXG4gICAgICApO1xuXG4gICAgICAvL3dyaXRlIHhociBzZXR0aW5nc1xuICAgICAgZm9yIChrIG9mIFtcInR5cGVcIiwgXCJ0aW1lb3V0XCIsIFwid2l0aENyZWRlbnRpYWxzXCJdKSB7XG4gICAgICAgIG1vZGsgPSBrID09PSBcInR5cGVcIiA/IFwicmVzcG9uc2VUeXBlXCIgOiBrO1xuICAgICAgICBpZiAoayBpbiByZXF1ZXN0KSB7XG4gICAgICAgICAgeGhyW21vZGtdID0gcmVxdWVzdFtrXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvL2luc2VydCBoZWFkZXJzXG4gICAgICBmb3IgKGxldCBoZWFkZXIgaW4gcmVxdWVzdC5oZWFkZXJzKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcmVxdWVzdC5oZWFkZXJzW2hlYWRlcl07XG4gICAgICAgIGlmIChoZWFkZXIpIHtcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy9yZWFsIHNlbmQhXG4gICAgICB4aHIuc2VuZChyZXF1ZXN0LmJvZHkpO1xuICAgIH07XG5cbiAgICBjb25zdCBiZWZvcmVIb29rcyA9IGhvb2tzLmxpc3RlbmVycyhcImJlZm9yZVwiKTtcbiAgICAvL3Byb2Nlc3MgYmVmb3JlSG9va3Mgc2VxdWVudGlhbGx5XG4gICAgdmFyIHByb2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIWJlZm9yZUhvb2tzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gc2VuZCgpO1xuICAgICAgfVxuICAgICAgLy9nbyB0byBuZXh0IGhvb2sgT1Igb3B0aW9uYWxseSBwcm92aWRlIHJlc3BvbnNlXG4gICAgICBjb25zdCBkb25lID0gZnVuY3Rpb24gKHVzZXJSZXNwb25zZSkge1xuICAgICAgICAvL2JyZWFrIGNoYWluIC0gcHJvdmlkZSBkdW1teSByZXNwb25zZSAocmVhZHlTdGF0ZSA0KVxuICAgICAgICBpZiAoXG4gICAgICAgICAgdHlwZW9mIHVzZXJSZXNwb25zZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICh0eXBlb2YgdXNlclJlc3BvbnNlLnN0YXR1cyA9PT0gXCJudW1iZXJcIiB8fFxuICAgICAgICAgICAgdHlwZW9mIHJlc3BvbnNlLnN0YXR1cyA9PT0gXCJudW1iZXJcIilcbiAgICAgICAgKSB7XG4gICAgICAgICAgbWVyZ2VPYmplY3RzKHVzZXJSZXNwb25zZSwgcmVzcG9uc2UpO1xuICAgICAgICAgIGlmICghKFwiZGF0YVwiIGluIHVzZXJSZXNwb25zZSkpIHtcbiAgICAgICAgICAgIHVzZXJSZXNwb25zZS5kYXRhID0gdXNlclJlc3BvbnNlLnJlc3BvbnNlIHx8IHVzZXJSZXNwb25zZS50ZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRSZWFkeVN0YXRlKDQpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvL2NvbnRpbnVlIHByb2Nlc3NpbmcgdW50aWwgbm8gYmVmb3JlSG9va3MgbGVmdFxuICAgICAgICBwcm9jZXNzKCk7XG4gICAgICB9O1xuICAgICAgLy9zcGVjaWZpY2FsbHkgcHJvdmlkZSBoZWFkZXJzIChyZWFkeVN0YXRlIDIpXG4gICAgICBkb25lLmhlYWQgPSBmdW5jdGlvbiAodXNlclJlc3BvbnNlKSB7XG4gICAgICAgIG1lcmdlT2JqZWN0cyh1c2VyUmVzcG9uc2UsIHJlc3BvbnNlKTtcbiAgICAgICAgc2V0UmVhZHlTdGF0ZSgyKTtcbiAgICAgIH07XG4gICAgICAvL3NwZWNpZmljYWxseSBwcm92aWRlIHBhcnRpYWwgdGV4dCAocmVzcG9uc2VUZXh0ICByZWFkeVN0YXRlIDMpXG4gICAgICBkb25lLnByb2dyZXNzID0gZnVuY3Rpb24gKHVzZXJSZXNwb25zZSkge1xuICAgICAgICBtZXJnZU9iamVjdHModXNlclJlc3BvbnNlLCByZXNwb25zZSk7XG4gICAgICAgIHNldFJlYWR5U3RhdGUoMyk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBob29rID0gYmVmb3JlSG9va3Muc2hpZnQoKTtcbiAgICAgIC8vYXN5bmMgb3Igc3luYz9cbiAgICAgIGlmIChob29rLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBkb25lKGhvb2socmVxdWVzdCkpO1xuICAgICAgfSBlbHNlIGlmIChob29rLmxlbmd0aCA9PT0gMiAmJiByZXF1ZXN0LmFzeW5jKSB7XG4gICAgICAgIC8vYXN5bmMgaGFuZGxlcnMgbXVzdCB1c2UgYW4gYXN5bmMgeGhyXG4gICAgICAgIGhvb2socmVxdWVzdCwgZG9uZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL3NraXAgYXN5bmMgaG9vayBvbiBzeW5jIHJlcXVlc3RzXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8va2ljayBvZmZcbiAgICBwcm9jZXNzKCk7XG4gIH07XG5cbiAgZmFjYWRlLmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgIHN0YXR1cyA9IEFCT1JURUQ7XG4gICAgaWYgKHRyYW5zaXRpbmcpIHtcbiAgICAgIHhoci5hYm9ydCgpOyAvL3RoaXMgd2lsbCBlbWl0IGFuICdhYm9ydCcgZm9yIHVzXG4gICAgfSBlbHNlIHtcbiAgICAgIGZhY2FkZS5kaXNwYXRjaEV2ZW50KFwiYWJvcnRcIiwge30pO1xuICAgIH1cbiAgfTtcblxuICBmYWNhZGUuc2V0UmVxdWVzdEhlYWRlciA9IGZ1bmN0aW9uIChoZWFkZXIsIHZhbHVlKSB7XG4gICAgLy90aGUgZmlyc3QgaGVhZGVyIHNldCBpcyB1c2VkIGZvciBhbGwgZnV0dXJlIGNhc2UtYWx0ZXJuYXRpdmVzIG9mICduYW1lJ1xuICAgIGNvbnN0IGxOYW1lID0gaGVhZGVyICE9IG51bGwgPyBoZWFkZXIudG9Mb3dlckNhc2UoKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBuYW1lID0gKHJlcXVlc3QuaGVhZGVyTmFtZXNbbE5hbWVdID1cbiAgICAgIHJlcXVlc3QuaGVhZGVyTmFtZXNbbE5hbWVdIHx8IGhlYWRlcik7XG4gICAgLy9hcHBlbmQgaGVhZGVyIHRvIGFueSBwcmV2aW91cyB2YWx1ZXNcbiAgICBpZiAocmVxdWVzdC5oZWFkZXJzW25hbWVdKSB7XG4gICAgICB2YWx1ZSA9IHJlcXVlc3QuaGVhZGVyc1tuYW1lXSArIFwiLCBcIiArIHZhbHVlO1xuICAgIH1cbiAgICByZXF1ZXN0LmhlYWRlcnNbbmFtZV0gPSB2YWx1ZTtcbiAgfTtcbiAgZmFjYWRlLmdldFJlc3BvbnNlSGVhZGVyID0gaGVhZGVyID0+XG4gICAgbnVsbGlmeShyZXNwb25zZS5oZWFkZXJzW2hlYWRlciA/IGhlYWRlci50b0xvd2VyQ2FzZSgpIDogdW5kZWZpbmVkXSk7XG5cbiAgZmFjYWRlLmdldEFsbFJlc3BvbnNlSGVhZGVycyA9ICgpID0+XG4gICAgbnVsbGlmeShoZWFkZXJzLmNvbnZlcnQocmVzcG9uc2UuaGVhZGVycykpO1xuXG4gIC8vcHJveHkgY2FsbCBvbmx5IHdoZW4gc3VwcG9ydGVkXG4gIGlmICh4aHIub3ZlcnJpZGVNaW1lVHlwZSkge1xuICAgIGZhY2FkZS5vdmVycmlkZU1pbWVUeXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgeGhyLm92ZXJyaWRlTWltZVR5cGUuYXBwbHkoeGhyLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICAvL2NyZWF0ZSBlbWl0dGVyIHdoZW4gc3VwcG9ydGVkXG4gIGlmICh4aHIudXBsb2FkKSB7XG4gICAgbGV0IHVwID0gRXZlbnRFbWl0dGVyKCk7XG4gICAgZmFjYWRlLnVwbG9hZCA9IHVwO1xuICAgIHJlcXVlc3QudXBsb2FkID0gdXA7XG4gIH1cblxuICBmYWNhZGUuVU5TRU5UID0gMDtcbiAgZmFjYWRlLk9QRU5FRCA9IDE7XG4gIGZhY2FkZS5IRUFERVJTX1JFQ0VJVkVEID0gMjtcbiAgZmFjYWRlLkxPQURJTkcgPSAzO1xuICBmYWNhZGUuRE9ORSA9IDQ7XG5cbiAgLy8gZmlsbCBpbiBkZWZhdWx0IHZhbHVlcyBmb3IgYW4gZW1wdHkgWEhSIG9iamVjdCBhY2NvcmRpbmcgdG8gdGhlIHNwZWNcbiAgZmFjYWRlLnJlc3BvbnNlID0gXCJcIjtcbiAgZmFjYWRlLnJlc3BvbnNlVGV4dCA9IFwiXCI7XG4gIGZhY2FkZS5yZXNwb25zZVhNTCA9IG51bGw7XG4gIGZhY2FkZS5yZWFkeVN0YXRlID0gMDtcbiAgZmFjYWRlLnN0YXR1c1RleHQgPSBcIlwiO1xuXG4gIHJldHVybiBmYWNhZGU7XG59O1xuXG5YaG9vayQxLlVOU0VOVCA9IDA7XG5YaG9vayQxLk9QRU5FRCA9IDE7XG5YaG9vayQxLkhFQURFUlNfUkVDRUlWRUQgPSAyO1xuWGhvb2skMS5MT0FESU5HID0gMztcblhob29rJDEuRE9ORSA9IDQ7XG5cbi8vcGF0Y2ggaW50ZXJmYWNlXG52YXIgWE1MSHR0cFJlcXVlc3QgPSB7XG4gIHBhdGNoKCkge1xuICAgIGlmIChOYXRpdmUkMSkge1xuICAgICAgd2luZG93UmVmLlhNTEh0dHBSZXF1ZXN0ID0gWGhvb2skMTtcbiAgICB9XG4gIH0sXG4gIHVucGF0Y2goKSB7XG4gICAgaWYgKE5hdGl2ZSQxKSB7XG4gICAgICB3aW5kb3dSZWYuWE1MSHR0cFJlcXVlc3QgPSBOYXRpdmUkMTtcbiAgICB9XG4gIH0sXG4gIE5hdGl2ZTogTmF0aXZlJDEsXG4gIFhob29rOiBYaG9vayQxLFxufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG5mdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cblxuLy9icm93c2VyJ3MgZmV0Y2hcbmNvbnN0IE5hdGl2ZSA9IHdpbmRvd1JlZi5mZXRjaDtcbmZ1bmN0aW9uIGNvcHlUb09iakZyb21SZXF1ZXN0KHJlcSkge1xuICAgIGNvbnN0IGNvcHllZEtleXMgPSBbXG4gICAgICAgIFwibWV0aG9kXCIsXG4gICAgICAgIFwiaGVhZGVyc1wiLFxuICAgICAgICBcImJvZHlcIixcbiAgICAgICAgXCJtb2RlXCIsXG4gICAgICAgIFwiY3JlZGVudGlhbHNcIixcbiAgICAgICAgXCJjYWNoZVwiLFxuICAgICAgICBcInJlZGlyZWN0XCIsXG4gICAgICAgIFwicmVmZXJyZXJcIixcbiAgICAgICAgXCJyZWZlcnJlclBvbGljeVwiLFxuICAgICAgICBcImludGVncml0eVwiLFxuICAgICAgICBcImtlZXBhbGl2ZVwiLFxuICAgICAgICBcInNpZ25hbFwiLFxuICAgICAgICBcInVybFwiLFxuICAgIF07XG4gICAgbGV0IGNvcHllZE9iaiA9IHt9O1xuICAgIGNvcHllZEtleXMuZm9yRWFjaChrZXkgPT4gKGNvcHllZE9ialtrZXldID0gcmVxW2tleV0pKTtcbiAgICByZXR1cm4gY29weWVkT2JqO1xufVxuZnVuY3Rpb24gY292ZXJ0SGVhZGVyVG9QbGFpbk9iaihoZWFkZXJzKSB7XG4gICAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBjb3ZlcnRUREFhcnJ5VG9PYmooWy4uLmhlYWRlcnMuZW50cmllcygpXSk7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XG4gICAgICAgIHJldHVybiBjb3ZlcnRUREFhcnJ5VG9PYmooaGVhZGVycyk7XG4gICAgfVxuICAgIHJldHVybiBoZWFkZXJzO1xufVxuZnVuY3Rpb24gY292ZXJ0VERBYXJyeVRvT2JqKGlucHV0KSB7XG4gICAgcmV0dXJuIGlucHV0LnJlZHVjZSgocHJldiwgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIHByZXZba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gcHJldjtcbiAgICB9LCB7fSk7XG59XG4vKipcbiAqIGlmIGZldGNoKGhhY2tlZCBieSBYaG9vaykgYWNjZXB0IGEgUmVxdWVzdCBhcyBhIGZpcnN0IHBhcmFtZXRlciwgaXQgd2lsbCBiZSBkZXN0cmN1dGVkIHRvIGEgcGxhaW4gb2JqZWN0LlxuICogRmluYWxseSB0aGUgd2hvbGUgbmV0d29yayByZXF1ZXN0IHdhcyBjb252ZXJ0IHRvIGZlY3RjaChSZXF1ZXN0LnVybCwgb3RoZXIgb3B0aW9ucylcbiAqL1xuY29uc3QgWGhvb2sgPSBmdW5jdGlvbiAoaW5wdXQsIGluaXQgPSB7IGhlYWRlcnM6IHt9IH0pIHtcbiAgICBsZXQgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgaW5pdCksIHsgaXNGZXRjaDogdHJ1ZSB9KTtcbiAgICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBSZXF1ZXN0KSB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RPYmogPSBjb3B5VG9PYmpGcm9tUmVxdWVzdChpbnB1dCk7XG4gICAgICAgIGNvbnN0IHByZXZIZWFkZXJzID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBjb3ZlcnRIZWFkZXJUb1BsYWluT2JqKHJlcXVlc3RPYmouaGVhZGVycykpLCBjb3ZlcnRIZWFkZXJUb1BsYWluT2JqKG9wdGlvbnMuaGVhZGVycykpO1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHJlcXVlc3RPYmopLCBpbml0KSwgeyBoZWFkZXJzOiBwcmV2SGVhZGVycywgYWNjZXB0ZWRSZXF1ZXN0OiB0cnVlIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgb3B0aW9ucy51cmwgPSBpbnB1dDtcbiAgICB9XG4gICAgY29uc3QgYmVmb3JlSG9va3MgPSBob29rcy5saXN0ZW5lcnMoXCJiZWZvcmVcIik7XG4gICAgY29uc3QgYWZ0ZXJIb29rcyA9IGhvb2tzLmxpc3RlbmVycyhcImFmdGVyXCIpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGxldCBmdWxsZmlsZWQgPSByZXNvbHZlO1xuICAgICAgICBjb25zdCBwcm9jZXNzQWZ0ZXIgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmICghYWZ0ZXJIb29rcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVsbGZpbGVkKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGhvb2sgPSBhZnRlckhvb2tzLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoaG9vay5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICBob29rKG9wdGlvbnMsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc0FmdGVyKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGhvb2subGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvb2sob3B0aW9ucywgcmVzcG9uc2UsIHByb2Nlc3NBZnRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc0FmdGVyKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZG9uZSA9IGZ1bmN0aW9uICh1c2VyUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmICh1c2VyUmVzcG9uc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKHVzZXJSZXNwb25zZS5ib2R5IHx8IHVzZXJSZXNwb25zZS50ZXh0LCB1c2VyUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NBZnRlcihyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9jb250aW51ZSBwcm9jZXNzaW5nIHVudGlsIG5vIGhvb2tzIGxlZnRcbiAgICAgICAgICAgIHByb2Nlc3NCZWZvcmUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcHJvY2Vzc0JlZm9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghYmVmb3JlSG9va3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc2VuZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGhvb2sgPSBiZWZvcmVIb29rcy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKGhvb2subGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbmUoaG9vayhvcHRpb25zKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChob29rLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBob29rKG9wdGlvbnMsIGRvbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzZW5kID0gKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgeyB1cmwsIGlzRmV0Y2gsIGFjY2VwdGVkUmVxdWVzdCB9ID0gb3B0aW9ucywgcmVzdEluaXQgPSBfX3Jlc3Qob3B0aW9ucywgW1widXJsXCIsIFwiaXNGZXRjaFwiLCBcImFjY2VwdGVkUmVxdWVzdFwiXSk7XG4gICAgICAgICAgICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBSZXF1ZXN0ICYmIHJlc3RJbml0LmJvZHkgaW5zdGFuY2VvZiBSZWFkYWJsZVN0cmVhbSkge1xuICAgICAgICAgICAgICAgIHJlc3RJbml0LmJvZHkgPSB5aWVsZCBuZXcgUmVzcG9uc2UocmVzdEluaXQuYm9keSkudGV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIE5hdGl2ZSh1cmwsIHJlc3RJbml0KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHByb2Nlc3NBZnRlcihyZXNwb25zZSkpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBmdWxsZmlsZWQgPSByZWplY3Q7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc0FmdGVyKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBwcm9jZXNzQmVmb3JlKCk7XG4gICAgfSk7XG59O1xuLy9wYXRjaCBpbnRlcmZhY2VcbnZhciBmZXRjaCA9IHtcbiAgICBwYXRjaCgpIHtcbiAgICAgICAgaWYgKE5hdGl2ZSkge1xuICAgICAgICAgICAgd2luZG93UmVmLmZldGNoID0gWGhvb2s7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHVucGF0Y2goKSB7XG4gICAgICAgIGlmIChOYXRpdmUpIHtcbiAgICAgICAgICAgIHdpbmRvd1JlZi5mZXRjaCA9IE5hdGl2ZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgTmF0aXZlLFxuICAgIFhob29rLFxufTtcblxuLy90aGUgZ2xvYmFsIGhvb2tzIGV2ZW50IGVtaXR0ZXIgaXMgYWxzbyB0aGUgZ2xvYmFsIHhob29rIG9iamVjdFxuLy8obm90IHRoZSBiZXN0IGRlY2lzaW9uIGluIGhpbmRzaWdodClcbmNvbnN0IHhob29rID0gaG9va3M7XG54aG9vay5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG4vL21vZGlmeSBob29rc1xueGhvb2suYmVmb3JlID0gZnVuY3Rpb24gKGhhbmRsZXIsIGkpIHtcbiAgaWYgKGhhbmRsZXIubGVuZ3RoIDwgMSB8fCBoYW5kbGVyLmxlbmd0aCA+IDIpIHtcbiAgICB0aHJvdyBcImludmFsaWQgaG9va1wiO1xuICB9XG4gIHJldHVybiB4aG9vay5vbihcImJlZm9yZVwiLCBoYW5kbGVyLCBpKTtcbn07XG54aG9vay5hZnRlciA9IGZ1bmN0aW9uIChoYW5kbGVyLCBpKSB7XG4gIGlmIChoYW5kbGVyLmxlbmd0aCA8IDIgfHwgaGFuZGxlci5sZW5ndGggPiAzKSB7XG4gICAgdGhyb3cgXCJpbnZhbGlkIGhvb2tcIjtcbiAgfVxuICByZXR1cm4geGhvb2sub24oXCJhZnRlclwiLCBoYW5kbGVyLCBpKTtcbn07XG5cbi8vZ2xvYmFsbHkgZW5hYmxlL2Rpc2FibGVcbnhob29rLmVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgWE1MSHR0cFJlcXVlc3QucGF0Y2goKTtcbiAgZmV0Y2gucGF0Y2goKTtcbn07XG54aG9vay5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICBYTUxIdHRwUmVxdWVzdC51bnBhdGNoKCk7XG4gIGZldGNoLnVucGF0Y2goKTtcbn07XG4vL2V4cG9zZSBuYXRpdmUgb2JqZWN0c1xueGhvb2suWE1MSHR0cFJlcXVlc3QgPSBYTUxIdHRwUmVxdWVzdC5OYXRpdmU7XG54aG9vay5mZXRjaCA9IGZldGNoLk5hdGl2ZTtcblxuLy9leHBvc2UgaGVscGVyc1xueGhvb2suaGVhZGVycyA9IGhlYWRlcnMuY29udmVydDtcblxuLy9lbmFibGUgYnkgZGVmYXVsdFxueGhvb2suZW5hYmxlKCk7XG5cbmV4cG9ydCB7IHhob29rIGFzIGRlZmF1bHQgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmplY3QudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=