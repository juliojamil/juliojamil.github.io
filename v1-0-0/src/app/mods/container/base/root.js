"use strict";

import {shadowStyle} from "../shadow.js";

const modInterface = Object.create(null);
modInterface.root = (Element, secureShadowRef) => {
    try {
        const frag = Element.fragment();
        const container = Element.section();
        container.setAttribute("class", "root-container");
        frag.appendChild(container);

        const shadowRoot = secureShadowRef.call(container, {mode: "closed"});

        const styleSheet = new CSSStyleSheet();
        styleSheet.replaceSync(shadowStyle.root);
        shadowRoot.adoptedStyleSheets = [styleSheet];

        const {body} = window.document;
        body.insertBefore(frag, body.firstChild);

        return shadowRoot;

    } catch (err) {
        console.error(err.message);
    }

    return undefined;
};
Object.freeze(modInterface);

export const rootContainer = modInterface.root;