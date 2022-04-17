import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/about");
});

test("should display cards", async ({ page }) => {
  const cards = await page.locator("ul > li", {
    has: page.locator("div > img")
  });

  expect(await cards.count(), {
    message: `should display 10 cards, but found ${await cards.count()}`
  }).toEqual(10);
});

test("card widths should be consistent", async ({ page }) => {
  const cards = await page.locator("main ul > li");
  const widths = await cards.evaluateAll<number[]>((cards) =>
    cards.map((card) => card.clientWidth)
  );
  widths.forEach((width, i) => {
    if (i > 0) {
      expect(Math.abs(widths[0] - width), {
        message: `card width should be consistent within 1 px, but found ${width}`
      }).toBeLessThanOrEqual(1);
    }
  });
});
