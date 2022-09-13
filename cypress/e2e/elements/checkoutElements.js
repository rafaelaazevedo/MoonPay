/// <reference types="Cypress" />

class checkoutElements {
  // get the body inside iframe checkout
  getCheckoutIframe() {
    return cy.enter("#checkout-demo").then((getBody) => {
      getBody();
    });
  }

  getIncreaseQty() {
    return this.getCheckoutIframe().find(
      ".AdjustQuantityModal-toggleQuantityBtn--plus"
    );
  }

  getDecreaseQty() {
    return this.getCheckoutIframe().find(
      ".AdjustQuantityModal-toggleQuantityBtn--minus"
    );
  }

  getAdjustQty() {
    return this.getCheckoutIframe().find(".LineItem-adjustableQty");
  }

  getUpdateQty() {
    return this.getCheckoutIframe().find(".AdjustQuantityFooter-btn");
  }

  getValueProducts() {
    return this.getCheckoutIframe().find(".Text--tabularNumbers");
  }

  getTotalAmount() {
    return this.getCheckoutIframe().find("#ProductSummary-totalAmount");
  }

  getEmail() {
    return this.getCheckoutIframe().find("#email");
  }

  getCardNumber() {
    return this.getCheckoutIframe().find("#cardNumber");
  }

  getCardExpiry() {
    return this.getCheckoutIframe().find("#cardExpiry");
  }

  getCardCvc() {
    return this.getCheckoutIframe().find("#cardCvc");
  }

  getBillingName() {
    return this.getCheckoutIframe().find("#billingName");
  }

  getBillingCountry() {
    return this.getCheckoutIframe().find("#billingCountry");
  }

  getBillingPostalCode() {
    return this.getCheckoutIframe().find("#billingPostalCode");
  }

  getSubmit() {
    return this.getCheckoutIframe().find(
      '[data-testid="hosted-payment-submit-button"]'
    );
  }

  getDialog() {
    return cy.get(".ChromeDialog-Dialog", { timeout: 100000 });
  }

  getErrorValidation() {
    return this.getCheckoutIframe().find(".FieldError");
  }
}

export default checkoutElements;
