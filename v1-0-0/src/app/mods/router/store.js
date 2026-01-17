"use strict";

let CALLBACK_STORE = null;
let HEADER_STORE = null;

const INDEX_MAP_STORE = new Map();
Object.seal(INDEX_MAP_STORE);

let cursor = 0;

const modState = {
    running: false,
    stopped: false,
    context: 6
};
Object.seal(modState);

const state_running_contract = () => {
    const {stopped, running} = modState;
    return (running && !stopped);
};
const state_stopped_contract = () => {
    const {stopped, running} = modState;
    return (!running && stopped);
};

const activeinterface = Object.create(null);
activeinterface.header = (index, size, context) => {
    try {
        const headerSchema = new Array(size).fill(null);
        const target = context[4];
        const description = context[3];
        const link = context[2];
        const title = context[1];
        const id = context[0];

        if (id) headerSchema[0] = id;
        if (title) headerSchema[1] = title;
        if (link) headerSchema[2] = link;
        if (description) headerSchema[3] = description;
        if (target) headerSchema[4] = target;

        HEADER_STORE[index] = headerSchema;

        return id;
    } catch (err) {
        console.error(err.message);
    }

    return undefined;
};
activeinterface.callback = (index, callback_fn) => {
    if(typeof callback_fn !== "function") return false;
    CALLBACK_STORE[index] = callback_fn;
    return true;
};
activeinterface.reset = (index) => {
    CALLBACK_STORE[index] = null;
    HEADER_STORE[index] = null;
};
activeinterface.start = (context, size) => {
    if(state_stopped_contract()) return false;
    const size_contract = modState.context;

    for(let i = (size - 1); i >= 0; i--) {
        const item = context[i];

        if(!item || !Array.isArray(item) || item.length !== size_contract) continue;
        const index = cursor;

        if(!activeinterface.callback(index, item[5])) continue;
        const id = activeinterface.header(index, (size_contract - 1), item);
        if(!id) {
            activeinterface.reset(index);
            continue;
        }
        if(INDEX_MAP_STORE.get(id)) {
            activeinterface.reset(index);
            continue;
        }
        INDEX_MAP_STORE.set(id, index);
        cursor = (cursor+1);
    }
    return true;
};
Object.freeze(activeinterface);

const modInterface = Object.create(null);
modInterface.start_request = (context) => {
   try {
       if(state_running_contract() || !Array.isArray(context)) return false;

       const size = context.length;
       modState.running = true;

       CALLBACK_STORE = new Array(size).fill(null);
       HEADER_STORE = new Array(size).fill(null);
       Object.seal(CALLBACK_STORE);
       Object.seal(HEADER_STORE);

       return activeinterface.start(context, size);
   } catch (err) {
       console.error(err.message);
   }
   return false;
};
modInterface.stop_request = () => {
    if(state_stopped_contract()) return;

    modState.running = false;
    modState.stopped = true;

    CALLBACK_STORE.fill(null);
    HEADER_STORE.fill(null);
    INDEX_MAP_STORE.clear();

};
modInterface.size = () => {
    return INDEX_MAP_STORE.size;
};
modInterface.getHeader = (id, data) => {
    if(!data && typeof id === "undefined") return undefined;

    let index = data;
    if(!index) index = INDEX_MAP_STORE.get(id);

    return HEADER_STORE[index];
};
modInterface.getCallback = (id, data) => {
    if(!data && typeof id === "undefined") return undefined;

    let index = data;
    if(!index) index = INDEX_MAP_STORE.get(id);

    return CALLBACK_STORE[index];
};
modInterface.getAll = (id) => {
    const index = INDEX_MAP_STORE.get(id);
    if(typeof id === "undefined" || typeof index === "undefined") return undefined;

    const size_contract = modState.context;
    const header = modInterface.getHeader(id, index);
    const callback = modInterface.getCallback(id, index);

    const response = new Array(size_contract).fill(null);
    const header_len = (size_contract - 1);
    if(header) {
        for(let i = 0; header_len > i; i++) {
            response[i] = header[i];
        }
    }
    if(callback) response[header_len] = callback;
    return response;
};
Object.freeze(modInterface);

export const routerStore = modInterface;