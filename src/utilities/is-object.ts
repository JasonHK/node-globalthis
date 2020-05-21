"use strict";

/**
 * Determine whether the payload is an object or not.
 * 
 * @internal
 * 
 * @param payload An value to be determined.
 * @returns The assertion result.
 */
export function isObject(payload: unknown): payload is object
{
    return ((typeof payload === "object") && (payload !== null));
}
