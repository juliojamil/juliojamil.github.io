"use strict";

const modInterface = Object.create(null);
modInterface.h2 = () => window.document.createElement("h4");
Object.freeze(modInterface);

export const ElementH4 = modInterface.h2;
