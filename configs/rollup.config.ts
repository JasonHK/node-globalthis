"use strict";

import RollupPluginTS from "@wessberg/rollup-plugin-ts";
import Path from "path";
import { RollupOptions } from "rollup";

namespace DIRECTORIES
{
    export const ROOT = Path.resolve(__dirname, "../");

    export const CONFIGS = Path.resolve(ROOT, "./configs");
    export const DISTRIBUTE = Path.resolve(ROOT, "./dist");
    export const LIBRARY = Path.resolve(ROOT, "./lib");
    export const SOURCE = Path.resolve(ROOT, "./src");
}

export default {
    input: {
        "index": Path.resolve(DIRECTORIES.SOURCE, "./index.ts"),
        "implement": Path.resolve(DIRECTORIES.SOURCE, "./implement.ts"),
    },
    output: [
        {
            dir: DIRECTORIES.LIBRARY,
            format: "commonjs",
        },
        {
            dir: DIRECTORIES.LIBRARY,
            format: "module",
            entryFileNames: "[name].mjs",
            chunkFileNames: "[name]-[hash].mjs",

        },
    ],
    manualChunks: {},
    plugins: [
        RollupPluginTS(
            {
                // tsconfig: Path.resolve(DIRECTORIES.CONFIGS, "./tsconfig.build.src.json"),
                tsconfig: Path.resolve(DIRECTORIES.CONFIGS, "./tsconfig.build.src.library.json"),
            }),
    ],
} as RollupOptions;
