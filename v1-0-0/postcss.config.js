// v1-0-0/postcss.config.js
"use strict";

import autoprefixer from "autoprefixer";
import postcssNested from "postcss-nested";
export default {
    plugins: [
        postcssNested,
        autoprefixer
    ]
}