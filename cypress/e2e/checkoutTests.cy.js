/// <reference types="Cypress" />

import CheckoutPage from "./elements/pages/checkoutPage";
import users from "../fixtures/users.json";

const checkoutPage = new CheckoutPage();

// Get the user for each scenario
// Could also have done a filter in the json to get the data for that specific
// scenario so it woudlnt be hard coded here

// Didnt do the authentication and apple and google payment
// because it is third party dependent, we can mock the api or just do integration
// tests between then, but still worth to do some component or visual regression on it
const userSucess = users[0];
const userDeclined = users[2];

describe("Checkout with Card", () => {
  // Ignore exception when loading the checkout page
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.request(
      "https://checkout.stripe.dev/api/demo-session?country=us&billingPeriod=monthly&hasBgColor=false&bgColor=%2523ffffff&buttonColor=%2523192552&hasBillingAndShipping=false&hasCoupons=false&hasFreeTrial=false&hasShippingRate=false&hasTaxes=false&mode=payment&wallet=applePay&hasPolicies=false&billingType=flat&hasUpsells=false&hasPhoneNumber=false&borderStyle=rounded&fontStyle=System&hasCrossSells=false"
    ).then((response) => {
      cy.visit(response.body.url);
    });
  });

  it("have successfully checkout with card", () => {
    // there is a known issue between cypress and stripe payment
    // https://github.com/cypress-io/cypress/issues/23772

    checkoutPage.validateTotal();

    checkoutPage.fillCardPayment(userSucess);

    checkoutPage.submitCardPayment();

    checkoutPage.validatePaymentConfirmation(userSucess);
  });

  it("should have declined checkout with card", () => {
    checkoutPage.fillCardPayment(userDeclined);

    checkoutPage.submitCardPayment();

    checkoutPage.validateDeclinedMessage(userDeclined);
  });
  it("should be able to pay with authentication", () => {});
});
