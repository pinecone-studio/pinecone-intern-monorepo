/// <reference types="cypress" />

describe('Forget Password Page', () => {
  const testEmail = 'user@example.com';

  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      const query = req.body.query;

      if (query.includes('requestOTP')) {
        req.alias = 'requestOTP';
        req.reply({ data: { requestOTP: true } });
      }

      if (query.includes('verifyOTP')) {
        req.alias = 'verifyOTP';
        req.reply({ data: { verifyOTP: true } });
      }

      if (query.includes('resetPassword')) {
        req.alias = 'resetPassword';
        req.reply({ data: { resetPassword: { token: 'mock-token' } } });
      }
    });

    cy.visit('/forget-password');
  });

  context('Step 1: Email Form', () => {
    it('1. renders UI and submits empty email', () => {
      cy.contains('Forget password').should('exist');
      cy.get('[data-testid="submit-button"]').click();
      cy.contains('Email is required').should('exist');
    });

    it('2. proceeds to step 2 on valid email', () => {
      cy.get('[data-testid="email-input"]').type(testEmail);
      cy.get('[data-testid="submit-button"]').click();
      cy.wait('@requestOTP');
      cy.get('[data-cy="otp-input"]').should('exist');
    });
  });

  context('Step 2: OTP Verification', () => {
    beforeEach(() => {
      cy.get('[data-testid="email-input"]').type(testEmail);
      cy.get('[data-testid="submit-button"]').click();
      cy.wait('@requestOTP');
    });

    it('3. renders otp input and resend timer', () => {
      cy.get('[data-cy="otp-input"]').should('exist');
      cy.get('[data-cy="resend-otp-button"]').should('exist');
    });

    it('4. shows error if otp is invalid', () => {
      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body.query.includes('verifyOTP')) {
          req.alias = 'verifyOTP';
          req.reply({ data: { verifyOTP: false } });
        }
      });

      cy.get('[data-cy="otp-input"]').type('123456');
      cy.wait('@verifyOTP');
      cy.contains('Invalid OTP').should('exist');
    });

    it('6. goes to step 3 on valid otp', () => {
      cy.get('[data-cy="otp-input"]').type('123456');
      cy.wait('@verifyOTP');
      cy.get('[data-cy="step-three"]').should('exist');
      cy.get('[data-testid="new-password"]').should('exist');
    });
  });

  context('Step 3: New Password', () => {
    beforeEach(() => {
      cy.get('[data-testid="email-input"]').type(testEmail);
      cy.get('[data-testid="submit-button"]').click();
      cy.wait('@requestOTP');
      cy.get('[data-cy="otp-input"]').type('123456');
      cy.wait('@verifyOTP');
    });

    it('7. shows error if passwords mismatch', () => {
      cy.get('[data-testid="new-password"]').type('pass123');
      cy.get('[data-testid="confirm-password"]').type('pass456');
      cy.get('[data-testid="reset-submit"]').click();
      cy.contains('Passwords do not match').should('exist');
    });

    it('8. resets password and redirects', () => {
      cy.get('[data-testid="new-password"]').type('pass123456');
      cy.get('[data-testid="confirm-password"]').type('pass123456');
      cy.get('[data-testid="reset-submit"]').click();
      cy.wait('@resetPassword');
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });
});
