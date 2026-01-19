"use strict";

import "@styles/main.scss";
import {Components} from "@components/index.js";
import {Content} from "@components/content/index.js";

const URL = "https://juliojamil.github.io/#!";

const getPage = (context) => {
    if(!Array.isArray(context)) return;
    Content.page(Components, context);
};

const routers = () => [
    ["home", "Home", URL +"/home", "Júlio Jamil, home", "main.canvas", getPage],
    ["support-me", "Support Me", URL +"/support", "Júlio Jamil, support, donate", "main.canvas", getPage],
    ["404", "Not Found (404)", URL +"/404", "Júlio Jamil, notfound, 404", "main.canvas", null],
];

const start_request = (_) => {
    const {root, header, main, footer, store} = Components.container;

    store.start_request();
    Components.router.start_request(Components, routers());

    const container = root();

    store.element.attach("header.canvas", header(container));
    store.element.attach("main.canvas", main(container));
    store.element.attach("footer.canvas", footer(container));

    Content.start_request({Components});
    //Components.timer.start_request();
};
const stop_request = (_) => {
    const {timer} = Components;
    const {store} = Components.container;
    const timerStop = timer.stop_request;
    const storeStop = store.stop_request;
   //
    storeStop();
    timerStop();
};
window.document.addEventListener("DOMContentLoaded", start_request);
window.document.addEventListener("unload", stop_request);
window.onbeforeunload = stop_request;