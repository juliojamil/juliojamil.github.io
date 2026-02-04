// v1-0-0/src/app/mods/content/page/home/index.js
"use strict";

import {streamsHomeContent} from "@components/content/page/home/streams.js";

import {welcomeHomeContent} from "@components/content/page/home/welcome.js";

const modInterface = Object.create(null);
modInterface.content = (container) => {
    if(!container) return undefined;

    const section = container.element.section();
    section.setAttribute("class", "streams-container");

    const welcome = welcomeHomeContent(container);
    section.appendChild(welcome);

    const streams = streamsHomeContent(container);
    welcome.appendChild(streams);

    return section;
};
Object.freeze(modInterface);

export const homePageContent = modInterface.content;