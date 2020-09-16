import { IGlobalThis } from "./IGlobalThis";
import { getGlobal } from "./getGlobal";

/**
 * The global `this` value.
 * 
 * @since 0.0.1
 */
export const globalThis: IGlobalThis = getGlobal();
