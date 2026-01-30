// v1-0-0/src/app/mods/content/page/home/hero.js
"use strict";

const modInterface = Object.create(null);
modInterface.content = (container) => {
    if(!container) return undefined;
    const section = container.element.section();
    section.setAttribute("class", "streams-icontainer");
    //section.innerText = "\'Home\' Section under maintenance";

    const iframe = container.sec_iframe({
        source: "/assets/micro-frontend/streams.html",
        classes: "micro-streams",
        adopted: "sec_iframe"
    });
    section.appendChild(iframe);

    return section;
};
Object.freeze(modInterface);

export const heroHomeContent = modInterface.content;