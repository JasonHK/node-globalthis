"use strict";

import { getGlobal } from "./get-global";

export function applyPolyfill(): void
{
    const context = getGlobal();

    if (!Object.prototype.hasOwnProperty.call(context, "globalThis") || (context.globalThis !== context))
    {
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
}
