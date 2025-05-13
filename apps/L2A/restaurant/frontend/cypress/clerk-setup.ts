// apps/.../frontend/cypress/clerk-setup.ts

type ClerkSetupArgs = {
    config: Cypress.PluginConfigOptions;
  };
  
  // Optional Clerk logic: inject env vars or modify config
  export default function clerkSetup({ config }: ClerkSetupArgs) {
    // You can safely return config directly unless you need to do something more
    return config;
  }
  