"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localDb = void 0;
var dexie_1 = require("dexie");
exports.localDb = new dexie_1.default("MokkuConnectorDB");
// Schema declaration:
exports.localDb.version(1).stores({
    // 'localId' is the auto-incrementing primary key.
    // '[url+dynamicKey+method]' for specific mock lookups.
    // 'dynamicKey' as a simple index for queries like where({ dynamic: true }).
    mocks: "++localId, [url+dynamicKey+method], dynamicKey",
});
