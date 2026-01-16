"use strict";

const modInterface = Object.create(null);
modInterface.fragment = () => window.document.createDocumentFragment();
Object.freeze(modInterface);

export const ElementFragment = modInterface.fragment;
