/// <reference types="Cypress" />

import CheckoutPage from "./elements/pages/checkoutPage";
import users from "../../fixtures/users.json";

const checkoutPage = new CheckoutPage();

// Get the user for each scenario. Another solution would be to create a
// filter in the json to get the data for that specific scenario

const userSucess = users[0];
const userDeclined = users[2];

describe("Checkout removing stripe iframes", () => {
  beforeEach(() => {
    // I could think about 2 main approches to test this checkout page:
    // For the confirmation and declined card I opted to use this workaround and removed the iframes
    // and focused on the e2e flow funcionality. Then added a separated test to test the authentication
    // flow with the iframe. For the first approach I would need to have some kind of visual regression
    // or component tests to cover the page flow with the iframes. The second approach it doesn't need
    // any additional tests, but it takes (2 ~ 3 seconds longer)

    cy.request(
      "https://checkout.stripe.dev/api/demo-session?country=us&billingPeriod=monthly&hasBgColor=false&bgColor=%2523ffffff&buttonColor=%2523192552&hasBillingAndShipping=false&hasCoupons=false&hasFreeTrial=false&hasShippingRate=false&hasTaxes=false&mode=payment&wallet=applePay&hasPolicies=false&billingType=flat&hasUpsells=false&hasPhoneNumber=false&borderStyle=rounded&fontStyle=System&hasCrossSells=false"
    ).then((response) => {
      cy.visit(response.body.url);
    });
  });

  it("should successfully checkout with card", () => {
    checkoutPage.fillCardPayment(userSucess);

    checkoutPage.submitCardPayment();

    checkoutPage.validatePaymentConfirmation(userSucess);
  });

  it("should successfully checkout selecting other product quantities", () => {
    checkoutPage.selectProductQty();

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
