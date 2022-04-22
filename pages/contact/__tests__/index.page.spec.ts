import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/contact", { waitUntil: "domcontentloaded" });
});

test("Contact page", async ({ page }) => {
  // const browser = await t.createBrowser()
  const modaButton = page.locator('button[data-test="modal_button"]', {
    hasText: "Open Modal"
  });
  await modaButton.click({ button: "left" });
  await page.waitForSelector("body.ReactModal__Body--open");

  expect(await page.evaluate(() => document.activeElement?.getAttribute("aria-modal") ?? "")).toBe(
    "true"
  );
});
