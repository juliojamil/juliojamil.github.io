"use strict";

const modInterface = Object.create(null);
modInterface.header = (Element, shadowRoot) => {
    try {
        const container = Element.header();
        container.setAttribute("class", "header-container");

        shadowRoot.appendChild(container);

        return container;
    } catch (err) {
        console.error(err.message);
    }
    return undefined;
};
Object.freeze(modInterface);

export const headerContainer = modInterface.header;