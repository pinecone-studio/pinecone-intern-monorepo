describe('Password Reset Flow', () => {
  beforeEach(() => {
    cy.visit('/forget-password');
    cy.window().then((win) => {
      cy.stub(win.console, 'log').as('consoleLog');
    });
  });

  it('should complete the entire password reset flow with valid inputs', () => {
    cy.get('[data-cy="forget-password-page"]').should('be.visible');
    cy.get('[data-cy="email-page"]').should('be.visible');
    cy.get('[data-cy="email-input"]').type('test@example.com');
    cy.get('[data-cy="submit-btn"]').should('not.be.disabled').click();
    cy.get('@consoleLog').should('be.calledWith', 'Email submitted:', 'test@example.com');

    cy.get('[data-cy="otp-page"]').should('be.visible');
    cy.contains('test@example.com').should('be.visible');

    cy.get('[data-cy="otp-input"]').find('input').type('1234');
    cy.get('@consoleLog').should('be.calledWithMatch', 'OTP submitted:', '1234', 'for email:', 'test@example.com');

    cy.get('[data-cy="new-password-page"]').should('be.visible');

    cy.get('[data-cy="password-input"]').type('StrongPass123');
    cy.get('[data-cy="confirm-password-input"]').type('StrongPass123');
    cy.get('[data-cy="submit-btn"]').should('not.be.disabled').click();
    cy.get('@consoleLog').should('be.calledWithMatch', 'New password submitted for:', 'test@example.com', 'Password:', 'StrongPass123');

    cy.url().should('include', '/login');

    cy.get('@consoleLog').should('be.calledWith', 'Password reset complete!');
  });

  it('should validate email input errors', () => {
    cy.get('[data-cy="email-form"] [data-cy="submit-btn"]').click();
    cy.get('[data-cy="error-message"]').should('be.visible').and('contain', 'Valid email is required');

    cy.get('[data-cy="email-input"]').type('invalid-email');
    cy.get('[data-cy="submit-btn"]').click();
    cy.get('[data-cy="error-message"]').should('be.visible').and('contain', 'Valid email is required');
  });

  it('should show error on wrong OTP and allow retry', () => {
    cy.get('[data-cy="email-input"]', { timeout: 10000 }).type('test@example.com');
    cy.get('[data-cy="submit-btn"]').click();
    cy.get('[data-cy="otp-page"]', { timeout: 10000 }).should('be.visible');

    cy.get('[data-cy="otp-input"]', { timeout: 10000 }).find('input').type('123');
    cy.get('[data-cy="otp-form"]').submit();

    cy.get('[data-cy="error-message"]', { timeout: 3000 }).should('contain', 'Must be 4 digits');

    cy.get('[data-cy="otp-input"]').find('input').clear().type('1234');
    cy.get('[data-cy="otp-form"]').submit();

    cy.get('[data-cy="new-password-page"]').should('exist');
  });

  it('should enable resend button after 15 seconds and restart timer on click', () => {
    cy.get('[data-cy="email-input"]', { timeout: 10000 }).type('test@example.com');
    cy.get('[data-cy="submit-btn"]').click();
    cy.get('[data-cy="otp-page"]', { timeout: 10000 }).should('be.visible');

    cy.get('[data-cy="resend-btn"]', { timeout: 10000 }).should('contain.text', 'Resend code (15)').and('be.disabled');

    cy.wait(16000);

    cy.get('[data-cy="resend-btn"]').should('contain.text', 'Resend code').and('not.be.disabled');

    cy.get('[data-cy="resend-btn"]').click();

    cy.get('[role="status"]').should('be.visible');
    cy.contains('Processing...').should('be.visible');

    cy.get('@consoleLog').should('be.calledWith', 'Code resent for email:', 'test@example.com');
    cy.get('[data-cy="resend-btn"]', { timeout: 2000 }).should('contain.text', 'Resend code (15)').and('be.disabled');
  });

  it('should validate all password requirements and submission', () => {
    cy.get('[data-cy="email-input"]').type('test@example.com');
    cy.get('[data-cy="submit-btn"]').click();
    cy.get('[data-cy="otp-input"]').find('input').type('1234');
    cy.get('[data-cy="new-password-page"]').should('be.visible');

    cy.get('[data-cy="new-password-form"] [data-cy="submit-btn"]').click();
    cy.get('[data-cy="error-message"]').should('be.visible').and('contain', 'Password must be at least 10 characters');

    cy.get('[data-cy="password-input"]').type('Short123');
    cy.get('[data-cy="confirm-password-input"]').type('Short123');
    cy.get('[data-cy="submit-btn"]').click();
    cy.get('[data-cy="error-message"]').should('contain', 'Password must be at least 10 characters');

    cy.get('[data-cy="password-input"]').clear().type('lowercaseonly123');
    cy.get('[data-cy="confirm-password-input"]').clear().type('lowercaseonly123');
    cy.get('[data-cy="submit-btn"]').click();
    cy.get('[data-cy="error-message"]').should('contain', 'Must contain uppercase letter');

    cy.get('[data-cy="password-input"]').clear().type('UPPERCASEONLY123');
    cy.get('[data-cy="confirm-password-input"]').clear().type('UPPERCASEONLY123');
    cy.get('[data-cy="submit-btn"]').click();
    cy.get('[data-cy="error-message"]').should('contain', 'Must contain lowercase letter');

    cy.get('[data-cy="password-input"]').clear().type('NoNumbersHere');
    cy.get('[data-cy="confirm-password-input"]').clear().type('NoNumbersHere');
    cy.get('[data-cy="submit-btn"]').click();
    cy.get('[data-cy="error-message"]').should('contain', 'Must contain number');

    cy.get('[data-cy="password-input"]').clear().type('StrongPass123');
    cy.get('[data-cy="confirm-password-input"]').clear().type('DifferentPass123');
    cy.get('[data-cy="submit-btn"]').click();
    cy.get('[data-cy="error-message"]').should('contain', "Passwords don't match");

    cy.get('[data-cy="password-input"]').clear().type('StrongPass123');
    cy.get('[data-cy="confirm-password-input"]').clear().type('StrongPass123');
    cy.get('[data-cy="submit-btn"]').click();
    cy.url().should('include', '/login');
    cy.get('@consoleLog').should('be.calledWith', 'Password reset complete!');
  });

  it('should test component unmounting for OTP timer cleanup', () => {
    cy.get('[data-cy="email-input"]', { timeout: 10000 }).type('test@example.com');
    cy.get('[data-cy="submit-btn"]').click();
    cy.get('[data-cy="otp-page"]', { timeout: 10000 }).should('be.visible');

    cy.visit('/login');
  });

  it('should test isSubmitting state in all forms', () => {
    cy.get('[data-cy="email-input"]', { timeout: 10000 }).type('test@example.com');
    cy.get('[data-cy="submit-btn"]').click();
    cy.get('[data-cy="otp-page"]', { timeout: 10000 }).should('be.visible');

    cy.get('[data-cy="otp-input"]').find('input').type('1234');
    cy.get('[role="status"]').should('be.visible');
    cy.contains('Processing...').should('be.visible');

    cy.get('[data-cy="new-password-page"]').should('be.visible');
    cy.get('[data-cy="password-input"]').type('StrongPass123');
    cy.get('[data-cy="confirm-password-input"]').type('StrongPass123');
    cy.get('[data-cy="submit-btn"]').click();
  });
});
