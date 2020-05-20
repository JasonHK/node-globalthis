"use strict";

/**
 * Determine whether the payload is an object or not.
 * 
 * @notes
 * Functions will not be count as an object by this function.
 * 
 * @internal
 * @since 0.0.1
 * 
 * @param payload An value to be determined.
 * @returns The assertion result.
 */
export function isObject(payload: unknown): payload is object
{
    return ((typeof payload === "object") && (payload !== null));
}
