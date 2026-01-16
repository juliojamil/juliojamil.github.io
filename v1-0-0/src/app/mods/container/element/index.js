"use strict";

import {ElementIframe} from "@components/container/element/iframe.js";
import {ElementSection} from "@components/container/element/section.js";
import {ElementHeader} from "@components/container/element/header.js";
import {ElementMain} from "@components/container/element/main.js";
import {ElementFooter} from "@components/container/element/footer.js";
import {ElementArticle} from "@components/container/element/article.js";
import {ElementFragment} from "@components/container/element/fragment.js";

export const Element = Object.freeze({
    section: ElementSection,
    header: ElementHeader,
    main: ElementMain,
    footer: ElementFooter,
    article: ElementArticle,
    fragment: ElementFragment,
    iframe: ElementIframe
});