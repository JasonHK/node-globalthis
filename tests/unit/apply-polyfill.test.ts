"use strict";

import Sinon, { SinonStub } from "sinon";

import { applyPolyfill } from "../../src/apply-polyfill";
import { beforeEach } from "intern/lib/interfaces/tdd";

const { afterEach, suite, test } = intern.getPlugin("interface.tdd");
const { assert } = intern.getPlugin("chai");

suite(
    "unit/apply-folyfill.test.ts",
    () =>
    {
        suite(
            "applyPolyfill()",
            () =>
            {
                beforeEach(
                    () =>
                    {
                    });

                afterEach(
                    () =>
                    {
                        Sinon.restore();
                    });

                test(
                    "The global `globalThis` property exists and its attributes compile with the specification",
                    () =>
                    {
                        stubGetOwnPropertyDescriptor(
                            () =>
                            {
                                return {
                                    value: global,
                                    configurable: true,
                                    enumerable: false,
                                    writable: true,
                                };
                            });

                        const definePropertyStub = stubDefineProperty();
                        
                        // Executes the function.
                        applyPolyfill();

                        // Ensure the `Object.defineProperty` method was not called.
                        Sinon.assert.notCalled(definePropertyStub);
                    });

                test(
                    "The global `globalThis` property does not exist",
                    () =>
                    {
                        stubGetOwnPropertyDescriptor(() => { return undefined });

                        const definePropertyStub = stubDefineProperty();
                        
                        // Executes the function.
                        applyPolyfill();

                        // Ensure the `Object.defineProperty` method was called once.
                        Sinon.assert.calledOnce(definePropertyStub);
                    });

                test(
                    "The global `globalThis` property exists, but the `value` property was not the global `this` value",
                    () =>
                    {
                        stubGetOwnPropertyDescriptor(
                            () =>
                            {
                                return {
                                    value: {},
                                    configurable: true,
                                    enumerable: false,
                                    writable: true,
                                };
                            });

                        const definePropertyStub = stubDefineProperty();
                        
                        // Executes the function.
                        applyPolyfill();

                        // Ensure the `Object.defineProperty` method was called once.
                        Sinon.assert.calledOnce(definePropertyStub);
                    });

                test(
                    "The global `globalThis` property exists, but the attributes did not match the specification",
                    () =>
                    {
                        stubGetOwnPropertyDescriptor(
                            () =>
                            {
                                return {
                                    value: global,
                                    configurable: false,
                                    enumerable: true,
                                    writable: false,
                                };
                            });

                        const definePropertyStub = stubDefineProperty();
                        
                        // Executes the function.
                        applyPolyfill();

                        // Ensure the `Object.defineProperty` method was called once.
                        Sinon.assert.calledOnce(definePropertyStub);
                    });

                test(
                    "Failed to define `globalThis` property to the global scope",
                    () =>
                    {
                        stubGetOwnPropertyDescriptor(() => { return undefined });

                        stubDefineProperty(() => { throw new TypeError(); });

                        // Ensure an error was thrown.
                        assert.throws(() => { applyPolyfill(); });
                    });

                function stubDefineProperty(onCalled?: IDefinePropertyBehavior): IDefinePropertyStub
                {
                    onCalled = onCalled ?? ((target) => { return target });

                    // Store the real `Object.defineProperty` method in a safe place.
                    const definePropertyReal = Object.defineProperty;

                    // Simulate the behavior of `Object.defineProperty` method.
                    const stub = Sinon.stub(Object, "defineProperty")
                        .callsFake(
                            (target, key, descriptor) =>
                            {
                                // Since I was stubbing `Object.defineProperty` and Sinon.JS's stub feature utilizes this method, I
                                // have to store the real `Object.defineProperty` method and use it here instead of simply use
                                // `stub.wrappedMethod` to handle calls from Sinon.JS.
                                return ((target === global) && (key === "globalThis"))
                                    ? onCalled!(target, key, descriptor)
                                    : definePropertyReal(target, key, descriptor);
                            });

                    stub.resetHistory();

                    return stub;
                }

                function stubGetOwnPropertyDescriptor(onCalled: IGetOwnPropertyDescriptorBehavior): IGetOwnPropertyDescriptorStub
                {
                    // Simulate the behavior of `Object.getOwnPropertyDescriptor` method.
                    const stub = Sinon.stub(Object, "getOwnPropertyDescriptor")
                        .callsFake(
                            (target, key) =>
                            {
                                // Since I was stubbing `Object.getOwnPropertyDescriptor` and Sinon.JS's stub feature utilizes this
                                // method, I have to use `stub.wrappedMethod` to handle calls from Sinon.JS.
                                return ((target === global) && (key === "globalThis"))
                                    ? onCalled(target, key)
                                    : stub["wrappedMethod"](target, key);
                            });

                    return stub;
                }

                interface IDefinePropertyBehavior
                {
                    (target: any, key: string | number | symbol, descriptor: PropertyDescriptor): any;
                }

                type IDefinePropertyStub = SinonStub<[any, string | number | symbol, PropertyDescriptor], any>;

                interface IGetOwnPropertyDescriptorBehavior
                {
                    (target: any, key: string | number | symbol): PropertyDescriptor | undefined;
                }

                type IGetOwnPropertyDescriptorStub = SinonStub<[any, string | number | symbol], PropertyDescriptor | undefined>;
            });
    });
