"use strict";

import { getGlobalInternal } from "./core/get-global-internal";

import { isObject } from "./utilities/is-object";

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
