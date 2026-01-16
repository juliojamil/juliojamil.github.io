"use strict";

const modInterface = Object.create(null);
modInterface.header = () => window.document.createElement("header");
Object.freeze(modInterface);

export const ElementHeader = modInterface.header;
