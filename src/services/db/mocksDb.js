"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mocksDb = void 0;
var _1 = require("./");
var getDynamicUrlPatterns = function () { return __awaiter(void 0, void 0, void 0, function () {
    var activeDynamicMocks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _1.localDb.mocks
                    .where({ dynamicKey: 1 }) // Uses the 'dynamic' index
                    // .filter((mock) => mock.active === true) // Ensure only active mocks are considered
                    .toArray()];
            case 1:
                activeDynamicMocks = _a.sent();
                return [2 /*return*/, activeDynamicMocks.map(function (mock) { return ({
                        localId: mock.localId,
                        urlPattern: mock.url,
                    }); })];
        }
    });
}); };
var getSortedMockByActive = function (mocks) {
    return mocks.sort(function (a, b) { return (b.active ? 1 : 0) - (a.active ? 1 : 0); });
};
var findGraphQLMocks = function (_a) {
    var url = _a.url, operationName = _a.operationName;
    return __awaiter(void 0, void 0, void 0, function () {
        var mocks;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, _1.localDb.mocks.where({ url: url, operationName: operationName }).toArray()];
                case 1:
                    mocks = _b.sent();
                    return [2 /*return*/, getSortedMockByActive(mocks)];
            }
        });
    });
};
var findStaticMocks = function (url, method) { return __awaiter(void 0, void 0, void 0, function () {
    var mocks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _1.localDb.mocks
                    .where({ url: url, dynamicKey: 0, method: method })
                    .toArray()];
            case 1:
                mocks = _a.sent();
                return [2 /*return*/, getSortedMockByActive(mocks)];
        }
    });
}); };
var getAllMocks = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, _1.localDb.mocks.toArray()];
    });
}); };
var findMockById = function (localId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, _1.localDb.mocks.get(localId)];
    });
}); };
var addMock = function (mockData) { return __awaiter(void 0, void 0, void 0, function () {
    var storedMock;
    return __generator(this, function (_a) {
        storedMock = __assign(__assign({}, mockData), { dynamicKey: mockData.dynamic ? 1 : 0, activeKey: mockData.active ? 1 : 0 });
        return [2 /*return*/, _1.localDb.mocks.add(storedMock)];
    });
}); };
var _deleteAll = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _1.localDb.mocks.clear()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.mocksDb = {
    getDynamicUrlPatterns: getDynamicUrlPatterns,
    findStaticMocks: findStaticMocks,
    findMockById: findMockById,
    addMock: addMock,
    getAllMocks: getAllMocks,
    findGraphQLMocks: findGraphQLMocks,
    _deleteAll: _deleteAll,
};
