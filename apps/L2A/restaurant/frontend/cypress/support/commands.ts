import { interceptGraphql } from 'cypress/utils/intercept-graphql';
/// <reference types="cypress" />

Cypress.Commands.add('interceptGraphql', interceptGraphql);

/// <reference types="cypress" />
 
const clerkLogin = (location: string, email: string) => {
  cy.intercept(
    {
      method: 'POST',
      url: 'https://*.clerk.accounts.dev/v1/environment*',
    },
    (req) => {
      req.headers['origin'] = 'http://localhost:4200';
    }
  ).as('postRequest');
 
  cy.visit(location);
  cy.get('[data-cy="login-button"]').should('exist');
  cy.get('[data-cy="email-input"]').type(email);
  cy.get('[data-cy="submit-button"]').click();
};
 
Cypress.Commands.add('clerkLogin', clerkLogin);
