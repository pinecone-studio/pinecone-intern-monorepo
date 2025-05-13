describe('forget-password', () => {
  beforeEach(() => {
    cy.visit('/auth/forget-password');
    cy.get('input[placeholder="email"]').type('test@example.com');
    cy.contains('Continue').click();
  });

  it('should show error on wrong OTP and allow retry', () => {
    cy.get('[data-testid="otp-slot"]').type('4321');

    cy.contains('Wrong code. Please try again.', { timeout: 3000 }).should('exist');

    cy.get('[data-testid="otp-slot"]').should('have.value', '');

    cy.get('[data-testid="otp"]').type('1234');

    cy.get('[data-cy="Step3"]', { timeout: 5000 }).should('exist');
  });

  it('should enable resend button after 15 seconds and restart timer on click', () => {
    cy.contains(/Send again \(\d+\)/).should('exist');
    cy.contains('Send again').should('be.disabled');

    cy.wait(16000);

    cy.contains('Send again').should('not.be.disabled');

    cy.contains('Send again').click();
    cy.contains(/Send again \(15\)/).should('exist');
  });
});
