import { expect, test } from "@playwright/test";
import { titleNotEmptyTest } from "@test/test_utils/common_page";

test.beforeEach(async ({page}) => {
  const url = "http://localhost:3000/pages/timeline";
  await page.goto(url);
});
test("Timeline page should have a title", async ({page}) => titleNotEmptyTest(page))
