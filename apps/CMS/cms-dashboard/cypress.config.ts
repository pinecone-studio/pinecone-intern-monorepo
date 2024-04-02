/* eslint-disable @typescript-eslint/no-var-requires */

import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'cypress',
    }),
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);

      return config;
    },
    supportFolder: './cypress/support',
    supportFile: './cypress/support/e2e.ts',
    fileServerFolder: './src',
    specPattern: ['./cypress/e2e/**/*.cy.ts', './cypress/e2e/**/*.cy.tsx'],
    screenshotsFolder: './cypress/results/assets',
    videosFolder: './cypress/results/assets',
    viewportWidth: 1536,
    viewportHeight: 960,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 100000,
    responseTimeout: 120e3,
    screenshotOnRunFailure: true,
    numTestsKeptInMemory: 0,
    trashAssetsBeforeRuns: true,
    requestTimeout: 30000,
    reporter: '../../../node_modules/cypress-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'mochawesome',
      mochawesomeReporterOptions: {
        reportDir: 'cypress/results',
        overwrite: false,
        html: false,
        json: true,
      },
    },
    env: {
      env: {},
    },
  },
});
