"use strict";

import {Element} from "@components/container/element/index.js";
import {rootContainer} from "@components/container/base/root.js";
import {mainContainer} from "@components/container/base/main.js";
import {headerContainer} from "@components/container/base/header.js";
import {footerContainer} from "@components/container/base/footer.js";
import {Store} from "@components/container/store/index.js";
import {secIframeContainer} from "@components/container/base/secure-iframe.js";

const attachShadowSymbol = Symbol("AttachShadow Secure");

const secureShadowRef = {
    [attachShadowSymbol]: null
};

const temp_frame = window.document.createElement("frame");
temp_frame.setAttribute("style", "display:none!important");
window.document.body.appendChild(temp_frame);
secureShadowRef[attachShadowSymbol] = temp_frame.contentWindow.HTMLElement.prototype.attachShadow;
Object.freeze(secureShadowRef[attachShadowSymbol]);
temp_frame.parentNode.removeChild(temp_frame);

const modInterface = Object.create(null);
modInterface.root = () => rootContainer(Element, secureShadowRef[attachShadowSymbol]);
modInterface.header = (shadowRoot) => headerContainer(Element, shadowRoot);
modInterface.main = (shadowRoot) => mainContainer(Element, shadowRoot);
modInterface.footer = (shadowRoot) => footerContainer(Element, shadowRoot);
modInterface.sec_iframe = (context) => secIframeContainer(context, Element, secureShadowRef[attachShadowSymbol]);
modInterface.store = Store;
modInterface.element = Element;
Object.freeze(modInterface);

export const container = modInterface;