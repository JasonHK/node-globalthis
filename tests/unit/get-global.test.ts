"use strict";

import Sinon from "sinon";

import { getGlobal } from "../../src/get-global";
import * as GetGlobalInternal from "../../src/core/get-global-internal";

const { after, afterEach, before, suite, test } = intern.getPlugin("interface.tdd");
const { assert } = intern.getPlugin("chai");

suite(
    "unit/get-global.test.ts",
    () =>
    {
        suite(
            "getGlobal()",
            () =>
            {
                const globalThisFake = {} as typeof globalThis;
        
                let globalThisRealDescriptor: PropertyDescriptor | undefined;
        
                before(
                    () =>
                    {
                        globalThisRealDescriptor = Object.getOwnPropertyDescriptor(global, "globalThis");
                        if (globalThisRealDescriptor)
                        {
                            // @ts-ignore
                            delete global.globalThis;
                        }
                    });
        
                afterEach(
                    () =>
                    {
                        Sinon.restore();
        
                        // @ts-ignore
                        if ("globalThis" in global) { delete global.globalThis; }
                    });
        
                after(
                    () =>
                    {
                        if (globalThisRealDescriptor)
                        {
                            Object.defineProperty(global, "globalThis", globalThisRealDescriptor);
                        }
                    });
        
                test(
                    "The global `globalThis` property exists",
                    () =>
                    {
                        // @ts-ignore
                        global.globalThis = globalThisFake;
                        assert.strictEqual(getGlobal(), globalThisFake);
                    });
        
                test(
                    "The global `globalThis` property doesn't exist",
                    () =>
                    {
                        const getGlobalInternalMocked = Sinon.mock(GetGlobalInternal).expects("getGlobalInternal");

                        getGlobal();
                        Sinon.assert.calledOnce(getGlobalInternalMocked);
                    });
            });
    });
