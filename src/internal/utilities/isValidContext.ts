import { IGlobalThis } from "../../IGlobalThis";

import { isObject } from "./isObject";

/**
 * Determine whether the payload is a valid `globalThis` value or not.
 * 
 * @internal
 * 
 * @param payload An value to be determined.
 * @returns The assertion result.
 */
export function isValidContext(payload: unknown): payload is IGlobalThis
{
    // Return `false` if the payload is not an object.
    if (!isObject(payload)) { return false; }

    // Retrieve the descriptor of `globalThis` property in the payload. Then determine whether the
    // property exists or not (the value is not `undefined`).
    const descriptor = Object.getOwnPropertyDescriptor(payload, "globalThis");
    if (isObject(descriptor))
    {
        // If the property exists, retrieve the attributes of it. Return `true` if its attributes compile
        // with the specification, return `false` otherwise.
        const { configurable, enumerable, value, writable } = descriptor;
        return !!(configurable && writable && !enumerable && (value === payload));
    }
    
    // Return `false` if the property does not exist.
    return false;
}
