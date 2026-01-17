"use strict";

let CALLBACK_STORE = null;
let HEADER_STORE = null;

const INDEX_MAP_STORE = new Map();

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
activeinterface.run = () => {
    if(state_stopped_contract() || INDEX_MAP_STORE.size === 0) return;
    console.log(INDEX_MAP_STORE.size)
};
Object.freeze(activeinterface);

const populateInterface = Object.create(null);
populateInterface.header = (index, size, context) => {
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
populateInterface.callback = (index, callback_fn) => {
    if(typeof callback_fn !== "function") return false;
    CALLBACK_STORE[index] = callback_fn;
    return true;
};
populateInterface.reset = (index) => {
    CALLBACK_STORE[index] = null;
    HEADER_STORE[index] = null;
};
populateInterface.start = (context, size) => {
    const size_contract = modState.context;

    for(let i = (size - 1); i >= 0; i--) {
        const item = context[i];

        if(!item || !Array.isArray(item) || item.length !== size_contract) continue;
        const index = cursor;

        if(!populateInterface.callback(index, item[5])) continue;
        const id = populateInterface.header(index, (size_contract - 1), item);
        if(!id) {
            populateInterface.reset(index);
            continue;
        }
        if(INDEX_MAP_STORE.get(id)) {
            populateInterface.reset(index);
            continue;
        }
        INDEX_MAP_STORE.set(id, index);
        cursor = (cursor+1);
    }

    activeinterface.run();
};
Object.freeze(populateInterface);

const modInterface = Object.create(null);
modInterface.start_request = (context) => {
    if(state_running_contract(context) || !Array.isArray(context)) return;

    const size = context.length;
    modState.running = true;

    CALLBACK_STORE = new Array(size).fill(null);
    HEADER_STORE = new Array(size).fill(null);
    Object.seal(CALLBACK_STORE);
    Object.seal(HEADER_STORE);

    populateInterface.start(size, context);
};
modInterface.stop_request = () => {
    if(state_stopped_contract()) return;

    modState.running = false;
    modState.stopped = true;
};
Object.freeze(modInterface);

export const router = modInterface;