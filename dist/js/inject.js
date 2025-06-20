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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLHVCQUF1QixFQUFFO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGtCQUFrQixtQkFBbUI7QUFDckM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLGlCQUFpQixvQkFBb0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0ZhO0FBQ2Isd0JBQXdCLG1CQUFPLENBQUMsb0VBQW1CO0FBQ25ELHdCQUF3QixtQkFBTyxDQUFDLDBFQUFzQjtBQUN0RCxxQkFBcUIsbUJBQU8sQ0FBQyw4REFBZ0I7O0FBRTdDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0EsRUFBRTtBQUNGOztBQUVBLGVB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0JBQWdCOztBQUVoQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxpREFBaUQsR0FBRztBQUNwRDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0IsTUFBTTtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixNQUFNO0FBQ04sc0NBQXND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RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTW9ra3UvLi9ub2RlX21vZHVsZXMvZGVjb2RlLXVyaS1jb21wb25lbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9ub2RlX21vZHVsZXMvcXVlcnktc3RyaW5nL2luZGV4LmpzIiwid2VicGFjazovL01va2t1Ly4vbm9kZV9tb2R1bGVzL3NwbGl0LW9uLWZpcnN0L2luZGV4LmpzIiwid2VicGFjazovL01va2t1Ly4vbm9kZV9tb2R1bGVzL3N0cmljdC11cmktZW5jb2RlL2luZGV4LmpzIiwid2VicGFjazovL01va2t1Ly4vc3JjL2luamVjdC50cyIsIndlYnBhY2s6Ly9Nb2trdS8uL3NyYy9wYW5lbC9BcHAvc2VydmljZS9pbmRleC50cyIsIndlYnBhY2s6Ly9Nb2trdS8uL3NyYy9wYW5lbC9BcHAvc2VydmljZS9tZXNzYWdlU2VydmljZS50cyIsIndlYnBhY2s6Ly9Nb2trdS8uL3NyYy9zZXJ2aWNlcy9oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9zcmMvc2VydmljZXMvaWRGYWN0b3J5LnRzIiwid2VicGFjazovL01va2t1Ly4vc3JjL3NlcnZpY2VzL21lc3NhZ2UvbWVzc2FnZUJ1cy50cyIsIndlYnBhY2s6Ly9Nb2trdS8uL25vZGVfbW9kdWxlcy94aG9vay9lcy9tYWluLmpzIiwid2VicGFjazovL01va2t1L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL01va2t1L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Nb2trdS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL01va2t1L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vTW9ra3Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Nb2trdS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL01va2t1L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9Nb2trdS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xudmFyIHRva2VuID0gJyVbYS1mMC05XXsyfSc7XG52YXIgc2luZ2xlTWF0Y2hlciA9IG5ldyBSZWdFeHAodG9rZW4sICdnaScpO1xudmFyIG11bHRpTWF0Y2hlciA9IG5ldyBSZWdFeHAoJygnICsgdG9rZW4gKyAnKSsnLCAnZ2knKTtcblxuZnVuY3Rpb24gZGVjb2RlQ29tcG9uZW50cyhjb21wb25lbnRzLCBzcGxpdCkge1xuXHR0cnkge1xuXHRcdC8vIFRyeSB0byBkZWNvZGUgdGhlIGVudGlyZSBzdHJpbmcgZmlyc3Rcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGNvbXBvbmVudHMuam9pbignJykpO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBEbyBub3RoaW5nXG5cdH1cblxuXHRpZiAoY29tcG9uZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50cztcblx0fVxuXG5cdHNwbGl0ID0gc3BsaXQgfHwgMTtcblxuXHQvLyBTcGxpdCB0aGUgYXJyYXkgaW4gMiBwYXJ0c1xuXHR2YXIgbGVmdCA9IGNvbXBvbmVudHMuc2xpY2UoMCwgc3BsaXQpO1xuXHR2YXIgcmlnaHQgPSBjb21wb25lbnRzLnNsaWNlKHNwbGl0KTtcblxuXHRyZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5jYWxsKFtdLCBkZWNvZGVDb21wb25lbnRzKGxlZnQpLCBkZWNvZGVDb21wb25lbnRzKHJpZ2h0KSk7XG59XG5cbmZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoaW5wdXQpO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHR2YXIgdG9rZW5zID0gaW5wdXQubWF0Y2goc2luZ2xlTWF0Y2hlcik7XG5cblx0XHRmb3IgKHZhciBpID0gMTsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aW5wdXQgPSBkZWNvZGVDb21wb25lbnRzKHRva2VucywgaSkuam9pbignJyk7XG5cblx0XHRcdHRva2VucyA9IGlucHV0Lm1hdGNoKHNpbmdsZU1hdGNoZXIpO1xuXHRcdH1cblxuXHRcdHJldHVybiBpbnB1dDtcblx0fVxufVxuXG5mdW5jdGlvbiBjdXN0b21EZWNvZGVVUklDb21wb25lbnQoaW5wdXQpIHtcblx0Ly8gS2VlcCB0cmFjayBvZiBhbGwgdGhlIHJlcGxhY2VtZW50cyBhbmQgcHJlZmlsbCB0aGUgbWFwIHdpdGggdGhlIGBCT01gXG5cdHZhciByZXBsYWNlTWFwID0ge1xuXHRcdCclRkUlRkYnOiAnXFx1RkZGRFxcdUZGRkQnLFxuXHRcdCclRkYlRkUnOiAnXFx1RkZGRFxcdUZGRkQnXG5cdH07XG5cblx0dmFyIG1hdGNoID0gbXVsdGlNYXRjaGVyLmV4ZWMoaW5wdXQpO1xuXHR3aGlsZSAobWF0Y2gpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gRGVjb2RlIGFzIGJpZyBjaHVua3MgYXMgcG9zc2libGVcblx0XHRcdHJlcGxhY2VNYXBbbWF0Y2hbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzBdKTtcblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdHZhciByZXN1bHQgPSBkZWNvZGUobWF0Y2hbMF0pO1xuXG5cdFx0XHRpZiAocmVzdWx0ICE9PSBtYXRjaFswXSkge1xuXHRcdFx0XHRyZXBsYWNlTWFwW21hdGNoWzBdXSA9IHJlc3VsdDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRtYXRjaCA9IG11bHRpTWF0Y2hlci5leGVjKGlucHV0KTtcblx0fVxuXG5cdC8vIEFkZCBgJUMyYCBhdCB0aGUgZW5kIG9mIHRoZSBtYXAgdG8gbWFrZSBzdXJlIGl0IGRvZXMgbm90IHJlcGxhY2UgdGhlIGNvbWJpbmF0b3IgYmVmb3JlIGV2ZXJ5dGhpbmcgZWxzZVxuXHRyZXBsYWNlTWFwWyclQzInXSA9ICdcXHVGRkZEJztcblxuXHR2YXIgZW50cmllcyA9IE9iamVjdC5rZXlzKHJlcGxhY2VNYXApO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkrKykge1xuXHRcdC8vIFJlcGxhY2UgYWxsIGRlY29kZWQgY29tcG9uZW50c1xuXHRcdHZhciBrZXkgPSBlbnRyaWVzW2ldO1xuXHRcdGlucHV0ID0gaW5wdXQucmVwbGFjZShuZXcgUmVnRXhwKGtleSwgJ2cnKSwgcmVwbGFjZU1hcFtrZXldKTtcblx0fVxuXG5cdHJldHVybiBpbnB1dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZW5jb2RlZFVSSSkge1xuXHRpZiAodHlwZW9mIGVuY29kZWRVUkkgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYGVuY29kZWRVUklgIHRvIGJlIG9mIHR5cGUgYHN0cmluZ2AsIGdvdCBgJyArIHR5cGVvZiBlbmNvZGVkVVJJICsgJ2AnKTtcblx0fVxuXG5cdHRyeSB7XG5cdFx0ZW5jb2RlZFVSSSA9IGVuY29kZWRVUkkucmVwbGFjZSgvXFwrL2csICcgJyk7XG5cblx0XHQvLyBUcnkgdGhlIGJ1aWx0IGluIGRlY29kZXIgZmlyc3Rcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVuY29kZWRVUkkpO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBGYWxsYmFjayB0byBhIG1vcmUgYWR2YW5jZWQgZGVjb2RlclxuXHRcdHJldHVybiBjdXN0b21EZWNvZGVVUklDb21wb25lbnQoZW5jb2RlZFVSSSk7XG5cdH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBzdHJpY3RVcmlFbmNvZGUgPSByZXF1aXJlKCdzdHJpY3QtdXJpLWVuY29kZScpO1xuY29uc3QgZGVjb2RlQ29tcG9uZW50ID0gcmVxdWlyZSgnZGVjb2RlLXVyaS1jb21wb25lbnQnKTtcbmNvbnN0IHNwbGl0T25GaXJzdCA9IHJlcXVpcmUoJ3NwbGl0LW9uLWZpcnN0Jyk7XG5cbmNvbnN0IGlzTnVsbE9yVW5kZWZpbmVkID0gdmFsdWUgPT4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZDtcblxuZnVuY3Rpb24gZW5jb2RlckZvckFycmF5Rm9ybWF0KG9wdGlvbnMpIHtcblx0c3dpdGNoIChvcHRpb25zLmFycmF5Rm9ybWF0KSB7XG5cdFx0Y2FzZSAnaW5kZXgnOlxuXHRcdFx0cmV0dXJuIGtleSA9PiAocmVzdWx0LCB2YWx1ZSkgPT4ge1xuXHRcdFx0XHRjb25zdCBpbmRleCA9IHJlc3VsdC5sZW5ndGg7XG5cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHZhbHVlID09PSB1bmRlZmluZWQgfHxcblx0XHRcdFx0XHQob3B0aW9ucy5za2lwTnVsbCAmJiB2YWx1ZSA9PT0gbnVsbCkgfHxcblx0XHRcdFx0XHQob3B0aW9ucy5za2lwRW1wdHlTdHJpbmcgJiYgdmFsdWUgPT09ICcnKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFsuLi5yZXN1bHQsIFtlbmNvZGUoa2V5LCBvcHRpb25zKSwgJ1snLCBpbmRleCwgJ10nXS5qb2luKCcnKV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRcdC4uLnJlc3VsdCxcblx0XHRcdFx0XHRbZW5jb2RlKGtleSwgb3B0aW9ucyksICdbJywgZW5jb2RlKGluZGV4LCBvcHRpb25zKSwgJ109JywgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbignJylcblx0XHRcdFx0XTtcblx0XHRcdH07XG5cblx0XHRjYXNlICdicmFja2V0Jzpcblx0XHRcdHJldHVybiBrZXkgPT4gKHJlc3VsdCwgdmFsdWUpID0+IHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHZhbHVlID09PSB1bmRlZmluZWQgfHxcblx0XHRcdFx0XHQob3B0aW9ucy5za2lwTnVsbCAmJiB2YWx1ZSA9PT0gbnVsbCkgfHxcblx0XHRcdFx0XHQob3B0aW9ucy5za2lwRW1wdHlTdHJpbmcgJiYgdmFsdWUgPT09ICcnKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFsuLi5yZXN1bHQsIFtlbmNvZGUoa2V5LCBvcHRpb25zKSwgJ1tdJ10uam9pbignJyldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIFsuLi5yZXN1bHQsIFtlbmNvZGUoa2V5LCBvcHRpb25zKSwgJ1tdPScsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4oJycpXTtcblx0XHRcdH07XG5cblx0XHRjYXNlICdjb21tYSc6XG5cdFx0Y2FzZSAnc2VwYXJhdG9yJzpcblx0XHRcdHJldHVybiBrZXkgPT4gKHJlc3VsdCwgdmFsdWUpID0+IHtcblx0XHRcdFx0aWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFtbZW5jb2RlKGtleSwgb3B0aW9ucyksICc9JywgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbignJyldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIFtbcmVzdWx0LCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKG9wdGlvbnMuYXJyYXlGb3JtYXRTZXBhcmF0b3IpXTtcblx0XHRcdH07XG5cblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIGtleSA9PiAocmVzdWx0LCB2YWx1ZSkgPT4ge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0dmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBOdWxsICYmIHZhbHVlID09PSBudWxsKSB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBFbXB0eVN0cmluZyAmJiB2YWx1ZSA9PT0gJycpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgZW5jb2RlKGtleSwgb3B0aW9ucyldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIFsuLi5yZXN1bHQsIFtlbmNvZGUoa2V5LCBvcHRpb25zKSwgJz0nLCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKCcnKV07XG5cdFx0XHR9O1xuXHR9XG59XG5cbmZ1bmN0aW9uIHBhcnNlckZvckFycmF5Rm9ybWF0KG9wdGlvbnMpIHtcblx0bGV0IHJlc3VsdDtcblxuXHRzd2l0Y2ggKG9wdGlvbnMuYXJyYXlGb3JtYXQpIHtcblx0XHRjYXNlICdpbmRleCc6XG5cdFx0XHRyZXR1cm4gKGtleSwgdmFsdWUsIGFjY3VtdWxhdG9yKSA9PiB7XG5cdFx0XHRcdHJlc3VsdCA9IC9cXFsoXFxkKilcXF0kLy5leGVjKGtleSk7XG5cblx0XHRcdFx0a2V5ID0ga2V5LnJlcGxhY2UoL1xcW1xcZCpcXF0kLywgJycpO1xuXG5cdFx0XHRcdGlmICghcmVzdWx0KSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChhY2N1bXVsYXRvcltrZXldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0ge307XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhY2N1bXVsYXRvcltrZXldW3Jlc3VsdFsxXV0gPSB2YWx1ZTtcblx0XHRcdH07XG5cblx0XHRjYXNlICdicmFja2V0Jzpcblx0XHRcdHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcblx0XHRcdFx0cmVzdWx0ID0gLyhcXFtcXF0pJC8uZXhlYyhrZXkpO1xuXHRcdFx0XHRrZXkgPSBrZXkucmVwbGFjZSgvXFxbXFxdJC8sICcnKTtcblxuXHRcdFx0XHRpZiAoIXJlc3VsdCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYWNjdW11bGF0b3Jba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IFt2YWx1ZV07XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IFtdLmNvbmNhdChhY2N1bXVsYXRvcltrZXldLCB2YWx1ZSk7XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnY29tbWEnOlxuXHRcdGNhc2UgJ3NlcGFyYXRvcic6XG5cdFx0XHRyZXR1cm4gKGtleSwgdmFsdWUsIGFjY3VtdWxhdG9yKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGlzQXJyYXkgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLnNwbGl0KCcnKS5pbmRleE9mKG9wdGlvbnMuYXJyYXlGb3JtYXRTZXBhcmF0b3IpID4gLTE7XG5cdFx0XHRcdGNvbnN0IG5ld1ZhbHVlID0gaXNBcnJheSA/IHZhbHVlLnNwbGl0KG9wdGlvbnMuYXJyYXlGb3JtYXRTZXBhcmF0b3IpLm1hcChpdGVtID0+IGRlY29kZShpdGVtLCBvcHRpb25zKSkgOiB2YWx1ZSA9PT0gbnVsbCA/IHZhbHVlIDogZGVjb2RlKHZhbHVlLCBvcHRpb25zKTtcblx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IG5ld1ZhbHVlO1xuXHRcdFx0fTtcblxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gKGtleSwgdmFsdWUsIGFjY3VtdWxhdG9yKSA9PiB7XG5cdFx0XHRcdGlmIChhY2N1bXVsYXRvcltrZXldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IFtdLmNvbmNhdChhY2N1bXVsYXRvcltrZXldLCB2YWx1ZSk7XG5cdFx0XHR9O1xuXHR9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQXJyYXlGb3JtYXRTZXBhcmF0b3IodmFsdWUpIHtcblx0aWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgfHwgdmFsdWUubGVuZ3RoICE9PSAxKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignYXJyYXlGb3JtYXRTZXBhcmF0b3IgbXVzdCBiZSBzaW5nbGUgY2hhcmFjdGVyIHN0cmluZycpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWx1ZSwgb3B0aW9ucykge1xuXHRpZiAob3B0aW9ucy5lbmNvZGUpIHtcblx0XHRyZXR1cm4gb3B0aW9ucy5zdHJpY3QgPyBzdHJpY3RVcmlFbmNvZGUodmFsdWUpIDogZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZGVjb2RlKHZhbHVlLCBvcHRpb25zKSB7XG5cdGlmIChvcHRpb25zLmRlY29kZSkge1xuXHRcdHJldHVybiBkZWNvZGVDb21wb25lbnQodmFsdWUpO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBrZXlzU29ydGVyKGlucHV0KSB7XG5cdGlmIChBcnJheS5pc0FycmF5KGlucHV0KSkge1xuXHRcdHJldHVybiBpbnB1dC5zb3J0KCk7XG5cdH1cblxuXHRpZiAodHlwZW9mIGlucHV0ID09PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBrZXlzU29ydGVyKE9iamVjdC5rZXlzKGlucHV0KSlcblx0XHRcdC5zb3J0KChhLCBiKSA9PiBOdW1iZXIoYSkgLSBOdW1iZXIoYikpXG5cdFx0XHQubWFwKGtleSA9PiBpbnB1dFtrZXldKTtcblx0fVxuXG5cdHJldHVybiBpbnB1dDtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSGFzaChpbnB1dCkge1xuXHRjb25zdCBoYXNoU3RhcnQgPSBpbnB1dC5pbmRleE9mKCcjJyk7XG5cdGlmIChoYXNoU3RhcnQgIT09IC0xKSB7XG5cdFx0aW5wdXQgPSBpbnB1dC5zbGljZSgwLCBoYXNoU3RhcnQpO1xuXHR9XG5cblx0cmV0dXJuIGlucHV0O1xufVxuXG5mdW5jdGlvbiBnZXRIYXNoKHVybCkge1xuXHRsZXQgaGFzaCA9ICcnO1xuXHRjb25zdCBoYXNoU3RhcnQgPSB1cmwuaW5kZXhPZignIycpO1xuXHRpZiAoaGFzaFN0YXJ0ICE9PSAtMSkge1xuXHRcdGhhc2ggPSB1cmwuc2xpY2UoaGFzaFN0YXJ0KTtcblx0fVxuXG5cdHJldHVybiBoYXNoO1xufVxuXG5mdW5jdGlvbiBleHRyYWN0KGlucHV0KSB7XG5cdGlucHV0ID0gcmVtb3ZlSGFzaChpbnB1dCk7XG5cdGNvbnN0IHF1ZXJ5U3RhcnQgPSBpbnB1dC5pbmRleE9mKCc/Jyk7XG5cdGlmIChxdWVyeVN0YXJ0ID09PSAtMSkge1xuXHRcdHJldHVybiAnJztcblx0fVxuXG5cdHJldHVybiBpbnB1dC5zbGljZShxdWVyeVN0YXJ0ICsgMSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVmFsdWUodmFsdWUsIG9wdGlvbnMpIHtcblx0aWYgKG9wdGlvbnMucGFyc2VOdW1iZXJzICYmICFOdW1iZXIuaXNOYU4oTnVtYmVyKHZhbHVlKSkgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUudHJpbSgpICE9PSAnJykpIHtcblx0XHR2YWx1ZSA9IE51bWJlcih2YWx1ZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5wYXJzZUJvb2xlYW5zICYmIHZhbHVlICE9PSBudWxsICYmICh2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZScgfHwgdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ2ZhbHNlJykpIHtcblx0XHR2YWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJztcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gcGFyc2UoaW5wdXQsIG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdGRlY29kZTogdHJ1ZSxcblx0XHRzb3J0OiB0cnVlLFxuXHRcdGFycmF5Rm9ybWF0OiAnbm9uZScsXG5cdFx0YXJyYXlGb3JtYXRTZXBhcmF0b3I6ICcsJyxcblx0XHRwYXJzZU51bWJlcnM6IGZhbHNlLFxuXHRcdHBhcnNlQm9vbGVhbnM6IGZhbHNlXG5cdH0sIG9wdGlvbnMpO1xuXG5cdHZhbGlkYXRlQXJyYXlGb3JtYXRTZXBhcmF0b3Iob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcik7XG5cblx0Y29uc3QgZm9ybWF0dGVyID0gcGFyc2VyRm9yQXJyYXlGb3JtYXQob3B0aW9ucyk7XG5cblx0Ly8gQ3JlYXRlIGFuIG9iamVjdCB3aXRoIG5vIHByb3RvdHlwZVxuXHRjb25zdCByZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5cdGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXG5cdGlucHV0ID0gaW5wdXQudHJpbSgpLnJlcGxhY2UoL15bPyMmXS8sICcnKTtcblxuXHRpZiAoIWlucHV0KSB7XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXG5cdGZvciAoY29uc3QgcGFyYW0gb2YgaW5wdXQuc3BsaXQoJyYnKSkge1xuXHRcdGxldCBba2V5LCB2YWx1ZV0gPSBzcGxpdE9uRmlyc3Qob3B0aW9ucy5kZWNvZGUgPyBwYXJhbS5yZXBsYWNlKC9cXCsvZywgJyAnKSA6IHBhcmFtLCAnPScpO1xuXG5cdFx0Ly8gTWlzc2luZyBgPWAgc2hvdWxkIGJlIGBudWxsYDpcblx0XHQvLyBodHRwOi8vdzMub3JnL1RSLzIwMTIvV0QtdXJsLTIwMTIwNTI0LyNjb2xsZWN0LXVybC1wYXJhbWV0ZXJzXG5cdFx0dmFsdWUgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IFsnY29tbWEnLCAnc2VwYXJhdG9yJ10uaW5jbHVkZXMob3B0aW9ucy5hcnJheUZvcm1hdCkgPyB2YWx1ZSA6IGRlY29kZSh2YWx1ZSwgb3B0aW9ucyk7XG5cdFx0Zm9ybWF0dGVyKGRlY29kZShrZXksIG9wdGlvbnMpLCB2YWx1ZSwgcmV0KTtcblx0fVxuXG5cdGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHJldCkpIHtcblx0XHRjb25zdCB2YWx1ZSA9IHJldFtrZXldO1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsKSB7XG5cdFx0XHRmb3IgKGNvbnN0IGsgb2YgT2JqZWN0LmtleXModmFsdWUpKSB7XG5cdFx0XHRcdHZhbHVlW2tdID0gcGFyc2VWYWx1ZSh2YWx1ZVtrXSwgb3B0aW9ucyk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldFtrZXldID0gcGFyc2VWYWx1ZSh2YWx1ZSwgb3B0aW9ucyk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc29ydCA9PT0gZmFsc2UpIHtcblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0cmV0dXJuIChvcHRpb25zLnNvcnQgPT09IHRydWUgPyBPYmplY3Qua2V5cyhyZXQpLnNvcnQoKSA6IE9iamVjdC5rZXlzKHJldCkuc29ydChvcHRpb25zLnNvcnQpKS5yZWR1Y2UoKHJlc3VsdCwga2V5KSA9PiB7XG5cdFx0Y29uc3QgdmFsdWUgPSByZXRba2V5XTtcblx0XHRpZiAoQm9vbGVhbih2YWx1ZSkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRcdC8vIFNvcnQgb2JqZWN0IGtleXMsIG5vdCB2YWx1ZXNcblx0XHRcdHJlc3VsdFtrZXldID0ga2V5c1NvcnRlcih2YWx1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdFtrZXldID0gdmFsdWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSwgT2JqZWN0LmNyZWF0ZShudWxsKSk7XG59XG5cbmV4cG9ydHMuZXh0cmFjdCA9IGV4dHJhY3Q7XG5leHBvcnRzLnBhcnNlID0gcGFyc2U7XG5cbmV4cG9ydHMuc3RyaW5naWZ5ID0gKG9iamVjdCwgb3B0aW9ucykgPT4ge1xuXHRpZiAoIW9iamVjdCkge1xuXHRcdHJldHVybiAnJztcblx0fVxuXG5cdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRlbmNvZGU6IHRydWUsXG5cdFx0c3RyaWN0OiB0cnVlLFxuXHRcdGFycmF5Rm9ybWF0OiAnbm9uZScsXG5cdFx0YXJyYXlGb3JtYXRTZXBhcmF0b3I6ICcsJ1xuXHR9LCBvcHRpb25zKTtcblxuXHR2YWxpZGF0ZUFycmF5Rm9ybWF0U2VwYXJhdG9yKG9wdGlvbnMuYXJyYXlGb3JtYXRTZXBhcmF0b3IpO1xuXG5cdGNvbnN0IHNob3VsZEZpbHRlciA9IGtleSA9PiAoXG5cdFx0KG9wdGlvbnMuc2tpcE51bGwgJiYgaXNOdWxsT3JVbmRlZmluZWQob2JqZWN0W2tleV0pKSB8fFxuXHRcdChvcHRpb25zLnNraXBFbXB0eVN0cmluZyAmJiBvYmplY3Rba2V5XSA9PT0gJycpXG5cdCk7XG5cblx0Y29uc3QgZm9ybWF0dGVyID0gZW5jb2RlckZvckFycmF5Rm9ybWF0KG9wdGlvbnMpO1xuXG5cdGNvbnN0IG9iamVjdENvcHkgPSB7fTtcblxuXHRmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhvYmplY3QpKSB7XG5cdFx0aWYgKCFzaG91bGRGaWx0ZXIoa2V5KSkge1xuXHRcdFx0b2JqZWN0Q29weVtrZXldID0gb2JqZWN0W2tleV07XG5cdFx0fVxuXHR9XG5cblx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdENvcHkpO1xuXG5cdGlmIChvcHRpb25zLnNvcnQgIT09IGZhbHNlKSB7XG5cdFx0a2V5cy5zb3J0KG9wdGlvbnMuc29ydCk7XG5cdH1cblxuXHRyZXR1cm4ga2V5cy5tYXAoa2V5ID0+IHtcblx0XHRjb25zdCB2YWx1ZSA9IG9iamVjdFtrZXldO1xuXG5cdFx0aWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cblx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBlbmNvZGUoa2V5LCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdFx0XHQucmVkdWNlKGZvcm1hdHRlcihrZXkpLCBbXSlcblx0XHRcdFx0LmpvaW4oJyYnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZW5jb2RlKGtleSwgb3B0aW9ucykgKyAnPScgKyBlbmNvZGUodmFsdWUsIG9wdGlvbnMpO1xuXHR9KS5maWx0ZXIoeCA9PiB4Lmxlbmd0aCA+IDApLmpvaW4oJyYnKTtcbn07XG5cbmV4cG9ydHMucGFyc2VVcmwgPSAoaW5wdXQsIG9wdGlvbnMpID0+IHtcblx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdGRlY29kZTogdHJ1ZVxuXHR9LCBvcHRpb25zKTtcblxuXHRjb25zdCBbdXJsLCBoYXNoXSA9IHNwbGl0T25GaXJzdChpbnB1dCwgJyMnKTtcblxuXHRyZXR1cm4gT2JqZWN0LmFzc2lnbihcblx0XHR7XG5cdFx0XHR1cmw6IHVybC5zcGxpdCgnPycpWzBdIHx8ICcnLFxuXHRcdFx0cXVlcnk6IHBhcnNlKGV4dHJhY3QoaW5wdXQpLCBvcHRpb25zKVxuXHRcdH0sXG5cdFx0b3B0aW9ucyAmJiBvcHRpb25zLnBhcnNlRnJhZ21lbnRJZGVudGlmaWVyICYmIGhhc2ggPyB7ZnJhZ21lbnRJZGVudGlmaWVyOiBkZWNvZGUoaGFzaCwgb3B0aW9ucyl9IDoge31cblx0KTtcbn07XG5cbmV4cG9ydHMuc3RyaW5naWZ5VXJsID0gKGlucHV0LCBvcHRpb25zKSA9PiB7XG5cdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRlbmNvZGU6IHRydWUsXG5cdFx0c3RyaWN0OiB0cnVlXG5cdH0sIG9wdGlvbnMpO1xuXG5cdGNvbnN0IHVybCA9IHJlbW92ZUhhc2goaW5wdXQudXJsKS5zcGxpdCgnPycpWzBdIHx8ICcnO1xuXHRjb25zdCBxdWVyeUZyb21VcmwgPSBleHBvcnRzLmV4dHJhY3QoaW5wdXQudXJsKTtcblx0Y29uc3QgcGFyc2VkUXVlcnlGcm9tVXJsID0gZXhwb3J0cy5wYXJzZShxdWVyeUZyb21VcmwsIHtzb3J0OiBmYWxzZX0pO1xuXG5cdGNvbnN0IHF1ZXJ5ID0gT2JqZWN0LmFzc2lnbihwYXJzZWRRdWVyeUZyb21VcmwsIGlucHV0LnF1ZXJ5KTtcblx0bGV0IHF1ZXJ5U3RyaW5nID0gZXhwb3J0cy5zdHJpbmdpZnkocXVlcnksIG9wdGlvbnMpO1xuXHRpZiAocXVlcnlTdHJpbmcpIHtcblx0XHRxdWVyeVN0cmluZyA9IGA/JHtxdWVyeVN0cmluZ31gO1xuXHR9XG5cblx0bGV0IGhhc2ggPSBnZXRIYXNoKGlucHV0LnVybCk7XG5cdGlmIChpbnB1dC5mcmFnbWVudElkZW50aWZpZXIpIHtcblx0XHRoYXNoID0gYCMke2VuY29kZShpbnB1dC5mcmFnbWVudElkZW50aWZpZXIsIG9wdGlvbnMpfWA7XG5cdH1cblxuXHRyZXR1cm4gYCR7dXJsfSR7cXVlcnlTdHJpbmd9JHtoYXNofWA7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzdHJpbmcsIHNlcGFyYXRvcikgPT4ge1xuXHRpZiAoISh0eXBlb2Ygc3RyaW5nID09PSAnc3RyaW5nJyAmJiB0eXBlb2Ygc2VwYXJhdG9yID09PSAnc3RyaW5nJykpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCB0aGUgYXJndW1lbnRzIHRvIGJlIG9mIHR5cGUgYHN0cmluZ2AnKTtcblx0fVxuXG5cdGlmIChzZXBhcmF0b3IgPT09ICcnKSB7XG5cdFx0cmV0dXJuIFtzdHJpbmddO1xuXHR9XG5cblx0Y29uc3Qgc2VwYXJhdG9ySW5kZXggPSBzdHJpbmcuaW5kZXhPZihzZXBhcmF0b3IpO1xuXG5cdGlmIChzZXBhcmF0b3JJbmRleCA9PT0gLTEpIHtcblx0XHRyZXR1cm4gW3N0cmluZ107XG5cdH1cblxuXHRyZXR1cm4gW1xuXHRcdHN0cmluZy5zbGljZSgwLCBzZXBhcmF0b3JJbmRleCksXG5cdFx0c3RyaW5nLnNsaWNlKHNlcGFyYXRvckluZGV4ICsgc2VwYXJhdG9yLmxlbmd0aClcblx0XTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHN0ciA9PiBlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC9bIScoKSpdL2csIHggPT4gYCUke3guY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKX1gKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB4aG9va18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ4aG9va1wiKSk7XG5jb25zdCBxdWVyeV9zdHJpbmdfMSA9IHJlcXVpcmUoXCJxdWVyeS1zdHJpbmdcIik7XG5jb25zdCBpZEZhY3RvcnlfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zZXJ2aWNlcy9pZEZhY3RvcnlcIikpO1xuY29uc3QgbWVzc2FnZUJ1c18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3NlcnZpY2VzL21lc3NhZ2UvbWVzc2FnZUJ1c1wiKSk7XG5jb25zdCBoZWxwZXJfMSA9IHJlcXVpcmUoXCIuL3NlcnZpY2VzL2hlbHBlclwiKTtcbmNvbnN0IHNlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL3BhbmVsL0FwcC9zZXJ2aWNlXCIpO1xuY29uc3QgbWVzc2FnZUJ1cyA9IG5ldyBtZXNzYWdlQnVzXzEuZGVmYXVsdCgpO1xuY29uc3QgbWVzc2FnZUlkRmFjdG9yeSA9IG5ldyBpZEZhY3RvcnlfMS5kZWZhdWx0KCk7XG5jb25zdCBsb2dJZEZhY3RvcnkgPSBuZXcgaWRGYWN0b3J5XzEuZGVmYXVsdCgpO1xuc2VydmljZV8xLm1lc3NhZ2VTZXJ2aWNlLmxpc3RlbihcIkhPT0tcIiwgKGRhdGEpID0+IHtcbiAgICBtZXNzYWdlQnVzLmRpc3BhdGNoKGRhdGEuaWQsIGRhdGEubWVzc2FnZSk7XG59KTtcbi8qKlxuICogUHJvbWlzaWZ5IHBvc3QgbWVzc2FnZSBmcm9tIHdpbmRvdyB0byB3aW5kb3dcbiAqIGFja1JlcXVpcmVkLCBpZiBmYWxzZSwgbm8gaWQgd2lsbCBiZSBhc3NpZ25lZCBoZW5jZSwgbm8gbWV0aG9kIHdpbGwgYmUgYWRkZWQgaW4gbWVzc2FnZVxuICogbWVzc2FnZSBpZCB3YXMgbm90IHRoZSBwcm9ibGVtIGJ1dCBmdW5jdGlvbiBpbiBtZXNzYWdlIGJ1cyB3YXNcbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlIG1lc3NhZ2UgaWYgYWNrUmVxdWlyZWQgaXMgdHJ1ZSwgb3RoZXJ3aXNlIHVuZGVmaW5lZC5cbiAqL1xuY29uc3QgcG9zdE1lc3NhZ2UgPSAobWVzc2FnZSwgdHlwZSwgYWNrUmVxdWlyZWQpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlSWQgPSBhY2tSZXF1aXJlZCA/IG1lc3NhZ2VJZEZhY3RvcnkuZ2V0SWQoKSA6IG51bGw7XG4gICAgY29uc3QgbWVzc2FnZU9iamVjdCA9IHtcbiAgICAgICAgaWQ6IG1lc3NhZ2VJZCxcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgdG86IFwiQ09OVEVOVFwiLFxuICAgICAgICBmcm9tOiBcIkhPT0tcIixcbiAgICAgICAgZXh0ZW5zaW9uTmFtZTogXCJNT0tLVVwiLFxuICAgICAgICB0eXBlLFxuICAgIH07XG4gICAgc2VydmljZV8xLm1lc3NhZ2VTZXJ2aWNlLnNlbmQobWVzc2FnZU9iamVjdCk7XG4gICAgaWYgKG1lc3NhZ2VJZCAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIG1lc3NhZ2VCdXMuYWRkTGlzdGVyKG1lc3NhZ2VJZCwgcmVzb2x2ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufTtcbi8vIEhlbHBlciB0byBjb252ZXJ0IHJlcXVlc3QgYm9keSB0byBhIHN0cmluZyByZXByZXNlbnRhdGlvblxuZnVuY3Rpb24gZ2V0UmVxdWVzdEJvZHlBc1N0cmluZyhib2R5KSB7XG4gICAgaWYgKGJvZHkgPT09IG51bGwgfHwgYm9keSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgUmVhZGFibGVTdHJlYW0gIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgYm9keSBpbnN0YW5jZW9mIFJlYWRhYmxlU3RyZWFtKSB7XG4gICAgICAgIHJldHVybiBcIlVuc3VwcG9ydGVkIGJvZHkgdHlwZTogUmVhZGFibGVTdHJlYW1cIjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gSlNPTi5zdHJpbmdpZnkgaXMgcHJpbWFyaWx5IGZvciBwbGFpbiBvYmplY3RzL2FycmF5cy5cbiAgICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICAhKGJvZHkgaW5zdGFuY2VvZiBGb3JtRGF0YSkgJiZcbiAgICAgICAgICAgICEoYm9keSBpbnN0YW5jZW9mIEJsb2IpICYmXG4gICAgICAgICAgICAhKGJvZHkgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgJiZcbiAgICAgICAgICAgICEoYm9keSBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcykpIHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU3RyaW5nKGJvZHkpOyAvLyBGYWxsYmFjayBmb3IgcHJpbWl0aXZlcywgRm9ybURhdGEsIGV0Yy5cbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk1va2t1IEluamVjdDogRXJyb3Igc3RyaW5naWZ5aW5nIHJlcXVlc3QgYm9keVwiLCBlKTtcbiAgICAgICAgcmV0dXJuIFwiVW5zdXBwb3J0ZWQgYm9keSB0eXBlOiBFcnJvciBkdXJpbmcgc3RyaW5naWZpY2F0aW9uXCI7XG4gICAgfVxufVxuLy8gSGVscGVyIHRvIHBhcnNlIFVSTCBhbmQgZXh0cmFjdCBxdWVyeSBwYXJhbWV0ZXJzXG5mdW5jdGlvbiBwYXJzZVVybEFuZFF1ZXJ5KHJlcXVlc3RVcmxJbnB1dCkge1xuICAgIGxldCByZXF1ZXN0VXJsU3RyID0gXCJcIjtcbiAgICBpZiAocmVxdWVzdFVybElucHV0IGluc3RhbmNlb2YgVVJMKSB7XG4gICAgICAgIHJlcXVlc3RVcmxTdHIgPSByZXF1ZXN0VXJsSW5wdXQuaHJlZjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIFJlcXVlc3QgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgcmVxdWVzdFVybElucHV0IGluc3RhbmNlb2YgUmVxdWVzdCkge1xuICAgICAgICByZXF1ZXN0VXJsU3RyID0gcmVxdWVzdFVybElucHV0LnVybDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlcXVlc3RVcmxTdHIgPSByZXF1ZXN0VXJsSW5wdXQ7XG4gICAgfVxuICAgIGNvbnN0IHNlcGFyYXRvciA9IHJlcXVlc3RVcmxTdHIuaW5kZXhPZihcIj9cIik7XG4gICAgY29uc3QgdXJsID0gc2VwYXJhdG9yICE9PSAtMVxuICAgICAgICA/IHJlcXVlc3RVcmxTdHIuc3Vic3RyaW5nKDAsIHNlcGFyYXRvcilcbiAgICAgICAgOiByZXF1ZXN0VXJsU3RyO1xuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gc2VwYXJhdG9yICE9PSAtMVxuICAgICAgICA/IEpTT04uc3RyaW5naWZ5KCgwLCBxdWVyeV9zdHJpbmdfMS5wYXJzZSkocmVxdWVzdFVybFN0ci5zdWJzdHJpbmcoc2VwYXJhdG9yKSkpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiB7IHVybCwgcXVlcnlQYXJhbXMgfTtcbn1cbmNvbnN0IGdldExvZ09iamVjdCA9IChyZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgIHZhciBfYSwgX2I7XG4gICAgY29uc3QgeyB1cmwsIHF1ZXJ5UGFyYW1zIH0gPSBwYXJzZVVybEFuZFF1ZXJ5KHJlcXVlc3QudXJsKTtcbiAgICBjb25zdCByZXF1ZXN0Qm9keSA9IGdldFJlcXVlc3RCb2R5QXNTdHJpbmcocmVxdWVzdC5ib2R5KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBpZDogKF9hID0gcmVxdWVzdC5tb2trdSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkLFxuICAgICAgICByZXF1ZXN0OiB7XG4gICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICBib2R5OiByZXF1ZXN0Qm9keSxcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zLFxuICAgICAgICAgICAgbWV0aG9kOiAoKChfYiA9IHJlcXVlc3QubWV0aG9kKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudG9VcHBlckNhc2UoKSkgfHwgXCJHRVRcIiksXG4gICAgICAgICAgICBoZWFkZXJzOiAoMCwgaGVscGVyXzEuZ2V0SGVhZGVycykocmVxdWVzdC5oZWFkZXJzKSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVzcG9uc2UsXG4gICAgfTtcbn07XG5mdW5jdGlvbiBwcm9jZXNzTW9ja2luZ1JlcXVlc3QocmVxdWVzdCwgY2FsbGJhY2spIHtcbiAgICB2YXIgX2E7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgbG9nRW50cnkgPSBnZXRMb2dPYmplY3QocmVxdWVzdCk7XG4gICAgICAgIC8vIFNlbmQgaW5pdGlhbCBsb2cgKGZpcmUgYW5kIGZvcmdldClcbiAgICAgICAgcG9zdE1lc3NhZ2UobG9nRW50cnksIFwiTE9HXCIsIGZhbHNlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG1vY2tTZXJ2aWNlUmVzcG9uc2VQcm9taXNlID0gcG9zdE1lc3NhZ2UobG9nRW50cnksIFwiQ0hFQ0tfTU9DS1wiLCB0cnVlKTtcbiAgICAgICAgICAgIGlmICghbW9ja1NlcnZpY2VSZXNwb25zZVByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAvLyBTaG91bGQgbm90IGhhcHBlbiBpZiBhY2tSZXF1aXJlZCBpcyB0cnVlXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtb2NrU2VydmljZVJlc3BvbnNlID0gKHlpZWxkIG1vY2tTZXJ2aWNlUmVzcG9uc2VQcm9taXNlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSG9vazogXCIsIG1vY2tTZXJ2aWNlUmVzcG9uc2UpO1xuICAgICAgICAgICAgaWYgKG1vY2tTZXJ2aWNlUmVzcG9uc2UgJiYgbW9ja1NlcnZpY2VSZXNwb25zZS5tb2NrUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2NrID0gbW9ja1NlcnZpY2VSZXNwb25zZS5tb2NrUmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVycyA9IG1vY2suaGVhZGVyc1xuICAgICAgICAgICAgICAgICAgICA/IG1vY2suaGVhZGVycy5yZWR1Y2UoKGZpbmFsLCBoZWFkZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsW2hlYWRlci5uYW1lXSA9IGhlYWRlci52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaW5hbDtcbiAgICAgICAgICAgICAgICAgICAgfSwge30pXG4gICAgICAgICAgICAgICAgICAgIDogeyBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIiB9OyAvLyBEZWZhdWx0IGhlYWRlcnNcbiAgICAgICAgICAgICAgICBjb25zdCBmaW5hbE1vY2tlZFJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IG1vY2suc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAoX2EgPSBtb2NrLnJlc3BvbnNlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKG1vY2suZGVsYXkgJiYgbW9jay5kZWxheSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhmaW5hbE1vY2tlZFJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgbW9jay5kZWxheSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhmaW5hbE1vY2tlZFJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpOyAvLyBObyBtb2NrLCBwcm9jZWVkIHdpdGggb3JpZ2luYWwgcmVxdWVzdFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1va2t1IEluamVjdDogRXJyb3IgZHVyaW5nIG1vY2sgcHJvY2Vzc2luZzpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgY2FsbGJhY2soKTsgLy8gUHJvY2VlZCB3aXRoIG9yaWdpbmFsIHJlcXVlc3Qgb24gZXJyb3JcbiAgICAgICAgfVxuICAgIH0pO1xufVxueGhvb2tfMS5kZWZhdWx0LmJlZm9yZShmdW5jdGlvbiAocmVxdWVzdCwgY2FsbGJhY2spIHtcbiAgICAvLyBFbnN1cmUgYSB1bmlxdWUgSUQgaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSByZXF1ZXN0IG9iamVjdCBmb3IgbG9nZ2luZy9jb3JyZWxhdGlvbi5cbiAgICBpZiAoIXJlcXVlc3QubW9ra3UpIHtcbiAgICAgICAgcmVxdWVzdC5tb2trdSA9IHsgaWQ6IGxvZ0lkRmFjdG9yeS5nZXRJZCgpIH07XG4gICAgfVxuICAgIHByb2Nlc3NNb2NraW5nUmVxdWVzdChyZXF1ZXN0LCBjYWxsYmFjayk7XG59KTtcbmZ1bmN0aW9uIHNlbmRMb2dBZnRlclJlcXVlc3QocmVxdWVzdCwgb3JpZ2luYWxSZXNwb25zZSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGxldCByZXNwb25zZVRleHQ7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlU3RhdHVzID0gb3JpZ2luYWxSZXNwb25zZS5zdGF0dXMgfHwgMDtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VIZWFkZXJzID0gb3JpZ2luYWxSZXNwb25zZS5oZWFkZXJzIHx8IHt9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcmlnaW5hbFJlc3BvbnNlLmNsb25lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBMaWtlbHkgYSBGZXRjaCBBUEkgUmVzcG9uc2VcbiAgICAgICAgICAgICAgICBjb25zdCBjbG9uZWRSZXNwb25zZSA9IG9yaWdpbmFsUmVzcG9uc2UuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICByZXNwb25zZVRleHQgPSB5aWVsZCBjbG9uZWRSZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb3JpZ2luYWxSZXNwb25zZS50ZXh0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgLy8gRGlyZWN0IHRleHQgcHJvcGVydHlcbiAgICAgICAgICAgICAgICByZXNwb25zZVRleHQgPSBvcmlnaW5hbFJlc3BvbnNlLnRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvcmlnaW5hbFJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAvLyBGYWxsYmFjayB0byBkYXRhIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VUZXh0ID1cbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIG9yaWdpbmFsUmVzcG9uc2UuZGF0YSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPyBvcmlnaW5hbFJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIDogSlNPTi5zdHJpbmdpZnkob3JpZ2luYWxSZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlVGV4dCA9IFwiTW9ra3U6IFVuYWJsZSB0byBkZXRlcm1pbmUgcmVzcG9uc2UgYm9keS5cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNb2trdSBJbmplY3Q6IEVycm9yIGV4dHJhY3RpbmcgcmVzcG9uc2UgdGV4dCBpbiB4aG9vay5hZnRlcjpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgcmVzcG9uc2VUZXh0ID0gXCJNb2trdTogRXJyb3IgcHJvY2Vzc2luZyByZXNwb25zZSB0ZXh0LlwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxvZ0VudHJ5ID0gZ2V0TG9nT2JqZWN0KHJlcXVlc3QsIHtcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2VTdGF0dXMsXG4gICAgICAgICAgICByZXNwb25zZTogcmVzcG9uc2VUZXh0LFxuICAgICAgICAgICAgaGVhZGVyczogKDAsIGhlbHBlcl8xLmdldEhlYWRlcnMpKHJlc3BvbnNlSGVhZGVycyksXG4gICAgICAgIH0pO1xuICAgICAgICBwb3N0TWVzc2FnZShsb2dFbnRyeSwgXCJMT0dcIiwgZmFsc2UpO1xuICAgIH0pO1xufVxueGhvb2tfMS5kZWZhdWx0LmFmdGVyKGZ1bmN0aW9uIChyZXF1ZXN0LCBvcmlnaW5hbFJlc3BvbnNlKSB7XG4gICAgLy8gRW5zdXJlIHJlcXVlc3QubW9ra3UuaWQgaXMgYXZhaWxhYmxlIChzaG91bGQgYmUgc2V0IGluICdiZWZvcmUnIGhvb2spXG4gICAgaWYgKCFyZXF1ZXN0Lm1va2t1KSB7XG4gICAgICAgIC8vIFRoaXMgY2FzZSBzaG91bGQgaWRlYWxseSBub3QgYmUgaGl0IGlmICdiZWZvcmUnIGFsd2F5cyBydW5zIGFuZCBzZXRzIGl0LlxuICAgICAgICByZXF1ZXN0Lm1va2t1ID0geyBpZDogbG9nSWRGYWN0b3J5LmdldElkKCkgfTtcbiAgICAgICAgY29uc29sZS53YXJuKFwiTW9ra3UgSW5qZWN0OiByZXF1ZXN0Lm1va2t1LmlkIHdhcyBub3Qgc2V0IGluIHhob29rLmJlZm9yZSwgbmV3IElEIGdlbmVyYXRlZCBpbiB4aG9vay5hZnRlci5cIik7XG4gICAgfVxuICAgIHNlbmRMb2dBZnRlclJlcXVlc3QocmVxdWVzdCwgb3JpZ2luYWxSZXNwb25zZSk7XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tZXNzYWdlU2VydmljZSA9IHZvaWQgMDtcbmNvbnN0IG1lc3NhZ2VTZXJ2aWNlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vbWVzc2FnZVNlcnZpY2VcIikpO1xuZXhwb3J0cy5tZXNzYWdlU2VydmljZSA9IG1lc3NhZ2VTZXJ2aWNlXzEuZGVmYXVsdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKlxuICogSW5qZWN0XG4gKiAgICAgLT4gQ29udGVudCBTY3JpcHRcbiAqXG4gKiBDb250ZW50IHNjcmlwdCBpcyBicmlkZ2UgYmV0d2VlbiBwYW5lbCBhbmQgaW5qZWN0IGZvciBjb21tdW5pY2F0aW9uXG4gKiBhcyBpdCBoYXMgYm90aCB3aW5kb3dzIGV2ZW50IGxpc3Rlcm4gYW5kIGNocm9tZSBydW50aW1lIG1lc3NhZ2UgbGlzdG5lclxuICogQ29udGVudCBTY3JpcHRcbiAqICAgICAtPiBQYW5lbFxuICogICAgIC0+IEhvb2tcbiAqXG4gKiBQYW5lbFxuICogICAgIC0+IENvbnRlbnQgU2NyaXB0XG4gKi9cbmNvbnN0IHR1bm5lbE1hcCA9IHtcbiAgICBcIkhPT0s6Q09OVEVOVFwiOiBcIndpbmRvd1wiLFxuICAgIFwiQ09OVEVOVDpIT09LXCI6IFwid2luZG93XCIsXG4gICAgXCJDT05URU5UOlBBTkVMXCI6IFwicnVudGltZVwiLFxuICAgIFwiQ09OVEVOVDpTRVJWSUNFX1dPUktFUlwiOiBcInJ1bnRpbWVcIixcbiAgICBcIlBBTkVMOkNPTlRFTlRcIjogXCJ0YWJcIixcbiAgICBcIlNFUlZJQ0VfV09SS0VSOkNPTlRFTlRcIjogXCJydW50aW1lXCIsXG4gICAgXCJTRVJWSUNFX1dPUktFUjpQQU5FTFwiOiBcInJ1bnRpbWVcIixcbn07XG5jb25zdCBzZW5kID0gKHByb3BzLCB0YWJJZCkgPT4ge1xuICAgIGNvbnN0IHBhdGhLZXkgPSBgJHtwcm9wcy5mcm9tfToke3Byb3BzLnRvfWA7XG4gICAgY29uc3QgcGF0aCA9IHR1bm5lbE1hcFtwYXRoS2V5XTtcbiAgICBjb25zdCBzZXJ2aWNlID0ge1xuICAgICAgICB3aW5kb3c6ICgpID0+IHdpbmRvdy5wb3N0TWVzc2FnZShwcm9wcywgXCIqXCIpLFxuICAgICAgICBydW50aW1lOiAoKSA9PiBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShwcm9wcyksXG4gICAgICAgIHRhYjogKCkgPT4gY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiSWQsIHByb3BzKSxcbiAgICB9O1xuICAgIGlmIChzZXJ2aWNlW3BhdGhdKSB7XG4gICAgICAgIHNlcnZpY2VbcGF0aF0ocHJvcHMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgTW9ra3UgTWVzc2FnZVNlcnZpY2U6IE5vIHBhdGggZGVmaW5lZCBmb3IgJHtwYXRoS2V5fWApO1xuICAgIH1cbn07XG5jb25zdCBsaXN0ZW4gPSAoZW50aXR5LCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHNlcnZpY2UgPSB7XG4gICAgICAgIHJ1bnRpbWU6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZ1bmMgPSAobWVzc2FnZSwgX3NlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UudG8gIT09IGVudGl0eSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG1lc3NhZ2UsIF9zZW5kZXIsIHNlbmRSZXNwb25zZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmMpO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5yZW1vdmVMaXN0ZW5lcihmdW5jKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2luZG93OiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmdW5jID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gV2Ugb25seSBhY2NlcHQgbWVzc2FnZXMgZnJvbSBvdXJzZWx2ZXNcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlICE9PSB3aW5kb3cpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS50byAhPT0gZW50aXR5KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmMpO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBmdW5jKTtcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHN3aXRjaCAoZW50aXR5KSB7XG4gICAgICAgIGNhc2UgXCJIT09LXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBbc2VydmljZVtcIndpbmRvd1wiXSgpXTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiQ09OVEVOVFwiOiB7XG4gICAgICAgICAgICByZXR1cm4gW3NlcnZpY2VbXCJ3aW5kb3dcIl0oKSwgc2VydmljZVtcInJ1bnRpbWVcIl0oKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIlBBTkVMXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBbc2VydmljZVtcInJ1bnRpbWVcIl0oKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBcIlNFUlZJQ0VfV09SS0VSXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBbc2VydmljZVtcInJ1bnRpbWVcIl0oKV07XG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0geyBzZW5kLCBsaXN0ZW4gfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRIZWFkZXJzID0gZXhwb3J0cy5nZXRFcnJvciA9IGV4cG9ydHMuaXNWYWxpZEpTT04gPSB2b2lkIDA7XG5jb25zdCBpc1ZhbGlkSlNPTiA9IChqc29uKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgSlNPTi5wYXJzZShqc29uKTtcbiAgICAgICAgcmV0dXJuIHsgZXJyb3I6IHVuZGVmaW5lZCB9O1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBsZXQgcG9zaXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBsaW5lTnVtYmVyID0gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBqc29uRXJyb3JSZWdleCA9IG5ldyBSZWdFeHAoLyg/PD1cXGJwb3NpdGlvblxccykoXFx3KykvZyk7XG4gICAgICAgIGNvbnN0IHN0cmluZ2lmaWVkRXJyb3IgPSBlLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmIChzdHJpbmdpZmllZEVycm9yICE9PSBcIlVuZXhwZWN0ZWQgZW5kIG9mIEpTT04gaW5wdXRcIikge1xuICAgICAgICAgICAgY29uc3QgeCA9IGpzb25FcnJvclJlZ2V4LmV4ZWMoc3RyaW5naWZpZWRFcnJvcik7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHggJiYgeC5sZW5ndGggPiAwID8gcGFyc2VJbnQoeFswXSwgMTApIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgbGluZU51bWJlciA9IDE7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBqc29uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSBwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGpzb25baV0gPT09IFwiXFxuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVOdW1iZXIrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGpzb25FcnJvclJlZ2V4Lmxhc3RJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVycm9yOiBgJHtzdHJpbmdpZmllZEVycm9yfSR7bGluZU51bWJlciA/IFwiIGFuZCBhdCBsaW5lIG51bWJlciBcIiArIGxpbmVOdW1iZXIgOiBcIlwifWAsXG4gICAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICAgIGxpbmVOdW1iZXIsXG4gICAgICAgIH07XG4gICAgfVxufTtcbmV4cG9ydHMuaXNWYWxpZEpTT04gPSBpc1ZhbGlkSlNPTjtcbmNvbnN0IGdldEVycm9yID0gKGVycm9ycykgPT4ge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhlcnJvcnMpO1xuICAgIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZXJyb3JzW2tleXNbMF1dO1xuICAgIH1cbn07XG5leHBvcnRzLmdldEVycm9yID0gZ2V0RXJyb3I7XG5jb25zdCBnZXRIZWFkZXJzID0gKGhlYWRlcnMpID0+IHtcbiAgICBpZiAodHlwZW9mIGhlYWRlcnMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGhlYWRlcnMpLm1hcCgobmFtZSkgPT4gKHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogaGVhZGVyc1tuYW1lXSxcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gW107XG59O1xuZXhwb3J0cy5nZXRIZWFkZXJzID0gZ2V0SGVhZGVycztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgSWRGYWN0b3J5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5faWQgPSAwO1xuICAgIH1cbiAgICBnZXRJZCgpIHtcbiAgICAgICAgLy8gc2tpcCAwLCBhcyBpdCBjYW4gbGVhZCB0byBmYWxzeVxuICAgICAgICB0aGlzLl9pZCsrO1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gSWRGYWN0b3J5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBNZXNzYWdlQnVzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fY29sbGVjdG9yID0ge307XG4gICAgICAgIHRoaXMuX2RlZmF1bHRMaXN0bmVyID0gKCkgPT4geyB9O1xuICAgICAgICB0aGlzLl9jb2xsZWN0b3IgPSB7fTtcbiAgICB9XG4gICAgZGlzcGF0Y2goaWQsIGV2ZW50RGF0YSkge1xuICAgICAgICBpZiAodGhpcy5fY29sbGVjdG9yW2lkXSkge1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdG9yW2lkXShldmVudERhdGEpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NvbGxlY3RvcltpZF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0TGlzdG5lcihldmVudERhdGEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFkZExpc3RlcihpZCwgZnVuYykge1xuICAgICAgICB0aGlzLl9jb2xsZWN0b3JbaWRdID0gZnVuYztcbiAgICB9XG4gICAgY3JlYXRlRGVmYXVsdExpc3RlbmVyKGZ1bmMpIHtcbiAgICAgICAgdGhpcy5fZGVmYXVsdExpc3RuZXIgPSBmdW5jO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IE1lc3NhZ2VCdXM7XG4iLCJjb25zdCBzbGljZSA9IChvLCBuKSA9PiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChvLCBuKTtcblxubGV0IHJlc3VsdCA9IG51bGw7XG5cbi8vZmluZCBnbG9iYWwgb2JqZWN0XG5pZiAoXG4gIHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGVcbikge1xuICByZXN1bHQgPSBzZWxmO1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIHJlc3VsdCA9IGdsb2JhbDtcbn0gZWxzZSBpZiAod2luZG93KSB7XG4gIHJlc3VsdCA9IHdpbmRvdztcbn1cblxuY29uc3Qgd2luZG93UmVmID0gcmVzdWx0O1xuY29uc3QgZG9jdW1lbnRSZWYgPSByZXN1bHQuZG9jdW1lbnQ7XG5cbmNvbnN0IFVQTE9BRF9FVkVOVFMgPSBbXCJsb2FkXCIsIFwibG9hZGVuZFwiLCBcImxvYWRzdGFydFwiXTtcbmNvbnN0IENPTU1PTl9FVkVOVFMgPSBbXCJwcm9ncmVzc1wiLCBcImFib3J0XCIsIFwiZXJyb3JcIiwgXCJ0aW1lb3V0XCJdO1xuXG5jb25zdCBkZXByaWNhdGVkUHJvcCA9IHAgPT5cbiAgW1wicmV0dXJuVmFsdWVcIiwgXCJ0b3RhbFNpemVcIiwgXCJwb3NpdGlvblwiXS5pbmNsdWRlcyhwKTtcblxuY29uc3QgbWVyZ2VPYmplY3RzID0gZnVuY3Rpb24gKHNyYywgZHN0KSB7XG4gIGZvciAobGV0IGsgaW4gc3JjKSB7XG4gICAgaWYgKGRlcHJpY2F0ZWRQcm9wKGspKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY29uc3QgdiA9IHNyY1trXTtcbiAgICB0cnkge1xuICAgICAgZHN0W2tdID0gdjtcbiAgICB9IGNhdGNoIChlcnJvcikge31cbiAgfVxuICByZXR1cm4gZHN0O1xufTtcblxuLy9wcm94eSBldmVudHMgZnJvbSBvbmUgZW1pdHRlciB0byBhbm90aGVyXG5jb25zdCBwcm94eUV2ZW50cyA9IGZ1bmN0aW9uIChldmVudHMsIHNyYywgZHN0KSB7XG4gIGNvbnN0IHAgPSBldmVudCA9PlxuICAgIGZ1bmN0aW9uIChlKSB7XG4gICAgICBjb25zdCBjbG9uZSA9IHt9O1xuICAgICAgLy9jb3BpZXMgZXZlbnQsIHdpdGggZHN0IGVtaXR0ZXIgaW5wbGFjZSBvZiBzcmNcbiAgICAgIGZvciAobGV0IGsgaW4gZSkge1xuICAgICAgICBpZiAoZGVwcmljYXRlZFByb3AoaykpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWwgPSBlW2tdO1xuICAgICAgICBjbG9uZVtrXSA9IHZhbCA9PT0gc3JjID8gZHN0IDogdmFsO1xuICAgICAgfVxuICAgICAgLy9lbWl0cyBvdXQgdGhlIGRzdFxuICAgICAgcmV0dXJuIGRzdC5kaXNwYXRjaEV2ZW50KGV2ZW50LCBjbG9uZSk7XG4gICAgfTtcbiAgLy9kb250IHByb3h5IG1hbnVhbCBldmVudHNcbiAgZm9yIChsZXQgZXZlbnQgb2YgQXJyYXkuZnJvbShldmVudHMpKSB7XG4gICAgaWYgKGRzdC5faGFzKGV2ZW50KSkge1xuICAgICAgc3JjW2BvbiR7ZXZlbnR9YF0gPSBwKGV2ZW50KTtcbiAgICB9XG4gIH1cbn07XG5cbi8vY3JlYXRlIGZha2UgZXZlbnRcbmNvbnN0IGZha2VFdmVudCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gIGlmIChkb2N1bWVudFJlZiAmJiBkb2N1bWVudFJlZi5jcmVhdGVFdmVudE9iamVjdCAhPSBudWxsKSB7XG4gICAgY29uc3QgbXNpZUV2ZW50T2JqZWN0ID0gZG9jdW1lbnRSZWYuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgICBtc2llRXZlbnRPYmplY3QudHlwZSA9IHR5cGU7XG4gICAgcmV0dXJuIG1zaWVFdmVudE9iamVjdDtcbiAgfVxuICAvLyBvbiBzb21lIHBsYXRmb3JtcyBsaWtlIGFuZHJvaWQgNC4xLjIgYW5kIHNhZmFyaSBvbiB3aW5kb3dzLCBpdCBhcHBlYXJzXG4gIC8vIHRoYXQgbmV3IEV2ZW50IGlzIG5vdCBhbGxvd2VkXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBFdmVudCh0eXBlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geyB0eXBlIH07XG4gIH1cbn07XG5cbi8vdGlueSBldmVudCBlbWl0dGVyXG5jb25zdCBFdmVudEVtaXR0ZXIgPSBmdW5jdGlvbiAobm9kZVN0eWxlKSB7XG4gIC8vcHJpdmF0ZVxuICBsZXQgZXZlbnRzID0ge307XG4gIGNvbnN0IGxpc3RlbmVycyA9IGV2ZW50ID0+IGV2ZW50c1tldmVudF0gfHwgW107XG4gIC8vcHVibGljXG4gIGNvbnN0IGVtaXR0ZXIgPSB7fTtcbiAgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50LCBjYWxsYmFjaywgaSkge1xuICAgIGV2ZW50c1tldmVudF0gPSBsaXN0ZW5lcnMoZXZlbnQpO1xuICAgIGlmIChldmVudHNbZXZlbnRdLmluZGV4T2YoY2FsbGJhY2spID49IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaSA9IGkgPT09IHVuZGVmaW5lZCA/IGV2ZW50c1tldmVudF0ubGVuZ3RoIDogaTtcbiAgICBldmVudHNbZXZlbnRdLnNwbGljZShpLCAwLCBjYWxsYmFjayk7XG4gIH07XG4gIGVtaXR0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCwgY2FsbGJhY2spIHtcbiAgICAvL3JlbW92ZSBhbGxcbiAgICBpZiAoZXZlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXZlbnRzID0ge307XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vcmVtb3ZlIGFsbCBvZiB0eXBlIGV2ZW50XG4gICAgaWYgKGNhbGxiYWNrID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGV2ZW50c1tldmVudF0gPSBbXTtcbiAgICB9XG4gICAgLy9yZW1vdmUgcGFydGljdWxhciBoYW5kbGVyXG4gICAgY29uc3QgaSA9IGxpc3RlbmVycyhldmVudCkuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxpc3RlbmVycyhldmVudCkuc3BsaWNlKGksIDEpO1xuICB9O1xuICBlbWl0dGVyLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYXJncyA9IHNsaWNlKGFyZ3VtZW50cyk7XG4gICAgY29uc3QgZXZlbnQgPSBhcmdzLnNoaWZ0KCk7XG4gICAgaWYgKCFub2RlU3R5bGUpIHtcbiAgICAgIGFyZ3NbMF0gPSBtZXJnZU9iamVjdHMoYXJnc1swXSwgZmFrZUV2ZW50KGV2ZW50KSk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYXJnc1swXSwgXCJ0YXJnZXRcIiwge1xuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiB0aGlzLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IGxlZ2FjeWxpc3RlbmVyID0gZW1pdHRlcltgb24ke2V2ZW50fWBdO1xuICAgIGlmIChsZWdhY3lsaXN0ZW5lcikge1xuICAgICAgbGVnYWN5bGlzdGVuZXIuYXBwbHkoZW1pdHRlciwgYXJncyk7XG4gICAgfVxuICAgIGNvbnN0IGl0ZXJhYmxlID0gbGlzdGVuZXJzKGV2ZW50KS5jb25jYXQobGlzdGVuZXJzKFwiKlwiKSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyYWJsZS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbGlzdGVuZXIgPSBpdGVyYWJsZVtpXTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KGVtaXR0ZXIsIGFyZ3MpO1xuICAgIH1cbiAgfTtcbiAgZW1pdHRlci5faGFzID0gZXZlbnQgPT4gISEoZXZlbnRzW2V2ZW50XSB8fCBlbWl0dGVyW2BvbiR7ZXZlbnR9YF0pO1xuICAvL2FkZCBleHRyYSBhbGlhc2VzXG4gIGlmIChub2RlU3R5bGUpIHtcbiAgICBlbWl0dGVyLmxpc3RlbmVycyA9IGV2ZW50ID0+IHNsaWNlKGxpc3RlbmVycyhldmVudCkpO1xuICAgIGVtaXR0ZXIub24gPSBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXI7XG4gICAgZW1pdHRlci5vZmYgPSBlbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXI7XG4gICAgZW1pdHRlci5maXJlID0gZW1pdHRlci5kaXNwYXRjaEV2ZW50O1xuICAgIGVtaXR0ZXIub25jZSA9IGZ1bmN0aW9uIChlLCBmbikge1xuICAgICAgdmFyIGZpcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGVtaXR0ZXIub2ZmKGUsIGZpcmUpO1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gZW1pdHRlci5vbihlLCBmaXJlKTtcbiAgICB9O1xuICAgIGVtaXR0ZXIuZGVzdHJveSA9ICgpID0+IChldmVudHMgPSB7fSk7XG4gIH1cblxuICByZXR1cm4gZW1pdHRlcjtcbn07XG5cbi8vaGVscGVyXG5jb25zdCBDUkxGID0gXCJcXHJcXG5cIjtcblxuY29uc3Qgb2JqZWN0VG9TdHJpbmcgPSBmdW5jdGlvbiAoaGVhZGVyc09iaikge1xuICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoaGVhZGVyc09iaik7XG5cbiAgY29uc3QgaGVhZGVycyA9IGVudHJpZXMubWFwKChbbmFtZSwgdmFsdWVdKSA9PiB7XG4gICAgcmV0dXJuIGAke25hbWUudG9Mb3dlckNhc2UoKX06ICR7dmFsdWV9YDtcbiAgfSk7XG5cbiAgcmV0dXJuIGhlYWRlcnMuam9pbihDUkxGKTtcbn07XG5cbmNvbnN0IHN0cmluZ1RvT2JqZWN0ID0gZnVuY3Rpb24gKGhlYWRlcnNTdHJpbmcsIGRlc3QpIHtcbiAgY29uc3QgaGVhZGVycyA9IGhlYWRlcnNTdHJpbmcuc3BsaXQoQ1JMRik7XG4gIGlmIChkZXN0ID09IG51bGwpIHtcbiAgICBkZXN0ID0ge307XG4gIH1cblxuICBmb3IgKGxldCBoZWFkZXIgb2YgaGVhZGVycykge1xuICAgIGlmICgvKFteOl0rKTpcXHMqKC4rKS8udGVzdChoZWFkZXIpKSB7XG4gICAgICBjb25zdCBuYW1lID0gUmVnRXhwLiQxICE9IG51bGwgPyBSZWdFeHAuJDEudG9Mb3dlckNhc2UoKSA6IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IHZhbHVlID0gUmVnRXhwLiQyO1xuICAgICAgaWYgKGRlc3RbbmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBkZXN0W25hbWVdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG5jb25zdCBjb252ZXJ0ID0gZnVuY3Rpb24gKGhlYWRlcnMsIGRlc3QpIHtcbiAgc3dpdGNoICh0eXBlb2YgaGVhZGVycykge1xuICAgIGNhc2UgXCJvYmplY3RcIjoge1xuICAgICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nKGhlYWRlcnMpO1xuICAgIH1cbiAgICBjYXNlIFwic3RyaW5nXCI6IHtcbiAgICAgIHJldHVybiBzdHJpbmdUb09iamVjdChoZWFkZXJzLCBkZXN0KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gW107XG59O1xuXG52YXIgaGVhZGVycyA9IHsgY29udmVydCB9O1xuXG4vL2dsb2JhbCBzZXQgb2YgaG9vayBmdW5jdGlvbnMsXG4vL3VzZXMgZXZlbnQgZW1pdHRlciB0byBzdG9yZSBob29rc1xuY29uc3QgaG9va3MgPSBFdmVudEVtaXR0ZXIodHJ1ZSk7XG5cbmNvbnN0IG51bGxpZnkgPSByZXMgPT4gKHJlcyA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IHJlcyk7XG5cbi8vYnJvd3NlcidzIFhNTEh0dHBSZXF1ZXN0XG5jb25zdCBOYXRpdmUkMSA9IHdpbmRvd1JlZi5YTUxIdHRwUmVxdWVzdDtcblxuLy94aG9vaydzIFhNTEh0dHBSZXF1ZXN0XG5jb25zdCBYaG9vayQxID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBBQk9SVEVEID0gLTE7XG4gIGNvbnN0IHhociA9IG5ldyBOYXRpdmUkMSgpO1xuXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgLy8gRXh0cmEgc3RhdGVcbiAgY29uc3QgcmVxdWVzdCA9IHt9O1xuICBsZXQgc3RhdHVzID0gbnVsbDtcbiAgbGV0IGhhc0Vycm9yID0gdW5kZWZpbmVkO1xuICBsZXQgdHJhbnNpdGluZyA9IHVuZGVmaW5lZDtcbiAgbGV0IHJlc3BvbnNlID0gdW5kZWZpbmVkO1xuICB2YXIgY3VycmVudFN0YXRlID0gMDtcblxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIC8vIFByaXZhdGUgQVBJXG5cbiAgLy9yZWFkIHJlc3VsdHMgZnJvbSByZWFsIHhociBpbnRvIHJlc3BvbnNlXG4gIGNvbnN0IHJlYWRIZWFkID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIEFjY2Vzc2luZyBhdHRyaWJ1dGVzIG9uIGFuIGFib3J0ZWQgeGhyIG9iamVjdCB3aWxsXG4gICAgLy8gdGhyb3cgYW4gJ2MwMGMwMjNmIGVycm9yJyBpbiBJRTkgYW5kIGxvd2VyLCBkb24ndCB0b3VjaCBpdC5cbiAgICByZXNwb25zZS5zdGF0dXMgPSBzdGF0dXMgfHwgeGhyLnN0YXR1cztcbiAgICBpZiAoc3RhdHVzICE9PSBBQk9SVEVEKSB7XG4gICAgICByZXNwb25zZS5zdGF0dXNUZXh0ID0geGhyLnN0YXR1c1RleHQ7XG4gICAgfVxuICAgIGlmIChzdGF0dXMgIT09IEFCT1JURUQpIHtcbiAgICAgIGNvbnN0IG9iamVjdCA9IGhlYWRlcnMuY29udmVydCh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xuICAgICAgZm9yIChsZXQga2V5IGluIG9iamVjdCkge1xuICAgICAgICBjb25zdCB2YWwgPSBvYmplY3Rba2V5XTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5oZWFkZXJzW2tleV0pIHtcbiAgICAgICAgICBjb25zdCBuYW1lID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgcmVzcG9uc2UuaGVhZGVyc1tuYW1lXSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWFkQm9keSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvL2h0dHBzOi8veGhyLnNwZWMud2hhdHdnLm9yZy9cbiAgICBpZiAoIXhoci5yZXNwb25zZVR5cGUgfHwgeGhyLnJlc3BvbnNlVHlwZSA9PT0gXCJ0ZXh0XCIpIHtcbiAgICAgIHJlc3BvbnNlLnRleHQgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgcmVzcG9uc2UuZGF0YSA9IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICB0cnkge1xuICAgICAgICByZXNwb25zZS54bWwgPSB4aHIucmVzcG9uc2VYTUw7XG4gICAgICB9IGNhdGNoIChlcnJvcikge31cbiAgICAgIC8vIHVuYWJsZSB0byBzZXQgcmVzcG9uc2VYTUwgZHVlIHRvIHJlc3BvbnNlIHR5cGUsIHdlIGF0dGVtcHQgdG8gYXNzaWduIHJlc3BvbnNlWE1MXG4gICAgICAvLyB3aGVuIHRoZSB0eXBlIGlzIHRleHQgZXZlbiB0aG91Z2ggaXQncyBhZ2FpbnN0IHRoZSBzcGVjIGR1ZSB0byBzZXZlcmFsIGxpYnJhcmllc1xuICAgICAgLy8gYW5kIGJyb3dzZXIgdmVuZG9ycyB3aG8gYWxsb3cgdGhpcyBiZWhhdmlvci4gY2F1c2luZyB0aGVzZSByZXF1ZXN0cyB0byBmYWlsIHdoZW5cbiAgICAgIC8vIHhob29rIGlzIGluc3RhbGxlZCBvbiBhIHBhZ2UuXG4gICAgfSBlbHNlIGlmICh4aHIucmVzcG9uc2VUeXBlID09PSBcImRvY3VtZW50XCIpIHtcbiAgICAgIHJlc3BvbnNlLnhtbCA9IHhoci5yZXNwb25zZVhNTDtcbiAgICAgIHJlc3BvbnNlLmRhdGEgPSB4aHIucmVzcG9uc2VYTUw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3BvbnNlLmRhdGEgPSB4aHIucmVzcG9uc2U7XG4gICAgfVxuICAgIC8vbmV3IGluIHNvbWUgYnJvd3NlcnNcbiAgICBpZiAoXCJyZXNwb25zZVVSTFwiIGluIHhocikge1xuICAgICAgcmVzcG9uc2UuZmluYWxVcmwgPSB4aHIucmVzcG9uc2VVUkw7XG4gICAgfVxuICB9O1xuXG4gIC8vd3JpdGUgcmVzcG9uc2UgaW50byBmYWNhZGUgeGhyXG4gIGNvbnN0IHdyaXRlSGVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBmYWNhZGUuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgIGZhY2FkZS5zdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdHVzVGV4dDtcbiAgfTtcblxuICBjb25zdCB3cml0ZUJvZHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKFwidGV4dFwiIGluIHJlc3BvbnNlKSB7XG4gICAgICBmYWNhZGUucmVzcG9uc2VUZXh0ID0gcmVzcG9uc2UudGV4dDtcbiAgICB9XG4gICAgaWYgKFwieG1sXCIgaW4gcmVzcG9uc2UpIHtcbiAgICAgIGZhY2FkZS5yZXNwb25zZVhNTCA9IHJlc3BvbnNlLnhtbDtcbiAgICB9XG4gICAgaWYgKFwiZGF0YVwiIGluIHJlc3BvbnNlKSB7XG4gICAgICBmYWNhZGUucmVzcG9uc2UgPSByZXNwb25zZS5kYXRhO1xuICAgIH1cbiAgICBpZiAoXCJmaW5hbFVybFwiIGluIHJlc3BvbnNlKSB7XG4gICAgICBmYWNhZGUucmVzcG9uc2VVUkwgPSByZXNwb25zZS5maW5hbFVybDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZW1pdEZpbmFsID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghaGFzRXJyb3IpIHtcbiAgICAgIGZhY2FkZS5kaXNwYXRjaEV2ZW50KFwibG9hZFwiLCB7fSk7XG4gICAgfVxuICAgIGZhY2FkZS5kaXNwYXRjaEV2ZW50KFwibG9hZGVuZFwiLCB7fSk7XG4gICAgaWYgKGhhc0Vycm9yKSB7XG4gICAgICBmYWNhZGUucmVhZHlTdGF0ZSA9IDA7XG4gICAgfVxuICB9O1xuXG4gIC8vZW5zdXJlIHJlYWR5IHN0YXRlIDAgdGhyb3VnaCA0IGlzIGhhbmRsZWRcbiAgY29uc3QgZW1pdFJlYWR5U3RhdGUgPSBmdW5jdGlvbiAobikge1xuICAgIHdoaWxlIChuID4gY3VycmVudFN0YXRlICYmIGN1cnJlbnRTdGF0ZSA8IDQpIHtcbiAgICAgIGZhY2FkZS5yZWFkeVN0YXRlID0gKytjdXJyZW50U3RhdGU7XG4gICAgICAvLyBtYWtlIGZha2UgZXZlbnRzIGZvciBsaWJyYXJpZXMgdGhhdCBhY3R1YWxseSBjaGVjayB0aGUgdHlwZSBvblxuICAgICAgLy8gdGhlIGV2ZW50IG9iamVjdFxuICAgICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gMSkge1xuICAgICAgICBmYWNhZGUuZGlzcGF0Y2hFdmVudChcImxvYWRzdGFydFwiLCB7fSk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudFN0YXRlID09PSAyKSB7XG4gICAgICAgIHdyaXRlSGVhZCgpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gNCkge1xuICAgICAgICB3cml0ZUhlYWQoKTtcbiAgICAgICAgd3JpdGVCb2R5KCk7XG4gICAgICB9XG4gICAgICBmYWNhZGUuZGlzcGF0Y2hFdmVudChcInJlYWR5c3RhdGVjaGFuZ2VcIiwge30pO1xuICAgICAgLy9kZWxheSBmaW5hbCBldmVudHMgaW5jYXNlIG9mIGVycm9yXG4gICAgICBpZiAoY3VycmVudFN0YXRlID09PSA0KSB7XG4gICAgICAgIGlmIChyZXF1ZXN0LmFzeW5jID09PSBmYWxzZSkge1xuICAgICAgICAgIGVtaXRGaW5hbCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFRpbWVvdXQoZW1pdEZpbmFsLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvL2NvbnRyb2wgZmFjYWRlIHJlYWR5IHN0YXRlXG4gIGNvbnN0IHNldFJlYWR5U3RhdGUgPSBmdW5jdGlvbiAobikge1xuICAgIC8vZW1pdCBldmVudHMgdW50aWwgcmVhZHlTdGF0ZSByZWFjaGVzIDRcbiAgICBpZiAobiAhPT0gNCkge1xuICAgICAgZW1pdFJlYWR5U3RhdGUobik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vYmVmb3JlIGVtaXR0aW5nIDQsIHJ1biBhbGwgJ2FmdGVyJyBob29rcyBpbiBzZXF1ZW5jZVxuICAgIGNvbnN0IGFmdGVySG9va3MgPSBob29rcy5saXN0ZW5lcnMoXCJhZnRlclwiKTtcbiAgICB2YXIgcHJvY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChhZnRlckhvb2tzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy9leGVjdXRlIGVhY2ggJ2JlZm9yZScgaG9vayBvbmUgYXQgYSB0aW1lXG4gICAgICAgIGNvbnN0IGhvb2sgPSBhZnRlckhvb2tzLnNoaWZ0KCk7XG4gICAgICAgIGlmIChob29rLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIGhvb2socmVxdWVzdCwgcmVzcG9uc2UpO1xuICAgICAgICAgIHByb2Nlc3MoKTtcbiAgICAgICAgfSBlbHNlIGlmIChob29rLmxlbmd0aCA9PT0gMyAmJiByZXF1ZXN0LmFzeW5jKSB7XG4gICAgICAgICAgaG9vayhyZXF1ZXN0LCByZXNwb25zZSwgcHJvY2Vzcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvY2VzcygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL3Jlc3BvbnNlIHJlYWR5IGZvciByZWFkaW5nXG4gICAgICAgIGVtaXRSZWFkeVN0YXRlKDQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgcHJvY2VzcygpO1xuICB9O1xuXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgLy8gRmFjYWRlIFhIUlxuICB2YXIgZmFjYWRlID0gRXZlbnRFbWl0dGVyKCk7XG4gIHJlcXVlc3QueGhyID0gZmFjYWRlO1xuXG4gIC8vIEhhbmRsZSB0aGUgdW5kZXJseWluZyByZWFkeSBzdGF0ZVxuICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgLy9wdWxsIHN0YXR1cyBhbmQgaGVhZGVyc1xuICAgIHRyeSB7XG4gICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDIpIHtcbiAgICAgICAgcmVhZEhlYWQoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge31cbiAgICAvL3B1bGwgcmVzcG9uc2UgZGF0YVxuICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgdHJhbnNpdGluZyA9IGZhbHNlO1xuICAgICAgcmVhZEhlYWQoKTtcbiAgICAgIHJlYWRCb2R5KCk7XG4gICAgfVxuXG4gICAgc2V0UmVhZHlTdGF0ZSh4aHIucmVhZHlTdGF0ZSk7XG4gIH07XG5cbiAgLy9tYXJrIHRoaXMgeGhyIGFzIGVycm9yZWRcbiAgY29uc3QgaGFzRXJyb3JIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGhhc0Vycm9yID0gdHJ1ZTtcbiAgfTtcbiAgZmFjYWRlLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBoYXNFcnJvckhhbmRsZXIpO1xuICBmYWNhZGUuYWRkRXZlbnRMaXN0ZW5lcihcInRpbWVvdXRcIiwgaGFzRXJyb3JIYW5kbGVyKTtcbiAgZmFjYWRlLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBoYXNFcnJvckhhbmRsZXIpO1xuICAvLyBwcm9ncmVzcyBtZWFucyB3ZSdyZSBjdXJyZW50IGRvd25sb2FkaW5nLi4uXG4gIGZhY2FkZS5hZGRFdmVudExpc3RlbmVyKFwicHJvZ3Jlc3NcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKGN1cnJlbnRTdGF0ZSA8IDMpIHtcbiAgICAgIHNldFJlYWR5U3RhdGUoMyk7XG4gICAgfSBlbHNlIGlmICh4aHIucmVhZHlTdGF0ZSA8PSAzKSB7XG4gICAgICAvL3VudGlsIHJlYWR5ICg0KSwgZWFjaCBwcm9ncmVzcyBldmVudCBpcyBmb2xsb3dlZCBieSByZWFkeXN0YXRlY2hhbmdlLi4uXG4gICAgICBmYWNhZGUuZGlzcGF0Y2hFdmVudChcInJlYWR5c3RhdGVjaGFuZ2VcIiwge30pOyAvL1RPRE8gZmFrZSBhbiBYSFIgZXZlbnRcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGluaXRpYWxpc2UgJ3dpdGhDcmVkZW50aWFscycgb24gZmFjYWRlIHhociBpbiBicm93c2VycyB3aXRoIGl0XG4gIC8vIG9yIGlmIGV4cGxpY2l0bHkgdG9sZCB0byBkbyBzb1xuICBpZiAoXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiB4aHIpIHtcbiAgICBmYWNhZGUud2l0aENyZWRlbnRpYWxzID0gZmFsc2U7XG4gIH1cbiAgZmFjYWRlLnN0YXR1cyA9IDA7XG5cbiAgLy8gaW5pdGlhbGlzZSBhbGwgcG9zc2libGUgZXZlbnQgaGFuZGxlcnNcbiAgZm9yIChsZXQgZXZlbnQgb2YgQXJyYXkuZnJvbShDT01NT05fRVZFTlRTLmNvbmNhdChVUExPQURfRVZFTlRTKSkpIHtcbiAgICBmYWNhZGVbYG9uJHtldmVudH1gXSA9IG51bGw7XG4gIH1cblxuICBmYWNhZGUub3BlbiA9IGZ1bmN0aW9uIChtZXRob2QsIHVybCwgYXN5bmMsIHVzZXIsIHBhc3MpIHtcbiAgICAvLyBJbml0YWlsaXplIGVtcHR5IFhIUiBmYWNhZGVcbiAgICBjdXJyZW50U3RhdGUgPSAwO1xuICAgIGhhc0Vycm9yID0gZmFsc2U7XG4gICAgdHJhbnNpdGluZyA9IGZhbHNlO1xuICAgIC8vcmVzZXQgcmVxdWVzdFxuICAgIHJlcXVlc3QuaGVhZGVycyA9IHt9O1xuICAgIHJlcXVlc3QuaGVhZGVyTmFtZXMgPSB7fTtcbiAgICByZXF1ZXN0LnN0YXR1cyA9IDA7XG4gICAgcmVxdWVzdC5tZXRob2QgPSBtZXRob2Q7XG4gICAgcmVxdWVzdC51cmwgPSB1cmw7XG4gICAgcmVxdWVzdC5hc3luYyA9IGFzeW5jICE9PSBmYWxzZTtcbiAgICByZXF1ZXN0LnVzZXIgPSB1c2VyO1xuICAgIHJlcXVlc3QucGFzcyA9IHBhc3M7XG4gICAgLy9yZXNldCByZXNwb25zZVxuICAgIHJlc3BvbnNlID0ge307XG4gICAgcmVzcG9uc2UuaGVhZGVycyA9IHt9O1xuICAgIC8vIG9wZW5uZWQgZmFjYWRlIHhociAobm90IHJlYWwgeGhyKVxuICAgIHNldFJlYWR5U3RhdGUoMSk7XG4gIH07XG5cbiAgZmFjYWRlLnNlbmQgPSBmdW5jdGlvbiAoYm9keSkge1xuICAgIC8vcmVhZCB4aHIgc2V0dGluZ3MgYmVmb3JlIGhvb2tpbmdcbiAgICBsZXQgaywgbW9kaztcbiAgICBmb3IgKGsgb2YgW1widHlwZVwiLCBcInRpbWVvdXRcIiwgXCJ3aXRoQ3JlZGVudGlhbHNcIl0pIHtcbiAgICAgIG1vZGsgPSBrID09PSBcInR5cGVcIiA/IFwicmVzcG9uc2VUeXBlXCIgOiBrO1xuICAgICAgaWYgKG1vZGsgaW4gZmFjYWRlKSB7XG4gICAgICAgIHJlcXVlc3Rba10gPSBmYWNhZGVbbW9ka107XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVxdWVzdC5ib2R5ID0gYm9keTtcbiAgICBjb25zdCBzZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy9wcm94eSBhbGwgZXZlbnRzIGZyb20gcmVhbCB4aHIgdG8gZmFjYWRlXG4gICAgICBwcm94eUV2ZW50cyhDT01NT05fRVZFTlRTLCB4aHIsIGZhY2FkZSk7XG4gICAgICAvL3Byb3h5IGFsbCB1cGxvYWQgZXZlbnRzIGZyb20gdGhlIHJlYWwgdG8gdGhlIHVwbG9hZCBmYWNhZGVcbiAgICAgIGlmIChmYWNhZGUudXBsb2FkKSB7XG4gICAgICAgIHByb3h5RXZlbnRzKFxuICAgICAgICAgIENPTU1PTl9FVkVOVFMuY29uY2F0KFVQTE9BRF9FVkVOVFMpLFxuICAgICAgICAgIHhoci51cGxvYWQsXG4gICAgICAgICAgZmFjYWRlLnVwbG9hZFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvL3ByZXBhcmUgcmVxdWVzdCBhbGwgYXQgb25jZVxuICAgICAgdHJhbnNpdGluZyA9IHRydWU7XG4gICAgICAvL3BlcmZvcm0gb3BlblxuICAgICAgeGhyLm9wZW4oXG4gICAgICAgIHJlcXVlc3QubWV0aG9kLFxuICAgICAgICByZXF1ZXN0LnVybCxcbiAgICAgICAgcmVxdWVzdC5hc3luYyxcbiAgICAgICAgcmVxdWVzdC51c2VyLFxuICAgICAgICByZXF1ZXN0LnBhc3NcbiAgICAgICk7XG5cbiAgICAgIC8vd3JpdGUgeGhyIHNldHRpbmdzXG4gICAgICBmb3IgKGsgb2YgW1widHlwZVwiLCBcInRpbWVvdXRcIiwgXCJ3aXRoQ3JlZGVudGlhbHNcIl0pIHtcbiAgICAgICAgbW9kayA9IGsgPT09IFwidHlwZVwiID8gXCJyZXNwb25zZVR5cGVcIiA6IGs7XG4gICAgICAgIGlmIChrIGluIHJlcXVlc3QpIHtcbiAgICAgICAgICB4aHJbbW9ka10gPSByZXF1ZXN0W2tdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vaW5zZXJ0IGhlYWRlcnNcbiAgICAgIGZvciAobGV0IGhlYWRlciBpbiByZXF1ZXN0LmhlYWRlcnMpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSByZXF1ZXN0LmhlYWRlcnNbaGVhZGVyXTtcbiAgICAgICAgaWYgKGhlYWRlcikge1xuICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvL3JlYWwgc2VuZCFcbiAgICAgIHhoci5zZW5kKHJlcXVlc3QuYm9keSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGJlZm9yZUhvb2tzID0gaG9va3MubGlzdGVuZXJzKFwiYmVmb3JlXCIpO1xuICAgIC8vcHJvY2VzcyBiZWZvcmVIb29rcyBzZXF1ZW50aWFsbHlcbiAgICB2YXIgcHJvY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghYmVmb3JlSG9va3MubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBzZW5kKCk7XG4gICAgICB9XG4gICAgICAvL2dvIHRvIG5leHQgaG9vayBPUiBvcHRpb25hbGx5IHByb3ZpZGUgcmVzcG9uc2VcbiAgICAgIGNvbnN0IGRvbmUgPSBmdW5jdGlvbiAodXNlclJlc3BvbnNlKSB7XG4gICAgICAgIC8vYnJlYWsgY2hhaW4gLSBwcm92aWRlIGR1bW15IHJlc3BvbnNlIChyZWFkeVN0YXRlIDQpXG4gICAgICAgIGlmIChcbiAgICAgICAgICB0eXBlb2YgdXNlclJlc3BvbnNlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgKHR5cGVvZiB1c2VyUmVzcG9uc2Uuc3RhdHVzID09PSBcIm51bWJlclwiIHx8XG4gICAgICAgICAgICB0eXBlb2YgcmVzcG9uc2Uuc3RhdHVzID09PSBcIm51bWJlclwiKVxuICAgICAgICApIHtcbiAgICAgICAgICBtZXJnZU9iamVjdHModXNlclJlc3BvbnNlLCByZXNwb25zZSk7XG4gICAgICAgICAgaWYgKCEoXCJkYXRhXCIgaW4gdXNlclJlc3BvbnNlKSkge1xuICAgICAgICAgICAgdXNlclJlc3BvbnNlLmRhdGEgPSB1c2VyUmVzcG9uc2UucmVzcG9uc2UgfHwgdXNlclJlc3BvbnNlLnRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldFJlYWR5U3RhdGUoNCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vY29udGludWUgcHJvY2Vzc2luZyB1bnRpbCBubyBiZWZvcmVIb29rcyBsZWZ0XG4gICAgICAgIHByb2Nlc3MoKTtcbiAgICAgIH07XG4gICAgICAvL3NwZWNpZmljYWxseSBwcm92aWRlIGhlYWRlcnMgKHJlYWR5U3RhdGUgMilcbiAgICAgIGRvbmUuaGVhZCA9IGZ1bmN0aW9uICh1c2VyUmVzcG9uc2UpIHtcbiAgICAgICAgbWVyZ2VPYmplY3RzKHVzZXJSZXNwb25zZSwgcmVzcG9uc2UpO1xuICAgICAgICBzZXRSZWFkeVN0YXRlKDIpO1xuICAgICAgfTtcbiAgICAgIC8vc3BlY2lmaWNhbGx5IHByb3ZpZGUgcGFydGlhbCB0ZXh0IChyZXNwb25zZVRleHQgIHJlYWR5U3RhdGUgMylcbiAgICAgIGRvbmUucHJvZ3Jlc3MgPSBmdW5jdGlvbiAodXNlclJlc3BvbnNlKSB7XG4gICAgICAgIG1lcmdlT2JqZWN0cyh1c2VyUmVzcG9uc2UsIHJlc3BvbnNlKTtcbiAgICAgICAgc2V0UmVhZHlTdGF0ZSgzKTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGhvb2sgPSBiZWZvcmVIb29rcy5zaGlmdCgpO1xuICAgICAgLy9hc3luYyBvciBzeW5jP1xuICAgICAgaWYgKGhvb2subGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGRvbmUoaG9vayhyZXF1ZXN0KSk7XG4gICAgICB9IGVsc2UgaWYgKGhvb2subGVuZ3RoID09PSAyICYmIHJlcXVlc3QuYXN5bmMpIHtcbiAgICAgICAgLy9hc3luYyBoYW5kbGVycyBtdXN0IHVzZSBhbiBhc3luYyB4aHJcbiAgICAgICAgaG9vayhyZXF1ZXN0LCBkb25lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vc2tpcCBhc3luYyBob29rIG9uIHN5bmMgcmVxdWVzdHNcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgLy9raWNrIG9mZlxuICAgIHByb2Nlc3MoKTtcbiAgfTtcblxuICBmYWNhZGUuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgc3RhdHVzID0gQUJPUlRFRDtcbiAgICBpZiAodHJhbnNpdGluZykge1xuICAgICAgeGhyLmFib3J0KCk7IC8vdGhpcyB3aWxsIGVtaXQgYW4gJ2Fib3J0JyBmb3IgdXNcbiAgICB9IGVsc2Uge1xuICAgICAgZmFjYWRlLmRpc3BhdGNoRXZlbnQoXCJhYm9ydFwiLCB7fSk7XG4gICAgfVxuICB9O1xuXG4gIGZhY2FkZS5zZXRSZXF1ZXN0SGVhZGVyID0gZnVuY3Rpb24gKGhlYWRlciwgdmFsdWUpIHtcbiAgICAvL3RoZSBmaXJzdCBoZWFkZXIgc2V0IGlzIHVzZWQgZm9yIGFsbCBmdXR1cmUgY2FzZS1hbHRlcm5hdGl2ZXMgb2YgJ25hbWUnXG4gICAgY29uc3QgbE5hbWUgPSBoZWFkZXIgIT0gbnVsbCA/IGhlYWRlci50b0xvd2VyQ2FzZSgpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IG5hbWUgPSAocmVxdWVzdC5oZWFkZXJOYW1lc1tsTmFtZV0gPVxuICAgICAgcmVxdWVzdC5oZWFkZXJOYW1lc1tsTmFtZV0gfHwgaGVhZGVyKTtcbiAgICAvL2FwcGVuZCBoZWFkZXIgdG8gYW55IHByZXZpb3VzIHZhbHVlc1xuICAgIGlmIChyZXF1ZXN0LmhlYWRlcnNbbmFtZV0pIHtcbiAgICAgIHZhbHVlID0gcmVxdWVzdC5oZWFkZXJzW25hbWVdICsgXCIsIFwiICsgdmFsdWU7XG4gICAgfVxuICAgIHJlcXVlc3QuaGVhZGVyc1tuYW1lXSA9IHZhbHVlO1xuICB9O1xuICBmYWNhZGUuZ2V0UmVzcG9uc2VIZWFkZXIgPSBoZWFkZXIgPT5cbiAgICBudWxsaWZ5KHJlc3BvbnNlLmhlYWRlcnNbaGVhZGVyID8gaGVhZGVyLnRvTG93ZXJDYXNlKCkgOiB1bmRlZmluZWRdKTtcblxuICBmYWNhZGUuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzID0gKCkgPT5cbiAgICBudWxsaWZ5KGhlYWRlcnMuY29udmVydChyZXNwb25zZS5oZWFkZXJzKSk7XG5cbiAgLy9wcm94eSBjYWxsIG9ubHkgd2hlbiBzdXBwb3J0ZWRcbiAgaWYgKHhoci5vdmVycmlkZU1pbWVUeXBlKSB7XG4gICAgZmFjYWRlLm92ZXJyaWRlTWltZVR5cGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB4aHIub3ZlcnJpZGVNaW1lVHlwZS5hcHBseSh4aHIsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIC8vY3JlYXRlIGVtaXR0ZXIgd2hlbiBzdXBwb3J0ZWRcbiAgaWYgKHhoci51cGxvYWQpIHtcbiAgICBsZXQgdXAgPSBFdmVudEVtaXR0ZXIoKTtcbiAgICBmYWNhZGUudXBsb2FkID0gdXA7XG4gICAgcmVxdWVzdC51cGxvYWQgPSB1cDtcbiAgfVxuXG4gIGZhY2FkZS5VTlNFTlQgPSAwO1xuICBmYWNhZGUuT1BFTkVEID0gMTtcbiAgZmFjYWRlLkhFQURFUlNfUkVDRUlWRUQgPSAyO1xuICBmYWNhZGUuTE9BRElORyA9IDM7XG4gIGZhY2FkZS5ET05FID0gNDtcblxuICAvLyBmaWxsIGluIGRlZmF1bHQgdmFsdWVzIGZvciBhbiBlbXB0eSBYSFIgb2JqZWN0IGFjY29yZGluZyB0byB0aGUgc3BlY1xuICBmYWNhZGUucmVzcG9uc2UgPSBcIlwiO1xuICBmYWNhZGUucmVzcG9uc2VUZXh0ID0gXCJcIjtcbiAgZmFjYWRlLnJlc3BvbnNlWE1MID0gbnVsbDtcbiAgZmFjYWRlLnJlYWR5U3RhdGUgPSAwO1xuICBmYWNhZGUuc3RhdHVzVGV4dCA9IFwiXCI7XG5cbiAgcmV0dXJuIGZhY2FkZTtcbn07XG5cblhob29rJDEuVU5TRU5UID0gMDtcblhob29rJDEuT1BFTkVEID0gMTtcblhob29rJDEuSEVBREVSU19SRUNFSVZFRCA9IDI7XG5YaG9vayQxLkxPQURJTkcgPSAzO1xuWGhvb2skMS5ET05FID0gNDtcblxuLy9wYXRjaCBpbnRlcmZhY2VcbnZhciBYTUxIdHRwUmVxdWVzdCA9IHtcbiAgcGF0Y2goKSB7XG4gICAgaWYgKE5hdGl2ZSQxKSB7XG4gICAgICB3aW5kb3dSZWYuWE1MSHR0cFJlcXVlc3QgPSBYaG9vayQxO1xuICAgIH1cbiAgfSxcbiAgdW5wYXRjaCgpIHtcbiAgICBpZiAoTmF0aXZlJDEpIHtcbiAgICAgIHdpbmRvd1JlZi5YTUxIdHRwUmVxdWVzdCA9IE5hdGl2ZSQxO1xuICAgIH1cbiAgfSxcbiAgTmF0aXZlOiBOYXRpdmUkMSxcbiAgWGhvb2s6IFhob29rJDEsXG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbmZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxuXG4vL2Jyb3dzZXIncyBmZXRjaFxuY29uc3QgTmF0aXZlID0gd2luZG93UmVmLmZldGNoO1xuZnVuY3Rpb24gY29weVRvT2JqRnJvbVJlcXVlc3QocmVxKSB7XG4gICAgY29uc3QgY29weWVkS2V5cyA9IFtcbiAgICAgICAgXCJtZXRob2RcIixcbiAgICAgICAgXCJoZWFkZXJzXCIsXG4gICAgICAgIFwiYm9keVwiLFxuICAgICAgICBcIm1vZGVcIixcbiAgICAgICAgXCJjcmVkZW50aWFsc1wiLFxuICAgICAgICBcImNhY2hlXCIsXG4gICAgICAgIFwicmVkaXJlY3RcIixcbiAgICAgICAgXCJyZWZlcnJlclwiLFxuICAgICAgICBcInJlZmVycmVyUG9saWN5XCIsXG4gICAgICAgIFwiaW50ZWdyaXR5XCIsXG4gICAgICAgIFwia2VlcGFsaXZlXCIsXG4gICAgICAgIFwic2lnbmFsXCIsXG4gICAgICAgIFwidXJsXCIsXG4gICAgXTtcbiAgICBsZXQgY29weWVkT2JqID0ge307XG4gICAgY29weWVkS2V5cy5mb3JFYWNoKGtleSA9PiAoY29weWVkT2JqW2tleV0gPSByZXFba2V5XSkpO1xuICAgIHJldHVybiBjb3B5ZWRPYmo7XG59XG5mdW5jdGlvbiBjb3ZlcnRIZWFkZXJUb1BsYWluT2JqKGhlYWRlcnMpIHtcbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIGNvdmVydFREQWFycnlUb09iaihbLi4uaGVhZGVycy5lbnRyaWVzKCldKTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICAgICAgcmV0dXJuIGNvdmVydFREQWFycnlUb09iaihoZWFkZXJzKTtcbiAgICB9XG4gICAgcmV0dXJuIGhlYWRlcnM7XG59XG5mdW5jdGlvbiBjb3ZlcnRUREFhcnJ5VG9PYmooaW5wdXQpIHtcbiAgICByZXR1cm4gaW5wdXQucmVkdWNlKChwcmV2LCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgcHJldltrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHt9KTtcbn1cbi8qKlxuICogaWYgZmV0Y2goaGFja2VkIGJ5IFhob29rKSBhY2NlcHQgYSBSZXF1ZXN0IGFzIGEgZmlyc3QgcGFyYW1ldGVyLCBpdCB3aWxsIGJlIGRlc3RyY3V0ZWQgdG8gYSBwbGFpbiBvYmplY3QuXG4gKiBGaW5hbGx5IHRoZSB3aG9sZSBuZXR3b3JrIHJlcXVlc3Qgd2FzIGNvbnZlcnQgdG8gZmVjdGNoKFJlcXVlc3QudXJsLCBvdGhlciBvcHRpb25zKVxuICovXG5jb25zdCBYaG9vayA9IGZ1bmN0aW9uIChpbnB1dCwgaW5pdCA9IHsgaGVhZGVyczoge30gfSkge1xuICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBpbml0KSwgeyBpc0ZldGNoOiB0cnVlIH0pO1xuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICAgICAgY29uc3QgcmVxdWVzdE9iaiA9IGNvcHlUb09iakZyb21SZXF1ZXN0KGlucHV0KTtcbiAgICAgICAgY29uc3QgcHJldkhlYWRlcnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGNvdmVydEhlYWRlclRvUGxhaW5PYmoocmVxdWVzdE9iai5oZWFkZXJzKSksIGNvdmVydEhlYWRlclRvUGxhaW5PYmoob3B0aW9ucy5oZWFkZXJzKSk7XG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcmVxdWVzdE9iaiksIGluaXQpLCB7IGhlYWRlcnM6IHByZXZIZWFkZXJzLCBhY2NlcHRlZFJlcXVlc3Q6IHRydWUgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBvcHRpb25zLnVybCA9IGlucHV0O1xuICAgIH1cbiAgICBjb25zdCBiZWZvcmVIb29rcyA9IGhvb2tzLmxpc3RlbmVycyhcImJlZm9yZVwiKTtcbiAgICBjb25zdCBhZnRlckhvb2tzID0gaG9va3MubGlzdGVuZXJzKFwiYWZ0ZXJcIik7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgbGV0IGZ1bGxmaWxlZCA9IHJlc29sdmU7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NBZnRlciA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKCFhZnRlckhvb2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdWxsZmlsZWQocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaG9vayA9IGFmdGVySG9va3Muc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChob29rLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIGhvb2sob3B0aW9ucywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzQWZ0ZXIocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaG9vay5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaG9vayhvcHRpb25zLCByZXNwb25zZSwgcHJvY2Vzc0FmdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzQWZ0ZXIocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBkb25lID0gZnVuY3Rpb24gKHVzZXJSZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKHVzZXJSZXNwb25zZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UodXNlclJlc3BvbnNlLmJvZHkgfHwgdXNlclJlc3BvbnNlLnRleHQsIHVzZXJSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc0FmdGVyKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2NvbnRpbnVlIHByb2Nlc3NpbmcgdW50aWwgbm8gaG9va3MgbGVmdFxuICAgICAgICAgICAgcHJvY2Vzc0JlZm9yZSgpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBwcm9jZXNzQmVmb3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFiZWZvcmVIb29rcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzZW5kKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaG9vayA9IGJlZm9yZUhvb2tzLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoaG9vay5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShob29rKG9wdGlvbnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGhvb2subGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhvb2sob3B0aW9ucywgZG9uZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHNlbmQgPSAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCB7IHVybCwgaXNGZXRjaCwgYWNjZXB0ZWRSZXF1ZXN0IH0gPSBvcHRpb25zLCByZXN0SW5pdCA9IF9fcmVzdChvcHRpb25zLCBbXCJ1cmxcIiwgXCJpc0ZldGNoXCIsIFwiYWNjZXB0ZWRSZXF1ZXN0XCJdKTtcbiAgICAgICAgICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QgJiYgcmVzdEluaXQuYm9keSBpbnN0YW5jZW9mIFJlYWRhYmxlU3RyZWFtKSB7XG4gICAgICAgICAgICAgICAgcmVzdEluaXQuYm9keSA9IHlpZWxkIG5ldyBSZXNwb25zZShyZXN0SW5pdC5ib2R5KS50ZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gTmF0aXZlKHVybCwgcmVzdEluaXQpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcHJvY2Vzc0FmdGVyKHJlc3BvbnNlKSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGZ1bGxmaWxlZCA9IHJlamVjdDtcbiAgICAgICAgICAgICAgICBwcm9jZXNzQWZ0ZXIoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHByb2Nlc3NCZWZvcmUoKTtcbiAgICB9KTtcbn07XG4vL3BhdGNoIGludGVyZmFjZVxudmFyIGZldGNoID0ge1xuICAgIHBhdGNoKCkge1xuICAgICAgICBpZiAoTmF0aXZlKSB7XG4gICAgICAgICAgICB3aW5kb3dSZWYuZmV0Y2ggPSBYaG9vaztcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdW5wYXRjaCgpIHtcbiAgICAgICAgaWYgKE5hdGl2ZSkge1xuICAgICAgICAgICAgd2luZG93UmVmLmZldGNoID0gTmF0aXZlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBOYXRpdmUsXG4gICAgWGhvb2ssXG59O1xuXG4vL3RoZSBnbG9iYWwgaG9va3MgZXZlbnQgZW1pdHRlciBpcyBhbHNvIHRoZSBnbG9iYWwgeGhvb2sgb2JqZWN0XG4vLyhub3QgdGhlIGJlc3QgZGVjaXNpb24gaW4gaGluZHNpZ2h0KVxuY29uc3QgeGhvb2sgPSBob29rcztcbnhob29rLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcbi8vbW9kaWZ5IGhvb2tzXG54aG9vay5iZWZvcmUgPSBmdW5jdGlvbiAoaGFuZGxlciwgaSkge1xuICBpZiAoaGFuZGxlci5sZW5ndGggPCAxIHx8IGhhbmRsZXIubGVuZ3RoID4gMikge1xuICAgIHRocm93IFwiaW52YWxpZCBob29rXCI7XG4gIH1cbiAgcmV0dXJuIHhob29rLm9uKFwiYmVmb3JlXCIsIGhhbmRsZXIsIGkpO1xufTtcbnhob29rLmFmdGVyID0gZnVuY3Rpb24gKGhhbmRsZXIsIGkpIHtcbiAgaWYgKGhhbmRsZXIubGVuZ3RoIDwgMiB8fCBoYW5kbGVyLmxlbmd0aCA+IDMpIHtcbiAgICB0aHJvdyBcImludmFsaWQgaG9va1wiO1xuICB9XG4gIHJldHVybiB4aG9vay5vbihcImFmdGVyXCIsIGhhbmRsZXIsIGkpO1xufTtcblxuLy9nbG9iYWxseSBlbmFibGUvZGlzYWJsZVxueGhvb2suZW5hYmxlID0gZnVuY3Rpb24gKCkge1xuICBYTUxIdHRwUmVxdWVzdC5wYXRjaCgpO1xuICBmZXRjaC5wYXRjaCgpO1xufTtcbnhob29rLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gIFhNTEh0dHBSZXF1ZXN0LnVucGF0Y2goKTtcbiAgZmV0Y2gudW5wYXRjaCgpO1xufTtcbi8vZXhwb3NlIG5hdGl2ZSBvYmplY3RzXG54aG9vay5YTUxIdHRwUmVxdWVzdCA9IFhNTEh0dHBSZXF1ZXN0Lk5hdGl2ZTtcbnhob29rLmZldGNoID0gZmV0Y2guTmF0aXZlO1xuXG4vL2V4cG9zZSBoZWxwZXJzXG54aG9vay5oZWFkZXJzID0gaGVhZGVycy5jb252ZXJ0O1xuXG4vL2VuYWJsZSBieSBkZWZhdWx0XG54aG9vay5lbmFibGUoKTtcblxuZXhwb3J0IHsgeGhvb2sgYXMgZGVmYXVsdCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luamVjdC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==