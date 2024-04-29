/* eslint-disable @typescript-eslint/no-var-requires */

import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';
import { teardownUser } from './cypress/helper-function';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'cypress',
    }),
    setupNodeEvents(on, config) {
      on('task', {
        async teardownRegisteredUser(email: string) {
          try {
            console.log('teardown', email);
            await teardownUser(email);
          } catch (err) {
            console.log(err);
          }
          return null;
        },
      });
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
    retries: 2,
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
