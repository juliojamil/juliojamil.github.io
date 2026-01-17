"use strict";

import "@styles/main.scss";
import {Components} from "@components/index.js";
import {Content} from "@components/content/index.js";

const testRouters = () => [
    ["id1", "title", "link", "description", "target", console.log],
    ["id2", "title", "link", "description", "target", console.log],
    ["id3", "title3", "link3", "description3", "target3", console.log],
];

const start_request = (_) => {
    const {root, header, main, footer, store} = Components.container;

    store.start_request();
    Components.router.start_request(Components, testRouters());

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