"use strict";

const modInterface = Object.create(null);
modInterface.meta = () => window.document.createElement("meta");
Object.freeze(modInterface);

export const ElementMetaTag = modInterface.meta;
