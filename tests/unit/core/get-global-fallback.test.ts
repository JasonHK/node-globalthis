"use strict";

import { getGlobalFallback } from "../../../src/core/get-global-fallback";

const { after, afterEach, before, suite, test } = intern.getPlugin("interface.tdd");
const { assert } = intern.getPlugin("chai");

suite(
    "unit/core/get-global-fallback.test.ts",
    () =>
    {
        suite(
            "getGlobalFallback()",
            () =>
            {
                const browserGlobalFake = {} as typeof window;
                const nodeGlobalFake = {} as typeof global;
        
                let globalReal: typeof globalThis;
                let globalRealDescriptor: PropertyDescriptor;
        
                before(
                    () =>
                    {
                        // Store the real `global` property and its descriptor in a safe place.
                        globalRealDescriptor = Object.getOwnPropertyDescriptor(global, "global")!;
                        globalReal = globalRealDescriptor.value;

                        // Then delete the real `global` property.
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
                        Object.defineProperty(globalReal, "global", globalRealDescriptor);
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
    });
