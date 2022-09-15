/// <reference types="Cypress" />

import orders from "../../../../fixtures/orders.json";
import CheckoutElements from "../checkoutElements";

const checkoutElements = new CheckoutElements();

class CheckoutPage {
  visit() {
    cy.visit("/preview");
  }

  fillCardPayment(user) {
    this.fillEmail(user.email);
    this.fillCardNumber(user.card.number);
    //Get 12th month and current year + 2 years
    this.fillCardExpiryDate(
      "12" + (new Date().getFullYear() + 2).toString().substr(-2)
    );
    this.fillCardCvc(user.card.cvv);
    this.fillBillingName(user.name);
    this.selectBillingCountry(user.address.country);
    this.fillBillingPostcode(user.address.postcode);
  }

  increaseQty() {
    checkoutElements.getIncreaseQty().click();
  }

  decreaseQty() {
    checkoutElements.getDecreaseQty().click();
  }

  selectProductQty() {
    cy.wait(2000);
    checkoutElements.getAdjustQty().should("be.visible");
    checkoutElements.getAdjustQty().first().click();
    this.increaseQty();
    checkoutElements.getUpdateQty().click();
    checkoutElements.getUpdateQty().should("be.disabled");

    checkoutElements.getAdjustQty().last().click();
    this.decreaseQty();
    checkoutElements.getUpdateQty().click();
    checkoutElements.getUpdateQty().should("be.disabled");
  }

  validateTotal() {
    // Moved the complexity of the calculus out of the tests and
    // gave the responsibility to assert the data as it is static
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

  // A simple validation to check if the message contains
  // a key word so it is not every character dependent
  // since there is a list of possible messages.
  // Another solution could be getting these messages straight from the development code
  // but then this would assert the expected message is there, but if development code
  // has the wrong value then the test would be also wrong.
  // And another solution could be just moving this test to the snapshot visual regression.
  validatePaymentConfirmation(user) {
    checkoutElements.getSubmit().should("be.disabled");
    cy.url({ timeout: 50000 }).should("contains", "success");
    checkoutElements
      .getConfirmationPayment()
      .should("be.visible")
      .and("contain", user.message);
    return this;
  }
  validateDeclinedMessage(user) {
    checkoutElements.getErrorValidation({ timeout: 6000 }).should("be.visible");
    checkoutElements.getErrorValidation().should("contain", user.message);
  }

  // ***********************************************
  // *** Get elements from Iframe test approach ****

  submitCardPaymentFromIframe() {
    checkoutElements.getSubmitFromIframe().click();
  }

  fillEmailFromIframe(value) {
    checkoutElements.getEmailFromIframe().type(value);
  }

  fillCardNumberFromIframe(value) {
    checkoutElements.getCardNumberFromIframe().type(value);
  }

  fillCardExpiryDateFromIframe(value) {
    checkoutElements.getCardExpiryFromIframe().type(value);
  }

  fillCardCvcFromIframe(value) {
    checkoutElements.getCardCvcFromIframe().type(value);
  }

  fillBillingNameFromIframe(value) {
    checkoutElements.getBillingNameFromIframe().type(value);
  }

  selectBillingCountryFromIframe(value) {
    checkoutElements.getBillingCountryFromIframe().select(value);
  }

  fillBillingPostcodeFromIframe(value) {
    checkoutElements.getBillingPostalCodeFromIframe().type(value);
  }

  fillCardPaymentFromIframe(user) {
    this.fillEmailFromIframe(user.email);
    this.fillCardNumberFromIframe(user.card.number);
    this.fillCardExpiryDateFromIframe(
      "12" + (new Date().getFullYear() + 2).toString().substr(-2)
    );
    this.fillCardCvcFromIframe(user.card.cvv);
    this.fillBillingNameFromIframe(user.name);
    this.selectBillingCountryFromIframe(user.address.country);
    this.fillBillingPostcodeFromIframe(user.address.postcode);
  }

  validateAuthenticationMessage(user) {
    //cypress-wait-until plugin didnt work as I expected so I added a wait here,
    //another solution could be slowing down the speed of cypress.
    cy.wait(3000);
    checkoutElements.getAuthenticationValidation().should("be.visible");
    checkoutElements
      .getAuthenticationValidation()
      .should("contain", user.message);
  }
}

export default CheckoutPage;
