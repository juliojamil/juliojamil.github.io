// v1-0-0/src/app/mods/content/header/logo.js
"use strict";

const modInterface = Object.create(null);
modInterface.content = (container) => {
    if(!container) return undefined;
    const section = container.element.section();
    section.setAttribute("class", "logo-container");

    return section;
};
Object.freeze(modInterface);

export const logoHeaderContent = modInterface.content;