/* eslint-disable */

// FIXME: putting these declarations in detox.d.ts makes them available in all
// test modules clashing with Jest's expect
declare const device: Detox.Device;
declare const element: Detox.Element;
declare const waitFor: Detox.WaitFor;
declare const expect: Detox.Expect<Detox.Expect<any>>;
declare const by: Detox.Matchers;

import * as detox from "detox";
import adapter from "detox/runners/jest/adapter";
import { Millisecond } from "italia-ts-commons/lib/units";
import { delayAsync } from "../utils/timer";

const config = require("../../package.json").detox;

// Set the default test timeout (in milliseconds)
jest.setTimeout(5 * 60 * 1000);
(jasmine as any).getEnv().addReporter(adapter);

const WAIT_TIMEOUT_MS = 30 * 1000;

describe("e2e app", () => {
  const loginButtonId = "landing-button-login-spid";
  // const idpsGridId = "idps-view";
  const posteIdpButtonId = "idp-posteid-button";
  // const idpWebviewId = "idp-webview";

  beforeAll(async () => {
    await detox.init(config, { launchApp: false });
    await device.launchApp({ permissions: { notifications: "YES" } });
    // await device.reloadReactNative();
    // await device.disableSynchronization();
  });

  beforeEach(async () => {
    await adapter.beforeEach();
  });

  afterAll(async () => {
    await adapter.afterAll();
    await detox.cleanup();
  });

  it("should display SPID login button", async () => {
    await waitFor(element(by.id(loginButtonId)))
      .toBeVisible()
      .withTimeout(WAIT_TIMEOUT_MS);
    await expect(element(by.id(loginButtonId))).toBeVisible();
  });

  it("should display SPID IdP list", async () => {
    // await waitFor(element(by.id(loginButtonId)))
    //   .toBeVisible()
    //   .withTimeout(WAIT_TIMEOUT_MS);
    await element(by.id(loginButtonId)).tap();

    await waitFor(element(by.id(posteIdpButtonId)))
      .toBeVisible()
      .withTimeout(WAIT_TIMEOUT_MS);
    await expect(element(by.id(posteIdpButtonId))).toBeVisible();
  });

  it("should open posteid login", async () => {
    // await waitFor(element(by.id(loginButtonId)))
    //   .toBeVisible()
    //   .withTimeout(WAIT_TIMEOUT_MS);
    // await element(by.id(loginButtonId)).tap();

    // await waitFor(element(by.id(posteIdpButtonId)))
    //   .toBeVisible()
    //   .withTimeout(WAIT_TIMEOUT_MS);
    await element(by.id(posteIdpButtonId)).tap();
    const re = await element(by.text("LOGIN"));
    console.log("questa!", re);
    await waitFor(element(by.text("LOGIN"))).toBeVisible();

    //await element(by.text("LOGIN")).tap();

    //await waitFor(element(by.id("back-button"))).toBeVisible();
    //.withTimeout(WAIT_TIMEOUT_MS);
    //await expect(element(by.id("back-button"))).toBeVisible();
    const waitTime = (5 * 1000) as Millisecond;
    await delayAsync(waitTime); // wait 10s to let webview load
  });
});
