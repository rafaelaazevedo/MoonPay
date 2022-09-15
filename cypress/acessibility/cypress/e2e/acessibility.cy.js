/// <reference types="Cypress" />

//TODO: Create the scenarios to validations for the card form, wallet, etc
describe("Acessibility in the checkout page", () => {
  beforeEach(() => {
    cy.visit("/preview");
    cy.injectAxe();
  });

  it("should not have detectable a11y violations on load", () => {
    cy.checkA11y();
  });

  it("should have correct validations when email is incorrect", () => {});

  it("should load apple wallet dialog", () => {});

  it("should load apple wallet dialog", () => {});
  it("should load sucess payment dialog", () => {});
  it("should load auhentication payment dialog", () => {});

  it("should have correct validations on submit button when form is incomplete", () => {});

  it("should have correct validations when expire date is in the past", () => {});

  it("should have correct validations when zipcode is incorrect is in the past", () => {});

  it("should have no a11y violations after button click", () => {});
});
