"use strict";

import isObject from "lodash.isobject";

import { getGlobalFallback } from "./get-global-fallback";

export function getGlobal(): typeof globalThis
{
    try
    {
        Object.defineProperty(
            Object.prototype,
            "__GLOBAL__",
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
        delete Object.prototype.__GLOBAL__;
    }
}
