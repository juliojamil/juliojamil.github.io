"use strict";

const modInterface = Object.create(null);
modInterface.anchor = () => window.document.createElement("a");
Object.freeze(modInterface);

export const ElementAnchor = modInterface.anchor;
