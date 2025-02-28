// eslint-disable-next-line import/no-extraneous-dependencies
import "cypress-set-device-pixel-ratio";

Cypress.Commands.add("visitWithNoJS", (route) => {
  cy.request(route)
    .its("body")
    .then((html) => {
      // remove the application code JS bundle
      html = html.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ""
      );
      cy.document().invoke({ log: false }, "open"); // <-- Add This
      cy.document().invoke({ log: false }, "write", html);
      cy.document().invoke({ log: false }, "close"); // <-- And this
    });
});
