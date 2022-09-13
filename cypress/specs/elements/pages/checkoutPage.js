/// <reference types="Cypress" />

import orders from "../../../fixtures/orders.json";
import CheckoutElements from "../checkoutElements";

const checkoutElements = new CheckoutElements();

class CheckoutPage {
  visit() {
    cy.visit("/preview");
  }

  fillCardPayment(user) {
    this.fillEmail(user.email);
    this.fillCardNumber(user.card.number);
    // I could have added a logic here to be currentYear + 1
    // so the data wouldn't need to be updated just to accomodate
    // the tests, but for now I left it data dependent (not proud of it,
    // but just saving time to be able to finish the test)
    this.fillCardExpiryDate(user.card.expiryDate);
    this.fillCardCvc(user.card.cvv);
    this.fillBillingName(user.name);
    this.selectBillingCountry(user.address.country);
    this.fillBillingPostcode(user.address.postcode);
  }

  //Here we can pass the quantity as parameter and add a loop but for
  //the porpouse of this test I kept it simple, same for the decrease
  increaseQty() {
    checkoutElements.getIncreaseQty().click();
  }

  decreaseQty() {
    checkoutElements.getDecreaseQty().click();
  }

  // The qty doesnt matter much as the purpose
  // this test is to validate the integration between the components
  // and the end to end flow.
  selectProductQty() {
    checkoutElements.getAdjustQty().first().click();
    this.increaseQty();
    checkoutElements.getUpdateQty().click();

    checkoutElements.getAdjustQty().last().click();
    this.decreaseQty();
    checkoutElements.getUpdateQty().click();
  }

  validateTotal() {
    this.selectProductQty();
    // Moved the complexity of the calculus out of the tests and
    // gave the responsibility to assert to the data
    // as it is static and can be used for regression tests
    checkoutElements
      .getValueProducts()
      .eq(1)
      .should("have.text", orders[0].product1);

    checkoutElements
      .getValueProducts()
      .eq(2)
      .should("have.text", orders[0].product2);

    checkoutElements.getTotalAmount().should("contain", orders[0].total);
  }

  fillEmail(value) {
    checkoutElements.getEmail().type(value);
  }

  fillCardNumber(value) {
    checkoutElements.getCardNumber().type(value);
  }

  fillCardExpiryDate(value) {
    checkoutElements.getCardExpiry().type(value);
  }

  fillCardCvc(value) {
    checkoutElements.getCardCvc().type(value);
  }

  fillBillingName(value) {
    checkoutElements.getBillingName().type(value);
  }

  selectBillingCountry(value) {
    checkoutElements.getBillingCountry().select(value);
  }

  fillBillingPostcode(value) {
    checkoutElements.getBillingPostalCode().type(value);
  }

  submitCardPayment() {
    checkoutElements.getSubmit().click();
  }

  // As mentioned in the README file, this is
  // a simple validation to check if the message contains
  // a key word so it is not every character dependent
  // since there is a list of possible messages.
  // Another solution would be creating a list with all the possible messages
  // and going through them to assert which one matches.
  // I opted to go for the simplest solution and as much independent as possible.
  // Another solution could be getting these messages straight from the development code
  // but then this would assert the expected message is there, but if development code
  // has the wrong value then the test would be also wrong.
  // And another solution could be just moving this test to the snapshot visual regression.
  validateSubmitDialog(user) {
    //Known issue when sending the payment with cypress
    //https://github.com/cypress-io/cypress/issues/23772
    //so not possible to real test e2e integrating with third parties here
    //but will be able to mock which is the ideal in most of the cases
    //so no dependency on the network or the third party services
    //and we are able to test the application in isolation
    checkoutElements
      .getDialog()
      .should("be.visible")
      .and("contain", user.message);
    return this;
  }

  interceptPayment() {
    cy.intercept("POST", "https://api.stripe.com/v1/payment_methods", {
      followRedirect: false,
      fixture: "../fixtures/payment_intent.json",
    }).as("createPaymentIntent");

    return cy
      .intercept("POST", "https://api.stripe.com/v1/payment_pages/*/confirm", {
        statusCode: 200,
        body: {
          error: false,
        },
      })
      .as("confirmPayment");
  }

  validateDeclinedMessage(user) {
    checkoutElements.getErrorValidation().should("be.visible");
    checkoutElements.getErrorValidation().should("contain", user.message);
  }
}

export default CheckoutPage;
