import { setupGraphQLIntercepts } from './shared-setup';

describe('Forget Password Flow - OTP Verification', () => {
  const testEmail = `testuser${Date.now()}@example.com`;

  beforeEach(() => {
    setupGraphQLIntercepts();
    cy.visit('/forget-password');
    cy.get('[data-cy=email-input]').type(testEmail);
    cy.get('[data-cy=submit-btn]').click();
    cy.wait('@graphql');
    cy.get('[data-cy=otp-page]').should('be.visible');
  });

  it('should show error for invalid OTP', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.query.includes('verifyPasswordResetOTP')) {
        req.reply({ data: { verifyPasswordResetOTP: { success: false, message: 'Invalid OTP' } } });
      }
    }).as('otpError');

    cy.get('[data-cy=otp-input] input').type('1234');
    cy.wait('@otpError');
    cy.get('[data-cy=error-message]').should('contain', 'Invalid OTP');
  });

  it('should show default error when OTP verification fails without message', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.query.includes('verifyPasswordResetOTP')) {
        req.reply({ data: { verifyPasswordResetOTP: { success: false, message: null } } });
      }
    }).as('otpErrorNoMessage');

    cy.get('[data-cy=otp-input] input').type('1234');
    cy.wait('@otpErrorNoMessage');
    cy.get('[data-cy=error-message]').should('contain', 'Invalid OTP');
  });

  it('should show error when OTP verification fails with network error', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.query.includes('verifyPasswordResetOTP')) {
        req.reply({ statusCode: 500, body: { errors: [{ message: 'Network error' }] } });
      }
    }).as('otpNetworkError');

    cy.get('[data-cy=otp-input] input').type('1234');
    cy.wait('@otpNetworkError');
    cy.get('[data-cy=error-message]').should('contain', 'Failed to verify OTP');
  });

  it('should show error when resend OTP fails', () => {
    let requestCount = 0;
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.query.includes('requestPasswordReset')) {
        requestCount += 1;
        if (requestCount === 1) {
          req.reply({ data: { requestPasswordReset: { success: true, message: 'Reset email sent' } } });
        } else {
          req.reply({ statusCode: 500, body: { errors: [{ message: 'Failed to resend OTP' }] } });
        }
      }
    }).as('resendError');

    cy.visit('/forget-password');
    cy.get('[data-cy=email-input]').type(testEmail);
    cy.get('[data-cy=submit-btn]').click();
    cy.wait('@resendError');
    cy.get('[data-cy=otp-page]').should('be.visible');

    cy.clock();
    cy.tick(16000);
    cy.get('[data-cy=resend-btn]').should('not.be.disabled').click();
    cy.wait('@resendError');
    cy.wait(100); // Wait for UI update
    cy.get('[data-cy=error-message]').should('contain', 'Failed to resend OTP');
  });

  it('should handle resend OTP functionality', () => {
    cy.get('[data-cy=resend-btn]').should('be.disabled');
    cy.clock();
    cy.tick(16000);
    cy.get('[data-cy=resend-btn]').should('not.be.disabled').click();
    cy.wait('@graphql');
    cy.get('[data-cy=resend-btn]').should('be.disabled');
    cy.clock().then((clock) => clock.restore());
  });
});
