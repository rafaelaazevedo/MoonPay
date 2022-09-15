# Stripe Checkout Challenge

TestConfig: Used Cypress Config to have only one baseUrl for the purpose of the test, but in real world the project could also have a env node in cypress.config.js with the specific configuration for a dev, local and qa environment.

Data and Fixtures: It is loaded the expected fixture.json with the data used in that set of scenarios, but it could also be a separated class just to handle and filter the data that is going to be used for each particular scenario instead of loading everything for the set of tests. For the purpose of this test I prefered to focus on having a diversity of different type of test levels and fix the iframe and payment problem instead of improving the data management.

BDD: I opted to not use BDD for this project because nowadays I have used only for complex projects or when the BA/PO need to understand the scenarios. I would try to avoid adding an extra layer without the need, but every project has different needs.

Extras:
Next steps would be creating:

- Report
- CI/CD pipeline
- Feature Tag
- ESLint
- Security Tests (Cross-origin, SQL Injection, etc...)
- Other browsers and parallel tests
- Performance Tests
- Cloud

## Installation

`npm install`

## Open Cypress

`npm run cy:open`

## Build Cypress Docker image

`docker:build`

## Generate HTML Report for E2E Tests

This will create a html report with all the e2e tests in the E2ETestReport folder.

`npm run generate:html:report`

## Clean reports folder

This will clean the folder wit the .json files used to create the HTML report.

`npm run clean:reports`

## Run Unit/Component Tests

For the unit tests I would need to have access to the development code, but we could have some component tests as well and then reducing the number of e2e tests.

## Run Integration Tests

I have added the basic and initial scenarios that would need to be implemented. Instead of having integration tests we could also have contract tests between the apis which would remove the fragility of the network. You can see the list of the tests that are pending running:

`npm run tests:integration`

## Run Acessibility Tests

I have added the basic and initial scenarios structure that would need to be implemented in the future. You can see the list of the tests that are pending running:

`npm run tests:acessibility`

## Run Visual Regression Tests

isual regression tests to save time instead of checking for validations on the e2e tests as it tends to save time. I have added the responsive layout and some locatization scenarios to the pages. You can see the list of the tests that are pending running:

`npm run tests:visual`

## Run E2E Tests

I've used POM as the structure to build the e2e tests and decided to follow the ratio 10% E2E Tests, 20% Integration Tests and 70% component/unit tests. I know some Cypress devs prefer to use Application Actions instead as it is faster, but I am a bit skeptical to use mostly because you need to change the development code and I try to avoid this as much as possible unless you are doing TDD, unless it is to add the `data-cy`, `data-testid`.

Locators: some locators are not ideal because I didn't have access to the development code, so I had to get the best locator I could use from the DOM, which means sometimes was an id and sometimes was the CSS (Im not proud of this haha)

Assertions: I have done a really basic assertion specially when it comes about the messages and field validation and what is written because I didnt want to create a big dependency on the data and css. So, as long as there is a css class related to error changing the layout or highligting a validation with a key word in the message I would assert it.

`npm run tests:e2e`
