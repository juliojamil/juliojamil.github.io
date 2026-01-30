// v1-0-0/src/app/mods/content/page/home/index.js
"use strict";

import {streamsHomeContent} from "@components/content/page/home/streams.js";

const modInterface = Object.create(null);
modInterface.content = (container) => {
    if(!container) return undefined;
    let section = streamsHomeContent(container);
    if(!section) {
        section = container.element.section();
        section.append("Home Section");
    }

    return section;
};
Object.freeze(modInterface);

export const homePageContent = modInterface.content;