// @note `npm run cypress:run -- --spec=cypress/e2e/accessibility.test.ts`

import "cypress-axe";
import { terminalLog } from "./../support/terminal-log";

const pages = [
  {
    path: "/",
  },
  {
    path: "/docs",
  },
  {
    path: "/docs/getting-started",
  },
  {
    path: "/docs/picture",
  },
  {
    path: "/docs/background-image",
  },
  {
    path: "/examples",
  },
  // @todo these 2 fail, because of the tabs.
  // {
  //   path: "/examples/picture",
  // },
  // {
  //   path: "/examples/background-image",
  // },
  {
    path: "/blog",
  },
  {
    path: "/blog/how-to-add-background-image-in-next-js",
  },
  {
    path: "/blog/how-to-use-the-html-picture-element-with-next-js",
  },
];

const SM_VIEWPORT: [number, number] = [430, 932];
const MD_VIEWPORT: [number, number] = [740, 1024];
const LG_VIEWPORT: [number, number] = [1500, 900];

pages.forEach((page) => {
  // describe(`SM_VIEWPORT: accessibility tests for path: [ ${page.path} ]`, () => {
  //   beforeEach(() => {
  //     cy.viewport(...SM_VIEWPORT);
  //     cy.visit(page.path);
  //     cy.injectAxe();
  //   });

  //   it("should have no accessibility issues.", () => {
  //     cy.checkA11y(null, null, terminalLog);
  //   });
  // });

  // describe(`SM_VIEWPORT: dark mode: accessibility tests for path: [ ${page.path} ]`, () => {
  //   beforeEach(() => {
  //     cy.viewport(...SM_VIEWPORT);
  //     cy.visit(page.path);
  //     cy.injectAxe();
  //   });

  //   it("should have no accessibility issues.", () => {
  //     cy.get("#theme-toggle-button").click();
  //     cy.get("html").should("have.class", "dark");

  //     cy.checkA11y(null, null, terminalLog);
  //   });
  // });

  // describe(`MD_VIEWPORT: accessibility tests for path: [ ${page.path} ]`, () => {
  //   beforeEach(() => {
  //     cy.viewport(...MD_VIEWPORT);
  //     cy.visit(page.path);
  //     cy.injectAxe();
  //   });

  //   it("should have no accessibility issues.", () => {
  //     cy.checkA11y(null, null, terminalLog);
  //   });
  // });

  // describe(`MD_VIEWPORT: dark mode: accessibility tests for path: [ ${page.path} ]`, () => {
  //   beforeEach(() => {
  //     cy.viewport(...MD_VIEWPORT);
  //     cy.visit(page.path);
  //     cy.injectAxe();
  //   });

  //   it("should have no accessibility issues.", () => {
  //     cy.get("#theme-toggle-button").click();
  //     cy.get("html").should("have.class", "dark");

  //     cy.checkA11y(null, null, terminalLog);
  //   });
  // });

  describe(`LG_VIEWPORT: accessibility tests for path: [ ${page.path} ]`, () => {
    beforeEach(() => {
      cy.viewport(...LG_VIEWPORT);
      cy.visit(page.path);
      cy.injectAxe();
    });

    it("should have no accessibility issues.", () => {
      cy.checkA11y(null, null, terminalLog);
    });
  });

  describe(`LG_VIEWPORT: dark mode: accessibility tests for path: [ ${page.path} ]`, () => {
    beforeEach(() => {
      cy.viewport(...LG_VIEWPORT);
      cy.visit(page.path);
      cy.injectAxe();
    });

    it("should have no accessibility issues.", () => {
      cy.get("#theme-toggle-button").click();
      cy.get("html").should("have.class", "dark");

      cy.checkA11y(null, null, terminalLog);
    });
  });
});
