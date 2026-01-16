"use strict";

import "@styles/main.scss";
import {Components} from "@components/index.js";
import {Content} from "@components/content/index.js";

const start_request = (_) => {
    const {root, header, main, footer, store} = Components.container;

    store.start_request();

    const container = root();

    header(container)
    store.element.attach("main.canvas", main(container));
    footer(container);

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