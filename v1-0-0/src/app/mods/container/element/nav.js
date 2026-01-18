"use strict";

const modInterface = Object.create(null);
modInterface.nav = () => window.document.createElement("nav");
Object.freeze(modInterface);

export const ElementNav = modInterface.nav;
