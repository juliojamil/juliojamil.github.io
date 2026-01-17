// v1-0-0/src/app/mods/content/page/support/index.js
"use strict";

import {heroSupportContent} from "@components/content/page/support/hero.js";

const modInterface = Object.create(null);
modInterface.content = (container) => {
    if(!container) return undefined;
    const section = container.element.section();
    const hero = heroSupportContent(container);
    if(!hero) return undefined;
    section.appendChild(hero);
    section.append("Support Section");

    return section;
};
Object.freeze(modInterface);

export const supportPageContent = modInterface.content;