import "cypress-axe";
import { terminalLog } from "./../../support/terminal-log";

describe("home page tests.", () => {
  beforeEach(() => {
    cy.visit("/blog");
    cy.injectAxe();
  });

  it("should have no accessibility issues.", () => {
    cy.checkA11y(null, null, terminalLog);
  });
});
