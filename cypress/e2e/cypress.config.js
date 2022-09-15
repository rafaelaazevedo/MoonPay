const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://checkout.stripe.dev",
    chromeWebSecurity: false,
    projectId: "gkm3uq",
    viewportHeight: 660,
    viewportWidth: 1300,
  },
  reporter: "../../node_modules/mochawesome/src/mochawesome.js",
  reporterOptions: {
    overwrite: true,
    html: false,
    json: true,
  },
});
