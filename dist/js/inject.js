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
const messageService_1 = __webpack_require__(/*! ./panel/App/service/messageService */ "./src/panel/App/service/messageService.ts");
const messageBus = new messageBus_1.default();
const messageIdFactory = new idFactory_1.default();
const logIdFactory = new idFactory_1.default();
messageService_1.messageService.listen("HOOK", (data) => {
    messageBus.dispatch(data.id, data.message);
});
console.log("HOOK INJECTED");
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
    messageService_1.messageService.send(messageObject);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLHVCQUF1QixFQUFFO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGtCQUFrQixtQkFBbUI7QUFDckM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLGlCQUFpQixvQkFBb0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0ZhO0FBQ2Isd0JBQXdCLG1CQUFPLENBQUMsb0VBQW1CO0FBQ25ELHdCQUF3QixtQkFBTyxDQUFDLDBFQUFzQjtBQUN0RCxxQkFBcUIsbUJBQU8sQ0FBQyw4REFBZ0I7O0FBRTdDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0EsRUFBRTtBQUNGOztBQUVBLGVB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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsaURBQWlELEdBQUc7QUFDcEQ7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsTUFBTTtBQUNOLHNDQUFzQztBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELGNBQWM7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxJQUFJO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxhQUFhO0FBQ3JELGdEQUFnRCxXQUFXLGVBQWU7QUFDMUU7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRCw4REFBOEQsd0JBQXdCLDZDQUE2QztBQUNuSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZ0NBQWdDO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFNEI7Ozs7Ozs7VUM3eUI1QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL01va2t1Ly4vbm9kZV9tb2R1bGVzL2RlY29kZS11cmktY29tcG9uZW50L2luZGV4LmpzIiwid2VicGFjazovL01va2t1Ly4vbm9kZV9tb2R1bGVzL3F1ZXJ5LXN0cmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9Nb2trdS8uL25vZGVfbW9kdWxlcy9zcGxpdC1vbi1maXJzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9Nb2trdS8uL25vZGVfbW9kdWxlcy9zdHJpY3QtdXJpLWVuY29kZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9Nb2trdS8uL3NyYy9pbmplY3QudHMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9zcmMvcGFuZWwvQXBwL3NlcnZpY2UvbWVzc2FnZVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9zcmMvc2VydmljZXMvaGVscGVyLnRzIiwid2VicGFjazovL01va2t1Ly4vc3JjL3NlcnZpY2VzL2lkRmFjdG9yeS50cyIsIndlYnBhY2s6Ly9Nb2trdS8uL3NyYy9zZXJ2aWNlcy9tZXNzYWdlL21lc3NhZ2VCdXMudHMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9ub2RlX21vZHVsZXMveGhvb2svZXMvbWFpbi5qcyIsIndlYnBhY2s6Ly9Nb2trdS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Nb2trdS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vTW9ra3Uvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9Nb2trdS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL01va2t1L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vTW9ra3Uvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9Nb2trdS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vTW9ra3Uvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbnZhciB0b2tlbiA9ICclW2EtZjAtOV17Mn0nO1xudmFyIHNpbmdsZU1hdGNoZXIgPSBuZXcgUmVnRXhwKHRva2VuLCAnZ2knKTtcbnZhciBtdWx0aU1hdGNoZXIgPSBuZXcgUmVnRXhwKCcoJyArIHRva2VuICsgJykrJywgJ2dpJyk7XG5cbmZ1bmN0aW9uIGRlY29kZUNvbXBvbmVudHMoY29tcG9uZW50cywgc3BsaXQpIHtcblx0dHJ5IHtcblx0XHQvLyBUcnkgdG8gZGVjb2RlIHRoZSBlbnRpcmUgc3RyaW5nIGZpcnN0XG5cdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChjb21wb25lbnRzLmpvaW4oJycpKTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gRG8gbm90aGluZ1xuXHR9XG5cblx0aWYgKGNvbXBvbmVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0cmV0dXJuIGNvbXBvbmVudHM7XG5cdH1cblxuXHRzcGxpdCA9IHNwbGl0IHx8IDE7XG5cblx0Ly8gU3BsaXQgdGhlIGFycmF5IGluIDIgcGFydHNcblx0dmFyIGxlZnQgPSBjb21wb25lbnRzLnNsaWNlKDAsIHNwbGl0KTtcblx0dmFyIHJpZ2h0ID0gY29tcG9uZW50cy5zbGljZShzcGxpdCk7XG5cblx0cmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuY2FsbChbXSwgZGVjb2RlQ29tcG9uZW50cyhsZWZ0KSwgZGVjb2RlQ29tcG9uZW50cyhyaWdodCkpO1xufVxuXG5mdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGlucHV0KTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0dmFyIHRva2VucyA9IGlucHV0Lm1hdGNoKHNpbmdsZU1hdGNoZXIpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDE7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlucHV0ID0gZGVjb2RlQ29tcG9uZW50cyh0b2tlbnMsIGkpLmpvaW4oJycpO1xuXG5cdFx0XHR0b2tlbnMgPSBpbnB1dC5tYXRjaChzaW5nbGVNYXRjaGVyKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gaW5wdXQ7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3VzdG9tRGVjb2RlVVJJQ29tcG9uZW50KGlucHV0KSB7XG5cdC8vIEtlZXAgdHJhY2sgb2YgYWxsIHRoZSByZXBsYWNlbWVudHMgYW5kIHByZWZpbGwgdGhlIG1hcCB3aXRoIHRoZSBgQk9NYFxuXHR2YXIgcmVwbGFjZU1hcCA9IHtcblx0XHQnJUZFJUZGJzogJ1xcdUZGRkRcXHVGRkZEJyxcblx0XHQnJUZGJUZFJzogJ1xcdUZGRkRcXHVGRkZEJ1xuXHR9O1xuXG5cdHZhciBtYXRjaCA9IG11bHRpTWF0Y2hlci5leGVjKGlucHV0KTtcblx0d2hpbGUgKG1hdGNoKSB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIERlY29kZSBhcyBiaWcgY2h1bmtzIGFzIHBvc3NpYmxlXG5cdFx0XHRyZXBsYWNlTWFwW21hdGNoWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFswXSk7XG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZGVjb2RlKG1hdGNoWzBdKTtcblxuXHRcdFx0aWYgKHJlc3VsdCAhPT0gbWF0Y2hbMF0pIHtcblx0XHRcdFx0cmVwbGFjZU1hcFttYXRjaFswXV0gPSByZXN1bHQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bWF0Y2ggPSBtdWx0aU1hdGNoZXIuZXhlYyhpbnB1dCk7XG5cdH1cblxuXHQvLyBBZGQgYCVDMmAgYXQgdGhlIGVuZCBvZiB0aGUgbWFwIHRvIG1ha2Ugc3VyZSBpdCBkb2VzIG5vdCByZXBsYWNlIHRoZSBjb21iaW5hdG9yIGJlZm9yZSBldmVyeXRoaW5nIGVsc2Vcblx0cmVwbGFjZU1hcFsnJUMyJ10gPSAnXFx1RkZGRCc7XG5cblx0dmFyIGVudHJpZXMgPSBPYmplY3Qua2V5cyhyZXBsYWNlTWFwKTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcblx0XHQvLyBSZXBsYWNlIGFsbCBkZWNvZGVkIGNvbXBvbmVudHNcblx0XHR2YXIga2V5ID0gZW50cmllc1tpXTtcblx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UobmV3IFJlZ0V4cChrZXksICdnJyksIHJlcGxhY2VNYXBba2V5XSk7XG5cdH1cblxuXHRyZXR1cm4gaW5wdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVuY29kZWRVUkkpIHtcblx0aWYgKHR5cGVvZiBlbmNvZGVkVVJJICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGBlbmNvZGVkVVJJYCB0byBiZSBvZiB0eXBlIGBzdHJpbmdgLCBnb3QgYCcgKyB0eXBlb2YgZW5jb2RlZFVSSSArICdgJyk7XG5cdH1cblxuXHR0cnkge1xuXHRcdGVuY29kZWRVUkkgPSBlbmNvZGVkVVJJLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuXG5cdFx0Ly8gVHJ5IHRoZSBidWlsdCBpbiBkZWNvZGVyIGZpcnN0XG5cdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlbmNvZGVkVVJJKTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gRmFsbGJhY2sgdG8gYSBtb3JlIGFkdmFuY2VkIGRlY29kZXJcblx0XHRyZXR1cm4gY3VzdG9tRGVjb2RlVVJJQ29tcG9uZW50KGVuY29kZWRVUkkpO1xuXHR9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3Qgc3RyaWN0VXJpRW5jb2RlID0gcmVxdWlyZSgnc3RyaWN0LXVyaS1lbmNvZGUnKTtcbmNvbnN0IGRlY29kZUNvbXBvbmVudCA9IHJlcXVpcmUoJ2RlY29kZS11cmktY29tcG9uZW50Jyk7XG5jb25zdCBzcGxpdE9uRmlyc3QgPSByZXF1aXJlKCdzcGxpdC1vbi1maXJzdCcpO1xuXG5jb25zdCBpc051bGxPclVuZGVmaW5lZCA9IHZhbHVlID0+IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGVuY29kZXJGb3JBcnJheUZvcm1hdChvcHRpb25zKSB7XG5cdHN3aXRjaCAob3B0aW9ucy5hcnJheUZvcm1hdCkge1xuXHRcdGNhc2UgJ2luZGV4Jzpcblx0XHRcdHJldHVybiBrZXkgPT4gKHJlc3VsdCwgdmFsdWUpID0+IHtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSByZXN1bHQubGVuZ3RoO1xuXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcE51bGwgJiYgdmFsdWUgPT09IG51bGwpIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcEVtcHR5U3RyaW5nICYmIHZhbHVlID09PSAnJylcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBbZW5jb2RlKGtleSwgb3B0aW9ucyksICdbJywgaW5kZXgsICddJ10uam9pbignJyldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0XHQuLi5yZXN1bHQsXG5cdFx0XHRcdFx0W2VuY29kZShrZXksIG9wdGlvbnMpLCAnWycsIGVuY29kZShpbmRleCwgb3B0aW9ucyksICddPScsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4oJycpXG5cdFx0XHRcdF07XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnYnJhY2tldCc6XG5cdFx0XHRyZXR1cm4ga2V5ID0+IChyZXN1bHQsIHZhbHVlKSA9PiB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcE51bGwgJiYgdmFsdWUgPT09IG51bGwpIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcEVtcHR5U3RyaW5nICYmIHZhbHVlID09PSAnJylcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBbZW5jb2RlKGtleSwgb3B0aW9ucyksICdbXSddLmpvaW4oJycpXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBbZW5jb2RlKGtleSwgb3B0aW9ucyksICdbXT0nLCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKCcnKV07XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnY29tbWEnOlxuXHRcdGNhc2UgJ3NlcGFyYXRvcic6XG5cdFx0XHRyZXR1cm4ga2V5ID0+IChyZXN1bHQsIHZhbHVlKSA9PiB7XG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHJldHVybiBbW2VuY29kZShrZXksIG9wdGlvbnMpLCAnPScsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4oJycpXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbW3Jlc3VsdCwgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbihvcHRpb25zLmFycmF5Rm9ybWF0U2VwYXJhdG9yKV07XG5cdFx0XHR9O1xuXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBrZXkgPT4gKHJlc3VsdCwgdmFsdWUpID0+IHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHZhbHVlID09PSB1bmRlZmluZWQgfHxcblx0XHRcdFx0XHQob3B0aW9ucy5za2lwTnVsbCAmJiB2YWx1ZSA9PT0gbnVsbCkgfHxcblx0XHRcdFx0XHQob3B0aW9ucy5za2lwRW1wdHlTdHJpbmcgJiYgdmFsdWUgPT09ICcnKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFsuLi5yZXN1bHQsIGVuY29kZShrZXksIG9wdGlvbnMpXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBbZW5jb2RlKGtleSwgb3B0aW9ucyksICc9JywgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbignJyldO1xuXHRcdFx0fTtcblx0fVxufVxuXG5mdW5jdGlvbiBwYXJzZXJGb3JBcnJheUZvcm1hdChvcHRpb25zKSB7XG5cdGxldCByZXN1bHQ7XG5cblx0c3dpdGNoIChvcHRpb25zLmFycmF5Rm9ybWF0KSB7XG5cdFx0Y2FzZSAnaW5kZXgnOlxuXHRcdFx0cmV0dXJuIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikgPT4ge1xuXHRcdFx0XHRyZXN1bHQgPSAvXFxbKFxcZCopXFxdJC8uZXhlYyhrZXkpO1xuXG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC9cXFtcXGQqXFxdJC8sICcnKTtcblxuXHRcdFx0XHRpZiAoIXJlc3VsdCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYWNjdW11bGF0b3Jba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHt9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XVtyZXN1bHRbMV1dID0gdmFsdWU7XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnYnJhY2tldCc6XG5cdFx0XHRyZXR1cm4gKGtleSwgdmFsdWUsIGFjY3VtdWxhdG9yKSA9PiB7XG5cdFx0XHRcdHJlc3VsdCA9IC8oXFxbXFxdKSQvLmV4ZWMoa2V5KTtcblx0XHRcdFx0a2V5ID0ga2V5LnJlcGxhY2UoL1xcW1xcXSQvLCAnJyk7XG5cblx0XHRcdFx0aWYgKCFyZXN1bHQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbdmFsdWVdO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbXS5jb25jYXQoYWNjdW11bGF0b3Jba2V5XSwgdmFsdWUpO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2NvbW1hJzpcblx0XHRjYXNlICdzZXBhcmF0b3InOlxuXHRcdFx0cmV0dXJuIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikgPT4ge1xuXHRcdFx0XHRjb25zdCBpc0FycmF5ID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5zcGxpdCgnJykuaW5kZXhPZihvcHRpb25zLmFycmF5Rm9ybWF0U2VwYXJhdG9yKSA+IC0xO1xuXHRcdFx0XHRjb25zdCBuZXdWYWx1ZSA9IGlzQXJyYXkgPyB2YWx1ZS5zcGxpdChvcHRpb25zLmFycmF5Rm9ybWF0U2VwYXJhdG9yKS5tYXAoaXRlbSA9PiBkZWNvZGUoaXRlbSwgb3B0aW9ucykpIDogdmFsdWUgPT09IG51bGwgPyB2YWx1ZSA6IGRlY29kZSh2YWx1ZSwgb3B0aW9ucyk7XG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBuZXdWYWx1ZTtcblx0XHRcdH07XG5cblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikgPT4ge1xuXHRcdFx0XHRpZiAoYWNjdW11bGF0b3Jba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbXS5jb25jYXQoYWNjdW11bGF0b3Jba2V5XSwgdmFsdWUpO1xuXHRcdFx0fTtcblx0fVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUFycmF5Rm9ybWF0U2VwYXJhdG9yKHZhbHVlKSB7XG5cdGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnIHx8IHZhbHVlLmxlbmd0aCAhPT0gMSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2FycmF5Rm9ybWF0U2VwYXJhdG9yIG11c3QgYmUgc2luZ2xlIGNoYXJhY3RlciBzdHJpbmcnKTtcblx0fVxufVxuXG5mdW5jdGlvbiBlbmNvZGUodmFsdWUsIG9wdGlvbnMpIHtcblx0aWYgKG9wdGlvbnMuZW5jb2RlKSB7XG5cdFx0cmV0dXJuIG9wdGlvbnMuc3RyaWN0ID8gc3RyaWN0VXJpRW5jb2RlKHZhbHVlKSA6IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGRlY29kZSh2YWx1ZSwgb3B0aW9ucykge1xuXHRpZiAob3B0aW9ucy5kZWNvZGUpIHtcblx0XHRyZXR1cm4gZGVjb2RlQ29tcG9uZW50KHZhbHVlKTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24ga2V5c1NvcnRlcihpbnB1dCkge1xuXHRpZiAoQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcblx0XHRyZXR1cm4gaW5wdXQuc29ydCgpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcpIHtcblx0XHRyZXR1cm4ga2V5c1NvcnRlcihPYmplY3Qua2V5cyhpbnB1dCkpXG5cdFx0XHQuc29ydCgoYSwgYikgPT4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpKVxuXHRcdFx0Lm1hcChrZXkgPT4gaW5wdXRba2V5XSk7XG5cdH1cblxuXHRyZXR1cm4gaW5wdXQ7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUhhc2goaW5wdXQpIHtcblx0Y29uc3QgaGFzaFN0YXJ0ID0gaW5wdXQuaW5kZXhPZignIycpO1xuXHRpZiAoaGFzaFN0YXJ0ICE9PSAtMSkge1xuXHRcdGlucHV0ID0gaW5wdXQuc2xpY2UoMCwgaGFzaFN0YXJ0KTtcblx0fVxuXG5cdHJldHVybiBpbnB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0SGFzaCh1cmwpIHtcblx0bGV0IGhhc2ggPSAnJztcblx0Y29uc3QgaGFzaFN0YXJ0ID0gdXJsLmluZGV4T2YoJyMnKTtcblx0aWYgKGhhc2hTdGFydCAhPT0gLTEpIHtcblx0XHRoYXNoID0gdXJsLnNsaWNlKGhhc2hTdGFydCk7XG5cdH1cblxuXHRyZXR1cm4gaGFzaDtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdChpbnB1dCkge1xuXHRpbnB1dCA9IHJlbW92ZUhhc2goaW5wdXQpO1xuXHRjb25zdCBxdWVyeVN0YXJ0ID0gaW5wdXQuaW5kZXhPZignPycpO1xuXHRpZiAocXVlcnlTdGFydCA9PT0gLTEpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRyZXR1cm4gaW5wdXQuc2xpY2UocXVlcnlTdGFydCArIDEpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVZhbHVlKHZhbHVlLCBvcHRpb25zKSB7XG5cdGlmIChvcHRpb25zLnBhcnNlTnVtYmVycyAmJiAhTnVtYmVyLmlzTmFOKE51bWJlcih2YWx1ZSkpICYmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLnRyaW0oKSAhPT0gJycpKSB7XG5cdFx0dmFsdWUgPSBOdW1iZXIodmFsdWUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMucGFyc2VCb29sZWFucyAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAodmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnIHx8IHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICdmYWxzZScpKSB7XG5cdFx0dmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSc7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHBhcnNlKGlucHV0LCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRkZWNvZGU6IHRydWUsXG5cdFx0c29ydDogdHJ1ZSxcblx0XHRhcnJheUZvcm1hdDogJ25vbmUnLFxuXHRcdGFycmF5Rm9ybWF0U2VwYXJhdG9yOiAnLCcsXG5cdFx0cGFyc2VOdW1iZXJzOiBmYWxzZSxcblx0XHRwYXJzZUJvb2xlYW5zOiBmYWxzZVxuXHR9LCBvcHRpb25zKTtcblxuXHR2YWxpZGF0ZUFycmF5Rm9ybWF0U2VwYXJhdG9yKG9wdGlvbnMuYXJyYXlGb3JtYXRTZXBhcmF0b3IpO1xuXG5cdGNvbnN0IGZvcm1hdHRlciA9IHBhcnNlckZvckFycmF5Rm9ybWF0KG9wdGlvbnMpO1xuXG5cdC8vIENyZWF0ZSBhbiBvYmplY3Qgd2l0aCBubyBwcm90b3R5cGVcblx0Y29uc3QgcmV0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuXHRpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRpbnB1dCA9IGlucHV0LnRyaW0oKS5yZXBsYWNlKC9eWz8jJl0vLCAnJyk7XG5cblx0aWYgKCFpbnB1dCkge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRmb3IgKGNvbnN0IHBhcmFtIG9mIGlucHV0LnNwbGl0KCcmJykpIHtcblx0XHRsZXQgW2tleSwgdmFsdWVdID0gc3BsaXRPbkZpcnN0KG9wdGlvbnMuZGVjb2RlID8gcGFyYW0ucmVwbGFjZSgvXFwrL2csICcgJykgOiBwYXJhbSwgJz0nKTtcblxuXHRcdC8vIE1pc3NpbmcgYD1gIHNob3VsZCBiZSBgbnVsbGA6XG5cdFx0Ly8gaHR0cDovL3czLm9yZy9UUi8yMDEyL1dELXVybC0yMDEyMDUyNC8jY29sbGVjdC11cmwtcGFyYW1ldGVyc1xuXHRcdHZhbHVlID0gdmFsdWUgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBbJ2NvbW1hJywgJ3NlcGFyYXRvciddLmluY2x1ZGVzKG9wdGlvbnMuYXJyYXlGb3JtYXQpID8gdmFsdWUgOiBkZWNvZGUodmFsdWUsIG9wdGlvbnMpO1xuXHRcdGZvcm1hdHRlcihkZWNvZGUoa2V5LCBvcHRpb25zKSwgdmFsdWUsIHJldCk7XG5cdH1cblxuXHRmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZXQpKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSByZXRba2V5XTtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuXHRcdFx0Zm9yIChjb25zdCBrIG9mIE9iamVjdC5rZXlzKHZhbHVlKSkge1xuXHRcdFx0XHR2YWx1ZVtrXSA9IHBhcnNlVmFsdWUodmFsdWVba10sIG9wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXRba2V5XSA9IHBhcnNlVmFsdWUodmFsdWUsIG9wdGlvbnMpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNvcnQgPT09IGZhbHNlKSB7XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXG5cdHJldHVybiAob3B0aW9ucy5zb3J0ID09PSB0cnVlID8gT2JqZWN0LmtleXMocmV0KS5zb3J0KCkgOiBPYmplY3Qua2V5cyhyZXQpLnNvcnQob3B0aW9ucy5zb3J0KSkucmVkdWNlKChyZXN1bHQsIGtleSkgPT4ge1xuXHRcdGNvbnN0IHZhbHVlID0gcmV0W2tleV07XG5cdFx0aWYgKEJvb2xlYW4odmFsdWUpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHQvLyBTb3J0IG9iamVjdCBrZXlzLCBub3QgdmFsdWVzXG5cdFx0XHRyZXN1bHRba2V5XSA9IGtleXNTb3J0ZXIodmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHRba2V5XSA9IHZhbHVlO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sIE9iamVjdC5jcmVhdGUobnVsbCkpO1xufVxuXG5leHBvcnRzLmV4dHJhY3QgPSBleHRyYWN0O1xuZXhwb3J0cy5wYXJzZSA9IHBhcnNlO1xuXG5leHBvcnRzLnN0cmluZ2lmeSA9IChvYmplY3QsIG9wdGlvbnMpID0+IHtcblx0aWYgKCFvYmplY3QpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0ZW5jb2RlOiB0cnVlLFxuXHRcdHN0cmljdDogdHJ1ZSxcblx0XHRhcnJheUZvcm1hdDogJ25vbmUnLFxuXHRcdGFycmF5Rm9ybWF0U2VwYXJhdG9yOiAnLCdcblx0fSwgb3B0aW9ucyk7XG5cblx0dmFsaWRhdGVBcnJheUZvcm1hdFNlcGFyYXRvcihvcHRpb25zLmFycmF5Rm9ybWF0U2VwYXJhdG9yKTtcblxuXHRjb25zdCBzaG91bGRGaWx0ZXIgPSBrZXkgPT4gKFxuXHRcdChvcHRpb25zLnNraXBOdWxsICYmIGlzTnVsbE9yVW5kZWZpbmVkKG9iamVjdFtrZXldKSkgfHxcblx0XHQob3B0aW9ucy5za2lwRW1wdHlTdHJpbmcgJiYgb2JqZWN0W2tleV0gPT09ICcnKVxuXHQpO1xuXG5cdGNvbnN0IGZvcm1hdHRlciA9IGVuY29kZXJGb3JBcnJheUZvcm1hdChvcHRpb25zKTtcblxuXHRjb25zdCBvYmplY3RDb3B5ID0ge307XG5cblx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqZWN0KSkge1xuXHRcdGlmICghc2hvdWxkRmlsdGVyKGtleSkpIHtcblx0XHRcdG9iamVjdENvcHlba2V5XSA9IG9iamVjdFtrZXldO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3RDb3B5KTtcblxuXHRpZiAob3B0aW9ucy5zb3J0ICE9PSBmYWxzZSkge1xuXHRcdGtleXMuc29ydChvcHRpb25zLnNvcnQpO1xuXHR9XG5cblx0cmV0dXJuIGtleXMubWFwKGtleSA9PiB7XG5cdFx0Y29uc3QgdmFsdWUgPSBvYmplY3Rba2V5XTtcblxuXHRcdGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXG5cdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gZW5jb2RlKGtleSwgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHRcdFx0LnJlZHVjZShmb3JtYXR0ZXIoa2V5KSwgW10pXG5cdFx0XHRcdC5qb2luKCcmJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGVuY29kZShrZXksIG9wdGlvbnMpICsgJz0nICsgZW5jb2RlKHZhbHVlLCBvcHRpb25zKTtcblx0fSkuZmlsdGVyKHggPT4geC5sZW5ndGggPiAwKS5qb2luKCcmJyk7XG59O1xuXG5leHBvcnRzLnBhcnNlVXJsID0gKGlucHV0LCBvcHRpb25zKSA9PiB7XG5cdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRkZWNvZGU6IHRydWVcblx0fSwgb3B0aW9ucyk7XG5cblx0Y29uc3QgW3VybCwgaGFzaF0gPSBzcGxpdE9uRmlyc3QoaW5wdXQsICcjJyk7XG5cblx0cmV0dXJuIE9iamVjdC5hc3NpZ24oXG5cdFx0e1xuXHRcdFx0dXJsOiB1cmwuc3BsaXQoJz8nKVswXSB8fCAnJyxcblx0XHRcdHF1ZXJ5OiBwYXJzZShleHRyYWN0KGlucHV0KSwgb3B0aW9ucylcblx0XHR9LFxuXHRcdG9wdGlvbnMgJiYgb3B0aW9ucy5wYXJzZUZyYWdtZW50SWRlbnRpZmllciAmJiBoYXNoID8ge2ZyYWdtZW50SWRlbnRpZmllcjogZGVjb2RlKGhhc2gsIG9wdGlvbnMpfSA6IHt9XG5cdCk7XG59O1xuXG5leHBvcnRzLnN0cmluZ2lmeVVybCA9IChpbnB1dCwgb3B0aW9ucykgPT4ge1xuXHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0ZW5jb2RlOiB0cnVlLFxuXHRcdHN0cmljdDogdHJ1ZVxuXHR9LCBvcHRpb25zKTtcblxuXHRjb25zdCB1cmwgPSByZW1vdmVIYXNoKGlucHV0LnVybCkuc3BsaXQoJz8nKVswXSB8fCAnJztcblx0Y29uc3QgcXVlcnlGcm9tVXJsID0gZXhwb3J0cy5leHRyYWN0KGlucHV0LnVybCk7XG5cdGNvbnN0IHBhcnNlZFF1ZXJ5RnJvbVVybCA9IGV4cG9ydHMucGFyc2UocXVlcnlGcm9tVXJsLCB7c29ydDogZmFsc2V9KTtcblxuXHRjb25zdCBxdWVyeSA9IE9iamVjdC5hc3NpZ24ocGFyc2VkUXVlcnlGcm9tVXJsLCBpbnB1dC5xdWVyeSk7XG5cdGxldCBxdWVyeVN0cmluZyA9IGV4cG9ydHMuc3RyaW5naWZ5KHF1ZXJ5LCBvcHRpb25zKTtcblx0aWYgKHF1ZXJ5U3RyaW5nKSB7XG5cdFx0cXVlcnlTdHJpbmcgPSBgPyR7cXVlcnlTdHJpbmd9YDtcblx0fVxuXG5cdGxldCBoYXNoID0gZ2V0SGFzaChpbnB1dC51cmwpO1xuXHRpZiAoaW5wdXQuZnJhZ21lbnRJZGVudGlmaWVyKSB7XG5cdFx0aGFzaCA9IGAjJHtlbmNvZGUoaW5wdXQuZnJhZ21lbnRJZGVudGlmaWVyLCBvcHRpb25zKX1gO1xuXHR9XG5cblx0cmV0dXJuIGAke3VybH0ke3F1ZXJ5U3RyaW5nfSR7aGFzaH1gO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAoc3RyaW5nLCBzZXBhcmF0b3IpID0+IHtcblx0aWYgKCEodHlwZW9mIHN0cmluZyA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHNlcGFyYXRvciA9PT0gJ3N0cmluZycpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIGFyZ3VtZW50cyB0byBiZSBvZiB0eXBlIGBzdHJpbmdgJyk7XG5cdH1cblxuXHRpZiAoc2VwYXJhdG9yID09PSAnJykge1xuXHRcdHJldHVybiBbc3RyaW5nXTtcblx0fVxuXG5cdGNvbnN0IHNlcGFyYXRvckluZGV4ID0gc3RyaW5nLmluZGV4T2Yoc2VwYXJhdG9yKTtcblxuXHRpZiAoc2VwYXJhdG9ySW5kZXggPT09IC0xKSB7XG5cdFx0cmV0dXJuIFtzdHJpbmddO1xuXHR9XG5cblx0cmV0dXJuIFtcblx0XHRzdHJpbmcuc2xpY2UoMCwgc2VwYXJhdG9ySW5kZXgpLFxuXHRcdHN0cmluZy5zbGljZShzZXBhcmF0b3JJbmRleCArIHNlcGFyYXRvci5sZW5ndGgpXG5cdF07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBzdHIgPT4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCkqXS9nLCB4ID0+IGAlJHt4LmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9YCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgeGhvb2tfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwieGhvb2tcIikpO1xuY29uc3QgcXVlcnlfc3RyaW5nXzEgPSByZXF1aXJlKFwicXVlcnktc3RyaW5nXCIpO1xuY29uc3QgaWRGYWN0b3J5XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc2VydmljZXMvaWRGYWN0b3J5XCIpKTtcbmNvbnN0IG1lc3NhZ2VCdXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zZXJ2aWNlcy9tZXNzYWdlL21lc3NhZ2VCdXNcIikpO1xuY29uc3QgaGVscGVyXzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlcy9oZWxwZXJcIik7XG5jb25zdCBtZXNzYWdlU2VydmljZV8xID0gcmVxdWlyZShcIi4vcGFuZWwvQXBwL3NlcnZpY2UvbWVzc2FnZVNlcnZpY2VcIik7XG5jb25zdCBtZXNzYWdlQnVzID0gbmV3IG1lc3NhZ2VCdXNfMS5kZWZhdWx0KCk7XG5jb25zdCBtZXNzYWdlSWRGYWN0b3J5ID0gbmV3IGlkRmFjdG9yeV8xLmRlZmF1bHQoKTtcbmNvbnN0IGxvZ0lkRmFjdG9yeSA9IG5ldyBpZEZhY3RvcnlfMS5kZWZhdWx0KCk7XG5tZXNzYWdlU2VydmljZV8xLm1lc3NhZ2VTZXJ2aWNlLmxpc3RlbihcIkhPT0tcIiwgKGRhdGEpID0+IHtcbiAgICBtZXNzYWdlQnVzLmRpc3BhdGNoKGRhdGEuaWQsIGRhdGEubWVzc2FnZSk7XG59KTtcbmNvbnNvbGUubG9nKFwiSE9PSyBJTkpFQ1RFRFwiKTtcbi8qKlxuICogUHJvbWlzaWZ5IHBvc3QgbWVzc2FnZSBmcm9tIHdpbmRvdyB0byB3aW5kb3dcbiAqIGFja1JlcXVpcmVkLCBpZiBmYWxzZSwgbm8gaWQgd2lsbCBiZSBhc3NpZ25lZCBoZW5jZSwgbm8gbWV0aG9kIHdpbGwgYmUgYWRkZWQgaW4gbWVzc2FnZVxuICogbWVzc2FnZSBpZCB3YXMgbm90IHRoZSBwcm9ibGVtIGJ1dCBmdW5jdGlvbiBpbiBtZXNzYWdlIGJ1cyB3YXNcbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlIG1lc3NhZ2UgaWYgYWNrUmVxdWlyZWQgaXMgdHJ1ZSwgb3RoZXJ3aXNlIHVuZGVmaW5lZC5cbiAqL1xuY29uc3QgcG9zdE1lc3NhZ2UgPSAobWVzc2FnZSwgdHlwZSwgYWNrUmVxdWlyZWQpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlSWQgPSBhY2tSZXF1aXJlZCA/IG1lc3NhZ2VJZEZhY3RvcnkuZ2V0SWQoKSA6IG51bGw7XG4gICAgY29uc3QgbWVzc2FnZU9iamVjdCA9IHtcbiAgICAgICAgaWQ6IG1lc3NhZ2VJZCxcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgdG86IFwiQ09OVEVOVFwiLFxuICAgICAgICBmcm9tOiBcIkhPT0tcIixcbiAgICAgICAgZXh0ZW5zaW9uTmFtZTogXCJNT0tLVVwiLFxuICAgICAgICB0eXBlLFxuICAgIH07XG4gICAgbWVzc2FnZVNlcnZpY2VfMS5tZXNzYWdlU2VydmljZS5zZW5kKG1lc3NhZ2VPYmplY3QpO1xuICAgIGlmIChtZXNzYWdlSWQgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBtZXNzYWdlQnVzLmFkZExpc3RlcihtZXNzYWdlSWQsIHJlc29sdmUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG4vLyBIZWxwZXIgdG8gY29udmVydCByZXF1ZXN0IGJvZHkgdG8gYSBzdHJpbmcgcmVwcmVzZW50YXRpb25cbmZ1bmN0aW9uIGdldFJlcXVlc3RCb2R5QXNTdHJpbmcoYm9keSkge1xuICAgIGlmIChib2R5ID09PSBudWxsIHx8IGJvZHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIFJlYWRhYmxlU3RyZWFtICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIGJvZHkgaW5zdGFuY2VvZiBSZWFkYWJsZVN0cmVhbSkge1xuICAgICAgICByZXR1cm4gXCJVbnN1cHBvcnRlZCBib2R5IHR5cGU6IFJlYWRhYmxlU3RyZWFtXCI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIEpTT04uc3RyaW5naWZ5IGlzIHByaW1hcmlseSBmb3IgcGxhaW4gb2JqZWN0cy9hcnJheXMuXG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgIShib2R5IGluc3RhbmNlb2YgRm9ybURhdGEpICYmXG4gICAgICAgICAgICAhKGJvZHkgaW5zdGFuY2VvZiBCbG9iKSAmJlxuICAgICAgICAgICAgIShib2R5IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpICYmXG4gICAgICAgICAgICAhKGJvZHkgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFN0cmluZyhib2R5KTsgLy8gRmFsbGJhY2sgZm9yIHByaW1pdGl2ZXMsIEZvcm1EYXRhLCBldGMuXG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNb2trdSBJbmplY3Q6IEVycm9yIHN0cmluZ2lmeWluZyByZXF1ZXN0IGJvZHlcIiwgZSk7XG4gICAgICAgIHJldHVybiBcIlVuc3VwcG9ydGVkIGJvZHkgdHlwZTogRXJyb3IgZHVyaW5nIHN0cmluZ2lmaWNhdGlvblwiO1xuICAgIH1cbn1cbi8vIEhlbHBlciB0byBwYXJzZSBVUkwgYW5kIGV4dHJhY3QgcXVlcnkgcGFyYW1ldGVyc1xuZnVuY3Rpb24gcGFyc2VVcmxBbmRRdWVyeShyZXF1ZXN0VXJsSW5wdXQpIHtcbiAgICBsZXQgcmVxdWVzdFVybFN0ciA9IFwiXCI7XG4gICAgaWYgKHJlcXVlc3RVcmxJbnB1dCBpbnN0YW5jZW9mIFVSTCkge1xuICAgICAgICByZXF1ZXN0VXJsU3RyID0gcmVxdWVzdFVybElucHV0LmhyZWY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBSZXF1ZXN0ICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHJlcXVlc3RVcmxJbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICAgICAgcmVxdWVzdFVybFN0ciA9IHJlcXVlc3RVcmxJbnB1dC51cmw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXF1ZXN0VXJsU3RyID0gcmVxdWVzdFVybElucHV0O1xuICAgIH1cbiAgICBjb25zdCBzZXBhcmF0b3IgPSByZXF1ZXN0VXJsU3RyLmluZGV4T2YoXCI/XCIpO1xuICAgIGNvbnN0IHVybCA9IHNlcGFyYXRvciAhPT0gLTFcbiAgICAgICAgPyByZXF1ZXN0VXJsU3RyLnN1YnN0cmluZygwLCBzZXBhcmF0b3IpXG4gICAgICAgIDogcmVxdWVzdFVybFN0cjtcbiAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHNlcGFyYXRvciAhPT0gLTFcbiAgICAgICAgPyBKU09OLnN0cmluZ2lmeSgoMCwgcXVlcnlfc3RyaW5nXzEucGFyc2UpKHJlcXVlc3RVcmxTdHIuc3Vic3RyaW5nKHNlcGFyYXRvcikpKVxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4geyB1cmwsIHF1ZXJ5UGFyYW1zIH07XG59XG5jb25zdCBnZXRMb2dPYmplY3QgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnN0IHsgdXJsLCBxdWVyeVBhcmFtcyB9ID0gcGFyc2VVcmxBbmRRdWVyeShyZXF1ZXN0LnVybCk7XG4gICAgY29uc3QgcmVxdWVzdEJvZHkgPSBnZXRSZXF1ZXN0Qm9keUFzU3RyaW5nKHJlcXVlc3QuYm9keSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IChfYSA9IHJlcXVlc3QubW9ra3UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pZCxcbiAgICAgICAgcmVxdWVzdDoge1xuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgYm9keTogcmVxdWVzdEJvZHksXG4gICAgICAgICAgICBxdWVyeVBhcmFtcyxcbiAgICAgICAgICAgIG1ldGhvZDogKCgoX2IgPSByZXF1ZXN0Lm1ldGhvZCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnRvVXBwZXJDYXNlKCkpIHx8IFwiR0VUXCIpLFxuICAgICAgICAgICAgaGVhZGVyczogKDAsIGhlbHBlcl8xLmdldEhlYWRlcnMpKHJlcXVlc3QuaGVhZGVycyksXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3BvbnNlLFxuICAgIH07XG59O1xuZnVuY3Rpb24gcHJvY2Vzc01vY2tpbmdSZXF1ZXN0KHJlcXVlc3QsIGNhbGxiYWNrKSB7XG4gICAgdmFyIF9hO1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGxvZ0VudHJ5ID0gZ2V0TG9nT2JqZWN0KHJlcXVlc3QpO1xuICAgICAgICAvLyBTZW5kIGluaXRpYWwgbG9nIChmaXJlIGFuZCBmb3JnZXQpXG4gICAgICAgIHBvc3RNZXNzYWdlKGxvZ0VudHJ5LCBcIkxPR1wiLCBmYWxzZSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBtb2NrU2VydmljZVJlc3BvbnNlUHJvbWlzZSA9IHBvc3RNZXNzYWdlKGxvZ0VudHJ5LCBcIkNIRUNLX01PQ0tcIiwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAoIW1vY2tTZXJ2aWNlUmVzcG9uc2VQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgLy8gU2hvdWxkIG5vdCBoYXBwZW4gaWYgYWNrUmVxdWlyZWQgaXMgdHJ1ZVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbW9ja1NlcnZpY2VSZXNwb25zZSA9ICh5aWVsZCBtb2NrU2VydmljZVJlc3BvbnNlUHJvbWlzZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhvb2s6IFwiLCBtb2NrU2VydmljZVJlc3BvbnNlKTtcbiAgICAgICAgICAgIGlmIChtb2NrU2VydmljZVJlc3BvbnNlICYmIG1vY2tTZXJ2aWNlUmVzcG9uc2UubW9ja1Jlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9jayA9IG1vY2tTZXJ2aWNlUmVzcG9uc2UubW9ja1Jlc3BvbnNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSBtb2NrLmhlYWRlcnNcbiAgICAgICAgICAgICAgICAgICAgPyBtb2NrLmhlYWRlcnMucmVkdWNlKChmaW5hbCwgaGVhZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbFtoZWFkZXIubmFtZV0gPSBoZWFkZXIudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmluYWw7XG4gICAgICAgICAgICAgICAgICAgIH0sIHt9KVxuICAgICAgICAgICAgICAgICAgICA6IHsgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XCIgfTsgLy8gRGVmYXVsdCBoZWFkZXJzXG4gICAgICAgICAgICAgICAgY29uc3QgZmluYWxNb2NrZWRSZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBtb2NrLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogKF9hID0gbW9jay5yZXNwb25zZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChtb2NrLmRlbGF5ICYmIG1vY2suZGVsYXkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZmluYWxNb2NrZWRSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIG1vY2suZGVsYXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZmluYWxNb2NrZWRSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTsgLy8gTm8gbW9jaywgcHJvY2VlZCB3aXRoIG9yaWdpbmFsIHJlcXVlc3RcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNb2trdSBJbmplY3Q6IEVycm9yIGR1cmluZyBtb2NrIHByb2Nlc3Npbmc6XCIsIGVycm9yKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7IC8vIFByb2NlZWQgd2l0aCBvcmlnaW5hbCByZXF1ZXN0IG9uIGVycm9yXG4gICAgICAgIH1cbiAgICB9KTtcbn1cbnhob29rXzEuZGVmYXVsdC5iZWZvcmUoZnVuY3Rpb24gKHJlcXVlc3QsIGNhbGxiYWNrKSB7XG4gICAgLy8gRW5zdXJlIGEgdW5pcXVlIElEIGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgcmVxdWVzdCBvYmplY3QgZm9yIGxvZ2dpbmcvY29ycmVsYXRpb24uXG4gICAgaWYgKCFyZXF1ZXN0Lm1va2t1KSB7XG4gICAgICAgIHJlcXVlc3QubW9ra3UgPSB7IGlkOiBsb2dJZEZhY3RvcnkuZ2V0SWQoKSB9O1xuICAgIH1cbiAgICBwcm9jZXNzTW9ja2luZ1JlcXVlc3QocmVxdWVzdCwgY2FsbGJhY2spO1xufSk7XG5mdW5jdGlvbiBzZW5kTG9nQWZ0ZXJSZXF1ZXN0KHJlcXVlc3QsIG9yaWdpbmFsUmVzcG9uc2UpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmRMb2dBZnRlclJlcXVlc3RcIiwgcmVxdWVzdCwgb3JpZ2luYWxSZXNwb25zZSk7XG4gICAgICAgIGxldCByZXNwb25zZVRleHQ7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlU3RhdHVzID0gb3JpZ2luYWxSZXNwb25zZS5zdGF0dXMgfHwgMDtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VIZWFkZXJzID0gb3JpZ2luYWxSZXNwb25zZS5oZWFkZXJzIHx8IHt9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcmlnaW5hbFJlc3BvbnNlLmNsb25lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBMaWtlbHkgYSBGZXRjaCBBUEkgUmVzcG9uc2VcbiAgICAgICAgICAgICAgICBjb25zdCBjbG9uZWRSZXNwb25zZSA9IG9yaWdpbmFsUmVzcG9uc2UuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICByZXNwb25zZVRleHQgPSB5aWVsZCBjbG9uZWRSZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb3JpZ2luYWxSZXNwb25zZS50ZXh0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgLy8gRGlyZWN0IHRleHQgcHJvcGVydHlcbiAgICAgICAgICAgICAgICByZXNwb25zZVRleHQgPSBvcmlnaW5hbFJlc3BvbnNlLnRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvcmlnaW5hbFJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAvLyBGYWxsYmFjayB0byBkYXRhIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VUZXh0ID1cbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIG9yaWdpbmFsUmVzcG9uc2UuZGF0YSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPyBvcmlnaW5hbFJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIDogSlNPTi5zdHJpbmdpZnkob3JpZ2luYWxSZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlVGV4dCA9IFwiTW9ra3U6IFVuYWJsZSB0byBkZXRlcm1pbmUgcmVzcG9uc2UgYm9keS5cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNb2trdSBJbmplY3Q6IEVycm9yIGV4dHJhY3RpbmcgcmVzcG9uc2UgdGV4dCBpbiB4aG9vay5hZnRlcjpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgcmVzcG9uc2VUZXh0ID0gXCJNb2trdTogRXJyb3IgcHJvY2Vzc2luZyByZXNwb25zZSB0ZXh0LlwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxvZ0VudHJ5ID0gZ2V0TG9nT2JqZWN0KHJlcXVlc3QsIHtcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2VTdGF0dXMsXG4gICAgICAgICAgICByZXNwb25zZTogcmVzcG9uc2VUZXh0LFxuICAgICAgICAgICAgaGVhZGVyczogKDAsIGhlbHBlcl8xLmdldEhlYWRlcnMpKHJlc3BvbnNlSGVhZGVycyksXG4gICAgICAgIH0pO1xuICAgICAgICBwb3N0TWVzc2FnZShsb2dFbnRyeSwgXCJMT0dcIiwgZmFsc2UpO1xuICAgIH0pO1xufVxueGhvb2tfMS5kZWZhdWx0LmFmdGVyKGZ1bmN0aW9uIChyZXF1ZXN0LCBvcmlnaW5hbFJlc3BvbnNlKSB7XG4gICAgLy8gRW5zdXJlIHJlcXVlc3QubW9ra3UuaWQgaXMgYXZhaWxhYmxlIChzaG91bGQgYmUgc2V0IGluICdiZWZvcmUnIGhvb2spXG4gICAgaWYgKCFyZXF1ZXN0Lm1va2t1KSB7XG4gICAgICAgIC8vIFRoaXMgY2FzZSBzaG91bGQgaWRlYWxseSBub3QgYmUgaGl0IGlmICdiZWZvcmUnIGFsd2F5cyBydW5zIGFuZCBzZXRzIGl0LlxuICAgICAgICByZXF1ZXN0Lm1va2t1ID0geyBpZDogbG9nSWRGYWN0b3J5LmdldElkKCkgfTtcbiAgICAgICAgY29uc29sZS53YXJuKFwiTW9ra3UgSW5qZWN0OiByZXF1ZXN0Lm1va2t1LmlkIHdhcyBub3Qgc2V0IGluIHhob29rLmJlZm9yZSwgbmV3IElEIGdlbmVyYXRlZCBpbiB4aG9vay5hZnRlci5cIik7XG4gICAgfVxuICAgIHNlbmRMb2dBZnRlclJlcXVlc3QocmVxdWVzdCwgb3JpZ2luYWxSZXNwb25zZSk7XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tZXNzYWdlU2VydmljZSA9IHZvaWQgMDtcbi8qKlxuICpcbiAqIEluamVjdFxuICogICAgIC0+IENvbnRlbnQgU2NyaXB0XG4gKlxuICogQ29udGVudCBzY3JpcHQgaXMgYnJpZGdlIGJldHdlZW4gcGFuZWwgYW5kIGluamVjdCBmb3IgY29tbXVuaWNhdGlvblxuICogYXMgaXQgaGFzIGJvdGggd2luZG93cyBldmVudCBsaXN0ZXJuIGFuZCBjaHJvbWUgcnVudGltZSBtZXNzYWdlIGxpc3RuZXJcbiAqIENvbnRlbnQgU2NyaXB0XG4gKiAgICAgLT4gUGFuZWxcbiAqICAgICAtPiBIb29rXG4gKlxuICogUGFuZWxcbiAqICAgICAtPiBDb250ZW50IFNjcmlwdFxuICovXG5jb25zdCB0dW5uZWxNYXAgPSB7XG4gICAgXCJIT09LOkNPTlRFTlRcIjogXCJ3aW5kb3dcIixcbiAgICBcIkNPTlRFTlQ6SE9PS1wiOiBcIndpbmRvd1wiLFxuICAgIFwiQ09OVEVOVDpQQU5FTFwiOiBcInJ1bnRpbWVcIixcbiAgICBcIkNPTlRFTlQ6U0VSVklDRV9XT1JLRVJcIjogXCJydW50aW1lXCIsXG4gICAgXCJQQU5FTDpDT05URU5UXCI6IFwidGFiXCIsXG4gICAgXCJTRVJWSUNFX1dPUktFUjpDT05URU5UXCI6IFwicnVudGltZVwiLFxuICAgIFwiU0VSVklDRV9XT1JLRVI6UEFORUxcIjogXCJydW50aW1lXCIsXG59O1xuY29uc3Qgc2VuZCA9IChwcm9wcywgdGFiSWQpID0+IHtcbiAgICBjb25zdCBwYXRoS2V5ID0gYCR7cHJvcHMuZnJvbX06JHtwcm9wcy50b31gO1xuICAgIGNvbnN0IHBhdGggPSB0dW5uZWxNYXBbcGF0aEtleV07XG4gICAgY29uc3Qgc2VydmljZSA9IHtcbiAgICAgICAgd2luZG93OiAoKSA9PiB3aW5kb3cucG9zdE1lc3NhZ2UocHJvcHMsIFwiKlwiKSxcbiAgICAgICAgcnVudGltZTogKCkgPT4gY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UocHJvcHMpLFxuICAgICAgICB0YWI6ICgpID0+IGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYklkLCBwcm9wcyksXG4gICAgfTtcbiAgICBpZiAoc2VydmljZVtwYXRoXSkge1xuICAgICAgICBzZXJ2aWNlW3BhdGhdKHByb3BzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYE1va2t1IE1lc3NhZ2VTZXJ2aWNlOiBObyBwYXRoIGRlZmluZWQgZm9yICR7cGF0aEtleX1gKTtcbiAgICB9XG59O1xuY29uc3QgbGlzdGVuID0gKGVudGl0eSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xuICAgICAgICBydW50aW1lOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmdW5jID0gKG1lc3NhZ2UsIF9zZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLnRvICE9PSBlbnRpdHkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhtZXNzYWdlLCBfc2VuZGVyLCBzZW5kUmVzcG9uc2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jKTtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UucmVtb3ZlTGlzdGVuZXIoZnVuYyk7XG4gICAgICAgIH0sXG4gICAgICAgIHdpbmRvdzogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZnVuYyA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFdlIG9ubHkgYWNjZXB0IG1lc3NhZ2VzIGZyb20gb3Vyc2VsdmVzXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSAhPT0gd2luZG93KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudG8gIT09IGVudGl0eSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBmdW5jKTtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZnVuYyk7XG4gICAgICAgIH0sXG4gICAgfTtcbiAgICBzd2l0Y2ggKGVudGl0eSkge1xuICAgICAgICBjYXNlIFwiSE9PS1wiOiB7XG4gICAgICAgICAgICByZXR1cm4gW3NlcnZpY2VbXCJ3aW5kb3dcIl0oKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIkNPTlRFTlRcIjoge1xuICAgICAgICAgICAgcmV0dXJuIFtzZXJ2aWNlW1wid2luZG93XCJdKCksIHNlcnZpY2VbXCJydW50aW1lXCJdKCldO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJQQU5FTFwiOiB7XG4gICAgICAgICAgICByZXR1cm4gW3NlcnZpY2VbXCJydW50aW1lXCJdKCldO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJTRVJWSUNFX1dPUktFUlwiOiB7XG4gICAgICAgICAgICByZXR1cm4gW3NlcnZpY2VbXCJydW50aW1lXCJdKCldO1xuICAgICAgICB9XG4gICAgfVxufTtcbmV4cG9ydHMubWVzc2FnZVNlcnZpY2UgPSB7IHNlbmQsIGxpc3RlbiB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldEhlYWRlcnMgPSBleHBvcnRzLmdldEVycm9yID0gZXhwb3J0cy5pc1ZhbGlkSlNPTiA9IHZvaWQgMDtcbmNvbnN0IGlzVmFsaWRKU09OID0gKGpzb24pID0+IHtcbiAgICB0cnkge1xuICAgICAgICBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICByZXR1cm4geyBlcnJvcjogdW5kZWZpbmVkIH07XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGxpbmVOdW1iZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IGpzb25FcnJvclJlZ2V4ID0gbmV3IFJlZ0V4cCgvKD88PVxcYnBvc2l0aW9uXFxzKShcXHcrKS9nKTtcbiAgICAgICAgY29uc3Qgc3RyaW5naWZpZWRFcnJvciA9IGUudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKHN0cmluZ2lmaWVkRXJyb3IgIT09IFwiVW5leHBlY3RlZCBlbmQgb2YgSlNPTiBpbnB1dFwiKSB7XG4gICAgICAgICAgICBjb25zdCB4ID0ganNvbkVycm9yUmVnZXguZXhlYyhzdHJpbmdpZmllZEVycm9yKTtcbiAgICAgICAgICAgIHBvc2l0aW9uID0geCAmJiB4Lmxlbmd0aCA+IDAgPyBwYXJzZUludCh4WzBdLCAxMCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICBsaW5lTnVtYmVyID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGpzb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoanNvbltpXSA9PT0gXCJcXG5cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZU51bWJlcisrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAganNvbkVycm9yUmVnZXgubGFzdEluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZXJyb3I6IGAke3N0cmluZ2lmaWVkRXJyb3J9JHtsaW5lTnVtYmVyID8gXCIgYW5kIGF0IGxpbmUgbnVtYmVyIFwiICsgbGluZU51bWJlciA6IFwiXCJ9YCxcbiAgICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgICAgbGluZU51bWJlcixcbiAgICAgICAgfTtcbiAgICB9XG59O1xuZXhwb3J0cy5pc1ZhbGlkSlNPTiA9IGlzVmFsaWRKU09OO1xuY29uc3QgZ2V0RXJyb3IgPSAoZXJyb3JzKSA9PiB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGVycm9ycyk7XG4gICAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBlcnJvcnNba2V5c1swXV07XG4gICAgfVxufTtcbmV4cG9ydHMuZ2V0RXJyb3IgPSBnZXRFcnJvcjtcbmNvbnN0IGdldEhlYWRlcnMgPSAoaGVhZGVycykgPT4ge1xuICAgIGlmICh0eXBlb2YgaGVhZGVycyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoaGVhZGVycykubWFwKChuYW1lKSA9PiAoe1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiBoZWFkZXJzW25hbWVdLFxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbn07XG5leHBvcnRzLmdldEhlYWRlcnMgPSBnZXRIZWFkZXJzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBJZEZhY3Rvcnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9pZCA9IDA7XG4gICAgfVxuICAgIGdldElkKCkge1xuICAgICAgICAvLyBza2lwIDAsIGFzIGl0IGNhbiBsZWFkIHRvIGZhbHN5XG4gICAgICAgIHRoaXMuX2lkKys7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBJZEZhY3Rvcnk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIE1lc3NhZ2VCdXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9jb2xsZWN0b3IgPSB7fTtcbiAgICAgICAgdGhpcy5fZGVmYXVsdExpc3RuZXIgPSAoKSA9PiB7IH07XG4gICAgICAgIHRoaXMuX2NvbGxlY3RvciA9IHt9O1xuICAgIH1cbiAgICBkaXNwYXRjaChpZCwgZXZlbnREYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLl9jb2xsZWN0b3JbaWRdKSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0b3JbaWRdKGV2ZW50RGF0YSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fY29sbGVjdG9yW2lkXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRMaXN0bmVyKGV2ZW50RGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYWRkTGlzdGVyKGlkLCBmdW5jKSB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3RvcltpZF0gPSBmdW5jO1xuICAgIH1cbiAgICBjcmVhdGVEZWZhdWx0TGlzdGVuZXIoZnVuYykge1xuICAgICAgICB0aGlzLl9kZWZhdWx0TGlzdG5lciA9IGZ1bmM7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gTWVzc2FnZUJ1cztcbiIsImNvbnN0IHNsaWNlID0gKG8sIG4pID0+IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG8sIG4pO1xuXG5sZXQgcmVzdWx0ID0gbnVsbDtcblxuLy9maW5kIGdsb2JhbCBvYmplY3RcbmlmIChcbiAgdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSBcInVuZGVmaW5lZFwiICYmXG4gIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZVxuKSB7XG4gIHJlc3VsdCA9IHNlbGY7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgcmVzdWx0ID0gZ2xvYmFsO1xufSBlbHNlIGlmICh3aW5kb3cpIHtcbiAgcmVzdWx0ID0gd2luZG93O1xufVxuXG5jb25zdCB3aW5kb3dSZWYgPSByZXN1bHQ7XG5jb25zdCBkb2N1bWVudFJlZiA9IHJlc3VsdC5kb2N1bWVudDtcblxuY29uc3QgVVBMT0FEX0VWRU5UUyA9IFtcImxvYWRcIiwgXCJsb2FkZW5kXCIsIFwibG9hZHN0YXJ0XCJdO1xuY29uc3QgQ09NTU9OX0VWRU5UUyA9IFtcInByb2dyZXNzXCIsIFwiYWJvcnRcIiwgXCJlcnJvclwiLCBcInRpbWVvdXRcIl07XG5cbmNvbnN0IGRlcHJpY2F0ZWRQcm9wID0gcCA9PlxuICBbXCJyZXR1cm5WYWx1ZVwiLCBcInRvdGFsU2l6ZVwiLCBcInBvc2l0aW9uXCJdLmluY2x1ZGVzKHApO1xuXG5jb25zdCBtZXJnZU9iamVjdHMgPSBmdW5jdGlvbiAoc3JjLCBkc3QpIHtcbiAgZm9yIChsZXQgayBpbiBzcmMpIHtcbiAgICBpZiAoZGVwcmljYXRlZFByb3AoaykpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjb25zdCB2ID0gc3JjW2tdO1xuICAgIHRyeSB7XG4gICAgICBkc3Rba10gPSB2O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuICB9XG4gIHJldHVybiBkc3Q7XG59O1xuXG4vL3Byb3h5IGV2ZW50cyBmcm9tIG9uZSBlbWl0dGVyIHRvIGFub3RoZXJcbmNvbnN0IHByb3h5RXZlbnRzID0gZnVuY3Rpb24gKGV2ZW50cywgc3JjLCBkc3QpIHtcbiAgY29uc3QgcCA9IGV2ZW50ID0+XG4gICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnN0IGNsb25lID0ge307XG4gICAgICAvL2NvcGllcyBldmVudCwgd2l0aCBkc3QgZW1pdHRlciBpbnBsYWNlIG9mIHNyY1xuICAgICAgZm9yIChsZXQgayBpbiBlKSB7XG4gICAgICAgIGlmIChkZXByaWNhdGVkUHJvcChrKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbCA9IGVba107XG4gICAgICAgIGNsb25lW2tdID0gdmFsID09PSBzcmMgPyBkc3QgOiB2YWw7XG4gICAgICB9XG4gICAgICAvL2VtaXRzIG91dCB0aGUgZHN0XG4gICAgICByZXR1cm4gZHN0LmRpc3BhdGNoRXZlbnQoZXZlbnQsIGNsb25lKTtcbiAgICB9O1xuICAvL2RvbnQgcHJveHkgbWFudWFsIGV2ZW50c1xuICBmb3IgKGxldCBldmVudCBvZiBBcnJheS5mcm9tKGV2ZW50cykpIHtcbiAgICBpZiAoZHN0Ll9oYXMoZXZlbnQpKSB7XG4gICAgICBzcmNbYG9uJHtldmVudH1gXSA9IHAoZXZlbnQpO1xuICAgIH1cbiAgfVxufTtcblxuLy9jcmVhdGUgZmFrZSBldmVudFxuY29uc3QgZmFrZUV2ZW50ID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgaWYgKGRvY3VtZW50UmVmICYmIGRvY3VtZW50UmVmLmNyZWF0ZUV2ZW50T2JqZWN0ICE9IG51bGwpIHtcbiAgICBjb25zdCBtc2llRXZlbnRPYmplY3QgPSBkb2N1bWVudFJlZi5jcmVhdGVFdmVudE9iamVjdCgpO1xuICAgIG1zaWVFdmVudE9iamVjdC50eXBlID0gdHlwZTtcbiAgICByZXR1cm4gbXNpZUV2ZW50T2JqZWN0O1xuICB9XG4gIC8vIG9uIHNvbWUgcGxhdGZvcm1zIGxpa2UgYW5kcm9pZCA0LjEuMiBhbmQgc2FmYXJpIG9uIHdpbmRvd3MsIGl0IGFwcGVhcnNcbiAgLy8gdGhhdCBuZXcgRXZlbnQgaXMgbm90IGFsbG93ZWRcbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IEV2ZW50KHR5cGUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB7IHR5cGUgfTtcbiAgfVxufTtcblxuLy90aW55IGV2ZW50IGVtaXR0ZXJcbmNvbnN0IEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uIChub2RlU3R5bGUpIHtcbiAgLy9wcml2YXRlXG4gIGxldCBldmVudHMgPSB7fTtcbiAgY29uc3QgbGlzdGVuZXJzID0gZXZlbnQgPT4gZXZlbnRzW2V2ZW50XSB8fCBbXTtcbiAgLy9wdWJsaWNcbiAgY29uc3QgZW1pdHRlciA9IHt9O1xuICBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQsIGNhbGxiYWNrLCBpKSB7XG4gICAgZXZlbnRzW2V2ZW50XSA9IGxpc3RlbmVycyhldmVudCk7XG4gICAgaWYgKGV2ZW50c1tldmVudF0uaW5kZXhPZihjYWxsYmFjaykgPj0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpID0gaSA9PT0gdW5kZWZpbmVkID8gZXZlbnRzW2V2ZW50XS5sZW5ndGggOiBpO1xuICAgIGV2ZW50c1tldmVudF0uc3BsaWNlKGksIDAsIGNhbGxiYWNrKTtcbiAgfTtcbiAgZW1pdHRlci5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50LCBjYWxsYmFjaykge1xuICAgIC8vcmVtb3ZlIGFsbFxuICAgIGlmIChldmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBldmVudHMgPSB7fTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9yZW1vdmUgYWxsIG9mIHR5cGUgZXZlbnRcbiAgICBpZiAoY2FsbGJhY2sgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXZlbnRzW2V2ZW50XSA9IFtdO1xuICAgIH1cbiAgICAvL3JlbW92ZSBwYXJ0aWN1bGFyIGhhbmRsZXJcbiAgICBjb25zdCBpID0gbGlzdGVuZXJzKGV2ZW50KS5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICBpZiAoaSA9PT0gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGlzdGVuZXJzKGV2ZW50KS5zcGxpY2UoaSwgMSk7XG4gIH07XG4gIGVtaXR0ZXIuZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBhcmdzID0gc2xpY2UoYXJndW1lbnRzKTtcbiAgICBjb25zdCBldmVudCA9IGFyZ3Muc2hpZnQoKTtcbiAgICBpZiAoIW5vZGVTdHlsZSkge1xuICAgICAgYXJnc1swXSA9IG1lcmdlT2JqZWN0cyhhcmdzWzBdLCBmYWtlRXZlbnQoZXZlbnQpKTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcmdzWzBdLCBcInRhcmdldFwiLCB7XG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHRoaXMsXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgbGVnYWN5bGlzdGVuZXIgPSBlbWl0dGVyW2BvbiR7ZXZlbnR9YF07XG4gICAgaWYgKGxlZ2FjeWxpc3RlbmVyKSB7XG4gICAgICBsZWdhY3lsaXN0ZW5lci5hcHBseShlbWl0dGVyLCBhcmdzKTtcbiAgICB9XG4gICAgY29uc3QgaXRlcmFibGUgPSBsaXN0ZW5lcnMoZXZlbnQpLmNvbmNhdChsaXN0ZW5lcnMoXCIqXCIpKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXJhYmxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBsaXN0ZW5lciA9IGl0ZXJhYmxlW2ldO1xuICAgICAgbGlzdGVuZXIuYXBwbHkoZW1pdHRlciwgYXJncyk7XG4gICAgfVxuICB9O1xuICBlbWl0dGVyLl9oYXMgPSBldmVudCA9PiAhIShldmVudHNbZXZlbnRdIHx8IGVtaXR0ZXJbYG9uJHtldmVudH1gXSk7XG4gIC8vYWRkIGV4dHJhIGFsaWFzZXNcbiAgaWYgKG5vZGVTdHlsZSkge1xuICAgIGVtaXR0ZXIubGlzdGVuZXJzID0gZXZlbnQgPT4gc2xpY2UobGlzdGVuZXJzKGV2ZW50KSk7XG4gICAgZW1pdHRlci5vbiA9IGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcjtcbiAgICBlbWl0dGVyLm9mZiA9IGVtaXR0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcbiAgICBlbWl0dGVyLmZpcmUgPSBlbWl0dGVyLmRpc3BhdGNoRXZlbnQ7XG4gICAgZW1pdHRlci5vbmNlID0gZnVuY3Rpb24gKGUsIGZuKSB7XG4gICAgICB2YXIgZmlyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZW1pdHRlci5vZmYoZSwgZmlyZSk7XG4gICAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBlbWl0dGVyLm9uKGUsIGZpcmUpO1xuICAgIH07XG4gICAgZW1pdHRlci5kZXN0cm95ID0gKCkgPT4gKGV2ZW50cyA9IHt9KTtcbiAgfVxuXG4gIHJldHVybiBlbWl0dGVyO1xufTtcblxuLy9oZWxwZXJcbmNvbnN0IENSTEYgPSBcIlxcclxcblwiO1xuXG5jb25zdCBvYmplY3RUb1N0cmluZyA9IGZ1bmN0aW9uIChoZWFkZXJzT2JqKSB7XG4gIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhoZWFkZXJzT2JqKTtcblxuICBjb25zdCBoZWFkZXJzID0gZW50cmllcy5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+IHtcbiAgICByZXR1cm4gYCR7bmFtZS50b0xvd2VyQ2FzZSgpfTogJHt2YWx1ZX1gO1xuICB9KTtcblxuICByZXR1cm4gaGVhZGVycy5qb2luKENSTEYpO1xufTtcblxuY29uc3Qgc3RyaW5nVG9PYmplY3QgPSBmdW5jdGlvbiAoaGVhZGVyc1N0cmluZywgZGVzdCkge1xuICBjb25zdCBoZWFkZXJzID0gaGVhZGVyc1N0cmluZy5zcGxpdChDUkxGKTtcbiAgaWYgKGRlc3QgPT0gbnVsbCkge1xuICAgIGRlc3QgPSB7fTtcbiAgfVxuXG4gIGZvciAobGV0IGhlYWRlciBvZiBoZWFkZXJzKSB7XG4gICAgaWYgKC8oW146XSspOlxccyooLispLy50ZXN0KGhlYWRlcikpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBSZWdFeHAuJDEgIT0gbnVsbCA/IFJlZ0V4cC4kMS50b0xvd2VyQ2FzZSgpIDogdW5kZWZpbmVkO1xuICAgICAgY29uc3QgdmFsdWUgPSBSZWdFeHAuJDI7XG4gICAgICBpZiAoZGVzdFtuYW1lXSA9PSBudWxsKSB7XG4gICAgICAgIGRlc3RbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGVzdDtcbn07XG5cbmNvbnN0IGNvbnZlcnQgPSBmdW5jdGlvbiAoaGVhZGVycywgZGVzdCkge1xuICBzd2l0Y2ggKHR5cGVvZiBoZWFkZXJzKSB7XG4gICAgY2FzZSBcIm9iamVjdFwiOiB7XG4gICAgICByZXR1cm4gb2JqZWN0VG9TdHJpbmcoaGVhZGVycyk7XG4gICAgfVxuICAgIGNhc2UgXCJzdHJpbmdcIjoge1xuICAgICAgcmV0dXJuIHN0cmluZ1RvT2JqZWN0KGhlYWRlcnMsIGRlc3QpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBbXTtcbn07XG5cbnZhciBoZWFkZXJzID0geyBjb252ZXJ0IH07XG5cbi8vZ2xvYmFsIHNldCBvZiBob29rIGZ1bmN0aW9ucyxcbi8vdXNlcyBldmVudCBlbWl0dGVyIHRvIHN0b3JlIGhvb2tzXG5jb25zdCBob29rcyA9IEV2ZW50RW1pdHRlcih0cnVlKTtcblxuY29uc3QgbnVsbGlmeSA9IHJlcyA9PiAocmVzID09PSB1bmRlZmluZWQgPyBudWxsIDogcmVzKTtcblxuLy9icm93c2VyJ3MgWE1MSHR0cFJlcXVlc3RcbmNvbnN0IE5hdGl2ZSQxID0gd2luZG93UmVmLlhNTEh0dHBSZXF1ZXN0O1xuXG4vL3hob29rJ3MgWE1MSHR0cFJlcXVlc3RcbmNvbnN0IFhob29rJDEgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IEFCT1JURUQgPSAtMTtcbiAgY29uc3QgeGhyID0gbmV3IE5hdGl2ZSQxKCk7XG5cbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLyBFeHRyYSBzdGF0ZVxuICBjb25zdCByZXF1ZXN0ID0ge307XG4gIGxldCBzdGF0dXMgPSBudWxsO1xuICBsZXQgaGFzRXJyb3IgPSB1bmRlZmluZWQ7XG4gIGxldCB0cmFuc2l0aW5nID0gdW5kZWZpbmVkO1xuICBsZXQgcmVzcG9uc2UgPSB1bmRlZmluZWQ7XG4gIHZhciBjdXJyZW50U3RhdGUgPSAwO1xuXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgLy8gUHJpdmF0ZSBBUElcblxuICAvL3JlYWQgcmVzdWx0cyBmcm9tIHJlYWwgeGhyIGludG8gcmVzcG9uc2VcbiAgY29uc3QgcmVhZEhlYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gQWNjZXNzaW5nIGF0dHJpYnV0ZXMgb24gYW4gYWJvcnRlZCB4aHIgb2JqZWN0IHdpbGxcbiAgICAvLyB0aHJvdyBhbiAnYzAwYzAyM2YgZXJyb3InIGluIElFOSBhbmQgbG93ZXIsIGRvbid0IHRvdWNoIGl0LlxuICAgIHJlc3BvbnNlLnN0YXR1cyA9IHN0YXR1cyB8fCB4aHIuc3RhdHVzO1xuICAgIGlmIChzdGF0dXMgIT09IEFCT1JURUQpIHtcbiAgICAgIHJlc3BvbnNlLnN0YXR1c1RleHQgPSB4aHIuc3RhdHVzVGV4dDtcbiAgICB9XG4gICAgaWYgKHN0YXR1cyAhPT0gQUJPUlRFRCkge1xuICAgICAgY29uc3Qgb2JqZWN0ID0gaGVhZGVycy5jb252ZXJ0KHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IG9iamVjdFtrZXldO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLmhlYWRlcnNba2V5XSkge1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICByZXNwb25zZS5oZWFkZXJzW25hbWVdID0gdmFsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlYWRCb2R5ID0gZnVuY3Rpb24gKCkge1xuICAgIC8vaHR0cHM6Ly94aHIuc3BlYy53aGF0d2cub3JnL1xuICAgIGlmICgheGhyLnJlc3BvbnNlVHlwZSB8fCB4aHIucmVzcG9uc2VUeXBlID09PSBcInRleHRcIikge1xuICAgICAgcmVzcG9uc2UudGV4dCA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICByZXNwb25zZS5kYXRhID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3BvbnNlLnhtbCA9IHhoci5yZXNwb25zZVhNTDtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuICAgICAgLy8gdW5hYmxlIHRvIHNldCByZXNwb25zZVhNTCBkdWUgdG8gcmVzcG9uc2UgdHlwZSwgd2UgYXR0ZW1wdCB0byBhc3NpZ24gcmVzcG9uc2VYTUxcbiAgICAgIC8vIHdoZW4gdGhlIHR5cGUgaXMgdGV4dCBldmVuIHRob3VnaCBpdCdzIGFnYWluc3QgdGhlIHNwZWMgZHVlIHRvIHNldmVyYWwgbGlicmFyaWVzXG4gICAgICAvLyBhbmQgYnJvd3NlciB2ZW5kb3JzIHdobyBhbGxvdyB0aGlzIGJlaGF2aW9yLiBjYXVzaW5nIHRoZXNlIHJlcXVlc3RzIHRvIGZhaWwgd2hlblxuICAgICAgLy8geGhvb2sgaXMgaW5zdGFsbGVkIG9uIGEgcGFnZS5cbiAgICB9IGVsc2UgaWYgKHhoci5yZXNwb25zZVR5cGUgPT09IFwiZG9jdW1lbnRcIikge1xuICAgICAgcmVzcG9uc2UueG1sID0geGhyLnJlc3BvbnNlWE1MO1xuICAgICAgcmVzcG9uc2UuZGF0YSA9IHhoci5yZXNwb25zZVhNTDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzcG9uc2UuZGF0YSA9IHhoci5yZXNwb25zZTtcbiAgICB9XG4gICAgLy9uZXcgaW4gc29tZSBicm93c2Vyc1xuICAgIGlmIChcInJlc3BvbnNlVVJMXCIgaW4geGhyKSB7XG4gICAgICByZXNwb25zZS5maW5hbFVybCA9IHhoci5yZXNwb25zZVVSTDtcbiAgICB9XG4gIH07XG5cbiAgLy93cml0ZSByZXNwb25zZSBpbnRvIGZhY2FkZSB4aHJcbiAgY29uc3Qgd3JpdGVIZWFkID0gZnVuY3Rpb24gKCkge1xuICAgIGZhY2FkZS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgZmFjYWRlLnN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0O1xuICB9O1xuXG4gIGNvbnN0IHdyaXRlQm9keSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoXCJ0ZXh0XCIgaW4gcmVzcG9uc2UpIHtcbiAgICAgIGZhY2FkZS5yZXNwb25zZVRleHQgPSByZXNwb25zZS50ZXh0O1xuICAgIH1cbiAgICBpZiAoXCJ4bWxcIiBpbiByZXNwb25zZSkge1xuICAgICAgZmFjYWRlLnJlc3BvbnNlWE1MID0gcmVzcG9uc2UueG1sO1xuICAgIH1cbiAgICBpZiAoXCJkYXRhXCIgaW4gcmVzcG9uc2UpIHtcbiAgICAgIGZhY2FkZS5yZXNwb25zZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfVxuICAgIGlmIChcImZpbmFsVXJsXCIgaW4gcmVzcG9uc2UpIHtcbiAgICAgIGZhY2FkZS5yZXNwb25zZVVSTCA9IHJlc3BvbnNlLmZpbmFsVXJsO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBlbWl0RmluYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFoYXNFcnJvcikge1xuICAgICAgZmFjYWRlLmRpc3BhdGNoRXZlbnQoXCJsb2FkXCIsIHt9KTtcbiAgICB9XG4gICAgZmFjYWRlLmRpc3BhdGNoRXZlbnQoXCJsb2FkZW5kXCIsIHt9KTtcbiAgICBpZiAoaGFzRXJyb3IpIHtcbiAgICAgIGZhY2FkZS5yZWFkeVN0YXRlID0gMDtcbiAgICB9XG4gIH07XG5cbiAgLy9lbnN1cmUgcmVhZHkgc3RhdGUgMCB0aHJvdWdoIDQgaXMgaGFuZGxlZFxuICBjb25zdCBlbWl0UmVhZHlTdGF0ZSA9IGZ1bmN0aW9uIChuKSB7XG4gICAgd2hpbGUgKG4gPiBjdXJyZW50U3RhdGUgJiYgY3VycmVudFN0YXRlIDwgNCkge1xuICAgICAgZmFjYWRlLnJlYWR5U3RhdGUgPSArK2N1cnJlbnRTdGF0ZTtcbiAgICAgIC8vIG1ha2UgZmFrZSBldmVudHMgZm9yIGxpYnJhcmllcyB0aGF0IGFjdHVhbGx5IGNoZWNrIHRoZSB0eXBlIG9uXG4gICAgICAvLyB0aGUgZXZlbnQgb2JqZWN0XG4gICAgICBpZiAoY3VycmVudFN0YXRlID09PSAxKSB7XG4gICAgICAgIGZhY2FkZS5kaXNwYXRjaEV2ZW50KFwibG9hZHN0YXJ0XCIsIHt9KTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50U3RhdGUgPT09IDIpIHtcbiAgICAgICAgd3JpdGVIZWFkKCk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudFN0YXRlID09PSA0KSB7XG4gICAgICAgIHdyaXRlSGVhZCgpO1xuICAgICAgICB3cml0ZUJvZHkoKTtcbiAgICAgIH1cbiAgICAgIGZhY2FkZS5kaXNwYXRjaEV2ZW50KFwicmVhZHlzdGF0ZWNoYW5nZVwiLCB7fSk7XG4gICAgICAvL2RlbGF5IGZpbmFsIGV2ZW50cyBpbmNhc2Ugb2YgZXJyb3JcbiAgICAgIGlmIChjdXJyZW50U3RhdGUgPT09IDQpIHtcbiAgICAgICAgaWYgKHJlcXVlc3QuYXN5bmMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgZW1pdEZpbmFsKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0VGltZW91dChlbWl0RmluYWwsIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vY29udHJvbCBmYWNhZGUgcmVhZHkgc3RhdGVcbiAgY29uc3Qgc2V0UmVhZHlTdGF0ZSA9IGZ1bmN0aW9uIChuKSB7XG4gICAgLy9lbWl0IGV2ZW50cyB1bnRpbCByZWFkeVN0YXRlIHJlYWNoZXMgNFxuICAgIGlmIChuICE9PSA0KSB7XG4gICAgICBlbWl0UmVhZHlTdGF0ZShuKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9iZWZvcmUgZW1pdHRpbmcgNCwgcnVuIGFsbCAnYWZ0ZXInIGhvb2tzIGluIHNlcXVlbmNlXG4gICAgY29uc3QgYWZ0ZXJIb29rcyA9IGhvb2tzLmxpc3RlbmVycyhcImFmdGVyXCIpO1xuICAgIHZhciBwcm9jZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGFmdGVySG9va3MubGVuZ3RoID4gMCkge1xuICAgICAgICAvL2V4ZWN1dGUgZWFjaCAnYmVmb3JlJyBob29rIG9uZSBhdCBhIHRpbWVcbiAgICAgICAgY29uc3QgaG9vayA9IGFmdGVySG9va3Muc2hpZnQoKTtcbiAgICAgICAgaWYgKGhvb2subGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgaG9vayhyZXF1ZXN0LCByZXNwb25zZSk7XG4gICAgICAgICAgcHJvY2VzcygpO1xuICAgICAgICB9IGVsc2UgaWYgKGhvb2subGVuZ3RoID09PSAzICYmIHJlcXVlc3QuYXN5bmMpIHtcbiAgICAgICAgICBob29rKHJlcXVlc3QsIHJlc3BvbnNlLCBwcm9jZXNzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9jZXNzKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vcmVzcG9uc2UgcmVhZHkgZm9yIHJlYWRpbmdcbiAgICAgICAgZW1pdFJlYWR5U3RhdGUoNCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgICBwcm9jZXNzKCk7XG4gIH07XG5cbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLyBGYWNhZGUgWEhSXG4gIHZhciBmYWNhZGUgPSBFdmVudEVtaXR0ZXIoKTtcbiAgcmVxdWVzdC54aHIgPSBmYWNhZGU7XG5cbiAgLy8gSGFuZGxlIHRoZSB1bmRlcmx5aW5nIHJlYWR5IHN0YXRlXG4gIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAvL3B1bGwgc3RhdHVzIGFuZCBoZWFkZXJzXG4gICAgdHJ5IHtcbiAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gMikge1xuICAgICAgICByZWFkSGVhZCgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuICAgIC8vcHVsbCByZXNwb25zZSBkYXRhXG4gICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICB0cmFuc2l0aW5nID0gZmFsc2U7XG4gICAgICByZWFkSGVhZCgpO1xuICAgICAgcmVhZEJvZHkoKTtcbiAgICB9XG5cbiAgICBzZXRSZWFkeVN0YXRlKHhoci5yZWFkeVN0YXRlKTtcbiAgfTtcblxuICAvL21hcmsgdGhpcyB4aHIgYXMgZXJyb3JlZFxuICBjb25zdCBoYXNFcnJvckhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgaGFzRXJyb3IgPSB0cnVlO1xuICB9O1xuICBmYWNhZGUuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGhhc0Vycm9ySGFuZGxlcik7XG4gIGZhY2FkZS5hZGRFdmVudExpc3RlbmVyKFwidGltZW91dFwiLCBoYXNFcnJvckhhbmRsZXIpO1xuICBmYWNhZGUuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhc0Vycm9ySGFuZGxlcik7XG4gIC8vIHByb2dyZXNzIG1lYW5zIHdlJ3JlIGN1cnJlbnQgZG93bmxvYWRpbmcuLi5cbiAgZmFjYWRlLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoY3VycmVudFN0YXRlIDwgMykge1xuICAgICAgc2V0UmVhZHlTdGF0ZSgzKTtcbiAgICB9IGVsc2UgaWYgKHhoci5yZWFkeVN0YXRlIDw9IDMpIHtcbiAgICAgIC8vdW50aWwgcmVhZHkgKDQpLCBlYWNoIHByb2dyZXNzIGV2ZW50IGlzIGZvbGxvd2VkIGJ5IHJlYWR5c3RhdGVjaGFuZ2UuLi5cbiAgICAgIGZhY2FkZS5kaXNwYXRjaEV2ZW50KFwicmVhZHlzdGF0ZWNoYW5nZVwiLCB7fSk7IC8vVE9ETyBmYWtlIGFuIFhIUiBldmVudFxuICAgIH1cbiAgfSk7XG5cbiAgLy8gaW5pdGlhbGlzZSAnd2l0aENyZWRlbnRpYWxzJyBvbiBmYWNhZGUgeGhyIGluIGJyb3dzZXJzIHdpdGggaXRcbiAgLy8gb3IgaWYgZXhwbGljaXRseSB0b2xkIHRvIGRvIHNvXG4gIGlmIChcIndpdGhDcmVkZW50aWFsc1wiIGluIHhocikge1xuICAgIGZhY2FkZS53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZTtcbiAgfVxuICBmYWNhZGUuc3RhdHVzID0gMDtcblxuICAvLyBpbml0aWFsaXNlIGFsbCBwb3NzaWJsZSBldmVudCBoYW5kbGVyc1xuICBmb3IgKGxldCBldmVudCBvZiBBcnJheS5mcm9tKENPTU1PTl9FVkVOVFMuY29uY2F0KFVQTE9BRF9FVkVOVFMpKSkge1xuICAgIGZhY2FkZVtgb24ke2V2ZW50fWBdID0gbnVsbDtcbiAgfVxuXG4gIGZhY2FkZS5vcGVuID0gZnVuY3Rpb24gKG1ldGhvZCwgdXJsLCBhc3luYywgdXNlciwgcGFzcykge1xuICAgIC8vIEluaXRhaWxpemUgZW1wdHkgWEhSIGZhY2FkZVxuICAgIGN1cnJlbnRTdGF0ZSA9IDA7XG4gICAgaGFzRXJyb3IgPSBmYWxzZTtcbiAgICB0cmFuc2l0aW5nID0gZmFsc2U7XG4gICAgLy9yZXNldCByZXF1ZXN0XG4gICAgcmVxdWVzdC5oZWFkZXJzID0ge307XG4gICAgcmVxdWVzdC5oZWFkZXJOYW1lcyA9IHt9O1xuICAgIHJlcXVlc3Quc3RhdHVzID0gMDtcbiAgICByZXF1ZXN0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICByZXF1ZXN0LnVybCA9IHVybDtcbiAgICByZXF1ZXN0LmFzeW5jID0gYXN5bmMgIT09IGZhbHNlO1xuICAgIHJlcXVlc3QudXNlciA9IHVzZXI7XG4gICAgcmVxdWVzdC5wYXNzID0gcGFzcztcbiAgICAvL3Jlc2V0IHJlc3BvbnNlXG4gICAgcmVzcG9uc2UgPSB7fTtcbiAgICByZXNwb25zZS5oZWFkZXJzID0ge307XG4gICAgLy8gb3Blbm5lZCBmYWNhZGUgeGhyIChub3QgcmVhbCB4aHIpXG4gICAgc2V0UmVhZHlTdGF0ZSgxKTtcbiAgfTtcblxuICBmYWNhZGUuc2VuZCA9IGZ1bmN0aW9uIChib2R5KSB7XG4gICAgLy9yZWFkIHhociBzZXR0aW5ncyBiZWZvcmUgaG9va2luZ1xuICAgIGxldCBrLCBtb2RrO1xuICAgIGZvciAoayBvZiBbXCJ0eXBlXCIsIFwidGltZW91dFwiLCBcIndpdGhDcmVkZW50aWFsc1wiXSkge1xuICAgICAgbW9kayA9IGsgPT09IFwidHlwZVwiID8gXCJyZXNwb25zZVR5cGVcIiA6IGs7XG4gICAgICBpZiAobW9kayBpbiBmYWNhZGUpIHtcbiAgICAgICAgcmVxdWVzdFtrXSA9IGZhY2FkZVttb2RrXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXF1ZXN0LmJvZHkgPSBib2R5O1xuICAgIGNvbnN0IHNlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvL3Byb3h5IGFsbCBldmVudHMgZnJvbSByZWFsIHhociB0byBmYWNhZGVcbiAgICAgIHByb3h5RXZlbnRzKENPTU1PTl9FVkVOVFMsIHhociwgZmFjYWRlKTtcbiAgICAgIC8vcHJveHkgYWxsIHVwbG9hZCBldmVudHMgZnJvbSB0aGUgcmVhbCB0byB0aGUgdXBsb2FkIGZhY2FkZVxuICAgICAgaWYgKGZhY2FkZS51cGxvYWQpIHtcbiAgICAgICAgcHJveHlFdmVudHMoXG4gICAgICAgICAgQ09NTU9OX0VWRU5UUy5jb25jYXQoVVBMT0FEX0VWRU5UUyksXG4gICAgICAgICAgeGhyLnVwbG9hZCxcbiAgICAgICAgICBmYWNhZGUudXBsb2FkXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vcHJlcGFyZSByZXF1ZXN0IGFsbCBhdCBvbmNlXG4gICAgICB0cmFuc2l0aW5nID0gdHJ1ZTtcbiAgICAgIC8vcGVyZm9ybSBvcGVuXG4gICAgICB4aHIub3BlbihcbiAgICAgICAgcmVxdWVzdC5tZXRob2QsXG4gICAgICAgIHJlcXVlc3QudXJsLFxuICAgICAgICByZXF1ZXN0LmFzeW5jLFxuICAgICAgICByZXF1ZXN0LnVzZXIsXG4gICAgICAgIHJlcXVlc3QucGFzc1xuICAgICAgKTtcblxuICAgICAgLy93cml0ZSB4aHIgc2V0dGluZ3NcbiAgICAgIGZvciAoayBvZiBbXCJ0eXBlXCIsIFwidGltZW91dFwiLCBcIndpdGhDcmVkZW50aWFsc1wiXSkge1xuICAgICAgICBtb2RrID0gayA9PT0gXCJ0eXBlXCIgPyBcInJlc3BvbnNlVHlwZVwiIDogaztcbiAgICAgICAgaWYgKGsgaW4gcmVxdWVzdCkge1xuICAgICAgICAgIHhoclttb2RrXSA9IHJlcXVlc3Rba107XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy9pbnNlcnQgaGVhZGVyc1xuICAgICAgZm9yIChsZXQgaGVhZGVyIGluIHJlcXVlc3QuaGVhZGVycykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHJlcXVlc3QuaGVhZGVyc1toZWFkZXJdO1xuICAgICAgICBpZiAoaGVhZGVyKSB7XG4gICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vcmVhbCBzZW5kIVxuICAgICAgeGhyLnNlbmQocmVxdWVzdC5ib2R5KTtcbiAgICB9O1xuXG4gICAgY29uc3QgYmVmb3JlSG9va3MgPSBob29rcy5saXN0ZW5lcnMoXCJiZWZvcmVcIik7XG4gICAgLy9wcm9jZXNzIGJlZm9yZUhvb2tzIHNlcXVlbnRpYWxseVxuICAgIHZhciBwcm9jZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFiZWZvcmVIb29rcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHNlbmQoKTtcbiAgICAgIH1cbiAgICAgIC8vZ28gdG8gbmV4dCBob29rIE9SIG9wdGlvbmFsbHkgcHJvdmlkZSByZXNwb25zZVxuICAgICAgY29uc3QgZG9uZSA9IGZ1bmN0aW9uICh1c2VyUmVzcG9uc2UpIHtcbiAgICAgICAgLy9icmVhayBjaGFpbiAtIHByb3ZpZGUgZHVtbXkgcmVzcG9uc2UgKHJlYWR5U3RhdGUgNClcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHR5cGVvZiB1c2VyUmVzcG9uc2UgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAodHlwZW9mIHVzZXJSZXNwb25zZS5zdGF0dXMgPT09IFwibnVtYmVyXCIgfHxcbiAgICAgICAgICAgIHR5cGVvZiByZXNwb25zZS5zdGF0dXMgPT09IFwibnVtYmVyXCIpXG4gICAgICAgICkge1xuICAgICAgICAgIG1lcmdlT2JqZWN0cyh1c2VyUmVzcG9uc2UsIHJlc3BvbnNlKTtcbiAgICAgICAgICBpZiAoIShcImRhdGFcIiBpbiB1c2VyUmVzcG9uc2UpKSB7XG4gICAgICAgICAgICB1c2VyUmVzcG9uc2UuZGF0YSA9IHVzZXJSZXNwb25zZS5yZXNwb25zZSB8fCB1c2VyUmVzcG9uc2UudGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0UmVhZHlTdGF0ZSg0KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy9jb250aW51ZSBwcm9jZXNzaW5nIHVudGlsIG5vIGJlZm9yZUhvb2tzIGxlZnRcbiAgICAgICAgcHJvY2VzcygpO1xuICAgICAgfTtcbiAgICAgIC8vc3BlY2lmaWNhbGx5IHByb3ZpZGUgaGVhZGVycyAocmVhZHlTdGF0ZSAyKVxuICAgICAgZG9uZS5oZWFkID0gZnVuY3Rpb24gKHVzZXJSZXNwb25zZSkge1xuICAgICAgICBtZXJnZU9iamVjdHModXNlclJlc3BvbnNlLCByZXNwb25zZSk7XG4gICAgICAgIHNldFJlYWR5U3RhdGUoMik7XG4gICAgICB9O1xuICAgICAgLy9zcGVjaWZpY2FsbHkgcHJvdmlkZSBwYXJ0aWFsIHRleHQgKHJlc3BvbnNlVGV4dCAgcmVhZHlTdGF0ZSAzKVxuICAgICAgZG9uZS5wcm9ncmVzcyA9IGZ1bmN0aW9uICh1c2VyUmVzcG9uc2UpIHtcbiAgICAgICAgbWVyZ2VPYmplY3RzKHVzZXJSZXNwb25zZSwgcmVzcG9uc2UpO1xuICAgICAgICBzZXRSZWFkeVN0YXRlKDMpO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgaG9vayA9IGJlZm9yZUhvb2tzLnNoaWZ0KCk7XG4gICAgICAvL2FzeW5jIG9yIHN5bmM/XG4gICAgICBpZiAoaG9vay5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgZG9uZShob29rKHJlcXVlc3QpKTtcbiAgICAgIH0gZWxzZSBpZiAoaG9vay5sZW5ndGggPT09IDIgJiYgcmVxdWVzdC5hc3luYykge1xuICAgICAgICAvL2FzeW5jIGhhbmRsZXJzIG11c3QgdXNlIGFuIGFzeW5jIHhoclxuICAgICAgICBob29rKHJlcXVlc3QsIGRvbmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9za2lwIGFzeW5jIGhvb2sgb24gc3luYyByZXF1ZXN0c1xuICAgICAgICBkb25lKCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgICAvL2tpY2sgb2ZmXG4gICAgcHJvY2VzcygpO1xuICB9O1xuXG4gIGZhY2FkZS5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICBzdGF0dXMgPSBBQk9SVEVEO1xuICAgIGlmICh0cmFuc2l0aW5nKSB7XG4gICAgICB4aHIuYWJvcnQoKTsgLy90aGlzIHdpbGwgZW1pdCBhbiAnYWJvcnQnIGZvciB1c1xuICAgIH0gZWxzZSB7XG4gICAgICBmYWNhZGUuZGlzcGF0Y2hFdmVudChcImFib3J0XCIsIHt9KTtcbiAgICB9XG4gIH07XG5cbiAgZmFjYWRlLnNldFJlcXVlc3RIZWFkZXIgPSBmdW5jdGlvbiAoaGVhZGVyLCB2YWx1ZSkge1xuICAgIC8vdGhlIGZpcnN0IGhlYWRlciBzZXQgaXMgdXNlZCBmb3IgYWxsIGZ1dHVyZSBjYXNlLWFsdGVybmF0aXZlcyBvZiAnbmFtZSdcbiAgICBjb25zdCBsTmFtZSA9IGhlYWRlciAhPSBudWxsID8gaGVhZGVyLnRvTG93ZXJDYXNlKCkgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgbmFtZSA9IChyZXF1ZXN0LmhlYWRlck5hbWVzW2xOYW1lXSA9XG4gICAgICByZXF1ZXN0LmhlYWRlck5hbWVzW2xOYW1lXSB8fCBoZWFkZXIpO1xuICAgIC8vYXBwZW5kIGhlYWRlciB0byBhbnkgcHJldmlvdXMgdmFsdWVzXG4gICAgaWYgKHJlcXVlc3QuaGVhZGVyc1tuYW1lXSkge1xuICAgICAgdmFsdWUgPSByZXF1ZXN0LmhlYWRlcnNbbmFtZV0gKyBcIiwgXCIgKyB2YWx1ZTtcbiAgICB9XG4gICAgcmVxdWVzdC5oZWFkZXJzW25hbWVdID0gdmFsdWU7XG4gIH07XG4gIGZhY2FkZS5nZXRSZXNwb25zZUhlYWRlciA9IGhlYWRlciA9PlxuICAgIG51bGxpZnkocmVzcG9uc2UuaGVhZGVyc1toZWFkZXIgPyBoZWFkZXIudG9Mb3dlckNhc2UoKSA6IHVuZGVmaW5lZF0pO1xuXG4gIGZhY2FkZS5nZXRBbGxSZXNwb25zZUhlYWRlcnMgPSAoKSA9PlxuICAgIG51bGxpZnkoaGVhZGVycy5jb252ZXJ0KHJlc3BvbnNlLmhlYWRlcnMpKTtcblxuICAvL3Byb3h5IGNhbGwgb25seSB3aGVuIHN1cHBvcnRlZFxuICBpZiAoeGhyLm92ZXJyaWRlTWltZVR5cGUpIHtcbiAgICBmYWNhZGUub3ZlcnJpZGVNaW1lVHlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHhoci5vdmVycmlkZU1pbWVUeXBlLmFwcGx5KHhociwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgLy9jcmVhdGUgZW1pdHRlciB3aGVuIHN1cHBvcnRlZFxuICBpZiAoeGhyLnVwbG9hZCkge1xuICAgIGxldCB1cCA9IEV2ZW50RW1pdHRlcigpO1xuICAgIGZhY2FkZS51cGxvYWQgPSB1cDtcbiAgICByZXF1ZXN0LnVwbG9hZCA9IHVwO1xuICB9XG5cbiAgZmFjYWRlLlVOU0VOVCA9IDA7XG4gIGZhY2FkZS5PUEVORUQgPSAxO1xuICBmYWNhZGUuSEVBREVSU19SRUNFSVZFRCA9IDI7XG4gIGZhY2FkZS5MT0FESU5HID0gMztcbiAgZmFjYWRlLkRPTkUgPSA0O1xuXG4gIC8vIGZpbGwgaW4gZGVmYXVsdCB2YWx1ZXMgZm9yIGFuIGVtcHR5IFhIUiBvYmplY3QgYWNjb3JkaW5nIHRvIHRoZSBzcGVjXG4gIGZhY2FkZS5yZXNwb25zZSA9IFwiXCI7XG4gIGZhY2FkZS5yZXNwb25zZVRleHQgPSBcIlwiO1xuICBmYWNhZGUucmVzcG9uc2VYTUwgPSBudWxsO1xuICBmYWNhZGUucmVhZHlTdGF0ZSA9IDA7XG4gIGZhY2FkZS5zdGF0dXNUZXh0ID0gXCJcIjtcblxuICByZXR1cm4gZmFjYWRlO1xufTtcblxuWGhvb2skMS5VTlNFTlQgPSAwO1xuWGhvb2skMS5PUEVORUQgPSAxO1xuWGhvb2skMS5IRUFERVJTX1JFQ0VJVkVEID0gMjtcblhob29rJDEuTE9BRElORyA9IDM7XG5YaG9vayQxLkRPTkUgPSA0O1xuXG4vL3BhdGNoIGludGVyZmFjZVxudmFyIFhNTEh0dHBSZXF1ZXN0ID0ge1xuICBwYXRjaCgpIHtcbiAgICBpZiAoTmF0aXZlJDEpIHtcbiAgICAgIHdpbmRvd1JlZi5YTUxIdHRwUmVxdWVzdCA9IFhob29rJDE7XG4gICAgfVxuICB9LFxuICB1bnBhdGNoKCkge1xuICAgIGlmIChOYXRpdmUkMSkge1xuICAgICAgd2luZG93UmVmLlhNTEh0dHBSZXF1ZXN0ID0gTmF0aXZlJDE7XG4gICAgfVxuICB9LFxuICBOYXRpdmU6IE5hdGl2ZSQxLFxuICBYaG9vazogWGhvb2skMSxcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XG5cbi8vYnJvd3NlcidzIGZldGNoXG5jb25zdCBOYXRpdmUgPSB3aW5kb3dSZWYuZmV0Y2g7XG5mdW5jdGlvbiBjb3B5VG9PYmpGcm9tUmVxdWVzdChyZXEpIHtcbiAgICBjb25zdCBjb3B5ZWRLZXlzID0gW1xuICAgICAgICBcIm1ldGhvZFwiLFxuICAgICAgICBcImhlYWRlcnNcIixcbiAgICAgICAgXCJib2R5XCIsXG4gICAgICAgIFwibW9kZVwiLFxuICAgICAgICBcImNyZWRlbnRpYWxzXCIsXG4gICAgICAgIFwiY2FjaGVcIixcbiAgICAgICAgXCJyZWRpcmVjdFwiLFxuICAgICAgICBcInJlZmVycmVyXCIsXG4gICAgICAgIFwicmVmZXJyZXJQb2xpY3lcIixcbiAgICAgICAgXCJpbnRlZ3JpdHlcIixcbiAgICAgICAgXCJrZWVwYWxpdmVcIixcbiAgICAgICAgXCJzaWduYWxcIixcbiAgICAgICAgXCJ1cmxcIixcbiAgICBdO1xuICAgIGxldCBjb3B5ZWRPYmogPSB7fTtcbiAgICBjb3B5ZWRLZXlzLmZvckVhY2goa2V5ID0+IChjb3B5ZWRPYmpba2V5XSA9IHJlcVtrZXldKSk7XG4gICAgcmV0dXJuIGNvcHllZE9iajtcbn1cbmZ1bmN0aW9uIGNvdmVydEhlYWRlclRvUGxhaW5PYmooaGVhZGVycykge1xuICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgICByZXR1cm4gY292ZXJ0VERBYXJyeVRvT2JqKFsuLi5oZWFkZXJzLmVudHJpZXMoKV0pO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShoZWFkZXJzKSkge1xuICAgICAgICByZXR1cm4gY292ZXJ0VERBYXJyeVRvT2JqKGhlYWRlcnMpO1xuICAgIH1cbiAgICByZXR1cm4gaGVhZGVycztcbn1cbmZ1bmN0aW9uIGNvdmVydFREQWFycnlUb09iaihpbnB1dCkge1xuICAgIHJldHVybiBpbnB1dC5yZWR1Y2UoKHByZXYsIFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICBwcmV2W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgfSwge30pO1xufVxuLyoqXG4gKiBpZiBmZXRjaChoYWNrZWQgYnkgWGhvb2spIGFjY2VwdCBhIFJlcXVlc3QgYXMgYSBmaXJzdCBwYXJhbWV0ZXIsIGl0IHdpbGwgYmUgZGVzdHJjdXRlZCB0byBhIHBsYWluIG9iamVjdC5cbiAqIEZpbmFsbHkgdGhlIHdob2xlIG5ldHdvcmsgcmVxdWVzdCB3YXMgY29udmVydCB0byBmZWN0Y2goUmVxdWVzdC51cmwsIG90aGVyIG9wdGlvbnMpXG4gKi9cbmNvbnN0IFhob29rID0gZnVuY3Rpb24gKGlucHV0LCBpbml0ID0geyBoZWFkZXJzOiB7fSB9KSB7XG4gICAgbGV0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGluaXQpLCB7IGlzRmV0Y2g6IHRydWUgfSk7XG4gICAgaWYgKGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdCkge1xuICAgICAgICBjb25zdCByZXF1ZXN0T2JqID0gY29weVRvT2JqRnJvbVJlcXVlc3QoaW5wdXQpO1xuICAgICAgICBjb25zdCBwcmV2SGVhZGVycyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY292ZXJ0SGVhZGVyVG9QbGFpbk9iaihyZXF1ZXN0T2JqLmhlYWRlcnMpKSwgY292ZXJ0SGVhZGVyVG9QbGFpbk9iaihvcHRpb25zLmhlYWRlcnMpKTtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCByZXF1ZXN0T2JqKSwgaW5pdCksIHsgaGVhZGVyczogcHJldkhlYWRlcnMsIGFjY2VwdGVkUmVxdWVzdDogdHJ1ZSB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG9wdGlvbnMudXJsID0gaW5wdXQ7XG4gICAgfVxuICAgIGNvbnN0IGJlZm9yZUhvb2tzID0gaG9va3MubGlzdGVuZXJzKFwiYmVmb3JlXCIpO1xuICAgIGNvbnN0IGFmdGVySG9va3MgPSBob29rcy5saXN0ZW5lcnMoXCJhZnRlclwiKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBsZXQgZnVsbGZpbGVkID0gcmVzb2x2ZTtcbiAgICAgICAgY29uc3QgcHJvY2Vzc0FmdGVyID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoIWFmdGVySG9va3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bGxmaWxlZChyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBob29rID0gYWZ0ZXJIb29rcy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKGhvb2subGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgaG9vayhvcHRpb25zLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NBZnRlcihyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChob29rLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgICAgIHJldHVybiBob29rKG9wdGlvbnMsIHJlc3BvbnNlLCBwcm9jZXNzQWZ0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NBZnRlcihyZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGRvbmUgPSBmdW5jdGlvbiAodXNlclJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAodXNlclJlc3BvbnNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZSh1c2VyUmVzcG9uc2UuYm9keSB8fCB1c2VyUmVzcG9uc2UudGV4dCwgdXNlclJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBwcm9jZXNzQWZ0ZXIocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29udGludWUgcHJvY2Vzc2luZyB1bnRpbCBubyBob29rcyBsZWZ0XG4gICAgICAgICAgICBwcm9jZXNzQmVmb3JlKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHByb2Nlc3NCZWZvcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIWJlZm9yZUhvb2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHNlbmQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBob29rID0gYmVmb3JlSG9va3Muc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChob29rLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkb25lKGhvb2sob3B0aW9ucykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaG9vay5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9vayhvcHRpb25zLCBkb25lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2VuZCA9ICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdXJsLCBpc0ZldGNoLCBhY2NlcHRlZFJlcXVlc3QgfSA9IG9wdGlvbnMsIHJlc3RJbml0ID0gX19yZXN0KG9wdGlvbnMsIFtcInVybFwiLCBcImlzRmV0Y2hcIiwgXCJhY2NlcHRlZFJlcXVlc3RcIl0pO1xuICAgICAgICAgICAgaWYgKGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdCAmJiByZXN0SW5pdC5ib2R5IGluc3RhbmNlb2YgUmVhZGFibGVTdHJlYW0pIHtcbiAgICAgICAgICAgICAgICByZXN0SW5pdC5ib2R5ID0geWllbGQgbmV3IFJlc3BvbnNlKHJlc3RJbml0LmJvZHkpLnRleHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBOYXRpdmUodXJsLCByZXN0SW5pdClcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiBwcm9jZXNzQWZ0ZXIocmVzcG9uc2UpKVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgZnVsbGZpbGVkID0gcmVqZWN0O1xuICAgICAgICAgICAgICAgIHByb2Nlc3NBZnRlcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJvY2Vzc0JlZm9yZSgpO1xuICAgIH0pO1xufTtcbi8vcGF0Y2ggaW50ZXJmYWNlXG52YXIgZmV0Y2ggPSB7XG4gICAgcGF0Y2goKSB7XG4gICAgICAgIGlmIChOYXRpdmUpIHtcbiAgICAgICAgICAgIHdpbmRvd1JlZi5mZXRjaCA9IFhob29rO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB1bnBhdGNoKCkge1xuICAgICAgICBpZiAoTmF0aXZlKSB7XG4gICAgICAgICAgICB3aW5kb3dSZWYuZmV0Y2ggPSBOYXRpdmU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIE5hdGl2ZSxcbiAgICBYaG9vayxcbn07XG5cbi8vdGhlIGdsb2JhbCBob29rcyBldmVudCBlbWl0dGVyIGlzIGFsc28gdGhlIGdsb2JhbCB4aG9vayBvYmplY3Rcbi8vKG5vdCB0aGUgYmVzdCBkZWNpc2lvbiBpbiBoaW5kc2lnaHQpXG5jb25zdCB4aG9vayA9IGhvb2tzO1xueGhvb2suRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuLy9tb2RpZnkgaG9va3Ncbnhob29rLmJlZm9yZSA9IGZ1bmN0aW9uIChoYW5kbGVyLCBpKSB7XG4gIGlmIChoYW5kbGVyLmxlbmd0aCA8IDEgfHwgaGFuZGxlci5sZW5ndGggPiAyKSB7XG4gICAgdGhyb3cgXCJpbnZhbGlkIGhvb2tcIjtcbiAgfVxuICByZXR1cm4geGhvb2sub24oXCJiZWZvcmVcIiwgaGFuZGxlciwgaSk7XG59O1xueGhvb2suYWZ0ZXIgPSBmdW5jdGlvbiAoaGFuZGxlciwgaSkge1xuICBpZiAoaGFuZGxlci5sZW5ndGggPCAyIHx8IGhhbmRsZXIubGVuZ3RoID4gMykge1xuICAgIHRocm93IFwiaW52YWxpZCBob29rXCI7XG4gIH1cbiAgcmV0dXJuIHhob29rLm9uKFwiYWZ0ZXJcIiwgaGFuZGxlciwgaSk7XG59O1xuXG4vL2dsb2JhbGx5IGVuYWJsZS9kaXNhYmxlXG54aG9vay5lbmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gIFhNTEh0dHBSZXF1ZXN0LnBhdGNoKCk7XG4gIGZldGNoLnBhdGNoKCk7XG59O1xueGhvb2suZGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgWE1MSHR0cFJlcXVlc3QudW5wYXRjaCgpO1xuICBmZXRjaC51bnBhdGNoKCk7XG59O1xuLy9leHBvc2UgbmF0aXZlIG9iamVjdHNcbnhob29rLlhNTEh0dHBSZXF1ZXN0ID0gWE1MSHR0cFJlcXVlc3QuTmF0aXZlO1xueGhvb2suZmV0Y2ggPSBmZXRjaC5OYXRpdmU7XG5cbi8vZXhwb3NlIGhlbHBlcnNcbnhob29rLmhlYWRlcnMgPSBoZWFkZXJzLmNvbnZlcnQ7XG5cbi8vZW5hYmxlIGJ5IGRlZmF1bHRcbnhob29rLmVuYWJsZSgpO1xuXG5leHBvcnQgeyB4aG9vayBhcyBkZWZhdWx0IH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5qZWN0LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9