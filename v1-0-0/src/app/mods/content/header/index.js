// v1-0-0/src/app/mods/content/header/index.js
"use strict";

import {navHeaderContent} from "@components/content/header/nav.js";

const modInterface = Object.create(null);
modInterface.content = (container) => {
    if(!container) return undefined;
    const section = container.element.section();
    const nav = navHeaderContent(container);
    if(!nav) return undefined;
    section.appendChild(nav);

    return section;
};
Object.freeze(modInterface);

export const HeaderContent = modInterface.content;