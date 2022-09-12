/// <reference types="Cypress" />

import users from "../../fixtures/users.json";

class CheckoutPage {
  constructor() {}

  visit() {
    cy.visit("/preview");
  }

  fillCardPayment(index) {
    this.fillEmail(users[index].email);
    this.fillCardNumber(users[index].card.number);
    this.fillCardExpiryDate(users[index].card.expiryDate);
    this.fillCardCVV(users[index].card.cvv);
    this.fillBillingName(users[index].name);
    this.selectBillingCountry(users[index].address.country);
    this.fillBillingPostcode(users[index].address.postcode);
  }

  getCheckoutIframe() {
    return cy.enter("#checkout-demo").then((getBody) => {
      getBody();
    });
  }

  fillEmail(value) {
    this.getCheckoutIframe().find("#email").type(value);
    return this;
  }

  fillCardNumber(value) {
    this.getCheckoutIframe().find("#cardNumber").type(value);
    return this;
  }

  fillCardExpiryDate(value) {
    this.getCheckoutIframe().find("#cardExpiry").type(value);
    return this;
  }

  fillCardCVV(value) {
    this.getCheckoutIframe().find("#cardCvc").type(value);
    return this;
  }

  fillBillingName(value) {
    this.getCheckoutIframe().find("#billingName").type(value);
    return this;
  }

  selectBillingCountry(value) {
    this.getCheckoutIframe().find("#billingCountry").select(value);
    return this;
  }

  fillBillingPostcode(value) {
    this.getCheckoutIframe().find("#billingPostalCode").type(value);
    return this;
  }

  payApplePay() {
    this.getCheckoutIframe().find("PaymentRequestOrHeader").scrollIntoView();
    this.getCheckoutIframe().find(".FakeWalletButton--applePay").click();
  }

  payGooglePay() {
    this.getCheckoutIframe().find("PaymentRequestOrHeader").scrollIntoView();
    this.getCheckoutIframe().find(".FakeWalletButton--googlePay").click();
  }

  validateApplePay() {
    this.getCheckoutIframe()
      .contains(
        "Your customer can now check out in seconds by simply authenticating the payment through Face ID or Touch ID."
      )
      .and("Apple Pay");

    return this;
  }

  validateGooglePay() {
    this.getCheckoutIframe.find(".Dropdown").click();
    this.getCheckoutIframe.find(".DropdownSelect-ListItemIcon[1]").click();
    this.getCheckoutIframe()
      .contains(
        "Your customer can now check out in seconds by simply authenticating the payment."
      )
      .and("Google Pay");

    return this;
  }

  submitCardPayment() {
    const submit = this.getCheckoutIframe().find(
      '[data-testid="hosted-payment-submit-button"]'
    );
    submit.click();
  }

  validateSubmitDialog(index) {
    this.getCheckoutIframe()
      .find(".ChromeDialog-Dialog", { timeout: 50000 })
      .should("be.visible")
      .and("contain", users[index].result);
    return this;
  }

  validateDeclinedMessage(index) {
    this.getCheckoutIframe().should("contain", users[index].result);
  }
}

export default CheckoutPage;
