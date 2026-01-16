"use strict";

import {EventDataBlock} from "@components/container/store/event/data-block.js";

const BLOCK_SIZE = 1024;
const MAX_BLOCK_SIZE = 10;

const EventMemoryStore = new Array(MAX_BLOCK_SIZE).fill(null);
Object.seal(EventMemoryStore);
const EventIndexMapStore = new Map();
Object.seal(EventIndexMapStore);

const modState = {
    running: false,
    stopped: false,
    contract: {
        attach_event_size: 3,
        attach_element_size: 2
    }
};
Object.seal(modState);
Object.freeze(modState.contract);

let cursor = 0;

const state_running_contract = () => {
    const {stopped, running} = modState;
    return (running && !stopped);
};
const interface_attach_contract = (eventObject, elementObject) => {
    if(!eventObject || !elementObject) return false;
    if(!Array.isArray(eventObject) || !Array.isArray(elementObject)) return false;
    const {attach_event_size, attach_element_size} = modState.contract;

    return (eventObject.length === attach_event_size && elementObject.length === attach_element_size);
};

const privateInterface = Object.create(null);
privateInterface.circularMemory = () => {
    if(!state_running_contract()) return false;
    const block = EventMemoryStore[cursor];
    if(!block) return false;
    if(block.size >= BLOCK_SIZE) {
        cursor = (cursor+1);
        if(cursor >= MAX_BLOCK_SIZE) cursor = 0;
        if(EventMemoryStore[cursor] && EventMemoryStore[cursor].size >= BLOCK_SIZE) return false;
        EventMemoryStore[cursor] = new EventDataBlock(BLOCK_SIZE);
        return true;
    }
    return true;
};
privateInterface.freeMemory = (blockIndex, dataIndex) => {
    if(!blockIndex || !dataIndex) return;
    const block = EventMemoryStore[blockIndex];
    if(block.cursor === BLOCK_SIZE && block.size === 0) {
        EventMemoryStore[blockIndex] = null;
    }
};
privateInterface.getData = (id) => {
    if(!state_running_contract() || !id) return [null, null];

    const map = EventIndexMapStore.get(id);

    if(!map) return [null, null];

    const blockIndex = map[0];
    const block = EventMemoryStore[blockIndex];

    if(!block) {
        EventIndexMapStore.delete(id);
        return [null, null];
    }

    return [map, block];
};
Object.freeze(privateInterface);

const detach = (id) => {
    try {
        if(!state_running_contract()) return false;
        const [map, block] = privateInterface.getData(id);

        if(!map) return false;
        EventIndexMapStore.delete(id);
        if(!block) return true;

        const dataIndex = map[1];
        const blockIndex = map[0];

        const data = block.events[dataIndex];
        if(!data) return true;

        block.events[dataIndex] = null;
        block.size = (block.size-1);

        privateInterface.freeMemory(blockIndex, dataIndex);

        return true;
    } catch (err) {
        console.error(err.message);
    }
    return false;
};

const modInterface = Object.create(null);
modInterface.start_request = () => {
    if(modState.running || modState.stopped) return;
    modState.running = true;

    EventMemoryStore[0] = new EventDataBlock(BLOCK_SIZE);
};
modInterface.stop_request = () => {
    if(!modState.running || modState.stopped) return;
    modState.running = false;
    modState.stopped = true;

    for(let blockIndex = (MAX_BLOCK_SIZE - 1); blockIndex>=0; blockIndex--) {
        const block = EventMemoryStore[blockIndex];
        if(block) {
            block.events.fill(null);
            block.cursor = 0;
            block.size = 0;
        }
    }
    EventMemoryStore.fill(null);
};
modInterface.attach = (eventObject, elementObject) => {
    try {
        if(!state_running_contract() || !interface_attach_contract(eventObject, elementObject)) {
            return false;
        }

        const [eventId, eventName, callback] = eventObject;
        const [elementId, ElementStore] = elementObject;

        if(!eventId || !eventName || !callback) return false;

        if(EventIndexMapStore.get(eventId)) {
            console.error("EventMemoryStore Error:", "EventId Duplicate!");
            return false;
        }

        if(!elementId || !ElementStore) return false;

        const element = ElementStore.recover(elementId);
        if(!element) return false;

        element.addListener(eventName, callback);

        if(!privateInterface.circularMemory()) {
            console.error("EventMemoryStore Error:", "MemoryStore is completely full!");
            return false;
        }

        const blockIndex = cursor;
        cursor = (cursor+1);

        const block = EventMemoryStore[blockIndex];

        if(block.size >= BLOCK_SIZE) {
            console.error("EventMemoryStore Error:", "The block has reached its limit!");
            return false;
        }

        const dataIndex = block.cursor;

        block.cursor = (block.cursor+1);
        block.size = (block.size+1);

        block.events[dataIndex] = callback;

        EventIndexMapStore.set(eventId, [blockIndex, dataIndex, elementId, eventName]);

        return true;
    } catch (err) {
        console.error(err.message);
    }
    return false;
};
modInterface.detach = (id, ElementStore) => {
    try {
        if(!state_running_contract() || !ElementStore) return false;
        const [map, block] = privateInterface.getData(id);

        if(!map) return false;
        if(!block) {
            EventIndexMapStore.delete(id);
            return true;
        }

        const [_, dataIndex, elementId, eventName] = map;
        const element = ElementStore.recover(elementId);
        if(!element) return false;
        const callback = block.events[dataIndex];
        if(!callback) return false;
        element.removeListener(eventName, callback);

        return detach(id);
    } catch (err) {
        console.error(err.message);
    }
    return false;
};

Object.freeze(modInterface);

export const EventStore = modInterface;
