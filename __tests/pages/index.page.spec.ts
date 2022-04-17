import { test, expect, Page } from "@playwright/test";
import { titleNotEmptyTest } from "@test/test_utils/common_page";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test("Home page should have a title", async ({ page }, testInfo) => titleNotEmptyTest(page));

test("accessibility tree", async ({ page }) => {
  const accessibilityTree = await page.accessibility.snapshot();
  // console.log(JSON.stringify(accessibilityTree, null, 2));
  // expect(accessibilityTree).toMatchSnapshot();
});