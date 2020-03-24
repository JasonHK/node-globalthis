"use strict";

import isObject from "lodash.isobject";

import { getGlobalInternal } from "./core/get-global-internal";

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
