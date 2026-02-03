"use strict";

import {CopyRightContent} from "@components/content/copyright.js";
//import {MaintenanceContent} from "@components/content/maintenance.js";
import {PageContent} from "@components/content/page/index.js";
import {HeaderContent} from "@components/content/header/index.js";

let Components;

const headerContent = () => {
    const parent = Components.container.store.element.recover("header.canvas");

    if(!parent) return;
    const element = HeaderContent(Components.container);
    if(!element) return;

    parent.appendChild(element);
};

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
    const child = parent.firstChild;
    if(child) parent.removeChild(child);
    parent.appendChild(article);
};

const modInterface = Object.create(null);
modInterface.page = PageContent;
modInterface.start_request = (context = {}) => {
    Components = context.Components;
    headerContent();
    mainContent();
    CopyRightContent(footerContent, Components.timer);
};
Object.freeze(modInterface);

export const Content = modInterface;