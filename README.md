# Rafaela MoonPay Test

TestConfig: Used Cypress Config to have only one baseUrl for the purpose of the test, but in real world the project could also have a env node in cypress.config.js with the specific configuration for a dev, local and qa environment.

Data and Fixtures: It is loaded the expected fixture.json with the data used in that set of scenarios, but it could also be a separated class just to handle and filter the data that is going to be used for each particular scenario instead of loading everything for the set of tests. For the purpose of this test I prefered to focus on having a diversity of different type of test levels instead of improving the data management.

# Installation

To install the dependencies:
`npm install`

## Run Integration Tests

## Run Component Tests

## Run Acessibility Tests

## Run Visual Regression Tests

## Run E2E Tests

I've used POM as the structure to build the e2e tests and decided to follow the ratio 10% E2E Tests, 20% Integration Tests and 70% component/unit tests. I know some Cypress devs prefer to use Application Actions instead as it is faster, but I am a bit skeptical to use mostly because you need to change the development code and I try to avoid this as much as possible unless you are doing TDD. I would change the development code now only if it is to add the `data-cy`, `data-testid`... to use as locators or when there is no other way to test a scenario. I like to use POM most of the times because it is simple and not over-engineered when doing right and gives a good level of organisation and structure for the project.

I didn't code all the tests because I assumed (hopefully right) was more important to show the knowledge that I have in many parts of an Automation Project and not only in the framework itself or just coding tests that are similar to each other.

Locators: some locators are not ideal because I didnt have access to the development code, so I had to get the best locator I could use from the DOM, which means sometimes was an id and sometimes was the CSS (Im not proud of this haha)

Assertions: I have done a really basic assertion specially when it comes about the messages and what is written because I didnt want to create a big dependency on the data and css. So, as long as there is a css class changing the layout or highligting a validation with a key word in the message I would assert it, but for the messages I might even use the development code to get what is the message expected or maybe assert this on the visual regression tests. The only downside with getting the message from the development code is that if it is wrong there would say it is okay in the tests even tho the message could be wrong.

`npm run e2e`
