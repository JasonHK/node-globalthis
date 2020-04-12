"use strict";

import "../interfaces/global";

import { MAGIC_GLOBAL_KEY } from "../constants";

import { isObject } from "../utilities/is-object";

import { getGlobalFallback } from "./get-global-fallback";

/**
 * A reliable method to retrieve the global `this` value.
 * 
 * @hidden
 * 
 * @returns The global `this` value.
 */
export function getGlobalInternal(): typeof globalThis
{
    try
    {
        Object.defineProperty(
            Object.prototype,
            MAGIC_GLOBAL_KEY,
            {
                get() { return this; },
                configurable: true,
            });
    }
    catch
    {
        return getGlobalFallback();
    }

    try
    {
        if ((typeof __GLOBAL__ !== "undefined") && isObject(__GLOBAL__))
        {
            return __GLOBAL__;
        }
        else
        {
            return getGlobalFallback();
        }
    }
    finally
    {
        // Restore `Object.prototype` to its initial state.
        delete Object.prototype[MAGIC_GLOBAL_KEY];
    }
}
