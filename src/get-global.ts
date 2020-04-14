"use strict";

import { getGlobalInternal } from "./core/get-global-internal";

import { isObject } from "./utilities/is-object";

/**
 * Retrieve the global `this` value.
 * 
 * The global `globalThis` property exists and it's an object, return it immediately. Otherwise, use
 * the internal polyfill methods to try to retrieve the value.
 * 
 * @since 0.0.1
 * 
 * @returns The global `this` value.
 */
export function getGlobal(): typeof globalThis
{
    if ((typeof globalThis !== "undefined") && isObject(globalThis))
    {
        return globalThis;
    }
    else
    {
        return getGlobalInternal();
    }
}
