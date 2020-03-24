"use strict";

import Sinon from "sinon";

import { getGlobalInternal } from "../../../src/core/get-global-internal";
import * as GetGlobalFallback from "../../../src/core/get-global-fallback";

const { afterEach, suite, test } = intern.getPlugin("interface.tdd");
const { assert } = intern.getPlugin("chai");

suite(
    "unit/core/get-global-internal.test.ts",
    () =>
    {
        suite(
            "getGlobalInternal()",
            () =>
            {
                afterEach(
                    () =>
                    {
                        Sinon.restore();
                    });
        
                test(
                    "The global `__GLOBAL__` property refers to the global `this` value",
                    () =>
                    {
                        assert.strictEqual(getGlobalInternal(), global);
                        assert.doesNotHaveAllKeys(Object.prototype, ["__GLOBAL__"]);
                    });
        
                test(
                    "Failed to define `__GLOBAL__` property to `Object.prototype`",
                    () =>
                    {
                        const definePropertyReal = Object.defineProperty;
        
                        Sinon.stub(Object, "defineProperty")
                            .callsFake(
                                (target, key, descriptor) =>
                                {
                                    if ((target === Object.prototype) && (key === "__GLOBAL__"))
                                    {
                                        throw new TypeError();
                                    }
                                    else
                                    {
                                        return definePropertyReal(target, key, descriptor);
                                    }
                                });
        
                        const getGlobalFallbackMocked = Sinon.mock(GetGlobalFallback).expects("getGlobalFallback");
                        
                        getGlobalInternal();
                        Sinon.assert.calledOnce(getGlobalFallbackMocked);
                    });
        
                test(
                    "The global `__GLOBAL__` property was not found in the global scope",
                    () =>
                    {
                        Object.defineProperty(
                            global,
                            "__GLOBAL__",
                            {
                                get() { return undefined; },
                                configurable: true,
                            });
        
                        const getGlobalFallbackMocked = Sinon.mock(GetGlobalFallback).expects("getGlobalFallback");
        
                        getGlobalInternal();
                        Sinon.assert.calledOnce(getGlobalFallbackMocked);
                        assert.doesNotHaveAllKeys(Object.prototype, ["__GLOBAL__"]);
        
                        delete global.__GLOBAL__;
                    });
            });
    });
