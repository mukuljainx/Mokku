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
// Rename database for clarity (e.g., from "FriendsDatabase")
const localDb = new dexie_1.default("MokkuConnectorDB");
// Schema declaration:
localDb.version(1).stores({
    // 'localId' is the auto-incrementing primary key.
    // '[url+dynamicKey+method]' for specific mock lookups.
    // 'dynamicKey' as a simple index for queries like where({ dynamic: true }).
    mocks: "++localId, [url+dynamicKey+method], dynamicKey",
});
const getDynamicUrlPatterns = () => __awaiter(void 0, void 0, void 0, function* () {
    const activeDynamicMocks = yield localDb.mocks
        .where({ dynamicKey: 1 }) // Uses the 'dynamic' index
        // .filter((mock) => mock.active === true) // Ensure only active mocks are considered
        .toArray();
    return activeDynamicMocks.map((mock) => ({
        localId: mock.localId,
        urlPattern: mock.url,
    }));
});
const findStaticMock = (url, method) => __awaiter(void 0, void 0, void 0, function* () {
    // Find active, non-dynamic mocks matching the URL.
    // This query uses the [url+dynamic] compound index.
    return (localDb.mocks
        .where({ url, dynamicKey: 0, method })
        // .filter((mock) => mock.active === true) // Ensure only active mocks are considered
        .first());
});
const getAllMocks = () => __awaiter(void 0, void 0, void 0, function* () {
    return localDb.mocks.toArray();
});
const findMockById = (localId) => __awaiter(void 0, void 0, void 0, function* () {
    return localDb.mocks.get(localId);
});
const addMock = (mockData) => __awaiter(void 0, void 0, void 0, function* () {
    const storedMock = Object.assign(Object.assign({}, mockData), { dynamicKey: mockData.dynamic ? 1 : 0 });
    return localDb.mocks.add(storedMock);
});
exports.db = {
    getDynamicUrlPatterns,
    findStaticMock,
    findMockById,
    addMock,
    getAllMocks,
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
    if (port.name === "mokku-content-script") {
        port.onMessage.addListener((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data.type === "CHECK_MOCK") {
                const message = data.message;
                let mock = undefined;
                // 1. check for static
                mock = yield db_1.db.findStaticMock(message.request.url, message.request.method);
                // check with pathname
                if (!mock) {
                    const pathname = new URL(message.request.url).pathname;
                    mock = yield db_1.db.findStaticMock(pathname, message.request.method);
                }
                if (!mock) {
                    // check with dynamic mocks
                    const dynamicMatch = findMatchingDynamicUrl(message.request.url, message.request.method);
                    if (dynamicMatch) {
                        mock = yield db_1.db.findMockById(dynamicMatch.localId);
                    }
                }
                console.log("mock", mock);
                if (mock) {
                    port.postMessage({
                        mockResponse: mock,
                        id: data.id,
                        request: message.request,
                    });
                }
                else {
                    //todo: inform the panel
                    port.postMessage({
                        mockResponse: null,
                        id: data.id,
                        request: message.request,
                    });
                }
            }
        }));
    }
});
console.log(db_1.db.getAllMocks().then(console.log).catch(console.log));
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    console.log("Received message from:", sender.url);
    console.log("Message:", request);
    if (request.type === "NEW_MOCK") {
        db_1.db.addMock(request.data);
    }
    // Check the message content and perform actions
    if (request.greeting === "Hello from the website!") {
        // Send a response back to the website
        sendResponse({ farewell: "Goodbye from the extension!" });
    }
    // Return true to indicate that you will be sending a response asynchronously.
    // This is important if you need to do some work before sending the response.
    return true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBLEtBQUssSUFBSTtBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsbUJBQU8sQ0FBQyxpR0FBMEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Nb2trdS8uL25vZGVfbW9kdWxlcy9kZXhpZS9kaXN0L2RleGllLmpzIiwid2VicGFjazovL01va2t1Ly4vc3JjL21va2t1LXdlYi1hcHAtY29ubmVjdG9yL2RiLnRzIiwid2VicGFjazovL01va2t1Ly4vc3JjL21va2t1LXdlYi1hcHAtY29ubmVjdG9yL3NlcnZpY2Utd29ya2VyLnRzIiwid2VicGFjazovL01va2t1Ly4vbm9kZV9tb2R1bGVzL2RleGllL2ltcG9ydC13cmFwcGVyLm1qcyIsIndlYnBhY2s6Ly9Nb2trdS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Nb2trdS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vTW9ra3Uvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9Nb2trdS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL01va2t1L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9zcmMvYmFja2dyb3VuZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogRGV4aWUuanMgLSBhIG1pbmltYWxpc3RpYyB3cmFwcGVyIGZvciBJbmRleGVkREJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKlxuICogQnkgRGF2aWQgRmFobGFuZGVyLCBkYXZpZC5mYWhsYW5kZXJAZ21haWwuY29tXG4gKlxuICogVmVyc2lvbiA0LjAuMTEsIFdlZCBKYW4gMTUgMjAyNVxuICpcbiAqIGh0dHBzOi8vZGV4aWUub3JnXG4gKlxuICogQXBhY2hlIExpY2Vuc2UgVmVyc2lvbiAyLjAsIEphbnVhcnkgMjAwNCwgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL1xuICovXG4gXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAgIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5EZXhpZSA9IGZhY3RvcnkoKSk7XG59KSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgICAvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cbiAgICBQZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbiAgICBwdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXG4gICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuICAgIFJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxuICAgIEFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcbiAgICBJTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbiAgICBMT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxuICAgIE9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcbiAgICBQRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9XG4gICAgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XG4gICAgICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG4gICAgfVxuXG4gICAgdmFyIF9nbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDpcbiAgICAgICAgdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6XG4gICAgICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6XG4gICAgICAgICAgICAgICAgZ2xvYmFsO1xuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cztcbiAgICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG4gICAgaWYgKHR5cGVvZiBQcm9taXNlICE9PSAndW5kZWZpbmVkJyAmJiAhX2dsb2JhbC5Qcm9taXNlKSB7XG4gICAgICAgIF9nbG9iYWwuUHJvbWlzZSA9IFByb21pc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGV4dGVuZChvYmosIGV4dGVuc2lvbikge1xuICAgICAgICBpZiAodHlwZW9mIGV4dGVuc2lvbiAhPT0gJ29iamVjdCcpXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICBrZXlzKGV4dGVuc2lvbikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IGV4dGVuc2lvbltrZXldO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICAgIHZhciBfaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG4gICAgZnVuY3Rpb24gaGFzT3duKG9iaiwgcHJvcCkge1xuICAgICAgICByZXR1cm4gX2hhc093bi5jYWxsKG9iaiwgcHJvcCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHByb3BzKHByb3RvLCBleHRlbnNpb24pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBleHRlbnNpb24gPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICBleHRlbnNpb24gPSBleHRlbnNpb24oZ2V0UHJvdG8ocHJvdG8pKTtcbiAgICAgICAgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiID8ga2V5cyA6IFJlZmxlY3Qub3duS2V5cykoZXh0ZW5zaW9uKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHNldFByb3AocHJvdG8sIGtleSwgZXh0ZW5zaW9uW2tleV0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuICAgIGZ1bmN0aW9uIHNldFByb3Aob2JqLCBwcm9wLCBmdW5jdGlvbk9yR2V0U2V0LCBvcHRpb25zKSB7XG4gICAgICAgIGRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwgZXh0ZW5kKGZ1bmN0aW9uT3JHZXRTZXQgJiYgaGFzT3duKGZ1bmN0aW9uT3JHZXRTZXQsIFwiZ2V0XCIpICYmIHR5cGVvZiBmdW5jdGlvbk9yR2V0U2V0LmdldCA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgICB7IGdldDogZnVuY3Rpb25PckdldFNldC5nZXQsIHNldDogZnVuY3Rpb25PckdldFNldC5zZXQsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IDpcbiAgICAgICAgICAgIHsgdmFsdWU6IGZ1bmN0aW9uT3JHZXRTZXQsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSwgb3B0aW9ucykpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkZXJpdmUoQ2hpbGQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZyb206IGZ1bmN0aW9uIChQYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBDaGlsZC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhcmVudC5wcm90b3R5cGUpO1xuICAgICAgICAgICAgICAgIHNldFByb3AoQ2hpbGQucHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIENoaWxkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBleHRlbmQ6IHByb3BzLmJpbmQobnVsbCwgQ2hpbGQucHJvdG90eXBlKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAgIGZ1bmN0aW9uIGdldFByb3BlcnR5RGVzY3JpcHRvcihvYmosIHByb3ApIHtcbiAgICAgICAgdmFyIHBkID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgcHJvcCk7XG4gICAgICAgIHZhciBwcm90bztcbiAgICAgICAgcmV0dXJuIHBkIHx8IChwcm90byA9IGdldFByb3RvKG9iaikpICYmIGdldFByb3BlcnR5RGVzY3JpcHRvcihwcm90bywgcHJvcCk7XG4gICAgfVxuICAgIHZhciBfc2xpY2UgPSBbXS5zbGljZTtcbiAgICBmdW5jdGlvbiBzbGljZShhcmdzLCBzdGFydCwgZW5kKSB7XG4gICAgICAgIHJldHVybiBfc2xpY2UuY2FsbChhcmdzLCBzdGFydCwgZW5kKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb3ZlcnJpZGUob3JpZ0Z1bmMsIG92ZXJyaWRlZEZhY3RvcnkpIHtcbiAgICAgICAgcmV0dXJuIG92ZXJyaWRlZEZhY3Rvcnkob3JpZ0Z1bmMpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhc3NlcnQoYikge1xuICAgICAgICBpZiAoIWIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBc3NlcnRpb24gRmFpbGVkXCIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhc2FwJDEoZm4pIHtcbiAgICAgICAgaWYgKF9nbG9iYWwuc2V0SW1tZWRpYXRlKVxuICAgICAgICAgICAgc2V0SW1tZWRpYXRlKGZuKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFycmF5VG9PYmplY3QoYXJyYXksIGV4dHJhY3Rvcikge1xuICAgICAgICByZXR1cm4gYXJyYXkucmVkdWNlKGZ1bmN0aW9uIChyZXN1bHQsIGl0ZW0sIGkpIHtcbiAgICAgICAgICAgIHZhciBuYW1lQW5kVmFsdWUgPSBleHRyYWN0b3IoaXRlbSwgaSk7XG4gICAgICAgICAgICBpZiAobmFtZUFuZFZhbHVlKVxuICAgICAgICAgICAgICAgIHJlc3VsdFtuYW1lQW5kVmFsdWVbMF1dID0gbmFtZUFuZFZhbHVlWzFdO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSwge30pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRCeUtleVBhdGgob2JqLCBrZXlQYXRoKSB7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5UGF0aCA9PT0gJ3N0cmluZycgJiYgaGFzT3duKG9iaiwga2V5UGF0aCkpXG4gICAgICAgICAgICByZXR1cm4gb2JqW2tleVBhdGhdO1xuICAgICAgICBpZiAoIWtleVBhdGgpXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICBpZiAodHlwZW9mIGtleVBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YXIgcnYgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0ga2V5UGF0aC5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZ2V0QnlLZXlQYXRoKG9iaiwga2V5UGF0aFtpXSk7XG4gICAgICAgICAgICAgICAgcnYucHVzaCh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJ2O1xuICAgICAgICB9XG4gICAgICAgIHZhciBwZXJpb2QgPSBrZXlQYXRoLmluZGV4T2YoJy4nKTtcbiAgICAgICAgaWYgKHBlcmlvZCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHZhciBpbm5lck9iaiA9IG9ialtrZXlQYXRoLnN1YnN0cigwLCBwZXJpb2QpXTtcbiAgICAgICAgICAgIHJldHVybiBpbm5lck9iaiA9PSBudWxsID8gdW5kZWZpbmVkIDogZ2V0QnlLZXlQYXRoKGlubmVyT2JqLCBrZXlQYXRoLnN1YnN0cihwZXJpb2QgKyAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0QnlLZXlQYXRoKG9iaiwga2V5UGF0aCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKCFvYmogfHwga2V5UGF0aCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoJ2lzRnJvemVuJyBpbiBPYmplY3QgJiYgT2JqZWN0LmlzRnJvemVuKG9iaikpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh0eXBlb2Yga2V5UGF0aCAhPT0gJ3N0cmluZycgJiYgJ2xlbmd0aCcgaW4ga2V5UGF0aCkge1xuICAgICAgICAgICAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgJiYgJ2xlbmd0aCcgaW4gdmFsdWUpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBrZXlQYXRoLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgICAgICAgIHNldEJ5S2V5UGF0aChvYmosIGtleVBhdGhbaV0sIHZhbHVlW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBwZXJpb2QgPSBrZXlQYXRoLmluZGV4T2YoJy4nKTtcbiAgICAgICAgICAgIGlmIChwZXJpb2QgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRLZXlQYXRoID0ga2V5UGF0aC5zdWJzdHIoMCwgcGVyaW9kKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVtYWluaW5nS2V5UGF0aCA9IGtleVBhdGguc3Vic3RyKHBlcmlvZCArIDEpO1xuICAgICAgICAgICAgICAgIGlmIChyZW1haW5pbmdLZXlQYXRoID09PSBcIlwiKVxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkob2JqKSAmJiAhaXNOYU4ocGFyc2VJbnQoY3VycmVudEtleVBhdGgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouc3BsaWNlKGN1cnJlbnRLZXlQYXRoLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgb2JqW2N1cnJlbnRLZXlQYXRoXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbY3VycmVudEtleVBhdGhdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbm5lck9iaiA9IG9ialtjdXJyZW50S2V5UGF0aF07XG4gICAgICAgICAgICAgICAgICAgIGlmICghaW5uZXJPYmogfHwgIWhhc093bihvYmosIGN1cnJlbnRLZXlQYXRoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyT2JqID0gKG9ialtjdXJyZW50S2V5UGF0aF0gPSB7fSk7XG4gICAgICAgICAgICAgICAgICAgIHNldEJ5S2V5UGF0aChpbm5lck9iaiwgcmVtYWluaW5nS2V5UGF0aCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KG9iaikgJiYgIWlzTmFOKHBhcnNlSW50KGtleVBhdGgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zcGxpY2Uoa2V5UGF0aCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmpba2V5UGF0aF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgb2JqW2tleVBhdGhdID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZGVsQnlLZXlQYXRoKG9iaiwga2V5UGF0aCkge1xuICAgICAgICBpZiAodHlwZW9mIGtleVBhdGggPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgc2V0QnlLZXlQYXRoKG9iaiwga2V5UGF0aCwgdW5kZWZpbmVkKTtcbiAgICAgICAgZWxzZSBpZiAoJ2xlbmd0aCcgaW4ga2V5UGF0aClcbiAgICAgICAgICAgIFtdLm1hcC5jYWxsKGtleVBhdGgsIGZ1bmN0aW9uIChrcCkge1xuICAgICAgICAgICAgICAgIHNldEJ5S2V5UGF0aChvYmosIGtwLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNoYWxsb3dDbG9uZShvYmopIHtcbiAgICAgICAgdmFyIHJ2ID0ge307XG4gICAgICAgIGZvciAodmFyIG0gaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duKG9iaiwgbSkpXG4gICAgICAgICAgICAgICAgcnZbbV0gPSBvYmpbbV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJ2O1xuICAgIH1cbiAgICB2YXIgY29uY2F0ID0gW10uY29uY2F0O1xuICAgIGZ1bmN0aW9uIGZsYXR0ZW4oYSkge1xuICAgICAgICByZXR1cm4gY29uY2F0LmFwcGx5KFtdLCBhKTtcbiAgICB9XG4gICAgdmFyIGludHJpbnNpY1R5cGVOYW1lcyA9IFwiQmlnVWludDY0QXJyYXksQmlnSW50NjRBcnJheSxBcnJheSxCb29sZWFuLFN0cmluZyxEYXRlLFJlZ0V4cCxCbG9iLEZpbGUsRmlsZUxpc3QsRmlsZVN5c3RlbUZpbGVIYW5kbGUsRmlsZVN5c3RlbURpcmVjdG9yeUhhbmRsZSxBcnJheUJ1ZmZlcixEYXRhVmlldyxVaW50OENsYW1wZWRBcnJheSxJbWFnZUJpdG1hcCxJbWFnZURhdGEsTWFwLFNldCxDcnlwdG9LZXlcIlxuICAgICAgICAuc3BsaXQoJywnKS5jb25jYXQoZmxhdHRlbihbOCwgMTYsIDMyLCA2NF0ubWFwKGZ1bmN0aW9uIChudW0pIHsgcmV0dXJuIFtcIkludFwiLCBcIlVpbnRcIiwgXCJGbG9hdFwiXS5tYXAoZnVuY3Rpb24gKHQpIHsgcmV0dXJuIHQgKyBudW0gKyBcIkFycmF5XCI7IH0pOyB9KSkpLmZpbHRlcihmdW5jdGlvbiAodCkgeyByZXR1cm4gX2dsb2JhbFt0XTsgfSk7XG4gICAgdmFyIGludHJpbnNpY1R5cGVzID0gbmV3IFNldChpbnRyaW5zaWNUeXBlTmFtZXMubWFwKGZ1bmN0aW9uICh0KSB7IHJldHVybiBfZ2xvYmFsW3RdOyB9KSk7XG4gICAgZnVuY3Rpb24gY2xvbmVTaW1wbGVPYmplY3RUcmVlKG8pIHtcbiAgICAgICAgdmFyIHJ2ID0ge307XG4gICAgICAgIGZvciAodmFyIGsgaW4gbylcbiAgICAgICAgICAgIGlmIChoYXNPd24obywgaykpIHtcbiAgICAgICAgICAgICAgICB2YXIgdiA9IG9ba107XG4gICAgICAgICAgICAgICAgcnZba10gPSAhdiB8fCB0eXBlb2YgdiAhPT0gJ29iamVjdCcgfHwgaW50cmluc2ljVHlwZXMuaGFzKHYuY29uc3RydWN0b3IpID8gdiA6IGNsb25lU2ltcGxlT2JqZWN0VHJlZSh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJ2O1xuICAgIH1cbiAgICBmdW5jdGlvbiBvYmplY3RJc0VtcHR5KG8pIHtcbiAgICAgICAgZm9yICh2YXIgayBpbiBvKVxuICAgICAgICAgICAgaWYgKGhhc093bihvLCBrKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB2YXIgY2lyY3VsYXJSZWZzID0gbnVsbDtcbiAgICBmdW5jdGlvbiBkZWVwQ2xvbmUoYW55KSB7XG4gICAgICAgIGNpcmN1bGFyUmVmcyA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgIHZhciBydiA9IGlubmVyRGVlcENsb25lKGFueSk7XG4gICAgICAgIGNpcmN1bGFyUmVmcyA9IG51bGw7XG4gICAgICAgIHJldHVybiBydjtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5uZXJEZWVwQ2xvbmUoeCkge1xuICAgICAgICBpZiAoIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnKVxuICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgIHZhciBydiA9IGNpcmN1bGFyUmVmcy5nZXQoeCk7XG4gICAgICAgIGlmIChydilcbiAgICAgICAgICAgIHJldHVybiBydjtcbiAgICAgICAgaWYgKGlzQXJyYXkoeCkpIHtcbiAgICAgICAgICAgIHJ2ID0gW107XG4gICAgICAgICAgICBjaXJjdWxhclJlZnMuc2V0KHgsIHJ2KTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0geC5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgICAgICBydi5wdXNoKGlubmVyRGVlcENsb25lKHhbaV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbnRyaW5zaWNUeXBlcy5oYXMoeC5jb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgICAgIHJ2ID0geDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBwcm90byA9IGdldFByb3RvKHgpO1xuICAgICAgICAgICAgcnYgPSBwcm90byA9PT0gT2JqZWN0LnByb3RvdHlwZSA/IHt9IDogT2JqZWN0LmNyZWF0ZShwcm90byk7XG4gICAgICAgICAgICBjaXJjdWxhclJlZnMuc2V0KHgsIHJ2KTtcbiAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4geCkge1xuICAgICAgICAgICAgICAgIGlmIChoYXNPd24oeCwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcnZbcHJvcF0gPSBpbm5lckRlZXBDbG9uZSh4W3Byb3BdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJ2O1xuICAgIH1cbiAgICB2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcbiAgICBmdW5jdGlvbiB0b1N0cmluZ1RhZyhvKSB7XG4gICAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgICB9XG4gICAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgP1xuICAgICAgICBTeW1ib2wuaXRlcmF0b3IgOlxuICAgICAgICAnQEBpdGVyYXRvcic7XG4gICAgdmFyIGdldEl0ZXJhdG9yT2YgPSB0eXBlb2YgaXRlcmF0b3JTeW1ib2wgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAoeCkge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgcmV0dXJuIHggIT0gbnVsbCAmJiAoaSA9IHhbaXRlcmF0b3JTeW1ib2xdKSAmJiBpLmFwcGx5KHgpO1xuICAgIH0gOiBmdW5jdGlvbiAoKSB7IHJldHVybiBudWxsOyB9O1xuICAgIGZ1bmN0aW9uIGRlbEFycmF5SXRlbShhLCB4KSB7XG4gICAgICAgIHZhciBpID0gYS5pbmRleE9mKHgpO1xuICAgICAgICBpZiAoaSA+PSAwKVxuICAgICAgICAgICAgYS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHJldHVybiBpID49IDA7XG4gICAgfVxuICAgIHZhciBOT19DSEFSX0FSUkFZID0ge307XG4gICAgZnVuY3Rpb24gZ2V0QXJyYXlPZihhcnJheUxpa2UpIHtcbiAgICAgICAgdmFyIGksIGEsIHgsIGl0O1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoYXJyYXlMaWtlKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXlMaWtlLnNsaWNlKCk7XG4gICAgICAgICAgICBpZiAodGhpcyA9PT0gTk9fQ0hBUl9BUlJBWSAmJiB0eXBlb2YgYXJyYXlMaWtlID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICByZXR1cm4gW2FycmF5TGlrZV07XG4gICAgICAgICAgICBpZiAoKGl0ID0gZ2V0SXRlcmF0b3JPZihhcnJheUxpa2UpKSkge1xuICAgICAgICAgICAgICAgIGEgPSBbXTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoKHggPSBpdC5uZXh0KCkpLCAheC5kb25lKVxuICAgICAgICAgICAgICAgICAgICBhLnB1c2goeC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXJyYXlMaWtlID09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFthcnJheUxpa2VdO1xuICAgICAgICAgICAgaSA9IGFycmF5TGlrZS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgYSA9IG5ldyBBcnJheShpKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKVxuICAgICAgICAgICAgICAgICAgICBhW2ldID0gYXJyYXlMaWtlW2ldO1xuICAgICAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFthcnJheUxpa2VdO1xuICAgICAgICB9XG4gICAgICAgIGkgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICBhID0gbmV3IEFycmF5KGkpO1xuICAgICAgICB3aGlsZSAoaS0tKVxuICAgICAgICAgICAgYVtpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIHZhciBpc0FzeW5jRnVuY3Rpb24gPSB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IGZ1bmN0aW9uIChmbikgeyByZXR1cm4gZm5bU3ltYm9sLnRvU3RyaW5nVGFnXSA9PT0gJ0FzeW5jRnVuY3Rpb24nOyB9XG4gICAgICAgIDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH07XG5cbiAgICB2YXIgZGV4aWVFcnJvck5hbWVzID0gW1xuICAgICAgICAnTW9kaWZ5JyxcbiAgICAgICAgJ0J1bGsnLFxuICAgICAgICAnT3BlbkZhaWxlZCcsXG4gICAgICAgICdWZXJzaW9uQ2hhbmdlJyxcbiAgICAgICAgJ1NjaGVtYScsXG4gICAgICAgICdVcGdyYWRlJyxcbiAgICAgICAgJ0ludmFsaWRUYWJsZScsXG4gICAgICAgICdNaXNzaW5nQVBJJyxcbiAgICAgICAgJ05vU3VjaERhdGFiYXNlJyxcbiAgICAgICAgJ0ludmFsaWRBcmd1bWVudCcsXG4gICAgICAgICdTdWJUcmFuc2FjdGlvbicsXG4gICAgICAgICdVbnN1cHBvcnRlZCcsXG4gICAgICAgICdJbnRlcm5hbCcsXG4gICAgICAgICdEYXRhYmFzZUNsb3NlZCcsXG4gICAgICAgICdQcmVtYXR1cmVDb21taXQnLFxuICAgICAgICAnRm9yZWlnbkF3YWl0J1xuICAgIF07XG4gICAgdmFyIGlkYkRvbUVycm9yTmFtZXMgPSBbXG4gICAgICAgICdVbmtub3duJyxcbiAgICAgICAgJ0NvbnN0cmFpbnQnLFxuICAgICAgICAnRGF0YScsXG4gICAgICAgICdUcmFuc2FjdGlvbkluYWN0aXZlJyxcbiAgICAgICAgJ1JlYWRPbmx5JyxcbiAgICAgICAgJ1ZlcnNpb24nLFxuICAgICAgICAnTm90Rm91bmQnLFxuICAgICAgICAnSW52YWxpZFN0YXRlJyxcbiAgICAgICAgJ0ludmFsaWRBY2Nlc3MnLFxuICAgICAgICAnQWJvcnQnLFxuICAgICAgICAnVGltZW91dCcsXG4gICAgICAgICdRdW90YUV4Y2VlZGVkJyxcbiAgICAgICAgJ1N5bnRheCcsXG4gICAgICAgICdEYXRhQ2xvbmUnXG4gICAgXTtcbiAgICB2YXIgZXJyb3JMaXN0ID0gZGV4aWVFcnJvck5hbWVzLmNvbmNhdChpZGJEb21FcnJvck5hbWVzKTtcbiAgICB2YXIgZGVmYXVsdFRleHRzID0ge1xuICAgICAgICBWZXJzaW9uQ2hhbmdlZDogXCJEYXRhYmFzZSB2ZXJzaW9uIGNoYW5nZWQgYnkgb3RoZXIgZGF0YWJhc2UgY29ubmVjdGlvblwiLFxuICAgICAgICBEYXRhYmFzZUNsb3NlZDogXCJEYXRhYmFzZSBoYXMgYmVlbiBjbG9zZWRcIixcbiAgICAgICAgQWJvcnQ6IFwiVHJhbnNhY3Rpb24gYWJvcnRlZFwiLFxuICAgICAgICBUcmFuc2FjdGlvbkluYWN0aXZlOiBcIlRyYW5zYWN0aW9uIGhhcyBhbHJlYWR5IGNvbXBsZXRlZCBvciBmYWlsZWRcIixcbiAgICAgICAgTWlzc2luZ0FQSTogXCJJbmRleGVkREIgQVBJIG1pc3NpbmcuIFBsZWFzZSB2aXNpdCBodHRwczovL3Rpbnl1cmwuY29tL3kydXV2c2tiXCJcbiAgICB9O1xuICAgIGZ1bmN0aW9uIERleGllRXJyb3IobmFtZSwgbXNnKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1zZztcbiAgICB9XG4gICAgZGVyaXZlKERleGllRXJyb3IpLmZyb20oRXJyb3IpLmV4dGVuZCh7XG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLm5hbWUgKyBcIjogXCIgKyB0aGlzLm1lc3NhZ2U7IH1cbiAgICB9KTtcbiAgICBmdW5jdGlvbiBnZXRNdWx0aUVycm9yTWVzc2FnZShtc2csIGZhaWx1cmVzKSB7XG4gICAgICAgIHJldHVybiBtc2cgKyBcIi4gRXJyb3JzOiBcIiArIE9iamVjdC5rZXlzKGZhaWx1cmVzKVxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBmYWlsdXJlc1trZXldLnRvU3RyaW5nKCk7IH0pXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uICh2LCBpLCBzKSB7IHJldHVybiBzLmluZGV4T2YodikgPT09IGk7IH0pXG4gICAgICAgICAgICAuam9pbignXFxuJyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIE1vZGlmeUVycm9yKG1zZywgZmFpbHVyZXMsIHN1Y2Nlc3NDb3VudCwgZmFpbGVkS2V5cykge1xuICAgICAgICB0aGlzLmZhaWx1cmVzID0gZmFpbHVyZXM7XG4gICAgICAgIHRoaXMuZmFpbGVkS2V5cyA9IGZhaWxlZEtleXM7XG4gICAgICAgIHRoaXMuc3VjY2Vzc0NvdW50ID0gc3VjY2Vzc0NvdW50O1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBnZXRNdWx0aUVycm9yTWVzc2FnZShtc2csIGZhaWx1cmVzKTtcbiAgICB9XG4gICAgZGVyaXZlKE1vZGlmeUVycm9yKS5mcm9tKERleGllRXJyb3IpO1xuICAgIGZ1bmN0aW9uIEJ1bGtFcnJvcihtc2csIGZhaWx1cmVzKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiQnVsa0Vycm9yXCI7XG4gICAgICAgIHRoaXMuZmFpbHVyZXMgPSBPYmplY3Qua2V5cyhmYWlsdXJlcykubWFwKGZ1bmN0aW9uIChwb3MpIHsgcmV0dXJuIGZhaWx1cmVzW3Bvc107IH0pO1xuICAgICAgICB0aGlzLmZhaWx1cmVzQnlQb3MgPSBmYWlsdXJlcztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gZ2V0TXVsdGlFcnJvck1lc3NhZ2UobXNnLCB0aGlzLmZhaWx1cmVzKTtcbiAgICB9XG4gICAgZGVyaXZlKEJ1bGtFcnJvcikuZnJvbShEZXhpZUVycm9yKTtcbiAgICB2YXIgZXJybmFtZXMgPSBlcnJvckxpc3QucmVkdWNlKGZ1bmN0aW9uIChvYmosIG5hbWUpIHsgcmV0dXJuIChvYmpbbmFtZV0gPSBuYW1lICsgXCJFcnJvclwiLCBvYmopOyB9LCB7fSk7XG4gICAgdmFyIEJhc2VFeGNlcHRpb24gPSBEZXhpZUVycm9yO1xuICAgIHZhciBleGNlcHRpb25zID0gZXJyb3JMaXN0LnJlZHVjZShmdW5jdGlvbiAob2JqLCBuYW1lKSB7XG4gICAgICAgIHZhciBmdWxsTmFtZSA9IG5hbWUgKyBcIkVycm9yXCI7XG4gICAgICAgIGZ1bmN0aW9uIERleGllRXJyb3IobXNnT3JJbm5lciwgaW5uZXIpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IGZ1bGxOYW1lO1xuICAgICAgICAgICAgaWYgKCFtc2dPcklubmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gZGVmYXVsdFRleHRzW25hbWVdIHx8IGZ1bGxOYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG1zZ09ySW5uZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gXCJcIi5jb25jYXQobXNnT3JJbm5lcikuY29uY2F0KCFpbm5lciA/ICcnIDogJ1xcbiAnICsgaW5uZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXIgPSBpbm5lciB8fCBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG1zZ09ySW5uZXIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gXCJcIi5jb25jYXQobXNnT3JJbm5lci5uYW1lLCBcIiBcIikuY29uY2F0KG1zZ09ySW5uZXIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lciA9IG1zZ09ySW5uZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZGVyaXZlKERleGllRXJyb3IpLmZyb20oQmFzZUV4Y2VwdGlvbik7XG4gICAgICAgIG9ialtuYW1lXSA9IERleGllRXJyb3I7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfSwge30pO1xuICAgIGV4Y2VwdGlvbnMuU3ludGF4ID0gU3ludGF4RXJyb3I7XG4gICAgZXhjZXB0aW9ucy5UeXBlID0gVHlwZUVycm9yO1xuICAgIGV4Y2VwdGlvbnMuUmFuZ2UgPSBSYW5nZUVycm9yO1xuICAgIHZhciBleGNlcHRpb25NYXAgPSBpZGJEb21FcnJvck5hbWVzLnJlZHVjZShmdW5jdGlvbiAob2JqLCBuYW1lKSB7XG4gICAgICAgIG9ialtuYW1lICsgXCJFcnJvclwiXSA9IGV4Y2VwdGlvbnNbbmFtZV07XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfSwge30pO1xuICAgIGZ1bmN0aW9uIG1hcEVycm9yKGRvbUVycm9yLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmICghZG9tRXJyb3IgfHwgZG9tRXJyb3IgaW5zdGFuY2VvZiBEZXhpZUVycm9yIHx8IGRvbUVycm9yIGluc3RhbmNlb2YgVHlwZUVycm9yIHx8IGRvbUVycm9yIGluc3RhbmNlb2YgU3ludGF4RXJyb3IgfHwgIWRvbUVycm9yLm5hbWUgfHwgIWV4Y2VwdGlvbk1hcFtkb21FcnJvci5uYW1lXSlcbiAgICAgICAgICAgIHJldHVybiBkb21FcnJvcjtcbiAgICAgICAgdmFyIHJ2ID0gbmV3IGV4Y2VwdGlvbk1hcFtkb21FcnJvci5uYW1lXShtZXNzYWdlIHx8IGRvbUVycm9yLm1lc3NhZ2UsIGRvbUVycm9yKTtcbiAgICAgICAgaWYgKFwic3RhY2tcIiBpbiBkb21FcnJvcikge1xuICAgICAgICAgICAgc2V0UHJvcChydiwgXCJzdGFja1wiLCB7IGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbm5lci5zdGFjaztcbiAgICAgICAgICAgICAgICB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBydjtcbiAgICB9XG4gICAgdmFyIGZ1bGxOYW1lRXhjZXB0aW9ucyA9IGVycm9yTGlzdC5yZWR1Y2UoZnVuY3Rpb24gKG9iaiwgbmFtZSkge1xuICAgICAgICBpZiAoW1wiU3ludGF4XCIsIFwiVHlwZVwiLCBcIlJhbmdlXCJdLmluZGV4T2YobmFtZSkgPT09IC0xKVxuICAgICAgICAgICAgb2JqW25hbWUgKyBcIkVycm9yXCJdID0gZXhjZXB0aW9uc1tuYW1lXTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9LCB7fSk7XG4gICAgZnVsbE5hbWVFeGNlcHRpb25zLk1vZGlmeUVycm9yID0gTW9kaWZ5RXJyb3I7XG4gICAgZnVsbE5hbWVFeGNlcHRpb25zLkRleGllRXJyb3IgPSBEZXhpZUVycm9yO1xuICAgIGZ1bGxOYW1lRXhjZXB0aW9ucy5CdWxrRXJyb3IgPSBCdWxrRXJyb3I7XG5cbiAgICBmdW5jdGlvbiBub3AoKSB7IH1cbiAgICBmdW5jdGlvbiBtaXJyb3IodmFsKSB7IHJldHVybiB2YWw7IH1cbiAgICBmdW5jdGlvbiBwdXJlRnVuY3Rpb25DaGFpbihmMSwgZjIpIHtcbiAgICAgICAgaWYgKGYxID09IG51bGwgfHwgZjEgPT09IG1pcnJvcilcbiAgICAgICAgICAgIHJldHVybiBmMjtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiBmMihmMSh2YWwpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2FsbEJvdGgob24xLCBvbjIpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9uMS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgb24yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhvb2tDcmVhdGluZ0NoYWluKGYxLCBmMikge1xuICAgICAgICBpZiAoZjEgPT09IG5vcClcbiAgICAgICAgICAgIHJldHVybiBmMjtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBmMS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgaWYgKHJlcyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIGFyZ3VtZW50c1swXSA9IHJlcztcbiAgICAgICAgICAgIHZhciBvbnN1Y2Nlc3MgPSB0aGlzLm9uc3VjY2VzcyxcbiAgICAgICAgICAgIG9uZXJyb3IgPSB0aGlzLm9uZXJyb3I7XG4gICAgICAgICAgICB0aGlzLm9uc3VjY2VzcyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgdmFyIHJlczIgPSBmMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgaWYgKG9uc3VjY2VzcylcbiAgICAgICAgICAgICAgICB0aGlzLm9uc3VjY2VzcyA9IHRoaXMub25zdWNjZXNzID8gY2FsbEJvdGgob25zdWNjZXNzLCB0aGlzLm9uc3VjY2VzcykgOiBvbnN1Y2Nlc3M7XG4gICAgICAgICAgICBpZiAob25lcnJvcilcbiAgICAgICAgICAgICAgICB0aGlzLm9uZXJyb3IgPSB0aGlzLm9uZXJyb3IgPyBjYWxsQm90aChvbmVycm9yLCB0aGlzLm9uZXJyb3IpIDogb25lcnJvcjtcbiAgICAgICAgICAgIHJldHVybiByZXMyICE9PSB1bmRlZmluZWQgPyByZXMyIDogcmVzO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBob29rRGVsZXRpbmdDaGFpbihmMSwgZjIpIHtcbiAgICAgICAgaWYgKGYxID09PSBub3ApXG4gICAgICAgICAgICByZXR1cm4gZjI7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmMS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgdmFyIG9uc3VjY2VzcyA9IHRoaXMub25zdWNjZXNzLFxuICAgICAgICAgICAgb25lcnJvciA9IHRoaXMub25lcnJvcjtcbiAgICAgICAgICAgIHRoaXMub25zdWNjZXNzID0gdGhpcy5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIGYyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBpZiAob25zdWNjZXNzKVxuICAgICAgICAgICAgICAgIHRoaXMub25zdWNjZXNzID0gdGhpcy5vbnN1Y2Nlc3MgPyBjYWxsQm90aChvbnN1Y2Nlc3MsIHRoaXMub25zdWNjZXNzKSA6IG9uc3VjY2VzcztcbiAgICAgICAgICAgIGlmIChvbmVycm9yKVxuICAgICAgICAgICAgICAgIHRoaXMub25lcnJvciA9IHRoaXMub25lcnJvciA/IGNhbGxCb3RoKG9uZXJyb3IsIHRoaXMub25lcnJvcikgOiBvbmVycm9yO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBob29rVXBkYXRpbmdDaGFpbihmMSwgZjIpIHtcbiAgICAgICAgaWYgKGYxID09PSBub3ApXG4gICAgICAgICAgICByZXR1cm4gZjI7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobW9kaWZpY2F0aW9ucykge1xuICAgICAgICAgICAgdmFyIHJlcyA9IGYxLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBleHRlbmQobW9kaWZpY2F0aW9ucywgcmVzKTtcbiAgICAgICAgICAgIHZhciBvbnN1Y2Nlc3MgPSB0aGlzLm9uc3VjY2VzcyxcbiAgICAgICAgICAgIG9uZXJyb3IgPSB0aGlzLm9uZXJyb3I7XG4gICAgICAgICAgICB0aGlzLm9uc3VjY2VzcyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgdmFyIHJlczIgPSBmMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgaWYgKG9uc3VjY2VzcylcbiAgICAgICAgICAgICAgICB0aGlzLm9uc3VjY2VzcyA9IHRoaXMub25zdWNjZXNzID8gY2FsbEJvdGgob25zdWNjZXNzLCB0aGlzLm9uc3VjY2VzcykgOiBvbnN1Y2Nlc3M7XG4gICAgICAgICAgICBpZiAob25lcnJvcilcbiAgICAgICAgICAgICAgICB0aGlzLm9uZXJyb3IgPSB0aGlzLm9uZXJyb3IgPyBjYWxsQm90aChvbmVycm9yLCB0aGlzLm9uZXJyb3IpIDogb25lcnJvcjtcbiAgICAgICAgICAgIHJldHVybiByZXMgPT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICAgICAgKHJlczIgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHJlczIpIDpcbiAgICAgICAgICAgICAgICAoZXh0ZW5kKHJlcywgcmVzMikpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXZlcnNlU3RvcHBhYmxlRXZlbnRDaGFpbihmMSwgZjIpIHtcbiAgICAgICAgaWYgKGYxID09PSBub3ApXG4gICAgICAgICAgICByZXR1cm4gZjI7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoZjIuYXBwbHkodGhpcywgYXJndW1lbnRzKSA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGYxLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHByb21pc2FibGVDaGFpbihmMSwgZjIpIHtcbiAgICAgICAgaWYgKGYxID09PSBub3ApXG4gICAgICAgICAgICByZXR1cm4gZjI7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzID0gZjEuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGlmIChyZXMgJiYgdHlwZW9mIHJlcy50aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXogPSB0aGlzLCBpID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShpKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaS0tKVxuICAgICAgICAgICAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmMi5hcHBseSh0aGl6LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBkZWJ1ZyA9IHR5cGVvZiBsb2NhdGlvbiAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgL14oaHR0cHxodHRwcyk6XFwvXFwvKGxvY2FsaG9zdHwxMjdcXC4wXFwuMFxcLjEpLy50ZXN0KGxvY2F0aW9uLmhyZWYpO1xuICAgIGZ1bmN0aW9uIHNldERlYnVnKHZhbHVlLCBmaWx0ZXIpIHtcbiAgICAgICAgZGVidWcgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICB2YXIgSU5URVJOQUwgPSB7fTtcbiAgICB2YXIgWk9ORV9FQ0hPX0xJTUlUID0gMTAwLCBfYSQxID0gdHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnID9cbiAgICAgICAgW10gOlxuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGdsb2JhbFAgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY3J5cHRvID09PSAndW5kZWZpbmVkJyB8fCAhY3J5cHRvLnN1YnRsZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gW2dsb2JhbFAsIGdldFByb3RvKGdsb2JhbFApLCBnbG9iYWxQXTtcbiAgICAgICAgICAgIHZhciBuYXRpdmVQID0gY3J5cHRvLnN1YnRsZS5kaWdlc3QoXCJTSEEtNTEyXCIsIG5ldyBVaW50OEFycmF5KFswXSkpO1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICBuYXRpdmVQLFxuICAgICAgICAgICAgICAgIGdldFByb3RvKG5hdGl2ZVApLFxuICAgICAgICAgICAgICAgIGdsb2JhbFBcbiAgICAgICAgICAgIF07XG4gICAgICAgIH0pKCksIHJlc29sdmVkTmF0aXZlUHJvbWlzZSA9IF9hJDFbMF0sIG5hdGl2ZVByb21pc2VQcm90byA9IF9hJDFbMV0sIHJlc29sdmVkR2xvYmFsUHJvbWlzZSA9IF9hJDFbMl0sIG5hdGl2ZVByb21pc2VUaGVuID0gbmF0aXZlUHJvbWlzZVByb3RvICYmIG5hdGl2ZVByb21pc2VQcm90by50aGVuO1xuICAgIHZhciBOYXRpdmVQcm9taXNlID0gcmVzb2x2ZWROYXRpdmVQcm9taXNlICYmIHJlc29sdmVkTmF0aXZlUHJvbWlzZS5jb25zdHJ1Y3RvcjtcbiAgICB2YXIgcGF0Y2hHbG9iYWxQcm9taXNlID0gISFyZXNvbHZlZEdsb2JhbFByb21pc2U7XG4gICAgZnVuY3Rpb24gc2NoZWR1bGVQaHlzaWNhbFRpY2soKSB7XG4gICAgICAgIHF1ZXVlTWljcm90YXNrKHBoeXNpY2FsVGljayk7XG4gICAgfVxuICAgIHZhciBhc2FwID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBhcmdzKSB7XG4gICAgICAgIG1pY3JvdGlja1F1ZXVlLnB1c2goW2NhbGxiYWNrLCBhcmdzXSk7XG4gICAgICAgIGlmIChuZWVkc05ld1BoeXNpY2FsVGljaykge1xuICAgICAgICAgICAgc2NoZWR1bGVQaHlzaWNhbFRpY2soKTtcbiAgICAgICAgICAgIG5lZWRzTmV3UGh5c2ljYWxUaWNrID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZhciBpc091dHNpZGVNaWNyb1RpY2sgPSB0cnVlLFxuICAgIG5lZWRzTmV3UGh5c2ljYWxUaWNrID0gdHJ1ZSxcbiAgICB1bmhhbmRsZWRFcnJvcnMgPSBbXSxcbiAgICByZWplY3RpbmdFcnJvcnMgPSBbXSxcbiAgICByZWplY3Rpb25NYXBwZXIgPSBtaXJyb3I7XG4gICAgdmFyIGdsb2JhbFBTRCA9IHtcbiAgICAgICAgaWQ6ICdnbG9iYWwnLFxuICAgICAgICBnbG9iYWw6IHRydWUsXG4gICAgICAgIHJlZjogMCxcbiAgICAgICAgdW5oYW5kbGVkczogW10sXG4gICAgICAgIG9udW5oYW5kbGVkOiBub3AsXG4gICAgICAgIHBncDogZmFsc2UsXG4gICAgICAgIGVudjoge30sXG4gICAgICAgIGZpbmFsaXplOiBub3BcbiAgICB9O1xuICAgIHZhciBQU0QgPSBnbG9iYWxQU0Q7XG4gICAgdmFyIG1pY3JvdGlja1F1ZXVlID0gW107XG4gICAgdmFyIG51bVNjaGVkdWxlZENhbGxzID0gMDtcbiAgICB2YXIgdGlja0ZpbmFsaXplcnMgPSBbXTtcbiAgICBmdW5jdGlvbiBEZXhpZVByb21pc2UoZm4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzICE9PSAnb2JqZWN0JylcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2VzIG11c3QgYmUgY29uc3RydWN0ZWQgdmlhIG5ldycpO1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgdGhpcy5fbGliID0gZmFsc2U7XG4gICAgICAgIHZhciBwc2QgPSAodGhpcy5fUFNEID0gUFNEKTtcbiAgICAgICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgaWYgKGZuICE9PSBJTlRFUk5BTClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdOb3QgYSBmdW5jdGlvbicpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IGFyZ3VtZW50c1syXTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgaGFuZGxlUmVqZWN0aW9uKHRoaXMsIHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gbnVsbDtcbiAgICAgICAgKytwc2QucmVmO1xuICAgICAgICBleGVjdXRlUHJvbWlzZVRhc2sodGhpcywgZm4pO1xuICAgIH1cbiAgICB2YXIgdGhlblByb3AgPSB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBzZCA9IFBTRCwgbWljcm9UYXNrSWQgPSB0b3RhbEVjaG9lcztcbiAgICAgICAgICAgIGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHZhciBwb3NzaWJsZUF3YWl0ID0gIXBzZC5nbG9iYWwgJiYgKHBzZCAhPT0gUFNEIHx8IG1pY3JvVGFza0lkICE9PSB0b3RhbEVjaG9lcyk7XG4gICAgICAgICAgICAgICAgdmFyIGNsZWFudXAgPSBwb3NzaWJsZUF3YWl0ICYmICFkZWNyZW1lbnRFeHBlY3RlZEF3YWl0cygpO1xuICAgICAgICAgICAgICAgIHZhciBydiA9IG5ldyBEZXhpZVByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBwcm9wYWdhdGVUb0xpc3RlbmVyKF90aGlzLCBuZXcgTGlzdGVuZXIobmF0aXZlQXdhaXRDb21wYXRpYmxlV3JhcChvbkZ1bGZpbGxlZCwgcHNkLCBwb3NzaWJsZUF3YWl0LCBjbGVhbnVwKSwgbmF0aXZlQXdhaXRDb21wYXRpYmxlV3JhcChvblJlamVjdGVkLCBwc2QsIHBvc3NpYmxlQXdhaXQsIGNsZWFudXApLCByZXNvbHZlLCByZWplY3QsIHBzZCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jb25zb2xlVGFzaylcbiAgICAgICAgICAgICAgICAgICAgcnYuX2NvbnNvbGVUYXNrID0gdGhpcy5fY29uc29sZVRhc2s7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJ2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhlbi5wcm90b3R5cGUgPSBJTlRFUk5BTDtcbiAgICAgICAgICAgIHJldHVybiB0aGVuO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgc2V0UHJvcCh0aGlzLCAndGhlbicsIHZhbHVlICYmIHZhbHVlLnByb3RvdHlwZSA9PT0gSU5URVJOQUwgP1xuICAgICAgICAgICAgICAgIHRoZW5Qcm9wIDpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzZXQ6IHRoZW5Qcm9wLnNldFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBwcm9wcyhEZXhpZVByb21pc2UucHJvdG90eXBlLCB7XG4gICAgICAgIHRoZW46IHRoZW5Qcm9wLFxuICAgICAgICBfdGhlbjogZnVuY3Rpb24gKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICAgICAgICBwcm9wYWdhdGVUb0xpc3RlbmVyKHRoaXMsIG5ldyBMaXN0ZW5lcihudWxsLCBudWxsLCBvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgUFNEKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNhdGNoOiBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGVkKTtcbiAgICAgICAgICAgIHZhciB0eXBlID0gYXJndW1lbnRzWzBdLCBoYW5kbGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nID8gdGhpcy50aGVuKG51bGwsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyIGluc3RhbmNlb2YgdHlwZSA/IGhhbmRsZXIoZXJyKSA6IFByb21pc2VSZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgOiB0aGlzLnRoZW4obnVsbCwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXJyICYmIGVyci5uYW1lID09PSB0eXBlID8gaGFuZGxlcihlcnIpIDogUHJvbWlzZVJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmaW5hbGx5OiBmdW5jdGlvbiAob25GaW5hbGx5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBEZXhpZVByb21pc2UucmVzb2x2ZShvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB2YWx1ZTsgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERleGllUHJvbWlzZS5yZXNvbHZlKG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIFByb21pc2VSZWplY3QoZXJyKTsgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgdGltZW91dDogZnVuY3Rpb24gKG1zLCBtc2cpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gbXMgPCBJbmZpbml0eSA/XG4gICAgICAgICAgICAgICAgbmV3IERleGllUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoYW5kbGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlamVjdChuZXcgZXhjZXB0aW9ucy5UaW1lb3V0KG1zZykpOyB9LCBtcyk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KS5maW5hbGx5KGNsZWFyVGltZW91dC5iaW5kKG51bGwsIGhhbmRsZSkpO1xuICAgICAgICAgICAgICAgIH0pIDogdGhpcztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpXG4gICAgICAgIHNldFByb3AoRGV4aWVQcm9taXNlLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCAnRGV4aWUuUHJvbWlzZScpO1xuICAgIGdsb2JhbFBTRC5lbnYgPSBzbmFwU2hvdCgpO1xuICAgIGZ1bmN0aW9uIExpc3RlbmVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCByZXNvbHZlLCByZWplY3QsIHpvbmUpIHtcbiAgICAgICAgdGhpcy5vbkZ1bGZpbGxlZCA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogbnVsbDtcbiAgICAgICAgdGhpcy5vblJlamVjdGVkID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT09ICdmdW5jdGlvbicgPyBvblJlamVjdGVkIDogbnVsbDtcbiAgICAgICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgdGhpcy5yZWplY3QgPSByZWplY3Q7XG4gICAgICAgIHRoaXMucHNkID0gem9uZTtcbiAgICB9XG4gICAgcHJvcHMoRGV4aWVQcm9taXNlLCB7XG4gICAgICAgIGFsbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlcyA9IGdldEFycmF5T2YuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxuICAgICAgICAgICAgICAgIC5tYXAob25Qb3NzaWJsZVBhcmFsbGVsbEFzeW5jKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGV4aWVQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgICAgdmFyIHJlbWFpbmluZyA9IHZhbHVlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24gKGEsIGkpIHsgcmV0dXJuIERleGllUHJvbWlzZS5yZXNvbHZlKGEpLnRoZW4oZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzW2ldID0geDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEtLXJlbWFpbmluZylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgICAgICAgICB9LCByZWplY3QpOyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICByZXNvbHZlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERleGllUHJvbWlzZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEZXhpZVByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgcnYgPSBuZXcgRGV4aWVQcm9taXNlKElOVEVSTkFMLCB0cnVlLCB2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gcnY7XG4gICAgICAgIH0sXG4gICAgICAgIHJlamVjdDogUHJvbWlzZVJlamVjdCxcbiAgICAgICAgcmFjZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlcyA9IGdldEFycmF5T2YuYXBwbHkobnVsbCwgYXJndW1lbnRzKS5tYXAob25Qb3NzaWJsZVBhcmFsbGVsbEFzeW5jKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGV4aWVQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMubWFwKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gRGV4aWVQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTsgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgUFNEOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFBTRDsgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBQU0QgPSB2YWx1ZTsgfVxuICAgICAgICB9LFxuICAgICAgICB0b3RhbEVjaG9lczogeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRvdGFsRWNob2VzOyB9IH0sXG4gICAgICAgIG5ld1BTRDogbmV3U2NvcGUsXG4gICAgICAgIHVzZVBTRDogdXNlUFNELFxuICAgICAgICBzY2hlZHVsZXI6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXNhcDsgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7IGFzYXAgPSB2YWx1ZTsgfVxuICAgICAgICB9LFxuICAgICAgICByZWplY3Rpb25NYXBwZXI6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVqZWN0aW9uTWFwcGVyOyB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHsgcmVqZWN0aW9uTWFwcGVyID0gdmFsdWU7IH1cbiAgICAgICAgfSxcbiAgICAgICAgZm9sbG93OiBmdW5jdGlvbiAoZm4sIHpvbmVQcm9wcykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEZXhpZVByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdTY29wZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwc2QgPSBQU0Q7XG4gICAgICAgICAgICAgICAgICAgIHBzZC51bmhhbmRsZWRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHBzZC5vbnVuaGFuZGxlZCA9IHJlamVjdDtcbiAgICAgICAgICAgICAgICAgICAgcHNkLmZpbmFsaXplID0gY2FsbEJvdGgoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bl9hdF9lbmRfb2ZfdGhpc19vcl9uZXh0X3BoeXNpY2FsX3RpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnVuaGFuZGxlZHMubGVuZ3RoID09PSAwID8gcmVzb2x2ZSgpIDogcmVqZWN0KF90aGlzLnVuaGFuZGxlZHNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIHBzZC5maW5hbGl6ZSk7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfSwgem9uZVByb3BzLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoTmF0aXZlUHJvbWlzZSkge1xuICAgICAgICBpZiAoTmF0aXZlUHJvbWlzZS5hbGxTZXR0bGVkKVxuICAgICAgICAgICAgc2V0UHJvcChEZXhpZVByb21pc2UsIFwiYWxsU2V0dGxlZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBvc3NpYmxlUHJvbWlzZXMgPSBnZXRBcnJheU9mLmFwcGx5KG51bGwsIGFyZ3VtZW50cykubWFwKG9uUG9zc2libGVQYXJhbGxlbGxBc3luYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEZXhpZVByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc3NpYmxlUHJvbWlzZXMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZW1haW5pbmcgPSBwb3NzaWJsZVByb21pc2VzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdHMgPSBuZXcgQXJyYXkocmVtYWluaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgcG9zc2libGVQcm9taXNlcy5mb3JFYWNoKGZ1bmN0aW9uIChwLCBpKSB7IHJldHVybiBEZXhpZVByb21pc2UucmVzb2x2ZShwKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gcmVzdWx0c1tpXSA9IHsgc3RhdHVzOiBcImZ1bGZpbGxlZFwiLCB2YWx1ZTogdmFsdWUgfTsgfSwgZnVuY3Rpb24gKHJlYXNvbikgeyByZXR1cm4gcmVzdWx0c1tpXSA9IHsgc3RhdHVzOiBcInJlamVjdGVkXCIsIHJlYXNvbjogcmVhc29uIH07IH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHJlc3VsdHMpOyB9KTsgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgaWYgKE5hdGl2ZVByb21pc2UuYW55ICYmIHR5cGVvZiBBZ2dyZWdhdGVFcnJvciAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICBzZXRQcm9wKERleGllUHJvbWlzZSwgXCJhbnlcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBwb3NzaWJsZVByb21pc2VzID0gZ2V0QXJyYXlPZi5hcHBseShudWxsLCBhcmd1bWVudHMpLm1hcChvblBvc3NpYmxlUGFyYWxsZWxsQXN5bmMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGV4aWVQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc3NpYmxlUHJvbWlzZXMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBBZ2dyZWdhdGVFcnJvcihbXSkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVtYWluaW5nID0gcG9zc2libGVQcm9taXNlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlcyA9IG5ldyBBcnJheShyZW1haW5pbmcpO1xuICAgICAgICAgICAgICAgICAgICBwb3NzaWJsZVByb21pc2VzLmZvckVhY2goZnVuY3Rpb24gKHAsIGkpIHsgcmV0dXJuIERleGllUHJvbWlzZS5yZXNvbHZlKHApLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiByZXNvbHZlKHZhbHVlKTsgfSwgZnVuY3Rpb24gKGZhaWx1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWx1cmVzW2ldID0gZmFpbHVyZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghLS1yZW1haW5pbmcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBBZ2dyZWdhdGVFcnJvcihmYWlsdXJlcykpO1xuICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgaWYgKE5hdGl2ZVByb21pc2Uud2l0aFJlc29sdmVycylcbiAgICAgICAgICAgIERleGllUHJvbWlzZS53aXRoUmVzb2x2ZXJzID0gTmF0aXZlUHJvbWlzZS53aXRoUmVzb2x2ZXJzO1xuICAgIH1cbiAgICBmdW5jdGlvbiBleGVjdXRlUHJvbWlzZVRhc2socHJvbWlzZSwgZm4pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gcHJvbWlzZSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQSBwcm9taXNlIGNhbm5vdCBiZSByZXNvbHZlZCB3aXRoIGl0c2VsZi4nKTtcbiAgICAgICAgICAgICAgICB2YXIgc2hvdWxkRXhlY3V0ZVRpY2sgPSBwcm9taXNlLl9saWIgJiYgYmVnaW5NaWNyb1RpY2tTY29wZSgpO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBleGVjdXRlUHJvbWlzZVRhc2socHJvbWlzZSwgZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgaW5zdGFuY2VvZiBEZXhpZVByb21pc2UgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLl90aGVuKHJlc29sdmUsIHJlamVjdCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLl9zdGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHByb3BhZ2F0ZUFsbExpc3RlbmVycyhwcm9taXNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZEV4ZWN1dGVUaWNrKVxuICAgICAgICAgICAgICAgICAgICBlbmRNaWNyb1RpY2tTY29wZSgpO1xuICAgICAgICAgICAgfSwgaGFuZGxlUmVqZWN0aW9uLmJpbmQobnVsbCwgcHJvbWlzZSkpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgaGFuZGxlUmVqZWN0aW9uKHByb21pc2UsIGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVSZWplY3Rpb24ocHJvbWlzZSwgcmVhc29uKSB7XG4gICAgICAgIHJlamVjdGluZ0Vycm9ycy5wdXNoKHJlYXNvbik7XG4gICAgICAgIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIHNob3VsZEV4ZWN1dGVUaWNrID0gcHJvbWlzZS5fbGliICYmIGJlZ2luTWljcm9UaWNrU2NvcGUoKTtcbiAgICAgICAgcmVhc29uID0gcmVqZWN0aW9uTWFwcGVyKHJlYXNvbik7XG4gICAgICAgIHByb21pc2UuX3N0YXRlID0gZmFsc2U7XG4gICAgICAgIHByb21pc2UuX3ZhbHVlID0gcmVhc29uO1xuICAgICAgICBhZGRQb3NzaWJseVVuaGFuZGxlZEVycm9yKHByb21pc2UpO1xuICAgICAgICBwcm9wYWdhdGVBbGxMaXN0ZW5lcnMocHJvbWlzZSk7XG4gICAgICAgIGlmIChzaG91bGRFeGVjdXRlVGljaylcbiAgICAgICAgICAgIGVuZE1pY3JvVGlja1Njb3BlKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHByb3BhZ2F0ZUFsbExpc3RlbmVycyhwcm9taXNlKSB7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSBwcm9taXNlLl9saXN0ZW5lcnM7XG4gICAgICAgIHByb21pc2UuX2xpc3RlbmVycyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICBwcm9wYWdhdGVUb0xpc3RlbmVyKHByb21pc2UsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBzZCA9IHByb21pc2UuX1BTRDtcbiAgICAgICAgLS1wc2QucmVmIHx8IHBzZC5maW5hbGl6ZSgpO1xuICAgICAgICBpZiAobnVtU2NoZWR1bGVkQ2FsbHMgPT09IDApIHtcbiAgICAgICAgICAgICsrbnVtU2NoZWR1bGVkQ2FsbHM7XG4gICAgICAgICAgICBhc2FwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoLS1udW1TY2hlZHVsZWRDYWxscyA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgZmluYWxpemVQaHlzaWNhbFRpY2soKTtcbiAgICAgICAgICAgIH0sIFtdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBwcm9wYWdhdGVUb0xpc3RlbmVyKHByb21pc2UsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmIChwcm9taXNlLl9zdGF0ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcHJvbWlzZS5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjYiA9IHByb21pc2UuX3N0YXRlID8gbGlzdGVuZXIub25GdWxmaWxsZWQgOiBsaXN0ZW5lci5vblJlamVjdGVkO1xuICAgICAgICBpZiAoY2IgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAocHJvbWlzZS5fc3RhdGUgPyBsaXN0ZW5lci5yZXNvbHZlIDogbGlzdGVuZXIucmVqZWN0KShwcm9taXNlLl92YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgKytsaXN0ZW5lci5wc2QucmVmO1xuICAgICAgICArK251bVNjaGVkdWxlZENhbGxzO1xuICAgICAgICBhc2FwKGNhbGxMaXN0ZW5lciwgW2NiLCBwcm9taXNlLCBsaXN0ZW5lcl0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjYWxsTGlzdGVuZXIoY2IsIHByb21pc2UsIGxpc3RlbmVyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgcmV0LCB2YWx1ZSA9IHByb21pc2UuX3ZhbHVlO1xuICAgICAgICAgICAgaWYgKCFwcm9taXNlLl9zdGF0ZSAmJiByZWplY3RpbmdFcnJvcnMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJlamVjdGluZ0Vycm9ycyA9IFtdO1xuICAgICAgICAgICAgcmV0ID0gZGVidWcgJiYgcHJvbWlzZS5fY29uc29sZVRhc2sgPyBwcm9taXNlLl9jb25zb2xlVGFzay5ydW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gY2IodmFsdWUpOyB9KSA6IGNiKHZhbHVlKTtcbiAgICAgICAgICAgIGlmICghcHJvbWlzZS5fc3RhdGUgJiYgcmVqZWN0aW5nRXJyb3JzLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIG1hcmtFcnJvckFzSGFuZGxlZChwcm9taXNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpc3RlbmVyLnJlc29sdmUocmV0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgbGlzdGVuZXIucmVqZWN0KGUpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgaWYgKC0tbnVtU2NoZWR1bGVkQ2FsbHMgPT09IDApXG4gICAgICAgICAgICAgICAgZmluYWxpemVQaHlzaWNhbFRpY2soKTtcbiAgICAgICAgICAgIC0tbGlzdGVuZXIucHNkLnJlZiB8fCBsaXN0ZW5lci5wc2QuZmluYWxpemUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBwaHlzaWNhbFRpY2soKSB7XG4gICAgICAgIHVzZVBTRChnbG9iYWxQU0QsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJlZ2luTWljcm9UaWNrU2NvcGUoKSAmJiBlbmRNaWNyb1RpY2tTY29wZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYmVnaW5NaWNyb1RpY2tTY29wZSgpIHtcbiAgICAgICAgdmFyIHdhc1Jvb3RFeGVjID0gaXNPdXRzaWRlTWljcm9UaWNrO1xuICAgICAgICBpc091dHNpZGVNaWNyb1RpY2sgPSBmYWxzZTtcbiAgICAgICAgbmVlZHNOZXdQaHlzaWNhbFRpY2sgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHdhc1Jvb3RFeGVjO1xuICAgIH1cbiAgICBmdW5jdGlvbiBlbmRNaWNyb1RpY2tTY29wZSgpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrcywgaSwgbDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgd2hpbGUgKG1pY3JvdGlja1F1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3MgPSBtaWNyb3RpY2tRdWV1ZTtcbiAgICAgICAgICAgICAgICBtaWNyb3RpY2tRdWV1ZSA9IFtdO1xuICAgICAgICAgICAgICAgIGwgPSBjYWxsYmFja3MubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBjYWxsYmFja3NbaV07XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1bMF0uYXBwbHkobnVsbCwgaXRlbVsxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlIChtaWNyb3RpY2tRdWV1ZS5sZW5ndGggPiAwKTtcbiAgICAgICAgaXNPdXRzaWRlTWljcm9UaWNrID0gdHJ1ZTtcbiAgICAgICAgbmVlZHNOZXdQaHlzaWNhbFRpY2sgPSB0cnVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmaW5hbGl6ZVBoeXNpY2FsVGljaygpIHtcbiAgICAgICAgdmFyIHVuaGFuZGxlZEVycnMgPSB1bmhhbmRsZWRFcnJvcnM7XG4gICAgICAgIHVuaGFuZGxlZEVycm9ycyA9IFtdO1xuICAgICAgICB1bmhhbmRsZWRFcnJzLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgIHAuX1BTRC5vbnVuaGFuZGxlZC5jYWxsKG51bGwsIHAuX3ZhbHVlLCBwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBmaW5hbGl6ZXJzID0gdGlja0ZpbmFsaXplcnMuc2xpY2UoMCk7XG4gICAgICAgIHZhciBpID0gZmluYWxpemVycy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpKVxuICAgICAgICAgICAgZmluYWxpemVyc1stLWldKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJ1bl9hdF9lbmRfb2ZfdGhpc19vcl9uZXh0X3BoeXNpY2FsX3RpY2soZm4pIHtcbiAgICAgICAgZnVuY3Rpb24gZmluYWxpemVyKCkge1xuICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgIHRpY2tGaW5hbGl6ZXJzLnNwbGljZSh0aWNrRmluYWxpemVycy5pbmRleE9mKGZpbmFsaXplciksIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRpY2tGaW5hbGl6ZXJzLnB1c2goZmluYWxpemVyKTtcbiAgICAgICAgKytudW1TY2hlZHVsZWRDYWxscztcbiAgICAgICAgYXNhcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoLS1udW1TY2hlZHVsZWRDYWxscyA9PT0gMClcbiAgICAgICAgICAgICAgICBmaW5hbGl6ZVBoeXNpY2FsVGljaygpO1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZFBvc3NpYmx5VW5oYW5kbGVkRXJyb3IocHJvbWlzZSkge1xuICAgICAgICBpZiAoIXVuaGFuZGxlZEVycm9ycy5zb21lKGZ1bmN0aW9uIChwKSB7IHJldHVybiBwLl92YWx1ZSA9PT0gcHJvbWlzZS5fdmFsdWU7IH0pKVxuICAgICAgICAgICAgdW5oYW5kbGVkRXJyb3JzLnB1c2gocHJvbWlzZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1hcmtFcnJvckFzSGFuZGxlZChwcm9taXNlKSB7XG4gICAgICAgIHZhciBpID0gdW5oYW5kbGVkRXJyb3JzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGkpXG4gICAgICAgICAgICBpZiAodW5oYW5kbGVkRXJyb3JzWy0taV0uX3ZhbHVlID09PSBwcm9taXNlLl92YWx1ZSkge1xuICAgICAgICAgICAgICAgIHVuaGFuZGxlZEVycm9ycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBQcm9taXNlUmVqZWN0KHJlYXNvbikge1xuICAgICAgICByZXR1cm4gbmV3IERleGllUHJvbWlzZShJTlRFUk5BTCwgZmFsc2UsIHJlYXNvbik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHdyYXAoZm4sIGVycm9yQ2F0Y2hlcikge1xuICAgICAgICB2YXIgcHNkID0gUFNEO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHdhc1Jvb3RFeGVjID0gYmVnaW5NaWNyb1RpY2tTY29wZSgpLCBvdXRlclNjb3BlID0gUFNEO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2hUb1pvbmUocHNkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JDYXRjaGVyICYmIGVycm9yQ2F0Y2hlcihlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHN3aXRjaFRvWm9uZShvdXRlclNjb3BlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgaWYgKHdhc1Jvb3RFeGVjKVxuICAgICAgICAgICAgICAgICAgICBlbmRNaWNyb1RpY2tTY29wZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICB2YXIgdGFzayA9IHsgYXdhaXRzOiAwLCBlY2hvZXM6IDAsIGlkOiAwIH07XG4gICAgdmFyIHRhc2tDb3VudGVyID0gMDtcbiAgICB2YXIgem9uZVN0YWNrID0gW107XG4gICAgdmFyIHpvbmVFY2hvZXMgPSAwO1xuICAgIHZhciB0b3RhbEVjaG9lcyA9IDA7XG4gICAgdmFyIHpvbmVfaWRfY291bnRlciA9IDA7XG4gICAgZnVuY3Rpb24gbmV3U2NvcGUoZm4sIHByb3BzLCBhMSwgYTIpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IFBTRCwgcHNkID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQpO1xuICAgICAgICBwc2QucGFyZW50ID0gcGFyZW50O1xuICAgICAgICBwc2QucmVmID0gMDtcbiAgICAgICAgcHNkLmdsb2JhbCA9IGZhbHNlO1xuICAgICAgICBwc2QuaWQgPSArK3pvbmVfaWRfY291bnRlcjtcbiAgICAgICAgZ2xvYmFsUFNELmVudjtcbiAgICAgICAgcHNkLmVudiA9IHBhdGNoR2xvYmFsUHJvbWlzZSA/IHtcbiAgICAgICAgICAgIFByb21pc2U6IERleGllUHJvbWlzZSxcbiAgICAgICAgICAgIFByb21pc2VQcm9wOiB7IHZhbHVlOiBEZXhpZVByb21pc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSxcbiAgICAgICAgICAgIGFsbDogRGV4aWVQcm9taXNlLmFsbCxcbiAgICAgICAgICAgIHJhY2U6IERleGllUHJvbWlzZS5yYWNlLFxuICAgICAgICAgICAgYWxsU2V0dGxlZDogRGV4aWVQcm9taXNlLmFsbFNldHRsZWQsXG4gICAgICAgICAgICBhbnk6IERleGllUHJvbWlzZS5hbnksXG4gICAgICAgICAgICByZXNvbHZlOiBEZXhpZVByb21pc2UucmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdDogRGV4aWVQcm9taXNlLnJlamVjdCxcbiAgICAgICAgfSA6IHt9O1xuICAgICAgICBpZiAocHJvcHMpXG4gICAgICAgICAgICBleHRlbmQocHNkLCBwcm9wcyk7XG4gICAgICAgICsrcGFyZW50LnJlZjtcbiAgICAgICAgcHNkLmZpbmFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLS10aGlzLnBhcmVudC5yZWYgfHwgdGhpcy5wYXJlbnQuZmluYWxpemUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHJ2ID0gdXNlUFNEKHBzZCwgZm4sIGExLCBhMik7XG4gICAgICAgIGlmIChwc2QucmVmID09PSAwKVxuICAgICAgICAgICAgcHNkLmZpbmFsaXplKCk7XG4gICAgICAgIHJldHVybiBydjtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5jcmVtZW50RXhwZWN0ZWRBd2FpdHMoKSB7XG4gICAgICAgIGlmICghdGFzay5pZClcbiAgICAgICAgICAgIHRhc2suaWQgPSArK3Rhc2tDb3VudGVyO1xuICAgICAgICArK3Rhc2suYXdhaXRzO1xuICAgICAgICB0YXNrLmVjaG9lcyArPSBaT05FX0VDSE9fTElNSVQ7XG4gICAgICAgIHJldHVybiB0YXNrLmlkO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkZWNyZW1lbnRFeHBlY3RlZEF3YWl0cygpIHtcbiAgICAgICAgaWYgKCF0YXNrLmF3YWl0cylcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKC0tdGFzay5hd2FpdHMgPT09IDApXG4gICAgICAgICAgICB0YXNrLmlkID0gMDtcbiAgICAgICAgdGFzay5lY2hvZXMgPSB0YXNrLmF3YWl0cyAqIFpPTkVfRUNIT19MSU1JVDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICgoJycgKyBuYXRpdmVQcm9taXNlVGhlbikuaW5kZXhPZignW25hdGl2ZSBjb2RlXScpID09PSAtMSkge1xuICAgICAgICBpbmNyZW1lbnRFeHBlY3RlZEF3YWl0cyA9IGRlY3JlbWVudEV4cGVjdGVkQXdhaXRzID0gbm9wO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvblBvc3NpYmxlUGFyYWxsZWxsQXN5bmMocG9zc2libGVQcm9taXNlKSB7XG4gICAgICAgIGlmICh0YXNrLmVjaG9lcyAmJiBwb3NzaWJsZVByb21pc2UgJiYgcG9zc2libGVQcm9taXNlLmNvbnN0cnVjdG9yID09PSBOYXRpdmVQcm9taXNlKSB7XG4gICAgICAgICAgICBpbmNyZW1lbnRFeHBlY3RlZEF3YWl0cygpO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3NpYmxlUHJvbWlzZS50aGVuKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgZGVjcmVtZW50RXhwZWN0ZWRBd2FpdHMoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZGVjcmVtZW50RXhwZWN0ZWRBd2FpdHMoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBvc3NpYmxlUHJvbWlzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gem9uZUVudGVyRWNobyh0YXJnZXRab25lKSB7XG4gICAgICAgICsrdG90YWxFY2hvZXM7XG4gICAgICAgIGlmICghdGFzay5lY2hvZXMgfHwgLS10YXNrLmVjaG9lcyA9PT0gMCkge1xuICAgICAgICAgICAgdGFzay5lY2hvZXMgPSB0YXNrLmF3YWl0cyA9IHRhc2suaWQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHpvbmVTdGFjay5wdXNoKFBTRCk7XG4gICAgICAgIHN3aXRjaFRvWm9uZSh0YXJnZXRab25lLCB0cnVlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gem9uZUxlYXZlRWNobygpIHtcbiAgICAgICAgdmFyIHpvbmUgPSB6b25lU3RhY2tbem9uZVN0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICB6b25lU3RhY2sucG9wKCk7XG4gICAgICAgIHN3aXRjaFRvWm9uZSh6b25lLCBmYWxzZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN3aXRjaFRvWm9uZSh0YXJnZXRab25lLCBiRW50ZXJpbmdab25lKSB7XG4gICAgICAgIHZhciBjdXJyZW50Wm9uZSA9IFBTRDtcbiAgICAgICAgaWYgKGJFbnRlcmluZ1pvbmUgPyB0YXNrLmVjaG9lcyAmJiAoIXpvbmVFY2hvZXMrKyB8fCB0YXJnZXRab25lICE9PSBQU0QpIDogem9uZUVjaG9lcyAmJiAoIS0tem9uZUVjaG9lcyB8fCB0YXJnZXRab25lICE9PSBQU0QpKSB7XG4gICAgICAgICAgICBxdWV1ZU1pY3JvdGFzayhiRW50ZXJpbmdab25lID8gem9uZUVudGVyRWNoby5iaW5kKG51bGwsIHRhcmdldFpvbmUpIDogem9uZUxlYXZlRWNobyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldFpvbmUgPT09IFBTRClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgUFNEID0gdGFyZ2V0Wm9uZTtcbiAgICAgICAgaWYgKGN1cnJlbnRab25lID09PSBnbG9iYWxQU0QpXG4gICAgICAgICAgICBnbG9iYWxQU0QuZW52ID0gc25hcFNob3QoKTtcbiAgICAgICAgaWYgKHBhdGNoR2xvYmFsUHJvbWlzZSkge1xuICAgICAgICAgICAgdmFyIEdsb2JhbFByb21pc2UgPSBnbG9iYWxQU0QuZW52LlByb21pc2U7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0RW52ID0gdGFyZ2V0Wm9uZS5lbnY7XG4gICAgICAgICAgICBpZiAoY3VycmVudFpvbmUuZ2xvYmFsIHx8IHRhcmdldFpvbmUuZ2xvYmFsKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9nbG9iYWwsICdQcm9taXNlJywgdGFyZ2V0RW52LlByb21pc2VQcm9wKTtcbiAgICAgICAgICAgICAgICBHbG9iYWxQcm9taXNlLmFsbCA9IHRhcmdldEVudi5hbGw7XG4gICAgICAgICAgICAgICAgR2xvYmFsUHJvbWlzZS5yYWNlID0gdGFyZ2V0RW52LnJhY2U7XG4gICAgICAgICAgICAgICAgR2xvYmFsUHJvbWlzZS5yZXNvbHZlID0gdGFyZ2V0RW52LnJlc29sdmU7XG4gICAgICAgICAgICAgICAgR2xvYmFsUHJvbWlzZS5yZWplY3QgPSB0YXJnZXRFbnYucmVqZWN0O1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRFbnYuYWxsU2V0dGxlZClcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsUHJvbWlzZS5hbGxTZXR0bGVkID0gdGFyZ2V0RW52LmFsbFNldHRsZWQ7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldEVudi5hbnkpXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbFByb21pc2UuYW55ID0gdGFyZ2V0RW52LmFueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzbmFwU2hvdCgpIHtcbiAgICAgICAgdmFyIEdsb2JhbFByb21pc2UgPSBfZ2xvYmFsLlByb21pc2U7XG4gICAgICAgIHJldHVybiBwYXRjaEdsb2JhbFByb21pc2UgPyB7XG4gICAgICAgICAgICBQcm9taXNlOiBHbG9iYWxQcm9taXNlLFxuICAgICAgICAgICAgUHJvbWlzZVByb3A6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoX2dsb2JhbCwgXCJQcm9taXNlXCIpLFxuICAgICAgICAgICAgYWxsOiBHbG9iYWxQcm9taXNlLmFsbCxcbiAgICAgICAgICAgIHJhY2U6IEdsb2JhbFByb21pc2UucmFjZSxcbiAgICAgICAgICAgIGFsbFNldHRsZWQ6IEdsb2JhbFByb21pc2UuYWxsU2V0dGxlZCxcbiAgICAgICAgICAgIGFueTogR2xvYmFsUHJvbWlzZS5hbnksXG4gICAgICAgICAgICByZXNvbHZlOiBHbG9iYWxQcm9taXNlLnJlc29sdmUsXG4gICAgICAgICAgICByZWplY3Q6IEdsb2JhbFByb21pc2UucmVqZWN0LFxuICAgICAgICB9IDoge307XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVzZVBTRChwc2QsIGZuLCBhMSwgYTIsIGEzKSB7XG4gICAgICAgIHZhciBvdXRlclNjb3BlID0gUFNEO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc3dpdGNoVG9ab25lKHBzZCwgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm4gZm4oYTEsIGEyLCBhMyk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzd2l0Y2hUb1pvbmUob3V0ZXJTY29wZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG5hdGl2ZUF3YWl0Q29tcGF0aWJsZVdyYXAoZm4sIHpvbmUsIHBvc3NpYmxlQXdhaXQsIGNsZWFudXApIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJyA/IGZuIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG91dGVyWm9uZSA9IFBTRDtcbiAgICAgICAgICAgIGlmIChwb3NzaWJsZUF3YWl0KVxuICAgICAgICAgICAgICAgIGluY3JlbWVudEV4cGVjdGVkQXdhaXRzKCk7XG4gICAgICAgICAgICBzd2l0Y2hUb1pvbmUoem9uZSwgdHJ1ZSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoVG9ab25lKG91dGVyWm9uZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGlmIChjbGVhbnVwKVxuICAgICAgICAgICAgICAgICAgICBxdWV1ZU1pY3JvdGFzayhkZWNyZW1lbnRFeHBlY3RlZEF3YWl0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGV4ZWNJbkdsb2JhbENvbnRleHQoY2IpIHtcbiAgICAgICAgaWYgKFByb21pc2UgPT09IE5hdGl2ZVByb21pc2UgJiYgdGFzay5lY2hvZXMgPT09IDApIHtcbiAgICAgICAgICAgIGlmICh6b25lRWNob2VzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVucXVldWVOYXRpdmVNaWNyb1Rhc2soY2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dChjYiwgMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIHJlamVjdGlvbiA9IERleGllUHJvbWlzZS5yZWplY3Q7XG5cbiAgICBmdW5jdGlvbiB0ZW1wVHJhbnNhY3Rpb24oZGIsIG1vZGUsIHN0b3JlTmFtZXMsIGZuKSB7XG4gICAgICAgIGlmICghZGIuaWRiZGIgfHwgKCFkYi5fc3RhdGUub3BlbkNvbXBsZXRlICYmICghUFNELmxldFRocm91Z2ggJiYgIWRiLl92aXApKSkge1xuICAgICAgICAgICAgaWYgKGRiLl9zdGF0ZS5vcGVuQ29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uKG5ldyBleGNlcHRpb25zLkRhdGFiYXNlQ2xvc2VkKGRiLl9zdGF0ZS5kYk9wZW5FcnJvcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkYi5fc3RhdGUuaXNCZWluZ09wZW5lZCkge1xuICAgICAgICAgICAgICAgIGlmICghZGIuX3N0YXRlLmF1dG9PcGVuKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uKG5ldyBleGNlcHRpb25zLkRhdGFiYXNlQ2xvc2VkKCkpO1xuICAgICAgICAgICAgICAgIGRiLm9wZW4oKS5jYXRjaChub3ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRiLl9zdGF0ZS5kYlJlYWR5UHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRlbXBUcmFuc2FjdGlvbihkYiwgbW9kZSwgc3RvcmVOYW1lcywgZm4pOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0cmFucyA9IGRiLl9jcmVhdGVUcmFuc2FjdGlvbihtb2RlLCBzdG9yZU5hbWVzLCBkYi5fZGJTY2hlbWEpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0cmFucy5jcmVhdGUoKTtcbiAgICAgICAgICAgICAgICBkYi5fc3RhdGUuUFIxMzk4X21heExvb3AgPSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKGV4Lm5hbWUgPT09IGVycm5hbWVzLkludmFsaWRTdGF0ZSAmJiBkYi5pc09wZW4oKSAmJiAtLWRiLl9zdGF0ZS5QUjEzOThfbWF4TG9vcCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdEZXhpZTogTmVlZCB0byByZW9wZW4gZGInKTtcbiAgICAgICAgICAgICAgICAgICAgZGIuY2xvc2UoeyBkaXNhYmxlQXV0b09wZW46IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGIub3BlbigpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGVtcFRyYW5zYWN0aW9uKGRiLCBtb2RlLCBzdG9yZU5hbWVzLCBmbik7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uKGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cmFucy5fcHJvbWlzZShtb2RlLCBmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1Njb3BlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgUFNELnRyYW5zID0gdHJhbnM7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmbihyZXNvbHZlLCByZWplY3QsIHRyYW5zKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGlmIChtb2RlID09PSAncmVhZHdyaXRlJylcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zLmlkYnRyYW5zLmNvbW1pdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChfYSkgeyB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGUgPT09ICdyZWFkb25seScgPyByZXN1bHQgOiB0cmFucy5fY29tcGxldGlvbi50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlc3VsdDsgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBERVhJRV9WRVJTSU9OID0gJzQuMC4xMSc7XG4gICAgdmFyIG1heFN0cmluZyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoNjU1MzUpO1xuICAgIHZhciBtaW5LZXkgPSAtSW5maW5pdHk7XG4gICAgdmFyIElOVkFMSURfS0VZX0FSR1VNRU5UID0gXCJJbnZhbGlkIGtleSBwcm92aWRlZC4gS2V5cyBtdXN0IGJlIG9mIHR5cGUgc3RyaW5nLCBudW1iZXIsIERhdGUgb3IgQXJyYXk8c3RyaW5nIHwgbnVtYmVyIHwgRGF0ZT4uXCI7XG4gICAgdmFyIFNUUklOR19FWFBFQ1RFRCA9IFwiU3RyaW5nIGV4cGVjdGVkLlwiO1xuICAgIHZhciBjb25uZWN0aW9ucyA9IFtdO1xuICAgIHZhciBEQk5BTUVTX0RCID0gJ19fZGJuYW1lcyc7XG4gICAgdmFyIFJFQURPTkxZID0gJ3JlYWRvbmx5JztcbiAgICB2YXIgUkVBRFdSSVRFID0gJ3JlYWR3cml0ZSc7XG5cbiAgICBmdW5jdGlvbiBjb21iaW5lKGZpbHRlcjEsIGZpbHRlcjIpIHtcbiAgICAgICAgcmV0dXJuIGZpbHRlcjEgP1xuICAgICAgICAgICAgZmlsdGVyMiA/XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gZmlsdGVyMS5hcHBseSh0aGlzLCBhcmd1bWVudHMpICYmIGZpbHRlcjIuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfSA6XG4gICAgICAgICAgICAgICAgZmlsdGVyMSA6XG4gICAgICAgICAgICBmaWx0ZXIyO1xuICAgIH1cblxuICAgIHZhciBBbnlSYW5nZSA9IHtcbiAgICAgICAgdHlwZTogMyAsXG4gICAgICAgIGxvd2VyOiAtSW5maW5pdHksXG4gICAgICAgIGxvd2VyT3BlbjogZmFsc2UsXG4gICAgICAgIHVwcGVyOiBbW11dLFxuICAgICAgICB1cHBlck9wZW46IGZhbHNlXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHdvcmthcm91bmRGb3JVbmRlZmluZWRQcmltS2V5KGtleVBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBrZXlQYXRoID09PSBcInN0cmluZ1wiICYmICEvXFwuLy50ZXN0KGtleVBhdGgpXG4gICAgICAgICAgICA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqW2tleVBhdGhdID09PSB1bmRlZmluZWQgJiYgKGtleVBhdGggaW4gb2JqKSkge1xuICAgICAgICAgICAgICAgICAgICBvYmogPSBkZWVwQ2xvbmUob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9ialtrZXlQYXRoXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqOyB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIEVudGl0eSgpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9ucy5UeXBlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY21wKGEsIGIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciB0YSA9IHR5cGUoYSk7XG4gICAgICAgICAgICB2YXIgdGIgPSB0eXBlKGIpO1xuICAgICAgICAgICAgaWYgKHRhICE9PSB0Yikge1xuICAgICAgICAgICAgICAgIGlmICh0YSA9PT0gJ0FycmF5JylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgaWYgKHRiID09PSAnQXJyYXknKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgaWYgKHRhID09PSAnYmluYXJ5JylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgaWYgKHRiID09PSAnYmluYXJ5JylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIGlmICh0YSA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIGlmICh0YiA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICBpZiAodGEgPT09ICdEYXRlJylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgaWYgKHRiICE9PSAnRGF0ZScpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoICh0YSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEgPiBiID8gMSA6IGEgPCBiID8gLTEgOiAwO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2JpbmFyeSc6IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmVVaW50OEFycmF5cyhnZXRVaW50OEFycmF5KGEpLCBnZXRVaW50OEFycmF5KGIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyYXknOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tcGFyZUFycmF5cyhhLCBiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoX2EpIHsgfVxuICAgICAgICByZXR1cm4gTmFOO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb21wYXJlQXJyYXlzKGEsIGIpIHtcbiAgICAgICAgdmFyIGFsID0gYS5sZW5ndGg7XG4gICAgICAgIHZhciBibCA9IGIubGVuZ3RoO1xuICAgICAgICB2YXIgbCA9IGFsIDwgYmwgPyBhbCA6IGJsO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgICAgdmFyIHJlcyA9IGNtcChhW2ldLCBiW2ldKTtcbiAgICAgICAgICAgIGlmIChyZXMgIT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWwgPT09IGJsID8gMCA6IGFsIDwgYmwgPyAtMSA6IDE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbXBhcmVVaW50OEFycmF5cyhhLCBiKSB7XG4gICAgICAgIHZhciBhbCA9IGEubGVuZ3RoO1xuICAgICAgICB2YXIgYmwgPSBiLmxlbmd0aDtcbiAgICAgICAgdmFyIGwgPSBhbCA8IGJsID8gYWwgOiBibDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChhW2ldICE9PSBiW2ldKVxuICAgICAgICAgICAgICAgIHJldHVybiBhW2ldIDwgYltpXSA/IC0xIDogMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWwgPT09IGJsID8gMCA6IGFsIDwgYmwgPyAtMSA6IDE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHR5cGUoeCkge1xuICAgICAgICB2YXIgdCA9IHR5cGVvZiB4O1xuICAgICAgICBpZiAodCAhPT0gJ29iamVjdCcpXG4gICAgICAgICAgICByZXR1cm4gdDtcbiAgICAgICAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyh4KSlcbiAgICAgICAgICAgIHJldHVybiAnYmluYXJ5JztcbiAgICAgICAgdmFyIHRzVGFnID0gdG9TdHJpbmdUYWcoeCk7XG4gICAgICAgIHJldHVybiB0c1RhZyA9PT0gJ0FycmF5QnVmZmVyJyA/ICdiaW5hcnknIDogdHNUYWc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFVpbnQ4QXJyYXkoYSkge1xuICAgICAgICBpZiAoYSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpXG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhhKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShhLmJ1ZmZlciwgYS5ieXRlT2Zmc2V0LCBhLmJ5dGVMZW5ndGgpO1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYSk7XG4gICAgfVxuXG4gICAgdmFyIFRhYmxlID0gIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFRhYmxlKCkge1xuICAgICAgICB9XG4gICAgICAgIFRhYmxlLnByb3RvdHlwZS5fdHJhbnMgPSBmdW5jdGlvbiAobW9kZSwgZm4sIHdyaXRlTG9ja2VkKSB7XG4gICAgICAgICAgICB2YXIgdHJhbnMgPSB0aGlzLl90eCB8fCBQU0QudHJhbnM7XG4gICAgICAgICAgICB2YXIgdGFibGVOYW1lID0gdGhpcy5uYW1lO1xuICAgICAgICAgICAgdmFyIHRhc2sgPSBkZWJ1ZyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZS5jcmVhdGVUYXNrICYmIGNvbnNvbGUuY3JlYXRlVGFzayhcIkRleGllOiBcIi5jb25jYXQobW9kZSA9PT0gJ3JlYWRvbmx5JyA/ICdyZWFkJyA6ICd3cml0ZScsIFwiIFwiKS5jb25jYXQodGhpcy5uYW1lKSk7XG4gICAgICAgICAgICBmdW5jdGlvbiBjaGVja1RhYmxlSW5UcmFuc2FjdGlvbihyZXNvbHZlLCByZWplY3QsIHRyYW5zKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0cmFucy5zY2hlbWFbdGFibGVOYW1lXSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuTm90Rm91bmQoXCJUYWJsZSBcIiArIHRhYmxlTmFtZSArIFwiIG5vdCBwYXJ0IG9mIHRyYW5zYWN0aW9uXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmbih0cmFucy5pZGJ0cmFucywgdHJhbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHdhc1Jvb3RFeGVjID0gYmVnaW5NaWNyb1RpY2tTY29wZSgpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IHRyYW5zICYmIHRyYW5zLmRiLl9ub3ZpcCA9PT0gdGhpcy5kYi5fbm92aXAgP1xuICAgICAgICAgICAgICAgICAgICB0cmFucyA9PT0gUFNELnRyYW5zID9cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zLl9wcm9taXNlKG1vZGUsIGNoZWNrVGFibGVJblRyYW5zYWN0aW9uLCB3cml0ZUxvY2tlZCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2NvcGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJhbnMuX3Byb21pc2UobW9kZSwgY2hlY2tUYWJsZUluVHJhbnNhY3Rpb24sIHdyaXRlTG9ja2VkKTsgfSwgeyB0cmFuczogdHJhbnMsIHRyYW5zbGVzczogUFNELnRyYW5zbGVzcyB8fCBQU0QgfSkgOlxuICAgICAgICAgICAgICAgICAgICB0ZW1wVHJhbnNhY3Rpb24odGhpcy5kYiwgbW9kZSwgW3RoaXMubmFtZV0sIGNoZWNrVGFibGVJblRyYW5zYWN0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgICAgICBwLl9jb25zb2xlVGFzayA9IHRhc2s7XG4gICAgICAgICAgICAgICAgICAgIHAgPSBwLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUudHJhY2UoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3Rpb24oZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgaWYgKHdhc1Jvb3RFeGVjKVxuICAgICAgICAgICAgICAgICAgICBlbmRNaWNyb1RpY2tTY29wZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBUYWJsZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleU9yQ3JpdCwgY2IpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICBpZiAoa2V5T3JDcml0ICYmIGtleU9yQ3JpdC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndoZXJlKGtleU9yQ3JpdCkuZmlyc3QoY2IpO1xuICAgICAgICAgICAgaWYgKGtleU9yQ3JpdCA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3Rpb24obmV3IGV4Y2VwdGlvbnMuVHlwZShcIkludmFsaWQgYXJndW1lbnQgdG8gVGFibGUuZ2V0KClcIikpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zKCdyZWFkb25seScsIGZ1bmN0aW9uICh0cmFucykge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5jb3JlLmdldCh7IHRyYW5zOiB0cmFucywga2V5OiBrZXlPckNyaXQgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuaG9vay5yZWFkaW5nLmZpcmUocmVzKTsgfSk7XG4gICAgICAgICAgICB9KS50aGVuKGNiKTtcbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLndoZXJlID0gZnVuY3Rpb24gKGluZGV4T3JDcml0KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGluZGV4T3JDcml0ID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMuZGIuV2hlcmVDbGF1c2UodGhpcywgaW5kZXhPckNyaXQpO1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkoaW5kZXhPckNyaXQpKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcy5kYi5XaGVyZUNsYXVzZSh0aGlzLCBcIltcIi5jb25jYXQoaW5kZXhPckNyaXQuam9pbignKycpLCBcIl1cIikpO1xuICAgICAgICAgICAgdmFyIGtleVBhdGhzID0ga2V5cyhpbmRleE9yQ3JpdCk7XG4gICAgICAgICAgICBpZiAoa2V5UGF0aHMubGVuZ3RoID09PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgICAgICAgICAgICAgIC53aGVyZShrZXlQYXRoc1swXSlcbiAgICAgICAgICAgICAgICAgICAgLmVxdWFscyhpbmRleE9yQ3JpdFtrZXlQYXRoc1swXV0pO1xuICAgICAgICAgICAgdmFyIGNvbXBvdW5kSW5kZXggPSB0aGlzLnNjaGVtYS5pbmRleGVzLmNvbmNhdCh0aGlzLnNjaGVtYS5wcmltS2V5KS5maWx0ZXIoZnVuY3Rpb24gKGl4KSB7XG4gICAgICAgICAgICAgICAgaWYgKGl4LmNvbXBvdW5kICYmXG4gICAgICAgICAgICAgICAgICAgIGtleVBhdGhzLmV2ZXJ5KGZ1bmN0aW9uIChrZXlQYXRoKSB7IHJldHVybiBpeC5rZXlQYXRoLmluZGV4T2Yoa2V5UGF0aCkgPj0gMDsgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlQYXRocy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleVBhdGhzLmluZGV4T2YoaXgua2V5UGF0aFtpXSkgPT09IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSkuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5rZXlQYXRoLmxlbmd0aCAtIGIua2V5UGF0aC5sZW5ndGg7IH0pWzBdO1xuICAgICAgICAgICAgaWYgKGNvbXBvdW5kSW5kZXggJiYgdGhpcy5kYi5fbWF4S2V5ICE9PSBtYXhTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5UGF0aHNJblZhbGlkT3JkZXIgPSBjb21wb3VuZEluZGV4LmtleVBhdGguc2xpY2UoMCwga2V5UGF0aHMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICAgICAgICAgICAgICAud2hlcmUoa2V5UGF0aHNJblZhbGlkT3JkZXIpXG4gICAgICAgICAgICAgICAgICAgIC5lcXVhbHMoa2V5UGF0aHNJblZhbGlkT3JkZXIubWFwKGZ1bmN0aW9uIChrcCkgeyByZXR1cm4gaW5kZXhPckNyaXRba3BdOyB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNvbXBvdW5kSW5kZXggJiYgZGVidWcpXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiVGhlIHF1ZXJ5IFwiLmNvbmNhdChKU09OLnN0cmluZ2lmeShpbmRleE9yQ3JpdCksIFwiIG9uIFwiKS5jb25jYXQodGhpcy5uYW1lLCBcIiB3b3VsZCBiZW5lZml0IGZyb20gYSBcIikgK1xuICAgICAgICAgICAgICAgICAgICBcImNvbXBvdW5kIGluZGV4IFtcIi5jb25jYXQoa2V5UGF0aHMuam9pbignKycpLCBcIl1cIikpO1xuICAgICAgICAgICAgdmFyIGlkeEJ5TmFtZSA9IHRoaXMuc2NoZW1hLmlkeEJ5TmFtZTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNtcChhLCBiKSA9PT0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBfYSA9IGtleVBhdGhzLnJlZHVjZShmdW5jdGlvbiAoX2EsIGtleVBhdGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJldkluZGV4ID0gX2FbMF0sIHByZXZGaWx0ZXJGbiA9IF9hWzFdO1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGlkeEJ5TmFtZVtrZXlQYXRoXTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBpbmRleE9yQ3JpdFtrZXlQYXRoXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICBwcmV2SW5kZXggfHwgaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIHByZXZJbmRleCB8fCAhaW5kZXggP1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluZShwcmV2RmlsdGVyRm4sIGluZGV4ICYmIGluZGV4Lm11bHRpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IGdldEJ5S2V5UGF0aCh4LCBrZXlQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzQXJyYXkocHJvcCkgJiYgcHJvcC5zb21lKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBlcXVhbHModmFsdWUsIGl0ZW0pOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IDogZnVuY3Rpb24gKHgpIHsgcmV0dXJuIGVxdWFscyh2YWx1ZSwgZ2V0QnlLZXlQYXRoKHgsIGtleVBhdGgpKTsgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcHJldkZpbHRlckZuXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0sIFtudWxsLCBudWxsXSksIGlkeCA9IF9hWzBdLCBmaWx0ZXJGdW5jdGlvbiA9IF9hWzFdO1xuICAgICAgICAgICAgcmV0dXJuIGlkeCA/XG4gICAgICAgICAgICAgICAgdGhpcy53aGVyZShpZHgubmFtZSkuZXF1YWxzKGluZGV4T3JDcml0W2lkeC5rZXlQYXRoXSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmaWx0ZXJGdW5jdGlvbikgOlxuICAgICAgICAgICAgICAgIGNvbXBvdW5kSW5kZXggP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcihmaWx0ZXJGdW5jdGlvbikgOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLndoZXJlKGtleVBhdGhzKS5lcXVhbHMoJycpO1xuICAgICAgICB9O1xuICAgICAgICBUYWJsZS5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24gKGZpbHRlckZ1bmN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b0NvbGxlY3Rpb24oKS5hbmQoZmlsdGVyRnVuY3Rpb24pO1xuICAgICAgICB9O1xuICAgICAgICBUYWJsZS5wcm90b3R5cGUuY291bnQgPSBmdW5jdGlvbiAodGhlblNob3J0Y3V0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b0NvbGxlY3Rpb24oKS5jb3VudCh0aGVuU2hvcnRjdXQpO1xuICAgICAgICB9O1xuICAgICAgICBUYWJsZS5wcm90b3R5cGUub2Zmc2V0ID0gZnVuY3Rpb24gKG9mZnNldCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9Db2xsZWN0aW9uKCkub2Zmc2V0KG9mZnNldCk7XG4gICAgICAgIH07XG4gICAgICAgIFRhYmxlLnByb3RvdHlwZS5saW1pdCA9IGZ1bmN0aW9uIChudW1Sb3dzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b0NvbGxlY3Rpb24oKS5saW1pdChudW1Sb3dzKTtcbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLmVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvQ29sbGVjdGlvbigpLmVhY2goY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgICAgICBUYWJsZS5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICh0aGVuU2hvcnRjdXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvQ29sbGVjdGlvbigpLnRvQXJyYXkodGhlblNob3J0Y3V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLnRvQ29sbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcy5kYi5Db2xsZWN0aW9uKG5ldyB0aGlzLmRiLldoZXJlQ2xhdXNlKHRoaXMpKTtcbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLm9yZGVyQnkgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcy5kYi5Db2xsZWN0aW9uKG5ldyB0aGlzLmRiLldoZXJlQ2xhdXNlKHRoaXMsIGlzQXJyYXkoaW5kZXgpID9cbiAgICAgICAgICAgICAgICBcIltcIi5jb25jYXQoaW5kZXguam9pbignKycpLCBcIl1cIikgOlxuICAgICAgICAgICAgICAgIGluZGV4KSk7XG4gICAgICAgIH07XG4gICAgICAgIFRhYmxlLnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9Db2xsZWN0aW9uKCkucmV2ZXJzZSgpO1xuICAgICAgICB9O1xuICAgICAgICBUYWJsZS5wcm90b3R5cGUubWFwVG9DbGFzcyA9IGZ1bmN0aW9uIChjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgdmFyIF9hID0gdGhpcywgZGIgPSBfYS5kYiwgdGFibGVOYW1lID0gX2EubmFtZTtcbiAgICAgICAgICAgIHRoaXMuc2NoZW1hLm1hcHBlZENsYXNzID0gY29uc3RydWN0b3I7XG4gICAgICAgICAgICBpZiAoY29uc3RydWN0b3IucHJvdG90eXBlIGluc3RhbmNlb2YgRW50aXR5KSB7XG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3IgPSAgKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgX19leHRlbmRzKGNsYXNzXzEsIF9zdXBlcik7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNsYXNzXzEoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNsYXNzXzEucHJvdG90eXBlLCBcImRiXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZGI7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUudGFibGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0YWJsZU5hbWU7IH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc18xO1xuICAgICAgICAgICAgICAgIH0oY29uc3RydWN0b3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBpbmhlcml0ZWRQcm9wcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIGZvciAodmFyIHByb3RvID0gY29uc3RydWN0b3IucHJvdG90eXBlOyBwcm90bzsgcHJvdG8gPSBnZXRQcm90byhwcm90bykpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90bykuZm9yRWFjaChmdW5jdGlvbiAocHJvcE5hbWUpIHsgcmV0dXJuIGluaGVyaXRlZFByb3BzLmFkZChwcm9wTmFtZSk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlYWRIb29rID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgIGlmICghb2JqKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgICAgIHZhciByZXMgPSBPYmplY3QuY3JlYXRlKGNvbnN0cnVjdG9yLnByb3RvdHlwZSk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbSBpbiBvYmopXG4gICAgICAgICAgICAgICAgICAgIGlmICghaW5oZXJpdGVkUHJvcHMuaGFzKG0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNbbV0gPSBvYmpbbV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoXykgeyB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy5zY2hlbWEucmVhZEhvb2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvb2sucmVhZGluZy51bnN1YnNjcmliZSh0aGlzLnNjaGVtYS5yZWFkSG9vayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNjaGVtYS5yZWFkSG9vayA9IHJlYWRIb29rO1xuICAgICAgICAgICAgdGhpcy5ob29rKFwicmVhZGluZ1wiLCByZWFkSG9vayk7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3I7XG4gICAgICAgIH07XG4gICAgICAgIFRhYmxlLnByb3RvdHlwZS5kZWZpbmVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIENsYXNzKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICBleHRlbmQodGhpcywgY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBUb0NsYXNzKENsYXNzKTtcbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChvYmosIGtleSkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHZhciBfYSA9IHRoaXMuc2NoZW1hLnByaW1LZXksIGF1dG8gPSBfYS5hdXRvLCBrZXlQYXRoID0gX2Eua2V5UGF0aDtcbiAgICAgICAgICAgIHZhciBvYmpUb0FkZCA9IG9iajtcbiAgICAgICAgICAgIGlmIChrZXlQYXRoICYmIGF1dG8pIHtcbiAgICAgICAgICAgICAgICBvYmpUb0FkZCA9IHdvcmthcm91bmRGb3JVbmRlZmluZWRQcmltS2V5KGtleVBhdGgpKG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnMoJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0cmFucykge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5jb3JlLm11dGF0ZSh7IHRyYW5zOiB0cmFucywgdHlwZTogJ2FkZCcsIGtleXM6IGtleSAhPSBudWxsID8gW2tleV0gOiBudWxsLCB2YWx1ZXM6IFtvYmpUb0FkZF0gfSk7XG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5udW1GYWlsdXJlcyA/IERleGllUHJvbWlzZS5yZWplY3QocmVzLmZhaWx1cmVzWzBdKSA6IHJlcy5sYXN0UmVzdWx0OyB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChsYXN0UmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleVBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEJ5S2V5UGF0aChvYmosIGtleVBhdGgsIGxhc3RSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChfKSB7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhc3RSZXN1bHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChrZXlPck9iamVjdCwgbW9kaWZpY2F0aW9ucykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXlPck9iamVjdCA9PT0gJ29iamVjdCcgJiYgIWlzQXJyYXkoa2V5T3JPYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGdldEJ5S2V5UGF0aChrZXlPck9iamVjdCwgdGhpcy5zY2hlbWEucHJpbUtleS5rZXlQYXRoKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3Rpb24obmV3IGV4Y2VwdGlvbnMuSW52YWxpZEFyZ3VtZW50KFwiR2l2ZW4gb2JqZWN0IGRvZXMgbm90IGNvbnRhaW4gaXRzIHByaW1hcnkga2V5XCIpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aGVyZShcIjppZFwiKS5lcXVhbHMoa2V5KS5tb2RpZnkobW9kaWZpY2F0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aGVyZShcIjppZFwiKS5lcXVhbHMoa2V5T3JPYmplY3QpLm1vZGlmeShtb2RpZmljYXRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLnB1dCA9IGZ1bmN0aW9uIChvYmosIGtleSkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHZhciBfYSA9IHRoaXMuc2NoZW1hLnByaW1LZXksIGF1dG8gPSBfYS5hdXRvLCBrZXlQYXRoID0gX2Eua2V5UGF0aDtcbiAgICAgICAgICAgIHZhciBvYmpUb0FkZCA9IG9iajtcbiAgICAgICAgICAgIGlmIChrZXlQYXRoICYmIGF1dG8pIHtcbiAgICAgICAgICAgICAgICBvYmpUb0FkZCA9IHdvcmthcm91bmRGb3JVbmRlZmluZWRQcmltS2V5KGtleVBhdGgpKG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnMoJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0cmFucykgeyByZXR1cm4gX3RoaXMuY29yZS5tdXRhdGUoeyB0cmFuczogdHJhbnMsIHR5cGU6ICdwdXQnLCB2YWx1ZXM6IFtvYmpUb0FkZF0sIGtleXM6IGtleSAhPSBudWxsID8gW2tleV0gOiBudWxsIH0pOyB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5udW1GYWlsdXJlcyA/IERleGllUHJvbWlzZS5yZWplY3QocmVzLmZhaWx1cmVzWzBdKSA6IHJlcy5sYXN0UmVzdWx0OyB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChsYXN0UmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleVBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEJ5S2V5UGF0aChvYmosIGtleVBhdGgsIGxhc3RSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChfKSB7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhc3RSZXN1bHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnMoJ3JlYWR3cml0ZScsIGZ1bmN0aW9uICh0cmFucykgeyByZXR1cm4gX3RoaXMuY29yZS5tdXRhdGUoeyB0cmFuczogdHJhbnMsIHR5cGU6ICdkZWxldGUnLCBrZXlzOiBba2V5XSB9KTsgfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMubnVtRmFpbHVyZXMgPyBEZXhpZVByb21pc2UucmVqZWN0KHJlcy5mYWlsdXJlc1swXSkgOiB1bmRlZmluZWQ7IH0pO1xuICAgICAgICB9O1xuICAgICAgICBUYWJsZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zKCdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHJhbnMpIHsgcmV0dXJuIF90aGlzLmNvcmUubXV0YXRlKHsgdHJhbnM6IHRyYW5zLCB0eXBlOiAnZGVsZXRlUmFuZ2UnLCByYW5nZTogQW55UmFuZ2UgfSk7IH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLm51bUZhaWx1cmVzID8gRGV4aWVQcm9taXNlLnJlamVjdChyZXMuZmFpbHVyZXNbMF0pIDogdW5kZWZpbmVkOyB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgVGFibGUucHJvdG90eXBlLmJ1bGtHZXQgPSBmdW5jdGlvbiAoa2V5cykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90cmFucygncmVhZG9ubHknLCBmdW5jdGlvbiAodHJhbnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuY29yZS5nZXRNYW55KHtcbiAgICAgICAgICAgICAgICAgICAga2V5czoga2V5cyxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnM6IHRyYW5zXG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7IHJldHVybiByZXN1bHQubWFwKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLmhvb2sucmVhZGluZy5maXJlKHJlcyk7IH0pOyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBUYWJsZS5wcm90b3R5cGUuYnVsa0FkZCA9IGZ1bmN0aW9uIChvYmplY3RzLCBrZXlzT3JPcHRpb25zLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGtleXMgPSBBcnJheS5pc0FycmF5KGtleXNPck9wdGlvbnMpID8ga2V5c09yT3B0aW9ucyA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IChrZXlzID8gdW5kZWZpbmVkIDoga2V5c09yT3B0aW9ucyk7XG4gICAgICAgICAgICB2YXIgd2FudFJlc3VsdHMgPSBvcHRpb25zID8gb3B0aW9ucy5hbGxLZXlzIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zKCdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHJhbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2EgPSBfdGhpcy5zY2hlbWEucHJpbUtleSwgYXV0byA9IF9hLmF1dG8sIGtleVBhdGggPSBfYS5rZXlQYXRoO1xuICAgICAgICAgICAgICAgIGlmIChrZXlQYXRoICYmIGtleXMpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLkludmFsaWRBcmd1bWVudChcImJ1bGtBZGQoKToga2V5cyBhcmd1bWVudCBpbnZhbGlkIG9uIHRhYmxlcyB3aXRoIGluYm91bmQga2V5c1wiKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5cyAmJiBrZXlzLmxlbmd0aCAhPT0gb2JqZWN0cy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLkludmFsaWRBcmd1bWVudChcIkFyZ3VtZW50cyBvYmplY3RzIGFuZCBrZXlzIG11c3QgaGF2ZSB0aGUgc2FtZSBsZW5ndGhcIik7XG4gICAgICAgICAgICAgICAgdmFyIG51bU9iamVjdHMgPSBvYmplY3RzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0c1RvQWRkID0ga2V5UGF0aCAmJiBhdXRvID9cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0cy5tYXAod29ya2Fyb3VuZEZvclVuZGVmaW5lZFByaW1LZXkoa2V5UGF0aCkpIDpcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0cztcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuY29yZS5tdXRhdGUoeyB0cmFuczogdHJhbnMsIHR5cGU6ICdhZGQnLCBrZXlzOiBrZXlzLCB2YWx1ZXM6IG9iamVjdHNUb0FkZCwgd2FudFJlc3VsdHM6IHdhbnRSZXN1bHRzIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbnVtRmFpbHVyZXMgPSBfYS5udW1GYWlsdXJlcywgcmVzdWx0cyA9IF9hLnJlc3VsdHMsIGxhc3RSZXN1bHQgPSBfYS5sYXN0UmVzdWx0LCBmYWlsdXJlcyA9IF9hLmZhaWx1cmVzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gd2FudFJlc3VsdHMgPyByZXN1bHRzIDogbGFzdFJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG51bUZhaWx1cmVzID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEJ1bGtFcnJvcihcIlwiLmNvbmNhdChfdGhpcy5uYW1lLCBcIi5idWxrQWRkKCk6IFwiKS5jb25jYXQobnVtRmFpbHVyZXMsIFwiIG9mIFwiKS5jb25jYXQobnVtT2JqZWN0cywgXCIgb3BlcmF0aW9ucyBmYWlsZWRcIiksIGZhaWx1cmVzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBUYWJsZS5wcm90b3R5cGUuYnVsa1B1dCA9IGZ1bmN0aW9uIChvYmplY3RzLCBrZXlzT3JPcHRpb25zLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGtleXMgPSBBcnJheS5pc0FycmF5KGtleXNPck9wdGlvbnMpID8ga2V5c09yT3B0aW9ucyA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IChrZXlzID8gdW5kZWZpbmVkIDoga2V5c09yT3B0aW9ucyk7XG4gICAgICAgICAgICB2YXIgd2FudFJlc3VsdHMgPSBvcHRpb25zID8gb3B0aW9ucy5hbGxLZXlzIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zKCdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHJhbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2EgPSBfdGhpcy5zY2hlbWEucHJpbUtleSwgYXV0byA9IF9hLmF1dG8sIGtleVBhdGggPSBfYS5rZXlQYXRoO1xuICAgICAgICAgICAgICAgIGlmIChrZXlQYXRoICYmIGtleXMpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLkludmFsaWRBcmd1bWVudChcImJ1bGtQdXQoKToga2V5cyBhcmd1bWVudCBpbnZhbGlkIG9uIHRhYmxlcyB3aXRoIGluYm91bmQga2V5c1wiKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5cyAmJiBrZXlzLmxlbmd0aCAhPT0gb2JqZWN0cy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLkludmFsaWRBcmd1bWVudChcIkFyZ3VtZW50cyBvYmplY3RzIGFuZCBrZXlzIG11c3QgaGF2ZSB0aGUgc2FtZSBsZW5ndGhcIik7XG4gICAgICAgICAgICAgICAgdmFyIG51bU9iamVjdHMgPSBvYmplY3RzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0c1RvUHV0ID0ga2V5UGF0aCAmJiBhdXRvID9cbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0cy5tYXAod29ya2Fyb3VuZEZvclVuZGVmaW5lZFByaW1LZXkoa2V5UGF0aCkpIDpcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0cztcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuY29yZS5tdXRhdGUoeyB0cmFuczogdHJhbnMsIHR5cGU6ICdwdXQnLCBrZXlzOiBrZXlzLCB2YWx1ZXM6IG9iamVjdHNUb1B1dCwgd2FudFJlc3VsdHM6IHdhbnRSZXN1bHRzIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbnVtRmFpbHVyZXMgPSBfYS5udW1GYWlsdXJlcywgcmVzdWx0cyA9IF9hLnJlc3VsdHMsIGxhc3RSZXN1bHQgPSBfYS5sYXN0UmVzdWx0LCBmYWlsdXJlcyA9IF9hLmZhaWx1cmVzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gd2FudFJlc3VsdHMgPyByZXN1bHRzIDogbGFzdFJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG51bUZhaWx1cmVzID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEJ1bGtFcnJvcihcIlwiLmNvbmNhdChfdGhpcy5uYW1lLCBcIi5idWxrUHV0KCk6IFwiKS5jb25jYXQobnVtRmFpbHVyZXMsIFwiIG9mIFwiKS5jb25jYXQobnVtT2JqZWN0cywgXCIgb3BlcmF0aW9ucyBmYWlsZWRcIiksIGZhaWx1cmVzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBUYWJsZS5wcm90b3R5cGUuYnVsa1VwZGF0ZSA9IGZ1bmN0aW9uIChrZXlzQW5kQ2hhbmdlcykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHZhciBjb3JlVGFibGUgPSB0aGlzLmNvcmU7XG4gICAgICAgICAgICB2YXIga2V5cyA9IGtleXNBbmRDaGFuZ2VzLm1hcChmdW5jdGlvbiAoZW50cnkpIHsgcmV0dXJuIGVudHJ5LmtleTsgfSk7XG4gICAgICAgICAgICB2YXIgY2hhbmdlU3BlY3MgPSBrZXlzQW5kQ2hhbmdlcy5tYXAoZnVuY3Rpb24gKGVudHJ5KSB7IHJldHVybiBlbnRyeS5jaGFuZ2VzOyB9KTtcbiAgICAgICAgICAgIHZhciBvZmZzZXRNYXAgPSBbXTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90cmFucygncmVhZHdyaXRlJywgZnVuY3Rpb24gKHRyYW5zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvcmVUYWJsZS5nZXRNYW55KHsgdHJhbnM6IHRyYW5zLCBrZXlzOiBrZXlzLCBjYWNoZTogJ2Nsb25lJyB9KS50aGVuKGZ1bmN0aW9uIChvYmpzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHRLZXlzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHRPYmpzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGtleXNBbmRDaGFuZ2VzLmZvckVhY2goZnVuY3Rpb24gKF9hLCBpZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBfYS5rZXksIGNoYW5nZXMgPSBfYS5jaGFuZ2VzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IG9ianNbaWR4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9iID0gT2JqZWN0LmtleXMoY2hhbmdlcyk7IF9pIDwgX2IubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXlQYXRoID0gX2JbX2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBjaGFuZ2VzW2tleVBhdGhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5UGF0aCA9PT0gX3RoaXMuc2NoZW1hLnByaW1LZXkua2V5UGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNtcCh2YWx1ZSwga2V5KSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLkNvbnN0cmFpbnQoXCJDYW5ub3QgdXBkYXRlIHByaW1hcnkga2V5IGluIGJ1bGtVcGRhdGUoKVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEJ5S2V5UGF0aChvYmosIGtleVBhdGgsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRNYXAucHVzaChpZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEtleXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdE9ianMucHVzaChvYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG51bUVudHJpZXMgPSByZXN1bHRLZXlzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvcmVUYWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgLm11dGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuczogdHJhbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAncHV0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IHJlc3VsdEtleXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHJlc3VsdE9ianMsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5czoga2V5cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VTcGVjczogY2hhbmdlU3BlY3NcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG51bUZhaWx1cmVzID0gX2EubnVtRmFpbHVyZXMsIGZhaWx1cmVzID0gX2EuZmFpbHVyZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobnVtRmFpbHVyZXMgPT09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bUVudHJpZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9iID0gT2JqZWN0LmtleXMoZmFpbHVyZXMpOyBfaSA8IF9iLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSBfYltfaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hcHBlZE9mZnNldCA9IG9mZnNldE1hcFtOdW1iZXIob2Zmc2V0KV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hcHBlZE9mZnNldCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gZmFpbHVyZXNbb2Zmc2V0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGZhaWx1cmVzW29mZnNldF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWx1cmVzW21hcHBlZE9mZnNldF0gPSBmYWlsdXJlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBCdWxrRXJyb3IoXCJcIi5jb25jYXQoX3RoaXMubmFtZSwgXCIuYnVsa1VwZGF0ZSgpOiBcIikuY29uY2F0KG51bUZhaWx1cmVzLCBcIiBvZiBcIikuY29uY2F0KG51bUVudHJpZXMsIFwiIG9wZXJhdGlvbnMgZmFpbGVkXCIpLCBmYWlsdXJlcyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFRhYmxlLnByb3RvdHlwZS5idWxrRGVsZXRlID0gZnVuY3Rpb24gKGtleXMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgbnVtS2V5cyA9IGtleXMubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zKCdyZWFkd3JpdGUnLCBmdW5jdGlvbiAodHJhbnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuY29yZS5tdXRhdGUoeyB0cmFuczogdHJhbnMsIHR5cGU6ICdkZWxldGUnLCBrZXlzOiBrZXlzIH0pO1xuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICB2YXIgbnVtRmFpbHVyZXMgPSBfYS5udW1GYWlsdXJlcywgbGFzdFJlc3VsdCA9IF9hLmxhc3RSZXN1bHQsIGZhaWx1cmVzID0gX2EuZmFpbHVyZXM7XG4gICAgICAgICAgICAgICAgaWYgKG51bUZhaWx1cmVzID09PSAwKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGFzdFJlc3VsdDtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQnVsa0Vycm9yKFwiXCIuY29uY2F0KF90aGlzLm5hbWUsIFwiLmJ1bGtEZWxldGUoKTogXCIpLmNvbmNhdChudW1GYWlsdXJlcywgXCIgb2YgXCIpLmNvbmNhdChudW1LZXlzLCBcIiBvcGVyYXRpb25zIGZhaWxlZFwiKSwgZmFpbHVyZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBUYWJsZTtcbiAgICB9KCkpO1xuXG4gICAgZnVuY3Rpb24gRXZlbnRzKGN0eCkge1xuICAgICAgICB2YXIgZXZzID0ge307XG4gICAgICAgIHZhciBydiA9IGZ1bmN0aW9uIChldmVudE5hbWUsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIGlmIChzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KGkgLSAxKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoLS1pKVxuICAgICAgICAgICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgICAgICBldnNbZXZlbnROYW1lXS5zdWJzY3JpYmUuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN0eDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiAoZXZlbnROYW1lKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZzW2V2ZW50TmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJ2LmFkZEV2ZW50VHlwZSA9IGFkZDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDEsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICBhZGQoYXJndW1lbnRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcnY7XG4gICAgICAgIGZ1bmN0aW9uIGFkZChldmVudE5hbWUsIGNoYWluRnVuY3Rpb24sIGRlZmF1bHRGdW5jdGlvbikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBldmVudE5hbWUgPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgICAgIHJldHVybiBhZGRDb25maWd1cmVkRXZlbnRzKGV2ZW50TmFtZSk7XG4gICAgICAgICAgICBpZiAoIWNoYWluRnVuY3Rpb24pXG4gICAgICAgICAgICAgICAgY2hhaW5GdW5jdGlvbiA9IHJldmVyc2VTdG9wcGFibGVFdmVudENoYWluO1xuICAgICAgICAgICAgaWYgKCFkZWZhdWx0RnVuY3Rpb24pXG4gICAgICAgICAgICAgICAgZGVmYXVsdEZ1bmN0aW9uID0gbm9wO1xuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlcnM6IFtdLFxuICAgICAgICAgICAgICAgIGZpcmU6IGRlZmF1bHRGdW5jdGlvbixcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5zdWJzY3JpYmVycy5pbmRleE9mKGNiKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3Vic2NyaWJlcnMucHVzaChjYik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpcmUgPSBjaGFpbkZ1bmN0aW9uKGNvbnRleHQuZmlyZSwgY2IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc3Vic2NyaWJlcnMgPSBjb250ZXh0LnN1YnNjcmliZXJzLmZpbHRlcihmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGZuICE9PSBjYjsgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlyZSA9IGNvbnRleHQuc3Vic2NyaWJlcnMucmVkdWNlKGNoYWluRnVuY3Rpb24sIGRlZmF1bHRGdW5jdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGV2c1tldmVudE5hbWVdID0gcnZbZXZlbnROYW1lXSA9IGNvbnRleHQ7XG4gICAgICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhZGRDb25maWd1cmVkRXZlbnRzKGNmZykge1xuICAgICAgICAgICAga2V5cyhjZmcpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gY2ZnW2V2ZW50TmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkoYXJncykpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkKGV2ZW50TmFtZSwgY2ZnW2V2ZW50TmFtZV1bMF0sIGNmZ1tldmVudE5hbWVdWzFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYXJncyA9PT0gJ2FzYXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXh0ID0gYWRkKGV2ZW50TmFtZSwgbWlycm9yLCBmdW5jdGlvbiBmaXJlKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGktLSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzYXAkMShmdW5jdGlvbiBmaXJlRXZlbnQoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLkludmFsaWRBcmd1bWVudChcIkludmFsaWQgZXZlbnQgY29uZmlnXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlQ2xhc3NDb25zdHJ1Y3Rvcihwcm90b3R5cGUsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIGRlcml2ZShjb25zdHJ1Y3RvcikuZnJvbSh7IHByb3RvdHlwZTogcHJvdG90eXBlIH0pO1xuICAgICAgICByZXR1cm4gY29uc3RydWN0b3I7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFibGVDb25zdHJ1Y3RvcihkYikge1xuICAgICAgICByZXR1cm4gbWFrZUNsYXNzQ29uc3RydWN0b3IoVGFibGUucHJvdG90eXBlLCBmdW5jdGlvbiBUYWJsZShuYW1lLCB0YWJsZVNjaGVtYSwgdHJhbnMpIHtcbiAgICAgICAgICAgIHRoaXMuZGIgPSBkYjtcbiAgICAgICAgICAgIHRoaXMuX3R4ID0gdHJhbnM7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgdGhpcy5zY2hlbWEgPSB0YWJsZVNjaGVtYTtcbiAgICAgICAgICAgIHRoaXMuaG9vayA9IGRiLl9hbGxUYWJsZXNbbmFtZV0gPyBkYi5fYWxsVGFibGVzW25hbWVdLmhvb2sgOiBFdmVudHMobnVsbCwge1xuICAgICAgICAgICAgICAgIFwiY3JlYXRpbmdcIjogW2hvb2tDcmVhdGluZ0NoYWluLCBub3BdLFxuICAgICAgICAgICAgICAgIFwicmVhZGluZ1wiOiBbcHVyZUZ1bmN0aW9uQ2hhaW4sIG1pcnJvcl0sXG4gICAgICAgICAgICAgICAgXCJ1cGRhdGluZ1wiOiBbaG9va1VwZGF0aW5nQ2hhaW4sIG5vcF0sXG4gICAgICAgICAgICAgICAgXCJkZWxldGluZ1wiOiBbaG9va0RlbGV0aW5nQ2hhaW4sIG5vcF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1BsYWluS2V5UmFuZ2UoY3R4LCBpZ25vcmVMaW1pdEZpbHRlcikge1xuICAgICAgICByZXR1cm4gIShjdHguZmlsdGVyIHx8IGN0eC5hbGdvcml0aG0gfHwgY3R4Lm9yKSAmJlxuICAgICAgICAgICAgKGlnbm9yZUxpbWl0RmlsdGVyID8gY3R4Lmp1c3RMaW1pdCA6ICFjdHgucmVwbGF5RmlsdGVyKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkRmlsdGVyKGN0eCwgZm4pIHtcbiAgICAgICAgY3R4LmZpbHRlciA9IGNvbWJpbmUoY3R4LmZpbHRlciwgZm4pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRSZXBsYXlGaWx0ZXIoY3R4LCBmYWN0b3J5LCBpc0xpbWl0RmlsdGVyKSB7XG4gICAgICAgIHZhciBjdXJyID0gY3R4LnJlcGxheUZpbHRlcjtcbiAgICAgICAgY3R4LnJlcGxheUZpbHRlciA9IGN1cnIgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBjb21iaW5lKGN1cnIoKSwgZmFjdG9yeSgpKTsgfSA6IGZhY3Rvcnk7XG4gICAgICAgIGN0eC5qdXN0TGltaXQgPSBpc0xpbWl0RmlsdGVyICYmICFjdXJyO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRNYXRjaEZpbHRlcihjdHgsIGZuKSB7XG4gICAgICAgIGN0eC5pc01hdGNoID0gY29tYmluZShjdHguaXNNYXRjaCwgZm4pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRJbmRleE9yU3RvcmUoY3R4LCBjb3JlU2NoZW1hKSB7XG4gICAgICAgIGlmIChjdHguaXNQcmltS2V5KVxuICAgICAgICAgICAgcmV0dXJuIGNvcmVTY2hlbWEucHJpbWFyeUtleTtcbiAgICAgICAgdmFyIGluZGV4ID0gY29yZVNjaGVtYS5nZXRJbmRleEJ5S2V5UGF0aChjdHguaW5kZXgpO1xuICAgICAgICBpZiAoIWluZGV4KVxuICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuU2NoZW1hKFwiS2V5UGF0aCBcIiArIGN0eC5pbmRleCArIFwiIG9uIG9iamVjdCBzdG9yZSBcIiArIGNvcmVTY2hlbWEubmFtZSArIFwiIGlzIG5vdCBpbmRleGVkXCIpO1xuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9wZW5DdXJzb3IoY3R4LCBjb3JlVGFibGUsIHRyYW5zKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4T3JTdG9yZShjdHgsIGNvcmVUYWJsZS5zY2hlbWEpO1xuICAgICAgICByZXR1cm4gY29yZVRhYmxlLm9wZW5DdXJzb3Ioe1xuICAgICAgICAgICAgdHJhbnM6IHRyYW5zLFxuICAgICAgICAgICAgdmFsdWVzOiAhY3R4LmtleXNPbmx5LFxuICAgICAgICAgICAgcmV2ZXJzZTogY3R4LmRpciA9PT0gJ3ByZXYnLFxuICAgICAgICAgICAgdW5pcXVlOiAhIWN0eC51bmlxdWUsXG4gICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICByYW5nZTogY3R4LnJhbmdlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpdGVyKGN0eCwgZm4sIGNvcmVUcmFucywgY29yZVRhYmxlKSB7XG4gICAgICAgIHZhciBmaWx0ZXIgPSBjdHgucmVwbGF5RmlsdGVyID8gY29tYmluZShjdHguZmlsdGVyLCBjdHgucmVwbGF5RmlsdGVyKCkpIDogY3R4LmZpbHRlcjtcbiAgICAgICAgaWYgKCFjdHgub3IpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRlKG9wZW5DdXJzb3IoY3R4LCBjb3JlVGFibGUsIGNvcmVUcmFucyksIGNvbWJpbmUoY3R4LmFsZ29yaXRobSwgZmlsdGVyKSwgZm4sICFjdHgua2V5c09ubHkgJiYgY3R4LnZhbHVlTWFwcGVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBzZXRfMSA9IHt9O1xuICAgICAgICAgICAgdmFyIHVuaW9uID0gZnVuY3Rpb24gKGl0ZW0sIGN1cnNvciwgYWR2YW5jZSkge1xuICAgICAgICAgICAgICAgIGlmICghZmlsdGVyIHx8IGZpbHRlcihjdXJzb3IsIGFkdmFuY2UsIGZ1bmN0aW9uIChyZXN1bHQpIHsgcmV0dXJuIGN1cnNvci5zdG9wKHJlc3VsdCk7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIGN1cnNvci5mYWlsKGVycik7IH0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmltYXJ5S2V5ID0gY3Vyc29yLnByaW1hcnlLZXk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSAnJyArIHByaW1hcnlLZXk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXScpXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXkgPSAnJyArIG5ldyBVaW50OEFycmF5KHByaW1hcnlLZXkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc093bihzZXRfMSwga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0XzFba2V5XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbihpdGVtLCBjdXJzb3IsIGFkdmFuY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgY3R4Lm9yLl9pdGVyYXRlKHVuaW9uLCBjb3JlVHJhbnMpLFxuICAgICAgICAgICAgICAgIGl0ZXJhdGUob3BlbkN1cnNvcihjdHgsIGNvcmVUYWJsZSwgY29yZVRyYW5zKSwgY3R4LmFsZ29yaXRobSwgdW5pb24sICFjdHgua2V5c09ubHkgJiYgY3R4LnZhbHVlTWFwcGVyKVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaXRlcmF0ZShjdXJzb3JQcm9taXNlLCBmaWx0ZXIsIGZuLCB2YWx1ZU1hcHBlcikge1xuICAgICAgICB2YXIgbWFwcGVkRm4gPSB2YWx1ZU1hcHBlciA/IGZ1bmN0aW9uICh4LCBjLCBhKSB7IHJldHVybiBmbih2YWx1ZU1hcHBlcih4KSwgYywgYSk7IH0gOiBmbjtcbiAgICAgICAgdmFyIHdyYXBwZWRGbiA9IHdyYXAobWFwcGVkRm4pO1xuICAgICAgICByZXR1cm4gY3Vyc29yUHJvbWlzZS50aGVuKGZ1bmN0aW9uIChjdXJzb3IpIHtcbiAgICAgICAgICAgIGlmIChjdXJzb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3Vyc29yLnN0YXJ0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBjdXJzb3IuY29udGludWUoKTsgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWx0ZXIgfHwgZmlsdGVyKGN1cnNvciwgZnVuY3Rpb24gKGFkdmFuY2VyKSB7IHJldHVybiBjID0gYWR2YW5jZXI7IH0sIGZ1bmN0aW9uICh2YWwpIHsgY3Vyc29yLnN0b3AodmFsKTsgYyA9IG5vcDsgfSwgZnVuY3Rpb24gKGUpIHsgY3Vyc29yLmZhaWwoZSk7IGMgPSBub3A7IH0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlZEZuKGN1cnNvci52YWx1ZSwgY3Vyc29yLCBmdW5jdGlvbiAoYWR2YW5jZXIpIHsgcmV0dXJuIGMgPSBhZHZhbmNlcjsgfSk7XG4gICAgICAgICAgICAgICAgICAgIGMoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIFByb3BNb2RpZmljYXRpb24gPSAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gUHJvcE1vZGlmaWNhdGlvbihzcGVjKSB7XG4gICAgICAgICAgICB0aGlzW1wiQEBwcm9wbW9kXCJdID0gc3BlYztcbiAgICAgICAgfVxuICAgICAgICBQcm9wTW9kaWZpY2F0aW9uLnByb3RvdHlwZS5leGVjdXRlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICB2YXIgc3BlYyA9IHRoaXNbXCJAQHByb3Btb2RcIl07XG4gICAgICAgICAgICBpZiAoc3BlYy5hZGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhciB0ZXJtID0gc3BlYy5hZGQ7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkodGVybSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgKGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbXSksIHRydWUpLCB0ZXJtLCB0cnVlKS5zb3J0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGVybSA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoTnVtYmVyKHZhbHVlKSB8fCAwKSArIHRlcm07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ZXJtID09PSAnYmlnaW50Jykge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEJpZ0ludCh2YWx1ZSkgKyB0ZXJtO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChfYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEJpZ0ludCgwKSArIHRlcm07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgdGVybSBcIi5jb25jYXQodGVybSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNwZWMucmVtb3ZlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VidHJhaGVuZF8xID0gc3BlYy5yZW1vdmU7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkoc3VidHJhaGVuZF8xKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuICFzdWJ0cmFoZW5kXzEuaW5jbHVkZXMoaXRlbSk7IH0pLnNvcnQoKSA6IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN1YnRyYWhlbmRfMSA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIodmFsdWUpIC0gc3VidHJhaGVuZF8xO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3VidHJhaGVuZF8xID09PSAnYmlnaW50Jykge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEJpZ0ludCh2YWx1ZSkgLSBzdWJ0cmFoZW5kXzE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKF9jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gQmlnSW50KDApIC0gc3VidHJhaGVuZF8xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIHN1YnRyYWhlbmQgXCIuY29uY2F0KHN1YnRyYWhlbmRfMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHByZWZpeFRvUmVwbGFjZSA9IChfYSA9IHNwZWMucmVwbGFjZVByZWZpeCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hWzBdO1xuICAgICAgICAgICAgaWYgKHByZWZpeFRvUmVwbGFjZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLnN0YXJ0c1dpdGgocHJlZml4VG9SZXBsYWNlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzcGVjLnJlcGxhY2VQcmVmaXhbMV0gKyB2YWx1ZS5zdWJzdHJpbmcocHJlZml4VG9SZXBsYWNlLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBQcm9wTW9kaWZpY2F0aW9uO1xuICAgIH0oKSk7XG5cbiAgICB2YXIgQ29sbGVjdGlvbiA9ICAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBDb2xsZWN0aW9uKCkge1xuICAgICAgICB9XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLl9yZWFkID0gZnVuY3Rpb24gKGZuLCBjYikge1xuICAgICAgICAgICAgdmFyIGN0eCA9IHRoaXMuX2N0eDtcbiAgICAgICAgICAgIHJldHVybiBjdHguZXJyb3IgP1xuICAgICAgICAgICAgICAgIGN0eC50YWJsZS5fdHJhbnMobnVsbCwgcmVqZWN0aW9uLmJpbmQobnVsbCwgY3R4LmVycm9yKSkgOlxuICAgICAgICAgICAgICAgIGN0eC50YWJsZS5fdHJhbnMoJ3JlYWRvbmx5JywgZm4pLnRoZW4oY2IpO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5fd3JpdGUgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgIHZhciBjdHggPSB0aGlzLl9jdHg7XG4gICAgICAgICAgICByZXR1cm4gY3R4LmVycm9yID9cbiAgICAgICAgICAgICAgICBjdHgudGFibGUuX3RyYW5zKG51bGwsIHJlamVjdGlvbi5iaW5kKG51bGwsIGN0eC5lcnJvcikpIDpcbiAgICAgICAgICAgICAgICBjdHgudGFibGUuX3RyYW5zKCdyZWFkd3JpdGUnLCBmbiwgXCJsb2NrZWRcIik7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLl9hZGRBbGdvcml0aG0gPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgIHZhciBjdHggPSB0aGlzLl9jdHg7XG4gICAgICAgICAgICBjdHguYWxnb3JpdGhtID0gY29tYmluZShjdHguYWxnb3JpdGhtLCBmbik7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLl9pdGVyYXRlID0gZnVuY3Rpb24gKGZuLCBjb3JlVHJhbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVyKHRoaXMuX2N0eCwgZm4sIGNvcmVUcmFucywgdGhpcy5fY3R4LnRhYmxlLmNvcmUpO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uIChwcm9wcykge1xuICAgICAgICAgICAgdmFyIHJ2ID0gT2JqZWN0LmNyZWF0ZSh0aGlzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSksIGN0eCA9IE9iamVjdC5jcmVhdGUodGhpcy5fY3R4KTtcbiAgICAgICAgICAgIGlmIChwcm9wcylcbiAgICAgICAgICAgICAgICBleHRlbmQoY3R4LCBwcm9wcyk7XG4gICAgICAgICAgICBydi5fY3R4ID0gY3R4O1xuICAgICAgICAgICAgcmV0dXJuIHJ2O1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5yYXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9jdHgudmFsdWVNYXBwZXIgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmVhY2ggPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgIHZhciBjdHggPSB0aGlzLl9jdHg7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVhZChmdW5jdGlvbiAodHJhbnMpIHsgcmV0dXJuIGl0ZXIoY3R4LCBmbiwgdHJhbnMsIGN0eC50YWJsZS5jb3JlKTsgfSk7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmNvdW50ID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWQoZnVuY3Rpb24gKHRyYW5zKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN0eCA9IF90aGlzLl9jdHg7XG4gICAgICAgICAgICAgICAgdmFyIGNvcmVUYWJsZSA9IGN0eC50YWJsZS5jb3JlO1xuICAgICAgICAgICAgICAgIGlmIChpc1BsYWluS2V5UmFuZ2UoY3R4LCB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29yZVRhYmxlLmNvdW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zOiB0cmFucyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGdldEluZGV4T3JTdG9yZShjdHgsIGNvcmVUYWJsZS5zY2hlbWEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlOiBjdHgucmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoY291bnQpIHsgcmV0dXJuIE1hdGgubWluKGNvdW50LCBjdHgubGltaXQpOyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVyKGN0eCwgZnVuY3Rpb24gKCkgeyArK2NvdW50OyByZXR1cm4gZmFsc2U7IH0sIHRyYW5zLCBjb3JlVGFibGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBjb3VudDsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkudGhlbihjYik7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLnNvcnRCeSA9IGZ1bmN0aW9uIChrZXlQYXRoLCBjYikge1xuICAgICAgICAgICAgdmFyIHBhcnRzID0ga2V5UGF0aC5zcGxpdCgnLicpLnJldmVyc2UoKSwgbGFzdFBhcnQgPSBwYXJ0c1swXSwgbGFzdEluZGV4ID0gcGFydHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldHZhbChvYmosIGkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldHZhbChvYmpbcGFydHNbaV1dLCBpIC0gMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ialtsYXN0UGFydF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgb3JkZXIgPSB0aGlzLl9jdHguZGlyID09PSBcIm5leHRcIiA/IDEgOiAtMTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNvcnRlcihhLCBiKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFWYWwgPSBnZXR2YWwoYSwgbGFzdEluZGV4KSwgYlZhbCA9IGdldHZhbChiLCBsYXN0SW5kZXgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbXAoYVZhbCwgYlZhbCkgKiBvcmRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvQXJyYXkoZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5zb3J0KHNvcnRlcik7XG4gICAgICAgICAgICB9KS50aGVuKGNiKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWFkKGZ1bmN0aW9uICh0cmFucykge1xuICAgICAgICAgICAgICAgIHZhciBjdHggPSBfdGhpcy5fY3R4O1xuICAgICAgICAgICAgICAgIGlmIChjdHguZGlyID09PSAnbmV4dCcgJiYgaXNQbGFpbktleVJhbmdlKGN0eCwgdHJ1ZSkgJiYgY3R4LmxpbWl0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVNYXBwZXJfMSA9IGN0eC52YWx1ZU1hcHBlcjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhPclN0b3JlKGN0eCwgY3R4LnRhYmxlLmNvcmUuc2NoZW1hKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN0eC50YWJsZS5jb3JlLnF1ZXJ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zOiB0cmFucyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiBjdHgubGltaXQsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZTogY3R4LnJhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gX2EucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlTWFwcGVyXzEgPyByZXN1bHQubWFwKHZhbHVlTWFwcGVyXzEpIDogcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhXzEgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZXIoY3R4LCBmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gYV8xLnB1c2goaXRlbSk7IH0sIHRyYW5zLCBjdHgudGFibGUuY29yZSkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBhXzE7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGNiKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUub2Zmc2V0ID0gZnVuY3Rpb24gKG9mZnNldCkge1xuICAgICAgICAgICAgdmFyIGN0eCA9IHRoaXMuX2N0eDtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPD0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIGN0eC5vZmZzZXQgKz0gb2Zmc2V0O1xuICAgICAgICAgICAgaWYgKGlzUGxhaW5LZXlSYW5nZShjdHgpKSB7XG4gICAgICAgICAgICAgICAgYWRkUmVwbGF5RmlsdGVyKGN0eCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0TGVmdCA9IG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjdXJzb3IsIGFkdmFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXRMZWZ0ID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldExlZnQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLW9mZnNldExlZnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLmFkdmFuY2Uob2Zmc2V0TGVmdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0TGVmdCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFkZFJlcGxheUZpbHRlcihjdHgsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldExlZnQgPSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiAoLS1vZmZzZXRMZWZ0IDwgMCk7IH07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUubGltaXQgPSBmdW5jdGlvbiAobnVtUm93cykge1xuICAgICAgICAgICAgdGhpcy5fY3R4LmxpbWl0ID0gTWF0aC5taW4odGhpcy5fY3R4LmxpbWl0LCBudW1Sb3dzKTtcbiAgICAgICAgICAgIGFkZFJlcGxheUZpbHRlcih0aGlzLl9jdHgsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcm93c0xlZnQgPSBudW1Sb3dzO1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoY3Vyc29yLCBhZHZhbmNlLCByZXNvbHZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgtLXJvd3NMZWZ0IDw9IDApXG4gICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKHJlc29sdmUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93c0xlZnQgPj0gMDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUudW50aWwgPSBmdW5jdGlvbiAoZmlsdGVyRnVuY3Rpb24sIGJJbmNsdWRlU3RvcEVudHJ5KSB7XG4gICAgICAgICAgICBhZGRGaWx0ZXIodGhpcy5fY3R4LCBmdW5jdGlvbiAoY3Vyc29yLCBhZHZhbmNlLCByZXNvbHZlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlckZ1bmN0aW9uKGN1cnNvci52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZShyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJJbmNsdWRlU3RvcEVudHJ5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpbWl0KDEpLnRvQXJyYXkoZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGFbMF07IH0pLnRoZW4oY2IpO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5sYXN0ID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXZlcnNlKCkuZmlyc3QoY2IpO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbiAoZmlsdGVyRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGFkZEZpbHRlcih0aGlzLl9jdHgsIGZ1bmN0aW9uIChjdXJzb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyRnVuY3Rpb24oY3Vyc29yLnZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYWRkTWF0Y2hGaWx0ZXIodGhpcy5fY3R4LCBmaWx0ZXJGdW5jdGlvbik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuYW5kID0gZnVuY3Rpb24gKGZpbHRlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKGZpbHRlcik7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLm9yID0gZnVuY3Rpb24gKGluZGV4TmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzLmRiLldoZXJlQ2xhdXNlKHRoaXMuX2N0eC50YWJsZSwgaW5kZXhOYW1lLCB0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5kaXIgPSAodGhpcy5fY3R4LmRpciA9PT0gXCJwcmV2XCIgPyBcIm5leHRcIiA6IFwicHJldlwiKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vbmRpcmVjdGlvbmNoYW5nZSlcbiAgICAgICAgICAgICAgICB0aGlzLl9vbmRpcmVjdGlvbmNoYW5nZSh0aGlzLl9jdHguZGlyKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5kZXNjID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmV2ZXJzZSgpO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5lYWNoS2V5ID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gdGhpcy5fY3R4O1xuICAgICAgICAgICAgY3R4LmtleXNPbmx5ID0gIWN0eC5pc01hdGNoO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodmFsLCBjdXJzb3IpIHsgY2IoY3Vyc29yLmtleSwgY3Vyc29yKTsgfSk7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmVhY2hVbmlxdWVLZXkgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgIHRoaXMuX2N0eC51bmlxdWUgPSBcInVuaXF1ZVwiO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaEtleShjYik7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmVhY2hQcmltYXJ5S2V5ID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gdGhpcy5fY3R4O1xuICAgICAgICAgICAgY3R4LmtleXNPbmx5ID0gIWN0eC5pc01hdGNoO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAodmFsLCBjdXJzb3IpIHsgY2IoY3Vyc29yLnByaW1hcnlLZXksIGN1cnNvcik7IH0pO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gdGhpcy5fY3R4O1xuICAgICAgICAgICAgY3R4LmtleXNPbmx5ID0gIWN0eC5pc01hdGNoO1xuICAgICAgICAgICAgdmFyIGEgPSBbXTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGl0ZW0sIGN1cnNvcikge1xuICAgICAgICAgICAgICAgIGEucHVzaChjdXJzb3Iua2V5KTtcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICAgICAgfSkudGhlbihjYik7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLnByaW1hcnlLZXlzID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gdGhpcy5fY3R4O1xuICAgICAgICAgICAgaWYgKGN0eC5kaXIgPT09ICduZXh0JyAmJiBpc1BsYWluS2V5UmFuZ2UoY3R4LCB0cnVlKSAmJiBjdHgubGltaXQgPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWQoZnVuY3Rpb24gKHRyYW5zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4T3JTdG9yZShjdHgsIGN0eC50YWJsZS5jb3JlLnNjaGVtYSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdHgudGFibGUuY29yZS5xdWVyeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuczogdHJhbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IGN0eC5saW1pdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlOiBjdHgucmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IF9hLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9KS50aGVuKGNiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN0eC5rZXlzT25seSA9ICFjdHguaXNNYXRjaDtcbiAgICAgICAgICAgIHZhciBhID0gW107XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpdGVtLCBjdXJzb3IpIHtcbiAgICAgICAgICAgICAgICBhLnB1c2goY3Vyc29yLnByaW1hcnlLZXkpO1xuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgICAgICB9KS50aGVuKGNiKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUudW5pcXVlS2V5cyA9IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgdGhpcy5fY3R4LnVuaXF1ZSA9IFwidW5pcXVlXCI7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5rZXlzKGNiKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuZmlyc3RLZXkgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpbWl0KDEpLmtleXMoZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGFbMF07IH0pLnRoZW4oY2IpO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5sYXN0S2V5ID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXZlcnNlKCkuZmlyc3RLZXkoY2IpO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5kaXN0aW5jdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdHggPSB0aGlzLl9jdHgsIGlkeCA9IGN0eC5pbmRleCAmJiBjdHgudGFibGUuc2NoZW1hLmlkeEJ5TmFtZVtjdHguaW5kZXhdO1xuICAgICAgICAgICAgaWYgKCFpZHggfHwgIWlkeC5tdWx0aSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIHZhciBzZXQgPSB7fTtcbiAgICAgICAgICAgIGFkZEZpbHRlcih0aGlzLl9jdHgsIGZ1bmN0aW9uIChjdXJzb3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RyS2V5ID0gY3Vyc29yLnByaW1hcnlLZXkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBoYXNPd24oc2V0LCBzdHJLZXkpO1xuICAgICAgICAgICAgICAgIHNldFtzdHJLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gIWZvdW5kO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUubW9kaWZ5ID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgY3R4ID0gdGhpcy5fY3R4O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlKGZ1bmN0aW9uICh0cmFucykge1xuICAgICAgICAgICAgICAgIHZhciBtb2RpZnllcjtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNoYW5nZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZ5ZXIgPSBjaGFuZ2VzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleVBhdGhzID0ga2V5cyhjaGFuZ2VzKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG51bUtleXMgPSBrZXlQYXRocy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIG1vZGlmeWVyID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbnl0aGluZ01vZGlmaWVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bUtleXM7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXlQYXRoID0ga2V5UGF0aHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IGNoYW5nZXNba2V5UGF0aF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yaWdWYWwgPSBnZXRCeUtleVBhdGgoaXRlbSwga2V5UGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIFByb3BNb2RpZmljYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnlLZXlQYXRoKGl0ZW0sIGtleVBhdGgsIHZhbC5leGVjdXRlKG9yaWdWYWwpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW55dGhpbmdNb2RpZmllZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9yaWdWYWwgIT09IHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCeUtleVBhdGgoaXRlbSwga2V5UGF0aCwgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW55dGhpbmdNb2RpZmllZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFueXRoaW5nTW9kaWZpZWQ7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjb3JlVGFibGUgPSBjdHgudGFibGUuY29yZTtcbiAgICAgICAgICAgICAgICB2YXIgX2EgPSBjb3JlVGFibGUuc2NoZW1hLnByaW1hcnlLZXksIG91dGJvdW5kID0gX2Eub3V0Ym91bmQsIGV4dHJhY3RLZXkgPSBfYS5leHRyYWN0S2V5O1xuICAgICAgICAgICAgICAgIHZhciBsaW1pdCA9IDIwMDtcbiAgICAgICAgICAgICAgICB2YXIgbW9kaWZ5Q2h1bmtTaXplID0gX3RoaXMuZGIuX29wdGlvbnMubW9kaWZ5Q2h1bmtTaXplO1xuICAgICAgICAgICAgICAgIGlmIChtb2RpZnlDaHVua1NpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtb2RpZnlDaHVua1NpemUgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0ID0gbW9kaWZ5Q2h1bmtTaXplW2NvcmVUYWJsZS5uYW1lXSB8fCBtb2RpZnlDaHVua1NpemVbJyonXSB8fCAyMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdCA9IG1vZGlmeUNodW5rU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdG90YWxGYWlsdXJlcyA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIHZhciBmYWlsZWRLZXlzID0gW107XG4gICAgICAgICAgICAgICAgdmFyIGFwcGx5TXV0YXRlUmVzdWx0ID0gZnVuY3Rpb24gKGV4cGVjdGVkQ291bnQsIHJlcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZXMgPSByZXMuZmFpbHVyZXMsIG51bUZhaWx1cmVzID0gcmVzLm51bUZhaWx1cmVzO1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ291bnQgKz0gZXhwZWN0ZWRDb3VudCAtIG51bUZhaWx1cmVzO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0ga2V5cyhmYWlsdXJlcyk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxGYWlsdXJlcy5wdXNoKGZhaWx1cmVzW3Bvc10pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuY2xvbmUoKS5wcmltYXJ5S2V5cygpLnRoZW4oZnVuY3Rpb24gKGtleXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNyaXRlcmlhID0gaXNQbGFpbktleVJhbmdlKGN0eCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5saW1pdCA9PT0gSW5maW5pdHkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgY2hhbmdlcyAhPT0gJ2Z1bmN0aW9uJyB8fCBjaGFuZ2VzID09PSBkZWxldGVDYWxsYmFjaykgJiYge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGN0eC5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlOiBjdHgucmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRDaHVuayA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb3VudCA9IE1hdGgubWluKGxpbWl0LCBrZXlzLmxlbmd0aCAtIG9mZnNldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29yZVRhYmxlLmdldE1hbnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zOiB0cmFucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBrZXlzLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgY291bnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlOiBcImltbXV0YWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWRkVmFsdWVzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHB1dFZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwdXRLZXlzID0gb3V0Ym91bmQgPyBbXSA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGV0ZUtleXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yaWdWYWx1ZSA9IHZhbHVlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN0eF8xID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRlZXBDbG9uZShvcmlnVmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbUtleToga2V5c1tvZmZzZXQgKyBpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kaWZ5ZXIuY2FsbChjdHhfMSwgY3R4XzEudmFsdWUsIGN0eF8xKSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHhfMS52YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlS2V5cy5wdXNoKGtleXNbb2Zmc2V0ICsgaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIW91dGJvdW5kICYmIGNtcChleHRyYWN0S2V5KG9yaWdWYWx1ZSksIGV4dHJhY3RLZXkoY3R4XzEudmFsdWUpKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZUtleXMucHVzaChrZXlzW29mZnNldCArIGldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRWYWx1ZXMucHVzaChjdHhfMS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXRWYWx1ZXMucHVzaChjdHhfMS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG91dGJvdW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXRLZXlzLnB1c2goa2V5c1tvZmZzZXQgKyBpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShhZGRWYWx1ZXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3JlVGFibGUubXV0YXRlKHsgdHJhbnM6IHRyYW5zLCB0eXBlOiAnYWRkJywgdmFsdWVzOiBhZGRWYWx1ZXMgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHBvcyBpbiByZXMuZmFpbHVyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVLZXlzLnNwbGljZShwYXJzZUludChwb3MpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGx5TXV0YXRlUmVzdWx0KGFkZFZhbHVlcy5sZW5ndGgsIHJlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIChwdXRWYWx1ZXMubGVuZ3RoID4gMCB8fCAoY3JpdGVyaWEgJiYgdHlwZW9mIGNoYW5nZXMgPT09ICdvYmplY3QnKSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29yZVRhYmxlLm11dGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuczogdHJhbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAncHV0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IHB1dEtleXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHB1dFZhbHVlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyaXRlcmlhOiBjcml0ZXJpYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZVNwZWM6IHR5cGVvZiBjaGFuZ2VzICE9PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgY2hhbmdlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQWRkaXRpb25hbENodW5rOiBvZmZzZXQgPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gYXBwbHlNdXRhdGVSZXN1bHQocHV0VmFsdWVzLmxlbmd0aCwgcmVzKTsgfSk7IH0pLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gKGRlbGV0ZUtleXMubGVuZ3RoID4gMCB8fCAoY3JpdGVyaWEgJiYgY2hhbmdlcyA9PT0gZGVsZXRlQ2FsbGJhY2spKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3JlVGFibGUubXV0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zOiB0cmFucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkZWxldGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5czogZGVsZXRlS2V5cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyaXRlcmlhOiBjcml0ZXJpYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQWRkaXRpb25hbENodW5rOiBvZmZzZXQgPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gYXBwbHlNdXRhdGVSZXN1bHQoZGVsZXRlS2V5cy5sZW5ndGgsIHJlcyk7IH0pOyB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleXMubGVuZ3RoID4gb2Zmc2V0ICsgY291bnQgJiYgbmV4dENodW5rKG9mZnNldCArIGxpbWl0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dENodW5rKDApLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvdGFsRmFpbHVyZXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTW9kaWZ5RXJyb3IoXCJFcnJvciBtb2RpZnlpbmcgb25lIG9yIG1vcmUgb2JqZWN0c1wiLCB0b3RhbEZhaWx1cmVzLCBzdWNjZXNzQ291bnQsIGZhaWxlZEtleXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gdGhpcy5fY3R4LCByYW5nZSA9IGN0eC5yYW5nZTtcbiAgICAgICAgICAgIGlmIChpc1BsYWluS2V5UmFuZ2UoY3R4KSAmJlxuICAgICAgICAgICAgICAgIChjdHguaXNQcmltS2V5IHx8IHJhbmdlLnR5cGUgPT09IDMgKSlcbiAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRlKGZ1bmN0aW9uICh0cmFucykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJpbWFyeUtleSA9IGN0eC50YWJsZS5jb3JlLnNjaGVtYS5wcmltYXJ5S2V5O1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29yZVJhbmdlID0gcmFuZ2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdHgudGFibGUuY29yZS5jb3VudCh7IHRyYW5zOiB0cmFucywgcXVlcnk6IHsgaW5kZXg6IHByaW1hcnlLZXksIHJhbmdlOiBjb3JlUmFuZ2UgfSB9KS50aGVuKGZ1bmN0aW9uIChjb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN0eC50YWJsZS5jb3JlLm11dGF0ZSh7IHRyYW5zOiB0cmFucywgdHlwZTogJ2RlbGV0ZVJhbmdlJywgcmFuZ2U6IGNvcmVSYW5nZSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlcyA9IF9hLmZhaWx1cmVzOyBfYS5sYXN0UmVzdWx0OyBfYS5yZXN1bHRzOyB2YXIgbnVtRmFpbHVyZXMgPSBfYS5udW1GYWlsdXJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobnVtRmFpbHVyZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBNb2RpZnlFcnJvcihcIkNvdWxkIG5vdCBkZWxldGUgc29tZSB2YWx1ZXNcIiwgT2JqZWN0LmtleXMoZmFpbHVyZXMpLm1hcChmdW5jdGlvbiAocG9zKSB7IHJldHVybiBmYWlsdXJlc1twb3NdOyB9KSwgY291bnQgLSBudW1GYWlsdXJlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdW50IC0gbnVtRmFpbHVyZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RpZnkoZGVsZXRlQ2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQ29sbGVjdGlvbjtcbiAgICB9KCkpO1xuICAgIHZhciBkZWxldGVDYWxsYmFjayA9IGZ1bmN0aW9uICh2YWx1ZSwgY3R4KSB7IHJldHVybiBjdHgudmFsdWUgPSBudWxsOyB9O1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29sbGVjdGlvbkNvbnN0cnVjdG9yKGRiKSB7XG4gICAgICAgIHJldHVybiBtYWtlQ2xhc3NDb25zdHJ1Y3RvcihDb2xsZWN0aW9uLnByb3RvdHlwZSwgZnVuY3Rpb24gQ29sbGVjdGlvbih3aGVyZUNsYXVzZSwga2V5UmFuZ2VHZW5lcmF0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuZGIgPSBkYjtcbiAgICAgICAgICAgIHZhciBrZXlSYW5nZSA9IEFueVJhbmdlLCBlcnJvciA9IG51bGw7XG4gICAgICAgICAgICBpZiAoa2V5UmFuZ2VHZW5lcmF0b3IpXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAga2V5UmFuZ2UgPSBrZXlSYW5nZUdlbmVyYXRvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgd2hlcmVDdHggPSB3aGVyZUNsYXVzZS5fY3R4O1xuICAgICAgICAgICAgdmFyIHRhYmxlID0gd2hlcmVDdHgudGFibGU7XG4gICAgICAgICAgICB2YXIgcmVhZGluZ0hvb2sgPSB0YWJsZS5ob29rLnJlYWRpbmcuZmlyZTtcbiAgICAgICAgICAgIHRoaXMuX2N0eCA9IHtcbiAgICAgICAgICAgICAgICB0YWJsZTogdGFibGUsXG4gICAgICAgICAgICAgICAgaW5kZXg6IHdoZXJlQ3R4LmluZGV4LFxuICAgICAgICAgICAgICAgIGlzUHJpbUtleTogKCF3aGVyZUN0eC5pbmRleCB8fCAodGFibGUuc2NoZW1hLnByaW1LZXkua2V5UGF0aCAmJiB3aGVyZUN0eC5pbmRleCA9PT0gdGFibGUuc2NoZW1hLnByaW1LZXkubmFtZSkpLFxuICAgICAgICAgICAgICAgIHJhbmdlOiBrZXlSYW5nZSxcbiAgICAgICAgICAgICAgICBrZXlzT25seTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGlyOiBcIm5leHRcIixcbiAgICAgICAgICAgICAgICB1bmlxdWU6IFwiXCIsXG4gICAgICAgICAgICAgICAgYWxnb3JpdGhtOiBudWxsLFxuICAgICAgICAgICAgICAgIGZpbHRlcjogbnVsbCxcbiAgICAgICAgICAgICAgICByZXBsYXlGaWx0ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAganVzdExpbWl0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGlzTWF0Y2g6IG51bGwsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgIGxpbWl0OiBJbmZpbml0eSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3IsXG4gICAgICAgICAgICAgICAgb3I6IHdoZXJlQ3R4Lm9yLFxuICAgICAgICAgICAgICAgIHZhbHVlTWFwcGVyOiByZWFkaW5nSG9vayAhPT0gbWlycm9yID8gcmVhZGluZ0hvb2sgOiBudWxsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaW1wbGVDb21wYXJlKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID09PSBiID8gMCA6IDE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNpbXBsZUNvbXBhcmVSZXZlcnNlKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgPiBiID8gLTEgOiBhID09PSBiID8gMCA6IDE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmFpbChjb2xsZWN0aW9uT3JXaGVyZUNsYXVzZSwgZXJyLCBUKSB7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gY29sbGVjdGlvbk9yV2hlcmVDbGF1c2UgaW5zdGFuY2VvZiBXaGVyZUNsYXVzZSA/XG4gICAgICAgICAgICBuZXcgY29sbGVjdGlvbk9yV2hlcmVDbGF1c2UuQ29sbGVjdGlvbihjb2xsZWN0aW9uT3JXaGVyZUNsYXVzZSkgOlxuICAgICAgICAgICAgY29sbGVjdGlvbk9yV2hlcmVDbGF1c2U7XG4gICAgICAgIGNvbGxlY3Rpb24uX2N0eC5lcnJvciA9IFQgPyBuZXcgVChlcnIpIDogbmV3IFR5cGVFcnJvcihlcnIpO1xuICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gZW1wdHlDb2xsZWN0aW9uKHdoZXJlQ2xhdXNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgd2hlcmVDbGF1c2UuQ29sbGVjdGlvbih3aGVyZUNsYXVzZSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gcmFuZ2VFcXVhbChcIlwiKTsgfSkubGltaXQoMCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwcGVyRmFjdG9yeShkaXIpIHtcbiAgICAgICAgcmV0dXJuIGRpciA9PT0gXCJuZXh0XCIgP1xuICAgICAgICAgICAgZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMudG9VcHBlckNhc2UoKTsgfSA6XG4gICAgICAgICAgICBmdW5jdGlvbiAocykgeyByZXR1cm4gcy50b0xvd2VyQ2FzZSgpOyB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBsb3dlckZhY3RvcnkoZGlyKSB7XG4gICAgICAgIHJldHVybiBkaXIgPT09IFwibmV4dFwiID9cbiAgICAgICAgICAgIGZ1bmN0aW9uIChzKSB7IHJldHVybiBzLnRvTG93ZXJDYXNlKCk7IH0gOlxuICAgICAgICAgICAgZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMudG9VcHBlckNhc2UoKTsgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbmV4dENhc2luZyhrZXksIGxvd2VyS2V5LCB1cHBlck5lZWRsZSwgbG93ZXJOZWVkbGUsIGNtcCwgZGlyKSB7XG4gICAgICAgIHZhciBsZW5ndGggPSBNYXRoLm1pbihrZXkubGVuZ3RoLCBsb3dlck5lZWRsZS5sZW5ndGgpO1xuICAgICAgICB2YXIgbGxwID0gLTE7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBsd3JLZXlDaGFyID0gbG93ZXJLZXlbaV07XG4gICAgICAgICAgICBpZiAobHdyS2V5Q2hhciAhPT0gbG93ZXJOZWVkbGVbaV0pIHtcbiAgICAgICAgICAgICAgICBpZiAoY21wKGtleVtpXSwgdXBwZXJOZWVkbGVbaV0pIDwgMClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleS5zdWJzdHIoMCwgaSkgKyB1cHBlck5lZWRsZVtpXSArIHVwcGVyTmVlZGxlLnN1YnN0cihpICsgMSk7XG4gICAgICAgICAgICAgICAgaWYgKGNtcChrZXlbaV0sIGxvd2VyTmVlZGxlW2ldKSA8IDApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXkuc3Vic3RyKDAsIGkpICsgbG93ZXJOZWVkbGVbaV0gKyB1cHBlck5lZWRsZS5zdWJzdHIoaSArIDEpO1xuICAgICAgICAgICAgICAgIGlmIChsbHAgPj0gMClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleS5zdWJzdHIoMCwgbGxwKSArIGxvd2VyS2V5W2xscF0gKyB1cHBlck5lZWRsZS5zdWJzdHIobGxwICsgMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY21wKGtleVtpXSwgbHdyS2V5Q2hhcikgPCAwKVxuICAgICAgICAgICAgICAgIGxscCA9IGk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxlbmd0aCA8IGxvd2VyTmVlZGxlLmxlbmd0aCAmJiBkaXIgPT09IFwibmV4dFwiKVxuICAgICAgICAgICAgcmV0dXJuIGtleSArIHVwcGVyTmVlZGxlLnN1YnN0cihrZXkubGVuZ3RoKTtcbiAgICAgICAgaWYgKGxlbmd0aCA8IGtleS5sZW5ndGggJiYgZGlyID09PSBcInByZXZcIilcbiAgICAgICAgICAgIHJldHVybiBrZXkuc3Vic3RyKDAsIHVwcGVyTmVlZGxlLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiAobGxwIDwgMCA/IG51bGwgOiBrZXkuc3Vic3RyKDAsIGxscCkgKyBsb3dlck5lZWRsZVtsbHBdICsgdXBwZXJOZWVkbGUuc3Vic3RyKGxscCArIDEpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkSWdub3JlQ2FzZUFsZ29yaXRobSh3aGVyZUNsYXVzZSwgbWF0Y2gsIG5lZWRsZXMsIHN1ZmZpeCkge1xuICAgICAgICB2YXIgdXBwZXIsIGxvd2VyLCBjb21wYXJlLCB1cHBlck5lZWRsZXMsIGxvd2VyTmVlZGxlcywgZGlyZWN0aW9uLCBuZXh0S2V5U3VmZml4LCBuZWVkbGVzTGVuID0gbmVlZGxlcy5sZW5ndGg7XG4gICAgICAgIGlmICghbmVlZGxlcy5ldmVyeShmdW5jdGlvbiAocykgeyByZXR1cm4gdHlwZW9mIHMgPT09ICdzdHJpbmcnOyB9KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhaWwod2hlcmVDbGF1c2UsIFNUUklOR19FWFBFQ1RFRCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaW5pdERpcmVjdGlvbihkaXIpIHtcbiAgICAgICAgICAgIHVwcGVyID0gdXBwZXJGYWN0b3J5KGRpcik7XG4gICAgICAgICAgICBsb3dlciA9IGxvd2VyRmFjdG9yeShkaXIpO1xuICAgICAgICAgICAgY29tcGFyZSA9IChkaXIgPT09IFwibmV4dFwiID8gc2ltcGxlQ29tcGFyZSA6IHNpbXBsZUNvbXBhcmVSZXZlcnNlKTtcbiAgICAgICAgICAgIHZhciBuZWVkbGVCb3VuZHMgPSBuZWVkbGVzLm1hcChmdW5jdGlvbiAobmVlZGxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbG93ZXI6IGxvd2VyKG5lZWRsZSksIHVwcGVyOiB1cHBlcihuZWVkbGUpIH07XG4gICAgICAgICAgICB9KS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmUoYS5sb3dlciwgYi5sb3dlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHVwcGVyTmVlZGxlcyA9IG5lZWRsZUJvdW5kcy5tYXAoZnVuY3Rpb24gKG5iKSB7IHJldHVybiBuYi51cHBlcjsgfSk7XG4gICAgICAgICAgICBsb3dlck5lZWRsZXMgPSBuZWVkbGVCb3VuZHMubWFwKGZ1bmN0aW9uIChuYikgeyByZXR1cm4gbmIubG93ZXI7IH0pO1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gZGlyO1xuICAgICAgICAgICAgbmV4dEtleVN1ZmZpeCA9IChkaXIgPT09IFwibmV4dFwiID8gXCJcIiA6IHN1ZmZpeCk7XG4gICAgICAgIH1cbiAgICAgICAgaW5pdERpcmVjdGlvbihcIm5leHRcIik7XG4gICAgICAgIHZhciBjID0gbmV3IHdoZXJlQ2xhdXNlLkNvbGxlY3Rpb24od2hlcmVDbGF1c2UsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNyZWF0ZVJhbmdlKHVwcGVyTmVlZGxlc1swXSwgbG93ZXJOZWVkbGVzW25lZWRsZXNMZW4gLSAxXSArIHN1ZmZpeCk7IH0pO1xuICAgICAgICBjLl9vbmRpcmVjdGlvbmNoYW5nZSA9IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGluaXREaXJlY3Rpb24oZGlyZWN0aW9uKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGZpcnN0UG9zc2libGVOZWVkbGUgPSAwO1xuICAgICAgICBjLl9hZGRBbGdvcml0aG0oZnVuY3Rpb24gKGN1cnNvciwgYWR2YW5jZSwgcmVzb2x2ZSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IGN1cnNvci5rZXk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgdmFyIGxvd2VyS2V5ID0gbG93ZXIoa2V5KTtcbiAgICAgICAgICAgIGlmIChtYXRjaChsb3dlcktleSwgbG93ZXJOZWVkbGVzLCBmaXJzdFBvc3NpYmxlTmVlZGxlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGxvd2VzdFBvc3NpYmxlQ2FzaW5nID0gbnVsbDtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gZmlyc3RQb3NzaWJsZU5lZWRsZTsgaSA8IG5lZWRsZXNMZW47ICsraSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2FzaW5nID0gbmV4dENhc2luZyhrZXksIGxvd2VyS2V5LCB1cHBlck5lZWRsZXNbaV0sIGxvd2VyTmVlZGxlc1tpXSwgY29tcGFyZSwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhc2luZyA9PT0gbnVsbCAmJiBsb3dlc3RQb3NzaWJsZUNhc2luZyA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0UG9zc2libGVOZWVkbGUgPSBpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobG93ZXN0UG9zc2libGVDYXNpbmcgPT09IG51bGwgfHwgY29tcGFyZShsb3dlc3RQb3NzaWJsZUNhc2luZywgY2FzaW5nKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VzdFBvc3NpYmxlQ2FzaW5nID0gY2FzaW5nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsb3dlc3RQb3NzaWJsZUNhc2luZyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKGZ1bmN0aW9uICgpIHsgY3Vyc29yLmNvbnRpbnVlKGxvd2VzdFBvc3NpYmxlQ2FzaW5nICsgbmV4dEtleVN1ZmZpeCk7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZShyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGM7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZVJhbmdlKGxvd2VyLCB1cHBlciwgbG93ZXJPcGVuLCB1cHBlck9wZW4pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IDIgLFxuICAgICAgICAgICAgbG93ZXI6IGxvd2VyLFxuICAgICAgICAgICAgdXBwZXI6IHVwcGVyLFxuICAgICAgICAgICAgbG93ZXJPcGVuOiBsb3dlck9wZW4sXG4gICAgICAgICAgICB1cHBlck9wZW46IHVwcGVyT3BlblxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiByYW5nZUVxdWFsKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAxICxcbiAgICAgICAgICAgIGxvd2VyOiB2YWx1ZSxcbiAgICAgICAgICAgIHVwcGVyOiB2YWx1ZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBXaGVyZUNsYXVzZSA9ICAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBXaGVyZUNsYXVzZSgpIHtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV2hlcmVDbGF1c2UucHJvdG90eXBlLCBcIkNvbGxlY3Rpb25cIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N0eC50YWJsZS5kYi5Db2xsZWN0aW9uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBXaGVyZUNsYXVzZS5wcm90b3R5cGUuYmV0d2VlbiA9IGZ1bmN0aW9uIChsb3dlciwgdXBwZXIsIGluY2x1ZGVMb3dlciwgaW5jbHVkZVVwcGVyKSB7XG4gICAgICAgICAgICBpbmNsdWRlTG93ZXIgPSBpbmNsdWRlTG93ZXIgIT09IGZhbHNlO1xuICAgICAgICAgICAgaW5jbHVkZVVwcGVyID0gaW5jbHVkZVVwcGVyID09PSB0cnVlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoKHRoaXMuX2NtcChsb3dlciwgdXBwZXIpID4gMCkgfHxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuX2NtcChsb3dlciwgdXBwZXIpID09PSAwICYmIChpbmNsdWRlTG93ZXIgfHwgaW5jbHVkZVVwcGVyKSAmJiAhKGluY2x1ZGVMb3dlciAmJiBpbmNsdWRlVXBwZXIpKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5Q29sbGVjdGlvbih0aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMuQ29sbGVjdGlvbih0aGlzLCBmdW5jdGlvbiAoKSB7IHJldHVybiBjcmVhdGVSYW5nZShsb3dlciwgdXBwZXIsICFpbmNsdWRlTG93ZXIsICFpbmNsdWRlVXBwZXIpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhaWwodGhpcywgSU5WQUxJRF9LRVlfQVJHVU1FTlQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBXaGVyZUNsYXVzZS5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFpbCh0aGlzLCBJTlZBTElEX0tFWV9BUkdVTUVOVCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMuQ29sbGVjdGlvbih0aGlzLCBmdW5jdGlvbiAoKSB7IHJldHVybiByYW5nZUVxdWFsKHZhbHVlKTsgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFdoZXJlQ2xhdXNlLnByb3RvdHlwZS5hYm92ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhaWwodGhpcywgSU5WQUxJRF9LRVlfQVJHVU1FTlQpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzLkNvbGxlY3Rpb24odGhpcywgZnVuY3Rpb24gKCkgeyByZXR1cm4gY3JlYXRlUmFuZ2UodmFsdWUsIHVuZGVmaW5lZCwgdHJ1ZSk7IH0pO1xuICAgICAgICB9O1xuICAgICAgICBXaGVyZUNsYXVzZS5wcm90b3R5cGUuYWJvdmVPckVxdWFsID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFpbCh0aGlzLCBJTlZBTElEX0tFWV9BUkdVTUVOVCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMuQ29sbGVjdGlvbih0aGlzLCBmdW5jdGlvbiAoKSB7IHJldHVybiBjcmVhdGVSYW5nZSh2YWx1ZSwgdW5kZWZpbmVkLCBmYWxzZSk7IH0pO1xuICAgICAgICB9O1xuICAgICAgICBXaGVyZUNsYXVzZS5wcm90b3R5cGUuYmVsb3cgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWlsKHRoaXMsIElOVkFMSURfS0VZX0FSR1VNRU5UKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcy5Db2xsZWN0aW9uKHRoaXMsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNyZWF0ZVJhbmdlKHVuZGVmaW5lZCwgdmFsdWUsIGZhbHNlLCB0cnVlKTsgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFdoZXJlQ2xhdXNlLnByb3RvdHlwZS5iZWxvd09yRXF1YWwgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWlsKHRoaXMsIElOVkFMSURfS0VZX0FSR1VNRU5UKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcy5Db2xsZWN0aW9uKHRoaXMsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNyZWF0ZVJhbmdlKHVuZGVmaW5lZCwgdmFsdWUpOyB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgV2hlcmVDbGF1c2UucHJvdG90eXBlLnN0YXJ0c1dpdGggPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhaWwodGhpcywgU1RSSU5HX0VYUEVDVEVEKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJldHdlZW4oc3RyLCBzdHIgKyBtYXhTdHJpbmcsIHRydWUsIHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICBXaGVyZUNsYXVzZS5wcm90b3R5cGUuc3RhcnRzV2l0aElnbm9yZUNhc2UgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgICBpZiAoc3RyID09PSBcIlwiKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXJ0c1dpdGgoc3RyKTtcbiAgICAgICAgICAgIHJldHVybiBhZGRJZ25vcmVDYXNlQWxnb3JpdGhtKHRoaXMsIGZ1bmN0aW9uICh4LCBhKSB7IHJldHVybiB4LmluZGV4T2YoYVswXSkgPT09IDA7IH0sIFtzdHJdLCBtYXhTdHJpbmcpO1xuICAgICAgICB9O1xuICAgICAgICBXaGVyZUNsYXVzZS5wcm90b3R5cGUuZXF1YWxzSWdub3JlQ2FzZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBhZGRJZ25vcmVDYXNlQWxnb3JpdGhtKHRoaXMsIGZ1bmN0aW9uICh4LCBhKSB7IHJldHVybiB4ID09PSBhWzBdOyB9LCBbc3RyXSwgXCJcIik7XG4gICAgICAgIH07XG4gICAgICAgIFdoZXJlQ2xhdXNlLnByb3RvdHlwZS5hbnlPZklnbm9yZUNhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2V0ID0gZ2V0QXJyYXlPZi5hcHBseShOT19DSEFSX0FSUkFZLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgaWYgKHNldC5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5Q29sbGVjdGlvbih0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiBhZGRJZ25vcmVDYXNlQWxnb3JpdGhtKHRoaXMsIGZ1bmN0aW9uICh4LCBhKSB7IHJldHVybiBhLmluZGV4T2YoeCkgIT09IC0xOyB9LCBzZXQsIFwiXCIpO1xuICAgICAgICB9O1xuICAgICAgICBXaGVyZUNsYXVzZS5wcm90b3R5cGUuc3RhcnRzV2l0aEFueU9mSWdub3JlQ2FzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZXQgPSBnZXRBcnJheU9mLmFwcGx5KE5PX0NIQVJfQVJSQVksIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBpZiAoc2V0Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gZW1wdHlDb2xsZWN0aW9uKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIGFkZElnbm9yZUNhc2VBbGdvcml0aG0odGhpcywgZnVuY3Rpb24gKHgsIGEpIHsgcmV0dXJuIGEuc29tZShmdW5jdGlvbiAobikgeyByZXR1cm4geC5pbmRleE9mKG4pID09PSAwOyB9KTsgfSwgc2V0LCBtYXhTdHJpbmcpO1xuICAgICAgICB9O1xuICAgICAgICBXaGVyZUNsYXVzZS5wcm90b3R5cGUuYW55T2YgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHNldCA9IGdldEFycmF5T2YuYXBwbHkoTk9fQ0hBUl9BUlJBWSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHZhciBjb21wYXJlID0gdGhpcy5fY21wO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzZXQuc29ydChjb21wYXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhaWwodGhpcywgSU5WQUxJRF9LRVlfQVJHVU1FTlQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNldC5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5Q29sbGVjdGlvbih0aGlzKTtcbiAgICAgICAgICAgIHZhciBjID0gbmV3IHRoaXMuQ29sbGVjdGlvbih0aGlzLCBmdW5jdGlvbiAoKSB7IHJldHVybiBjcmVhdGVSYW5nZShzZXRbMF0sIHNldFtzZXQubGVuZ3RoIC0gMV0pOyB9KTtcbiAgICAgICAgICAgIGMuX29uZGlyZWN0aW9uY2hhbmdlID0gZnVuY3Rpb24gKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgIGNvbXBhcmUgPSAoZGlyZWN0aW9uID09PSBcIm5leHRcIiA/XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9hc2NlbmRpbmcgOlxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZGVzY2VuZGluZyk7XG4gICAgICAgICAgICAgICAgc2V0LnNvcnQoY29tcGFyZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgYy5fYWRkQWxnb3JpdGhtKGZ1bmN0aW9uIChjdXJzb3IsIGFkdmFuY2UsIHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gY3Vyc29yLmtleTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoY29tcGFyZShrZXksIHNldFtpXSkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICsraTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IHNldC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkdmFuY2UocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBhcmUoa2V5LCBzZXRbaV0pID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZShmdW5jdGlvbiAoKSB7IGN1cnNvci5jb250aW51ZShzZXRbaV0pOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgIH07XG4gICAgICAgIFdoZXJlQ2xhdXNlLnByb3RvdHlwZS5ub3RFcXVhbCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5BbnlSYW5nZShbW21pbktleSwgdmFsdWVdLCBbdmFsdWUsIHRoaXMuZGIuX21heEtleV1dLCB7IGluY2x1ZGVMb3dlcnM6IGZhbHNlLCBpbmNsdWRlVXBwZXJzOiBmYWxzZSB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgV2hlcmVDbGF1c2UucHJvdG90eXBlLm5vbmVPZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZXQgPSBnZXRBcnJheU9mLmFwcGx5KE5PX0NIQVJfQVJSQVksIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBpZiAoc2V0Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMuQ29sbGVjdGlvbih0aGlzKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc2V0LnNvcnQodGhpcy5fYXNjZW5kaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhaWwodGhpcywgSU5WQUxJRF9LRVlfQVJHVU1FTlQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJhbmdlcyA9IHNldC5yZWR1Y2UoZnVuY3Rpb24gKHJlcywgdmFsKSB7IHJldHVybiByZXMgP1xuICAgICAgICAgICAgICAgIHJlcy5jb25jYXQoW1tyZXNbcmVzLmxlbmd0aCAtIDFdWzFdLCB2YWxdXSkgOlxuICAgICAgICAgICAgICAgIFtbbWluS2V5LCB2YWxdXTsgfSwgbnVsbCk7XG4gICAgICAgICAgICByYW5nZXMucHVzaChbc2V0W3NldC5sZW5ndGggLSAxXSwgdGhpcy5kYi5fbWF4S2V5XSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbkFueVJhbmdlKHJhbmdlcywgeyBpbmNsdWRlTG93ZXJzOiBmYWxzZSwgaW5jbHVkZVVwcGVyczogZmFsc2UgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFdoZXJlQ2xhdXNlLnByb3RvdHlwZS5pbkFueVJhbmdlID0gZnVuY3Rpb24gKHJhbmdlcywgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHZhciBjbXAgPSB0aGlzLl9jbXAsIGFzY2VuZGluZyA9IHRoaXMuX2FzY2VuZGluZywgZGVzY2VuZGluZyA9IHRoaXMuX2Rlc2NlbmRpbmcsIG1pbiA9IHRoaXMuX21pbiwgbWF4ID0gdGhpcy5fbWF4O1xuICAgICAgICAgICAgaWYgKHJhbmdlcy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5Q29sbGVjdGlvbih0aGlzKTtcbiAgICAgICAgICAgIGlmICghcmFuZ2VzLmV2ZXJ5KGZ1bmN0aW9uIChyYW5nZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByYW5nZVswXSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlWzFdICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgYXNjZW5kaW5nKHJhbmdlWzBdLCByYW5nZVsxXSkgPD0gMDtcbiAgICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhaWwodGhpcywgXCJGaXJzdCBhcmd1bWVudCB0byBpbkFueVJhbmdlKCkgbXVzdCBiZSBhbiBBcnJheSBvZiB0d28tdmFsdWUgQXJyYXlzIFtsb3dlcix1cHBlcl0gd2hlcmUgdXBwZXIgbXVzdCBub3QgYmUgbG93ZXIgdGhhbiBsb3dlclwiLCBleGNlcHRpb25zLkludmFsaWRBcmd1bWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaW5jbHVkZUxvd2VycyA9ICFvcHRpb25zIHx8IG9wdGlvbnMuaW5jbHVkZUxvd2VycyAhPT0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgaW5jbHVkZVVwcGVycyA9IG9wdGlvbnMgJiYgb3B0aW9ucy5pbmNsdWRlVXBwZXJzID09PSB0cnVlO1xuICAgICAgICAgICAgZnVuY3Rpb24gYWRkUmFuZ2UocmFuZ2VzLCBuZXdSYW5nZSkge1xuICAgICAgICAgICAgICAgIHZhciBpID0gMCwgbCA9IHJhbmdlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yICg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmdlID0gcmFuZ2VzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY21wKG5ld1JhbmdlWzBdLCByYW5nZVsxXSkgPCAwICYmIGNtcChuZXdSYW5nZVsxXSwgcmFuZ2VbMF0pID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VbMF0gPSBtaW4ocmFuZ2VbMF0sIG5ld1JhbmdlWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlWzFdID0gbWF4KHJhbmdlWzFdLCBuZXdSYW5nZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gbClcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2VzLnB1c2gobmV3UmFuZ2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiByYW5nZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc29ydERpcmVjdGlvbiA9IGFzY2VuZGluZztcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJhbmdlU29ydGVyKGEsIGIpIHsgcmV0dXJuIHNvcnREaXJlY3Rpb24oYVswXSwgYlswXSk7IH1cbiAgICAgICAgICAgIHZhciBzZXQ7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHNldCA9IHJhbmdlcy5yZWR1Y2UoYWRkUmFuZ2UsIFtdKTtcbiAgICAgICAgICAgICAgICBzZXQuc29ydChyYW5nZVNvcnRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFpbCh0aGlzLCBJTlZBTElEX0tFWV9BUkdVTUVOVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmFuZ2VQb3MgPSAwO1xuICAgICAgICAgICAgdmFyIGtleUlzQmV5b25kQ3VycmVudEVudHJ5ID0gaW5jbHVkZVVwcGVycyA/XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gYXNjZW5kaW5nKGtleSwgc2V0W3JhbmdlUG9zXVsxXSkgPiAwOyB9IDpcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBhc2NlbmRpbmcoa2V5LCBzZXRbcmFuZ2VQb3NdWzFdKSA+PSAwOyB9O1xuICAgICAgICAgICAgdmFyIGtleUlzQmVmb3JlQ3VycmVudEVudHJ5ID0gaW5jbHVkZUxvd2VycyA/XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZGVzY2VuZGluZyhrZXksIHNldFtyYW5nZVBvc11bMF0pID4gMDsgfSA6XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZGVzY2VuZGluZyhrZXksIHNldFtyYW5nZVBvc11bMF0pID49IDA7IH07XG4gICAgICAgICAgICBmdW5jdGlvbiBrZXlXaXRoaW5DdXJyZW50UmFuZ2Uoa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFrZXlJc0JleW9uZEN1cnJlbnRFbnRyeShrZXkpICYmICFrZXlJc0JlZm9yZUN1cnJlbnRFbnRyeShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNoZWNrS2V5ID0ga2V5SXNCZXlvbmRDdXJyZW50RW50cnk7XG4gICAgICAgICAgICB2YXIgYyA9IG5ldyB0aGlzLkNvbGxlY3Rpb24odGhpcywgZnVuY3Rpb24gKCkgeyByZXR1cm4gY3JlYXRlUmFuZ2Uoc2V0WzBdWzBdLCBzZXRbc2V0Lmxlbmd0aCAtIDFdWzFdLCAhaW5jbHVkZUxvd2VycywgIWluY2x1ZGVVcHBlcnMpOyB9KTtcbiAgICAgICAgICAgIGMuX29uZGlyZWN0aW9uY2hhbmdlID0gZnVuY3Rpb24gKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrS2V5ID0ga2V5SXNCZXlvbmRDdXJyZW50RW50cnk7XG4gICAgICAgICAgICAgICAgICAgIHNvcnREaXJlY3Rpb24gPSBhc2NlbmRpbmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjaGVja0tleSA9IGtleUlzQmVmb3JlQ3VycmVudEVudHJ5O1xuICAgICAgICAgICAgICAgICAgICBzb3J0RGlyZWN0aW9uID0gZGVzY2VuZGluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2V0LnNvcnQocmFuZ2VTb3J0ZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGMuX2FkZEFsZ29yaXRobShmdW5jdGlvbiAoY3Vyc29yLCBhZHZhbmNlLCByZXNvbHZlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGN1cnNvci5rZXk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGNoZWNrS2V5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgKytyYW5nZVBvcztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmdlUG9zID09PSBzZXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKHJlc29sdmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChrZXlXaXRoaW5DdXJyZW50UmFuZ2Uoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoX3RoaXMuX2NtcChrZXksIHNldFtyYW5nZVBvc11bMV0pID09PSAwIHx8IF90aGlzLl9jbXAoa2V5LCBzZXRbcmFuZ2VQb3NdWzBdKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhZHZhbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzb3J0RGlyZWN0aW9uID09PSBhc2NlbmRpbmcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKHNldFtyYW5nZVBvc11bMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZShzZXRbcmFuZ2VQb3NdWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICB9O1xuICAgICAgICBXaGVyZUNsYXVzZS5wcm90b3R5cGUuc3RhcnRzV2l0aEFueU9mID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNldCA9IGdldEFycmF5T2YuYXBwbHkoTk9fQ0hBUl9BUlJBWSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGlmICghc2V0LmV2ZXJ5KGZ1bmN0aW9uIChzKSB7IHJldHVybiB0eXBlb2YgcyA9PT0gJ3N0cmluZyc7IH0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhaWwodGhpcywgXCJzdGFydHNXaXRoQW55T2YoKSBvbmx5IHdvcmtzIHdpdGggc3RyaW5nc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZXQubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBlbXB0eUNvbGxlY3Rpb24odGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbkFueVJhbmdlKHNldC5tYXAoZnVuY3Rpb24gKHN0cikgeyByZXR1cm4gW3N0ciwgc3RyICsgbWF4U3RyaW5nXTsgfSkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gV2hlcmVDbGF1c2U7XG4gICAgfSgpKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVdoZXJlQ2xhdXNlQ29uc3RydWN0b3IoZGIpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VDbGFzc0NvbnN0cnVjdG9yKFdoZXJlQ2xhdXNlLnByb3RvdHlwZSwgZnVuY3Rpb24gV2hlcmVDbGF1c2UodGFibGUsIGluZGV4LCBvckNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZGIgPSBkYjtcbiAgICAgICAgICAgIHRoaXMuX2N0eCA9IHtcbiAgICAgICAgICAgICAgICB0YWJsZTogdGFibGUsXG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4ID09PSBcIjppZFwiID8gbnVsbCA6IGluZGV4LFxuICAgICAgICAgICAgICAgIG9yOiBvckNvbGxlY3Rpb25cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9jbXAgPSB0aGlzLl9hc2NlbmRpbmcgPSBjbXA7XG4gICAgICAgICAgICB0aGlzLl9kZXNjZW5kaW5nID0gZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGNtcChiLCBhKTsgfTtcbiAgICAgICAgICAgIHRoaXMuX21heCA9IGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBjbXAoYSwgYikgPiAwID8gYSA6IGI7IH07XG4gICAgICAgICAgICB0aGlzLl9taW4gPSBmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gY21wKGEsIGIpIDwgMCA/IGEgOiBiOyB9O1xuICAgICAgICAgICAgdGhpcy5fSURCS2V5UmFuZ2UgPSBkYi5fZGVwcy5JREJLZXlSYW5nZTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fSURCS2V5UmFuZ2UpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuTWlzc2luZ0FQSSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBldmVudFJlamVjdEhhbmRsZXIocmVqZWN0KSB7XG4gICAgICAgIHJldHVybiB3cmFwKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgcHJldmVudERlZmF1bHQoZXZlbnQpO1xuICAgICAgICAgICAgcmVqZWN0KGV2ZW50LnRhcmdldC5lcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwcmV2ZW50RGVmYXVsdChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuc3RvcFByb3BhZ2F0aW9uKVxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmIChldmVudC5wcmV2ZW50RGVmYXVsdClcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgdmFyIERFWElFX1NUT1JBR0VfTVVUQVRFRF9FVkVOVF9OQU1FID0gJ3N0b3JhZ2VtdXRhdGVkJztcbiAgICB2YXIgU1RPUkFHRV9NVVRBVEVEX0RPTV9FVkVOVF9OQU1FID0gJ3gtc3RvcmFnZW11dGF0ZWQtMSc7XG4gICAgdmFyIGdsb2JhbEV2ZW50cyA9IEV2ZW50cyhudWxsLCBERVhJRV9TVE9SQUdFX01VVEFURURfRVZFTlRfTkFNRSk7XG5cbiAgICB2YXIgVHJhbnNhY3Rpb24gPSAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gVHJhbnNhY3Rpb24oKSB7XG4gICAgICAgIH1cbiAgICAgICAgVHJhbnNhY3Rpb24ucHJvdG90eXBlLl9sb2NrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYXNzZXJ0KCFQU0QuZ2xvYmFsKTtcbiAgICAgICAgICAgICsrdGhpcy5fcmVjdWxvY2s7XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVjdWxvY2sgPT09IDEgJiYgIVBTRC5nbG9iYWwpXG4gICAgICAgICAgICAgICAgUFNELmxvY2tPd25lckZvciA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVHJhbnNhY3Rpb24ucHJvdG90eXBlLl91bmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhc3NlcnQoIVBTRC5nbG9iYWwpO1xuICAgICAgICAgICAgaWYgKC0tdGhpcy5fcmVjdWxvY2sgPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoIVBTRC5nbG9iYWwpXG4gICAgICAgICAgICAgICAgICAgIFBTRC5sb2NrT3duZXJGb3IgPSBudWxsO1xuICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLl9ibG9ja2VkRnVuY3MubGVuZ3RoID4gMCAmJiAhdGhpcy5fbG9ja2VkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuQW5kUFNEID0gdGhpcy5fYmxvY2tlZEZ1bmNzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VQU0QoZm5BbmRQU0RbMV0sIGZuQW5kUFNEWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRyYW5zYWN0aW9uLnByb3RvdHlwZS5fbG9ja2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlY3Vsb2NrICYmIFBTRC5sb2NrT3duZXJGb3IgIT09IHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIFRyYW5zYWN0aW9uLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoaWRidHJhbnMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICBpZiAoIXRoaXMubW9kZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIHZhciBpZGJkYiA9IHRoaXMuZGIuaWRiZGI7XG4gICAgICAgICAgICB2YXIgZGJPcGVuRXJyb3IgPSB0aGlzLmRiLl9zdGF0ZS5kYk9wZW5FcnJvcjtcbiAgICAgICAgICAgIGFzc2VydCghdGhpcy5pZGJ0cmFucyk7XG4gICAgICAgICAgICBpZiAoIWlkYnRyYW5zICYmICFpZGJkYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZGJPcGVuRXJyb3IgJiYgZGJPcGVuRXJyb3IubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiRGF0YWJhc2VDbG9zZWRFcnJvclwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuRGF0YWJhc2VDbG9zZWQoZGJPcGVuRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiTWlzc2luZ0FQSUVycm9yXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5NaXNzaW5nQVBJKGRiT3BlbkVycm9yLm1lc3NhZ2UsIGRiT3BlbkVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLk9wZW5GYWlsZWQoZGJPcGVuRXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5hY3RpdmUpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuVHJhbnNhY3Rpb25JbmFjdGl2ZSgpO1xuICAgICAgICAgICAgYXNzZXJ0KHRoaXMuX2NvbXBsZXRpb24uX3N0YXRlID09PSBudWxsKTtcbiAgICAgICAgICAgIGlkYnRyYW5zID0gdGhpcy5pZGJ0cmFucyA9IGlkYnRyYW5zIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMuZGIuY29yZVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGIuY29yZS50cmFuc2FjdGlvbih0aGlzLnN0b3JlTmFtZXMsIHRoaXMubW9kZSwgeyBkdXJhYmlsaXR5OiB0aGlzLmNocm9tZVRyYW5zYWN0aW9uRHVyYWJpbGl0eSB9KVxuICAgICAgICAgICAgICAgICAgICA6IGlkYmRiLnRyYW5zYWN0aW9uKHRoaXMuc3RvcmVOYW1lcywgdGhpcy5tb2RlLCB7IGR1cmFiaWxpdHk6IHRoaXMuY2hyb21lVHJhbnNhY3Rpb25EdXJhYmlsaXR5IH0pKTtcbiAgICAgICAgICAgIGlkYnRyYW5zLm9uZXJyb3IgPSB3cmFwKGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0KGV2KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fcmVqZWN0KGlkYnRyYW5zLmVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWRidHJhbnMub25hYm9ydCA9IHdyYXAoZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQoZXYpO1xuICAgICAgICAgICAgICAgIF90aGlzLmFjdGl2ZSAmJiBfdGhpcy5fcmVqZWN0KG5ldyBleGNlcHRpb25zLkFib3J0KGlkYnRyYW5zLmVycm9yKSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgX3RoaXMub24oXCJhYm9ydFwiKS5maXJlKGV2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWRidHJhbnMub25jb21wbGV0ZSA9IHdyYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIF90aGlzLl9yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCdtdXRhdGVkUGFydHMnIGluIGlkYnRyYW5zKSB7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbEV2ZW50cy5zdG9yYWdlbXV0YXRlZC5maXJlKGlkYnRyYW5zW1wibXV0YXRlZFBhcnRzXCJdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUcmFuc2FjdGlvbi5wcm90b3R5cGUuX3Byb21pc2UgPSBmdW5jdGlvbiAobW9kZSwgZm4sIGJXcml0ZUxvY2spIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICBpZiAobW9kZSA9PT0gJ3JlYWR3cml0ZScgJiYgdGhpcy5tb2RlICE9PSAncmVhZHdyaXRlJylcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uKG5ldyBleGNlcHRpb25zLlJlYWRPbmx5KFwiVHJhbnNhY3Rpb24gaXMgcmVhZG9ubHlcIikpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmFjdGl2ZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uKG5ldyBleGNlcHRpb25zLlRyYW5zYWN0aW9uSW5hY3RpdmUoKSk7XG4gICAgICAgICAgICBpZiAodGhpcy5fbG9ja2VkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERleGllUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9ibG9ja2VkRnVuY3MucHVzaChbZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9wcm9taXNlKG1vZGUsIGZuLCBiV3JpdGVMb2NrKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBQU0RdKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJXcml0ZUxvY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3U2NvcGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IG5ldyBEZXhpZVByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2xvY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBydiA9IGZuKHJlc29sdmUsIHJlamVjdCwgX3RoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJ2ICYmIHJ2LnRoZW4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnYudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcC5maW5hbGx5KGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl91bmxvY2soKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIHAuX2xpYiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHAgPSBuZXcgRGV4aWVQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJ2ID0gZm4ocmVzb2x2ZSwgcmVqZWN0LCBfdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChydiAmJiBydi50aGVuKVxuICAgICAgICAgICAgICAgICAgICAgICAgcnYudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHAuX2xpYiA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFRyYW5zYWN0aW9uLnByb3RvdHlwZS5fcm9vdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50Ll9yb290KCkgOiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBUcmFuc2FjdGlvbi5wcm90b3R5cGUud2FpdEZvciA9IGZ1bmN0aW9uIChwcm9taXNlTGlrZSkge1xuICAgICAgICAgICAgdmFyIHJvb3QgPSB0aGlzLl9yb290KCk7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IERleGllUHJvbWlzZS5yZXNvbHZlKHByb21pc2VMaWtlKTtcbiAgICAgICAgICAgIGlmIChyb290Ll93YWl0aW5nRm9yKSB7XG4gICAgICAgICAgICAgICAgcm9vdC5fd2FpdGluZ0ZvciA9IHJvb3QuX3dhaXRpbmdGb3IudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBwcm9taXNlOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJvb3QuX3dhaXRpbmdGb3IgPSBwcm9taXNlO1xuICAgICAgICAgICAgICAgIHJvb3QuX3dhaXRpbmdRdWV1ZSA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBzdG9yZSA9IHJvb3QuaWRidHJhbnMub2JqZWN0U3RvcmUocm9vdC5zdG9yZU5hbWVzWzBdKTtcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24gc3BpbigpIHtcbiAgICAgICAgICAgICAgICAgICAgKytyb290Ll9zcGluQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChyb290Ll93YWl0aW5nUXVldWUubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgKHJvb3QuX3dhaXRpbmdRdWV1ZS5zaGlmdCgpKSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocm9vdC5fd2FpdGluZ0ZvcilcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlLmdldCgtSW5maW5pdHkpLm9uc3VjY2VzcyA9IHNwaW47XG4gICAgICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjdXJyZW50V2FpdFByb21pc2UgPSByb290Ll93YWl0aW5nRm9yO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEZXhpZVByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByb290Ll93YWl0aW5nUXVldWUucHVzaCh3cmFwKHJlc29sdmUuYmluZChudWxsLCByZXMpKSk7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIHJvb3QuX3dhaXRpbmdRdWV1ZS5wdXNoKHdyYXAocmVqZWN0LmJpbmQobnVsbCwgZXJyKSkpOyB9KS5maW5hbGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvb3QuX3dhaXRpbmdGb3IgPT09IGN1cnJlbnRXYWl0UHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm9vdC5fd2FpdGluZ0ZvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBUcmFuc2FjdGlvbi5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlkYnRyYW5zKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlkYnRyYW5zLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVqZWN0KG5ldyBleGNlcHRpb25zLkFib3J0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBUcmFuc2FjdGlvbi5wcm90b3R5cGUudGFibGUgPSBmdW5jdGlvbiAodGFibGVOYW1lKSB7XG4gICAgICAgICAgICB2YXIgbWVtb2l6ZWRUYWJsZXMgPSAodGhpcy5fbWVtb2l6ZWRUYWJsZXMgfHwgKHRoaXMuX21lbW9pemVkVGFibGVzID0ge30pKTtcbiAgICAgICAgICAgIGlmIChoYXNPd24obWVtb2l6ZWRUYWJsZXMsIHRhYmxlTmFtZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lbW9pemVkVGFibGVzW3RhYmxlTmFtZV07XG4gICAgICAgICAgICB2YXIgdGFibGVTY2hlbWEgPSB0aGlzLnNjaGVtYVt0YWJsZU5hbWVdO1xuICAgICAgICAgICAgaWYgKCF0YWJsZVNjaGVtYSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLk5vdEZvdW5kKFwiVGFibGUgXCIgKyB0YWJsZU5hbWUgKyBcIiBub3QgcGFydCBvZiB0cmFuc2FjdGlvblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0cmFuc2FjdGlvbkJvdW5kVGFibGUgPSBuZXcgdGhpcy5kYi5UYWJsZSh0YWJsZU5hbWUsIHRhYmxlU2NoZW1hLCB0aGlzKTtcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uQm91bmRUYWJsZS5jb3JlID0gdGhpcy5kYi5jb3JlLnRhYmxlKHRhYmxlTmFtZSk7XG4gICAgICAgICAgICBtZW1vaXplZFRhYmxlc1t0YWJsZU5hbWVdID0gdHJhbnNhY3Rpb25Cb3VuZFRhYmxlO1xuICAgICAgICAgICAgcmV0dXJuIHRyYW5zYWN0aW9uQm91bmRUYWJsZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFRyYW5zYWN0aW9uO1xuICAgIH0oKSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVUcmFuc2FjdGlvbkNvbnN0cnVjdG9yKGRiKSB7XG4gICAgICAgIHJldHVybiBtYWtlQ2xhc3NDb25zdHJ1Y3RvcihUcmFuc2FjdGlvbi5wcm90b3R5cGUsIGZ1bmN0aW9uIFRyYW5zYWN0aW9uKG1vZGUsIHN0b3JlTmFtZXMsIGRic2NoZW1hLCBjaHJvbWVUcmFuc2FjdGlvbkR1cmFiaWxpdHksIHBhcmVudCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuZGIgPSBkYjtcbiAgICAgICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XG4gICAgICAgICAgICB0aGlzLnN0b3JlTmFtZXMgPSBzdG9yZU5hbWVzO1xuICAgICAgICAgICAgdGhpcy5zY2hlbWEgPSBkYnNjaGVtYTtcbiAgICAgICAgICAgIHRoaXMuY2hyb21lVHJhbnNhY3Rpb25EdXJhYmlsaXR5ID0gY2hyb21lVHJhbnNhY3Rpb25EdXJhYmlsaXR5O1xuICAgICAgICAgICAgdGhpcy5pZGJ0cmFucyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLm9uID0gRXZlbnRzKHRoaXMsIFwiY29tcGxldGVcIiwgXCJlcnJvclwiLCBcImFib3J0XCIpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQgfHwgbnVsbDtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3JlY3Vsb2NrID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2Jsb2NrZWRGdW5jcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9yZWplY3QgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fd2FpdGluZ0ZvciA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl93YWl0aW5nUXVldWUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fc3BpbkNvdW50ID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBsZXRpb24gPSBuZXcgRGV4aWVQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3JlamVjdCA9IHJlamVjdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fY29tcGxldGlvbi50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBfdGhpcy5vbi5jb21wbGV0ZS5maXJlKCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciB3YXNBY3RpdmUgPSBfdGhpcy5hY3RpdmU7XG4gICAgICAgICAgICAgICAgX3RoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgX3RoaXMub24uZXJyb3IuZmlyZShlKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5wYXJlbnQgP1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5wYXJlbnQuX3JlamVjdChlKSA6XG4gICAgICAgICAgICAgICAgICAgIHdhc0FjdGl2ZSAmJiBfdGhpcy5pZGJ0cmFucyAmJiBfdGhpcy5pZGJ0cmFucy5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3Rpb24oZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSW5kZXhTcGVjKG5hbWUsIGtleVBhdGgsIHVuaXF1ZSwgbXVsdGksIGF1dG8sIGNvbXBvdW5kLCBpc1ByaW1LZXkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBrZXlQYXRoOiBrZXlQYXRoLFxuICAgICAgICAgICAgdW5pcXVlOiB1bmlxdWUsXG4gICAgICAgICAgICBtdWx0aTogbXVsdGksXG4gICAgICAgICAgICBhdXRvOiBhdXRvLFxuICAgICAgICAgICAgY29tcG91bmQ6IGNvbXBvdW5kLFxuICAgICAgICAgICAgc3JjOiAodW5pcXVlICYmICFpc1ByaW1LZXkgPyAnJicgOiAnJykgKyAobXVsdGkgPyAnKicgOiAnJykgKyAoYXV0byA/IFwiKytcIiA6IFwiXCIpICsgbmFtZUZyb21LZXlQYXRoKGtleVBhdGgpXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIG5hbWVGcm9tS2V5UGF0aChrZXlQYXRoKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Yga2V5UGF0aCA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAga2V5UGF0aCA6XG4gICAgICAgICAgICBrZXlQYXRoID8gKCdbJyArIFtdLmpvaW4uY2FsbChrZXlQYXRoLCAnKycpICsgJ10nKSA6IFwiXCI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFibGVTY2hlbWEobmFtZSwgcHJpbUtleSwgaW5kZXhlcykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIHByaW1LZXk6IHByaW1LZXksXG4gICAgICAgICAgICBpbmRleGVzOiBpbmRleGVzLFxuICAgICAgICAgICAgbWFwcGVkQ2xhc3M6IG51bGwsXG4gICAgICAgICAgICBpZHhCeU5hbWU6IGFycmF5VG9PYmplY3QoaW5kZXhlcywgZnVuY3Rpb24gKGluZGV4KSB7IHJldHVybiBbaW5kZXgubmFtZSwgaW5kZXhdOyB9KVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNhZmFyaU11bHRpU3RvcmVGaXgoc3RvcmVOYW1lcykge1xuICAgICAgICByZXR1cm4gc3RvcmVOYW1lcy5sZW5ndGggPT09IDEgPyBzdG9yZU5hbWVzWzBdIDogc3RvcmVOYW1lcztcbiAgICB9XG4gICAgdmFyIGdldE1heEtleSA9IGZ1bmN0aW9uIChJZGJLZXlSYW5nZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgSWRiS2V5UmFuZ2Uub25seShbW11dKTtcbiAgICAgICAgICAgIGdldE1heEtleSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtbXV07IH07XG4gICAgICAgICAgICByZXR1cm4gW1tdXTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZ2V0TWF4S2V5ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbWF4U3RyaW5nOyB9O1xuICAgICAgICAgICAgcmV0dXJuIG1heFN0cmluZztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRLZXlFeHRyYWN0b3Ioa2V5UGF0aCkge1xuICAgICAgICBpZiAoa2V5UGF0aCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBrZXlQYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGdldFNpbmdsZVBhdGhLZXlFeHRyYWN0b3Ioa2V5UGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gZ2V0QnlLZXlQYXRoKG9iaiwga2V5UGF0aCk7IH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0U2luZ2xlUGF0aEtleUV4dHJhY3RvcihrZXlQYXRoKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGtleVBhdGguc3BsaXQoJy4nKTtcbiAgICAgICAgaWYgKHNwbGl0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9ialtrZXlQYXRoXTsgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBnZXRCeUtleVBhdGgob2JqLCBrZXlQYXRoKTsgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFycmF5aWZ5KGFycmF5TGlrZSkge1xuICAgICAgICByZXR1cm4gW10uc2xpY2UuY2FsbChhcnJheUxpa2UpO1xuICAgIH1cbiAgICB2YXIgX2lkX2NvdW50ZXIgPSAwO1xuICAgIGZ1bmN0aW9uIGdldEtleVBhdGhBbGlhcyhrZXlQYXRoKSB7XG4gICAgICAgIHJldHVybiBrZXlQYXRoID09IG51bGwgP1xuICAgICAgICAgICAgXCI6aWRcIiA6XG4gICAgICAgICAgICB0eXBlb2Yga2V5UGF0aCA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgIGtleVBhdGggOlxuICAgICAgICAgICAgICAgIFwiW1wiLmNvbmNhdChrZXlQYXRoLmpvaW4oJysnKSwgXCJdXCIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVEQkNvcmUoZGIsIElkYktleVJhbmdlLCB0bXBUcmFucykge1xuICAgICAgICBmdW5jdGlvbiBleHRyYWN0U2NoZW1hKGRiLCB0cmFucykge1xuICAgICAgICAgICAgdmFyIHRhYmxlcyA9IGFycmF5aWZ5KGRiLm9iamVjdFN0b3JlTmFtZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGIubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdGFibGVzOiB0YWJsZXMubWFwKGZ1bmN0aW9uICh0YWJsZSkgeyByZXR1cm4gdHJhbnMub2JqZWN0U3RvcmUodGFibGUpOyB9KS5tYXAoZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5UGF0aCA9IHN0b3JlLmtleVBhdGgsIGF1dG9JbmNyZW1lbnQgPSBzdG9yZS5hdXRvSW5jcmVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvdW5kID0gaXNBcnJheShrZXlQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvdXRib3VuZCA9IGtleVBhdGggPT0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleEJ5S2V5UGF0aCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBzdG9yZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlLZXk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQcmltYXJ5S2V5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRib3VuZDogb3V0Ym91bmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvdW5kOiBjb21wb3VuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5UGF0aDoga2V5UGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0luY3JlbWVudDogYXV0b0luY3JlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pcXVlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYWN0S2V5OiBnZXRLZXlFeHRyYWN0b3Ioa2V5UGF0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ZXM6IGFycmF5aWZ5KHN0b3JlLmluZGV4TmFtZXMpLm1hcChmdW5jdGlvbiAoaW5kZXhOYW1lKSB7IHJldHVybiBzdG9yZS5pbmRleChpbmRleE5hbWUpOyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGluZGV4Lm5hbWUsIHVuaXF1ZSA9IGluZGV4LnVuaXF1ZSwgbXVsdGlFbnRyeSA9IGluZGV4Lm11bHRpRW50cnksIGtleVBhdGggPSBpbmRleC5rZXlQYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29tcG91bmQgPSBpc0FycmF5KGtleVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvdW5kOiBjb21wb3VuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleVBhdGg6IGtleVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmlxdWU6IHVuaXF1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpRW50cnk6IG11bHRpRW50cnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYWN0S2V5OiBnZXRLZXlFeHRyYWN0b3Ioa2V5UGF0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhCeUtleVBhdGhbZ2V0S2V5UGF0aEFsaWFzKGtleVBhdGgpXSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRJbmRleEJ5S2V5UGF0aDogZnVuY3Rpb24gKGtleVBhdGgpIHsgcmV0dXJuIGluZGV4QnlLZXlQYXRoW2dldEtleVBhdGhBbGlhcyhrZXlQYXRoKV07IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleEJ5S2V5UGF0aFtcIjppZFwiXSA9IHJlc3VsdC5wcmltYXJ5S2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleVBhdGggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4QnlLZXlQYXRoW2dldEtleVBhdGhBbGlhcyhrZXlQYXRoKV0gPSByZXN1bHQucHJpbWFyeUtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoYXNHZXRBbGw6IHRhYmxlcy5sZW5ndGggPiAwICYmICgnZ2V0QWxsJyBpbiB0cmFucy5vYmplY3RTdG9yZSh0YWJsZXNbMF0pKSAmJlxuICAgICAgICAgICAgICAgICAgICAhKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9TYWZhcmkvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICEvKENocm9tZVxcL3xFZGdlXFwvKS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgW10uY29uY2F0KG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1NhZmFyaVxcLyhcXGQqKS8pKVsxXSA8IDYwNClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbWFrZUlEQktleVJhbmdlKHJhbmdlKSB7XG4gICAgICAgICAgICBpZiAocmFuZ2UudHlwZSA9PT0gMyApXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAocmFuZ2UudHlwZSA9PT0gNCApXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGNvbnZlcnQgbmV2ZXIgdHlwZSB0byBJREJLZXlSYW5nZVwiKTtcbiAgICAgICAgICAgIHZhciBsb3dlciA9IHJhbmdlLmxvd2VyLCB1cHBlciA9IHJhbmdlLnVwcGVyLCBsb3dlck9wZW4gPSByYW5nZS5sb3dlck9wZW4sIHVwcGVyT3BlbiA9IHJhbmdlLnVwcGVyT3BlbjtcbiAgICAgICAgICAgIHZhciBpZGJSYW5nZSA9IGxvd2VyID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgICAgIHVwcGVyID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgICAgICAgICAgSWRiS2V5UmFuZ2UudXBwZXJCb3VuZCh1cHBlciwgISF1cHBlck9wZW4pIDpcbiAgICAgICAgICAgICAgICB1cHBlciA9PT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgICAgICAgICAgSWRiS2V5UmFuZ2UubG93ZXJCb3VuZChsb3dlciwgISFsb3dlck9wZW4pIDpcbiAgICAgICAgICAgICAgICAgICAgSWRiS2V5UmFuZ2UuYm91bmQobG93ZXIsIHVwcGVyLCAhIWxvd2VyT3BlbiwgISF1cHBlck9wZW4pO1xuICAgICAgICAgICAgcmV0dXJuIGlkYlJhbmdlO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZURiQ29yZVRhYmxlKHRhYmxlU2NoZW1hKSB7XG4gICAgICAgICAgICB2YXIgdGFibGVOYW1lID0gdGFibGVTY2hlbWEubmFtZTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIG11dGF0ZShfYSkge1xuICAgICAgICAgICAgICAgIHZhciB0cmFucyA9IF9hLnRyYW5zLCB0eXBlID0gX2EudHlwZSwga2V5cyA9IF9hLmtleXMsIHZhbHVlcyA9IF9hLnZhbHVlcywgcmFuZ2UgPSBfYS5yYW5nZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlID0gd3JhcChyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0b3JlID0gdHJhbnMub2JqZWN0U3RvcmUodGFibGVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG91dGJvdW5kID0gc3RvcmUua2V5UGF0aCA9PSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNBZGRPclB1dCA9IHR5cGUgPT09IFwicHV0XCIgfHwgdHlwZSA9PT0gXCJhZGRcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0FkZE9yUHV0ICYmIHR5cGUgIT09ICdkZWxldGUnICYmIHR5cGUgIT09ICdkZWxldGVSYW5nZScpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIG9wZXJhdGlvbiB0eXBlOiBcIiArIHR5cGUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gKGtleXMgfHwgdmFsdWVzIHx8IHsgbGVuZ3RoOiAxIH0pLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleXMgJiYgdmFsdWVzICYmIGtleXMubGVuZ3RoICE9PSB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHaXZlbiBrZXlzIGFycmF5IG11c3QgaGF2ZSBzYW1lIGxlbmd0aCBhcyBnaXZlbiB2YWx1ZXMgYXJyYXkuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh7IG51bUZhaWx1cmVzOiAwLCBmYWlsdXJlczoge30sIHJlc3VsdHM6IFtdLCBsYXN0UmVzdWx0OiB1bmRlZmluZWQgfSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXE7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXFzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbnVtRmFpbHVyZXMgPSAwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3JIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICArK251bUZhaWx1cmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2RlbGV0ZVJhbmdlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmdlLnR5cGUgPT09IDQgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHsgbnVtRmFpbHVyZXM6IG51bUZhaWx1cmVzLCBmYWlsdXJlczogZmFpbHVyZXMsIHJlc3VsdHM6IFtdLCBsYXN0UmVzdWx0OiB1bmRlZmluZWQgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFuZ2UudHlwZSA9PT0gMyApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxcy5wdXNoKHJlcSA9IHN0b3JlLmNsZWFyKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXMucHVzaChyZXEgPSBzdG9yZS5kZWxldGUobWFrZUlEQktleVJhbmdlKHJhbmdlKSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hID0gaXNBZGRPclB1dCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0Ym91bmQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVzLCBrZXlzXSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZXMsIG51bGxdIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBba2V5cywgbnVsbF0sIGFyZ3MxID0gX2FbMF0sIGFyZ3MyID0gX2FbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNBZGRPclB1dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxcy5wdXNoKHJlcSA9IChhcmdzMiAmJiBhcmdzMltpXSAhPT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlW3R5cGVdKGFyZ3MxW2ldLCBhcmdzMltpXSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmVbdHlwZV0oYXJnczFbaV0pKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5vbmVycm9yID0gZXJyb3JIYW5kbGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxcy5wdXNoKHJlcSA9IHN0b3JlW3R5cGVdKGFyZ3MxW2ldKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5vbmVycm9yID0gZXJyb3JIYW5kbGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgZG9uZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RSZXN1bHQgPSBldmVudC50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXEsIGkpIHsgcmV0dXJuIHJlcS5lcnJvciAhPSBudWxsICYmIChmYWlsdXJlc1tpXSA9IHJlcS5lcnJvcik7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtRmFpbHVyZXM6IG51bUZhaWx1cmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWx1cmVzOiBmYWlsdXJlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzOiB0eXBlID09PSBcImRlbGV0ZVwiID8ga2V5cyA6IHJlcXMubWFwKGZ1bmN0aW9uIChyZXEpIHsgcmV0dXJuIHJlcS5yZXN1bHQ7IH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSZXN1bHQ6IGxhc3RSZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXEub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JIYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXEub25zdWNjZXNzID0gZG9uZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9wZW5DdXJzb3IoX2EpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnMgPSBfYS50cmFucywgdmFsdWVzID0gX2EudmFsdWVzLCBxdWVyeSA9IF9hLnF1ZXJ5LCByZXZlcnNlID0gX2EucmV2ZXJzZSwgdW5pcXVlID0gX2EudW5pcXVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUgPSB3cmFwKHJlc29sdmUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBxdWVyeS5pbmRleCwgcmFuZ2UgPSBxdWVyeS5yYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0b3JlID0gdHJhbnMub2JqZWN0U3RvcmUodGFibGVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGluZGV4LmlzUHJpbWFyeUtleSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yZS5pbmRleChpbmRleC5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IHJldmVyc2UgP1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5pcXVlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByZXZ1bmlxdWVcIiA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV2XCIgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pcXVlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5leHR1bmlxdWVcIiA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXh0XCI7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXEgPSB2YWx1ZXMgfHwgISgnb3BlbktleUN1cnNvcicgaW4gc291cmNlKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2Uub3BlbkN1cnNvcihtYWtlSURCS2V5UmFuZ2UocmFuZ2UpLCBkaXJlY3Rpb24pIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZS5vcGVuS2V5Q3Vyc29yKG1ha2VJREJLZXlSYW5nZShyYW5nZSksIGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHJlcS5vbmVycm9yID0gZXZlbnRSZWplY3RIYW5kbGVyKHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIHJlcS5vbnN1Y2Nlc3MgPSB3cmFwKGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnNvciA9IHJlcS5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWN1cnNvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLl9fX2lkID0gKytfaWRfY291bnRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2N1cnNvckNvbnRpbnVlID0gY3Vyc29yLmNvbnRpbnVlLmJpbmQoY3Vyc29yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfY3Vyc29yQ29udGludWVQcmltYXJ5S2V5ID0gY3Vyc29yLmNvbnRpbnVlUHJpbWFyeUtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfY3Vyc29yQ29udGludWVQcmltYXJ5S2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jdXJzb3JDb250aW51ZVByaW1hcnlLZXkgPSBfY3Vyc29yQ29udGludWVQcmltYXJ5S2V5LmJpbmQoY3Vyc29yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfY3Vyc29yQWR2YW5jZSA9IGN1cnNvci5hZHZhbmNlLmJpbmQoY3Vyc29yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb1Rocm93Q3Vyc29ySXNOb3RTdGFydGVkID0gZnVuY3Rpb24gKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJDdXJzb3Igbm90IHN0YXJ0ZWRcIik7IH07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9UaHJvd0N1cnNvcklzU3RvcHBlZCA9IGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ3Vyc29yIG5vdCBzdG9wcGVkXCIpOyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLnRyYW5zID0gdHJhbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3Iuc3RvcCA9IGN1cnNvci5jb250aW51ZSA9IGN1cnNvci5jb250aW51ZVByaW1hcnlLZXkgPSBjdXJzb3IuYWR2YW5jZSA9IGRvVGhyb3dDdXJzb3JJc05vdFN0YXJ0ZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IuZmFpbCA9IHdyYXAocmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdvdE9uZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnQoZnVuY3Rpb24gKCkgeyByZXR1cm4gZ290T25lLS0gPyBfdGhpcy5jb250aW51ZSgpIDogX3RoaXMuc3RvcCgpOyB9KS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3Iuc3RhcnQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlcmF0aW9uUHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlSXRlcmF0aW9uLCByZWplY3RJdGVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUl0ZXJhdGlvbiA9IHdyYXAocmVzb2x2ZUl0ZXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5vbmVycm9yID0gZXZlbnRSZWplY3RIYW5kbGVyKHJlamVjdEl0ZXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5mYWlsID0gcmVqZWN0SXRlcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3Iuc3RvcCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLnN0b3AgPSBjdXJzb3IuY29udGludWUgPSBjdXJzb3IuY29udGludWVQcmltYXJ5S2V5ID0gY3Vyc29yLmFkdmFuY2UgPSBkb1Rocm93Q3Vyc29ySXNTdG9wcGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUl0ZXJhdGlvbih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGd1YXJkZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcS5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IuZmFpbChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLmRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLnN0YXJ0ID0gZnVuY3Rpb24gKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJDdXJzb3IgYmVoaW5kIGxhc3QgZW50cnlcIik7IH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3Iuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEub25zdWNjZXNzID0gd3JhcChmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxLm9uc3VjY2VzcyA9IGd1YXJkZWRDYWxsYmFjaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3VhcmRlZENhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlID0gX2N1cnNvckNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZVByaW1hcnlLZXkgPSBfY3Vyc29yQ29udGludWVQcmltYXJ5S2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5hZHZhbmNlID0gX2N1cnNvckFkdmFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3VhcmRlZENhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdGlvblByb21pc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjdXJzb3IpO1xuICAgICAgICAgICAgICAgICAgICB9LCByZWplY3QpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gcXVlcnkoaGFzR2V0QWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlID0gd3JhcChyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cmFucyA9IHJlcXVlc3QudHJhbnMsIHZhbHVlcyA9IHJlcXVlc3QudmFsdWVzLCBsaW1pdCA9IHJlcXVlc3QubGltaXQsIHF1ZXJ5ID0gcmVxdWVzdC5xdWVyeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub25JbmZpbml0TGltaXQgPSBsaW1pdCA9PT0gSW5maW5pdHkgPyB1bmRlZmluZWQgOiBsaW1pdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHF1ZXJ5LmluZGV4LCByYW5nZSA9IHF1ZXJ5LnJhbmdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0b3JlID0gdHJhbnMub2JqZWN0U3RvcmUodGFibGVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2UgPSBpbmRleC5pc1ByaW1hcnlLZXkgPyBzdG9yZSA6IHN0b3JlLmluZGV4KGluZGV4Lm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkYktleVJhbmdlID0gbWFrZUlEQktleVJhbmdlKHJhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW1pdCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh7IHJlc3VsdDogW10gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFzR2V0QWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcSA9IHZhbHVlcyA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZS5nZXRBbGwoaWRiS2V5UmFuZ2UsIG5vbkluZmluaXRMaW1pdCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZ2V0QWxsS2V5cyhpZGJLZXlSYW5nZSwgbm9uSW5maW5pdExpbWl0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7IHJldHVybiByZXNvbHZlKHsgcmVzdWx0OiBldmVudC50YXJnZXQucmVzdWx0IH0pOyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5vbmVycm9yID0gZXZlbnRSZWplY3RIYW5kbGVyKHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY291bnRfMSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcV8xID0gdmFsdWVzIHx8ICEoJ29wZW5LZXlDdXJzb3InIGluIHNvdXJjZSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2Uub3BlbkN1cnNvcihpZGJLZXlSYW5nZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2Uub3BlbktleUN1cnNvcihpZGJLZXlSYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdF8xID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxXzEub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJzb3IgPSByZXFfMS5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3Vyc29yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoeyByZXN1bHQ6IHJlc3VsdF8xIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRfMS5wdXNoKHZhbHVlcyA/IGN1cnNvci52YWx1ZSA6IGN1cnNvci5wcmltYXJ5S2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCsrY291bnRfMSA9PT0gbGltaXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh7IHJlc3VsdDogcmVzdWx0XzEgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxXzEub25lcnJvciA9IGV2ZW50UmVqZWN0SGFuZGxlcihyZWplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBuYW1lOiB0YWJsZU5hbWUsXG4gICAgICAgICAgICAgICAgc2NoZW1hOiB0YWJsZVNjaGVtYSxcbiAgICAgICAgICAgICAgICBtdXRhdGU6IG11dGF0ZSxcbiAgICAgICAgICAgICAgICBnZXRNYW55OiBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zID0gX2EudHJhbnMsIGtleXMgPSBfYS5rZXlzO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSA9IHdyYXAocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RvcmUgPSB0cmFucy5vYmplY3RTdG9yZSh0YWJsZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleUNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYWxsYmFja0NvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2Vzc0hhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocmVzdWx0W3JlcS5fcG9zXSA9IHJlcS5yZXN1bHQpICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKytjYWxsYmFja0NvdW50ID09PSBrZXlDb3VudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvckhhbmRsZXIgPSBldmVudFJlamVjdEhhbmRsZXIocmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxID0gc3RvcmUuZ2V0KGtleXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEuX3BvcyA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5vbnN1Y2Nlc3MgPSBzdWNjZXNzSGFuZGxlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxLm9uZXJyb3IgPSBlcnJvckhhbmRsZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsra2V5Q291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleUNvdW50ID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnMgPSBfYS50cmFucywga2V5ID0gX2Eua2V5O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSA9IHdyYXAocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RvcmUgPSB0cmFucy5vYmplY3RTdG9yZSh0YWJsZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcSA9IHN0b3JlLmdldChrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxLm9uc3VjY2VzcyA9IGZ1bmN0aW9uIChldmVudCkgeyByZXR1cm4gcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTsgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5vbmVycm9yID0gZXZlbnRSZWplY3RIYW5kbGVyKHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5KGhhc0dldEFsbCksXG4gICAgICAgICAgICAgICAgb3BlbkN1cnNvcjogb3BlbkN1cnNvcixcbiAgICAgICAgICAgICAgICBjb3VudDogZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBxdWVyeSA9IF9hLnF1ZXJ5LCB0cmFucyA9IF9hLnRyYW5zO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBxdWVyeS5pbmRleCwgcmFuZ2UgPSBxdWVyeS5yYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKHRhYmxlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlID0gaW5kZXguaXNQcmltYXJ5S2V5ID8gc3RvcmUgOiBzdG9yZS5pbmRleChpbmRleC5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZGJLZXlSYW5nZSA9IG1ha2VJREJLZXlSYW5nZShyYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxID0gaWRiS2V5UmFuZ2UgPyBzb3VyY2UuY291bnQoaWRiS2V5UmFuZ2UpIDogc291cmNlLmNvdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXEub25zdWNjZXNzID0gd3JhcChmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIHJlc29sdmUoZXYudGFyZ2V0LnJlc3VsdCk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxLm9uZXJyb3IgPSBldmVudFJlamVjdEhhbmRsZXIocmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2EgPSBleHRyYWN0U2NoZW1hKGRiLCB0bXBUcmFucyksIHNjaGVtYSA9IF9hLnNjaGVtYSwgaGFzR2V0QWxsID0gX2EuaGFzR2V0QWxsO1xuICAgICAgICB2YXIgdGFibGVzID0gc2NoZW1hLnRhYmxlcy5tYXAoZnVuY3Rpb24gKHRhYmxlU2NoZW1hKSB7IHJldHVybiBjcmVhdGVEYkNvcmVUYWJsZSh0YWJsZVNjaGVtYSk7IH0pO1xuICAgICAgICB2YXIgdGFibGVNYXAgPSB7fTtcbiAgICAgICAgdGFibGVzLmZvckVhY2goZnVuY3Rpb24gKHRhYmxlKSB7IHJldHVybiB0YWJsZU1hcFt0YWJsZS5uYW1lXSA9IHRhYmxlOyB9KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YWNrOiBcImRiY29yZVwiLFxuICAgICAgICAgICAgdHJhbnNhY3Rpb246IGRiLnRyYW5zYWN0aW9uLmJpbmQoZGIpLFxuICAgICAgICAgICAgdGFibGU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRhYmxlTWFwW25hbWVdO1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUYWJsZSAnXCIuY29uY2F0KG5hbWUsIFwiJyBub3QgZm91bmRcIikpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZU1hcFtuYW1lXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBNSU5fS0VZOiAtSW5maW5pdHksXG4gICAgICAgICAgICBNQVhfS0VZOiBnZXRNYXhLZXkoSWRiS2V5UmFuZ2UpLFxuICAgICAgICAgICAgc2NoZW1hOiBzY2hlbWFcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVNaWRkbGV3YXJlU3RhY2soc3RhY2tJbXBsLCBtaWRkbGV3YXJlcykge1xuICAgICAgICByZXR1cm4gbWlkZGxld2FyZXMucmVkdWNlKGZ1bmN0aW9uIChkb3duLCBfYSkge1xuICAgICAgICAgICAgdmFyIGNyZWF0ZSA9IF9hLmNyZWF0ZTtcbiAgICAgICAgICAgIHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIGRvd24pLCBjcmVhdGUoZG93bikpKTtcbiAgICAgICAgfSwgc3RhY2tJbXBsKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlTWlkZGxld2FyZVN0YWNrcyhtaWRkbGV3YXJlcywgaWRiZGIsIF9hLCB0bXBUcmFucykge1xuICAgICAgICB2YXIgSURCS2V5UmFuZ2UgPSBfYS5JREJLZXlSYW5nZTsgX2EuaW5kZXhlZERCO1xuICAgICAgICB2YXIgZGJjb3JlID0gY3JlYXRlTWlkZGxld2FyZVN0YWNrKGNyZWF0ZURCQ29yZShpZGJkYiwgSURCS2V5UmFuZ2UsIHRtcFRyYW5zKSwgbWlkZGxld2FyZXMuZGJjb3JlKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRiY29yZTogZGJjb3JlXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlTWlkZGxld2FyZVN0YWNrcyhkYiwgdG1wVHJhbnMpIHtcbiAgICAgICAgdmFyIGlkYmRiID0gdG1wVHJhbnMuZGI7XG4gICAgICAgIHZhciBzdGFja3MgPSBjcmVhdGVNaWRkbGV3YXJlU3RhY2tzKGRiLl9taWRkbGV3YXJlcywgaWRiZGIsIGRiLl9kZXBzLCB0bXBUcmFucyk7XG4gICAgICAgIGRiLmNvcmUgPSBzdGFja3MuZGJjb3JlO1xuICAgICAgICBkYi50YWJsZXMuZm9yRWFjaChmdW5jdGlvbiAodGFibGUpIHtcbiAgICAgICAgICAgIHZhciB0YWJsZU5hbWUgPSB0YWJsZS5uYW1lO1xuICAgICAgICAgICAgaWYgKGRiLmNvcmUuc2NoZW1hLnRhYmxlcy5zb21lKGZ1bmN0aW9uICh0YmwpIHsgcmV0dXJuIHRibC5uYW1lID09PSB0YWJsZU5hbWU7IH0pKSB7XG4gICAgICAgICAgICAgICAgdGFibGUuY29yZSA9IGRiLmNvcmUudGFibGUodGFibGVOYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoZGJbdGFibGVOYW1lXSBpbnN0YW5jZW9mIGRiLlRhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRiW3RhYmxlTmFtZV0uY29yZSA9IHRhYmxlLmNvcmU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRBcGlPblBsYWNlKGRiLCBvYmpzLCB0YWJsZU5hbWVzLCBkYnNjaGVtYSkge1xuICAgICAgICB0YWJsZU5hbWVzLmZvckVhY2goZnVuY3Rpb24gKHRhYmxlTmFtZSkge1xuICAgICAgICAgICAgdmFyIHNjaGVtYSA9IGRic2NoZW1hW3RhYmxlTmFtZV07XG4gICAgICAgICAgICBvYmpzLmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wRGVzYyA9IGdldFByb3BlcnR5RGVzY3JpcHRvcihvYmosIHRhYmxlTmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wRGVzYyB8fCAoXCJ2YWx1ZVwiIGluIHByb3BEZXNjICYmIHByb3BEZXNjLnZhbHVlID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmogPT09IGRiLlRyYW5zYWN0aW9uLnByb3RvdHlwZSB8fCBvYmogaW5zdGFuY2VvZiBkYi5UcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UHJvcChvYmosIHRhYmxlTmFtZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy50YWJsZSh0YWJsZU5hbWUpOyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmluZVByb3BlcnR5KHRoaXMsIHRhYmxlTmFtZSwgeyB2YWx1ZTogdmFsdWUsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIGVudW1lcmFibGU6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbdGFibGVOYW1lXSA9IG5ldyBkYi5UYWJsZSh0YWJsZU5hbWUsIHNjaGVtYSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbW92ZVRhYmxlc0FwaShkYiwgb2Jqcykge1xuICAgICAgICBvYmpzLmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgICAgICAgIGlmIChvYmpba2V5XSBpbnN0YW5jZW9mIGRiLlRhYmxlKVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb2JqW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBsb3dlclZlcnNpb25GaXJzdChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLl9jZmcudmVyc2lvbiAtIGIuX2NmZy52ZXJzaW9uO1xuICAgIH1cbiAgICBmdW5jdGlvbiBydW5VcGdyYWRlcnMoZGIsIG9sZFZlcnNpb24sIGlkYlVwZ3JhZGVUcmFucywgcmVqZWN0KSB7XG4gICAgICAgIHZhciBnbG9iYWxTY2hlbWEgPSBkYi5fZGJTY2hlbWE7XG4gICAgICAgIGlmIChpZGJVcGdyYWRlVHJhbnMub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucygnJG1ldGEnKSAmJiAhZ2xvYmFsU2NoZW1hLiRtZXRhKSB7XG4gICAgICAgICAgICBnbG9iYWxTY2hlbWEuJG1ldGEgPSBjcmVhdGVUYWJsZVNjaGVtYShcIiRtZXRhXCIsIHBhcnNlSW5kZXhTeW50YXgoXCJcIilbMF0sIFtdKTtcbiAgICAgICAgICAgIGRiLl9zdG9yZU5hbWVzLnB1c2goJyRtZXRhJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRyYW5zID0gZGIuX2NyZWF0ZVRyYW5zYWN0aW9uKCdyZWFkd3JpdGUnLCBkYi5fc3RvcmVOYW1lcywgZ2xvYmFsU2NoZW1hKTtcbiAgICAgICAgdHJhbnMuY3JlYXRlKGlkYlVwZ3JhZGVUcmFucyk7XG4gICAgICAgIHRyYW5zLl9jb21wbGV0aW9uLmNhdGNoKHJlamVjdCk7XG4gICAgICAgIHZhciByZWplY3RUcmFuc2FjdGlvbiA9IHRyYW5zLl9yZWplY3QuYmluZCh0cmFucyk7XG4gICAgICAgIHZhciB0cmFuc2xlc3MgPSBQU0QudHJhbnNsZXNzIHx8IFBTRDtcbiAgICAgICAgbmV3U2NvcGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUFNELnRyYW5zID0gdHJhbnM7XG4gICAgICAgICAgICBQU0QudHJhbnNsZXNzID0gdHJhbnNsZXNzO1xuICAgICAgICAgICAgaWYgKG9sZFZlcnNpb24gPT09IDApIHtcbiAgICAgICAgICAgICAgICBrZXlzKGdsb2JhbFNjaGVtYSkuZm9yRWFjaChmdW5jdGlvbiAodGFibGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRhYmxlKGlkYlVwZ3JhZGVUcmFucywgdGFibGVOYW1lLCBnbG9iYWxTY2hlbWFbdGFibGVOYW1lXS5wcmltS2V5LCBnbG9iYWxTY2hlbWFbdGFibGVOYW1lXS5pbmRleGVzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZU1pZGRsZXdhcmVTdGFja3MoZGIsIGlkYlVwZ3JhZGVUcmFucyk7XG4gICAgICAgICAgICAgICAgRGV4aWVQcm9taXNlLmZvbGxvdyhmdW5jdGlvbiAoKSB7IHJldHVybiBkYi5vbi5wb3B1bGF0ZS5maXJlKHRyYW5zKTsgfSkuY2F0Y2gocmVqZWN0VHJhbnNhY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVNaWRkbGV3YXJlU3RhY2tzKGRiLCBpZGJVcGdyYWRlVHJhbnMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRFeGlzdGluZ1ZlcnNpb24oZGIsIHRyYW5zLCBvbGRWZXJzaW9uKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAob2xkVmVyc2lvbikgeyByZXR1cm4gdXBkYXRlVGFibGVzQW5kSW5kZXhlcyhkYiwgb2xkVmVyc2lvbiwgdHJhbnMsIGlkYlVwZ3JhZGVUcmFucyk7IH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChyZWplY3RUcmFuc2FjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXRjaEN1cnJlbnRWZXJzaW9uKGRiLCBpZGJVcGdyYWRlVHJhbnMpIHtcbiAgICAgICAgY3JlYXRlTWlzc2luZ1RhYmxlcyhkYi5fZGJTY2hlbWEsIGlkYlVwZ3JhZGVUcmFucyk7XG4gICAgICAgIGlmIChpZGJVcGdyYWRlVHJhbnMuZGIudmVyc2lvbiAlIDEwID09PSAwICYmICFpZGJVcGdyYWRlVHJhbnMub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucygnJG1ldGEnKSkge1xuICAgICAgICAgICAgaWRiVXBncmFkZVRyYW5zLmRiLmNyZWF0ZU9iamVjdFN0b3JlKCckbWV0YScpLmFkZChNYXRoLmNlaWwoKGlkYlVwZ3JhZGVUcmFucy5kYi52ZXJzaW9uIC8gMTApIC0gMSksICd2ZXJzaW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGdsb2JhbFNjaGVtYSA9IGJ1aWxkR2xvYmFsU2NoZW1hKGRiLCBkYi5pZGJkYiwgaWRiVXBncmFkZVRyYW5zKTtcbiAgICAgICAgYWRqdXN0VG9FeGlzdGluZ0luZGV4TmFtZXMoZGIsIGRiLl9kYlNjaGVtYSwgaWRiVXBncmFkZVRyYW5zKTtcbiAgICAgICAgdmFyIGRpZmYgPSBnZXRTY2hlbWFEaWZmKGdsb2JhbFNjaGVtYSwgZGIuX2RiU2NoZW1hKTtcbiAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAodGFibGVDaGFuZ2UpIHtcbiAgICAgICAgICAgIGlmICh0YWJsZUNoYW5nZS5jaGFuZ2UubGVuZ3RoIHx8IHRhYmxlQ2hhbmdlLnJlY3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiVW5hYmxlIHRvIHBhdGNoIGluZGV4ZXMgb2YgdGFibGUgXCIuY29uY2F0KHRhYmxlQ2hhbmdlLm5hbWUsIFwiIGJlY2F1c2UgaXQgaGFzIGNoYW5nZXMgb24gdGhlIHR5cGUgb2YgaW5kZXggb3IgcHJpbWFyeSBrZXkuXCIpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdm9pZCAwIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc3RvcmUgPSBpZGJVcGdyYWRlVHJhbnMub2JqZWN0U3RvcmUodGFibGVDaGFuZ2UubmFtZSk7XG4gICAgICAgICAgICB0YWJsZUNoYW5nZS5hZGQuZm9yRWFjaChmdW5jdGlvbiAoaWR4KSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlYnVnKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiRGV4aWUgdXBncmFkZSBwYXRjaDogQ3JlYXRpbmcgbWlzc2luZyBpbmRleCBcIi5jb25jYXQodGFibGVDaGFuZ2UubmFtZSwgXCIuXCIpLmNvbmNhdChpZHguc3JjKSk7XG4gICAgICAgICAgICAgICAgYWRkSW5kZXgoc3RvcmUsIGlkeCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IGRpZmYuY2hhbmdlOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIHRhYmxlQ2hhbmdlID0gX2FbX2ldO1xuICAgICAgICAgICAgdmFyIHN0YXRlXzEgPSBfbG9vcF8xKHRhYmxlQ2hhbmdlKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhdGVfMSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGVfMS52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRFeGlzdGluZ1ZlcnNpb24oZGIsIHRyYW5zLCBvbGRWZXJzaW9uKSB7XG4gICAgICAgIGlmICh0cmFucy5zdG9yZU5hbWVzLmluY2x1ZGVzKCckbWV0YScpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJhbnMudGFibGUoJyRtZXRhJykuZ2V0KCd2ZXJzaW9uJykudGhlbihmdW5jdGlvbiAobWV0YVZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0YVZlcnNpb24gIT0gbnVsbCA/IG1ldGFWZXJzaW9uIDogb2xkVmVyc2lvbjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIERleGllUHJvbWlzZS5yZXNvbHZlKG9sZFZlcnNpb24pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRhYmxlc0FuZEluZGV4ZXMoZGIsIG9sZFZlcnNpb24sIHRyYW5zLCBpZGJVcGdyYWRlVHJhbnMpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHZhciB2ZXJzaW9ucyA9IGRiLl92ZXJzaW9ucztcbiAgICAgICAgdmFyIGdsb2JhbFNjaGVtYSA9IGRiLl9kYlNjaGVtYSA9IGJ1aWxkR2xvYmFsU2NoZW1hKGRiLCBkYi5pZGJkYiwgaWRiVXBncmFkZVRyYW5zKTtcbiAgICAgICAgdmFyIHZlcnNUb1J1biA9IHZlcnNpb25zLmZpbHRlcihmdW5jdGlvbiAodikgeyByZXR1cm4gdi5fY2ZnLnZlcnNpb24gPj0gb2xkVmVyc2lvbjsgfSk7XG4gICAgICAgIGlmICh2ZXJzVG9SdW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gRGV4aWVQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICB2ZXJzVG9SdW4uZm9yRWFjaChmdW5jdGlvbiAodmVyc2lvbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9sZFNjaGVtYSA9IGdsb2JhbFNjaGVtYTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3U2NoZW1hID0gdmVyc2lvbi5fY2ZnLmRic2NoZW1hO1xuICAgICAgICAgICAgICAgIGFkanVzdFRvRXhpc3RpbmdJbmRleE5hbWVzKGRiLCBvbGRTY2hlbWEsIGlkYlVwZ3JhZGVUcmFucyk7XG4gICAgICAgICAgICAgICAgYWRqdXN0VG9FeGlzdGluZ0luZGV4TmFtZXMoZGIsIG5ld1NjaGVtYSwgaWRiVXBncmFkZVRyYW5zKTtcbiAgICAgICAgICAgICAgICBnbG9iYWxTY2hlbWEgPSBkYi5fZGJTY2hlbWEgPSBuZXdTY2hlbWE7XG4gICAgICAgICAgICAgICAgdmFyIGRpZmYgPSBnZXRTY2hlbWFEaWZmKG9sZFNjaGVtYSwgbmV3U2NoZW1hKTtcbiAgICAgICAgICAgICAgICBkaWZmLmFkZC5mb3JFYWNoKGZ1bmN0aW9uICh0dXBsZSkge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVUYWJsZShpZGJVcGdyYWRlVHJhbnMsIHR1cGxlWzBdLCB0dXBsZVsxXS5wcmltS2V5LCB0dXBsZVsxXS5pbmRleGVzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkaWZmLmNoYW5nZS5mb3JFYWNoKGZ1bmN0aW9uIChjaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZS5yZWNyZWF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuVXBncmFkZShcIk5vdCB5ZXQgc3VwcG9ydCBmb3IgY2hhbmdpbmcgcHJpbWFyeSBrZXlcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RvcmVfMSA9IGlkYlVwZ3JhZGVUcmFucy5vYmplY3RTdG9yZShjaGFuZ2UubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2UuYWRkLmZvckVhY2goZnVuY3Rpb24gKGlkeCkgeyByZXR1cm4gYWRkSW5kZXgoc3RvcmVfMSwgaWR4KTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2UuY2hhbmdlLmZvckVhY2goZnVuY3Rpb24gKGlkeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlXzEuZGVsZXRlSW5kZXgoaWR4Lm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEluZGV4KHN0b3JlXzEsIGlkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZS5kZWwuZm9yRWFjaChmdW5jdGlvbiAoaWR4TmFtZSkgeyByZXR1cm4gc3RvcmVfMS5kZWxldGVJbmRleChpZHhOYW1lKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudFVwZ3JhZGUgPSB2ZXJzaW9uLl9jZmcuY29udGVudFVwZ3JhZGU7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRVcGdyYWRlICYmIHZlcnNpb24uX2NmZy52ZXJzaW9uID4gb2xkVmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZU1pZGRsZXdhcmVTdGFja3MoZGIsIGlkYlVwZ3JhZGVUcmFucyk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zLl9tZW1vaXplZFRhYmxlcyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXBncmFkZVNjaGVtYV8xID0gc2hhbGxvd0Nsb25lKG5ld1NjaGVtYSk7XG4gICAgICAgICAgICAgICAgICAgIGRpZmYuZGVsLmZvckVhY2goZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGdyYWRlU2NoZW1hXzFbdGFibGVdID0gb2xkU2NoZW1hW3RhYmxlXTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVRhYmxlc0FwaShkYiwgW2RiLlRyYW5zYWN0aW9uLnByb3RvdHlwZV0pO1xuICAgICAgICAgICAgICAgICAgICBzZXRBcGlPblBsYWNlKGRiLCBbZGIuVHJhbnNhY3Rpb24ucHJvdG90eXBlXSwga2V5cyh1cGdyYWRlU2NoZW1hXzEpLCB1cGdyYWRlU2NoZW1hXzEpO1xuICAgICAgICAgICAgICAgICAgICB0cmFucy5zY2hlbWEgPSB1cGdyYWRlU2NoZW1hXzE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50VXBncmFkZUlzQXN5bmNfMSA9IGlzQXN5bmNGdW5jdGlvbihjb250ZW50VXBncmFkZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50VXBncmFkZUlzQXN5bmNfMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jcmVtZW50RXhwZWN0ZWRBd2FpdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuVmFsdWVfMTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb21pc2VGb2xsb3dlZCA9IERleGllUHJvbWlzZS5mb2xsb3coZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWVfMSA9IGNvbnRlbnRVcGdyYWRlKHRyYW5zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZV8xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRVcGdyYWRlSXNBc3luY18xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWNyZW1lbnRvciA9IGRlY3JlbWVudEV4cGVjdGVkQXdhaXRzLmJpbmQobnVsbCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlXzEudGhlbihkZWNyZW1lbnRvciwgZGVjcmVtZW50b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAocmV0dXJuVmFsdWVfMSAmJiB0eXBlb2YgcmV0dXJuVmFsdWVfMS50aGVuID09PSAnZnVuY3Rpb24nID9cbiAgICAgICAgICAgICAgICAgICAgICAgIERleGllUHJvbWlzZS5yZXNvbHZlKHJldHVyblZhbHVlXzEpIDogcHJvbWlzZUZvbGxvd2VkLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gcmV0dXJuVmFsdWVfMTsgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcXVldWUucHVzaChmdW5jdGlvbiAoaWRidHJhbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3U2NoZW1hID0gdmVyc2lvbi5fY2ZnLmRic2NoZW1hO1xuICAgICAgICAgICAgICAgIGRlbGV0ZVJlbW92ZWRUYWJsZXMobmV3U2NoZW1hLCBpZGJ0cmFucyk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVGFibGVzQXBpKGRiLCBbZGIuVHJhbnNhY3Rpb24ucHJvdG90eXBlXSk7XG4gICAgICAgICAgICAgICAgc2V0QXBpT25QbGFjZShkYiwgW2RiLlRyYW5zYWN0aW9uLnByb3RvdHlwZV0sIGRiLl9zdG9yZU5hbWVzLCBkYi5fZGJTY2hlbWEpO1xuICAgICAgICAgICAgICAgIHRyYW5zLnNjaGVtYSA9IGRiLl9kYlNjaGVtYTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcXVldWUucHVzaChmdW5jdGlvbiAoaWRidHJhbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGIuaWRiZGIub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucygnJG1ldGEnKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5jZWlsKGRiLmlkYmRiLnZlcnNpb24gLyAxMCkgPT09IHZlcnNpb24uX2NmZy52ZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYi5pZGJkYi5kZWxldGVPYmplY3RTdG9yZSgnJG1ldGEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkYi5fZGJTY2hlbWEuJG1ldGE7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYi5fc3RvcmVOYW1lcyA9IGRiLl9zdG9yZU5hbWVzLmZpbHRlcihmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gbmFtZSAhPT0gJyRtZXRhJzsgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZGJ0cmFucy5vYmplY3RTdG9yZSgnJG1ldGEnKS5wdXQodmVyc2lvbi5fY2ZnLnZlcnNpb24sICd2ZXJzaW9uJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIHJ1blF1ZXVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXVlLmxlbmd0aCA/IERleGllUHJvbWlzZS5yZXNvbHZlKHF1ZXVlLnNoaWZ0KCkodHJhbnMuaWRidHJhbnMpKS50aGVuKHJ1blF1ZXVlKSA6XG4gICAgICAgICAgICAgICAgRGV4aWVQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcnVuUXVldWUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNyZWF0ZU1pc3NpbmdUYWJsZXMoZ2xvYmFsU2NoZW1hLCBpZGJVcGdyYWRlVHJhbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0U2NoZW1hRGlmZihvbGRTY2hlbWEsIG5ld1NjaGVtYSkge1xuICAgICAgICB2YXIgZGlmZiA9IHtcbiAgICAgICAgICAgIGRlbDogW10sXG4gICAgICAgICAgICBhZGQ6IFtdLFxuICAgICAgICAgICAgY2hhbmdlOiBbXVxuICAgICAgICB9O1xuICAgICAgICB2YXIgdGFibGU7XG4gICAgICAgIGZvciAodGFibGUgaW4gb2xkU2NoZW1hKSB7XG4gICAgICAgICAgICBpZiAoIW5ld1NjaGVtYVt0YWJsZV0pXG4gICAgICAgICAgICAgICAgZGlmZi5kZWwucHVzaCh0YWJsZSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh0YWJsZSBpbiBuZXdTY2hlbWEpIHtcbiAgICAgICAgICAgIHZhciBvbGREZWYgPSBvbGRTY2hlbWFbdGFibGVdLCBuZXdEZWYgPSBuZXdTY2hlbWFbdGFibGVdO1xuICAgICAgICAgICAgaWYgKCFvbGREZWYpIHtcbiAgICAgICAgICAgICAgICBkaWZmLmFkZC5wdXNoKFt0YWJsZSwgbmV3RGVmXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hhbmdlID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0YWJsZSxcbiAgICAgICAgICAgICAgICAgICAgZGVmOiBuZXdEZWYsXG4gICAgICAgICAgICAgICAgICAgIHJlY3JlYXRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZGVsOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgYWRkOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBbXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKChcbiAgICAgICAgICAgICAgICAnJyArIChvbGREZWYucHJpbUtleS5rZXlQYXRoIHx8ICcnKSkgIT09ICgnJyArIChuZXdEZWYucHJpbUtleS5rZXlQYXRoIHx8ICcnKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgKG9sZERlZi5wcmltS2V5LmF1dG8gIT09IG5ld0RlZi5wcmltS2V5LmF1dG8pKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZS5yZWNyZWF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGRpZmYuY2hhbmdlLnB1c2goY2hhbmdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGRJbmRleGVzID0gb2xkRGVmLmlkeEJ5TmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0luZGV4ZXMgPSBuZXdEZWYuaWR4QnlOYW1lO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWR4TmFtZSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpZHhOYW1lIGluIG9sZEluZGV4ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmV3SW5kZXhlc1tpZHhOYW1lXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2UuZGVsLnB1c2goaWR4TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChpZHhOYW1lIGluIG5ld0luZGV4ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbGRJZHggPSBvbGRJbmRleGVzW2lkeE5hbWVdLCBuZXdJZHggPSBuZXdJbmRleGVzW2lkeE5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvbGRJZHgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlLmFkZC5wdXNoKG5ld0lkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvbGRJZHguc3JjICE9PSBuZXdJZHguc3JjKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZS5jaGFuZ2UucHVzaChuZXdJZHgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UuZGVsLmxlbmd0aCA+IDAgfHwgY2hhbmdlLmFkZC5sZW5ndGggPiAwIHx8IGNoYW5nZS5jaGFuZ2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlmZi5jaGFuZ2UucHVzaChjaGFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaWZmO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVUYWJsZShpZGJ0cmFucywgdGFibGVOYW1lLCBwcmltS2V5LCBpbmRleGVzKSB7XG4gICAgICAgIHZhciBzdG9yZSA9IGlkYnRyYW5zLmRiLmNyZWF0ZU9iamVjdFN0b3JlKHRhYmxlTmFtZSwgcHJpbUtleS5rZXlQYXRoID9cbiAgICAgICAgICAgIHsga2V5UGF0aDogcHJpbUtleS5rZXlQYXRoLCBhdXRvSW5jcmVtZW50OiBwcmltS2V5LmF1dG8gfSA6XG4gICAgICAgICAgICB7IGF1dG9JbmNyZW1lbnQ6IHByaW1LZXkuYXV0byB9KTtcbiAgICAgICAgaW5kZXhlcy5mb3JFYWNoKGZ1bmN0aW9uIChpZHgpIHsgcmV0dXJuIGFkZEluZGV4KHN0b3JlLCBpZHgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHN0b3JlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVNaXNzaW5nVGFibGVzKG5ld1NjaGVtYSwgaWRidHJhbnMpIHtcbiAgICAgICAga2V5cyhuZXdTY2hlbWEpLmZvckVhY2goZnVuY3Rpb24gKHRhYmxlTmFtZSkge1xuICAgICAgICAgICAgaWYgKCFpZGJ0cmFucy5kYi5vYmplY3RTdG9yZU5hbWVzLmNvbnRhaW5zKHRhYmxlTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVidWcpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ0RleGllOiBDcmVhdGluZyBtaXNzaW5nIHRhYmxlJywgdGFibGVOYW1lKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVUYWJsZShpZGJ0cmFucywgdGFibGVOYW1lLCBuZXdTY2hlbWFbdGFibGVOYW1lXS5wcmltS2V5LCBuZXdTY2hlbWFbdGFibGVOYW1lXS5pbmRleGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRlbGV0ZVJlbW92ZWRUYWJsZXMobmV3U2NoZW1hLCBpZGJ0cmFucykge1xuICAgICAgICBbXS5zbGljZS5jYWxsKGlkYnRyYW5zLmRiLm9iamVjdFN0b3JlTmFtZXMpLmZvckVhY2goZnVuY3Rpb24gKHN0b3JlTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ld1NjaGVtYVtzdG9yZU5hbWVdID09IG51bGwgJiYgaWRidHJhbnMuZGIuZGVsZXRlT2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZEluZGV4KHN0b3JlLCBpZHgpIHtcbiAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoaWR4Lm5hbWUsIGlkeC5rZXlQYXRoLCB7IHVuaXF1ZTogaWR4LnVuaXF1ZSwgbXVsdGlFbnRyeTogaWR4Lm11bHRpIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBidWlsZEdsb2JhbFNjaGVtYShkYiwgaWRiZGIsIHRtcFRyYW5zKSB7XG4gICAgICAgIHZhciBnbG9iYWxTY2hlbWEgPSB7fTtcbiAgICAgICAgdmFyIGRiU3RvcmVOYW1lcyA9IHNsaWNlKGlkYmRiLm9iamVjdFN0b3JlTmFtZXMsIDApO1xuICAgICAgICBkYlN0b3JlTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoc3RvcmVOYW1lKSB7XG4gICAgICAgICAgICB2YXIgc3RvcmUgPSB0bXBUcmFucy5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xuICAgICAgICAgICAgdmFyIGtleVBhdGggPSBzdG9yZS5rZXlQYXRoO1xuICAgICAgICAgICAgdmFyIHByaW1LZXkgPSBjcmVhdGVJbmRleFNwZWMobmFtZUZyb21LZXlQYXRoKGtleVBhdGgpLCBrZXlQYXRoIHx8IFwiXCIsIHRydWUsIGZhbHNlLCAhIXN0b3JlLmF1dG9JbmNyZW1lbnQsIGtleVBhdGggJiYgdHlwZW9mIGtleVBhdGggIT09IFwic3RyaW5nXCIsIHRydWUpO1xuICAgICAgICAgICAgdmFyIGluZGV4ZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc3RvcmUuaW5kZXhOYW1lcy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgIHZhciBpZGJpbmRleCA9IHN0b3JlLmluZGV4KHN0b3JlLmluZGV4TmFtZXNbal0pO1xuICAgICAgICAgICAgICAgIGtleVBhdGggPSBpZGJpbmRleC5rZXlQYXRoO1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGNyZWF0ZUluZGV4U3BlYyhpZGJpbmRleC5uYW1lLCBrZXlQYXRoLCAhIWlkYmluZGV4LnVuaXF1ZSwgISFpZGJpbmRleC5tdWx0aUVudHJ5LCBmYWxzZSwga2V5UGF0aCAmJiB0eXBlb2Yga2V5UGF0aCAhPT0gXCJzdHJpbmdcIiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGluZGV4ZXMucHVzaChpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnbG9iYWxTY2hlbWFbc3RvcmVOYW1lXSA9IGNyZWF0ZVRhYmxlU2NoZW1hKHN0b3JlTmFtZSwgcHJpbUtleSwgaW5kZXhlcyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZ2xvYmFsU2NoZW1hO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWFkR2xvYmFsU2NoZW1hKGRiLCBpZGJkYiwgdG1wVHJhbnMpIHtcbiAgICAgICAgZGIudmVybm8gPSBpZGJkYi52ZXJzaW9uIC8gMTA7XG4gICAgICAgIHZhciBnbG9iYWxTY2hlbWEgPSBkYi5fZGJTY2hlbWEgPSBidWlsZEdsb2JhbFNjaGVtYShkYiwgaWRiZGIsIHRtcFRyYW5zKTtcbiAgICAgICAgZGIuX3N0b3JlTmFtZXMgPSBzbGljZShpZGJkYi5vYmplY3RTdG9yZU5hbWVzLCAwKTtcbiAgICAgICAgc2V0QXBpT25QbGFjZShkYiwgW2RiLl9hbGxUYWJsZXNdLCBrZXlzKGdsb2JhbFNjaGVtYSksIGdsb2JhbFNjaGVtYSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHZlcmlmeUluc3RhbGxlZFNjaGVtYShkYiwgdG1wVHJhbnMpIHtcbiAgICAgICAgdmFyIGluc3RhbGxlZFNjaGVtYSA9IGJ1aWxkR2xvYmFsU2NoZW1hKGRiLCBkYi5pZGJkYiwgdG1wVHJhbnMpO1xuICAgICAgICB2YXIgZGlmZiA9IGdldFNjaGVtYURpZmYoaW5zdGFsbGVkU2NoZW1hLCBkYi5fZGJTY2hlbWEpO1xuICAgICAgICByZXR1cm4gIShkaWZmLmFkZC5sZW5ndGggfHwgZGlmZi5jaGFuZ2Uuc29tZShmdW5jdGlvbiAoY2gpIHsgcmV0dXJuIGNoLmFkZC5sZW5ndGggfHwgY2guY2hhbmdlLmxlbmd0aDsgfSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGp1c3RUb0V4aXN0aW5nSW5kZXhOYW1lcyhkYiwgc2NoZW1hLCBpZGJ0cmFucykge1xuICAgICAgICB2YXIgc3RvcmVOYW1lcyA9IGlkYnRyYW5zLmRiLm9iamVjdFN0b3JlTmFtZXM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RvcmVOYW1lcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIHN0b3JlTmFtZSA9IHN0b3JlTmFtZXNbaV07XG4gICAgICAgICAgICB2YXIgc3RvcmUgPSBpZGJ0cmFucy5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xuICAgICAgICAgICAgZGIuX2hhc0dldEFsbCA9ICdnZXRBbGwnIGluIHN0b3JlO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzdG9yZS5pbmRleE5hbWVzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4TmFtZSA9IHN0b3JlLmluZGV4TmFtZXNbal07XG4gICAgICAgICAgICAgICAgdmFyIGtleVBhdGggPSBzdG9yZS5pbmRleChpbmRleE5hbWUpLmtleVBhdGg7XG4gICAgICAgICAgICAgICAgdmFyIGRleGllTmFtZSA9IHR5cGVvZiBrZXlQYXRoID09PSAnc3RyaW5nJyA/IGtleVBhdGggOiBcIltcIiArIHNsaWNlKGtleVBhdGgpLmpvaW4oJysnKSArIFwiXVwiO1xuICAgICAgICAgICAgICAgIGlmIChzY2hlbWFbc3RvcmVOYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXhTcGVjID0gc2NoZW1hW3N0b3JlTmFtZV0uaWR4QnlOYW1lW2RleGllTmFtZV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleFNwZWMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4U3BlYy5uYW1lID0gaW5kZXhOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHNjaGVtYVtzdG9yZU5hbWVdLmlkeEJ5TmFtZVtkZXhpZU5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NoZW1hW3N0b3JlTmFtZV0uaWR4QnlOYW1lW2luZGV4TmFtZV0gPSBpbmRleFNwZWM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9TYWZhcmkvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiZcbiAgICAgICAgICAgICEvKENocm9tZVxcL3xFZGdlXFwvKS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJlxuICAgICAgICAgICAgX2dsb2JhbC5Xb3JrZXJHbG9iYWxTY29wZSAmJiBfZ2xvYmFsIGluc3RhbmNlb2YgX2dsb2JhbC5Xb3JrZXJHbG9iYWxTY29wZSAmJlxuICAgICAgICAgICAgW10uY29uY2F0KG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1NhZmFyaVxcLyhcXGQqKS8pKVsxXSA8IDYwNCkge1xuICAgICAgICAgICAgZGIuX2hhc0dldEFsbCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlSW5kZXhTeW50YXgocHJpbUtleUFuZEluZGV4ZXMpIHtcbiAgICAgICAgcmV0dXJuIHByaW1LZXlBbmRJbmRleGVzLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uIChpbmRleCwgaW5kZXhOdW0pIHtcbiAgICAgICAgICAgIGluZGV4ID0gaW5kZXgudHJpbSgpO1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBpbmRleC5yZXBsYWNlKC8oWyYqXXxcXCtcXCspL2csIFwiXCIpO1xuICAgICAgICAgICAgdmFyIGtleVBhdGggPSAvXlxcWy8udGVzdChuYW1lKSA/IG5hbWUubWF0Y2goL15cXFsoLiopXFxdJC8pWzFdLnNwbGl0KCcrJykgOiBuYW1lO1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUluZGV4U3BlYyhuYW1lLCBrZXlQYXRoIHx8IG51bGwsIC9cXCYvLnRlc3QoaW5kZXgpLCAvXFwqLy50ZXN0KGluZGV4KSwgL1xcK1xcKy8udGVzdChpbmRleCksIGlzQXJyYXkoa2V5UGF0aCksIGluZGV4TnVtID09PSAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIFZlcnNpb24gPSAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gVmVyc2lvbigpIHtcbiAgICAgICAgfVxuICAgICAgICBWZXJzaW9uLnByb3RvdHlwZS5fcGFyc2VTdG9yZXNTcGVjID0gZnVuY3Rpb24gKHN0b3Jlcywgb3V0U2NoZW1hKSB7XG4gICAgICAgICAgICBrZXlzKHN0b3JlcykuZm9yRWFjaChmdW5jdGlvbiAodGFibGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0b3Jlc1t0YWJsZU5hbWVdICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleGVzID0gcGFyc2VJbmRleFN5bnRheChzdG9yZXNbdGFibGVOYW1lXSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmltS2V5ID0gaW5kZXhlcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBwcmltS2V5LnVuaXF1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmltS2V5Lm11bHRpKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuU2NoZW1hKFwiUHJpbWFyeSBrZXkgY2Fubm90IGJlIG11bHRpLXZhbHVlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhlcy5mb3JFYWNoKGZ1bmN0aW9uIChpZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHguYXV0bylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5TY2hlbWEoXCJPbmx5IHByaW1hcnkga2V5IGNhbiBiZSBtYXJrZWQgYXMgYXV0b0luY3JlbWVudCAoKyspXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpZHgua2V5UGF0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5TY2hlbWEoXCJJbmRleCBtdXN0IGhhdmUgYSBuYW1lIGFuZCBjYW5ub3QgYmUgYW4gZW1wdHkgc3RyaW5nXCIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgb3V0U2NoZW1hW3RhYmxlTmFtZV0gPSBjcmVhdGVUYWJsZVNjaGVtYSh0YWJsZU5hbWUsIHByaW1LZXksIGluZGV4ZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBWZXJzaW9uLnByb3RvdHlwZS5zdG9yZXMgPSBmdW5jdGlvbiAoc3RvcmVzKSB7XG4gICAgICAgICAgICB2YXIgZGIgPSB0aGlzLmRiO1xuICAgICAgICAgICAgdGhpcy5fY2ZnLnN0b3Jlc1NvdXJjZSA9IHRoaXMuX2NmZy5zdG9yZXNTb3VyY2UgP1xuICAgICAgICAgICAgICAgIGV4dGVuZCh0aGlzLl9jZmcuc3RvcmVzU291cmNlLCBzdG9yZXMpIDpcbiAgICAgICAgICAgICAgICBzdG9yZXM7XG4gICAgICAgICAgICB2YXIgdmVyc2lvbnMgPSBkYi5fdmVyc2lvbnM7XG4gICAgICAgICAgICB2YXIgc3RvcmVzU3BlYyA9IHt9O1xuICAgICAgICAgICAgdmFyIGRic2NoZW1hID0ge307XG4gICAgICAgICAgICB2ZXJzaW9ucy5mb3JFYWNoKGZ1bmN0aW9uICh2ZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgZXh0ZW5kKHN0b3Jlc1NwZWMsIHZlcnNpb24uX2NmZy5zdG9yZXNTb3VyY2UpO1xuICAgICAgICAgICAgICAgIGRic2NoZW1hID0gKHZlcnNpb24uX2NmZy5kYnNjaGVtYSA9IHt9KTtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uLl9wYXJzZVN0b3Jlc1NwZWMoc3RvcmVzU3BlYywgZGJzY2hlbWEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkYi5fZGJTY2hlbWEgPSBkYnNjaGVtYTtcbiAgICAgICAgICAgIHJlbW92ZVRhYmxlc0FwaShkYiwgW2RiLl9hbGxUYWJsZXMsIGRiLCBkYi5UcmFuc2FjdGlvbi5wcm90b3R5cGVdKTtcbiAgICAgICAgICAgIHNldEFwaU9uUGxhY2UoZGIsIFtkYi5fYWxsVGFibGVzLCBkYiwgZGIuVHJhbnNhY3Rpb24ucHJvdG90eXBlLCB0aGlzLl9jZmcudGFibGVzXSwga2V5cyhkYnNjaGVtYSksIGRic2NoZW1hKTtcbiAgICAgICAgICAgIGRiLl9zdG9yZU5hbWVzID0ga2V5cyhkYnNjaGVtYSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgVmVyc2lvbi5wcm90b3R5cGUudXBncmFkZSA9IGZ1bmN0aW9uICh1cGdyYWRlRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2NmZy5jb250ZW50VXBncmFkZSA9IHByb21pc2FibGVDaGFpbih0aGlzLl9jZmcuY29udGVudFVwZ3JhZGUgfHwgbm9wLCB1cGdyYWRlRnVuY3Rpb24pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBWZXJzaW9uO1xuICAgIH0oKSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVWZXJzaW9uQ29uc3RydWN0b3IoZGIpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VDbGFzc0NvbnN0cnVjdG9yKFZlcnNpb24ucHJvdG90eXBlLCBmdW5jdGlvbiBWZXJzaW9uKHZlcnNpb25OdW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZGIgPSBkYjtcbiAgICAgICAgICAgIHRoaXMuX2NmZyA9IHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uTnVtYmVyLFxuICAgICAgICAgICAgICAgIHN0b3Jlc1NvdXJjZTogbnVsbCxcbiAgICAgICAgICAgICAgICBkYnNjaGVtYToge30sXG4gICAgICAgICAgICAgICAgdGFibGVzOiB7fSxcbiAgICAgICAgICAgICAgICBjb250ZW50VXBncmFkZTogbnVsbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGJOYW1lc1RhYmxlKGluZGV4ZWREQiwgSURCS2V5UmFuZ2UpIHtcbiAgICAgICAgdmFyIGRiTmFtZXNEQiA9IGluZGV4ZWREQltcIl9kYk5hbWVzREJcIl07XG4gICAgICAgIGlmICghZGJOYW1lc0RCKSB7XG4gICAgICAgICAgICBkYk5hbWVzREIgPSBpbmRleGVkREJbXCJfZGJOYW1lc0RCXCJdID0gbmV3IERleGllJDEoREJOQU1FU19EQiwge1xuICAgICAgICAgICAgICAgIGFkZG9uczogW10sXG4gICAgICAgICAgICAgICAgaW5kZXhlZERCOiBpbmRleGVkREIsXG4gICAgICAgICAgICAgICAgSURCS2V5UmFuZ2U6IElEQktleVJhbmdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkYk5hbWVzREIudmVyc2lvbigxKS5zdG9yZXMoeyBkYm5hbWVzOiBcIm5hbWVcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGJOYW1lc0RCLnRhYmxlKFwiZGJuYW1lc1wiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaGFzRGF0YWJhc2VzTmF0aXZlKGluZGV4ZWREQikge1xuICAgICAgICByZXR1cm4gaW5kZXhlZERCICYmIHR5cGVvZiBpbmRleGVkREIuZGF0YWJhc2VzID09PSBcImZ1bmN0aW9uXCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldERhdGFiYXNlTmFtZXMoX2EpIHtcbiAgICAgICAgdmFyIGluZGV4ZWREQiA9IF9hLmluZGV4ZWREQiwgSURCS2V5UmFuZ2UgPSBfYS5JREJLZXlSYW5nZTtcbiAgICAgICAgcmV0dXJuIGhhc0RhdGFiYXNlc05hdGl2ZShpbmRleGVkREIpXG4gICAgICAgICAgICA/IFByb21pc2UucmVzb2x2ZShpbmRleGVkREIuZGF0YWJhc2VzKCkpLnRoZW4oZnVuY3Rpb24gKGluZm9zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZm9zXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGluZm8pIHsgcmV0dXJuIGluZm8ubmFtZTsgfSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gbmFtZSAhPT0gREJOQU1FU19EQjsgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBnZXREYk5hbWVzVGFibGUoaW5kZXhlZERCLCBJREJLZXlSYW5nZSkudG9Db2xsZWN0aW9uKCkucHJpbWFyeUtleXMoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gX29uRGF0YWJhc2VDcmVhdGVkKF9hLCBuYW1lKSB7XG4gICAgICAgIHZhciBpbmRleGVkREIgPSBfYS5pbmRleGVkREIsIElEQktleVJhbmdlID0gX2EuSURCS2V5UmFuZ2U7XG4gICAgICAgICFoYXNEYXRhYmFzZXNOYXRpdmUoaW5kZXhlZERCKSAmJlxuICAgICAgICAgICAgbmFtZSAhPT0gREJOQU1FU19EQiAmJlxuICAgICAgICAgICAgZ2V0RGJOYW1lc1RhYmxlKGluZGV4ZWREQiwgSURCS2V5UmFuZ2UpLnB1dCh7IG5hbWU6IG5hbWUgfSkuY2F0Y2gobm9wKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gX29uRGF0YWJhc2VEZWxldGVkKF9hLCBuYW1lKSB7XG4gICAgICAgIHZhciBpbmRleGVkREIgPSBfYS5pbmRleGVkREIsIElEQktleVJhbmdlID0gX2EuSURCS2V5UmFuZ2U7XG4gICAgICAgICFoYXNEYXRhYmFzZXNOYXRpdmUoaW5kZXhlZERCKSAmJlxuICAgICAgICAgICAgbmFtZSAhPT0gREJOQU1FU19EQiAmJlxuICAgICAgICAgICAgZ2V0RGJOYW1lc1RhYmxlKGluZGV4ZWREQiwgSURCS2V5UmFuZ2UpLmRlbGV0ZShuYW1lKS5jYXRjaChub3ApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZpcChmbikge1xuICAgICAgICByZXR1cm4gbmV3U2NvcGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUFNELmxldFRocm91Z2ggPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlkYlJlYWR5KCkge1xuICAgICAgICB2YXIgaXNTYWZhcmkgPSAhbmF2aWdhdG9yLnVzZXJBZ2VudERhdGEgJiZcbiAgICAgICAgICAgIC9TYWZhcmlcXC8vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiZcbiAgICAgICAgICAgICEvQ2hyb20oZXxpdW0pXFwvLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgICBpZiAoIWlzU2FmYXJpIHx8ICFpbmRleGVkREIuZGF0YWJhc2VzKVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB2YXIgaW50ZXJ2YWxJZDtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICB2YXIgdHJ5SWRiID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaW5kZXhlZERCLmRhdGFiYXNlcygpLmZpbmFsbHkocmVzb2x2ZSk7IH07XG4gICAgICAgICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodHJ5SWRiLCAxMDApO1xuICAgICAgICAgICAgdHJ5SWRiKCk7XG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24gKCkgeyByZXR1cm4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTsgfSk7XG4gICAgfVxuXG4gICAgdmFyIF9hO1xuICAgIGZ1bmN0aW9uIGlzRW1wdHlSYW5nZShub2RlKSB7XG4gICAgICAgIHJldHVybiAhKFwiZnJvbVwiIGluIG5vZGUpO1xuICAgIH1cbiAgICB2YXIgUmFuZ2VTZXQgPSBmdW5jdGlvbiAoZnJvbU9yVHJlZSwgdG8pIHtcbiAgICAgICAgaWYgKHRoaXMpIHtcbiAgICAgICAgICAgIGV4dGVuZCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID8geyBkOiAxLCBmcm9tOiBmcm9tT3JUcmVlLCB0bzogYXJndW1lbnRzLmxlbmd0aCA+IDEgPyB0byA6IGZyb21PclRyZWUgfSA6IHsgZDogMCB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBydiA9IG5ldyBSYW5nZVNldCgpO1xuICAgICAgICAgICAgaWYgKGZyb21PclRyZWUgJiYgKFwiZFwiIGluIGZyb21PclRyZWUpKSB7XG4gICAgICAgICAgICAgICAgZXh0ZW5kKHJ2LCBmcm9tT3JUcmVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBydjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcHJvcHMoUmFuZ2VTZXQucHJvdG90eXBlLCAoX2EgPSB7XG4gICAgICAgICAgICBhZGQ6IGZ1bmN0aW9uIChyYW5nZVNldCkge1xuICAgICAgICAgICAgICAgIG1lcmdlUmFuZ2VzKHRoaXMsIHJhbmdlU2V0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZGRLZXk6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICBhZGRSYW5nZSh0aGlzLCBrZXksIGtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWRkS2V5czogZnVuY3Rpb24gKGtleXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBhZGRSYW5nZShfdGhpcywga2V5LCBrZXkpOyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYXNLZXk6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGdldFJhbmdlU2V0SXRlcmF0b3IodGhpcykubmV4dChrZXkpLnZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlICYmIGNtcChub2RlLmZyb20sIGtleSkgPD0gMCAmJiBjbXAobm9kZS50bywga2V5KSA+PSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBfYVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0UmFuZ2VTZXRJdGVyYXRvcih0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgX2EpKTtcbiAgICBmdW5jdGlvbiBhZGRSYW5nZSh0YXJnZXQsIGZyb20sIHRvKSB7XG4gICAgICAgIHZhciBkaWZmID0gY21wKGZyb20sIHRvKTtcbiAgICAgICAgaWYgKGlzTmFOKGRpZmYpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoZGlmZiA+IDApXG4gICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKCk7XG4gICAgICAgIGlmIChpc0VtcHR5UmFuZ2UodGFyZ2V0KSlcbiAgICAgICAgICAgIHJldHVybiBleHRlbmQodGFyZ2V0LCB7IGZyb206IGZyb20sIHRvOiB0bywgZDogMSB9KTtcbiAgICAgICAgdmFyIGxlZnQgPSB0YXJnZXQubDtcbiAgICAgICAgdmFyIHJpZ2h0ID0gdGFyZ2V0LnI7XG4gICAgICAgIGlmIChjbXAodG8sIHRhcmdldC5mcm9tKSA8IDApIHtcbiAgICAgICAgICAgIGxlZnRcbiAgICAgICAgICAgICAgICA/IGFkZFJhbmdlKGxlZnQsIGZyb20sIHRvKVxuICAgICAgICAgICAgICAgIDogKHRhcmdldC5sID0geyBmcm9tOiBmcm9tLCB0bzogdG8sIGQ6IDEsIGw6IG51bGwsIHI6IG51bGwgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmViYWxhbmNlKHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNtcChmcm9tLCB0YXJnZXQudG8pID4gMCkge1xuICAgICAgICAgICAgcmlnaHRcbiAgICAgICAgICAgICAgICA/IGFkZFJhbmdlKHJpZ2h0LCBmcm9tLCB0bylcbiAgICAgICAgICAgICAgICA6ICh0YXJnZXQuciA9IHsgZnJvbTogZnJvbSwgdG86IHRvLCBkOiAxLCBsOiBudWxsLCByOiBudWxsIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlYmFsYW5jZSh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjbXAoZnJvbSwgdGFyZ2V0LmZyb20pIDwgMCkge1xuICAgICAgICAgICAgdGFyZ2V0LmZyb20gPSBmcm9tO1xuICAgICAgICAgICAgdGFyZ2V0LmwgPSBudWxsO1xuICAgICAgICAgICAgdGFyZ2V0LmQgPSByaWdodCA/IHJpZ2h0LmQgKyAxIDogMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY21wKHRvLCB0YXJnZXQudG8pID4gMCkge1xuICAgICAgICAgICAgdGFyZ2V0LnRvID0gdG87XG4gICAgICAgICAgICB0YXJnZXQuciA9IG51bGw7XG4gICAgICAgICAgICB0YXJnZXQuZCA9IHRhcmdldC5sID8gdGFyZ2V0LmwuZCArIDEgOiAxO1xuICAgICAgICB9XG4gICAgICAgIHZhciByaWdodFdhc0N1dE9mZiA9ICF0YXJnZXQucjtcbiAgICAgICAgaWYgKGxlZnQgJiYgIXRhcmdldC5sKSB7XG4gICAgICAgICAgICBtZXJnZVJhbmdlcyh0YXJnZXQsIGxlZnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyaWdodCAmJiByaWdodFdhc0N1dE9mZikge1xuICAgICAgICAgICAgbWVyZ2VSYW5nZXModGFyZ2V0LCByaWdodCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gbWVyZ2VSYW5nZXModGFyZ2V0LCBuZXdTZXQpIHtcbiAgICAgICAgZnVuY3Rpb24gX2FkZFJhbmdlU2V0KHRhcmdldCwgX2EpIHtcbiAgICAgICAgICAgIHZhciBmcm9tID0gX2EuZnJvbSwgdG8gPSBfYS50bywgbCA9IF9hLmwsIHIgPSBfYS5yO1xuICAgICAgICAgICAgYWRkUmFuZ2UodGFyZ2V0LCBmcm9tLCB0byk7XG4gICAgICAgICAgICBpZiAobClcbiAgICAgICAgICAgICAgICBfYWRkUmFuZ2VTZXQodGFyZ2V0LCBsKTtcbiAgICAgICAgICAgIGlmIChyKVxuICAgICAgICAgICAgICAgIF9hZGRSYW5nZVNldCh0YXJnZXQsIHIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNFbXB0eVJhbmdlKG5ld1NldCkpXG4gICAgICAgICAgICBfYWRkUmFuZ2VTZXQodGFyZ2V0LCBuZXdTZXQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByYW5nZXNPdmVybGFwKHJhbmdlU2V0MSwgcmFuZ2VTZXQyKSB7XG4gICAgICAgIHZhciBpMSA9IGdldFJhbmdlU2V0SXRlcmF0b3IocmFuZ2VTZXQyKTtcbiAgICAgICAgdmFyIG5leHRSZXN1bHQxID0gaTEubmV4dCgpO1xuICAgICAgICBpZiAobmV4dFJlc3VsdDEuZG9uZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIGEgPSBuZXh0UmVzdWx0MS52YWx1ZTtcbiAgICAgICAgdmFyIGkyID0gZ2V0UmFuZ2VTZXRJdGVyYXRvcihyYW5nZVNldDEpO1xuICAgICAgICB2YXIgbmV4dFJlc3VsdDIgPSBpMi5uZXh0KGEuZnJvbSk7XG4gICAgICAgIHZhciBiID0gbmV4dFJlc3VsdDIudmFsdWU7XG4gICAgICAgIHdoaWxlICghbmV4dFJlc3VsdDEuZG9uZSAmJiAhbmV4dFJlc3VsdDIuZG9uZSkge1xuICAgICAgICAgICAgaWYgKGNtcChiLmZyb20sIGEudG8pIDw9IDAgJiYgY21wKGIudG8sIGEuZnJvbSkgPj0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGNtcChhLmZyb20sIGIuZnJvbSkgPCAwXG4gICAgICAgICAgICAgICAgPyAoYSA9IChuZXh0UmVzdWx0MSA9IGkxLm5leHQoYi5mcm9tKSkudmFsdWUpXG4gICAgICAgICAgICAgICAgOiAoYiA9IChuZXh0UmVzdWx0MiA9IGkyLm5leHQoYS5mcm9tKSkudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0UmFuZ2VTZXRJdGVyYXRvcihub2RlKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IGlzRW1wdHlSYW5nZShub2RlKSA/IG51bGwgOiB7IHM6IDAsIG46IG5vZGUgfTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5UHJvdmlkZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChzdGF0ZS5zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUucyA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleVByb3ZpZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChzdGF0ZS5uLmwgJiYgY21wKGtleSwgc3RhdGUubi5mcm9tKSA8IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IHsgdXA6IHN0YXRlLCBuOiBzdGF0ZS5uLmwsIHM6IDEgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChzdGF0ZS5uLmwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IHsgdXA6IHN0YXRlLCBuOiBzdGF0ZS5uLmwsIHM6IDEgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUucyA9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFrZXlQcm92aWRlZCB8fCBjbXAoa2V5LCBzdGF0ZS5uLnRvKSA8PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogc3RhdGUubiwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUubi5yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnMgPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IHsgdXA6IHN0YXRlLCBuOiBzdGF0ZS5uLnIsIHM6IDAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gc3RhdGUudXA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmViYWxhbmNlKHRhcmdldCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICB2YXIgZGlmZiA9ICgoKF9hID0gdGFyZ2V0LnIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kKSB8fCAwKSAtICgoKF9iID0gdGFyZ2V0LmwpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5kKSB8fCAwKTtcbiAgICAgICAgdmFyIHIgPSBkaWZmID4gMSA/IFwiclwiIDogZGlmZiA8IC0xID8gXCJsXCIgOiBcIlwiO1xuICAgICAgICBpZiAocikge1xuICAgICAgICAgICAgdmFyIGwgPSByID09PSBcInJcIiA/IFwibFwiIDogXCJyXCI7XG4gICAgICAgICAgICB2YXIgcm9vdENsb25lID0gX19hc3NpZ24oe30sIHRhcmdldCk7XG4gICAgICAgICAgICB2YXIgb2xkUm9vdFJpZ2h0ID0gdGFyZ2V0W3JdO1xuICAgICAgICAgICAgdGFyZ2V0LmZyb20gPSBvbGRSb290UmlnaHQuZnJvbTtcbiAgICAgICAgICAgIHRhcmdldC50byA9IG9sZFJvb3RSaWdodC50bztcbiAgICAgICAgICAgIHRhcmdldFtyXSA9IG9sZFJvb3RSaWdodFtyXTtcbiAgICAgICAgICAgIHJvb3RDbG9uZVtyXSA9IG9sZFJvb3RSaWdodFtsXTtcbiAgICAgICAgICAgIHRhcmdldFtsXSA9IHJvb3RDbG9uZTtcbiAgICAgICAgICAgIHJvb3RDbG9uZS5kID0gY29tcHV0ZURlcHRoKHJvb3RDbG9uZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0LmQgPSBjb21wdXRlRGVwdGgodGFyZ2V0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29tcHV0ZURlcHRoKF9hKSB7XG4gICAgICAgIHZhciByID0gX2EuciwgbCA9IF9hLmw7XG4gICAgICAgIHJldHVybiAociA/IChsID8gTWF0aC5tYXgoci5kLCBsLmQpIDogci5kKSA6IGwgPyBsLmQgOiAwKSArIDE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0ZW5kT2JzZXJ2YWJpbGl0eVNldCh0YXJnZXQsIG5ld1NldCkge1xuICAgICAgICBrZXlzKG5ld1NldCkuZm9yRWFjaChmdW5jdGlvbiAocGFydCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldFtwYXJ0XSlcbiAgICAgICAgICAgICAgICBtZXJnZVJhbmdlcyh0YXJnZXRbcGFydF0sIG5ld1NldFtwYXJ0XSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGFyZ2V0W3BhcnRdID0gY2xvbmVTaW1wbGVPYmplY3RUcmVlKG5ld1NldFtwYXJ0XSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9ic1NldHNPdmVybGFwKG9zMSwgb3MyKSB7XG4gICAgICAgIHJldHVybiBvczEuYWxsIHx8IG9zMi5hbGwgfHwgT2JqZWN0LmtleXMob3MxKS5zb21lKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIG9zMltrZXldICYmIHJhbmdlc092ZXJsYXAob3MyW2tleV0sIG9zMVtrZXldKTsgfSk7XG4gICAgfVxuXG4gICAgdmFyIGNhY2hlID0ge307XG5cbiAgICB2YXIgdW5zaWduYWxlZFBhcnRzID0ge307XG4gICAgdmFyIGlzVGFza0VucXVldWVkID0gZmFsc2U7XG4gICAgZnVuY3Rpb24gc2lnbmFsU3Vic2NyaWJlcnNMYXppbHkocGFydCwgb3B0aW1pc3RpYykge1xuICAgICAgICBleHRlbmRPYnNlcnZhYmlsaXR5U2V0KHVuc2lnbmFsZWRQYXJ0cywgcGFydCk7XG4gICAgICAgIGlmICghaXNUYXNrRW5xdWV1ZWQpIHtcbiAgICAgICAgICAgIGlzVGFza0VucXVldWVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlzVGFza0VucXVldWVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gdW5zaWduYWxlZFBhcnRzO1xuICAgICAgICAgICAgICAgIHVuc2lnbmFsZWRQYXJ0cyA9IHt9O1xuICAgICAgICAgICAgICAgIHNpZ25hbFN1YnNjcmliZXJzTm93KHBhcnRzLCBmYWxzZSk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzaWduYWxTdWJzY3JpYmVyc05vdyh1cGRhdGVkUGFydHMsIGRlbGV0ZUFmZmVjdGVkQ2FjaGVFbnRyaWVzKSB7XG4gICAgICAgIGlmIChkZWxldGVBZmZlY3RlZENhY2hlRW50cmllcyA9PT0gdm9pZCAwKSB7IGRlbGV0ZUFmZmVjdGVkQ2FjaGVFbnRyaWVzID0gZmFsc2U7IH1cbiAgICAgICAgdmFyIHF1ZXJpZXNUb1NpZ25hbCA9IG5ldyBTZXQoKTtcbiAgICAgICAgaWYgKHVwZGF0ZWRQYXJ0cy5hbGwpIHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBPYmplY3QudmFsdWVzKGNhY2hlKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdGJsQ2FjaGUgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgY29sbGVjdFRhYmxlU3Vic2NyaWJlcnModGJsQ2FjaGUsIHVwZGF0ZWRQYXJ0cywgcXVlcmllc1RvU2lnbmFsLCBkZWxldGVBZmZlY3RlZENhY2hlRW50cmllcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdXBkYXRlZFBhcnRzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gL15pZGJcXDpcXC9cXC8oLiopXFwvKC4qKVxcLy8uZXhlYyhrZXkpO1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0cykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGJOYW1lID0gcGFydHNbMV0sIHRhYmxlTmFtZSA9IHBhcnRzWzJdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGJsQ2FjaGUgPSBjYWNoZVtcImlkYjovL1wiLmNvbmNhdChkYk5hbWUsIFwiL1wiKS5jb25jYXQodGFibGVOYW1lKV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YmxDYWNoZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3RUYWJsZVN1YnNjcmliZXJzKHRibENhY2hlLCB1cGRhdGVkUGFydHMsIHF1ZXJpZXNUb1NpZ25hbCwgZGVsZXRlQWZmZWN0ZWRDYWNoZUVudHJpZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWVyaWVzVG9TaWduYWwuZm9yRWFjaChmdW5jdGlvbiAocmVxdWVyeSkgeyByZXR1cm4gcmVxdWVyeSgpOyB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29sbGVjdFRhYmxlU3Vic2NyaWJlcnModGJsQ2FjaGUsIHVwZGF0ZWRQYXJ0cywgb3V0UXVlcmllc1RvU2lnbmFsLCBkZWxldGVBZmZlY3RlZENhY2hlRW50cmllcykge1xuICAgICAgICB2YXIgdXBkYXRlZEVudHJ5TGlzdHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IE9iamVjdC5lbnRyaWVzKHRibENhY2hlLnF1ZXJpZXMucXVlcnkpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIF9iID0gX2FbX2ldLCBpbmRleE5hbWUgPSBfYlswXSwgZW50cmllcyA9IF9iWzFdO1xuICAgICAgICAgICAgdmFyIGZpbHRlcmVkRW50cmllcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2MgPSAwLCBlbnRyaWVzXzEgPSBlbnRyaWVzOyBfYyA8IGVudHJpZXNfMS5sZW5ndGg7IF9jKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZW50cnkgPSBlbnRyaWVzXzFbX2NdO1xuICAgICAgICAgICAgICAgIGlmIChvYnNTZXRzT3ZlcmxhcCh1cGRhdGVkUGFydHMsIGVudHJ5Lm9ic1NldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkuc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAocmVxdWVyeSkgeyByZXR1cm4gb3V0UXVlcmllc1RvU2lnbmFsLmFkZChyZXF1ZXJ5KTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRlbGV0ZUFmZmVjdGVkQ2FjaGVFbnRyaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkRW50cmllcy5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVsZXRlQWZmZWN0ZWRDYWNoZUVudHJpZXMpXG4gICAgICAgICAgICAgICAgdXBkYXRlZEVudHJ5TGlzdHMucHVzaChbaW5kZXhOYW1lLCBmaWx0ZXJlZEVudHJpZXNdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVsZXRlQWZmZWN0ZWRDYWNoZUVudHJpZXMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIF9kID0gMCwgdXBkYXRlZEVudHJ5TGlzdHNfMSA9IHVwZGF0ZWRFbnRyeUxpc3RzOyBfZCA8IHVwZGF0ZWRFbnRyeUxpc3RzXzEubGVuZ3RoOyBfZCsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9lID0gdXBkYXRlZEVudHJ5TGlzdHNfMVtfZF0sIGluZGV4TmFtZSA9IF9lWzBdLCBmaWx0ZXJlZEVudHJpZXMgPSBfZVsxXTtcbiAgICAgICAgICAgICAgICB0YmxDYWNoZS5xdWVyaWVzLnF1ZXJ5W2luZGV4TmFtZV0gPSBmaWx0ZXJlZEVudHJpZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXhpZU9wZW4oZGIpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gZGIuX3N0YXRlO1xuICAgICAgICB2YXIgaW5kZXhlZERCID0gZGIuX2RlcHMuaW5kZXhlZERCO1xuICAgICAgICBpZiAoc3RhdGUuaXNCZWluZ09wZW5lZCB8fCBkYi5pZGJkYilcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5kYlJlYWR5UHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN0YXRlLmRiT3BlbkVycm9yID9cbiAgICAgICAgICAgICAgICByZWplY3Rpb24oc3RhdGUuZGJPcGVuRXJyb3IpIDpcbiAgICAgICAgICAgICAgICBkYjsgfSk7XG4gICAgICAgIHN0YXRlLmlzQmVpbmdPcGVuZWQgPSB0cnVlO1xuICAgICAgICBzdGF0ZS5kYk9wZW5FcnJvciA9IG51bGw7XG4gICAgICAgIHN0YXRlLm9wZW5Db21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICB2YXIgb3BlbkNhbmNlbGxlciA9IHN0YXRlLm9wZW5DYW5jZWxsZXI7XG4gICAgICAgIHZhciBuYXRpdmVWZXJUb09wZW4gPSBNYXRoLnJvdW5kKGRiLnZlcm5vICogMTApO1xuICAgICAgICB2YXIgc2NoZW1hUGF0Y2hNb2RlID0gZmFsc2U7XG4gICAgICAgIGZ1bmN0aW9uIHRocm93SWZDYW5jZWxsZWQoKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUub3BlbkNhbmNlbGxlciAhPT0gb3BlbkNhbmNlbGxlcilcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5EYXRhYmFzZUNsb3NlZCgnZGIub3BlbigpIHdhcyBjYW5jZWxsZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzb2x2ZURiUmVhZHkgPSBzdGF0ZS5kYlJlYWR5UmVzb2x2ZSxcbiAgICAgICAgdXBncmFkZVRyYW5zYWN0aW9uID0gbnVsbCwgd2FzQ3JlYXRlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgdHJ5T3BlbkRCID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IERleGllUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB0aHJvd0lmQ2FuY2VsbGVkKCk7XG4gICAgICAgICAgICBpZiAoIWluZGV4ZWREQilcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5NaXNzaW5nQVBJKCk7XG4gICAgICAgICAgICB2YXIgZGJOYW1lID0gZGIubmFtZTtcbiAgICAgICAgICAgIHZhciByZXEgPSBzdGF0ZS5hdXRvU2NoZW1hIHx8ICFuYXRpdmVWZXJUb09wZW4gP1xuICAgICAgICAgICAgICAgIGluZGV4ZWREQi5vcGVuKGRiTmFtZSkgOlxuICAgICAgICAgICAgICAgIGluZGV4ZWREQi5vcGVuKGRiTmFtZSwgbmF0aXZlVmVyVG9PcGVuKTtcbiAgICAgICAgICAgIGlmICghcmVxKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLk1pc3NpbmdBUEkoKTtcbiAgICAgICAgICAgIHJlcS5vbmVycm9yID0gZXZlbnRSZWplY3RIYW5kbGVyKHJlamVjdCk7XG4gICAgICAgICAgICByZXEub25ibG9ja2VkID0gd3JhcChkYi5fZmlyZU9uQmxvY2tlZCk7XG4gICAgICAgICAgICByZXEub251cGdyYWRlbmVlZGVkID0gd3JhcChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHVwZ3JhZGVUcmFuc2FjdGlvbiA9IHJlcS50cmFuc2FjdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuYXV0b1NjaGVtYSAmJiAhZGIuX29wdGlvbnMuYWxsb3dFbXB0eURCKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcS5vbmVycm9yID0gcHJldmVudERlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHVwZ3JhZGVUcmFuc2FjdGlvbi5hYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICByZXEucmVzdWx0LmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWxyZXEgPSBpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UoZGJOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgZGVscmVxLm9uc3VjY2VzcyA9IGRlbHJlcS5vbmVycm9yID0gd3JhcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IGV4Y2VwdGlvbnMuTm9TdWNoRGF0YWJhc2UoXCJEYXRhYmFzZSBcIi5jb25jYXQoZGJOYW1lLCBcIiBkb2VzbnQgZXhpc3RcIikpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1cGdyYWRlVHJhbnNhY3Rpb24ub25lcnJvciA9IGV2ZW50UmVqZWN0SGFuZGxlcihyZWplY3QpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2xkVmVyID0gZS5vbGRWZXJzaW9uID4gTWF0aC5wb3coMiwgNjIpID8gMCA6IGUub2xkVmVyc2lvbjtcbiAgICAgICAgICAgICAgICAgICAgd2FzQ3JlYXRlZCA9IG9sZFZlciA8IDE7XG4gICAgICAgICAgICAgICAgICAgIGRiLmlkYmRiID0gcmVxLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjaGVtYVBhdGNoTW9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2hDdXJyZW50VmVyc2lvbihkYiwgdXBncmFkZVRyYW5zYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBydW5VcGdyYWRlcnMoZGIsIG9sZFZlciAvIDEwLCB1cGdyYWRlVHJhbnNhY3Rpb24sIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgICAgICAgIHJlcS5vbnN1Y2Nlc3MgPSB3cmFwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB1cGdyYWRlVHJhbnNhY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIHZhciBpZGJkYiA9IGRiLmlkYmRiID0gcmVxLnJlc3VsdDtcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0U3RvcmVOYW1lcyA9IHNsaWNlKGlkYmRiLm9iamVjdFN0b3JlTmFtZXMpO1xuICAgICAgICAgICAgICAgIGlmIChvYmplY3RTdG9yZU5hbWVzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG1wVHJhbnMgPSBpZGJkYi50cmFuc2FjdGlvbihzYWZhcmlNdWx0aVN0b3JlRml4KG9iamVjdFN0b3JlTmFtZXMpLCAncmVhZG9ubHknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5hdXRvU2NoZW1hKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRHbG9iYWxTY2hlbWEoZGIsIGlkYmRiLCB0bXBUcmFucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGp1c3RUb0V4aXN0aW5nSW5kZXhOYW1lcyhkYiwgZGIuX2RiU2NoZW1hLCB0bXBUcmFucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2ZXJpZnlJbnN0YWxsZWRTY2hlbWEoZGIsIHRtcFRyYW5zKSAmJiAhc2NoZW1hUGF0Y2hNb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkRleGllIFNjaGVtYURpZmY6IFNjaGVtYSB3YXMgZXh0ZW5kZWQgd2l0aG91dCBpbmNyZWFzaW5nIHRoZSBudW1iZXIgcGFzc2VkIHRvIGRiLnZlcnNpb24oKS4gRGV4aWUgd2lsbCBhZGQgbWlzc2luZyBwYXJ0cyBhbmQgaW5jcmVtZW50IG5hdGl2ZSB2ZXJzaW9uIG51bWJlciB0byB3b3JrYXJvdW5kIHRoaXMuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZGJkYi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVWZXJUb09wZW4gPSBpZGJkYi52ZXJzaW9uICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZW1hUGF0Y2hNb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodHJ5T3BlbkRCKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlTWlkZGxld2FyZVN0YWNrcyhkYiwgdG1wVHJhbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25uZWN0aW9ucy5wdXNoKGRiKTtcbiAgICAgICAgICAgICAgICBpZGJkYi5vbnZlcnNpb25jaGFuZ2UgPSB3cmFwKGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS52Y0ZpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZGIub24oXCJ2ZXJzaW9uY2hhbmdlXCIpLmZpcmUoZXYpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlkYmRiLm9uY2xvc2UgPSB3cmFwKGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgICAgICBkYi5vbihcImNsb3NlXCIpLmZpcmUoZXYpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICh3YXNDcmVhdGVkKVxuICAgICAgICAgICAgICAgICAgICBfb25EYXRhYmFzZUNyZWF0ZWQoZGIuX2RlcHMsIGRiTmFtZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgc3dpdGNoIChlcnIgPT09IG51bGwgfHwgZXJyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlcnIubmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJVbmtub3duRXJyb3JcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLlBSMTM5OF9tYXhMb29wID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuUFIxMzk4X21heExvb3AtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignRGV4aWU6IFdvcmthcm91bmQgZm9yIENocm9tZSBVbmtub3duRXJyb3Igb24gb3BlbigpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ5T3BlbkRCKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIlZlcnNpb25FcnJvclwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAobmF0aXZlVmVyVG9PcGVuID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlVmVyVG9PcGVuID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnlPcGVuREIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBEZXhpZVByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgIH0pOyB9O1xuICAgICAgICByZXR1cm4gRGV4aWVQcm9taXNlLnJhY2UoW1xuICAgICAgICAgICAgb3BlbkNhbmNlbGxlcixcbiAgICAgICAgICAgICh0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyA/IERleGllUHJvbWlzZS5yZXNvbHZlKCkgOiBpZGJSZWFkeSgpKS50aGVuKHRyeU9wZW5EQilcbiAgICAgICAgXSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aHJvd0lmQ2FuY2VsbGVkKCk7XG4gICAgICAgICAgICBzdGF0ZS5vblJlYWR5QmVpbmdGaXJlZCA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuIERleGllUHJvbWlzZS5yZXNvbHZlKHZpcChmdW5jdGlvbiAoKSB7IHJldHVybiBkYi5vbi5yZWFkeS5maXJlKGRiLnZpcCk7IH0pKS50aGVuKGZ1bmN0aW9uIGZpcmVSZW1haW5kZXJzKCkge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5vblJlYWR5QmVpbmdGaXJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZW1haW5kZXJzXzEgPSBzdGF0ZS5vblJlYWR5QmVpbmdGaXJlZC5yZWR1Y2UocHJvbWlzYWJsZUNoYWluLCBub3ApO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5vblJlYWR5QmVpbmdGaXJlZCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRGV4aWVQcm9taXNlLnJlc29sdmUodmlwKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlbWFpbmRlcnNfMShkYi52aXApOyB9KSkudGhlbihmaXJlUmVtYWluZGVycyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHN0YXRlLm9wZW5DYW5jZWxsZXIgPT09IG9wZW5DYW5jZWxsZXIpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZS5vblJlYWR5QmVpbmdGaXJlZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgc3RhdGUuaXNCZWluZ09wZW5lZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBzdGF0ZS5kYk9wZW5FcnJvciA9IGVycjtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdXBncmFkZVRyYW5zYWN0aW9uICYmIHVwZ3JhZGVUcmFuc2FjdGlvbi5hYm9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKF9hKSB7IH1cbiAgICAgICAgICAgIGlmIChvcGVuQ2FuY2VsbGVyID09PSBzdGF0ZS5vcGVuQ2FuY2VsbGVyKSB7XG4gICAgICAgICAgICAgICAgZGIuX2Nsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uKGVycik7XG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RhdGUub3BlbkNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlc29sdmVEYlJlYWR5KCk7XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHdhc0NyZWF0ZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXZlcnl0aGluZ18xID0ge307XG4gICAgICAgICAgICAgICAgZGIudGFibGVzLmZvckVhY2goZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlLnNjaGVtYS5pbmRleGVzLmZvckVhY2goZnVuY3Rpb24gKGlkeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeC5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZXJ5dGhpbmdfMVtcImlkYjovL1wiLmNvbmNhdChkYi5uYW1lLCBcIi9cIikuY29uY2F0KHRhYmxlLm5hbWUsIFwiL1wiKS5jb25jYXQoaWR4Lm5hbWUpXSA9IG5ldyBSYW5nZVNldCgtSW5maW5pdHksIFtbW11dXSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBldmVyeXRoaW5nXzFbXCJpZGI6Ly9cIi5jb25jYXQoZGIubmFtZSwgXCIvXCIpLmNvbmNhdCh0YWJsZS5uYW1lLCBcIi9cIildID0gZXZlcnl0aGluZ18xW1wiaWRiOi8vXCIuY29uY2F0KGRiLm5hbWUsIFwiL1wiKS5jb25jYXQodGFibGUubmFtZSwgXCIvOmRlbHNcIildID0gbmV3IFJhbmdlU2V0KC1JbmZpbml0eSwgW1tbXV1dKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBnbG9iYWxFdmVudHMoREVYSUVfU1RPUkFHRV9NVVRBVEVEX0VWRU5UX05BTUUpLmZpcmUoZXZlcnl0aGluZ18xKTtcbiAgICAgICAgICAgICAgICBzaWduYWxTdWJzY3JpYmVyc05vdyhldmVyeXRoaW5nXzEsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRiO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhd2FpdEl0ZXJhdG9yKGl0ZXJhdG9yKSB7XG4gICAgICAgIHZhciBjYWxsTmV4dCA9IGZ1bmN0aW9uIChyZXN1bHQpIHsgcmV0dXJuIGl0ZXJhdG9yLm5leHQocmVzdWx0KTsgfSwgZG9UaHJvdyA9IGZ1bmN0aW9uIChlcnJvcikgeyByZXR1cm4gaXRlcmF0b3IudGhyb3coZXJyb3IpOyB9LCBvblN1Y2Nlc3MgPSBzdGVwKGNhbGxOZXh0KSwgb25FcnJvciA9IHN0ZXAoZG9UaHJvdyk7XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAoZ2V0TmV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IGdldE5leHQodmFsKSwgdmFsdWUgPSBuZXh0LnZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0LmRvbmUgPyB2YWx1ZSA6XG4gICAgICAgICAgICAgICAgICAgICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlLnRoZW4gIT09ICdmdW5jdGlvbicgP1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNBcnJheSh2YWx1ZSkgPyBQcm9taXNlLmFsbCh2YWx1ZSkudGhlbihvblN1Y2Nlc3MsIG9uRXJyb3IpIDogb25TdWNjZXNzKHZhbHVlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS50aGVuKG9uU3VjY2Vzcywgb25FcnJvcikpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RlcChjYWxsTmV4dCkoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRyYWN0VHJhbnNhY3Rpb25BcmdzKG1vZGUsIF90YWJsZUFyZ3NfLCBzY29wZUZ1bmMpIHtcbiAgICAgICAgdmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICBpZiAoaSA8IDIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5JbnZhbGlkQXJndW1lbnQoXCJUb28gZmV3IGFyZ3VtZW50c1wiKTtcbiAgICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoaSAtIDEpO1xuICAgICAgICB3aGlsZSAoLS1pKVxuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIHNjb3BlRnVuYyA9IGFyZ3MucG9wKCk7XG4gICAgICAgIHZhciB0YWJsZXMgPSBmbGF0dGVuKGFyZ3MpO1xuICAgICAgICByZXR1cm4gW21vZGUsIHRhYmxlcywgc2NvcGVGdW5jXTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZW50ZXJUcmFuc2FjdGlvblNjb3BlKGRiLCBtb2RlLCBzdG9yZU5hbWVzLCBwYXJlbnRUcmFuc2FjdGlvbiwgc2NvcGVGdW5jKSB7XG4gICAgICAgIHJldHVybiBEZXhpZVByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHRyYW5zbGVzcyA9IFBTRC50cmFuc2xlc3MgfHwgUFNEO1xuICAgICAgICAgICAgdmFyIHRyYW5zID0gZGIuX2NyZWF0ZVRyYW5zYWN0aW9uKG1vZGUsIHN0b3JlTmFtZXMsIGRiLl9kYlNjaGVtYSwgcGFyZW50VHJhbnNhY3Rpb24pO1xuICAgICAgICAgICAgdHJhbnMuZXhwbGljaXQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHpvbmVQcm9wcyA9IHtcbiAgICAgICAgICAgICAgICB0cmFuczogdHJhbnMsXG4gICAgICAgICAgICAgICAgdHJhbnNsZXNzOiB0cmFuc2xlc3NcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAocGFyZW50VHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB0cmFucy5pZGJ0cmFucyA9IHBhcmVudFRyYW5zYWN0aW9uLmlkYnRyYW5zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnMuY3JlYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zLmlkYnRyYW5zLl9leHBsaWNpdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGRiLl9zdGF0ZS5QUjEzOThfbWF4TG9vcCA9IDM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXgubmFtZSA9PT0gZXJybmFtZXMuSW52YWxpZFN0YXRlICYmIGRiLmlzT3BlbigpICYmIC0tZGIuX3N0YXRlLlBSMTM5OF9tYXhMb29wID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdEZXhpZTogTmVlZCB0byByZW9wZW4gZGInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRiLmNsb3NlKHsgZGlzYWJsZUF1dG9PcGVuOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYi5vcGVuKCkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBlbnRlclRyYW5zYWN0aW9uU2NvcGUoZGIsIG1vZGUsIHN0b3JlTmFtZXMsIG51bGwsIHNjb3BlRnVuYyk7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3Rpb24oZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzY29wZUZ1bmNJc0FzeW5jID0gaXNBc3luY0Z1bmN0aW9uKHNjb3BlRnVuYyk7XG4gICAgICAgICAgICBpZiAoc2NvcGVGdW5jSXNBc3luYykge1xuICAgICAgICAgICAgICAgIGluY3JlbWVudEV4cGVjdGVkQXdhaXRzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmV0dXJuVmFsdWU7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZUZvbGxvd2VkID0gRGV4aWVQcm9taXNlLmZvbGxvdyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBzY29wZUZ1bmMuY2FsbCh0cmFucywgdHJhbnMpO1xuICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2NvcGVGdW5jSXNBc3luYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlY3JlbWVudG9yID0gZGVjcmVtZW50RXhwZWN0ZWRBd2FpdHMuYmluZChudWxsLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlLnRoZW4oZGVjcmVtZW50b3IsIGRlY3JlbWVudG9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgcmV0dXJuVmFsdWUubmV4dCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgcmV0dXJuVmFsdWUudGhyb3cgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gYXdhaXRJdGVyYXRvcihyZXR1cm5WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB6b25lUHJvcHMpO1xuICAgICAgICAgICAgcmV0dXJuIChyZXR1cm5WYWx1ZSAmJiB0eXBlb2YgcmV0dXJuVmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgICAgICAgRGV4aWVQcm9taXNlLnJlc29sdmUocmV0dXJuVmFsdWUpLnRoZW4oZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHRyYW5zLmFjdGl2ZSA/XG4gICAgICAgICAgICAgICAgICAgIHhcbiAgICAgICAgICAgICAgICAgICAgOiByZWplY3Rpb24obmV3IGV4Y2VwdGlvbnMuUHJlbWF0dXJlQ29tbWl0KFwiVHJhbnNhY3Rpb24gY29tbWl0dGVkIHRvbyBlYXJseS4gU2VlIGh0dHA6Ly9iaXQubHkvMmtkY2tNblwiKSk7IH0pXG4gICAgICAgICAgICAgICAgOiBwcm9taXNlRm9sbG93ZWQudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiByZXR1cm5WYWx1ZTsgfSkpLnRoZW4oZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50VHJhbnNhY3Rpb24pXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zLl9yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zLl9jb21wbGV0aW9uLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4geDsgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHRyYW5zLl9yZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdGlvbihlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYWQoYSwgdmFsdWUsIGNvdW50KSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBpc0FycmF5KGEpID8gYS5zbGljZSgpIDogW2FdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyArK2kpXG4gICAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZVZpcnR1YWxJbmRleE1pZGRsZXdhcmUoZG93bikge1xuICAgICAgICByZXR1cm4gX19hc3NpZ24oX19hc3NpZ24oe30sIGRvd24pLCB7IHRhYmxlOiBmdW5jdGlvbiAodGFibGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhYmxlID0gZG93bi50YWJsZSh0YWJsZU5hbWUpO1xuICAgICAgICAgICAgICAgIHZhciBzY2hlbWEgPSB0YWJsZS5zY2hlbWE7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4TG9va3VwID0ge307XG4gICAgICAgICAgICAgICAgdmFyIGFsbFZpcnR1YWxJbmRleGVzID0gW107XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYWRkVmlydHVhbEluZGV4ZXMoa2V5UGF0aCwga2V5VGFpbCwgbG93TGV2ZWxJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIga2V5UGF0aEFsaWFzID0gZ2V0S2V5UGF0aEFsaWFzKGtleVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXhMaXN0ID0gKGluZGV4TG9va3VwW2tleVBhdGhBbGlhc10gPSBpbmRleExvb2t1cFtrZXlQYXRoQWxpYXNdIHx8IFtdKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleUxlbmd0aCA9IGtleVBhdGggPT0gbnVsbCA/IDAgOiB0eXBlb2Yga2V5UGF0aCA9PT0gJ3N0cmluZycgPyAxIDoga2V5UGF0aC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1ZpcnR1YWwgPSBrZXlUYWlsID4gMDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpcnR1YWxJbmRleCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBsb3dMZXZlbEluZGV4KSwgeyBuYW1lOiBpc1ZpcnR1YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiXCIuY29uY2F0KGtleVBhdGhBbGlhcywgXCIodmlydHVhbC1mcm9tOlwiKS5jb25jYXQobG93TGV2ZWxJbmRleC5uYW1lLCBcIilcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGxvd0xldmVsSW5kZXgubmFtZSwgbG93TGV2ZWxJbmRleDogbG93TGV2ZWxJbmRleCwgaXNWaXJ0dWFsOiBpc1ZpcnR1YWwsIGtleVRhaWw6IGtleVRhaWwsIGtleUxlbmd0aDoga2V5TGVuZ3RoLCBleHRyYWN0S2V5OiBnZXRLZXlFeHRyYWN0b3Ioa2V5UGF0aCksIHVuaXF1ZTogIWlzVmlydHVhbCAmJiBsb3dMZXZlbEluZGV4LnVuaXF1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhMaXN0LnB1c2godmlydHVhbEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF2aXJ0dWFsSW5kZXguaXNQcmltYXJ5S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxWaXJ0dWFsSW5kZXhlcy5wdXNoKHZpcnR1YWxJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleUxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aXJ0dWFsS2V5UGF0aCA9IGtleUxlbmd0aCA9PT0gMiA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5UGF0aFswXSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5UGF0aC5zbGljZSgwLCBrZXlMZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFZpcnR1YWxJbmRleGVzKHZpcnR1YWxLZXlQYXRoLCBrZXlUYWlsICsgMSwgbG93TGV2ZWxJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW5kZXhMaXN0LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEua2V5VGFpbCAtIGIua2V5VGFpbDsgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2aXJ0dWFsSW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBwcmltYXJ5S2V5ID0gYWRkVmlydHVhbEluZGV4ZXMoc2NoZW1hLnByaW1hcnlLZXkua2V5UGF0aCwgMCwgc2NoZW1hLnByaW1hcnlLZXkpO1xuICAgICAgICAgICAgICAgIGluZGV4TG9va3VwW1wiOmlkXCJdID0gW3ByaW1hcnlLZXldO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBzY2hlbWEuaW5kZXhlczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgICAgICBhZGRWaXJ0dWFsSW5kZXhlcyhpbmRleC5rZXlQYXRoLCAwLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGZpbmRCZXN0SW5kZXgoa2V5UGF0aCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gaW5kZXhMb29rdXBbZ2V0S2V5UGF0aEFsaWFzKGtleVBhdGgpXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCAmJiByZXN1bHRbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVJhbmdlKHJhbmdlLCBrZXlUYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiByYW5nZS50eXBlID09PSAxICA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMiAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb3dlcjogcGFkKHJhbmdlLmxvd2VyLCByYW5nZS5sb3dlck9wZW4gPyBkb3duLk1BWF9LRVkgOiBkb3duLk1JTl9LRVksIGtleVRhaWwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXJPcGVuOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBwZXI6IHBhZChyYW5nZS51cHBlciwgcmFuZ2UudXBwZXJPcGVuID8gZG93bi5NSU5fS0VZIDogZG93bi5NQVhfS0VZLCBrZXlUYWlsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwcGVyT3BlbjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB0cmFuc2xhdGVSZXF1ZXN0KHJlcSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSByZXEucXVlcnkuaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleC5pc1ZpcnR1YWwgPyBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVxKSwgeyBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleC5sb3dMZXZlbEluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlOiB0cmFuc2xhdGVSYW5nZShyZXEucXVlcnkucmFuZ2UsIGluZGV4LmtleVRhaWwpXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0pIDogcmVxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHRhYmxlKSwgeyBzY2hlbWE6IF9fYXNzaWduKF9fYXNzaWduKHt9LCBzY2hlbWEpLCB7IHByaW1hcnlLZXk6IHByaW1hcnlLZXksIGluZGV4ZXM6IGFsbFZpcnR1YWxJbmRleGVzLCBnZXRJbmRleEJ5S2V5UGF0aDogZmluZEJlc3RJbmRleCB9KSwgY291bnQ6IGZ1bmN0aW9uIChyZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZS5jb3VudCh0cmFuc2xhdGVSZXF1ZXN0KHJlcSkpO1xuICAgICAgICAgICAgICAgICAgICB9LCBxdWVyeTogZnVuY3Rpb24gKHJlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlLnF1ZXJ5KHRyYW5zbGF0ZVJlcXVlc3QocmVxKSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIG9wZW5DdXJzb3I6IGZ1bmN0aW9uIChyZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSA9IHJlcS5xdWVyeS5pbmRleCwga2V5VGFpbCA9IF9hLmtleVRhaWwsIGlzVmlydHVhbCA9IF9hLmlzVmlydHVhbCwga2V5TGVuZ3RoID0gX2Eua2V5TGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1ZpcnR1YWwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlLm9wZW5DdXJzb3IocmVxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVZpcnR1YWxDdXJzb3IoY3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gX2NvbnRpbnVlKGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUocGFkKGtleSwgcmVxLnJldmVyc2UgPyBkb3duLk1BWF9LRVkgOiBkb3duLk1JTl9LRVksIGtleVRhaWwpKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEudW5pcXVlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUoY3Vyc29yLmtleS5zbGljZSgwLCBrZXlMZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb25jYXQocmVxLnJldmVyc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBkb3duLk1JTl9LRVlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkb3duLk1BWF9LRVksIGtleVRhaWwpKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aXJ0dWFsQ3Vyc29yID0gT2JqZWN0LmNyZWF0ZShjdXJzb3IsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU6IHsgdmFsdWU6IF9jb250aW51ZSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZVByaW1hcnlLZXk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoa2V5LCBwcmltYXJ5S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlUHJpbWFyeUtleShwYWQoa2V5LCBkb3duLk1BWF9LRVksIGtleVRhaWwpLCBwcmltYXJ5S2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeUtleToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnNvci5wcmltYXJ5S2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBjdXJzb3Iua2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXlMZW5ndGggPT09IDEgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlbMF0gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkuc2xpY2UoMCwga2V5TGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJzb3IudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmlydHVhbEN1cnNvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZS5vcGVuQ3Vyc29yKHRyYW5zbGF0ZVJlcXVlc3QocmVxKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoY3Vyc29yKSB7IHJldHVybiBjdXJzb3IgJiYgY3JlYXRlVmlydHVhbEN1cnNvcihjdXJzb3IpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSB9KTtcbiAgICB9XG4gICAgdmFyIHZpcnR1YWxJbmRleE1pZGRsZXdhcmUgPSB7XG4gICAgICAgIHN0YWNrOiBcImRiY29yZVwiLFxuICAgICAgICBuYW1lOiBcIlZpcnR1YWxJbmRleE1pZGRsZXdhcmVcIixcbiAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgIGNyZWF0ZTogY3JlYXRlVmlydHVhbEluZGV4TWlkZGxld2FyZVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRPYmplY3REaWZmKGEsIGIsIHJ2LCBwcmZ4KSB7XG4gICAgICAgIHJ2ID0gcnYgfHwge307XG4gICAgICAgIHByZnggPSBwcmZ4IHx8ICcnO1xuICAgICAgICBrZXlzKGEpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgICAgIGlmICghaGFzT3duKGIsIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgcnZbcHJmeCArIHByb3BdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGFwID0gYVtwcm9wXSwgYnAgPSBiW3Byb3BdO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXAgPT09ICdvYmplY3QnICYmIHR5cGVvZiBicCA9PT0gJ29iamVjdCcgJiYgYXAgJiYgYnApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFwVHlwZU5hbWUgPSB0b1N0cmluZ1RhZyhhcCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBicFR5cGVOYW1lID0gdG9TdHJpbmdUYWcoYnApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXBUeXBlTmFtZSAhPT0gYnBUeXBlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcnZbcHJmeCArIHByb3BdID0gYltwcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhcFR5cGVOYW1lID09PSAnT2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0T2JqZWN0RGlmZihhcCwgYnAsIHJ2LCBwcmZ4ICsgcHJvcCArICcuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYXAgIT09IGJwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBydltwcmZ4ICsgcHJvcF0gPSBiW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFwICE9PSBicClcbiAgICAgICAgICAgICAgICAgICAgcnZbcHJmeCArIHByb3BdID0gYltwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGtleXMoYikuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICAgICAgaWYgKCFoYXNPd24oYSwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICBydltwcmZ4ICsgcHJvcF0gPSBiW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJ2O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEVmZmVjdGl2ZUtleXMocHJpbWFyeUtleSwgcmVxKSB7XG4gICAgICAgIGlmIChyZXEudHlwZSA9PT0gJ2RlbGV0ZScpXG4gICAgICAgICAgICByZXR1cm4gcmVxLmtleXM7XG4gICAgICAgIHJldHVybiByZXEua2V5cyB8fCByZXEudmFsdWVzLm1hcChwcmltYXJ5S2V5LmV4dHJhY3RLZXkpO1xuICAgIH1cblxuICAgIHZhciBob29rc01pZGRsZXdhcmUgPSB7XG4gICAgICAgIHN0YWNrOiBcImRiY29yZVwiLFxuICAgICAgICBuYW1lOiBcIkhvb2tzTWlkZGxld2FyZVwiLFxuICAgICAgICBsZXZlbDogMixcbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoZG93bkNvcmUpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZG93bkNvcmUpLCB7IHRhYmxlOiBmdW5jdGlvbiAodGFibGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRvd25UYWJsZSA9IGRvd25Db3JlLnRhYmxlKHRhYmxlTmFtZSk7XG4gICAgICAgICAgICAgICAgdmFyIHByaW1hcnlLZXkgPSBkb3duVGFibGUuc2NoZW1hLnByaW1hcnlLZXk7XG4gICAgICAgICAgICAgICAgdmFyIHRhYmxlTWlkZGxld2FyZSA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBkb3duVGFibGUpLCB7IG11dGF0ZTogZnVuY3Rpb24gKHJlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGR4VHJhbnMgPSBQU0QudHJhbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EgPSBkeFRyYW5zLnRhYmxlKHRhYmxlTmFtZSkuaG9vaywgZGVsZXRpbmcgPSBfYS5kZWxldGluZywgY3JlYXRpbmcgPSBfYS5jcmVhdGluZywgdXBkYXRpbmcgPSBfYS51cGRhdGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocmVxLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhZGQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3JlYXRpbmcuZmlyZSA9PT0gbm9wKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkeFRyYW5zLl9wcm9taXNlKCdyZWFkd3JpdGUnLCBmdW5jdGlvbiAoKSB7IHJldHVybiBhZGRQdXRPckRlbGV0ZShyZXEpOyB9LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwdXQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3JlYXRpbmcuZmlyZSA9PT0gbm9wICYmIHVwZGF0aW5nLmZpcmUgPT09IG5vcClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHhUcmFucy5fcHJvbWlzZSgncmVhZHdyaXRlJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gYWRkUHV0T3JEZWxldGUocmVxKTsgfSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlbGV0aW5nLmZpcmUgPT09IG5vcClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHhUcmFucy5fcHJvbWlzZSgncmVhZHdyaXRlJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gYWRkUHV0T3JEZWxldGUocmVxKTsgfSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGVsZXRlUmFuZ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVsZXRpbmcuZmlyZSA9PT0gbm9wKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkeFRyYW5zLl9wcm9taXNlKCdyZWFkd3JpdGUnLCBmdW5jdGlvbiAoKSB7IHJldHVybiBkZWxldGVSYW5nZShyZXEpOyB9LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb3duVGFibGUubXV0YXRlKHJlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBhZGRQdXRPckRlbGV0ZShyZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHhUcmFucyA9IFBTRC50cmFucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5cyA9IHJlcS5rZXlzIHx8IGdldEVmZmVjdGl2ZUtleXMocHJpbWFyeUtleSwgcmVxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWtleXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIktleXMgbWlzc2luZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEgPSByZXEudHlwZSA9PT0gJ2FkZCcgfHwgcmVxLnR5cGUgPT09ICdwdXQnID8gX19hc3NpZ24oX19hc3NpZ24oe30sIHJlcSksIHsga2V5czoga2V5cyB9KSA6IF9fYXNzaWduKHt9LCByZXEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXEudHlwZSAhPT0gJ2RlbGV0ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcS52YWx1ZXMgPSBfX3NwcmVhZEFycmF5KFtdLCByZXEudmFsdWVzLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxLmtleXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5rZXlzID0gX19zcHJlYWRBcnJheShbXSwgcmVxLmtleXMsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRFeGlzdGluZ1ZhbHVlcyhkb3duVGFibGUsIHJlcSwga2V5cykudGhlbihmdW5jdGlvbiAoZXhpc3RpbmdWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRleHRzID0ga2V5cy5tYXAoZnVuY3Rpb24gKGtleSwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4aXN0aW5nVmFsdWUgPSBleGlzdGluZ1ZhbHVlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdHggPSB7IG9uZXJyb3I6IG51bGwsIG9uc3VjY2VzczogbnVsbCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcS50eXBlID09PSAnZGVsZXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0aW5nLmZpcmUuY2FsbChjdHgsIGtleSwgZXhpc3RpbmdWYWx1ZSwgZHhUcmFucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXEudHlwZSA9PT0gJ2FkZCcgfHwgZXhpc3RpbmdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdlbmVyYXRlZFByaW1hcnlLZXkgPSBjcmVhdGluZy5maXJlLmNhbGwoY3R4LCBrZXksIHJlcS52YWx1ZXNbaV0sIGR4VHJhbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gbnVsbCAmJiBnZW5lcmF0ZWRQcmltYXJ5S2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0gZ2VuZXJhdGVkUHJpbWFyeUtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxLmtleXNbaV0gPSBrZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcHJpbWFyeUtleS5vdXRib3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnlLZXlQYXRoKHJlcS52YWx1ZXNbaV0sIHByaW1hcnlLZXkua2V5UGF0aCwga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmplY3REaWZmID0gZ2V0T2JqZWN0RGlmZihleGlzdGluZ1ZhbHVlLCByZXEudmFsdWVzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWRkaXRpb25hbENoYW5nZXNfMSA9IHVwZGF0aW5nLmZpcmUuY2FsbChjdHgsIG9iamVjdERpZmYsIGtleSwgZXhpc3RpbmdWYWx1ZSwgZHhUcmFucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFkZGl0aW9uYWxDaGFuZ2VzXzEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcXVlc3RlZFZhbHVlXzEgPSByZXEudmFsdWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhhZGRpdGlvbmFsQ2hhbmdlc18xKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXlQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFzT3duKHJlcXVlc3RlZFZhbHVlXzEsIGtleVBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdGVkVmFsdWVfMVtrZXlQYXRoXSA9IGFkZGl0aW9uYWxDaGFuZ2VzXzFba2V5UGF0aF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCeUtleVBhdGgocmVxdWVzdGVkVmFsdWVfMSwga2V5UGF0aCwgYWRkaXRpb25hbENoYW5nZXNfMVtrZXlQYXRoXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG93blRhYmxlLm11dGF0ZShyZXEpLnRoZW4oZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZXMgPSBfYS5mYWlsdXJlcywgcmVzdWx0cyA9IF9hLnJlc3VsdHMsIG51bUZhaWx1cmVzID0gX2EubnVtRmFpbHVyZXMsIGxhc3RSZXN1bHQgPSBfYS5sYXN0UmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByaW1LZXkgPSByZXN1bHRzID8gcmVzdWx0c1tpXSA6IGtleXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN0eCA9IGNvbnRleHRzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmltS2V5ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4Lm9uZXJyb3IgJiYgY3R4Lm9uZXJyb3IoZmFpbHVyZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4Lm9uc3VjY2VzcyAmJiBjdHgub25zdWNjZXNzKHJlcS50eXBlID09PSAncHV0JyAmJiBleGlzdGluZ1ZhbHVlc1tpXSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEudmFsdWVzW2ldIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1LZXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBmYWlsdXJlczogZmFpbHVyZXMsIHJlc3VsdHM6IHJlc3VsdHMsIG51bUZhaWx1cmVzOiBudW1GYWlsdXJlcywgbGFzdFJlc3VsdDogbGFzdFJlc3VsdCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRzLmZvckVhY2goZnVuY3Rpb24gKGN0eCkgeyByZXR1cm4gY3R4Lm9uZXJyb3IgJiYgY3R4Lm9uZXJyb3IoZXJyb3IpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZGVsZXRlUmFuZ2UocmVxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlbGV0ZU5leHRDaHVuayhyZXEudHJhbnMsIHJlcS5yYW5nZSwgMTAwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZGVsZXRlTmV4dENodW5rKHRyYW5zLCByYW5nZSwgbGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG93blRhYmxlLnF1ZXJ5KHsgdHJhbnM6IHRyYW5zLCB2YWx1ZXM6IGZhbHNlLCBxdWVyeTogeyBpbmRleDogcHJpbWFyeUtleSwgcmFuZ2U6IHJhbmdlIH0sIGxpbWl0OiBsaW1pdCB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IF9hLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFkZFB1dE9yRGVsZXRlKHsgdHlwZTogJ2RlbGV0ZScsIGtleXM6IHJlc3VsdCwgdHJhbnM6IHRyYW5zIH0pLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5udW1GYWlsdXJlcyA+IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlcy5mYWlsdXJlc1swXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA8IGxpbWl0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZmFpbHVyZXM6IFtdLCBudW1GYWlsdXJlczogMCwgbGFzdFJlc3VsdDogdW5kZWZpbmVkIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVsZXRlTmV4dENodW5rKHRyYW5zLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmFuZ2UpLCB7IGxvd2VyOiByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdLCBsb3dlck9wZW46IHRydWUgfSksIGxpbWl0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlTWlkZGxld2FyZTtcbiAgICAgICAgICAgIH0gfSkpOyB9XG4gICAgfTtcbiAgICBmdW5jdGlvbiBnZXRFeGlzdGluZ1ZhbHVlcyh0YWJsZSwgcmVxLCBlZmZlY3RpdmVLZXlzKSB7XG4gICAgICAgIHJldHVybiByZXEudHlwZSA9PT0gXCJhZGRcIlxuICAgICAgICAgICAgPyBQcm9taXNlLnJlc29sdmUoW10pXG4gICAgICAgICAgICA6IHRhYmxlLmdldE1hbnkoeyB0cmFuczogcmVxLnRyYW5zLCBrZXlzOiBlZmZlY3RpdmVLZXlzLCBjYWNoZTogXCJpbW11dGFibGVcIiB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGcm9tVHJhbnNhY3Rpb25DYWNoZShrZXlzLCBjYWNoZSwgY2xvbmUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghY2FjaGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZiAoY2FjaGUua2V5cy5sZW5ndGggPCBrZXlzLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gMDsgaSA8IGNhY2hlLmtleXMubGVuZ3RoICYmIGogPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNtcChjYWNoZS5rZXlzW2ldLCBrZXlzW2pdKSAhPT0gMClcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2xvbmUgPyBkZWVwQ2xvbmUoY2FjaGUudmFsdWVzW2ldKSA6IGNhY2hlLnZhbHVlc1tpXSk7XG4gICAgICAgICAgICAgICAgKytqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPT09IGtleXMubGVuZ3RoID8gcmVzdWx0IDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoX2EpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBjYWNoZUV4aXN0aW5nVmFsdWVzTWlkZGxld2FyZSA9IHtcbiAgICAgICAgc3RhY2s6IFwiZGJjb3JlXCIsXG4gICAgICAgIGxldmVsOiAtMSxcbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoY29yZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0YWJsZTogZnVuY3Rpb24gKHRhYmxlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFibGUgPSBjb3JlLnRhYmxlKHRhYmxlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGFibGUpLCB7IGdldE1hbnk6IGZ1bmN0aW9uIChyZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcS5jYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFibGUuZ2V0TWFueShyZXEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FjaGVkUmVzdWx0ID0gZ2V0RnJvbVRyYW5zYWN0aW9uQ2FjaGUocmVxLmtleXMsIHJlcS50cmFuc1tcIl9jYWNoZVwiXSwgcmVxLmNhY2hlID09PSBcImNsb25lXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWNoZWRSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIERleGllUHJvbWlzZS5yZXNvbHZlKGNhY2hlZFJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZS5nZXRNYW55KHJlcSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcS50cmFuc1tcIl9jYWNoZVwiXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IHJlcS5rZXlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiByZXEuY2FjaGUgPT09IFwiY2xvbmVcIiA/IGRlZXBDbG9uZShyZXMpIDogcmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgbXV0YXRlOiBmdW5jdGlvbiAocmVxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcS50eXBlICE9PSBcImFkZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEudHJhbnNbXCJfY2FjaGVcIl0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZS5tdXRhdGUocmVxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGlzQ2FjaGFibGVDb250ZXh0KGN0eCwgdGFibGUpIHtcbiAgICAgICAgcmV0dXJuIChjdHgudHJhbnMubW9kZSA9PT0gJ3JlYWRvbmx5JyAmJlxuICAgICAgICAgICAgISFjdHguc3Vic2NyICYmXG4gICAgICAgICAgICAhY3R4LnRyYW5zLmV4cGxpY2l0ICYmXG4gICAgICAgICAgICBjdHgudHJhbnMuZGIuX29wdGlvbnMuY2FjaGUgIT09ICdkaXNhYmxlZCcgJiZcbiAgICAgICAgICAgICF0YWJsZS5zY2hlbWEucHJpbWFyeUtleS5vdXRib3VuZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNDYWNoYWJsZVJlcXVlc3QodHlwZSwgcmVxKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAncXVlcnknOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXEudmFsdWVzICYmICFyZXEudW5pcXVlO1xuICAgICAgICAgICAgY2FzZSAnZ2V0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBjYXNlICdnZXRNYW55JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBjYXNlICdjb3VudCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgY2FzZSAnb3BlbkN1cnNvcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIG9ic2VydmFiaWxpdHlNaWRkbGV3YXJlID0ge1xuICAgICAgICBzdGFjazogXCJkYmNvcmVcIixcbiAgICAgICAgbGV2ZWw6IDAsXG4gICAgICAgIG5hbWU6IFwiT2JzZXJ2YWJpbGl0eVwiLFxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChjb3JlKSB7XG4gICAgICAgICAgICB2YXIgZGJOYW1lID0gY29yZS5zY2hlbWEubmFtZTtcbiAgICAgICAgICAgIHZhciBGVUxMX1JBTkdFID0gbmV3IFJhbmdlU2V0KGNvcmUuTUlOX0tFWSwgY29yZS5NQVhfS0VZKTtcbiAgICAgICAgICAgIHJldHVybiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgY29yZSksIHsgdHJhbnNhY3Rpb246IGZ1bmN0aW9uIChzdG9yZXMsIG1vZGUsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFBTRC5zdWJzY3IgJiYgbW9kZSAhPT0gJ3JlYWRvbmx5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuUmVhZE9ubHkoXCJSZWFkd3JpdGUgdHJhbnNhY3Rpb24gaW4gbGl2ZVF1ZXJ5IGNvbnRleHQuIFF1ZXJpZXIgc291cmNlOiBcIi5jb25jYXQoUFNELnF1ZXJpZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29yZS50cmFuc2FjdGlvbihzdG9yZXMsIG1vZGUsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0sIHRhYmxlOiBmdW5jdGlvbiAodGFibGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWJsZSA9IGNvcmUudGFibGUodGFibGVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjaGVtYSA9IHRhYmxlLnNjaGVtYTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByaW1hcnlLZXkgPSBzY2hlbWEucHJpbWFyeUtleSwgaW5kZXhlcyA9IHNjaGVtYS5pbmRleGVzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXh0cmFjdEtleSA9IHByaW1hcnlLZXkuZXh0cmFjdEtleSwgb3V0Ym91bmQgPSBwcmltYXJ5S2V5Lm91dGJvdW5kO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXhlc1dpdGhBdXRvSW5jUEsgPSBwcmltYXJ5S2V5LmF1dG9JbmNyZW1lbnQgJiYgaW5kZXhlcy5maWx0ZXIoZnVuY3Rpb24gKGluZGV4KSB7IHJldHVybiBpbmRleC5jb21wb3VuZCAmJiBpbmRleC5rZXlQYXRoLmluY2x1ZGVzKHByaW1hcnlLZXkua2V5UGF0aCk7IH0pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFibGVDbG9uZSA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCB0YWJsZSksIHsgbXV0YXRlOiBmdW5jdGlvbiAocmVxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnMgPSByZXEudHJhbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG11dGF0ZWRQYXJ0cyA9IHJlcS5tdXRhdGVkUGFydHMgfHwgKHJlcS5tdXRhdGVkUGFydHMgPSB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdldFJhbmdlU2V0ID0gZnVuY3Rpb24gKGluZGV4TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFydCA9IFwiaWRiOi8vXCIuY29uY2F0KGRiTmFtZSwgXCIvXCIpLmNvbmNhdCh0YWJsZU5hbWUsIFwiL1wiKS5jb25jYXQoaW5kZXhOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChtdXRhdGVkUGFydHNbcGFydF0gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtdXRhdGVkUGFydHNbcGFydF0gPSBuZXcgUmFuZ2VTZXQoKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBrUmFuZ2VTZXQgPSBnZXRSYW5nZVNldChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVsc1JhbmdlU2V0ID0gZ2V0UmFuZ2VTZXQoXCI6ZGVsc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHJlcS50eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYyA9IHJlcS50eXBlID09PSBcImRlbGV0ZVJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBbcmVxLnJhbmdlXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHJlcS50eXBlID09PSBcImRlbGV0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFtyZXEua2V5c11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcmVxLnZhbHVlcy5sZW5ndGggPCA1MFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gW2dldEVmZmVjdGl2ZUtleXMocHJpbWFyeUtleSwgcmVxKS5maWx0ZXIoZnVuY3Rpb24gKGlkKSB7IHJldHVybiBpZDsgfSksIHJlcS52YWx1ZXNdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbXSwga2V5cyA9IF9jWzBdLCBuZXdPYmpzID0gX2NbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9sZENhY2hlID0gcmVxLnRyYW5zW1wiX2NhY2hlXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KGtleXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBrUmFuZ2VTZXQuYWRkS2V5cyhrZXlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9sZE9ianMgPSB0eXBlID09PSAnZGVsZXRlJyB8fCBrZXlzLmxlbmd0aCA9PT0gbmV3T2Jqcy5sZW5ndGggPyBnZXRGcm9tVHJhbnNhY3Rpb25DYWNoZShrZXlzLCBvbGRDYWNoZSkgOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9sZE9ianMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHNSYW5nZVNldC5hZGRLZXlzKGtleXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbGRPYmpzIHx8IG5ld09ianMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNrQWZmZWN0ZWRJbmRleGVzKGdldFJhbmdlU2V0LCBzY2hlbWEsIG9sZE9ianMsIG5ld09ianMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGtleXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmdlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogKF9hID0ga2V5cy5sb3dlcikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogY29yZS5NSU5fS0VZLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86IChfYiA9IGtleXMudXBwZXIpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IGNvcmUuTUFYX0tFWVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxzUmFuZ2VTZXQuYWRkKHJhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGtSYW5nZVNldC5hZGQocmFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGtSYW5nZVNldC5hZGQoRlVMTF9SQU5HRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHNSYW5nZVNldC5hZGQoRlVMTF9SQU5HRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYS5pbmRleGVzLmZvckVhY2goZnVuY3Rpb24gKGlkeCkgeyByZXR1cm4gZ2V0UmFuZ2VTZXQoaWR4Lm5hbWUpLmFkZChGVUxMX1JBTkdFKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZS5tdXRhdGUocmVxKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleXMgJiYgKHJlcS50eXBlID09PSAnYWRkJyB8fCByZXEudHlwZSA9PT0gJ3B1dCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwa1JhbmdlU2V0LmFkZEtleXMocmVzLnJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ZXNXaXRoQXV0b0luY1BLKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhlc1dpdGhBdXRvSW5jUEsuZm9yRWFjaChmdW5jdGlvbiAoaWR4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZHhWYWxzID0gcmVxLnZhbHVlcy5tYXAoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIGlkeC5leHRyYWN0S2V5KHYpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBrUG9zID0gaWR4LmtleVBhdGguZmluZEluZGV4KGZ1bmN0aW9uIChwcm9wKSB7IHJldHVybiBwcm9wID09PSBwcmltYXJ5S2V5LmtleVBhdGg7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcmVzLnJlc3VsdHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkeFZhbHNbaV1bcGtQb3NdID0gcmVzLnJlc3VsdHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0UmFuZ2VTZXQoaWR4Lm5hbWUpLmFkZEtleXMoaWR4VmFscyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnMubXV0YXRlZFBhcnRzID0gZXh0ZW5kT2JzZXJ2YWJpbGl0eVNldCh0cmFucy5tdXRhdGVkUGFydHMgfHwge30sIG11dGF0ZWRQYXJ0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZ2V0UmFuZ2UgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYiwgX2M7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2QgPSBfYS5xdWVyeSwgaW5kZXggPSBfZC5pbmRleCwgcmFuZ2UgPSBfZC5yYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFJhbmdlU2V0KChfYiA9IHJhbmdlLmxvd2VyKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBjb3JlLk1JTl9LRVksIChfYyA9IHJhbmdlLnVwcGVyKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBjb3JlLk1BWF9LRVkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlYWRTdWJzY3JpYmVycyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKHJlcSkgeyByZXR1cm4gW3ByaW1hcnlLZXksIG5ldyBSYW5nZVNldChyZXEua2V5KV07IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRNYW55OiBmdW5jdGlvbiAocmVxKSB7IHJldHVybiBbcHJpbWFyeUtleSwgbmV3IFJhbmdlU2V0KCkuYWRkS2V5cyhyZXEua2V5cyldOyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6IGdldFJhbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnk6IGdldFJhbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbkN1cnNvcjogZ2V0UmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGtleXMocmVhZFN1YnNjcmliZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlQ2xvbmVbbWV0aG9kXSA9IGZ1bmN0aW9uIChyZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3Vic2NyID0gUFNELnN1YnNjcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNMaXZlUXVlcnkgPSAhIXN1YnNjcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FjaGFibGUgPSBpc0NhY2hhYmxlQ29udGV4dChQU0QsIHRhYmxlKSAmJiBpc0NhY2hhYmxlUmVxdWVzdChtZXRob2QsIHJlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9ic1NldCA9IGNhY2hhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcmVxLm9ic1NldCA9IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogc3Vic2NyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0xpdmVRdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ2V0UmFuZ2VTZXQgPSBmdW5jdGlvbiAoaW5kZXhOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFydCA9IFwiaWRiOi8vXCIuY29uY2F0KGRiTmFtZSwgXCIvXCIpLmNvbmNhdCh0YWJsZU5hbWUsIFwiL1wiKS5jb25jYXQoaW5kZXhOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAob2JzU2V0W3BhcnRdIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9ic1NldFtwYXJ0XSA9IG5ldyBSYW5nZVNldCgpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwa1JhbmdlU2V0XzEgPSBnZXRSYW5nZVNldChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbHNSYW5nZVNldF8xID0gZ2V0UmFuZ2VTZXQoXCI6ZGVsc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hID0gcmVhZFN1YnNjcmliZXJzW21ldGhvZF0ocmVxKSwgcXVlcmllZEluZGV4ID0gX2FbMF0sIHF1ZXJpZWRSYW5nZXMgPSBfYVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ3F1ZXJ5JyAmJiBxdWVyaWVkSW5kZXguaXNQcmltYXJ5S2V5ICYmICFyZXEudmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxzUmFuZ2VTZXRfMS5hZGQocXVlcmllZFJhbmdlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRSYW5nZVNldChxdWVyaWVkSW5kZXgubmFtZSB8fCBcIlwiKS5hZGQocXVlcmllZFJhbmdlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFxdWVyaWVkSW5kZXguaXNQcmltYXJ5S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0aG9kID09PSBcImNvdW50XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxzUmFuZ2VTZXRfMS5hZGQoRlVMTF9SQU5HRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5c1Byb21pc2VfMSA9IG1ldGhvZCA9PT0gXCJxdWVyeVwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGJvdW5kICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcS52YWx1ZXMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUucXVlcnkoX19hc3NpZ24oX19hc3NpZ24oe30sIHJlcSksIHsgdmFsdWVzOiBmYWxzZSB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlW21ldGhvZF0uYXBwbHkodGhpcywgYXJndW1lbnRzKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJxdWVyeVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3V0Ym91bmQgJiYgcmVxLnZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXlzUHJvbWlzZV8xLnRoZW4oZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHRpbmdLZXlzID0gX2EucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwa1JhbmdlU2V0XzEuYWRkS2V5cyhyZXN1bHRpbmdLZXlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwS2V5cyA9IHJlcS52YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHJlcy5yZXN1bHQubWFwKGV4dHJhY3RLZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiByZXMucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcS52YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwa1JhbmdlU2V0XzEuYWRkS2V5cyhwS2V5cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxzUmFuZ2VTZXRfMS5hZGRLZXlzKHBLZXlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChtZXRob2QgPT09IFwib3BlbkN1cnNvclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3Vyc29yXzEgPSByZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2FudFZhbHVlc18xID0gcmVxLnZhbHVlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoY3Vyc29yXzEgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuY3JlYXRlKGN1cnNvcl8xLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsc1JhbmdlU2V0XzEuYWRkS2V5KGN1cnNvcl8xLnByaW1hcnlLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJzb3JfMS5rZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5S2V5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGtleSA9IGN1cnNvcl8xLnByaW1hcnlLZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsc1JhbmdlU2V0XzEuYWRkS2V5KHBrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwa2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhbnRWYWx1ZXNfMSAmJiBwa1JhbmdlU2V0XzEuYWRkS2V5KGN1cnNvcl8xLnByaW1hcnlLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJzb3JfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlW21ldGhvZF0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFibGVDbG9uZTtcbiAgICAgICAgICAgICAgICB9IH0pO1xuICAgICAgICB9LFxuICAgIH07XG4gICAgZnVuY3Rpb24gdHJhY2tBZmZlY3RlZEluZGV4ZXMoZ2V0UmFuZ2VTZXQsIHNjaGVtYSwgb2xkT2JqcywgbmV3T2Jqcykge1xuICAgICAgICBmdW5jdGlvbiBhZGRBZmZlY3RlZEluZGV4KGl4KSB7XG4gICAgICAgICAgICB2YXIgcmFuZ2VTZXQgPSBnZXRSYW5nZVNldChpeC5uYW1lIHx8IFwiXCIpO1xuICAgICAgICAgICAgZnVuY3Rpb24gZXh0cmFjdEtleShvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqICE9IG51bGwgPyBpeC5leHRyYWN0S2V5KG9iaikgOiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGFkZEtleU9yS2V5cyA9IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGl4Lm11bHRpRW50cnkgJiYgaXNBcnJheShrZXkpXG4gICAgICAgICAgICAgICAgPyBrZXkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiByYW5nZVNldC5hZGRLZXkoa2V5KTsgfSlcbiAgICAgICAgICAgICAgICA6IHJhbmdlU2V0LmFkZEtleShrZXkpOyB9O1xuICAgICAgICAgICAgKG9sZE9ianMgfHwgbmV3T2JqcykuZm9yRWFjaChmdW5jdGlvbiAoXywgaSkge1xuICAgICAgICAgICAgICAgIHZhciBvbGRLZXkgPSBvbGRPYmpzICYmIGV4dHJhY3RLZXkob2xkT2Jqc1tpXSk7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0tleSA9IG5ld09ianMgJiYgZXh0cmFjdEtleShuZXdPYmpzW2ldKTtcbiAgICAgICAgICAgICAgICBpZiAoY21wKG9sZEtleSwgbmV3S2V5KSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2xkS2V5ICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRLZXlPcktleXMob2xkS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0tleSAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkS2V5T3JLZXlzKG5ld0tleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2NoZW1hLmluZGV4ZXMuZm9yRWFjaChhZGRBZmZlY3RlZEluZGV4KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGp1c3RPcHRpbWlzdGljRnJvbUZhaWx1cmVzKHRibENhY2hlLCByZXEsIHJlcykge1xuICAgICAgICBpZiAocmVzLm51bUZhaWx1cmVzID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHJlcTtcbiAgICAgICAgaWYgKHJlcS50eXBlID09PSAnZGVsZXRlUmFuZ2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbnVtQnVsa09wcyA9IHJlcS5rZXlzXG4gICAgICAgICAgICA/IHJlcS5rZXlzLmxlbmd0aFxuICAgICAgICAgICAgOiAndmFsdWVzJyBpbiByZXEgJiYgcmVxLnZhbHVlc1xuICAgICAgICAgICAgICAgID8gcmVxLnZhbHVlcy5sZW5ndGhcbiAgICAgICAgICAgICAgICA6IDE7XG4gICAgICAgIGlmIChyZXMubnVtRmFpbHVyZXMgPT09IG51bUJ1bGtPcHMpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjbG9uZSA9IF9fYXNzaWduKHt9LCByZXEpO1xuICAgICAgICBpZiAoaXNBcnJheShjbG9uZS5rZXlzKSkge1xuICAgICAgICAgICAgY2xvbmUua2V5cyA9IGNsb25lLmtleXMuZmlsdGVyKGZ1bmN0aW9uIChfLCBpKSB7IHJldHVybiAhKGkgaW4gcmVzLmZhaWx1cmVzKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCd2YWx1ZXMnIGluIGNsb25lICYmIGlzQXJyYXkoY2xvbmUudmFsdWVzKSkge1xuICAgICAgICAgICAgY2xvbmUudmFsdWVzID0gY2xvbmUudmFsdWVzLmZpbHRlcihmdW5jdGlvbiAoXywgaSkgeyByZXR1cm4gIShpIGluIHJlcy5mYWlsdXJlcyk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbG9uZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0Fib3ZlTG93ZXIoa2V5LCByYW5nZSkge1xuICAgICAgICByZXR1cm4gcmFuZ2UubG93ZXIgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICA6IHJhbmdlLmxvd2VyT3BlblxuICAgICAgICAgICAgICAgID8gY21wKGtleSwgcmFuZ2UubG93ZXIpID4gMFxuICAgICAgICAgICAgICAgIDogY21wKGtleSwgcmFuZ2UubG93ZXIpID49IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzQmVsb3dVcHBlcihrZXksIHJhbmdlKSB7XG4gICAgICAgIHJldHVybiByYW5nZS51cHBlciA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgIDogcmFuZ2UudXBwZXJPcGVuXG4gICAgICAgICAgICAgICAgPyBjbXAoa2V5LCByYW5nZS51cHBlcikgPCAwXG4gICAgICAgICAgICAgICAgOiBjbXAoa2V5LCByYW5nZS51cHBlcikgPD0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNXaXRoaW5SYW5nZShrZXksIHJhbmdlKSB7XG4gICAgICAgIHJldHVybiBpc0Fib3ZlTG93ZXIoa2V5LCByYW5nZSkgJiYgaXNCZWxvd1VwcGVyKGtleSwgcmFuZ2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGx5T3B0aW1pc3RpY09wcyhyZXN1bHQsIHJlcSwgb3BzLCB0YWJsZSwgY2FjaGVFbnRyeSwgaW1tdXRhYmxlKSB7XG4gICAgICAgIGlmICghb3BzIHx8IG9wcy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB2YXIgaW5kZXggPSByZXEucXVlcnkuaW5kZXg7XG4gICAgICAgIHZhciBtdWx0aUVudHJ5ID0gaW5kZXgubXVsdGlFbnRyeTtcbiAgICAgICAgdmFyIHF1ZXJ5UmFuZ2UgPSByZXEucXVlcnkucmFuZ2U7XG4gICAgICAgIHZhciBwcmltYXJ5S2V5ID0gdGFibGUuc2NoZW1hLnByaW1hcnlLZXk7XG4gICAgICAgIHZhciBleHRyYWN0UHJpbUtleSA9IHByaW1hcnlLZXkuZXh0cmFjdEtleTtcbiAgICAgICAgdmFyIGV4dHJhY3RJbmRleCA9IGluZGV4LmV4dHJhY3RLZXk7XG4gICAgICAgIHZhciBleHRyYWN0TG93TGV2ZWxJbmRleCA9IChpbmRleC5sb3dMZXZlbEluZGV4IHx8IGluZGV4KS5leHRyYWN0S2V5O1xuICAgICAgICB2YXIgZmluYWxSZXN1bHQgPSBvcHMucmVkdWNlKGZ1bmN0aW9uIChyZXN1bHQsIG9wKSB7XG4gICAgICAgICAgICB2YXIgbW9kaWZlZFJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICAgIHZhciBpbmNsdWRlZFZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgaWYgKG9wLnR5cGUgPT09ICdhZGQnIHx8IG9wLnR5cGUgPT09ICdwdXQnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluY2x1ZGVkUEtzID0gbmV3IFJhbmdlU2V0KCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IG9wLnZhbHVlcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBvcC52YWx1ZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhciBwayA9IGV4dHJhY3RQcmltS2V5KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluY2x1ZGVkUEtzLmhhc0tleShwaykpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IGV4dHJhY3RJbmRleCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtdWx0aUVudHJ5ICYmIGlzQXJyYXkoa2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBrZXkuc29tZShmdW5jdGlvbiAoaykgeyByZXR1cm4gaXNXaXRoaW5SYW5nZShrLCBxdWVyeVJhbmdlKTsgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogaXNXaXRoaW5SYW5nZShrZXksIHF1ZXJ5UmFuZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlZFBLcy5hZGRLZXkocGspO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZWRWYWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKG9wLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdhZGQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBleGlzdGluZ0tleXNfMSA9IG5ldyBSYW5nZVNldCgpLmFkZEtleXMocmVxLnZhbHVlcyA/IHJlc3VsdC5tYXAoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIGV4dHJhY3RQcmltS2V5KHYpOyB9KSA6IHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIG1vZGlmZWRSZXN1bHQgPSByZXN1bHQuY29uY2F0KHJlcS52YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgID8gaW5jbHVkZWRWYWx1ZXMuZmlsdGVyKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IGV4dHJhY3RQcmltS2V5KHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ0tleXNfMS5oYXNLZXkoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nS2V5c18xLmFkZEtleShrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogaW5jbHVkZWRWYWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uICh2KSB7IHJldHVybiBleHRyYWN0UHJpbUtleSh2KTsgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nS2V5c18xLmhhc0tleShrKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nS2V5c18xLmFkZEtleShrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgJ3B1dCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleVNldF8xID0gbmV3IFJhbmdlU2V0KCkuYWRkS2V5cyhvcC52YWx1ZXMubWFwKGZ1bmN0aW9uICh2KSB7IHJldHVybiBleHRyYWN0UHJpbUtleSh2KTsgfSkpO1xuICAgICAgICAgICAgICAgICAgICBtb2RpZmVkUmVzdWx0ID0gcmVzdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gIWtleVNldF8xLmhhc0tleShyZXEudmFsdWVzID8gZXh0cmFjdFByaW1LZXkoaXRlbSkgOiBpdGVtKTsgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jb25jYXQoXG4gICAgICAgICAgICAgICAgICAgIHJlcS52YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgID8gaW5jbHVkZWRWYWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIDogaW5jbHVkZWRWYWx1ZXMubWFwKGZ1bmN0aW9uICh2KSB7IHJldHVybiBleHRyYWN0UHJpbUtleSh2KTsgfSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleXNUb0RlbGV0ZV8xID0gbmV3IFJhbmdlU2V0KCkuYWRkS2V5cyhvcC5rZXlzKTtcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZlZFJlc3VsdCA9IHJlc3VsdC5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAha2V5c1RvRGVsZXRlXzEuaGFzS2V5KHJlcS52YWx1ZXMgPyBleHRyYWN0UHJpbUtleShpdGVtKSA6IGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZGVsZXRlUmFuZ2UnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZ2VfMSA9IG9wLnJhbmdlO1xuICAgICAgICAgICAgICAgICAgICBtb2RpZmVkUmVzdWx0ID0gcmVzdWx0LmZpbHRlcihmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gIWlzV2l0aGluUmFuZ2UoZXh0cmFjdFByaW1LZXkoaXRlbSksIHJhbmdlXzEpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbW9kaWZlZFJlc3VsdDtcbiAgICAgICAgfSwgcmVzdWx0KTtcbiAgICAgICAgaWYgKGZpbmFsUmVzdWx0ID09PSByZXN1bHQpXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICBmaW5hbFJlc3VsdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gY21wKGV4dHJhY3RMb3dMZXZlbEluZGV4KGEpLCBleHRyYWN0TG93TGV2ZWxJbmRleChiKSkgfHxcbiAgICAgICAgICAgICAgICBjbXAoZXh0cmFjdFByaW1LZXkoYSksIGV4dHJhY3RQcmltS2V5KGIpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChyZXEubGltaXQgJiYgcmVxLmxpbWl0IDwgSW5maW5pdHkpIHtcbiAgICAgICAgICAgIGlmIChmaW5hbFJlc3VsdC5sZW5ndGggPiByZXEubGltaXQpIHtcbiAgICAgICAgICAgICAgICBmaW5hbFJlc3VsdC5sZW5ndGggPSByZXEubGltaXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyZXN1bHQubGVuZ3RoID09PSByZXEubGltaXQgJiYgZmluYWxSZXN1bHQubGVuZ3RoIDwgcmVxLmxpbWl0KSB7XG4gICAgICAgICAgICAgICAgY2FjaGVFbnRyeS5kaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGltbXV0YWJsZSA/IE9iamVjdC5mcmVlemUoZmluYWxSZXN1bHQpIDogZmluYWxSZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXJlUmFuZ2VzRXF1YWwocjEsIHIyKSB7XG4gICAgICAgIHJldHVybiAoY21wKHIxLmxvd2VyLCByMi5sb3dlcikgPT09IDAgJiZcbiAgICAgICAgICAgIGNtcChyMS51cHBlciwgcjIudXBwZXIpID09PSAwICYmXG4gICAgICAgICAgICAhIXIxLmxvd2VyT3BlbiA9PT0gISFyMi5sb3dlck9wZW4gJiZcbiAgICAgICAgICAgICEhcjEudXBwZXJPcGVuID09PSAhIXIyLnVwcGVyT3Blbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29tcGFyZUxvd2Vycyhsb3dlcjEsIGxvd2VyMiwgbG93ZXJPcGVuMSwgbG93ZXJPcGVuMikge1xuICAgICAgICBpZiAobG93ZXIxID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gbG93ZXIyICE9PSB1bmRlZmluZWQgPyAtMSA6IDA7XG4gICAgICAgIGlmIChsb3dlcjIgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB2YXIgYyA9IGNtcChsb3dlcjEsIGxvd2VyMik7XG4gICAgICAgIGlmIChjID09PSAwKSB7XG4gICAgICAgICAgICBpZiAobG93ZXJPcGVuMSAmJiBsb3dlck9wZW4yKVxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgaWYgKGxvd2VyT3BlbjEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICBpZiAobG93ZXJPcGVuMilcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGM7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbXBhcmVVcHBlcnModXBwZXIxLCB1cHBlcjIsIHVwcGVyT3BlbjEsIHVwcGVyT3BlbjIpIHtcbiAgICAgICAgaWYgKHVwcGVyMSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHVwcGVyMiAhPT0gdW5kZWZpbmVkID8gMSA6IDA7XG4gICAgICAgIGlmICh1cHBlcjIgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgdmFyIGMgPSBjbXAodXBwZXIxLCB1cHBlcjIpO1xuICAgICAgICBpZiAoYyA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKHVwcGVyT3BlbjEgJiYgdXBwZXJPcGVuMilcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIGlmICh1cHBlck9wZW4xKVxuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIGlmICh1cHBlck9wZW4yKVxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1N1cGVyUmFuZ2UocjEsIHIyKSB7XG4gICAgICAgIHJldHVybiAoY29tcGFyZUxvd2VycyhyMS5sb3dlciwgcjIubG93ZXIsIHIxLmxvd2VyT3BlbiwgcjIubG93ZXJPcGVuKSA8PSAwICYmXG4gICAgICAgICAgICBjb21wYXJlVXBwZXJzKHIxLnVwcGVyLCByMi51cHBlciwgcjEudXBwZXJPcGVuLCByMi51cHBlck9wZW4pID49IDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmRDb21wYXRpYmxlUXVlcnkoZGJOYW1lLCB0YWJsZU5hbWUsIHR5cGUsIHJlcSkge1xuICAgICAgICB2YXIgdGJsQ2FjaGUgPSBjYWNoZVtcImlkYjovL1wiLmNvbmNhdChkYk5hbWUsIFwiL1wiKS5jb25jYXQodGFibGVOYW1lKV07XG4gICAgICAgIGlmICghdGJsQ2FjaGUpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIHZhciBxdWVyaWVzID0gdGJsQ2FjaGUucXVlcmllc1t0eXBlXTtcbiAgICAgICAgaWYgKCFxdWVyaWVzKVxuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBmYWxzZSwgdGJsQ2FjaGUsIG51bGxdO1xuICAgICAgICB2YXIgaW5kZXhOYW1lID0gcmVxLnF1ZXJ5ID8gcmVxLnF1ZXJ5LmluZGV4Lm5hbWUgOiBudWxsO1xuICAgICAgICB2YXIgZW50cmllcyA9IHF1ZXJpZXNbaW5kZXhOYW1lIHx8ICcnXTtcbiAgICAgICAgaWYgKCFlbnRyaWVzKVxuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBmYWxzZSwgdGJsQ2FjaGUsIG51bGxdO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3F1ZXJ5JzpcbiAgICAgICAgICAgICAgICB2YXIgZXF1YWxFbnRyeSA9IGVudHJpZXMuZmluZChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVudHJ5LnJlcS5saW1pdCA9PT0gcmVxLmxpbWl0ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeS5yZXEudmFsdWVzID09PSByZXEudmFsdWVzICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVSYW5nZXNFcXVhbChlbnRyeS5yZXEucXVlcnkucmFuZ2UsIHJlcS5xdWVyeS5yYW5nZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGVxdWFsRW50cnkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBlcXVhbEVudHJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRibENhY2hlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW50cmllcyxcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICB2YXIgc3VwZXJFbnRyeSA9IGVudHJpZXMuZmluZChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbWl0ID0gJ2xpbWl0JyBpbiBlbnRyeS5yZXEgPyBlbnRyeS5yZXEubGltaXQgOiBJbmZpbml0eTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChsaW1pdCA+PSByZXEubGltaXQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIChyZXEudmFsdWVzID8gZW50cnkucmVxLnZhbHVlcyA6IHRydWUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1N1cGVyUmFuZ2UoZW50cnkucmVxLnF1ZXJ5LnJhbmdlLCByZXEucXVlcnkucmFuZ2UpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW3N1cGVyRW50cnksIGZhbHNlLCB0YmxDYWNoZSwgZW50cmllc107XG4gICAgICAgICAgICBjYXNlICdjb3VudCc6XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50UXVlcnkgPSBlbnRyaWVzLmZpbmQoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcmVSYW5nZXNFcXVhbChlbnRyeS5yZXEucXVlcnkucmFuZ2UsIHJlcS5xdWVyeS5yYW5nZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtjb3VudFF1ZXJ5LCAhIWNvdW50UXVlcnksIHRibENhY2hlLCBlbnRyaWVzXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN1YnNjcmliZVRvQ2FjaGVFbnRyeShjYWNoZUVudHJ5LCBjb250YWluZXIsIHJlcXVlcnksIHNpZ25hbCkge1xuICAgICAgICBjYWNoZUVudHJ5LnN1YnNjcmliZXJzLmFkZChyZXF1ZXJ5KTtcbiAgICAgICAgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYWNoZUVudHJ5LnN1YnNjcmliZXJzLmRlbGV0ZShyZXF1ZXJ5KTtcbiAgICAgICAgICAgIGlmIChjYWNoZUVudHJ5LnN1YnNjcmliZXJzLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBlbnF1ZUZvckRlbGV0aW9uKGNhY2hlRW50cnksIGNvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBlbnF1ZUZvckRlbGV0aW9uKGNhY2hlRW50cnksIGNvbnRhaW5lcikge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChjYWNoZUVudHJ5LnN1YnNjcmliZXJzLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkZWxBcnJheUl0ZW0oY29udGFpbmVyLCBjYWNoZUVudHJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMzAwMCk7XG4gICAgfVxuXG4gICAgdmFyIGNhY2hlTWlkZGxld2FyZSA9IHtcbiAgICAgICAgc3RhY2s6ICdkYmNvcmUnLFxuICAgICAgICBsZXZlbDogMCxcbiAgICAgICAgbmFtZTogJ0NhY2hlJyxcbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoY29yZSkge1xuICAgICAgICAgICAgdmFyIGRiTmFtZSA9IGNvcmUuc2NoZW1hLm5hbWU7XG4gICAgICAgICAgICB2YXIgY29yZU1XID0gX19hc3NpZ24oX19hc3NpZ24oe30sIGNvcmUpLCB7IHRyYW5zYWN0aW9uOiBmdW5jdGlvbiAoc3RvcmVzLCBtb2RlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpZGJ0cmFucyA9IGNvcmUudHJhbnNhY3Rpb24oc3RvcmVzLCBtb2RlLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGUgPT09ICdyZWFkd3JpdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWNfMSA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaWduYWwgPSBhY18xLnNpZ25hbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbmRUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uICh3YXNDb21taXR0ZWQpIHsgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY18xLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGUgPT09ICdyZWFkd3JpdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhZmZlY3RlZFN1YnNjcmliZXJzXzEgPSBuZXcgU2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgc3RvcmVzXzEgPSBzdG9yZXM7IF9pIDwgc3RvcmVzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RvcmVOYW1lID0gc3RvcmVzXzFbX2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRibENhY2hlID0gY2FjaGVbXCJpZGI6Ly9cIi5jb25jYXQoZGJOYW1lLCBcIi9cIikuY29uY2F0KHN0b3JlTmFtZSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRibENhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmxlID0gY29yZS50YWJsZShzdG9yZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHMgPSB0YmxDYWNoZS5vcHRpbWlzdGljT3BzLmZpbHRlcihmdW5jdGlvbiAob3ApIHsgcmV0dXJuIG9wLnRyYW5zID09PSBpZGJ0cmFuczsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkYnRyYW5zLl9leHBsaWNpdCAmJiB3YXNDb21taXR0ZWQgJiYgaWRidHJhbnMubXV0YXRlZFBhcnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9hID0gMCwgX2IgPSBPYmplY3QudmFsdWVzKHRibENhY2hlLnF1ZXJpZXMucXVlcnkpOyBfYSA8IF9iLmxlbmd0aDsgX2ErKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVudHJpZXMgPSBfYltfYV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfYyA9IDAsIF9kID0gZW50cmllcy5zbGljZSgpOyBfYyA8IF9kLmxlbmd0aDsgX2MrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9IF9kW19jXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JzU2V0c092ZXJsYXAoZW50cnkub2JzU2V0LCBpZGJ0cmFucy5tdXRhdGVkUGFydHMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbEFycmF5SXRlbShlbnRyaWVzLCBlbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5LnN1YnNjcmliZXJzLmZvckVhY2goZnVuY3Rpb24gKHJlcXVlcnkpIHsgcmV0dXJuIGFmZmVjdGVkU3Vic2NyaWJlcnNfMS5hZGQocmVxdWVyeSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvcHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YmxDYWNoZS5vcHRpbWlzdGljT3BzID0gdGJsQ2FjaGUub3B0aW1pc3RpY09wcy5maWx0ZXIoZnVuY3Rpb24gKG9wKSB7IHJldHVybiBvcC50cmFucyAhPT0gaWRidHJhbnM7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfZSA9IDAsIF9mID0gT2JqZWN0LnZhbHVlcyh0YmxDYWNoZS5xdWVyaWVzLnF1ZXJ5KTsgX2UgPCBfZi5sZW5ndGg7IF9lKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbnRyaWVzID0gX2ZbX2VdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2cgPSAwLCBfaCA9IGVudHJpZXMuc2xpY2UoKTsgX2cgPCBfaC5sZW5ndGg7IF9nKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW50cnkgPSBfaFtfZ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LnJlcyAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkYnRyYW5zLm11dGF0ZWRQYXJ0c1xuICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2FzQ29tbWl0dGVkICYmICFlbnRyeS5kaXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZyZWV6ZVJlc3VsdHMgPSBPYmplY3QuaXNGcm96ZW4oZW50cnkucmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2RSZXMgPSBhcHBseU9wdGltaXN0aWNPcHMoZW50cnkucmVzLCBlbnRyeS5yZXEsIG9wcywgdGFibGUsIGVudHJ5LCBmcmVlemVSZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5kaXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbEFycmF5SXRlbShlbnRyaWVzLCBlbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50cnkuc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAocmVxdWVyeSkgeyByZXR1cm4gYWZmZWN0ZWRTdWJzY3JpYmVyc18xLmFkZChyZXF1ZXJ5KTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChtb2RSZXMgIT09IGVudHJ5LnJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5LnJlcyA9IG1vZFJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRyeS5wcm9taXNlID0gRGV4aWVQcm9taXNlLnJlc29sdmUoeyByZXN1bHQ6IG1vZFJlcyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5kaXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbEFycmF5SXRlbShlbnRyaWVzLCBlbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRyeS5zdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChyZXF1ZXJ5KSB7IHJldHVybiBhZmZlY3RlZFN1YnNjcmliZXJzXzEuYWRkKHJlcXVlcnkpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZmZlY3RlZFN1YnNjcmliZXJzXzEuZm9yRWFjaChmdW5jdGlvbiAocmVxdWVyeSkgeyByZXR1cm4gcmVxdWVyeSgpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9OyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRidHJhbnMuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBlbmRUcmFuc2FjdGlvbihmYWxzZSksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWw6IHNpZ25hbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRidHJhbnMuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlbmRUcmFuc2FjdGlvbihmYWxzZSksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYWw6IHNpZ25hbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRidHJhbnMuYWRkRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCBlbmRUcmFuc2FjdGlvbih0cnVlKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbDogc2lnbmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlkYnRyYW5zO1xuICAgICAgICAgICAgICAgIH0sIHRhYmxlOiBmdW5jdGlvbiAodGFibGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkb3duVGFibGUgPSBjb3JlLnRhYmxlKHRhYmxlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmltS2V5ID0gZG93blRhYmxlLnNjaGVtYS5wcmltYXJ5S2V5O1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFibGVNVyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBkb3duVGFibGUpLCB7IG11dGF0ZTogZnVuY3Rpb24gKHJlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cmFucyA9IFBTRC50cmFucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJpbUtleS5vdXRib3VuZCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFucy5kYi5fb3B0aW9ucy5jYWNoZSA9PT0gJ2Rpc2FibGVkJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFucy5leHBsaWNpdCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFucy5pZGJ0cmFucy5tb2RlICE9PSAncmVhZHdyaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG93blRhYmxlLm11dGF0ZShyZXEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGJsQ2FjaGUgPSBjYWNoZVtcImlkYjovL1wiLmNvbmNhdChkYk5hbWUsIFwiL1wiKS5jb25jYXQodGFibGVOYW1lKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0YmxDYWNoZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvd25UYWJsZS5tdXRhdGUocmVxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IGRvd25UYWJsZS5tdXRhdGUocmVxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHJlcS50eXBlID09PSAnYWRkJyB8fCByZXEudHlwZSA9PT0gJ3B1dCcpICYmIChyZXEudmFsdWVzLmxlbmd0aCA+PSA1MCB8fCBnZXRFZmZlY3RpdmVLZXlzKHByaW1LZXksIHJlcSkuc29tZShmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBrZXkgPT0gbnVsbDsgfSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxV2l0aFJlc29sdmVkS2V5cyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXEpLCB7IHZhbHVlczogcmVxLnZhbHVlcy5tYXAoZnVuY3Rpb24gKHZhbHVlLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5mYWlsdXJlc1tpXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlV2l0aEtleSA9ICgoX2EgPSBwcmltS2V5LmtleVBhdGgpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pbmNsdWRlcygnLicpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBkZWVwQ2xvbmUodmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF9fYXNzaWduKHt9LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEJ5S2V5UGF0aCh2YWx1ZVdpdGhLZXksIHByaW1LZXkua2V5UGF0aCwgcmVzLnJlc3VsdHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVXaXRoS2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFkanVzdGVkUmVxID0gYWRqdXN0T3B0aW1pc3RpY0Zyb21GYWlsdXJlcyh0YmxDYWNoZSwgcmVxV2l0aFJlc29sdmVkS2V5cywgcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRibENhY2hlLm9wdGltaXN0aWNPcHMucHVzaChhZGp1c3RlZFJlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWV1ZU1pY3JvdGFzayhmdW5jdGlvbiAoKSB7IHJldHVybiByZXEubXV0YXRlZFBhcnRzICYmIHNpZ25hbFN1YnNjcmliZXJzTGF6aWx5KHJlcS5tdXRhdGVkUGFydHMpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YmxDYWNoZS5vcHRpbWlzdGljT3BzLnB1c2gocmVxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxLm11dGF0ZWRQYXJ0cyAmJiBzaWduYWxTdWJzY3JpYmVyc0xhemlseShyZXEubXV0YXRlZFBhcnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMubnVtRmFpbHVyZXMgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsQXJyYXlJdGVtKHRibENhY2hlLm9wdGltaXN0aWNPcHMsIHJlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFkanVzdGVkUmVxID0gYWRqdXN0T3B0aW1pc3RpY0Zyb21GYWlsdXJlcyh0YmxDYWNoZSwgcmVxLCByZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhZGp1c3RlZFJlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YmxDYWNoZS5vcHRpbWlzdGljT3BzLnB1c2goYWRqdXN0ZWRSZXEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEubXV0YXRlZFBhcnRzICYmIHNpZ25hbFN1YnNjcmliZXJzTGF6aWx5KHJlcS5tdXRhdGVkUGFydHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxBcnJheUl0ZW0odGJsQ2FjaGUub3B0aW1pc3RpY09wcywgcmVxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5tdXRhdGVkUGFydHMgJiYgc2lnbmFsU3Vic2NyaWJlcnNMYXppbHkocmVxLm11dGF0ZWRQYXJ0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHF1ZXJ5OiBmdW5jdGlvbiAocmVxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNDYWNoYWJsZUNvbnRleHQoUFNELCBkb3duVGFibGUpIHx8ICFpc0NhY2hhYmxlUmVxdWVzdChcInF1ZXJ5XCIsIHJlcSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkb3duVGFibGUucXVlcnkocmVxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZnJlZXplUmVzdWx0cyA9ICgoX2EgPSBQU0QudHJhbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kYi5fb3B0aW9ucy5jYWNoZSkgPT09ICdpbW11dGFibGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYiA9IFBTRCwgcmVxdWVyeSA9IF9iLnJlcXVlcnksIHNpZ25hbCA9IF9iLnNpZ25hbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2MgPSBmaW5kQ29tcGF0aWJsZVF1ZXJ5KGRiTmFtZSwgdGFibGVOYW1lLCAncXVlcnknLCByZXEpLCBjYWNoZUVudHJ5ID0gX2NbMF0sIGV4YWN0TWF0Y2ggPSBfY1sxXSwgdGJsQ2FjaGUgPSBfY1syXSwgY29udGFpbmVyID0gX2NbM107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhY2hlRW50cnkgJiYgZXhhY3RNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZUVudHJ5Lm9ic1NldCA9IHJlcS5vYnNTZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IGRvd25UYWJsZS5xdWVyeShyZXEpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlcy5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGVFbnRyeSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZUVudHJ5LnJlcyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmcmVlemVSZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSByZXN1bHQubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5mcmVlemUocmVzdWx0W2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmZyZWV6ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnJlc3VsdCA9IGRlZXBDbG9uZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyICYmIGNhY2hlRW50cnkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsQXJyYXlJdGVtKGNvbnRhaW5lciwgY2FjaGVFbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVFbnRyeSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic1NldDogcmVxLm9ic1NldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2U6IHByb21pc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyczogbmV3IFNldCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3F1ZXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcTogcmVxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlydHk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIucHVzaChjYWNoZUVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IFtjYWNoZUVudHJ5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGJsQ2FjaGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YmxDYWNoZSA9IGNhY2hlW1wiaWRiOi8vXCIuY29uY2F0KGRiTmFtZSwgXCIvXCIpLmNvbmNhdCh0YWJsZU5hbWUpXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcmllczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpzOiBuZXcgTWFwKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGltaXN0aWNPcHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bnNpZ25hbGVkUGFydHM6IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRibENhY2hlLnF1ZXJpZXMucXVlcnlbcmVxLnF1ZXJ5LmluZGV4Lm5hbWUgfHwgJyddID0gY29udGFpbmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZVRvQ2FjaGVFbnRyeShjYWNoZUVudHJ5LCBjb250YWluZXIsIHJlcXVlcnksIHNpZ25hbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlRW50cnkucHJvbWlzZS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogYXBwbHlPcHRpbWlzdGljT3BzKHJlcy5yZXN1bHQsIHJlcSwgdGJsQ2FjaGUgPT09IG51bGwgfHwgdGJsQ2FjaGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRibENhY2hlLm9wdGltaXN0aWNPcHMsIGRvd25UYWJsZSwgY2FjaGVFbnRyeSwgZnJlZXplUmVzdWx0cyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFibGVNVztcbiAgICAgICAgICAgICAgICB9IH0pO1xuICAgICAgICAgICAgcmV0dXJuIGNvcmVNVztcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdmlwaWZ5KHRhcmdldCwgdmlwRGIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh0YXJnZXQsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcCA9PT0gJ2RiJylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZpcERiO1xuICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIERleGllJDEgPSAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRGV4aWUobmFtZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuX21pZGRsZXdhcmVzID0ge307XG4gICAgICAgICAgICB0aGlzLnZlcm5vID0gMDtcbiAgICAgICAgICAgIHZhciBkZXBzID0gRGV4aWUuZGVwZW5kZW5jaWVzO1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnMgPSBfX2Fzc2lnbih7XG4gICAgICAgICAgICAgICAgYWRkb25zOiBEZXhpZS5hZGRvbnMsIGF1dG9PcGVuOiB0cnVlLFxuICAgICAgICAgICAgICAgIGluZGV4ZWREQjogZGVwcy5pbmRleGVkREIsIElEQktleVJhbmdlOiBkZXBzLklEQktleVJhbmdlLCBjYWNoZTogJ2Nsb25lZCcgfSwgb3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLl9kZXBzID0ge1xuICAgICAgICAgICAgICAgIGluZGV4ZWREQjogb3B0aW9ucy5pbmRleGVkREIsXG4gICAgICAgICAgICAgICAgSURCS2V5UmFuZ2U6IG9wdGlvbnMuSURCS2V5UmFuZ2VcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgYWRkb25zID0gb3B0aW9ucy5hZGRvbnM7XG4gICAgICAgICAgICB0aGlzLl9kYlNjaGVtYSA9IHt9O1xuICAgICAgICAgICAgdGhpcy5fdmVyc2lvbnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3N0b3JlTmFtZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2FsbFRhYmxlcyA9IHt9O1xuICAgICAgICAgICAgdGhpcy5pZGJkYiA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9ub3ZpcCA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgZGJPcGVuRXJyb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgaXNCZWluZ09wZW5lZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgb25SZWFkeUJlaW5nRmlyZWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgb3BlbkNvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkYlJlYWR5UmVzb2x2ZTogbm9wLFxuICAgICAgICAgICAgICAgIGRiUmVhZHlQcm9taXNlOiBudWxsLFxuICAgICAgICAgICAgICAgIGNhbmNlbE9wZW46IG5vcCxcbiAgICAgICAgICAgICAgICBvcGVuQ2FuY2VsbGVyOiBudWxsLFxuICAgICAgICAgICAgICAgIGF1dG9TY2hlbWE6IHRydWUsXG4gICAgICAgICAgICAgICAgUFIxMzk4X21heExvb3A6IDMsXG4gICAgICAgICAgICAgICAgYXV0b09wZW46IG9wdGlvbnMuYXV0b09wZW4sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc3RhdGUuZGJSZWFkeVByb21pc2UgPSBuZXcgRGV4aWVQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUuZGJSZWFkeVJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzdGF0ZS5vcGVuQ2FuY2VsbGVyID0gbmV3IERleGllUHJvbWlzZShmdW5jdGlvbiAoXywgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgc3RhdGUuY2FuY2VsT3BlbiA9IHJlamVjdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgICAgICB0aGlzLm9uID0gRXZlbnRzKHRoaXMsIFwicG9wdWxhdGVcIiwgXCJibG9ja2VkXCIsIFwidmVyc2lvbmNoYW5nZVwiLCBcImNsb3NlXCIsIHsgcmVhZHk6IFtwcm9taXNhYmxlQ2hhaW4sIG5vcF0gfSk7XG4gICAgICAgICAgICB0aGlzLm9uLnJlYWR5LnN1YnNjcmliZSA9IG92ZXJyaWRlKHRoaXMub24ucmVhZHkuc3Vic2NyaWJlLCBmdW5jdGlvbiAoc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdWJzY3JpYmVyLCBiU3RpY2t5KSB7XG4gICAgICAgICAgICAgICAgICAgIERleGllLnZpcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBfdGhpcy5fc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUub3BlbkNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGF0ZS5kYk9wZW5FcnJvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGV4aWVQcm9taXNlLnJlc29sdmUoKS50aGVuKHN1YnNjcmliZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiU3RpY2t5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzdGF0ZS5vblJlYWR5QmVpbmdGaXJlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLm9uUmVhZHlCZWluZ0ZpcmVkLnB1c2goc3Vic2NyaWJlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJTdGlja3kpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGJfMSA9IF90aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYlN0aWNreSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlKGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGJfMS5vbi5yZWFkeS51bnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRiXzEub24ucmVhZHkudW5zdWJzY3JpYmUodW5zdWJzY3JpYmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5Db2xsZWN0aW9uID0gY3JlYXRlQ29sbGVjdGlvbkNvbnN0cnVjdG9yKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5UYWJsZSA9IGNyZWF0ZVRhYmxlQ29uc3RydWN0b3IodGhpcyk7XG4gICAgICAgICAgICB0aGlzLlRyYW5zYWN0aW9uID0gY3JlYXRlVHJhbnNhY3Rpb25Db25zdHJ1Y3Rvcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuVmVyc2lvbiA9IGNyZWF0ZVZlcnNpb25Db25zdHJ1Y3Rvcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuV2hlcmVDbGF1c2UgPSBjcmVhdGVXaGVyZUNsYXVzZUNvbnN0cnVjdG9yKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vbihcInZlcnNpb25jaGFuZ2VcIiwgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2Lm5ld1ZlcnNpb24gPiAwKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJBbm90aGVyIGNvbm5lY3Rpb24gd2FudHMgdG8gdXBncmFkZSBkYXRhYmFzZSAnXCIuY29uY2F0KF90aGlzLm5hbWUsIFwiJy4gQ2xvc2luZyBkYiBub3cgdG8gcmVzdW1lIHRoZSB1cGdyYWRlLlwiKSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJBbm90aGVyIGNvbm5lY3Rpb24gd2FudHMgdG8gZGVsZXRlIGRhdGFiYXNlICdcIi5jb25jYXQoX3RoaXMubmFtZSwgXCInLiBDbG9zaW5nIGRiIG5vdyB0byByZXN1bWUgdGhlIGRlbGV0ZSByZXF1ZXN0LlwiKSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuY2xvc2UoeyBkaXNhYmxlQXV0b09wZW46IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm9uKFwiYmxvY2tlZFwiLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV2Lm5ld1ZlcnNpb24gfHwgZXYubmV3VmVyc2lvbiA8IGV2Lm9sZFZlcnNpb24pXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkRleGllLmRlbGV0ZSgnXCIuY29uY2F0KF90aGlzLm5hbWUsIFwiJykgd2FzIGJsb2NrZWRcIikpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiVXBncmFkZSAnXCIuY29uY2F0KF90aGlzLm5hbWUsIFwiJyBibG9ja2VkIGJ5IG90aGVyIGNvbm5lY3Rpb24gaG9sZGluZyB2ZXJzaW9uIFwiKS5jb25jYXQoZXYub2xkVmVyc2lvbiAvIDEwKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX21heEtleSA9IGdldE1heEtleShvcHRpb25zLklEQktleVJhbmdlKTtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZVRyYW5zYWN0aW9uID0gZnVuY3Rpb24gKG1vZGUsIHN0b3JlTmFtZXMsIGRic2NoZW1hLCBwYXJlbnRUcmFuc2FjdGlvbikgeyByZXR1cm4gbmV3IF90aGlzLlRyYW5zYWN0aW9uKG1vZGUsIHN0b3JlTmFtZXMsIGRic2NoZW1hLCBfdGhpcy5fb3B0aW9ucy5jaHJvbWVUcmFuc2FjdGlvbkR1cmFiaWxpdHksIHBhcmVudFRyYW5zYWN0aW9uKTsgfTtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmVPbkJsb2NrZWQgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vbihcImJsb2NrZWRcIikuZmlyZShldik7XG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5uYW1lID09PSBfdGhpcy5uYW1lICYmIGMgIT09IF90aGlzICYmICFjLl9zdGF0ZS52Y0ZpcmVkOyB9KVxuICAgICAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLm9uKFwidmVyc2lvbmNoYW5nZVwiKS5maXJlKGV2KTsgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy51c2UoY2FjaGVFeGlzdGluZ1ZhbHVlc01pZGRsZXdhcmUpO1xuICAgICAgICAgICAgdGhpcy51c2UoY2FjaGVNaWRkbGV3YXJlKTtcbiAgICAgICAgICAgIHRoaXMudXNlKG9ic2VydmFiaWxpdHlNaWRkbGV3YXJlKTtcbiAgICAgICAgICAgIHRoaXMudXNlKHZpcnR1YWxJbmRleE1pZGRsZXdhcmUpO1xuICAgICAgICAgICAgdGhpcy51c2UoaG9va3NNaWRkbGV3YXJlKTtcbiAgICAgICAgICAgIHZhciB2aXBEQiA9IG5ldyBQcm94eSh0aGlzLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoXywgcHJvcCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3AgPT09ICdfdmlwJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcCA9PT0gJ3RhYmxlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFibGVOYW1lKSB7IHJldHVybiB2aXBpZnkoX3RoaXMudGFibGUodGFibGVOYW1lKSwgdmlwREIpOyB9O1xuICAgICAgICAgICAgICAgICAgICB2YXIgcnYgPSBSZWZsZWN0LmdldChfLCBwcm9wLCByZWNlaXZlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChydiBpbnN0YW5jZW9mIFRhYmxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZpcGlmeShydiwgdmlwREIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcCA9PT0gJ3RhYmxlcycpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnYubWFwKGZ1bmN0aW9uICh0KSB7IHJldHVybiB2aXBpZnkodCwgdmlwREIpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3AgPT09ICdfY3JlYXRlVHJhbnNhY3Rpb24nKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHggPSBydi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2aXBpZnkodHgsIHZpcERCKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBydjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudmlwID0gdmlwREI7XG4gICAgICAgICAgICBhZGRvbnMuZm9yRWFjaChmdW5jdGlvbiAoYWRkb24pIHsgcmV0dXJuIGFkZG9uKF90aGlzKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgRGV4aWUucHJvdG90eXBlLnZlcnNpb24gPSBmdW5jdGlvbiAodmVyc2lvbk51bWJlcikge1xuICAgICAgICAgICAgaWYgKGlzTmFOKHZlcnNpb25OdW1iZXIpIHx8IHZlcnNpb25OdW1iZXIgPCAwLjEpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuVHlwZShcIkdpdmVuIHZlcnNpb24gaXMgbm90IGEgcG9zaXRpdmUgbnVtYmVyXCIpO1xuICAgICAgICAgICAgdmVyc2lvbk51bWJlciA9IE1hdGgucm91bmQodmVyc2lvbk51bWJlciAqIDEwKSAvIDEwO1xuICAgICAgICAgICAgaWYgKHRoaXMuaWRiZGIgfHwgdGhpcy5fc3RhdGUuaXNCZWluZ09wZW5lZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5TY2hlbWEoXCJDYW5ub3QgYWRkIHZlcnNpb24gd2hlbiBkYXRhYmFzZSBpcyBvcGVuXCIpO1xuICAgICAgICAgICAgdGhpcy52ZXJubyA9IE1hdGgubWF4KHRoaXMudmVybm8sIHZlcnNpb25OdW1iZXIpO1xuICAgICAgICAgICAgdmFyIHZlcnNpb25zID0gdGhpcy5fdmVyc2lvbnM7XG4gICAgICAgICAgICB2YXIgdmVyc2lvbkluc3RhbmNlID0gdmVyc2lvbnMuZmlsdGVyKGZ1bmN0aW9uICh2KSB7IHJldHVybiB2Ll9jZmcudmVyc2lvbiA9PT0gdmVyc2lvbk51bWJlcjsgfSlbMF07XG4gICAgICAgICAgICBpZiAodmVyc2lvbkluc3RhbmNlKVxuICAgICAgICAgICAgICAgIHJldHVybiB2ZXJzaW9uSW5zdGFuY2U7XG4gICAgICAgICAgICB2ZXJzaW9uSW5zdGFuY2UgPSBuZXcgdGhpcy5WZXJzaW9uKHZlcnNpb25OdW1iZXIpO1xuICAgICAgICAgICAgdmVyc2lvbnMucHVzaCh2ZXJzaW9uSW5zdGFuY2UpO1xuICAgICAgICAgICAgdmVyc2lvbnMuc29ydChsb3dlclZlcnNpb25GaXJzdCk7XG4gICAgICAgICAgICB2ZXJzaW9uSW5zdGFuY2Uuc3RvcmVzKHt9KTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlLmF1dG9TY2hlbWEgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB2ZXJzaW9uSW5zdGFuY2U7XG4gICAgICAgIH07XG4gICAgICAgIERleGllLnByb3RvdHlwZS5fd2hlblJlYWR5ID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmlkYmRiICYmICh0aGlzLl9zdGF0ZS5vcGVuQ29tcGxldGUgfHwgUFNELmxldFRocm91Z2ggfHwgdGhpcy5fdmlwKSkgPyBmbigpIDogbmV3IERleGllUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLl9zdGF0ZS5vcGVuQ29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgZXhjZXB0aW9ucy5EYXRhYmFzZUNsb3NlZChfdGhpcy5fc3RhdGUuZGJPcGVuRXJyb3IpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5fc3RhdGUuaXNCZWluZ09wZW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLl9zdGF0ZS5hdXRvT3Blbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBleGNlcHRpb25zLkRhdGFiYXNlQ2xvc2VkKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm9wZW4oKS5jYXRjaChub3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy5fc3RhdGUuZGJSZWFkeVByb21pc2UudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfSkudGhlbihmbik7XG4gICAgICAgIH07XG4gICAgICAgIERleGllLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBzdGFjayA9IF9hLnN0YWNrLCBjcmVhdGUgPSBfYS5jcmVhdGUsIGxldmVsID0gX2EubGV2ZWwsIG5hbWUgPSBfYS5uYW1lO1xuICAgICAgICAgICAgaWYgKG5hbWUpXG4gICAgICAgICAgICAgICAgdGhpcy51bnVzZSh7IHN0YWNrOiBzdGFjaywgbmFtZTogbmFtZSB9KTtcbiAgICAgICAgICAgIHZhciBtaWRkbGV3YXJlcyA9IHRoaXMuX21pZGRsZXdhcmVzW3N0YWNrXSB8fCAodGhpcy5fbWlkZGxld2FyZXNbc3RhY2tdID0gW10pO1xuICAgICAgICAgICAgbWlkZGxld2FyZXMucHVzaCh7IHN0YWNrOiBzdGFjaywgY3JlYXRlOiBjcmVhdGUsIGxldmVsOiBsZXZlbCA9PSBudWxsID8gMTAgOiBsZXZlbCwgbmFtZTogbmFtZSB9KTtcbiAgICAgICAgICAgIG1pZGRsZXdhcmVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEubGV2ZWwgLSBiLmxldmVsOyB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBEZXhpZS5wcm90b3R5cGUudW51c2UgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBzdGFjayA9IF9hLnN0YWNrLCBuYW1lID0gX2EubmFtZSwgY3JlYXRlID0gX2EuY3JlYXRlO1xuICAgICAgICAgICAgaWYgKHN0YWNrICYmIHRoaXMuX21pZGRsZXdhcmVzW3N0YWNrXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21pZGRsZXdhcmVzW3N0YWNrXSA9IHRoaXMuX21pZGRsZXdhcmVzW3N0YWNrXS5maWx0ZXIoZnVuY3Rpb24gKG13KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGUgPyBtdy5jcmVhdGUgIT09IGNyZWF0ZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lID8gbXcubmFtZSAhPT0gbmFtZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgRGV4aWUucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIHVzZVBTRChnbG9iYWxQU0QsXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBkZXhpZU9wZW4oX3RoaXMpOyB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgRGV4aWUucHJvdG90eXBlLl9jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuX3N0YXRlO1xuICAgICAgICAgICAgdmFyIGlkeCA9IGNvbm5lY3Rpb25zLmluZGV4T2YodGhpcyk7XG4gICAgICAgICAgICBpZiAoaWR4ID49IDApXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICBpZiAodGhpcy5pZGJkYikge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWRiZGIuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgICAgIHRoaXMuaWRiZGIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdGF0ZS5pc0JlaW5nT3BlbmVkKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUuZGJSZWFkeVByb21pc2UgPSBuZXcgRGV4aWVQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmRiUmVhZHlSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzdGF0ZS5vcGVuQ2FuY2VsbGVyID0gbmV3IERleGllUHJvbWlzZShmdW5jdGlvbiAoXywgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmNhbmNlbE9wZW4gPSByZWplY3Q7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIERleGllLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIF9iID0gX2EgPT09IHZvaWQgMCA/IHsgZGlzYWJsZUF1dG9PcGVuOiB0cnVlIH0gOiBfYSwgZGlzYWJsZUF1dG9PcGVuID0gX2IuZGlzYWJsZUF1dG9PcGVuO1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5fc3RhdGU7XG4gICAgICAgICAgICBpZiAoZGlzYWJsZUF1dG9PcGVuKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLmlzQmVpbmdPcGVuZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuY2FuY2VsT3BlbihuZXcgZXhjZXB0aW9ucy5EYXRhYmFzZUNsb3NlZCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBzdGF0ZS5hdXRvT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHN0YXRlLmRiT3BlbkVycm9yID0gbmV3IGV4Y2VwdGlvbnMuRGF0YWJhc2VDbG9zZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Nsb3NlKCk7XG4gICAgICAgICAgICAgICAgc3RhdGUuYXV0b09wZW4gPSB0aGlzLl9vcHRpb25zLmF1dG9PcGVuIHx8XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmlzQmVpbmdPcGVuZWQ7XG4gICAgICAgICAgICAgICAgc3RhdGUub3BlbkNvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc3RhdGUuZGJPcGVuRXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBEZXhpZS5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKGNsb3NlT3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIGlmIChjbG9zZU9wdGlvbnMgPT09IHZvaWQgMCkgeyBjbG9zZU9wdGlvbnMgPSB7IGRpc2FibGVBdXRvT3BlbjogdHJ1ZSB9OyB9XG4gICAgICAgICAgICB2YXIgaGFzSW52YWxpZEFyZ3VtZW50cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gIT09ICdvYmplY3QnO1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5fc3RhdGU7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERleGllUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGRvRGVsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jbG9zZShjbG9zZU9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVxID0gX3RoaXMuX2RlcHMuaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKF90aGlzLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICByZXEub25zdWNjZXNzID0gd3JhcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfb25EYXRhYmFzZURlbGV0ZWQoX3RoaXMuX2RlcHMsIF90aGlzLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uZXJyb3IgPSBldmVudFJlamVjdEhhbmRsZXIocmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uYmxvY2tlZCA9IF90aGlzLl9maXJlT25CbG9ja2VkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKGhhc0ludmFsaWRBcmd1bWVudHMpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zLkludmFsaWRBcmd1bWVudChcIkludmFsaWQgY2xvc2VPcHRpb25zIGFyZ3VtZW50IHRvIGRiLmRlbGV0ZSgpXCIpO1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5pc0JlaW5nT3BlbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmRiUmVhZHlQcm9taXNlLnRoZW4oZG9EZWxldGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZG9EZWxldGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgRGV4aWUucHJvdG90eXBlLmJhY2tlbmREQiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlkYmRiO1xuICAgICAgICB9O1xuICAgICAgICBEZXhpZS5wcm90b3R5cGUuaXNPcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaWRiZGIgIT09IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIERleGllLnByb3RvdHlwZS5oYXNCZWVuQ2xvc2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGRiT3BlbkVycm9yID0gdGhpcy5fc3RhdGUuZGJPcGVuRXJyb3I7XG4gICAgICAgICAgICByZXR1cm4gZGJPcGVuRXJyb3IgJiYgKGRiT3BlbkVycm9yLm5hbWUgPT09ICdEYXRhYmFzZUNsb3NlZCcpO1xuICAgICAgICB9O1xuICAgICAgICBEZXhpZS5wcm90b3R5cGUuaGFzRmFpbGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlLmRiT3BlbkVycm9yICE9PSBudWxsO1xuICAgICAgICB9O1xuICAgICAgICBEZXhpZS5wcm90b3R5cGUuZHluYW1pY2FsbHlPcGVuZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGUuYXV0b1NjaGVtYTtcbiAgICAgICAgfTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERleGllLnByb3RvdHlwZSwgXCJ0YWJsZXNcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5cyh0aGlzLl9hbGxUYWJsZXMpLm1hcChmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gX3RoaXMuX2FsbFRhYmxlc1tuYW1lXTsgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIERleGllLnByb3RvdHlwZS50cmFuc2FjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gZXh0cmFjdFRyYW5zYWN0aW9uQXJncy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zYWN0aW9uLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9O1xuICAgICAgICBEZXhpZS5wcm90b3R5cGUuX3RyYW5zYWN0aW9uID0gZnVuY3Rpb24gKG1vZGUsIHRhYmxlcywgc2NvcGVGdW5jKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHBhcmVudFRyYW5zYWN0aW9uID0gUFNELnRyYW5zO1xuICAgICAgICAgICAgaWYgKCFwYXJlbnRUcmFuc2FjdGlvbiB8fCBwYXJlbnRUcmFuc2FjdGlvbi5kYiAhPT0gdGhpcyB8fCBtb2RlLmluZGV4T2YoJyEnKSAhPT0gLTEpXG4gICAgICAgICAgICAgICAgcGFyZW50VHJhbnNhY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgdmFyIG9ubHlJZkNvbXBhdGlibGUgPSBtb2RlLmluZGV4T2YoJz8nKSAhPT0gLTE7XG4gICAgICAgICAgICBtb2RlID0gbW9kZS5yZXBsYWNlKCchJywgJycpLnJlcGxhY2UoJz8nLCAnJyk7XG4gICAgICAgICAgICB2YXIgaWRiTW9kZSwgc3RvcmVOYW1lcztcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc3RvcmVOYW1lcyA9IHRhYmxlcy5tYXAoZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdG9yZU5hbWUgPSB0YWJsZSBpbnN0YW5jZW9mIF90aGlzLlRhYmxlID8gdGFibGUubmFtZSA6IHRhYmxlO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0b3JlTmFtZSAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCB0YWJsZSBhcmd1bWVudCB0byBEZXhpZS50cmFuc2FjdGlvbigpLiBPbmx5IFRhYmxlIG9yIFN0cmluZyBhcmUgYWxsb3dlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0b3JlTmFtZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAobW9kZSA9PSBcInJcIiB8fCBtb2RlID09PSBSRUFET05MWSlcbiAgICAgICAgICAgICAgICAgICAgaWRiTW9kZSA9IFJFQURPTkxZO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1vZGUgPT0gXCJyd1wiIHx8IG1vZGUgPT0gUkVBRFdSSVRFKVxuICAgICAgICAgICAgICAgICAgICBpZGJNb2RlID0gUkVBRFdSSVRFO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuSW52YWxpZEFyZ3VtZW50KFwiSW52YWxpZCB0cmFuc2FjdGlvbiBtb2RlOiBcIiArIG1vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRUcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50VHJhbnNhY3Rpb24ubW9kZSA9PT0gUkVBRE9OTFkgJiYgaWRiTW9kZSA9PT0gUkVBRFdSSVRFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25seUlmQ29tcGF0aWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudFRyYW5zYWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5TdWJUcmFuc2FjdGlvbihcIkNhbm5vdCBlbnRlciBhIHN1Yi10cmFuc2FjdGlvbiB3aXRoIFJFQURXUklURSBtb2RlIHdoZW4gcGFyZW50IHRyYW5zYWN0aW9uIGlzIFJFQURPTkxZXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnRUcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmVOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChzdG9yZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50VHJhbnNhY3Rpb24gJiYgcGFyZW50VHJhbnNhY3Rpb24uc3RvcmVOYW1lcy5pbmRleE9mKHN0b3JlTmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbmx5SWZDb21wYXRpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRUcmFuc2FjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnMuU3ViVHJhbnNhY3Rpb24oXCJUYWJsZSBcIiArIHN0b3JlTmFtZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgbm90IGluY2x1ZGVkIGluIHBhcmVudCB0cmFuc2FjdGlvbi5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9ubHlJZkNvbXBhdGlibGUgJiYgcGFyZW50VHJhbnNhY3Rpb24gJiYgIXBhcmVudFRyYW5zYWN0aW9uLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50VHJhbnNhY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50VHJhbnNhY3Rpb24gP1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRUcmFuc2FjdGlvbi5fcHJvbWlzZShudWxsLCBmdW5jdGlvbiAoXywgcmVqZWN0KSB7IHJlamVjdChlKTsgfSkgOlxuICAgICAgICAgICAgICAgICAgICByZWplY3Rpb24oZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZW50ZXJUcmFuc2FjdGlvbiA9IGVudGVyVHJhbnNhY3Rpb25TY29wZS5iaW5kKG51bGwsIHRoaXMsIGlkYk1vZGUsIHN0b3JlTmFtZXMsIHBhcmVudFRyYW5zYWN0aW9uLCBzY29wZUZ1bmMpO1xuICAgICAgICAgICAgcmV0dXJuIChwYXJlbnRUcmFuc2FjdGlvbiA/XG4gICAgICAgICAgICAgICAgcGFyZW50VHJhbnNhY3Rpb24uX3Byb21pc2UoaWRiTW9kZSwgZW50ZXJUcmFuc2FjdGlvbiwgXCJsb2NrXCIpIDpcbiAgICAgICAgICAgICAgICBQU0QudHJhbnMgP1xuICAgICAgICAgICAgICAgICAgICB1c2VQU0QoUFNELnRyYW5zbGVzcywgZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX3doZW5SZWFkeShlbnRlclRyYW5zYWN0aW9uKTsgfSkgOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93aGVuUmVhZHkoZW50ZXJUcmFuc2FjdGlvbikpO1xuICAgICAgICB9O1xuICAgICAgICBEZXhpZS5wcm90b3R5cGUudGFibGUgPSBmdW5jdGlvbiAodGFibGVOYW1lKSB7XG4gICAgICAgICAgICBpZiAoIWhhc093bih0aGlzLl9hbGxUYWJsZXMsIHRhYmxlTmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9ucy5JbnZhbGlkVGFibGUoXCJUYWJsZSBcIi5jb25jYXQodGFibGVOYW1lLCBcIiBkb2VzIG5vdCBleGlzdFwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYWxsVGFibGVzW3RhYmxlTmFtZV07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBEZXhpZTtcbiAgICB9KCkpO1xuXG4gICAgdmFyIHN5bWJvbE9ic2VydmFibGUgPSB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIFwib2JzZXJ2YWJsZVwiIGluIFN5bWJvbFxuICAgICAgICA/IFN5bWJvbC5vYnNlcnZhYmxlXG4gICAgICAgIDogXCJAQG9ic2VydmFibGVcIjtcbiAgICB2YXIgT2JzZXJ2YWJsZSA9ICAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBPYnNlcnZhYmxlKHN1YnNjcmliZSkge1xuICAgICAgICAgICAgdGhpcy5fc3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgICAgICB9XG4gICAgICAgIE9ic2VydmFibGUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uICh4LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJzY3JpYmUoIXggfHwgdHlwZW9mIHggPT09IFwiZnVuY3Rpb25cIiA/IHsgbmV4dDogeCwgZXJyb3I6IGVycm9yLCBjb21wbGV0ZTogY29tcGxldGUgfSA6IHgpO1xuICAgICAgICB9O1xuICAgICAgICBPYnNlcnZhYmxlLnByb3RvdHlwZVtzeW1ib2xPYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZTtcbiAgICB9KCkpO1xuXG4gICAgdmFyIGRvbURlcHM7XG4gICAgdHJ5IHtcbiAgICAgICAgZG9tRGVwcyA9IHtcbiAgICAgICAgICAgIGluZGV4ZWREQjogX2dsb2JhbC5pbmRleGVkREIgfHwgX2dsb2JhbC5tb3pJbmRleGVkREIgfHwgX2dsb2JhbC53ZWJraXRJbmRleGVkREIgfHwgX2dsb2JhbC5tc0luZGV4ZWREQixcbiAgICAgICAgICAgIElEQktleVJhbmdlOiBfZ2xvYmFsLklEQktleVJhbmdlIHx8IF9nbG9iYWwud2Via2l0SURCS2V5UmFuZ2VcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgZG9tRGVwcyA9IHsgaW5kZXhlZERCOiBudWxsLCBJREJLZXlSYW5nZTogbnVsbCB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpdmVRdWVyeShxdWVyaWVyKSB7XG4gICAgICAgIHZhciBoYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgICB2YXIgY3VycmVudFZhbHVlO1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgdmFyIHNjb3BlRnVuY0lzQXN5bmMgPSBpc0FzeW5jRnVuY3Rpb24ocXVlcmllcik7XG4gICAgICAgICAgICBmdW5jdGlvbiBleGVjdXRlKGN0eCkge1xuICAgICAgICAgICAgICAgIHZhciB3YXNSb290RXhlYyA9IGJlZ2luTWljcm9UaWNrU2NvcGUoKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2NvcGVGdW5jSXNBc3luYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jcmVtZW50RXhwZWN0ZWRBd2FpdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgcnYgPSBuZXdTY29wZShxdWVyaWVyLCBjdHgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2NvcGVGdW5jSXNBc3luYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcnYgPSBydi5maW5hbGx5KGRlY3JlbWVudEV4cGVjdGVkQXdhaXRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB3YXNSb290RXhlYyAmJiBlbmRNaWNyb1RpY2tTY29wZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBhYm9ydENvbnRyb2xsZXI7XG4gICAgICAgICAgICB2YXIgYWNjdW1NdXRzID0ge307XG4gICAgICAgICAgICB2YXIgY3VycmVudE9icyA9IHt9O1xuICAgICAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBnZXQgY2xvc2VkKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xvc2VkO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3NlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFib3J0Q29udHJvbGxlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnRlZExpc3RlbmluZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbEV2ZW50cy5zdG9yYWdlbXV0YXRlZC51bnN1YnNjcmliZShtdXRhdGlvbkxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG9ic2VydmVyLnN0YXJ0ICYmIG9ic2VydmVyLnN0YXJ0KHN1YnNjcmlwdGlvbik7XG4gICAgICAgICAgICB2YXIgc3RhcnRlZExpc3RlbmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGRvUXVlcnkgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBleGVjSW5HbG9iYWxDb250ZXh0KF9kb1F1ZXJ5KTsgfTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNob3VsZE5vdGlmeSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JzU2V0c092ZXJsYXAoY3VycmVudE9icywgYWNjdW1NdXRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBtdXRhdGlvbkxpc3RlbmVyID0gZnVuY3Rpb24gKHBhcnRzKSB7XG4gICAgICAgICAgICAgICAgZXh0ZW5kT2JzZXJ2YWJpbGl0eVNldChhY2N1bU11dHMsIHBhcnRzKTtcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkTm90aWZ5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9RdWVyeSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgX2RvUXVlcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNsb3NlZCB8fFxuICAgICAgICAgICAgICAgICAgICAhZG9tRGVwcy5pbmRleGVkREIpXG4gICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhY2N1bU11dHMgPSB7fTtcbiAgICAgICAgICAgICAgICB2YXIgc3Vic2NyID0ge307XG4gICAgICAgICAgICAgICAgaWYgKGFib3J0Q29udHJvbGxlcilcbiAgICAgICAgICAgICAgICAgICAgYWJvcnRDb250cm9sbGVyLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgYWJvcnRDb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgICAgICAgICAgIHZhciBjdHggPSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcjogc3Vic2NyLFxuICAgICAgICAgICAgICAgICAgICBzaWduYWw6IGFib3J0Q29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlcnk6IGRvUXVlcnksXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJpZXI6IHF1ZXJpZXIsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zOiBudWxsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0gZXhlY3V0ZShjdHgpO1xuICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZShyZXQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBoYXNWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3NlZCB8fCBjdHguc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhY2N1bU11dHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE9icyA9IHN1YnNjcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmplY3RJc0VtcHR5KGN1cnJlbnRPYnMpICYmICFzdGFydGVkTGlzdGVuaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxFdmVudHMoREVYSUVfU1RPUkFHRV9NVVRBVEVEX0VWRU5UX05BTUUsIG11dGF0aW9uTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRlZExpc3RlbmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZXhlY0luR2xvYmFsQ29udGV4dChmdW5jdGlvbiAoKSB7IHJldHVybiAhY2xvc2VkICYmIG9ic2VydmVyLm5leHQgJiYgb2JzZXJ2ZXIubmV4dChyZXN1bHQpOyB9KTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc1ZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICghWydEYXRhYmFzZUNsb3NlZEVycm9yJywgJ0Fib3J0RXJyb3InXS5pbmNsdWRlcyhlcnIgPT09IG51bGwgfHwgZXJyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlcnIubmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2xvc2VkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWNJbkdsb2JhbENvbnRleHQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvciAmJiBvYnNlcnZlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2V0VGltZW91dChkb1F1ZXJ5LCAwKTtcbiAgICAgICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgICAgIH0pO1xuICAgICAgICBvYnNlcnZhYmxlLmhhc1ZhbHVlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaGFzVmFsdWU7IH07XG4gICAgICAgIG9ic2VydmFibGUuZ2V0VmFsdWUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBjdXJyZW50VmFsdWU7IH07XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH1cblxuICAgIHZhciBEZXhpZSA9IERleGllJDE7XG4gICAgcHJvcHMoRGV4aWUsIF9fYXNzaWduKF9fYXNzaWduKHt9LCBmdWxsTmFtZUV4Y2VwdGlvbnMpLCB7XG4gICAgICAgIGRlbGV0ZTogZnVuY3Rpb24gKGRhdGFiYXNlTmFtZSkge1xuICAgICAgICAgICAgdmFyIGRiID0gbmV3IERleGllKGRhdGFiYXNlTmFtZSwgeyBhZGRvbnM6IFtdIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRiLmRlbGV0ZSgpO1xuICAgICAgICB9LFxuICAgICAgICBleGlzdHM6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERleGllKG5hbWUsIHsgYWRkb25zOiBbXSB9KS5vcGVuKCkudGhlbihmdW5jdGlvbiAoZGIpIHtcbiAgICAgICAgICAgICAgICBkYi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSkuY2F0Y2goJ05vU3VjaERhdGFiYXNlRXJyb3InLCBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldERhdGFiYXNlTmFtZXM6IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RGF0YWJhc2VOYW1lcyhEZXhpZS5kZXBlbmRlbmNpZXMpLnRoZW4oY2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdGlvbihuZXcgZXhjZXB0aW9ucy5NaXNzaW5nQVBJKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkZWZpbmVDbGFzczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZnVuY3Rpb24gQ2xhc3MoY29udGVudCkge1xuICAgICAgICAgICAgICAgIGV4dGVuZCh0aGlzLCBjb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBDbGFzcztcbiAgICAgICAgfSwgaWdub3JlVHJhbnNhY3Rpb246IGZ1bmN0aW9uIChzY29wZUZ1bmMpIHtcbiAgICAgICAgICAgIHJldHVybiBQU0QudHJhbnMgP1xuICAgICAgICAgICAgICAgIHVzZVBTRChQU0QudHJhbnNsZXNzLCBzY29wZUZ1bmMpIDpcbiAgICAgICAgICAgICAgICBzY29wZUZ1bmMoKTtcbiAgICAgICAgfSwgdmlwOiB2aXAsIGFzeW5jOiBmdW5jdGlvbiAoZ2VuZXJhdG9yRm4pIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJ2ID0gYXdhaXRJdGVyYXRvcihnZW5lcmF0b3JGbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFydiB8fCB0eXBlb2YgcnYudGhlbiAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBEZXhpZVByb21pc2UucmVzb2x2ZShydik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBydjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdGlvbihlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LCBzcGF3bjogZnVuY3Rpb24gKGdlbmVyYXRvckZuLCBhcmdzLCB0aGl6KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciBydiA9IGF3YWl0SXRlcmF0b3IoZ2VuZXJhdG9yRm4uYXBwbHkodGhpeiwgYXJncyB8fCBbXSkpO1xuICAgICAgICAgICAgICAgIGlmICghcnYgfHwgdHlwZW9mIHJ2LnRoZW4gIT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBEZXhpZVByb21pc2UucmVzb2x2ZShydik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJ2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjdXJyZW50VHJhbnNhY3Rpb246IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gUFNELnRyYW5zIHx8IG51bGw7IH1cbiAgICAgICAgfSwgd2FpdEZvcjogZnVuY3Rpb24gKHByb21pc2VPckZ1bmN0aW9uLCBvcHRpb25hbFRpbWVvdXQpIHtcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gRGV4aWVQcm9taXNlLnJlc29sdmUodHlwZW9mIHByb21pc2VPckZ1bmN0aW9uID09PSAnZnVuY3Rpb24nID9cbiAgICAgICAgICAgICAgICBEZXhpZS5pZ25vcmVUcmFuc2FjdGlvbihwcm9taXNlT3JGdW5jdGlvbikgOlxuICAgICAgICAgICAgICAgIHByb21pc2VPckZ1bmN0aW9uKVxuICAgICAgICAgICAgICAgIC50aW1lb3V0KG9wdGlvbmFsVGltZW91dCB8fCA2MDAwMCk7XG4gICAgICAgICAgICByZXR1cm4gUFNELnRyYW5zID9cbiAgICAgICAgICAgICAgICBQU0QudHJhbnMud2FpdEZvcihwcm9taXNlKSA6XG4gICAgICAgICAgICAgICAgcHJvbWlzZTtcbiAgICAgICAgfSxcbiAgICAgICAgUHJvbWlzZTogRGV4aWVQcm9taXNlLFxuICAgICAgICBkZWJ1Zzoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkZWJ1ZzsgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2V0RGVidWcodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkZXJpdmU6IGRlcml2ZSwgZXh0ZW5kOiBleHRlbmQsIHByb3BzOiBwcm9wcywgb3ZlcnJpZGU6IG92ZXJyaWRlLFxuICAgICAgICBFdmVudHM6IEV2ZW50cywgb246IGdsb2JhbEV2ZW50cywgbGl2ZVF1ZXJ5OiBsaXZlUXVlcnksIGV4dGVuZE9ic2VydmFiaWxpdHlTZXQ6IGV4dGVuZE9ic2VydmFiaWxpdHlTZXQsXG4gICAgICAgIGdldEJ5S2V5UGF0aDogZ2V0QnlLZXlQYXRoLCBzZXRCeUtleVBhdGg6IHNldEJ5S2V5UGF0aCwgZGVsQnlLZXlQYXRoOiBkZWxCeUtleVBhdGgsIHNoYWxsb3dDbG9uZTogc2hhbGxvd0Nsb25lLCBkZWVwQ2xvbmU6IGRlZXBDbG9uZSwgZ2V0T2JqZWN0RGlmZjogZ2V0T2JqZWN0RGlmZiwgY21wOiBjbXAsIGFzYXA6IGFzYXAkMSxcbiAgICAgICAgbWluS2V5OiBtaW5LZXksXG4gICAgICAgIGFkZG9uczogW10sXG4gICAgICAgIGNvbm5lY3Rpb25zOiBjb25uZWN0aW9ucyxcbiAgICAgICAgZXJybmFtZXM6IGVycm5hbWVzLFxuICAgICAgICBkZXBlbmRlbmNpZXM6IGRvbURlcHMsIGNhY2hlOiBjYWNoZSxcbiAgICAgICAgc2VtVmVyOiBERVhJRV9WRVJTSU9OLCB2ZXJzaW9uOiBERVhJRV9WRVJTSU9OLnNwbGl0KCcuJylcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKG4pIHsgcmV0dXJuIHBhcnNlSW50KG4pOyB9KVxuICAgICAgICAgICAgLnJlZHVjZShmdW5jdGlvbiAocCwgYywgaSkgeyByZXR1cm4gcCArIChjIC8gTWF0aC5wb3coMTAsIGkgKiAyKSk7IH0pIH0pKTtcbiAgICBEZXhpZS5tYXhLZXkgPSBnZXRNYXhLZXkoRGV4aWUuZGVwZW5kZW5jaWVzLklEQktleVJhbmdlKTtcblxuICAgIGlmICh0eXBlb2YgZGlzcGF0Y2hFdmVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGFkZEV2ZW50TGlzdGVuZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGdsb2JhbEV2ZW50cyhERVhJRV9TVE9SQUdFX01VVEFURURfRVZFTlRfTkFNRSwgZnVuY3Rpb24gKHVwZGF0ZWRQYXJ0cykge1xuICAgICAgICAgICAgaWYgKCFwcm9wYWdhdGluZ0xvY2FsbHkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRfMTtcbiAgICAgICAgICAgICAgICBldmVudF8xID0gbmV3IEN1c3RvbUV2ZW50KFNUT1JBR0VfTVVUQVRFRF9ET01fRVZFTlRfTkFNRSwge1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHVwZGF0ZWRQYXJ0c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHByb3BhZ2F0aW5nTG9jYWxseSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2hFdmVudChldmVudF8xKTtcbiAgICAgICAgICAgICAgICBwcm9wYWdhdGluZ0xvY2FsbHkgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoU1RPUkFHRV9NVVRBVEVEX0RPTV9FVkVOVF9OQU1FLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBkZXRhaWwgPSBfYS5kZXRhaWw7XG4gICAgICAgICAgICBpZiAoIXByb3BhZ2F0aW5nTG9jYWxseSkge1xuICAgICAgICAgICAgICAgIHByb3BhZ2F0ZUxvY2FsbHkoZGV0YWlsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHByb3BhZ2F0ZUxvY2FsbHkodXBkYXRlUGFydHMpIHtcbiAgICAgICAgdmFyIHdhc01lID0gcHJvcGFnYXRpbmdMb2NhbGx5O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcHJvcGFnYXRpbmdMb2NhbGx5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGdsb2JhbEV2ZW50cy5zdG9yYWdlbXV0YXRlZC5maXJlKHVwZGF0ZVBhcnRzKTtcbiAgICAgICAgICAgIHNpZ25hbFN1YnNjcmliZXJzTm93KHVwZGF0ZVBhcnRzLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHByb3BhZ2F0aW5nTG9jYWxseSA9IHdhc01lO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBwcm9wYWdhdGluZ0xvY2FsbHkgPSBmYWxzZTtcblxuICAgIHZhciBiYztcbiAgICB2YXIgY3JlYXRlQkMgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgaWYgKHR5cGVvZiBCcm9hZGNhc3RDaGFubmVsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjcmVhdGVCQyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJjID0gbmV3IEJyb2FkY2FzdENoYW5uZWwoU1RPUkFHRV9NVVRBVEVEX0RPTV9FVkVOVF9OQU1FKTtcbiAgICAgICAgICAgIGJjLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldikgeyByZXR1cm4gZXYuZGF0YSAmJiBwcm9wYWdhdGVMb2NhbGx5KGV2LmRhdGEpOyB9O1xuICAgICAgICB9O1xuICAgICAgICBjcmVhdGVCQygpO1xuICAgICAgICBpZiAodHlwZW9mIGJjLnVucmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBiYy51bnJlZigpO1xuICAgICAgICB9XG4gICAgICAgIGdsb2JhbEV2ZW50cyhERVhJRV9TVE9SQUdFX01VVEFURURfRVZFTlRfTkFNRSwgZnVuY3Rpb24gKGNoYW5nZWRQYXJ0cykge1xuICAgICAgICAgICAgaWYgKCFwcm9wYWdhdGluZ0xvY2FsbHkpIHtcbiAgICAgICAgICAgICAgICBiYy5wb3N0TWVzc2FnZShjaGFuZ2VkUGFydHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGFkZEV2ZW50TGlzdGVuZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoJ3BhZ2VoaWRlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIURleGllJDEuZGlzYWJsZUJmQ2FjaGUgJiYgZXZlbnQucGVyc2lzdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlYnVnKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdEZXhpZTogaGFuZGxpbmcgcGVyc2lzdGVkIHBhZ2VoaWRlJyk7XG4gICAgICAgICAgICAgICAgYmMgPT09IG51bGwgfHwgYmMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJjLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBjb25uZWN0aW9uc18xID0gY29ubmVjdGlvbnM7IF9pIDwgY29ubmVjdGlvbnNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRiID0gY29ubmVjdGlvbnNfMVtfaV07XG4gICAgICAgICAgICAgICAgICAgIGRiLmNsb3NlKHsgZGlzYWJsZUF1dG9PcGVuOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBhZGRFdmVudExpc3RlbmVyKCdwYWdlc2hvdycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKCFEZXhpZSQxLmRpc2FibGVCZkNhY2hlICYmIGV2ZW50LnBlcnNpc3RlZCkge1xuICAgICAgICAgICAgICAgIGlmIChkZWJ1ZylcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZygnRGV4aWU6IGhhbmRsaW5nIHBlcnNpc3RlZCBwYWdlc2hvdycpO1xuICAgICAgICAgICAgICAgIGNyZWF0ZUJDKCk7XG4gICAgICAgICAgICAgICAgcHJvcGFnYXRlTG9jYWxseSh7IGFsbDogbmV3IFJhbmdlU2V0KC1JbmZpbml0eSwgW1tdXSkgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BNb2RpZmljYXRpb24oeyBhZGQ6IHZhbHVlIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BNb2RpZmljYXRpb24oeyByZW1vdmU6IHZhbHVlIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcGxhY2VQcmVmaXgoYSwgYikge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BNb2RpZmljYXRpb24oeyByZXBsYWNlUHJlZml4OiBbYSwgYl0gfSk7XG4gICAgfVxuXG4gICAgRGV4aWVQcm9taXNlLnJlamVjdGlvbk1hcHBlciA9IG1hcEVycm9yO1xuICAgIHNldERlYnVnKGRlYnVnKTtcblxuICAgIHZhciBuYW1lZEV4cG9ydHMgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAgICAgRGV4aWU6IERleGllJDEsXG4gICAgICAgIGxpdmVRdWVyeTogbGl2ZVF1ZXJ5LFxuICAgICAgICBFbnRpdHk6IEVudGl0eSxcbiAgICAgICAgY21wOiBjbXAsXG4gICAgICAgIFByb3BNb2RpZmljYXRpb246IFByb3BNb2RpZmljYXRpb24sXG4gICAgICAgIHJlcGxhY2VQcmVmaXg6IHJlcGxhY2VQcmVmaXgsXG4gICAgICAgIGFkZDogYWRkLFxuICAgICAgICByZW1vdmU6IHJlbW92ZSxcbiAgICAgICAgJ2RlZmF1bHQnOiBEZXhpZSQxLFxuICAgICAgICBSYW5nZVNldDogUmFuZ2VTZXQsXG4gICAgICAgIG1lcmdlUmFuZ2VzOiBtZXJnZVJhbmdlcyxcbiAgICAgICAgcmFuZ2VzT3ZlcmxhcDogcmFuZ2VzT3ZlcmxhcFxuICAgIH0pO1xuXG4gICAgX19hc3NpZ24oRGV4aWUkMSwgbmFtZWRFeHBvcnRzLCB7IGRlZmF1bHQ6IERleGllJDEgfSk7XG5cbiAgICByZXR1cm4gRGV4aWUkMTtcblxufSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGV4aWUuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kYiA9IHZvaWQgMDtcbmNvbnN0IGRleGllXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImRleGllXCIpKTtcbi8vIFJlbmFtZSBkYXRhYmFzZSBmb3IgY2xhcml0eSAoZS5nLiwgZnJvbSBcIkZyaWVuZHNEYXRhYmFzZVwiKVxuY29uc3QgbG9jYWxEYiA9IG5ldyBkZXhpZV8xLmRlZmF1bHQoXCJNb2trdUNvbm5lY3RvckRCXCIpO1xuLy8gU2NoZW1hIGRlY2xhcmF0aW9uOlxubG9jYWxEYi52ZXJzaW9uKDEpLnN0b3Jlcyh7XG4gICAgLy8gJ2xvY2FsSWQnIGlzIHRoZSBhdXRvLWluY3JlbWVudGluZyBwcmltYXJ5IGtleS5cbiAgICAvLyAnW3VybCtkeW5hbWljS2V5K21ldGhvZF0nIGZvciBzcGVjaWZpYyBtb2NrIGxvb2t1cHMuXG4gICAgLy8gJ2R5bmFtaWNLZXknIGFzIGEgc2ltcGxlIGluZGV4IGZvciBxdWVyaWVzIGxpa2Ugd2hlcmUoeyBkeW5hbWljOiB0cnVlIH0pLlxuICAgIG1vY2tzOiBcIisrbG9jYWxJZCwgW3VybCtkeW5hbWljS2V5K21ldGhvZF0sIGR5bmFtaWNLZXlcIixcbn0pO1xuY29uc3QgZ2V0RHluYW1pY1VybFBhdHRlcm5zID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc3QgYWN0aXZlRHluYW1pY01vY2tzID0geWllbGQgbG9jYWxEYi5tb2Nrc1xuICAgICAgICAud2hlcmUoeyBkeW5hbWljS2V5OiAxIH0pIC8vIFVzZXMgdGhlICdkeW5hbWljJyBpbmRleFxuICAgICAgICAvLyAuZmlsdGVyKChtb2NrKSA9PiBtb2NrLmFjdGl2ZSA9PT0gdHJ1ZSkgLy8gRW5zdXJlIG9ubHkgYWN0aXZlIG1vY2tzIGFyZSBjb25zaWRlcmVkXG4gICAgICAgIC50b0FycmF5KCk7XG4gICAgcmV0dXJuIGFjdGl2ZUR5bmFtaWNNb2Nrcy5tYXAoKG1vY2spID0+ICh7XG4gICAgICAgIGxvY2FsSWQ6IG1vY2subG9jYWxJZCxcbiAgICAgICAgdXJsUGF0dGVybjogbW9jay51cmwsXG4gICAgfSkpO1xufSk7XG5jb25zdCBmaW5kU3RhdGljTW9jayA9ICh1cmwsIG1ldGhvZCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgLy8gRmluZCBhY3RpdmUsIG5vbi1keW5hbWljIG1vY2tzIG1hdGNoaW5nIHRoZSBVUkwuXG4gICAgLy8gVGhpcyBxdWVyeSB1c2VzIHRoZSBbdXJsK2R5bmFtaWNdIGNvbXBvdW5kIGluZGV4LlxuICAgIHJldHVybiAobG9jYWxEYi5tb2Nrc1xuICAgICAgICAud2hlcmUoeyB1cmwsIGR5bmFtaWNLZXk6IDAsIG1ldGhvZCB9KVxuICAgICAgICAvLyAuZmlsdGVyKChtb2NrKSA9PiBtb2NrLmFjdGl2ZSA9PT0gdHJ1ZSkgLy8gRW5zdXJlIG9ubHkgYWN0aXZlIG1vY2tzIGFyZSBjb25zaWRlcmVkXG4gICAgICAgIC5maXJzdCgpKTtcbn0pO1xuY29uc3QgZ2V0QWxsTW9ja3MgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICByZXR1cm4gbG9jYWxEYi5tb2Nrcy50b0FycmF5KCk7XG59KTtcbmNvbnN0IGZpbmRNb2NrQnlJZCA9IChsb2NhbElkKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICByZXR1cm4gbG9jYWxEYi5tb2Nrcy5nZXQobG9jYWxJZCk7XG59KTtcbmNvbnN0IGFkZE1vY2sgPSAobW9ja0RhdGEpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGNvbnN0IHN0b3JlZE1vY2sgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1vY2tEYXRhKSwgeyBkeW5hbWljS2V5OiBtb2NrRGF0YS5keW5hbWljID8gMSA6IDAgfSk7XG4gICAgcmV0dXJuIGxvY2FsRGIubW9ja3MuYWRkKHN0b3JlZE1vY2spO1xufSk7XG5leHBvcnRzLmRiID0ge1xuICAgIGdldER5bmFtaWNVcmxQYXR0ZXJucyxcbiAgICBmaW5kU3RhdGljTW9jayxcbiAgICBmaW5kTW9ja0J5SWQsXG4gICAgYWRkTW9jayxcbiAgICBnZXRBbGxNb2Nrcyxcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZGJfMSA9IHJlcXVpcmUoXCIuL2RiXCIpO1xubGV0IGR5bmFtaWNVcmxQYXR0ZXJucyA9IFtdO1xuZnVuY3Rpb24gaW5pdGlhbGl6ZUR5bmFtaWNVcmxzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkeW5hbWljVXJsUGF0dGVybnMgPSB5aWVsZCBkYl8xLmRiLmdldER5bmFtaWNVcmxQYXR0ZXJucygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJNb2trdTogRHluYW1pYyBVUkwgcGF0dGVybnMgbG9hZGVkOlwiLCBkeW5hbWljVXJsUGF0dGVybnMubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNb2trdTogRXJyb3IgbG9hZGluZyBkeW5hbWljIFVSTCBwYXR0ZXJuczpcIiwgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyBJbml0aWFsaXplIG9uIHNlcnZpY2Ugd29ya2VyIHN0YXJ0dXBcbmNocm9tZS5ydW50aW1lLm9uU3RhcnR1cC5hZGRMaXN0ZW5lcigoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJNb2trdTogU2VydmljZSB3b3JrZXIgc3RhcnRlZCBvbiBicm93c2VyIHN0YXJ0dXAuXCIpO1xuICAgIGluaXRpYWxpemVEeW5hbWljVXJscygpO1xufSk7XG4vLyBBbHNvIGluaXRpYWxpemUgd2hlbiB0aGUgZXh0ZW5zaW9uIGlzIGluc3RhbGxlZCBvciB1cGRhdGVkXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJNb2trdTogRXh0ZW5zaW9uIGluc3RhbGxlZC91cGRhdGVkLlwiKTtcbiAgICBpbml0aWFsaXplRHluYW1pY1VybHMoKTtcbn0pO1xuZnVuY3Rpb24gZmluZE1hdGNoaW5nRHluYW1pY1VybCh1cmwsIG1ldGhvZCkge1xuICAgIC8vIFRoaXMgaXMgYSB2ZXJ5IGJhc2ljIG1hdGNoZXIuXG4gICAgLy8gRm9yIG1vcmUgY29tcGxleCBwYXR0ZXJucyAoZS5nLiwgL3VzZXJzLzppZCksIHlvdSdkIG5lZWQgYSByb2J1c3QgcGF0aC10by1yZWdleHAgbGlrZSBsaWJyYXJ5LlxuICAgIHJldHVybiBkeW5hbWljVXJsUGF0dGVybnMuZmluZCgoZW50cnkpID0+IHtcbiAgICAgICAgLy8gU2ltcGxlIGV4YWN0IG1hdGNoIGZvciBub3csIG9yIGltcGxlbWVudCB5b3VyIHBhdHRlcm4gbWF0Y2hpbmcgbG9naWMgaGVyZVxuICAgICAgICAvLyBFeGFtcGxlIGZvciB3aWxkY2FyZDogZW50cnkudXJsUGF0dGVybi5yZXBsYWNlKCcqJywgJy4qJykgYW5kIHVzZSByZWdleFxuICAgICAgICByZXR1cm4gZW50cnkudXJsUGF0dGVybiA9PT0gdXJsO1xuICAgIH0pO1xufVxuY2hyb21lLnJ1bnRpbWUub25Db25uZWN0LmFkZExpc3RlbmVyKChwb3J0KSA9PiB7XG4gICAgaWYgKHBvcnQubmFtZSA9PT0gXCJtb2trdS1jb250ZW50LXNjcmlwdFwiKSB7XG4gICAgICAgIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKChkYXRhKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09IFwiQ0hFQ0tfTU9DS1wiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcbiAgICAgICAgICAgICAgICBsZXQgbW9jayA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAvLyAxLiBjaGVjayBmb3Igc3RhdGljXG4gICAgICAgICAgICAgICAgbW9jayA9IHlpZWxkIGRiXzEuZGIuZmluZFN0YXRpY01vY2sobWVzc2FnZS5yZXF1ZXN0LnVybCwgbWVzc2FnZS5yZXF1ZXN0Lm1ldGhvZCk7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgd2l0aCBwYXRobmFtZVxuICAgICAgICAgICAgICAgIGlmICghbW9jaykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXRobmFtZSA9IG5ldyBVUkwobWVzc2FnZS5yZXF1ZXN0LnVybCkucGF0aG5hbWU7XG4gICAgICAgICAgICAgICAgICAgIG1vY2sgPSB5aWVsZCBkYl8xLmRiLmZpbmRTdGF0aWNNb2NrKHBhdGhuYW1lLCBtZXNzYWdlLnJlcXVlc3QubWV0aG9kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFtb2NrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHdpdGggZHluYW1pYyBtb2Nrc1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkeW5hbWljTWF0Y2ggPSBmaW5kTWF0Y2hpbmdEeW5hbWljVXJsKG1lc3NhZ2UucmVxdWVzdC51cmwsIG1lc3NhZ2UucmVxdWVzdC5tZXRob2QpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZHluYW1pY01hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2NrID0geWllbGQgZGJfMS5kYi5maW5kTW9ja0J5SWQoZHluYW1pY01hdGNoLmxvY2FsSWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibW9ja1wiLCBtb2NrKTtcbiAgICAgICAgICAgICAgICBpZiAobW9jaykge1xuICAgICAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vY2tSZXNwb25zZTogbW9jayxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBkYXRhLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdDogbWVzc2FnZS5yZXF1ZXN0LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdG9kbzogaW5mb3JtIHRoZSBwYW5lbFxuICAgICAgICAgICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vY2tSZXNwb25zZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBkYXRhLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdDogbWVzc2FnZS5yZXF1ZXN0LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9XG59KTtcbmNvbnNvbGUubG9nKGRiXzEuZGIuZ2V0QWxsTW9ja3MoKS50aGVuKGNvbnNvbGUubG9nKS5jYXRjaChjb25zb2xlLmxvZykpO1xuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlRXh0ZXJuYWwuYWRkTGlzdGVuZXIoKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJSZWNlaXZlZCBtZXNzYWdlIGZyb206XCIsIHNlbmRlci51cmwpO1xuICAgIGNvbnNvbGUubG9nKFwiTWVzc2FnZTpcIiwgcmVxdWVzdCk7XG4gICAgaWYgKHJlcXVlc3QudHlwZSA9PT0gXCJORVdfTU9DS1wiKSB7XG4gICAgICAgIGRiXzEuZGIuYWRkTW9jayhyZXF1ZXN0LmRhdGEpO1xuICAgIH1cbiAgICAvLyBDaGVjayB0aGUgbWVzc2FnZSBjb250ZW50IGFuZCBwZXJmb3JtIGFjdGlvbnNcbiAgICBpZiAocmVxdWVzdC5ncmVldGluZyA9PT0gXCJIZWxsbyBmcm9tIHRoZSB3ZWJzaXRlIVwiKSB7XG4gICAgICAgIC8vIFNlbmQgYSByZXNwb25zZSBiYWNrIHRvIHRoZSB3ZWJzaXRlXG4gICAgICAgIHNlbmRSZXNwb25zZSh7IGZhcmV3ZWxsOiBcIkdvb2RieWUgZnJvbSB0aGUgZXh0ZW5zaW9uIVwiIH0pO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gdHJ1ZSB0byBpbmRpY2F0ZSB0aGF0IHlvdSB3aWxsIGJlIHNlbmRpbmcgYSByZXNwb25zZSBhc3luY2hyb25vdXNseS5cbiAgICAvLyBUaGlzIGlzIGltcG9ydGFudCBpZiB5b3UgbmVlZCB0byBkbyBzb21lIHdvcmsgYmVmb3JlIHNlbmRpbmcgdGhlIHJlc3BvbnNlLlxuICAgIHJldHVybiB0cnVlO1xufSk7XG4iLCIvLyBNYWtpbmcgdGhlIG1vZHVsZSB2ZXJzaW9uIGNvbnN1bWFibGUgdmlhIHJlcXVpcmUgLSB0byBwcm9oaWJpdFxuLy8gbXVsdGlwbGUgb2NjdXJyYW5jaWVzIG9mIHRoZSBzYW1lIG1vZHVsZSBpbiB0aGUgc2FtZSBhcHBcbi8vIChkdWFsIHBhY2thZ2UgaGF6YXJkLCBodHRwczovL25vZGVqcy5vcmcvYXBpL3BhY2thZ2VzLmh0bWwjZHVhbC1wYWNrYWdlLWhhemFyZClcbmltcG9ydCBfRGV4aWUgZnJvbSBcIi4vZGlzdC9kZXhpZS5qc1wiO1xuY29uc3QgRGV4aWVTeW1ib2wgPSBTeW1ib2wuZm9yKFwiRGV4aWVcIik7XG5jb25zdCBEZXhpZSA9IGdsb2JhbFRoaXNbRGV4aWVTeW1ib2xdIHx8IChnbG9iYWxUaGlzW0RleGllU3ltYm9sXSA9IF9EZXhpZSk7XG5pZiAoX0RleGllLnNlbVZlciAhPT0gRGV4aWUuc2VtVmVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUd28gZGlmZmVyZW50IHZlcnNpb25zIG9mIERleGllIGxvYWRlZCBpbiB0aGUgc2FtZSBhcHA6ICR7X0RleGllLnNlbVZlcn0gYW5kICR7RGV4aWUuc2VtVmVyfWApO1xufVxuY29uc3QgeyBsaXZlUXVlcnksIG1lcmdlUmFuZ2VzLCByYW5nZXNPdmVybGFwLCBSYW5nZVNldCwgY21wLCBFbnRpdHksXG4gICAgUHJvcE1vZGlmaWNhdGlvbiwgcmVwbGFjZVByZWZpeCwgYWRkLCByZW1vdmUgfSA9IERleGllO1xuZXhwb3J0IHsgbGl2ZVF1ZXJ5LCBtZXJnZVJhbmdlcywgcmFuZ2VzT3ZlcmxhcCwgUmFuZ2VTZXQsIGNtcCwgRGV4aWUsIEVudGl0eSxcbiAgICBQcm9wTW9kaWZpY2F0aW9uLCByZXBsYWNlUHJlZml4LCBhZGQsIHJlbW92ZSB9O1xuZXhwb3J0IGRlZmF1bHQgRGV4aWU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5yZXF1aXJlKFwiLi9tb2trdS13ZWItYXBwLWNvbm5lY3Rvci9zZXJ2aWNlLXdvcmtlclwiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==