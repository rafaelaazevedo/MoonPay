/// <reference types="Cypress" />

import CheckoutPage from "./elements/pages/checkoutPage";
import users from "../fixtures/users.json";

const checkoutPage = new CheckoutPage();
const userAuthentication = users[1];

// This test is more real e2e then the others, but it is slower and add a level of complexity
// when handling the iframes (around 2~3 seconds slower)
describe("Testing checkout with stripe iframes", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    checkoutPage.visit();
  });

  it("should be able to pay with authentication", () => {
    checkoutPage.fillCardPaymentFromIframe(userAuthentication);

    checkoutPage.submitCardPaymentFromIframe();

    checkoutPage.validateAuthenticationMessage(userAuthentication);
  });
});
