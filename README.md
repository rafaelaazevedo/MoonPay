# Rafaela MoonPay Test

TestConfig: Decided to use the Cypress Config to have the baseUrl for the purpose of the test, but in real world I could also have a cypress.env.json with the specific configuration for a dev, local and qa environment.

# Installation
To install the dependencies:

`npm install`

## Run Integration Tests

## Run Component Tests

## Run E2E Tests
I've used POM as the structure to build these tests and decided to go for the ratio 10% E2E Tests, 20% Integration Tests and 70% component/unit tests. I know some people like to use Application Actions instead as it is faster, but I am a bit skeptical to use mostly because you need to change the development code and I try to avoid this as much as possible. Unless it is to add the `data-cy`, `datatest-id`... to use as locators or when there is no other way to test a function.

I didnt code all the tests because I assumed was more important to show the knowledge that I have in many parts of an Automation Porject and not only in the framework itself or coding similar tests. Also, some locators are not ideal because I didnt have access to the development code, so I had to get the best locator I could use from the DOM, which means sometimes was an id and sometimes was the CSS (Im not proud of this haha)

`npm install e2e`

## Run Acessibility Tests

## Run Visual Regression Tests
