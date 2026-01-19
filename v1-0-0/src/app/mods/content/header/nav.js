// v1-0-0/src/app/mods/content/header/nav.js
"use strict";

const modState = {
    size: 3,
    prefix: ["btn.box", "btn.item"],
    items: [
        {target: "home", title: "Home", active: true},
        {target: "support-me", title: "Support Me"},
        {target: "404test", title: "404 test"},
    ]
};
Object.freeze(modState);

const btn_action = (evt) => {
    const {target} = evt;
    if(!target) return;
    const pageId = target.getAttribute("anchor");

    if(pageId) window.location.href = "/#!/"+ pageId;
    return true;
};

const btn_content = (context) => {
    if(!Array.isArray(context) || context.length !== 5) return;
    const nameId = context[4];
    const evId = context[3];
    const elId = context[2];
    const item = context[1];
    const {element, store} = context[0];

    const {target, title, active} = item;

    const elementId = elId +"."+ nameId;
    const eventId = evId +"." + nameId;

    const btn_box = element.listLi();
    const btn_content = element.article();
    let classes = "btn-box";
    if(active) classes = classes +" active";

    btn_box.setAttribute("class", classes);
    btn_box.setAttribute("listen", nameId);
    btn_box.setAttribute("anchor", target);

    btn_content.setAttribute("class", "btn-content");

    btn_content.innerText = title.toString();

    store.element.attach(elementId, btn_box);
    store.event.attach(eventId, elementId, "click", btn_action);

    btn_box.appendChild(btn_content);

    return btn_box;
};

const modInterface = Object.create(null);
modInterface.content = (container) => {
    if(!container) return undefined;
    const {element} = container;
    const nav = element.nav();
    nav.setAttribute("class", "menu-container");
    const btn_group = element.listUl();
    btn_group.setAttribute("class", "btn-group");
    const {size, items} = modState;

    const evId = modState.prefix[1];
    const elId = modState.prefix[0];

    for(let i = 0; size > i; i++) {
        const item = items[i];
        if(!item) continue;

        const nameId = "header."+ i;

        const btn_box = btn_content([container, item, elId, evId, nameId]);
        if(!btn_box) continue;

        btn_group.appendChild(btn_box);
    }

    nav.appendChild(btn_group);

    return nav;
};
Object.freeze(modInterface);

export const navHeaderContent = modInterface.content;