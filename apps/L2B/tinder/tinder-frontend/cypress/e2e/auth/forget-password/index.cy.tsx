import { setupGraphQLIntercepts } from './setup-graph-ql-intercepts';

describe('forget-password', () => {
  beforeEach(() => {
    setupGraphQLIntercepts();
    cy.visit('/auth/forget-password');
  });

  it('should validate email input in the first step', () => {
    cy.get('[data-testid="forget-password-firstStep-button"]').click();
    cy.get('[data-testid="email-error"]').should('contain.text', 'Email is required');

    cy.get('[data-testid="email-input"]').type('invalid-email');
    cy.get('[data-testid="forget-password-firstStep-button"]').click();
    cy.get('[data-testid="email-error"]').should('contain.text', 'Please enter a valid email address');

    cy.get('[data-testid="email-input"]').clear().type('test@example.com');
    cy.get('[data-testid="forget-password-firstStep-button"]').click();
  });

  it('should show error for wrong OTP', () => {
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="forget-password-firstStep-button"]').click();

    cy.get('[data-testid="otp-slot"]').type('0000');
    cy.contains('Wrong code. Please try again.').should('exist');
  });

  it('should enable resend button after 15 seconds and restart timer on click', () => {
    cy.clock();

    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="forget-password-firstStep-button"]').click();

    cy.tick(150);

    cy.get('[data-testid="resend-button"]').should('be.disabled');

    cy.tick(15000);
    cy.get('[data-testid="resend-button"]').should('not.be.disabled');

    cy.get('[data-testid="resend-button"]').click();
    cy.tick(1000);
    cy.get('[data-testid="resend-button"]').should('contain.text', 'Send again (15)');
  });

  it('should verify otp and reset password', () => {
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="forget-password-firstStep-button"]').click();

    cy.get('[data-testid="otp-slot"]').type('1234');

    cy.get('[data-testid="password-input"]').type('Password123!');
    cy.get('[data-testid="confirm-password-input"]').type('Mismatch123!');
    cy.contains('Continue').click();
    cy.contains('Passwords do not match.', { timeout: 3000 }).should('exist');

    cy.get('[data-testid="password-input"]').clear().type('Password123!');
    cy.get('[data-testid="confirm-password-input"]').clear().type('Password123!');
    cy.contains('Continue').click();

    // cy.contains('Password reset successful', { timeout: 3000 }).should('exist');
  });
});
