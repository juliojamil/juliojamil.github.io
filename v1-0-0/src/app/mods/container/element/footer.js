"use strict";

const modInterface = Object.create(null);
modInterface.footer = () => window.document.createElement("footer");
Object.freeze(modInterface);

export const ElementFooter = modInterface.footer;
