"use strict";

import { globalThis as context } from "./globalthis";

import { isObject } from "./utilities/is-object";

/**
 * Apply the `globalThis` polyfill to the global scope if the global `globalThis` property does not
 * exist, or its attributes do not compile with the specification.
 * 
 * @since 0.0.1
 */
export function applyPolyfill(): void
{
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
        throw new Error("Failed to apply the global `globalThis` property polyfill.");
    }
}
