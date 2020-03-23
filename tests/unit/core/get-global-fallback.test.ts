"use strict";

import { getGlobalFallback } from "../../../src/core/get-global-fallback";

const { after, afterEach, before, suite, test } = intern.getPlugin("interface.tdd");
const { assert } = intern.getPlugin("chai");

suite(
    "getGlobalFallback()",
    () =>
    {
        const fakeBrowserGlobal = {} as unknown as Window & typeof globalThis;
        const fakeNodeGlobal = {} as unknown as NodeJS.Global & typeof globalThis;

        let realGlobal: typeof global;

        before(
            () =>
            {
                // Store the real `global` property in a safe place, then delete the property.
                realGlobal = global;
                delete global.global;
            });
        
        afterEach(
            () =>
            {
                // Delete the fake global properties if needed.
                if ("global" in realGlobal) { delete realGlobal.global; }
                if ("self" in realGlobal) { delete realGlobal.self; }
                if ("window" in realGlobal) { delete realGlobal.window; }
            });
        
        after(
            () =>
            {
                // Restore the real `global` property.
                realGlobal.global = realGlobal;
            });
            
        test(
            "Global `global` property exists",
            () =>
            {
                realGlobal.global = fakeNodeGlobal;
                assert.strictEqual(getGlobalFallback(), fakeNodeGlobal);
            });

        test(
            "Global `self` property exists",
            () =>
            {
                realGlobal.self = fakeBrowserGlobal;
                assert.strictEqual(getGlobalFallback(), fakeBrowserGlobal);
            });
        
        test(
            "Global `window` property exists",
            () =>
            {
                realGlobal.window = fakeBrowserGlobal;
                assert.strictEqual(getGlobalFallback(), fakeBrowserGlobal);
            });

        test(
            "None of the known global properties exist",
            () =>
            {
                assert.throws(() => { getGlobalFallback(); });
            });
    });
