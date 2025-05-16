describe('forget-password', () => {
  beforeEach(() => {
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

    cy.get('[data-testid="otp-slot"]', { timeout: 5000 }).should('exist');
  });

  it('should show error on wrong OTP and allow retry', () => {
    cy.get('input[placeholder="email"]').type('test@example.com');
    cy.contains('Continue').click();

    cy.get('[data-testid="otp-slot"]').type('4321');
    cy.contains('Wrong code. Please try again.', { timeout: 3000 }).should('exist');
    cy.get('[data-testid="otp-slot"]').should('have.value', '');
    cy.get('[data-testid="otp"]').type('1234');

    cy.get('[data-testid="Step3"]', { timeout: 5000 }).should('exist');
  });

  it('should enable resend button after 15 seconds and restart timer on click', () => {
    cy.get('input[placeholder="email"]').type('test@example.com');
    cy.contains('Continue').click();

    cy.contains(/Send again \(\d+\)/).should('exist');
    cy.contains('Send again').should('be.disabled');

    cy.wait(16000);

    cy.contains('Send again').should('not.be.disabled');

    cy.contains('Send again').click();
    cy.contains(/Send again \(15\)/).should('exist');
  });

  it('should allow setting new password in third step', () => {
    cy.get('input[placeholder="email"]').type('test@example.com');
    cy.contains('Continue').click();

    cy.get('[data-testid="otp"]').type('1234');

    cy.get('[data-testid="password-input"]', { timeout: 5000 }).should('exist');
    cy.get('[data-testid="password-input"]').type('MyStrongPass123');
    cy.get('[data-testid="confirm-password-input"]').type('MyStrongPass123');
    cy.get('[data-testid="submit-password"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Password successfully set!');
    });
  });
});
