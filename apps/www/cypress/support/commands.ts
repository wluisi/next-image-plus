import "cypress-set-device-pixel-ratio";

Cypress.Commands.add("visitWithNoJS", (route: string) => {
  cy.request(route)
    .its("body")
    .then((html) => {
      html = html.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ""
      );

      cy.document().then((doc) => {
        doc.open();
        doc.write(html);
        doc.close();
      });
    });
});

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      visitWithNoJS(route: string): Chainable<void>;
    }
  }
}

export {};
