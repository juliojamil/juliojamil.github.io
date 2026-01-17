"use strict";

const modInterface = Object.create(null);
modInterface.maintenance = (container, parent) => {
    if(!container || !parent) return;
    const content = "under maintenance";
    const article = container.element.article();
    article.innerText = content;
    parent.appendChild(article);
};
Object.freeze(modInterface);

export const MaintenanceContent = modInterface.maintenance;