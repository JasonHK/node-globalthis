"use strict";

/**
 * Determine whether the payload is an object or not.
 * 
 * @remarks
 * Functions will not be count as an object by this function.
 * 
 * @hidden
 * 
 * @param payload An value to be determined.
 * @returns The assertion result.
 */
export function isObject(payload: unknown): boolean
{
    return ((typeof payload === "object") && (payload !== null));
}
