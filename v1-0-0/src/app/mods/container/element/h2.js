"use strict";

const modInterface = Object.create(null);
modInterface.h2 = () => window.document.createElement("h2");
Object.freeze(modInterface);

export const ElementH2 = modInterface.h2;
