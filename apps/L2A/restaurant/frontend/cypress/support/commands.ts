import { interceptGraphql } from 'cypress/utils/intercept-graphql';
import { addClerkCommands } from '@clerk/testing/cypress';

addClerkCommands({ Cypress, cy });
/// <reference types="cypress" />

Cypress.Commands.add('interceptGraphql', interceptGraphql);

/// <reference types="cypress" />
const clerkLogin = (location: string, email: string) => {
  cy.intercept(
    {
      method: 'POST',
      url: 'https://restaurant-backend-test.vercel.app/api/graphql',
    },
    (req) => {
      req.headers['origin'] = 'http://localhost:4201';
    }
  ).as('postRequest');

  cy.visit(location);
  cy.get('[data-cy="login-btn"]').should('be.visible');
  cy.get('[data-cy="login-btn"]').click();
  // cy.setCookie('__session', 'mocked-session-token');
  cy.clerkSignIn({ strategy: 'email_code', identifier: email });
  // cy.visit(location);
  // cy.url().should('eq', `${Cypress.config().baseUrl}/${location.replace(/^\/+/, '')}`);
};

Cypress.Commands.add('clerkLogin', clerkLogin);
