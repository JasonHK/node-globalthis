"use strict";

import { getGlobalInternal } from "./core/get-global-internal";

import type { IGlobalThis } from "./interfaces/globalthis";

import { isValidContext } from "./utilities/is-valid-context";

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
export function getGlobal(): IGlobalThis
{
    return ((typeof(globalThis) !== "undefined") && isValidContext(globalThis))
        ? globalThis
        : getGlobalInternal();
}
