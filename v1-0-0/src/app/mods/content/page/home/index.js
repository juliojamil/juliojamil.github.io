// v1-0-0/src/app/mods/content/page/home/index.js
"use strict";

import {heroHomeContent} from "@components/content/page/home/hero.js";

const modInterface = Object.create(null);
modInterface.content = (container) => {
    if(!container) return undefined;
    const section = container.element.section();
    const hero = heroHomeContent(container);
    if(!hero) return undefined;
    section.appendChild(hero);
    section.append("Home Section");

    return section;
};
Object.freeze(modInterface);

export const homePageContent = modInterface.content;