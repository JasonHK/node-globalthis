"use strict";

import isObject from "lodash.isobject";

import { getGlobal as getGlobalInternal } from "./core/get-global";

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
