"use strict";

/**
 * Representing the global `this` value.
 * 
 * @notes
 * This type alias was required since the type of a variable named `globalThis` cannot be set as
 * `typeof globalThis` directly.
 * 
 * @since 0.0.1
 */
export type IGlobalThis = typeof globalThis;
