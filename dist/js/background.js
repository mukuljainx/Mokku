/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/dexie/dist/dexie.js":
/*!******************************************!*\
  !*** ./node_modules/dexie/dist/dexie.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*
 * Dexie.js - a minimalistic wrapper for IndexedDB
 * ===============================================
 *
 * By David Fahlander, david.fahlander@gmail.com
 *
 * Version 4.0.11, Wed Jan 15 2025
 *
 * https://dexie.org
 *
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/
 */
 
(function (global, factory) {
     true ? module.exports = factory() :
    0;
})(this, (function () { 'use strict';

    /*! *****************************************************************************
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
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    var _global = typeof globalThis !== 'undefined' ? globalThis :
        typeof self !== 'undefined' ? self :
            typeof window !== 'undefined' ? window :
                __webpack_require__.g;

    var keys = Object.keys;
    var isArray = Array.isArray;
    if (typeof Promise !== 'undefined' && !_global.Promise) {
        _global.Promise = Promise;
    }
    function extend(obj, extension) {
        if (typeof extension !== 'object')
            return obj;
        keys(extension).forEach(function (key) {
            obj[key] = extension[key];
        });
        return obj;
    }
    var getProto = Object.getPrototypeOf;
    var _hasOwn = {}.hasOwnProperty;
    function hasOwn(obj, prop) {
        return _hasOwn.call(obj, prop);
    }
    function props(proto, extension) {
        if (typeof extension === 'function')
            extension = extension(getProto(proto));
        (typeof Reflect === "undefined" ? keys : Reflect.ownKeys)(extension).forEach(function (key) {
            setProp(proto, key, extension[key]);
        });
    }
    var defineProperty = Object.defineProperty;
    function setProp(obj, prop, functionOrGetSet, options) {
        defineProperty(obj, prop, extend(functionOrGetSet && hasOwn(functionOrGetSet, "get") && typeof functionOrGetSet.get === 'function' ?
            { get: functionOrGetSet.get, set: functionOrGetSet.set, configurable: true } :
            { value: functionOrGetSet, configurable: true, writable: true }, options));
    }
    function derive(Child) {
        return {
            from: function (Parent) {
                Child.prototype = Object.create(Parent.prototype);
                setProp(Child.prototype, "constructor", Child);
                return {
                    extend: props.bind(null, Child.prototype)
                };
            }
        };
    }
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    function getPropertyDescriptor(obj, prop) {
        var pd = getOwnPropertyDescriptor(obj, prop);
        var proto;
        return pd || (proto = getProto(obj)) && getPropertyDescriptor(proto, prop);
    }
    var _slice = [].slice;
    function slice(args, start, end) {
        return _slice.call(args, start, end);
    }
    function override(origFunc, overridedFactory) {
        return overridedFactory(origFunc);
    }
    function assert(b) {
        if (!b)
            throw new Error("Assertion Failed");
    }
    function asap$1(fn) {
        if (_global.setImmediate)
            setImmediate(fn);
        else
            setTimeout(fn, 0);
    }
    function arrayToObject(array, extractor) {
        return array.reduce(function (result, item, i) {
            var nameAndValue = extractor(item, i);
            if (nameAndValue)
                result[nameAndValue[0]] = nameAndValue[1];
            return result;
        }, {});
    }
    function getByKeyPath(obj, keyPath) {
        if (typeof keyPath === 'string' && hasOwn(obj, keyPath))
            return obj[keyPath];
        if (!keyPath)
            return obj;
        if (typeof keyPath !== 'string') {
            var rv = [];
            for (var i = 0, l = keyPath.length; i < l; ++i) {
                var val = getByKeyPath(obj, keyPath[i]);
                rv.push(val);
            }
            return rv;
        }
        var period = keyPath.indexOf('.');
        if (period !== -1) {
            var innerObj = obj[keyPath.substr(0, period)];
            return innerObj == null ? undefined : getByKeyPath(innerObj, keyPath.substr(period + 1));
        }
        return undefined;
    }
    function setByKeyPath(obj, keyPath, value) {
        if (!obj || keyPath === undefined)
            return;
        if ('isFrozen' in Object && Object.isFrozen(obj))
            return;
        if (typeof keyPath !== 'string' && 'length' in keyPath) {
            assert(typeof value !== 'string' && 'length' in value);
            for (var i = 0, l = keyPath.length; i < l; ++i) {
                setByKeyPath(obj, keyPath[i], value[i]);
            }
        }
        else {
            var period = keyPath.indexOf('.');
            if (period !== -1) {
                var currentKeyPath = keyPath.substr(0, period);
                var remainingKeyPath = keyPath.substr(period + 1);
                if (remainingKeyPath === "")
                    if (value === undefined) {
                        if (isArray(obj) && !isNaN(parseInt(currentKeyPath)))
                            obj.splice(currentKeyPath, 1);
                        else
                            delete obj[currentKeyPath];
                    }
                    else
                        obj[currentKeyPath] = value;
                else {
                    var innerObj = obj[currentKeyPath];
                    if (!innerObj || !hasOwn(obj, currentKeyPath))
                        innerObj = (obj[currentKeyPath] = {});
                    setByKeyPath(innerObj, remainingKeyPath, value);
                }
            }
            else {
                if (value === undefined) {
                    if (isArray(obj) && !isNaN(parseInt(keyPath)))
                        obj.splice(keyPath, 1);
                    else
                        delete obj[keyPath];
                }
                else
                    obj[keyPath] = value;
            }
        }
    }
    function delByKeyPath(obj, keyPath) {
        if (typeof keyPath === 'string')
            setByKeyPath(obj, keyPath, undefined);
        else if ('length' in keyPath)
            [].map.call(keyPath, function (kp) {
                setByKeyPath(obj, kp, undefined);
            });
    }
    function shallowClone(obj) {
        var rv = {};
        for (var m in obj) {
            if (hasOwn(obj, m))
                rv[m] = obj[m];
        }
        return rv;
    }
    var concat = [].concat;
    function flatten(a) {
        return concat.apply([], a);
    }
    var intrinsicTypeNames = "BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey"
        .split(',').concat(flatten([8, 16, 32, 64].map(function (num) { return ["Int", "Uint", "Float"].map(function (t) { return t + num + "Array"; }); }))).filter(function (t) { return _global[t]; });
    var intrinsicTypes = new Set(intrinsicTypeNames.map(function (t) { return _global[t]; }));
    function cloneSimpleObjectTree(o) {
        var rv = {};
        for (var k in o)
            if (hasOwn(o, k)) {
                var v = o[k];
                rv[k] = !v || typeof v !== 'object' || intrinsicTypes.has(v.constructor) ? v : cloneSimpleObjectTree(v);
            }
        return rv;
    }
    function objectIsEmpty(o) {
        for (var k in o)
            if (hasOwn(o, k))
                return false;
        return true;
    }
    var circularRefs = null;
    function deepClone(any) {
        circularRefs = new WeakMap();
        var rv = innerDeepClone(any);
        circularRefs = null;
        return rv;
    }
    function innerDeepClone(x) {
        if (!x || typeof x !== 'object')
            return x;
        var rv = circularRefs.get(x);
        if (rv)
            return rv;
        if (isArray(x)) {
            rv = [];
            circularRefs.set(x, rv);
            for (var i = 0, l = x.length; i < l; ++i) {
                rv.push(innerDeepClone(x[i]));
            }
        }
        else if (intrinsicTypes.has(x.constructor)) {
            rv = x;
        }
        else {
            var proto = getProto(x);
            rv = proto === Object.prototype ? {} : Object.create(proto);
            circularRefs.set(x, rv);
            for (var prop in x) {
                if (hasOwn(x, prop)) {
                    rv[prop] = innerDeepClone(x[prop]);
                }
            }
        }
        return rv;
    }
    var toString = {}.toString;
    function toStringTag(o) {
        return toString.call(o).slice(8, -1);
    }
    var iteratorSymbol = typeof Symbol !== 'undefined' ?
        Symbol.iterator :
        '@@iterator';
    var getIteratorOf = typeof iteratorSymbol === "symbol" ? function (x) {
        var i;
        return x != null && (i = x[iteratorSymbol]) && i.apply(x);
    } : function () { return null; };
    function delArrayItem(a, x) {
        var i = a.indexOf(x);
        if (i >= 0)
            a.splice(i, 1);
        return i >= 0;
    }
    var NO_CHAR_ARRAY = {};
    function getArrayOf(arrayLike) {
        var i, a, x, it;
        if (arguments.length === 1) {
            if (isArray(arrayLike))
                return arrayLike.slice();
            if (this === NO_CHAR_ARRAY && typeof arrayLike === 'string')
                return [arrayLike];
            if ((it = getIteratorOf(arrayLike))) {
                a = [];
                while ((x = it.next()), !x.done)
                    a.push(x.value);
                return a;
            }
            if (arrayLike == null)
                return [arrayLike];
            i = arrayLike.length;
            if (typeof i === 'number') {
                a = new Array(i);
                while (i--)
                    a[i] = arrayLike[i];
                return a;
            }
            return [arrayLike];
        }
        i = arguments.length;
        a = new Array(i);
        while (i--)
            a[i] = arguments[i];
        return a;
    }
    var isAsyncFunction = typeof Symbol !== 'undefined'
        ? function (fn) { return fn[Symbol.toStringTag] === 'AsyncFunction'; }
        : function () { return false; };

    var dexieErrorNames = [
        'Modify',
        'Bulk',
        'OpenFailed',
        'VersionChange',
        'Schema',
        'Upgrade',
        'InvalidTable',
        'MissingAPI',
        'NoSuchDatabase',
        'InvalidArgument',
        'SubTransaction',
        'Unsupported',
        'Internal',
        'DatabaseClosed',
        'PrematureCommit',
        'ForeignAwait'
    ];
    var idbDomErrorNames = [
        'Unknown',
        'Constraint',
        'Data',
        'TransactionInactive',
        'ReadOnly',
        'Version',
        'NotFound',
        'InvalidState',
        'InvalidAccess',
        'Abort',
        'Timeout',
        'QuotaExceeded',
        'Syntax',
        'DataClone'
    ];
    var errorList = dexieErrorNames.concat(idbDomErrorNames);
    var defaultTexts = {
        VersionChanged: "Database version changed by other database connection",
        DatabaseClosed: "Database has been closed",
        Abort: "Transaction aborted",
        TransactionInactive: "Transaction has already completed or failed",
        MissingAPI: "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"
    };
    function DexieError(name, msg) {
        this.name = name;
        this.message = msg;
    }
    derive(DexieError).from(Error).extend({
        toString: function () { return this.name + ": " + this.message; }
    });
    function getMultiErrorMessage(msg, failures) {
        return msg + ". Errors: " + Object.keys(failures)
            .map(function (key) { return failures[key].toString(); })
            .filter(function (v, i, s) { return s.indexOf(v) === i; })
            .join('\n');
    }
    function ModifyError(msg, failures, successCount, failedKeys) {
        this.failures = failures;
        this.failedKeys = failedKeys;
        this.successCount = successCount;
        this.message = getMultiErrorMessage(msg, failures);
    }
    derive(ModifyError).from(DexieError);
    function BulkError(msg, failures) {
        this.name = "BulkError";
        this.failures = Object.keys(failures).map(function (pos) { return failures[pos]; });
        this.failuresByPos = failures;
        this.message = getMultiErrorMessage(msg, this.failures);
    }
    derive(BulkError).from(DexieError);
    var errnames = errorList.reduce(function (obj, name) { return (obj[name] = name + "Error", obj); }, {});
    var BaseException = DexieError;
    var exceptions = errorList.reduce(function (obj, name) {
        var fullName = name + "Error";
        function DexieError(msgOrInner, inner) {
            this.name = fullName;
            if (!msgOrInner) {
                this.message = defaultTexts[name] || fullName;
                this.inner = null;
            }
            else if (typeof msgOrInner === 'string') {
                this.message = "".concat(msgOrInner).concat(!inner ? '' : '\n ' + inner);
                this.inner = inner || null;
            }
            else if (typeof msgOrInner === 'object') {
                this.message = "".concat(msgOrInner.name, " ").concat(msgOrInner.message);
                this.inner = msgOrInner;
            }
        }
        derive(DexieError).from(BaseException);
        obj[name] = DexieError;
        return obj;
    }, {});
    exceptions.Syntax = SyntaxError;
    exceptions.Type = TypeError;
    exceptions.Range = RangeError;
    var exceptionMap = idbDomErrorNames.reduce(function (obj, name) {
        obj[name + "Error"] = exceptions[name];
        return obj;
    }, {});
    function mapError(domError, message) {
        if (!domError || domError instanceof DexieError || domError instanceof TypeError || domError instanceof SyntaxError || !domError.name || !exceptionMap[domError.name])
            return domError;
        var rv = new exceptionMap[domError.name](message || domError.message, domError);
        if ("stack" in domError) {
            setProp(rv, "stack", { get: function () {
                    return this.inner.stack;
                } });
        }
        return rv;
    }
    var fullNameExceptions = errorList.reduce(function (obj, name) {
        if (["Syntax", "Type", "Range"].indexOf(name) === -1)
            obj[name + "Error"] = exceptions[name];
        return obj;
    }, {});
    fullNameExceptions.ModifyError = ModifyError;
    fullNameExceptions.DexieError = DexieError;
    fullNameExceptions.BulkError = BulkError;

    function nop() { }
    function mirror(val) { return val; }
    function pureFunctionChain(f1, f2) {
        if (f1 == null || f1 === mirror)
            return f2;
        return function (val) {
            return f2(f1(val));
        };
    }
    function callBoth(on1, on2) {
        return function () {
            on1.apply(this, arguments);
            on2.apply(this, arguments);
        };
    }
    function hookCreatingChain(f1, f2) {
        if (f1 === nop)
            return f2;
        return function () {
            var res = f1.apply(this, arguments);
            if (res !== undefined)
                arguments[0] = res;
            var onsuccess = this.onsuccess,
            onerror = this.onerror;
            this.onsuccess = null;
            this.onerror = null;
            var res2 = f2.apply(this, arguments);
            if (onsuccess)
                this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
            if (onerror)
                this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
            return res2 !== undefined ? res2 : res;
        };
    }
    function hookDeletingChain(f1, f2) {
        if (f1 === nop)
            return f2;
        return function () {
            f1.apply(this, arguments);
            var onsuccess = this.onsuccess,
            onerror = this.onerror;
            this.onsuccess = this.onerror = null;
            f2.apply(this, arguments);
            if (onsuccess)
                this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
            if (onerror)
                this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
        };
    }
    function hookUpdatingChain(f1, f2) {
        if (f1 === nop)
            return f2;
        return function (modifications) {
            var res = f1.apply(this, arguments);
            extend(modifications, res);
            var onsuccess = this.onsuccess,
            onerror = this.onerror;
            this.onsuccess = null;
            this.onerror = null;
            var res2 = f2.apply(this, arguments);
            if (onsuccess)
                this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
            if (onerror)
                this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
            return res === undefined ?
                (res2 === undefined ? undefined : res2) :
                (extend(res, res2));
        };
    }
    function reverseStoppableEventChain(f1, f2) {
        if (f1 === nop)
            return f2;
        return function () {
            if (f2.apply(this, arguments) === false)
                return false;
            return f1.apply(this, arguments);
        };
    }
    function promisableChain(f1, f2) {
        if (f1 === nop)
            return f2;
        return function () {
            var res = f1.apply(this, arguments);
            if (res && typeof res.then === 'function') {
                var thiz = this, i = arguments.length, args = new Array(i);
                while (i--)
                    args[i] = arguments[i];
                return res.then(function () {
                    return f2.apply(thiz, args);
                });
            }
            return f2.apply(this, arguments);
        };
    }

    var debug = typeof location !== 'undefined' &&
        /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
    function setDebug(value, filter) {
        debug = value;
    }

    var INTERNAL = {};
    var ZONE_ECHO_LIMIT = 100, _a$1 = typeof Promise === 'undefined' ?
        [] :
        (function () {
            var globalP = Promise.resolve();
            if (typeof crypto === 'undefined' || !crypto.subtle)
                return [globalP, getProto(globalP), globalP];
            var nativeP = crypto.subtle.digest("SHA-512", new Uint8Array([0]));
            return [
                nativeP,
                getProto(nativeP),
                globalP
            ];
        })(), resolvedNativePromise = _a$1[0], nativePromiseProto = _a$1[1], resolvedGlobalPromise = _a$1[2], nativePromiseThen = nativePromiseProto && nativePromiseProto.then;
    var NativePromise = resolvedNativePromise && resolvedNativePromise.constructor;
    var patchGlobalPromise = !!resolvedGlobalPromise;
    function schedulePhysicalTick() {
        queueMicrotask(physicalTick);
    }
    var asap = function (callback, args) {
        microtickQueue.push([callback, args]);
        if (needsNewPhysicalTick) {
            schedulePhysicalTick();
            needsNewPhysicalTick = false;
        }
    };
    var isOutsideMicroTick = true,
    needsNewPhysicalTick = true,
    unhandledErrors = [],
    rejectingErrors = [],
    rejectionMapper = mirror;
    var globalPSD = {
        id: 'global',
        global: true,
        ref: 0,
        unhandleds: [],
        onunhandled: nop,
        pgp: false,
        env: {},
        finalize: nop
    };
    var PSD = globalPSD;
    var microtickQueue = [];
    var numScheduledCalls = 0;
    var tickFinalizers = [];
    function DexiePromise(fn) {
        if (typeof this !== 'object')
            throw new TypeError('Promises must be constructed via new');
        this._listeners = [];
        this._lib = false;
        var psd = (this._PSD = PSD);
        if (typeof fn !== 'function') {
            if (fn !== INTERNAL)
                throw new TypeError('Not a function');
            this._state = arguments[1];
            this._value = arguments[2];
            if (this._state === false)
                handleRejection(this, this._value);
            return;
        }
        this._state = null;
        this._value = null;
        ++psd.ref;
        executePromiseTask(this, fn);
    }
    var thenProp = {
        get: function () {
            var psd = PSD, microTaskId = totalEchoes;
            function then(onFulfilled, onRejected) {
                var _this = this;
                var possibleAwait = !psd.global && (psd !== PSD || microTaskId !== totalEchoes);
                var cleanup = possibleAwait && !decrementExpectedAwaits();
                var rv = new DexiePromise(function (resolve, reject) {
                    propagateToListener(_this, new Listener(nativeAwaitCompatibleWrap(onFulfilled, psd, possibleAwait, cleanup), nativeAwaitCompatibleWrap(onRejected, psd, possibleAwait, cleanup), resolve, reject, psd));
                });
                if (this._consoleTask)
                    rv._consoleTask = this._consoleTask;
                return rv;
            }
            then.prototype = INTERNAL;
            return then;
        },
        set: function (value) {
            setProp(this, 'then', value && value.prototype === INTERNAL ?
                thenProp :
                {
                    get: function () {
                        return value;
                    },
                    set: thenProp.set
                });
        }
    };
    props(DexiePromise.prototype, {
        then: thenProp,
        _then: function (onFulfilled, onRejected) {
            propagateToListener(this, new Listener(null, null, onFulfilled, onRejected, PSD));
        },
        catch: function (onRejected) {
            if (arguments.length === 1)
                return this.then(null, onRejected);
            var type = arguments[0], handler = arguments[1];
            return typeof type === 'function' ? this.then(null, function (err) {
                return err instanceof type ? handler(err) : PromiseReject(err);
            })
                : this.then(null, function (err) {
                    return err && err.name === type ? handler(err) : PromiseReject(err);
                });
        },
        finally: function (onFinally) {
            return this.then(function (value) {
                return DexiePromise.resolve(onFinally()).then(function () { return value; });
            }, function (err) {
                return DexiePromise.resolve(onFinally()).then(function () { return PromiseReject(err); });
            });
        },
        timeout: function (ms, msg) {
            var _this = this;
            return ms < Infinity ?
                new DexiePromise(function (resolve, reject) {
                    var handle = setTimeout(function () { return reject(new exceptions.Timeout(msg)); }, ms);
                    _this.then(resolve, reject).finally(clearTimeout.bind(null, handle));
                }) : this;
        }
    });
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag)
        setProp(DexiePromise.prototype, Symbol.toStringTag, 'Dexie.Promise');
    globalPSD.env = snapShot();
    function Listener(onFulfilled, onRejected, resolve, reject, zone) {
        this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
        this.onRejected = typeof onRejected === 'function' ? onRejected : null;
        this.resolve = resolve;
        this.reject = reject;
        this.psd = zone;
    }
    props(DexiePromise, {
        all: function () {
            var values = getArrayOf.apply(null, arguments)
                .map(onPossibleParallellAsync);
            return new DexiePromise(function (resolve, reject) {
                if (values.length === 0)
                    resolve([]);
                var remaining = values.length;
                values.forEach(function (a, i) { return DexiePromise.resolve(a).then(function (x) {
                    values[i] = x;
                    if (!--remaining)
                        resolve(values);
                }, reject); });
            });
        },
        resolve: function (value) {
            if (value instanceof DexiePromise)
                return value;
            if (value && typeof value.then === 'function')
                return new DexiePromise(function (resolve, reject) {
                    value.then(resolve, reject);
                });
            var rv = new DexiePromise(INTERNAL, true, value);
            return rv;
        },
        reject: PromiseReject,
        race: function () {
            var values = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
            return new DexiePromise(function (resolve, reject) {
                values.map(function (value) { return DexiePromise.resolve(value).then(resolve, reject); });
            });
        },
        PSD: {
            get: function () { return PSD; },
            set: function (value) { return PSD = value; }
        },
        totalEchoes: { get: function () { return totalEchoes; } },
        newPSD: newScope,
        usePSD: usePSD,
        scheduler: {
            get: function () { return asap; },
            set: function (value) { asap = value; }
        },
        rejectionMapper: {
            get: function () { return rejectionMapper; },
            set: function (value) { rejectionMapper = value; }
        },
        follow: function (fn, zoneProps) {
            return new DexiePromise(function (resolve, reject) {
                return newScope(function (resolve, reject) {
                    var psd = PSD;
                    psd.unhandleds = [];
                    psd.onunhandled = reject;
                    psd.finalize = callBoth(function () {
                        var _this = this;
                        run_at_end_of_this_or_next_physical_tick(function () {
                            _this.unhandleds.length === 0 ? resolve() : reject(_this.unhandleds[0]);
                        });
                    }, psd.finalize);
                    fn();
                }, zoneProps, resolve, reject);
            });
        }
    });
    if (NativePromise) {
        if (NativePromise.allSettled)
            setProp(DexiePromise, "allSettled", function () {
                var possiblePromises = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
                return new DexiePromise(function (resolve) {
                    if (possiblePromises.length === 0)
                        resolve([]);
                    var remaining = possiblePromises.length;
                    var results = new Array(remaining);
                    possiblePromises.forEach(function (p, i) { return DexiePromise.resolve(p).then(function (value) { return results[i] = { status: "fulfilled", value: value }; }, function (reason) { return results[i] = { status: "rejected", reason: reason }; })
                        .then(function () { return --remaining || resolve(results); }); });
                });
            });
        if (NativePromise.any && typeof AggregateError !== 'undefined')
            setProp(DexiePromise, "any", function () {
                var possiblePromises = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
                return new DexiePromise(function (resolve, reject) {
                    if (possiblePromises.length === 0)
                        reject(new AggregateError([]));
                    var remaining = possiblePromises.length;
                    var failures = new Array(remaining);
                    possiblePromises.forEach(function (p, i) { return DexiePromise.resolve(p).then(function (value) { return resolve(value); }, function (failure) {
                        failures[i] = failure;
                        if (!--remaining)
                            reject(new AggregateError(failures));
                    }); });
                });
            });
        if (NativePromise.withResolvers)
            DexiePromise.withResolvers = NativePromise.withResolvers;
    }
    function executePromiseTask(promise, fn) {
        try {
            fn(function (value) {
                if (promise._state !== null)
                    return;
                if (value === promise)
                    throw new TypeError('A promise cannot be resolved with itself.');
                var shouldExecuteTick = promise._lib && beginMicroTickScope();
                if (value && typeof value.then === 'function') {
                    executePromiseTask(promise, function (resolve, reject) {
                        value instanceof DexiePromise ?
                            value._then(resolve, reject) :
                            value.then(resolve, reject);
                    });
                }
                else {
                    promise._state = true;
                    promise._value = value;
                    propagateAllListeners(promise);
                }
                if (shouldExecuteTick)
                    endMicroTickScope();
            }, handleRejection.bind(null, promise));
        }
        catch (ex) {
            handleRejection(promise, ex);
        }
    }
    function handleRejection(promise, reason) {
        rejectingErrors.push(reason);
        if (promise._state !== null)
            return;
        var shouldExecuteTick = promise._lib && beginMicroTickScope();
        reason = rejectionMapper(reason);
        promise._state = false;
        promise._value = reason;
        addPossiblyUnhandledError(promise);
        propagateAllListeners(promise);
        if (shouldExecuteTick)
            endMicroTickScope();
    }
    function propagateAllListeners(promise) {
        var listeners = promise._listeners;
        promise._listeners = [];
        for (var i = 0, len = listeners.length; i < len; ++i) {
            propagateToListener(promise, listeners[i]);
        }
        var psd = promise._PSD;
        --psd.ref || psd.finalize();
        if (numScheduledCalls === 0) {
            ++numScheduledCalls;
            asap(function () {
                if (--numScheduledCalls === 0)
                    finalizePhysicalTick();
            }, []);
        }
    }
    function propagateToListener(promise, listener) {
        if (promise._state === null) {
            promise._listeners.push(listener);
            return;
        }
        var cb = promise._state ? listener.onFulfilled : listener.onRejected;
        if (cb === null) {
            return (promise._state ? listener.resolve : listener.reject)(promise._value);
        }
        ++listener.psd.ref;
        ++numScheduledCalls;
        asap(callListener, [cb, promise, listener]);
    }
    function callListener(cb, promise, listener) {
        try {
            var ret, value = promise._value;
            if (!promise._state && rejectingErrors.length)
                rejectingErrors = [];
            ret = debug && promise._consoleTask ? promise._consoleTask.run(function () { return cb(value); }) : cb(value);
            if (!promise._state && rejectingErrors.indexOf(value) === -1) {
                markErrorAsHandled(promise);
            }
            listener.resolve(ret);
        }
        catch (e) {
            listener.reject(e);
        }
        finally {
            if (--numScheduledCalls === 0)
                finalizePhysicalTick();
            --listener.psd.ref || listener.psd.finalize();
        }
    }
    function physicalTick() {
        usePSD(globalPSD, function () {
            beginMicroTickScope() && endMicroTickScope();
        });
    }
    function beginMicroTickScope() {
        var wasRootExec = isOutsideMicroTick;
        isOutsideMicroTick = false;
        needsNewPhysicalTick = false;
        return wasRootExec;
    }
    function endMicroTickScope() {
        var callbacks, i, l;
        do {
            while (microtickQueue.length > 0) {
                callbacks = microtickQueue;
                microtickQueue = [];
                l = callbacks.length;
                for (i = 0; i < l; ++i) {
                    var item = callbacks[i];
                    item[0].apply(null, item[1]);
                }
            }
        } while (microtickQueue.length > 0);
        isOutsideMicroTick = true;
        needsNewPhysicalTick = true;
    }
    function finalizePhysicalTick() {
        var unhandledErrs = unhandledErrors;
        unhandledErrors = [];
        unhandledErrs.forEach(function (p) {
            p._PSD.onunhandled.call(null, p._value, p);
        });
        var finalizers = tickFinalizers.slice(0);
        var i = finalizers.length;
        while (i)
            finalizers[--i]();
    }
    function run_at_end_of_this_or_next_physical_tick(fn) {
        function finalizer() {
            fn();
            tickFinalizers.splice(tickFinalizers.indexOf(finalizer), 1);
        }
        tickFinalizers.push(finalizer);
        ++numScheduledCalls;
        asap(function () {
            if (--numScheduledCalls === 0)
                finalizePhysicalTick();
        }, []);
    }
    function addPossiblyUnhandledError(promise) {
        if (!unhandledErrors.some(function (p) { return p._value === promise._value; }))
            unhandledErrors.push(promise);
    }
    function markErrorAsHandled(promise) {
        var i = unhandledErrors.length;
        while (i)
            if (unhandledErrors[--i]._value === promise._value) {
                unhandledErrors.splice(i, 1);
                return;
            }
    }
    function PromiseReject(reason) {
        return new DexiePromise(INTERNAL, false, reason);
    }
    function wrap(fn, errorCatcher) {
        var psd = PSD;
        return function () {
            var wasRootExec = beginMicroTickScope(), outerScope = PSD;
            try {
                switchToZone(psd, true);
                return fn.apply(this, arguments);
            }
            catch (e) {
                errorCatcher && errorCatcher(e);
            }
            finally {
                switchToZone(outerScope, false);
                if (wasRootExec)
                    endMicroTickScope();
            }
        };
    }
    var task = { awaits: 0, echoes: 0, id: 0 };
    var taskCounter = 0;
    var zoneStack = [];
    var zoneEchoes = 0;
    var totalEchoes = 0;
    var zone_id_counter = 0;
    function newScope(fn, props, a1, a2) {
        var parent = PSD, psd = Object.create(parent);
        psd.parent = parent;
        psd.ref = 0;
        psd.global = false;
        psd.id = ++zone_id_counter;
        globalPSD.env;
        psd.env = patchGlobalPromise ? {
            Promise: DexiePromise,
            PromiseProp: { value: DexiePromise, configurable: true, writable: true },
            all: DexiePromise.all,
            race: DexiePromise.race,
            allSettled: DexiePromise.allSettled,
            any: DexiePromise.any,
            resolve: DexiePromise.resolve,
            reject: DexiePromise.reject,
        } : {};
        if (props)
            extend(psd, props);
        ++parent.ref;
        psd.finalize = function () {
            --this.parent.ref || this.parent.finalize();
        };
        var rv = usePSD(psd, fn, a1, a2);
        if (psd.ref === 0)
            psd.finalize();
        return rv;
    }
    function incrementExpectedAwaits() {
        if (!task.id)
            task.id = ++taskCounter;
        ++task.awaits;
        task.echoes += ZONE_ECHO_LIMIT;
        return task.id;
    }
    function decrementExpectedAwaits() {
        if (!task.awaits)
            return false;
        if (--task.awaits === 0)
            task.id = 0;
        task.echoes = task.awaits * ZONE_ECHO_LIMIT;
        return true;
    }
    if (('' + nativePromiseThen).indexOf('[native code]') === -1) {
        incrementExpectedAwaits = decrementExpectedAwaits = nop;
    }
    function onPossibleParallellAsync(possiblePromise) {
        if (task.echoes && possiblePromise && possiblePromise.constructor === NativePromise) {
            incrementExpectedAwaits();
            return possiblePromise.then(function (x) {
                decrementExpectedAwaits();
                return x;
            }, function (e) {
                decrementExpectedAwaits();
                return rejection(e);
            });
        }
        return possiblePromise;
    }
    function zoneEnterEcho(targetZone) {
        ++totalEchoes;
        if (!task.echoes || --task.echoes === 0) {
            task.echoes = task.awaits = task.id = 0;
        }
        zoneStack.push(PSD);
        switchToZone(targetZone, true);
    }
    function zoneLeaveEcho() {
        var zone = zoneStack[zoneStack.length - 1];
        zoneStack.pop();
        switchToZone(zone, false);
    }
    function switchToZone(targetZone, bEnteringZone) {
        var currentZone = PSD;
        if (bEnteringZone ? task.echoes && (!zoneEchoes++ || targetZone !== PSD) : zoneEchoes && (!--zoneEchoes || targetZone !== PSD)) {
            queueMicrotask(bEnteringZone ? zoneEnterEcho.bind(null, targetZone) : zoneLeaveEcho);
        }
        if (targetZone === PSD)
            return;
        PSD = targetZone;
        if (currentZone === globalPSD)
            globalPSD.env = snapShot();
        if (patchGlobalPromise) {
            var GlobalPromise = globalPSD.env.Promise;
            var targetEnv = targetZone.env;
            if (currentZone.global || targetZone.global) {
                Object.defineProperty(_global, 'Promise', targetEnv.PromiseProp);
                GlobalPromise.all = targetEnv.all;
                GlobalPromise.race = targetEnv.race;
                GlobalPromise.resolve = targetEnv.resolve;
                GlobalPromise.reject = targetEnv.reject;
                if (targetEnv.allSettled)
                    GlobalPromise.allSettled = targetEnv.allSettled;
                if (targetEnv.any)
                    GlobalPromise.any = targetEnv.any;
            }
        }
    }
    function snapShot() {
        var GlobalPromise = _global.Promise;
        return patchGlobalPromise ? {
            Promise: GlobalPromise,
            PromiseProp: Object.getOwnPropertyDescriptor(_global, "Promise"),
            all: GlobalPromise.all,
            race: GlobalPromise.race,
            allSettled: GlobalPromise.allSettled,
            any: GlobalPromise.any,
            resolve: GlobalPromise.resolve,
            reject: GlobalPromise.reject,
        } : {};
    }
    function usePSD(psd, fn, a1, a2, a3) {
        var outerScope = PSD;
        try {
            switchToZone(psd, true);
            return fn(a1, a2, a3);
        }
        finally {
            switchToZone(outerScope, false);
        }
    }
    function nativeAwaitCompatibleWrap(fn, zone, possibleAwait, cleanup) {
        return typeof fn !== 'function' ? fn : function () {
            var outerZone = PSD;
            if (possibleAwait)
                incrementExpectedAwaits();
            switchToZone(zone, true);
            try {
                return fn.apply(this, arguments);
            }
            finally {
                switchToZone(outerZone, false);
                if (cleanup)
                    queueMicrotask(decrementExpectedAwaits);
            }
        };
    }
    function execInGlobalContext(cb) {
        if (Promise === NativePromise && task.echoes === 0) {
            if (zoneEchoes === 0) {
                cb();
            }
            else {
                enqueueNativeMicroTask(cb);
            }
        }
        else {
            setTimeout(cb, 0);
        }
    }
    var rejection = DexiePromise.reject;

    function tempTransaction(db, mode, storeNames, fn) {
        if (!db.idbdb || (!db._state.openComplete && (!PSD.letThrough && !db._vip))) {
            if (db._state.openComplete) {
                return rejection(new exceptions.DatabaseClosed(db._state.dbOpenError));
            }
            if (!db._state.isBeingOpened) {
                if (!db._state.autoOpen)
                    return rejection(new exceptions.DatabaseClosed());
                db.open().catch(nop);
            }
            return db._state.dbReadyPromise.then(function () { return tempTransaction(db, mode, storeNames, fn); });
        }
        else {
            var trans = db._createTransaction(mode, storeNames, db._dbSchema);
            try {
                trans.create();
                db._state.PR1398_maxLoop = 3;
            }
            catch (ex) {
                if (ex.name === errnames.InvalidState && db.isOpen() && --db._state.PR1398_maxLoop > 0) {
                    console.warn('Dexie: Need to reopen db');
                    db.close({ disableAutoOpen: false });
                    return db.open().then(function () { return tempTransaction(db, mode, storeNames, fn); });
                }
                return rejection(ex);
            }
            return trans._promise(mode, function (resolve, reject) {
                return newScope(function () {
                    PSD.trans = trans;
                    return fn(resolve, reject, trans);
                });
            }).then(function (result) {
                if (mode === 'readwrite')
                    try {
                        trans.idbtrans.commit();
                    }
                    catch (_a) { }
                return mode === 'readonly' ? result : trans._completion.then(function () { return result; });
            });
        }
    }

    var DEXIE_VERSION = '4.0.11';
    var maxString = String.fromCharCode(65535);
    var minKey = -Infinity;
    var INVALID_KEY_ARGUMENT = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.";
    var STRING_EXPECTED = "String expected.";
    var connections = [];
    var DBNAMES_DB = '__dbnames';
    var READONLY = 'readonly';
    var READWRITE = 'readwrite';

    function combine(filter1, filter2) {
        return filter1 ?
            filter2 ?
                function () { return filter1.apply(this, arguments) && filter2.apply(this, arguments); } :
                filter1 :
            filter2;
    }

    var AnyRange = {
        type: 3 ,
        lower: -Infinity,
        lowerOpen: false,
        upper: [[]],
        upperOpen: false
    };

    function workaroundForUndefinedPrimKey(keyPath) {
        return typeof keyPath === "string" && !/\./.test(keyPath)
            ? function (obj) {
                if (obj[keyPath] === undefined && (keyPath in obj)) {
                    obj = deepClone(obj);
                    delete obj[keyPath];
                }
                return obj;
            }
            : function (obj) { return obj; };
    }

    function Entity() {
        throw exceptions.Type();
    }

    function cmp(a, b) {
        try {
            var ta = type(a);
            var tb = type(b);
            if (ta !== tb) {
                if (ta === 'Array')
                    return 1;
                if (tb === 'Array')
                    return -1;
                if (ta === 'binary')
                    return 1;
                if (tb === 'binary')
                    return -1;
                if (ta === 'string')
                    return 1;
                if (tb === 'string')
                    return -1;
                if (ta === 'Date')
                    return 1;
                if (tb !== 'Date')
                    return NaN;
                return -1;
            }
            switch (ta) {
                case 'number':
                case 'Date':
                case 'string':
                    return a > b ? 1 : a < b ? -1 : 0;
                case 'binary': {
                    return compareUint8Arrays(getUint8Array(a), getUint8Array(b));
                }
                case 'Array':
                    return compareArrays(a, b);
            }
        }
        catch (_a) { }
        return NaN;
    }
    function compareArrays(a, b) {
        var al = a.length;
        var bl = b.length;
        var l = al < bl ? al : bl;
        for (var i = 0; i < l; ++i) {
            var res = cmp(a[i], b[i]);
            if (res !== 0)
                return res;
        }
        return al === bl ? 0 : al < bl ? -1 : 1;
    }
    function compareUint8Arrays(a, b) {
        var al = a.length;
        var bl = b.length;
        var l = al < bl ? al : bl;
        for (var i = 0; i < l; ++i) {
            if (a[i] !== b[i])
                return a[i] < b[i] ? -1 : 1;
        }
        return al === bl ? 0 : al < bl ? -1 : 1;
    }
    function type(x) {
        var t = typeof x;
        if (t !== 'object')
            return t;
        if (ArrayBuffer.isView(x))
            return 'binary';
        var tsTag = toStringTag(x);
        return tsTag === 'ArrayBuffer' ? 'binary' : tsTag;
    }
    function getUint8Array(a) {
        if (a instanceof Uint8Array)
            return a;
        if (ArrayBuffer.isView(a))
            return new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
        return new Uint8Array(a);
    }

    var Table =  (function () {
        function Table() {
        }
        Table.prototype._trans = function (mode, fn, writeLocked) {
            var trans = this._tx || PSD.trans;
            var tableName = this.name;
            var task = debug && typeof console !== 'undefined' && console.createTask && console.createTask("Dexie: ".concat(mode === 'readonly' ? 'read' : 'write', " ").concat(this.name));
            function checkTableInTransaction(resolve, reject, trans) {
                if (!trans.schema[tableName])
                    throw new exceptions.NotFound("Table " + tableName + " not part of transaction");
                return fn(trans.idbtrans, trans);
            }
            var wasRootExec = beginMicroTickScope();
            try {
                var p = trans && trans.db._novip === this.db._novip ?
                    trans === PSD.trans ?
                        trans._promise(mode, checkTableInTransaction, writeLocked) :
                        newScope(function () { return trans._promise(mode, checkTableInTransaction, writeLocked); }, { trans: trans, transless: PSD.transless || PSD }) :
                    tempTransaction(this.db, mode, [this.name], checkTableInTransaction);
                if (task) {
                    p._consoleTask = task;
                    p = p.catch(function (err) {
                        console.trace(err);
                        return rejection(err);
                    });
                }
                return p;
            }
            finally {
                if (wasRootExec)
                    endMicroTickScope();
            }
        };
        Table.prototype.get = function (keyOrCrit, cb) {
            var _this = this;
            if (keyOrCrit && keyOrCrit.constructor === Object)
                return this.where(keyOrCrit).first(cb);
            if (keyOrCrit == null)
                return rejection(new exceptions.Type("Invalid argument to Table.get()"));
            return this._trans('readonly', function (trans) {
                return _this.core.get({ trans: trans, key: keyOrCrit })
                    .then(function (res) { return _this.hook.reading.fire(res); });
            }).then(cb);
        };
        Table.prototype.where = function (indexOrCrit) {
            if (typeof indexOrCrit === 'string')
                return new this.db.WhereClause(this, indexOrCrit);
            if (isArray(indexOrCrit))
                return new this.db.WhereClause(this, "[".concat(indexOrCrit.join('+'), "]"));
            var keyPaths = keys(indexOrCrit);
            if (keyPaths.length === 1)
                return this
                    .where(keyPaths[0])
                    .equals(indexOrCrit[keyPaths[0]]);
            var compoundIndex = this.schema.indexes.concat(this.schema.primKey).filter(function (ix) {
                if (ix.compound &&
                    keyPaths.every(function (keyPath) { return ix.keyPath.indexOf(keyPath) >= 0; })) {
                    for (var i = 0; i < keyPaths.length; ++i) {
                        if (keyPaths.indexOf(ix.keyPath[i]) === -1)
                            return false;
                    }
                    return true;
                }
                return false;
            }).sort(function (a, b) { return a.keyPath.length - b.keyPath.length; })[0];
            if (compoundIndex && this.db._maxKey !== maxString) {
                var keyPathsInValidOrder = compoundIndex.keyPath.slice(0, keyPaths.length);
                return this
                    .where(keyPathsInValidOrder)
                    .equals(keyPathsInValidOrder.map(function (kp) { return indexOrCrit[kp]; }));
            }
            if (!compoundIndex && debug)
                console.warn("The query ".concat(JSON.stringify(indexOrCrit), " on ").concat(this.name, " would benefit from a ") +
                    "compound index [".concat(keyPaths.join('+'), "]"));
            var idxByName = this.schema.idxByName;
            function equals(a, b) {
                return cmp(a, b) === 0;
            }
            var _a = keyPaths.reduce(function (_a, keyPath) {
                var prevIndex = _a[0], prevFilterFn = _a[1];
                var index = idxByName[keyPath];
                var value = indexOrCrit[keyPath];
                return [
                    prevIndex || index,
                    prevIndex || !index ?
                        combine(prevFilterFn, index && index.multi ?
                            function (x) {
                                var prop = getByKeyPath(x, keyPath);
                                return isArray(prop) && prop.some(function (item) { return equals(value, item); });
                            } : function (x) { return equals(value, getByKeyPath(x, keyPath)); })
                        : prevFilterFn
                ];
            }, [null, null]), idx = _a[0], filterFunction = _a[1];
            return idx ?
                this.where(idx.name).equals(indexOrCrit[idx.keyPath])
                    .filter(filterFunction) :
                compoundIndex ?
                    this.filter(filterFunction) :
                    this.where(keyPaths).equals('');
        };
        Table.prototype.filter = function (filterFunction) {
            return this.toCollection().and(filterFunction);
        };
        Table.prototype.count = function (thenShortcut) {
            return this.toCollection().count(thenShortcut);
        };
        Table.prototype.offset = function (offset) {
            return this.toCollection().offset(offset);
        };
        Table.prototype.limit = function (numRows) {
            return this.toCollection().limit(numRows);
        };
        Table.prototype.each = function (callback) {
            return this.toCollection().each(callback);
        };
        Table.prototype.toArray = function (thenShortcut) {
            return this.toCollection().toArray(thenShortcut);
        };
        Table.prototype.toCollection = function () {
            return new this.db.Collection(new this.db.WhereClause(this));
        };
        Table.prototype.orderBy = function (index) {
            return new this.db.Collection(new this.db.WhereClause(this, isArray(index) ?
                "[".concat(index.join('+'), "]") :
                index));
        };
        Table.prototype.reverse = function () {
            return this.toCollection().reverse();
        };
        Table.prototype.mapToClass = function (constructor) {
            var _a = this, db = _a.db, tableName = _a.name;
            this.schema.mappedClass = constructor;
            if (constructor.prototype instanceof Entity) {
                constructor =  (function (_super) {
                    __extends(class_1, _super);
                    function class_1() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    Object.defineProperty(class_1.prototype, "db", {
                        get: function () { return db; },
                        enumerable: false,
                        configurable: true
                    });
                    class_1.prototype.table = function () { return tableName; };
                    return class_1;
                }(constructor));
            }
            var inheritedProps = new Set();
            for (var proto = constructor.prototype; proto; proto = getProto(proto)) {
                Object.getOwnPropertyNames(proto).forEach(function (propName) { return inheritedProps.add(propName); });
            }
            var readHook = function (obj) {
                if (!obj)
                    return obj;
                var res = Object.create(constructor.prototype);
                for (var m in obj)
                    if (!inheritedProps.has(m))
                        try {
                            res[m] = obj[m];
                        }
                        catch (_) { }
                return res;
            };
            if (this.schema.readHook) {
                this.hook.reading.unsubscribe(this.schema.readHook);
            }
            this.schema.readHook = readHook;
            this.hook("reading", readHook);
            return constructor;
        };
        Table.prototype.defineClass = function () {
            function Class(content) {
                extend(this, content);
            }
            return this.mapToClass(Class);
        };
        Table.prototype.add = function (obj, key) {
            var _this = this;
            var _a = this.schema.primKey, auto = _a.auto, keyPath = _a.keyPath;
            var objToAdd = obj;
            if (keyPath && auto) {
                objToAdd = workaroundForUndefinedPrimKey(keyPath)(obj);
            }
            return this._trans('readwrite', function (trans) {
                return _this.core.mutate({ trans: trans, type: 'add', keys: key != null ? [key] : null, values: [objToAdd] });
            }).then(function (res) { return res.numFailures ? DexiePromise.reject(res.failures[0]) : res.lastResult; })
                .then(function (lastResult) {
                if (keyPath) {
                    try {
                        setByKeyPath(obj, keyPath, lastResult);
                    }
                    catch (_) { }
                }
                return lastResult;
            });
        };
        Table.prototype.update = function (keyOrObject, modifications) {
            if (typeof keyOrObject === 'object' && !isArray(keyOrObject)) {
                var key = getByKeyPath(keyOrObject, this.schema.primKey.keyPath);
                if (key === undefined)
                    return rejection(new exceptions.InvalidArgument("Given object does not contain its primary key"));
                return this.where(":id").equals(key).modify(modifications);
            }
            else {
                return this.where(":id").equals(keyOrObject).modify(modifications);
            }
        };
        Table.prototype.put = function (obj, key) {
            var _this = this;
            var _a = this.schema.primKey, auto = _a.auto, keyPath = _a.keyPath;
            var objToAdd = obj;
            if (keyPath && auto) {
                objToAdd = workaroundForUndefinedPrimKey(keyPath)(obj);
            }
            return this._trans('readwrite', function (trans) { return _this.core.mutate({ trans: trans, type: 'put', values: [objToAdd], keys: key != null ? [key] : null }); })
                .then(function (res) { return res.numFailures ? DexiePromise.reject(res.failures[0]) : res.lastResult; })
                .then(function (lastResult) {
                if (keyPath) {
                    try {
                        setByKeyPath(obj, keyPath, lastResult);
                    }
                    catch (_) { }
                }
                return lastResult;
            });
        };
        Table.prototype.delete = function (key) {
            var _this = this;
            return this._trans('readwrite', function (trans) { return _this.core.mutate({ trans: trans, type: 'delete', keys: [key] }); })
                .then(function (res) { return res.numFailures ? DexiePromise.reject(res.failures[0]) : undefined; });
        };
        Table.prototype.clear = function () {
            var _this = this;
            return this._trans('readwrite', function (trans) { return _this.core.mutate({ trans: trans, type: 'deleteRange', range: AnyRange }); })
                .then(function (res) { return res.numFailures ? DexiePromise.reject(res.failures[0]) : undefined; });
        };
        Table.prototype.bulkGet = function (keys) {
            var _this = this;
            return this._trans('readonly', function (trans) {
                return _this.core.getMany({
                    keys: keys,
                    trans: trans
                }).then(function (result) { return result.map(function (res) { return _this.hook.reading.fire(res); }); });
            });
        };
        Table.prototype.bulkAdd = function (objects, keysOrOptions, options) {
            var _this = this;
            var keys = Array.isArray(keysOrOptions) ? keysOrOptions : undefined;
            options = options || (keys ? undefined : keysOrOptions);
            var wantResults = options ? options.allKeys : undefined;
            return this._trans('readwrite', function (trans) {
                var _a = _this.schema.primKey, auto = _a.auto, keyPath = _a.keyPath;
                if (keyPath && keys)
                    throw new exceptions.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
                if (keys && keys.length !== objects.length)
                    throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
                var numObjects = objects.length;
                var objectsToAdd = keyPath && auto ?
                    objects.map(workaroundForUndefinedPrimKey(keyPath)) :
                    objects;
                return _this.core.mutate({ trans: trans, type: 'add', keys: keys, values: objectsToAdd, wantResults: wantResults })
                    .then(function (_a) {
                    var numFailures = _a.numFailures, results = _a.results, lastResult = _a.lastResult, failures = _a.failures;
                    var result = wantResults ? results : lastResult;
                    if (numFailures === 0)
                        return result;
                    throw new BulkError("".concat(_this.name, ".bulkAdd(): ").concat(numFailures, " of ").concat(numObjects, " operations failed"), failures);
                });
            });
        };
        Table.prototype.bulkPut = function (objects, keysOrOptions, options) {
            var _this = this;
            var keys = Array.isArray(keysOrOptions) ? keysOrOptions : undefined;
            options = options || (keys ? undefined : keysOrOptions);
            var wantResults = options ? options.allKeys : undefined;
            return this._trans('readwrite', function (trans) {
                var _a = _this.schema.primKey, auto = _a.auto, keyPath = _a.keyPath;
                if (keyPath && keys)
                    throw new exceptions.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
                if (keys && keys.length !== objects.length)
                    throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
                var numObjects = objects.length;
                var objectsToPut = keyPath && auto ?
                    objects.map(workaroundForUndefinedPrimKey(keyPath)) :
                    objects;
                return _this.core.mutate({ trans: trans, type: 'put', keys: keys, values: objectsToPut, wantResults: wantResults })
                    .then(function (_a) {
                    var numFailures = _a.numFailures, results = _a.results, lastResult = _a.lastResult, failures = _a.failures;
                    var result = wantResults ? results : lastResult;
                    if (numFailures === 0)
                        return result;
                    throw new BulkError("".concat(_this.name, ".bulkPut(): ").concat(numFailures, " of ").concat(numObjects, " operations failed"), failures);
                });
            });
        };
        Table.prototype.bulkUpdate = function (keysAndChanges) {
            var _this = this;
            var coreTable = this.core;
            var keys = keysAndChanges.map(function (entry) { return entry.key; });
            var changeSpecs = keysAndChanges.map(function (entry) { return entry.changes; });
            var offsetMap = [];
            return this._trans('readwrite', function (trans) {
                return coreTable.getMany({ trans: trans, keys: keys, cache: 'clone' }).then(function (objs) {
                    var resultKeys = [];
                    var resultObjs = [];
                    keysAndChanges.forEach(function (_a, idx) {
                        var key = _a.key, changes = _a.changes;
                        var obj = objs[idx];
                        if (obj) {
                            for (var _i = 0, _b = Object.keys(changes); _i < _b.length; _i++) {
                                var keyPath = _b[_i];
                                var value = changes[keyPath];
                                if (keyPath === _this.schema.primKey.keyPath) {
                                    if (cmp(value, key) !== 0) {
                                        throw new exceptions.Constraint("Cannot update primary key in bulkUpdate()");
                                    }
                                }
                                else {
                                    setByKeyPath(obj, keyPath, value);
                                }
                            }
                            offsetMap.push(idx);
                            resultKeys.push(key);
                            resultObjs.push(obj);
                        }
                    });
                    var numEntries = resultKeys.length;
                    return coreTable
                        .mutate({
                        trans: trans,
                        type: 'put',
                        keys: resultKeys,
                        values: resultObjs,
                        updates: {
                            keys: keys,
                            changeSpecs: changeSpecs
                        }
                    })
                        .then(function (_a) {
                        var numFailures = _a.numFailures, failures = _a.failures;
                        if (numFailures === 0)
                            return numEntries;
                        for (var _i = 0, _b = Object.keys(failures); _i < _b.length; _i++) {
                            var offset = _b[_i];
                            var mappedOffset = offsetMap[Number(offset)];
                            if (mappedOffset != null) {
                                var failure = failures[offset];
                                delete failures[offset];
                                failures[mappedOffset] = failure;
                            }
                        }
                        throw new BulkError("".concat(_this.name, ".bulkUpdate(): ").concat(numFailures, " of ").concat(numEntries, " operations failed"), failures);
                    });
                });
            });
        };
        Table.prototype.bulkDelete = function (keys) {
            var _this = this;
            var numKeys = keys.length;
            return this._trans('readwrite', function (trans) {
                return _this.core.mutate({ trans: trans, type: 'delete', keys: keys });
            }).then(function (_a) {
                var numFailures = _a.numFailures, lastResult = _a.lastResult, failures = _a.failures;
                if (numFailures === 0)
                    return lastResult;
                throw new BulkError("".concat(_this.name, ".bulkDelete(): ").concat(numFailures, " of ").concat(numKeys, " operations failed"), failures);
            });
        };
        return Table;
    }());

    function Events(ctx) {
        var evs = {};
        var rv = function (eventName, subscriber) {
            if (subscriber) {
                var i = arguments.length, args = new Array(i - 1);
                while (--i)
                    args[i - 1] = arguments[i];
                evs[eventName].subscribe.apply(null, args);
                return ctx;
            }
            else if (typeof (eventName) === 'string') {
                return evs[eventName];
            }
        };
        rv.addEventType = add;
        for (var i = 1, l = arguments.length; i < l; ++i) {
            add(arguments[i]);
        }
        return rv;
        function add(eventName, chainFunction, defaultFunction) {
            if (typeof eventName === 'object')
                return addConfiguredEvents(eventName);
            if (!chainFunction)
                chainFunction = reverseStoppableEventChain;
            if (!defaultFunction)
                defaultFunction = nop;
            var context = {
                subscribers: [],
                fire: defaultFunction,
                subscribe: function (cb) {
                    if (context.subscribers.indexOf(cb) === -1) {
                        context.subscribers.push(cb);
                        context.fire = chainFunction(context.fire, cb);
                    }
                },
                unsubscribe: function (cb) {
                    context.subscribers = context.subscribers.filter(function (fn) { return fn !== cb; });
                    context.fire = context.subscribers.reduce(chainFunction, defaultFunction);
                }
            };
            evs[eventName] = rv[eventName] = context;
            return context;
        }
        function addConfiguredEvents(cfg) {
            keys(cfg).forEach(function (eventName) {
                var args = cfg[eventName];
                if (isArray(args)) {
                    add(eventName, cfg[eventName][0], cfg[eventName][1]);
                }
                else if (args === 'asap') {
                    var context = add(eventName, mirror, function fire() {
                        var i = arguments.length, args = new Array(i);
                        while (i--)
                            args[i] = arguments[i];
                        context.subscribers.forEach(function (fn) {
                            asap$1(function fireEvent() {
                                fn.apply(null, args);
                            });
                        });
                    });
                }
                else
                    throw new exceptions.InvalidArgument("Invalid event config");
            });
        }
    }

    function makeClassConstructor(prototype, constructor) {
        derive(constructor).from({ prototype: prototype });
        return constructor;
    }

    function createTableConstructor(db) {
        return makeClassConstructor(Table.prototype, function Table(name, tableSchema, trans) {
            this.db = db;
            this._tx = trans;
            this.name = name;
            this.schema = tableSchema;
            this.hook = db._allTables[name] ? db._allTables[name].hook : Events(null, {
                "creating": [hookCreatingChain, nop],
                "reading": [pureFunctionChain, mirror],
                "updating": [hookUpdatingChain, nop],
                "deleting": [hookDeletingChain, nop]
            });
        });
    }

    function isPlainKeyRange(ctx, ignoreLimitFilter) {
        return !(ctx.filter || ctx.algorithm || ctx.or) &&
            (ignoreLimitFilter ? ctx.justLimit : !ctx.replayFilter);
    }
    function addFilter(ctx, fn) {
        ctx.filter = combine(ctx.filter, fn);
    }
    function addReplayFilter(ctx, factory, isLimitFilter) {
        var curr = ctx.replayFilter;
        ctx.replayFilter = curr ? function () { return combine(curr(), factory()); } : factory;
        ctx.justLimit = isLimitFilter && !curr;
    }
    function addMatchFilter(ctx, fn) {
        ctx.isMatch = combine(ctx.isMatch, fn);
    }
    function getIndexOrStore(ctx, coreSchema) {
        if (ctx.isPrimKey)
            return coreSchema.primaryKey;
        var index = coreSchema.getIndexByKeyPath(ctx.index);
        if (!index)
            throw new exceptions.Schema("KeyPath " + ctx.index + " on object store " + coreSchema.name + " is not indexed");
        return index;
    }
    function openCursor(ctx, coreTable, trans) {
        var index = getIndexOrStore(ctx, coreTable.schema);
        return coreTable.openCursor({
            trans: trans,
            values: !ctx.keysOnly,
            reverse: ctx.dir === 'prev',
            unique: !!ctx.unique,
            query: {
                index: index,
                range: ctx.range
            }
        });
    }
    function iter(ctx, fn, coreTrans, coreTable) {
        var filter = ctx.replayFilter ? combine(ctx.filter, ctx.replayFilter()) : ctx.filter;
        if (!ctx.or) {
            return iterate(openCursor(ctx, coreTable, coreTrans), combine(ctx.algorithm, filter), fn, !ctx.keysOnly && ctx.valueMapper);
        }
        else {
            var set_1 = {};
            var union = function (item, cursor, advance) {
                if (!filter || filter(cursor, advance, function (result) { return cursor.stop(result); }, function (err) { return cursor.fail(err); })) {
                    var primaryKey = cursor.primaryKey;
                    var key = '' + primaryKey;
                    if (key === '[object ArrayBuffer]')
                        key = '' + new Uint8Array(primaryKey);
                    if (!hasOwn(set_1, key)) {
                        set_1[key] = true;
                        fn(item, cursor, advance);
                    }
                }
            };
            return Promise.all([
                ctx.or._iterate(union, coreTrans),
                iterate(openCursor(ctx, coreTable, coreTrans), ctx.algorithm, union, !ctx.keysOnly && ctx.valueMapper)
            ]);
        }
    }
    function iterate(cursorPromise, filter, fn, valueMapper) {
        var mappedFn = valueMapper ? function (x, c, a) { return fn(valueMapper(x), c, a); } : fn;
        var wrappedFn = wrap(mappedFn);
        return cursorPromise.then(function (cursor) {
            if (cursor) {
                return cursor.start(function () {
                    var c = function () { return cursor.continue(); };
                    if (!filter || filter(cursor, function (advancer) { return c = advancer; }, function (val) { cursor.stop(val); c = nop; }, function (e) { cursor.fail(e); c = nop; }))
                        wrappedFn(cursor.value, cursor, function (advancer) { return c = advancer; });
                    c();
                });
            }
        });
    }

    var PropModification =  (function () {
        function PropModification(spec) {
            this["@@propmod"] = spec;
        }
        PropModification.prototype.execute = function (value) {
            var _a;
            var spec = this["@@propmod"];
            if (spec.add !== undefined) {
                var term = spec.add;
                if (isArray(term)) {
                    return __spreadArray(__spreadArray([], (isArray(value) ? value : []), true), term, true).sort();
                }
                if (typeof term === 'number')
                    return (Number(value) || 0) + term;
                if (typeof term === 'bigint') {
                    try {
                        return BigInt(value) + term;
                    }
                    catch (_b) {
                        return BigInt(0) + term;
                    }
                }
                throw new TypeError("Invalid term ".concat(term));
            }
            if (spec.remove !== undefined) {
                var subtrahend_1 = spec.remove;
                if (isArray(subtrahend_1)) {
                    return isArray(value) ? value.filter(function (item) { return !subtrahend_1.includes(item); }).sort() : [];
                }
                if (typeof subtrahend_1 === 'number')
                    return Number(value) - subtrahend_1;
                if (typeof subtrahend_1 === 'bigint') {
                    try {
                        return BigInt(value) - subtrahend_1;
                    }
                    catch (_c) {
                        return BigInt(0) - subtrahend_1;
                    }
                }
                throw new TypeError("Invalid subtrahend ".concat(subtrahend_1));
            }
            var prefixToReplace = (_a = spec.replacePrefix) === null || _a === void 0 ? void 0 : _a[0];
            if (prefixToReplace && typeof value === 'string' && value.startsWith(prefixToReplace)) {
                return spec.replacePrefix[1] + value.substring(prefixToReplace.length);
            }
            return value;
        };
        return PropModification;
    }());

    var Collection =  (function () {
        function Collection() {
        }
        Collection.prototype._read = function (fn, cb) {
            var ctx = this._ctx;
            return ctx.error ?
                ctx.table._trans(null, rejection.bind(null, ctx.error)) :
                ctx.table._trans('readonly', fn).then(cb);
        };
        Collection.prototype._write = function (fn) {
            var ctx = this._ctx;
            return ctx.error ?
                ctx.table._trans(null, rejection.bind(null, ctx.error)) :
                ctx.table._trans('readwrite', fn, "locked");
        };
        Collection.prototype._addAlgorithm = function (fn) {
            var ctx = this._ctx;
            ctx.algorithm = combine(ctx.algorithm, fn);
        };
        Collection.prototype._iterate = function (fn, coreTrans) {
            return iter(this._ctx, fn, coreTrans, this._ctx.table.core);
        };
        Collection.prototype.clone = function (props) {
            var rv = Object.create(this.constructor.prototype), ctx = Object.create(this._ctx);
            if (props)
                extend(ctx, props);
            rv._ctx = ctx;
            return rv;
        };
        Collection.prototype.raw = function () {
            this._ctx.valueMapper = null;
            return this;
        };
        Collection.prototype.each = function (fn) {
            var ctx = this._ctx;
            return this._read(function (trans) { return iter(ctx, fn, trans, ctx.table.core); });
        };
        Collection.prototype.count = function (cb) {
            var _this = this;
            return this._read(function (trans) {
                var ctx = _this._ctx;
                var coreTable = ctx.table.core;
                if (isPlainKeyRange(ctx, true)) {
                    return coreTable.count({
                        trans: trans,
                        query: {
                            index: getIndexOrStore(ctx, coreTable.schema),
                            range: ctx.range
                        }
                    }).then(function (count) { return Math.min(count, ctx.limit); });
                }
                else {
                    var count = 0;
                    return iter(ctx, function () { ++count; return false; }, trans, coreTable)
                        .then(function () { return count; });
                }
            }).then(cb);
        };
        Collection.prototype.sortBy = function (keyPath, cb) {
            var parts = keyPath.split('.').reverse(), lastPart = parts[0], lastIndex = parts.length - 1;
            function getval(obj, i) {
                if (i)
                    return getval(obj[parts[i]], i - 1);
                return obj[lastPart];
            }
            var order = this._ctx.dir === "next" ? 1 : -1;
            function sorter(a, b) {
                var aVal = getval(a, lastIndex), bVal = getval(b, lastIndex);
                return cmp(aVal, bVal) * order;
            }
            return this.toArray(function (a) {
                return a.sort(sorter);
            }).then(cb);
        };
        Collection.prototype.toArray = function (cb) {
            var _this = this;
            return this._read(function (trans) {
                var ctx = _this._ctx;
                if (ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
                    var valueMapper_1 = ctx.valueMapper;
                    var index = getIndexOrStore(ctx, ctx.table.core.schema);
                    return ctx.table.core.query({
                        trans: trans,
                        limit: ctx.limit,
                        values: true,
                        query: {
                            index: index,
                            range: ctx.range
                        }
                    }).then(function (_a) {
                        var result = _a.result;
                        return valueMapper_1 ? result.map(valueMapper_1) : result;
                    });
                }
                else {
                    var a_1 = [];
                    return iter(ctx, function (item) { return a_1.push(item); }, trans, ctx.table.core).then(function () { return a_1; });
                }
            }, cb);
        };
        Collection.prototype.offset = function (offset) {
            var ctx = this._ctx;
            if (offset <= 0)
                return this;
            ctx.offset += offset;
            if (isPlainKeyRange(ctx)) {
                addReplayFilter(ctx, function () {
                    var offsetLeft = offset;
                    return function (cursor, advance) {
                        if (offsetLeft === 0)
                            return true;
                        if (offsetLeft === 1) {
                            --offsetLeft;
                            return false;
                        }
                        advance(function () {
                            cursor.advance(offsetLeft);
                            offsetLeft = 0;
                        });
                        return false;
                    };
                });
            }
            else {
                addReplayFilter(ctx, function () {
                    var offsetLeft = offset;
                    return function () { return (--offsetLeft < 0); };
                });
            }
            return this;
        };
        Collection.prototype.limit = function (numRows) {
            this._ctx.limit = Math.min(this._ctx.limit, numRows);
            addReplayFilter(this._ctx, function () {
                var rowsLeft = numRows;
                return function (cursor, advance, resolve) {
                    if (--rowsLeft <= 0)
                        advance(resolve);
                    return rowsLeft >= 0;
                };
            }, true);
            return this;
        };
        Collection.prototype.until = function (filterFunction, bIncludeStopEntry) {
            addFilter(this._ctx, function (cursor, advance, resolve) {
                if (filterFunction(cursor.value)) {
                    advance(resolve);
                    return bIncludeStopEntry;
                }
                else {
                    return true;
                }
            });
            return this;
        };
        Collection.prototype.first = function (cb) {
            return this.limit(1).toArray(function (a) { return a[0]; }).then(cb);
        };
        Collection.prototype.last = function (cb) {
            return this.reverse().first(cb);
        };
        Collection.prototype.filter = function (filterFunction) {
            addFilter(this._ctx, function (cursor) {
                return filterFunction(cursor.value);
            });
            addMatchFilter(this._ctx, filterFunction);
            return this;
        };
        Collection.prototype.and = function (filter) {
            return this.filter(filter);
        };
        Collection.prototype.or = function (indexName) {
            return new this.db.WhereClause(this._ctx.table, indexName, this);
        };
        Collection.prototype.reverse = function () {
            this._ctx.dir = (this._ctx.dir === "prev" ? "next" : "prev");
            if (this._ondirectionchange)
                this._ondirectionchange(this._ctx.dir);
            return this;
        };
        Collection.prototype.desc = function () {
            return this.reverse();
        };
        Collection.prototype.eachKey = function (cb) {
            var ctx = this._ctx;
            ctx.keysOnly = !ctx.isMatch;
            return this.each(function (val, cursor) { cb(cursor.key, cursor); });
        };
        Collection.prototype.eachUniqueKey = function (cb) {
            this._ctx.unique = "unique";
            return this.eachKey(cb);
        };
        Collection.prototype.eachPrimaryKey = function (cb) {
            var ctx = this._ctx;
            ctx.keysOnly = !ctx.isMatch;
            return this.each(function (val, cursor) { cb(cursor.primaryKey, cursor); });
        };
        Collection.prototype.keys = function (cb) {
            var ctx = this._ctx;
            ctx.keysOnly = !ctx.isMatch;
            var a = [];
            return this.each(function (item, cursor) {
                a.push(cursor.key);
            }).then(function () {
                return a;
            }).then(cb);
        };
        Collection.prototype.primaryKeys = function (cb) {
            var ctx = this._ctx;
            if (ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
                return this._read(function (trans) {
                    var index = getIndexOrStore(ctx, ctx.table.core.schema);
                    return ctx.table.core.query({
                        trans: trans,
                        values: false,
                        limit: ctx.limit,
                        query: {
                            index: index,
                            range: ctx.range
                        }
                    });
                }).then(function (_a) {
                    var result = _a.result;
                    return result;
                }).then(cb);
            }
            ctx.keysOnly = !ctx.isMatch;
            var a = [];
            return this.each(function (item, cursor) {
                a.push(cursor.primaryKey);
            }).then(function () {
                return a;
            }).then(cb);
        };
        Collection.prototype.uniqueKeys = function (cb) {
            this._ctx.unique = "unique";
            return this.keys(cb);
        };
        Collection.prototype.firstKey = function (cb) {
            return this.limit(1).keys(function (a) { return a[0]; }).then(cb);
        };
        Collection.prototype.lastKey = function (cb) {
            return this.reverse().firstKey(cb);
        };
        Collection.prototype.distinct = function () {
            var ctx = this._ctx, idx = ctx.index && ctx.table.schema.idxByName[ctx.index];
            if (!idx || !idx.multi)
                return this;
            var set = {};
            addFilter(this._ctx, function (cursor) {
                var strKey = cursor.primaryKey.toString();
                var found = hasOwn(set, strKey);
                set[strKey] = true;
                return !found;
            });
            return this;
        };
        Collection.prototype.modify = function (changes) {
            var _this = this;
            var ctx = this._ctx;
            return this._write(function (trans) {
                var modifyer;
                if (typeof changes === 'function') {
                    modifyer = changes;
                }
                else {
                    var keyPaths = keys(changes);
                    var numKeys = keyPaths.length;
                    modifyer = function (item) {
                        var anythingModified = false;
                        for (var i = 0; i < numKeys; ++i) {
                            var keyPath = keyPaths[i];
                            var val = changes[keyPath];
                            var origVal = getByKeyPath(item, keyPath);
                            if (val instanceof PropModification) {
                                setByKeyPath(item, keyPath, val.execute(origVal));
                                anythingModified = true;
                            }
                            else if (origVal !== val) {
                                setByKeyPath(item, keyPath, val);
                                anythingModified = true;
                            }
                        }
                        return anythingModified;
                    };
                }
                var coreTable = ctx.table.core;
                var _a = coreTable.schema.primaryKey, outbound = _a.outbound, extractKey = _a.extractKey;
                var limit = 200;
                var modifyChunkSize = _this.db._options.modifyChunkSize;
                if (modifyChunkSize) {
                    if (typeof modifyChunkSize == 'object') {
                        limit = modifyChunkSize[coreTable.name] || modifyChunkSize['*'] || 200;
                    }
                    else {
                        limit = modifyChunkSize;
                    }
                }
                var totalFailures = [];
                var successCount = 0;
                var failedKeys = [];
                var applyMutateResult = function (expectedCount, res) {
                    var failures = res.failures, numFailures = res.numFailures;
                    successCount += expectedCount - numFailures;
                    for (var _i = 0, _a = keys(failures); _i < _a.length; _i++) {
                        var pos = _a[_i];
                        totalFailures.push(failures[pos]);
                    }
                };
                return _this.clone().primaryKeys().then(function (keys) {
                    var criteria = isPlainKeyRange(ctx) &&
                        ctx.limit === Infinity &&
                        (typeof changes !== 'function' || changes === deleteCallback) && {
                        index: ctx.index,
                        range: ctx.range
                    };
                    var nextChunk = function (offset) {
                        var count = Math.min(limit, keys.length - offset);
                        return coreTable.getMany({
                            trans: trans,
                            keys: keys.slice(offset, offset + count),
                            cache: "immutable"
                        }).then(function (values) {
                            var addValues = [];
                            var putValues = [];
                            var putKeys = outbound ? [] : null;
                            var deleteKeys = [];
                            for (var i = 0; i < count; ++i) {
                                var origValue = values[i];
                                var ctx_1 = {
                                    value: deepClone(origValue),
                                    primKey: keys[offset + i]
                                };
                                if (modifyer.call(ctx_1, ctx_1.value, ctx_1) !== false) {
                                    if (ctx_1.value == null) {
                                        deleteKeys.push(keys[offset + i]);
                                    }
                                    else if (!outbound && cmp(extractKey(origValue), extractKey(ctx_1.value)) !== 0) {
                                        deleteKeys.push(keys[offset + i]);
                                        addValues.push(ctx_1.value);
                                    }
                                    else {
                                        putValues.push(ctx_1.value);
                                        if (outbound)
                                            putKeys.push(keys[offset + i]);
                                    }
                                }
                            }
                            return Promise.resolve(addValues.length > 0 &&
                                coreTable.mutate({ trans: trans, type: 'add', values: addValues })
                                    .then(function (res) {
                                    for (var pos in res.failures) {
                                        deleteKeys.splice(parseInt(pos), 1);
                                    }
                                    applyMutateResult(addValues.length, res);
                                })).then(function () { return (putValues.length > 0 || (criteria && typeof changes === 'object')) &&
                                coreTable.mutate({
                                    trans: trans,
                                    type: 'put',
                                    keys: putKeys,
                                    values: putValues,
                                    criteria: criteria,
                                    changeSpec: typeof changes !== 'function'
                                        && changes,
                                    isAdditionalChunk: offset > 0
                                }).then(function (res) { return applyMutateResult(putValues.length, res); }); }).then(function () { return (deleteKeys.length > 0 || (criteria && changes === deleteCallback)) &&
                                coreTable.mutate({
                                    trans: trans,
                                    type: 'delete',
                                    keys: deleteKeys,
                                    criteria: criteria,
                                    isAdditionalChunk: offset > 0
                                }).then(function (res) { return applyMutateResult(deleteKeys.length, res); }); }).then(function () {
                                return keys.length > offset + count && nextChunk(offset + limit);
                            });
                        });
                    };
                    return nextChunk(0).then(function () {
                        if (totalFailures.length > 0)
                            throw new ModifyError("Error modifying one or more objects", totalFailures, successCount, failedKeys);
                        return keys.length;
                    });
                });
            });
        };
        Collection.prototype.delete = function () {
            var ctx = this._ctx, range = ctx.range;
            if (isPlainKeyRange(ctx) &&
                (ctx.isPrimKey || range.type === 3 ))
             {
                return this._write(function (trans) {
                    var primaryKey = ctx.table.core.schema.primaryKey;
                    var coreRange = range;
                    return ctx.table.core.count({ trans: trans, query: { index: primaryKey, range: coreRange } }).then(function (count) {
                        return ctx.table.core.mutate({ trans: trans, type: 'deleteRange', range: coreRange })
                            .then(function (_a) {
                            var failures = _a.failures; _a.lastResult; _a.results; var numFailures = _a.numFailures;
                            if (numFailures)
                                throw new ModifyError("Could not delete some values", Object.keys(failures).map(function (pos) { return failures[pos]; }), count - numFailures);
                            return count - numFailures;
                        });
                    });
                });
            }
            return this.modify(deleteCallback);
        };
        return Collection;
    }());
    var deleteCallback = function (value, ctx) { return ctx.value = null; };

    function createCollectionConstructor(db) {
        return makeClassConstructor(Collection.prototype, function Collection(whereClause, keyRangeGenerator) {
            this.db = db;
            var keyRange = AnyRange, error = null;
            if (keyRangeGenerator)
                try {
                    keyRange = keyRangeGenerator();
                }
                catch (ex) {
                    error = ex;
                }
            var whereCtx = whereClause._ctx;
            var table = whereCtx.table;
            var readingHook = table.hook.reading.fire;
            this._ctx = {
                table: table,
                index: whereCtx.index,
                isPrimKey: (!whereCtx.index || (table.schema.primKey.keyPath && whereCtx.index === table.schema.primKey.name)),
                range: keyRange,
                keysOnly: false,
                dir: "next",
                unique: "",
                algorithm: null,
                filter: null,
                replayFilter: null,
                justLimit: true,
                isMatch: null,
                offset: 0,
                limit: Infinity,
                error: error,
                or: whereCtx.or,
                valueMapper: readingHook !== mirror ? readingHook : null
            };
        });
    }

    function simpleCompare(a, b) {
        return a < b ? -1 : a === b ? 0 : 1;
    }
    function simpleCompareReverse(a, b) {
        return a > b ? -1 : a === b ? 0 : 1;
    }

    function fail(collectionOrWhereClause, err, T) {
        var collection = collectionOrWhereClause instanceof WhereClause ?
            new collectionOrWhereClause.Collection(collectionOrWhereClause) :
            collectionOrWhereClause;
        collection._ctx.error = T ? new T(err) : new TypeError(err);
        return collection;
    }
    function emptyCollection(whereClause) {
        return new whereClause.Collection(whereClause, function () { return rangeEqual(""); }).limit(0);
    }
    function upperFactory(dir) {
        return dir === "next" ?
            function (s) { return s.toUpperCase(); } :
            function (s) { return s.toLowerCase(); };
    }
    function lowerFactory(dir) {
        return dir === "next" ?
            function (s) { return s.toLowerCase(); } :
            function (s) { return s.toUpperCase(); };
    }
    function nextCasing(key, lowerKey, upperNeedle, lowerNeedle, cmp, dir) {
        var length = Math.min(key.length, lowerNeedle.length);
        var llp = -1;
        for (var i = 0; i < length; ++i) {
            var lwrKeyChar = lowerKey[i];
            if (lwrKeyChar !== lowerNeedle[i]) {
                if (cmp(key[i], upperNeedle[i]) < 0)
                    return key.substr(0, i) + upperNeedle[i] + upperNeedle.substr(i + 1);
                if (cmp(key[i], lowerNeedle[i]) < 0)
                    return key.substr(0, i) + lowerNeedle[i] + upperNeedle.substr(i + 1);
                if (llp >= 0)
                    return key.substr(0, llp) + lowerKey[llp] + upperNeedle.substr(llp + 1);
                return null;
            }
            if (cmp(key[i], lwrKeyChar) < 0)
                llp = i;
        }
        if (length < lowerNeedle.length && dir === "next")
            return key + upperNeedle.substr(key.length);
        if (length < key.length && dir === "prev")
            return key.substr(0, upperNeedle.length);
        return (llp < 0 ? null : key.substr(0, llp) + lowerNeedle[llp] + upperNeedle.substr(llp + 1));
    }
    function addIgnoreCaseAlgorithm(whereClause, match, needles, suffix) {
        var upper, lower, compare, upperNeedles, lowerNeedles, direction, nextKeySuffix, needlesLen = needles.length;
        if (!needles.every(function (s) { return typeof s === 'string'; })) {
            return fail(whereClause, STRING_EXPECTED);
        }
        function initDirection(dir) {
            upper = upperFactory(dir);
            lower = lowerFactory(dir);
            compare = (dir === "next" ? simpleCompare : simpleCompareReverse);
            var needleBounds = needles.map(function (needle) {
                return { lower: lower(needle), upper: upper(needle) };
            }).sort(function (a, b) {
                return compare(a.lower, b.lower);
            });
            upperNeedles = needleBounds.map(function (nb) { return nb.upper; });
            lowerNeedles = needleBounds.map(function (nb) { return nb.lower; });
            direction = dir;
            nextKeySuffix = (dir === "next" ? "" : suffix);
        }
        initDirection("next");
        var c = new whereClause.Collection(whereClause, function () { return createRange(upperNeedles[0], lowerNeedles[needlesLen - 1] + suffix); });
        c._ondirectionchange = function (direction) {
            initDirection(direction);
        };
        var firstPossibleNeedle = 0;
        c._addAlgorithm(function (cursor, advance, resolve) {
            var key = cursor.key;
            if (typeof key !== 'string')
                return false;
            var lowerKey = lower(key);
            if (match(lowerKey, lowerNeedles, firstPossibleNeedle)) {
                return true;
            }
            else {
                var lowestPossibleCasing = null;
                for (var i = firstPossibleNeedle; i < needlesLen; ++i) {
                    var casing = nextCasing(key, lowerKey, upperNeedles[i], lowerNeedles[i], compare, direction);
                    if (casing === null && lowestPossibleCasing === null)
                        firstPossibleNeedle = i + 1;
                    else if (lowestPossibleCasing === null || compare(lowestPossibleCasing, casing) > 0) {
                        lowestPossibleCasing = casing;
                    }
                }
                if (lowestPossibleCasing !== null) {
                    advance(function () { cursor.continue(lowestPossibleCasing + nextKeySuffix); });
                }
                else {
                    advance(resolve);
                }
                return false;
            }
        });
        return c;
    }
    function createRange(lower, upper, lowerOpen, upperOpen) {
        return {
            type: 2 ,
            lower: lower,
            upper: upper,
            lowerOpen: lowerOpen,
            upperOpen: upperOpen
        };
    }
    function rangeEqual(value) {
        return {
            type: 1 ,
            lower: value,
            upper: value
        };
    }

    var WhereClause =  (function () {
        function WhereClause() {
        }
        Object.defineProperty(WhereClause.prototype, "Collection", {
            get: function () {
                return this._ctx.table.db.Collection;
            },
            enumerable: false,
            configurable: true
        });
        WhereClause.prototype.between = function (lower, upper, includeLower, includeUpper) {
            includeLower = includeLower !== false;
            includeUpper = includeUpper === true;
            try {
                if ((this._cmp(lower, upper) > 0) ||
                    (this._cmp(lower, upper) === 0 && (includeLower || includeUpper) && !(includeLower && includeUpper)))
                    return emptyCollection(this);
                return new this.Collection(this, function () { return createRange(lower, upper, !includeLower, !includeUpper); });
            }
            catch (e) {
                return fail(this, INVALID_KEY_ARGUMENT);
            }
        };
        WhereClause.prototype.equals = function (value) {
            if (value == null)
                return fail(this, INVALID_KEY_ARGUMENT);
            return new this.Collection(this, function () { return rangeEqual(value); });
        };
        WhereClause.prototype.above = function (value) {
            if (value == null)
                return fail(this, INVALID_KEY_ARGUMENT);
            return new this.Collection(this, function () { return createRange(value, undefined, true); });
        };
        WhereClause.prototype.aboveOrEqual = function (value) {
            if (value == null)
                return fail(this, INVALID_KEY_ARGUMENT);
            return new this.Collection(this, function () { return createRange(value, undefined, false); });
        };
        WhereClause.prototype.below = function (value) {
            if (value == null)
                return fail(this, INVALID_KEY_ARGUMENT);
            return new this.Collection(this, function () { return createRange(undefined, value, false, true); });
        };
        WhereClause.prototype.belowOrEqual = function (value) {
            if (value == null)
                return fail(this, INVALID_KEY_ARGUMENT);
            return new this.Collection(this, function () { return createRange(undefined, value); });
        };
        WhereClause.prototype.startsWith = function (str) {
            if (typeof str !== 'string')
                return fail(this, STRING_EXPECTED);
            return this.between(str, str + maxString, true, true);
        };
        WhereClause.prototype.startsWithIgnoreCase = function (str) {
            if (str === "")
                return this.startsWith(str);
            return addIgnoreCaseAlgorithm(this, function (x, a) { return x.indexOf(a[0]) === 0; }, [str], maxString);
        };
        WhereClause.prototype.equalsIgnoreCase = function (str) {
            return addIgnoreCaseAlgorithm(this, function (x, a) { return x === a[0]; }, [str], "");
        };
        WhereClause.prototype.anyOfIgnoreCase = function () {
            var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
            if (set.length === 0)
                return emptyCollection(this);
            return addIgnoreCaseAlgorithm(this, function (x, a) { return a.indexOf(x) !== -1; }, set, "");
        };
        WhereClause.prototype.startsWithAnyOfIgnoreCase = function () {
            var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
            if (set.length === 0)
                return emptyCollection(this);
            return addIgnoreCaseAlgorithm(this, function (x, a) { return a.some(function (n) { return x.indexOf(n) === 0; }); }, set, maxString);
        };
        WhereClause.prototype.anyOf = function () {
            var _this = this;
            var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
            var compare = this._cmp;
            try {
                set.sort(compare);
            }
            catch (e) {
                return fail(this, INVALID_KEY_ARGUMENT);
            }
            if (set.length === 0)
                return emptyCollection(this);
            var c = new this.Collection(this, function () { return createRange(set[0], set[set.length - 1]); });
            c._ondirectionchange = function (direction) {
                compare = (direction === "next" ?
                    _this._ascending :
                    _this._descending);
                set.sort(compare);
            };
            var i = 0;
            c._addAlgorithm(function (cursor, advance, resolve) {
                var key = cursor.key;
                while (compare(key, set[i]) > 0) {
                    ++i;
                    if (i === set.length) {
                        advance(resolve);
                        return false;
                    }
                }
                if (compare(key, set[i]) === 0) {
                    return true;
                }
                else {
                    advance(function () { cursor.continue(set[i]); });
                    return false;
                }
            });
            return c;
        };
        WhereClause.prototype.notEqual = function (value) {
            return this.inAnyRange([[minKey, value], [value, this.db._maxKey]], { includeLowers: false, includeUppers: false });
        };
        WhereClause.prototype.noneOf = function () {
            var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
            if (set.length === 0)
                return new this.Collection(this);
            try {
                set.sort(this._ascending);
            }
            catch (e) {
                return fail(this, INVALID_KEY_ARGUMENT);
            }
            var ranges = set.reduce(function (res, val) { return res ?
                res.concat([[res[res.length - 1][1], val]]) :
                [[minKey, val]]; }, null);
            ranges.push([set[set.length - 1], this.db._maxKey]);
            return this.inAnyRange(ranges, { includeLowers: false, includeUppers: false });
        };
        WhereClause.prototype.inAnyRange = function (ranges, options) {
            var _this = this;
            var cmp = this._cmp, ascending = this._ascending, descending = this._descending, min = this._min, max = this._max;
            if (ranges.length === 0)
                return emptyCollection(this);
            if (!ranges.every(function (range) {
                return range[0] !== undefined &&
                    range[1] !== undefined &&
                    ascending(range[0], range[1]) <= 0;
            })) {
                return fail(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", exceptions.InvalidArgument);
            }
            var includeLowers = !options || options.includeLowers !== false;
            var includeUppers = options && options.includeUppers === true;
            function addRange(ranges, newRange) {
                var i = 0, l = ranges.length;
                for (; i < l; ++i) {
                    var range = ranges[i];
                    if (cmp(newRange[0], range[1]) < 0 && cmp(newRange[1], range[0]) > 0) {
                        range[0] = min(range[0], newRange[0]);
                        range[1] = max(range[1], newRange[1]);
                        break;
                    }
                }
                if (i === l)
                    ranges.push(newRange);
                return ranges;
            }
            var sortDirection = ascending;
            function rangeSorter(a, b) { return sortDirection(a[0], b[0]); }
            var set;
            try {
                set = ranges.reduce(addRange, []);
                set.sort(rangeSorter);
            }
            catch (ex) {
                return fail(this, INVALID_KEY_ARGUMENT);
            }
            var rangePos = 0;
            var keyIsBeyondCurrentEntry = includeUppers ?
                function (key) { return ascending(key, set[rangePos][1]) > 0; } :
                function (key) { return ascending(key, set[rangePos][1]) >= 0; };
            var keyIsBeforeCurrentEntry = includeLowers ?
                function (key) { return descending(key, set[rangePos][0]) > 0; } :
                function (key) { return descending(key, set[rangePos][0]) >= 0; };
            function keyWithinCurrentRange(key) {
                return !keyIsBeyondCurrentEntry(key) && !keyIsBeforeCurrentEntry(key);
            }
            var checkKey = keyIsBeyondCurrentEntry;
            var c = new this.Collection(this, function () { return createRange(set[0][0], set[set.length - 1][1], !includeLowers, !includeUppers); });
            c._ondirectionchange = function (direction) {
                if (direction === "next") {
                    checkKey = keyIsBeyondCurrentEntry;
                    sortDirection = ascending;
                }
                else {
                    checkKey = keyIsBeforeCurrentEntry;
                    sortDirection = descending;
                }
                set.sort(rangeSorter);
            };
            c._addAlgorithm(function (cursor, advance, resolve) {
                var key = cursor.key;
                while (checkKey(key)) {
                    ++rangePos;
                    if (rangePos === set.length) {
                        advance(resolve);
                        return false;
                    }
                }
                if (keyWithinCurrentRange(key)) {
                    return true;
                }
                else if (_this._cmp(key, set[rangePos][1]) === 0 || _this._cmp(key, set[rangePos][0]) === 0) {
                    return false;
                }
                else {
                    advance(function () {
                        if (sortDirection === ascending)
                            cursor.continue(set[rangePos][0]);
                        else
                            cursor.continue(set[rangePos][1]);
                    });
                    return false;
                }
            });
            return c;
        };
        WhereClause.prototype.startsWithAnyOf = function () {
            var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
            if (!set.every(function (s) { return typeof s === 'string'; })) {
                return fail(this, "startsWithAnyOf() only works with strings");
            }
            if (set.length === 0)
                return emptyCollection(this);
            return this.inAnyRange(set.map(function (str) { return [str, str + maxString]; }));
        };
        return WhereClause;
    }());

    function createWhereClauseConstructor(db) {
        return makeClassConstructor(WhereClause.prototype, function WhereClause(table, index, orCollection) {
            this.db = db;
            this._ctx = {
                table: table,
                index: index === ":id" ? null : index,
                or: orCollection
            };
            this._cmp = this._ascending = cmp;
            this._descending = function (a, b) { return cmp(b, a); };
            this._max = function (a, b) { return cmp(a, b) > 0 ? a : b; };
            this._min = function (a, b) { return cmp(a, b) < 0 ? a : b; };
            this._IDBKeyRange = db._deps.IDBKeyRange;
            if (!this._IDBKeyRange)
                throw new exceptions.MissingAPI();
        });
    }

    function eventRejectHandler(reject) {
        return wrap(function (event) {
            preventDefault(event);
            reject(event.target.error);
            return false;
        });
    }
    function preventDefault(event) {
        if (event.stopPropagation)
            event.stopPropagation();
        if (event.preventDefault)
            event.preventDefault();
    }

    var DEXIE_STORAGE_MUTATED_EVENT_NAME = 'storagemutated';
    var STORAGE_MUTATED_DOM_EVENT_NAME = 'x-storagemutated-1';
    var globalEvents = Events(null, DEXIE_STORAGE_MUTATED_EVENT_NAME);

    var Transaction =  (function () {
        function Transaction() {
        }
        Transaction.prototype._lock = function () {
            assert(!PSD.global);
            ++this._reculock;
            if (this._reculock === 1 && !PSD.global)
                PSD.lockOwnerFor = this;
            return this;
        };
        Transaction.prototype._unlock = function () {
            assert(!PSD.global);
            if (--this._reculock === 0) {
                if (!PSD.global)
                    PSD.lockOwnerFor = null;
                while (this._blockedFuncs.length > 0 && !this._locked()) {
                    var fnAndPSD = this._blockedFuncs.shift();
                    try {
                        usePSD(fnAndPSD[1], fnAndPSD[0]);
                    }
                    catch (e) { }
                }
            }
            return this;
        };
        Transaction.prototype._locked = function () {
            return this._reculock && PSD.lockOwnerFor !== this;
        };
        Transaction.prototype.create = function (idbtrans) {
            var _this = this;
            if (!this.mode)
                return this;
            var idbdb = this.db.idbdb;
            var dbOpenError = this.db._state.dbOpenError;
            assert(!this.idbtrans);
            if (!idbtrans && !idbdb) {
                switch (dbOpenError && dbOpenError.name) {
                    case "DatabaseClosedError":
                        throw new exceptions.DatabaseClosed(dbOpenError);
                    case "MissingAPIError":
                        throw new exceptions.MissingAPI(dbOpenError.message, dbOpenError);
                    default:
                        throw new exceptions.OpenFailed(dbOpenError);
                }
            }
            if (!this.active)
                throw new exceptions.TransactionInactive();
            assert(this._completion._state === null);
            idbtrans = this.idbtrans = idbtrans ||
                (this.db.core
                    ? this.db.core.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability })
                    : idbdb.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability }));
            idbtrans.onerror = wrap(function (ev) {
                preventDefault(ev);
                _this._reject(idbtrans.error);
            });
            idbtrans.onabort = wrap(function (ev) {
                preventDefault(ev);
                _this.active && _this._reject(new exceptions.Abort(idbtrans.error));
                _this.active = false;
                _this.on("abort").fire(ev);
            });
            idbtrans.oncomplete = wrap(function () {
                _this.active = false;
                _this._resolve();
                if ('mutatedParts' in idbtrans) {
                    globalEvents.storagemutated.fire(idbtrans["mutatedParts"]);
                }
            });
            return this;
        };
        Transaction.prototype._promise = function (mode, fn, bWriteLock) {
            var _this = this;
            if (mode === 'readwrite' && this.mode !== 'readwrite')
                return rejection(new exceptions.ReadOnly("Transaction is readonly"));
            if (!this.active)
                return rejection(new exceptions.TransactionInactive());
            if (this._locked()) {
                return new DexiePromise(function (resolve, reject) {
                    _this._blockedFuncs.push([function () {
                            _this._promise(mode, fn, bWriteLock).then(resolve, reject);
                        }, PSD]);
                });
            }
            else if (bWriteLock) {
                return newScope(function () {
                    var p = new DexiePromise(function (resolve, reject) {
                        _this._lock();
                        var rv = fn(resolve, reject, _this);
                        if (rv && rv.then)
                            rv.then(resolve, reject);
                    });
                    p.finally(function () { return _this._unlock(); });
                    p._lib = true;
                    return p;
                });
            }
            else {
                var p = new DexiePromise(function (resolve, reject) {
                    var rv = fn(resolve, reject, _this);
                    if (rv && rv.then)
                        rv.then(resolve, reject);
                });
                p._lib = true;
                return p;
            }
        };
        Transaction.prototype._root = function () {
            return this.parent ? this.parent._root() : this;
        };
        Transaction.prototype.waitFor = function (promiseLike) {
            var root = this._root();
            var promise = DexiePromise.resolve(promiseLike);
            if (root._waitingFor) {
                root._waitingFor = root._waitingFor.then(function () { return promise; });
            }
            else {
                root._waitingFor = promise;
                root._waitingQueue = [];
                var store = root.idbtrans.objectStore(root.storeNames[0]);
                (function spin() {
                    ++root._spinCount;
                    while (root._waitingQueue.length)
                        (root._waitingQueue.shift())();
                    if (root._waitingFor)
                        store.get(-Infinity).onsuccess = spin;
                }());
            }
            var currentWaitPromise = root._waitingFor;
            return new DexiePromise(function (resolve, reject) {
                promise.then(function (res) { return root._waitingQueue.push(wrap(resolve.bind(null, res))); }, function (err) { return root._waitingQueue.push(wrap(reject.bind(null, err))); }).finally(function () {
                    if (root._waitingFor === currentWaitPromise) {
                        root._waitingFor = null;
                    }
                });
            });
        };
        Transaction.prototype.abort = function () {
            if (this.active) {
                this.active = false;
                if (this.idbtrans)
                    this.idbtrans.abort();
                this._reject(new exceptions.Abort());
            }
        };
        Transaction.prototype.table = function (tableName) {
            var memoizedTables = (this._memoizedTables || (this._memoizedTables = {}));
            if (hasOwn(memoizedTables, tableName))
                return memoizedTables[tableName];
            var tableSchema = this.schema[tableName];
            if (!tableSchema) {
                throw new exceptions.NotFound("Table " + tableName + " not part of transaction");
            }
            var transactionBoundTable = new this.db.Table(tableName, tableSchema, this);
            transactionBoundTable.core = this.db.core.table(tableName);
            memoizedTables[tableName] = transactionBoundTable;
            return transactionBoundTable;
        };
        return Transaction;
    }());

    function createTransactionConstructor(db) {
        return makeClassConstructor(Transaction.prototype, function Transaction(mode, storeNames, dbschema, chromeTransactionDurability, parent) {
            var _this = this;
            this.db = db;
            this.mode = mode;
            this.storeNames = storeNames;
            this.schema = dbschema;
            this.chromeTransactionDurability = chromeTransactionDurability;
            this.idbtrans = null;
            this.on = Events(this, "complete", "error", "abort");
            this.parent = parent || null;
            this.active = true;
            this._reculock = 0;
            this._blockedFuncs = [];
            this._resolve = null;
            this._reject = null;
            this._waitingFor = null;
            this._waitingQueue = null;
            this._spinCount = 0;
            this._completion = new DexiePromise(function (resolve, reject) {
                _this._resolve = resolve;
                _this._reject = reject;
            });
            this._completion.then(function () {
                _this.active = false;
                _this.on.complete.fire();
            }, function (e) {
                var wasActive = _this.active;
                _this.active = false;
                _this.on.error.fire(e);
                _this.parent ?
                    _this.parent._reject(e) :
                    wasActive && _this.idbtrans && _this.idbtrans.abort();
                return rejection(e);
            });
        });
    }

    function createIndexSpec(name, keyPath, unique, multi, auto, compound, isPrimKey) {
        return {
            name: name,
            keyPath: keyPath,
            unique: unique,
            multi: multi,
            auto: auto,
            compound: compound,
            src: (unique && !isPrimKey ? '&' : '') + (multi ? '*' : '') + (auto ? "++" : "") + nameFromKeyPath(keyPath)
        };
    }
    function nameFromKeyPath(keyPath) {
        return typeof keyPath === 'string' ?
            keyPath :
            keyPath ? ('[' + [].join.call(keyPath, '+') + ']') : "";
    }

    function createTableSchema(name, primKey, indexes) {
        return {
            name: name,
            primKey: primKey,
            indexes: indexes,
            mappedClass: null,
            idxByName: arrayToObject(indexes, function (index) { return [index.name, index]; })
        };
    }

    function safariMultiStoreFix(storeNames) {
        return storeNames.length === 1 ? storeNames[0] : storeNames;
    }
    var getMaxKey = function (IdbKeyRange) {
        try {
            IdbKeyRange.only([[]]);
            getMaxKey = function () { return [[]]; };
            return [[]];
        }
        catch (e) {
            getMaxKey = function () { return maxString; };
            return maxString;
        }
    };

    function getKeyExtractor(keyPath) {
        if (keyPath == null) {
            return function () { return undefined; };
        }
        else if (typeof keyPath === 'string') {
            return getSinglePathKeyExtractor(keyPath);
        }
        else {
            return function (obj) { return getByKeyPath(obj, keyPath); };
        }
    }
    function getSinglePathKeyExtractor(keyPath) {
        var split = keyPath.split('.');
        if (split.length === 1) {
            return function (obj) { return obj[keyPath]; };
        }
        else {
            return function (obj) { return getByKeyPath(obj, keyPath); };
        }
    }

    function arrayify(arrayLike) {
        return [].slice.call(arrayLike);
    }
    var _id_counter = 0;
    function getKeyPathAlias(keyPath) {
        return keyPath == null ?
            ":id" :
            typeof keyPath === 'string' ?
                keyPath :
                "[".concat(keyPath.join('+'), "]");
    }
    function createDBCore(db, IdbKeyRange, tmpTrans) {
        function extractSchema(db, trans) {
            var tables = arrayify(db.objectStoreNames);
            return {
                schema: {
                    name: db.name,
                    tables: tables.map(function (table) { return trans.objectStore(table); }).map(function (store) {
                        var keyPath = store.keyPath, autoIncrement = store.autoIncrement;
                        var compound = isArray(keyPath);
                        var outbound = keyPath == null;
                        var indexByKeyPath = {};
                        var result = {
                            name: store.name,
                            primaryKey: {
                                name: null,
                                isPrimaryKey: true,
                                outbound: outbound,
                                compound: compound,
                                keyPath: keyPath,
                                autoIncrement: autoIncrement,
                                unique: true,
                                extractKey: getKeyExtractor(keyPath)
                            },
                            indexes: arrayify(store.indexNames).map(function (indexName) { return store.index(indexName); })
                                .map(function (index) {
                                var name = index.name, unique = index.unique, multiEntry = index.multiEntry, keyPath = index.keyPath;
                                var compound = isArray(keyPath);
                                var result = {
                                    name: name,
                                    compound: compound,
                                    keyPath: keyPath,
                                    unique: unique,
                                    multiEntry: multiEntry,
                                    extractKey: getKeyExtractor(keyPath)
                                };
                                indexByKeyPath[getKeyPathAlias(keyPath)] = result;
                                return result;
                            }),
                            getIndexByKeyPath: function (keyPath) { return indexByKeyPath[getKeyPathAlias(keyPath)]; }
                        };
                        indexByKeyPath[":id"] = result.primaryKey;
                        if (keyPath != null) {
                            indexByKeyPath[getKeyPathAlias(keyPath)] = result.primaryKey;
                        }
                        return result;
                    })
                },
                hasGetAll: tables.length > 0 && ('getAll' in trans.objectStore(tables[0])) &&
                    !(typeof navigator !== 'undefined' && /Safari/.test(navigator.userAgent) &&
                        !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
                        [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604)
            };
        }
        function makeIDBKeyRange(range) {
            if (range.type === 3 )
                return null;
            if (range.type === 4 )
                throw new Error("Cannot convert never type to IDBKeyRange");
            var lower = range.lower, upper = range.upper, lowerOpen = range.lowerOpen, upperOpen = range.upperOpen;
            var idbRange = lower === undefined ?
                upper === undefined ?
                    null :
                    IdbKeyRange.upperBound(upper, !!upperOpen) :
                upper === undefined ?
                    IdbKeyRange.lowerBound(lower, !!lowerOpen) :
                    IdbKeyRange.bound(lower, upper, !!lowerOpen, !!upperOpen);
            return idbRange;
        }
        function createDbCoreTable(tableSchema) {
            var tableName = tableSchema.name;
            function mutate(_a) {
                var trans = _a.trans, type = _a.type, keys = _a.keys, values = _a.values, range = _a.range;
                return new Promise(function (resolve, reject) {
                    resolve = wrap(resolve);
                    var store = trans.objectStore(tableName);
                    var outbound = store.keyPath == null;
                    var isAddOrPut = type === "put" || type === "add";
                    if (!isAddOrPut && type !== 'delete' && type !== 'deleteRange')
                        throw new Error("Invalid operation type: " + type);
                    var length = (keys || values || { length: 1 }).length;
                    if (keys && values && keys.length !== values.length) {
                        throw new Error("Given keys array must have same length as given values array.");
                    }
                    if (length === 0)
                        return resolve({ numFailures: 0, failures: {}, results: [], lastResult: undefined });
                    var req;
                    var reqs = [];
                    var failures = [];
                    var numFailures = 0;
                    var errorHandler = function (event) {
                        ++numFailures;
                        preventDefault(event);
                    };
                    if (type === 'deleteRange') {
                        if (range.type === 4 )
                            return resolve({ numFailures: numFailures, failures: failures, results: [], lastResult: undefined });
                        if (range.type === 3 )
                            reqs.push(req = store.clear());
                        else
                            reqs.push(req = store.delete(makeIDBKeyRange(range)));
                    }
                    else {
                        var _a = isAddOrPut ?
                            outbound ?
                                [values, keys] :
                                [values, null] :
                            [keys, null], args1 = _a[0], args2 = _a[1];
                        if (isAddOrPut) {
                            for (var i = 0; i < length; ++i) {
                                reqs.push(req = (args2 && args2[i] !== undefined ?
                                    store[type](args1[i], args2[i]) :
                                    store[type](args1[i])));
                                req.onerror = errorHandler;
                            }
                        }
                        else {
                            for (var i = 0; i < length; ++i) {
                                reqs.push(req = store[type](args1[i]));
                                req.onerror = errorHandler;
                            }
                        }
                    }
                    var done = function (event) {
                        var lastResult = event.target.result;
                        reqs.forEach(function (req, i) { return req.error != null && (failures[i] = req.error); });
                        resolve({
                            numFailures: numFailures,
                            failures: failures,
                            results: type === "delete" ? keys : reqs.map(function (req) { return req.result; }),
                            lastResult: lastResult
                        });
                    };
                    req.onerror = function (event) {
                        errorHandler(event);
                        done(event);
                    };
                    req.onsuccess = done;
                });
            }
            function openCursor(_a) {
                var trans = _a.trans, values = _a.values, query = _a.query, reverse = _a.reverse, unique = _a.unique;
                return new Promise(function (resolve, reject) {
                    resolve = wrap(resolve);
                    var index = query.index, range = query.range;
                    var store = trans.objectStore(tableName);
                    var source = index.isPrimaryKey ?
                        store :
                        store.index(index.name);
                    var direction = reverse ?
                        unique ?
                            "prevunique" :
                            "prev" :
                        unique ?
                            "nextunique" :
                            "next";
                    var req = values || !('openKeyCursor' in source) ?
                        source.openCursor(makeIDBKeyRange(range), direction) :
                        source.openKeyCursor(makeIDBKeyRange(range), direction);
                    req.onerror = eventRejectHandler(reject);
                    req.onsuccess = wrap(function (ev) {
                        var cursor = req.result;
                        if (!cursor) {
                            resolve(null);
                            return;
                        }
                        cursor.___id = ++_id_counter;
                        cursor.done = false;
                        var _cursorContinue = cursor.continue.bind(cursor);
                        var _cursorContinuePrimaryKey = cursor.continuePrimaryKey;
                        if (_cursorContinuePrimaryKey)
                            _cursorContinuePrimaryKey = _cursorContinuePrimaryKey.bind(cursor);
                        var _cursorAdvance = cursor.advance.bind(cursor);
                        var doThrowCursorIsNotStarted = function () { throw new Error("Cursor not started"); };
                        var doThrowCursorIsStopped = function () { throw new Error("Cursor not stopped"); };
                        cursor.trans = trans;
                        cursor.stop = cursor.continue = cursor.continuePrimaryKey = cursor.advance = doThrowCursorIsNotStarted;
                        cursor.fail = wrap(reject);
                        cursor.next = function () {
                            var _this = this;
                            var gotOne = 1;
                            return this.start(function () { return gotOne-- ? _this.continue() : _this.stop(); }).then(function () { return _this; });
                        };
                        cursor.start = function (callback) {
                            var iterationPromise = new Promise(function (resolveIteration, rejectIteration) {
                                resolveIteration = wrap(resolveIteration);
                                req.onerror = eventRejectHandler(rejectIteration);
                                cursor.fail = rejectIteration;
                                cursor.stop = function (value) {
                                    cursor.stop = cursor.continue = cursor.continuePrimaryKey = cursor.advance = doThrowCursorIsStopped;
                                    resolveIteration(value);
                                };
                            });
                            var guardedCallback = function () {
                                if (req.result) {
                                    try {
                                        callback();
                                    }
                                    catch (err) {
                                        cursor.fail(err);
                                    }
                                }
                                else {
                                    cursor.done = true;
                                    cursor.start = function () { throw new Error("Cursor behind last entry"); };
                                    cursor.stop();
                                }
                            };
                            req.onsuccess = wrap(function (ev) {
                                req.onsuccess = guardedCallback;
                                guardedCallback();
                            });
                            cursor.continue = _cursorContinue;
                            cursor.continuePrimaryKey = _cursorContinuePrimaryKey;
                            cursor.advance = _cursorAdvance;
                            guardedCallback();
                            return iterationPromise;
                        };
                        resolve(cursor);
                    }, reject);
                });
            }
            function query(hasGetAll) {
                return function (request) {
                    return new Promise(function (resolve, reject) {
                        resolve = wrap(resolve);
                        var trans = request.trans, values = request.values, limit = request.limit, query = request.query;
                        var nonInfinitLimit = limit === Infinity ? undefined : limit;
                        var index = query.index, range = query.range;
                        var store = trans.objectStore(tableName);
                        var source = index.isPrimaryKey ? store : store.index(index.name);
                        var idbKeyRange = makeIDBKeyRange(range);
                        if (limit === 0)
                            return resolve({ result: [] });
                        if (hasGetAll) {
                            var req = values ?
                                source.getAll(idbKeyRange, nonInfinitLimit) :
                                source.getAllKeys(idbKeyRange, nonInfinitLimit);
                            req.onsuccess = function (event) { return resolve({ result: event.target.result }); };
                            req.onerror = eventRejectHandler(reject);
                        }
                        else {
                            var count_1 = 0;
                            var req_1 = values || !('openKeyCursor' in source) ?
                                source.openCursor(idbKeyRange) :
                                source.openKeyCursor(idbKeyRange);
                            var result_1 = [];
                            req_1.onsuccess = function (event) {
                                var cursor = req_1.result;
                                if (!cursor)
                                    return resolve({ result: result_1 });
                                result_1.push(values ? cursor.value : cursor.primaryKey);
                                if (++count_1 === limit)
                                    return resolve({ result: result_1 });
                                cursor.continue();
                            };
                            req_1.onerror = eventRejectHandler(reject);
                        }
                    });
                };
            }
            return {
                name: tableName,
                schema: tableSchema,
                mutate: mutate,
                getMany: function (_a) {
                    var trans = _a.trans, keys = _a.keys;
                    return new Promise(function (resolve, reject) {
                        resolve = wrap(resolve);
                        var store = trans.objectStore(tableName);
                        var length = keys.length;
                        var result = new Array(length);
                        var keyCount = 0;
                        var callbackCount = 0;
                        var req;
                        var successHandler = function (event) {
                            var req = event.target;
                            if ((result[req._pos] = req.result) != null)
                                ;
                            if (++callbackCount === keyCount)
                                resolve(result);
                        };
                        var errorHandler = eventRejectHandler(reject);
                        for (var i = 0; i < length; ++i) {
                            var key = keys[i];
                            if (key != null) {
                                req = store.get(keys[i]);
                                req._pos = i;
                                req.onsuccess = successHandler;
                                req.onerror = errorHandler;
                                ++keyCount;
                            }
                        }
                        if (keyCount === 0)
                            resolve(result);
                    });
                },
                get: function (_a) {
                    var trans = _a.trans, key = _a.key;
                    return new Promise(function (resolve, reject) {
                        resolve = wrap(resolve);
                        var store = trans.objectStore(tableName);
                        var req = store.get(key);
                        req.onsuccess = function (event) { return resolve(event.target.result); };
                        req.onerror = eventRejectHandler(reject);
                    });
                },
                query: query(hasGetAll),
                openCursor: openCursor,
                count: function (_a) {
                    var query = _a.query, trans = _a.trans;
                    var index = query.index, range = query.range;
                    return new Promise(function (resolve, reject) {
                        var store = trans.objectStore(tableName);
                        var source = index.isPrimaryKey ? store : store.index(index.name);
                        var idbKeyRange = makeIDBKeyRange(range);
                        var req = idbKeyRange ? source.count(idbKeyRange) : source.count();
                        req.onsuccess = wrap(function (ev) { return resolve(ev.target.result); });
                        req.onerror = eventRejectHandler(reject);
                    });
                }
            };
        }
        var _a = extractSchema(db, tmpTrans), schema = _a.schema, hasGetAll = _a.hasGetAll;
        var tables = schema.tables.map(function (tableSchema) { return createDbCoreTable(tableSchema); });
        var tableMap = {};
        tables.forEach(function (table) { return tableMap[table.name] = table; });
        return {
            stack: "dbcore",
            transaction: db.transaction.bind(db),
            table: function (name) {
                var result = tableMap[name];
                if (!result)
                    throw new Error("Table '".concat(name, "' not found"));
                return tableMap[name];
            },
            MIN_KEY: -Infinity,
            MAX_KEY: getMaxKey(IdbKeyRange),
            schema: schema
        };
    }

    function createMiddlewareStack(stackImpl, middlewares) {
        return middlewares.reduce(function (down, _a) {
            var create = _a.create;
            return (__assign(__assign({}, down), create(down)));
        }, stackImpl);
    }
    function createMiddlewareStacks(middlewares, idbdb, _a, tmpTrans) {
        var IDBKeyRange = _a.IDBKeyRange; _a.indexedDB;
        var dbcore = createMiddlewareStack(createDBCore(idbdb, IDBKeyRange, tmpTrans), middlewares.dbcore);
        return {
            dbcore: dbcore
        };
    }
    function generateMiddlewareStacks(db, tmpTrans) {
        var idbdb = tmpTrans.db;
        var stacks = createMiddlewareStacks(db._middlewares, idbdb, db._deps, tmpTrans);
        db.core = stacks.dbcore;
        db.tables.forEach(function (table) {
            var tableName = table.name;
            if (db.core.schema.tables.some(function (tbl) { return tbl.name === tableName; })) {
                table.core = db.core.table(tableName);
                if (db[tableName] instanceof db.Table) {
                    db[tableName].core = table.core;
                }
            }
        });
    }

    function setApiOnPlace(db, objs, tableNames, dbschema) {
        tableNames.forEach(function (tableName) {
            var schema = dbschema[tableName];
            objs.forEach(function (obj) {
                var propDesc = getPropertyDescriptor(obj, tableName);
                if (!propDesc || ("value" in propDesc && propDesc.value === undefined)) {
                    if (obj === db.Transaction.prototype || obj instanceof db.Transaction) {
                        setProp(obj, tableName, {
                            get: function () { return this.table(tableName); },
                            set: function (value) {
                                defineProperty(this, tableName, { value: value, writable: true, configurable: true, enumerable: true });
                            }
                        });
                    }
                    else {
                        obj[tableName] = new db.Table(tableName, schema);
                    }
                }
            });
        });
    }
    function removeTablesApi(db, objs) {
        objs.forEach(function (obj) {
            for (var key in obj) {
                if (obj[key] instanceof db.Table)
                    delete obj[key];
            }
        });
    }
    function lowerVersionFirst(a, b) {
        return a._cfg.version - b._cfg.version;
    }
    function runUpgraders(db, oldVersion, idbUpgradeTrans, reject) {
        var globalSchema = db._dbSchema;
        if (idbUpgradeTrans.objectStoreNames.contains('$meta') && !globalSchema.$meta) {
            globalSchema.$meta = createTableSchema("$meta", parseIndexSyntax("")[0], []);
            db._storeNames.push('$meta');
        }
        var trans = db._createTransaction('readwrite', db._storeNames, globalSchema);
        trans.create(idbUpgradeTrans);
        trans._completion.catch(reject);
        var rejectTransaction = trans._reject.bind(trans);
        var transless = PSD.transless || PSD;
        newScope(function () {
            PSD.trans = trans;
            PSD.transless = transless;
            if (oldVersion === 0) {
                keys(globalSchema).forEach(function (tableName) {
                    createTable(idbUpgradeTrans, tableName, globalSchema[tableName].primKey, globalSchema[tableName].indexes);
                });
                generateMiddlewareStacks(db, idbUpgradeTrans);
                DexiePromise.follow(function () { return db.on.populate.fire(trans); }).catch(rejectTransaction);
            }
            else {
                generateMiddlewareStacks(db, idbUpgradeTrans);
                return getExistingVersion(db, trans, oldVersion)
                    .then(function (oldVersion) { return updateTablesAndIndexes(db, oldVersion, trans, idbUpgradeTrans); })
                    .catch(rejectTransaction);
            }
        });
    }
    function patchCurrentVersion(db, idbUpgradeTrans) {
        createMissingTables(db._dbSchema, idbUpgradeTrans);
        if (idbUpgradeTrans.db.version % 10 === 0 && !idbUpgradeTrans.objectStoreNames.contains('$meta')) {
            idbUpgradeTrans.db.createObjectStore('$meta').add(Math.ceil((idbUpgradeTrans.db.version / 10) - 1), 'version');
        }
        var globalSchema = buildGlobalSchema(db, db.idbdb, idbUpgradeTrans);
        adjustToExistingIndexNames(db, db._dbSchema, idbUpgradeTrans);
        var diff = getSchemaDiff(globalSchema, db._dbSchema);
        var _loop_1 = function (tableChange) {
            if (tableChange.change.length || tableChange.recreate) {
                console.warn("Unable to patch indexes of table ".concat(tableChange.name, " because it has changes on the type of index or primary key."));
                return { value: void 0 };
            }
            var store = idbUpgradeTrans.objectStore(tableChange.name);
            tableChange.add.forEach(function (idx) {
                if (debug)
                    console.debug("Dexie upgrade patch: Creating missing index ".concat(tableChange.name, ".").concat(idx.src));
                addIndex(store, idx);
            });
        };
        for (var _i = 0, _a = diff.change; _i < _a.length; _i++) {
            var tableChange = _a[_i];
            var state_1 = _loop_1(tableChange);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
    function getExistingVersion(db, trans, oldVersion) {
        if (trans.storeNames.includes('$meta')) {
            return trans.table('$meta').get('version').then(function (metaVersion) {
                return metaVersion != null ? metaVersion : oldVersion;
            });
        }
        else {
            return DexiePromise.resolve(oldVersion);
        }
    }
    function updateTablesAndIndexes(db, oldVersion, trans, idbUpgradeTrans) {
        var queue = [];
        var versions = db._versions;
        var globalSchema = db._dbSchema = buildGlobalSchema(db, db.idbdb, idbUpgradeTrans);
        var versToRun = versions.filter(function (v) { return v._cfg.version >= oldVersion; });
        if (versToRun.length === 0) {
            return DexiePromise.resolve();
        }
        versToRun.forEach(function (version) {
            queue.push(function () {
                var oldSchema = globalSchema;
                var newSchema = version._cfg.dbschema;
                adjustToExistingIndexNames(db, oldSchema, idbUpgradeTrans);
                adjustToExistingIndexNames(db, newSchema, idbUpgradeTrans);
                globalSchema = db._dbSchema = newSchema;
                var diff = getSchemaDiff(oldSchema, newSchema);
                diff.add.forEach(function (tuple) {
                    createTable(idbUpgradeTrans, tuple[0], tuple[1].primKey, tuple[1].indexes);
                });
                diff.change.forEach(function (change) {
                    if (change.recreate) {
                        throw new exceptions.Upgrade("Not yet support for changing primary key");
                    }
                    else {
                        var store_1 = idbUpgradeTrans.objectStore(change.name);
                        change.add.forEach(function (idx) { return addIndex(store_1, idx); });
                        change.change.forEach(function (idx) {
                            store_1.deleteIndex(idx.name);
                            addIndex(store_1, idx);
                        });
                        change.del.forEach(function (idxName) { return store_1.deleteIndex(idxName); });
                    }
                });
                var contentUpgrade = version._cfg.contentUpgrade;
                if (contentUpgrade && version._cfg.version > oldVersion) {
                    generateMiddlewareStacks(db, idbUpgradeTrans);
                    trans._memoizedTables = {};
                    var upgradeSchema_1 = shallowClone(newSchema);
                    diff.del.forEach(function (table) {
                        upgradeSchema_1[table] = oldSchema[table];
                    });
                    removeTablesApi(db, [db.Transaction.prototype]);
                    setApiOnPlace(db, [db.Transaction.prototype], keys(upgradeSchema_1), upgradeSchema_1);
                    trans.schema = upgradeSchema_1;
                    var contentUpgradeIsAsync_1 = isAsyncFunction(contentUpgrade);
                    if (contentUpgradeIsAsync_1) {
                        incrementExpectedAwaits();
                    }
                    var returnValue_1;
                    var promiseFollowed = DexiePromise.follow(function () {
                        returnValue_1 = contentUpgrade(trans);
                        if (returnValue_1) {
                            if (contentUpgradeIsAsync_1) {
                                var decrementor = decrementExpectedAwaits.bind(null, null);
                                returnValue_1.then(decrementor, decrementor);
                            }
                        }
                    });
                    return (returnValue_1 && typeof returnValue_1.then === 'function' ?
                        DexiePromise.resolve(returnValue_1) : promiseFollowed.then(function () { return returnValue_1; }));
                }
            });
            queue.push(function (idbtrans) {
                var newSchema = version._cfg.dbschema;
                deleteRemovedTables(newSchema, idbtrans);
                removeTablesApi(db, [db.Transaction.prototype]);
                setApiOnPlace(db, [db.Transaction.prototype], db._storeNames, db._dbSchema);
                trans.schema = db._dbSchema;
            });
            queue.push(function (idbtrans) {
                if (db.idbdb.objectStoreNames.contains('$meta')) {
                    if (Math.ceil(db.idbdb.version / 10) === version._cfg.version) {
                        db.idbdb.deleteObjectStore('$meta');
                        delete db._dbSchema.$meta;
                        db._storeNames = db._storeNames.filter(function (name) { return name !== '$meta'; });
                    }
                    else {
                        idbtrans.objectStore('$meta').put(version._cfg.version, 'version');
                    }
                }
            });
        });
        function runQueue() {
            return queue.length ? DexiePromise.resolve(queue.shift()(trans.idbtrans)).then(runQueue) :
                DexiePromise.resolve();
        }
        return runQueue().then(function () {
            createMissingTables(globalSchema, idbUpgradeTrans);
        });
    }
    function getSchemaDiff(oldSchema, newSchema) {
        var diff = {
            del: [],
            add: [],
            change: []
        };
        var table;
        for (table in oldSchema) {
            if (!newSchema[table])
                diff.del.push(table);
        }
        for (table in newSchema) {
            var oldDef = oldSchema[table], newDef = newSchema[table];
            if (!oldDef) {
                diff.add.push([table, newDef]);
            }
            else {
                var change = {
                    name: table,
                    def: newDef,
                    recreate: false,
                    del: [],
                    add: [],
                    change: []
                };
                if ((
                '' + (oldDef.primKey.keyPath || '')) !== ('' + (newDef.primKey.keyPath || '')) ||
                    (oldDef.primKey.auto !== newDef.primKey.auto)) {
                    change.recreate = true;
                    diff.change.push(change);
                }
                else {
                    var oldIndexes = oldDef.idxByName;
                    var newIndexes = newDef.idxByName;
                    var idxName = void 0;
                    for (idxName in oldIndexes) {
                        if (!newIndexes[idxName])
                            change.del.push(idxName);
                    }
                    for (idxName in newIndexes) {
                        var oldIdx = oldIndexes[idxName], newIdx = newIndexes[idxName];
                        if (!oldIdx)
                            change.add.push(newIdx);
                        else if (oldIdx.src !== newIdx.src)
                            change.change.push(newIdx);
                    }
                    if (change.del.length > 0 || change.add.length > 0 || change.change.length > 0) {
                        diff.change.push(change);
                    }
                }
            }
        }
        return diff;
    }
    function createTable(idbtrans, tableName, primKey, indexes) {
        var store = idbtrans.db.createObjectStore(tableName, primKey.keyPath ?
            { keyPath: primKey.keyPath, autoIncrement: primKey.auto } :
            { autoIncrement: primKey.auto });
        indexes.forEach(function (idx) { return addIndex(store, idx); });
        return store;
    }
    function createMissingTables(newSchema, idbtrans) {
        keys(newSchema).forEach(function (tableName) {
            if (!idbtrans.db.objectStoreNames.contains(tableName)) {
                if (debug)
                    console.debug('Dexie: Creating missing table', tableName);
                createTable(idbtrans, tableName, newSchema[tableName].primKey, newSchema[tableName].indexes);
            }
        });
    }
    function deleteRemovedTables(newSchema, idbtrans) {
        [].slice.call(idbtrans.db.objectStoreNames).forEach(function (storeName) {
            return newSchema[storeName] == null && idbtrans.db.deleteObjectStore(storeName);
        });
    }
    function addIndex(store, idx) {
        store.createIndex(idx.name, idx.keyPath, { unique: idx.unique, multiEntry: idx.multi });
    }
    function buildGlobalSchema(db, idbdb, tmpTrans) {
        var globalSchema = {};
        var dbStoreNames = slice(idbdb.objectStoreNames, 0);
        dbStoreNames.forEach(function (storeName) {
            var store = tmpTrans.objectStore(storeName);
            var keyPath = store.keyPath;
            var primKey = createIndexSpec(nameFromKeyPath(keyPath), keyPath || "", true, false, !!store.autoIncrement, keyPath && typeof keyPath !== "string", true);
            var indexes = [];
            for (var j = 0; j < store.indexNames.length; ++j) {
                var idbindex = store.index(store.indexNames[j]);
                keyPath = idbindex.keyPath;
                var index = createIndexSpec(idbindex.name, keyPath, !!idbindex.unique, !!idbindex.multiEntry, false, keyPath && typeof keyPath !== "string", false);
                indexes.push(index);
            }
            globalSchema[storeName] = createTableSchema(storeName, primKey, indexes);
        });
        return globalSchema;
    }
    function readGlobalSchema(db, idbdb, tmpTrans) {
        db.verno = idbdb.version / 10;
        var globalSchema = db._dbSchema = buildGlobalSchema(db, idbdb, tmpTrans);
        db._storeNames = slice(idbdb.objectStoreNames, 0);
        setApiOnPlace(db, [db._allTables], keys(globalSchema), globalSchema);
    }
    function verifyInstalledSchema(db, tmpTrans) {
        var installedSchema = buildGlobalSchema(db, db.idbdb, tmpTrans);
        var diff = getSchemaDiff(installedSchema, db._dbSchema);
        return !(diff.add.length || diff.change.some(function (ch) { return ch.add.length || ch.change.length; }));
    }
    function adjustToExistingIndexNames(db, schema, idbtrans) {
        var storeNames = idbtrans.db.objectStoreNames;
        for (var i = 0; i < storeNames.length; ++i) {
            var storeName = storeNames[i];
            var store = idbtrans.objectStore(storeName);
            db._hasGetAll = 'getAll' in store;
            for (var j = 0; j < store.indexNames.length; ++j) {
                var indexName = store.indexNames[j];
                var keyPath = store.index(indexName).keyPath;
                var dexieName = typeof keyPath === 'string' ? keyPath : "[" + slice(keyPath).join('+') + "]";
                if (schema[storeName]) {
                    var indexSpec = schema[storeName].idxByName[dexieName];
                    if (indexSpec) {
                        indexSpec.name = indexName;
                        delete schema[storeName].idxByName[dexieName];
                        schema[storeName].idxByName[indexName] = indexSpec;
                    }
                }
            }
        }
        if (typeof navigator !== 'undefined' && /Safari/.test(navigator.userAgent) &&
            !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
            _global.WorkerGlobalScope && _global instanceof _global.WorkerGlobalScope &&
            [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604) {
            db._hasGetAll = false;
        }
    }
    function parseIndexSyntax(primKeyAndIndexes) {
        return primKeyAndIndexes.split(',').map(function (index, indexNum) {
            index = index.trim();
            var name = index.replace(/([&*]|\+\+)/g, "");
            var keyPath = /^\[/.test(name) ? name.match(/^\[(.*)\]$/)[1].split('+') : name;
            return createIndexSpec(name, keyPath || null, /\&/.test(index), /\*/.test(index), /\+\+/.test(index), isArray(keyPath), indexNum === 0);
        });
    }

    var Version =  (function () {
        function Version() {
        }
        Version.prototype._parseStoresSpec = function (stores, outSchema) {
            keys(stores).forEach(function (tableName) {
                if (stores[tableName] !== null) {
                    var indexes = parseIndexSyntax(stores[tableName]);
                    var primKey = indexes.shift();
                    primKey.unique = true;
                    if (primKey.multi)
                        throw new exceptions.Schema("Primary key cannot be multi-valued");
                    indexes.forEach(function (idx) {
                        if (idx.auto)
                            throw new exceptions.Schema("Only primary key can be marked as autoIncrement (++)");
                        if (!idx.keyPath)
                            throw new exceptions.Schema("Index must have a name and cannot be an empty string");
                    });
                    outSchema[tableName] = createTableSchema(tableName, primKey, indexes);
                }
            });
        };
        Version.prototype.stores = function (stores) {
            var db = this.db;
            this._cfg.storesSource = this._cfg.storesSource ?
                extend(this._cfg.storesSource, stores) :
                stores;
            var versions = db._versions;
            var storesSpec = {};
            var dbschema = {};
            versions.forEach(function (version) {
                extend(storesSpec, version._cfg.storesSource);
                dbschema = (version._cfg.dbschema = {});
                version._parseStoresSpec(storesSpec, dbschema);
            });
            db._dbSchema = dbschema;
            removeTablesApi(db, [db._allTables, db, db.Transaction.prototype]);
            setApiOnPlace(db, [db._allTables, db, db.Transaction.prototype, this._cfg.tables], keys(dbschema), dbschema);
            db._storeNames = keys(dbschema);
            return this;
        };
        Version.prototype.upgrade = function (upgradeFunction) {
            this._cfg.contentUpgrade = promisableChain(this._cfg.contentUpgrade || nop, upgradeFunction);
            return this;
        };
        return Version;
    }());

    function createVersionConstructor(db) {
        return makeClassConstructor(Version.prototype, function Version(versionNumber) {
            this.db = db;
            this._cfg = {
                version: versionNumber,
                storesSource: null,
                dbschema: {},
                tables: {},
                contentUpgrade: null
            };
        });
    }

    function getDbNamesTable(indexedDB, IDBKeyRange) {
        var dbNamesDB = indexedDB["_dbNamesDB"];
        if (!dbNamesDB) {
            dbNamesDB = indexedDB["_dbNamesDB"] = new Dexie$1(DBNAMES_DB, {
                addons: [],
                indexedDB: indexedDB,
                IDBKeyRange: IDBKeyRange,
            });
            dbNamesDB.version(1).stores({ dbnames: "name" });
        }
        return dbNamesDB.table("dbnames");
    }
    function hasDatabasesNative(indexedDB) {
        return indexedDB && typeof indexedDB.databases === "function";
    }
    function getDatabaseNames(_a) {
        var indexedDB = _a.indexedDB, IDBKeyRange = _a.IDBKeyRange;
        return hasDatabasesNative(indexedDB)
            ? Promise.resolve(indexedDB.databases()).then(function (infos) {
                return infos
                    .map(function (info) { return info.name; })
                    .filter(function (name) { return name !== DBNAMES_DB; });
            })
            : getDbNamesTable(indexedDB, IDBKeyRange).toCollection().primaryKeys();
    }
    function _onDatabaseCreated(_a, name) {
        var indexedDB = _a.indexedDB, IDBKeyRange = _a.IDBKeyRange;
        !hasDatabasesNative(indexedDB) &&
            name !== DBNAMES_DB &&
            getDbNamesTable(indexedDB, IDBKeyRange).put({ name: name }).catch(nop);
    }
    function _onDatabaseDeleted(_a, name) {
        var indexedDB = _a.indexedDB, IDBKeyRange = _a.IDBKeyRange;
        !hasDatabasesNative(indexedDB) &&
            name !== DBNAMES_DB &&
            getDbNamesTable(indexedDB, IDBKeyRange).delete(name).catch(nop);
    }

    function vip(fn) {
        return newScope(function () {
            PSD.letThrough = true;
            return fn();
        });
    }

    function idbReady() {
        var isSafari = !navigator.userAgentData &&
            /Safari\//.test(navigator.userAgent) &&
            !/Chrom(e|ium)\//.test(navigator.userAgent);
        if (!isSafari || !indexedDB.databases)
            return Promise.resolve();
        var intervalId;
        return new Promise(function (resolve) {
            var tryIdb = function () { return indexedDB.databases().finally(resolve); };
            intervalId = setInterval(tryIdb, 100);
            tryIdb();
        }).finally(function () { return clearInterval(intervalId); });
    }

    var _a;
    function isEmptyRange(node) {
        return !("from" in node);
    }
    var RangeSet = function (fromOrTree, to) {
        if (this) {
            extend(this, arguments.length ? { d: 1, from: fromOrTree, to: arguments.length > 1 ? to : fromOrTree } : { d: 0 });
        }
        else {
            var rv = new RangeSet();
            if (fromOrTree && ("d" in fromOrTree)) {
                extend(rv, fromOrTree);
            }
            return rv;
        }
    };
    props(RangeSet.prototype, (_a = {
            add: function (rangeSet) {
                mergeRanges(this, rangeSet);
                return this;
            },
            addKey: function (key) {
                addRange(this, key, key);
                return this;
            },
            addKeys: function (keys) {
                var _this = this;
                keys.forEach(function (key) { return addRange(_this, key, key); });
                return this;
            },
            hasKey: function (key) {
                var node = getRangeSetIterator(this).next(key).value;
                return node && cmp(node.from, key) <= 0 && cmp(node.to, key) >= 0;
            }
        },
        _a[iteratorSymbol] = function () {
            return getRangeSetIterator(this);
        },
        _a));
    function addRange(target, from, to) {
        var diff = cmp(from, to);
        if (isNaN(diff))
            return;
        if (diff > 0)
            throw RangeError();
        if (isEmptyRange(target))
            return extend(target, { from: from, to: to, d: 1 });
        var left = target.l;
        var right = target.r;
        if (cmp(to, target.from) < 0) {
            left
                ? addRange(left, from, to)
                : (target.l = { from: from, to: to, d: 1, l: null, r: null });
            return rebalance(target);
        }
        if (cmp(from, target.to) > 0) {
            right
                ? addRange(right, from, to)
                : (target.r = { from: from, to: to, d: 1, l: null, r: null });
            return rebalance(target);
        }
        if (cmp(from, target.from) < 0) {
            target.from = from;
            target.l = null;
            target.d = right ? right.d + 1 : 1;
        }
        if (cmp(to, target.to) > 0) {
            target.to = to;
            target.r = null;
            target.d = target.l ? target.l.d + 1 : 1;
        }
        var rightWasCutOff = !target.r;
        if (left && !target.l) {
            mergeRanges(target, left);
        }
        if (right && rightWasCutOff) {
            mergeRanges(target, right);
        }
    }
    function mergeRanges(target, newSet) {
        function _addRangeSet(target, _a) {
            var from = _a.from, to = _a.to, l = _a.l, r = _a.r;
            addRange(target, from, to);
            if (l)
                _addRangeSet(target, l);
            if (r)
                _addRangeSet(target, r);
        }
        if (!isEmptyRange(newSet))
            _addRangeSet(target, newSet);
    }
    function rangesOverlap(rangeSet1, rangeSet2) {
        var i1 = getRangeSetIterator(rangeSet2);
        var nextResult1 = i1.next();
        if (nextResult1.done)
            return false;
        var a = nextResult1.value;
        var i2 = getRangeSetIterator(rangeSet1);
        var nextResult2 = i2.next(a.from);
        var b = nextResult2.value;
        while (!nextResult1.done && !nextResult2.done) {
            if (cmp(b.from, a.to) <= 0 && cmp(b.to, a.from) >= 0)
                return true;
            cmp(a.from, b.from) < 0
                ? (a = (nextResult1 = i1.next(b.from)).value)
                : (b = (nextResult2 = i2.next(a.from)).value);
        }
        return false;
    }
    function getRangeSetIterator(node) {
        var state = isEmptyRange(node) ? null : { s: 0, n: node };
        return {
            next: function (key) {
                var keyProvided = arguments.length > 0;
                while (state) {
                    switch (state.s) {
                        case 0:
                            state.s = 1;
                            if (keyProvided) {
                                while (state.n.l && cmp(key, state.n.from) < 0)
                                    state = { up: state, n: state.n.l, s: 1 };
                            }
                            else {
                                while (state.n.l)
                                    state = { up: state, n: state.n.l, s: 1 };
                            }
                        case 1:
                            state.s = 2;
                            if (!keyProvided || cmp(key, state.n.to) <= 0)
                                return { value: state.n, done: false };
                        case 2:
                            if (state.n.r) {
                                state.s = 3;
                                state = { up: state, n: state.n.r, s: 0 };
                                continue;
                            }
                        case 3:
                            state = state.up;
                    }
                }
                return { done: true };
            },
        };
    }
    function rebalance(target) {
        var _a, _b;
        var diff = (((_a = target.r) === null || _a === void 0 ? void 0 : _a.d) || 0) - (((_b = target.l) === null || _b === void 0 ? void 0 : _b.d) || 0);
        var r = diff > 1 ? "r" : diff < -1 ? "l" : "";
        if (r) {
            var l = r === "r" ? "l" : "r";
            var rootClone = __assign({}, target);
            var oldRootRight = target[r];
            target.from = oldRootRight.from;
            target.to = oldRootRight.to;
            target[r] = oldRootRight[r];
            rootClone[r] = oldRootRight[l];
            target[l] = rootClone;
            rootClone.d = computeDepth(rootClone);
        }
        target.d = computeDepth(target);
    }
    function computeDepth(_a) {
        var r = _a.r, l = _a.l;
        return (r ? (l ? Math.max(r.d, l.d) : r.d) : l ? l.d : 0) + 1;
    }

    function extendObservabilitySet(target, newSet) {
        keys(newSet).forEach(function (part) {
            if (target[part])
                mergeRanges(target[part], newSet[part]);
            else
                target[part] = cloneSimpleObjectTree(newSet[part]);
        });
        return target;
    }

    function obsSetsOverlap(os1, os2) {
        return os1.all || os2.all || Object.keys(os1).some(function (key) { return os2[key] && rangesOverlap(os2[key], os1[key]); });
    }

    var cache = {};

    var unsignaledParts = {};
    var isTaskEnqueued = false;
    function signalSubscribersLazily(part, optimistic) {
        extendObservabilitySet(unsignaledParts, part);
        if (!isTaskEnqueued) {
            isTaskEnqueued = true;
            setTimeout(function () {
                isTaskEnqueued = false;
                var parts = unsignaledParts;
                unsignaledParts = {};
                signalSubscribersNow(parts, false);
            }, 0);
        }
    }
    function signalSubscribersNow(updatedParts, deleteAffectedCacheEntries) {
        if (deleteAffectedCacheEntries === void 0) { deleteAffectedCacheEntries = false; }
        var queriesToSignal = new Set();
        if (updatedParts.all) {
            for (var _i = 0, _a = Object.values(cache); _i < _a.length; _i++) {
                var tblCache = _a[_i];
                collectTableSubscribers(tblCache, updatedParts, queriesToSignal, deleteAffectedCacheEntries);
            }
        }
        else {
            for (var key in updatedParts) {
                var parts = /^idb\:\/\/(.*)\/(.*)\//.exec(key);
                if (parts) {
                    var dbName = parts[1], tableName = parts[2];
                    var tblCache = cache["idb://".concat(dbName, "/").concat(tableName)];
                    if (tblCache)
                        collectTableSubscribers(tblCache, updatedParts, queriesToSignal, deleteAffectedCacheEntries);
                }
            }
        }
        queriesToSignal.forEach(function (requery) { return requery(); });
    }
    function collectTableSubscribers(tblCache, updatedParts, outQueriesToSignal, deleteAffectedCacheEntries) {
        var updatedEntryLists = [];
        for (var _i = 0, _a = Object.entries(tblCache.queries.query); _i < _a.length; _i++) {
            var _b = _a[_i], indexName = _b[0], entries = _b[1];
            var filteredEntries = [];
            for (var _c = 0, entries_1 = entries; _c < entries_1.length; _c++) {
                var entry = entries_1[_c];
                if (obsSetsOverlap(updatedParts, entry.obsSet)) {
                    entry.subscribers.forEach(function (requery) { return outQueriesToSignal.add(requery); });
                }
                else if (deleteAffectedCacheEntries) {
                    filteredEntries.push(entry);
                }
            }
            if (deleteAffectedCacheEntries)
                updatedEntryLists.push([indexName, filteredEntries]);
        }
        if (deleteAffectedCacheEntries) {
            for (var _d = 0, updatedEntryLists_1 = updatedEntryLists; _d < updatedEntryLists_1.length; _d++) {
                var _e = updatedEntryLists_1[_d], indexName = _e[0], filteredEntries = _e[1];
                tblCache.queries.query[indexName] = filteredEntries;
            }
        }
    }

    function dexieOpen(db) {
        var state = db._state;
        var indexedDB = db._deps.indexedDB;
        if (state.isBeingOpened || db.idbdb)
            return state.dbReadyPromise.then(function () { return state.dbOpenError ?
                rejection(state.dbOpenError) :
                db; });
        state.isBeingOpened = true;
        state.dbOpenError = null;
        state.openComplete = false;
        var openCanceller = state.openCanceller;
        var nativeVerToOpen = Math.round(db.verno * 10);
        var schemaPatchMode = false;
        function throwIfCancelled() {
            if (state.openCanceller !== openCanceller)
                throw new exceptions.DatabaseClosed('db.open() was cancelled');
        }
        var resolveDbReady = state.dbReadyResolve,
        upgradeTransaction = null, wasCreated = false;
        var tryOpenDB = function () { return new DexiePromise(function (resolve, reject) {
            throwIfCancelled();
            if (!indexedDB)
                throw new exceptions.MissingAPI();
            var dbName = db.name;
            var req = state.autoSchema || !nativeVerToOpen ?
                indexedDB.open(dbName) :
                indexedDB.open(dbName, nativeVerToOpen);
            if (!req)
                throw new exceptions.MissingAPI();
            req.onerror = eventRejectHandler(reject);
            req.onblocked = wrap(db._fireOnBlocked);
            req.onupgradeneeded = wrap(function (e) {
                upgradeTransaction = req.transaction;
                if (state.autoSchema && !db._options.allowEmptyDB) {
                    req.onerror = preventDefault;
                    upgradeTransaction.abort();
                    req.result.close();
                    var delreq = indexedDB.deleteDatabase(dbName);
                    delreq.onsuccess = delreq.onerror = wrap(function () {
                        reject(new exceptions.NoSuchDatabase("Database ".concat(dbName, " doesnt exist")));
                    });
                }
                else {
                    upgradeTransaction.onerror = eventRejectHandler(reject);
                    var oldVer = e.oldVersion > Math.pow(2, 62) ? 0 : e.oldVersion;
                    wasCreated = oldVer < 1;
                    db.idbdb = req.result;
                    if (schemaPatchMode) {
                        patchCurrentVersion(db, upgradeTransaction);
                    }
                    runUpgraders(db, oldVer / 10, upgradeTransaction, reject);
                }
            }, reject);
            req.onsuccess = wrap(function () {
                upgradeTransaction = null;
                var idbdb = db.idbdb = req.result;
                var objectStoreNames = slice(idbdb.objectStoreNames);
                if (objectStoreNames.length > 0)
                    try {
                        var tmpTrans = idbdb.transaction(safariMultiStoreFix(objectStoreNames), 'readonly');
                        if (state.autoSchema)
                            readGlobalSchema(db, idbdb, tmpTrans);
                        else {
                            adjustToExistingIndexNames(db, db._dbSchema, tmpTrans);
                            if (!verifyInstalledSchema(db, tmpTrans) && !schemaPatchMode) {
                                console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this.");
                                idbdb.close();
                                nativeVerToOpen = idbdb.version + 1;
                                schemaPatchMode = true;
                                return resolve(tryOpenDB());
                            }
                        }
                        generateMiddlewareStacks(db, tmpTrans);
                    }
                    catch (e) {
                    }
                connections.push(db);
                idbdb.onversionchange = wrap(function (ev) {
                    state.vcFired = true;
                    db.on("versionchange").fire(ev);
                });
                idbdb.onclose = wrap(function (ev) {
                    db.on("close").fire(ev);
                });
                if (wasCreated)
                    _onDatabaseCreated(db._deps, dbName);
                resolve();
            }, reject);
        }).catch(function (err) {
            switch (err === null || err === void 0 ? void 0 : err.name) {
                case "UnknownError":
                    if (state.PR1398_maxLoop > 0) {
                        state.PR1398_maxLoop--;
                        console.warn('Dexie: Workaround for Chrome UnknownError on open()');
                        return tryOpenDB();
                    }
                    break;
                case "VersionError":
                    if (nativeVerToOpen > 0) {
                        nativeVerToOpen = 0;
                        return tryOpenDB();
                    }
                    break;
            }
            return DexiePromise.reject(err);
        }); };
        return DexiePromise.race([
            openCanceller,
            (typeof navigator === 'undefined' ? DexiePromise.resolve() : idbReady()).then(tryOpenDB)
        ]).then(function () {
            throwIfCancelled();
            state.onReadyBeingFired = [];
            return DexiePromise.resolve(vip(function () { return db.on.ready.fire(db.vip); })).then(function fireRemainders() {
                if (state.onReadyBeingFired.length > 0) {
                    var remainders_1 = state.onReadyBeingFired.reduce(promisableChain, nop);
                    state.onReadyBeingFired = [];
                    return DexiePromise.resolve(vip(function () { return remainders_1(db.vip); })).then(fireRemainders);
                }
            });
        }).finally(function () {
            if (state.openCanceller === openCanceller) {
                state.onReadyBeingFired = null;
                state.isBeingOpened = false;
            }
        }).catch(function (err) {
            state.dbOpenError = err;
            try {
                upgradeTransaction && upgradeTransaction.abort();
            }
            catch (_a) { }
            if (openCanceller === state.openCanceller) {
                db._close();
            }
            return rejection(err);
        }).finally(function () {
            state.openComplete = true;
            resolveDbReady();
        }).then(function () {
            if (wasCreated) {
                var everything_1 = {};
                db.tables.forEach(function (table) {
                    table.schema.indexes.forEach(function (idx) {
                        if (idx.name)
                            everything_1["idb://".concat(db.name, "/").concat(table.name, "/").concat(idx.name)] = new RangeSet(-Infinity, [[[]]]);
                    });
                    everything_1["idb://".concat(db.name, "/").concat(table.name, "/")] = everything_1["idb://".concat(db.name, "/").concat(table.name, "/:dels")] = new RangeSet(-Infinity, [[[]]]);
                });
                globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME).fire(everything_1);
                signalSubscribersNow(everything_1, true);
            }
            return db;
        });
    }

    function awaitIterator(iterator) {
        var callNext = function (result) { return iterator.next(result); }, doThrow = function (error) { return iterator.throw(error); }, onSuccess = step(callNext), onError = step(doThrow);
        function step(getNext) {
            return function (val) {
                var next = getNext(val), value = next.value;
                return next.done ? value :
                    (!value || typeof value.then !== 'function' ?
                        isArray(value) ? Promise.all(value).then(onSuccess, onError) : onSuccess(value) :
                        value.then(onSuccess, onError));
            };
        }
        return step(callNext)();
    }

    function extractTransactionArgs(mode, _tableArgs_, scopeFunc) {
        var i = arguments.length;
        if (i < 2)
            throw new exceptions.InvalidArgument("Too few arguments");
        var args = new Array(i - 1);
        while (--i)
            args[i - 1] = arguments[i];
        scopeFunc = args.pop();
        var tables = flatten(args);
        return [mode, tables, scopeFunc];
    }
    function enterTransactionScope(db, mode, storeNames, parentTransaction, scopeFunc) {
        return DexiePromise.resolve().then(function () {
            var transless = PSD.transless || PSD;
            var trans = db._createTransaction(mode, storeNames, db._dbSchema, parentTransaction);
            trans.explicit = true;
            var zoneProps = {
                trans: trans,
                transless: transless
            };
            if (parentTransaction) {
                trans.idbtrans = parentTransaction.idbtrans;
            }
            else {
                try {
                    trans.create();
                    trans.idbtrans._explicit = true;
                    db._state.PR1398_maxLoop = 3;
                }
                catch (ex) {
                    if (ex.name === errnames.InvalidState && db.isOpen() && --db._state.PR1398_maxLoop > 0) {
                        console.warn('Dexie: Need to reopen db');
                        db.close({ disableAutoOpen: false });
                        return db.open().then(function () { return enterTransactionScope(db, mode, storeNames, null, scopeFunc); });
                    }
                    return rejection(ex);
                }
            }
            var scopeFuncIsAsync = isAsyncFunction(scopeFunc);
            if (scopeFuncIsAsync) {
                incrementExpectedAwaits();
            }
            var returnValue;
            var promiseFollowed = DexiePromise.follow(function () {
                returnValue = scopeFunc.call(trans, trans);
                if (returnValue) {
                    if (scopeFuncIsAsync) {
                        var decrementor = decrementExpectedAwaits.bind(null, null);
                        returnValue.then(decrementor, decrementor);
                    }
                    else if (typeof returnValue.next === 'function' && typeof returnValue.throw === 'function') {
                        returnValue = awaitIterator(returnValue);
                    }
                }
            }, zoneProps);
            return (returnValue && typeof returnValue.then === 'function' ?
                DexiePromise.resolve(returnValue).then(function (x) { return trans.active ?
                    x
                    : rejection(new exceptions.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn")); })
                : promiseFollowed.then(function () { return returnValue; })).then(function (x) {
                if (parentTransaction)
                    trans._resolve();
                return trans._completion.then(function () { return x; });
            }).catch(function (e) {
                trans._reject(e);
                return rejection(e);
            });
        });
    }

    function pad(a, value, count) {
        var result = isArray(a) ? a.slice() : [a];
        for (var i = 0; i < count; ++i)
            result.push(value);
        return result;
    }
    function createVirtualIndexMiddleware(down) {
        return __assign(__assign({}, down), { table: function (tableName) {
                var table = down.table(tableName);
                var schema = table.schema;
                var indexLookup = {};
                var allVirtualIndexes = [];
                function addVirtualIndexes(keyPath, keyTail, lowLevelIndex) {
                    var keyPathAlias = getKeyPathAlias(keyPath);
                    var indexList = (indexLookup[keyPathAlias] = indexLookup[keyPathAlias] || []);
                    var keyLength = keyPath == null ? 0 : typeof keyPath === 'string' ? 1 : keyPath.length;
                    var isVirtual = keyTail > 0;
                    var virtualIndex = __assign(__assign({}, lowLevelIndex), { name: isVirtual
                            ? "".concat(keyPathAlias, "(virtual-from:").concat(lowLevelIndex.name, ")")
                            : lowLevelIndex.name, lowLevelIndex: lowLevelIndex, isVirtual: isVirtual, keyTail: keyTail, keyLength: keyLength, extractKey: getKeyExtractor(keyPath), unique: !isVirtual && lowLevelIndex.unique });
                    indexList.push(virtualIndex);
                    if (!virtualIndex.isPrimaryKey) {
                        allVirtualIndexes.push(virtualIndex);
                    }
                    if (keyLength > 1) {
                        var virtualKeyPath = keyLength === 2 ?
                            keyPath[0] :
                            keyPath.slice(0, keyLength - 1);
                        addVirtualIndexes(virtualKeyPath, keyTail + 1, lowLevelIndex);
                    }
                    indexList.sort(function (a, b) { return a.keyTail - b.keyTail; });
                    return virtualIndex;
                }
                var primaryKey = addVirtualIndexes(schema.primaryKey.keyPath, 0, schema.primaryKey);
                indexLookup[":id"] = [primaryKey];
                for (var _i = 0, _a = schema.indexes; _i < _a.length; _i++) {
                    var index = _a[_i];
                    addVirtualIndexes(index.keyPath, 0, index);
                }
                function findBestIndex(keyPath) {
                    var result = indexLookup[getKeyPathAlias(keyPath)];
                    return result && result[0];
                }
                function translateRange(range, keyTail) {
                    return {
                        type: range.type === 1  ?
                            2  :
                            range.type,
                        lower: pad(range.lower, range.lowerOpen ? down.MAX_KEY : down.MIN_KEY, keyTail),
                        lowerOpen: true,
                        upper: pad(range.upper, range.upperOpen ? down.MIN_KEY : down.MAX_KEY, keyTail),
                        upperOpen: true
                    };
                }
                function translateRequest(req) {
                    var index = req.query.index;
                    return index.isVirtual ? __assign(__assign({}, req), { query: {
                            index: index.lowLevelIndex,
                            range: translateRange(req.query.range, index.keyTail)
                        } }) : req;
                }
                var result = __assign(__assign({}, table), { schema: __assign(__assign({}, schema), { primaryKey: primaryKey, indexes: allVirtualIndexes, getIndexByKeyPath: findBestIndex }), count: function (req) {
                        return table.count(translateRequest(req));
                    }, query: function (req) {
                        return table.query(translateRequest(req));
                    }, openCursor: function (req) {
                        var _a = req.query.index, keyTail = _a.keyTail, isVirtual = _a.isVirtual, keyLength = _a.keyLength;
                        if (!isVirtual)
                            return table.openCursor(req);
                        function createVirtualCursor(cursor) {
                            function _continue(key) {
                                key != null ?
                                    cursor.continue(pad(key, req.reverse ? down.MAX_KEY : down.MIN_KEY, keyTail)) :
                                    req.unique ?
                                        cursor.continue(cursor.key.slice(0, keyLength)
                                            .concat(req.reverse
                                            ? down.MIN_KEY
                                            : down.MAX_KEY, keyTail)) :
                                        cursor.continue();
                            }
                            var virtualCursor = Object.create(cursor, {
                                continue: { value: _continue },
                                continuePrimaryKey: {
                                    value: function (key, primaryKey) {
                                        cursor.continuePrimaryKey(pad(key, down.MAX_KEY, keyTail), primaryKey);
                                    }
                                },
                                primaryKey: {
                                    get: function () {
                                        return cursor.primaryKey;
                                    }
                                },
                                key: {
                                    get: function () {
                                        var key = cursor.key;
                                        return keyLength === 1 ?
                                            key[0] :
                                            key.slice(0, keyLength);
                                    }
                                },
                                value: {
                                    get: function () {
                                        return cursor.value;
                                    }
                                }
                            });
                            return virtualCursor;
                        }
                        return table.openCursor(translateRequest(req))
                            .then(function (cursor) { return cursor && createVirtualCursor(cursor); });
                    } });
                return result;
            } });
    }
    var virtualIndexMiddleware = {
        stack: "dbcore",
        name: "VirtualIndexMiddleware",
        level: 1,
        create: createVirtualIndexMiddleware
    };

    function getObjectDiff(a, b, rv, prfx) {
        rv = rv || {};
        prfx = prfx || '';
        keys(a).forEach(function (prop) {
            if (!hasOwn(b, prop)) {
                rv[prfx + prop] = undefined;
            }
            else {
                var ap = a[prop], bp = b[prop];
                if (typeof ap === 'object' && typeof bp === 'object' && ap && bp) {
                    var apTypeName = toStringTag(ap);
                    var bpTypeName = toStringTag(bp);
                    if (apTypeName !== bpTypeName) {
                        rv[prfx + prop] = b[prop];
                    }
                    else if (apTypeName === 'Object') {
                        getObjectDiff(ap, bp, rv, prfx + prop + '.');
                    }
                    else if (ap !== bp) {
                        rv[prfx + prop] = b[prop];
                    }
                }
                else if (ap !== bp)
                    rv[prfx + prop] = b[prop];
            }
        });
        keys(b).forEach(function (prop) {
            if (!hasOwn(a, prop)) {
                rv[prfx + prop] = b[prop];
            }
        });
        return rv;
    }

    function getEffectiveKeys(primaryKey, req) {
        if (req.type === 'delete')
            return req.keys;
        return req.keys || req.values.map(primaryKey.extractKey);
    }

    var hooksMiddleware = {
        stack: "dbcore",
        name: "HooksMiddleware",
        level: 2,
        create: function (downCore) { return (__assign(__assign({}, downCore), { table: function (tableName) {
                var downTable = downCore.table(tableName);
                var primaryKey = downTable.schema.primaryKey;
                var tableMiddleware = __assign(__assign({}, downTable), { mutate: function (req) {
                        var dxTrans = PSD.trans;
                        var _a = dxTrans.table(tableName).hook, deleting = _a.deleting, creating = _a.creating, updating = _a.updating;
                        switch (req.type) {
                            case 'add':
                                if (creating.fire === nop)
                                    break;
                                return dxTrans._promise('readwrite', function () { return addPutOrDelete(req); }, true);
                            case 'put':
                                if (creating.fire === nop && updating.fire === nop)
                                    break;
                                return dxTrans._promise('readwrite', function () { return addPutOrDelete(req); }, true);
                            case 'delete':
                                if (deleting.fire === nop)
                                    break;
                                return dxTrans._promise('readwrite', function () { return addPutOrDelete(req); }, true);
                            case 'deleteRange':
                                if (deleting.fire === nop)
                                    break;
                                return dxTrans._promise('readwrite', function () { return deleteRange(req); }, true);
                        }
                        return downTable.mutate(req);
                        function addPutOrDelete(req) {
                            var dxTrans = PSD.trans;
                            var keys = req.keys || getEffectiveKeys(primaryKey, req);
                            if (!keys)
                                throw new Error("Keys missing");
                            req = req.type === 'add' || req.type === 'put' ? __assign(__assign({}, req), { keys: keys }) : __assign({}, req);
                            if (req.type !== 'delete')
                                req.values = __spreadArray([], req.values, true);
                            if (req.keys)
                                req.keys = __spreadArray([], req.keys, true);
                            return getExistingValues(downTable, req, keys).then(function (existingValues) {
                                var contexts = keys.map(function (key, i) {
                                    var existingValue = existingValues[i];
                                    var ctx = { onerror: null, onsuccess: null };
                                    if (req.type === 'delete') {
                                        deleting.fire.call(ctx, key, existingValue, dxTrans);
                                    }
                                    else if (req.type === 'add' || existingValue === undefined) {
                                        var generatedPrimaryKey = creating.fire.call(ctx, key, req.values[i], dxTrans);
                                        if (key == null && generatedPrimaryKey != null) {
                                            key = generatedPrimaryKey;
                                            req.keys[i] = key;
                                            if (!primaryKey.outbound) {
                                                setByKeyPath(req.values[i], primaryKey.keyPath, key);
                                            }
                                        }
                                    }
                                    else {
                                        var objectDiff = getObjectDiff(existingValue, req.values[i]);
                                        var additionalChanges_1 = updating.fire.call(ctx, objectDiff, key, existingValue, dxTrans);
                                        if (additionalChanges_1) {
                                            var requestedValue_1 = req.values[i];
                                            Object.keys(additionalChanges_1).forEach(function (keyPath) {
                                                if (hasOwn(requestedValue_1, keyPath)) {
                                                    requestedValue_1[keyPath] = additionalChanges_1[keyPath];
                                                }
                                                else {
                                                    setByKeyPath(requestedValue_1, keyPath, additionalChanges_1[keyPath]);
                                                }
                                            });
                                        }
                                    }
                                    return ctx;
                                });
                                return downTable.mutate(req).then(function (_a) {
                                    var failures = _a.failures, results = _a.results, numFailures = _a.numFailures, lastResult = _a.lastResult;
                                    for (var i = 0; i < keys.length; ++i) {
                                        var primKey = results ? results[i] : keys[i];
                                        var ctx = contexts[i];
                                        if (primKey == null) {
                                            ctx.onerror && ctx.onerror(failures[i]);
                                        }
                                        else {
                                            ctx.onsuccess && ctx.onsuccess(req.type === 'put' && existingValues[i] ?
                                                req.values[i] :
                                                primKey
                                            );
                                        }
                                    }
                                    return { failures: failures, results: results, numFailures: numFailures, lastResult: lastResult };
                                }).catch(function (error) {
                                    contexts.forEach(function (ctx) { return ctx.onerror && ctx.onerror(error); });
                                    return Promise.reject(error);
                                });
                            });
                        }
                        function deleteRange(req) {
                            return deleteNextChunk(req.trans, req.range, 10000);
                        }
                        function deleteNextChunk(trans, range, limit) {
                            return downTable.query({ trans: trans, values: false, query: { index: primaryKey, range: range }, limit: limit })
                                .then(function (_a) {
                                var result = _a.result;
                                return addPutOrDelete({ type: 'delete', keys: result, trans: trans }).then(function (res) {
                                    if (res.numFailures > 0)
                                        return Promise.reject(res.failures[0]);
                                    if (result.length < limit) {
                                        return { failures: [], numFailures: 0, lastResult: undefined };
                                    }
                                    else {
                                        return deleteNextChunk(trans, __assign(__assign({}, range), { lower: result[result.length - 1], lowerOpen: true }), limit);
                                    }
                                });
                            });
                        }
                    } });
                return tableMiddleware;
            } })); }
    };
    function getExistingValues(table, req, effectiveKeys) {
        return req.type === "add"
            ? Promise.resolve([])
            : table.getMany({ trans: req.trans, keys: effectiveKeys, cache: "immutable" });
    }

    function getFromTransactionCache(keys, cache, clone) {
        try {
            if (!cache)
                return null;
            if (cache.keys.length < keys.length)
                return null;
            var result = [];
            for (var i = 0, j = 0; i < cache.keys.length && j < keys.length; ++i) {
                if (cmp(cache.keys[i], keys[j]) !== 0)
                    continue;
                result.push(clone ? deepClone(cache.values[i]) : cache.values[i]);
                ++j;
            }
            return result.length === keys.length ? result : null;
        }
        catch (_a) {
            return null;
        }
    }
    var cacheExistingValuesMiddleware = {
        stack: "dbcore",
        level: -1,
        create: function (core) {
            return {
                table: function (tableName) {
                    var table = core.table(tableName);
                    return __assign(__assign({}, table), { getMany: function (req) {
                            if (!req.cache) {
                                return table.getMany(req);
                            }
                            var cachedResult = getFromTransactionCache(req.keys, req.trans["_cache"], req.cache === "clone");
                            if (cachedResult) {
                                return DexiePromise.resolve(cachedResult);
                            }
                            return table.getMany(req).then(function (res) {
                                req.trans["_cache"] = {
                                    keys: req.keys,
                                    values: req.cache === "clone" ? deepClone(res) : res,
                                };
                                return res;
                            });
                        }, mutate: function (req) {
                            if (req.type !== "add")
                                req.trans["_cache"] = null;
                            return table.mutate(req);
                        } });
                },
            };
        },
    };

    function isCachableContext(ctx, table) {
        return (ctx.trans.mode === 'readonly' &&
            !!ctx.subscr &&
            !ctx.trans.explicit &&
            ctx.trans.db._options.cache !== 'disabled' &&
            !table.schema.primaryKey.outbound);
    }

    function isCachableRequest(type, req) {
        switch (type) {
            case 'query':
                return req.values && !req.unique;
            case 'get':
                return false;
            case 'getMany':
                return false;
            case 'count':
                return false;
            case 'openCursor':
                return false;
        }
    }

    var observabilityMiddleware = {
        stack: "dbcore",
        level: 0,
        name: "Observability",
        create: function (core) {
            var dbName = core.schema.name;
            var FULL_RANGE = new RangeSet(core.MIN_KEY, core.MAX_KEY);
            return __assign(__assign({}, core), { transaction: function (stores, mode, options) {
                    if (PSD.subscr && mode !== 'readonly') {
                        throw new exceptions.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat(PSD.querier));
                    }
                    return core.transaction(stores, mode, options);
                }, table: function (tableName) {
                    var table = core.table(tableName);
                    var schema = table.schema;
                    var primaryKey = schema.primaryKey, indexes = schema.indexes;
                    var extractKey = primaryKey.extractKey, outbound = primaryKey.outbound;
                    var indexesWithAutoIncPK = primaryKey.autoIncrement && indexes.filter(function (index) { return index.compound && index.keyPath.includes(primaryKey.keyPath); });
                    var tableClone = __assign(__assign({}, table), { mutate: function (req) {
                            var _a, _b;
                            var trans = req.trans;
                            var mutatedParts = req.mutatedParts || (req.mutatedParts = {});
                            var getRangeSet = function (indexName) {
                                var part = "idb://".concat(dbName, "/").concat(tableName, "/").concat(indexName);
                                return (mutatedParts[part] ||
                                    (mutatedParts[part] = new RangeSet()));
                            };
                            var pkRangeSet = getRangeSet("");
                            var delsRangeSet = getRangeSet(":dels");
                            var type = req.type;
                            var _c = req.type === "deleteRange"
                                ? [req.range]
                                : req.type === "delete"
                                    ? [req.keys]
                                    : req.values.length < 50
                                        ? [getEffectiveKeys(primaryKey, req).filter(function (id) { return id; }), req.values]
                                        : [], keys = _c[0], newObjs = _c[1];
                            var oldCache = req.trans["_cache"];
                            if (isArray(keys)) {
                                pkRangeSet.addKeys(keys);
                                var oldObjs = type === 'delete' || keys.length === newObjs.length ? getFromTransactionCache(keys, oldCache) : null;
                                if (!oldObjs) {
                                    delsRangeSet.addKeys(keys);
                                }
                                if (oldObjs || newObjs) {
                                    trackAffectedIndexes(getRangeSet, schema, oldObjs, newObjs);
                                }
                            }
                            else if (keys) {
                                var range = {
                                    from: (_a = keys.lower) !== null && _a !== void 0 ? _a : core.MIN_KEY,
                                    to: (_b = keys.upper) !== null && _b !== void 0 ? _b : core.MAX_KEY
                                };
                                delsRangeSet.add(range);
                                pkRangeSet.add(range);
                            }
                            else {
                                pkRangeSet.add(FULL_RANGE);
                                delsRangeSet.add(FULL_RANGE);
                                schema.indexes.forEach(function (idx) { return getRangeSet(idx.name).add(FULL_RANGE); });
                            }
                            return table.mutate(req).then(function (res) {
                                if (keys && (req.type === 'add' || req.type === 'put')) {
                                    pkRangeSet.addKeys(res.results);
                                    if (indexesWithAutoIncPK) {
                                        indexesWithAutoIncPK.forEach(function (idx) {
                                            var idxVals = req.values.map(function (v) { return idx.extractKey(v); });
                                            var pkPos = idx.keyPath.findIndex(function (prop) { return prop === primaryKey.keyPath; });
                                            for (var i = 0, len = res.results.length; i < len; ++i) {
                                                idxVals[i][pkPos] = res.results[i];
                                            }
                                            getRangeSet(idx.name).addKeys(idxVals);
                                        });
                                    }
                                }
                                trans.mutatedParts = extendObservabilitySet(trans.mutatedParts || {}, mutatedParts);
                                return res;
                            });
                        } });
                    var getRange = function (_a) {
                        var _b, _c;
                        var _d = _a.query, index = _d.index, range = _d.range;
                        return [
                            index,
                            new RangeSet((_b = range.lower) !== null && _b !== void 0 ? _b : core.MIN_KEY, (_c = range.upper) !== null && _c !== void 0 ? _c : core.MAX_KEY),
                        ];
                    };
                    var readSubscribers = {
                        get: function (req) { return [primaryKey, new RangeSet(req.key)]; },
                        getMany: function (req) { return [primaryKey, new RangeSet().addKeys(req.keys)]; },
                        count: getRange,
                        query: getRange,
                        openCursor: getRange,
                    };
                    keys(readSubscribers).forEach(function (method) {
                        tableClone[method] = function (req) {
                            var subscr = PSD.subscr;
                            var isLiveQuery = !!subscr;
                            var cachable = isCachableContext(PSD, table) && isCachableRequest(method, req);
                            var obsSet = cachable
                                ? req.obsSet = {}
                                : subscr;
                            if (isLiveQuery) {
                                var getRangeSet = function (indexName) {
                                    var part = "idb://".concat(dbName, "/").concat(tableName, "/").concat(indexName);
                                    return (obsSet[part] ||
                                        (obsSet[part] = new RangeSet()));
                                };
                                var pkRangeSet_1 = getRangeSet("");
                                var delsRangeSet_1 = getRangeSet(":dels");
                                var _a = readSubscribers[method](req), queriedIndex = _a[0], queriedRanges = _a[1];
                                if (method === 'query' && queriedIndex.isPrimaryKey && !req.values) {
                                    delsRangeSet_1.add(queriedRanges);
                                }
                                else {
                                    getRangeSet(queriedIndex.name || "").add(queriedRanges);
                                }
                                if (!queriedIndex.isPrimaryKey) {
                                    if (method === "count") {
                                        delsRangeSet_1.add(FULL_RANGE);
                                    }
                                    else {
                                        var keysPromise_1 = method === "query" &&
                                            outbound &&
                                            req.values &&
                                            table.query(__assign(__assign({}, req), { values: false }));
                                        return table[method].apply(this, arguments).then(function (res) {
                                            if (method === "query") {
                                                if (outbound && req.values) {
                                                    return keysPromise_1.then(function (_a) {
                                                        var resultingKeys = _a.result;
                                                        pkRangeSet_1.addKeys(resultingKeys);
                                                        return res;
                                                    });
                                                }
                                                var pKeys = req.values
                                                    ? res.result.map(extractKey)
                                                    : res.result;
                                                if (req.values) {
                                                    pkRangeSet_1.addKeys(pKeys);
                                                }
                                                else {
                                                    delsRangeSet_1.addKeys(pKeys);
                                                }
                                            }
                                            else if (method === "openCursor") {
                                                var cursor_1 = res;
                                                var wantValues_1 = req.values;
                                                return (cursor_1 &&
                                                    Object.create(cursor_1, {
                                                        key: {
                                                            get: function () {
                                                                delsRangeSet_1.addKey(cursor_1.primaryKey);
                                                                return cursor_1.key;
                                                            },
                                                        },
                                                        primaryKey: {
                                                            get: function () {
                                                                var pkey = cursor_1.primaryKey;
                                                                delsRangeSet_1.addKey(pkey);
                                                                return pkey;
                                                            },
                                                        },
                                                        value: {
                                                            get: function () {
                                                                wantValues_1 && pkRangeSet_1.addKey(cursor_1.primaryKey);
                                                                return cursor_1.value;
                                                            },
                                                        },
                                                    }));
                                            }
                                            return res;
                                        });
                                    }
                                }
                            }
                            return table[method].apply(this, arguments);
                        };
                    });
                    return tableClone;
                } });
        },
    };
    function trackAffectedIndexes(getRangeSet, schema, oldObjs, newObjs) {
        function addAffectedIndex(ix) {
            var rangeSet = getRangeSet(ix.name || "");
            function extractKey(obj) {
                return obj != null ? ix.extractKey(obj) : null;
            }
            var addKeyOrKeys = function (key) { return ix.multiEntry && isArray(key)
                ? key.forEach(function (key) { return rangeSet.addKey(key); })
                : rangeSet.addKey(key); };
            (oldObjs || newObjs).forEach(function (_, i) {
                var oldKey = oldObjs && extractKey(oldObjs[i]);
                var newKey = newObjs && extractKey(newObjs[i]);
                if (cmp(oldKey, newKey) !== 0) {
                    if (oldKey != null)
                        addKeyOrKeys(oldKey);
                    if (newKey != null)
                        addKeyOrKeys(newKey);
                }
            });
        }
        schema.indexes.forEach(addAffectedIndex);
    }

    function adjustOptimisticFromFailures(tblCache, req, res) {
        if (res.numFailures === 0)
            return req;
        if (req.type === 'deleteRange') {
            return null;
        }
        var numBulkOps = req.keys
            ? req.keys.length
            : 'values' in req && req.values
                ? req.values.length
                : 1;
        if (res.numFailures === numBulkOps) {
            return null;
        }
        var clone = __assign({}, req);
        if (isArray(clone.keys)) {
            clone.keys = clone.keys.filter(function (_, i) { return !(i in res.failures); });
        }
        if ('values' in clone && isArray(clone.values)) {
            clone.values = clone.values.filter(function (_, i) { return !(i in res.failures); });
        }
        return clone;
    }

    function isAboveLower(key, range) {
        return range.lower === undefined
            ? true
            : range.lowerOpen
                ? cmp(key, range.lower) > 0
                : cmp(key, range.lower) >= 0;
    }
    function isBelowUpper(key, range) {
        return range.upper === undefined
            ? true
            : range.upperOpen
                ? cmp(key, range.upper) < 0
                : cmp(key, range.upper) <= 0;
    }
    function isWithinRange(key, range) {
        return isAboveLower(key, range) && isBelowUpper(key, range);
    }

    function applyOptimisticOps(result, req, ops, table, cacheEntry, immutable) {
        if (!ops || ops.length === 0)
            return result;
        var index = req.query.index;
        var multiEntry = index.multiEntry;
        var queryRange = req.query.range;
        var primaryKey = table.schema.primaryKey;
        var extractPrimKey = primaryKey.extractKey;
        var extractIndex = index.extractKey;
        var extractLowLevelIndex = (index.lowLevelIndex || index).extractKey;
        var finalResult = ops.reduce(function (result, op) {
            var modifedResult = result;
            var includedValues = [];
            if (op.type === 'add' || op.type === 'put') {
                var includedPKs = new RangeSet();
                for (var i = op.values.length - 1; i >= 0; --i) {
                    var value = op.values[i];
                    var pk = extractPrimKey(value);
                    if (includedPKs.hasKey(pk))
                        continue;
                    var key = extractIndex(value);
                    if (multiEntry && isArray(key)
                        ? key.some(function (k) { return isWithinRange(k, queryRange); })
                        : isWithinRange(key, queryRange)) {
                        includedPKs.addKey(pk);
                        includedValues.push(value);
                    }
                }
            }
            switch (op.type) {
                case 'add': {
                    var existingKeys_1 = new RangeSet().addKeys(req.values ? result.map(function (v) { return extractPrimKey(v); }) : result);
                    modifedResult = result.concat(req.values
                        ? includedValues.filter(function (v) {
                            var key = extractPrimKey(v);
                            if (existingKeys_1.hasKey(key))
                                return false;
                            existingKeys_1.addKey(key);
                            return true;
                        })
                        : includedValues
                            .map(function (v) { return extractPrimKey(v); })
                            .filter(function (k) {
                            if (existingKeys_1.hasKey(k))
                                return false;
                            existingKeys_1.addKey(k);
                            return true;
                        }));
                    break;
                }
                case 'put': {
                    var keySet_1 = new RangeSet().addKeys(op.values.map(function (v) { return extractPrimKey(v); }));
                    modifedResult = result
                        .filter(
                    function (item) { return !keySet_1.hasKey(req.values ? extractPrimKey(item) : item); })
                        .concat(
                    req.values
                        ? includedValues
                        : includedValues.map(function (v) { return extractPrimKey(v); }));
                    break;
                }
                case 'delete':
                    var keysToDelete_1 = new RangeSet().addKeys(op.keys);
                    modifedResult = result.filter(function (item) {
                        return !keysToDelete_1.hasKey(req.values ? extractPrimKey(item) : item);
                    });
                    break;
                case 'deleteRange':
                    var range_1 = op.range;
                    modifedResult = result.filter(function (item) { return !isWithinRange(extractPrimKey(item), range_1); });
                    break;
            }
            return modifedResult;
        }, result);
        if (finalResult === result)
            return result;
        finalResult.sort(function (a, b) {
            return cmp(extractLowLevelIndex(a), extractLowLevelIndex(b)) ||
                cmp(extractPrimKey(a), extractPrimKey(b));
        });
        if (req.limit && req.limit < Infinity) {
            if (finalResult.length > req.limit) {
                finalResult.length = req.limit;
            }
            else if (result.length === req.limit && finalResult.length < req.limit) {
                cacheEntry.dirty = true;
            }
        }
        return immutable ? Object.freeze(finalResult) : finalResult;
    }

    function areRangesEqual(r1, r2) {
        return (cmp(r1.lower, r2.lower) === 0 &&
            cmp(r1.upper, r2.upper) === 0 &&
            !!r1.lowerOpen === !!r2.lowerOpen &&
            !!r1.upperOpen === !!r2.upperOpen);
    }

    function compareLowers(lower1, lower2, lowerOpen1, lowerOpen2) {
        if (lower1 === undefined)
            return lower2 !== undefined ? -1 : 0;
        if (lower2 === undefined)
            return 1;
        var c = cmp(lower1, lower2);
        if (c === 0) {
            if (lowerOpen1 && lowerOpen2)
                return 0;
            if (lowerOpen1)
                return 1;
            if (lowerOpen2)
                return -1;
        }
        return c;
    }
    function compareUppers(upper1, upper2, upperOpen1, upperOpen2) {
        if (upper1 === undefined)
            return upper2 !== undefined ? 1 : 0;
        if (upper2 === undefined)
            return -1;
        var c = cmp(upper1, upper2);
        if (c === 0) {
            if (upperOpen1 && upperOpen2)
                return 0;
            if (upperOpen1)
                return -1;
            if (upperOpen2)
                return 1;
        }
        return c;
    }
    function isSuperRange(r1, r2) {
        return (compareLowers(r1.lower, r2.lower, r1.lowerOpen, r2.lowerOpen) <= 0 &&
            compareUppers(r1.upper, r2.upper, r1.upperOpen, r2.upperOpen) >= 0);
    }

    function findCompatibleQuery(dbName, tableName, type, req) {
        var tblCache = cache["idb://".concat(dbName, "/").concat(tableName)];
        if (!tblCache)
            return [];
        var queries = tblCache.queries[type];
        if (!queries)
            return [null, false, tblCache, null];
        var indexName = req.query ? req.query.index.name : null;
        var entries = queries[indexName || ''];
        if (!entries)
            return [null, false, tblCache, null];
        switch (type) {
            case 'query':
                var equalEntry = entries.find(function (entry) {
                    return entry.req.limit === req.limit &&
                        entry.req.values === req.values &&
                        areRangesEqual(entry.req.query.range, req.query.range);
                });
                if (equalEntry)
                    return [
                        equalEntry,
                        true,
                        tblCache,
                        entries,
                    ];
                var superEntry = entries.find(function (entry) {
                    var limit = 'limit' in entry.req ? entry.req.limit : Infinity;
                    return (limit >= req.limit &&
                        (req.values ? entry.req.values : true) &&
                        isSuperRange(entry.req.query.range, req.query.range));
                });
                return [superEntry, false, tblCache, entries];
            case 'count':
                var countQuery = entries.find(function (entry) {
                    return areRangesEqual(entry.req.query.range, req.query.range);
                });
                return [countQuery, !!countQuery, tblCache, entries];
        }
    }

    function subscribeToCacheEntry(cacheEntry, container, requery, signal) {
        cacheEntry.subscribers.add(requery);
        signal.addEventListener("abort", function () {
            cacheEntry.subscribers.delete(requery);
            if (cacheEntry.subscribers.size === 0) {
                enqueForDeletion(cacheEntry, container);
            }
        });
    }
    function enqueForDeletion(cacheEntry, container) {
        setTimeout(function () {
            if (cacheEntry.subscribers.size === 0) {
                delArrayItem(container, cacheEntry);
            }
        }, 3000);
    }

    var cacheMiddleware = {
        stack: 'dbcore',
        level: 0,
        name: 'Cache',
        create: function (core) {
            var dbName = core.schema.name;
            var coreMW = __assign(__assign({}, core), { transaction: function (stores, mode, options) {
                    var idbtrans = core.transaction(stores, mode, options);
                    if (mode === 'readwrite') {
                        var ac_1 = new AbortController();
                        var signal = ac_1.signal;
                        var endTransaction = function (wasCommitted) { return function () {
                            ac_1.abort();
                            if (mode === 'readwrite') {
                                var affectedSubscribers_1 = new Set();
                                for (var _i = 0, stores_1 = stores; _i < stores_1.length; _i++) {
                                    var storeName = stores_1[_i];
                                    var tblCache = cache["idb://".concat(dbName, "/").concat(storeName)];
                                    if (tblCache) {
                                        var table = core.table(storeName);
                                        var ops = tblCache.optimisticOps.filter(function (op) { return op.trans === idbtrans; });
                                        if (idbtrans._explicit && wasCommitted && idbtrans.mutatedParts) {
                                            for (var _a = 0, _b = Object.values(tblCache.queries.query); _a < _b.length; _a++) {
                                                var entries = _b[_a];
                                                for (var _c = 0, _d = entries.slice(); _c < _d.length; _c++) {
                                                    var entry = _d[_c];
                                                    if (obsSetsOverlap(entry.obsSet, idbtrans.mutatedParts)) {
                                                        delArrayItem(entries, entry);
                                                        entry.subscribers.forEach(function (requery) { return affectedSubscribers_1.add(requery); });
                                                    }
                                                }
                                            }
                                        }
                                        else if (ops.length > 0) {
                                            tblCache.optimisticOps = tblCache.optimisticOps.filter(function (op) { return op.trans !== idbtrans; });
                                            for (var _e = 0, _f = Object.values(tblCache.queries.query); _e < _f.length; _e++) {
                                                var entries = _f[_e];
                                                for (var _g = 0, _h = entries.slice(); _g < _h.length; _g++) {
                                                    var entry = _h[_g];
                                                    if (entry.res != null &&
                                                        idbtrans.mutatedParts
    ) {
                                                        if (wasCommitted && !entry.dirty) {
                                                            var freezeResults = Object.isFrozen(entry.res);
                                                            var modRes = applyOptimisticOps(entry.res, entry.req, ops, table, entry, freezeResults);
                                                            if (entry.dirty) {
                                                                delArrayItem(entries, entry);
                                                                entry.subscribers.forEach(function (requery) { return affectedSubscribers_1.add(requery); });
                                                            }
                                                            else if (modRes !== entry.res) {
                                                                entry.res = modRes;
                                                                entry.promise = DexiePromise.resolve({ result: modRes });
                                                            }
                                                        }
                                                        else {
                                                            if (entry.dirty) {
                                                                delArrayItem(entries, entry);
                                                            }
                                                            entry.subscribers.forEach(function (requery) { return affectedSubscribers_1.add(requery); });
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                affectedSubscribers_1.forEach(function (requery) { return requery(); });
                            }
                        }; };
                        idbtrans.addEventListener('abort', endTransaction(false), {
                            signal: signal,
                        });
                        idbtrans.addEventListener('error', endTransaction(false), {
                            signal: signal,
                        });
                        idbtrans.addEventListener('complete', endTransaction(true), {
                            signal: signal,
                        });
                    }
                    return idbtrans;
                }, table: function (tableName) {
                    var downTable = core.table(tableName);
                    var primKey = downTable.schema.primaryKey;
                    var tableMW = __assign(__assign({}, downTable), { mutate: function (req) {
                            var trans = PSD.trans;
                            if (primKey.outbound ||
                                trans.db._options.cache === 'disabled' ||
                                trans.explicit ||
                                trans.idbtrans.mode !== 'readwrite'
                            ) {
                                return downTable.mutate(req);
                            }
                            var tblCache = cache["idb://".concat(dbName, "/").concat(tableName)];
                            if (!tblCache)
                                return downTable.mutate(req);
                            var promise = downTable.mutate(req);
                            if ((req.type === 'add' || req.type === 'put') && (req.values.length >= 50 || getEffectiveKeys(primKey, req).some(function (key) { return key == null; }))) {
                                promise.then(function (res) {
                                    var reqWithResolvedKeys = __assign(__assign({}, req), { values: req.values.map(function (value, i) {
                                            var _a;
                                            if (res.failures[i])
                                                return value;
                                            var valueWithKey = ((_a = primKey.keyPath) === null || _a === void 0 ? void 0 : _a.includes('.'))
                                                ? deepClone(value)
                                                : __assign({}, value);
                                            setByKeyPath(valueWithKey, primKey.keyPath, res.results[i]);
                                            return valueWithKey;
                                        }) });
                                    var adjustedReq = adjustOptimisticFromFailures(tblCache, reqWithResolvedKeys, res);
                                    tblCache.optimisticOps.push(adjustedReq);
                                    queueMicrotask(function () { return req.mutatedParts && signalSubscribersLazily(req.mutatedParts); });
                                });
                            }
                            else {
                                tblCache.optimisticOps.push(req);
                                req.mutatedParts && signalSubscribersLazily(req.mutatedParts);
                                promise.then(function (res) {
                                    if (res.numFailures > 0) {
                                        delArrayItem(tblCache.optimisticOps, req);
                                        var adjustedReq = adjustOptimisticFromFailures(tblCache, req, res);
                                        if (adjustedReq) {
                                            tblCache.optimisticOps.push(adjustedReq);
                                        }
                                        req.mutatedParts && signalSubscribersLazily(req.mutatedParts);
                                    }
                                });
                                promise.catch(function () {
                                    delArrayItem(tblCache.optimisticOps, req);
                                    req.mutatedParts && signalSubscribersLazily(req.mutatedParts);
                                });
                            }
                            return promise;
                        }, query: function (req) {
                            var _a;
                            if (!isCachableContext(PSD, downTable) || !isCachableRequest("query", req))
                                return downTable.query(req);
                            var freezeResults = ((_a = PSD.trans) === null || _a === void 0 ? void 0 : _a.db._options.cache) === 'immutable';
                            var _b = PSD, requery = _b.requery, signal = _b.signal;
                            var _c = findCompatibleQuery(dbName, tableName, 'query', req), cacheEntry = _c[0], exactMatch = _c[1], tblCache = _c[2], container = _c[3];
                            if (cacheEntry && exactMatch) {
                                cacheEntry.obsSet = req.obsSet;
                            }
                            else {
                                var promise = downTable.query(req).then(function (res) {
                                    var result = res.result;
                                    if (cacheEntry)
                                        cacheEntry.res = result;
                                    if (freezeResults) {
                                        for (var i = 0, l = result.length; i < l; ++i) {
                                            Object.freeze(result[i]);
                                        }
                                        Object.freeze(result);
                                    }
                                    else {
                                        res.result = deepClone(result);
                                    }
                                    return res;
                                }).catch(function (error) {
                                    if (container && cacheEntry)
                                        delArrayItem(container, cacheEntry);
                                    return Promise.reject(error);
                                });
                                cacheEntry = {
                                    obsSet: req.obsSet,
                                    promise: promise,
                                    subscribers: new Set(),
                                    type: 'query',
                                    req: req,
                                    dirty: false,
                                };
                                if (container) {
                                    container.push(cacheEntry);
                                }
                                else {
                                    container = [cacheEntry];
                                    if (!tblCache) {
                                        tblCache = cache["idb://".concat(dbName, "/").concat(tableName)] = {
                                            queries: {
                                                query: {},
                                                count: {},
                                            },
                                            objs: new Map(),
                                            optimisticOps: [],
                                            unsignaledParts: {}
                                        };
                                    }
                                    tblCache.queries.query[req.query.index.name || ''] = container;
                                }
                            }
                            subscribeToCacheEntry(cacheEntry, container, requery, signal);
                            return cacheEntry.promise.then(function (res) {
                                return {
                                    result: applyOptimisticOps(res.result, req, tblCache === null || tblCache === void 0 ? void 0 : tblCache.optimisticOps, downTable, cacheEntry, freezeResults),
                                };
                            });
                        } });
                    return tableMW;
                } });
            return coreMW;
        },
    };

    function vipify(target, vipDb) {
        return new Proxy(target, {
            get: function (target, prop, receiver) {
                if (prop === 'db')
                    return vipDb;
                return Reflect.get(target, prop, receiver);
            }
        });
    }

    var Dexie$1 =  (function () {
        function Dexie(name, options) {
            var _this = this;
            this._middlewares = {};
            this.verno = 0;
            var deps = Dexie.dependencies;
            this._options = options = __assign({
                addons: Dexie.addons, autoOpen: true,
                indexedDB: deps.indexedDB, IDBKeyRange: deps.IDBKeyRange, cache: 'cloned' }, options);
            this._deps = {
                indexedDB: options.indexedDB,
                IDBKeyRange: options.IDBKeyRange
            };
            var addons = options.addons;
            this._dbSchema = {};
            this._versions = [];
            this._storeNames = [];
            this._allTables = {};
            this.idbdb = null;
            this._novip = this;
            var state = {
                dbOpenError: null,
                isBeingOpened: false,
                onReadyBeingFired: null,
                openComplete: false,
                dbReadyResolve: nop,
                dbReadyPromise: null,
                cancelOpen: nop,
                openCanceller: null,
                autoSchema: true,
                PR1398_maxLoop: 3,
                autoOpen: options.autoOpen,
            };
            state.dbReadyPromise = new DexiePromise(function (resolve) {
                state.dbReadyResolve = resolve;
            });
            state.openCanceller = new DexiePromise(function (_, reject) {
                state.cancelOpen = reject;
            });
            this._state = state;
            this.name = name;
            this.on = Events(this, "populate", "blocked", "versionchange", "close", { ready: [promisableChain, nop] });
            this.on.ready.subscribe = override(this.on.ready.subscribe, function (subscribe) {
                return function (subscriber, bSticky) {
                    Dexie.vip(function () {
                        var state = _this._state;
                        if (state.openComplete) {
                            if (!state.dbOpenError)
                                DexiePromise.resolve().then(subscriber);
                            if (bSticky)
                                subscribe(subscriber);
                        }
                        else if (state.onReadyBeingFired) {
                            state.onReadyBeingFired.push(subscriber);
                            if (bSticky)
                                subscribe(subscriber);
                        }
                        else {
                            subscribe(subscriber);
                            var db_1 = _this;
                            if (!bSticky)
                                subscribe(function unsubscribe() {
                                    db_1.on.ready.unsubscribe(subscriber);
                                    db_1.on.ready.unsubscribe(unsubscribe);
                                });
                        }
                    });
                };
            });
            this.Collection = createCollectionConstructor(this);
            this.Table = createTableConstructor(this);
            this.Transaction = createTransactionConstructor(this);
            this.Version = createVersionConstructor(this);
            this.WhereClause = createWhereClauseConstructor(this);
            this.on("versionchange", function (ev) {
                if (ev.newVersion > 0)
                    console.warn("Another connection wants to upgrade database '".concat(_this.name, "'. Closing db now to resume the upgrade."));
                else
                    console.warn("Another connection wants to delete database '".concat(_this.name, "'. Closing db now to resume the delete request."));
                _this.close({ disableAutoOpen: false });
            });
            this.on("blocked", function (ev) {
                if (!ev.newVersion || ev.newVersion < ev.oldVersion)
                    console.warn("Dexie.delete('".concat(_this.name, "') was blocked"));
                else
                    console.warn("Upgrade '".concat(_this.name, "' blocked by other connection holding version ").concat(ev.oldVersion / 10));
            });
            this._maxKey = getMaxKey(options.IDBKeyRange);
            this._createTransaction = function (mode, storeNames, dbschema, parentTransaction) { return new _this.Transaction(mode, storeNames, dbschema, _this._options.chromeTransactionDurability, parentTransaction); };
            this._fireOnBlocked = function (ev) {
                _this.on("blocked").fire(ev);
                connections
                    .filter(function (c) { return c.name === _this.name && c !== _this && !c._state.vcFired; })
                    .map(function (c) { return c.on("versionchange").fire(ev); });
            };
            this.use(cacheExistingValuesMiddleware);
            this.use(cacheMiddleware);
            this.use(observabilityMiddleware);
            this.use(virtualIndexMiddleware);
            this.use(hooksMiddleware);
            var vipDB = new Proxy(this, {
                get: function (_, prop, receiver) {
                    if (prop === '_vip')
                        return true;
                    if (prop === 'table')
                        return function (tableName) { return vipify(_this.table(tableName), vipDB); };
                    var rv = Reflect.get(_, prop, receiver);
                    if (rv instanceof Table)
                        return vipify(rv, vipDB);
                    if (prop === 'tables')
                        return rv.map(function (t) { return vipify(t, vipDB); });
                    if (prop === '_createTransaction')
                        return function () {
                            var tx = rv.apply(this, arguments);
                            return vipify(tx, vipDB);
                        };
                    return rv;
                }
            });
            this.vip = vipDB;
            addons.forEach(function (addon) { return addon(_this); });
        }
        Dexie.prototype.version = function (versionNumber) {
            if (isNaN(versionNumber) || versionNumber < 0.1)
                throw new exceptions.Type("Given version is not a positive number");
            versionNumber = Math.round(versionNumber * 10) / 10;
            if (this.idbdb || this._state.isBeingOpened)
                throw new exceptions.Schema("Cannot add version when database is open");
            this.verno = Math.max(this.verno, versionNumber);
            var versions = this._versions;
            var versionInstance = versions.filter(function (v) { return v._cfg.version === versionNumber; })[0];
            if (versionInstance)
                return versionInstance;
            versionInstance = new this.Version(versionNumber);
            versions.push(versionInstance);
            versions.sort(lowerVersionFirst);
            versionInstance.stores({});
            this._state.autoSchema = false;
            return versionInstance;
        };
        Dexie.prototype._whenReady = function (fn) {
            var _this = this;
            return (this.idbdb && (this._state.openComplete || PSD.letThrough || this._vip)) ? fn() : new DexiePromise(function (resolve, reject) {
                if (_this._state.openComplete) {
                    return reject(new exceptions.DatabaseClosed(_this._state.dbOpenError));
                }
                if (!_this._state.isBeingOpened) {
                    if (!_this._state.autoOpen) {
                        reject(new exceptions.DatabaseClosed());
                        return;
                    }
                    _this.open().catch(nop);
                }
                _this._state.dbReadyPromise.then(resolve, reject);
            }).then(fn);
        };
        Dexie.prototype.use = function (_a) {
            var stack = _a.stack, create = _a.create, level = _a.level, name = _a.name;
            if (name)
                this.unuse({ stack: stack, name: name });
            var middlewares = this._middlewares[stack] || (this._middlewares[stack] = []);
            middlewares.push({ stack: stack, create: create, level: level == null ? 10 : level, name: name });
            middlewares.sort(function (a, b) { return a.level - b.level; });
            return this;
        };
        Dexie.prototype.unuse = function (_a) {
            var stack = _a.stack, name = _a.name, create = _a.create;
            if (stack && this._middlewares[stack]) {
                this._middlewares[stack] = this._middlewares[stack].filter(function (mw) {
                    return create ? mw.create !== create :
                        name ? mw.name !== name :
                            false;
                });
            }
            return this;
        };
        Dexie.prototype.open = function () {
            var _this = this;
            return usePSD(globalPSD,
            function () { return dexieOpen(_this); });
        };
        Dexie.prototype._close = function () {
            var state = this._state;
            var idx = connections.indexOf(this);
            if (idx >= 0)
                connections.splice(idx, 1);
            if (this.idbdb) {
                try {
                    this.idbdb.close();
                }
                catch (e) { }
                this.idbdb = null;
            }
            if (!state.isBeingOpened) {
                state.dbReadyPromise = new DexiePromise(function (resolve) {
                    state.dbReadyResolve = resolve;
                });
                state.openCanceller = new DexiePromise(function (_, reject) {
                    state.cancelOpen = reject;
                });
            }
        };
        Dexie.prototype.close = function (_a) {
            var _b = _a === void 0 ? { disableAutoOpen: true } : _a, disableAutoOpen = _b.disableAutoOpen;
            var state = this._state;
            if (disableAutoOpen) {
                if (state.isBeingOpened) {
                    state.cancelOpen(new exceptions.DatabaseClosed());
                }
                this._close();
                state.autoOpen = false;
                state.dbOpenError = new exceptions.DatabaseClosed();
            }
            else {
                this._close();
                state.autoOpen = this._options.autoOpen ||
                    state.isBeingOpened;
                state.openComplete = false;
                state.dbOpenError = null;
            }
        };
        Dexie.prototype.delete = function (closeOptions) {
            var _this = this;
            if (closeOptions === void 0) { closeOptions = { disableAutoOpen: true }; }
            var hasInvalidArguments = arguments.length > 0 && typeof arguments[0] !== 'object';
            var state = this._state;
            return new DexiePromise(function (resolve, reject) {
                var doDelete = function () {
                    _this.close(closeOptions);
                    var req = _this._deps.indexedDB.deleteDatabase(_this.name);
                    req.onsuccess = wrap(function () {
                        _onDatabaseDeleted(_this._deps, _this.name);
                        resolve();
                    });
                    req.onerror = eventRejectHandler(reject);
                    req.onblocked = _this._fireOnBlocked;
                };
                if (hasInvalidArguments)
                    throw new exceptions.InvalidArgument("Invalid closeOptions argument to db.delete()");
                if (state.isBeingOpened) {
                    state.dbReadyPromise.then(doDelete);
                }
                else {
                    doDelete();
                }
            });
        };
        Dexie.prototype.backendDB = function () {
            return this.idbdb;
        };
        Dexie.prototype.isOpen = function () {
            return this.idbdb !== null;
        };
        Dexie.prototype.hasBeenClosed = function () {
            var dbOpenError = this._state.dbOpenError;
            return dbOpenError && (dbOpenError.name === 'DatabaseClosed');
        };
        Dexie.prototype.hasFailed = function () {
            return this._state.dbOpenError !== null;
        };
        Dexie.prototype.dynamicallyOpened = function () {
            return this._state.autoSchema;
        };
        Object.defineProperty(Dexie.prototype, "tables", {
            get: function () {
                var _this = this;
                return keys(this._allTables).map(function (name) { return _this._allTables[name]; });
            },
            enumerable: false,
            configurable: true
        });
        Dexie.prototype.transaction = function () {
            var args = extractTransactionArgs.apply(this, arguments);
            return this._transaction.apply(this, args);
        };
        Dexie.prototype._transaction = function (mode, tables, scopeFunc) {
            var _this = this;
            var parentTransaction = PSD.trans;
            if (!parentTransaction || parentTransaction.db !== this || mode.indexOf('!') !== -1)
                parentTransaction = null;
            var onlyIfCompatible = mode.indexOf('?') !== -1;
            mode = mode.replace('!', '').replace('?', '');
            var idbMode, storeNames;
            try {
                storeNames = tables.map(function (table) {
                    var storeName = table instanceof _this.Table ? table.name : table;
                    if (typeof storeName !== 'string')
                        throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
                    return storeName;
                });
                if (mode == "r" || mode === READONLY)
                    idbMode = READONLY;
                else if (mode == "rw" || mode == READWRITE)
                    idbMode = READWRITE;
                else
                    throw new exceptions.InvalidArgument("Invalid transaction mode: " + mode);
                if (parentTransaction) {
                    if (parentTransaction.mode === READONLY && idbMode === READWRITE) {
                        if (onlyIfCompatible) {
                            parentTransaction = null;
                        }
                        else
                            throw new exceptions.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
                    }
                    if (parentTransaction) {
                        storeNames.forEach(function (storeName) {
                            if (parentTransaction && parentTransaction.storeNames.indexOf(storeName) === -1) {
                                if (onlyIfCompatible) {
                                    parentTransaction = null;
                                }
                                else
                                    throw new exceptions.SubTransaction("Table " + storeName +
                                        " not included in parent transaction.");
                            }
                        });
                    }
                    if (onlyIfCompatible && parentTransaction && !parentTransaction.active) {
                        parentTransaction = null;
                    }
                }
            }
            catch (e) {
                return parentTransaction ?
                    parentTransaction._promise(null, function (_, reject) { reject(e); }) :
                    rejection(e);
            }
            var enterTransaction = enterTransactionScope.bind(null, this, idbMode, storeNames, parentTransaction, scopeFunc);
            return (parentTransaction ?
                parentTransaction._promise(idbMode, enterTransaction, "lock") :
                PSD.trans ?
                    usePSD(PSD.transless, function () { return _this._whenReady(enterTransaction); }) :
                    this._whenReady(enterTransaction));
        };
        Dexie.prototype.table = function (tableName) {
            if (!hasOwn(this._allTables, tableName)) {
                throw new exceptions.InvalidTable("Table ".concat(tableName, " does not exist"));
            }
            return this._allTables[tableName];
        };
        return Dexie;
    }());

    var symbolObservable = typeof Symbol !== "undefined" && "observable" in Symbol
        ? Symbol.observable
        : "@@observable";
    var Observable =  (function () {
        function Observable(subscribe) {
            this._subscribe = subscribe;
        }
        Observable.prototype.subscribe = function (x, error, complete) {
            return this._subscribe(!x || typeof x === "function" ? { next: x, error: error, complete: complete } : x);
        };
        Observable.prototype[symbolObservable] = function () {
            return this;
        };
        return Observable;
    }());

    var domDeps;
    try {
        domDeps = {
            indexedDB: _global.indexedDB || _global.mozIndexedDB || _global.webkitIndexedDB || _global.msIndexedDB,
            IDBKeyRange: _global.IDBKeyRange || _global.webkitIDBKeyRange
        };
    }
    catch (e) {
        domDeps = { indexedDB: null, IDBKeyRange: null };
    }

    function liveQuery(querier) {
        var hasValue = false;
        var currentValue;
        var observable = new Observable(function (observer) {
            var scopeFuncIsAsync = isAsyncFunction(querier);
            function execute(ctx) {
                var wasRootExec = beginMicroTickScope();
                try {
                    if (scopeFuncIsAsync) {
                        incrementExpectedAwaits();
                    }
                    var rv = newScope(querier, ctx);
                    if (scopeFuncIsAsync) {
                        rv = rv.finally(decrementExpectedAwaits);
                    }
                    return rv;
                }
                finally {
                    wasRootExec && endMicroTickScope();
                }
            }
            var closed = false;
            var abortController;
            var accumMuts = {};
            var currentObs = {};
            var subscription = {
                get closed() {
                    return closed;
                },
                unsubscribe: function () {
                    if (closed)
                        return;
                    closed = true;
                    if (abortController)
                        abortController.abort();
                    if (startedListening)
                        globalEvents.storagemutated.unsubscribe(mutationListener);
                },
            };
            observer.start && observer.start(subscription);
            var startedListening = false;
            var doQuery = function () { return execInGlobalContext(_doQuery); };
            function shouldNotify() {
                return obsSetsOverlap(currentObs, accumMuts);
            }
            var mutationListener = function (parts) {
                extendObservabilitySet(accumMuts, parts);
                if (shouldNotify()) {
                    doQuery();
                }
            };
            var _doQuery = function () {
                if (closed ||
                    !domDeps.indexedDB)
                 {
                    return;
                }
                accumMuts = {};
                var subscr = {};
                if (abortController)
                    abortController.abort();
                abortController = new AbortController();
                var ctx = {
                    subscr: subscr,
                    signal: abortController.signal,
                    requery: doQuery,
                    querier: querier,
                    trans: null
                };
                var ret = execute(ctx);
                Promise.resolve(ret).then(function (result) {
                    hasValue = true;
                    currentValue = result;
                    if (closed || ctx.signal.aborted) {
                        return;
                    }
                    accumMuts = {};
                    currentObs = subscr;
                    if (!objectIsEmpty(currentObs) && !startedListening) {
                        globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, mutationListener);
                        startedListening = true;
                    }
                    execInGlobalContext(function () { return !closed && observer.next && observer.next(result); });
                }, function (err) {
                    hasValue = false;
                    if (!['DatabaseClosedError', 'AbortError'].includes(err === null || err === void 0 ? void 0 : err.name)) {
                        if (!closed)
                            execInGlobalContext(function () {
                                if (closed)
                                    return;
                                observer.error && observer.error(err);
                            });
                    }
                });
            };
            setTimeout(doQuery, 0);
            return subscription;
        });
        observable.hasValue = function () { return hasValue; };
        observable.getValue = function () { return currentValue; };
        return observable;
    }

    var Dexie = Dexie$1;
    props(Dexie, __assign(__assign({}, fullNameExceptions), {
        delete: function (databaseName) {
            var db = new Dexie(databaseName, { addons: [] });
            return db.delete();
        },
        exists: function (name) {
            return new Dexie(name, { addons: [] }).open().then(function (db) {
                db.close();
                return true;
            }).catch('NoSuchDatabaseError', function () { return false; });
        },
        getDatabaseNames: function (cb) {
            try {
                return getDatabaseNames(Dexie.dependencies).then(cb);
            }
            catch (_a) {
                return rejection(new exceptions.MissingAPI());
            }
        },
        defineClass: function () {
            function Class(content) {
                extend(this, content);
            }
            return Class;
        }, ignoreTransaction: function (scopeFunc) {
            return PSD.trans ?
                usePSD(PSD.transless, scopeFunc) :
                scopeFunc();
        }, vip: vip, async: function (generatorFn) {
            return function () {
                try {
                    var rv = awaitIterator(generatorFn.apply(this, arguments));
                    if (!rv || typeof rv.then !== 'function')
                        return DexiePromise.resolve(rv);
                    return rv;
                }
                catch (e) {
                    return rejection(e);
                }
            };
        }, spawn: function (generatorFn, args, thiz) {
            try {
                var rv = awaitIterator(generatorFn.apply(thiz, args || []));
                if (!rv || typeof rv.then !== 'function')
                    return DexiePromise.resolve(rv);
                return rv;
            }
            catch (e) {
                return rejection(e);
            }
        },
        currentTransaction: {
            get: function () { return PSD.trans || null; }
        }, waitFor: function (promiseOrFunction, optionalTimeout) {
            var promise = DexiePromise.resolve(typeof promiseOrFunction === 'function' ?
                Dexie.ignoreTransaction(promiseOrFunction) :
                promiseOrFunction)
                .timeout(optionalTimeout || 60000);
            return PSD.trans ?
                PSD.trans.waitFor(promise) :
                promise;
        },
        Promise: DexiePromise,
        debug: {
            get: function () { return debug; },
            set: function (value) {
                setDebug(value);
            }
        },
        derive: derive, extend: extend, props: props, override: override,
        Events: Events, on: globalEvents, liveQuery: liveQuery, extendObservabilitySet: extendObservabilitySet,
        getByKeyPath: getByKeyPath, setByKeyPath: setByKeyPath, delByKeyPath: delByKeyPath, shallowClone: shallowClone, deepClone: deepClone, getObjectDiff: getObjectDiff, cmp: cmp, asap: asap$1,
        minKey: minKey,
        addons: [],
        connections: connections,
        errnames: errnames,
        dependencies: domDeps, cache: cache,
        semVer: DEXIE_VERSION, version: DEXIE_VERSION.split('.')
            .map(function (n) { return parseInt(n); })
            .reduce(function (p, c, i) { return p + (c / Math.pow(10, i * 2)); }) }));
    Dexie.maxKey = getMaxKey(Dexie.dependencies.IDBKeyRange);

    if (typeof dispatchEvent !== 'undefined' && typeof addEventListener !== 'undefined') {
        globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, function (updatedParts) {
            if (!propagatingLocally) {
                var event_1;
                event_1 = new CustomEvent(STORAGE_MUTATED_DOM_EVENT_NAME, {
                    detail: updatedParts
                });
                propagatingLocally = true;
                dispatchEvent(event_1);
                propagatingLocally = false;
            }
        });
        addEventListener(STORAGE_MUTATED_DOM_EVENT_NAME, function (_a) {
            var detail = _a.detail;
            if (!propagatingLocally) {
                propagateLocally(detail);
            }
        });
    }
    function propagateLocally(updateParts) {
        var wasMe = propagatingLocally;
        try {
            propagatingLocally = true;
            globalEvents.storagemutated.fire(updateParts);
            signalSubscribersNow(updateParts, true);
        }
        finally {
            propagatingLocally = wasMe;
        }
    }
    var propagatingLocally = false;

    var bc;
    var createBC = function () { };
    if (typeof BroadcastChannel !== 'undefined') {
        createBC = function () {
            bc = new BroadcastChannel(STORAGE_MUTATED_DOM_EVENT_NAME);
            bc.onmessage = function (ev) { return ev.data && propagateLocally(ev.data); };
        };
        createBC();
        if (typeof bc.unref === 'function') {
            bc.unref();
        }
        globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, function (changedParts) {
            if (!propagatingLocally) {
                bc.postMessage(changedParts);
            }
        });
    }

    if (typeof addEventListener !== 'undefined') {
        addEventListener('pagehide', function (event) {
            if (!Dexie$1.disableBfCache && event.persisted) {
                if (debug)
                    console.debug('Dexie: handling persisted pagehide');
                bc === null || bc === void 0 ? void 0 : bc.close();
                for (var _i = 0, connections_1 = connections; _i < connections_1.length; _i++) {
                    var db = connections_1[_i];
                    db.close({ disableAutoOpen: false });
                }
            }
        });
        addEventListener('pageshow', function (event) {
            if (!Dexie$1.disableBfCache && event.persisted) {
                if (debug)
                    console.debug('Dexie: handling persisted pageshow');
                createBC();
                propagateLocally({ all: new RangeSet(-Infinity, [[]]) });
            }
        });
    }

    function add(value) {
        return new PropModification({ add: value });
    }

    function remove(value) {
        return new PropModification({ remove: value });
    }

    function replacePrefix(a, b) {
        return new PropModification({ replacePrefix: [a, b] });
    }

    DexiePromise.rejectionMapper = mapError;
    setDebug(debug);

    var namedExports = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Dexie: Dexie$1,
        liveQuery: liveQuery,
        Entity: Entity,
        cmp: cmp,
        PropModification: PropModification,
        replacePrefix: replacePrefix,
        add: add,
        remove: remove,
        'default': Dexie$1,
        RangeSet: RangeSet,
        mergeRanges: mergeRanges,
        rangesOverlap: rangesOverlap
    });

    __assign(Dexie$1, namedExports, { default: Dexie$1 });

    return Dexie$1;

}));
//# sourceMappingURL=dexie.js.map


/***/ }),

/***/ "./src/mokku-web-app-connector/db.ts":
/*!*******************************************!*\
  !*** ./src/mokku-web-app-connector/db.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.db = void 0;
const dexie_1 = __importDefault(__webpack_require__(/*! dexie */ "./node_modules/dexie/import-wrapper.mjs"));
const localDb = new dexie_1.default("FriendsDatabase");
// Schema declaration:
localDb.version(1).stores({
    mocks: "++localId, [url+method]", // primary key "id" (for the runtime!)
});
const getDynamicUrlPatterns = () => {
    return localDb.mocks
        .where({ dynamic: true, mocked: true }) // Only active dynamic mocks
        .toArray()
        .then((mocks) => mocks.map((mock) => ({
        localId: mock.localId,
        urlPattern: mock.url,
    })));
};
const findStaticMock = (url, method) => __awaiter(void 0, void 0, void 0, function* () {
    // Find active, non-dynamic mocks matching the URL
    return localDb.mocks
        .where({ url: url, dynamic: false, mocked: true })
        .first();
});
const findMockById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return localDb.mocks.get(id);
});
exports.db = {
    getDynamicUrlPatterns,
    findStaticMock,
    findMockById,
};


/***/ }),

/***/ "./src/mokku-web-app-connector/service-worker.ts":
/*!*******************************************************!*\
  !*** ./src/mokku-web-app-connector/service-worker.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const db_1 = __webpack_require__(/*! ./db */ "./src/mokku-web-app-connector/db.ts");
let dynamicUrlPatterns = [];
function initializeDynamicUrls() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            dynamicUrlPatterns = yield db_1.db.getDynamicUrlPatterns();
            console.log("Mokku: Dynamic URL patterns loaded:", dynamicUrlPatterns.length);
        }
        catch (error) {
            console.error("Mokku: Error loading dynamic URL patterns:", error);
        }
    });
}
// Initialize on service worker startup
chrome.runtime.onStartup.addListener(() => {
    console.log("Mokku: Service worker started on browser startup.");
    initializeDynamicUrls();
});
// Also initialize when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    console.log("Mokku: Extension installed/updated.");
    initializeDynamicUrls();
});
/**
 * Placeholder for executing a function string.
 * In a real scenario, this would need careful implementation,
 * possibly using an offscreen document for safer execution if DOM/window access is needed,
 * or a sandboxed iframe. For simple data transformation, new Function() might be used
 * with caution.
 */
function executeFunction(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_functionBody, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_request) {
    return __awaiter(this, void 0, void 0, function* () {
        console.warn("Mokku: executeFunction is a placeholder and not fully implemented.");
        // Example: const fn = new Function('request', `return (${functionBody})(request)`);
        // return fn(request);
        return { message: "Function execution placeholder result" };
    });
}
function findMatchingDynamicUrl(url, method) {
    // This is a very basic matcher.
    // For more complex patterns (e.g., /users/:id), you'd need a robust path-to-regexp like library.
    return dynamicUrlPatterns.find((entry) => {
        // Simple exact match for now, or implement your pattern matching logic here
        // Example for wildcard: entry.urlPattern.replace('*', '.*') and use regex
        return entry.urlPattern === url;
    });
}
chrome.runtime.onConnect.addListener((port) => {
    console.log(port.name);
    if (port.name === "mokku-content-script") {
        port.onMessage.addListener((data) => {
            console.log("port: ", data);
            if (data.type === "CHECK_MOCK") {
                (() => __awaiter(void 0, void 0, void 0, function* () {
                    const message = data.message;
                    let mock = undefined;
                    // 1. check for static
                    mock = yield db_1.db.findStaticMock(message.request.url, message.request.method);
                    if (!mock) {
                        // check with dynamic mocks
                        const dynamicMatch = findMatchingDynamicUrl(message.request.url, message.request.method);
                        if (dynamicMatch) {
                            mock = yield db_1.db.findMockById(dynamicMatch.localId);
                        }
                    }
                    if (mock) {
                        //todo: inform the panel
                        if (mock.type === "STATIC") {
                            port.postMessage({ mockResponse: mock });
                        }
                        else if (mock.type === "FUNCTION" && mock.function) {
                            const result = yield executeFunction(mock.function, message.request);
                            port.postMessage({ mockResponse: result });
                        }
                    }
                    else {
                        //todo: inform the panel
                        port.postMessage({ mockResponse: undefined });
                    }
                }))();
            }
        });
    }
});


/***/ }),

/***/ "./node_modules/dexie/import-wrapper.mjs":
/*!***********************************************!*\
  !*** ./node_modules/dexie/import-wrapper.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dexie: () => (/* binding */ Dexie),
/* harmony export */   Entity: () => (/* binding */ Entity),
/* harmony export */   PropModification: () => (/* binding */ PropModification),
/* harmony export */   RangeSet: () => (/* binding */ RangeSet),
/* harmony export */   add: () => (/* binding */ add),
/* harmony export */   cmp: () => (/* binding */ cmp),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   liveQuery: () => (/* binding */ liveQuery),
/* harmony export */   mergeRanges: () => (/* binding */ mergeRanges),
/* harmony export */   rangesOverlap: () => (/* binding */ rangesOverlap),
/* harmony export */   remove: () => (/* binding */ remove),
/* harmony export */   replacePrefix: () => (/* binding */ replacePrefix)
/* harmony export */ });
/* harmony import */ var _dist_dexie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dist/dexie.js */ "./node_modules/dexie/dist/dexie.js");
// Making the module version consumable via require - to prohibit
// multiple occurrancies of the same module in the same app
// (dual package hazard, https://nodejs.org/api/packages.html#dual-package-hazard)

const DexieSymbol = Symbol.for("Dexie");
const Dexie = globalThis[DexieSymbol] || (globalThis[DexieSymbol] = _dist_dexie_js__WEBPACK_IMPORTED_MODULE_0__);
if (_dist_dexie_js__WEBPACK_IMPORTED_MODULE_0__.semVer !== Dexie.semVer) {
    throw new Error(`Two different versions of Dexie loaded in the same app: ${_dist_dexie_js__WEBPACK_IMPORTED_MODULE_0__.semVer} and ${Dexie.semVer}`);
}
const { liveQuery, mergeRanges, rangesOverlap, RangeSet, cmp, Entity,
    PropModification, replacePrefix, add, remove } = Dexie;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dexie);


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./mokku-web-app-connector/service-worker */ "./src/mokku-web-app-connector/service-worker.ts");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBLEtBQUssSUFBSTtBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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LG1CQUFPLENBQUMsaUdBQTBDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTW9ra3UvLi9ub2RlX21vZHVsZXMvZGV4aWUvZGlzdC9kZXhpZS5qcyIsIndlYnBhY2s6Ly9Nb2trdS8uL3NyYy9tb2trdS13ZWItYXBwLWNvbm5lY3Rvci9kYi50cyIsIndlYnBhY2s6Ly9Nb2trdS8uL3NyYy9tb2trdS13ZWItYXBwLWNvbm5lY3Rvci9zZXJ2aWNlLXdvcmtlci50cyIsIndlYnBhY2s6Ly9Nb2trdS8uL25vZGVfbW9kdWxlcy9kZXhpZS9pbXBvcnQtd3JhcHBlci5tanMiLCJ3ZWJwYWNrOi8vTW9ra3Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vTW9ra3Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL01va2t1L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vTW9ra3Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Nb2trdS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL01va2t1Ly4vc3JjL2JhY2tncm91bmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIERleGllLmpzIC0gYSBtaW5pbWFsaXN0aWMgd3JhcHBlciBmb3IgSW5kZXhlZERCXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICpcbiAqIEJ5IERhdmlkIEZhaGxhbmRlciwgZGF2aWQuZmFobGFuZGVyQGdtYWlsLmNvbVxuICpcbiAqIFZlcnNpb24gNC4wLjExLCBXZWQgSmFuIDE1IDIwMjVcbiAqXG4gKiBodHRwczovL2RleGllLm9yZ1xuICpcbiAqIEFwYWNoZSBMaWNlbnNlIFZlcnNpb24gMi4wLCBKYW51YXJ5IDIwMDQsIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9cbiAqL1xuIFxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuRGV4aWUgPSBmYWN0b3J5KCkpO1xufSkodGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG4gICAgUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XG4gICAgcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxuICAgIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcbiAgICBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcbiAgICBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXG4gICAgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXG4gICAgTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcbiAgICBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXG4gICAgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfVxuICAgIHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xuICAgICAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gICAgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xuICAgICAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xuICAgIH1cblxuICAgIHZhciBfZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6XG4gICAgICAgIHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOlxuICAgICAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOlxuICAgICAgICAgICAgICAgIGdsb2JhbDtcblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXM7XG4gICAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuICAgIGlmICh0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcgJiYgIV9nbG9iYWwuUHJvbWlzZSkge1xuICAgICAgICBfZ2xvYmFsLlByb21pc2UgPSBQcm9taXNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBleHRlbmQob2JqLCBleHRlbnNpb24pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBleHRlbnNpb24gIT09ICdvYmplY3QnKVxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAga2V5cyhleHRlbnNpb24pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgb2JqW2tleV0gPSBleHRlbnNpb25ba2V5XTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgICB2YXIgX2hhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuICAgIGZ1bmN0aW9uIGhhc093bihvYmosIHByb3ApIHtcbiAgICAgICAgcmV0dXJuIF9oYXNPd24uY2FsbChvYmosIHByb3ApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwcm9wcyhwcm90bywgZXh0ZW5zaW9uKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZXh0ZW5zaW9uID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgZXh0ZW5zaW9uID0gZXh0ZW5zaW9uKGdldFByb3RvKHByb3RvKSk7XG4gICAgICAgICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiA/IGtleXMgOiBSZWZsZWN0Lm93bktleXMpKGV4dGVuc2lvbikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBzZXRQcm9wKHByb3RvLCBrZXksIGV4dGVuc2lvbltrZXldKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbiAgICBmdW5jdGlvbiBzZXRQcm9wKG9iaiwgcHJvcCwgZnVuY3Rpb25PckdldFNldCwgb3B0aW9ucykge1xuICAgICAgICBkZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIGV4dGVuZChmdW5jdGlvbk9yR2V0U2V0ICYmIGhhc093bihmdW5jdGlvbk9yR2V0U2V0LCBcImdldFwiKSAmJiB0eXBlb2YgZnVuY3Rpb25PckdldFNldC5nZXQgPT09ICdmdW5jdGlvbicgP1xuICAgICAgICAgICAgeyBnZXQ6IGZ1bmN0aW9uT3JHZXRTZXQuZ2V0LCBzZXQ6IGZ1bmN0aW9uT3JHZXRTZXQuc2V0LCBjb25maWd1cmFibGU6IHRydWUgfSA6XG4gICAgICAgICAgICB7IHZhbHVlOiBmdW5jdGlvbk9yR2V0U2V0LCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0sIG9wdGlvbnMpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZGVyaXZlKENoaWxkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmcm9tOiBmdW5jdGlvbiAoUGFyZW50KSB7XG4gICAgICAgICAgICAgICAgQ2hpbGQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYXJlbnQucHJvdG90eXBlKTtcbiAgICAgICAgICAgICAgICBzZXRQcm9wKENoaWxkLnByb3RvdHlwZSwgXCJjb25zdHJ1Y3RvclwiLCBDaGlsZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5kOiBwcm9wcy5iaW5kKG51bGwsIENoaWxkLnByb3RvdHlwZSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgICBmdW5jdGlvbiBnZXRQcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBwcm9wKSB7XG4gICAgICAgIHZhciBwZCA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIHByb3ApO1xuICAgICAgICB2YXIgcHJvdG87XG4gICAgICAgIHJldHVybiBwZCB8fCAocHJvdG8gPSBnZXRQcm90byhvYmopKSAmJiBnZXRQcm9wZXJ0eURlc2NyaXB0b3IocHJvdG8sIHByb3ApO1xuICAgIH1cbiAgICB2YXIgX3NsaWNlID0gW10uc2xpY2U7XG4gICAgZnVuY3Rpb24gc2xpY2UoYXJncywgc3RhcnQsIGVuZCkge1xuICAgICAgICByZXR1cm4gX3NsaWNlLmNhbGwoYXJncywgc3RhcnQsIGVuZCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG92ZXJyaWRlKG9yaWdGdW5jLCBvdmVycmlkZWRGYWN0b3J5KSB7XG4gICAgICAgIHJldHVybiBvdmVycmlkZWRGYWN0b3J5KG9yaWdGdW5jKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXNzZXJ0KGIpIHtcbiAgICAgICAgaWYgKCFiKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXNzZXJ0aW9uIEZhaWxlZFwiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXNhcCQxKGZuKSB7XG4gICAgICAgIGlmIChfZ2xvYmFsLnNldEltbWVkaWF0ZSlcbiAgICAgICAgICAgIHNldEltbWVkaWF0ZShmbik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhcnJheVRvT2JqZWN0KGFycmF5LCBleHRyYWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5LnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCBpdGVtLCBpKSB7XG4gICAgICAgICAgICB2YXIgbmFtZUFuZFZhbHVlID0gZXh0cmFjdG9yKGl0ZW0sIGkpO1xuICAgICAgICAgICAgaWYgKG5hbWVBbmRWYWx1ZSlcbiAgICAgICAgICAgICAgICByZXN1bHRbbmFtZUFuZFZhbHVlWzBdXSA9IG5hbWVBbmRWYWx1ZVsxXTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sIHt9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0QnlLZXlQYXRoKG9iaiwga2V5UGF0aCkge1xuICAgICAgICBpZiAodHlwZW9mIGtleVBhdGggPT09ICdzdHJpbmcnICYmIGhhc093bihvYmosIGtleVBhdGgpKVxuICAgICAgICAgICAgcmV0dXJuIG9ialtrZXlQYXRoXTtcbiAgICAgICAgaWYgKCFrZXlQYXRoKVxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXlQYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFyIHJ2ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGtleVBhdGgubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGdldEJ5S2V5UGF0aChvYmosIGtleVBhdGhbaV0pO1xuICAgICAgICAgICAgICAgIHJ2LnB1c2godmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBydjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGVyaW9kID0ga2V5UGF0aC5pbmRleE9mKCcuJyk7XG4gICAgICAgIGlmIChwZXJpb2QgIT09IC0xKSB7XG4gICAgICAgICAgICB2YXIgaW5uZXJPYmogPSBvYmpba2V5UGF0aC5zdWJzdHIoMCwgcGVyaW9kKV07XG4gICAgICAgICAgICByZXR1cm4gaW5uZXJPYmogPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGdldEJ5S2V5UGF0aChpbm5lck9iaiwga2V5UGF0aC5zdWJzdHIocGVyaW9kICsgMSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldEJ5S2V5UGF0aChvYmosIGtleVBhdGgsIHZhbHVlKSB7XG4gICAgICAgIGlmICghb2JqIHx8IGtleVBhdGggPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKCdpc0Zyb3plbicgaW4gT2JqZWN0ICYmIE9iamVjdC5pc0Zyb3plbihvYmopKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodHlwZW9mIGtleVBhdGggIT09ICdzdHJpbmcnICYmICdsZW5ndGgnIGluIGtleVBhdGgpIHtcbiAgICAgICAgICAgIGFzc2VydCh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnICYmICdsZW5ndGgnIGluIHZhbHVlKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0ga2V5UGF0aC5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgICAgICBzZXRCeUtleVBhdGgob2JqLCBrZXlQYXRoW2ldLCB2YWx1ZVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcGVyaW9kID0ga2V5UGF0aC5pbmRleE9mKCcuJyk7XG4gICAgICAgICAgICBpZiAocGVyaW9kICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50S2V5UGF0aCA9IGtleVBhdGguc3Vic3RyKDAsIHBlcmlvZCk7XG4gICAgICAgICAgICAgICAgdmFyIHJlbWFpbmluZ0tleVBhdGggPSBrZXlQYXRoLnN1YnN0cihwZXJpb2QgKyAxKTtcbiAgICAgICAgICAgICAgICBpZiAocmVtYWluaW5nS2V5UGF0aCA9PT0gXCJcIilcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KG9iaikgJiYgIWlzTmFOKHBhcnNlSW50KGN1cnJlbnRLZXlQYXRoKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnNwbGljZShjdXJyZW50S2V5UGF0aCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9ialtjdXJyZW50S2V5UGF0aF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2N1cnJlbnRLZXlQYXRoXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5uZXJPYmogPSBvYmpbY3VycmVudEtleVBhdGhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlubmVyT2JqIHx8ICFoYXNPd24ob2JqLCBjdXJyZW50S2V5UGF0aCkpXG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lck9iaiA9IChvYmpbY3VycmVudEtleVBhdGhdID0ge30pO1xuICAgICAgICAgICAgICAgICAgICBzZXRCeUtleVBhdGgoaW5uZXJPYmosIHJlbWFpbmluZ0tleVBhdGgsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNBcnJheShvYmopICYmICFpc05hTihwYXJzZUludChrZXlQYXRoKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc3BsaWNlKGtleVBhdGgsIDEpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgb2JqW2tleVBhdGhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIG9ialtrZXlQYXRoXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRlbEJ5S2V5UGF0aChvYmosIGtleVBhdGgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXlQYXRoID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgIHNldEJ5S2V5UGF0aChvYmosIGtleVBhdGgsIHVuZGVmaW5lZCk7XG4gICAgICAgIGVsc2UgaWYgKCdsZW5ndGgnIGluIGtleVBhdGgpXG4gICAgICAgICAgICBbXS5tYXAuY2FsbChrZXlQYXRoLCBmdW5jdGlvbiAoa3ApIHtcbiAgICAgICAgICAgICAgICBzZXRCeUtleVBhdGgob2JqLCBrcCwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzaGFsbG93Q2xvbmUob2JqKSB7XG4gICAgICAgIHZhciBydiA9IHt9O1xuICAgICAgICBmb3IgKHZhciBtIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKGhhc093bihvYmosIG0pKVxuICAgICAgICAgICAgICAgIHJ2W21dID0gb2JqW21dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBydjtcbiAgICB9XG4gICAgdmFyIGNvbmNhdCA9IFtdLmNvbmNhdDtcbiAgICBmdW5jdGlvbiBmbGF0dGVuKGEpIHtcbiAgICAgICAgcmV0dXJuIGNvbmNhdC5hcHBseShbXSwgYSk7XG4gICAgfVxuICAgIHZhciBpbnRyaW5zaWNUeXBlTmFtZXMgPSBcIkJpZ1VpbnQ2NEFycmF5LEJpZ0ludDY0QXJyYXksQXJyYXksQm9vbGVhbixTdHJpbmcsRGF0ZSxSZWdFeHAsQmxvYixGaWxlLEZpbGVMaXN0LEZpbGVTeXN0ZW1GaWxlSGFuZGxlLEZpbGVTeXN0ZW1EaXJlY3RvcnlIYW5kbGUsQXJyYXlCdWZmZXIsRGF0YVZpZXcsVWludDhDbGFtcGVkQXJyYXksSW1hZ2VCaXRtYXAsSW1hZ2VEYXRhLE1hcCxTZXQsQ3J5cHRvS2V5XCJcbiAgICAgICAgLnNwbGl0KCcsJykuY29uY2F0KGZsYXR0ZW4oWzgsIDE2LCAzMiwgNjRdLm1hcChmdW5jdGlvbiAobnVtKSB7IHJldHVybiBbXCJJbnRcIiwgXCJVaW50XCIsIFwiRmxvYXRcIl0ubWFwKGZ1bmN0aW9uICh0KSB7IHJldHVybiB0ICsgbnVtICsgXCJBcnJheVwiOyB9KTsgfSkpKS5maWx0ZXIoZnVuY3Rpb24gKHQpIHsgcmV0dXJuIF9nbG9iYWxbdF07IH0pO1xuICAgIHZhciBpbnRyaW5zaWNUeXBlcyA9IG5ldyBTZXQoaW50cmluc2ljVHlwZU5hbWVzLm1hcChmdW5jdGlvbiAodCkgeyByZXR1cm4gX2dsb2JhbFt0XTsgfSkpO1xuICAgIGZ1bmN0aW9uIGNsb25lU2ltcGxlT2JqZWN0VHJlZShvKSB7XG4gICAgICAgIHZhciBydiA9IHt9O1xuICAgICAgICBmb3IgKHZhciBrIGluIG8pXG4gICAgICAgICAgICBpZiAoaGFzT3duKG8sIGspKSB7XG4gICAgICAgICAgICAgICAgdmFyIHYgPSBvW2tdO1xuICAgICAgICAgICAgICAgIHJ2W2tdID0gIXYgfHwgdHlwZW9mIHYgIT09ICdvYmplY3QnIHx8IGludHJpbnNpY1R5cGVzLmhhcyh2LmNvbnN0cnVjdG9yKSA/IHYgOiBjbG9uZVNpbXBsZU9iamVjdFRyZWUodik7XG4gICAgICAgICAgICB9XG4gICAgICAgIHJldHVybiBydjtcbiAgICB9XG4gICAgZnVuY3Rpb24gb2JqZWN0SXNFbXB0eShvKSB7XG4gICAgICAgIGZvciAodmFyIGsgaW4gbylcbiAgICAgICAgICAgIGlmIChoYXNPd24obywgaykpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIGNpcmN1bGFyUmVmcyA9IG51bGw7XG4gICAgZnVuY3Rpb24gZGVlcENsb25lKGFueSkge1xuICAgICAgICBjaXJjdWxhclJlZnMgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICB2YXIgcnYgPSBpbm5lckRlZXBDbG9uZShhbnkpO1xuICAgICAgICBjaXJjdWxhclJlZnMgPSBudWxsO1xuICAgICAgICByZXR1cm4gcnY7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlubmVyRGVlcENsb25lKHgpIHtcbiAgICAgICAgaWYgKCF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0JylcbiAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB2YXIgcnYgPSBjaXJjdWxhclJlZnMuZ2V0KHgpO1xuICAgICAgICBpZiAocnYpXG4gICAgICAgICAgICByZXR1cm4gcnY7XG4gICAgICAgIGlmIChpc0FycmF5KHgpKSB7XG4gICAgICAgICAgICBydiA9IFtdO1xuICAgICAgICAgICAgY2lyY3VsYXJSZWZzLnNldCh4LCBydik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHgubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICAgICAgcnYucHVzaChpbm5lckRlZXBDbG9uZSh4W2ldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW50cmluc2ljVHlwZXMuaGFzKHguY29uc3RydWN0b3IpKSB7XG4gICAgICAgICAgICBydiA9IHg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcHJvdG8gPSBnZXRQcm90byh4KTtcbiAgICAgICAgICAgIHJ2ID0gcHJvdG8gPT09IE9iamVjdC5wcm90b3R5cGUgPyB7fSA6IE9iamVjdC5jcmVhdGUocHJvdG8pO1xuICAgICAgICAgICAgY2lyY3VsYXJSZWZzLnNldCh4LCBydik7XG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIHgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzT3duKHgsIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgIHJ2W3Byb3BdID0gaW5uZXJEZWVwQ2xvbmUoeFtwcm9wXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBydjtcbiAgICB9XG4gICAgdmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG4gICAgZnVuY3Rpb24gdG9TdHJpbmdUYWcobykge1xuICAgICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gICAgfVxuICAgIHZhciBpdGVyYXRvclN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnID9cbiAgICAgICAgU3ltYm9sLml0ZXJhdG9yIDpcbiAgICAgICAgJ0BAaXRlcmF0b3InO1xuICAgIHZhciBnZXRJdGVyYXRvck9mID0gdHlwZW9mIGl0ZXJhdG9yU3ltYm9sID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHJldHVybiB4ICE9IG51bGwgJiYgKGkgPSB4W2l0ZXJhdG9yU3ltYm9sXSkgJiYgaS5hcHBseSh4KTtcbiAgICB9IDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfTtcbiAgICBmdW5jdGlvbiBkZWxBcnJheUl0ZW0oYSwgeCkge1xuICAgICAgICB2YXIgaSA9IGEuaW5kZXhPZih4KTtcbiAgICAgICAgaWYgKGkgPj0gMClcbiAgICAgICAgICAgIGEuc3BsaWNlKGksIDEpO1xuICAgICAgICByZXR1cm4gaSA+PSAwO1xuICAgIH1cbiAgICB2YXIgTk9fQ0hBUl9BUlJBWSA9IHt9O1xuICAgIGZ1bmN0aW9uIGdldEFycmF5T2YoYXJyYXlMaWtlKSB7XG4gICAgICAgIHZhciBpLCBhLCB4LCBpdDtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGlmIChpc0FycmF5KGFycmF5TGlrZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5TGlrZS5zbGljZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMgPT09IE5PX0NIQVJfQVJSQVkgJiYgdHlwZW9mIGFycmF5TGlrZSA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFthcnJheUxpa2VdO1xuICAgICAgICAgICAgaWYgKChpdCA9IGdldEl0ZXJhdG9yT2YoYXJyYXlMaWtlKSkpIHtcbiAgICAgICAgICAgICAgICBhID0gW107XG4gICAgICAgICAgICAgICAgd2hpbGUgKCh4ID0gaXQubmV4dCgpKSwgIXguZG9uZSlcbiAgICAgICAgICAgICAgICAgICAgYS5wdXNoKHgudmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFycmF5TGlrZSA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBbYXJyYXlMaWtlXTtcbiAgICAgICAgICAgIGkgPSBhcnJheUxpa2UubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGEgPSBuZXcgQXJyYXkoaSk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSlcbiAgICAgICAgICAgICAgICAgICAgYVtpXSA9IGFycmF5TGlrZVtpXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbYXJyYXlMaWtlXTtcbiAgICAgICAgfVxuICAgICAgICBpID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgYSA9IG5ldyBBcnJheShpKTtcbiAgICAgICAgd2hpbGUgKGktLSlcbiAgICAgICAgICAgIGFbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICB2YXIgaXNBc3luY0Z1bmN0aW9uID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyBmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGZuW1N5bWJvbC50b1N0cmluZ1RhZ10gPT09ICdBc3luY0Z1bmN0aW9uJzsgfVxuICAgICAgICA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9O1xuXG4gICAgdmFyIGRleGllRXJyb3JOYW1lcyA9IFtcbiAgICAgICAgJ01vZGlmeScsXG4gICAgICAgICdCdWxrJyxcbiAgICAgICAgJ09wZW5GYWlsZWQnLFxuICAgICAgICAnVmVyc2lvbkNoYW5nZScsXG4gICAgICAgICdTY2hlbWEnLFxuICAgICAgICAnVXBncmFkZScsXG4gICAgICAgICdJbnZhbGlkVGFibGUnLFxuICAgICAgICAnTWlzc2luZ0FQSScsXG4gICAgICAgICdOb1N1Y2hEYXRhYmFzZScsXG4gICAgICAgICdJbnZhbGlkQXJndW1lbnQnLFxuICAgICAgICAnU3ViVHJhbnNhY3Rpb24nLFxuICAgICAgICAnVW5zdXBwb3J0ZWQnLFxuICAgICAgICAnSW50ZXJuYWwnLFxuICAgICAgICAnRGF0YWJhc2VDbG9zZWQnLFxuICAgICAgICAnUHJlbWF0dXJlQ29tbWl0JyxcbiAgICAgICAgJ0ZvcmVpZ25Bd2FpdCdcbiAgICBdO1xuICAgIHZhciBpZGJEb21FcnJvck5hbWVzID0gW1xuICAgICAgICAnVW5rbm93bicsXG4gICAgICAgICdDb25zdHJhaW50JyxcbiAgICAgICAgJ0RhdGEnLFxuICAgICAgICAnVHJhbnNhY3Rpb25JbmFjdGl2ZScsXG4gICAgICAgICdSZWFkT25seScsXG4gICAgICAgICdWZXJzaW9uJyxcbiAgICAgICAgJ05vdEZvdW5kJyxcbiAgICAgICAgJ0ludmFsaWRTdGF0ZScsXG4gICAgICAgICdJbnZhbGlkQWNjZXNzJyxcbiAgICAgICAgJ0Fib3J0JyxcbiAgICAgICAgJ1RpbWVvdXQnLFxuICAgICAgICAnUXVvdGFFeGNlZWRlZCcsXG4gICAgICAgICdTeW50YXgnLFxuICAgICAgICAnRGF0YUNsb25lJ1xuICAgIF07XG4gICAgdmFyIGVycm9yTGlzdCA9IGRleGllRXJyb3JOYW1lcy5jb25jYXQoaWRiRG9tRXJyb3JOYW1lcyk7XG4gICAgdmFyIGRlZmF1bHRUZXh0cyA9IHtcbiAgICAgICAgVmVyc2lvbkNoYW5nZWQ6IFwiRGF0YWJhc2UgdmVyc2lvbiBjaGFuZ2VkIGJ5IG90aGVyIGRhdGFiYXNlIGNvbm5lY3Rpb25cIixcbiAgICAgICAgRGF0YWJhc2VDbG9zZWQ6IFwiRGF0YWJhc2UgaGFzIGJlZW4gY2xvc2VkXCIsXG4gICAgICAgIEFib3J0OiBcIlRyYW5zYWN0aW9uIGFib3J0ZWRcIixcbiAgICAgICAgVHJhbnNhY3Rpb25JbmFjdGl2ZTogXCJUcmFuc2FjdGlvbiBoYXMgYWxyZWFkeSBjb21wbGV0ZWQgb3IgZmFpbGVkXCIsXG4gICAgICAgIE1pc3NpbmdBUEk6IFwiSW5kZXhlZERCIEFQSSBtaXNzaW5nLiBQbGVhc2UgdmlzaXQgaHR0cHM6Ly90aW55dXJsLmNvbS95MnV1dnNrYlwiXG4gICAgfTtcbiAgICBmdW5jdGlvbiBEZXhpZUVycm9yKG5hbWUsIG1zZykge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtc2c7XG4gICAgfVxuICAgIGRlcml2ZShEZXhpZUVycm9yKS5mcm9tKEVycm9yKS5leHRlbmQoe1xuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5uYW1lICsgXCI6IFwiICsgdGhpcy5tZXNzYWdlOyB9XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gZ2V0TXVsdGlFcnJvck1lc3NhZ2UobXNnLCBmYWlsdXJlcykge1xuICAgICAgICByZXR1cm4gbXNnICsgXCIuIEVycm9yczogXCIgKyBPYmplY3Qua2V5cyhmYWlsdXJlcylcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZmFpbHVyZXNba2V5XS50b1N0cmluZygpOyB9KVxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAodiwgaSwgcykgeyByZXR1cm4gcy5pbmRleE9mKHYpID09PSBpOyB9KVxuICAgICAgICAgICAgLmpvaW4oJ1xcbicpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBNb2RpZnlFcnJvcihtc2csIGZhaWx1cmVzLCBzdWNjZXNzQ291bnQsIGZhaWxlZEtleXMpIHtcbiAgICAgICAgdGhpcy5mYWlsdXJlcyA9IGZhaWx1cmVzO1xuICAgICAgICB0aGlzLmZhaWxlZEtleXMgPSBmYWlsZWRLZXlzO1xuICAgICAgICB0aGlzLnN1Y2Nlc3NDb3VudCA9IHN1Y2Nlc3NDb3VudDtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gZ2V0TXVsdGlFcnJvck1lc3NhZ2UobXNnLCBmYWlsdXJlcyk7XG4gICAgfVxuICAgIGRlcml2ZShNb2RpZnlFcnJvcikuZnJvbShEZXhpZUVycm9yKTtcbiAgICBmdW5jdGlvbiBCdWxrRXJyb3IobXNnLCBmYWlsdXJlcykge1xuICAgICAgICB0aGlzLm5hbWUgPSBcIkJ1bGtFcnJvclwiO1xuICAgICAgICB0aGlzLmZhaWx1cmVzID0gT2JqZWN0LmtleXMoZmFpbHVyZXMpLm1hcChmdW5jdGlvbiAocG9zKSB7IHJldHVybiBmYWlsdXJlc1twb3NdOyB9KTtcbiAgICAgICAgdGhpcy5mYWlsdXJlc0J5UG9zID0gZmFpbHVyZXM7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IGdldE11bHRpRXJyb3JNZXNzYWdlKG1zZywgdGhpcy5mYWlsdXJlcyk7XG4gICAgfVxuICAgIGRlcml2ZShCdWxrRXJyb3IpLmZyb20oRGV4aWVFcnJvcik7XG4gICAgdmFyIGVycm5hbWVzID0gZXJyb3JMaXN0LnJlZHVjZShmdW5jdGlvbiAob2JqLCBuYW1lKSB7IHJldHVybiAob2JqW25hbWVdID0gbmFtZSArIFwiRXJyb3JcIiwgb2JqKTsgfSwge30pO1xuICAgIHZhciBCYXNlRXhjZXB0aW9uID0gRGV4aWVFcnJvcjtcbiAgICB2YXIgZXhjZXB0aW9ucyA9IGVycm9yTGlzdC5yZWR1Y2UoZnVuY3Rpb24gKG9iaiwgbmFtZSkge1xuICAgICAgICB2YXIgZnVsbE5hbWUgPSBuYW1lICsgXCJFcnJvclwiO1xuICAgICAgICBmdW5jdGlvbiBEZXhpZUVycm9yKG1zZ09ySW5uZXIsIGlubmVyKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBmdWxsTmFtZTtcbiAgICAgICAgICAgIGlmICghbXNnT3JJbm5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IGRlZmF1bHRUZXh0c1tuYW1lXSB8fCBmdWxsTmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBtc2dPcklubmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IFwiXCIuY29uY2F0KG1zZ09ySW5uZXIpLmNvbmNhdCghaW5uZXIgPyAnJyA6ICdcXG4gJyArIGlubmVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyID0gaW5uZXIgfHwgbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBtc2dPcklubmVyID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IFwiXCIuY29uY2F0KG1zZ09ySW5uZXIubmFtZSwgXCIgXCIpLmNvbmNhdChtc2dPcklubmVyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXIgPSBtc2dPcklubmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRlcml2ZShEZXhpZUVycm9yKS5mcm9tKEJhc2VFeGNlcHRpb24pO1xuICAgICAgICBvYmpbbmFtZV0gPSBEZXhpZUVycm9yO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH0sIHt9KTtcbiAgICBleGNlcHRpb25zLlN5bnRheCA9IFN5bnRheEVycm9yO1xuICAgIGV4Y2VwdGlvbnMuVHlwZSA9IFR5cGVFcnJvcjtcbiAgICBleGNlcHRpb25zLlJhbmdlID0gUmFuZ2VFcnJvcjtcbiAgICB2YXIgZXhjZXB0aW9uTWFwID0gaWRiRG9tRXJyb3JOYW1lcy5yZWR1Y2UoZnVuY3Rpb24gKG9iaiwgbmFtZSkge1xuICAgICAgICBvYmpbbmFtZSArIFwiRXJyb3JcIl0gPSBleGNlcHRpb25zW25hbWVdO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH0sIHt9KTtcbiAgICBmdW5jdGlvbiBtYXBFcnJvcihkb21FcnJvciwgbWVzc2FnZSkge1xuICAgICAgICBpZiAoIWRvbUVycm9yIHx8IGRvbUVycm9yIGluc3RhbmNlb2YgRGV4aWVFcnJvciB8fCBkb21FcnJvciBpbnN0YW5jZW9mIFR5cGVFcnJvciB8fCBkb21FcnJvciBpbnN0YW5jZW9mIFN5bnRheEVycm9yIHx8ICFkb21FcnJvci5uYW1lIHx8ICFleGNlcHRpb25NYXBbZG9tRXJyb3IubmFtZV0pXG4gICAgICAgICAgICByZXR1cm4gZG9tRXJyb3I7XG4gICAgICAgIHZhciBydiA9IG5ldyBleGNlcHRpb25NYXBbZG9tRXJyb3IubmFtZV0obWVzc2FnZSB8fCBkb21FcnJvci5tZXNzYWdlLCBkb21FcnJvcik7XG4gICAgICAgIGlmIChcInN0YWNrXCIgaW4gZG9tRXJyb3IpIHtcbiAgICAgICAgICAgIHNldFByb3AocnYsIFwic3RhY2tcIiwgeyBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5uZXIuc3RhY2s7XG4gICAgICAgICAgICAgICAgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcnY7XG4gICAgfVxuICAgIHZhciBmdWxsTmFtZUV4Y2VwdGlvbnMgPSBlcnJvckxpc3QucmVkdWNlKGZ1bmN0aW9uIChvYmosIG5hbWUpIHtcbiAgICAgICAgaWYgKFtcIlN5bnRheFwiLCBcIlR5cGVcIiwgXCJSYW5nZVwiXS5pbmRleE9mKG5hbWUpID09PSAtMSlcbiAgICAgICAgICAgIG9ialtuYW1lICsgXCJFcnJvclwiXSA9IGV4Y2VwdGlvbnNbbmFtZV07XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfSwge30pO1xuICAgIGZ1bGxOYW1lRXhjZXB0aW9ucy5Nb2RpZnlFcnJvciA9IE1vZGlmeUVycm9yO1xuICAgIGZ1bGxOYW1lRXhjZXB0aW9ucy5EZXhpZUVycm9yID0gRGV4aWVFcnJvcjtcbiAgICBmdWxsTmFtZUV4Y2VwdGlvbnMuQnVsa0Vycm9yID0gQnVsa0Vycm9yO1xuXG4gICAgZnVuY3Rpb24gbm9wKCkgeyB9XG4gICAgZnVuY3Rpb24gbWlycm9yKHZhbCkgeyByZXR1cm4gdmFsOyB9XG4gICAgZnVuY3Rpb24gcHVyZUZ1bmN0aW9uQ2hhaW4oZjEsIGYyKSB7XG4gICAgICAgIGlmIChmMSA9PSBudWxsIHx8IGYxID09PSBtaXJyb3IpXG4gICAgICAgICAgICByZXR1cm4gZjI7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gZjIoZjEodmFsKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNhbGxCb3RoKG9uMSwgb24yKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBvbjEuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIG9uMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBob29rQ3JlYXRpbmdDaGFpbihmMSwgZjIpIHtcbiAgICAgICAgaWYgKGYxID09PSBub3ApXG4gICAgICAgICAgICByZXR1cm4gZjI7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzID0gZjEuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGlmIChyZXMgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBhcmd1bWVudHNbMF0gPSByZXM7XG4gICAgICAgICAgICB2YXIgb25zdWNjZXNzID0gdGhpcy5vbnN1Y2Nlc3MsXG4gICAgICAgICAgICBvbmVycm9yID0gdGhpcy5vbmVycm9yO1xuICAgICAgICAgICAgdGhpcy5vbnN1Y2Nlc3MgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIHZhciByZXMyID0gZjIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGlmIChvbnN1Y2Nlc3MpXG4gICAgICAgICAgICAgICAgdGhpcy5vbnN1Y2Nlc3MgPSB0aGlzLm9uc3VjY2VzcyA/IGNhbGxCb3RoKG9uc3VjY2VzcywgdGhpcy5vbnN1Y2Nlc3MpIDogb25zdWNjZXNzO1xuICAgICAgICAgICAgaWYgKG9uZXJyb3IpXG4gICAgICAgICAgICAgICAgdGhpcy5vbmVycm9yID0gdGhpcy5vbmVycm9yID8gY2FsbEJvdGgob25lcnJvciwgdGhpcy5vbmVycm9yKSA6IG9uZXJyb3I7XG4gICAgICAgICAgICByZXR1cm4gcmVzMiAhPT0gdW5kZWZpbmVkID8gcmVzMiA6IHJlcztcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaG9va0RlbGV0aW5nQ2hhaW4oZjEsIGYyKSB7XG4gICAgICAgIGlmIChmMSA9PT0gbm9wKVxuICAgICAgICAgICAgcmV0dXJuIGYyO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZjEuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHZhciBvbnN1Y2Nlc3MgPSB0aGlzLm9uc3VjY2VzcyxcbiAgICAgICAgICAgIG9uZXJyb3IgPSB0aGlzLm9uZXJyb3I7XG4gICAgICAgICAgICB0aGlzLm9uc3VjY2VzcyA9IHRoaXMub25lcnJvciA9IG51bGw7XG4gICAgICAgICAgICBmMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgaWYgKG9uc3VjY2VzcylcbiAgICAgICAgICAgICAgICB0aGlzLm9uc3VjY2VzcyA9IHRoaXMub25zdWNjZXNzID8gY2FsbEJvdGgob25zdWNjZXNzLCB0aGlzLm9uc3VjY2VzcykgOiBvbnN1Y2Nlc3M7XG4gICAgICAgICAgICBpZiAob25lcnJvcilcbiAgICAgICAgICAgICAgICB0aGlzLm9uZXJyb3IgPSB0aGlzLm9uZXJyb3IgPyBjYWxsQm90aChvbmVycm9yLCB0aGlzLm9uZXJyb3IpIDogb25lcnJvcjtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaG9va1VwZGF0aW5nQ2hhaW4oZjEsIGYyKSB7XG4gICAgICAgIGlmIChmMSA9PT0gbm9wKVxuICAgICAgICAgICAgcmV0dXJuIGYyO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1vZGlmaWNhdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBmMS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgZXh0ZW5kKG1vZGlmaWNhdGlvbnMsIHJlcyk7XG4gICAgICAgICAgICB2YXIgb25zdWNjZXNzID0gdGhpcy5vbnN1Y2Nlc3MsXG4gICAgICAgICAgICBvbmVycm9yID0gdGhpcy5vbmVycm9yO1xuICAgICAgICAgICAgdGhpcy5vbnN1Y2Nlc3MgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIHZhciByZXMyID0gZjIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGlmIChvbnN1Y2Nlc3MpXG4gICAgICAgICAgICAgICAgdGhpcy5vbnN1Y2Nlc3MgPSB0aGlzLm9uc3VjY2VzcyA/IGNhbGxCb3RoKG9uc3VjY2VzcywgdGhpcy5vbnN1Y2Nlc3MpIDogb25zdWNjZXNzO1xuICAgICAgICAgICAgaWYgKG9uZXJyb3IpXG4gICAgICAgICAgICAgICAgdGhpcy5vbmVycm9yID0gdGhpcy5vbmVycm9yID8gY2FsbEJvdGgob25lcnJvciwgdGhpcy5vbmVycm9yKSA6IG9uZXJyb3I7XG4gICAgICAgICAgICByZXR1cm4gcmVzID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgICAgIChyZXMyID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiByZXMyKSA6XG4gICAgICAgICAgICAgICAgKGV4dGVuZChyZXMsIHJlczIpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmV2ZXJzZVN0b3BwYWJsZUV2ZW50Q2hhaW4oZjEsIGYyKSB7XG4gICAgICAgIGlmIChmMSA9PT0gbm9wKVxuICAgICAgICAgICAgcmV0dXJuIGYyO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGYyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBmMS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBwcm9taXNhYmxlQ2hhaW4oZjEsIGYyKSB7XG4gICAgICAgIGlmIChmMSA9PT0gbm9wKVxuICAgICAgICAgICAgcmV0dXJuIGYyO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlcyA9IGYxLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBpZiAocmVzICYmIHR5cGVvZiByZXMudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHZhciB0aGl6ID0gdGhpcywgaSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoaSk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGktLSlcbiAgICAgICAgICAgICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZjIuYXBwbHkodGhpeiwgYXJncyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZjIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgZGVidWcgPSB0eXBlb2YgbG9jYXRpb24gIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIC9eKGh0dHB8aHR0cHMpOlxcL1xcLyhsb2NhbGhvc3R8MTI3XFwuMFxcLjBcXC4xKS8udGVzdChsb2NhdGlvbi5ocmVmKTtcbiAgICBmdW5jdGlvbiBzZXREZWJ1Zyh2YWx1ZSwgZmlsdGVyKSB7XG4gICAgICAgIGRlYnVnID0gdmFsdWU7XG4gICAgfVxuXG4gICAgdmFyIElOVEVSTkFMID0ge307XG4gICAgdmFyIFpPTkVfRUNIT19MSU1JVCA9IDEwMCwgX2EkMSA9IHR5cGVvZiBQcm9taXNlID09PSAndW5kZWZpbmVkJyA/XG4gICAgICAgIFtdIDpcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBnbG9iYWxQID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNyeXB0byA9PT0gJ3VuZGVmaW5lZCcgfHwgIWNyeXB0by5zdWJ0bGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtnbG9iYWxQLCBnZXRQcm90byhnbG9iYWxQKSwgZ2xvYmFsUF07XG4gICAgICAgICAgICB2YXIgbmF0aXZlUCA9IGNyeXB0by5zdWJ0bGUuZGlnZXN0KFwiU0hBLTUxMlwiLCBuZXcgVWludDhBcnJheShbMF0pKTtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgbmF0aXZlUCxcbiAgICAgICAgICAgICAgICBnZXRQcm90byhuYXRpdmVQKSxcbiAgICAgICAgICAgICAgICBnbG9iYWxQXG4gICAgICAgICAgICBdO1xuICAgICAgICB9KSgpLCByZXNvbHZlZE5hdGl2ZVByb21pc2UgPSBfYSQxWzBdLCBuYXRpdmVQcm9taXNlUHJvdG8gPSBfYSQxWzFdLCByZXNvbHZlZEdsb2JhbFByb21pc2UgPSBfYSQxWzJdLCBuYXRpdmVQcm9taXNlVGhlbiA9IG5hdGl2ZVByb21pc2VQcm90byAmJiBuYXRpdmVQcm9taXNlUHJvdG8udGhlbjtcbiAgICB2YXIgTmF0aXZlUHJvbWlzZSA9IHJlc29sdmVkTmF0aXZlUHJvbWlzZSAmJiByZXNvbHZlZE5hdGl2ZVByb21pc2UuY29uc3RydWN0b3I7XG4gICAgdmFyIHBhdGNoR2xvYmFsUHJvbWlzZSA9ICEhcmVzb2x2ZWRHbG9iYWxQcm9taXNlO1xuICAgIGZ1bmN0aW9uIHNjaGVkdWxlUGh5c2ljYWxUaWNrKCkge1xuICAgICAgICBxdWV1ZU1pY3JvdGFzayhwaHlzaWNhbFRpY2spO1xuICAgIH1cbiAgICB2YXIgYXNhcCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgYXJncykge1xuICAgICAgICBtaWNyb3RpY2tRdWV1ZS5wdXNoKFtjYWxsYmFjaywgYXJnc10pO1xuICAgICAgICBpZiAobmVlZHNOZXdQaHlzaWNhbFRpY2spIHtcbiAgICAgICAgICAgIHNjaGVkdWxlUGh5c2ljYWxUaWNrKCk7XG4gICAgICAgICAgICBuZWVkc05ld1BoeXNpY2FsVGljayA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgaXNPdXRzaWRlTWljcm9UaWNrID0gdHJ1ZSxcbiAgICBuZWVkc05ld1BoeXNpY2FsVGljayA9IHRydWUsXG4gICAgdW5oYW5kbGVkRXJyb3JzID0gW10sXG4gICAgcmVqZWN0aW5nRXJyb3JzID0gW10sXG4gICAgcmVqZWN0aW9uTWFwcGVyID0gbWlycm9yO1xuICAgIHZhciBnbG9iYWxQU0QgPSB7XG4gICAgICAgIGlkOiAnZ2xvYmFsJyxcbiAgICAgICAgZ2xvYmFsOiB0cnVlLFxuICAgICAgICByZWY6IDAsXG4gICAgICAgIHVuaGFuZGxlZHM6IFtdLFxuICAgICAgICBvbnVuaGFuZGxlZDogbm9wLFxuICAgICAgICBwZ3A6IGZhbHNlLFxuICAgICAgICBlbnY6IHt9LFxuICAgICAgICBmaW5hbGl6ZTogbm9wXG4gICAgfTtcbiAgICB2YXIgUFNEID0gZ2xvYmFsUFNEO1xuICAgIHZhciBtaWNyb3RpY2tRdWV1ZSA9IFtdO1xuICAgIHZhciBudW1TY2hlZHVsZWRDYWxscyA9IDA7XG4gICAgdmFyIHRpY2tGaW5hbGl6ZXJzID0gW107XG4gICAgZnVuY3Rpb24gRGV4aWVQcm9taXNlKGZuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcyAhPT0gJ29iamVjdCcpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlcyBtdXN0IGJlIGNvbnN0cnVjdGVkIHZpYSBuZXcnKTtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW107XG4gICAgICAgIHRoaXMuX2xpYiA9IGZhbHNlO1xuICAgICAgICB2YXIgcHNkID0gKHRoaXMuX1BTRCA9IFBTRCk7XG4gICAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGlmIChmbiAhPT0gSU5URVJOQUwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTm90IGEgZnVuY3Rpb24nKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBhcmd1bWVudHNbMl07XG4gICAgICAgICAgICBpZiAodGhpcy5fc3RhdGUgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgIGhhbmRsZVJlamVjdGlvbih0aGlzLCB0aGlzLl92YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IG51bGw7XG4gICAgICAgICsrcHNkLnJlZjtcbiAgICAgICAgZXhlY3V0ZVByb21pc2VUYXNrKHRoaXMsIGZuKTtcbiAgICB9XG4gICAgdmFyIHRoZW5Qcm9wID0ge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwc2QgPSBQU0QsIG1pY3JvVGFza0lkID0gdG90YWxFY2hvZXM7XG4gICAgICAgICAgICBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgcG9zc2libGVBd2FpdCA9ICFwc2QuZ2xvYmFsICYmIChwc2QgIT09IFBTRCB8fCBtaWNyb1Rhc2tJZCAhPT0gdG90YWxFY2hvZXMpO1xuICAgICAgICAgICAgICAgIHZhciBjbGVhbnVwID0gcG9zc2libGVBd2FpdCAmJiAhZGVjcmVtZW50RXhwZWN0ZWRBd2FpdHMoKTtcbiAgICAgICAgICAgICAgICB2YXIgcnYgPSBuZXcgRGV4aWVQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGFnYXRlVG9MaXN0ZW5lcihfdGhpcywgbmV3IExpc3RlbmVyKG5hdGl2ZUF3YWl0Q29tcGF0aWJsZVdyYXAob25GdWxmaWxsZWQsIHBzZCwgcG9zc2libGVBd2FpdCwgY2xlYW51cCksIG5hdGl2ZUF3YWl0Q29tcGF0aWJsZVdyYXAob25SZWplY3RlZCwgcHNkLCBwb3NzaWJsZUF3YWl0LCBjbGVhbnVwKSwgcmVzb2x2ZSwgcmVqZWN0LCBwc2QpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY29uc29sZVRhc2spXG4gICAgICAgICAgICAgICAgICAgIHJ2Ll9jb25zb2xlVGFzayA9IHRoaXMuX2NvbnNvbGVUYXNrO1xuICAgICAgICAgICAgICAgIHJldHVybiBydjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoZW4ucHJvdG90eXBlID0gSU5URVJOQUw7XG4gICAgICAgICAgICByZXR1cm4gdGhlbjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHNldFByb3AodGhpcywgJ3RoZW4nLCB2YWx1ZSAmJiB2YWx1ZS5wcm90b3R5cGUgPT09IElOVEVSTkFMID9cbiAgICAgICAgICAgICAgICB0aGVuUHJvcCA6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc2V0OiB0aGVuUHJvcC5zZXRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcHJvcHMoRGV4aWVQcm9taXNlLnByb3RvdHlwZSwge1xuICAgICAgICB0aGVuOiB0aGVuUHJvcCxcbiAgICAgICAgX3RoZW46IGZ1bmN0aW9uIChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgICAgICAgICAgcHJvcGFnYXRlVG9MaXN0ZW5lcih0aGlzLCBuZXcgTGlzdGVuZXIobnVsbCwgbnVsbCwgb25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIFBTRCkpO1xuICAgICAgICB9LFxuICAgICAgICBjYXRjaDogZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3RlZCk7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IGFyZ3VtZW50c1swXSwgaGFuZGxlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMudGhlbihudWxsLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVyciBpbnN0YW5jZW9mIHR5cGUgPyBoYW5kbGVyKGVycikgOiBQcm9taXNlUmVqZWN0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIDogdGhpcy50aGVuKG51bGwsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVyciAmJiBlcnIubmFtZSA9PT0gdHlwZSA/IGhhbmRsZXIoZXJyKSA6IFByb21pc2VSZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZmluYWxseTogZnVuY3Rpb24gKG9uRmluYWxseSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRGV4aWVQcm9taXNlLnJlc29sdmUob25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsdWU7IH0pO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHJldHVybiBEZXhpZVByb21pc2UucmVzb2x2ZShvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBQcm9taXNlUmVqZWN0KGVycik7IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHRpbWVvdXQ6IGZ1bmN0aW9uIChtcywgbXNnKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIG1zIDwgSW5maW5pdHkgP1xuICAgICAgICAgICAgICAgIG5ldyBEZXhpZVByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGFuZGxlID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiByZWplY3QobmV3IGV4Y2VwdGlvbnMuVGltZW91dChtc2cpKTsgfSwgbXMpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy50aGVuKHJlc29sdmUsIHJlamVjdCkuZmluYWxseShjbGVhclRpbWVvdXQuYmluZChudWxsLCBoYW5kbGUpKTtcbiAgICAgICAgICAgICAgICB9KSA6IHRoaXM7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKVxuICAgICAgICBzZXRQcm9wKERleGllUHJvbWlzZS5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywgJ0RleGllLlByb21pc2UnKTtcbiAgICBnbG9iYWxQU0QuZW52ID0gc25hcFNob3QoKTtcbiAgICBmdW5jdGlvbiBMaXN0ZW5lcihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgcmVzb2x2ZSwgcmVqZWN0LCB6b25lKSB7XG4gICAgICAgIHRoaXMub25GdWxmaWxsZWQgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IG51bGw7XG4gICAgICAgIHRoaXMub25SZWplY3RlZCA9IHR5cGVvZiBvblJlamVjdGVkID09PSAnZnVuY3Rpb24nID8gb25SZWplY3RlZCA6IG51bGw7XG4gICAgICAgIHRoaXMucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIHRoaXMucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICB0aGlzLnBzZCA9IHpvbmU7XG4gICAgfVxuICAgIHByb3BzKERleGllUHJvbWlzZSwge1xuICAgICAgICBhbGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBnZXRBcnJheU9mLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICAgICAgICAgICAgICAubWFwKG9uUG9zc2libGVQYXJhbGxlbGxBc3luYyk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERleGllUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoW10pO1xuICAgICAgICAgICAgICAgIHZhciByZW1haW5pbmcgPSB2YWx1ZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uIChhLCBpKSB7IHJldHVybiBEZXhpZVByb21pc2UucmVzb2x2ZShhKS50aGVuKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc1tpXSA9IHg7XG4gICAgICAgICAgICAgICAgICAgIGlmICghLS1yZW1haW5pbmcpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgICAgICAgICAgfSwgcmVqZWN0KTsgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVzb2x2ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEZXhpZVByb21pc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGV4aWVQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHJ2ID0gbmV3IERleGllUHJvbWlzZShJTlRFUk5BTCwgdHJ1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHJ2O1xuICAgICAgICB9LFxuICAgICAgICByZWplY3Q6IFByb21pc2VSZWplY3QsXG4gICAgICAgIHJhY2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBnZXRBcnJheU9mLmFwcGx5KG51bGwsIGFyZ3VtZW50cykubWFwKG9uUG9zc2libGVQYXJhbGxlbGxBc3luYyk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERleGllUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzLm1hcChmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIERleGllUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKHJlc29sdmUsIHJlamVjdCk7IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIFBTRDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBQU0Q7IH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gUFNEID0gdmFsdWU7IH1cbiAgICAgICAgfSxcbiAgICAgICAgdG90YWxFY2hvZXM6IHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0b3RhbEVjaG9lczsgfSB9LFxuICAgICAgICBuZXdQU0Q6IG5ld1Njb3BlLFxuICAgICAgICB1c2VQU0Q6IHVzZVBTRCxcbiAgICAgICAgc2NoZWR1bGVyOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFzYXA7IH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkgeyBhc2FwID0gdmFsdWU7IH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVqZWN0aW9uTWFwcGVyOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlamVjdGlvbk1hcHBlcjsgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7IHJlamVjdGlvbk1hcHBlciA9IHZhbHVlOyB9XG4gICAgICAgIH0sXG4gICAgICAgIGZvbGxvdzogZnVuY3Rpb24gKGZuLCB6b25lUHJvcHMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGV4aWVQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3U2NvcGUoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHNkID0gUFNEO1xuICAgICAgICAgICAgICAgICAgICBwc2QudW5oYW5kbGVkcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBwc2Qub251bmhhbmRsZWQgPSByZWplY3Q7XG4gICAgICAgICAgICAgICAgICAgIHBzZC5maW5hbGl6ZSA9IGNhbGxCb3RoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBydW5fYXRfZW5kX29mX3RoaXNfb3JfbmV4dF9waHlzaWNhbF90aWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy51bmhhbmRsZWRzLmxlbmd0aCA9PT0gMCA/IHJlc29sdmUoKSA6IHJlamVjdChfdGhpcy51bmhhbmRsZWRzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCBwc2QuZmluYWxpemUpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH0sIHpvbmVQcm9wcywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKE5hdGl2ZVByb21pc2UpIHtcbiAgICAgICAgaWYgKE5hdGl2ZVByb21pc2UuYWxsU2V0dGxlZClcbiAgICAgICAgICAgIHNldFByb3AoRGV4aWVQcm9taXNlLCBcImFsbFNldHRsZWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBwb3NzaWJsZVByb21pc2VzID0gZ2V0QXJyYXlPZi5hcHBseShudWxsLCBhcmd1bWVudHMpLm1hcChvblBvc3NpYmxlUGFyYWxsZWxsQXN5bmMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGV4aWVQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NzaWJsZVByb21pc2VzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoW10pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVtYWluaW5nID0gcG9zc2libGVQcm9taXNlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHRzID0gbmV3IEFycmF5KHJlbWFpbmluZyk7XG4gICAgICAgICAgICAgICAgICAgIHBvc3NpYmxlUHJvbWlzZXMuZm9yRWFjaChmdW5jdGlvbiAocCwgaSkgeyByZXR1cm4gRGV4aWVQcm9taXNlLnJlc29sdmUocCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHJlc3VsdHNbaV0gPSB7IHN0YXR1czogXCJmdWxmaWxsZWRcIiwgdmFsdWU6IHZhbHVlIH07IH0sIGZ1bmN0aW9uIChyZWFzb24pIHsgcmV0dXJuIHJlc3VsdHNbaV0gPSB7IHN0YXR1czogXCJyZWplY3RlZFwiLCByZWFzb246IHJlYXNvbiB9OyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gLS1yZW1haW5pbmcgfHwgcmVzb2x2ZShyZXN1bHRzKTsgfSk7IH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIGlmIChOYXRpdmVQcm9taXNlLmFueSAmJiB0eXBlb2YgQWdncmVnYXRlRXJyb3IgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgc2V0UHJvcChEZXhpZVByb21pc2UsIFwiYW55XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcG9zc2libGVQcm9taXNlcyA9IGdldEFycmF5T2YuYXBwbHkobnVsbCwgYXJndW1lbnRzKS5tYXAob25Qb3NzaWJsZVBhcmFsbGVsbEFzeW5jKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERleGllUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NzaWJsZVByb21pc2VzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgQWdncmVnYXRlRXJyb3IoW10pKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlbWFpbmluZyA9IHBvc3NpYmxlUHJvbWlzZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZXMgPSBuZXcgQXJyYXkocmVtYWluaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgcG9zc2libGVQcm9taXNlcy5mb3JFYWNoKGZ1bmN0aW9uIChwLCBpKSB7IHJldHVybiBEZXhpZVByb21pc2UucmVzb2x2ZShwKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gcmVzb2x2ZSh2YWx1ZSk7IH0sIGZ1bmN0aW9uIChmYWlsdXJlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmYWlsdXJlc1tpXSA9IGZhaWx1cmU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIS0tcmVtYWluaW5nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgQWdncmVnYXRlRXJyb3IoZmFpbHVyZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7IH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIGlmIChOYXRpdmVQcm9taXNlLndpdGhSZXNvbHZlcnMpXG4gICAgICAgICAgICBEZXhpZVByb21pc2Uud2l0aFJlc29sdmVycyA9IE5hdGl2ZVByb21pc2Uud2l0aFJlc29sdmVycztcbiAgICB9XG4gICAgZnVuY3Rpb24gZXhlY3V0ZVByb21pc2VUYXNrKHByb21pc2UsIGZuKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHByb21pc2UpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZSBjYW5ub3QgYmUgcmVzb2x2ZWQgd2l0aCBpdHNlbGYuJyk7XG4gICAgICAgICAgICAgICAgdmFyIHNob3VsZEV4ZWN1dGVUaWNrID0gcHJvbWlzZS5fbGliICYmIGJlZ2luTWljcm9UaWNrU2NvcGUoKTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhlY3V0ZVByb21pc2VUYXNrKHByb21pc2UsIGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIGluc3RhbmNlb2YgRGV4aWVQcm9taXNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5fdGhlbihyZXNvbHZlLCByZWplY3QpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5fc3RhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBwcm9wYWdhdGVBbGxMaXN0ZW5lcnMocHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzaG91bGRFeGVjdXRlVGljaylcbiAgICAgICAgICAgICAgICAgICAgZW5kTWljcm9UaWNrU2NvcGUoKTtcbiAgICAgICAgICAgIH0sIGhhbmRsZVJlamVjdGlvbi5iaW5kKG51bGwsIHByb21pc2UpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIGhhbmRsZVJlamVjdGlvbihwcm9taXNlLCBleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaGFuZGxlUmVqZWN0aW9uKHByb21pc2UsIHJlYXNvbikge1xuICAgICAgICByZWplY3RpbmdFcnJvcnMucHVzaChyZWFzb24pO1xuICAgICAgICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBzaG91bGRFeGVjdXRlVGljayA9IHByb21pc2UuX2xpYiAmJiBiZWdpbk1pY3JvVGlja1Njb3BlKCk7XG4gICAgICAgIHJlYXNvbiA9IHJlamVjdGlvbk1hcHBlcihyZWFzb24pO1xuICAgICAgICBwcm9taXNlLl9zdGF0ZSA9IGZhbHNlO1xuICAgICAgICBwcm9taXNlLl92YWx1ZSA9IHJlYXNvbjtcbiAgICAgICAgYWRkUG9zc2libHlVbmhhbmRsZWRFcnJvcihwcm9taXNlKTtcbiAgICAgICAgcHJvcGFnYXRlQWxsTGlzdGVuZXJzKHByb21pc2UpO1xuICAgICAgICBpZiAoc2hvdWxkRXhlY3V0ZVRpY2spXG4gICAgICAgICAgICBlbmRNaWNyb1RpY2tTY29wZSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwcm9wYWdhdGVBbGxMaXN0ZW5lcnMocHJvbWlzZSkge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gcHJvbWlzZS5fbGlzdGVuZXJzO1xuICAgICAgICBwcm9taXNlLl9saXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgcHJvcGFnYXRlVG9MaXN0ZW5lcihwcm9taXNlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwc2QgPSBwcm9taXNlLl9QU0Q7XG4gICAgICAgIC0tcHNkLnJlZiB8fCBwc2QuZmluYWxpemUoKTtcbiAgICAgICAgaWYgKG51bVNjaGVkdWxlZENhbGxzID09PSAwKSB7XG4gICAgICAgICAgICArK251bVNjaGVkdWxlZENhbGxzO1xuICAgICAgICAgICAgYXNhcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKC0tbnVtU2NoZWR1bGVkQ2FsbHMgPT09IDApXG4gICAgICAgICAgICAgICAgICAgIGZpbmFsaXplUGh5c2ljYWxUaWNrKCk7XG4gICAgICAgICAgICB9LCBbXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcHJvcGFnYXRlVG9MaXN0ZW5lcihwcm9taXNlLCBsaXN0ZW5lcikge1xuICAgICAgICBpZiAocHJvbWlzZS5fc3RhdGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHByb21pc2UuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2IgPSBwcm9taXNlLl9zdGF0ZSA/IGxpc3RlbmVyLm9uRnVsZmlsbGVkIDogbGlzdGVuZXIub25SZWplY3RlZDtcbiAgICAgICAgaWYgKGNiID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gKHByb21pc2UuX3N0YXRlID8gbGlzdGVuZXIucmVzb2x2ZSA6IGxpc3RlbmVyLnJlamVjdCkocHJvbWlzZS5fdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgICsrbGlzdGVuZXIucHNkLnJlZjtcbiAgICAgICAgKytudW1TY2hlZHVsZWRDYWxscztcbiAgICAgICAgYXNhcChjYWxsTGlzdGVuZXIsIFtjYiwgcHJvbWlzZSwgbGlzdGVuZXJdKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2FsbExpc3RlbmVyKGNiLCBwcm9taXNlLCBsaXN0ZW5lcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHJldCwgdmFsdWUgPSBwcm9taXNlLl92YWx1ZTtcbiAgICAgICAgICAgIGlmICghcHJvbWlzZS5fc3RhdGUgJiYgcmVqZWN0aW5nRXJyb3JzLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZWplY3RpbmdFcnJvcnMgPSBbXTtcbiAgICAgICAgICAgIHJldCA9IGRlYnVnICYmIHByb21pc2UuX2NvbnNvbGVUYXNrID8gcHJvbWlzZS5fY29uc29sZVRhc2sucnVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNiKHZhbHVlKTsgfSkgOiBjYih2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoIXByb21pc2UuX3N0YXRlICYmIHJlamVjdGluZ0Vycm9ycy5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBtYXJrRXJyb3JBc0hhbmRsZWQocHJvbWlzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaXN0ZW5lci5yZXNvbHZlKHJldCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyLnJlamVjdChlKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlmICgtLW51bVNjaGVkdWxlZENhbGxzID09PSAwKVxuICAgICAgICAgICAgICAgIGZpbmFsaXplUGh5c2ljYWxUaWNrKCk7XG4gICAgICAgICAgICAtLWxpc3RlbmVyLnBzZC5yZWYgfHwgbGlzdGVuZXIucHNkLmZpbmFsaXplKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcGh5c2ljYWxUaWNrKCkge1xuICAgICAgICB1c2VQU0QoZ2xvYmFsUFNELCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBiZWdpbk1pY3JvVGlja1Njb3BlKCkgJiYgZW5kTWljcm9UaWNrU2NvcGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJlZ2luTWljcm9UaWNrU2NvcGUoKSB7XG4gICAgICAgIHZhciB3YXNSb290RXhlYyA9IGlzT3V0c2lkZU1pY3JvVGljaztcbiAgICAgICAgaXNPdXRzaWRlTWljcm9UaWNrID0gZmFsc2U7XG4gICAgICAgIG5lZWRzTmV3UGh5c2ljYWxUaWNrID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB3YXNSb290RXhlYztcbiAgICB9XG4gICAgZnVuY3Rpb24gZW5kTWljcm9UaWNrU2NvcGUoKSB7XG4gICAgICAgIHZhciBjYWxsYmFja3MsIGksIGw7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHdoaWxlIChtaWNyb3RpY2tRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzID0gbWljcm90aWNrUXVldWU7XG4gICAgICAgICAgICAgICAgbWljcm90aWNrUXVldWUgPSBbXTtcbiAgICAgICAgICAgICAgICBsID0gY2FsbGJhY2tzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gY2FsbGJhY2tzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpdGVtWzBdLmFwcGx5KG51bGwsIGl0ZW1bMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAobWljcm90aWNrUXVldWUubGVuZ3RoID4gMCk7XG4gICAgICAgIGlzT3V0c2lkZU1pY3JvVGljayA9IHRydWU7XG4gICAgICAgIG5lZWRzTmV3UGh5c2ljYWxUaWNrID0gdHJ1ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmluYWxpemVQaHlzaWNhbFRpY2soKSB7XG4gICAgICAgIHZhciB1bmhhbmRsZWRFcnJzID0gdW5oYW5kbGVkRXJyb3JzO1xuICAgICAgICB1bmhhbmRsZWRFcnJvcnMgPSBbXTtcbiAgICAgICAgdW5oYW5kbGVkRXJycy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgICBwLl9QU0Qub251bmhhbmRsZWQuY2FsbChudWxsLCBwLl92YWx1ZSwgcCk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgZmluYWxpemVycyA9IHRpY2tGaW5hbGl6ZXJzLnNsaWNlKDApO1xuICAgICAgICB2YXIgaSA9IGZpbmFsaXplcnMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaSlcbiAgICAgICAgICAgIGZpbmFsaXplcnNbLS1pXSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBydW5fYXRfZW5kX29mX3RoaXNfb3JfbmV4dF9waHlzaWNhbF90aWNrKGZuKSB7XG4gICAgICAgIGZ1bmN0aW9uIGZpbmFsaXplcigpIHtcbiAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICB0aWNrRmluYWxpemVycy5zcGxpY2UodGlja0ZpbmFsaXplcnMuaW5kZXhPZihmaW5hbGl6ZXIpLCAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aWNrRmluYWxpemVycy5wdXNoKGZpbmFsaXplcik7XG4gICAgICAgICsrbnVtU2NoZWR1bGVkQ2FsbHM7XG4gICAgICAgIGFzYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKC0tbnVtU2NoZWR1bGVkQ2FsbHMgPT09IDApXG4gICAgICAgICAgICAgICAgZmluYWxpemVQaHlzaWNhbFRpY2soKTtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRQb3NzaWJseVVuaGFuZGxlZEVycm9yKHByb21pc2UpIHtcbiAgICAgICAgaWYgKCF1bmhhbmRsZWRFcnJvcnMuc29tZShmdW5jdGlvbiAocCkgeyByZXR1cm4gcC5fdmFsdWUgPT09IHByb21pc2UuX3ZhbHVlOyB9KSlcbiAgICAgICAgICAgIHVuaGFuZGxlZEVycm9ycy5wdXNoKHByb21pc2UpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtYXJrRXJyb3JBc0hhbmRsZWQocHJvbWlzZSkge1xuICAgICAgICB2YXIgaSA9IHVuaGFuZGxlZEVycm9ycy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpKVxuICAgICAgICAgICAgaWYgKHVuaGFuZGxlZEVycm9yc1stLWldLl92YWx1ZSA9PT0gcHJvbWlzZS5fdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB1bmhhbmRsZWRFcnJvcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gUHJvbWlzZVJlamVjdChyZWFzb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEZXhpZVByb21pc2UoSU5URVJOQUwsIGZhbHNlLCByZWFzb24pO1xuICAgIH1cbiAgICBmdW5jdGlvbiB3cmFwKGZuLCBlcnJvckNhdGNoZXIpIHtcbiAgICAgICAgdmFyIHBzZCA9IFBTRDtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB3YXNSb290RXhlYyA9IGJlZ2luTWljcm9UaWNrU2NvcGUoKSwgb3V0ZXJTY29wZSA9IFBTRDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoVG9ab25lKHBzZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGVycm9yQ2F0Y2hlciAmJiBlcnJvckNhdGNoZXIoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2hUb1pvbmUob3V0ZXJTY29wZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGlmICh3YXNSb290RXhlYylcbiAgICAgICAgICAgICAgICAgICAgZW5kTWljcm9UaWNrU2NvcGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgdmFyIHRhc2sgPSB7IGF3YWl0czogMCwgZWNob2VzOiAwLCBpZDogMCB9O1xuICAgIHZhciB0YXNrQ291bnRlciA9IDA7XG4gICAgdmFyIHpvbmVTdGFjayA9IFtdO1xuICAgIHZhciB6b25lRWNob2VzID0gMDtcbiAgICB2YXIgdG90YWxFY2hvZXMgPSAwO1xuICAgIHZhciB6b25lX2lkX2NvdW50ZXIgPSAwO1xuICAgIGZ1bmN0aW9uIG5ld1Njb3BlKGZuLCBwcm9wcywgYTEsIGEyKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSBQU0QsIHBzZCA9IE9iamVjdC5jcmVhdGUocGFyZW50KTtcbiAgICAgICAgcHNkLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgcHNkLnJlZiA9IDA7XG4gICAgICAgIHBzZC5nbG9iYWwgPSBmYWxzZTtcbiAgICAgICAgcHNkLmlkID0gKyt6b25lX2lkX2NvdW50ZXI7XG4gICAgICAgIGdsb2JhbFBTRC5lbnY7XG4gICAgICAgIHBzZC5lbnYgPSBwYXRjaEdsb2JhbFByb21pc2UgPyB7XG4gICAgICAgICAgICBQcm9taXNlOiBEZXhpZVByb21pc2UsXG4gICAgICAgICAgICBQcm9taXNlUHJvcDogeyB2YWx1ZTogRGV4aWVQcm9taXNlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0sXG4gICAgICAgICAgICBhbGw6IERleGllUHJvbWlzZS5hbGwsXG4gICAgICAgICAgICByYWNlOiBEZXhpZVByb21pc2UucmFjZSxcbiAgICAgICAgICAgIGFsbFNldHRsZWQ6IERleGllUHJvbWlzZS5hbGxTZXR0bGVkLFxuICAgICAgICAgICAgYW55OiBEZXhpZVByb21pc2UuYW55LFxuICAgICAgICAgICAgcmVzb2x2ZTogRGV4aWVQcm9taXNlLnJlc29sdmUsXG4gICAgICAgICAgICByZWplY3Q6IERleGllUHJvbWlzZS5yZWplY3QsXG4gICAgICAgIH0gOiB7fTtcbiAgICAgICAgaWYgKHByb3BzKVxuICAgICAgICAgICAgZXh0ZW5kKHBzZCwgcHJvcHMpO1xuICAgICAgICArK3BhcmVudC5yZWY7XG4gICAgICAgIHBzZC5maW5hbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC0tdGhpcy5wYXJlbnQucmVmIHx8IHRoaXMucGFyZW50LmZpbmFsaXplKCk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBydiA9IHVzZVBTRChwc2QsIGZuLCBhMSwgYTIpO1xuICAgICAgICBpZiAocHNkLnJlZiA9PT0gMClcbiAgICAgICAgICAgIHBzZC5maW5hbGl6ZSgpO1xuICAgICAgICByZXR1cm4gcnY7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluY3JlbWVudEV4cGVjdGVkQXdhaXRzKCkge1xuICAgICAgICBpZiAoIXRhc2suaWQpXG4gICAgICAgICAgICB0YXNrLmlkID0gKyt0YXNrQ291bnRlcjtcbiAgICAgICAgKyt0YXNrLmF3YWl0cztcbiAgICAgICAgdGFzay5lY2hvZXMgKz0gWk9ORV9FQ0hPX0xJTUlUO1xuICAgICAgICByZXR1cm4gdGFzay5pZDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZGVjcmVtZW50RXhwZWN0ZWRBd2FpdHMoKSB7XG4gICAgICAgIGlmICghdGFzay5hd2FpdHMpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICgtLXRhc2suYXdhaXRzID09PSAwKVxuICAgICAgICAgICAgdGFzay5pZCA9IDA7XG4gICAgICAgIHRhc2suZWNob2VzID0gdGFzay5hd2FpdHMgKiBaT05FX0VDSE9fTElNSVQ7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoKCcnICsgbmF0aXZlUHJvbWlzZVRoZW4pLmluZGV4T2YoJ1tuYXRpdmUgY29kZV0nKSA9PT0gLTEpIHtcbiAgICAgICAgaW5jcmVtZW50RXhwZWN0ZWRBd2FpdHMgPSBkZWNyZW1lbnRFeHBlY3RlZEF3YWl0cyA9IG5vcDtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25Qb3NzaWJsZVBhcmFsbGVsbEFzeW5jKHBvc3NpYmxlUHJvbWlzZSkge1xuICAgICAgICBpZiAodGFzay5lY2hvZXMgJiYgcG9zc2libGVQcm9taXNlICYmIHBvc3NpYmxlUHJvbWlzZS5jb25zdHJ1Y3RvciA9PT0gTmF0aXZlUHJvbWlzZSkge1xuICAgICAgICAgICAgaW5jcmVtZW50RXhwZWN0ZWRBd2FpdHMoKTtcbiAgICAgICAgICAgIHJldHVybiBwb3NzaWJsZVByb21pc2UudGhlbihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgIGRlY3JlbWVudEV4cGVjdGVkQXdhaXRzKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGRlY3JlbWVudEV4cGVjdGVkQXdhaXRzKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdGlvbihlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwb3NzaWJsZVByb21pc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHpvbmVFbnRlckVjaG8odGFyZ2V0Wm9uZSkge1xuICAgICAgICArK3RvdGFsRWNob2VzO1xuICAgICAgICBpZiAoIXRhc2suZWNob2VzIHx8IC0tdGFzay5lY2hvZXMgPT09IDApIHtcbiAgICAgICAgICAgIHRhc2suZWNob2VzID0gdGFzay5hd2FpdHMgPSB0YXNrLmlkID0gMDtcbiAgICAgICAgfVxuICAgICAgICB6b25lU3RhY2sucHVzaChQU0QpO1xuICAgICAgICBzd2l0Y2hUb1pvbmUodGFyZ2V0Wm9uZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHpvbmVMZWF2ZUVjaG8oKSB7XG4gICAgICAgIHZhciB6b25lID0gem9uZVN0YWNrW3pvbmVTdGFjay5sZW5ndGggLSAxXTtcbiAgICAgICAgem9uZVN0YWNrLnBvcCgpO1xuICAgICAgICBzd2l0Y2hUb1pvbmUoem9uZSwgZmFsc2UpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzd2l0Y2hUb1pvbmUodGFyZ2V0Wm9uZSwgYkVudGVyaW5nWm9uZSkge1xuICAgICAgICB2YXIgY3VycmVudFpvbmUgPSBQU0Q7XG4gICAgICAgIGlmIChiRW50ZXJpbmdab25lID8gdGFzay5lY2hvZXMgJiYgKCF6b25lRWNob2VzKysgfHwgdGFyZ2V0Wm9uZSAhPT0gUFNEKSA6IHpvbmVFY2hvZXMgJiYgKCEtLXpvbmVFY2hvZXMgfHwgdGFyZ2V0Wm9uZSAhPT0gUFNEKSkge1xuICAgICAgICAgICAgcXVldWVNaWNyb3Rhc2soYkVudGVyaW5nWm9uZSA/IHpvbmVFbnRlckVjaG8uYmluZChudWxsLCB0YXJnZXRab25lKSA6IHpvbmVMZWF2ZUVjaG8pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YXJnZXRab25lID09PSBQU0QpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIFBTRCA9IHRhcmdldFpvbmU7XG4gICAgICAgIGlmIChjdXJyZW50Wm9uZSA9PT0gZ2xvYmFsUFNEKVxuICAgICAgICAgICAgZ2xvYmFsUFNELmVudiA9IHNuYXBTaG90KCk7XG4gICAgICAgIGlmIChwYXRjaEdsb2JhbFByb21pc2UpIHtcbiAgICAgICAgICAgIHZhciBHbG9iYWxQcm9taXNlID0gZ2xvYmFsUFNELmVudi5Qcm9taXNlO1xuICAgICAgICAgICAgdmFyIHRhcmdldEVudiA9IHRhcmdldFpvbmUuZW52O1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRab25lLmdsb2JhbCB8fCB0YXJnZXRab25lLmdsb2JhbCkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfZ2xvYmFsLCAnUHJvbWlzZScsIHRhcmdldEVudi5Qcm9taXNlUHJvcCk7XG4gICAgICAgICAgICAgICAgR2xvYmFsUHJvbWlzZS5hbGwgPSB0YXJnZXRFbnYuYWxsO1xuICAgICAgICAgICAgICAgIEdsb2JhbFByb21pc2UucmFjZSA9IHRhcmdldEVudi5yYWNlO1xuICAgICAgICAgICAgICAgIEdsb2JhbFByb21pc2UucmVzb2x2ZSA9IHRhcmdldEVudi5yZXNvbHZlO1xuICAgICAgICAgICAgICAgIEdsb2JhbFByb21pc2UucmVqZWN0ID0gdGFyZ2V0RW52LnJlamVjdDtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0RW52LmFsbFNldHRsZWQpXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbFByb21pc2UuYWxsU2V0dGxlZCA9IHRhcmdldEVudi5hbGxTZXR0bGVkO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbnYuYW55KVxuICAgICAgICAgICAgICAgICAgICBHbG9iYWxQcm9taXNlLmFueSA9IHRhcmdldEVudi5hbnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc25hcFNob3QoKSB7XG4gICAgICAgIHZhciBHbG9iYWxQcm9taXNlID0gX2dsb2JhbC5Qcm9taXNlO1xuICAgICAgICByZXR1cm4gcGF0Y2hHbG9iYWxQcm9taXNlID8ge1xuICAgICAgICAgICAgUHJvbWlzZTogR2xvYmFsUHJvbWlzZSxcbiAgICAgICAgICAgIFByb21pc2VQcm9wOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKF9nbG9iYWwsIFwiUHJvbWlzZVwiKSxcbiAgICAgICAgICAgIGFsbDogR2xvYmFsUHJvbWlzZS5hbGwsXG4gICAgICAgICAgICByYWNlOiBHbG9iYWxQcm9taXNlLnJhY2UsXG4gICAgICAgICAgICBhbGxTZXR0bGVkOiBHbG9iYWxQcm9taXNlLmFsbFNldHRsZWQsXG4gICAgICAgICAgICBhbnk6IEdsb2JhbFByb21pc2UuYW55LFxuICAgICAgICAgICAgcmVzb2x2ZTogR2xvYmFsUHJvbWlzZS5yZXNvbHZlLFxuICAgICAgICAgICAgcmVqZWN0OiBHbG9iYWxQcm9taXNlLnJlamVjdCxcbiAgICAgICAgfSA6IHt9O1xuICAgIH1cbiAgICBmdW5jdGlvbiB1c2VQU0QocHNkLCBmbiwgYTEsIGEyLCBhMykge1xuICAgICAgICB2YXIgb3V0ZXJTY29wZSA9IFBTRDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN3aXRjaFRvWm9uZShwc2QsIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuIGZuKGExLCBhMiwgYTMpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc3dpdGNoVG9ab25lKG91dGVyU2NvcGUsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBuYXRpdmVBd2FpdENvbXBhdGlibGVXcmFwKGZuLCB6b25lLCBwb3NzaWJsZUF3YWl0LCBjbGVhbnVwKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicgPyBmbiA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvdXRlclpvbmUgPSBQU0Q7XG4gICAgICAgICAgICBpZiAocG9zc2libGVBd2FpdClcbiAgICAgICAgICAgICAgICBpbmNyZW1lbnRFeHBlY3RlZEF3YWl0cygpO1xuICAgICAgICAgICAgc3dpdGNoVG9ab25lKHpvbmUsIHRydWUpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHN3aXRjaFRvWm9uZShvdXRlclpvbmUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBpZiAoY2xlYW51cClcbiAgICAgICAgICAgICAgICAgICAgcXVldWVNaWNyb3Rhc2soZGVjcmVtZW50RXhwZWN0ZWRBd2FpdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBleGVjSW5HbG9iYWxDb250ZXh0KGNiKSB7XG4gICAgICAgIGlmIChQcm9taXNlID09PSBOYXRpdmVQcm9taXNlICYmIHRhc2suZWNob2VzID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoem9uZUVjaG9lcyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbnF1ZXVlTmF0aXZlTWljcm9UYXNrKGNiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoY2IsIDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciByZWplY3Rpb24gPSBEZXhpZVByb21pc2UucmVqZWN0O1xuXG4gICAgZnVuY3Rpb24gdGVtcFRyYW5zYWN0aW9uKGRiLCBtb2RlLCBzdG9yZU5hbWVzLCBmbikge1xuICAgICAgICBpZiAoIWRiLmlkYmRiIHx8ICghZGIuX3N0YXRlLm9wZW5Db21wbGV0ZSAmJiAoIVBTRC5sZXRUaHJvdWdoICYmICFkYi5fdmlwKSkpIHtcbiAgICAgICAgICAgIGlmIChkYi5fc3RhdGUub3BlbkNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdGlvbihuZXcgZXhjZXB0aW9ucy5EYXRhYmFzZUNsb3NlZChkYi5fc3RhdGUuZGJPcGVuRXJyb3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZGIuX3N0YXRlLmlzQmVpbmdPcGVuZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRiLl9zdGF0ZS5hdXRvT3BlbilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdGlvbihuZXcgZXhjZXB0aW9ucy5EYXRhYmFzZUNsb3NlZCgpKTtcbiAgICAgICAgICAgICAgICBkYi5vcGVuKCkuY2F0Y2gobm9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkYi5fc3RhdGUuZGJSZWFkeVByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB0ZW1wVHJhbnNhY3Rpb24oZGIsIG1vZGUsIHN0b3JlTmFtZXMsIGZuKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgdHJhbnMgPSBkYi5fY3JlYXRlVHJhbnNhY3Rpb24obW9kZSwgc3RvcmVOYW1lcywgZGIuX2RiU2NoZW1hKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdHJhbnMuY3JlYXRlKCk7XG4gICAgICAgICAgICAgICAgZGIuX3N0YXRlLlBSMTM5OF9tYXhMb29wID0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgIGlmIChleC5uYW1lID09PSBlcnJuYW1lcy5JbnZhbGlkU3RhdGUgJiYgZGIuaXNPcGVuKCkgJiYgLS1kYi5fc3RhdGUuUFIxMzk4X21heExvb3AgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignRGV4aWU6IE5lZWQgdG8gcmVvcGVuIGRiJyk7XG4gICAgICAgICAgICAgICAgICAgIGRiLmNsb3NlKHsgZGlzYWJsZUF1dG9PcGVuOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRiLm9wZW4oKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRlbXBUcmFuc2FjdGlvbihkYiwgbW9kZSwgc3RvcmVOYW1lcywgZm4pOyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdGlvbihleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJhbnMuX3Byb21pc2UobW9kZSwgZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdTY29wZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIFBTRC50cmFucyA9IHRyYW5zO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm4ocmVzb2x2ZSwgcmVqZWN0LCB0cmFucyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBpZiAobW9kZSA9PT0gJ3JlYWR3cml0ZScpXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFucy5pZGJ0cmFucy5jb21taXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoX2EpIHsgfVxuICAgICAgICAgICAgICAgIHJldHVybiBtb2RlID09PSAncmVhZG9ubHknID8gcmVzdWx0IDogdHJhbnMuX2NvbXBsZXRpb24udGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiByZXN1bHQ7IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgREVYSUVfVkVSU0lPTiA9ICc0LjAuMTEnO1xuICAgIHZhciBtYXhTdHJpbmcgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1NTM1KTtcbiAgICB2YXIgbWluS2V5ID0gLUluZmluaXR5O1xuICAgIHZhciBJTlZBTElEX0tFWV9BUkdVTUVOVCA9IFwiSW52YWxpZCBrZXkgcHJvdmlkZWQuIEtleXMgbXVzdCBiZSBvZiB0eXBlIHN0cmluZywgbnVtYmVyLCBEYXRlIG9yIEFycmF5PHN0cmluZyB8IG51bWJlciB8IERhdGU+LlwiO1xuICAgIHZhciBTVFJJTkdfRVhQRUNURUQgPSBcIlN0cmluZyBleHBlY3RlZC5cIjtcbiAgICB2YXIgY29ubmVjdGlvbnMgPSBbXTtcbiAgICB2YXIgREJOQU1FU19EQiA9ICdfX2RibmFtZXMnO1xuICAgIHZhciBSRUFET05MWSA9ICdyZWFkb25seSc7XG4gICAgdmFyIFJFQURXUklURSA9ICdyZWFkd3JpdGUnO1xuXG4gICAgZnVuY3Rpb24gY29tYmluZShmaWx0ZXIxLCBmaWx0ZXIyKSB7XG4gICAgICAgIHJldHVybiBmaWx0ZXIxID9cbiAgICAgICAgICAgIGZpbHRlcjIgP1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZpbHRlcjEuYXBwbHkodGhpcywgYXJndW1lbnRzKSAmJiBmaWx0ZXIyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH0gOlxuICAgICAgICAgICAgICAgIGZpbHRlcjEgOlxuICAgICAgICAgICAgZmlsdGVyMjtcbiAgICB9XG5cbiAgICB2YXIgQW55UmFuZ2UgPSB7XG4gICAgICAgIHR5cGU6IDMgLFxuICAgICAgICBsb3dlcjogLUluZmluaXR5LFxuICAgICAgICBsb3dlck9wZW46IGZhbHNlLFxuICAgICAgICB1cHBlcjogW1tdXSxcbiAgICAgICAgdXBwZXJPcGVuOiBmYWxzZVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiB3b3JrYXJvdW5kRm9yVW5kZWZpbmVkUHJpbUtleShrZXlQYXRoKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Yga2V5UGF0aCA9PT0gXCJzdHJpbmdcIiAmJiAhL1xcLi8udGVzdChrZXlQYXRoKVxuICAgICAgICAgICAgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialtrZXlQYXRoXSA9PT0gdW5kZWZpbmVkICYmIChrZXlQYXRoIGluIG9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gZGVlcENsb25lKG9iaik7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmpba2V5UGF0aF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iajsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBFbnRpdHkoKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbnMuVHlwZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNtcChhLCBiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgdGEgPSB0eXBlKGEpO1xuICAgICAgICAgICAgdmFyIHRiID0gdHlwZShiKTtcbiAgICAgICAgICAgIGlmICh0YSAhPT0gdGIpIHtcbiAgICAgICAgICAgICAgICBpZiAodGEgPT09ICdBcnJheScpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIGlmICh0YiA9PT0gJ0FycmF5JylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIGlmICh0YSA9PT0gJ2JpbmFyeScpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIGlmICh0YiA9PT0gJ2JpbmFyeScpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICBpZiAodGEgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICBpZiAodGIgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgaWYgKHRhID09PSAnRGF0ZScpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIGlmICh0YiAhPT0gJ0RhdGUnKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAodGEpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0RhdGUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhID4gYiA/IDEgOiBhIDwgYiA/IC0xIDogMDtcbiAgICAgICAgICAgICAgICBjYXNlICdiaW5hcnknOiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21wYXJlVWludDhBcnJheXMoZ2V0VWludDhBcnJheShhKSwgZ2V0VWludDhBcnJheShiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgJ0FycmF5JzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmVBcnJheXMoYSwgYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKF9hKSB7IH1cbiAgICAgICAgcmV0dXJuIE5hTjtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29tcGFyZUFycmF5cyhhLCBiKSB7XG4gICAgICAgIHZhciBhbCA9IGEubGVuZ3RoO1xuICAgICAgICB2YXIgYmwgPSBiLmxlbmd0aDtcbiAgICAgICAgdmFyIGwgPSBhbCA8IGJsID8gYWwgOiBibDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBjbXAoYVtpXSwgYltpXSk7XG4gICAgICAgICAgICBpZiAocmVzICE9PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFsID09PSBibCA/IDAgOiBhbCA8IGJsID8gLTEgOiAxO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb21wYXJlVWludDhBcnJheXMoYSwgYikge1xuICAgICAgICB2YXIgYWwgPSBhLmxlbmd0aDtcbiAgICAgICAgdmFyIGJsID0gYi5sZW5ndGg7XG4gICAgICAgIHZhciBsID0gYWwgPCBibCA/IGFsIDogYmw7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoYVtpXSAhPT0gYltpXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gYVtpXSA8IGJbaV0gPyAtMSA6IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFsID09PSBibCA/IDAgOiBhbCA8IGJsID8gLTEgOiAxO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0eXBlKHgpIHtcbiAgICAgICAgdmFyIHQgPSB0eXBlb2YgeDtcbiAgICAgICAgaWYgKHQgIT09ICdvYmplY3QnKVxuICAgICAgICAgICAgcmV0dXJuIHQ7XG4gICAgICAgIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoeCkpXG4gICAgICAgICAgICByZXR1cm4gJ2JpbmFyeSc7XG4gICAgICAgIHZhciB0c1RhZyA9IHRvU3RyaW5nVGFnKHgpO1xuICAgICAgICByZXR1cm4gdHNUYWcgPT09ICdBcnJheUJ1ZmZlcicgPyAnYmluYXJ5JyA6IHRzVGFnO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRVaW50OEFycmF5KGEpIHtcbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KVxuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoYSkpXG4gICAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYS5idWZmZXIsIGEuYnl0ZU9mZnNldCwgYS5ieXRlTGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGEpO1xuICAgIH1cblxuICAgIHZhciBUYWJsZSA9ICAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBUYWJsZSgpIHtcbiAgICAgICAgfVxuICAgICAgICBUYWJsZS5wcm90b3R5cGUuX3RyYW5zID0gZnVuY3Rpb24gKG1vZGUsIGZuLCB3cml0ZUxvY2tlZCkge1xuICAgICAgICAgICAgdmFyIHRyYW5zID0gdGhpcy5fdHggfHwgUFNELnRyYW5zO1xuICAgICAgICAgICAgdmFyIHRhYmxlTmFtZSA9IHRoaXMubmFtZTtcbiAgICAgICAgICAgIHZhciB0YXNrID0gZGVidWcgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGUuY3JlYXRlVGFzayAmJiBjb25zb2xlLmNyZWF0ZVRhc2soXCJEZXhpZTogXCIuY29uY2F0KG1vZGUgPT09ICdyZWFkb25seScgPyAncmVhZCcgOiAnd3JpdGUnLCBcIiBcIikuY29uY2F0KHRoaXMubmFtZSkpO1xuICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tUYWJsZUluVHJhbnNhY3Rpb24ocmVzb2x2ZSwgcmVqZWN0LCB0cmFucykge1xuICAgICAgICAgICAgICAgIGlmICghdHJhbnMuc2NoZW1hW3RhYmxlTmFtZV0pXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLk5vdEZvdW5kKFwiVGFibGUgXCIgKyB0YWJsZU5hbWUgKyBcIiBub3QgcGFydCBvZiB0cmFuc2FjdGlvblwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4odHJhbnMuaWRidHJhbnMsIHRyYW5zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB3YXNSb290RXhlYyA9IGJlZ2luTWljcm9UaWNrU2NvcGUoKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIHAgPSB0cmFucyAmJiB0cmFucy5kYi5fbm92aXAgPT09IHRoaXMuZGIuX25vdmlwID9cbiAgICAgICAgICAgICAgICAgICAgdHJhbnMgPT09IFBTRC50cmFucyA/XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFucy5fcHJvbWlzZShtb2RlLCBjaGVja1RhYmxlSW5UcmFuc2FjdGlvbiwgd3JpdGVMb2NrZWQpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Njb3BlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRyYW5zLl9wcm9taXNlKG1vZGUsIGNoZWNrVGFibGVJblRyYW5zYWN0aW9uLCB3cml0ZUxvY2tlZCk7IH0sIHsgdHJhbnM6IHRyYW5zLCB0cmFuc2xlc3M6IFBTRC50cmFuc2xlc3MgfHwgUFNEIH0pIDpcbiAgICAgICAgICAgICAgICAgICAgdGVtcFRyYW5zYWN0aW9uKHRoaXMuZGIsIG1vZGUsIFt0aGlzLm5hbWVdLCBjaGVja1RhYmxlSW5UcmFuc2FjdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgcC5fY29uc29sZVRhc2sgPSB0YXNrO1xuICAgICAgICAgICAgICAgICAgICBwID0gcC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLnRyYWNlKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uKGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGlmICh3YXNSb290RXhlYylcbiAgICAgICAgICAgICAgICAgICAgZW5kTWljcm9UaWNrU2NvcGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXlPckNyaXQsIGNiKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgaWYgKGtleU9yQ3JpdCAmJiBrZXlPckNyaXQuY29uc3RydWN0b3IgPT09IE9iamVjdClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aGVyZShrZXlPckNyaXQpLmZpcnN0KGNiKTtcbiAgICAgICAgICAgIGlmIChrZXlPckNyaXQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uKG5ldyBleGNlcHRpb25zLlR5cGUoXCJJbnZhbGlkIGFyZ3VtZW50IHRvIFRhYmxlLmdldCgpXCIpKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90cmFucygncmVhZG9ubHknLCBmdW5jdGlvbiAodHJhbnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuY29yZS5nZXQoeyB0cmFuczogdHJhbnMsIGtleToga2V5T3JDcml0IH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLmhvb2sucmVhZGluZy5maXJlKHJlcyk7IH0pO1xuICAgICAgICAgICAgfSkudGhlbihjYik7XG4gICAgICAgIH07XG4gICAgICAgIFRhYmxlLnByb3RvdHlwZS53aGVyZSA9IGZ1bmN0aW9uIChpbmRleE9yQ3JpdCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbmRleE9yQ3JpdCA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzLmRiLldoZXJlQ2xhdXNlKHRoaXMsIGluZGV4T3JDcml0KTtcbiAgICAgICAgICAgIGlmIChpc0FycmF5KGluZGV4T3JDcml0KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMuZGIuV2hlcmVDbGF1c2UodGhpcywgXCJbXCIuY29uY2F0KGluZGV4T3JDcml0LmpvaW4oJysnKSwgXCJdXCIpKTtcbiAgICAgICAgICAgIHZhciBrZXlQYXRocyA9IGtleXMoaW5kZXhPckNyaXQpO1xuICAgICAgICAgICAgaWYgKGtleVBhdGhzLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICAgICAgICAgICAgICAud2hlcmUoa2V5UGF0aHNbMF0pXG4gICAgICAgICAgICAgICAgICAgIC5lcXVhbHMoaW5kZXhPckNyaXRba2V5UGF0aHNbMF1dKTtcbiAgICAgICAgICAgIHZhciBjb21wb3VuZEluZGV4ID0gdGhpcy5zY2hlbWEuaW5kZXhlcy5jb25jYXQodGhpcy5zY2hlbWEucHJpbUtleSkuZmlsdGVyKGZ1bmN0aW9uIChpeCkge1xuICAgICAgICAgICAgICAgIGlmIChpeC5jb21wb3VuZCAmJlxuICAgICAgICAgICAgICAgICAgICBrZXlQYXRocy5ldmVyeShmdW5jdGlvbiAoa2V5UGF0aCkgeyByZXR1cm4gaXgua2V5UGF0aC5pbmRleE9mKGtleVBhdGgpID49IDA7IH0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5UGF0aHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXlQYXRocy5pbmRleE9mKGl4LmtleVBhdGhbaV0pID09PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEua2V5UGF0aC5sZW5ndGggLSBiLmtleVBhdGgubGVuZ3RoOyB9KVswXTtcbiAgICAgICAgICAgIGlmIChjb21wb3VuZEluZGV4ICYmIHRoaXMuZGIuX21heEtleSAhPT0gbWF4U3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleVBhdGhzSW5WYWxpZE9yZGVyID0gY29tcG91bmRJbmRleC5rZXlQYXRoLnNsaWNlKDAsIGtleVBhdGhzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgLndoZXJlKGtleVBhdGhzSW5WYWxpZE9yZGVyKVxuICAgICAgICAgICAgICAgICAgICAuZXF1YWxzKGtleVBhdGhzSW5WYWxpZE9yZGVyLm1hcChmdW5jdGlvbiAoa3ApIHsgcmV0dXJuIGluZGV4T3JDcml0W2twXTsgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjb21wb3VuZEluZGV4ICYmIGRlYnVnKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlRoZSBxdWVyeSBcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkoaW5kZXhPckNyaXQpLCBcIiBvbiBcIikuY29uY2F0KHRoaXMubmFtZSwgXCIgd291bGQgYmVuZWZpdCBmcm9tIGEgXCIpICtcbiAgICAgICAgICAgICAgICAgICAgXCJjb21wb3VuZCBpbmRleCBbXCIuY29uY2F0KGtleVBhdGhzLmpvaW4oJysnKSwgXCJdXCIpKTtcbiAgICAgICAgICAgIHZhciBpZHhCeU5hbWUgPSB0aGlzLnNjaGVtYS5pZHhCeU5hbWU7XG4gICAgICAgICAgICBmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjbXAoYSwgYikgPT09IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgX2EgPSBrZXlQYXRocy5yZWR1Y2UoZnVuY3Rpb24gKF9hLCBrZXlQYXRoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZJbmRleCA9IF9hWzBdLCBwcmV2RmlsdGVyRm4gPSBfYVsxXTtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBpZHhCeU5hbWVba2V5UGF0aF07XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gaW5kZXhPckNyaXRba2V5UGF0aF07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgcHJldkluZGV4IHx8IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICBwcmV2SW5kZXggfHwgIWluZGV4ID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmUocHJldkZpbHRlckZuLCBpbmRleCAmJiBpbmRleC5tdWx0aSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3AgPSBnZXRCeUtleVBhdGgoeCwga2V5UGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc0FycmF5KHByb3ApICYmIHByb3Auc29tZShmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gZXF1YWxzKHZhbHVlLCBpdGVtKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSA6IGZ1bmN0aW9uICh4KSB7IHJldHVybiBlcXVhbHModmFsdWUsIGdldEJ5S2V5UGF0aCh4LCBrZXlQYXRoKSk7IH0pXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHByZXZGaWx0ZXJGblxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9LCBbbnVsbCwgbnVsbF0pLCBpZHggPSBfYVswXSwgZmlsdGVyRnVuY3Rpb24gPSBfYVsxXTtcbiAgICAgICAgICAgIHJldHVybiBpZHggP1xuICAgICAgICAgICAgICAgIHRoaXMud2hlcmUoaWR4Lm5hbWUpLmVxdWFscyhpbmRleE9yQ3JpdFtpZHgua2V5UGF0aF0pXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZmlsdGVyRnVuY3Rpb24pIDpcbiAgICAgICAgICAgICAgICBjb21wb3VuZEluZGV4ID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIoZmlsdGVyRnVuY3Rpb24pIDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aGVyZShrZXlQYXRocykuZXF1YWxzKCcnKTtcbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uIChmaWx0ZXJGdW5jdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9Db2xsZWN0aW9uKCkuYW5kKGZpbHRlckZ1bmN0aW9uKTtcbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLmNvdW50ID0gZnVuY3Rpb24gKHRoZW5TaG9ydGN1dCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9Db2xsZWN0aW9uKCkuY291bnQodGhlblNob3J0Y3V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLm9mZnNldCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvQ29sbGVjdGlvbigpLm9mZnNldChvZmZzZXQpO1xuICAgICAgICB9O1xuICAgICAgICBUYWJsZS5wcm90b3R5cGUubGltaXQgPSBmdW5jdGlvbiAobnVtUm93cykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9Db2xsZWN0aW9uKCkubGltaXQobnVtUm93cyk7XG4gICAgICAgIH07XG4gICAgICAgIFRhYmxlLnByb3RvdHlwZS5lYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b0NvbGxlY3Rpb24oKS5lYWNoKGNhbGxiYWNrKTtcbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAodGhlblNob3J0Y3V0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b0NvbGxlY3Rpb24oKS50b0FycmF5KHRoZW5TaG9ydGN1dCk7XG4gICAgICAgIH07XG4gICAgICAgIFRhYmxlLnByb3RvdHlwZS50b0NvbGxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMuZGIuQ29sbGVjdGlvbihuZXcgdGhpcy5kYi5XaGVyZUNsYXVzZSh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIFRhYmxlLnByb3RvdHlwZS5vcmRlckJ5ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMuZGIuQ29sbGVjdGlvbihuZXcgdGhpcy5kYi5XaGVyZUNsYXVzZSh0aGlzLCBpc0FycmF5KGluZGV4KSA/XG4gICAgICAgICAgICAgICAgXCJbXCIuY29uY2F0KGluZGV4LmpvaW4oJysnKSwgXCJdXCIpIDpcbiAgICAgICAgICAgICAgICBpbmRleCkpO1xuICAgICAgICB9O1xuICAgICAgICBUYWJsZS5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvQ29sbGVjdGlvbigpLnJldmVyc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLm1hcFRvQ2xhc3MgPSBmdW5jdGlvbiAoY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IHRoaXMsIGRiID0gX2EuZGIsIHRhYmxlTmFtZSA9IF9hLm5hbWU7XG4gICAgICAgICAgICB0aGlzLnNjaGVtYS5tYXBwZWRDbGFzcyA9IGNvbnN0cnVjdG9yO1xuICAgICAgICAgICAgaWYgKGNvbnN0cnVjdG9yLnByb3RvdHlwZSBpbnN0YW5jZW9mIEVudGl0eSkge1xuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yID0gIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIF9fZXh0ZW5kcyhjbGFzc18xLCBfc3VwZXIpO1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBjbGFzc18xKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbGFzc18xLnByb3RvdHlwZSwgXCJkYlwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRiOyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzXzEucHJvdG90eXBlLnRhYmxlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGFibGVOYW1lOyB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NfMTtcbiAgICAgICAgICAgICAgICB9KGNvbnN0cnVjdG9yKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaW5oZXJpdGVkUHJvcHMgPSBuZXcgU2V0KCk7XG4gICAgICAgICAgICBmb3IgKHZhciBwcm90byA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZTsgcHJvdG87IHByb3RvID0gZ2V0UHJvdG8ocHJvdG8pKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pLmZvckVhY2goZnVuY3Rpb24gKHByb3BOYW1lKSB7IHJldHVybiBpbmhlcml0ZWRQcm9wcy5hZGQocHJvcE5hbWUpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZWFkSG9vayA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9iailcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICB2YXIgcmVzID0gT2JqZWN0LmNyZWF0ZShjb25zdHJ1Y3Rvci5wcm90b3R5cGUpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG0gaW4gb2JqKVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWluaGVyaXRlZFByb3BzLmhhcyhtKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzW21dID0gb2JqW21dO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKF8pIHsgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NoZW1hLnJlYWRIb29rKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ob29rLnJlYWRpbmcudW5zdWJzY3JpYmUodGhpcy5zY2hlbWEucmVhZEhvb2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zY2hlbWEucmVhZEhvb2sgPSByZWFkSG9vaztcbiAgICAgICAgICAgIHRoaXMuaG9vayhcInJlYWRpbmdcIiwgcmVhZEhvb2spO1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yO1xuICAgICAgICB9O1xuICAgICAgICBUYWJsZS5wcm90b3R5cGUuZGVmaW5lQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBDbGFzcyhjb250ZW50KSB7XG4gICAgICAgICAgICAgICAgZXh0ZW5kKHRoaXMsIGNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwVG9DbGFzcyhDbGFzcyk7XG4gICAgICAgIH07XG4gICAgICAgIFRhYmxlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAob2JqLCBrZXkpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgX2EgPSB0aGlzLnNjaGVtYS5wcmltS2V5LCBhdXRvID0gX2EuYXV0bywga2V5UGF0aCA9IF9hLmtleVBhdGg7XG4gICAgICAgICAgICB2YXIgb2JqVG9BZGQgPSBvYmo7XG4gICAgICAgICAgICBpZiAoa2V5UGF0aCAmJiBhdXRvKSB7XG4gICAgICAgICAgICAgICAgb2JqVG9BZGQgPSB3b3JrYXJvdW5kRm9yVW5kZWZpbmVkUHJpbUtleShrZXlQYXRoKShvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zKCdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHJhbnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuY29yZS5tdXRhdGUoeyB0cmFuczogdHJhbnMsIHR5cGU6ICdhZGQnLCBrZXlzOiBrZXkgIT0gbnVsbCA/IFtrZXldIDogbnVsbCwgdmFsdWVzOiBbb2JqVG9BZGRdIH0pO1xuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMubnVtRmFpbHVyZXMgPyBEZXhpZVByb21pc2UucmVqZWN0KHJlcy5mYWlsdXJlc1swXSkgOiByZXMubGFzdFJlc3VsdDsgfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobGFzdFJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGlmIChrZXlQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRCeUtleVBhdGgob2JqLCBrZXlQYXRoLCBsYXN0UmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoXykgeyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBsYXN0UmVzdWx0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFRhYmxlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoa2V5T3JPYmplY3QsIG1vZGlmaWNhdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5T3JPYmplY3QgPT09ICdvYmplY3QnICYmICFpc0FycmF5KGtleU9yT2JqZWN0KSkge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBnZXRCeUtleVBhdGgoa2V5T3JPYmplY3QsIHRoaXMuc2NoZW1hLnByaW1LZXkua2V5UGF0aCk7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uKG5ldyBleGNlcHRpb25zLkludmFsaWRBcmd1bWVudChcIkdpdmVuIG9iamVjdCBkb2VzIG5vdCBjb250YWluIGl0cyBwcmltYXJ5IGtleVwiKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2hlcmUoXCI6aWRcIikuZXF1YWxzKGtleSkubW9kaWZ5KG1vZGlmaWNhdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2hlcmUoXCI6aWRcIikuZXF1YWxzKGtleU9yT2JqZWN0KS5tb2RpZnkobW9kaWZpY2F0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFRhYmxlLnByb3RvdHlwZS5wdXQgPSBmdW5jdGlvbiAob2JqLCBrZXkpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgX2EgPSB0aGlzLnNjaGVtYS5wcmltS2V5LCBhdXRvID0gX2EuYXV0bywga2V5UGF0aCA9IF9hLmtleVBhdGg7XG4gICAgICAgICAgICB2YXIgb2JqVG9BZGQgPSBvYmo7XG4gICAgICAgICAgICBpZiAoa2V5UGF0aCAmJiBhdXRvKSB7XG4gICAgICAgICAgICAgICAgb2JqVG9BZGQgPSB3b3JrYXJvdW5kRm9yVW5kZWZpbmVkUHJpbUtleShrZXlQYXRoKShvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zKCdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHJhbnMpIHsgcmV0dXJuIF90aGlzLmNvcmUubXV0YXRlKHsgdHJhbnM6IHRyYW5zLCB0eXBlOiAncHV0JywgdmFsdWVzOiBbb2JqVG9BZGRdLCBrZXlzOiBrZXkgIT0gbnVsbCA/IFtrZXldIDogbnVsbCB9KTsgfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMubnVtRmFpbHVyZXMgPyBEZXhpZVByb21pc2UucmVqZWN0KHJlcy5mYWlsdXJlc1swXSkgOiByZXMubGFzdFJlc3VsdDsgfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobGFzdFJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGlmIChrZXlQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRCeUtleVBhdGgob2JqLCBrZXlQYXRoLCBsYXN0UmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoXykgeyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBsYXN0UmVzdWx0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFRhYmxlLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zKCdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHJhbnMpIHsgcmV0dXJuIF90aGlzLmNvcmUubXV0YXRlKHsgdHJhbnM6IHRyYW5zLCB0eXBlOiAnZGVsZXRlJywga2V5czogW2tleV0gfSk7IH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLm51bUZhaWx1cmVzID8gRGV4aWVQcm9taXNlLnJlamVjdChyZXMuZmFpbHVyZXNbMF0pIDogdW5kZWZpbmVkOyB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90cmFucygncmVhZHdyaXRlJywgZnVuY3Rpb24gKHRyYW5zKSB7IHJldHVybiBfdGhpcy5jb3JlLm11dGF0ZSh7IHRyYW5zOiB0cmFucywgdHlwZTogJ2RlbGV0ZVJhbmdlJywgcmFuZ2U6IEFueVJhbmdlIH0pOyB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5udW1GYWlsdXJlcyA/IERleGllUHJvbWlzZS5yZWplY3QocmVzLmZhaWx1cmVzWzBdKSA6IHVuZGVmaW5lZDsgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFRhYmxlLnByb3RvdHlwZS5idWxrR2V0ID0gZnVuY3Rpb24gKGtleXMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnMoJ3JlYWRvbmx5JywgZnVuY3Rpb24gKHRyYW5zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmNvcmUuZ2V0TWFueSh7XG4gICAgICAgICAgICAgICAgICAgIGtleXM6IGtleXMsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zOiB0cmFuc1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkgeyByZXR1cm4gcmVzdWx0Lm1hcChmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5ob29rLnJlYWRpbmcuZmlyZShyZXMpOyB9KTsgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLmJ1bGtBZGQgPSBmdW5jdGlvbiAob2JqZWN0cywga2V5c09yT3B0aW9ucywgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHZhciBrZXlzID0gQXJyYXkuaXNBcnJheShrZXlzT3JPcHRpb25zKSA/IGtleXNPck9wdGlvbnMgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCAoa2V5cyA/IHVuZGVmaW5lZCA6IGtleXNPck9wdGlvbnMpO1xuICAgICAgICAgICAgdmFyIHdhbnRSZXN1bHRzID0gb3B0aW9ucyA/IG9wdGlvbnMuYWxsS2V5cyA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90cmFucygncmVhZHdyaXRlJywgZnVuY3Rpb24gKHRyYW5zKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hID0gX3RoaXMuc2NoZW1hLnByaW1LZXksIGF1dG8gPSBfYS5hdXRvLCBrZXlQYXRoID0gX2Eua2V5UGF0aDtcbiAgICAgICAgICAgICAgICBpZiAoa2V5UGF0aCAmJiBrZXlzKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5JbnZhbGlkQXJndW1lbnQoXCJidWxrQWRkKCk6IGtleXMgYXJndW1lbnQgaW52YWxpZCBvbiB0YWJsZXMgd2l0aCBpbmJvdW5kIGtleXNcIik7XG4gICAgICAgICAgICAgICAgaWYgKGtleXMgJiYga2V5cy5sZW5ndGggIT09IG9iamVjdHMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5JbnZhbGlkQXJndW1lbnQoXCJBcmd1bWVudHMgb2JqZWN0cyBhbmQga2V5cyBtdXN0IGhhdmUgdGhlIHNhbWUgbGVuZ3RoXCIpO1xuICAgICAgICAgICAgICAgIHZhciBudW1PYmplY3RzID0gb2JqZWN0cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdHNUb0FkZCA9IGtleVBhdGggJiYgYXV0byA/XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHMubWFwKHdvcmthcm91bmRGb3JVbmRlZmluZWRQcmltS2V5KGtleVBhdGgpKSA6XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmNvcmUubXV0YXRlKHsgdHJhbnM6IHRyYW5zLCB0eXBlOiAnYWRkJywga2V5czoga2V5cywgdmFsdWVzOiBvYmplY3RzVG9BZGQsIHdhbnRSZXN1bHRzOiB3YW50UmVzdWx0cyB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG51bUZhaWx1cmVzID0gX2EubnVtRmFpbHVyZXMsIHJlc3VsdHMgPSBfYS5yZXN1bHRzLCBsYXN0UmVzdWx0ID0gX2EubGFzdFJlc3VsdCwgZmFpbHVyZXMgPSBfYS5mYWlsdXJlcztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHdhbnRSZXN1bHRzID8gcmVzdWx0cyA6IGxhc3RSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChudW1GYWlsdXJlcyA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBCdWxrRXJyb3IoXCJcIi5jb25jYXQoX3RoaXMubmFtZSwgXCIuYnVsa0FkZCgpOiBcIikuY29uY2F0KG51bUZhaWx1cmVzLCBcIiBvZiBcIikuY29uY2F0KG51bU9iamVjdHMsIFwiIG9wZXJhdGlvbnMgZmFpbGVkXCIpLCBmYWlsdXJlcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLmJ1bGtQdXQgPSBmdW5jdGlvbiAob2JqZWN0cywga2V5c09yT3B0aW9ucywgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHZhciBrZXlzID0gQXJyYXkuaXNBcnJheShrZXlzT3JPcHRpb25zKSA/IGtleXNPck9wdGlvbnMgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCAoa2V5cyA/IHVuZGVmaW5lZCA6IGtleXNPck9wdGlvbnMpO1xuICAgICAgICAgICAgdmFyIHdhbnRSZXN1bHRzID0gb3B0aW9ucyA/IG9wdGlvbnMuYWxsS2V5cyA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90cmFucygncmVhZHdyaXRlJywgZnVuY3Rpb24gKHRyYW5zKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hID0gX3RoaXMuc2NoZW1hLnByaW1LZXksIGF1dG8gPSBfYS5hdXRvLCBrZXlQYXRoID0gX2Eua2V5UGF0aDtcbiAgICAgICAgICAgICAgICBpZiAoa2V5UGF0aCAmJiBrZXlzKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5JbnZhbGlkQXJndW1lbnQoXCJidWxrUHV0KCk6IGtleXMgYXJndW1lbnQgaW52YWxpZCBvbiB0YWJsZXMgd2l0aCBpbmJvdW5kIGtleXNcIik7XG4gICAgICAgICAgICAgICAgaWYgKGtleXMgJiYga2V5cy5sZW5ndGggIT09IG9iamVjdHMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5JbnZhbGlkQXJndW1lbnQoXCJBcmd1bWVudHMgb2JqZWN0cyBhbmQga2V5cyBtdXN0IGhhdmUgdGhlIHNhbWUgbGVuZ3RoXCIpO1xuICAgICAgICAgICAgICAgIHZhciBudW1PYmplY3RzID0gb2JqZWN0cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdHNUb1B1dCA9IGtleVBhdGggJiYgYXV0byA/XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHMubWFwKHdvcmthcm91bmRGb3JVbmRlZmluZWRQcmltS2V5KGtleVBhdGgpKSA6XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmNvcmUubXV0YXRlKHsgdHJhbnM6IHRyYW5zLCB0eXBlOiAncHV0Jywga2V5czoga2V5cywgdmFsdWVzOiBvYmplY3RzVG9QdXQsIHdhbnRSZXN1bHRzOiB3YW50UmVzdWx0cyB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG51bUZhaWx1cmVzID0gX2EubnVtRmFpbHVyZXMsIHJlc3VsdHMgPSBfYS5yZXN1bHRzLCBsYXN0UmVzdWx0ID0gX2EubGFzdFJlc3VsdCwgZmFpbHVyZXMgPSBfYS5mYWlsdXJlcztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHdhbnRSZXN1bHRzID8gcmVzdWx0cyA6IGxhc3RSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChudW1GYWlsdXJlcyA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBCdWxrRXJyb3IoXCJcIi5jb25jYXQoX3RoaXMubmFtZSwgXCIuYnVsa1B1dCgpOiBcIikuY29uY2F0KG51bUZhaWx1cmVzLCBcIiBvZiBcIikuY29uY2F0KG51bU9iamVjdHMsIFwiIG9wZXJhdGlvbnMgZmFpbGVkXCIpLCBmYWlsdXJlcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLmJ1bGtVcGRhdGUgPSBmdW5jdGlvbiAoa2V5c0FuZENoYW5nZXMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgY29yZVRhYmxlID0gdGhpcy5jb3JlO1xuICAgICAgICAgICAgdmFyIGtleXMgPSBrZXlzQW5kQ2hhbmdlcy5tYXAoZnVuY3Rpb24gKGVudHJ5KSB7IHJldHVybiBlbnRyeS5rZXk7IH0pO1xuICAgICAgICAgICAgdmFyIGNoYW5nZVNwZWNzID0ga2V5c0FuZENoYW5nZXMubWFwKGZ1bmN0aW9uIChlbnRyeSkgeyByZXR1cm4gZW50cnkuY2hhbmdlczsgfSk7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0TWFwID0gW107XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnMoJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0cmFucykge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb3JlVGFibGUuZ2V0TWFueSh7IHRyYW5zOiB0cmFucywga2V5czoga2V5cywgY2FjaGU6ICdjbG9uZScgfSkudGhlbihmdW5jdGlvbiAob2Jqcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0S2V5cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0T2JqcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBrZXlzQW5kQ2hhbmdlcy5mb3JFYWNoKGZ1bmN0aW9uIChfYSwgaWR4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gX2Eua2V5LCBjaGFuZ2VzID0gX2EuY2hhbmdlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBvYmpzW2lkeF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYiA9IE9iamVjdC5rZXlzKGNoYW5nZXMpOyBfaSA8IF9iLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5UGF0aCA9IF9iW19pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gY2hhbmdlc1trZXlQYXRoXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleVBhdGggPT09IF90aGlzLnNjaGVtYS5wcmltS2V5LmtleVBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbXAodmFsdWUsIGtleSkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5Db25zdHJhaW50KFwiQ2Fubm90IHVwZGF0ZSBwcmltYXJ5IGtleSBpbiBidWxrVXBkYXRlKClcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCeUtleVBhdGgob2JqLCBrZXlQYXRoLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0TWFwLnB1c2goaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRLZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRPYmpzLnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBudW1FbnRyaWVzID0gcmVzdWx0S2V5cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3JlVGFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tdXRhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnM6IHRyYW5zLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3B1dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiByZXN1bHRLZXlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiByZXN1bHRPYmpzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IGtleXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlU3BlY3M6IGNoYW5nZVNwZWNzXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBudW1GYWlsdXJlcyA9IF9hLm51bUZhaWx1cmVzLCBmYWlsdXJlcyA9IF9hLmZhaWx1cmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bUZhaWx1cmVzID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudW1FbnRyaWVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYiA9IE9iamVjdC5rZXlzKGZhaWx1cmVzKTsgX2kgPCBfYi5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gX2JbX2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXBwZWRPZmZzZXQgPSBvZmZzZXRNYXBbTnVtYmVyKG9mZnNldCldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXBwZWRPZmZzZXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IGZhaWx1cmVzW29mZnNldF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBmYWlsdXJlc1tvZmZzZXRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsdXJlc1ttYXBwZWRPZmZzZXRdID0gZmFpbHVyZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQnVsa0Vycm9yKFwiXCIuY29uY2F0KF90aGlzLm5hbWUsIFwiLmJ1bGtVcGRhdGUoKTogXCIpLmNvbmNhdChudW1GYWlsdXJlcywgXCIgb2YgXCIpLmNvbmNhdChudW1FbnRyaWVzLCBcIiBvcGVyYXRpb25zIGZhaWxlZFwiKSwgZmFpbHVyZXMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBUYWJsZS5wcm90b3R5cGUuYnVsa0RlbGV0ZSA9IGZ1bmN0aW9uIChrZXlzKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIG51bUtleXMgPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90cmFucygncmVhZHdyaXRlJywgZnVuY3Rpb24gKHRyYW5zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmNvcmUubXV0YXRlKHsgdHJhbnM6IHRyYW5zLCB0eXBlOiAnZGVsZXRlJywga2V5czoga2V5cyB9KTtcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgdmFyIG51bUZhaWx1cmVzID0gX2EubnVtRmFpbHVyZXMsIGxhc3RSZXN1bHQgPSBfYS5sYXN0UmVzdWx0LCBmYWlsdXJlcyA9IF9hLmZhaWx1cmVzO1xuICAgICAgICAgICAgICAgIGlmIChudW1GYWlsdXJlcyA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxhc3RSZXN1bHQ7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEJ1bGtFcnJvcihcIlwiLmNvbmNhdChfdGhpcy5uYW1lLCBcIi5idWxrRGVsZXRlKCk6IFwiKS5jb25jYXQobnVtRmFpbHVyZXMsIFwiIG9mIFwiKS5jb25jYXQobnVtS2V5cywgXCIgb3BlcmF0aW9ucyBmYWlsZWRcIiksIGZhaWx1cmVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gVGFibGU7XG4gICAgfSgpKTtcblxuICAgIGZ1bmN0aW9uIEV2ZW50cyhjdHgpIHtcbiAgICAgICAgdmFyIGV2cyA9IHt9O1xuICAgICAgICB2YXIgcnYgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICBpZiAoc3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgIHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShpIC0gMSk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKC0taSlcbiAgICAgICAgICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgICAgZXZzW2V2ZW50TmFtZV0uc3Vic2NyaWJlLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjdHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgKGV2ZW50TmFtZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2c1tldmVudE5hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBydi5hZGRFdmVudFR5cGUgPSBhZGQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAxLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgICAgYWRkKGFyZ3VtZW50c1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJ2O1xuICAgICAgICBmdW5jdGlvbiBhZGQoZXZlbnROYW1lLCBjaGFpbkZ1bmN0aW9uLCBkZWZhdWx0RnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXZlbnROYW1lID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgICAgICByZXR1cm4gYWRkQ29uZmlndXJlZEV2ZW50cyhldmVudE5hbWUpO1xuICAgICAgICAgICAgaWYgKCFjaGFpbkZ1bmN0aW9uKVxuICAgICAgICAgICAgICAgIGNoYWluRnVuY3Rpb24gPSByZXZlcnNlU3RvcHBhYmxlRXZlbnRDaGFpbjtcbiAgICAgICAgICAgIGlmICghZGVmYXVsdEZ1bmN0aW9uKVxuICAgICAgICAgICAgICAgIGRlZmF1bHRGdW5jdGlvbiA9IG5vcDtcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0ge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXJzOiBbXSxcbiAgICAgICAgICAgICAgICBmaXJlOiBkZWZhdWx0RnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuc3Vic2NyaWJlcnMuaW5kZXhPZihjYikgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN1YnNjcmliZXJzLnB1c2goY2IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maXJlID0gY2hhaW5GdW5jdGlvbihjb250ZXh0LmZpcmUsIGNiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnN1YnNjcmliZXJzID0gY29udGV4dC5zdWJzY3JpYmVycy5maWx0ZXIoZnVuY3Rpb24gKGZuKSB7IHJldHVybiBmbiAhPT0gY2I7IH0pO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpcmUgPSBjb250ZXh0LnN1YnNjcmliZXJzLnJlZHVjZShjaGFpbkZ1bmN0aW9uLCBkZWZhdWx0RnVuY3Rpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBldnNbZXZlbnROYW1lXSA9IHJ2W2V2ZW50TmFtZV0gPSBjb250ZXh0O1xuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYWRkQ29uZmlndXJlZEV2ZW50cyhjZmcpIHtcbiAgICAgICAgICAgIGtleXMoY2ZnKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IGNmZ1tldmVudE5hbWVdO1xuICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KGFyZ3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZChldmVudE5hbWUsIGNmZ1tldmVudE5hbWVdWzBdLCBjZmdbZXZlbnROYW1lXVsxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFyZ3MgPT09ICdhc2FwJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGV4dCA9IGFkZChldmVudE5hbWUsIG1pcnJvciwgZnVuY3Rpb24gZmlyZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc2FwJDEoZnVuY3Rpb24gZmlyZUV2ZW50KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5JbnZhbGlkQXJndW1lbnQoXCJJbnZhbGlkIGV2ZW50IGNvbmZpZ1wiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUNsYXNzQ29uc3RydWN0b3IocHJvdG90eXBlLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICBkZXJpdmUoY29uc3RydWN0b3IpLmZyb20oeyBwcm90b3R5cGU6IHByb3RvdHlwZSB9KTtcbiAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhYmxlQ29uc3RydWN0b3IoZGIpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VDbGFzc0NvbnN0cnVjdG9yKFRhYmxlLnByb3RvdHlwZSwgZnVuY3Rpb24gVGFibGUobmFtZSwgdGFibGVTY2hlbWEsIHRyYW5zKSB7XG4gICAgICAgICAgICB0aGlzLmRiID0gZGI7XG4gICAgICAgICAgICB0aGlzLl90eCA9IHRyYW5zO1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHRoaXMuc2NoZW1hID0gdGFibGVTY2hlbWE7XG4gICAgICAgICAgICB0aGlzLmhvb2sgPSBkYi5fYWxsVGFibGVzW25hbWVdID8gZGIuX2FsbFRhYmxlc1tuYW1lXS5ob29rIDogRXZlbnRzKG51bGwsIHtcbiAgICAgICAgICAgICAgICBcImNyZWF0aW5nXCI6IFtob29rQ3JlYXRpbmdDaGFpbiwgbm9wXSxcbiAgICAgICAgICAgICAgICBcInJlYWRpbmdcIjogW3B1cmVGdW5jdGlvbkNoYWluLCBtaXJyb3JdLFxuICAgICAgICAgICAgICAgIFwidXBkYXRpbmdcIjogW2hvb2tVcGRhdGluZ0NoYWluLCBub3BdLFxuICAgICAgICAgICAgICAgIFwiZGVsZXRpbmdcIjogW2hvb2tEZWxldGluZ0NoYWluLCBub3BdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNQbGFpbktleVJhbmdlKGN0eCwgaWdub3JlTGltaXRGaWx0ZXIpIHtcbiAgICAgICAgcmV0dXJuICEoY3R4LmZpbHRlciB8fCBjdHguYWxnb3JpdGhtIHx8IGN0eC5vcikgJiZcbiAgICAgICAgICAgIChpZ25vcmVMaW1pdEZpbHRlciA/IGN0eC5qdXN0TGltaXQgOiAhY3R4LnJlcGxheUZpbHRlcik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZEZpbHRlcihjdHgsIGZuKSB7XG4gICAgICAgIGN0eC5maWx0ZXIgPSBjb21iaW5lKGN0eC5maWx0ZXIsIGZuKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkUmVwbGF5RmlsdGVyKGN0eCwgZmFjdG9yeSwgaXNMaW1pdEZpbHRlcikge1xuICAgICAgICB2YXIgY3VyciA9IGN0eC5yZXBsYXlGaWx0ZXI7XG4gICAgICAgIGN0eC5yZXBsYXlGaWx0ZXIgPSBjdXJyID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gY29tYmluZShjdXJyKCksIGZhY3RvcnkoKSk7IH0gOiBmYWN0b3J5O1xuICAgICAgICBjdHguanVzdExpbWl0ID0gaXNMaW1pdEZpbHRlciAmJiAhY3VycjtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkTWF0Y2hGaWx0ZXIoY3R4LCBmbikge1xuICAgICAgICBjdHguaXNNYXRjaCA9IGNvbWJpbmUoY3R4LmlzTWF0Y2gsIGZuKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0SW5kZXhPclN0b3JlKGN0eCwgY29yZVNjaGVtYSkge1xuICAgICAgICBpZiAoY3R4LmlzUHJpbUtleSlcbiAgICAgICAgICAgIHJldHVybiBjb3JlU2NoZW1hLnByaW1hcnlLZXk7XG4gICAgICAgIHZhciBpbmRleCA9IGNvcmVTY2hlbWEuZ2V0SW5kZXhCeUtleVBhdGgoY3R4LmluZGV4KTtcbiAgICAgICAgaWYgKCFpbmRleClcbiAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLlNjaGVtYShcIktleVBhdGggXCIgKyBjdHguaW5kZXggKyBcIiBvbiBvYmplY3Qgc3RvcmUgXCIgKyBjb3JlU2NoZW1hLm5hbWUgKyBcIiBpcyBub3QgaW5kZXhlZFwiKTtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgICBmdW5jdGlvbiBvcGVuQ3Vyc29yKGN0eCwgY29yZVRhYmxlLCB0cmFucykge1xuICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleE9yU3RvcmUoY3R4LCBjb3JlVGFibGUuc2NoZW1hKTtcbiAgICAgICAgcmV0dXJuIGNvcmVUYWJsZS5vcGVuQ3Vyc29yKHtcbiAgICAgICAgICAgIHRyYW5zOiB0cmFucyxcbiAgICAgICAgICAgIHZhbHVlczogIWN0eC5rZXlzT25seSxcbiAgICAgICAgICAgIHJldmVyc2U6IGN0eC5kaXIgPT09ICdwcmV2JyxcbiAgICAgICAgICAgIHVuaXF1ZTogISFjdHgudW5pcXVlLFxuICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgcmFuZ2U6IGN0eC5yYW5nZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXRlcihjdHgsIGZuLCBjb3JlVHJhbnMsIGNvcmVUYWJsZSkge1xuICAgICAgICB2YXIgZmlsdGVyID0gY3R4LnJlcGxheUZpbHRlciA/IGNvbWJpbmUoY3R4LmZpbHRlciwgY3R4LnJlcGxheUZpbHRlcigpKSA6IGN0eC5maWx0ZXI7XG4gICAgICAgIGlmICghY3R4Lm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlcmF0ZShvcGVuQ3Vyc29yKGN0eCwgY29yZVRhYmxlLCBjb3JlVHJhbnMpLCBjb21iaW5lKGN0eC5hbGdvcml0aG0sIGZpbHRlciksIGZuLCAhY3R4LmtleXNPbmx5ICYmIGN0eC52YWx1ZU1hcHBlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgc2V0XzEgPSB7fTtcbiAgICAgICAgICAgIHZhciB1bmlvbiA9IGZ1bmN0aW9uIChpdGVtLCBjdXJzb3IsIGFkdmFuY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZpbHRlciB8fCBmaWx0ZXIoY3Vyc29yLCBhZHZhbmNlLCBmdW5jdGlvbiAocmVzdWx0KSB7IHJldHVybiBjdXJzb3Iuc3RvcChyZXN1bHQpOyB9LCBmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBjdXJzb3IuZmFpbChlcnIpOyB9KSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJpbWFyeUtleSA9IGN1cnNvci5wcmltYXJ5S2V5O1xuICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gJycgKyBwcmltYXJ5S2V5O1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nKVxuICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0gJycgKyBuZXcgVWludDhBcnJheShwcmltYXJ5S2V5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNPd24oc2V0XzEsIGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldF8xW2tleV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm4oaXRlbSwgY3Vyc29yLCBhZHZhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIGN0eC5vci5faXRlcmF0ZSh1bmlvbiwgY29yZVRyYW5zKSxcbiAgICAgICAgICAgICAgICBpdGVyYXRlKG9wZW5DdXJzb3IoY3R4LCBjb3JlVGFibGUsIGNvcmVUcmFucyksIGN0eC5hbGdvcml0aG0sIHVuaW9uLCAhY3R4LmtleXNPbmx5ICYmIGN0eC52YWx1ZU1hcHBlcilcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGl0ZXJhdGUoY3Vyc29yUHJvbWlzZSwgZmlsdGVyLCBmbiwgdmFsdWVNYXBwZXIpIHtcbiAgICAgICAgdmFyIG1hcHBlZEZuID0gdmFsdWVNYXBwZXIgPyBmdW5jdGlvbiAoeCwgYywgYSkgeyByZXR1cm4gZm4odmFsdWVNYXBwZXIoeCksIGMsIGEpOyB9IDogZm47XG4gICAgICAgIHZhciB3cmFwcGVkRm4gPSB3cmFwKG1hcHBlZEZuKTtcbiAgICAgICAgcmV0dXJuIGN1cnNvclByb21pc2UudGhlbihmdW5jdGlvbiAoY3Vyc29yKSB7XG4gICAgICAgICAgICBpZiAoY3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnNvci5zdGFydChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gY3Vyc29yLmNvbnRpbnVlKCk7IH07XG4gICAgICAgICAgICAgICAgICAgIGlmICghZmlsdGVyIHx8IGZpbHRlcihjdXJzb3IsIGZ1bmN0aW9uIChhZHZhbmNlcikgeyByZXR1cm4gYyA9IGFkdmFuY2VyOyB9LCBmdW5jdGlvbiAodmFsKSB7IGN1cnNvci5zdG9wKHZhbCk7IGMgPSBub3A7IH0sIGZ1bmN0aW9uIChlKSB7IGN1cnNvci5mYWlsKGUpOyBjID0gbm9wOyB9KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZWRGbihjdXJzb3IudmFsdWUsIGN1cnNvciwgZnVuY3Rpb24gKGFkdmFuY2VyKSB7IHJldHVybiBjID0gYWR2YW5jZXI7IH0pO1xuICAgICAgICAgICAgICAgICAgICBjKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBQcm9wTW9kaWZpY2F0aW9uID0gIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFByb3BNb2RpZmljYXRpb24oc3BlYykge1xuICAgICAgICAgICAgdGhpc1tcIkBAcHJvcG1vZFwiXSA9IHNwZWM7XG4gICAgICAgIH1cbiAgICAgICAgUHJvcE1vZGlmaWNhdGlvbi5wcm90b3R5cGUuZXhlY3V0ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgdmFyIHNwZWMgPSB0aGlzW1wiQEBwcm9wbW9kXCJdO1xuICAgICAgICAgICAgaWYgKHNwZWMuYWRkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVybSA9IHNwZWMuYWRkO1xuICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KHRlcm0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIChpc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW10pLCB0cnVlKSwgdGVybSwgdHJ1ZSkuc29ydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRlcm0gPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKE51bWJlcih2YWx1ZSkgfHwgMCkgKyB0ZXJtO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGVybSA9PT0gJ2JpZ2ludCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBCaWdJbnQodmFsdWUpICsgdGVybTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoX2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBCaWdJbnQoMCkgKyB0ZXJtO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIHRlcm0gXCIuY29uY2F0KHRlcm0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzcGVjLnJlbW92ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1YnRyYWhlbmRfMSA9IHNwZWMucmVtb3ZlO1xuICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KHN1YnRyYWhlbmRfMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzQXJyYXkodmFsdWUpID8gdmFsdWUuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiAhc3VidHJhaGVuZF8xLmluY2x1ZGVzKGl0ZW0pOyB9KS5zb3J0KCkgOiBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdWJ0cmFoZW5kXzEgPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbHVlKSAtIHN1YnRyYWhlbmRfMTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN1YnRyYWhlbmRfMSA9PT0gJ2JpZ2ludCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBCaWdJbnQodmFsdWUpIC0gc3VidHJhaGVuZF8xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChfYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEJpZ0ludCgwKSAtIHN1YnRyYWhlbmRfMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBzdWJ0cmFoZW5kIFwiLmNvbmNhdChzdWJ0cmFoZW5kXzEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwcmVmaXhUb1JlcGxhY2UgPSAoX2EgPSBzcGVjLnJlcGxhY2VQcmVmaXgpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVswXTtcbiAgICAgICAgICAgIGlmIChwcmVmaXhUb1JlcGxhY2UgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5zdGFydHNXaXRoKHByZWZpeFRvUmVwbGFjZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3BlYy5yZXBsYWNlUHJlZml4WzFdICsgdmFsdWUuc3Vic3RyaW5nKHByZWZpeFRvUmVwbGFjZS5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gUHJvcE1vZGlmaWNhdGlvbjtcbiAgICB9KCkpO1xuXG4gICAgdmFyIENvbGxlY3Rpb24gPSAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gQ29sbGVjdGlvbigpIHtcbiAgICAgICAgfVxuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5fcmVhZCA9IGZ1bmN0aW9uIChmbiwgY2IpIHtcbiAgICAgICAgICAgIHZhciBjdHggPSB0aGlzLl9jdHg7XG4gICAgICAgICAgICByZXR1cm4gY3R4LmVycm9yID9cbiAgICAgICAgICAgICAgICBjdHgudGFibGUuX3RyYW5zKG51bGwsIHJlamVjdGlvbi5iaW5kKG51bGwsIGN0eC5lcnJvcikpIDpcbiAgICAgICAgICAgICAgICBjdHgudGFibGUuX3RyYW5zKCdyZWFkb25seScsIGZuKS50aGVuKGNiKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuX3dyaXRlID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gdGhpcy5fY3R4O1xuICAgICAgICAgICAgcmV0dXJuIGN0eC5lcnJvciA/XG4gICAgICAgICAgICAgICAgY3R4LnRhYmxlLl90cmFucyhudWxsLCByZWplY3Rpb24uYmluZChudWxsLCBjdHguZXJyb3IpKSA6XG4gICAgICAgICAgICAgICAgY3R4LnRhYmxlLl90cmFucygncmVhZHdyaXRlJywgZm4sIFwibG9ja2VkXCIpO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5fYWRkQWxnb3JpdGhtID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gdGhpcy5fY3R4O1xuICAgICAgICAgICAgY3R4LmFsZ29yaXRobSA9IGNvbWJpbmUoY3R4LmFsZ29yaXRobSwgZm4pO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5faXRlcmF0ZSA9IGZ1bmN0aW9uIChmbiwgY29yZVRyYW5zKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlcih0aGlzLl9jdHgsIGZuLCBjb3JlVHJhbnMsIHRoaXMuX2N0eC50YWJsZS5jb3JlKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgICAgIHZhciBydiA9IE9iamVjdC5jcmVhdGUodGhpcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUpLCBjdHggPSBPYmplY3QuY3JlYXRlKHRoaXMuX2N0eCk7XG4gICAgICAgICAgICBpZiAocHJvcHMpXG4gICAgICAgICAgICAgICAgZXh0ZW5kKGN0eCwgcHJvcHMpO1xuICAgICAgICAgICAgcnYuX2N0eCA9IGN0eDtcbiAgICAgICAgICAgIHJldHVybiBydjtcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUucmF3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fY3R4LnZhbHVlTWFwcGVyID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5lYWNoID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gdGhpcy5fY3R4O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWQoZnVuY3Rpb24gKHRyYW5zKSB7IHJldHVybiBpdGVyKGN0eCwgZm4sIHRyYW5zLCBjdHgudGFibGUuY29yZSk7IH0pO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5jb3VudCA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWFkKGZ1bmN0aW9uICh0cmFucykge1xuICAgICAgICAgICAgICAgIHZhciBjdHggPSBfdGhpcy5fY3R4O1xuICAgICAgICAgICAgICAgIHZhciBjb3JlVGFibGUgPSBjdHgudGFibGUuY29yZTtcbiAgICAgICAgICAgICAgICBpZiAoaXNQbGFpbktleVJhbmdlKGN0eCwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvcmVUYWJsZS5jb3VudCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuczogdHJhbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBnZXRJbmRleE9yU3RvcmUoY3R4LCBjb3JlVGFibGUuc2NoZW1hKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZTogY3R4LnJhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGNvdW50KSB7IHJldHVybiBNYXRoLm1pbihjb3VudCwgY3R4LmxpbWl0KTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlcihjdHgsIGZ1bmN0aW9uICgpIHsgKytjb3VudDsgcmV0dXJuIGZhbHNlOyB9LCB0cmFucywgY29yZVRhYmxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gY291bnQ7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnRoZW4oY2IpO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5zb3J0QnkgPSBmdW5jdGlvbiAoa2V5UGF0aCwgY2IpIHtcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IGtleVBhdGguc3BsaXQoJy4nKS5yZXZlcnNlKCksIGxhc3RQYXJ0ID0gcGFydHNbMF0sIGxhc3RJbmRleCA9IHBhcnRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXR2YWwob2JqLCBpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXR2YWwob2JqW3BhcnRzW2ldXSwgaSAtIDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmpbbGFzdFBhcnRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9yZGVyID0gdGhpcy5fY3R4LmRpciA9PT0gXCJuZXh0XCIgPyAxIDogLTE7XG4gICAgICAgICAgICBmdW5jdGlvbiBzb3J0ZXIoYSwgYikge1xuICAgICAgICAgICAgICAgIHZhciBhVmFsID0gZ2V0dmFsKGEsIGxhc3RJbmRleCksIGJWYWwgPSBnZXR2YWwoYiwgbGFzdEluZGV4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY21wKGFWYWwsIGJWYWwpICogb3JkZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b0FycmF5KGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEuc29ydChzb3J0ZXIpO1xuICAgICAgICAgICAgfSkudGhlbihjYik7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVhZChmdW5jdGlvbiAodHJhbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3R4ID0gX3RoaXMuX2N0eDtcbiAgICAgICAgICAgICAgICBpZiAoY3R4LmRpciA9PT0gJ25leHQnICYmIGlzUGxhaW5LZXlSYW5nZShjdHgsIHRydWUpICYmIGN0eC5saW1pdCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlTWFwcGVyXzEgPSBjdHgudmFsdWVNYXBwZXI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4T3JTdG9yZShjdHgsIGN0eC50YWJsZS5jb3JlLnNjaGVtYSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdHgudGFibGUuY29yZS5xdWVyeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuczogdHJhbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogY3R4LmxpbWl0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IGN0eC5yYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IF9hLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZU1hcHBlcl8xID8gcmVzdWx0Lm1hcCh2YWx1ZU1hcHBlcl8xKSA6IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYV8xID0gW107XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVyKGN0eCwgZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGFfMS5wdXNoKGl0ZW0pOyB9LCB0cmFucywgY3R4LnRhYmxlLmNvcmUpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gYV8xOyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBjYik7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLm9mZnNldCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICAgICAgICAgIHZhciBjdHggPSB0aGlzLl9jdHg7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDw9IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICBjdHgub2Zmc2V0ICs9IG9mZnNldDtcbiAgICAgICAgICAgIGlmIChpc1BsYWluS2V5UmFuZ2UoY3R4KSkge1xuICAgICAgICAgICAgICAgIGFkZFJlcGxheUZpbHRlcihjdHgsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldExlZnQgPSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoY3Vyc29yLCBhZHZhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2Zmc2V0TGVmdCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXRMZWZ0ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLS1vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5hZHZhbmNlKG9mZnNldExlZnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldExlZnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhZGRSZXBsYXlGaWx0ZXIoY3R4LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXRMZWZ0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gKC0tb2Zmc2V0TGVmdCA8IDApOyB9O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmxpbWl0ID0gZnVuY3Rpb24gKG51bVJvd3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5saW1pdCA9IE1hdGgubWluKHRoaXMuX2N0eC5saW1pdCwgbnVtUm93cyk7XG4gICAgICAgICAgICBhZGRSZXBsYXlGaWx0ZXIodGhpcy5fY3R4LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvd3NMZWZ0ID0gbnVtUm93cztcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGN1cnNvciwgYWR2YW5jZSwgcmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoLS1yb3dzTGVmdCA8PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZShyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvd3NMZWZ0ID49IDA7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLnVudGlsID0gZnVuY3Rpb24gKGZpbHRlckZ1bmN0aW9uLCBiSW5jbHVkZVN0b3BFbnRyeSkge1xuICAgICAgICAgICAgYWRkRmlsdGVyKHRoaXMuX2N0eCwgZnVuY3Rpb24gKGN1cnNvciwgYWR2YW5jZSwgcmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJGdW5jdGlvbihjdXJzb3IudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkdmFuY2UocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiSW5jbHVkZVN0b3BFbnRyeTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saW1pdCgxKS50b0FycmF5KGZ1bmN0aW9uIChhKSB7IHJldHVybiBhWzBdOyB9KS50aGVuKGNiKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmV2ZXJzZSgpLmZpcnN0KGNiKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24gKGZpbHRlckZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBhZGRGaWx0ZXIodGhpcy5fY3R4LCBmdW5jdGlvbiAoY3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlckZ1bmN0aW9uKGN1cnNvci52YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFkZE1hdGNoRmlsdGVyKHRoaXMuX2N0eCwgZmlsdGVyRnVuY3Rpb24pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmFuZCA9IGZ1bmN0aW9uIChmaWx0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlcihmaWx0ZXIpO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5vciA9IGZ1bmN0aW9uIChpbmRleE5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcy5kYi5XaGVyZUNsYXVzZSh0aGlzLl9jdHgudGFibGUsIGluZGV4TmFtZSwgdGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9jdHguZGlyID0gKHRoaXMuX2N0eC5kaXIgPT09IFwicHJldlwiID8gXCJuZXh0XCIgOiBcInByZXZcIik7XG4gICAgICAgICAgICBpZiAodGhpcy5fb25kaXJlY3Rpb25jaGFuZ2UpXG4gICAgICAgICAgICAgICAgdGhpcy5fb25kaXJlY3Rpb25jaGFuZ2UodGhpcy5fY3R4LmRpcik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuZGVzYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJldmVyc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuZWFjaEtleSA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgdmFyIGN0eCA9IHRoaXMuX2N0eDtcbiAgICAgICAgICAgIGN0eC5rZXlzT25seSA9ICFjdHguaXNNYXRjaDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHZhbCwgY3Vyc29yKSB7IGNiKGN1cnNvci5rZXksIGN1cnNvcik7IH0pO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5lYWNoVW5pcXVlS2V5ID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICB0aGlzLl9jdHgudW5pcXVlID0gXCJ1bmlxdWVcIjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2hLZXkoY2IpO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5lYWNoUHJpbWFyeUtleSA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgdmFyIGN0eCA9IHRoaXMuX2N0eDtcbiAgICAgICAgICAgIGN0eC5rZXlzT25seSA9ICFjdHguaXNNYXRjaDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKHZhbCwgY3Vyc29yKSB7IGNiKGN1cnNvci5wcmltYXJ5S2V5LCBjdXJzb3IpOyB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgdmFyIGN0eCA9IHRoaXMuX2N0eDtcbiAgICAgICAgICAgIGN0eC5rZXlzT25seSA9ICFjdHguaXNNYXRjaDtcbiAgICAgICAgICAgIHZhciBhID0gW107XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpdGVtLCBjdXJzb3IpIHtcbiAgICAgICAgICAgICAgICBhLnB1c2goY3Vyc29yLmtleSk7XG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgICAgIH0pLnRoZW4oY2IpO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5wcmltYXJ5S2V5cyA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgdmFyIGN0eCA9IHRoaXMuX2N0eDtcbiAgICAgICAgICAgIGlmIChjdHguZGlyID09PSAnbmV4dCcgJiYgaXNQbGFpbktleVJhbmdlKGN0eCwgdHJ1ZSkgJiYgY3R4LmxpbWl0ID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWFkKGZ1bmN0aW9uICh0cmFucykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleE9yU3RvcmUoY3R4LCBjdHgudGFibGUuY29yZS5zY2hlbWEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3R4LnRhYmxlLmNvcmUucXVlcnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnM6IHRyYW5zLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiBjdHgubGltaXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZTogY3R4LnJhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBfYS5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSkudGhlbihjYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdHgua2V5c09ubHkgPSAhY3R4LmlzTWF0Y2g7XG4gICAgICAgICAgICB2YXIgYSA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaXRlbSwgY3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgYS5wdXNoKGN1cnNvci5wcmltYXJ5S2V5KTtcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICAgICAgfSkudGhlbihjYik7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLnVuaXF1ZUtleXMgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgIHRoaXMuX2N0eC51bmlxdWUgPSBcInVuaXF1ZVwiO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMua2V5cyhjYik7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmZpcnN0S2V5ID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saW1pdCgxKS5rZXlzKGZ1bmN0aW9uIChhKSB7IHJldHVybiBhWzBdOyB9KS50aGVuKGNiKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUubGFzdEtleSA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmV2ZXJzZSgpLmZpcnN0S2V5KGNiKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuZGlzdGluY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gdGhpcy5fY3R4LCBpZHggPSBjdHguaW5kZXggJiYgY3R4LnRhYmxlLnNjaGVtYS5pZHhCeU5hbWVbY3R4LmluZGV4XTtcbiAgICAgICAgICAgIGlmICghaWR4IHx8ICFpZHgubXVsdGkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB2YXIgc2V0ID0ge307XG4gICAgICAgICAgICBhZGRGaWx0ZXIodGhpcy5fY3R4LCBmdW5jdGlvbiAoY3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0cktleSA9IGN1cnNvci5wcmltYXJ5S2V5LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gaGFzT3duKHNldCwgc3RyS2V5KTtcbiAgICAgICAgICAgICAgICBzZXRbc3RyS2V5XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFmb3VuZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLm1vZGlmeSA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGN0eCA9IHRoaXMuX2N0eDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93cml0ZShmdW5jdGlvbiAodHJhbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9kaWZ5ZXI7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGFuZ2VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGlmeWVyID0gY2hhbmdlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXlQYXRocyA9IGtleXMoY2hhbmdlcyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBudW1LZXlzID0ga2V5UGF0aHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBtb2RpZnllciA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYW55dGhpbmdNb2RpZmllZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1LZXlzOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5UGF0aCA9IGtleVBhdGhzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSBjaGFuZ2VzW2tleVBhdGhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmlnVmFsID0gZ2V0QnlLZXlQYXRoKGl0ZW0sIGtleVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBQcm9wTW9kaWZpY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEJ5S2V5UGF0aChpdGVtLCBrZXlQYXRoLCB2YWwuZXhlY3V0ZShvcmlnVmFsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFueXRoaW5nTW9kaWZpZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvcmlnVmFsICE9PSB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnlLZXlQYXRoKGl0ZW0sIGtleVBhdGgsIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFueXRoaW5nTW9kaWZpZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbnl0aGluZ01vZGlmaWVkO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgY29yZVRhYmxlID0gY3R4LnRhYmxlLmNvcmU7XG4gICAgICAgICAgICAgICAgdmFyIF9hID0gY29yZVRhYmxlLnNjaGVtYS5wcmltYXJ5S2V5LCBvdXRib3VuZCA9IF9hLm91dGJvdW5kLCBleHRyYWN0S2V5ID0gX2EuZXh0cmFjdEtleTtcbiAgICAgICAgICAgICAgICB2YXIgbGltaXQgPSAyMDA7XG4gICAgICAgICAgICAgICAgdmFyIG1vZGlmeUNodW5rU2l6ZSA9IF90aGlzLmRiLl9vcHRpb25zLm1vZGlmeUNodW5rU2l6ZTtcbiAgICAgICAgICAgICAgICBpZiAobW9kaWZ5Q2h1bmtTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbW9kaWZ5Q2h1bmtTaXplID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdCA9IG1vZGlmeUNodW5rU2l6ZVtjb3JlVGFibGUubmFtZV0gfHwgbW9kaWZ5Q2h1bmtTaXplWycqJ10gfHwgMjAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQgPSBtb2RpZnlDaHVua1NpemU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHRvdGFsRmFpbHVyZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2Vzc0NvdW50ID0gMDtcbiAgICAgICAgICAgICAgICB2YXIgZmFpbGVkS2V5cyA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBhcHBseU11dGF0ZVJlc3VsdCA9IGZ1bmN0aW9uIChleHBlY3RlZENvdW50LCByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmVzID0gcmVzLmZhaWx1cmVzLCBudW1GYWlsdXJlcyA9IHJlcy5udW1GYWlsdXJlcztcbiAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0NvdW50ICs9IGV4cGVjdGVkQ291bnQgLSBudW1GYWlsdXJlcztcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IGtleXMoZmFpbHVyZXMpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsRmFpbHVyZXMucHVzaChmYWlsdXJlc1twb3NdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmNsb25lKCkucHJpbWFyeUtleXMoKS50aGVuKGZ1bmN0aW9uIChrZXlzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjcml0ZXJpYSA9IGlzUGxhaW5LZXlSYW5nZShjdHgpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBjdHgubGltaXQgPT09IEluZmluaXR5ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGNoYW5nZXMgIT09ICdmdW5jdGlvbicgfHwgY2hhbmdlcyA9PT0gZGVsZXRlQ2FsbGJhY2spICYmIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBjdHguaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZTogY3R4LnJhbmdlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0Q2h1bmsgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY291bnQgPSBNYXRoLm1pbihsaW1pdCwga2V5cy5sZW5ndGggLSBvZmZzZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvcmVUYWJsZS5nZXRNYW55KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuczogdHJhbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5czoga2V5cy5zbGljZShvZmZzZXQsIG9mZnNldCArIGNvdW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZTogXCJpbW11dGFibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFkZFZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwdXRWYWx1ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHV0S2V5cyA9IG91dGJvdW5kID8gW10gOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWxldGVLZXlzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmlnVmFsdWUgPSB2YWx1ZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdHhfMSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkZWVwQ2xvbmUob3JpZ1ZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1LZXk6IGtleXNbb2Zmc2V0ICsgaV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGlmeWVyLmNhbGwoY3R4XzEsIGN0eF8xLnZhbHVlLCBjdHhfMSkgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4XzEudmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZUtleXMucHVzaChrZXlzW29mZnNldCArIGldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFvdXRib3VuZCAmJiBjbXAoZXh0cmFjdEtleShvcmlnVmFsdWUpLCBleHRyYWN0S2V5KGN0eF8xLnZhbHVlKSkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVLZXlzLnB1c2goa2V5c1tvZmZzZXQgKyBpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkVmFsdWVzLnB1c2goY3R4XzEudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHV0VmFsdWVzLnB1c2goY3R4XzEudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdXRib3VuZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHV0S2V5cy5wdXNoKGtleXNbb2Zmc2V0ICsgaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoYWRkVmFsdWVzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29yZVRhYmxlLm11dGF0ZSh7IHRyYW5zOiB0cmFucywgdHlwZTogJ2FkZCcsIHZhbHVlczogYWRkVmFsdWVzIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBwb3MgaW4gcmVzLmZhaWx1cmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlS2V5cy5zcGxpY2UocGFyc2VJbnQocG9zKSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBseU11dGF0ZVJlc3VsdChhZGRWYWx1ZXMubGVuZ3RoLCByZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiAocHV0VmFsdWVzLmxlbmd0aCA+IDAgfHwgKGNyaXRlcmlhICYmIHR5cGVvZiBjaGFuZ2VzID09PSAnb2JqZWN0JykpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcmVUYWJsZS5tdXRhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnM6IHRyYW5zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3B1dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBwdXRLZXlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBwdXRWYWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcml0ZXJpYTogY3JpdGVyaWEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VTcGVjOiB0eXBlb2YgY2hhbmdlcyAhPT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGNoYW5nZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0FkZGl0aW9uYWxDaHVuazogb2Zmc2V0ID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIGFwcGx5TXV0YXRlUmVzdWx0KHB1dFZhbHVlcy5sZW5ndGgsIHJlcyk7IH0pOyB9KS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIChkZWxldGVLZXlzLmxlbmd0aCA+IDAgfHwgKGNyaXRlcmlhICYmIGNoYW5nZXMgPT09IGRlbGV0ZUNhbGxiYWNrKSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29yZVRhYmxlLm11dGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuczogdHJhbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGVsZXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IGRlbGV0ZUtleXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcml0ZXJpYTogY3JpdGVyaWEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0FkZGl0aW9uYWxDaHVuazogb2Zmc2V0ID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIGFwcGx5TXV0YXRlUmVzdWx0KGRlbGV0ZUtleXMubGVuZ3RoLCByZXMpOyB9KTsgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXlzLmxlbmd0aCA+IG9mZnNldCArIGNvdW50ICYmIG5leHRDaHVuayhvZmZzZXQgKyBsaW1pdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHRDaHVuaygwKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b3RhbEZhaWx1cmVzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IE1vZGlmeUVycm9yKFwiRXJyb3IgbW9kaWZ5aW5nIG9uZSBvciBtb3JlIG9iamVjdHNcIiwgdG90YWxGYWlsdXJlcywgc3VjY2Vzc0NvdW50LCBmYWlsZWRLZXlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXlzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN0eCA9IHRoaXMuX2N0eCwgcmFuZ2UgPSBjdHgucmFuZ2U7XG4gICAgICAgICAgICBpZiAoaXNQbGFpbktleVJhbmdlKGN0eCkgJiZcbiAgICAgICAgICAgICAgICAoY3R4LmlzUHJpbUtleSB8fCByYW5nZS50eXBlID09PSAzICkpXG4gICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93cml0ZShmdW5jdGlvbiAodHJhbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByaW1hcnlLZXkgPSBjdHgudGFibGUuY29yZS5zY2hlbWEucHJpbWFyeUtleTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvcmVSYW5nZSA9IHJhbmdlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3R4LnRhYmxlLmNvcmUuY291bnQoeyB0cmFuczogdHJhbnMsIHF1ZXJ5OiB7IGluZGV4OiBwcmltYXJ5S2V5LCByYW5nZTogY29yZVJhbmdlIH0gfSkudGhlbihmdW5jdGlvbiAoY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdHgudGFibGUuY29yZS5tdXRhdGUoeyB0cmFuczogdHJhbnMsIHR5cGU6ICdkZWxldGVSYW5nZScsIHJhbmdlOiBjb3JlUmFuZ2UgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZXMgPSBfYS5mYWlsdXJlczsgX2EubGFzdFJlc3VsdDsgX2EucmVzdWx0czsgdmFyIG51bUZhaWx1cmVzID0gX2EubnVtRmFpbHVyZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bUZhaWx1cmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTW9kaWZ5RXJyb3IoXCJDb3VsZCBub3QgZGVsZXRlIHNvbWUgdmFsdWVzXCIsIE9iamVjdC5rZXlzKGZhaWx1cmVzKS5tYXAoZnVuY3Rpb24gKHBvcykgeyByZXR1cm4gZmFpbHVyZXNbcG9zXTsgfSksIGNvdW50IC0gbnVtRmFpbHVyZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3VudCAtIG51bUZhaWx1cmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kaWZ5KGRlbGV0ZUNhbGxiYWNrKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIENvbGxlY3Rpb247XG4gICAgfSgpKTtcbiAgICB2YXIgZGVsZXRlQ2FsbGJhY2sgPSBmdW5jdGlvbiAodmFsdWUsIGN0eCkgeyByZXR1cm4gY3R4LnZhbHVlID0gbnVsbDsgfTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbGxlY3Rpb25Db25zdHJ1Y3RvcihkYikge1xuICAgICAgICByZXR1cm4gbWFrZUNsYXNzQ29uc3RydWN0b3IoQ29sbGVjdGlvbi5wcm90b3R5cGUsIGZ1bmN0aW9uIENvbGxlY3Rpb24od2hlcmVDbGF1c2UsIGtleVJhbmdlR2VuZXJhdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmRiID0gZGI7XG4gICAgICAgICAgICB2YXIga2V5UmFuZ2UgPSBBbnlSYW5nZSwgZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGtleVJhbmdlR2VuZXJhdG9yKVxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGtleVJhbmdlID0ga2V5UmFuZ2VHZW5lcmF0b3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHdoZXJlQ3R4ID0gd2hlcmVDbGF1c2UuX2N0eDtcbiAgICAgICAgICAgIHZhciB0YWJsZSA9IHdoZXJlQ3R4LnRhYmxlO1xuICAgICAgICAgICAgdmFyIHJlYWRpbmdIb29rID0gdGFibGUuaG9vay5yZWFkaW5nLmZpcmU7XG4gICAgICAgICAgICB0aGlzLl9jdHggPSB7XG4gICAgICAgICAgICAgICAgdGFibGU6IHRhYmxlLFxuICAgICAgICAgICAgICAgIGluZGV4OiB3aGVyZUN0eC5pbmRleCxcbiAgICAgICAgICAgICAgICBpc1ByaW1LZXk6ICghd2hlcmVDdHguaW5kZXggfHwgKHRhYmxlLnNjaGVtYS5wcmltS2V5LmtleVBhdGggJiYgd2hlcmVDdHguaW5kZXggPT09IHRhYmxlLnNjaGVtYS5wcmltS2V5Lm5hbWUpKSxcbiAgICAgICAgICAgICAgICByYW5nZToga2V5UmFuZ2UsXG4gICAgICAgICAgICAgICAga2V5c09ubHk6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRpcjogXCJuZXh0XCIsXG4gICAgICAgICAgICAgICAgdW5pcXVlOiBcIlwiLFxuICAgICAgICAgICAgICAgIGFsZ29yaXRobTogbnVsbCxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgcmVwbGF5RmlsdGVyOiBudWxsLFxuICAgICAgICAgICAgICAgIGp1c3RMaW1pdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpc01hdGNoOiBudWxsLFxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICAgICAgICBsaW1pdDogSW5maW5pdHksXG4gICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yLFxuICAgICAgICAgICAgICAgIG9yOiB3aGVyZUN0eC5vcixcbiAgICAgICAgICAgICAgICB2YWx1ZU1hcHBlcjogcmVhZGluZ0hvb2sgIT09IG1pcnJvciA/IHJlYWRpbmdIb29rIDogbnVsbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2ltcGxlQ29tcGFyZShhLCBiKSB7XG4gICAgICAgIHJldHVybiBhIDwgYiA/IC0xIDogYSA9PT0gYiA/IDAgOiAxO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzaW1wbGVDb21wYXJlUmV2ZXJzZShhLCBiKSB7XG4gICAgICAgIHJldHVybiBhID4gYiA/IC0xIDogYSA9PT0gYiA/IDAgOiAxO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZhaWwoY29sbGVjdGlvbk9yV2hlcmVDbGF1c2UsIGVyciwgVCkge1xuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IGNvbGxlY3Rpb25PcldoZXJlQ2xhdXNlIGluc3RhbmNlb2YgV2hlcmVDbGF1c2UgP1xuICAgICAgICAgICAgbmV3IGNvbGxlY3Rpb25PcldoZXJlQ2xhdXNlLkNvbGxlY3Rpb24oY29sbGVjdGlvbk9yV2hlcmVDbGF1c2UpIDpcbiAgICAgICAgICAgIGNvbGxlY3Rpb25PcldoZXJlQ2xhdXNlO1xuICAgICAgICBjb2xsZWN0aW9uLl9jdHguZXJyb3IgPSBUID8gbmV3IFQoZXJyKSA6IG5ldyBUeXBlRXJyb3IoZXJyKTtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVtcHR5Q29sbGVjdGlvbih3aGVyZUNsYXVzZSkge1xuICAgICAgICByZXR1cm4gbmV3IHdoZXJlQ2xhdXNlLkNvbGxlY3Rpb24od2hlcmVDbGF1c2UsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJhbmdlRXF1YWwoXCJcIik7IH0pLmxpbWl0KDApO1xuICAgIH1cbiAgICBmdW5jdGlvbiB1cHBlckZhY3RvcnkoZGlyKSB7XG4gICAgICAgIHJldHVybiBkaXIgPT09IFwibmV4dFwiID9cbiAgICAgICAgICAgIGZ1bmN0aW9uIChzKSB7IHJldHVybiBzLnRvVXBwZXJDYXNlKCk7IH0gOlxuICAgICAgICAgICAgZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMudG9Mb3dlckNhc2UoKTsgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbG93ZXJGYWN0b3J5KGRpcikge1xuICAgICAgICByZXR1cm4gZGlyID09PSBcIm5leHRcIiA/XG4gICAgICAgICAgICBmdW5jdGlvbiAocykgeyByZXR1cm4gcy50b0xvd2VyQ2FzZSgpOyB9IDpcbiAgICAgICAgICAgIGZ1bmN0aW9uIChzKSB7IHJldHVybiBzLnRvVXBwZXJDYXNlKCk7IH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIG5leHRDYXNpbmcoa2V5LCBsb3dlcktleSwgdXBwZXJOZWVkbGUsIGxvd2VyTmVlZGxlLCBjbXAsIGRpcikge1xuICAgICAgICB2YXIgbGVuZ3RoID0gTWF0aC5taW4oa2V5Lmxlbmd0aCwgbG93ZXJOZWVkbGUubGVuZ3RoKTtcbiAgICAgICAgdmFyIGxscCA9IC0xO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgbHdyS2V5Q2hhciA9IGxvd2VyS2V5W2ldO1xuICAgICAgICAgICAgaWYgKGx3cktleUNoYXIgIT09IGxvd2VyTmVlZGxlW2ldKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNtcChrZXlbaV0sIHVwcGVyTmVlZGxlW2ldKSA8IDApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXkuc3Vic3RyKDAsIGkpICsgdXBwZXJOZWVkbGVbaV0gKyB1cHBlck5lZWRsZS5zdWJzdHIoaSArIDEpO1xuICAgICAgICAgICAgICAgIGlmIChjbXAoa2V5W2ldLCBsb3dlck5lZWRsZVtpXSkgPCAwKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5LnN1YnN0cigwLCBpKSArIGxvd2VyTmVlZGxlW2ldICsgdXBwZXJOZWVkbGUuc3Vic3RyKGkgKyAxKTtcbiAgICAgICAgICAgICAgICBpZiAobGxwID49IDApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXkuc3Vic3RyKDAsIGxscCkgKyBsb3dlcktleVtsbHBdICsgdXBwZXJOZWVkbGUuc3Vic3RyKGxscCArIDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNtcChrZXlbaV0sIGx3cktleUNoYXIpIDwgMClcbiAgICAgICAgICAgICAgICBsbHAgPSBpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsZW5ndGggPCBsb3dlck5lZWRsZS5sZW5ndGggJiYgZGlyID09PSBcIm5leHRcIilcbiAgICAgICAgICAgIHJldHVybiBrZXkgKyB1cHBlck5lZWRsZS5zdWJzdHIoa2V5Lmxlbmd0aCk7XG4gICAgICAgIGlmIChsZW5ndGggPCBrZXkubGVuZ3RoICYmIGRpciA9PT0gXCJwcmV2XCIpXG4gICAgICAgICAgICByZXR1cm4ga2V5LnN1YnN0cigwLCB1cHBlck5lZWRsZS5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gKGxscCA8IDAgPyBudWxsIDoga2V5LnN1YnN0cigwLCBsbHApICsgbG93ZXJOZWVkbGVbbGxwXSArIHVwcGVyTmVlZGxlLnN1YnN0cihsbHAgKyAxKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZElnbm9yZUNhc2VBbGdvcml0aG0od2hlcmVDbGF1c2UsIG1hdGNoLCBuZWVkbGVzLCBzdWZmaXgpIHtcbiAgICAgICAgdmFyIHVwcGVyLCBsb3dlciwgY29tcGFyZSwgdXBwZXJOZWVkbGVzLCBsb3dlck5lZWRsZXMsIGRpcmVjdGlvbiwgbmV4dEtleVN1ZmZpeCwgbmVlZGxlc0xlbiA9IG5lZWRsZXMubGVuZ3RoO1xuICAgICAgICBpZiAoIW5lZWRsZXMuZXZlcnkoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHR5cGVvZiBzID09PSAnc3RyaW5nJzsgfSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWlsKHdoZXJlQ2xhdXNlLCBTVFJJTkdfRVhQRUNURUQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGluaXREaXJlY3Rpb24oZGlyKSB7XG4gICAgICAgICAgICB1cHBlciA9IHVwcGVyRmFjdG9yeShkaXIpO1xuICAgICAgICAgICAgbG93ZXIgPSBsb3dlckZhY3RvcnkoZGlyKTtcbiAgICAgICAgICAgIGNvbXBhcmUgPSAoZGlyID09PSBcIm5leHRcIiA/IHNpbXBsZUNvbXBhcmUgOiBzaW1wbGVDb21wYXJlUmV2ZXJzZSk7XG4gICAgICAgICAgICB2YXIgbmVlZGxlQm91bmRzID0gbmVlZGxlcy5tYXAoZnVuY3Rpb24gKG5lZWRsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGxvd2VyOiBsb3dlcihuZWVkbGUpLCB1cHBlcjogdXBwZXIobmVlZGxlKSB9O1xuICAgICAgICAgICAgfSkuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wYXJlKGEubG93ZXIsIGIubG93ZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1cHBlck5lZWRsZXMgPSBuZWVkbGVCb3VuZHMubWFwKGZ1bmN0aW9uIChuYikgeyByZXR1cm4gbmIudXBwZXI7IH0pO1xuICAgICAgICAgICAgbG93ZXJOZWVkbGVzID0gbmVlZGxlQm91bmRzLm1hcChmdW5jdGlvbiAobmIpIHsgcmV0dXJuIG5iLmxvd2VyOyB9KTtcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IGRpcjtcbiAgICAgICAgICAgIG5leHRLZXlTdWZmaXggPSAoZGlyID09PSBcIm5leHRcIiA/IFwiXCIgOiBzdWZmaXgpO1xuICAgICAgICB9XG4gICAgICAgIGluaXREaXJlY3Rpb24oXCJuZXh0XCIpO1xuICAgICAgICB2YXIgYyA9IG5ldyB3aGVyZUNsYXVzZS5Db2xsZWN0aW9uKHdoZXJlQ2xhdXNlLCBmdW5jdGlvbiAoKSB7IHJldHVybiBjcmVhdGVSYW5nZSh1cHBlck5lZWRsZXNbMF0sIGxvd2VyTmVlZGxlc1tuZWVkbGVzTGVuIC0gMV0gKyBzdWZmaXgpOyB9KTtcbiAgICAgICAgYy5fb25kaXJlY3Rpb25jaGFuZ2UgPSBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpbml0RGlyZWN0aW9uKGRpcmVjdGlvbik7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBmaXJzdFBvc3NpYmxlTmVlZGxlID0gMDtcbiAgICAgICAgYy5fYWRkQWxnb3JpdGhtKGZ1bmN0aW9uIChjdXJzb3IsIGFkdmFuY2UsIHJlc29sdmUpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBjdXJzb3Iua2V5O1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHZhciBsb3dlcktleSA9IGxvd2VyKGtleSk7XG4gICAgICAgICAgICBpZiAobWF0Y2gobG93ZXJLZXksIGxvd2VyTmVlZGxlcywgZmlyc3RQb3NzaWJsZU5lZWRsZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBsb3dlc3RQb3NzaWJsZUNhc2luZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGZpcnN0UG9zc2libGVOZWVkbGU7IGkgPCBuZWVkbGVzTGVuOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhc2luZyA9IG5leHRDYXNpbmcoa2V5LCBsb3dlcktleSwgdXBwZXJOZWVkbGVzW2ldLCBsb3dlck5lZWRsZXNbaV0sIGNvbXBhcmUsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXNpbmcgPT09IG51bGwgJiYgbG93ZXN0UG9zc2libGVDYXNpbmcgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFBvc3NpYmxlTmVlZGxlID0gaSArIDE7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxvd2VzdFBvc3NpYmxlQ2FzaW5nID09PSBudWxsIHx8IGNvbXBhcmUobG93ZXN0UG9zc2libGVDYXNpbmcsIGNhc2luZykgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb3dlc3RQb3NzaWJsZUNhc2luZyA9IGNhc2luZztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobG93ZXN0UG9zc2libGVDYXNpbmcgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZShmdW5jdGlvbiAoKSB7IGN1cnNvci5jb250aW51ZShsb3dlc3RQb3NzaWJsZUNhc2luZyArIG5leHRLZXlTdWZmaXgpOyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFkdmFuY2UocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVSYW5nZShsb3dlciwgdXBwZXIsIGxvd2VyT3BlbiwgdXBwZXJPcGVuKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAyICxcbiAgICAgICAgICAgIGxvd2VyOiBsb3dlcixcbiAgICAgICAgICAgIHVwcGVyOiB1cHBlcixcbiAgICAgICAgICAgIGxvd2VyT3BlbjogbG93ZXJPcGVuLFxuICAgICAgICAgICAgdXBwZXJPcGVuOiB1cHBlck9wZW5cbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmFuZ2VFcXVhbCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogMSAsXG4gICAgICAgICAgICBsb3dlcjogdmFsdWUsXG4gICAgICAgICAgICB1cHBlcjogdmFsdWVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgV2hlcmVDbGF1c2UgPSAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gV2hlcmVDbGF1c2UoKSB7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdoZXJlQ2xhdXNlLnByb3RvdHlwZSwgXCJDb2xsZWN0aW9uXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdHgudGFibGUuZGIuQ29sbGVjdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgV2hlcmVDbGF1c2UucHJvdG90eXBlLmJldHdlZW4gPSBmdW5jdGlvbiAobG93ZXIsIHVwcGVyLCBpbmNsdWRlTG93ZXIsIGluY2x1ZGVVcHBlcikge1xuICAgICAgICAgICAgaW5jbHVkZUxvd2VyID0gaW5jbHVkZUxvd2VyICE9PSBmYWxzZTtcbiAgICAgICAgICAgIGluY2x1ZGVVcHBlciA9IGluY2x1ZGVVcHBlciA9PT0gdHJ1ZTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLl9jbXAobG93ZXIsIHVwcGVyKSA+IDApIHx8XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLl9jbXAobG93ZXIsIHVwcGVyKSA9PT0gMCAmJiAoaW5jbHVkZUxvd2VyIHx8IGluY2x1ZGVVcHBlcikgJiYgIShpbmNsdWRlTG93ZXIgJiYgaW5jbHVkZVVwcGVyKSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbXB0eUNvbGxlY3Rpb24odGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzLkNvbGxlY3Rpb24odGhpcywgZnVuY3Rpb24gKCkgeyByZXR1cm4gY3JlYXRlUmFuZ2UobG93ZXIsIHVwcGVyLCAhaW5jbHVkZUxvd2VyLCAhaW5jbHVkZVVwcGVyKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWlsKHRoaXMsIElOVkFMSURfS0VZX0FSR1VNRU5UKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgV2hlcmVDbGF1c2UucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhaWwodGhpcywgSU5WQUxJRF9LRVlfQVJHVU1FTlQpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzLkNvbGxlY3Rpb24odGhpcywgZnVuY3Rpb24gKCkgeyByZXR1cm4gcmFuZ2VFcXVhbCh2YWx1ZSk7IH0pO1xuICAgICAgICB9O1xuICAgICAgICBXaGVyZUNsYXVzZS5wcm90b3R5cGUuYWJvdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWlsKHRoaXMsIElOVkFMSURfS0VZX0FSR1VNRU5UKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcy5Db2xsZWN0aW9uKHRoaXMsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNyZWF0ZVJhbmdlKHZhbHVlLCB1bmRlZmluZWQsIHRydWUpOyB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgV2hlcmVDbGF1c2UucHJvdG90eXBlLmFib3ZlT3JFcXVhbCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhaWwodGhpcywgSU5WQUxJRF9LRVlfQVJHVU1FTlQpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzLkNvbGxlY3Rpb24odGhpcywgZnVuY3Rpb24gKCkgeyByZXR1cm4gY3JlYXRlUmFuZ2UodmFsdWUsIHVuZGVmaW5lZCwgZmFsc2UpOyB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgV2hlcmVDbGF1c2UucHJvdG90eXBlLmJlbG93ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFpbCh0aGlzLCBJTlZBTElEX0tFWV9BUkdVTUVOVCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMuQ29sbGVjdGlvbih0aGlzLCBmdW5jdGlvbiAoKSB7IHJldHVybiBjcmVhdGVSYW5nZSh1bmRlZmluZWQsIHZhbHVlLCBmYWxzZSwgdHJ1ZSk7IH0pO1xuICAgICAgICB9O1xuICAgICAgICBXaGVyZUNsYXVzZS5wcm90b3R5cGUuYmVsb3dPckVxdWFsID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFpbCh0aGlzLCBJTlZBTElEX0tFWV9BUkdVTUVOVCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMuQ29sbGVjdGlvbih0aGlzLCBmdW5jdGlvbiAoKSB7IHJldHVybiBjcmVhdGVSYW5nZSh1bmRlZmluZWQsIHZhbHVlKTsgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFdoZXJlQ2xhdXNlLnByb3RvdHlwZS5zdGFydHNXaXRoID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWlsKHRoaXMsIFNUUklOR19FWFBFQ1RFRCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5iZXR3ZWVuKHN0ciwgc3RyICsgbWF4U3RyaW5nLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgV2hlcmVDbGF1c2UucHJvdG90eXBlLnN0YXJ0c1dpdGhJZ25vcmVDYXNlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgaWYgKHN0ciA9PT0gXCJcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdGFydHNXaXRoKHN0cik7XG4gICAgICAgICAgICByZXR1cm4gYWRkSWdub3JlQ2FzZUFsZ29yaXRobSh0aGlzLCBmdW5jdGlvbiAoeCwgYSkgeyByZXR1cm4geC5pbmRleE9mKGFbMF0pID09PSAwOyB9LCBbc3RyXSwgbWF4U3RyaW5nKTtcbiAgICAgICAgfTtcbiAgICAgICAgV2hlcmVDbGF1c2UucHJvdG90eXBlLmVxdWFsc0lnbm9yZUNhc2UgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgICByZXR1cm4gYWRkSWdub3JlQ2FzZUFsZ29yaXRobSh0aGlzLCBmdW5jdGlvbiAoeCwgYSkgeyByZXR1cm4geCA9PT0gYVswXTsgfSwgW3N0cl0sIFwiXCIpO1xuICAgICAgICB9O1xuICAgICAgICBXaGVyZUNsYXVzZS5wcm90b3R5cGUuYW55T2ZJZ25vcmVDYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNldCA9IGdldEFycmF5T2YuYXBwbHkoTk9fQ0hBUl9BUlJBWSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGlmIChzZXQubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBlbXB0eUNvbGxlY3Rpb24odGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gYWRkSWdub3JlQ2FzZUFsZ29yaXRobSh0aGlzLCBmdW5jdGlvbiAoeCwgYSkgeyByZXR1cm4gYS5pbmRleE9mKHgpICE9PSAtMTsgfSwgc2V0LCBcIlwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgV2hlcmVDbGF1c2UucHJvdG90eXBlLnN0YXJ0c1dpdGhBbnlPZklnbm9yZUNhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2V0ID0gZ2V0QXJyYXlPZi5hcHBseShOT19DSEFSX0FSUkFZLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgaWYgKHNldC5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5Q29sbGVjdGlvbih0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiBhZGRJZ25vcmVDYXNlQWxnb3JpdGhtKHRoaXMsIGZ1bmN0aW9uICh4LCBhKSB7IHJldHVybiBhLnNvbWUoZnVuY3Rpb24gKG4pIHsgcmV0dXJuIHguaW5kZXhPZihuKSA9PT0gMDsgfSk7IH0sIHNldCwgbWF4U3RyaW5nKTtcbiAgICAgICAgfTtcbiAgICAgICAgV2hlcmVDbGF1c2UucHJvdG90eXBlLmFueU9mID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHZhciBzZXQgPSBnZXRBcnJheU9mLmFwcGx5KE5PX0NIQVJfQVJSQVksIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB2YXIgY29tcGFyZSA9IHRoaXMuX2NtcDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc2V0LnNvcnQoY29tcGFyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWlsKHRoaXMsIElOVkFMSURfS0VZX0FSR1VNRU5UKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZXQubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBlbXB0eUNvbGxlY3Rpb24odGhpcyk7XG4gICAgICAgICAgICB2YXIgYyA9IG5ldyB0aGlzLkNvbGxlY3Rpb24odGhpcywgZnVuY3Rpb24gKCkgeyByZXR1cm4gY3JlYXRlUmFuZ2Uoc2V0WzBdLCBzZXRbc2V0Lmxlbmd0aCAtIDFdKTsgfSk7XG4gICAgICAgICAgICBjLl9vbmRpcmVjdGlvbmNoYW5nZSA9IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjb21wYXJlID0gKGRpcmVjdGlvbiA9PT0gXCJuZXh0XCIgP1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fYXNjZW5kaW5nIDpcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2Rlc2NlbmRpbmcpO1xuICAgICAgICAgICAgICAgIHNldC5zb3J0KGNvbXBhcmUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgIGMuX2FkZEFsZ29yaXRobShmdW5jdGlvbiAoY3Vyc29yLCBhZHZhbmNlLCByZXNvbHZlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGN1cnNvci5rZXk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGNvbXBhcmUoa2V5LCBzZXRbaV0pID4gMCkge1xuICAgICAgICAgICAgICAgICAgICArK2k7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSBzZXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKHJlc29sdmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKGtleSwgc2V0W2ldKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFkdmFuY2UoZnVuY3Rpb24gKCkgeyBjdXJzb3IuY29udGludWUoc2V0W2ldKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICB9O1xuICAgICAgICBXaGVyZUNsYXVzZS5wcm90b3R5cGUubm90RXF1YWwgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluQW55UmFuZ2UoW1ttaW5LZXksIHZhbHVlXSwgW3ZhbHVlLCB0aGlzLmRiLl9tYXhLZXldXSwgeyBpbmNsdWRlTG93ZXJzOiBmYWxzZSwgaW5jbHVkZVVwcGVyczogZmFsc2UgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFdoZXJlQ2xhdXNlLnByb3RvdHlwZS5ub25lT2YgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2V0ID0gZ2V0QXJyYXlPZi5hcHBseShOT19DSEFSX0FSUkFZLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgaWYgKHNldC5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzLkNvbGxlY3Rpb24odGhpcyk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHNldC5zb3J0KHRoaXMuX2FzY2VuZGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWlsKHRoaXMsIElOVkFMSURfS0VZX0FSR1VNRU5UKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByYW5nZXMgPSBzZXQucmVkdWNlKGZ1bmN0aW9uIChyZXMsIHZhbCkgeyByZXR1cm4gcmVzID9cbiAgICAgICAgICAgICAgICByZXMuY29uY2F0KFtbcmVzW3Jlcy5sZW5ndGggLSAxXVsxXSwgdmFsXV0pIDpcbiAgICAgICAgICAgICAgICBbW21pbktleSwgdmFsXV07IH0sIG51bGwpO1xuICAgICAgICAgICAgcmFuZ2VzLnB1c2goW3NldFtzZXQubGVuZ3RoIC0gMV0sIHRoaXMuZGIuX21heEtleV0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5BbnlSYW5nZShyYW5nZXMsIHsgaW5jbHVkZUxvd2VyczogZmFsc2UsIGluY2x1ZGVVcHBlcnM6IGZhbHNlIH0pO1xuICAgICAgICB9O1xuICAgICAgICBXaGVyZUNsYXVzZS5wcm90b3R5cGUuaW5BbnlSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZXMsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgY21wID0gdGhpcy5fY21wLCBhc2NlbmRpbmcgPSB0aGlzLl9hc2NlbmRpbmcsIGRlc2NlbmRpbmcgPSB0aGlzLl9kZXNjZW5kaW5nLCBtaW4gPSB0aGlzLl9taW4sIG1heCA9IHRoaXMuX21heDtcbiAgICAgICAgICAgIGlmIChyYW5nZXMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBlbXB0eUNvbGxlY3Rpb24odGhpcyk7XG4gICAgICAgICAgICBpZiAoIXJhbmdlcy5ldmVyeShmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmFuZ2VbMF0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgICAgICByYW5nZVsxXSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgICAgIGFzY2VuZGluZyhyYW5nZVswXSwgcmFuZ2VbMV0pIDw9IDA7XG4gICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWlsKHRoaXMsIFwiRmlyc3QgYXJndW1lbnQgdG8gaW5BbnlSYW5nZSgpIG11c3QgYmUgYW4gQXJyYXkgb2YgdHdvLXZhbHVlIEFycmF5cyBbbG93ZXIsdXBwZXJdIHdoZXJlIHVwcGVyIG11c3Qgbm90IGJlIGxvd2VyIHRoYW4gbG93ZXJcIiwgZXhjZXB0aW9ucy5JbnZhbGlkQXJndW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGluY2x1ZGVMb3dlcnMgPSAhb3B0aW9ucyB8fCBvcHRpb25zLmluY2x1ZGVMb3dlcnMgIT09IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGluY2x1ZGVVcHBlcnMgPSBvcHRpb25zICYmIG9wdGlvbnMuaW5jbHVkZVVwcGVycyA9PT0gdHJ1ZTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZFJhbmdlKHJhbmdlcywgbmV3UmFuZ2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IDAsIGwgPSByYW5nZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByYW5nZSA9IHJhbmdlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNtcChuZXdSYW5nZVswXSwgcmFuZ2VbMV0pIDwgMCAmJiBjbXAobmV3UmFuZ2VbMV0sIHJhbmdlWzBdKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlWzBdID0gbWluKHJhbmdlWzBdLCBuZXdSYW5nZVswXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZVsxXSA9IG1heChyYW5nZVsxXSwgbmV3UmFuZ2VbMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IGwpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlcy5wdXNoKG5ld1JhbmdlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmFuZ2VzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHNvcnREaXJlY3Rpb24gPSBhc2NlbmRpbmc7XG4gICAgICAgICAgICBmdW5jdGlvbiByYW5nZVNvcnRlcihhLCBiKSB7IHJldHVybiBzb3J0RGlyZWN0aW9uKGFbMF0sIGJbMF0pOyB9XG4gICAgICAgICAgICB2YXIgc2V0O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzZXQgPSByYW5nZXMucmVkdWNlKGFkZFJhbmdlLCBbXSk7XG4gICAgICAgICAgICAgICAgc2V0LnNvcnQocmFuZ2VTb3J0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhaWwodGhpcywgSU5WQUxJRF9LRVlfQVJHVU1FTlQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJhbmdlUG9zID0gMDtcbiAgICAgICAgICAgIHZhciBrZXlJc0JleW9uZEN1cnJlbnRFbnRyeSA9IGluY2x1ZGVVcHBlcnMgP1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGFzY2VuZGluZyhrZXksIHNldFtyYW5nZVBvc11bMV0pID4gMDsgfSA6XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gYXNjZW5kaW5nKGtleSwgc2V0W3JhbmdlUG9zXVsxXSkgPj0gMDsgfTtcbiAgICAgICAgICAgIHZhciBrZXlJc0JlZm9yZUN1cnJlbnRFbnRyeSA9IGluY2x1ZGVMb3dlcnMgP1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGRlc2NlbmRpbmcoa2V5LCBzZXRbcmFuZ2VQb3NdWzBdKSA+IDA7IH0gOlxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGRlc2NlbmRpbmcoa2V5LCBzZXRbcmFuZ2VQb3NdWzBdKSA+PSAwOyB9O1xuICAgICAgICAgICAgZnVuY3Rpb24ga2V5V2l0aGluQ3VycmVudFJhbmdlKGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAha2V5SXNCZXlvbmRDdXJyZW50RW50cnkoa2V5KSAmJiAha2V5SXNCZWZvcmVDdXJyZW50RW50cnkoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjaGVja0tleSA9IGtleUlzQmV5b25kQ3VycmVudEVudHJ5O1xuICAgICAgICAgICAgdmFyIGMgPSBuZXcgdGhpcy5Db2xsZWN0aW9uKHRoaXMsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNyZWF0ZVJhbmdlKHNldFswXVswXSwgc2V0W3NldC5sZW5ndGggLSAxXVsxXSwgIWluY2x1ZGVMb3dlcnMsICFpbmNsdWRlVXBwZXJzKTsgfSk7XG4gICAgICAgICAgICBjLl9vbmRpcmVjdGlvbmNoYW5nZSA9IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcIm5leHRcIikge1xuICAgICAgICAgICAgICAgICAgICBjaGVja0tleSA9IGtleUlzQmV5b25kQ3VycmVudEVudHJ5O1xuICAgICAgICAgICAgICAgICAgICBzb3J0RGlyZWN0aW9uID0gYXNjZW5kaW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tLZXkgPSBrZXlJc0JlZm9yZUN1cnJlbnRFbnRyeTtcbiAgICAgICAgICAgICAgICAgICAgc29ydERpcmVjdGlvbiA9IGRlc2NlbmRpbmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNldC5zb3J0KHJhbmdlU29ydGVyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjLl9hZGRBbGdvcml0aG0oZnVuY3Rpb24gKGN1cnNvciwgYWR2YW5jZSwgcmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBjdXJzb3Iua2V5O1xuICAgICAgICAgICAgICAgIHdoaWxlIChjaGVja0tleShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICsrcmFuZ2VQb3M7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyYW5nZVBvcyA9PT0gc2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZShyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoa2V5V2l0aGluQ3VycmVudFJhbmdlKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKF90aGlzLl9jbXAoa2V5LCBzZXRbcmFuZ2VQb3NdWzFdKSA9PT0gMCB8fCBfdGhpcy5fY21wKGtleSwgc2V0W3JhbmdlUG9zXVswXSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc29ydERpcmVjdGlvbiA9PT0gYXNjZW5kaW5nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZShzZXRbcmFuZ2VQb3NdWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUoc2V0W3JhbmdlUG9zXVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgfTtcbiAgICAgICAgV2hlcmVDbGF1c2UucHJvdG90eXBlLnN0YXJ0c1dpdGhBbnlPZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZXQgPSBnZXRBcnJheU9mLmFwcGx5KE5PX0NIQVJfQVJSQVksIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBpZiAoIXNldC5ldmVyeShmdW5jdGlvbiAocykgeyByZXR1cm4gdHlwZW9mIHMgPT09ICdzdHJpbmcnOyB9KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWlsKHRoaXMsIFwic3RhcnRzV2l0aEFueU9mKCkgb25seSB3b3JrcyB3aXRoIHN0cmluZ3NcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2V0Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gZW1wdHlDb2xsZWN0aW9uKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5BbnlSYW5nZShzZXQubWFwKGZ1bmN0aW9uIChzdHIpIHsgcmV0dXJuIFtzdHIsIHN0ciArIG1heFN0cmluZ107IH0pKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFdoZXJlQ2xhdXNlO1xuICAgIH0oKSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVXaGVyZUNsYXVzZUNvbnN0cnVjdG9yKGRiKSB7XG4gICAgICAgIHJldHVybiBtYWtlQ2xhc3NDb25zdHJ1Y3RvcihXaGVyZUNsYXVzZS5wcm90b3R5cGUsIGZ1bmN0aW9uIFdoZXJlQ2xhdXNlKHRhYmxlLCBpbmRleCwgb3JDb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmRiID0gZGI7XG4gICAgICAgICAgICB0aGlzLl9jdHggPSB7XG4gICAgICAgICAgICAgICAgdGFibGU6IHRhYmxlLFxuICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCA9PT0gXCI6aWRcIiA/IG51bGwgOiBpbmRleCxcbiAgICAgICAgICAgICAgICBvcjogb3JDb2xsZWN0aW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5fY21wID0gdGhpcy5fYXNjZW5kaW5nID0gY21wO1xuICAgICAgICAgICAgdGhpcy5fZGVzY2VuZGluZyA9IGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBjbXAoYiwgYSk7IH07XG4gICAgICAgICAgICB0aGlzLl9tYXggPSBmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gY21wKGEsIGIpID4gMCA/IGEgOiBiOyB9O1xuICAgICAgICAgICAgdGhpcy5fbWluID0gZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGNtcChhLCBiKSA8IDAgPyBhIDogYjsgfTtcbiAgICAgICAgICAgIHRoaXMuX0lEQktleVJhbmdlID0gZGIuX2RlcHMuSURCS2V5UmFuZ2U7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX0lEQktleVJhbmdlKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLk1pc3NpbmdBUEkoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXZlbnRSZWplY3RIYW5kbGVyKHJlamVjdCkge1xuICAgICAgICByZXR1cm4gd3JhcChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0KGV2ZW50KTtcbiAgICAgICAgICAgIHJlamVjdChldmVudC50YXJnZXQuZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcHJldmVudERlZmF1bHQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnN0b3BQcm9wYWdhdGlvbilcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAoZXZlbnQucHJldmVudERlZmF1bHQpXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHZhciBERVhJRV9TVE9SQUdFX01VVEFURURfRVZFTlRfTkFNRSA9ICdzdG9yYWdlbXV0YXRlZCc7XG4gICAgdmFyIFNUT1JBR0VfTVVUQVRFRF9ET01fRVZFTlRfTkFNRSA9ICd4LXN0b3JhZ2VtdXRhdGVkLTEnO1xuICAgIHZhciBnbG9iYWxFdmVudHMgPSBFdmVudHMobnVsbCwgREVYSUVfU1RPUkFHRV9NVVRBVEVEX0VWRU5UX05BTUUpO1xuXG4gICAgdmFyIFRyYW5zYWN0aW9uID0gIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFRyYW5zYWN0aW9uKCkge1xuICAgICAgICB9XG4gICAgICAgIFRyYW5zYWN0aW9uLnByb3RvdHlwZS5fbG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGFzc2VydCghUFNELmdsb2JhbCk7XG4gICAgICAgICAgICArK3RoaXMuX3JlY3Vsb2NrO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3JlY3Vsb2NrID09PSAxICYmICFQU0QuZ2xvYmFsKVxuICAgICAgICAgICAgICAgIFBTRC5sb2NrT3duZXJGb3IgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRyYW5zYWN0aW9uLnByb3RvdHlwZS5fdW5sb2NrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYXNzZXJ0KCFQU0QuZ2xvYmFsKTtcbiAgICAgICAgICAgIGlmICgtLXRoaXMuX3JlY3Vsb2NrID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFQU0QuZ2xvYmFsKVxuICAgICAgICAgICAgICAgICAgICBQU0QubG9ja093bmVyRm9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5fYmxvY2tlZEZ1bmNzLmxlbmd0aCA+IDAgJiYgIXRoaXMuX2xvY2tlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbkFuZFBTRCA9IHRoaXMuX2Jsb2NrZWRGdW5jcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlUFNEKGZuQW5kUFNEWzFdLCBmbkFuZFBTRFswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUcmFuc2FjdGlvbi5wcm90b3R5cGUuX2xvY2tlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWN1bG9jayAmJiBQU0QubG9ja093bmVyRm9yICE9PSB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUcmFuc2FjdGlvbi5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGlkYnRyYW5zKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgaWYgKCF0aGlzLm1vZGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB2YXIgaWRiZGIgPSB0aGlzLmRiLmlkYmRiO1xuICAgICAgICAgICAgdmFyIGRiT3BlbkVycm9yID0gdGhpcy5kYi5fc3RhdGUuZGJPcGVuRXJyb3I7XG4gICAgICAgICAgICBhc3NlcnQoIXRoaXMuaWRidHJhbnMpO1xuICAgICAgICAgICAgaWYgKCFpZGJ0cmFucyAmJiAhaWRiZGIpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGRiT3BlbkVycm9yICYmIGRiT3BlbkVycm9yLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkRhdGFiYXNlQ2xvc2VkRXJyb3JcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLkRhdGFiYXNlQ2xvc2VkKGRiT3BlbkVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIk1pc3NpbmdBUElFcnJvclwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuTWlzc2luZ0FQSShkYk9wZW5FcnJvci5tZXNzYWdlLCBkYk9wZW5FcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5PcGVuRmFpbGVkKGRiT3BlbkVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuYWN0aXZlKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLlRyYW5zYWN0aW9uSW5hY3RpdmUoKTtcbiAgICAgICAgICAgIGFzc2VydCh0aGlzLl9jb21wbGV0aW9uLl9zdGF0ZSA9PT0gbnVsbCk7XG4gICAgICAgICAgICBpZGJ0cmFucyA9IHRoaXMuaWRidHJhbnMgPSBpZGJ0cmFucyB8fFxuICAgICAgICAgICAgICAgICh0aGlzLmRiLmNvcmVcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRiLmNvcmUudHJhbnNhY3Rpb24odGhpcy5zdG9yZU5hbWVzLCB0aGlzLm1vZGUsIHsgZHVyYWJpbGl0eTogdGhpcy5jaHJvbWVUcmFuc2FjdGlvbkR1cmFiaWxpdHkgfSlcbiAgICAgICAgICAgICAgICAgICAgOiBpZGJkYi50cmFuc2FjdGlvbih0aGlzLnN0b3JlTmFtZXMsIHRoaXMubW9kZSwgeyBkdXJhYmlsaXR5OiB0aGlzLmNocm9tZVRyYW5zYWN0aW9uRHVyYWJpbGl0eSB9KSk7XG4gICAgICAgICAgICBpZGJ0cmFucy5vbmVycm9yID0gd3JhcChmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdChldik7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3JlamVjdChpZGJ0cmFucy5lcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlkYnRyYW5zLm9uYWJvcnQgPSB3cmFwKGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0KGV2KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5hY3RpdmUgJiYgX3RoaXMuX3JlamVjdChuZXcgZXhjZXB0aW9ucy5BYm9ydChpZGJ0cmFucy5lcnJvcikpO1xuICAgICAgICAgICAgICAgIF90aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIF90aGlzLm9uKFwiYWJvcnRcIikuZmlyZShldik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlkYnRyYW5zLm9uY29tcGxldGUgPSB3cmFwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIGlmICgnbXV0YXRlZFBhcnRzJyBpbiBpZGJ0cmFucykge1xuICAgICAgICAgICAgICAgICAgICBnbG9iYWxFdmVudHMuc3RvcmFnZW11dGF0ZWQuZmlyZShpZGJ0cmFuc1tcIm11dGF0ZWRQYXJ0c1wiXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVHJhbnNhY3Rpb24ucHJvdG90eXBlLl9wcm9taXNlID0gZnVuY3Rpb24gKG1vZGUsIGZuLCBiV3JpdGVMb2NrKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgaWYgKG1vZGUgPT09ICdyZWFkd3JpdGUnICYmIHRoaXMubW9kZSAhPT0gJ3JlYWR3cml0ZScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdGlvbihuZXcgZXhjZXB0aW9ucy5SZWFkT25seShcIlRyYW5zYWN0aW9uIGlzIHJlYWRvbmx5XCIpKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5hY3RpdmUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdGlvbihuZXcgZXhjZXB0aW9ucy5UcmFuc2FjdGlvbkluYWN0aXZlKCkpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2xvY2tlZCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEZXhpZVByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fYmxvY2tlZEZ1bmNzLnB1c2goW2Z1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fcHJvbWlzZShtb2RlLCBmbiwgYldyaXRlTG9jaykudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgUFNEXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiV3JpdGVMb2NrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1Njb3BlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBuZXcgRGV4aWVQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9sb2NrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcnYgPSBmbihyZXNvbHZlLCByZWplY3QsIF90aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChydiAmJiBydi50aGVuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ2LnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHAuZmluYWxseShmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fdW5sb2NrKCk7IH0pO1xuICAgICAgICAgICAgICAgICAgICBwLl9saWIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBwID0gbmV3IERleGllUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBydiA9IGZuKHJlc29sdmUsIHJlamVjdCwgX3RoaXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocnYgJiYgcnYudGhlbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ2LnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwLl9saWIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBUcmFuc2FjdGlvbi5wcm90b3R5cGUuX3Jvb3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5fcm9vdCgpIDogdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVHJhbnNhY3Rpb24ucHJvdG90eXBlLndhaXRGb3IgPSBmdW5jdGlvbiAocHJvbWlzZUxpa2UpIHtcbiAgICAgICAgICAgIHZhciByb290ID0gdGhpcy5fcm9vdCgpO1xuICAgICAgICAgICAgdmFyIHByb21pc2UgPSBEZXhpZVByb21pc2UucmVzb2x2ZShwcm9taXNlTGlrZSk7XG4gICAgICAgICAgICBpZiAocm9vdC5fd2FpdGluZ0Zvcikge1xuICAgICAgICAgICAgICAgIHJvb3QuX3dhaXRpbmdGb3IgPSByb290Ll93YWl0aW5nRm9yLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvbWlzZTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByb290Ll93YWl0aW5nRm9yID0gcHJvbWlzZTtcbiAgICAgICAgICAgICAgICByb290Ll93YWl0aW5nUXVldWUgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgc3RvcmUgPSByb290LmlkYnRyYW5zLm9iamVjdFN0b3JlKHJvb3Quc3RvcmVOYW1lc1swXSk7XG4gICAgICAgICAgICAgICAgKGZ1bmN0aW9uIHNwaW4oKSB7XG4gICAgICAgICAgICAgICAgICAgICsrcm9vdC5fc3BpbkNvdW50O1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAocm9vdC5fd2FpdGluZ1F1ZXVlLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIChyb290Ll93YWl0aW5nUXVldWUuc2hpZnQoKSkoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvb3QuX3dhaXRpbmdGb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yZS5nZXQoLUluZmluaXR5KS5vbnN1Y2Nlc3MgPSBzcGluO1xuICAgICAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY3VycmVudFdhaXRQcm9taXNlID0gcm9vdC5fd2FpdGluZ0ZvcjtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGV4aWVQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcm9vdC5fd2FpdGluZ1F1ZXVlLnB1c2god3JhcChyZXNvbHZlLmJpbmQobnVsbCwgcmVzKSkpOyB9LCBmdW5jdGlvbiAoZXJyKSB7IHJldHVybiByb290Ll93YWl0aW5nUXVldWUucHVzaCh3cmFwKHJlamVjdC5iaW5kKG51bGwsIGVycikpKTsgfSkuZmluYWxseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb290Ll93YWl0aW5nRm9yID09PSBjdXJyZW50V2FpdFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3QuX3dhaXRpbmdGb3IgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgVHJhbnNhY3Rpb24ucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pZGJ0cmFucylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pZGJ0cmFucy5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlamVjdChuZXcgZXhjZXB0aW9ucy5BYm9ydCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgVHJhbnNhY3Rpb24ucHJvdG90eXBlLnRhYmxlID0gZnVuY3Rpb24gKHRhYmxlTmFtZSkge1xuICAgICAgICAgICAgdmFyIG1lbW9pemVkVGFibGVzID0gKHRoaXMuX21lbW9pemVkVGFibGVzIHx8ICh0aGlzLl9tZW1vaXplZFRhYmxlcyA9IHt9KSk7XG4gICAgICAgICAgICBpZiAoaGFzT3duKG1lbW9pemVkVGFibGVzLCB0YWJsZU5hbWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBtZW1vaXplZFRhYmxlc1t0YWJsZU5hbWVdO1xuICAgICAgICAgICAgdmFyIHRhYmxlU2NoZW1hID0gdGhpcy5zY2hlbWFbdGFibGVOYW1lXTtcbiAgICAgICAgICAgIGlmICghdGFibGVTY2hlbWEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5Ob3RGb3VuZChcIlRhYmxlIFwiICsgdGFibGVOYW1lICsgXCIgbm90IHBhcnQgb2YgdHJhbnNhY3Rpb25cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdHJhbnNhY3Rpb25Cb3VuZFRhYmxlID0gbmV3IHRoaXMuZGIuVGFibGUodGFibGVOYW1lLCB0YWJsZVNjaGVtYSwgdGhpcyk7XG4gICAgICAgICAgICB0cmFuc2FjdGlvbkJvdW5kVGFibGUuY29yZSA9IHRoaXMuZGIuY29yZS50YWJsZSh0YWJsZU5hbWUpO1xuICAgICAgICAgICAgbWVtb2l6ZWRUYWJsZXNbdGFibGVOYW1lXSA9IHRyYW5zYWN0aW9uQm91bmRUYWJsZTtcbiAgICAgICAgICAgIHJldHVybiB0cmFuc2FjdGlvbkJvdW5kVGFibGU7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBUcmFuc2FjdGlvbjtcbiAgICB9KCkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlVHJhbnNhY3Rpb25Db25zdHJ1Y3RvcihkYikge1xuICAgICAgICByZXR1cm4gbWFrZUNsYXNzQ29uc3RydWN0b3IoVHJhbnNhY3Rpb24ucHJvdG90eXBlLCBmdW5jdGlvbiBUcmFuc2FjdGlvbihtb2RlLCBzdG9yZU5hbWVzLCBkYnNjaGVtYSwgY2hyb21lVHJhbnNhY3Rpb25EdXJhYmlsaXR5LCBwYXJlbnQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmRiID0gZGI7XG4gICAgICAgICAgICB0aGlzLm1vZGUgPSBtb2RlO1xuICAgICAgICAgICAgdGhpcy5zdG9yZU5hbWVzID0gc3RvcmVOYW1lcztcbiAgICAgICAgICAgIHRoaXMuc2NoZW1hID0gZGJzY2hlbWE7XG4gICAgICAgICAgICB0aGlzLmNocm9tZVRyYW5zYWN0aW9uRHVyYWJpbGl0eSA9IGNocm9tZVRyYW5zYWN0aW9uRHVyYWJpbGl0eTtcbiAgICAgICAgICAgIHRoaXMuaWRidHJhbnMgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5vbiA9IEV2ZW50cyh0aGlzLCBcImNvbXBsZXRlXCIsIFwiZXJyb3JcIiwgXCJhYm9ydFwiKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50IHx8IG51bGw7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9yZWN1bG9jayA9IDA7XG4gICAgICAgICAgICB0aGlzLl9ibG9ja2VkRnVuY3MgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3Jlc29sdmUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fcmVqZWN0ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3dhaXRpbmdGb3IgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fd2FpdGluZ1F1ZXVlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3NwaW5Db3VudCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9jb21wbGV0aW9uID0gbmV3IERleGllUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgIF90aGlzLl9yZWplY3QgPSByZWplY3Q7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBsZXRpb24udGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgX3RoaXMub24uY29tcGxldGUuZmlyZSgpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgd2FzQWN0aXZlID0gX3RoaXMuYWN0aXZlO1xuICAgICAgICAgICAgICAgIF90aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIF90aGlzLm9uLmVycm9yLmZpcmUoZSk7XG4gICAgICAgICAgICAgICAgX3RoaXMucGFyZW50ID9cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucGFyZW50Ll9yZWplY3QoZSkgOlxuICAgICAgICAgICAgICAgICAgICB3YXNBY3RpdmUgJiYgX3RoaXMuaWRidHJhbnMgJiYgX3RoaXMuaWRidHJhbnMuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUluZGV4U3BlYyhuYW1lLCBrZXlQYXRoLCB1bmlxdWUsIG11bHRpLCBhdXRvLCBjb21wb3VuZCwgaXNQcmltS2V5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAga2V5UGF0aDoga2V5UGF0aCxcbiAgICAgICAgICAgIHVuaXF1ZTogdW5pcXVlLFxuICAgICAgICAgICAgbXVsdGk6IG11bHRpLFxuICAgICAgICAgICAgYXV0bzogYXV0byxcbiAgICAgICAgICAgIGNvbXBvdW5kOiBjb21wb3VuZCxcbiAgICAgICAgICAgIHNyYzogKHVuaXF1ZSAmJiAhaXNQcmltS2V5ID8gJyYnIDogJycpICsgKG11bHRpID8gJyonIDogJycpICsgKGF1dG8gPyBcIisrXCIgOiBcIlwiKSArIG5hbWVGcm9tS2V5UGF0aChrZXlQYXRoKVxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBuYW1lRnJvbUtleVBhdGgoa2V5UGF0aCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGtleVBhdGggPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgIGtleVBhdGggOlxuICAgICAgICAgICAga2V5UGF0aCA/ICgnWycgKyBbXS5qb2luLmNhbGwoa2V5UGF0aCwgJysnKSArICddJykgOiBcIlwiO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhYmxlU2NoZW1hKG5hbWUsIHByaW1LZXksIGluZGV4ZXMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBwcmltS2V5OiBwcmltS2V5LFxuICAgICAgICAgICAgaW5kZXhlczogaW5kZXhlcyxcbiAgICAgICAgICAgIG1hcHBlZENsYXNzOiBudWxsLFxuICAgICAgICAgICAgaWR4QnlOYW1lOiBhcnJheVRvT2JqZWN0KGluZGV4ZXMsIGZ1bmN0aW9uIChpbmRleCkgeyByZXR1cm4gW2luZGV4Lm5hbWUsIGluZGV4XTsgfSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzYWZhcmlNdWx0aVN0b3JlRml4KHN0b3JlTmFtZXMpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlTmFtZXMubGVuZ3RoID09PSAxID8gc3RvcmVOYW1lc1swXSA6IHN0b3JlTmFtZXM7XG4gICAgfVxuICAgIHZhciBnZXRNYXhLZXkgPSBmdW5jdGlvbiAoSWRiS2V5UmFuZ2UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIElkYktleVJhbmdlLm9ubHkoW1tdXSk7XG4gICAgICAgICAgICBnZXRNYXhLZXkgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbW11dOyB9O1xuICAgICAgICAgICAgcmV0dXJuIFtbXV07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGdldE1heEtleSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1heFN0cmluZzsgfTtcbiAgICAgICAgICAgIHJldHVybiBtYXhTdHJpbmc7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0S2V5RXh0cmFjdG9yKGtleVBhdGgpIHtcbiAgICAgICAgaWYgKGtleVBhdGggPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Yga2V5UGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRTaW5nbGVQYXRoS2V5RXh0cmFjdG9yKGtleVBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIGdldEJ5S2V5UGF0aChvYmosIGtleVBhdGgpOyB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFNpbmdsZVBhdGhLZXlFeHRyYWN0b3Ioa2V5UGF0aCkge1xuICAgICAgICB2YXIgc3BsaXQgPSBrZXlQYXRoLnNwbGl0KCcuJyk7XG4gICAgICAgIGlmIChzcGxpdC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmpba2V5UGF0aF07IH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gZ2V0QnlLZXlQYXRoKG9iaiwga2V5UGF0aCk7IH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcnJheWlmeShhcnJheUxpa2UpIHtcbiAgICAgICAgcmV0dXJuIFtdLnNsaWNlLmNhbGwoYXJyYXlMaWtlKTtcbiAgICB9XG4gICAgdmFyIF9pZF9jb3VudGVyID0gMDtcbiAgICBmdW5jdGlvbiBnZXRLZXlQYXRoQWxpYXMoa2V5UGF0aCkge1xuICAgICAgICByZXR1cm4ga2V5UGF0aCA9PSBudWxsID9cbiAgICAgICAgICAgIFwiOmlkXCIgOlxuICAgICAgICAgICAgdHlwZW9mIGtleVBhdGggPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgICBrZXlQYXRoIDpcbiAgICAgICAgICAgICAgICBcIltcIi5jb25jYXQoa2V5UGF0aC5qb2luKCcrJyksIFwiXVwiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlREJDb3JlKGRiLCBJZGJLZXlSYW5nZSwgdG1wVHJhbnMpIHtcbiAgICAgICAgZnVuY3Rpb24gZXh0cmFjdFNjaGVtYShkYiwgdHJhbnMpIHtcbiAgICAgICAgICAgIHZhciB0YWJsZXMgPSBhcnJheWlmeShkYi5vYmplY3RTdG9yZU5hbWVzKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGRiLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlczogdGFibGVzLm1hcChmdW5jdGlvbiAodGFibGUpIHsgcmV0dXJuIHRyYW5zLm9iamVjdFN0b3JlKHRhYmxlKTsgfSkubWFwKGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleVBhdGggPSBzdG9yZS5rZXlQYXRoLCBhdXRvSW5jcmVtZW50ID0gc3RvcmUuYXV0b0luY3JlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wb3VuZCA9IGlzQXJyYXkoa2V5UGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3V0Ym91bmQgPSBrZXlQYXRoID09IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXhCeUtleVBhdGggPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogc3RvcmUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5S2V5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUHJpbWFyeUtleTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0Ym91bmQ6IG91dGJvdW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb3VuZDogY29tcG91bmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleVBhdGg6IGtleVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9JbmNyZW1lbnQ6IGF1dG9JbmNyZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXF1ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmFjdEtleTogZ2V0S2V5RXh0cmFjdG9yKGtleVBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleGVzOiBhcnJheWlmeShzdG9yZS5pbmRleE5hbWVzKS5tYXAoZnVuY3Rpb24gKGluZGV4TmFtZSkgeyByZXR1cm4gc3RvcmUuaW5kZXgoaW5kZXhOYW1lKTsgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBpbmRleC5uYW1lLCB1bmlxdWUgPSBpbmRleC51bmlxdWUsIG11bHRpRW50cnkgPSBpbmRleC5tdWx0aUVudHJ5LCBrZXlQYXRoID0gaW5kZXgua2V5UGF0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvdW5kID0gaXNBcnJheShrZXlQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb3VuZDogY29tcG91bmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlQYXRoOiBrZXlQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pcXVlOiB1bmlxdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aUVudHJ5OiBtdWx0aUVudHJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmFjdEtleTogZ2V0S2V5RXh0cmFjdG9yKGtleVBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4QnlLZXlQYXRoW2dldEtleVBhdGhBbGlhcyhrZXlQYXRoKV0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SW5kZXhCeUtleVBhdGg6IGZ1bmN0aW9uIChrZXlQYXRoKSB7IHJldHVybiBpbmRleEJ5S2V5UGF0aFtnZXRLZXlQYXRoQWxpYXMoa2V5UGF0aCldOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhCeUtleVBhdGhbXCI6aWRcIl0gPSByZXN1bHQucHJpbWFyeUtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXlQYXRoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleEJ5S2V5UGF0aFtnZXRLZXlQYXRoQWxpYXMoa2V5UGF0aCldID0gcmVzdWx0LnByaW1hcnlLZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGFzR2V0QWxsOiB0YWJsZXMubGVuZ3RoID4gMCAmJiAoJ2dldEFsbCcgaW4gdHJhbnMub2JqZWN0U3RvcmUodGFibGVzWzBdKSkgJiZcbiAgICAgICAgICAgICAgICAgICAgISh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvU2FmYXJpLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAhLyhDaHJvbWVcXC98RWRnZVxcLykvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIFtdLmNvbmNhdChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9TYWZhcmlcXC8oXFxkKikvKSlbMV0gPCA2MDQpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG1ha2VJREJLZXlSYW5nZShyYW5nZSkge1xuICAgICAgICAgICAgaWYgKHJhbmdlLnR5cGUgPT09IDMgKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgaWYgKHJhbmdlLnR5cGUgPT09IDQgKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjb252ZXJ0IG5ldmVyIHR5cGUgdG8gSURCS2V5UmFuZ2VcIik7XG4gICAgICAgICAgICB2YXIgbG93ZXIgPSByYW5nZS5sb3dlciwgdXBwZXIgPSByYW5nZS51cHBlciwgbG93ZXJPcGVuID0gcmFuZ2UubG93ZXJPcGVuLCB1cHBlck9wZW4gPSByYW5nZS51cHBlck9wZW47XG4gICAgICAgICAgICB2YXIgaWRiUmFuZ2UgPSBsb3dlciA9PT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgICAgICB1cHBlciA9PT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgICAgICAgICAgbnVsbCA6XG4gICAgICAgICAgICAgICAgICAgIElkYktleVJhbmdlLnVwcGVyQm91bmQodXBwZXIsICEhdXBwZXJPcGVuKSA6XG4gICAgICAgICAgICAgICAgdXBwZXIgPT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICAgICAgICAgIElkYktleVJhbmdlLmxvd2VyQm91bmQobG93ZXIsICEhbG93ZXJPcGVuKSA6XG4gICAgICAgICAgICAgICAgICAgIElkYktleVJhbmdlLmJvdW5kKGxvd2VyLCB1cHBlciwgISFsb3dlck9wZW4sICEhdXBwZXJPcGVuKTtcbiAgICAgICAgICAgIHJldHVybiBpZGJSYW5nZTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVEYkNvcmVUYWJsZSh0YWJsZVNjaGVtYSkge1xuICAgICAgICAgICAgdmFyIHRhYmxlTmFtZSA9IHRhYmxlU2NoZW1hLm5hbWU7XG4gICAgICAgICAgICBmdW5jdGlvbiBtdXRhdGUoX2EpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnMgPSBfYS50cmFucywgdHlwZSA9IF9hLnR5cGUsIGtleXMgPSBfYS5rZXlzLCB2YWx1ZXMgPSBfYS52YWx1ZXMsIHJhbmdlID0gX2EucmFuZ2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSA9IHdyYXAocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKHRhYmxlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvdXRib3VuZCA9IHN0b3JlLmtleVBhdGggPT0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzQWRkT3JQdXQgPSB0eXBlID09PSBcInB1dFwiIHx8IHR5cGUgPT09IFwiYWRkXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNBZGRPclB1dCAmJiB0eXBlICE9PSAnZGVsZXRlJyAmJiB0eXBlICE9PSAnZGVsZXRlUmFuZ2UnKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBvcGVyYXRpb24gdHlwZTogXCIgKyB0eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IChrZXlzIHx8IHZhbHVlcyB8fCB7IGxlbmd0aDogMSB9KS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXlzICYmIHZhbHVlcyAmJiBrZXlzLmxlbmd0aCAhPT0gdmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2l2ZW4ga2V5cyBhcnJheSBtdXN0IGhhdmUgc2FtZSBsZW5ndGggYXMgZ2l2ZW4gdmFsdWVzIGFycmF5LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoeyBudW1GYWlsdXJlczogMCwgZmFpbHVyZXM6IHt9LCByZXN1bHRzOiBbXSwgbGFzdFJlc3VsdDogdW5kZWZpbmVkIH0pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVxO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVxcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG51bUZhaWx1cmVzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9ySGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgKytudW1GYWlsdXJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0KGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdkZWxldGVSYW5nZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYW5nZS50eXBlID09PSA0IClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh7IG51bUZhaWx1cmVzOiBudW1GYWlsdXJlcywgZmFpbHVyZXM6IGZhaWx1cmVzLCByZXN1bHRzOiBbXSwgbGFzdFJlc3VsdDogdW5kZWZpbmVkIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmdlLnR5cGUgPT09IDMgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXMucHVzaChyZXEgPSBzdG9yZS5jbGVhcigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFzLnB1c2gocmVxID0gc3RvcmUuZGVsZXRlKG1ha2VJREJLZXlSYW5nZShyYW5nZSkpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSA9IGlzQWRkT3JQdXQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGJvdW5kID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3ZhbHVlcywga2V5c10gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVzLCBudWxsXSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2tleXMsIG51bGxdLCBhcmdzMSA9IF9hWzBdLCBhcmdzMiA9IF9hWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQWRkT3JQdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXMucHVzaChyZXEgPSAoYXJnczIgJiYgYXJnczJbaV0gIT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yZVt0eXBlXShhcmdzMVtpXSwgYXJnczJbaV0pIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlW3R5cGVdKGFyZ3MxW2ldKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEub25lcnJvciA9IGVycm9ySGFuZGxlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXMucHVzaChyZXEgPSBzdG9yZVt0eXBlXShhcmdzMVtpXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEub25lcnJvciA9IGVycm9ySGFuZGxlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRvbmUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYXN0UmVzdWx0ID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXMuZm9yRWFjaChmdW5jdGlvbiAocmVxLCBpKSB7IHJldHVybiByZXEuZXJyb3IgIT0gbnVsbCAmJiAoZmFpbHVyZXNbaV0gPSByZXEuZXJyb3IpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bUZhaWx1cmVzOiBudW1GYWlsdXJlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsdXJlczogZmFpbHVyZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0czogdHlwZSA9PT0gXCJkZWxldGVcIiA/IGtleXMgOiByZXFzLm1hcChmdW5jdGlvbiAocmVxKSB7IHJldHVybiByZXEucmVzdWx0OyB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0UmVzdWx0OiBsYXN0UmVzdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ySGFuZGxlcihldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uc3VjY2VzcyA9IGRvbmU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBvcGVuQ3Vyc29yKF9hKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zID0gX2EudHJhbnMsIHZhbHVlcyA9IF9hLnZhbHVlcywgcXVlcnkgPSBfYS5xdWVyeSwgcmV2ZXJzZSA9IF9hLnJldmVyc2UsIHVuaXF1ZSA9IF9hLnVuaXF1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlID0gd3JhcChyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gcXVlcnkuaW5kZXgsIHJhbmdlID0gcXVlcnkucmFuZ2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKHRhYmxlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2UgPSBpbmRleC5pc1ByaW1hcnlLZXkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmUgOlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmUuaW5kZXgoaW5kZXgubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSByZXZlcnNlID9cbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXF1ZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV2dW5pcXVlXCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldlwiIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXF1ZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXh0dW5pcXVlXCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmV4dFwiO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVxID0gdmFsdWVzIHx8ICEoJ29wZW5LZXlDdXJzb3InIGluIHNvdXJjZSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlLm9wZW5DdXJzb3IobWFrZUlEQktleVJhbmdlKHJhbmdlKSwgZGlyZWN0aW9uKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2Uub3BlbktleUN1cnNvcihtYWtlSURCS2V5UmFuZ2UocmFuZ2UpLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICByZXEub25lcnJvciA9IGV2ZW50UmVqZWN0SGFuZGxlcihyZWplY3QpO1xuICAgICAgICAgICAgICAgICAgICByZXEub25zdWNjZXNzID0gd3JhcChmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJzb3IgPSByZXEucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXJzb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5fX19pZCA9ICsrX2lkX2NvdW50ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9jdXJzb3JDb250aW51ZSA9IGN1cnNvci5jb250aW51ZS5iaW5kKGN1cnNvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2N1cnNvckNvbnRpbnVlUHJpbWFyeUtleSA9IGN1cnNvci5jb250aW51ZVByaW1hcnlLZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2N1cnNvckNvbnRpbnVlUHJpbWFyeUtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY3Vyc29yQ29udGludWVQcmltYXJ5S2V5ID0gX2N1cnNvckNvbnRpbnVlUHJpbWFyeUtleS5iaW5kKGN1cnNvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2N1cnNvckFkdmFuY2UgPSBjdXJzb3IuYWR2YW5jZS5iaW5kKGN1cnNvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9UaHJvd0N1cnNvcklzTm90U3RhcnRlZCA9IGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ3Vyc29yIG5vdCBzdGFydGVkXCIpOyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRvVGhyb3dDdXJzb3JJc1N0b3BwZWQgPSBmdW5jdGlvbiAoKSB7IHRocm93IG5ldyBFcnJvcihcIkN1cnNvciBub3Qgc3RvcHBlZFwiKTsgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci50cmFucyA9IHRyYW5zO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLnN0b3AgPSBjdXJzb3IuY29udGludWUgPSBjdXJzb3IuY29udGludWVQcmltYXJ5S2V5ID0gY3Vyc29yLmFkdmFuY2UgPSBkb1Rocm93Q3Vyc29ySXNOb3RTdGFydGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLmZhaWwgPSB3cmFwKHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnb3RPbmUgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXJ0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGdvdE9uZS0tID8gX3RoaXMuY29udGludWUoKSA6IF90aGlzLnN0b3AoKTsgfSkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpczsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLnN0YXJ0ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZXJhdGlvblByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZUl0ZXJhdGlvbiwgcmVqZWN0SXRlcmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVJdGVyYXRpb24gPSB3cmFwKHJlc29sdmVJdGVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEub25lcnJvciA9IGV2ZW50UmVqZWN0SGFuZGxlcihyZWplY3RJdGVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IuZmFpbCA9IHJlamVjdEl0ZXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLnN0b3AgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5zdG9wID0gY3Vyc29yLmNvbnRpbnVlID0gY3Vyc29yLmNvbnRpbnVlUHJpbWFyeUtleSA9IGN1cnNvci5hZHZhbmNlID0gZG9UaHJvd0N1cnNvcklzU3RvcHBlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVJdGVyYXRpb24odmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBndWFyZGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXEucmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLmZhaWwoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5kb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5zdGFydCA9IGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ3Vyc29yIGJlaGluZCBsYXN0IGVudHJ5XCIpOyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxLm9uc3VjY2VzcyA9IHdyYXAoZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5vbnN1Y2Nlc3MgPSBndWFyZGVkQ2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGd1YXJkZWRDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSA9IF9jdXJzb3JDb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IuY29udGludWVQcmltYXJ5S2V5ID0gX2N1cnNvckNvbnRpbnVlUHJpbWFyeUtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IuYWR2YW5jZSA9IF9jdXJzb3JBZHZhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGd1YXJkZWRDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVyYXRpb25Qcm9taXNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY3Vyc29yKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHF1ZXJ5KGhhc0dldEFsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSA9IHdyYXAocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnMgPSByZXF1ZXN0LnRyYW5zLCB2YWx1ZXMgPSByZXF1ZXN0LnZhbHVlcywgbGltaXQgPSByZXF1ZXN0LmxpbWl0LCBxdWVyeSA9IHJlcXVlc3QucXVlcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9uSW5maW5pdExpbWl0ID0gbGltaXQgPT09IEluZmluaXR5ID8gdW5kZWZpbmVkIDogbGltaXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBxdWVyeS5pbmRleCwgcmFuZ2UgPSBxdWVyeS5yYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKHRhYmxlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlID0gaW5kZXguaXNQcmltYXJ5S2V5ID8gc3RvcmUgOiBzdG9yZS5pbmRleChpbmRleC5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZGJLZXlSYW5nZSA9IG1ha2VJREJLZXlSYW5nZShyYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGltaXQgPT09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoeyByZXN1bHQ6IFtdIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc0dldEFsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXEgPSB2YWx1ZXMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZ2V0QWxsKGlkYktleVJhbmdlLCBub25JbmZpbml0TGltaXQpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlLmdldEFsbEtleXMoaWRiS2V5UmFuZ2UsIG5vbkluZmluaXRMaW1pdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkgeyByZXR1cm4gcmVzb2x2ZSh7IHJlc3VsdDogZXZlbnQudGFyZ2V0LnJlc3VsdCB9KTsgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEub25lcnJvciA9IGV2ZW50UmVqZWN0SGFuZGxlcihyZWplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvdW50XzEgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXFfMSA9IHZhbHVlcyB8fCAhKCdvcGVuS2V5Q3Vyc29yJyBpbiBzb3VyY2UpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlLm9wZW5DdXJzb3IoaWRiS2V5UmFuZ2UpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlLm9wZW5LZXlDdXJzb3IoaWRiS2V5UmFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHRfMSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcV8xLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3Vyc29yID0gcmVxXzEucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWN1cnNvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHsgcmVzdWx0OiByZXN1bHRfMSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0XzEucHVzaCh2YWx1ZXMgPyBjdXJzb3IudmFsdWUgOiBjdXJzb3IucHJpbWFyeUtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgrK2NvdW50XzEgPT09IGxpbWl0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoeyByZXN1bHQ6IHJlc3VsdF8xIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcV8xLm9uZXJyb3IgPSBldmVudFJlamVjdEhhbmRsZXIocmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbmFtZTogdGFibGVOYW1lLFxuICAgICAgICAgICAgICAgIHNjaGVtYTogdGFibGVTY2hlbWEsXG4gICAgICAgICAgICAgICAgbXV0YXRlOiBtdXRhdGUsXG4gICAgICAgICAgICAgICAgZ2V0TWFueTogZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmFucyA9IF9hLnRyYW5zLCBrZXlzID0gX2Eua2V5cztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUgPSB3cmFwKHJlc29sdmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0b3JlID0gdHJhbnMub2JqZWN0U3RvcmUodGFibGVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXlDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2tDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3NIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHJlc3VsdFtyZXEuX3Bvc10gPSByZXEucmVzdWx0KSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCsrY2FsbGJhY2tDb3VudCA9PT0ga2V5Q291bnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3JIYW5kbGVyID0gZXZlbnRSZWplY3RIYW5kbGVyKHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcSA9IHN0b3JlLmdldChrZXlzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxLl9wb3MgPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEub25zdWNjZXNzID0gc3VjY2Vzc0hhbmRsZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5vbmVycm9yID0gZXJyb3JIYW5kbGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArK2tleUNvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXlDb3VudCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zID0gX2EudHJhbnMsIGtleSA9IF9hLmtleTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUgPSB3cmFwKHJlc29sdmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0b3JlID0gdHJhbnMub2JqZWN0U3RvcmUodGFibGVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXEgPSBzdG9yZS5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7IH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXEub25lcnJvciA9IGV2ZW50UmVqZWN0SGFuZGxlcihyZWplY3QpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeShoYXNHZXRBbGwpLFxuICAgICAgICAgICAgICAgIG9wZW5DdXJzb3I6IG9wZW5DdXJzb3IsXG4gICAgICAgICAgICAgICAgY291bnQ6IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcXVlcnkgPSBfYS5xdWVyeSwgdHJhbnMgPSBfYS50cmFucztcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gcXVlcnkuaW5kZXgsIHJhbmdlID0gcXVlcnkucmFuZ2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RvcmUgPSB0cmFucy5vYmplY3RTdG9yZSh0YWJsZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGluZGV4LmlzUHJpbWFyeUtleSA/IHN0b3JlIDogc3RvcmUuaW5kZXgoaW5kZXgubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWRiS2V5UmFuZ2UgPSBtYWtlSURCS2V5UmFuZ2UocmFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcSA9IGlkYktleVJhbmdlID8gc291cmNlLmNvdW50KGlkYktleVJhbmdlKSA6IHNvdXJjZS5jb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxLm9uc3VjY2VzcyA9IHdyYXAoZnVuY3Rpb24gKGV2KSB7IHJldHVybiByZXNvbHZlKGV2LnRhcmdldC5yZXN1bHQpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5vbmVycm9yID0gZXZlbnRSZWplY3RIYW5kbGVyKHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9hID0gZXh0cmFjdFNjaGVtYShkYiwgdG1wVHJhbnMpLCBzY2hlbWEgPSBfYS5zY2hlbWEsIGhhc0dldEFsbCA9IF9hLmhhc0dldEFsbDtcbiAgICAgICAgdmFyIHRhYmxlcyA9IHNjaGVtYS50YWJsZXMubWFwKGZ1bmN0aW9uICh0YWJsZVNjaGVtYSkgeyByZXR1cm4gY3JlYXRlRGJDb3JlVGFibGUodGFibGVTY2hlbWEpOyB9KTtcbiAgICAgICAgdmFyIHRhYmxlTWFwID0ge307XG4gICAgICAgIHRhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uICh0YWJsZSkgeyByZXR1cm4gdGFibGVNYXBbdGFibGUubmFtZV0gPSB0YWJsZTsgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFjazogXCJkYmNvcmVcIixcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uOiBkYi50cmFuc2FjdGlvbi5iaW5kKGRiKSxcbiAgICAgICAgICAgIHRhYmxlOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0YWJsZU1hcFtuYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGFibGUgJ1wiLmNvbmNhdChuYW1lLCBcIicgbm90IGZvdW5kXCIpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFibGVNYXBbbmFtZV07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgTUlOX0tFWTogLUluZmluaXR5LFxuICAgICAgICAgICAgTUFYX0tFWTogZ2V0TWF4S2V5KElkYktleVJhbmdlKSxcbiAgICAgICAgICAgIHNjaGVtYTogc2NoZW1hXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlTWlkZGxld2FyZVN0YWNrKHN0YWNrSW1wbCwgbWlkZGxld2FyZXMpIHtcbiAgICAgICAgcmV0dXJuIG1pZGRsZXdhcmVzLnJlZHVjZShmdW5jdGlvbiAoZG93biwgX2EpIHtcbiAgICAgICAgICAgIHZhciBjcmVhdGUgPSBfYS5jcmVhdGU7XG4gICAgICAgICAgICByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBkb3duKSwgY3JlYXRlKGRvd24pKSk7XG4gICAgICAgIH0sIHN0YWNrSW1wbCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1pZGRsZXdhcmVTdGFja3MobWlkZGxld2FyZXMsIGlkYmRiLCBfYSwgdG1wVHJhbnMpIHtcbiAgICAgICAgdmFyIElEQktleVJhbmdlID0gX2EuSURCS2V5UmFuZ2U7IF9hLmluZGV4ZWREQjtcbiAgICAgICAgdmFyIGRiY29yZSA9IGNyZWF0ZU1pZGRsZXdhcmVTdGFjayhjcmVhdGVEQkNvcmUoaWRiZGIsIElEQktleVJhbmdlLCB0bXBUcmFucyksIG1pZGRsZXdhcmVzLmRiY29yZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYmNvcmU6IGRiY29yZVxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZU1pZGRsZXdhcmVTdGFja3MoZGIsIHRtcFRyYW5zKSB7XG4gICAgICAgIHZhciBpZGJkYiA9IHRtcFRyYW5zLmRiO1xuICAgICAgICB2YXIgc3RhY2tzID0gY3JlYXRlTWlkZGxld2FyZVN0YWNrcyhkYi5fbWlkZGxld2FyZXMsIGlkYmRiLCBkYi5fZGVwcywgdG1wVHJhbnMpO1xuICAgICAgICBkYi5jb3JlID0gc3RhY2tzLmRiY29yZTtcbiAgICAgICAgZGIudGFibGVzLmZvckVhY2goZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICAgICAgICB2YXIgdGFibGVOYW1lID0gdGFibGUubmFtZTtcbiAgICAgICAgICAgIGlmIChkYi5jb3JlLnNjaGVtYS50YWJsZXMuc29tZShmdW5jdGlvbiAodGJsKSB7IHJldHVybiB0YmwubmFtZSA9PT0gdGFibGVOYW1lOyB9KSkge1xuICAgICAgICAgICAgICAgIHRhYmxlLmNvcmUgPSBkYi5jb3JlLnRhYmxlKHRhYmxlTmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKGRiW3RhYmxlTmFtZV0gaW5zdGFuY2VvZiBkYi5UYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBkYlt0YWJsZU5hbWVdLmNvcmUgPSB0YWJsZS5jb3JlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0QXBpT25QbGFjZShkYiwgb2JqcywgdGFibGVOYW1lcywgZGJzY2hlbWEpIHtcbiAgICAgICAgdGFibGVOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uICh0YWJsZU5hbWUpIHtcbiAgICAgICAgICAgIHZhciBzY2hlbWEgPSBkYnNjaGVtYVt0YWJsZU5hbWVdO1xuICAgICAgICAgICAgb2Jqcy5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcERlc2MgPSBnZXRQcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCB0YWJsZU5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICghcHJvcERlc2MgfHwgKFwidmFsdWVcIiBpbiBwcm9wRGVzYyAmJiBwcm9wRGVzYy52YWx1ZSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JqID09PSBkYi5UcmFuc2FjdGlvbi5wcm90b3R5cGUgfHwgb2JqIGluc3RhbmNlb2YgZGIuVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFByb3Aob2JqLCB0YWJsZU5hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMudGFibGUodGFibGVOYW1lKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCB0YWJsZU5hbWUsIHsgdmFsdWU6IHZhbHVlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqW3RhYmxlTmFtZV0gPSBuZXcgZGIuVGFibGUodGFibGVOYW1lLCBzY2hlbWEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVUYWJsZXNBcGkoZGIsIG9ianMpIHtcbiAgICAgICAgb2Jqcy5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqW2tleV0gaW5zdGFuY2VvZiBkYi5UYWJsZSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbG93ZXJWZXJzaW9uRmlyc3QoYSwgYikge1xuICAgICAgICByZXR1cm4gYS5fY2ZnLnZlcnNpb24gLSBiLl9jZmcudmVyc2lvbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gcnVuVXBncmFkZXJzKGRiLCBvbGRWZXJzaW9uLCBpZGJVcGdyYWRlVHJhbnMsIHJlamVjdCkge1xuICAgICAgICB2YXIgZ2xvYmFsU2NoZW1hID0gZGIuX2RiU2NoZW1hO1xuICAgICAgICBpZiAoaWRiVXBncmFkZVRyYW5zLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoJyRtZXRhJykgJiYgIWdsb2JhbFNjaGVtYS4kbWV0YSkge1xuICAgICAgICAgICAgZ2xvYmFsU2NoZW1hLiRtZXRhID0gY3JlYXRlVGFibGVTY2hlbWEoXCIkbWV0YVwiLCBwYXJzZUluZGV4U3ludGF4KFwiXCIpWzBdLCBbXSk7XG4gICAgICAgICAgICBkYi5fc3RvcmVOYW1lcy5wdXNoKCckbWV0YScpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0cmFucyA9IGRiLl9jcmVhdGVUcmFuc2FjdGlvbigncmVhZHdyaXRlJywgZGIuX3N0b3JlTmFtZXMsIGdsb2JhbFNjaGVtYSk7XG4gICAgICAgIHRyYW5zLmNyZWF0ZShpZGJVcGdyYWRlVHJhbnMpO1xuICAgICAgICB0cmFucy5fY29tcGxldGlvbi5jYXRjaChyZWplY3QpO1xuICAgICAgICB2YXIgcmVqZWN0VHJhbnNhY3Rpb24gPSB0cmFucy5fcmVqZWN0LmJpbmQodHJhbnMpO1xuICAgICAgICB2YXIgdHJhbnNsZXNzID0gUFNELnRyYW5zbGVzcyB8fCBQU0Q7XG4gICAgICAgIG5ld1Njb3BlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFBTRC50cmFucyA9IHRyYW5zO1xuICAgICAgICAgICAgUFNELnRyYW5zbGVzcyA9IHRyYW5zbGVzcztcbiAgICAgICAgICAgIGlmIChvbGRWZXJzaW9uID09PSAwKSB7XG4gICAgICAgICAgICAgICAga2V5cyhnbG9iYWxTY2hlbWEpLmZvckVhY2goZnVuY3Rpb24gKHRhYmxlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVUYWJsZShpZGJVcGdyYWRlVHJhbnMsIHRhYmxlTmFtZSwgZ2xvYmFsU2NoZW1hW3RhYmxlTmFtZV0ucHJpbUtleSwgZ2xvYmFsU2NoZW1hW3RhYmxlTmFtZV0uaW5kZXhlcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVNaWRkbGV3YXJlU3RhY2tzKGRiLCBpZGJVcGdyYWRlVHJhbnMpO1xuICAgICAgICAgICAgICAgIERleGllUHJvbWlzZS5mb2xsb3coZnVuY3Rpb24gKCkgeyByZXR1cm4gZGIub24ucG9wdWxhdGUuZmlyZSh0cmFucyk7IH0pLmNhdGNoKHJlamVjdFRyYW5zYWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlTWlkZGxld2FyZVN0YWNrcyhkYiwgaWRiVXBncmFkZVRyYW5zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RXhpc3RpbmdWZXJzaW9uKGRiLCB0cmFucywgb2xkVmVyc2lvbilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKG9sZFZlcnNpb24pIHsgcmV0dXJuIHVwZGF0ZVRhYmxlc0FuZEluZGV4ZXMoZGIsIG9sZFZlcnNpb24sIHRyYW5zLCBpZGJVcGdyYWRlVHJhbnMpOyB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2gocmVqZWN0VHJhbnNhY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGF0Y2hDdXJyZW50VmVyc2lvbihkYiwgaWRiVXBncmFkZVRyYW5zKSB7XG4gICAgICAgIGNyZWF0ZU1pc3NpbmdUYWJsZXMoZGIuX2RiU2NoZW1hLCBpZGJVcGdyYWRlVHJhbnMpO1xuICAgICAgICBpZiAoaWRiVXBncmFkZVRyYW5zLmRiLnZlcnNpb24gJSAxMCA9PT0gMCAmJiAhaWRiVXBncmFkZVRyYW5zLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoJyRtZXRhJykpIHtcbiAgICAgICAgICAgIGlkYlVwZ3JhZGVUcmFucy5kYi5jcmVhdGVPYmplY3RTdG9yZSgnJG1ldGEnKS5hZGQoTWF0aC5jZWlsKChpZGJVcGdyYWRlVHJhbnMuZGIudmVyc2lvbiAvIDEwKSAtIDEpLCAndmVyc2lvbicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBnbG9iYWxTY2hlbWEgPSBidWlsZEdsb2JhbFNjaGVtYShkYiwgZGIuaWRiZGIsIGlkYlVwZ3JhZGVUcmFucyk7XG4gICAgICAgIGFkanVzdFRvRXhpc3RpbmdJbmRleE5hbWVzKGRiLCBkYi5fZGJTY2hlbWEsIGlkYlVwZ3JhZGVUcmFucyk7XG4gICAgICAgIHZhciBkaWZmID0gZ2V0U2NoZW1hRGlmZihnbG9iYWxTY2hlbWEsIGRiLl9kYlNjaGVtYSk7XG4gICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKHRhYmxlQ2hhbmdlKSB7XG4gICAgICAgICAgICBpZiAodGFibGVDaGFuZ2UuY2hhbmdlLmxlbmd0aCB8fCB0YWJsZUNoYW5nZS5yZWNyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byBwYXRjaCBpbmRleGVzIG9mIHRhYmxlIFwiLmNvbmNhdCh0YWJsZUNoYW5nZS5uYW1lLCBcIiBiZWNhdXNlIGl0IGhhcyBjaGFuZ2VzIG9uIHRoZSB0eXBlIG9mIGluZGV4IG9yIHByaW1hcnkga2V5LlwiKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHZvaWQgMCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHN0b3JlID0gaWRiVXBncmFkZVRyYW5zLm9iamVjdFN0b3JlKHRhYmxlQ2hhbmdlLm5hbWUpO1xuICAgICAgICAgICAgdGFibGVDaGFuZ2UuYWRkLmZvckVhY2goZnVuY3Rpb24gKGlkeCkge1xuICAgICAgICAgICAgICAgIGlmIChkZWJ1ZylcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkRleGllIHVwZ3JhZGUgcGF0Y2g6IENyZWF0aW5nIG1pc3NpbmcgaW5kZXggXCIuY29uY2F0KHRhYmxlQ2hhbmdlLm5hbWUsIFwiLlwiKS5jb25jYXQoaWR4LnNyYykpO1xuICAgICAgICAgICAgICAgIGFkZEluZGV4KHN0b3JlLCBpZHgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBkaWZmLmNoYW5nZTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciB0YWJsZUNoYW5nZSA9IF9hW19pXTtcbiAgICAgICAgICAgIHZhciBzdGF0ZV8xID0gX2xvb3BfMSh0YWJsZUNoYW5nZSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0YXRlXzEgPT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlXzEudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0RXhpc3RpbmdWZXJzaW9uKGRiLCB0cmFucywgb2xkVmVyc2lvbikge1xuICAgICAgICBpZiAodHJhbnMuc3RvcmVOYW1lcy5pbmNsdWRlcygnJG1ldGEnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRyYW5zLnRhYmxlKCckbWV0YScpLmdldCgndmVyc2lvbicpLnRoZW4oZnVuY3Rpb24gKG1ldGFWZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ldGFWZXJzaW9uICE9IG51bGwgPyBtZXRhVmVyc2lvbiA6IG9sZFZlcnNpb247XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBEZXhpZVByb21pc2UucmVzb2x2ZShvbGRWZXJzaW9uKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVUYWJsZXNBbmRJbmRleGVzKGRiLCBvbGRWZXJzaW9uLCB0cmFucywgaWRiVXBncmFkZVRyYW5zKSB7XG4gICAgICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgICAgICB2YXIgdmVyc2lvbnMgPSBkYi5fdmVyc2lvbnM7XG4gICAgICAgIHZhciBnbG9iYWxTY2hlbWEgPSBkYi5fZGJTY2hlbWEgPSBidWlsZEdsb2JhbFNjaGVtYShkYiwgZGIuaWRiZGIsIGlkYlVwZ3JhZGVUcmFucyk7XG4gICAgICAgIHZhciB2ZXJzVG9SdW4gPSB2ZXJzaW9ucy5maWx0ZXIoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHYuX2NmZy52ZXJzaW9uID49IG9sZFZlcnNpb247IH0pO1xuICAgICAgICBpZiAodmVyc1RvUnVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIERleGllUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmVyc1RvUnVuLmZvckVhY2goZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBvbGRTY2hlbWEgPSBnbG9iYWxTY2hlbWE7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1NjaGVtYSA9IHZlcnNpb24uX2NmZy5kYnNjaGVtYTtcbiAgICAgICAgICAgICAgICBhZGp1c3RUb0V4aXN0aW5nSW5kZXhOYW1lcyhkYiwgb2xkU2NoZW1hLCBpZGJVcGdyYWRlVHJhbnMpO1xuICAgICAgICAgICAgICAgIGFkanVzdFRvRXhpc3RpbmdJbmRleE5hbWVzKGRiLCBuZXdTY2hlbWEsIGlkYlVwZ3JhZGVUcmFucyk7XG4gICAgICAgICAgICAgICAgZ2xvYmFsU2NoZW1hID0gZGIuX2RiU2NoZW1hID0gbmV3U2NoZW1hO1xuICAgICAgICAgICAgICAgIHZhciBkaWZmID0gZ2V0U2NoZW1hRGlmZihvbGRTY2hlbWEsIG5ld1NjaGVtYSk7XG4gICAgICAgICAgICAgICAgZGlmZi5hZGQuZm9yRWFjaChmdW5jdGlvbiAodHVwbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlVGFibGUoaWRiVXBncmFkZVRyYW5zLCB0dXBsZVswXSwgdHVwbGVbMV0ucHJpbUtleSwgdHVwbGVbMV0uaW5kZXhlcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZGlmZi5jaGFuZ2UuZm9yRWFjaChmdW5jdGlvbiAoY2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UucmVjcmVhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLlVwZ3JhZGUoXCJOb3QgeWV0IHN1cHBvcnQgZm9yIGNoYW5naW5nIHByaW1hcnkga2V5XCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0b3JlXzEgPSBpZGJVcGdyYWRlVHJhbnMub2JqZWN0U3RvcmUoY2hhbmdlLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlLmFkZC5mb3JFYWNoKGZ1bmN0aW9uIChpZHgpIHsgcmV0dXJuIGFkZEluZGV4KHN0b3JlXzEsIGlkeCk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlLmNoYW5nZS5mb3JFYWNoKGZ1bmN0aW9uIChpZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yZV8xLmRlbGV0ZUluZGV4KGlkeC5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRJbmRleChzdG9yZV8xLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2UuZGVsLmZvckVhY2goZnVuY3Rpb24gKGlkeE5hbWUpIHsgcmV0dXJuIHN0b3JlXzEuZGVsZXRlSW5kZXgoaWR4TmFtZSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnRVcGdyYWRlID0gdmVyc2lvbi5fY2ZnLmNvbnRlbnRVcGdyYWRlO1xuICAgICAgICAgICAgICAgIGlmIChjb250ZW50VXBncmFkZSAmJiB2ZXJzaW9uLl9jZmcudmVyc2lvbiA+IG9sZFZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVNaWRkbGV3YXJlU3RhY2tzKGRiLCBpZGJVcGdyYWRlVHJhbnMpO1xuICAgICAgICAgICAgICAgICAgICB0cmFucy5fbWVtb2l6ZWRUYWJsZXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVwZ3JhZGVTY2hlbWFfMSA9IHNoYWxsb3dDbG9uZShuZXdTY2hlbWEpO1xuICAgICAgICAgICAgICAgICAgICBkaWZmLmRlbC5mb3JFYWNoKGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBncmFkZVNjaGVtYV8xW3RhYmxlXSA9IG9sZFNjaGVtYVt0YWJsZV07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVUYWJsZXNBcGkoZGIsIFtkYi5UcmFuc2FjdGlvbi5wcm90b3R5cGVdKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0QXBpT25QbGFjZShkYiwgW2RiLlRyYW5zYWN0aW9uLnByb3RvdHlwZV0sIGtleXModXBncmFkZVNjaGVtYV8xKSwgdXBncmFkZVNjaGVtYV8xKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnMuc2NoZW1hID0gdXBncmFkZVNjaGVtYV8xO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudFVwZ3JhZGVJc0FzeW5jXzEgPSBpc0FzeW5jRnVuY3Rpb24oY29udGVudFVwZ3JhZGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGVudFVwZ3JhZGVJc0FzeW5jXzEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY3JlbWVudEV4cGVjdGVkQXdhaXRzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVyblZhbHVlXzE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9taXNlRm9sbG93ZWQgPSBEZXhpZVByb21pc2UuZm9sbG93KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlXzEgPSBjb250ZW50VXBncmFkZSh0cmFucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWVfMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50VXBncmFkZUlzQXN5bmNfMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVjcmVtZW50b3IgPSBkZWNyZW1lbnRFeHBlY3RlZEF3YWl0cy5iaW5kKG51bGwsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZV8xLnRoZW4oZGVjcmVtZW50b3IsIGRlY3JlbWVudG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHJldHVyblZhbHVlXzEgJiYgdHlwZW9mIHJldHVyblZhbHVlXzEudGhlbiA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgICAgICAgICAgICAgICBEZXhpZVByb21pc2UucmVzb2x2ZShyZXR1cm5WYWx1ZV8xKSA6IHByb21pc2VGb2xsb3dlZC50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJldHVyblZhbHVlXzE7IH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZnVuY3Rpb24gKGlkYnRyYW5zKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1NjaGVtYSA9IHZlcnNpb24uX2NmZy5kYnNjaGVtYTtcbiAgICAgICAgICAgICAgICBkZWxldGVSZW1vdmVkVGFibGVzKG5ld1NjaGVtYSwgaWRidHJhbnMpO1xuICAgICAgICAgICAgICAgIHJlbW92ZVRhYmxlc0FwaShkYiwgW2RiLlRyYW5zYWN0aW9uLnByb3RvdHlwZV0pO1xuICAgICAgICAgICAgICAgIHNldEFwaU9uUGxhY2UoZGIsIFtkYi5UcmFuc2FjdGlvbi5wcm90b3R5cGVdLCBkYi5fc3RvcmVOYW1lcywgZGIuX2RiU2NoZW1hKTtcbiAgICAgICAgICAgICAgICB0cmFucy5zY2hlbWEgPSBkYi5fZGJTY2hlbWE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZnVuY3Rpb24gKGlkYnRyYW5zKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRiLmlkYmRiLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoJyRtZXRhJykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguY2VpbChkYi5pZGJkYi52ZXJzaW9uIC8gMTApID09PSB2ZXJzaW9uLl9jZmcudmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGIuaWRiZGIuZGVsZXRlT2JqZWN0U3RvcmUoJyRtZXRhJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgZGIuX2RiU2NoZW1hLiRtZXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGIuX3N0b3JlTmFtZXMgPSBkYi5fc3RvcmVOYW1lcy5maWx0ZXIoZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIG5hbWUgIT09ICckbWV0YSc7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRidHJhbnMub2JqZWN0U3RvcmUoJyRtZXRhJykucHV0KHZlcnNpb24uX2NmZy52ZXJzaW9uLCAndmVyc2lvbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBmdW5jdGlvbiBydW5RdWV1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBxdWV1ZS5sZW5ndGggPyBEZXhpZVByb21pc2UucmVzb2x2ZShxdWV1ZS5zaGlmdCgpKHRyYW5zLmlkYnRyYW5zKSkudGhlbihydW5RdWV1ZSkgOlxuICAgICAgICAgICAgICAgIERleGllUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJ1blF1ZXVlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjcmVhdGVNaXNzaW5nVGFibGVzKGdsb2JhbFNjaGVtYSwgaWRiVXBncmFkZVRyYW5zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFNjaGVtYURpZmYob2xkU2NoZW1hLCBuZXdTY2hlbWEpIHtcbiAgICAgICAgdmFyIGRpZmYgPSB7XG4gICAgICAgICAgICBkZWw6IFtdLFxuICAgICAgICAgICAgYWRkOiBbXSxcbiAgICAgICAgICAgIGNoYW5nZTogW11cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHRhYmxlO1xuICAgICAgICBmb3IgKHRhYmxlIGluIG9sZFNjaGVtYSkge1xuICAgICAgICAgICAgaWYgKCFuZXdTY2hlbWFbdGFibGVdKVxuICAgICAgICAgICAgICAgIGRpZmYuZGVsLnB1c2godGFibGUpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodGFibGUgaW4gbmV3U2NoZW1hKSB7XG4gICAgICAgICAgICB2YXIgb2xkRGVmID0gb2xkU2NoZW1hW3RhYmxlXSwgbmV3RGVmID0gbmV3U2NoZW1hW3RhYmxlXTtcbiAgICAgICAgICAgIGlmICghb2xkRGVmKSB7XG4gICAgICAgICAgICAgICAgZGlmZi5hZGQucHVzaChbdGFibGUsIG5ld0RlZl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoYW5nZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGFibGUsXG4gICAgICAgICAgICAgICAgICAgIGRlZjogbmV3RGVmLFxuICAgICAgICAgICAgICAgICAgICByZWNyZWF0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGRlbDogW10sXG4gICAgICAgICAgICAgICAgICAgIGFkZDogW10sXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogW11cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmICgoXG4gICAgICAgICAgICAgICAgJycgKyAob2xkRGVmLnByaW1LZXkua2V5UGF0aCB8fCAnJykpICE9PSAoJycgKyAobmV3RGVmLnByaW1LZXkua2V5UGF0aCB8fCAnJykpIHx8XG4gICAgICAgICAgICAgICAgICAgIChvbGREZWYucHJpbUtleS5hdXRvICE9PSBuZXdEZWYucHJpbUtleS5hdXRvKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2UucmVjcmVhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBkaWZmLmNoYW5nZS5wdXNoKGNoYW5nZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2xkSW5kZXhlcyA9IG9sZERlZi5pZHhCeU5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdJbmRleGVzID0gbmV3RGVmLmlkeEJ5TmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkeE5hbWUgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaWR4TmFtZSBpbiBvbGRJbmRleGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5ld0luZGV4ZXNbaWR4TmFtZV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlLmRlbC5wdXNoKGlkeE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaWR4TmFtZSBpbiBuZXdJbmRleGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2xkSWR4ID0gb2xkSW5kZXhlc1tpZHhOYW1lXSwgbmV3SWR4ID0gbmV3SW5kZXhlc1tpZHhOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb2xkSWR4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZS5hZGQucHVzaChuZXdJZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob2xkSWR4LnNyYyAhPT0gbmV3SWR4LnNyYylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2UuY2hhbmdlLnB1c2gobmV3SWR4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlLmRlbC5sZW5ndGggPiAwIHx8IGNoYW5nZS5hZGQubGVuZ3RoID4gMCB8fCBjaGFuZ2UuY2hhbmdlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZmYuY2hhbmdlLnB1c2goY2hhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlmZjtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlVGFibGUoaWRidHJhbnMsIHRhYmxlTmFtZSwgcHJpbUtleSwgaW5kZXhlcykge1xuICAgICAgICB2YXIgc3RvcmUgPSBpZGJ0cmFucy5kYi5jcmVhdGVPYmplY3RTdG9yZSh0YWJsZU5hbWUsIHByaW1LZXkua2V5UGF0aCA/XG4gICAgICAgICAgICB7IGtleVBhdGg6IHByaW1LZXkua2V5UGF0aCwgYXV0b0luY3JlbWVudDogcHJpbUtleS5hdXRvIH0gOlxuICAgICAgICAgICAgeyBhdXRvSW5jcmVtZW50OiBwcmltS2V5LmF1dG8gfSk7XG4gICAgICAgIGluZGV4ZXMuZm9yRWFjaChmdW5jdGlvbiAoaWR4KSB7IHJldHVybiBhZGRJbmRleChzdG9yZSwgaWR4KTsgfSk7XG4gICAgICAgIHJldHVybiBzdG9yZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlTWlzc2luZ1RhYmxlcyhuZXdTY2hlbWEsIGlkYnRyYW5zKSB7XG4gICAgICAgIGtleXMobmV3U2NoZW1hKS5mb3JFYWNoKGZ1bmN0aW9uICh0YWJsZU5hbWUpIHtcbiAgICAgICAgICAgIGlmICghaWRidHJhbnMuZGIub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucyh0YWJsZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlYnVnKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdEZXhpZTogQ3JlYXRpbmcgbWlzc2luZyB0YWJsZScsIHRhYmxlTmFtZSk7XG4gICAgICAgICAgICAgICAgY3JlYXRlVGFibGUoaWRidHJhbnMsIHRhYmxlTmFtZSwgbmV3U2NoZW1hW3RhYmxlTmFtZV0ucHJpbUtleSwgbmV3U2NoZW1hW3RhYmxlTmFtZV0uaW5kZXhlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkZWxldGVSZW1vdmVkVGFibGVzKG5ld1NjaGVtYSwgaWRidHJhbnMpIHtcbiAgICAgICAgW10uc2xpY2UuY2FsbChpZGJ0cmFucy5kYi5vYmplY3RTdG9yZU5hbWVzKS5mb3JFYWNoKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXdTY2hlbWFbc3RvcmVOYW1lXSA9PSBudWxsICYmIGlkYnRyYW5zLmRiLmRlbGV0ZU9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRJbmRleChzdG9yZSwgaWR4KSB7XG4gICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KGlkeC5uYW1lLCBpZHgua2V5UGF0aCwgeyB1bmlxdWU6IGlkeC51bmlxdWUsIG11bHRpRW50cnk6IGlkeC5tdWx0aSB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYnVpbGRHbG9iYWxTY2hlbWEoZGIsIGlkYmRiLCB0bXBUcmFucykge1xuICAgICAgICB2YXIgZ2xvYmFsU2NoZW1hID0ge307XG4gICAgICAgIHZhciBkYlN0b3JlTmFtZXMgPSBzbGljZShpZGJkYi5vYmplY3RTdG9yZU5hbWVzLCAwKTtcbiAgICAgICAgZGJTdG9yZU5hbWVzLmZvckVhY2goZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuICAgICAgICAgICAgdmFyIHN0b3JlID0gdG1wVHJhbnMub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcbiAgICAgICAgICAgIHZhciBrZXlQYXRoID0gc3RvcmUua2V5UGF0aDtcbiAgICAgICAgICAgIHZhciBwcmltS2V5ID0gY3JlYXRlSW5kZXhTcGVjKG5hbWVGcm9tS2V5UGF0aChrZXlQYXRoKSwga2V5UGF0aCB8fCBcIlwiLCB0cnVlLCBmYWxzZSwgISFzdG9yZS5hdXRvSW5jcmVtZW50LCBrZXlQYXRoICYmIHR5cGVvZiBrZXlQYXRoICE9PSBcInN0cmluZ1wiLCB0cnVlKTtcbiAgICAgICAgICAgIHZhciBpbmRleGVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHN0b3JlLmluZGV4TmFtZXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICB2YXIgaWRiaW5kZXggPSBzdG9yZS5pbmRleChzdG9yZS5pbmRleE5hbWVzW2pdKTtcbiAgICAgICAgICAgICAgICBrZXlQYXRoID0gaWRiaW5kZXgua2V5UGF0aDtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBjcmVhdGVJbmRleFNwZWMoaWRiaW5kZXgubmFtZSwga2V5UGF0aCwgISFpZGJpbmRleC51bmlxdWUsICEhaWRiaW5kZXgubXVsdGlFbnRyeSwgZmFsc2UsIGtleVBhdGggJiYgdHlwZW9mIGtleVBhdGggIT09IFwic3RyaW5nXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBpbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2xvYmFsU2NoZW1hW3N0b3JlTmFtZV0gPSBjcmVhdGVUYWJsZVNjaGVtYShzdG9yZU5hbWUsIHByaW1LZXksIGluZGV4ZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGdsb2JhbFNjaGVtYTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZEdsb2JhbFNjaGVtYShkYiwgaWRiZGIsIHRtcFRyYW5zKSB7XG4gICAgICAgIGRiLnZlcm5vID0gaWRiZGIudmVyc2lvbiAvIDEwO1xuICAgICAgICB2YXIgZ2xvYmFsU2NoZW1hID0gZGIuX2RiU2NoZW1hID0gYnVpbGRHbG9iYWxTY2hlbWEoZGIsIGlkYmRiLCB0bXBUcmFucyk7XG4gICAgICAgIGRiLl9zdG9yZU5hbWVzID0gc2xpY2UoaWRiZGIub2JqZWN0U3RvcmVOYW1lcywgMCk7XG4gICAgICAgIHNldEFwaU9uUGxhY2UoZGIsIFtkYi5fYWxsVGFibGVzXSwga2V5cyhnbG9iYWxTY2hlbWEpLCBnbG9iYWxTY2hlbWEpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB2ZXJpZnlJbnN0YWxsZWRTY2hlbWEoZGIsIHRtcFRyYW5zKSB7XG4gICAgICAgIHZhciBpbnN0YWxsZWRTY2hlbWEgPSBidWlsZEdsb2JhbFNjaGVtYShkYiwgZGIuaWRiZGIsIHRtcFRyYW5zKTtcbiAgICAgICAgdmFyIGRpZmYgPSBnZXRTY2hlbWFEaWZmKGluc3RhbGxlZFNjaGVtYSwgZGIuX2RiU2NoZW1hKTtcbiAgICAgICAgcmV0dXJuICEoZGlmZi5hZGQubGVuZ3RoIHx8IGRpZmYuY2hhbmdlLnNvbWUoZnVuY3Rpb24gKGNoKSB7IHJldHVybiBjaC5hZGQubGVuZ3RoIHx8IGNoLmNoYW5nZS5sZW5ndGg7IH0pKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRqdXN0VG9FeGlzdGluZ0luZGV4TmFtZXMoZGIsIHNjaGVtYSwgaWRidHJhbnMpIHtcbiAgICAgICAgdmFyIHN0b3JlTmFtZXMgPSBpZGJ0cmFucy5kYi5vYmplY3RTdG9yZU5hbWVzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0b3JlTmFtZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBzdG9yZU5hbWUgPSBzdG9yZU5hbWVzW2ldO1xuICAgICAgICAgICAgdmFyIHN0b3JlID0gaWRidHJhbnMub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcbiAgICAgICAgICAgIGRiLl9oYXNHZXRBbGwgPSAnZ2V0QWxsJyBpbiBzdG9yZTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc3RvcmUuaW5kZXhOYW1lcy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleE5hbWUgPSBzdG9yZS5pbmRleE5hbWVzW2pdO1xuICAgICAgICAgICAgICAgIHZhciBrZXlQYXRoID0gc3RvcmUuaW5kZXgoaW5kZXhOYW1lKS5rZXlQYXRoO1xuICAgICAgICAgICAgICAgIHZhciBkZXhpZU5hbWUgPSB0eXBlb2Yga2V5UGF0aCA9PT0gJ3N0cmluZycgPyBrZXlQYXRoIDogXCJbXCIgKyBzbGljZShrZXlQYXRoKS5qb2luKCcrJykgKyBcIl1cIjtcbiAgICAgICAgICAgICAgICBpZiAoc2NoZW1hW3N0b3JlTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4U3BlYyA9IHNjaGVtYVtzdG9yZU5hbWVdLmlkeEJ5TmFtZVtkZXhpZU5hbWVdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXhTcGVjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleFNwZWMubmFtZSA9IGluZGV4TmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzY2hlbWFbc3RvcmVOYW1lXS5pZHhCeU5hbWVbZGV4aWVOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYVtzdG9yZU5hbWVdLmlkeEJ5TmFtZVtpbmRleE5hbWVdID0gaW5kZXhTcGVjO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvU2FmYXJpLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmXG4gICAgICAgICAgICAhLyhDaHJvbWVcXC98RWRnZVxcLykvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiZcbiAgICAgICAgICAgIF9nbG9iYWwuV29ya2VyR2xvYmFsU2NvcGUgJiYgX2dsb2JhbCBpbnN0YW5jZW9mIF9nbG9iYWwuV29ya2VyR2xvYmFsU2NvcGUgJiZcbiAgICAgICAgICAgIFtdLmNvbmNhdChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9TYWZhcmlcXC8oXFxkKikvKSlbMV0gPCA2MDQpIHtcbiAgICAgICAgICAgIGRiLl9oYXNHZXRBbGwgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZUluZGV4U3ludGF4KHByaW1LZXlBbmRJbmRleGVzKSB7XG4gICAgICAgIHJldHVybiBwcmltS2V5QW5kSW5kZXhlcy5zcGxpdCgnLCcpLm1hcChmdW5jdGlvbiAoaW5kZXgsIGluZGV4TnVtKSB7XG4gICAgICAgICAgICBpbmRleCA9IGluZGV4LnRyaW0oKTtcbiAgICAgICAgICAgIHZhciBuYW1lID0gaW5kZXgucmVwbGFjZSgvKFsmKl18XFwrXFwrKS9nLCBcIlwiKTtcbiAgICAgICAgICAgIHZhciBrZXlQYXRoID0gL15cXFsvLnRlc3QobmFtZSkgPyBuYW1lLm1hdGNoKC9eXFxbKC4qKVxcXSQvKVsxXS5zcGxpdCgnKycpIDogbmFtZTtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVJbmRleFNwZWMobmFtZSwga2V5UGF0aCB8fCBudWxsLCAvXFwmLy50ZXN0KGluZGV4KSwgL1xcKi8udGVzdChpbmRleCksIC9cXCtcXCsvLnRlc3QoaW5kZXgpLCBpc0FycmF5KGtleVBhdGgpLCBpbmRleE51bSA9PT0gMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBWZXJzaW9uID0gIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFZlcnNpb24oKSB7XG4gICAgICAgIH1cbiAgICAgICAgVmVyc2lvbi5wcm90b3R5cGUuX3BhcnNlU3RvcmVzU3BlYyA9IGZ1bmN0aW9uIChzdG9yZXMsIG91dFNjaGVtYSkge1xuICAgICAgICAgICAga2V5cyhzdG9yZXMpLmZvckVhY2goZnVuY3Rpb24gKHRhYmxlTmFtZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdG9yZXNbdGFibGVOYW1lXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXhlcyA9IHBhcnNlSW5kZXhTeW50YXgoc3RvcmVzW3RhYmxlTmFtZV0pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJpbUtleSA9IGluZGV4ZXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcHJpbUtleS51bmlxdWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJpbUtleS5tdWx0aSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLlNjaGVtYShcIlByaW1hcnkga2V5IGNhbm5vdCBiZSBtdWx0aS12YWx1ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ZXMuZm9yRWFjaChmdW5jdGlvbiAoaWR4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWR4LmF1dG8pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuU2NoZW1hKFwiT25seSBwcmltYXJ5IGtleSBjYW4gYmUgbWFya2VkIGFzIGF1dG9JbmNyZW1lbnQgKCsrKVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaWR4LmtleVBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuU2NoZW1hKFwiSW5kZXggbXVzdCBoYXZlIGEgbmFtZSBhbmQgY2Fubm90IGJlIGFuIGVtcHR5IHN0cmluZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG91dFNjaGVtYVt0YWJsZU5hbWVdID0gY3JlYXRlVGFibGVTY2hlbWEodGFibGVOYW1lLCBwcmltS2V5LCBpbmRleGVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgVmVyc2lvbi5wcm90b3R5cGUuc3RvcmVzID0gZnVuY3Rpb24gKHN0b3Jlcykge1xuICAgICAgICAgICAgdmFyIGRiID0gdGhpcy5kYjtcbiAgICAgICAgICAgIHRoaXMuX2NmZy5zdG9yZXNTb3VyY2UgPSB0aGlzLl9jZmcuc3RvcmVzU291cmNlID9cbiAgICAgICAgICAgICAgICBleHRlbmQodGhpcy5fY2ZnLnN0b3Jlc1NvdXJjZSwgc3RvcmVzKSA6XG4gICAgICAgICAgICAgICAgc3RvcmVzO1xuICAgICAgICAgICAgdmFyIHZlcnNpb25zID0gZGIuX3ZlcnNpb25zO1xuICAgICAgICAgICAgdmFyIHN0b3Jlc1NwZWMgPSB7fTtcbiAgICAgICAgICAgIHZhciBkYnNjaGVtYSA9IHt9O1xuICAgICAgICAgICAgdmVyc2lvbnMuZm9yRWFjaChmdW5jdGlvbiAodmVyc2lvbikge1xuICAgICAgICAgICAgICAgIGV4dGVuZChzdG9yZXNTcGVjLCB2ZXJzaW9uLl9jZmcuc3RvcmVzU291cmNlKTtcbiAgICAgICAgICAgICAgICBkYnNjaGVtYSA9ICh2ZXJzaW9uLl9jZmcuZGJzY2hlbWEgPSB7fSk7XG4gICAgICAgICAgICAgICAgdmVyc2lvbi5fcGFyc2VTdG9yZXNTcGVjKHN0b3Jlc1NwZWMsIGRic2NoZW1hKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGIuX2RiU2NoZW1hID0gZGJzY2hlbWE7XG4gICAgICAgICAgICByZW1vdmVUYWJsZXNBcGkoZGIsIFtkYi5fYWxsVGFibGVzLCBkYiwgZGIuVHJhbnNhY3Rpb24ucHJvdG90eXBlXSk7XG4gICAgICAgICAgICBzZXRBcGlPblBsYWNlKGRiLCBbZGIuX2FsbFRhYmxlcywgZGIsIGRiLlRyYW5zYWN0aW9uLnByb3RvdHlwZSwgdGhpcy5fY2ZnLnRhYmxlc10sIGtleXMoZGJzY2hlbWEpLCBkYnNjaGVtYSk7XG4gICAgICAgICAgICBkYi5fc3RvcmVOYW1lcyA9IGtleXMoZGJzY2hlbWEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFZlcnNpb24ucHJvdG90eXBlLnVwZ3JhZGUgPSBmdW5jdGlvbiAodXBncmFkZUZ1bmN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9jZmcuY29udGVudFVwZ3JhZGUgPSBwcm9taXNhYmxlQ2hhaW4odGhpcy5fY2ZnLmNvbnRlbnRVcGdyYWRlIHx8IG5vcCwgdXBncmFkZUZ1bmN0aW9uKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gVmVyc2lvbjtcbiAgICB9KCkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlVmVyc2lvbkNvbnN0cnVjdG9yKGRiKSB7XG4gICAgICAgIHJldHVybiBtYWtlQ2xhc3NDb25zdHJ1Y3RvcihWZXJzaW9uLnByb3RvdHlwZSwgZnVuY3Rpb24gVmVyc2lvbih2ZXJzaW9uTnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRiID0gZGI7XG4gICAgICAgICAgICB0aGlzLl9jZmcgPSB7XG4gICAgICAgICAgICAgICAgdmVyc2lvbjogdmVyc2lvbk51bWJlcixcbiAgICAgICAgICAgICAgICBzdG9yZXNTb3VyY2U6IG51bGwsXG4gICAgICAgICAgICAgICAgZGJzY2hlbWE6IHt9LFxuICAgICAgICAgICAgICAgIHRhYmxlczoge30sXG4gICAgICAgICAgICAgICAgY29udGVudFVwZ3JhZGU6IG51bGxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERiTmFtZXNUYWJsZShpbmRleGVkREIsIElEQktleVJhbmdlKSB7XG4gICAgICAgIHZhciBkYk5hbWVzREIgPSBpbmRleGVkREJbXCJfZGJOYW1lc0RCXCJdO1xuICAgICAgICBpZiAoIWRiTmFtZXNEQikge1xuICAgICAgICAgICAgZGJOYW1lc0RCID0gaW5kZXhlZERCW1wiX2RiTmFtZXNEQlwiXSA9IG5ldyBEZXhpZSQxKERCTkFNRVNfREIsIHtcbiAgICAgICAgICAgICAgICBhZGRvbnM6IFtdLFxuICAgICAgICAgICAgICAgIGluZGV4ZWREQjogaW5kZXhlZERCLFxuICAgICAgICAgICAgICAgIElEQktleVJhbmdlOiBJREJLZXlSYW5nZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGJOYW1lc0RCLnZlcnNpb24oMSkuc3RvcmVzKHsgZGJuYW1lczogXCJuYW1lXCIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRiTmFtZXNEQi50YWJsZShcImRibmFtZXNcIik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhhc0RhdGFiYXNlc05hdGl2ZShpbmRleGVkREIpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4ZWREQiAmJiB0eXBlb2YgaW5kZXhlZERCLmRhdGFiYXNlcyA9PT0gXCJmdW5jdGlvblwiO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXREYXRhYmFzZU5hbWVzKF9hKSB7XG4gICAgICAgIHZhciBpbmRleGVkREIgPSBfYS5pbmRleGVkREIsIElEQktleVJhbmdlID0gX2EuSURCS2V5UmFuZ2U7XG4gICAgICAgIHJldHVybiBoYXNEYXRhYmFzZXNOYXRpdmUoaW5kZXhlZERCKVxuICAgICAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoaW5kZXhlZERCLmRhdGFiYXNlcygpKS50aGVuKGZ1bmN0aW9uIChpbmZvcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmZvc1xuICAgICAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChpbmZvKSB7IHJldHVybiBpbmZvLm5hbWU7IH0pXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIG5hbWUgIT09IERCTkFNRVNfREI7IH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogZ2V0RGJOYW1lc1RhYmxlKGluZGV4ZWREQiwgSURCS2V5UmFuZ2UpLnRvQ29sbGVjdGlvbigpLnByaW1hcnlLZXlzKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIF9vbkRhdGFiYXNlQ3JlYXRlZChfYSwgbmFtZSkge1xuICAgICAgICB2YXIgaW5kZXhlZERCID0gX2EuaW5kZXhlZERCLCBJREJLZXlSYW5nZSA9IF9hLklEQktleVJhbmdlO1xuICAgICAgICAhaGFzRGF0YWJhc2VzTmF0aXZlKGluZGV4ZWREQikgJiZcbiAgICAgICAgICAgIG5hbWUgIT09IERCTkFNRVNfREIgJiZcbiAgICAgICAgICAgIGdldERiTmFtZXNUYWJsZShpbmRleGVkREIsIElEQktleVJhbmdlKS5wdXQoeyBuYW1lOiBuYW1lIH0pLmNhdGNoKG5vcCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIF9vbkRhdGFiYXNlRGVsZXRlZChfYSwgbmFtZSkge1xuICAgICAgICB2YXIgaW5kZXhlZERCID0gX2EuaW5kZXhlZERCLCBJREJLZXlSYW5nZSA9IF9hLklEQktleVJhbmdlO1xuICAgICAgICAhaGFzRGF0YWJhc2VzTmF0aXZlKGluZGV4ZWREQikgJiZcbiAgICAgICAgICAgIG5hbWUgIT09IERCTkFNRVNfREIgJiZcbiAgICAgICAgICAgIGdldERiTmFtZXNUYWJsZShpbmRleGVkREIsIElEQktleVJhbmdlKS5kZWxldGUobmFtZSkuY2F0Y2gobm9wKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2aXAoZm4pIHtcbiAgICAgICAgcmV0dXJuIG5ld1Njb3BlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFBTRC5sZXRUaHJvdWdoID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBmbigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpZGJSZWFkeSgpIHtcbiAgICAgICAgdmFyIGlzU2FmYXJpID0gIW5hdmlnYXRvci51c2VyQWdlbnREYXRhICYmXG4gICAgICAgICAgICAvU2FmYXJpXFwvLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmXG4gICAgICAgICAgICAhL0Nocm9tKGV8aXVtKVxcLy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgICAgaWYgKCFpc1NhZmFyaSB8fCAhaW5kZXhlZERCLmRhdGFiYXNlcylcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgdmFyIGludGVydmFsSWQ7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgdmFyIHRyeUlkYiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGluZGV4ZWREQi5kYXRhYmFzZXMoKS5maW5hbGx5KHJlc29sdmUpOyB9O1xuICAgICAgICAgICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHRyeUlkYiwgMTAwKTtcbiAgICAgICAgICAgIHRyeUlkYigpO1xuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7IH0pO1xuICAgIH1cblxuICAgIHZhciBfYTtcbiAgICBmdW5jdGlvbiBpc0VtcHR5UmFuZ2Uobm9kZSkge1xuICAgICAgICByZXR1cm4gIShcImZyb21cIiBpbiBub2RlKTtcbiAgICB9XG4gICAgdmFyIFJhbmdlU2V0ID0gZnVuY3Rpb24gKGZyb21PclRyZWUsIHRvKSB7XG4gICAgICAgIGlmICh0aGlzKSB7XG4gICAgICAgICAgICBleHRlbmQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA/IHsgZDogMSwgZnJvbTogZnJvbU9yVHJlZSwgdG86IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gdG8gOiBmcm9tT3JUcmVlIH0gOiB7IGQ6IDAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcnYgPSBuZXcgUmFuZ2VTZXQoKTtcbiAgICAgICAgICAgIGlmIChmcm9tT3JUcmVlICYmIChcImRcIiBpbiBmcm9tT3JUcmVlKSkge1xuICAgICAgICAgICAgICAgIGV4dGVuZChydiwgZnJvbU9yVHJlZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcnY7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHByb3BzKFJhbmdlU2V0LnByb3RvdHlwZSwgKF9hID0ge1xuICAgICAgICAgICAgYWRkOiBmdW5jdGlvbiAocmFuZ2VTZXQpIHtcbiAgICAgICAgICAgICAgICBtZXJnZVJhbmdlcyh0aGlzLCByYW5nZVNldCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWRkS2V5OiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgYWRkUmFuZ2UodGhpcywga2V5LCBrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkZEtleXM6IGZ1bmN0aW9uIChrZXlzKSB7XG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgICAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gYWRkUmFuZ2UoX3RoaXMsIGtleSwga2V5KTsgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzS2V5OiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBnZXRSYW5nZVNldEl0ZXJhdG9yKHRoaXMpLm5leHQoa2V5KS52YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZSAmJiBjbXAobm9kZS5mcm9tLCBrZXkpIDw9IDAgJiYgY21wKG5vZGUudG8sIGtleSkgPj0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgX2FbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldFJhbmdlU2V0SXRlcmF0b3IodGhpcyk7XG4gICAgICAgIH0sXG4gICAgICAgIF9hKSk7XG4gICAgZnVuY3Rpb24gYWRkUmFuZ2UodGFyZ2V0LCBmcm9tLCB0bykge1xuICAgICAgICB2YXIgZGlmZiA9IGNtcChmcm9tLCB0byk7XG4gICAgICAgIGlmIChpc05hTihkaWZmKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKGRpZmYgPiAwKVxuICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcigpO1xuICAgICAgICBpZiAoaXNFbXB0eVJhbmdlKHRhcmdldCkpXG4gICAgICAgICAgICByZXR1cm4gZXh0ZW5kKHRhcmdldCwgeyBmcm9tOiBmcm9tLCB0bzogdG8sIGQ6IDEgfSk7XG4gICAgICAgIHZhciBsZWZ0ID0gdGFyZ2V0Lmw7XG4gICAgICAgIHZhciByaWdodCA9IHRhcmdldC5yO1xuICAgICAgICBpZiAoY21wKHRvLCB0YXJnZXQuZnJvbSkgPCAwKSB7XG4gICAgICAgICAgICBsZWZ0XG4gICAgICAgICAgICAgICAgPyBhZGRSYW5nZShsZWZ0LCBmcm9tLCB0bylcbiAgICAgICAgICAgICAgICA6ICh0YXJnZXQubCA9IHsgZnJvbTogZnJvbSwgdG86IHRvLCBkOiAxLCBsOiBudWxsLCByOiBudWxsIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlYmFsYW5jZSh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjbXAoZnJvbSwgdGFyZ2V0LnRvKSA+IDApIHtcbiAgICAgICAgICAgIHJpZ2h0XG4gICAgICAgICAgICAgICAgPyBhZGRSYW5nZShyaWdodCwgZnJvbSwgdG8pXG4gICAgICAgICAgICAgICAgOiAodGFyZ2V0LnIgPSB7IGZyb206IGZyb20sIHRvOiB0bywgZDogMSwgbDogbnVsbCwgcjogbnVsbCB9KTtcbiAgICAgICAgICAgIHJldHVybiByZWJhbGFuY2UodGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY21wKGZyb20sIHRhcmdldC5mcm9tKSA8IDApIHtcbiAgICAgICAgICAgIHRhcmdldC5mcm9tID0gZnJvbTtcbiAgICAgICAgICAgIHRhcmdldC5sID0gbnVsbDtcbiAgICAgICAgICAgIHRhcmdldC5kID0gcmlnaHQgPyByaWdodC5kICsgMSA6IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNtcCh0bywgdGFyZ2V0LnRvKSA+IDApIHtcbiAgICAgICAgICAgIHRhcmdldC50byA9IHRvO1xuICAgICAgICAgICAgdGFyZ2V0LnIgPSBudWxsO1xuICAgICAgICAgICAgdGFyZ2V0LmQgPSB0YXJnZXQubCA/IHRhcmdldC5sLmQgKyAxIDogMTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmlnaHRXYXNDdXRPZmYgPSAhdGFyZ2V0LnI7XG4gICAgICAgIGlmIChsZWZ0ICYmICF0YXJnZXQubCkge1xuICAgICAgICAgICAgbWVyZ2VSYW5nZXModGFyZ2V0LCBsZWZ0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmlnaHQgJiYgcmlnaHRXYXNDdXRPZmYpIHtcbiAgICAgICAgICAgIG1lcmdlUmFuZ2VzKHRhcmdldCwgcmlnaHQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1lcmdlUmFuZ2VzKHRhcmdldCwgbmV3U2V0KSB7XG4gICAgICAgIGZ1bmN0aW9uIF9hZGRSYW5nZVNldCh0YXJnZXQsIF9hKSB7XG4gICAgICAgICAgICB2YXIgZnJvbSA9IF9hLmZyb20sIHRvID0gX2EudG8sIGwgPSBfYS5sLCByID0gX2EucjtcbiAgICAgICAgICAgIGFkZFJhbmdlKHRhcmdldCwgZnJvbSwgdG8pO1xuICAgICAgICAgICAgaWYgKGwpXG4gICAgICAgICAgICAgICAgX2FkZFJhbmdlU2V0KHRhcmdldCwgbCk7XG4gICAgICAgICAgICBpZiAocilcbiAgICAgICAgICAgICAgICBfYWRkUmFuZ2VTZXQodGFyZ2V0LCByKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzRW1wdHlSYW5nZShuZXdTZXQpKVxuICAgICAgICAgICAgX2FkZFJhbmdlU2V0KHRhcmdldCwgbmV3U2V0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmFuZ2VzT3ZlcmxhcChyYW5nZVNldDEsIHJhbmdlU2V0Mikge1xuICAgICAgICB2YXIgaTEgPSBnZXRSYW5nZVNldEl0ZXJhdG9yKHJhbmdlU2V0Mik7XG4gICAgICAgIHZhciBuZXh0UmVzdWx0MSA9IGkxLm5leHQoKTtcbiAgICAgICAgaWYgKG5leHRSZXN1bHQxLmRvbmUpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBhID0gbmV4dFJlc3VsdDEudmFsdWU7XG4gICAgICAgIHZhciBpMiA9IGdldFJhbmdlU2V0SXRlcmF0b3IocmFuZ2VTZXQxKTtcbiAgICAgICAgdmFyIG5leHRSZXN1bHQyID0gaTIubmV4dChhLmZyb20pO1xuICAgICAgICB2YXIgYiA9IG5leHRSZXN1bHQyLnZhbHVlO1xuICAgICAgICB3aGlsZSAoIW5leHRSZXN1bHQxLmRvbmUgJiYgIW5leHRSZXN1bHQyLmRvbmUpIHtcbiAgICAgICAgICAgIGlmIChjbXAoYi5mcm9tLCBhLnRvKSA8PSAwICYmIGNtcChiLnRvLCBhLmZyb20pID49IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBjbXAoYS5mcm9tLCBiLmZyb20pIDwgMFxuICAgICAgICAgICAgICAgID8gKGEgPSAobmV4dFJlc3VsdDEgPSBpMS5uZXh0KGIuZnJvbSkpLnZhbHVlKVxuICAgICAgICAgICAgICAgIDogKGIgPSAobmV4dFJlc3VsdDIgPSBpMi5uZXh0KGEuZnJvbSkpLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFJhbmdlU2V0SXRlcmF0b3Iobm9kZSkge1xuICAgICAgICB2YXIgc3RhdGUgPSBpc0VtcHR5UmFuZ2Uobm9kZSkgPyBudWxsIDogeyBzOiAwLCBuOiBub2RlIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleVByb3ZpZGVkID0gYXJndW1lbnRzLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnMgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXlQcm92aWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoc3RhdGUubi5sICYmIGNtcChrZXksIHN0YXRlLm4uZnJvbSkgPCAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSB7IHVwOiBzdGF0ZSwgbjogc3RhdGUubi5sLCBzOiAxIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoc3RhdGUubi5sKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSB7IHVwOiBzdGF0ZSwgbjogc3RhdGUubi5sLCBzOiAxIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnMgPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgha2V5UHJvdmlkZWQgfHwgY21wKGtleSwgc3RhdGUubi50bykgPD0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHN0YXRlLm4sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLm4ucikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5zID0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSB7IHVwOiBzdGF0ZSwgbjogc3RhdGUubi5yLCBzOiAwIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IHN0YXRlLnVwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYmFsYW5jZSh0YXJnZXQpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdmFyIGRpZmYgPSAoKChfYSA9IHRhcmdldC5yKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZCkgfHwgMCkgLSAoKChfYiA9IHRhcmdldC5sKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZCkgfHwgMCk7XG4gICAgICAgIHZhciByID0gZGlmZiA+IDEgPyBcInJcIiA6IGRpZmYgPCAtMSA/IFwibFwiIDogXCJcIjtcbiAgICAgICAgaWYgKHIpIHtcbiAgICAgICAgICAgIHZhciBsID0gciA9PT0gXCJyXCIgPyBcImxcIiA6IFwiclwiO1xuICAgICAgICAgICAgdmFyIHJvb3RDbG9uZSA9IF9fYXNzaWduKHt9LCB0YXJnZXQpO1xuICAgICAgICAgICAgdmFyIG9sZFJvb3RSaWdodCA9IHRhcmdldFtyXTtcbiAgICAgICAgICAgIHRhcmdldC5mcm9tID0gb2xkUm9vdFJpZ2h0LmZyb207XG4gICAgICAgICAgICB0YXJnZXQudG8gPSBvbGRSb290UmlnaHQudG87XG4gICAgICAgICAgICB0YXJnZXRbcl0gPSBvbGRSb290UmlnaHRbcl07XG4gICAgICAgICAgICByb290Q2xvbmVbcl0gPSBvbGRSb290UmlnaHRbbF07XG4gICAgICAgICAgICB0YXJnZXRbbF0gPSByb290Q2xvbmU7XG4gICAgICAgICAgICByb290Q2xvbmUuZCA9IGNvbXB1dGVEZXB0aChyb290Q2xvbmUpO1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldC5kID0gY29tcHV0ZURlcHRoKHRhcmdldCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbXB1dGVEZXB0aChfYSkge1xuICAgICAgICB2YXIgciA9IF9hLnIsIGwgPSBfYS5sO1xuICAgICAgICByZXR1cm4gKHIgPyAobCA/IE1hdGgubWF4KHIuZCwgbC5kKSA6IHIuZCkgOiBsID8gbC5kIDogMCkgKyAxO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZE9ic2VydmFiaWxpdHlTZXQodGFyZ2V0LCBuZXdTZXQpIHtcbiAgICAgICAga2V5cyhuZXdTZXQpLmZvckVhY2goZnVuY3Rpb24gKHBhcnQpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXRbcGFydF0pXG4gICAgICAgICAgICAgICAgbWVyZ2VSYW5nZXModGFyZ2V0W3BhcnRdLCBuZXdTZXRbcGFydF0pO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRhcmdldFtwYXJ0XSA9IGNsb25lU2ltcGxlT2JqZWN0VHJlZShuZXdTZXRbcGFydF0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvYnNTZXRzT3ZlcmxhcChvczEsIG9zMikge1xuICAgICAgICByZXR1cm4gb3MxLmFsbCB8fCBvczIuYWxsIHx8IE9iamVjdC5rZXlzKG9zMSkuc29tZShmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBvczJba2V5XSAmJiByYW5nZXNPdmVybGFwKG9zMltrZXldLCBvczFba2V5XSk7IH0pO1xuICAgIH1cblxuICAgIHZhciBjYWNoZSA9IHt9O1xuXG4gICAgdmFyIHVuc2lnbmFsZWRQYXJ0cyA9IHt9O1xuICAgIHZhciBpc1Rhc2tFbnF1ZXVlZCA9IGZhbHNlO1xuICAgIGZ1bmN0aW9uIHNpZ25hbFN1YnNjcmliZXJzTGF6aWx5KHBhcnQsIG9wdGltaXN0aWMpIHtcbiAgICAgICAgZXh0ZW5kT2JzZXJ2YWJpbGl0eVNldCh1bnNpZ25hbGVkUGFydHMsIHBhcnQpO1xuICAgICAgICBpZiAoIWlzVGFza0VucXVldWVkKSB7XG4gICAgICAgICAgICBpc1Rhc2tFbnF1ZXVlZCA9IHRydWU7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpc1Rhc2tFbnF1ZXVlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IHVuc2lnbmFsZWRQYXJ0cztcbiAgICAgICAgICAgICAgICB1bnNpZ25hbGVkUGFydHMgPSB7fTtcbiAgICAgICAgICAgICAgICBzaWduYWxTdWJzY3JpYmVyc05vdyhwYXJ0cywgZmFsc2UpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc2lnbmFsU3Vic2NyaWJlcnNOb3codXBkYXRlZFBhcnRzLCBkZWxldGVBZmZlY3RlZENhY2hlRW50cmllcykge1xuICAgICAgICBpZiAoZGVsZXRlQWZmZWN0ZWRDYWNoZUVudHJpZXMgPT09IHZvaWQgMCkgeyBkZWxldGVBZmZlY3RlZENhY2hlRW50cmllcyA9IGZhbHNlOyB9XG4gICAgICAgIHZhciBxdWVyaWVzVG9TaWduYWwgPSBuZXcgU2V0KCk7XG4gICAgICAgIGlmICh1cGRhdGVkUGFydHMuYWxsKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gT2JqZWN0LnZhbHVlcyhjYWNoZSk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRibENhY2hlID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgIGNvbGxlY3RUYWJsZVN1YnNjcmliZXJzKHRibENhY2hlLCB1cGRhdGVkUGFydHMsIHF1ZXJpZXNUb1NpZ25hbCwgZGVsZXRlQWZmZWN0ZWRDYWNoZUVudHJpZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHVwZGF0ZWRQYXJ0cykge1xuICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IC9eaWRiXFw6XFwvXFwvKC4qKVxcLyguKilcXC8vLmV4ZWMoa2V5KTtcbiAgICAgICAgICAgICAgICBpZiAocGFydHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRiTmFtZSA9IHBhcnRzWzFdLCB0YWJsZU5hbWUgPSBwYXJ0c1syXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRibENhY2hlID0gY2FjaGVbXCJpZGI6Ly9cIi5jb25jYXQoZGJOYW1lLCBcIi9cIikuY29uY2F0KHRhYmxlTmFtZSldO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGJsQ2FjaGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0VGFibGVTdWJzY3JpYmVycyh0YmxDYWNoZSwgdXBkYXRlZFBhcnRzLCBxdWVyaWVzVG9TaWduYWwsIGRlbGV0ZUFmZmVjdGVkQ2FjaGVFbnRyaWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVlcmllc1RvU2lnbmFsLmZvckVhY2goZnVuY3Rpb24gKHJlcXVlcnkpIHsgcmV0dXJuIHJlcXVlcnkoKTsgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbGxlY3RUYWJsZVN1YnNjcmliZXJzKHRibENhY2hlLCB1cGRhdGVkUGFydHMsIG91dFF1ZXJpZXNUb1NpZ25hbCwgZGVsZXRlQWZmZWN0ZWRDYWNoZUVudHJpZXMpIHtcbiAgICAgICAgdmFyIHVwZGF0ZWRFbnRyeUxpc3RzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBPYmplY3QuZW50cmllcyh0YmxDYWNoZS5xdWVyaWVzLnF1ZXJ5KTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBfYiA9IF9hW19pXSwgaW5kZXhOYW1lID0gX2JbMF0sIGVudHJpZXMgPSBfYlsxXTtcbiAgICAgICAgICAgIHZhciBmaWx0ZXJlZEVudHJpZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9jID0gMCwgZW50cmllc18xID0gZW50cmllczsgX2MgPCBlbnRyaWVzXzEubGVuZ3RoOyBfYysrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gZW50cmllc18xW19jXTtcbiAgICAgICAgICAgICAgICBpZiAob2JzU2V0c092ZXJsYXAodXBkYXRlZFBhcnRzLCBlbnRyeS5vYnNTZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5LnN1YnNjcmliZXJzLmZvckVhY2goZnVuY3Rpb24gKHJlcXVlcnkpIHsgcmV0dXJuIG91dFF1ZXJpZXNUb1NpZ25hbC5hZGQocmVxdWVyeSk7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChkZWxldGVBZmZlY3RlZENhY2hlRW50cmllcykge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEVudHJpZXMucHVzaChlbnRyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlbGV0ZUFmZmVjdGVkQ2FjaGVFbnRyaWVzKVxuICAgICAgICAgICAgICAgIHVwZGF0ZWRFbnRyeUxpc3RzLnB1c2goW2luZGV4TmFtZSwgZmlsdGVyZWRFbnRyaWVzXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlbGV0ZUFmZmVjdGVkQ2FjaGVFbnRyaWVzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfZCA9IDAsIHVwZGF0ZWRFbnRyeUxpc3RzXzEgPSB1cGRhdGVkRW50cnlMaXN0czsgX2QgPCB1cGRhdGVkRW50cnlMaXN0c18xLmxlbmd0aDsgX2QrKykge1xuICAgICAgICAgICAgICAgIHZhciBfZSA9IHVwZGF0ZWRFbnRyeUxpc3RzXzFbX2RdLCBpbmRleE5hbWUgPSBfZVswXSwgZmlsdGVyZWRFbnRyaWVzID0gX2VbMV07XG4gICAgICAgICAgICAgICAgdGJsQ2FjaGUucXVlcmllcy5xdWVyeVtpbmRleE5hbWVdID0gZmlsdGVyZWRFbnRyaWVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGV4aWVPcGVuKGRiKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IGRiLl9zdGF0ZTtcbiAgICAgICAgdmFyIGluZGV4ZWREQiA9IGRiLl9kZXBzLmluZGV4ZWREQjtcbiAgICAgICAgaWYgKHN0YXRlLmlzQmVpbmdPcGVuZWQgfHwgZGIuaWRiZGIpXG4gICAgICAgICAgICByZXR1cm4gc3RhdGUuZGJSZWFkeVByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBzdGF0ZS5kYk9wZW5FcnJvciA/XG4gICAgICAgICAgICAgICAgcmVqZWN0aW9uKHN0YXRlLmRiT3BlbkVycm9yKSA6XG4gICAgICAgICAgICAgICAgZGI7IH0pO1xuICAgICAgICBzdGF0ZS5pc0JlaW5nT3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgc3RhdGUuZGJPcGVuRXJyb3IgPSBudWxsO1xuICAgICAgICBzdGF0ZS5vcGVuQ29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgdmFyIG9wZW5DYW5jZWxsZXIgPSBzdGF0ZS5vcGVuQ2FuY2VsbGVyO1xuICAgICAgICB2YXIgbmF0aXZlVmVyVG9PcGVuID0gTWF0aC5yb3VuZChkYi52ZXJubyAqIDEwKTtcbiAgICAgICAgdmFyIHNjaGVtYVBhdGNoTW9kZSA9IGZhbHNlO1xuICAgICAgICBmdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGVkKCkge1xuICAgICAgICAgICAgaWYgKHN0YXRlLm9wZW5DYW5jZWxsZXIgIT09IG9wZW5DYW5jZWxsZXIpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuRGF0YWJhc2VDbG9zZWQoJ2RiLm9wZW4oKSB3YXMgY2FuY2VsbGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc29sdmVEYlJlYWR5ID0gc3RhdGUuZGJSZWFkeVJlc29sdmUsXG4gICAgICAgIHVwZ3JhZGVUcmFuc2FjdGlvbiA9IG51bGwsIHdhc0NyZWF0ZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIHRyeU9wZW5EQiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBEZXhpZVByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdGhyb3dJZkNhbmNlbGxlZCgpO1xuICAgICAgICAgICAgaWYgKCFpbmRleGVkREIpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuTWlzc2luZ0FQSSgpO1xuICAgICAgICAgICAgdmFyIGRiTmFtZSA9IGRiLm5hbWU7XG4gICAgICAgICAgICB2YXIgcmVxID0gc3RhdGUuYXV0b1NjaGVtYSB8fCAhbmF0aXZlVmVyVG9PcGVuID9cbiAgICAgICAgICAgICAgICBpbmRleGVkREIub3BlbihkYk5hbWUpIDpcbiAgICAgICAgICAgICAgICBpbmRleGVkREIub3BlbihkYk5hbWUsIG5hdGl2ZVZlclRvT3Blbik7XG4gICAgICAgICAgICBpZiAoIXJlcSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5NaXNzaW5nQVBJKCk7XG4gICAgICAgICAgICByZXEub25lcnJvciA9IGV2ZW50UmVqZWN0SGFuZGxlcihyZWplY3QpO1xuICAgICAgICAgICAgcmVxLm9uYmxvY2tlZCA9IHdyYXAoZGIuX2ZpcmVPbkJsb2NrZWQpO1xuICAgICAgICAgICAgcmVxLm9udXBncmFkZW5lZWRlZCA9IHdyYXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB1cGdyYWRlVHJhbnNhY3Rpb24gPSByZXEudHJhbnNhY3Rpb247XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLmF1dG9TY2hlbWEgJiYgIWRiLl9vcHRpb25zLmFsbG93RW1wdHlEQikge1xuICAgICAgICAgICAgICAgICAgICByZXEub25lcnJvciA9IHByZXZlbnREZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICB1cGdyYWRlVHJhbnNhY3Rpb24uYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVxLnJlc3VsdC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVscmVxID0gaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKGRiTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbHJlcS5vbnN1Y2Nlc3MgPSBkZWxyZXEub25lcnJvciA9IHdyYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBleGNlcHRpb25zLk5vU3VjaERhdGFiYXNlKFwiRGF0YWJhc2UgXCIuY29uY2F0KGRiTmFtZSwgXCIgZG9lc250IGV4aXN0XCIpKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdXBncmFkZVRyYW5zYWN0aW9uLm9uZXJyb3IgPSBldmVudFJlamVjdEhhbmRsZXIocmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9sZFZlciA9IGUub2xkVmVyc2lvbiA+IE1hdGgucG93KDIsIDYyKSA/IDAgOiBlLm9sZFZlcnNpb247XG4gICAgICAgICAgICAgICAgICAgIHdhc0NyZWF0ZWQgPSBvbGRWZXIgPCAxO1xuICAgICAgICAgICAgICAgICAgICBkYi5pZGJkYiA9IHJlcS5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY2hlbWFQYXRjaE1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoQ3VycmVudFZlcnNpb24oZGIsIHVwZ3JhZGVUcmFuc2FjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcnVuVXBncmFkZXJzKGRiLCBvbGRWZXIgLyAxMCwgdXBncmFkZVRyYW5zYWN0aW9uLCByZWplY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHJlamVjdCk7XG4gICAgICAgICAgICByZXEub25zdWNjZXNzID0gd3JhcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdXBncmFkZVRyYW5zYWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgaWRiZGIgPSBkYi5pZGJkYiA9IHJlcS5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdFN0b3JlTmFtZXMgPSBzbGljZShpZGJkYi5vYmplY3RTdG9yZU5hbWVzKTtcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0U3RvcmVOYW1lcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRtcFRyYW5zID0gaWRiZGIudHJhbnNhY3Rpb24oc2FmYXJpTXVsdGlTdG9yZUZpeChvYmplY3RTdG9yZU5hbWVzKSwgJ3JlYWRvbmx5Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUuYXV0b1NjaGVtYSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkR2xvYmFsU2NoZW1hKGRiLCBpZGJkYiwgdG1wVHJhbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRqdXN0VG9FeGlzdGluZ0luZGV4TmFtZXMoZGIsIGRiLl9kYlNjaGVtYSwgdG1wVHJhbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmVyaWZ5SW5zdGFsbGVkU2NoZW1hKGRiLCB0bXBUcmFucykgJiYgIXNjaGVtYVBhdGNoTW9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJEZXhpZSBTY2hlbWFEaWZmOiBTY2hlbWEgd2FzIGV4dGVuZGVkIHdpdGhvdXQgaW5jcmVhc2luZyB0aGUgbnVtYmVyIHBhc3NlZCB0byBkYi52ZXJzaW9uKCkuIERleGllIHdpbGwgYWRkIG1pc3NpbmcgcGFydHMgYW5kIGluY3JlbWVudCBuYXRpdmUgdmVyc2lvbiBudW1iZXIgdG8gd29ya2Fyb3VuZCB0aGlzLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRiZGIuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlVmVyVG9PcGVuID0gaWRiZGIudmVyc2lvbiArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYVBhdGNoTW9kZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRyeU9wZW5EQigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZU1pZGRsZXdhcmVTdGFja3MoZGIsIHRtcFRyYW5zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbnMucHVzaChkYik7XG4gICAgICAgICAgICAgICAgaWRiZGIub252ZXJzaW9uY2hhbmdlID0gd3JhcChmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUudmNGaXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGRiLm9uKFwidmVyc2lvbmNoYW5nZVwiKS5maXJlKGV2KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZGJkYi5vbmNsb3NlID0gd3JhcChmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICAgICAgZGIub24oXCJjbG9zZVwiKS5maXJlKGV2KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAod2FzQ3JlYXRlZClcbiAgICAgICAgICAgICAgICAgICAgX29uRGF0YWJhc2VDcmVhdGVkKGRiLl9kZXBzLCBkYk5hbWUpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0sIHJlamVjdCk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXJyID09PSBudWxsIHx8IGVyciA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXJyLm5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiVW5rbm93bkVycm9yXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5QUjEzOThfbWF4TG9vcCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLlBSMTM5OF9tYXhMb29wLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0RleGllOiBXb3JrYXJvdW5kIGZvciBDaHJvbWUgVW5rbm93bkVycm9yIG9uIG9wZW4oKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyeU9wZW5EQigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJWZXJzaW9uRXJyb3JcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hdGl2ZVZlclRvT3BlbiA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZVZlclRvT3BlbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ5T3BlbkRCKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gRGV4aWVQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICB9KTsgfTtcbiAgICAgICAgcmV0dXJuIERleGllUHJvbWlzZS5yYWNlKFtcbiAgICAgICAgICAgIG9wZW5DYW5jZWxsZXIsXG4gICAgICAgICAgICAodHlwZW9mIG5hdmlnYXRvciA9PT0gJ3VuZGVmaW5lZCcgPyBEZXhpZVByb21pc2UucmVzb2x2ZSgpIDogaWRiUmVhZHkoKSkudGhlbih0cnlPcGVuREIpXG4gICAgICAgIF0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhyb3dJZkNhbmNlbGxlZCgpO1xuICAgICAgICAgICAgc3RhdGUub25SZWFkeUJlaW5nRmlyZWQgPSBbXTtcbiAgICAgICAgICAgIHJldHVybiBEZXhpZVByb21pc2UucmVzb2x2ZSh2aXAoZnVuY3Rpb24gKCkgeyByZXR1cm4gZGIub24ucmVhZHkuZmlyZShkYi52aXApOyB9KSkudGhlbihmdW5jdGlvbiBmaXJlUmVtYWluZGVycygpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUub25SZWFkeUJlaW5nRmlyZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVtYWluZGVyc18xID0gc3RhdGUub25SZWFkeUJlaW5nRmlyZWQucmVkdWNlKHByb21pc2FibGVDaGFpbiwgbm9wKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUub25SZWFkeUJlaW5nRmlyZWQgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIERleGllUHJvbWlzZS5yZXNvbHZlKHZpcChmdW5jdGlvbiAoKSB7IHJldHVybiByZW1haW5kZXJzXzEoZGIudmlwKTsgfSkpLnRoZW4oZmlyZVJlbWFpbmRlcnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5vcGVuQ2FuY2VsbGVyID09PSBvcGVuQ2FuY2VsbGVyKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUub25SZWFkeUJlaW5nRmlyZWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHN0YXRlLmlzQmVpbmdPcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgc3RhdGUuZGJPcGVuRXJyb3IgPSBlcnI7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHVwZ3JhZGVUcmFuc2FjdGlvbiAmJiB1cGdyYWRlVHJhbnNhY3Rpb24uYWJvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChfYSkgeyB9XG4gICAgICAgICAgICBpZiAob3BlbkNhbmNlbGxlciA9PT0gc3RhdGUub3BlbkNhbmNlbGxlcikge1xuICAgICAgICAgICAgICAgIGRiLl9jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlamVjdGlvbihlcnIpO1xuICAgICAgICB9KS5maW5hbGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0YXRlLm9wZW5Db21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICByZXNvbHZlRGJSZWFkeSgpO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh3YXNDcmVhdGVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZXJ5dGhpbmdfMSA9IHt9O1xuICAgICAgICAgICAgICAgIGRiLnRhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0YWJsZS5zY2hlbWEuaW5kZXhlcy5mb3JFYWNoKGZ1bmN0aW9uIChpZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHgubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVyeXRoaW5nXzFbXCJpZGI6Ly9cIi5jb25jYXQoZGIubmFtZSwgXCIvXCIpLmNvbmNhdCh0YWJsZS5uYW1lLCBcIi9cIikuY29uY2F0KGlkeC5uYW1lKV0gPSBuZXcgUmFuZ2VTZXQoLUluZmluaXR5LCBbW1tdXV0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgZXZlcnl0aGluZ18xW1wiaWRiOi8vXCIuY29uY2F0KGRiLm5hbWUsIFwiL1wiKS5jb25jYXQodGFibGUubmFtZSwgXCIvXCIpXSA9IGV2ZXJ5dGhpbmdfMVtcImlkYjovL1wiLmNvbmNhdChkYi5uYW1lLCBcIi9cIikuY29uY2F0KHRhYmxlLm5hbWUsIFwiLzpkZWxzXCIpXSA9IG5ldyBSYW5nZVNldCgtSW5maW5pdHksIFtbW11dXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZ2xvYmFsRXZlbnRzKERFWElFX1NUT1JBR0VfTVVUQVRFRF9FVkVOVF9OQU1FKS5maXJlKGV2ZXJ5dGhpbmdfMSk7XG4gICAgICAgICAgICAgICAgc2lnbmFsU3Vic2NyaWJlcnNOb3coZXZlcnl0aGluZ18xLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkYjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXdhaXRJdGVyYXRvcihpdGVyYXRvcikge1xuICAgICAgICB2YXIgY2FsbE5leHQgPSBmdW5jdGlvbiAocmVzdWx0KSB7IHJldHVybiBpdGVyYXRvci5uZXh0KHJlc3VsdCk7IH0sIGRvVGhyb3cgPSBmdW5jdGlvbiAoZXJyb3IpIHsgcmV0dXJuIGl0ZXJhdG9yLnRocm93KGVycm9yKTsgfSwgb25TdWNjZXNzID0gc3RlcChjYWxsTmV4dCksIG9uRXJyb3IgPSBzdGVwKGRvVGhyb3cpO1xuICAgICAgICBmdW5jdGlvbiBzdGVwKGdldE5leHQpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHQgPSBnZXROZXh0KHZhbCksIHZhbHVlID0gbmV4dC52YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dC5kb25lID8gdmFsdWUgOlxuICAgICAgICAgICAgICAgICAgICAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZS50aGVuICE9PSAnZnVuY3Rpb24nID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQXJyYXkodmFsdWUpID8gUHJvbWlzZS5hbGwodmFsdWUpLnRoZW4ob25TdWNjZXNzLCBvbkVycm9yKSA6IG9uU3VjY2Vzcyh2YWx1ZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUudGhlbihvblN1Y2Nlc3MsIG9uRXJyb3IpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0ZXAoY2FsbE5leHQpKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0cmFjdFRyYW5zYWN0aW9uQXJncyhtb2RlLCBfdGFibGVBcmdzXywgc2NvcGVGdW5jKSB7XG4gICAgICAgIHZhciBpID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgaWYgKGkgPCAyKVxuICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuSW52YWxpZEFyZ3VtZW50KFwiVG9vIGZldyBhcmd1bWVudHNcIik7XG4gICAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGkgLSAxKTtcbiAgICAgICAgd2hpbGUgKC0taSlcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBzY29wZUZ1bmMgPSBhcmdzLnBvcCgpO1xuICAgICAgICB2YXIgdGFibGVzID0gZmxhdHRlbihhcmdzKTtcbiAgICAgICAgcmV0dXJuIFttb2RlLCB0YWJsZXMsIHNjb3BlRnVuY107XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVudGVyVHJhbnNhY3Rpb25TY29wZShkYiwgbW9kZSwgc3RvcmVOYW1lcywgcGFyZW50VHJhbnNhY3Rpb24sIHNjb3BlRnVuYykge1xuICAgICAgICByZXR1cm4gRGV4aWVQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0cmFuc2xlc3MgPSBQU0QudHJhbnNsZXNzIHx8IFBTRDtcbiAgICAgICAgICAgIHZhciB0cmFucyA9IGRiLl9jcmVhdGVUcmFuc2FjdGlvbihtb2RlLCBzdG9yZU5hbWVzLCBkYi5fZGJTY2hlbWEsIHBhcmVudFRyYW5zYWN0aW9uKTtcbiAgICAgICAgICAgIHRyYW5zLmV4cGxpY2l0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciB6b25lUHJvcHMgPSB7XG4gICAgICAgICAgICAgICAgdHJhbnM6IHRyYW5zLFxuICAgICAgICAgICAgICAgIHRyYW5zbGVzczogdHJhbnNsZXNzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHBhcmVudFRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdHJhbnMuaWRidHJhbnMgPSBwYXJlbnRUcmFuc2FjdGlvbi5pZGJ0cmFucztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zLmNyZWF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0cmFucy5pZGJ0cmFucy5fZXhwbGljaXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBkYi5fc3RhdGUuUFIxMzk4X21heExvb3AgPSAzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4Lm5hbWUgPT09IGVycm5hbWVzLkludmFsaWRTdGF0ZSAmJiBkYi5pc09wZW4oKSAmJiAtLWRiLl9zdGF0ZS5QUjEzOThfbWF4TG9vcCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignRGV4aWU6IE5lZWQgdG8gcmVvcGVuIGRiJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYi5jbG9zZSh7IGRpc2FibGVBdXRvT3BlbjogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIub3BlbigpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gZW50ZXJUcmFuc2FjdGlvblNjb3BlKGRiLCBtb2RlLCBzdG9yZU5hbWVzLCBudWxsLCBzY29wZUZ1bmMpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uKGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc2NvcGVGdW5jSXNBc3luYyA9IGlzQXN5bmNGdW5jdGlvbihzY29wZUZ1bmMpO1xuICAgICAgICAgICAgaWYgKHNjb3BlRnVuY0lzQXN5bmMpIHtcbiAgICAgICAgICAgICAgICBpbmNyZW1lbnRFeHBlY3RlZEF3YWl0cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJldHVyblZhbHVlO1xuICAgICAgICAgICAgdmFyIHByb21pc2VGb2xsb3dlZCA9IERleGllUHJvbWlzZS5mb2xsb3coZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gc2NvcGVGdW5jLmNhbGwodHJhbnMsIHRyYW5zKTtcbiAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3BlRnVuY0lzQXN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWNyZW1lbnRvciA9IGRlY3JlbWVudEV4cGVjdGVkQXdhaXRzLmJpbmQobnVsbCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZS50aGVuKGRlY3JlbWVudG9yLCBkZWNyZW1lbnRvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHJldHVyblZhbHVlLm5leHQgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHJldHVyblZhbHVlLnRocm93ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGF3YWl0SXRlcmF0b3IocmV0dXJuVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgem9uZVByb3BzKTtcbiAgICAgICAgICAgIHJldHVybiAocmV0dXJuVmFsdWUgJiYgdHlwZW9mIHJldHVyblZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicgP1xuICAgICAgICAgICAgICAgIERleGllUHJvbWlzZS5yZXNvbHZlKHJldHVyblZhbHVlKS50aGVuKGZ1bmN0aW9uICh4KSB7IHJldHVybiB0cmFucy5hY3RpdmUgP1xuICAgICAgICAgICAgICAgICAgICB4XG4gICAgICAgICAgICAgICAgICAgIDogcmVqZWN0aW9uKG5ldyBleGNlcHRpb25zLlByZW1hdHVyZUNvbW1pdChcIlRyYW5zYWN0aW9uIGNvbW1pdHRlZCB0b28gZWFybHkuIFNlZSBodHRwOi8vYml0Lmx5LzJrZGNrTW5cIikpOyB9KVxuICAgICAgICAgICAgICAgIDogcHJvbWlzZUZvbGxvd2VkLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gcmV0dXJuVmFsdWU7IH0pKS50aGVuKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudFRyYW5zYWN0aW9uKVxuICAgICAgICAgICAgICAgICAgICB0cmFucy5fcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFucy5fY29tcGxldGlvbi50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHg7IH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB0cmFucy5fcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3Rpb24oZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFkKGEsIHZhbHVlLCBjb3VudCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gaXNBcnJheShhKSA/IGEuc2xpY2UoKSA6IFthXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgKytpKVxuICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVWaXJ0dWFsSW5kZXhNaWRkbGV3YXJlKGRvd24pIHtcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduKF9fYXNzaWduKHt9LCBkb3duKSwgeyB0YWJsZTogZnVuY3Rpb24gKHRhYmxlTmFtZSkge1xuICAgICAgICAgICAgICAgIHZhciB0YWJsZSA9IGRvd24udGFibGUodGFibGVOYW1lKTtcbiAgICAgICAgICAgICAgICB2YXIgc2NoZW1hID0gdGFibGUuc2NoZW1hO1xuICAgICAgICAgICAgICAgIHZhciBpbmRleExvb2t1cCA9IHt9O1xuICAgICAgICAgICAgICAgIHZhciBhbGxWaXJ0dWFsSW5kZXhlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFkZFZpcnR1YWxJbmRleGVzKGtleVBhdGgsIGtleVRhaWwsIGxvd0xldmVsSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleVBhdGhBbGlhcyA9IGdldEtleVBhdGhBbGlhcyhrZXlQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4TGlzdCA9IChpbmRleExvb2t1cFtrZXlQYXRoQWxpYXNdID0gaW5kZXhMb29rdXBba2V5UGF0aEFsaWFzXSB8fCBbXSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXlMZW5ndGggPSBrZXlQYXRoID09IG51bGwgPyAwIDogdHlwZW9mIGtleVBhdGggPT09ICdzdHJpbmcnID8gMSA6IGtleVBhdGgubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNWaXJ0dWFsID0ga2V5VGFpbCA+IDA7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2aXJ0dWFsSW5kZXggPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgbG93TGV2ZWxJbmRleCksIHsgbmFtZTogaXNWaXJ0dWFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIlwiLmNvbmNhdChrZXlQYXRoQWxpYXMsIFwiKHZpcnR1YWwtZnJvbTpcIikuY29uY2F0KGxvd0xldmVsSW5kZXgubmFtZSwgXCIpXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBsb3dMZXZlbEluZGV4Lm5hbWUsIGxvd0xldmVsSW5kZXg6IGxvd0xldmVsSW5kZXgsIGlzVmlydHVhbDogaXNWaXJ0dWFsLCBrZXlUYWlsOiBrZXlUYWlsLCBrZXlMZW5ndGg6IGtleUxlbmd0aCwgZXh0cmFjdEtleTogZ2V0S2V5RXh0cmFjdG9yKGtleVBhdGgpLCB1bmlxdWU6ICFpc1ZpcnR1YWwgJiYgbG93TGV2ZWxJbmRleC51bmlxdWUgfSk7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4TGlzdC5wdXNoKHZpcnR1YWxJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdmlydHVhbEluZGV4LmlzUHJpbWFyeUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxsVmlydHVhbEluZGV4ZXMucHVzaCh2aXJ0dWFsSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXlMZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlydHVhbEtleVBhdGggPSBrZXlMZW5ndGggPT09IDIgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleVBhdGhbMF0gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleVBhdGguc2xpY2UoMCwga2V5TGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRWaXJ0dWFsSW5kZXhlcyh2aXJ0dWFsS2V5UGF0aCwga2V5VGFpbCArIDEsIGxvd0xldmVsSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGluZGV4TGlzdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLmtleVRhaWwgLSBiLmtleVRhaWw7IH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmlydHVhbEluZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgcHJpbWFyeUtleSA9IGFkZFZpcnR1YWxJbmRleGVzKHNjaGVtYS5wcmltYXJ5S2V5LmtleVBhdGgsIDAsIHNjaGVtYS5wcmltYXJ5S2V5KTtcbiAgICAgICAgICAgICAgICBpbmRleExvb2t1cFtcIjppZFwiXSA9IFtwcmltYXJ5S2V5XTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gc2NoZW1hLmluZGV4ZXM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICAgICAgYWRkVmlydHVhbEluZGV4ZXMoaW5kZXgua2V5UGF0aCwgMCwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBmaW5kQmVzdEluZGV4KGtleVBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGluZGV4TG9va3VwW2dldEtleVBhdGhBbGlhcyhrZXlQYXRoKV07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQgJiYgcmVzdWx0WzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB0cmFuc2xhdGVSYW5nZShyYW5nZSwga2V5VGFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogcmFuZ2UudHlwZSA9PT0gMSAgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZS50eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXI6IHBhZChyYW5nZS5sb3dlciwgcmFuZ2UubG93ZXJPcGVuID8gZG93bi5NQVhfS0VZIDogZG93bi5NSU5fS0VZLCBrZXlUYWlsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VyT3BlbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwcGVyOiBwYWQocmFuZ2UudXBwZXIsIHJhbmdlLnVwcGVyT3BlbiA/IGRvd24uTUlOX0tFWSA6IGRvd24uTUFYX0tFWSwga2V5VGFpbCksXG4gICAgICAgICAgICAgICAgICAgICAgICB1cHBlck9wZW46IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdHJhbnNsYXRlUmVxdWVzdChyZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gcmVxLnF1ZXJ5LmluZGV4O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXguaXNWaXJ0dWFsID8gX19hc3NpZ24oX19hc3NpZ24oe30sIHJlcSksIHsgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgubG93TGV2ZWxJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZTogdHJhbnNsYXRlUmFuZ2UocmVxLnF1ZXJ5LnJhbmdlLCBpbmRleC5rZXlUYWlsKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSB9KSA6IHJlcTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCB0YWJsZSksIHsgc2NoZW1hOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgc2NoZW1hKSwgeyBwcmltYXJ5S2V5OiBwcmltYXJ5S2V5LCBpbmRleGVzOiBhbGxWaXJ0dWFsSW5kZXhlcywgZ2V0SW5kZXhCeUtleVBhdGg6IGZpbmRCZXN0SW5kZXggfSksIGNvdW50OiBmdW5jdGlvbiAocmVxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFibGUuY291bnQodHJhbnNsYXRlUmVxdWVzdChyZXEpKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgcXVlcnk6IGZ1bmN0aW9uIChyZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZS5xdWVyeSh0cmFuc2xhdGVSZXF1ZXN0KHJlcSkpO1xuICAgICAgICAgICAgICAgICAgICB9LCBvcGVuQ3Vyc29yOiBmdW5jdGlvbiAocmVxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EgPSByZXEucXVlcnkuaW5kZXgsIGtleVRhaWwgPSBfYS5rZXlUYWlsLCBpc1ZpcnR1YWwgPSBfYS5pc1ZpcnR1YWwsIGtleUxlbmd0aCA9IF9hLmtleUxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNWaXJ0dWFsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZS5vcGVuQ3Vyc29yKHJlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBjcmVhdGVWaXJ0dWFsQ3Vyc29yKGN1cnNvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIF9jb250aW51ZShrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5ICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKHBhZChrZXksIHJlcS5yZXZlcnNlID8gZG93bi5NQVhfS0VZIDogZG93bi5NSU5fS0VZLCBrZXlUYWlsKSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxLnVuaXF1ZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKGN1cnNvci5rZXkuc2xpY2UoMCwga2V5TGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KHJlcS5yZXZlcnNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZG93bi5NSU5fS0VZXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZG93bi5NQVhfS0VZLCBrZXlUYWlsKSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlydHVhbEN1cnNvciA9IE9iamVjdC5jcmVhdGUoY3Vyc29yLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlOiB7IHZhbHVlOiBfY29udGludWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWVQcmltYXJ5S2V5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKGtleSwgcHJpbWFyeUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZVByaW1hcnlLZXkocGFkKGtleSwgZG93bi5NQVhfS0VZLCBrZXlUYWlsKSwgcHJpbWFyeUtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlLZXk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJzb3IucHJpbWFyeUtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gY3Vyc29yLmtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5TGVuZ3RoID09PSAxID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5WzBdIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5LnNsaWNlKDAsIGtleUxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3Vyc29yLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZpcnR1YWxDdXJzb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFibGUub3BlbkN1cnNvcih0cmFuc2xhdGVSZXF1ZXN0KHJlcSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGN1cnNvcikgeyByZXR1cm4gY3Vyc29yICYmIGNyZWF0ZVZpcnR1YWxDdXJzb3IoY3Vyc29yKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0gfSk7XG4gICAgfVxuICAgIHZhciB2aXJ0dWFsSW5kZXhNaWRkbGV3YXJlID0ge1xuICAgICAgICBzdGFjazogXCJkYmNvcmVcIixcbiAgICAgICAgbmFtZTogXCJWaXJ0dWFsSW5kZXhNaWRkbGV3YXJlXCIsXG4gICAgICAgIGxldmVsOiAxLFxuICAgICAgICBjcmVhdGU6IGNyZWF0ZVZpcnR1YWxJbmRleE1pZGRsZXdhcmVcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0T2JqZWN0RGlmZihhLCBiLCBydiwgcHJmeCkge1xuICAgICAgICBydiA9IHJ2IHx8IHt9O1xuICAgICAgICBwcmZ4ID0gcHJmeCB8fCAnJztcbiAgICAgICAga2V5cyhhKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgICAgICBpZiAoIWhhc093bihiLCBwcm9wKSkge1xuICAgICAgICAgICAgICAgIHJ2W3ByZnggKyBwcm9wXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBhcCA9IGFbcHJvcF0sIGJwID0gYltwcm9wXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFwID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgYnAgPT09ICdvYmplY3QnICYmIGFwICYmIGJwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhcFR5cGVOYW1lID0gdG9TdHJpbmdUYWcoYXApO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYnBUeXBlTmFtZSA9IHRvU3RyaW5nVGFnKGJwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFwVHlwZU5hbWUgIT09IGJwVHlwZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ2W3ByZnggKyBwcm9wXSA9IGJbcHJvcF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYXBUeXBlTmFtZSA9PT0gJ09iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldE9iamVjdERpZmYoYXAsIGJwLCBydiwgcHJmeCArIHByb3AgKyAnLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFwICE9PSBicCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcnZbcHJmeCArIHByb3BdID0gYltwcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhcCAhPT0gYnApXG4gICAgICAgICAgICAgICAgICAgIHJ2W3ByZnggKyBwcm9wXSA9IGJbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBrZXlzKGIpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgICAgIGlmICghaGFzT3duKGEsIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgcnZbcHJmeCArIHByb3BdID0gYltwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBydjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRFZmZlY3RpdmVLZXlzKHByaW1hcnlLZXksIHJlcSkge1xuICAgICAgICBpZiAocmVxLnR5cGUgPT09ICdkZWxldGUnKVxuICAgICAgICAgICAgcmV0dXJuIHJlcS5rZXlzO1xuICAgICAgICByZXR1cm4gcmVxLmtleXMgfHwgcmVxLnZhbHVlcy5tYXAocHJpbWFyeUtleS5leHRyYWN0S2V5KTtcbiAgICB9XG5cbiAgICB2YXIgaG9va3NNaWRkbGV3YXJlID0ge1xuICAgICAgICBzdGFjazogXCJkYmNvcmVcIixcbiAgICAgICAgbmFtZTogXCJIb29rc01pZGRsZXdhcmVcIixcbiAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKGRvd25Db3JlKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIGRvd25Db3JlKSwgeyB0YWJsZTogZnVuY3Rpb24gKHRhYmxlTmFtZSkge1xuICAgICAgICAgICAgICAgIHZhciBkb3duVGFibGUgPSBkb3duQ29yZS50YWJsZSh0YWJsZU5hbWUpO1xuICAgICAgICAgICAgICAgIHZhciBwcmltYXJ5S2V5ID0gZG93blRhYmxlLnNjaGVtYS5wcmltYXJ5S2V5O1xuICAgICAgICAgICAgICAgIHZhciB0YWJsZU1pZGRsZXdhcmUgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZG93blRhYmxlKSwgeyBtdXRhdGU6IGZ1bmN0aW9uIChyZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkeFRyYW5zID0gUFNELnRyYW5zO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hID0gZHhUcmFucy50YWJsZSh0YWJsZU5hbWUpLmhvb2ssIGRlbGV0aW5nID0gX2EuZGVsZXRpbmcsIGNyZWF0aW5nID0gX2EuY3JlYXRpbmcsIHVwZGF0aW5nID0gX2EudXBkYXRpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlcS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYWRkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNyZWF0aW5nLmZpcmUgPT09IG5vcClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHhUcmFucy5fcHJvbWlzZSgncmVhZHdyaXRlJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gYWRkUHV0T3JEZWxldGUocmVxKTsgfSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncHV0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNyZWF0aW5nLmZpcmUgPT09IG5vcCAmJiB1cGRhdGluZy5maXJlID09PSBub3ApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGR4VHJhbnMuX3Byb21pc2UoJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFkZFB1dE9yRGVsZXRlKHJlcSk7IH0sIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWxldGluZy5maXJlID09PSBub3ApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGR4VHJhbnMuX3Byb21pc2UoJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFkZFB1dE9yRGVsZXRlKHJlcSk7IH0sIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZVJhbmdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlbGV0aW5nLmZpcmUgPT09IG5vcClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHhUcmFucy5fcHJvbWlzZSgncmVhZHdyaXRlJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gZGVsZXRlUmFuZ2UocmVxKTsgfSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG93blRhYmxlLm11dGF0ZShyZXEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gYWRkUHV0T3JEZWxldGUocmVxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGR4VHJhbnMgPSBQU0QudHJhbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleXMgPSByZXEua2V5cyB8fCBnZXRFZmZlY3RpdmVLZXlzKHByaW1hcnlLZXksIHJlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJLZXlzIG1pc3NpbmdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxID0gcmVxLnR5cGUgPT09ICdhZGQnIHx8IHJlcS50eXBlID09PSAncHV0JyA/IF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXEpLCB7IGtleXM6IGtleXMgfSkgOiBfX2Fzc2lnbih7fSwgcmVxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxLnR5cGUgIT09ICdkZWxldGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEudmFsdWVzID0gX19zcHJlYWRBcnJheShbXSwgcmVxLnZhbHVlcywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcS5rZXlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEua2V5cyA9IF9fc3ByZWFkQXJyYXkoW10sIHJlcS5rZXlzLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RXhpc3RpbmdWYWx1ZXMoZG93blRhYmxlLCByZXEsIGtleXMpLnRoZW4oZnVuY3Rpb24gKGV4aXN0aW5nVmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXh0cyA9IGtleXMubWFwKGZ1bmN0aW9uIChrZXksIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleGlzdGluZ1ZhbHVlID0gZXhpc3RpbmdWYWx1ZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3R4ID0geyBvbmVycm9yOiBudWxsLCBvbnN1Y2Nlc3M6IG51bGwgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXEudHlwZSA9PT0gJ2RlbGV0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGluZy5maXJlLmNhbGwoY3R4LCBrZXksIGV4aXN0aW5nVmFsdWUsIGR4VHJhbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmVxLnR5cGUgPT09ICdhZGQnIHx8IGV4aXN0aW5nVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnZW5lcmF0ZWRQcmltYXJ5S2V5ID0gY3JlYXRpbmcuZmlyZS5jYWxsKGN0eCwga2V5LCByZXEudmFsdWVzW2ldLCBkeFRyYW5zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09IG51bGwgJiYgZ2VuZXJhdGVkUHJpbWFyeUtleSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9IGdlbmVyYXRlZFByaW1hcnlLZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5rZXlzW2ldID0ga2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXByaW1hcnlLZXkub3V0Ym91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEJ5S2V5UGF0aChyZXEudmFsdWVzW2ldLCBwcmltYXJ5S2V5LmtleVBhdGgsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqZWN0RGlmZiA9IGdldE9iamVjdERpZmYoZXhpc3RpbmdWYWx1ZSwgcmVxLnZhbHVlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFkZGl0aW9uYWxDaGFuZ2VzXzEgPSB1cGRhdGluZy5maXJlLmNhbGwoY3R4LCBvYmplY3REaWZmLCBrZXksIGV4aXN0aW5nVmFsdWUsIGR4VHJhbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhZGRpdGlvbmFsQ2hhbmdlc18xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXF1ZXN0ZWRWYWx1ZV8xID0gcmVxLnZhbHVlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoYWRkaXRpb25hbENoYW5nZXNfMSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5UGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc093bihyZXF1ZXN0ZWRWYWx1ZV8xLCBrZXlQYXRoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RlZFZhbHVlXzFba2V5UGF0aF0gPSBhZGRpdGlvbmFsQ2hhbmdlc18xW2tleVBhdGhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnlLZXlQYXRoKHJlcXVlc3RlZFZhbHVlXzEsIGtleVBhdGgsIGFkZGl0aW9uYWxDaGFuZ2VzXzFba2V5UGF0aF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3R4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvd25UYWJsZS5tdXRhdGUocmVxKS50aGVuKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmVzID0gX2EuZmFpbHVyZXMsIHJlc3VsdHMgPSBfYS5yZXN1bHRzLCBudW1GYWlsdXJlcyA9IF9hLm51bUZhaWx1cmVzLCBsYXN0UmVzdWx0ID0gX2EubGFzdFJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmltS2V5ID0gcmVzdWx0cyA/IHJlc3VsdHNbaV0gOiBrZXlzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdHggPSBjb250ZXh0c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJpbUtleSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5vbmVycm9yICYmIGN0eC5vbmVycm9yKGZhaWx1cmVzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5vbnN1Y2Nlc3MgJiYgY3R4Lm9uc3VjY2VzcyhyZXEudHlwZSA9PT0gJ3B1dCcgJiYgZXhpc3RpbmdWYWx1ZXNbaV0gP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxLnZhbHVlc1tpXSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltS2V5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZmFpbHVyZXM6IGZhaWx1cmVzLCByZXN1bHRzOiByZXN1bHRzLCBudW1GYWlsdXJlczogbnVtRmFpbHVyZXMsIGxhc3RSZXN1bHQ6IGxhc3RSZXN1bHQgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0cy5mb3JFYWNoKGZ1bmN0aW9uIChjdHgpIHsgcmV0dXJuIGN0eC5vbmVycm9yICYmIGN0eC5vbmVycm9yKGVycm9yKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRlbGV0ZVJhbmdlKHJlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWxldGVOZXh0Q2h1bmsocmVxLnRyYW5zLCByZXEucmFuZ2UsIDEwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRlbGV0ZU5leHRDaHVuayh0cmFucywgcmFuZ2UsIGxpbWl0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvd25UYWJsZS5xdWVyeSh7IHRyYW5zOiB0cmFucywgdmFsdWVzOiBmYWxzZSwgcXVlcnk6IHsgaW5kZXg6IHByaW1hcnlLZXksIHJhbmdlOiByYW5nZSB9LCBsaW1pdDogbGltaXQgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBfYS5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhZGRQdXRPckRlbGV0ZSh7IHR5cGU6ICdkZWxldGUnLCBrZXlzOiByZXN1bHQsIHRyYW5zOiB0cmFucyB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMubnVtRmFpbHVyZXMgPiAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXMuZmFpbHVyZXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPCBsaW1pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGZhaWx1cmVzOiBbXSwgbnVtRmFpbHVyZXM6IDAsIGxhc3RSZXN1bHQ6IHVuZGVmaW5lZCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlbGV0ZU5leHRDaHVuayh0cmFucywgX19hc3NpZ24oX19hc3NpZ24oe30sIHJhbmdlKSwgeyBsb3dlcjogcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSwgbG93ZXJPcGVuOiB0cnVlIH0pLCBsaW1pdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZU1pZGRsZXdhcmU7XG4gICAgICAgICAgICB9IH0pKTsgfVxuICAgIH07XG4gICAgZnVuY3Rpb24gZ2V0RXhpc3RpbmdWYWx1ZXModGFibGUsIHJlcSwgZWZmZWN0aXZlS2V5cykge1xuICAgICAgICByZXR1cm4gcmVxLnR5cGUgPT09IFwiYWRkXCJcbiAgICAgICAgICAgID8gUHJvbWlzZS5yZXNvbHZlKFtdKVxuICAgICAgICAgICAgOiB0YWJsZS5nZXRNYW55KHsgdHJhbnM6IHJlcS50cmFucywga2V5czogZWZmZWN0aXZlS2V5cywgY2FjaGU6IFwiaW1tdXRhYmxlXCIgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RnJvbVRyYW5zYWN0aW9uQ2FjaGUoa2V5cywgY2FjaGUsIGNsb25lKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIWNhY2hlKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgaWYgKGNhY2hlLmtleXMubGVuZ3RoIDwga2V5cy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IDA7IGkgPCBjYWNoZS5rZXlzLmxlbmd0aCAmJiBqIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmIChjbXAoY2FjaGUua2V5c1tpXSwga2V5c1tqXSkgIT09IDApXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNsb25lID8gZGVlcENsb25lKGNhY2hlLnZhbHVlc1tpXSkgOiBjYWNoZS52YWx1ZXNbaV0pO1xuICAgICAgICAgICAgICAgICsrajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID09PSBrZXlzLmxlbmd0aCA/IHJlc3VsdCA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgY2FjaGVFeGlzdGluZ1ZhbHVlc01pZGRsZXdhcmUgPSB7XG4gICAgICAgIHN0YWNrOiBcImRiY29yZVwiLFxuICAgICAgICBsZXZlbDogLTEsXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKGNvcmUpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdGFibGU6IGZ1bmN0aW9uICh0YWJsZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmxlID0gY29yZS50YWJsZSh0YWJsZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19hc3NpZ24oX19hc3NpZ24oe30sIHRhYmxlKSwgeyBnZXRNYW55OiBmdW5jdGlvbiAocmVxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXEuY2FjaGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlLmdldE1hbnkocmVxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhY2hlZFJlc3VsdCA9IGdldEZyb21UcmFuc2FjdGlvbkNhY2hlKHJlcS5rZXlzLCByZXEudHJhbnNbXCJfY2FjaGVcIl0sIHJlcS5jYWNoZSA9PT0gXCJjbG9uZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGVkUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBEZXhpZVByb21pc2UucmVzb2x2ZShjYWNoZWRSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFibGUuZ2V0TWFueShyZXEpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEudHJhbnNbXCJfY2FjaGVcIl0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiByZXEua2V5cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogcmVxLmNhY2hlID09PSBcImNsb25lXCIgPyBkZWVwQ2xvbmUocmVzKSA6IHJlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIG11dGF0ZTogZnVuY3Rpb24gKHJlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXEudHlwZSAhPT0gXCJhZGRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxLnRyYW5zW1wiX2NhY2hlXCJdID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFibGUubXV0YXRlKHJlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpc0NhY2hhYmxlQ29udGV4dChjdHgsIHRhYmxlKSB7XG4gICAgICAgIHJldHVybiAoY3R4LnRyYW5zLm1vZGUgPT09ICdyZWFkb25seScgJiZcbiAgICAgICAgICAgICEhY3R4LnN1YnNjciAmJlxuICAgICAgICAgICAgIWN0eC50cmFucy5leHBsaWNpdCAmJlxuICAgICAgICAgICAgY3R4LnRyYW5zLmRiLl9vcHRpb25zLmNhY2hlICE9PSAnZGlzYWJsZWQnICYmXG4gICAgICAgICAgICAhdGFibGUuc2NoZW1hLnByaW1hcnlLZXkub3V0Ym91bmQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzQ2FjaGFibGVSZXF1ZXN0KHR5cGUsIHJlcSkge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3F1ZXJ5JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVxLnZhbHVlcyAmJiAhcmVxLnVuaXF1ZTtcbiAgICAgICAgICAgIGNhc2UgJ2dldCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgY2FzZSAnZ2V0TWFueSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgY2FzZSAnY291bnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGNhc2UgJ29wZW5DdXJzb3InOlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBvYnNlcnZhYmlsaXR5TWlkZGxld2FyZSA9IHtcbiAgICAgICAgc3RhY2s6IFwiZGJjb3JlXCIsXG4gICAgICAgIGxldmVsOiAwLFxuICAgICAgICBuYW1lOiBcIk9ic2VydmFiaWxpdHlcIixcbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoY29yZSkge1xuICAgICAgICAgICAgdmFyIGRiTmFtZSA9IGNvcmUuc2NoZW1hLm5hbWU7XG4gICAgICAgICAgICB2YXIgRlVMTF9SQU5HRSA9IG5ldyBSYW5nZVNldChjb3JlLk1JTl9LRVksIGNvcmUuTUFYX0tFWSk7XG4gICAgICAgICAgICByZXR1cm4gX19hc3NpZ24oX19hc3NpZ24oe30sIGNvcmUpLCB7IHRyYW5zYWN0aW9uOiBmdW5jdGlvbiAoc3RvcmVzLCBtb2RlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChQU0Quc3Vic2NyICYmIG1vZGUgIT09ICdyZWFkb25seScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLlJlYWRPbmx5KFwiUmVhZHdyaXRlIHRyYW5zYWN0aW9uIGluIGxpdmVRdWVyeSBjb250ZXh0LiBRdWVyaWVyIHNvdXJjZTogXCIuY29uY2F0KFBTRC5xdWVyaWVyKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvcmUudHJhbnNhY3Rpb24oc3RvcmVzLCBtb2RlLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9LCB0YWJsZTogZnVuY3Rpb24gKHRhYmxlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFibGUgPSBjb3JlLnRhYmxlKHRhYmxlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY2hlbWEgPSB0YWJsZS5zY2hlbWE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmltYXJ5S2V5ID0gc2NoZW1hLnByaW1hcnlLZXksIGluZGV4ZXMgPSBzY2hlbWEuaW5kZXhlcztcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4dHJhY3RLZXkgPSBwcmltYXJ5S2V5LmV4dHJhY3RLZXksIG91dGJvdW5kID0gcHJpbWFyeUtleS5vdXRib3VuZDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ZXNXaXRoQXV0b0luY1BLID0gcHJpbWFyeUtleS5hdXRvSW5jcmVtZW50ICYmIGluZGV4ZXMuZmlsdGVyKGZ1bmN0aW9uIChpbmRleCkgeyByZXR1cm4gaW5kZXguY29tcG91bmQgJiYgaW5kZXgua2V5UGF0aC5pbmNsdWRlcyhwcmltYXJ5S2V5LmtleVBhdGgpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmxlQ2xvbmUgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGFibGUpLCB7IG11dGF0ZTogZnVuY3Rpb24gKHJlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zID0gcmVxLnRyYW5zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtdXRhdGVkUGFydHMgPSByZXEubXV0YXRlZFBhcnRzIHx8IChyZXEubXV0YXRlZFBhcnRzID0ge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnZXRSYW5nZVNldCA9IGZ1bmN0aW9uIChpbmRleE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBcImlkYjovL1wiLmNvbmNhdChkYk5hbWUsIFwiL1wiKS5jb25jYXQodGFibGVOYW1lLCBcIi9cIikuY29uY2F0KGluZGV4TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAobXV0YXRlZFBhcnRzW3BhcnRdIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobXV0YXRlZFBhcnRzW3BhcnRdID0gbmV3IFJhbmdlU2V0KCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwa1JhbmdlU2V0ID0gZ2V0UmFuZ2VTZXQoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbHNSYW5nZVNldCA9IGdldFJhbmdlU2V0KFwiOmRlbHNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSByZXEudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2MgPSByZXEudHlwZSA9PT0gXCJkZWxldGVSYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gW3JlcS5yYW5nZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiByZXEudHlwZSA9PT0gXCJkZWxldGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBbcmVxLmtleXNdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHJlcS52YWx1ZXMubGVuZ3RoIDwgNTBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFtnZXRFZmZlY3RpdmVLZXlzKHByaW1hcnlLZXksIHJlcSkuZmlsdGVyKGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gaWQ7IH0pLCByZXEudmFsdWVzXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogW10sIGtleXMgPSBfY1swXSwgbmV3T2JqcyA9IF9jWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbGRDYWNoZSA9IHJlcS50cmFuc1tcIl9jYWNoZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNBcnJheShrZXlzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwa1JhbmdlU2V0LmFkZEtleXMoa2V5cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbGRPYmpzID0gdHlwZSA9PT0gJ2RlbGV0ZScgfHwga2V5cy5sZW5ndGggPT09IG5ld09ianMubGVuZ3RoID8gZ2V0RnJvbVRyYW5zYWN0aW9uQ2FjaGUoa2V5cywgb2xkQ2FjaGUpIDogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvbGRPYmpzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxzUmFuZ2VTZXQuYWRkS2V5cyhrZXlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkT2JqcyB8fCBuZXdPYmpzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFja0FmZmVjdGVkSW5kZXhlcyhnZXRSYW5nZVNldCwgc2NoZW1hLCBvbGRPYmpzLCBuZXdPYmpzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChrZXlzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYW5nZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb206IChfYSA9IGtleXMubG93ZXIpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGNvcmUuTUlOX0tFWSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvOiAoX2IgPSBrZXlzLnVwcGVyKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBjb3JlLk1BWF9LRVlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsc1JhbmdlU2V0LmFkZChyYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBrUmFuZ2VTZXQuYWRkKHJhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBrUmFuZ2VTZXQuYWRkKEZVTExfUkFOR0UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxzUmFuZ2VTZXQuYWRkKEZVTExfUkFOR0UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hlbWEuaW5kZXhlcy5mb3JFYWNoKGZ1bmN0aW9uIChpZHgpIHsgcmV0dXJuIGdldFJhbmdlU2V0KGlkeC5uYW1lKS5hZGQoRlVMTF9SQU5HRSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFibGUubXV0YXRlKHJlcSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXlzICYmIChyZXEudHlwZSA9PT0gJ2FkZCcgfHwgcmVxLnR5cGUgPT09ICdwdXQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGtSYW5nZVNldC5hZGRLZXlzKHJlcy5yZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleGVzV2l0aEF1dG9JbmNQSykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ZXNXaXRoQXV0b0luY1BLLmZvckVhY2goZnVuY3Rpb24gKGlkeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWR4VmFscyA9IHJlcS52YWx1ZXMubWFwKGZ1bmN0aW9uICh2KSB7IHJldHVybiBpZHguZXh0cmFjdEtleSh2KTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwa1BvcyA9IGlkeC5rZXlQYXRoLmZpbmRJbmRleChmdW5jdGlvbiAocHJvcCkgeyByZXR1cm4gcHJvcCA9PT0gcHJpbWFyeUtleS5rZXlQYXRoOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHJlcy5yZXN1bHRzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZHhWYWxzW2ldW3BrUG9zXSA9IHJlcy5yZXN1bHRzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldFJhbmdlU2V0KGlkeC5uYW1lKS5hZGRLZXlzKGlkeFZhbHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zLm11dGF0ZWRQYXJ0cyA9IGV4dGVuZE9ic2VydmFiaWxpdHlTZXQodHJhbnMubXV0YXRlZFBhcnRzIHx8IHt9LCBtdXRhdGVkUGFydHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSB9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdldFJhbmdlID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2IsIF9jO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9kID0gX2EucXVlcnksIGluZGV4ID0gX2QuaW5kZXgsIHJhbmdlID0gX2QucmFuZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSYW5nZVNldCgoX2IgPSByYW5nZS5sb3dlcikgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogY29yZS5NSU5fS0VZLCAoX2MgPSByYW5nZS51cHBlcikgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogY29yZS5NQVhfS0VZKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHZhciByZWFkU3Vic2NyaWJlcnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIChyZXEpIHsgcmV0dXJuIFtwcmltYXJ5S2V5LCBuZXcgUmFuZ2VTZXQocmVxLmtleSldOyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TWFueTogZnVuY3Rpb24gKHJlcSkgeyByZXR1cm4gW3ByaW1hcnlLZXksIG5ldyBSYW5nZVNldCgpLmFkZEtleXMocmVxLmtleXMpXTsgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50OiBnZXRSYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBnZXRSYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5DdXJzb3I6IGdldFJhbmdlLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBrZXlzKHJlYWRTdWJzY3JpYmVycykuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZUNsb25lW21ldGhvZF0gPSBmdW5jdGlvbiAocmVxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1YnNjciA9IFBTRC5zdWJzY3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzTGl2ZVF1ZXJ5ID0gISFzdWJzY3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhY2hhYmxlID0gaXNDYWNoYWJsZUNvbnRleHQoUFNELCB0YWJsZSkgJiYgaXNDYWNoYWJsZVJlcXVlc3QobWV0aG9kLCByZXEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYnNTZXQgPSBjYWNoYWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHJlcS5vYnNTZXQgPSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHN1YnNjcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNMaXZlUXVlcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdldFJhbmdlU2V0ID0gZnVuY3Rpb24gKGluZGV4TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBcImlkYjovL1wiLmNvbmNhdChkYk5hbWUsIFwiL1wiKS5jb25jYXQodGFibGVOYW1lLCBcIi9cIikuY29uY2F0KGluZGV4TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKG9ic1NldFtwYXJ0XSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvYnNTZXRbcGFydF0gPSBuZXcgUmFuZ2VTZXQoKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGtSYW5nZVNldF8xID0gZ2V0UmFuZ2VTZXQoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWxzUmFuZ2VTZXRfMSA9IGdldFJhbmdlU2V0KFwiOmRlbHNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSA9IHJlYWRTdWJzY3JpYmVyc1ttZXRob2RdKHJlcSksIHF1ZXJpZWRJbmRleCA9IF9hWzBdLCBxdWVyaWVkUmFuZ2VzID0gX2FbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09ICdxdWVyeScgJiYgcXVlcmllZEluZGV4LmlzUHJpbWFyeUtleSAmJiAhcmVxLnZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsc1JhbmdlU2V0XzEuYWRkKHF1ZXJpZWRSYW5nZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0UmFuZ2VTZXQocXVlcmllZEluZGV4Lm5hbWUgfHwgXCJcIikuYWRkKHF1ZXJpZWRSYW5nZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcXVlcmllZEluZGV4LmlzUHJpbWFyeUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJjb3VudFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsc1JhbmdlU2V0XzEuYWRkKEZVTExfUkFOR0UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleXNQcm9taXNlXzEgPSBtZXRob2QgPT09IFwicXVlcnlcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRib3VuZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEudmFsdWVzICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLnF1ZXJ5KF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXEpLCB7IHZhbHVlczogZmFsc2UgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZVttZXRob2RdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09IFwicXVlcnlcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG91dGJvdW5kICYmIHJlcS52YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5c1Byb21pc2VfMS50aGVuKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0aW5nS2V5cyA9IF9hLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGtSYW5nZVNldF8xLmFkZEtleXMocmVzdWx0aW5nS2V5cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcEtleXMgPSByZXEudmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyByZXMucmVzdWx0Lm1hcChleHRyYWN0S2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcmVzLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXEudmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGtSYW5nZVNldF8xLmFkZEtleXMocEtleXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsc1JhbmdlU2V0XzEuYWRkS2V5cyhwS2V5cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobWV0aG9kID09PSBcIm9wZW5DdXJzb3JcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnNvcl8xID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdhbnRWYWx1ZXNfMSA9IHJlcS52YWx1ZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGN1cnNvcl8xICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmNyZWF0ZShjdXJzb3JfMSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHNSYW5nZVNldF8xLmFkZEtleShjdXJzb3JfMS5wcmltYXJ5S2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3Vyc29yXzEua2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeUtleToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBrZXkgPSBjdXJzb3JfMS5wcmltYXJ5S2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHNSYW5nZVNldF8xLmFkZEtleShwa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YW50VmFsdWVzXzEgJiYgcGtSYW5nZVNldF8xLmFkZEtleShjdXJzb3JfMS5wcmltYXJ5S2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3Vyc29yXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZVttZXRob2RdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlQ2xvbmU7XG4gICAgICAgICAgICAgICAgfSB9KTtcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHRyYWNrQWZmZWN0ZWRJbmRleGVzKGdldFJhbmdlU2V0LCBzY2hlbWEsIG9sZE9ianMsIG5ld09ianMpIHtcbiAgICAgICAgZnVuY3Rpb24gYWRkQWZmZWN0ZWRJbmRleChpeCkge1xuICAgICAgICAgICAgdmFyIHJhbmdlU2V0ID0gZ2V0UmFuZ2VTZXQoaXgubmFtZSB8fCBcIlwiKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGV4dHJhY3RLZXkob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iaiAhPSBudWxsID8gaXguZXh0cmFjdEtleShvYmopIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBhZGRLZXlPcktleXMgPSBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBpeC5tdWx0aUVudHJ5ICYmIGlzQXJyYXkoa2V5KVxuICAgICAgICAgICAgICAgID8ga2V5LmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gcmFuZ2VTZXQuYWRkS2V5KGtleSk7IH0pXG4gICAgICAgICAgICAgICAgOiByYW5nZVNldC5hZGRLZXkoa2V5KTsgfTtcbiAgICAgICAgICAgIChvbGRPYmpzIHx8IG5ld09ianMpLmZvckVhY2goZnVuY3Rpb24gKF8sIGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkS2V5ID0gb2xkT2JqcyAmJiBleHRyYWN0S2V5KG9sZE9ianNbaV0pO1xuICAgICAgICAgICAgICAgIHZhciBuZXdLZXkgPSBuZXdPYmpzICYmIGV4dHJhY3RLZXkobmV3T2Jqc1tpXSk7XG4gICAgICAgICAgICAgICAgaWYgKGNtcChvbGRLZXksIG5ld0tleSkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9sZEtleSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkS2V5T3JLZXlzKG9sZEtleSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdLZXkgIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEtleU9yS2V5cyhuZXdLZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNjaGVtYS5pbmRleGVzLmZvckVhY2goYWRkQWZmZWN0ZWRJbmRleCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRqdXN0T3B0aW1pc3RpY0Zyb21GYWlsdXJlcyh0YmxDYWNoZSwgcmVxLCByZXMpIHtcbiAgICAgICAgaWYgKHJlcy5udW1GYWlsdXJlcyA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiByZXE7XG4gICAgICAgIGlmIChyZXEudHlwZSA9PT0gJ2RlbGV0ZVJhbmdlJykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG51bUJ1bGtPcHMgPSByZXEua2V5c1xuICAgICAgICAgICAgPyByZXEua2V5cy5sZW5ndGhcbiAgICAgICAgICAgIDogJ3ZhbHVlcycgaW4gcmVxICYmIHJlcS52YWx1ZXNcbiAgICAgICAgICAgICAgICA/IHJlcS52YWx1ZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgOiAxO1xuICAgICAgICBpZiAocmVzLm51bUZhaWx1cmVzID09PSBudW1CdWxrT3BzKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2xvbmUgPSBfX2Fzc2lnbih7fSwgcmVxKTtcbiAgICAgICAgaWYgKGlzQXJyYXkoY2xvbmUua2V5cykpIHtcbiAgICAgICAgICAgIGNsb25lLmtleXMgPSBjbG9uZS5rZXlzLmZpbHRlcihmdW5jdGlvbiAoXywgaSkgeyByZXR1cm4gIShpIGluIHJlcy5mYWlsdXJlcyk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICgndmFsdWVzJyBpbiBjbG9uZSAmJiBpc0FycmF5KGNsb25lLnZhbHVlcykpIHtcbiAgICAgICAgICAgIGNsb25lLnZhbHVlcyA9IGNsb25lLnZhbHVlcy5maWx0ZXIoZnVuY3Rpb24gKF8sIGkpIHsgcmV0dXJuICEoaSBpbiByZXMuZmFpbHVyZXMpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xvbmU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNBYm92ZUxvd2VyKGtleSwgcmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIHJhbmdlLmxvd2VyID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgOiByYW5nZS5sb3dlck9wZW5cbiAgICAgICAgICAgICAgICA/IGNtcChrZXksIHJhbmdlLmxvd2VyKSA+IDBcbiAgICAgICAgICAgICAgICA6IGNtcChrZXksIHJhbmdlLmxvd2VyKSA+PSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0JlbG93VXBwZXIoa2V5LCByYW5nZSkge1xuICAgICAgICByZXR1cm4gcmFuZ2UudXBwZXIgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICA6IHJhbmdlLnVwcGVyT3BlblxuICAgICAgICAgICAgICAgID8gY21wKGtleSwgcmFuZ2UudXBwZXIpIDwgMFxuICAgICAgICAgICAgICAgIDogY21wKGtleSwgcmFuZ2UudXBwZXIpIDw9IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzV2l0aGluUmFuZ2Uoa2V5LCByYW5nZSkge1xuICAgICAgICByZXR1cm4gaXNBYm92ZUxvd2VyKGtleSwgcmFuZ2UpICYmIGlzQmVsb3dVcHBlcihrZXksIHJhbmdlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBseU9wdGltaXN0aWNPcHMocmVzdWx0LCByZXEsIG9wcywgdGFibGUsIGNhY2hlRW50cnksIGltbXV0YWJsZSkge1xuICAgICAgICBpZiAoIW9wcyB8fCBvcHMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgdmFyIGluZGV4ID0gcmVxLnF1ZXJ5LmluZGV4O1xuICAgICAgICB2YXIgbXVsdGlFbnRyeSA9IGluZGV4Lm11bHRpRW50cnk7XG4gICAgICAgIHZhciBxdWVyeVJhbmdlID0gcmVxLnF1ZXJ5LnJhbmdlO1xuICAgICAgICB2YXIgcHJpbWFyeUtleSA9IHRhYmxlLnNjaGVtYS5wcmltYXJ5S2V5O1xuICAgICAgICB2YXIgZXh0cmFjdFByaW1LZXkgPSBwcmltYXJ5S2V5LmV4dHJhY3RLZXk7XG4gICAgICAgIHZhciBleHRyYWN0SW5kZXggPSBpbmRleC5leHRyYWN0S2V5O1xuICAgICAgICB2YXIgZXh0cmFjdExvd0xldmVsSW5kZXggPSAoaW5kZXgubG93TGV2ZWxJbmRleCB8fCBpbmRleCkuZXh0cmFjdEtleTtcbiAgICAgICAgdmFyIGZpbmFsUmVzdWx0ID0gb3BzLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCBvcCkge1xuICAgICAgICAgICAgdmFyIG1vZGlmZWRSZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgICAgICB2YXIgaW5jbHVkZWRWYWx1ZXMgPSBbXTtcbiAgICAgICAgICAgIGlmIChvcC50eXBlID09PSAnYWRkJyB8fCBvcC50eXBlID09PSAncHV0Jykge1xuICAgICAgICAgICAgICAgIHZhciBpbmNsdWRlZFBLcyA9IG5ldyBSYW5nZVNldCgpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBvcC52YWx1ZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gb3AudmFsdWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGsgPSBleHRyYWN0UHJpbUtleSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmNsdWRlZFBLcy5oYXNLZXkocGspKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBleHRyYWN0SW5kZXgodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobXVsdGlFbnRyeSAmJiBpc0FycmF5KGtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgID8ga2V5LnNvbWUoZnVuY3Rpb24gKGspIHsgcmV0dXJuIGlzV2l0aGluUmFuZ2UoaywgcXVlcnlSYW5nZSk7IH0pXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGlzV2l0aGluUmFuZ2Uoa2V5LCBxdWVyeVJhbmdlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZWRQS3MuYWRkS2V5KHBrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGVkVmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChvcC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYWRkJzoge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdLZXlzXzEgPSBuZXcgUmFuZ2VTZXQoKS5hZGRLZXlzKHJlcS52YWx1ZXMgPyByZXN1bHQubWFwKGZ1bmN0aW9uICh2KSB7IHJldHVybiBleHRyYWN0UHJpbUtleSh2KTsgfSkgOiByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBtb2RpZmVkUmVzdWx0ID0gcmVzdWx0LmNvbmNhdChyZXEudmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGluY2x1ZGVkVmFsdWVzLmZpbHRlcihmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBleHRyYWN0UHJpbUtleSh2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdLZXlzXzEuaGFzS2V5KGtleSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZ0tleXNfMS5hZGRLZXkoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGluY2x1ZGVkVmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAodikgeyByZXR1cm4gZXh0cmFjdFByaW1LZXkodik7IH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ0tleXNfMS5oYXNLZXkoaykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZ0tleXNfMS5hZGRLZXkoayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlICdwdXQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXlTZXRfMSA9IG5ldyBSYW5nZVNldCgpLmFkZEtleXMob3AudmFsdWVzLm1hcChmdW5jdGlvbiAodikgeyByZXR1cm4gZXh0cmFjdFByaW1LZXkodik7IH0pKTtcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZlZFJlc3VsdCA9IHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuICFrZXlTZXRfMS5oYXNLZXkocmVxLnZhbHVlcyA/IGV4dHJhY3RQcmltS2V5KGl0ZW0pIDogaXRlbSk7IH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KFxuICAgICAgICAgICAgICAgICAgICByZXEudmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGluY2x1ZGVkVmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGluY2x1ZGVkVmFsdWVzLm1hcChmdW5jdGlvbiAodikgeyByZXR1cm4gZXh0cmFjdFByaW1LZXkodik7IH0pKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXlzVG9EZWxldGVfMSA9IG5ldyBSYW5nZVNldCgpLmFkZEtleXMob3Aua2V5cyk7XG4gICAgICAgICAgICAgICAgICAgIG1vZGlmZWRSZXN1bHQgPSByZXN1bHQuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWtleXNUb0RlbGV0ZV8xLmhhc0tleShyZXEudmFsdWVzID8gZXh0cmFjdFByaW1LZXkoaXRlbSkgOiBpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZVJhbmdlJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmdlXzEgPSBvcC5yYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZlZFJlc3VsdCA9IHJlc3VsdC5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuICFpc1dpdGhpblJhbmdlKGV4dHJhY3RQcmltS2V5KGl0ZW0pLCByYW5nZV8xKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1vZGlmZWRSZXN1bHQ7XG4gICAgICAgIH0sIHJlc3VsdCk7XG4gICAgICAgIGlmIChmaW5hbFJlc3VsdCA9PT0gcmVzdWx0KVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgZmluYWxSZXN1bHQuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGNtcChleHRyYWN0TG93TGV2ZWxJbmRleChhKSwgZXh0cmFjdExvd0xldmVsSW5kZXgoYikpIHx8XG4gICAgICAgICAgICAgICAgY21wKGV4dHJhY3RQcmltS2V5KGEpLCBleHRyYWN0UHJpbUtleShiKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocmVxLmxpbWl0ICYmIHJlcS5saW1pdCA8IEluZmluaXR5KSB7XG4gICAgICAgICAgICBpZiAoZmluYWxSZXN1bHQubGVuZ3RoID4gcmVxLmxpbWl0KSB7XG4gICAgICAgICAgICAgICAgZmluYWxSZXN1bHQubGVuZ3RoID0gcmVxLmxpbWl0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gcmVxLmxpbWl0ICYmIGZpbmFsUmVzdWx0Lmxlbmd0aCA8IHJlcS5saW1pdCkge1xuICAgICAgICAgICAgICAgIGNhY2hlRW50cnkuZGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbW11dGFibGUgPyBPYmplY3QuZnJlZXplKGZpbmFsUmVzdWx0KSA6IGZpbmFsUmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFyZVJhbmdlc0VxdWFsKHIxLCByMikge1xuICAgICAgICByZXR1cm4gKGNtcChyMS5sb3dlciwgcjIubG93ZXIpID09PSAwICYmXG4gICAgICAgICAgICBjbXAocjEudXBwZXIsIHIyLnVwcGVyKSA9PT0gMCAmJlxuICAgICAgICAgICAgISFyMS5sb3dlck9wZW4gPT09ICEhcjIubG93ZXJPcGVuICYmXG4gICAgICAgICAgICAhIXIxLnVwcGVyT3BlbiA9PT0gISFyMi51cHBlck9wZW4pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXBhcmVMb3dlcnMobG93ZXIxLCBsb3dlcjIsIGxvd2VyT3BlbjEsIGxvd2VyT3BlbjIpIHtcbiAgICAgICAgaWYgKGxvd2VyMSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIGxvd2VyMiAhPT0gdW5kZWZpbmVkID8gLTEgOiAwO1xuICAgICAgICBpZiAobG93ZXIyID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgdmFyIGMgPSBjbXAobG93ZXIxLCBsb3dlcjIpO1xuICAgICAgICBpZiAoYyA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKGxvd2VyT3BlbjEgJiYgbG93ZXJPcGVuMilcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIGlmIChsb3dlck9wZW4xKVxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgaWYgKGxvd2VyT3BlbjIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb21wYXJlVXBwZXJzKHVwcGVyMSwgdXBwZXIyLCB1cHBlck9wZW4xLCB1cHBlck9wZW4yKSB7XG4gICAgICAgIGlmICh1cHBlcjEgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB1cHBlcjIgIT09IHVuZGVmaW5lZCA/IDEgOiAwO1xuICAgICAgICBpZiAodXBwZXIyID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIHZhciBjID0gY21wKHVwcGVyMSwgdXBwZXIyKTtcbiAgICAgICAgaWYgKGMgPT09IDApIHtcbiAgICAgICAgICAgIGlmICh1cHBlck9wZW4xICYmIHVwcGVyT3BlbjIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBpZiAodXBwZXJPcGVuMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICBpZiAodXBwZXJPcGVuMilcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYztcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNTdXBlclJhbmdlKHIxLCByMikge1xuICAgICAgICByZXR1cm4gKGNvbXBhcmVMb3dlcnMocjEubG93ZXIsIHIyLmxvd2VyLCByMS5sb3dlck9wZW4sIHIyLmxvd2VyT3BlbikgPD0gMCAmJlxuICAgICAgICAgICAgY29tcGFyZVVwcGVycyhyMS51cHBlciwgcjIudXBwZXIsIHIxLnVwcGVyT3BlbiwgcjIudXBwZXJPcGVuKSA+PSAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kQ29tcGF0aWJsZVF1ZXJ5KGRiTmFtZSwgdGFibGVOYW1lLCB0eXBlLCByZXEpIHtcbiAgICAgICAgdmFyIHRibENhY2hlID0gY2FjaGVbXCJpZGI6Ly9cIi5jb25jYXQoZGJOYW1lLCBcIi9cIikuY29uY2F0KHRhYmxlTmFtZSldO1xuICAgICAgICBpZiAoIXRibENhY2hlKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB2YXIgcXVlcmllcyA9IHRibENhY2hlLnF1ZXJpZXNbdHlwZV07XG4gICAgICAgIGlmICghcXVlcmllcylcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgZmFsc2UsIHRibENhY2hlLCBudWxsXTtcbiAgICAgICAgdmFyIGluZGV4TmFtZSA9IHJlcS5xdWVyeSA/IHJlcS5xdWVyeS5pbmRleC5uYW1lIDogbnVsbDtcbiAgICAgICAgdmFyIGVudHJpZXMgPSBxdWVyaWVzW2luZGV4TmFtZSB8fCAnJ107XG4gICAgICAgIGlmICghZW50cmllcylcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgZmFsc2UsIHRibENhY2hlLCBudWxsXTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdxdWVyeSc6XG4gICAgICAgICAgICAgICAgdmFyIGVxdWFsRW50cnkgPSBlbnRyaWVzLmZpbmQoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbnRyeS5yZXEubGltaXQgPT09IHJlcS5saW1pdCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnkucmVxLnZhbHVlcyA9PT0gcmVxLnZhbHVlcyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJlUmFuZ2VzRXF1YWwoZW50cnkucmVxLnF1ZXJ5LnJhbmdlLCByZXEucXVlcnkucmFuZ2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChlcXVhbEVudHJ5KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgZXF1YWxFbnRyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YmxDYWNoZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJpZXMsXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgdmFyIHN1cGVyRW50cnkgPSBlbnRyaWVzLmZpbmQoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW1pdCA9ICdsaW1pdCcgaW4gZW50cnkucmVxID8gZW50cnkucmVxLmxpbWl0IDogSW5maW5pdHk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAobGltaXQgPj0gcmVxLmxpbWl0ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAocmVxLnZhbHVlcyA/IGVudHJ5LnJlcS52YWx1ZXMgOiB0cnVlKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTdXBlclJhbmdlKGVudHJ5LnJlcS5xdWVyeS5yYW5nZSwgcmVxLnF1ZXJ5LnJhbmdlKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzdXBlckVudHJ5LCBmYWxzZSwgdGJsQ2FjaGUsIGVudHJpZXNdO1xuICAgICAgICAgICAgY2FzZSAnY291bnQnOlxuICAgICAgICAgICAgICAgIHZhciBjb3VudFF1ZXJ5ID0gZW50cmllcy5maW5kKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJlUmFuZ2VzRXF1YWwoZW50cnkucmVxLnF1ZXJ5LnJhbmdlLCByZXEucXVlcnkucmFuZ2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBbY291bnRRdWVyeSwgISFjb3VudFF1ZXJ5LCB0YmxDYWNoZSwgZW50cmllc107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdWJzY3JpYmVUb0NhY2hlRW50cnkoY2FjaGVFbnRyeSwgY29udGFpbmVyLCByZXF1ZXJ5LCBzaWduYWwpIHtcbiAgICAgICAgY2FjaGVFbnRyeS5zdWJzY3JpYmVycy5hZGQocmVxdWVyeSk7XG4gICAgICAgIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FjaGVFbnRyeS5zdWJzY3JpYmVycy5kZWxldGUocmVxdWVyeSk7XG4gICAgICAgICAgICBpZiAoY2FjaGVFbnRyeS5zdWJzY3JpYmVycy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZW5xdWVGb3JEZWxldGlvbihjYWNoZUVudHJ5LCBjb250YWluZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZW5xdWVGb3JEZWxldGlvbihjYWNoZUVudHJ5LCBjb250YWluZXIpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoY2FjaGVFbnRyeS5zdWJzY3JpYmVycy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGVsQXJyYXlJdGVtKGNvbnRhaW5lciwgY2FjaGVFbnRyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDMwMDApO1xuICAgIH1cblxuICAgIHZhciBjYWNoZU1pZGRsZXdhcmUgPSB7XG4gICAgICAgIHN0YWNrOiAnZGJjb3JlJyxcbiAgICAgICAgbGV2ZWw6IDAsXG4gICAgICAgIG5hbWU6ICdDYWNoZScsXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKGNvcmUpIHtcbiAgICAgICAgICAgIHZhciBkYk5hbWUgPSBjb3JlLnNjaGVtYS5uYW1lO1xuICAgICAgICAgICAgdmFyIGNvcmVNVyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBjb3JlKSwgeyB0cmFuc2FjdGlvbjogZnVuY3Rpb24gKHN0b3JlcywgbW9kZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWRidHJhbnMgPSBjb3JlLnRyYW5zYWN0aW9uKHN0b3JlcywgbW9kZSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlID09PSAncmVhZHdyaXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjXzEgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2lnbmFsID0gYWNfMS5zaWduYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW5kVHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAod2FzQ29tbWl0dGVkKSB7IHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNfMS5hYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2RlID09PSAncmVhZHdyaXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWZmZWN0ZWRTdWJzY3JpYmVyc18xID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHN0b3Jlc18xID0gc3RvcmVzOyBfaSA8IHN0b3Jlc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0b3JlTmFtZSA9IHN0b3Jlc18xW19pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YmxDYWNoZSA9IGNhY2hlW1wiaWRiOi8vXCIuY29uY2F0KGRiTmFtZSwgXCIvXCIpLmNvbmNhdChzdG9yZU5hbWUpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YmxDYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YWJsZSA9IGNvcmUudGFibGUoc3RvcmVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3BzID0gdGJsQ2FjaGUub3B0aW1pc3RpY09wcy5maWx0ZXIoZnVuY3Rpb24gKG9wKSB7IHJldHVybiBvcC50cmFucyA9PT0gaWRidHJhbnM7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZGJ0cmFucy5fZXhwbGljaXQgJiYgd2FzQ29tbWl0dGVkICYmIGlkYnRyYW5zLm11dGF0ZWRQYXJ0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfYSA9IDAsIF9iID0gT2JqZWN0LnZhbHVlcyh0YmxDYWNoZS5xdWVyaWVzLnF1ZXJ5KTsgX2EgPCBfYi5sZW5ndGg7IF9hKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbnRyaWVzID0gX2JbX2FdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2MgPSAwLCBfZCA9IGVudHJpZXMuc2xpY2UoKTsgX2MgPCBfZC5sZW5ndGg7IF9jKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW50cnkgPSBfZFtfY107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ic1NldHNPdmVybGFwKGVudHJ5Lm9ic1NldCwgaWRidHJhbnMubXV0YXRlZFBhcnRzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxBcnJheUl0ZW0oZW50cmllcywgZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRyeS5zdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChyZXF1ZXJ5KSB7IHJldHVybiBhZmZlY3RlZFN1YnNjcmliZXJzXzEuYWRkKHJlcXVlcnkpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3BzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGJsQ2FjaGUub3B0aW1pc3RpY09wcyA9IHRibENhY2hlLm9wdGltaXN0aWNPcHMuZmlsdGVyKGZ1bmN0aW9uIChvcCkgeyByZXR1cm4gb3AudHJhbnMgIT09IGlkYnRyYW5zOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2UgPSAwLCBfZiA9IE9iamVjdC52YWx1ZXModGJsQ2FjaGUucXVlcmllcy5xdWVyeSk7IF9lIDwgX2YubGVuZ3RoOyBfZSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW50cmllcyA9IF9mW19lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9nID0gMCwgX2ggPSBlbnRyaWVzLnNsaWNlKCk7IF9nIDwgX2gubGVuZ3RoOyBfZysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gX2hbX2ddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5yZXMgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZGJ0cmFucy5tdXRhdGVkUGFydHNcbiAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdhc0NvbW1pdHRlZCAmJiAhZW50cnkuZGlydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmcmVlemVSZXN1bHRzID0gT2JqZWN0LmlzRnJvemVuKGVudHJ5LnJlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kUmVzID0gYXBwbHlPcHRpbWlzdGljT3BzKGVudHJ5LnJlcywgZW50cnkucmVxLCBvcHMsIHRhYmxlLCBlbnRyeSwgZnJlZXplUmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkuZGlydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxBcnJheUl0ZW0oZW50cmllcywgZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5LnN1YnNjcmliZXJzLmZvckVhY2goZnVuY3Rpb24gKHJlcXVlcnkpIHsgcmV0dXJuIGFmZmVjdGVkU3Vic2NyaWJlcnNfMS5hZGQocmVxdWVyeSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobW9kUmVzICE9PSBlbnRyeS5yZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRyeS5yZXMgPSBtb2RSZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50cnkucHJvbWlzZSA9IERleGllUHJvbWlzZS5yZXNvbHZlKHsgcmVzdWx0OiBtb2RSZXMgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkuZGlydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxBcnJheUl0ZW0oZW50cmllcywgZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50cnkuc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAocmVxdWVyeSkgeyByZXR1cm4gYWZmZWN0ZWRTdWJzY3JpYmVyc18xLmFkZChyZXF1ZXJ5KTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZmZWN0ZWRTdWJzY3JpYmVyc18xLmZvckVhY2goZnVuY3Rpb24gKHJlcXVlcnkpIHsgcmV0dXJuIHJlcXVlcnkoKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTsgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkYnRyYW5zLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgZW5kVHJhbnNhY3Rpb24oZmFsc2UpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsOiBzaWduYWwsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkYnRyYW5zLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZW5kVHJhbnNhY3Rpb24oZmFsc2UpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsOiBzaWduYWwsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkYnRyYW5zLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgZW5kVHJhbnNhY3Rpb24odHJ1ZSksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWw6IHNpZ25hbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpZGJ0cmFucztcbiAgICAgICAgICAgICAgICB9LCB0YWJsZTogZnVuY3Rpb24gKHRhYmxlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZG93blRhYmxlID0gY29yZS50YWJsZSh0YWJsZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJpbUtleSA9IGRvd25UYWJsZS5zY2hlbWEucHJpbWFyeUtleTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmxlTVcgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZG93blRhYmxlKSwgeyBtdXRhdGU6IGZ1bmN0aW9uIChyZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnMgPSBQU0QudHJhbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByaW1LZXkub3V0Ym91bmQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnMuZGIuX29wdGlvbnMuY2FjaGUgPT09ICdkaXNhYmxlZCcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnMuZXhwbGljaXQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnMuaWRidHJhbnMubW9kZSAhPT0gJ3JlYWR3cml0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvd25UYWJsZS5tdXRhdGUocmVxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRibENhY2hlID0gY2FjaGVbXCJpZGI6Ly9cIi5jb25jYXQoZGJOYW1lLCBcIi9cIikuY29uY2F0KHRhYmxlTmFtZSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGJsQ2FjaGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb3duVGFibGUubXV0YXRlKHJlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSBkb3duVGFibGUubXV0YXRlKHJlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChyZXEudHlwZSA9PT0gJ2FkZCcgfHwgcmVxLnR5cGUgPT09ICdwdXQnKSAmJiAocmVxLnZhbHVlcy5sZW5ndGggPj0gNTAgfHwgZ2V0RWZmZWN0aXZlS2V5cyhwcmltS2V5LCByZXEpLnNvbWUoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4ga2V5ID09IG51bGw7IH0pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcVdpdGhSZXNvbHZlZEtleXMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVxKSwgeyB2YWx1ZXM6IHJlcS52YWx1ZXMubWFwKGZ1bmN0aW9uICh2YWx1ZSwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZmFpbHVyZXNbaV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZVdpdGhLZXkgPSAoKF9hID0gcHJpbUtleS5rZXlQYXRoKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5jbHVkZXMoJy4nKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZGVlcENsb25lKHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfX2Fzc2lnbih7fSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCeUtleVBhdGgodmFsdWVXaXRoS2V5LCBwcmltS2V5LmtleVBhdGgsIHJlcy5yZXN1bHRzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlV2l0aEtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhZGp1c3RlZFJlcSA9IGFkanVzdE9wdGltaXN0aWNGcm9tRmFpbHVyZXModGJsQ2FjaGUsIHJlcVdpdGhSZXNvbHZlZEtleXMsIHJlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YmxDYWNoZS5vcHRpbWlzdGljT3BzLnB1c2goYWRqdXN0ZWRSZXEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWVNaWNyb3Rhc2soZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVxLm11dGF0ZWRQYXJ0cyAmJiBzaWduYWxTdWJzY3JpYmVyc0xhemlseShyZXEubXV0YXRlZFBhcnRzKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGJsQ2FjaGUub3B0aW1pc3RpY09wcy5wdXNoKHJlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5tdXRhdGVkUGFydHMgJiYgc2lnbmFsU3Vic2NyaWJlcnNMYXppbHkocmVxLm11dGF0ZWRQYXJ0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLm51bUZhaWx1cmVzID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbEFycmF5SXRlbSh0YmxDYWNoZS5vcHRpbWlzdGljT3BzLCByZXEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhZGp1c3RlZFJlcSA9IGFkanVzdE9wdGltaXN0aWNGcm9tRmFpbHVyZXModGJsQ2FjaGUsIHJlcSwgcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWRqdXN0ZWRSZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGJsQ2FjaGUub3B0aW1pc3RpY09wcy5wdXNoKGFkanVzdGVkUmVxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxLm11dGF0ZWRQYXJ0cyAmJiBzaWduYWxTdWJzY3JpYmVyc0xhemlseShyZXEubXV0YXRlZFBhcnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsQXJyYXlJdGVtKHRibENhY2hlLm9wdGltaXN0aWNPcHMsIHJlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEubXV0YXRlZFBhcnRzICYmIHNpZ25hbFN1YnNjcmliZXJzTGF6aWx5KHJlcS5tdXRhdGVkUGFydHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBxdWVyeTogZnVuY3Rpb24gKHJlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzQ2FjaGFibGVDb250ZXh0KFBTRCwgZG93blRhYmxlKSB8fCAhaXNDYWNoYWJsZVJlcXVlc3QoXCJxdWVyeVwiLCByZXEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG93blRhYmxlLnF1ZXJ5KHJlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZyZWV6ZVJlc3VsdHMgPSAoKF9hID0gUFNELnRyYW5zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGIuX29wdGlvbnMuY2FjaGUpID09PSAnaW1tdXRhYmxlJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2IgPSBQU0QsIHJlcXVlcnkgPSBfYi5yZXF1ZXJ5LCBzaWduYWwgPSBfYi5zaWduYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9jID0gZmluZENvbXBhdGlibGVRdWVyeShkYk5hbWUsIHRhYmxlTmFtZSwgJ3F1ZXJ5JywgcmVxKSwgY2FjaGVFbnRyeSA9IF9jWzBdLCBleGFjdE1hdGNoID0gX2NbMV0sIHRibENhY2hlID0gX2NbMl0sIGNvbnRhaW5lciA9IF9jWzNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWNoZUVudHJ5ICYmIGV4YWN0TWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVFbnRyeS5vYnNTZXQgPSByZXEub2JzU2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSBkb3duVGFibGUucXVlcnkocmVxKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSByZXMucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhY2hlRW50cnkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVFbnRyeS5yZXMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnJlZXplUmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gcmVzdWx0Lmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZnJlZXplKHJlc3VsdFtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5mcmVlemUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5yZXN1bHQgPSBkZWVwQ2xvbmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lciAmJiBjYWNoZUVudHJ5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbEFycmF5SXRlbShjb250YWluZXIsIGNhY2hlRW50cnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlRW50cnkgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNTZXQ6IHJlcS5vYnNTZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlOiBwcm9taXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlcnM6IG5ldyBTZXQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdxdWVyeScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXE6IHJlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcnR5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goY2FjaGVFbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSBbY2FjaGVFbnRyeV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRibENhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGJsQ2FjaGUgPSBjYWNoZVtcImlkYjovL1wiLmNvbmNhdChkYk5hbWUsIFwiL1wiKS5jb25jYXQodGFibGVOYW1lKV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50OiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqczogbmV3IE1hcCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpbWlzdGljT3BzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5zaWduYWxlZFBhcnRzOiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YmxDYWNoZS5xdWVyaWVzLnF1ZXJ5W3JlcS5xdWVyeS5pbmRleC5uYW1lIHx8ICcnXSA9IGNvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVUb0NhY2hlRW50cnkoY2FjaGVFbnRyeSwgY29udGFpbmVyLCByZXF1ZXJ5LCBzaWduYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZUVudHJ5LnByb21pc2UudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IGFwcGx5T3B0aW1pc3RpY09wcyhyZXMucmVzdWx0LCByZXEsIHRibENhY2hlID09PSBudWxsIHx8IHRibENhY2hlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0YmxDYWNoZS5vcHRpbWlzdGljT3BzLCBkb3duVGFibGUsIGNhY2hlRW50cnksIGZyZWV6ZVJlc3VsdHMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlTVc7XG4gICAgICAgICAgICAgICAgfSB9KTtcbiAgICAgICAgICAgIHJldHVybiBjb3JlTVc7XG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHZpcGlmeSh0YXJnZXQsIHZpcERiKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkodGFyZ2V0LCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb3AgPT09ICdkYicpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2aXBEYjtcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBEZXhpZSQxID0gIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIERleGllKG5hbWUsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLl9taWRkbGV3YXJlcyA9IHt9O1xuICAgICAgICAgICAgdGhpcy52ZXJubyA9IDA7XG4gICAgICAgICAgICB2YXIgZGVwcyA9IERleGllLmRlcGVuZGVuY2llcztcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zID0gX19hc3NpZ24oe1xuICAgICAgICAgICAgICAgIGFkZG9uczogRGV4aWUuYWRkb25zLCBhdXRvT3BlbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpbmRleGVkREI6IGRlcHMuaW5kZXhlZERCLCBJREJLZXlSYW5nZTogZGVwcy5JREJLZXlSYW5nZSwgY2FjaGU6ICdjbG9uZWQnIH0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5fZGVwcyA9IHtcbiAgICAgICAgICAgICAgICBpbmRleGVkREI6IG9wdGlvbnMuaW5kZXhlZERCLFxuICAgICAgICAgICAgICAgIElEQktleVJhbmdlOiBvcHRpb25zLklEQktleVJhbmdlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGFkZG9ucyA9IG9wdGlvbnMuYWRkb25zO1xuICAgICAgICAgICAgdGhpcy5fZGJTY2hlbWEgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuX3ZlcnNpb25zID0gW107XG4gICAgICAgICAgICB0aGlzLl9zdG9yZU5hbWVzID0gW107XG4gICAgICAgICAgICB0aGlzLl9hbGxUYWJsZXMgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuaWRiZGIgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fbm92aXAgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHN0YXRlID0ge1xuICAgICAgICAgICAgICAgIGRiT3BlbkVycm9yOiBudWxsLFxuICAgICAgICAgICAgICAgIGlzQmVpbmdPcGVuZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG9uUmVhZHlCZWluZ0ZpcmVkOiBudWxsLFxuICAgICAgICAgICAgICAgIG9wZW5Db21wbGV0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGJSZWFkeVJlc29sdmU6IG5vcCxcbiAgICAgICAgICAgICAgICBkYlJlYWR5UHJvbWlzZTogbnVsbCxcbiAgICAgICAgICAgICAgICBjYW5jZWxPcGVuOiBub3AsXG4gICAgICAgICAgICAgICAgb3BlbkNhbmNlbGxlcjogbnVsbCxcbiAgICAgICAgICAgICAgICBhdXRvU2NoZW1hOiB0cnVlLFxuICAgICAgICAgICAgICAgIFBSMTM5OF9tYXhMb29wOiAzLFxuICAgICAgICAgICAgICAgIGF1dG9PcGVuOiBvcHRpb25zLmF1dG9PcGVuLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHN0YXRlLmRiUmVhZHlQcm9taXNlID0gbmV3IERleGllUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgIHN0YXRlLmRiUmVhZHlSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3RhdGUub3BlbkNhbmNlbGxlciA9IG5ldyBEZXhpZVByb21pc2UoZnVuY3Rpb24gKF8sIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHN0YXRlLmNhbmNlbE9wZW4gPSByZWplY3Q7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gc3RhdGU7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgdGhpcy5vbiA9IEV2ZW50cyh0aGlzLCBcInBvcHVsYXRlXCIsIFwiYmxvY2tlZFwiLCBcInZlcnNpb25jaGFuZ2VcIiwgXCJjbG9zZVwiLCB7IHJlYWR5OiBbcHJvbWlzYWJsZUNoYWluLCBub3BdIH0pO1xuICAgICAgICAgICAgdGhpcy5vbi5yZWFkeS5zdWJzY3JpYmUgPSBvdmVycmlkZSh0aGlzLm9uLnJlYWR5LnN1YnNjcmliZSwgZnVuY3Rpb24gKHN1YnNjcmliZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3Vic2NyaWJlciwgYlN0aWNreSkge1xuICAgICAgICAgICAgICAgICAgICBEZXhpZS52aXAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXRlID0gX3RoaXMuX3N0YXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLm9wZW5Db21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3RhdGUuZGJPcGVuRXJyb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERleGllUHJvbWlzZS5yZXNvbHZlKCkudGhlbihzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYlN0aWNreSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc3RhdGUub25SZWFkeUJlaW5nRmlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5vblJlYWR5QmVpbmdGaXJlZC5wdXNoKHN1YnNjcmliZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiU3RpY2t5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRiXzEgPSBfdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWJTdGlja3kpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZShmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRiXzEub24ucmVhZHkudW5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYl8xLm9uLnJlYWR5LnVuc3Vic2NyaWJlKHVuc3Vic2NyaWJlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuQ29sbGVjdGlvbiA9IGNyZWF0ZUNvbGxlY3Rpb25Db25zdHJ1Y3Rvcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuVGFibGUgPSBjcmVhdGVUYWJsZUNvbnN0cnVjdG9yKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5UcmFuc2FjdGlvbiA9IGNyZWF0ZVRyYW5zYWN0aW9uQ29uc3RydWN0b3IodGhpcyk7XG4gICAgICAgICAgICB0aGlzLlZlcnNpb24gPSBjcmVhdGVWZXJzaW9uQ29uc3RydWN0b3IodGhpcyk7XG4gICAgICAgICAgICB0aGlzLldoZXJlQ2xhdXNlID0gY3JlYXRlV2hlcmVDbGF1c2VDb25zdHJ1Y3Rvcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub24oXCJ2ZXJzaW9uY2hhbmdlXCIsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgIGlmIChldi5uZXdWZXJzaW9uID4gMClcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQW5vdGhlciBjb25uZWN0aW9uIHdhbnRzIHRvIHVwZ3JhZGUgZGF0YWJhc2UgJ1wiLmNvbmNhdChfdGhpcy5uYW1lLCBcIicuIENsb3NpbmcgZGIgbm93IHRvIHJlc3VtZSB0aGUgdXBncmFkZS5cIikpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQW5vdGhlciBjb25uZWN0aW9uIHdhbnRzIHRvIGRlbGV0ZSBkYXRhYmFzZSAnXCIuY29uY2F0KF90aGlzLm5hbWUsIFwiJy4gQ2xvc2luZyBkYiBub3cgdG8gcmVzdW1lIHRoZSBkZWxldGUgcmVxdWVzdC5cIikpO1xuICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlKHsgZGlzYWJsZUF1dG9PcGVuOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5vbihcImJsb2NrZWRcIiwgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFldi5uZXdWZXJzaW9uIHx8IGV2Lm5ld1ZlcnNpb24gPCBldi5vbGRWZXJzaW9uKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJEZXhpZS5kZWxldGUoJ1wiLmNvbmNhdChfdGhpcy5uYW1lLCBcIicpIHdhcyBibG9ja2VkXCIpKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlVwZ3JhZGUgJ1wiLmNvbmNhdChfdGhpcy5uYW1lLCBcIicgYmxvY2tlZCBieSBvdGhlciBjb25uZWN0aW9uIGhvbGRpbmcgdmVyc2lvbiBcIikuY29uY2F0KGV2Lm9sZFZlcnNpb24gLyAxMCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9tYXhLZXkgPSBnZXRNYXhLZXkob3B0aW9ucy5JREJLZXlSYW5nZSk7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChtb2RlLCBzdG9yZU5hbWVzLCBkYnNjaGVtYSwgcGFyZW50VHJhbnNhY3Rpb24pIHsgcmV0dXJuIG5ldyBfdGhpcy5UcmFuc2FjdGlvbihtb2RlLCBzdG9yZU5hbWVzLCBkYnNjaGVtYSwgX3RoaXMuX29wdGlvbnMuY2hyb21lVHJhbnNhY3Rpb25EdXJhYmlsaXR5LCBwYXJlbnRUcmFuc2FjdGlvbik7IH07XG4gICAgICAgICAgICB0aGlzLl9maXJlT25CbG9ja2VkID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub24oXCJibG9ja2VkXCIpLmZpcmUoZXYpO1xuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25zXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMubmFtZSA9PT0gX3RoaXMubmFtZSAmJiBjICE9PSBfdGhpcyAmJiAhYy5fc3RhdGUudmNGaXJlZDsgfSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5vbihcInZlcnNpb25jaGFuZ2VcIikuZmlyZShldik7IH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMudXNlKGNhY2hlRXhpc3RpbmdWYWx1ZXNNaWRkbGV3YXJlKTtcbiAgICAgICAgICAgIHRoaXMudXNlKGNhY2hlTWlkZGxld2FyZSk7XG4gICAgICAgICAgICB0aGlzLnVzZShvYnNlcnZhYmlsaXR5TWlkZGxld2FyZSk7XG4gICAgICAgICAgICB0aGlzLnVzZSh2aXJ0dWFsSW5kZXhNaWRkbGV3YXJlKTtcbiAgICAgICAgICAgIHRoaXMudXNlKGhvb2tzTWlkZGxld2FyZSk7XG4gICAgICAgICAgICB2YXIgdmlwREIgPSBuZXcgUHJveHkodGhpcywge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKF8sIHByb3AsIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wID09PSAnX3ZpcCcpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3AgPT09ICd0YWJsZScpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhYmxlTmFtZSkgeyByZXR1cm4gdmlwaWZ5KF90aGlzLnRhYmxlKHRhYmxlTmFtZSksIHZpcERCKTsgfTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJ2ID0gUmVmbGVjdC5nZXQoXywgcHJvcCwgcmVjZWl2ZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocnYgaW5zdGFuY2VvZiBUYWJsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2aXBpZnkocnYsIHZpcERCKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3AgPT09ICd0YWJsZXMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJ2Lm1hcChmdW5jdGlvbiAodCkgeyByZXR1cm4gdmlwaWZ5KHQsIHZpcERCKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wID09PSAnX2NyZWF0ZVRyYW5zYWN0aW9uJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHR4ID0gcnYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmlwaWZ5KHR4LCB2aXBEQik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnZpcCA9IHZpcERCO1xuICAgICAgICAgICAgYWRkb25zLmZvckVhY2goZnVuY3Rpb24gKGFkZG9uKSB7IHJldHVybiBhZGRvbihfdGhpcyk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIERleGllLnByb3RvdHlwZS52ZXJzaW9uID0gZnVuY3Rpb24gKHZlcnNpb25OdW1iZXIpIHtcbiAgICAgICAgICAgIGlmIChpc05hTih2ZXJzaW9uTnVtYmVyKSB8fCB2ZXJzaW9uTnVtYmVyIDwgMC4xKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLlR5cGUoXCJHaXZlbiB2ZXJzaW9uIGlzIG5vdCBhIHBvc2l0aXZlIG51bWJlclwiKTtcbiAgICAgICAgICAgIHZlcnNpb25OdW1iZXIgPSBNYXRoLnJvdW5kKHZlcnNpb25OdW1iZXIgKiAxMCkgLyAxMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmlkYmRiIHx8IHRoaXMuX3N0YXRlLmlzQmVpbmdPcGVuZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuU2NoZW1hKFwiQ2Fubm90IGFkZCB2ZXJzaW9uIHdoZW4gZGF0YWJhc2UgaXMgb3BlblwiKTtcbiAgICAgICAgICAgIHRoaXMudmVybm8gPSBNYXRoLm1heCh0aGlzLnZlcm5vLCB2ZXJzaW9uTnVtYmVyKTtcbiAgICAgICAgICAgIHZhciB2ZXJzaW9ucyA9IHRoaXMuX3ZlcnNpb25zO1xuICAgICAgICAgICAgdmFyIHZlcnNpb25JbnN0YW5jZSA9IHZlcnNpb25zLmZpbHRlcihmdW5jdGlvbiAodikgeyByZXR1cm4gdi5fY2ZnLnZlcnNpb24gPT09IHZlcnNpb25OdW1iZXI7IH0pWzBdO1xuICAgICAgICAgICAgaWYgKHZlcnNpb25JbnN0YW5jZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdmVyc2lvbkluc3RhbmNlO1xuICAgICAgICAgICAgdmVyc2lvbkluc3RhbmNlID0gbmV3IHRoaXMuVmVyc2lvbih2ZXJzaW9uTnVtYmVyKTtcbiAgICAgICAgICAgIHZlcnNpb25zLnB1c2godmVyc2lvbkluc3RhbmNlKTtcbiAgICAgICAgICAgIHZlcnNpb25zLnNvcnQobG93ZXJWZXJzaW9uRmlyc3QpO1xuICAgICAgICAgICAgdmVyc2lvbkluc3RhbmNlLnN0b3Jlcyh7fSk7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZS5hdXRvU2NoZW1hID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdmVyc2lvbkluc3RhbmNlO1xuICAgICAgICB9O1xuICAgICAgICBEZXhpZS5wcm90b3R5cGUuX3doZW5SZWFkeSA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5pZGJkYiAmJiAodGhpcy5fc3RhdGUub3BlbkNvbXBsZXRlIHx8IFBTRC5sZXRUaHJvdWdoIHx8IHRoaXMuX3ZpcCkpID8gZm4oKSA6IG5ldyBEZXhpZVByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fc3RhdGUub3BlbkNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QobmV3IGV4Y2VwdGlvbnMuRGF0YWJhc2VDbG9zZWQoX3RoaXMuX3N0YXRlLmRiT3BlbkVycm9yKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuX3N0YXRlLmlzQmVpbmdPcGVuZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5fc3RhdGUuYXV0b09wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgZXhjZXB0aW9ucy5EYXRhYmFzZUNsb3NlZCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5vcGVuKCkuY2F0Y2gobm9wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMuX3N0YXRlLmRiUmVhZHlQcm9taXNlLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0pLnRoZW4oZm4pO1xuICAgICAgICB9O1xuICAgICAgICBEZXhpZS5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgc3RhY2sgPSBfYS5zdGFjaywgY3JlYXRlID0gX2EuY3JlYXRlLCBsZXZlbCA9IF9hLmxldmVsLCBuYW1lID0gX2EubmFtZTtcbiAgICAgICAgICAgIGlmIChuYW1lKVxuICAgICAgICAgICAgICAgIHRoaXMudW51c2UoeyBzdGFjazogc3RhY2ssIG5hbWU6IG5hbWUgfSk7XG4gICAgICAgICAgICB2YXIgbWlkZGxld2FyZXMgPSB0aGlzLl9taWRkbGV3YXJlc1tzdGFja10gfHwgKHRoaXMuX21pZGRsZXdhcmVzW3N0YWNrXSA9IFtdKTtcbiAgICAgICAgICAgIG1pZGRsZXdhcmVzLnB1c2goeyBzdGFjazogc3RhY2ssIGNyZWF0ZTogY3JlYXRlLCBsZXZlbDogbGV2ZWwgPT0gbnVsbCA/IDEwIDogbGV2ZWwsIG5hbWU6IG5hbWUgfSk7XG4gICAgICAgICAgICBtaWRkbGV3YXJlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLmxldmVsIC0gYi5sZXZlbDsgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgRGV4aWUucHJvdG90eXBlLnVudXNlID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgc3RhY2sgPSBfYS5zdGFjaywgbmFtZSA9IF9hLm5hbWUsIGNyZWF0ZSA9IF9hLmNyZWF0ZTtcbiAgICAgICAgICAgIGlmIChzdGFjayAmJiB0aGlzLl9taWRkbGV3YXJlc1tzdGFja10pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9taWRkbGV3YXJlc1tzdGFja10gPSB0aGlzLl9taWRkbGV3YXJlc1tzdGFja10uZmlsdGVyKGZ1bmN0aW9uIChtdykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlID8gbXcuY3JlYXRlICE9PSBjcmVhdGUgOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA/IG13Lm5hbWUgIT09IG5hbWUgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIERleGllLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiB1c2VQU0QoZ2xvYmFsUFNELFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gZGV4aWVPcGVuKF90aGlzKTsgfSk7XG4gICAgICAgIH07XG4gICAgICAgIERleGllLnByb3RvdHlwZS5fY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB0aGlzLl9zdGF0ZTtcbiAgICAgICAgICAgIHZhciBpZHggPSBjb25uZWN0aW9ucy5pbmRleE9mKHRoaXMpO1xuICAgICAgICAgICAgaWYgKGlkeCA+PSAwKVxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25zLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaWRiZGIpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlkYmRiLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICAgICAgICAgICAgICB0aGlzLmlkYmRiID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc3RhdGUuaXNCZWluZ09wZW5lZCkge1xuICAgICAgICAgICAgICAgIHN0YXRlLmRiUmVhZHlQcm9taXNlID0gbmV3IERleGllUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5kYlJlYWR5UmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc3RhdGUub3BlbkNhbmNlbGxlciA9IG5ldyBEZXhpZVByb21pc2UoZnVuY3Rpb24gKF8sIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5jYW5jZWxPcGVuID0gcmVqZWN0O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBEZXhpZS5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBfYiA9IF9hID09PSB2b2lkIDAgPyB7IGRpc2FibGVBdXRvT3BlbjogdHJ1ZSB9IDogX2EsIGRpc2FibGVBdXRvT3BlbiA9IF9iLmRpc2FibGVBdXRvT3BlbjtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuX3N0YXRlO1xuICAgICAgICAgICAgaWYgKGRpc2FibGVBdXRvT3Blbikge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5pc0JlaW5nT3BlbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmNhbmNlbE9wZW4obmV3IGV4Y2VwdGlvbnMuRGF0YWJhc2VDbG9zZWQoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2Nsb3NlKCk7XG4gICAgICAgICAgICAgICAgc3RhdGUuYXV0b09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzdGF0ZS5kYk9wZW5FcnJvciA9IG5ldyBleGNlcHRpb25zLkRhdGFiYXNlQ2xvc2VkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbG9zZSgpO1xuICAgICAgICAgICAgICAgIHN0YXRlLmF1dG9PcGVuID0gdGhpcy5fb3B0aW9ucy5hdXRvT3BlbiB8fFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5pc0JlaW5nT3BlbmVkO1xuICAgICAgICAgICAgICAgIHN0YXRlLm9wZW5Db21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHN0YXRlLmRiT3BlbkVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgRGV4aWUucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChjbG9zZU9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICBpZiAoY2xvc2VPcHRpb25zID09PSB2b2lkIDApIHsgY2xvc2VPcHRpb25zID0geyBkaXNhYmxlQXV0b09wZW46IHRydWUgfTsgfVxuICAgICAgICAgICAgdmFyIGhhc0ludmFsaWRBcmd1bWVudHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiB0eXBlb2YgYXJndW1lbnRzWzBdICE9PSAnb2JqZWN0JztcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuX3N0YXRlO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEZXhpZVByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBkb0RlbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2xvc2UoY2xvc2VPcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcSA9IF90aGlzLl9kZXBzLmluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShfdGhpcy5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uc3VjY2VzcyA9IHdyYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX29uRGF0YWJhc2VEZWxldGVkKF90aGlzLl9kZXBzLCBfdGhpcy5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlcS5vbmVycm9yID0gZXZlbnRSZWplY3RIYW5kbGVyKHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIHJlcS5vbmJsb2NrZWQgPSBfdGhpcy5fZmlyZU9uQmxvY2tlZDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChoYXNJbnZhbGlkQXJndW1lbnRzKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5JbnZhbGlkQXJndW1lbnQoXCJJbnZhbGlkIGNsb3NlT3B0aW9ucyBhcmd1bWVudCB0byBkYi5kZWxldGUoKVwiKTtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuaXNCZWluZ09wZW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5kYlJlYWR5UHJvbWlzZS50aGVuKGRvRGVsZXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRvRGVsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIERleGllLnByb3RvdHlwZS5iYWNrZW5kREIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pZGJkYjtcbiAgICAgICAgfTtcbiAgICAgICAgRGV4aWUucHJvdG90eXBlLmlzT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlkYmRiICE9PSBudWxsO1xuICAgICAgICB9O1xuICAgICAgICBEZXhpZS5wcm90b3R5cGUuaGFzQmVlbkNsb3NlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkYk9wZW5FcnJvciA9IHRoaXMuX3N0YXRlLmRiT3BlbkVycm9yO1xuICAgICAgICAgICAgcmV0dXJuIGRiT3BlbkVycm9yICYmIChkYk9wZW5FcnJvci5uYW1lID09PSAnRGF0YWJhc2VDbG9zZWQnKTtcbiAgICAgICAgfTtcbiAgICAgICAgRGV4aWUucHJvdG90eXBlLmhhc0ZhaWxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZS5kYk9wZW5FcnJvciAhPT0gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgRGV4aWUucHJvdG90eXBlLmR5bmFtaWNhbGx5T3BlbmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlLmF1dG9TY2hlbWE7XG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEZXhpZS5wcm90b3R5cGUsIFwidGFibGVzXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleXModGhpcy5fYWxsVGFibGVzKS5tYXAoZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIF90aGlzLl9hbGxUYWJsZXNbbmFtZV07IH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBEZXhpZS5wcm90b3R5cGUudHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IGV4dHJhY3RUcmFuc2FjdGlvbkFyZ3MuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90cmFuc2FjdGlvbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfTtcbiAgICAgICAgRGV4aWUucHJvdG90eXBlLl90cmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChtb2RlLCB0YWJsZXMsIHNjb3BlRnVuYykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHZhciBwYXJlbnRUcmFuc2FjdGlvbiA9IFBTRC50cmFucztcbiAgICAgICAgICAgIGlmICghcGFyZW50VHJhbnNhY3Rpb24gfHwgcGFyZW50VHJhbnNhY3Rpb24uZGIgIT09IHRoaXMgfHwgbW9kZS5pbmRleE9mKCchJykgIT09IC0xKVxuICAgICAgICAgICAgICAgIHBhcmVudFRyYW5zYWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBvbmx5SWZDb21wYXRpYmxlID0gbW9kZS5pbmRleE9mKCc/JykgIT09IC0xO1xuICAgICAgICAgICAgbW9kZSA9IG1vZGUucmVwbGFjZSgnIScsICcnKS5yZXBsYWNlKCc/JywgJycpO1xuICAgICAgICAgICAgdmFyIGlkYk1vZGUsIHN0b3JlTmFtZXM7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHN0b3JlTmFtZXMgPSB0YWJsZXMubWFwKGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RvcmVOYW1lID0gdGFibGUgaW5zdGFuY2VvZiBfdGhpcy5UYWJsZSA/IHRhYmxlLm5hbWUgOiB0YWJsZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdG9yZU5hbWUgIT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgdGFibGUgYXJndW1lbnQgdG8gRGV4aWUudHJhbnNhY3Rpb24oKS4gT25seSBUYWJsZSBvciBTdHJpbmcgYXJlIGFsbG93ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdG9yZU5hbWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGUgPT0gXCJyXCIgfHwgbW9kZSA9PT0gUkVBRE9OTFkpXG4gICAgICAgICAgICAgICAgICAgIGlkYk1vZGUgPSBSRUFET05MWTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChtb2RlID09IFwicndcIiB8fCBtb2RlID09IFJFQURXUklURSlcbiAgICAgICAgICAgICAgICAgICAgaWRiTW9kZSA9IFJFQURXUklURTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLkludmFsaWRBcmd1bWVudChcIkludmFsaWQgdHJhbnNhY3Rpb24gbW9kZTogXCIgKyBtb2RlKTtcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50VHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudFRyYW5zYWN0aW9uLm1vZGUgPT09IFJFQURPTkxZICYmIGlkYk1vZGUgPT09IFJFQURXUklURSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ubHlJZkNvbXBhdGlibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRUcmFuc2FjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuU3ViVHJhbnNhY3Rpb24oXCJDYW5ub3QgZW50ZXIgYSBzdWItdHJhbnNhY3Rpb24gd2l0aCBSRUFEV1JJVEUgbW9kZSB3aGVuIHBhcmVudCB0cmFuc2FjdGlvbiBpcyBSRUFET05MWVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50VHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudFRyYW5zYWN0aW9uICYmIHBhcmVudFRyYW5zYWN0aW9uLnN0b3JlTmFtZXMuaW5kZXhPZihzdG9yZU5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob25seUlmQ29tcGF0aWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50VHJhbnNhY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLlN1YlRyYW5zYWN0aW9uKFwiVGFibGUgXCIgKyBzdG9yZU5hbWUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIG5vdCBpbmNsdWRlZCBpbiBwYXJlbnQgdHJhbnNhY3Rpb24uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvbmx5SWZDb21wYXRpYmxlICYmIHBhcmVudFRyYW5zYWN0aW9uICYmICFwYXJlbnRUcmFuc2FjdGlvbi5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudFRyYW5zYWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudFRyYW5zYWN0aW9uID9cbiAgICAgICAgICAgICAgICAgICAgcGFyZW50VHJhbnNhY3Rpb24uX3Byb21pc2UobnVsbCwgZnVuY3Rpb24gKF8sIHJlamVjdCkgeyByZWplY3QoZSk7IH0pIDpcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0aW9uKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGVudGVyVHJhbnNhY3Rpb24gPSBlbnRlclRyYW5zYWN0aW9uU2NvcGUuYmluZChudWxsLCB0aGlzLCBpZGJNb2RlLCBzdG9yZU5hbWVzLCBwYXJlbnRUcmFuc2FjdGlvbiwgc2NvcGVGdW5jKTtcbiAgICAgICAgICAgIHJldHVybiAocGFyZW50VHJhbnNhY3Rpb24gP1xuICAgICAgICAgICAgICAgIHBhcmVudFRyYW5zYWN0aW9uLl9wcm9taXNlKGlkYk1vZGUsIGVudGVyVHJhbnNhY3Rpb24sIFwibG9ja1wiKSA6XG4gICAgICAgICAgICAgICAgUFNELnRyYW5zID9cbiAgICAgICAgICAgICAgICAgICAgdXNlUFNEKFBTRC50cmFuc2xlc3MsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl93aGVuUmVhZHkoZW50ZXJUcmFuc2FjdGlvbik7IH0pIDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2hlblJlYWR5KGVudGVyVHJhbnNhY3Rpb24pKTtcbiAgICAgICAgfTtcbiAgICAgICAgRGV4aWUucHJvdG90eXBlLnRhYmxlID0gZnVuY3Rpb24gKHRhYmxlTmFtZSkge1xuICAgICAgICAgICAgaWYgKCFoYXNPd24odGhpcy5fYWxsVGFibGVzLCB0YWJsZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuSW52YWxpZFRhYmxlKFwiVGFibGUgXCIuY29uY2F0KHRhYmxlTmFtZSwgXCIgZG9lcyBub3QgZXhpc3RcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FsbFRhYmxlc1t0YWJsZU5hbWVdO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRGV4aWU7XG4gICAgfSgpKTtcblxuICAgIHZhciBzeW1ib2xPYnNlcnZhYmxlID0gdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBcIm9ic2VydmFibGVcIiBpbiBTeW1ib2xcbiAgICAgICAgPyBTeW1ib2wub2JzZXJ2YWJsZVxuICAgICAgICA6IFwiQEBvYnNlcnZhYmxlXCI7XG4gICAgdmFyIE9ic2VydmFibGUgPSAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gT2JzZXJ2YWJsZShzdWJzY3JpYmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICAgICAgfVxuICAgICAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoeCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Vic2NyaWJlKCF4IHx8IHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCIgPyB7IG5leHQ6IHgsIGVycm9yOiBlcnJvciwgY29tcGxldGU6IGNvbXBsZXRlIH0gOiB4KTtcbiAgICAgICAgfTtcbiAgICAgICAgT2JzZXJ2YWJsZS5wcm90b3R5cGVbc3ltYm9sT2JzZXJ2YWJsZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGU7XG4gICAgfSgpKTtcblxuICAgIHZhciBkb21EZXBzO1xuICAgIHRyeSB7XG4gICAgICAgIGRvbURlcHMgPSB7XG4gICAgICAgICAgICBpbmRleGVkREI6IF9nbG9iYWwuaW5kZXhlZERCIHx8IF9nbG9iYWwubW96SW5kZXhlZERCIHx8IF9nbG9iYWwud2Via2l0SW5kZXhlZERCIHx8IF9nbG9iYWwubXNJbmRleGVkREIsXG4gICAgICAgICAgICBJREJLZXlSYW5nZTogX2dsb2JhbC5JREJLZXlSYW5nZSB8fCBfZ2xvYmFsLndlYmtpdElEQktleVJhbmdlXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGRvbURlcHMgPSB7IGluZGV4ZWREQjogbnVsbCwgSURCS2V5UmFuZ2U6IG51bGwgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXZlUXVlcnkocXVlcmllcikge1xuICAgICAgICB2YXIgaGFzVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgdmFyIGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgdmFyIG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHZhciBzY29wZUZ1bmNJc0FzeW5jID0gaXNBc3luY0Z1bmN0aW9uKHF1ZXJpZXIpO1xuICAgICAgICAgICAgZnVuY3Rpb24gZXhlY3V0ZShjdHgpIHtcbiAgICAgICAgICAgICAgICB2YXIgd2FzUm9vdEV4ZWMgPSBiZWdpbk1pY3JvVGlja1Njb3BlKCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3BlRnVuY0lzQXN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY3JlbWVudEV4cGVjdGVkQXdhaXRzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJ2ID0gbmV3U2NvcGUocXVlcmllciwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3BlRnVuY0lzQXN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ2ID0gcnYuZmluYWxseShkZWNyZW1lbnRFeHBlY3RlZEF3YWl0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJ2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgd2FzUm9vdEV4ZWMgJiYgZW5kTWljcm9UaWNrU2NvcGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2xvc2VkID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgYWJvcnRDb250cm9sbGVyO1xuICAgICAgICAgICAgdmFyIGFjY3VtTXV0cyA9IHt9O1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRPYnMgPSB7fTtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSB7XG4gICAgICAgICAgICAgICAgZ2V0IGNsb3NlZCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsb3NlZDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhYm9ydENvbnRyb2xsZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICBhYm9ydENvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0ZWRMaXN0ZW5pbmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxFdmVudHMuc3RvcmFnZW11dGF0ZWQudW5zdWJzY3JpYmUobXV0YXRpb25MaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBvYnNlcnZlci5zdGFydCAmJiBvYnNlcnZlci5zdGFydChzdWJzY3JpcHRpb24pO1xuICAgICAgICAgICAgdmFyIHN0YXJ0ZWRMaXN0ZW5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBkb1F1ZXJ5ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZXhlY0luR2xvYmFsQ29udGV4dChfZG9RdWVyeSk7IH07XG4gICAgICAgICAgICBmdW5jdGlvbiBzaG91bGROb3RpZnkoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ic1NldHNPdmVybGFwKGN1cnJlbnRPYnMsIGFjY3VtTXV0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbXV0YXRpb25MaXN0ZW5lciA9IGZ1bmN0aW9uIChwYXJ0cykge1xuICAgICAgICAgICAgICAgIGV4dGVuZE9ic2VydmFiaWxpdHlTZXQoYWNjdW1NdXRzLCBwYXJ0cyk7XG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZE5vdGlmeSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvUXVlcnkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIF9kb1F1ZXJ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjbG9zZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgIWRvbURlcHMuaW5kZXhlZERCKVxuICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWNjdW1NdXRzID0ge307XG4gICAgICAgICAgICAgICAgdmFyIHN1YnNjciA9IHt9O1xuICAgICAgICAgICAgICAgIGlmIChhYm9ydENvbnRyb2xsZXIpXG4gICAgICAgICAgICAgICAgICAgIGFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIGFib3J0Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgICAgICB2YXIgY3R4ID0ge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3I6IHN1YnNjcixcbiAgICAgICAgICAgICAgICAgICAgc2lnbmFsOiBhYm9ydENvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICAgICAgICAgICAgICByZXF1ZXJ5OiBkb1F1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICBxdWVyaWVyOiBxdWVyaWVyLFxuICAgICAgICAgICAgICAgICAgICB0cmFuczogbnVsbFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdmFyIHJldCA9IGV4ZWN1dGUoY3R4KTtcbiAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUocmV0KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZWQgfHwgY3R4LnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYWNjdW1NdXRzID0ge307XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRPYnMgPSBzdWJzY3I7XG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqZWN0SXNFbXB0eShjdXJyZW50T2JzKSAmJiAhc3RhcnRlZExpc3RlbmluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsRXZlbnRzKERFWElFX1NUT1JBR0VfTVVUQVRFRF9FVkVOVF9OQU1FLCBtdXRhdGlvbkxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ZWRMaXN0ZW5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGV4ZWNJbkdsb2JhbENvbnRleHQoZnVuY3Rpb24gKCkgeyByZXR1cm4gIWNsb3NlZCAmJiBvYnNlcnZlci5uZXh0ICYmIG9ic2VydmVyLm5leHQocmVzdWx0KTsgfSk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBoYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIVsnRGF0YWJhc2VDbG9zZWRFcnJvcicsICdBYm9ydEVycm9yJ10uaW5jbHVkZXMoZXJyID09PSBudWxsIHx8IGVyciA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXJyLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNsb3NlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGVjSW5HbG9iYWxDb250ZXh0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3NlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IgJiYgb2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZG9RdWVyeSwgMCk7XG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgICAgICB9KTtcbiAgICAgICAgb2JzZXJ2YWJsZS5oYXNWYWx1ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGhhc1ZhbHVlOyB9O1xuICAgICAgICBvYnNlcnZhYmxlLmdldFZhbHVlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gY3VycmVudFZhbHVlOyB9O1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9XG5cbiAgICB2YXIgRGV4aWUgPSBEZXhpZSQxO1xuICAgIHByb3BzKERleGllLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZnVsbE5hbWVFeGNlcHRpb25zKSwge1xuICAgICAgICBkZWxldGU6IGZ1bmN0aW9uIChkYXRhYmFzZU5hbWUpIHtcbiAgICAgICAgICAgIHZhciBkYiA9IG5ldyBEZXhpZShkYXRhYmFzZU5hbWUsIHsgYWRkb25zOiBbXSB9KTtcbiAgICAgICAgICAgIHJldHVybiBkYi5kZWxldGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXhpc3RzOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEZXhpZShuYW1lLCB7IGFkZG9uczogW10gfSkub3BlbigpLnRoZW4oZnVuY3Rpb24gKGRiKSB7XG4gICAgICAgICAgICAgICAgZGIuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCdOb1N1Y2hEYXRhYmFzZUVycm9yJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH0pO1xuICAgICAgICB9LFxuICAgICAgICBnZXREYXRhYmFzZU5hbWVzOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldERhdGFiYXNlTmFtZXMoRGV4aWUuZGVwZW5kZW5jaWVzKS50aGVuKGNiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3Rpb24obmV3IGV4Y2VwdGlvbnMuTWlzc2luZ0FQSSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGVmaW5lQ2xhc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIENsYXNzKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICBleHRlbmQodGhpcywgY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gQ2xhc3M7XG4gICAgICAgIH0sIGlnbm9yZVRyYW5zYWN0aW9uOiBmdW5jdGlvbiAoc2NvcGVGdW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gUFNELnRyYW5zID9cbiAgICAgICAgICAgICAgICB1c2VQU0QoUFNELnRyYW5zbGVzcywgc2NvcGVGdW5jKSA6XG4gICAgICAgICAgICAgICAgc2NvcGVGdW5jKCk7XG4gICAgICAgIH0sIHZpcDogdmlwLCBhc3luYzogZnVuY3Rpb24gKGdlbmVyYXRvckZuKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBydiA9IGF3YWl0SXRlcmF0b3IoZ2VuZXJhdG9yRm4uYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcnYgfHwgdHlwZW9mIHJ2LnRoZW4gIT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRGV4aWVQcm9taXNlLnJlc29sdmUocnYpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3Rpb24oZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSwgc3Bhd246IGZ1bmN0aW9uIChnZW5lcmF0b3JGbiwgYXJncywgdGhpeikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB2YXIgcnYgPSBhd2FpdEl0ZXJhdG9yKGdlbmVyYXRvckZuLmFwcGx5KHRoaXosIGFyZ3MgfHwgW10pKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJ2IHx8IHR5cGVvZiBydi50aGVuICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRGV4aWVQcm9taXNlLnJlc29sdmUocnYpO1xuICAgICAgICAgICAgICAgIHJldHVybiBydjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdGlvbihlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY3VycmVudFRyYW5zYWN0aW9uOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFBTRC50cmFucyB8fCBudWxsOyB9XG4gICAgICAgIH0sIHdhaXRGb3I6IGZ1bmN0aW9uIChwcm9taXNlT3JGdW5jdGlvbiwgb3B0aW9uYWxUaW1lb3V0KSB7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IERleGllUHJvbWlzZS5yZXNvbHZlKHR5cGVvZiBwcm9taXNlT3JGdW5jdGlvbiA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgICAgICAgRGV4aWUuaWdub3JlVHJhbnNhY3Rpb24ocHJvbWlzZU9yRnVuY3Rpb24pIDpcbiAgICAgICAgICAgICAgICBwcm9taXNlT3JGdW5jdGlvbilcbiAgICAgICAgICAgICAgICAudGltZW91dChvcHRpb25hbFRpbWVvdXQgfHwgNjAwMDApO1xuICAgICAgICAgICAgcmV0dXJuIFBTRC50cmFucyA/XG4gICAgICAgICAgICAgICAgUFNELnRyYW5zLndhaXRGb3IocHJvbWlzZSkgOlxuICAgICAgICAgICAgICAgIHByb21pc2U7XG4gICAgICAgIH0sXG4gICAgICAgIFByb21pc2U6IERleGllUHJvbWlzZSxcbiAgICAgICAgZGVidWc6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZGVidWc7IH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHNldERlYnVnKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGVyaXZlOiBkZXJpdmUsIGV4dGVuZDogZXh0ZW5kLCBwcm9wczogcHJvcHMsIG92ZXJyaWRlOiBvdmVycmlkZSxcbiAgICAgICAgRXZlbnRzOiBFdmVudHMsIG9uOiBnbG9iYWxFdmVudHMsIGxpdmVRdWVyeTogbGl2ZVF1ZXJ5LCBleHRlbmRPYnNlcnZhYmlsaXR5U2V0OiBleHRlbmRPYnNlcnZhYmlsaXR5U2V0LFxuICAgICAgICBnZXRCeUtleVBhdGg6IGdldEJ5S2V5UGF0aCwgc2V0QnlLZXlQYXRoOiBzZXRCeUtleVBhdGgsIGRlbEJ5S2V5UGF0aDogZGVsQnlLZXlQYXRoLCBzaGFsbG93Q2xvbmU6IHNoYWxsb3dDbG9uZSwgZGVlcENsb25lOiBkZWVwQ2xvbmUsIGdldE9iamVjdERpZmY6IGdldE9iamVjdERpZmYsIGNtcDogY21wLCBhc2FwOiBhc2FwJDEsXG4gICAgICAgIG1pbktleTogbWluS2V5LFxuICAgICAgICBhZGRvbnM6IFtdLFxuICAgICAgICBjb25uZWN0aW9uczogY29ubmVjdGlvbnMsXG4gICAgICAgIGVycm5hbWVzOiBlcnJuYW1lcyxcbiAgICAgICAgZGVwZW5kZW5jaWVzOiBkb21EZXBzLCBjYWNoZTogY2FjaGUsXG4gICAgICAgIHNlbVZlcjogREVYSUVfVkVSU0lPTiwgdmVyc2lvbjogREVYSUVfVkVSU0lPTi5zcGxpdCgnLicpXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChuKSB7IHJldHVybiBwYXJzZUludChuKTsgfSlcbiAgICAgICAgICAgIC5yZWR1Y2UoZnVuY3Rpb24gKHAsIGMsIGkpIHsgcmV0dXJuIHAgKyAoYyAvIE1hdGgucG93KDEwLCBpICogMikpOyB9KSB9KSk7XG4gICAgRGV4aWUubWF4S2V5ID0gZ2V0TWF4S2V5KERleGllLmRlcGVuZGVuY2llcy5JREJLZXlSYW5nZSk7XG5cbiAgICBpZiAodHlwZW9mIGRpc3BhdGNoRXZlbnQgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBhZGRFdmVudExpc3RlbmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBnbG9iYWxFdmVudHMoREVYSUVfU1RPUkFHRV9NVVRBVEVEX0VWRU5UX05BTUUsIGZ1bmN0aW9uICh1cGRhdGVkUGFydHMpIHtcbiAgICAgICAgICAgIGlmICghcHJvcGFnYXRpbmdMb2NhbGx5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50XzE7XG4gICAgICAgICAgICAgICAgZXZlbnRfMSA9IG5ldyBDdXN0b21FdmVudChTVE9SQUdFX01VVEFURURfRE9NX0VWRU5UX05BTUUsIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB1cGRhdGVkUGFydHNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwcm9wYWdhdGluZ0xvY2FsbHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoRXZlbnQoZXZlbnRfMSk7XG4gICAgICAgICAgICAgICAgcHJvcGFnYXRpbmdMb2NhbGx5ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBhZGRFdmVudExpc3RlbmVyKFNUT1JBR0VfTVVUQVRFRF9ET01fRVZFTlRfTkFNRSwgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgZGV0YWlsID0gX2EuZGV0YWlsO1xuICAgICAgICAgICAgaWYgKCFwcm9wYWdhdGluZ0xvY2FsbHkpIHtcbiAgICAgICAgICAgICAgICBwcm9wYWdhdGVMb2NhbGx5KGRldGFpbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwcm9wYWdhdGVMb2NhbGx5KHVwZGF0ZVBhcnRzKSB7XG4gICAgICAgIHZhciB3YXNNZSA9IHByb3BhZ2F0aW5nTG9jYWxseTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHByb3BhZ2F0aW5nTG9jYWxseSA9IHRydWU7XG4gICAgICAgICAgICBnbG9iYWxFdmVudHMuc3RvcmFnZW11dGF0ZWQuZmlyZSh1cGRhdGVQYXJ0cyk7XG4gICAgICAgICAgICBzaWduYWxTdWJzY3JpYmVyc05vdyh1cGRhdGVQYXJ0cywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBwcm9wYWdhdGluZ0xvY2FsbHkgPSB3YXNNZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgcHJvcGFnYXRpbmdMb2NhbGx5ID0gZmFsc2U7XG5cbiAgICB2YXIgYmM7XG4gICAgdmFyIGNyZWF0ZUJDID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIGlmICh0eXBlb2YgQnJvYWRjYXN0Q2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY3JlYXRlQkMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBiYyA9IG5ldyBCcm9hZGNhc3RDaGFubmVsKFNUT1JBR0VfTVVUQVRFRF9ET01fRVZFTlRfTkFNRSk7XG4gICAgICAgICAgICBiYy5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIGV2LmRhdGEgJiYgcHJvcGFnYXRlTG9jYWxseShldi5kYXRhKTsgfTtcbiAgICAgICAgfTtcbiAgICAgICAgY3JlYXRlQkMoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBiYy51bnJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgYmMudW5yZWYoKTtcbiAgICAgICAgfVxuICAgICAgICBnbG9iYWxFdmVudHMoREVYSUVfU1RPUkFHRV9NVVRBVEVEX0VWRU5UX05BTUUsIGZ1bmN0aW9uIChjaGFuZ2VkUGFydHMpIHtcbiAgICAgICAgICAgIGlmICghcHJvcGFnYXRpbmdMb2NhbGx5KSB7XG4gICAgICAgICAgICAgICAgYmMucG9zdE1lc3NhZ2UoY2hhbmdlZFBhcnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBhZGRFdmVudExpc3RlbmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBhZGRFdmVudExpc3RlbmVyKCdwYWdlaGlkZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKCFEZXhpZSQxLmRpc2FibGVCZkNhY2hlICYmIGV2ZW50LnBlcnNpc3RlZCkge1xuICAgICAgICAgICAgICAgIGlmIChkZWJ1ZylcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZygnRGV4aWU6IGhhbmRsaW5nIHBlcnNpc3RlZCBwYWdlaGlkZScpO1xuICAgICAgICAgICAgICAgIGJjID09PSBudWxsIHx8IGJjID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiYy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgY29ubmVjdGlvbnNfMSA9IGNvbm5lY3Rpb25zOyBfaSA8IGNvbm5lY3Rpb25zXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYiA9IGNvbm5lY3Rpb25zXzFbX2ldO1xuICAgICAgICAgICAgICAgICAgICBkYi5jbG9zZSh7IGRpc2FibGVBdXRvT3BlbjogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcigncGFnZXNob3cnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICghRGV4aWUkMS5kaXNhYmxlQmZDYWNoZSAmJiBldmVudC5wZXJzaXN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVidWcpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ0RleGllOiBoYW5kbGluZyBwZXJzaXN0ZWQgcGFnZXNob3cnKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVCQygpO1xuICAgICAgICAgICAgICAgIHByb3BhZ2F0ZUxvY2FsbHkoeyBhbGw6IG5ldyBSYW5nZVNldCgtSW5maW5pdHksIFtbXV0pIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wTW9kaWZpY2F0aW9uKHsgYWRkOiB2YWx1ZSB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmUodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wTW9kaWZpY2F0aW9uKHsgcmVtb3ZlOiB2YWx1ZSB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXBsYWNlUHJlZml4KGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wTW9kaWZpY2F0aW9uKHsgcmVwbGFjZVByZWZpeDogW2EsIGJdIH0pO1xuICAgIH1cblxuICAgIERleGllUHJvbWlzZS5yZWplY3Rpb25NYXBwZXIgPSBtYXBFcnJvcjtcbiAgICBzZXREZWJ1ZyhkZWJ1Zyk7XG5cbiAgICB2YXIgbmFtZWRFeHBvcnRzID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgICAgICBfX3Byb3RvX186IG51bGwsXG4gICAgICAgIERleGllOiBEZXhpZSQxLFxuICAgICAgICBsaXZlUXVlcnk6IGxpdmVRdWVyeSxcbiAgICAgICAgRW50aXR5OiBFbnRpdHksXG4gICAgICAgIGNtcDogY21wLFxuICAgICAgICBQcm9wTW9kaWZpY2F0aW9uOiBQcm9wTW9kaWZpY2F0aW9uLFxuICAgICAgICByZXBsYWNlUHJlZml4OiByZXBsYWNlUHJlZml4LFxuICAgICAgICBhZGQ6IGFkZCxcbiAgICAgICAgcmVtb3ZlOiByZW1vdmUsXG4gICAgICAgICdkZWZhdWx0JzogRGV4aWUkMSxcbiAgICAgICAgUmFuZ2VTZXQ6IFJhbmdlU2V0LFxuICAgICAgICBtZXJnZVJhbmdlczogbWVyZ2VSYW5nZXMsXG4gICAgICAgIHJhbmdlc092ZXJsYXA6IHJhbmdlc092ZXJsYXBcbiAgICB9KTtcblxuICAgIF9fYXNzaWduKERleGllJDEsIG5hbWVkRXhwb3J0cywgeyBkZWZhdWx0OiBEZXhpZSQxIH0pO1xuXG4gICAgcmV0dXJuIERleGllJDE7XG5cbn0pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRleGllLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGIgPSB2b2lkIDA7XG5jb25zdCBkZXhpZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJkZXhpZVwiKSk7XG5jb25zdCBsb2NhbERiID0gbmV3IGRleGllXzEuZGVmYXVsdChcIkZyaWVuZHNEYXRhYmFzZVwiKTtcbi8vIFNjaGVtYSBkZWNsYXJhdGlvbjpcbmxvY2FsRGIudmVyc2lvbigxKS5zdG9yZXMoe1xuICAgIG1vY2tzOiBcIisrbG9jYWxJZCwgW3VybCttZXRob2RdXCIsIC8vIHByaW1hcnkga2V5IFwiaWRcIiAoZm9yIHRoZSBydW50aW1lISlcbn0pO1xuY29uc3QgZ2V0RHluYW1pY1VybFBhdHRlcm5zID0gKCkgPT4ge1xuICAgIHJldHVybiBsb2NhbERiLm1vY2tzXG4gICAgICAgIC53aGVyZSh7IGR5bmFtaWM6IHRydWUsIG1vY2tlZDogdHJ1ZSB9KSAvLyBPbmx5IGFjdGl2ZSBkeW5hbWljIG1vY2tzXG4gICAgICAgIC50b0FycmF5KClcbiAgICAgICAgLnRoZW4oKG1vY2tzKSA9PiBtb2Nrcy5tYXAoKG1vY2spID0+ICh7XG4gICAgICAgIGxvY2FsSWQ6IG1vY2subG9jYWxJZCxcbiAgICAgICAgdXJsUGF0dGVybjogbW9jay51cmwsXG4gICAgfSkpKTtcbn07XG5jb25zdCBmaW5kU3RhdGljTW9jayA9ICh1cmwsIG1ldGhvZCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgLy8gRmluZCBhY3RpdmUsIG5vbi1keW5hbWljIG1vY2tzIG1hdGNoaW5nIHRoZSBVUkxcbiAgICByZXR1cm4gbG9jYWxEYi5tb2Nrc1xuICAgICAgICAud2hlcmUoeyB1cmw6IHVybCwgZHluYW1pYzogZmFsc2UsIG1vY2tlZDogdHJ1ZSB9KVxuICAgICAgICAuZmlyc3QoKTtcbn0pO1xuY29uc3QgZmluZE1vY2tCeUlkID0gKGlkKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICByZXR1cm4gbG9jYWxEYi5tb2Nrcy5nZXQoaWQpO1xufSk7XG5leHBvcnRzLmRiID0ge1xuICAgIGdldER5bmFtaWNVcmxQYXR0ZXJucyxcbiAgICBmaW5kU3RhdGljTW9jayxcbiAgICBmaW5kTW9ja0J5SWQsXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGRiXzEgPSByZXF1aXJlKFwiLi9kYlwiKTtcbmxldCBkeW5hbWljVXJsUGF0dGVybnMgPSBbXTtcbmZ1bmN0aW9uIGluaXRpYWxpemVEeW5hbWljVXJscygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZHluYW1pY1VybFBhdHRlcm5zID0geWllbGQgZGJfMS5kYi5nZXREeW5hbWljVXJsUGF0dGVybnMoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTW9ra3U6IER5bmFtaWMgVVJMIHBhdHRlcm5zIGxvYWRlZDpcIiwgZHluYW1pY1VybFBhdHRlcm5zLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTW9ra3U6IEVycm9yIGxvYWRpbmcgZHluYW1pYyBVUkwgcGF0dGVybnM6XCIsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8gSW5pdGlhbGl6ZSBvbiBzZXJ2aWNlIHdvcmtlciBzdGFydHVwXG5jaHJvbWUucnVudGltZS5vblN0YXJ0dXAuYWRkTGlzdGVuZXIoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiTW9ra3U6IFNlcnZpY2Ugd29ya2VyIHN0YXJ0ZWQgb24gYnJvd3NlciBzdGFydHVwLlwiKTtcbiAgICBpbml0aWFsaXplRHluYW1pY1VybHMoKTtcbn0pO1xuLy8gQWxzbyBpbml0aWFsaXplIHdoZW4gdGhlIGV4dGVuc2lvbiBpcyBpbnN0YWxsZWQgb3IgdXBkYXRlZFxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiTW9ra3U6IEV4dGVuc2lvbiBpbnN0YWxsZWQvdXBkYXRlZC5cIik7XG4gICAgaW5pdGlhbGl6ZUR5bmFtaWNVcmxzKCk7XG59KTtcbi8qKlxuICogUGxhY2Vob2xkZXIgZm9yIGV4ZWN1dGluZyBhIGZ1bmN0aW9uIHN0cmluZy5cbiAqIEluIGEgcmVhbCBzY2VuYXJpbywgdGhpcyB3b3VsZCBuZWVkIGNhcmVmdWwgaW1wbGVtZW50YXRpb24sXG4gKiBwb3NzaWJseSB1c2luZyBhbiBvZmZzY3JlZW4gZG9jdW1lbnQgZm9yIHNhZmVyIGV4ZWN1dGlvbiBpZiBET00vd2luZG93IGFjY2VzcyBpcyBuZWVkZWQsXG4gKiBvciBhIHNhbmRib3hlZCBpZnJhbWUuIEZvciBzaW1wbGUgZGF0YSB0cmFuc2Zvcm1hdGlvbiwgbmV3IEZ1bmN0aW9uKCkgbWlnaHQgYmUgdXNlZFxuICogd2l0aCBjYXV0aW9uLlxuICovXG5mdW5jdGlvbiBleGVjdXRlRnVuY3Rpb24oXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG5fZnVuY3Rpb25Cb2R5LCBcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbl9yZXF1ZXN0KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiTW9ra3U6IGV4ZWN1dGVGdW5jdGlvbiBpcyBhIHBsYWNlaG9sZGVyIGFuZCBub3QgZnVsbHkgaW1wbGVtZW50ZWQuXCIpO1xuICAgICAgICAvLyBFeGFtcGxlOiBjb25zdCBmbiA9IG5ldyBGdW5jdGlvbigncmVxdWVzdCcsIGByZXR1cm4gKCR7ZnVuY3Rpb25Cb2R5fSkocmVxdWVzdClgKTtcbiAgICAgICAgLy8gcmV0dXJuIGZuKHJlcXVlc3QpO1xuICAgICAgICByZXR1cm4geyBtZXNzYWdlOiBcIkZ1bmN0aW9uIGV4ZWN1dGlvbiBwbGFjZWhvbGRlciByZXN1bHRcIiB9O1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZmluZE1hdGNoaW5nRHluYW1pY1VybCh1cmwsIG1ldGhvZCkge1xuICAgIC8vIFRoaXMgaXMgYSB2ZXJ5IGJhc2ljIG1hdGNoZXIuXG4gICAgLy8gRm9yIG1vcmUgY29tcGxleCBwYXR0ZXJucyAoZS5nLiwgL3VzZXJzLzppZCksIHlvdSdkIG5lZWQgYSByb2J1c3QgcGF0aC10by1yZWdleHAgbGlrZSBsaWJyYXJ5LlxuICAgIHJldHVybiBkeW5hbWljVXJsUGF0dGVybnMuZmluZCgoZW50cnkpID0+IHtcbiAgICAgICAgLy8gU2ltcGxlIGV4YWN0IG1hdGNoIGZvciBub3csIG9yIGltcGxlbWVudCB5b3VyIHBhdHRlcm4gbWF0Y2hpbmcgbG9naWMgaGVyZVxuICAgICAgICAvLyBFeGFtcGxlIGZvciB3aWxkY2FyZDogZW50cnkudXJsUGF0dGVybi5yZXBsYWNlKCcqJywgJy4qJykgYW5kIHVzZSByZWdleFxuICAgICAgICByZXR1cm4gZW50cnkudXJsUGF0dGVybiA9PT0gdXJsO1xuICAgIH0pO1xufVxuY2hyb21lLnJ1bnRpbWUub25Db25uZWN0LmFkZExpc3RlbmVyKChwb3J0KSA9PiB7XG4gICAgY29uc29sZS5sb2cocG9ydC5uYW1lKTtcbiAgICBpZiAocG9ydC5uYW1lID09PSBcIm1va2t1LWNvbnRlbnQtc2NyaXB0XCIpIHtcbiAgICAgICAgcG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicG9ydDogXCIsIGRhdGEpO1xuICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gXCJDSEVDS19NT0NLXCIpIHtcbiAgICAgICAgICAgICAgICAoKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb2NrID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAvLyAxLiBjaGVjayBmb3Igc3RhdGljXG4gICAgICAgICAgICAgICAgICAgIG1vY2sgPSB5aWVsZCBkYl8xLmRiLmZpbmRTdGF0aWNNb2NrKG1lc3NhZ2UucmVxdWVzdC51cmwsIG1lc3NhZ2UucmVxdWVzdC5tZXRob2QpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW1vY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHdpdGggZHluYW1pYyBtb2Nrc1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZHluYW1pY01hdGNoID0gZmluZE1hdGNoaW5nRHluYW1pY1VybChtZXNzYWdlLnJlcXVlc3QudXJsLCBtZXNzYWdlLnJlcXVlc3QubWV0aG9kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkeW5hbWljTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2NrID0geWllbGQgZGJfMS5kYi5maW5kTW9ja0J5SWQoZHluYW1pY01hdGNoLmxvY2FsSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IGluZm9ybSB0aGUgcGFuZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2NrLnR5cGUgPT09IFwiU1RBVElDXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHsgbW9ja1Jlc3BvbnNlOiBtb2NrIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobW9jay50eXBlID09PSBcIkZVTkNUSU9OXCIgJiYgbW9jay5mdW5jdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHlpZWxkIGV4ZWN1dGVGdW5jdGlvbihtb2NrLmZ1bmN0aW9uLCBtZXNzYWdlLnJlcXVlc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UoeyBtb2NrUmVzcG9uc2U6IHJlc3VsdCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9kbzogaW5mb3JtIHRoZSBwYW5lbFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZSh7IG1vY2tSZXNwb25zZTogdW5kZWZpbmVkIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuIiwiLy8gTWFraW5nIHRoZSBtb2R1bGUgdmVyc2lvbiBjb25zdW1hYmxlIHZpYSByZXF1aXJlIC0gdG8gcHJvaGliaXRcbi8vIG11bHRpcGxlIG9jY3VycmFuY2llcyBvZiB0aGUgc2FtZSBtb2R1bGUgaW4gdGhlIHNhbWUgYXBwXG4vLyAoZHVhbCBwYWNrYWdlIGhhemFyZCwgaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9wYWNrYWdlcy5odG1sI2R1YWwtcGFja2FnZS1oYXphcmQpXG5pbXBvcnQgX0RleGllIGZyb20gXCIuL2Rpc3QvZGV4aWUuanNcIjtcbmNvbnN0IERleGllU3ltYm9sID0gU3ltYm9sLmZvcihcIkRleGllXCIpO1xuY29uc3QgRGV4aWUgPSBnbG9iYWxUaGlzW0RleGllU3ltYm9sXSB8fCAoZ2xvYmFsVGhpc1tEZXhpZVN5bWJvbF0gPSBfRGV4aWUpO1xuaWYgKF9EZXhpZS5zZW1WZXIgIT09IERleGllLnNlbVZlcikge1xuICAgIHRocm93IG5ldyBFcnJvcihgVHdvIGRpZmZlcmVudCB2ZXJzaW9ucyBvZiBEZXhpZSBsb2FkZWQgaW4gdGhlIHNhbWUgYXBwOiAke19EZXhpZS5zZW1WZXJ9IGFuZCAke0RleGllLnNlbVZlcn1gKTtcbn1cbmNvbnN0IHsgbGl2ZVF1ZXJ5LCBtZXJnZVJhbmdlcywgcmFuZ2VzT3ZlcmxhcCwgUmFuZ2VTZXQsIGNtcCwgRW50aXR5LFxuICAgIFByb3BNb2RpZmljYXRpb24sIHJlcGxhY2VQcmVmaXgsIGFkZCwgcmVtb3ZlIH0gPSBEZXhpZTtcbmV4cG9ydCB7IGxpdmVRdWVyeSwgbWVyZ2VSYW5nZXMsIHJhbmdlc092ZXJsYXAsIFJhbmdlU2V0LCBjbXAsIERleGllLCBFbnRpdHksXG4gICAgUHJvcE1vZGlmaWNhdGlvbiwgcmVwbGFjZVByZWZpeCwgYWRkLCByZW1vdmUgfTtcbmV4cG9ydCBkZWZhdWx0IERleGllO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xucmVxdWlyZShcIi4vbW9ra3Utd2ViLWFwcC1jb25uZWN0b3Ivc2VydmljZS13b3JrZXJcIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=