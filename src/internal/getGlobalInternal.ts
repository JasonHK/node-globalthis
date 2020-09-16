import { IGlobalThis } from "../IGlobalThis";

import { isObject } from "./utilities/isObject";

/**
 * @internal
 */
declare global
{
    var __GLOBAL__: IGlobalThis;

    interface Object
    {
        __GLOBAL__?: this;
    }
}

/**
 * @internal
 */
const ERROR_LOCATE_GLOBAL_FAILED = "Unable to locate the global `this` value.";

/**
 * A reliable method to retrieve the global `this` value.
 * 
 * This method utilized the fact that most of the ECMAScript implementations the global object was
 * inherited from `Object.prototype`.
 * 
 * @internal
 * @since 0.0.1
 * @see [*A horrifying `globalThis` polyfill in universal JavaScript*](https://mathiasbynens.be/notes/globalthis)
 *      by [Mathias Bynens](https://mathiasbynens.be/)
 * 
 * @returns The global `this` value.
 */
export function getGlobalInternal(): IGlobalThis
{
    try
    {
        Object.defineProperty(
            Object.prototype,
            "__GLOBAL__",
            {
                get(this: Object) { return this; },
                configurable: true,
            });
    }
    catch
    {
        return getGlobalFallback();
    }

    try
    {
        return ((typeof __GLOBAL__ !== "undefined") && isObject(__GLOBAL__))
            ? __GLOBAL__
            : getGlobalFallback();
    }
    finally
    {
        // Restore `Object.prototype` to its initial state.
        delete Object.prototype["__GLOBAL__"];
    }
}

/**
 * A fallback method to retrieve the global `this` value.
 * 
 * This method will search for the known properties that the global `this` value possibly refers to.
 * Then it will return the value if one of the properties exist, otherwise, it will throw an `Error`
 * instead.
 * 
 * @internal
 * @since 0.0.1
 * 
 * @returns The global `this` value.
 */
function getGlobalFallback(): IGlobalThis
{
    if ((typeof self !== "undefined") && isObject(self))
    {
        // The global `self` property, available in browser and Web Worker environment.
        return self;
    }
    else if ((typeof window !== "undefined") && isObject(window))
    {
        // The global `window` property, available in browser environment.
        return window;
    }
    else if ((typeof global !== "undefined") && isObject(global))
    {
        // The global `global` property, available in Node.js runtime environment.
        return global;
    }
    else
    {
        // Throws an `Error` when none of the known global properties exist.
        throw new Error(ERROR_LOCATE_GLOBAL_FAILED);
    }
}
