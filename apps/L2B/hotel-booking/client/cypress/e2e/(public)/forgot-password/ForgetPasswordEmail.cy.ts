import { setupGraphQLIntercepts } from './shared-setup';

describe('Forget Password Flow - Email Submission', () => {
  beforeEach(() => {
    setupGraphQLIntercepts();
    cy.visit('/forget-password');
  });

  it('should show error when email submission fails', () => {
    cy.intercept('POST', '/api/graphql', {
      data: { requestPasswordReset: { success: false, message: 'Email not found' } },
    }).as('emailError');

    cy.get('[data-cy=email-input]').type('invalid@example.com');
    cy.get('[data-cy=submit-btn]').click();
    cy.wait('@emailError');
    cy.get('[data-cy=error-message]').should('contain', 'Failed to send reset email');
  });

  it('should show network error on email submission failure', () => {
    cy.intercept('POST', '/api/graphql', {
      statusCode: 500,
      body: { errors: [{ message: 'Network error' }] },
    }).as('networkError');

    cy.get('[data-cy=email-input]').type('invalid@example.com');
    cy.get('[data-cy=submit-btn]').click();
    cy.wait('@networkError');
    cy.get('[data-cy=error-message]').should('contain', 'Failed to send reset email');
  });
});
