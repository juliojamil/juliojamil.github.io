"use strict";

const modInterface = Object.create(null);
modInterface.ul = () => window.document.createElement("ul");
Object.freeze(modInterface);

export const ElementListUl = modInterface.ul;
