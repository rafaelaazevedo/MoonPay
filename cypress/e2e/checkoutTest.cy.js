/// <reference types="Cypress" />

import CheckoutPage from "../elements/pages/checkoutPage";

const checkoutPage = new CheckoutPage();

describe("Checkout with Card", () => {
  // Ignore exception when loading the checkout page
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    checkoutPage.visit();
  });

  describe.skip("Checkout with Card", function () {
    it("successfully checkout with card", () => {
      checkoutPage.fillCardPayment(0);

      checkoutPage.submitCardPayment();

      checkoutPage.validateSubmitDialog(0);

      cy.visualSnapshot("Verified Checkout with Card");
    });

    it("declined checkout with card", () => {
      checkoutPage.fillCardPayment(2);

      checkoutPage.submitCardPayment();

      checkoutPage.validateDeclinedMessage(1);

      cy.visualSnapshot("Verified Declined Payment with Card");
    });

    it("authentication checkout with card", () => {
      checkoutPage.fillCardPayment(1);

      checkoutPage.submitCardPayment();

      checkoutPage.validateSubmitDialog(1);

      cy.visualSnapshot("Verified Authentication with Card");
    });
  });

  describe("Checkout with Wallets", function () {
    it("checkout with apple", () => {
      checkoutPage.payApplePay();

      checkoutPage.validateApplePay();

      cy.visualSnapshot("Verified Apple Pay");
    });

    it("checkout with googlepay", () => {
      checkoutPage.payGooglePay();

      checkoutPage.validateGooglePay();

      cy.visualSnapshot("Verified Google Pay");
    });
  });
});
