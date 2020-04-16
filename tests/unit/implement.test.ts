"use strict";

import Sinon, { SinonExpectation } from "sinon";

import * as ApplyPolyfill from "../../src/apply-polyfill";

const { after, afterEach, before, beforeEach, suite, test } = intern.getPlugin("interface.tdd");
const { assert } = intern.getPlugin("chai");

suite(
    "unit/implement.test.ts",
    () =>
    {
        let applyPolyfillMock: SinonExpectation;

        before(
            () =>
            {
                
            });

        beforeEach(
            () =>
            {
                applyPolyfillMock = Sinon.mock(ApplyPolyfill).expects("applyPolyfill");
            });

        afterEach(
            () =>
            {
                Sinon.restore();
            });

        test(
            "Try to apply the `globalThis` polyfill to the global scope",
            async () =>
            {
                await import("../../src/implement");

                Sinon.assert.calledOnce(applyPolyfillMock);
            });
    });
