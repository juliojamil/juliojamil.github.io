// v1-0-0/src/app/mods/content/page/home/streams.js
"use strict";

const modState = {
    source: "/assets/streams.json",
    items: null
};
Object.seal(modState);

const line_build = (container, stream) => {
    if(stream && !modState.items[stream]) return undefined;

    const line = container.element.listLi();

    const {name, link, desc} = modState.items[stream]

    const target = container.element.a();
    target.setAttribute("href", link);
    target.setAttribute("target", "_blank");
    target.setAttribute("rel", "nofollow");

    const title = container.element.span();
    title.setAttribute("class", `stream-source ${name}`);
    title.innerText = name;
    target.appendChild(title);

    const content = container.element.span();
    content.setAttribute("class", "stream-desc");
    content.innerText = desc;
    target.appendChild(content);

    line.appendChild(target);
    line.appendChild(content);

    return line;
};

const items_mount = (context = {}) => {
    const {container, section} = context;
    const {items} = modState;

    if(!items) return;
    const keys = Object.keys(modState.items);
    const len = keys.length;
    if(len === 0) return;

    for(let i = 0; len > i; i++) {
        const key = keys[i];
        const item = items[key];
        if(!item) continue;
        const {name} = item;
        if(!name) continue;
        const line = line_build(container, name);
        if(line) section.appendChild(line);

    }
};

const extract_streams = (body, context) => {
    body.json()
        .then(data => {
        if(!data?.items) return;
        modState.items = data.items;
        Object.freeze(modState.items);
        items_mount(context);
    });
};

const get_streams = (context = {}) => {
    try {
        fetch("/assets/streams.json")
            .then(body => {
                if(body.ok) extract_streams(body, context);
            });
    } catch (err) {
        console.error(err.message);
    }
};

const modInterface = Object.create(null);
modInterface.content = (container) => {
    if(!container) return undefined;
    const section = container.element.listUl();
    section.setAttribute("class", "streams-list");

    /*const twitch_line = line_build(container, "twitch");
    const trovo_line = line_build(container, "trovo");
    const kick_line = line_build(container, "kick");

    if(twitch_line) section.appendChild(twitch_line);
    if(trovo_line) section.appendChild(trovo_line);
    if(kick_line) section.appendChild(kick_line);*/
    if(!modState.items) get_streams({container, section});
    return section;
};
Object.freeze(modInterface);

export const streamsHomeContent = modInterface.content;