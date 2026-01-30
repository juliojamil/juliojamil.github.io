"use strict";

import {shadowStyle} from "../shadow.js";

const modInterface = Object.create(null);
modInterface.sec_iframe = (context, Element, secureShadowRef) => {
    try {
        const frag = Element.fragment();
        const container = Element.section();
        const iframe = Element.iframe();

        const {source, styles, classes, adopted, scroll = "no"} = context;
        if(source) iframe.src = source;
        if(styles) iframe.setAttribute("style", styles);
        if(classes) iframe.setAttribute("class", classes);
        if(scroll) iframe.setAttribute("scrolling", scroll);
        iframe.setAttribute("marginwidth", 0);
        iframe.setAttribute("marginheight", 0);
        iframe.setAttribute("frameborder", 0);

        container.setAttribute("class", "sec-iframe-container");
        frag.appendChild(container);

        const shadowRoot = secureShadowRef.call(container, {mode: "closed"});

        if(adopted && shadowStyle[adopted]) {
            const styleSheet = new CSSStyleSheet();
            styleSheet.replaceSync(shadowStyle[adopted]);
            shadowRoot.adoptedStyleSheets = [styleSheet];
        }
        shadowRoot.appendChild(iframe);

        return frag;
    } catch (err) {
        console.error(err.message);
    }

    return undefined;
};
Object.freeze(modInterface);

export const secIframeContainer = modInterface.sec_iframe;