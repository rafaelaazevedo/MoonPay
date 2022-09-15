/// <reference types="Cypress" />

import CheckoutPage from "./elements/pages/checkoutPage";
import users from "../../fixtures/users.json";

const checkoutPage = new CheckoutPage();
const userAuthentication = users[1];

describe("Checkout with stripe iframes", () => {
  beforeEach(() => {
    checkoutPage.visit();
  });

  it("should be able to pay with authentication", () => {
    checkoutPage.fillCardPaymentFromIframe(userAuthentication);

    checkoutPage.submitCardPaymentFromIframe();

    checkoutPage.validateAuthenticationMessage(userAuthentication);
  });
});
