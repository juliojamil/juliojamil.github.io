"use strict";

import {CopyRightContent} from "@components/content/copyright.js";
//import {MaintenanceContent} from "@components/content/maintenance.js";
import {PageContent} from "@components/content/page/index.js";

let Components;

const mainContent = () => {
    const parent = Components.container.store.element.recover("main.canvas");
    const empty = Components.container.element.section();
    parent.appendChild(empty);
    //MaintenanceContent(Components.container, parent);
};

const footerContent = (copyright) => {
    const article = Components.container.element.article();
    article.innerText = copyright;
    const parent = Components.container.store.element.recover("footer.canvas");
    parent.appendChild(article);
};

const modInterface = Object.create(null);
modInterface.page = PageContent;
modInterface.start_request = (context = {}) => {
    Components = context.Components;
    mainContent();
    CopyRightContent(footerContent);
};
Object.freeze(modInterface);

export const Content = modInterface;