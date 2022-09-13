/// <reference types="Cypress" />

import CheckoutPage from "./elements/pages/checkoutPage";
import users from "../fixtures/users.json";

const checkoutPage = new CheckoutPage();

// Get the user for each scenario
// Could have done a filter in the json to get the data for that specific
// scenario so it woudlnt be hard coded here
// but I thought about focusing on the diversity of the tests more

// Didnt do the authentication and apple and google payment
// As I have coded the integration/api tests for them
// Also because it is a third party dependent, we can mock the api
// to assure our side of the product is working
// Still worth to do some visual validation like visual regression tests on them
const userSucess = users[0];
const userDeclined = users[2];

describe("Checkout with Card", () => {
  // Ignore exception when loading the checkout page
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    checkoutPage.visit();
  });

  describe("Checkout with Card", function () {
    it("successfully checkout with card", () => {
      // Mock stripe payment because it is a third party integration and also
      // because there is a known issue between cypress and stripe payment
      // https://github.com/cypress-io/cypress/issues/23772

      checkoutPage.interceptPayment();

      cy.intercept(
        "POST",
        "https://api.stripe.com/v1/payment_pages/*/confirm",
        {
          statusCode: 200,
          body: {
            error: false,
          },
        }
      ).as("confirmPayment");

      checkoutPage.validateTotal();

      checkoutPage.fillCardPayment(userSucess);

      checkoutPage.submitCardPayment();

      checkoutPage.validateSubmitDialog(userSucess);
    });

    it("declined checkout with card", () => {
      checkoutPage.fillCardPayment(userDeclined);

      checkoutPage.submitCardPayment();

      checkoutPage.validateDeclinedMessage(userDeclined);
    });
  });
});
