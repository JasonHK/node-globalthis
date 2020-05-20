"use strict";

export const ERROR_APPLY_POLYFILL_FAILED = "Failed to apply the global `globalThis` property polyfill.";

export const ERROR_LOCATE_GLOBAL_FAILED = "Unable to locate the global `this` value.";

/**
 * The name of the property that will be defined to `Object.prototype`.
 * 
 * @internal
 * @since 0.0.1
 */
export const MAGIC_GLOBAL_KEY = "__GLOBAL__";
