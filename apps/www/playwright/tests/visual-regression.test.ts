import { test, expect, Page } from "@playwright/test";

const SM_VIEWPORT = { width: 430, height: 932 };
const MD_VIEWPORT = { width: 740, height: 1024 };
const LG_VIEWPORT = { width: 1500, height: 900 };

const pages = [
  { path: "/", name: "home" },
  { path: "/docs", name: "docs" },
  { path: "/docs/getting-started", name: "docs-getting-started" },
  { path: "/docs/picture", name: "docs-picture" },
  { path: "/docs/background-image", name: "docs-background-image" },
  { path: "/examples/picture", name: "examples-picture" },
  { path: "/examples/background-image", name: "examples-background-image" },
  { path: "/blog", name: "blog" },
  { path: "/blog/next-image-plus-v1", name: "blog-next-image-plus-v1" },
  { path: "/examples-pages", name: "examples-pages" },
  { path: "/examples-pages/picture", name: "examples-pages-picture" },
  {
    path: "/examples-pages/background-image",
    name: "examples-pages-background-image",
  },
];

const viewports = [
  { label: "sm", size: SM_VIEWPORT },
  { label: "md", size: MD_VIEWPORT },
  { label: "lg", size: LG_VIEWPORT },
];

// Unstick sticky elements so they don't repeat in full-page screenshots
async function unstickHeaders(page: Page) {
  await page.addStyleTag({
    content: `
      [role="banner"], #left-sidebar, #right-sidebar { position: static !important; }
    `,
  });
}

for (const { path, name } of pages) {
  for (const { label, size } of viewports) {
    test.describe(`visual regression: ${path} @ ${label}`, () => {
      test.use({ viewport: size });

      test.beforeEach(async ({ page }) => {
        await page.goto(path, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
      });

      test("matches light mode snapshot", async ({ page }) => {
        await unstickHeaders(page);
        await expect(page).toHaveScreenshot(`${name}-${label}-light.png`, {
          fullPage: true,
        });
      });

      test("matches dark mode snapshot", async ({ page }) => {
        await page.click("#theme-toggle-button");
        await expect(page.locator("html")).toHaveClass(/dark/);
        await unstickHeaders(page);
        await expect(page).toHaveScreenshot(`${name}-${label}-dark.png`, {
          fullPage: true,
        });
      });
    });
  }
}
