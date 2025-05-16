import { setupGraphQLIntercepts } from './shared-setup';

describe('Forget Password Flow - Password Reset', () => {
  const testEmail = `testuser${Date.now()}@example.com`;

  beforeEach(() => {
    setupGraphQLIntercepts();
    cy.visit('/forget-password');
    cy.get('[data-cy=email-input]').type(testEmail);
    cy.get('[data-cy=submit-btn]').click();
    cy.wait('@graphql');
    cy.get('[data-cy=otp-page]').should('be.visible');
    cy.get('[data-cy=otp-input] input').type('1234');
    cy.wait('@graphql');
    cy.get('[data-cy=new-password-page]').should('be.visible');
  });

  it('should redirect to signin on successful password reset', () => {
    const newPassword = 'NewPassword123';
    cy.get('[data-cy=password-input]').type(newPassword);
    cy.get('[data-cy=confirm-password-input]').type(newPassword);
    cy.get('[data-cy=submit-btn]').click();
    cy.wait('@graphql');
    cy.url().should('include', '/signin');
  });

  it('should validate password requirements', () => {
    cy.get('[data-cy=password-input]').type('short');
    cy.get('[data-cy=submit-btn]').click();
    cy.get('[data-cy=error-message]').should('contain', 'Password must be at least 8 characters');

    cy.get('[data-cy=password-input]').clear().type('PasswordWithoutNumber');
    cy.get('[data-cy=submit-btn]').click();
    cy.get('[data-cy=error-message]').should('contain', 'Must contain number');

    cy.get('[data-cy=password-input]').clear().type('PASSWORD123');
    cy.get('[data-cy=submit-btn]').click();
    cy.get('[data-cy=error-message]').should('contain', 'Must contain lowercase letter');
  });

  it('should show error when passwords dont match', () => {
    cy.get('[data-cy=password-input]').type('Password123');
    cy.get('[data-cy=confirm-password-input]').type('Different123');
    cy.get('[data-cy=submit-btn]').click();
    cy.get('[data-cy=error-message]').should('contain', "Passwords don't match");
  });

  it('should show error when password reset fails', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.query.includes('resetPassword')) {
        req.reply({ data: { resetPassword: { success: false, message: 'Password reset failed' } } });
      }
    }).as('graphql');

    const newPassword = 'NewPassword123';
    cy.get('[data-cy=password-input]').type(newPassword);
    cy.get('[data-cy=confirm-password-input]').type(newPassword);
    cy.get('[data-cy=submit-btn]').click();
    cy.wait('@graphql');
    cy.get('[data-cy=error-message]').should('contain', 'Failed to reset password');
  });

  it('should show network error when password reset fails', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.query.includes('resetPassword')) {
        req.reply({ statusCode: 500, body: { errors: [{ message: 'Network error' }] } });
      }
    }).as('graphql');

    const newPassword = 'NewPassword123';
    cy.get('[data-cy=password-input]').type(newPassword);
    cy.get('[data-cy=confirm-password-input]').type(newPassword);
    cy.get('[data-cy=submit-btn]').click();
    cy.wait('@graphql');
    cy.get('[data-cy=error-message]').should('contain', 'Failed to reset password');
  });
});
