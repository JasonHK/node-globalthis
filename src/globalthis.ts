"use strict";

import { getGlobal } from "./get-global";

import { IGlobalThis } from "./interfaces/globalthis";

export const globalThis: IGlobalThis = getGlobal();
