import { test, expect, PlaywrightTestArgs, Page } from "@playwright/test";

// // @ts-ignore
// export const pageTitleTest = ({ test, title
// }) => {
//   if (title) {
//     // @ts-ignore
//     return test(`Page title is ${title}`, async t => {
//       const page = await t.page
//       const actualTitle = await page.title()
//       expect(actualTitle).toBe(title)
//     })
//   }
//   // @ts-ignore
//   return test(`Page title is not empty`, async t => {
//     const page = await t.page
//     const actualTitle = await page.title()
//     expect(actualTitle).not.toBe("")
//   })
//
// }
export const titleNotEmptyTest: (page: Page, expectedTitle?: string) => Promise<void> = (page, expectedTitle?: string) => {
  return page.title().then(title => {
    expect(title).not.toBe("")
  })
}
//
// export const titleNotEmpty =  (page) => test(`Page title is not empty`, async t => {
//   const page = await t.page
//   const actualTitle = await page.title()
//   expect(actualTitle, {message: `actual title found as ${actualTitle}`}).not.toBe("")
// })