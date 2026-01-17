"use strict";

import {routerStore} from "@components/router/store.js";

let container;

const modState = {
    running: false,
    stopped: false,
    loaded: false,
    fragment: "#!/",
    title: ""
};
Object.seal(modState);

const state_running_contract = () => {
    const {stopped, running} = modState;
    return (running && !stopped);
};
const state_stopped_contract = () => {
    const {stopped, running} = modState;
    return (!running && stopped);
};

const privateInterface = Object.create(null);
const setLoaded = (_) => {
    if(state_stopped_contract() || modState.loaded) return;
    modState.loaded = true;
    privateInterface.fragment();
};
Object.freeze(setLoaded);
const hashChange = (_) => {
    if(state_stopped_contract() || !modState.loaded) return;
    privateInterface.fragment();
};
Object.freeze(hashChange);

const createHeadTag = (context, link) => {
    if(!Array.isArray(context)) return;
    let element;
    if(link) {
        element = container.element.linkTag();
    } else element = container.element.metaTag();

    const size = context.length;
    for(let i = 0; size > i; i++) {
        const item = context[i];
        if(!item) continue;
        const [name, value] = item;
        if(!name || !value) continue;
        element.setAttribute(name.toString(), value.toString());
    }
    window.document.head.appendChild(element);
};
const updateTitleTag = (context) => {
    if(!context) return;
    try {
        let content = context;
        const {title} = modState;
        if(title) content = title +"- "+ context;
        window.document.title = content;

        const metaTag = window.document.querySelector("meta[name='dcterms.title']");
        if(metaTag) {
            metaTag.content = content;
            return;
        }

        createHeadTag([
            ["name", "dcterms.title"],
            ["content", content]
        ]);
    } catch (err) {
        console.error(err.message);
    }
};
const updateDescriptionTag = (context) => {
    if (!context) return;
    try {
        const content = context.toLowerCase();
        const metaDescTag = window.document.querySelector("meta[name='description']");
        const metaDcDescTag = window.document.querySelector("meta[name='dcterms.description']");
        if (metaDescTag) {
            metaDescTag.content = content;
        } else createHeadTag([
            ["name", "description"],
            ["content", content]
        ]);

        if (metaDcDescTag) {
            metaDcDescTag.content = content;
        } else createHeadTag([
            ["name", "dcterms.description"],
            ["content", content]
        ]);
    } catch (err) {
        console.error(err.message);
    }
};
const updateCanonicalTag = () => {
    try {
        const content = window.location.href;
        const metaTag = window.document.querySelector("link[rel='canonical']");
        if(metaTag) {
            metaTag.href = content;
            return;
        }

        createHeadTag([
            ["rel", "canonical"],
            ["href", content]
        ], true);
    } catch (err) {
        console.error(err.message);
    }
};

privateInterface.error404 = () => {
    //const page = modState.fragment + "404";
    const parentElement = container.store.element.recover("main.canvas");
    //window.history.pushState({}, null, page);
    if(!parentElement) return;
    const child = parentElement.firstChild;
    parentElement.removeChild(child);
    parentElement.innerText = "Error 404";
};
privateInterface.fragment = () => {
    const {hash} = window.location;
    let page;

    if(!hash) {
        window.location.href = modState.fragment + "home";
        return;
    }
    page = hash.replace(modState.fragment, "").toLowerCase();

    const context = routerStore.getAll(page);
    if(typeof context === "undefined") {
        window.location.href = modState.fragment + "404";
        return;
    }

    const callback = context[5];
    const target = context[4];
    const description = context[3];
    const link = context[2];
    const title = context[1];

    if(title) updateTitleTag(title);
    if(description) updateDescriptionTag(description);
    if(link) updateCanonicalTag(link);
    if(callback) callback([page, target]);
    if(page === "404") privateInterface.error404();

    window.history.pushState({}, null, hash);
};
Object.freeze(privateInterface);

const activeInterface = Object.create(null);
activeInterface.run = () => {
    if(state_stopped_contract() || routerStore.size() === 0) return;

    window.addEventListener("hashchange", hashChange);
    window.addEventListener("load", setLoaded);

};
Object.freeze(activeInterface);

const modInterface = Object.create(null);
modInterface.start_request = (Components, context) => {
    if(!Components || state_running_contract() || !Array.isArray(context)) return;

    modState.running = true;
    container = Components.container;
    Object.freeze(Components);

    const titleTag = window.document.title;
    if(titleTag) modState.title = titleTag.split("-")[0] +" ";

    if(routerStore.start_request(context)) activeInterface.run();
};
modInterface.stop_request = () => {
    if(state_stopped_contract()) return;

    modState.running = false;
    modState.stopped = true;

    routerStore.stop_request();
};
Object.freeze(modInterface);

export const router = modInterface;