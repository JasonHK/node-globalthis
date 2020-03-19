"use strict";

declare global
{
    let __GLOBAL__: typeof globalThis;

    interface Object
    {
        __GLOBAL__: this;
    }
}

export {};
