/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.contentScriptV2 = void 0;
const injectToDom_1 = __importDefault(__webpack_require__(/*! ../contentScript/injectToDom */ "./src/contentScript/injectToDom.ts"));
const service_1 = __webpack_require__(/*! ../panel/App/service */ "./src/panel/App/service/index.ts");
console.log("Content Script v2");
const contentScriptV2 = () => {
    const init = () => {
        var port = chrome.runtime.connect({ name: "mokku-content-script" });
        port.onMessage.addListener((message) => { });
        service_1.messageService.listen("CONTENT", (data) => {
            if (data.type === "LOG") {
                const message = data.message;
                console.log("Sending to panel");
                service_1.messageService.send({
                    message,
                    type: "LOG",
                    from: "CONTENT",
                    to: "PANEL",
                    extensionName: "MOKKU",
                });
                console.log("Sending to service worker");
                port.postMessage(data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsdURBQXVELEtBQUs7QUFDNUQscURBQXFELEtBQUs7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL01va2t1Ly4vc3JjL2NvbnRlbnRTY3JpcHQvaW5qZWN0VG9Eb20udHMiLCJ3ZWJwYWNrOi8vTW9ra3UvLi9zcmMvbW9ra3Utd2ViLWFwcC1jb25uZWN0b3IvY29udGVudFNjcmlwdFYyLnRzIiwid2VicGFjazovL01va2t1Ly4vc3JjL3BhbmVsL0FwcC9zZXJ2aWNlL2luZGV4LnRzIiwid2VicGFjazovL01va2t1Ly4vc3JjL3BhbmVsL0FwcC9zZXJ2aWNlL21lc3NhZ2VTZXJ2aWNlLnRzIiwid2VicGFjazovL01va2t1L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL01va2t1Ly4vc3JjL2NvbnRlbnRfc2NyaXB0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaW5qZWN0ID0gKCkgPT4ge1xuICAgIC8vIEluamVjdCBTY3JpcHQgdG8gdXNlcidzIERPTVxuICAgIGNvbnN0IHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgIHMuc3JjID0gY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKFwianMvaW5qZWN0LmpzXCIpO1xuICAgIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuYXBwZW5kQ2hpbGQocyk7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gaW5qZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbnRlbnRTY3JpcHRWMiA9IHZvaWQgMDtcbmNvbnN0IGluamVjdFRvRG9tXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2NvbnRlbnRTY3JpcHQvaW5qZWN0VG9Eb21cIikpO1xuY29uc3Qgc2VydmljZV8xID0gcmVxdWlyZShcIi4uL3BhbmVsL0FwcC9zZXJ2aWNlXCIpO1xuY29uc29sZS5sb2coXCJDb250ZW50IFNjcmlwdCB2MlwiKTtcbmNvbnN0IGNvbnRlbnRTY3JpcHRWMiA9ICgpID0+IHtcbiAgICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgICAgICB2YXIgcG9ydCA9IGNocm9tZS5ydW50aW1lLmNvbm5lY3QoeyBuYW1lOiBcIm1va2t1LWNvbnRlbnQtc2NyaXB0XCIgfSk7XG4gICAgICAgIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlKSA9PiB7IH0pO1xuICAgICAgICBzZXJ2aWNlXzEubWVzc2FnZVNlcnZpY2UubGlzdGVuKFwiQ09OVEVOVFwiLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gXCJMT0dcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZW5kaW5nIHRvIHBhbmVsXCIpO1xuICAgICAgICAgICAgICAgIHNlcnZpY2VfMS5tZXNzYWdlU2VydmljZS5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJMT0dcIixcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogXCJDT05URU5UXCIsXG4gICAgICAgICAgICAgICAgICAgIHRvOiBcIlBBTkVMXCIsXG4gICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbk5hbWU6IFwiTU9LS1VcIixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlbmRpbmcgdG8gc2VydmljZSB3b3JrZXJcIik7XG4gICAgICAgICAgICAgICAgcG9ydC5wb3N0TWVzc2FnZShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBjb25zdCBob3N0ID0gbG9jYXRpb24uaG9zdDtcbiAgICBjb25zdCBpc0xvY2FsaG9zdCA9IGxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoXCJodHRwOi8vbG9jYWxob3N0XCIpO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbYG1va2t1LmV4dGVuc2lvbi5hY3RpdmUuJHtob3N0fWBdLCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIGxldCBhY3RpdmUgPSByZXN1bHRbYG1va2t1LmV4dGVuc2lvbi5hY3RpdmUuJHtob3N0fWBdO1xuICAgICAgICBpZiAoaXNMb2NhbGhvc3QgJiYgYWN0aXZlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgICAgLy8gaW5qZWN0cyBzY3JpcHQgdG8gcGFnZSdzIERPTVxuICAgICAgICAgICAgKDAsIGluamVjdFRvRG9tXzEuZGVmYXVsdCkoKTtcbiAgICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0ZWxsIHRoZSBwYW5lbCBhYm91dCB0aGUgbmV3IGluamVjdGlvbiAoaG9zdCBtaWdodCBoYXZlIGNoYW5nZWQpXG4gICAgICAgIHNlcnZpY2VfMS5tZXNzYWdlU2VydmljZS5zZW5kKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGhvc3QsXG4gICAgICAgICAgICB0eXBlOiBcIklOSVRcIixcbiAgICAgICAgICAgIGZyb206IFwiQ09OVEVOVFwiLFxuICAgICAgICAgICAgdG86IFwiUEFORUxcIixcbiAgICAgICAgICAgIGV4dGVuc2lvbk5hbWU6IFwiTU9LS1VcIixcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuZXhwb3J0cy5jb250ZW50U2NyaXB0VjIgPSBjb250ZW50U2NyaXB0VjI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWVzc2FnZVNlcnZpY2UgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlU2VydmljZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL21lc3NhZ2VTZXJ2aWNlXCIpKTtcbmV4cG9ydHMubWVzc2FnZVNlcnZpY2UgPSBtZXNzYWdlU2VydmljZV8xLmRlZmF1bHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICpcbiAqIEluamVjdFxuICogICAgIC0+IENvbnRlbnQgU2NyaXB0XG4gKlxuICogQ29udGVudCBzY3JpcHQgaXMgYnJpZGdlIGJldHdlZW4gcGFuZWwgYW5kIGluamVjdCBmb3IgY29tbXVuaWNhdGlvblxuICogYXMgaXQgaGFzIGJvdGggd2luZG93cyBldmVudCBsaXN0ZXJuIGFuZCBjaHJvbWUgcnVudGltZSBtZXNzYWdlIGxpc3RuZXJcbiAqIENvbnRlbnQgU2NyaXB0XG4gKiAgICAgLT4gUGFuZWxcbiAqICAgICAtPiBIb29rXG4gKlxuICogUGFuZWxcbiAqICAgICAtPiBDb250ZW50IFNjcmlwdFxuICovXG5jb25zdCB0dW5uZWxNYXAgPSB7XG4gICAgXCJIT09LOkNPTlRFTlRcIjogXCJ3aW5kb3dcIixcbiAgICBcIkNPTlRFTlQ6SE9PS1wiOiBcIndpbmRvd1wiLFxuICAgIFwiQ09OVEVOVDpQQU5FTFwiOiBcInJ1bnRpbWVcIixcbiAgICBcIkNPTlRFTlQ6U0VSVklDRV9XT1JLRVJcIjogXCJydW50aW1lXCIsXG4gICAgXCJQQU5FTDpDT05URU5UXCI6IFwidGFiXCIsXG4gICAgXCJTRVJWSUNFX1dPUktFUjpDT05URU5UXCI6IFwicnVudGltZVwiLFxufTtcbmNvbnN0IHNlbmQgPSAocHJvcHMsIHRhYklkKSA9PiB7XG4gICAgY29uc3QgcGF0aEtleSA9IGAke3Byb3BzLmZyb219OiR7cHJvcHMudG99YDtcbiAgICBjb25zdCBwYXRoID0gdHVubmVsTWFwW3BhdGhLZXldO1xuICAgIGNvbnN0IHNlcnZpY2UgPSB7XG4gICAgICAgIHdpbmRvdzogKCkgPT4gd2luZG93LnBvc3RNZXNzYWdlKHByb3BzLCBcIipcIiksXG4gICAgICAgIHJ1bnRpbWU6ICgpID0+IGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHByb3BzKSxcbiAgICAgICAgdGFiOiAoKSA9PiBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJJZCwgcHJvcHMpLFxuICAgIH07XG4gICAgaWYgKHNlcnZpY2VbcGF0aF0pIHtcbiAgICAgICAgc2VydmljZVtwYXRoXShwcm9wcyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBNb2trdSBNZXNzYWdlU2VydmljZTogTm8gcGF0aCBkZWZpbmVkIGZvciAke3BhdGhLZXl9YCk7XG4gICAgfVxufTtcbmNvbnN0IGxpc3RlbiA9IChlbnRpdHksIGNhbGxiYWNrKSA9PiB7XG4gICAgY29uc3Qgc2VydmljZSA9IHtcbiAgICAgICAgcnVudGltZTogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZnVuYyA9IChtZXNzYWdlLCBfc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS50byAhPT0gZW50aXR5KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobWVzc2FnZSwgX3NlbmRlciwgc2VuZFJlc3BvbnNlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuYyk7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4gY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLnJlbW92ZUxpc3RlbmVyKGZ1bmMpO1xuICAgICAgICB9LFxuICAgICAgICB3aW5kb3c6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZ1bmMgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBXZSBvbmx5IGFjY2VwdCBtZXNzYWdlcyBmcm9tIG91cnNlbHZlc1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgIT09IHdpbmRvdylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnRvICE9PSBlbnRpdHkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZnVuYyk7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmMpO1xuICAgICAgICB9LFxuICAgIH07XG4gICAgc3dpdGNoIChlbnRpdHkpIHtcbiAgICAgICAgY2FzZSBcIkhPT0tcIjoge1xuICAgICAgICAgICAgcmV0dXJuIFtzZXJ2aWNlW1wid2luZG93XCJdKCldO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJDT05URU5UXCI6IHtcbiAgICAgICAgICAgIHJldHVybiBbc2VydmljZVtcIndpbmRvd1wiXSgpLCBzZXJ2aWNlW1wicnVudGltZVwiXSgpXTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiUEFORUxcIjoge1xuICAgICAgICAgICAgcmV0dXJuIFtzZXJ2aWNlW1wicnVudGltZVwiXSgpXTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiU0VSVklDRV9XT1JLRVJcIjoge1xuICAgICAgICAgICAgcmV0dXJuIFtzZXJ2aWNlW1wicnVudGltZVwiXSgpXTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5leHBvcnRzLmRlZmF1bHQgPSB7IHNlbmQsIGxpc3RlbiB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29udGVudFNjcmlwdFYyXzEgPSByZXF1aXJlKFwiLi9tb2trdS13ZWItYXBwLWNvbm5lY3Rvci9jb250ZW50U2NyaXB0VjJcIik7XG4vLyBjb25zdCBpbml0ID0gKCkgPT4ge1xuLy8gICAgIGxldCBzdG9yZSwgdXJsTWFwLCBkeW5hbWljVXJsTWFwOiBJRHluYW1pY1VSTE1hcDtcbi8vICAgICBnZXRTdG9yZSgpLnRoZW4oKGEpID0+IHtcbi8vICAgICAgICAgc3RvcmUgPSBhLnN0b3JlO1xuLy8gICAgICAgICB1cmxNYXAgPSBhLnVybE1hcDtcbi8vICAgICAgICAgZHluYW1pY1VybE1hcCA9IGEuZHluYW1pY1VybE1hcDtcbi8vICAgICB9KTtcbi8vICAgICBjb25zdCBnZXRNb2NrUGF0aCA9ICh1cmw6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcpID0+IHtcbi8vICAgICAgICAgLy8gdGhpcyB3aWxsIG1vdmVkIHRvIHN0b3JlLnRzXG4vLyAgICAgICAgIGlmICh1cmxNYXBbdXJsXSkge1xuLy8gICAgICAgICAgICAgaWYgKHVybE1hcFt1cmxdW21ldGhvZF0pIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gdXJsTWFwW3VybF1bbWV0aG9kXTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgICAgICBjb25zdCB1cmwxID0gdXJsLnJlcGxhY2UoXCI6Ly9cIiwgXCItXCIpO1xuLy8gICAgICAgICBjb25zdCBrZXkgPSB1cmwxLnNwbGl0KFwiL1wiKS5sZW5ndGg7XG4vLyAgICAgICAgIC8vIG1hdGNoIGFsbCBkeW5hbWljcyByb3V0ZVxuLy8gICAgICAgICBjb25zdCBzdGFjayA9IGR5bmFtaWNVcmxNYXBba2V5XTtcbi8vICAgICAgICAgaWYgKCFzdGFjaykgcmV0dXJuIFtdO1xuLy8gICAgICAgICBsZXQgaSA9IDA7XG4vLyAgICAgICAgIHdoaWxlIChpIDwgc3RhY2subGVuZ3RoKSB7XG4vLyAgICAgICAgICAgICAvLyB0aGVyZSBpcyBtb3JlIHRvIGl0IHdpbGwgYmUgdXNlZCB3aGVuXG4vLyAgICAgICAgICAgICAvLyBhY3Rpb24gYXJlIGludHJvZHVjZWRcbi8vICAgICAgICAgICAgIGNvbnN0IHMgPSBzdGFja1tpXTtcbi8vICAgICAgICAgICAgIGlmIChzLm1ldGhvZCA9PT0gbWV0aG9kICYmICEhcy5tYXRjaCh1cmwxKSkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiBbcy5nZXR0ZXJLZXldO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgaSsrO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIHJldHVybiBbXTtcbi8vICAgICB9O1xuLy8gICAgIGNvbnN0IHVwZGF0ZVN0b3JlID0gKCkgPT4ge1xuLy8gICAgICAgICBnZXRTdG9yZSgpLnRoZW4oKHgpID0+IHtcbi8vICAgICAgICAgICAgIHN0b3JlID0geC5zdG9yZTtcbi8vICAgICAgICAgICAgIHVybE1hcCA9IHgudXJsTWFwO1xuLy8gICAgICAgICAgICAgZHluYW1pY1VybE1hcCA9IHguZHluYW1pY1VybE1hcDtcbi8vICAgICAgICAgfSk7XG4vLyAgICAgfTtcbi8vICAgICBjb25zdCBnZXRBY3RpdmVNb2NrV2l0aFBhdGggPSAocGF0aHM6IHN0cmluZ1tdKSA9PiB7XG4vLyAgICAgICAgIGxldCBtb2NrID0gbnVsbDtcbi8vICAgICAgICAgbGV0IHBhdGggPSBudWxsO1xuLy8gICAgICAgICBwYXRocy5zb21lKCh0ZW1wUGF0aCkgPT4ge1xuLy8gICAgICAgICAgICAgY29uc3QgdGVtcE1vY2sgPSBnZXQoc3RvcmUsIHRlbXBQYXRoLCBudWxsKTtcbi8vICAgICAgICAgICAgIGlmICh0ZW1wTW9jay5hY3RpdmUpIHtcbi8vICAgICAgICAgICAgICAgICBtb2NrID0gdGVtcE1vY2s7XG4vLyAgICAgICAgICAgICAgICAgcGF0aCA9IHBhdGg7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICBpZiAobW9jaykge1xuLy8gICAgICAgICAgICAgcmV0dXJuIHsgbW9jaywgcGF0aCB9O1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIHJldHVybiB7IG1vY2s6IG51bGwsIHBhdGg6IG51bGwgfTtcbi8vICAgICB9O1xuLy8gICAgIG1lc3NhZ2VTZXJ2aWNlLmxpc3RlbihcIkNPTlRFTlRcIiwgKGRhdGE6IElFdmVudE1lc3NhZ2UpID0+IHtcbi8vICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gXCJMT0dcIikge1xuLy8gICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGRhdGEubWVzc2FnZSBhcyBJTG9nO1xuLy8gICAgICAgICAgICAgY29uc3QgbW9ja1BhdGhzID0gZ2V0TW9ja1BhdGgoXG4vLyAgICAgICAgICAgICAgICAgbWVzc2FnZS5yZXF1ZXN0LnVybCxcbi8vICAgICAgICAgICAgICAgICBtZXNzYWdlLnJlcXVlc3QubWV0aG9kLFxuLy8gICAgICAgICAgICAgKTtcbi8vICAgICAgICAgICAgIGNvbnN0IHsgbW9jaywgcGF0aCB9ID0gZ2V0QWN0aXZlTW9ja1dpdGhQYXRoKG1vY2tQYXRocyk7XG4vLyAgICAgICAgICAgICBpZiAobW9jaykge1xuLy8gICAgICAgICAgICAgICAgIG1lc3NhZ2UuaXNNb2NrZWQgPSBtb2NrLmFjdGl2ZTtcbi8vICAgICAgICAgICAgICAgICBtZXNzYWdlLm1vY2tQYXRoID0gcGF0aDtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLnNlbmQoe1xuLy8gICAgICAgICAgICAgICAgIG1lc3NhZ2UsXG4vLyAgICAgICAgICAgICAgICAgdHlwZTogXCJMT0dcIixcbi8vICAgICAgICAgICAgICAgICBmcm9tOiBcIkNPTlRFTlRcIixcbi8vICAgICAgICAgICAgICAgICB0bzogXCJQQU5FTFwiLFxuLy8gICAgICAgICAgICAgICAgIGV4dGVuc2lvbk5hbWU6IFwiTU9LS1VcIixcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgICAgcmV0dXJuO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09IFwiTk9USUZJQ0FUSU9OXCIgJiYgZGF0YS5tZXNzYWdlID09PSBcIlVQREFURV9TVE9SRVwiKSB7XG4vLyAgICAgICAgICAgICB1cGRhdGVTdG9yZSgpO1xuLy8gICAgICAgICAgICAgcmV0dXJuO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGNvbnN0IHJlc3BvbnNlOiBPbWl0PElFdmVudE1lc3NhZ2UsIFwidHlwZVwiPiA9IHtcbi8vICAgICAgICAgICAgIGlkOiBkYXRhLmlkLFxuLy8gICAgICAgICAgICAgZnJvbTogXCJDT05URU5UXCIsXG4vLyAgICAgICAgICAgICB0bzogXCJIT09LXCIsXG4vLyAgICAgICAgICAgICBleHRlbnNpb25OYW1lOiBcIk1PS0tVXCIsXG4vLyAgICAgICAgICAgICBtZXNzYWdlOiB7fSxcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgY29uc3QgcmVxdWVzdCA9IChkYXRhLm1lc3NhZ2UgYXMgSUxvZykucmVxdWVzdDtcbi8vICAgICAgICAgY29uc3QgbW9ja1BhdGhzID0gZ2V0TW9ja1BhdGgocmVxdWVzdC51cmwsIHJlcXVlc3QubWV0aG9kKTtcbi8vICAgICAgICAgY29uc3QgeyBtb2NrIH0gPSBnZXRBY3RpdmVNb2NrV2l0aFBhdGgobW9ja1BhdGhzKTtcbi8vICAgICAgICAgaWYgKG1vY2sgJiYgbW9jay5hY3RpdmUpIHtcbi8vICAgICAgICAgICAgIChyZXNwb25zZS5tZXNzYWdlIGFzIElMb2cpLm1vY2tSZXNwb25zZSA9IG1vY2s7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgbWVzc2FnZVNlcnZpY2Uuc2VuZChyZXNwb25zZSk7XG4vLyAgICAgfSk7XG4vLyB9O1xuLy8gY29uc3QgaG9zdCA9IGxvY2F0aW9uLmhvc3Q7XG4vLyBjb25zdCBpc0xvY2FsaG9zdCA9IGxvY2F0aW9uLmhyZWYuaW5jbHVkZXMoXCJodHRwOi8vbG9jYWxob3N0XCIpO1xuLy8gY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtgbW9ra3UuZXh0ZW5zaW9uLmFjdGl2ZS4ke2hvc3R9YF0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbi8vICAgICBsZXQgYWN0aXZlID0gcmVzdWx0W2Btb2trdS5leHRlbnNpb24uYWN0aXZlLiR7aG9zdH1gXTtcbi8vICAgICBpZiAoaXNMb2NhbGhvc3QgJiYgYWN0aXZlID09PSB1bmRlZmluZWQpIHtcbi8vICAgICAgICAgYWN0aXZlID0gdHJ1ZTtcbi8vICAgICB9XG4vLyAgICAgaWYgKGFjdGl2ZSkge1xuLy8gICAgICAgICAvLyBpbmplY3RzIHNjcmlwdCB0byBwYWdlJ3MgRE9NXG4vLyAgICAgICAgIGluamVjdCgpO1xuLy8gICAgICAgICBpbml0KCk7XG4vLyAgICAgfVxuLy8gICAgIC8vIHRlbGwgdGhlIHBhbmVsIGFib3V0IHRoZSBuZXcgaW5qZWN0aW9uIChob3N0IG1pZ2h0IGhhdmUgY2hhbmdlZClcbi8vICAgICBtZXNzYWdlU2VydmljZS5zZW5kKHtcbi8vICAgICAgICAgbWVzc2FnZTogaG9zdCxcbi8vICAgICAgICAgdHlwZTogXCJJTklUXCIsXG4vLyAgICAgICAgIGZyb206IFwiQ09OVEVOVFwiLFxuLy8gICAgICAgICB0bzogXCJQQU5FTFwiLFxuLy8gICAgICAgICBleHRlbnNpb25OYW1lOiBcIk1PS0tVXCIsXG4vLyAgICAgfSk7XG4vLyB9KTtcbigwLCBjb250ZW50U2NyaXB0VjJfMS5jb250ZW50U2NyaXB0VjIpKCk7XG4vLyBjb25zb2xlLmxvZyhcIlhaXCIpO1xuLy8gaW5qZWN0KCk7XG4vLyBtZXNzYWdlU2VydmljZS5saXN0ZW4oXCJDT05URU5UXCIsIChkYXRhOiBJRXZlbnRNZXNzYWdlKSA9PiB7XG4vLyAgICAgY29uc29sZS5sb2coXCJjb250ZW50OiBcXG5cIiwgZGF0YSk7XG4vLyAgICAgaWYgKGRhdGEudHlwZSA9PT0gXCJMT0dcIikge1xuLy8gICAgICAgICBjb25zdCBtZXNzYWdlID0gZGF0YS5tZXNzYWdlIGFzIElMb2c7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VuZGluZyB0byBwYW5lbFwiKTtcbi8vICAgICAgICAgbWVzc2FnZVNlcnZpY2Uuc2VuZCh7XG4vLyAgICAgICAgICAgICBtZXNzYWdlLFxuLy8gICAgICAgICAgICAgdHlwZTogXCJMT0dcIixcbi8vICAgICAgICAgICAgIGZyb206IFwiQ09OVEVOVFwiLFxuLy8gICAgICAgICAgICAgdG86IFwiUEFORUxcIixcbi8vICAgICAgICAgICAgIGV4dGVuc2lvbk5hbWU6IFwiTU9LS1VcIixcbi8vICAgICAgICAgfSk7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VuZGluZyB0byBzZXJ2aWNlIHdvcmtlclwiKTtcbi8vICAgICAgICAgbWVzc2FnZVNlcnZpY2Uuc2VuZCh7XG4vLyAgICAgICAgICAgICBtZXNzYWdlLFxuLy8gICAgICAgICAgICAgdHlwZTogXCJMT0dcIixcbi8vICAgICAgICAgICAgIGZyb206IFwiQ09OVEVOVFwiLFxuLy8gICAgICAgICAgICAgdG86IFwiU0VSVklDRV9XT1JLRVJcIixcbi8vICAgICAgICAgICAgIGV4dGVuc2lvbk5hbWU6IFwiTU9LS1VcIixcbi8vICAgICAgICAgfSk7XG4vLyAgICAgfVxuLy8gfSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=