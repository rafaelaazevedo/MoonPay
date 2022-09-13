/// <reference types="Cypress" />

import CheckoutPage from "./elements/pages/checkoutPage";

const checkoutPage = new CheckoutPage();

//TODO: Need to explore more scenarios around the page
//Add validations on the card form, wallet, etc
describe.skip("Acessibility in the checkout page", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    checkoutPage.visit();
  });

  it("should not have detectable a11y violations on load", () => {
    // Test the page at initial load
    cy.checkA11y();
  });

  it("should have correct validations when email is incorrect", () => {});

  it("should load apple wallet dialog", () => {});

  it("should load apple wallet dialog", () => {});
  it("should load sucess payment dialog", () => {});
  it("should load auhentication payment dialog", () => {});

  it("has correct validations on submit button when form is incomplete", () => {});

  it("has correct validations when expire date is in the past", () => {});

  it("has correct validations when zipcode is incorrect is in the past", () => {});

  it("Has no a11y violations after button click", () => {
    // Interact with the page, then check for a11y issues
    checkoutPage.submitCardPayment().click();
    cy.checkA11y();
  });
});
