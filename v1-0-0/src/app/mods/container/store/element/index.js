"use strict";

import {ElementDataBlock} from "@components/container/store/element/data-block.js";

const BLOCK_SIZE = 1024;
const MAX_BLOCK_SIZE = 10;

const ElementMemoryStore = new Array(MAX_BLOCK_SIZE).fill(null);
Object.seal(ElementMemoryStore);
const ElementIndexMapStore = new Map();
Object.seal(ElementIndexMapStore);

const modState = {
    running: false,
    stopped: false
};
Object.seal(modState);

let cursor = 0;

const state_running_contract = () => {
    const {stopped, running} = modState;
    return (running && !stopped);
};

const privateInterface = Object.create(null);
privateInterface.circularMemory = () => {
    if(!state_running_contract()) return false;
    const block = ElementMemoryStore[cursor];
    if(!block) return false;
    if(block.size >= BLOCK_SIZE) {
        cursor = (cursor+1);
        if(cursor >= MAX_BLOCK_SIZE) cursor = 0;
        if(ElementMemoryStore[cursor] && ElementMemoryStore[cursor].size >= BLOCK_SIZE) return false;
        ElementMemoryStore[cursor] = new ElementDataBlock(BLOCK_SIZE);
        return true;
    }
    return true;
};
privateInterface.freeMemory = (blockIndex, dataIndex) => {
    if(!blockIndex || !dataIndex) return;
    const block = ElementMemoryStore[blockIndex];
    if(block.cursor === BLOCK_SIZE && block.size === 0) {
        ElementMemoryStore[blockIndex] = null;
    }
};
privateInterface.getData = (id) => {
    if(!state_running_contract() || !id) return [null, null];

    const map = ElementIndexMapStore.get(id);

    if(!map) return [null, null];

    const [blockIndex, _] = map;
    const block = ElementMemoryStore[blockIndex];

    if(!block) {
        ElementIndexMapStore.delete(id);
        return [null, null];
    }

    return [map, block];
};
Object.freeze(privateInterface);

const modInterface = Object.create(null);
modInterface.start_request = () => {
    if(modState.running || modState.stopped) return;
    modState.running = true;

    ElementMemoryStore[0] = new ElementDataBlock(BLOCK_SIZE);
};
modInterface.stop_request = () => {
    if(!modState.running || modState.stopped) return;
    modState.running = false;
    modState.stopped = true;

    for(let blockIndex = (MAX_BLOCK_SIZE - 1); blockIndex>=0; blockIndex--) {
        const block = ElementMemoryStore[blockIndex];
        if(block) {
            block.elements.fill(null);
            block.cursor = 0;
            block.size = 0;
        }
    }
    ElementMemoryStore.fill(null);
};
modInterface.attach = (id, element) => {
    try {
        if(!state_running_contract() || !id || !element) return false;

        if(!privateInterface.circularMemory()) {
            console.error("ElementMemoryStore Error:", "MemoryStore is completely full!");
            return false;
        }

        if(ElementIndexMapStore.get(id)) {
            console.error("ElementMemoryStore Error:", "ElementId Duplicate!");
            return false;
        }

        const blockIndex = cursor;
        cursor = (cursor+1);

        const block = ElementMemoryStore[blockIndex];

        if(block.size >= BLOCK_SIZE) {
            console.error("ElementMemoryStore Error:", "The block has reached its limit!");
            return false;
        }

        const dataIndex = block.cursor;

        block.cursor = (block.cursor+1);
        block.size = (block.size+1);

        block.elements[dataIndex] = element;

        ElementIndexMapStore.set(id, [blockIndex, dataIndex]);

        return true;
    } catch (err) {
        console.error(err.message);
    }
    return false;
};
modInterface.detach = (id) => {
    try {
        if(!state_running_contract()) return false;
        const [map, block] = privateInterface.getData(id);

        if(!map) return false;
        ElementIndexMapStore.delete(id);
        if(!block) return true;

        const dataIndex = map[1];
        const blockIndex = map[0];

        const data = block.elements[dataIndex];
        if(!data) return true;

        block.elements[dataIndex] = null;
        block.size = (block.size-1);

        privateInterface.freeMemory(blockIndex, dataIndex);

        return true;
    } catch (err) {
        console.error(err.message);
    }
    return false;
};
modInterface.remove = (id) => {
    try {
        if(!state_running_contract()) return false;
        const [map, block] = privateInterface.getData(id);

        if(!map) return false;
        if(!block) {
            ElementIndexMapStore.delete(id);
            return true;
        }

        const target = block.elements[map[1]];
        target.parentNode.removeChild(target);

        return modInterface.detach(id);
    } catch (err) {
        console.error(err.message);
    }
    return false;
};
modInterface.recover = (id) => {
    try {
        if(!state_running_contract()) return undefined;
        const [map, block] = privateInterface.getData(id);
        if(!map || !block) return undefined;
        return block.elements[map[1]];
    } catch (err) {
        console.error(err.message);
    }
    return undefined;
};
Object.freeze(modInterface);

export const ElementStore = modInterface;
