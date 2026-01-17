// v1-0-0/src/app/mods/content/page/index.js
"use strict";

import {homePageContent} from "@components/content/page/home/index.js";
import {supportPageContent} from "@components/content/page/support/index.js";

let lastParent = null;

const modState = {
    home: homePageContent,
    support: supportPageContent
};
Object.freeze(modState);

const modInterface = Object.create(null);
modInterface.getPage = (Components, context) => {
    if(!Components || !Array.isArray(context) || context.length !== 2) return;
    const {container} = Components;

    const parentId = context[1];
    const page = context[0];

    let parentElement = lastParent;
    if(!lastParent) {
        parentElement = container.store.element.recover(parentId);
        lastParent = parentElement;
    }

    const pageFn = modState[page.toString()];
    if(!parentElement || !pageFn) return;

    const element = pageFn(container);
    if(!element) return;

    const child = parentElement.firstChild;
    parentElement.removeChild(child);

    parentElement.appendChild(element);
};
Object.freeze(modInterface);

export const PageContent = modInterface.getPage;