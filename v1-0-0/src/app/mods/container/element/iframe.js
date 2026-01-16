"use strict";

const modInterface = Object.create(null);
modInterface.iframe = () => window.document.createElement("iframe");
Object.freeze(modInterface);

export const ElementIframe = modInterface.iframe;
