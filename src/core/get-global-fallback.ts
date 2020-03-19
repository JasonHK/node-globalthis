"use strict";

import isObject from "lodash.isobject";

export function getGlobalFallback(): typeof globalThis
{
    if ((typeof self !== "undefined") && isObject(self))
    {
        return self;
    }
    else if ((typeof window !== "undefined") && isObject(window))
    {
        return window;
    }
    else if ((typeof global !== "undefined") && isObject(global))
    {
        return global as unknown as typeof globalThis;
    }
    else
    {
        throw new Error("Unable to locate the global `this` object.");
    }
}
