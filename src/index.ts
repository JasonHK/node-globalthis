"use strict";

import { getGlobal } from "./get-global";

export const globalThis = getGlobal();

export * from "./apply-polyfill";
export * from "./get-global";

export default globalThis;
