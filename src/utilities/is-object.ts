"use strict";

export function isObject(payload: unknown): boolean
{
    return ((typeof payload === "object") && (payload !== null));
}
