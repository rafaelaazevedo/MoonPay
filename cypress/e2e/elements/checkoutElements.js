/// <reference types="Cypress" />

class checkoutElements {
  getIncreaseQty() {
    return cy.get(".AdjustQuantityModal-toggleQuantityBtn--plus");
  }

  getDecreaseQty() {
    return cy.get(".AdjustQuantityModal-toggleQuantityBtn--minus");
  }

  getAdjustQty() {
    return cy.get(".LineItem-adjustableQty");
  }

  getUpdateQty() {
    return cy.get(".AdjustQuantityFooter-btn");
  }

  getValueProducts() {
    return cy.get(".Text--tabularNumbers");
  }

  getTotalAmount() {
    return cy.get("#ProductSummary-totalAmount");
  }

  getEmail() {
    return cy.get("#email");
  }

  getCardNumber() {
    return cy.get("#cardNumber");
  }

  getCardExpiry() {
    return cy.get("#cardExpiry");
  }

  getCardCvc() {
    return cy.get("#cardCvc");
  }

  getBillingName() {
    return cy.get("#billingName");
  }

  getBillingCountry() {
    return cy.get("#billingCountry");
  }

  getBillingPostalCode() {
    return cy.get("#billingPostalCode");
  }

  getSubmit() {
    return cy.get('[data-testid="hosted-payment-submit-button"]');
  }

  getErrorValidation() {
    return cy.get(".FieldError");
  }

  getConfirmationPayment() {
    return cy.get(".SuccessOverlay");
  }

  // *** Get elements from Iframe test approach *** //
  getCheckoutIframe() {
    return cy.enter("#checkout-demo").then((getBody) => {
      getBody();
    });
  }

  get3DIframe() {
    return this.getCheckoutIframe()
      .find("iframe")
      .first()
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(($body) => {
        cy.wrap($body)
          .find("#challengeFrame")
          .its("0.contentDocument.body")
          .should("not.be.empty")
          .then(($challengeFrameBody) => {
            cy.wrap($challengeFrameBody);
          });
      });
  }

  getEmailFromIframe() {
    return this.getCheckoutIframe().find("#email");
  }

  getCardNumberFromIframe() {
    return this.getCheckoutIframe().find("#cardNumber");
  }

  getCardExpiryFromIframe() {
    return this.getCheckoutIframe().find("#cardExpiry");
  }

  getCardCvcFromIframe() {
    return this.getCheckoutIframe().find("#cardCvc");
  }

  getBillingNameFromIframe() {
    return this.getCheckoutIframe().find("#billingName");
  }

  getBillingCountryFromIframe() {
    return this.getCheckoutIframe().find("#billingCountry");
  }

  getBillingPostalCodeFromIframe() {
    return this.getCheckoutIframe().find("#billingPostalCode");
  }

  getSubmitFromIframe() {
    return this.getCheckoutIframe().find(
      '[data-testid="hosted-payment-submit-button"]'
    );
  }

  getAuthenticationValidation() {
    return this.get3DIframe().find(".CTA-container");
  }
}

export default checkoutElements;
