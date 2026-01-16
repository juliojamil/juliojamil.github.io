"use strict";

const modInterface = Object.create(null);
modInterface.article = () => window.document.createElement("article");
Object.freeze(modInterface);

export const ElementArticle = modInterface.article;
