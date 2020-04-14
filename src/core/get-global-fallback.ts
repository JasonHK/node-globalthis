"use strict";

import { isObject } from "../utilities/is-object";

/**
 * A fallback method to retrieve the global `this` value.
 * 
 * This method will search for the known properties that the global `this` value possibly refers to.
 * Then it will return the value if one of the properties exist, otherwise, it will throw an `Error`
 * instead.
 * 
 * @returns The global `this` value.
 */
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
        throw new Error("Unable to locate the global `this` value.");
    }
}
