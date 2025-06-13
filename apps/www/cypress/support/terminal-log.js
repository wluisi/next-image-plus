export function terminalLog(violations) {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`
  );

  // Pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
      targets: nodes.map((node) => node.target.join(", ")).join(" | "),
      // html: nodes.map((node) => node.html).join("\n---\n"),
    })
  );

  cy.task("table", violationData);

  // Extra: log each affected element
  violations.forEach(({ id, nodes }) => {
    nodes.forEach(({ target, html }) => {
      cy.task(
        "log",
        `[${id}] Affected element: ${target.join(", ")}\n  HTML: ${html}`
      );
    });
  });
}
