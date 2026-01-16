"use strict";

const modInterface = Object.create(null);
modInterface.footer = (Element, shadowRoot) => {
    try {
        const container = Element.footer();
        container.setAttribute("class", "footer-container");

        shadowRoot.appendChild(container);

        return container;
    } catch (err) {
        console.error(err.message);
    }
    return undefined;
};
Object.freeze(modInterface);

export const footerContainer = modInterface.footer;