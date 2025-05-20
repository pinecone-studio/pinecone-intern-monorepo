describe('Forget Password Page', () => {
  const testEmail = 'user@example.com';

  beforeEach(() => {
    cy.visit('/forget-password');
  });

  context('Step 1: Email Input Form', () => {
    it('1. renders all form elements correctly', () => {
      cy.contains('Forget password').should('be.visible');
      cy.contains('Enter your email account to reset password').should('be.visible');

      cy.get('form').within(() => {
        cy.get('input[type="email"]').should('exist').and('have.attr', 'placeholder', 'email@example.com');
        cy.get('button').contains('Continue').should('exist').and('not.be.disabled');
      });
    });

    it('2. shows error if email is empty on submit', () => {
      cy.get('button').contains('Continue').click();
      cy.contains('Email is required').should('exist');
    });

    it('3. accepts valid email and goes to step 2', () => {
      cy.get('[data-testid="email-input"]').type(testEmail).should('have.value', testEmail);
      cy.get('[data-testid="submit-button"]').click();
      cy.get('[data-cy=otp-input]').should('exist');
    });
  });

  context('Step 2: OTP Verification', () => {
    beforeEach(() => {
      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body.query.includes('requestOTP')) {
          req.reply({ data: { requestOTP: true } });
        }
      });

      cy.get('[data-testid="email-input"]').type(testEmail);
      cy.get('[data-testid="submit-button"]').click();
    });

    it('4. renders OTP input and timer', () => {
      cy.get('[data-cy=otp-input]').should('exist');
      cy.get('[data-cy=resend-otp-button]').should('exist');
    });

    it('5. shows error if invalid OTP entered', () => {
      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body.query.includes('verifyOTP')) {
          req.reply({ data: { verifyOTP: false } });
        }
      });

      cy.get('[data-cy=otp-input]').type('123456');
      cy.get('[data-cy=otp-loading]').should('exist');
      cy.contains('Invalid OTP').should('exist');
    });

    it('6. resend OTP becomes clickable after timeout', () => {
      cy.clock();
      cy.tick(15000);
      cy.get('[data-cy=resend-otp-button]').contains('Send again').click();
    });
  });

  context('Step 3: New Password Creation', () => {
    beforeEach(() => {
      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body.query.includes('requestOTP')) {
          req.reply({ data: { requestOTP: true } });
        }
        if (req.body.query.includes('verifyOTP')) {
          req.reply({ data: { verifyOTP: true } });
        }
      });

      cy.get('[data-testid="email-input"]').type(testEmail);
      cy.get('[data-testid="submit-button"]').click();
      cy.get('[data-cy=otp-input]').type('123456');
    });

    it('7. shows validation error if passwords do not match', () => {
      cy.contains('Create new password').should('be.visible');
      cy.get('[data-testid="new-password"]').type('abc123');
      cy.get('[data-testid="confirm-password"]').type('abc321');
      cy.get('[data-testid="reset-submit"]').click();
      cy.contains('Passwords do not match').should('be.visible');
    });

    it('8. resets password successfully and redirects', () => {
      cy.intercept('POST', '/api/graphql', (req) => {
        if (req.body.query.includes('resetPassword')) {
          req.reply({ data: { resetPassword: { token: 'mocked-token' } } });
        }
      });

      cy.get('[data-testid="new-password"]').type('newpass123');
      cy.get('[data-testid="confirm-password"]').type('newpass123');
      cy.get('[data-testid="reset-submit"]').click();

      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });
});
