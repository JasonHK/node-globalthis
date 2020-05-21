"use strict";

import { getGlobal } from "./get-global";

import type { IGlobalThis } from "./interfaces/globalthis";

/**
 * The global `this` value.
 * 
 * @since 0.0.1
 */
export const globalThis: IGlobalThis = getGlobal();
