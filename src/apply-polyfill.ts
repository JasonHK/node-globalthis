"use strict";

import { globalThis as context } from "./globalthis";

import { isObject } from "./utilities/is-object";

/**
 * Apply the `globalThis` polyfill to the global scope if the global `globalThis` property does not
 * exist, or its attributes do not compile with the specification.
 */
export function applyPolyfill(): void
{
    const descriptor = Object.getOwnPropertyDescriptor(context, "globalThis");
    if (isObject(descriptor))
    {
        const { configurable, enumerable, value, writable } = descriptor;
        if (configurable && writable && !enumerable && (value === context)) { return; }
    }

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
