/// <reference types="Cypress" />

//TODO: Add more scenarios to validate the payment with card
//from different card companies, then different wallets
//different countries, expire date, etc.
describe.skip("Validate Card Payment", () => {
  let todoItem;
  it("should be able to pay with AMEX", () => {});

  it("should be able to pay with VISA", () => {});

  it("should be able to pay with MASTERCARD", () => {});

  it("should validate a fraud payment", () => {});

  it("should be able to pay with same month and year of expire date card", () => {});

  it("should not be able to pay with not matching billing address", () => {});

  it("should be able to pay with country that doesnt require a postal code", () => {});

  //I like to test this in the api as well to be sure we are validating this
  //not only on the frontend, but also in the api level
  it("should not be able to pay with empty fields", () => {});

  //This would be to simulate a bad network connection
  //and see how the api and frontend reacts
  it("should be able to pay when throttling the network", () => {});

  it("should not be able to pay with not matching name", () => {});

  it("should not be able to pay with not matching email", () => {});

  it("should be able to pay with minimun quantity for product", () => {});

  it("should be able to pay with maximun quantity for product", () => {});

  // in case this is possible through API
  it("should not be able to pay with no product selected", () => {});
});
