"use strict";

import { ERROR_APPLY_POLYFILL_FAILED } from "./constants";
import { getGlobal } from "./get-global";

import type { IGlobalThis } from "./interfaces/globalthis";

import { isObject } from "./utilities/is-object";

/**
 * The global `this` value.
 * 
 * @internal
 */
let context: IGlobalThis;

/**
 * Apply the `globalThis` polyfill to the global scope if the global `globalThis` property does not
 * exist, or its attributes do not compile with the specification.
 * 
 * @since 0.0.1
 * 
 * @param bypassCache Whether to use the cached context, if exist. Defaults to `false`.
 */
export function applyPolyfill(bypassCache: boolean = false): void
{
    if (bypassCache || !isObject(context)) { context = getGlobal(); }

    // Determine whether the global `globalThis` property exists or not. Then determine whether its
    // attributes compile with the specification or not.
    //
    // If all of the checks above passed, abort the polyfill operation.
    const descriptor = Object.getOwnPropertyDescriptor(context, "globalThis");
    if (isObject(descriptor))
    {
        const { configurable, enumerable, value, writable } = descriptor;
        if (configurable && writable && !enumerable && (value === context)) { return; }
    }

    // If any of the checks above failed, try to apply the polyfill to the global scope.
    try
    {
        Object.defineProperty(
            context,
            "globalThis",
            {
                value: context,
                configurable: true,
                writable: true,
            });
    }
    catch
    {
        throw new Error(ERROR_APPLY_POLYFILL_FAILED);
    }
}
