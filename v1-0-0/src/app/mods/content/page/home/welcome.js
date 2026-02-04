// v1-0-0/src/app/mods/content/page/home/welcome.js
"use strict";

const modInterface = Object.create(null);
modInterface.content = (container) => {
    if(!container) return undefined;
    const section = container.element.article();
    const h2_content = container.element.h2();
    const h4_content = container.element.h4();
    section.setAttribute("class", "welcome");
    h2_content.innerText = "Sejam bem vindos ao meu pequeno espa\u00E7o!";
    h4_content.innerText = "Veja Abaixo uma pequena lista de onde fa\u00E7o lives:";

    section.appendChild(h2_content);
    section.appendChild(h4_content);

    return section;
};
Object.freeze(modInterface);

export const welcomeHomeContent = modInterface.content;