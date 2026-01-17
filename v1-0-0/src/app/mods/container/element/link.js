"use strict";

const modInterface = Object.create(null);
modInterface.link = () => window.document.createElement("link");
Object.freeze(modInterface);

export const ElementLinkTag = modInterface.link;
