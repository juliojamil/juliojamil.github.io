"use strict";

const modInterface = Object.create(null);
modInterface.li = () => window.document.createElement("li");
Object.freeze(modInterface);

export const ElementListLi = modInterface.li;
