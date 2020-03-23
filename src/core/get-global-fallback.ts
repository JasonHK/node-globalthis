"use strict";

import isObject from "lodash.isobject";

export function getGlobalFallback(): typeof globalThis
{
    if ((typeof self !== "undefined") && isObject(self))
    {
        // The global `self` property, available in browser and Web Worker environment.
        return self;
    }
    else if ((typeof window !== "undefined") && isObject(window))
    {
        // The global `window` property, available in browser environment.
        return window;
    }
    else if ((typeof global !== "undefined") && isObject(global))
    {
        // The global `global` property, available in Node.js runtime environment.
        return global;
    }
    else
    {
        // Throws an `Error` when none of the known global properties exist.
        throw new Error("Unable to locate the global `this` object.");
    }
}
