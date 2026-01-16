"use strict";

class ElementMemoryDataBlock {
    constructor(size) {
        this.elements = new Array(size).fill(null);
        this.cursor = 0;
        this.size = 0;
    }
}

export const ElementDataBlock = Object.seal(ElementMemoryDataBlock);