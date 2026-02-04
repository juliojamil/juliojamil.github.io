"use strict";

const modInterface = Object.create(null);
modInterface.span = () => window.document.createElement("span");
Object.freeze(modInterface);

export const ElementSpan = modInterface.span;
