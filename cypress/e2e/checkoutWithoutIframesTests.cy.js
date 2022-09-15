/// <reference types="Cypress" />

import CheckoutPage from "./elements/pages/checkoutPage";
import users from "../fixtures/users.json";

const checkoutPage = new CheckoutPage();

// Get the user for each scenario
// Could also have done a filter in the json to get the data for that specific
// scenario so it woudlnt be hard coded here

// Didnt do the apple and google payment
// because I moved them to integration tests and then we can mock the api
// but still worth to do some component or visual regression on them to cover as a whole
const userSucess = users[0];
const userDeclined = users[2];

describe("Checkout without stripe iframes", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    // Known issue when sending the payment with cypress
    // https://github.com/cypress-io/cypress/issues/23772 because of stripe security iframes

    // I could think about 2 main approches to test this checkout page:
    // For the confirmation and declined card I opted to use this workaround and remove the iframes
    // and focus on the e2e flow funcionality. Then added a separated test to test the authentication
    // flow with the iframe. For the first approach I would need to have some kind of visual regression
    // or component tests to cover the page flow with the iframes, for the second approach it wouldnt need
    // any additional tests, but it adds a level of complexity around the iframe locators.

    cy.request(
      "https://checkout.stripe.dev/api/demo-session?country=us&billingPeriod=monthly&hasBgColor=false&bgColor=%2523ffffff&buttonColor=%2523192552&hasBillingAndShipping=false&hasCoupons=false&hasFreeTrial=false&hasShippingRate=false&hasTaxes=false&mode=payment&wallet=applePay&hasPolicies=false&billingType=flat&hasUpsells=false&hasPhoneNumber=false&borderStyle=rounded&fontStyle=System&hasCrossSells=false"
    ).then((response) => {
      cy.visit(response.body.url);
    });
  });

  it("should successfully checkout with card", () => {
    // there is a known issue between cypress and stripe payment
    // https://github.com/cypress-io/cypress/issues/23772

    checkoutPage.fillCardPayment(userSucess);

    checkoutPage.submitCardPayment();

    checkoutPage.validatePaymentConfirmation(userSucess);
  });

  it("should successfully checkout selecting other product quantities", () => {
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
});
