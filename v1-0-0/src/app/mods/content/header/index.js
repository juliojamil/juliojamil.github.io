// v1-0-0/src/app/mods/content/header/index.js
"use strict";

import {navHeaderContent} from "@components/content/header/nav.js";
import {logoHeaderContent} from "@components/content/header/logo.js";

const modInterface = Object.create(null);
modInterface.content = (container) => {
    if(!container) return undefined;
    const frag = container.element.fragment();

    const logo = logoHeaderContent(container);
    const nav = navHeaderContent(container);
    if(!nav || !logo) return undefined;

    frag.appendChild(logo);
    frag.appendChild(nav);

    return frag;
};
Object.freeze(modInterface);

export const HeaderContent = modInterface.content;