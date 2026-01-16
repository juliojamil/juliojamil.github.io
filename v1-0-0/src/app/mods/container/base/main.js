"use strict";

const modInterface = Object.create(null);
modInterface.main = (Element, shadowRoot) => {
    try {
        const container = Element.main();
        container.setAttribute("class", "main-container");

        shadowRoot.appendChild(container);

        return container;
    } catch (err) {
        console.error(err.message);
    }
    return undefined;
};
Object.freeze(modInterface);

export const mainContainer = modInterface.main;