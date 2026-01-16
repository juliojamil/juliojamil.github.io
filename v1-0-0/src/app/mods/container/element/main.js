"use strict";

const modInterface = Object.create(null);
modInterface.main = () => window.document.createElement("main");
Object.freeze(modInterface);

export const ElementMain = modInterface.main;
