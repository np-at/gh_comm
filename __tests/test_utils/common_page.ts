import { expect, Page } from "@playwright/test";


export type PageTitleTest = {
  title?: string;
};

export const titleNotEmptyTest: (page: Page, expectedTitle?: string) => Promise<void> = (page, expectedTitle?: string) => {
  return page.title().then(title => {
    expect(title).not.toBe("")
  })
}
