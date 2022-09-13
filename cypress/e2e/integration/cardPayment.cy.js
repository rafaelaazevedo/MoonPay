/// <reference types="Cypress" />

//TODO: Add more scenarios to validate the payment with card
//from different card companies, then different wallets
//different countries, expire date, etc.
describe.skip("Validate Card Payment", () => {
  let todoItem;
  it("Payment with AMEX", () => {});

  it.only("Payment with VISA", () => {});

  it("Payment with MASTERCARD", () => {});

  it("Payment with same month and year of expire date", () => {});

  it("Payment with not matching billing address", () => {});

  it("Payment with country without postal code", () => {});

  //I like to test this in the api as well to be sure we are validating this
  //not only on the frontend, but also in the api level
  it("Validate payment with empty fields", () => {});

  //This would be to simulate a bad network connection
  //and see how the api and frontend reacts
  it("Payment throttling the network", () => {});

  it("Payment with not matching name", () => {});

  it("Payment with not matching email", () => {});

  it("Payment with minimun quantity for product", () => {});

  it("Payment with maximun quantity for product", () => {});

  // in case this is possible through API
  it("Payment with no product", () => {});
});
