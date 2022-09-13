it("should display the component correctly", () => {
  cy.visit("/preview");

  if (Cypress.env("type") === "base") {
    cy.get("H1").contains("Login");
    cy.get("form").compareSnapshot("login-form");
  } else {
    cy.get("H1").contains("Login");
    cy.get("form").compareSnapshotTest("login-form").should("be.true");
    cy.get("form").compareSnapshotTest("login-form", 0.02).should("be.true");
  }
});
