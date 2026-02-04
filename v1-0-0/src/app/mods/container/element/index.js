"use strict";

import {ElementIframe} from "@components/container/element/iframe.js";
import {ElementSection} from "@components/container/element/section.js";
import {ElementHeader} from "@components/container/element/header.js";
import {ElementMain} from "@components/container/element/main.js";
import {ElementFooter} from "@components/container/element/footer.js";
import {ElementArticle} from "@components/container/element/article.js";
import {ElementFragment} from "@components/container/element/fragment.js";
import {ElementMetaTag} from "@components/container/element/meta.js";
import {ElementLinkTag} from "@components/container/element/link.js";
import {ElementListUl} from "@components/container/element/list_ul.js";
import {ElementListLi} from "@components/container/element/list_li.js";
import {ElementNav} from "@components/container/element/nav.js";
import {ElementH2} from "@components/container/element/h2.js";
import {ElementH4} from "@components/container/element/h4.js";
import {ElementSpan} from "@components/container/element/span.js";
import {ElementAnchor} from "@components/container/element/anchor.js";

export const Element = Object.freeze({
    section: ElementSection,
    header: ElementHeader,
    main: ElementMain,
    footer: ElementFooter,
    article: ElementArticle,
    fragment: ElementFragment,
    iframe: ElementIframe,
    metaTag: ElementMetaTag,
    linkTag: ElementLinkTag,
    listUl: ElementListUl,
    listLi: ElementListLi,
    nav: ElementNav,
    h2: ElementH2,
    h4: ElementH4,
    span: ElementSpan,
    a: ElementAnchor
});