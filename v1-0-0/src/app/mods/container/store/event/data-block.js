"use strict";

class EventMemoryDataBlock {
    constructor(size) {
        this.events = new Array(size).fill(null);
        this.cursor = 0;
        this.size = 0;
    }
}

export const EventDataBlock = Object.seal(EventMemoryDataBlock);