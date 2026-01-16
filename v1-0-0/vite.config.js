"use strict";

import {defineConfig} from "vite";
import {dirname, resolve, relative, extname} from "node:path";
import {fileURLToPath} from "node:url";
import { globSync } from 'glob';

import mkcert from 'vite-plugin-mkcert'

const __dirname = dirname(fileURLToPath(import.meta.url));

const mods = Object.values(
    globSync('src/**/index.js').map(file => resolve(file))
);

/**
 * @type {Object}
 */
const settings = {
    base: "./",
    root: "./src",
    publicDir: "../static",
    build: {
        emptyOutDir: true,
        appType: "mpa",
        manifest: false,
        assetsDir: "assets",
        outDir: resolve(__dirname, "dist"),
        //minify: false,
        minify: "terser",
        target: "es2020",
        terserOptions: {
            mangle: false,
            module: true,
            format: {
                preamble: "/** juliojamil.github.io assets; follow me on Twitch! @juliojamil **/"
            }
        },
        modulePreload: false,
        emitAssets: true,
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                entryFileNames: 'assets/js/app-[hash:10].js',
                format: 'es',
                assetFileNames: 'assets/[name][extname]'
            },
            input: [
                resolve(__dirname, "src", "index.html"),
                resolve(__dirname, "src", "app", "mods", "container", "shadow.js"),
                ...mods
            ]
        }
    },
    optimizeDeps: {
        keepNames: true
    },
    css: {
        postcss: {
            config: "./post.config.js"
        }
    },
    resolve: {
        alias: {
            "@styles": resolve(__dirname, "src", "styles"),
            "@components": resolve(__dirname, "src", "app", "mods"),
        }
    },
    server: {
        cors: {
            origin: "https://www.twitch.tv/juliojamil"
        },
        open: false
    },
    plugins: [
        mkcert({
            hosts: ["localhost"],
            force: true,
            savePath: resolve(__dirname, "..", "dev", "mkcert")
        })
    ]
};

export default defineConfig(settings);