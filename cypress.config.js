const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    baseUrl: 'https://reqres.in/api',
    fixturesFolder: 'cypress/fixtures',
    supportFile: 'cypress/support/e2e.js',
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true
    },
  env: {
    base_url: "https://reqres.in/api"
  }
});
