"use strict";

import { getGlobalFallback } from "../../../src/core/get-global-fallback";

const { after, afterEach, before, suite, test } = intern.getPlugin("interface.tdd");
const { assert } = intern.getPlugin("chai");

suite(
    "getGlobalFallback()",
    () =>
    {
        const browserGlobalFake = {} as unknown as Window & typeof globalThis;
        const nodeGlobalFake = {} as unknown as NodeJS.Global & typeof globalThis;

        let globalReal: typeof global;

        before(
            () =>
            {
                // Store the real `global` property in a safe place, then delete the property.
                globalReal = global;
                delete global.global;
            });
        
        afterEach(
            () =>
            {
                // Delete the fake global properties if needed.
                if ("global" in globalReal) { delete globalReal.global; }
                if ("self" in globalReal) { delete globalReal.self; }
                if ("window" in globalReal) { delete globalReal.window; }
            });
        
        after(
            () =>
            {
                // Restore the real `global` property.
                globalReal.global = globalReal;
            });
            
        test(
            "The global `global` property exists",
            () =>
            {
                globalReal.global = nodeGlobalFake;
                assert.strictEqual(getGlobalFallback(), nodeGlobalFake);
            });

        test(
            "The global `self` property exists",
            () =>
            {
                globalReal.self = browserGlobalFake;
                assert.strictEqual(getGlobalFallback(), browserGlobalFake);
            });
        
        test(
            "The global `window` property exists",
            () =>
            {
                globalReal.window = browserGlobalFake;
                assert.strictEqual(getGlobalFallback(), browserGlobalFake);
            });

        test(
            "None of the known global properties exist",
            () =>
            {
                assert.throws(() => { getGlobalFallback(); });
            });
    });
