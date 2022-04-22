import { ViewportSize } from "playwright-core";
import { test as base } from "@playwright/test";

export const viewports: ViewportSize[] = [
  {
    width: 320,
    height: 480
  },
  {
    width: 768,
    height: 1024
  },
  {
    width: 1280,
    height: 800
  }
];
export type ViewPortTestOptions = {
    viewportSize: ViewportSize;
    skip: boolean;
    skipReason?: string;
};
const test = base.extend<ViewPortTestOptions>({
    viewportSize: [{
        width: 1280,
        height: 800,
    }, {option: true}],
})
