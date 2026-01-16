"use strict";

const modInterface = Object.create(null);
modInterface.section = () => window.document.createElement("section");
Object.freeze(modInterface);

export const ElementSection = modInterface.section;
