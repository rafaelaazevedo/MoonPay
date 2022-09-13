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
}

export default checkoutElements;
