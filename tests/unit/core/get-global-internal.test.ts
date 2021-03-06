"use strict";

import Sinon from "sinon";

import { getGlobalInternal } from "../../../src/core/get-global-internal";
import * as GetGlobalFallback from "../../../src/core/get-global-fallback";

const { afterEach, beforeEach, suite, test } = intern.getPlugin("interface.tdd");
const { assert } = intern.getPlugin("chai");

suite(
    "unit/core/get-global-internal.test.ts",
    () =>
    {
        suite(
            "getGlobalInternal()",
            () =>
            {
                let getGlobalFallbackMock: Sinon.SinonExpectation;

                beforeEach(
                    () =>
                    {
                        // Mock the `getGlobalFallback` function.
                        getGlobalFallbackMock = Sinon.mock(GetGlobalFallback).expects("getGlobalFallback");
                    });

                afterEach(
                    () =>
                    {
                        // Restore all fakes to its original state.
                        Sinon.restore();
                    });
        
                test(
                    "The global `__GLOBAL__` property refers to the global `this` value",
                    () =>
                    {
                        // Ensure the function returns the global `this` value.
                        assert.strictEqual(getGlobalInternal(), global);

                        // Ensure the `getGlobalFallback` function was not called.
                        Sinon.assert.notCalled(getGlobalFallbackMock);

                        // Ensure `Object.prototype` was restored to its initial state.
                        assert.doesNotHaveAllKeys(Object.prototype, ["__GLOBAL__"]);
                    });
        
                test(
                    "Failed to define `__GLOBAL__` property to `Object.prototype`",
                    () =>
                    {
                        // Store the real `Object.defineProperty` method in a safe place.
                        const definePropertyReal = Object.defineProperty;
        
                        // Simulate `Object.defineProperty` method failed to define `__GLOBAL__` property to
                        // `Object.prototype`.
                        Sinon.stub(Object, "defineProperty")
                            .callsFake(
                                (target, key, descriptor) =>
                                {
                                    // Since I was stubbing `Object.defineProperty` and Sinon.JS's stub feature utilizes this method, I
                                    // have to store the real `Object.defineProperty` method and use it here instead of simply use
                                    // `stub.wrappedMethod` to handle calls from Sinon.JS.
                                    if ((target === Object.prototype) && (key === "__GLOBAL__"))
                                    {
                                        throw new TypeError();
                                    }
                                    else
                                    {
                                        return definePropertyReal(target, key, descriptor);
                                    }
                                });
                        
                        // Executes the function.
                        getGlobalInternal();

                        // Ensure the `getGlobalFallback` function was called once.
                        Sinon.assert.calledOnce(getGlobalFallbackMock);

                        // Ensure `Object.prototype` was restored to its initial state.
                        assert.doesNotHaveAllKeys(Object.prototype, ["__GLOBAL__"]);
                    });
        
                test(
                    "The global `__GLOBAL__` property was not found in the global scope",
                    () =>
                    {
                        // Simulate the global `__GLOBAL__` property was not found in the global scope.
                        Object.defineProperty(
                            global,
                            "__GLOBAL__",
                            {
                                get() { return undefined; },
                                configurable: true,
                            });
        
                        // Executes the function.
                        getGlobalInternal();

                        // Ensure the `getGlobalFallback` function was called once.
                        Sinon.assert.calledOnce(getGlobalFallbackMock);

                        // Ensure `Object.prototype` was restored to its initial state.
                        assert.doesNotHaveAllKeys(Object.prototype, ["__GLOBAL__"]);
        
                        // Restore the global scope to its initial state.
                        delete global.__GLOBAL__;
                    });
            });
    });
