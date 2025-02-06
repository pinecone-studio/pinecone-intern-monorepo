import { defineConfig } from "cypress";

export default defineConfig({
<<<<<<< HEAD
=======
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

>>>>>>> 607c2f366 (feat(fe): fe admin page -- can get dialog input value)
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
