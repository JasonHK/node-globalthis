"use strict";

import Sinon from "sinon";

import { getGlobal } from "../../../src/core/get-global";
import * as GetGlobalFallback from "../../../src/core/get-global-fallback";

const { afterEach, suite, test } = intern.getPlugin("interface.tdd");
const { assert } = intern.getPlugin("chai");

suite(
    "getGlobal()",
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
                assert.strictEqual(getGlobal(), global);
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
                
                getGlobal();
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

                getGlobal();
                Sinon.assert.calledOnce(getGlobalFallbackMocked);
                assert.doesNotHaveAllKeys(Object.prototype, ["__GLOBAL__"]);

                delete global.__GLOBAL__;
            });
    });
