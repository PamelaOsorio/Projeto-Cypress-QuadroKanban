const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.js',  // força esse arquivo como suporte
    setupNodeEvents(on, config) {
      // seus eventos Node aqui (se tiver)
    },
  },
})
