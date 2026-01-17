// v1-0-0/src/app/mods/content/page/support/hero.js
"use strict";

const modInterface = Object.create(null);
modInterface.content = (container) => {
    if(!container) return undefined;
    const section = container.element.section();
    section.innerText = "\'Support Me\' Section under maintenance";

    return section;
};
Object.freeze(modInterface);

export const heroSupportContent = modInterface.content;