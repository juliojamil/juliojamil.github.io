"use strict";

let Components;

const maintenance = () => {
    const content = "under maintenance";
    const article = Components.container.element.article();
    article.innerText = content;
    const parent = Components.container.store.element.recover("main.canvas");
    parent.appendChild(article);
};

const modInterface = Object.create(null);
modInterface.start_request = (context = {}) => {
    Components = context.Components;
    maintenance();
};
Object.freeze(modInterface);

export const Content = modInterface;