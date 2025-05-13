import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task';
import clerkSetup from './clerk-setup';


export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200', 
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
      return clerkSetup({ config });
    },
  },
  env: {
    coverage: true,
  },
});
