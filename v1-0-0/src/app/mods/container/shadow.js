"use strict";
import shadowcss from "@styles/shadow.scss?inline";
import seciframecss from "@styles/sec_iframe.scss?inline";

const modinterface = Object.create(null);
modinterface.root = shadowcss;
modinterface.sec_iframe = seciframecss;
Object.freeze(modinterface);

export const shadowStyle = modinterface;