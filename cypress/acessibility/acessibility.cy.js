/// <reference types="Cypress" />

//TODO: Need to explore more scenarios around the page
//Add validations on the card form, wallet, etc
describe.skip("Acessibility in the checkout page", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  it("should not have detectable a11y violations on load", () => {});

  it("should have correct validations when email is incorrect", () => {});

  it("should load apple wallet dialog", () => {});

  it("should load apple wallet dialog", () => {});
  it("should load sucess payment dialog", () => {});
  it("should load auhentication payment dialog", () => {});

  it("should have correct validations on submit button when form is incomplete", () => {});

  it("should have correct validations when expire date is in the past", () => {});

  it("should have correct validations when zipcode is incorrect is in the past", () => {});

  it("should have no a11y violations after button click", () => {});
});
