describe('SignUpStep', () => {
  beforeEach(() => {
    cy.visit('/auth/sign-up');
    cy.get('input[placeholder="name@example.com"]').type(`test${Math.floor(Math.random() * 10000)}@example.com`);
    cy.contains('Continue').click();
  });

  it('should show error on wrong OTP and allow retry', () => {
    cy.get('[data-testid="otp-slot"]').type('4321');

    cy.contains('The password is incorrect. Please check again.', { timeout: 3000 }).should('exist');
  });

  it('should enable resend button after 15 seconds and restart timer on click', () => {
    cy.clock();

    cy.contains(/Send again \(\d+\)/).should('exist');
    cy.contains('Send again').should('be.disabled');

    cy.tick(15000);

    cy.contains('Send again').should('not.be.disabled');

    cy.contains('Send again').click();

    cy.tick(1000);
    cy.contains(/Send again \(15\)/).should('exist');

    cy.tick(15000);
    cy.contains('Send again').should('not.be.disabled');
  });
  it('should verify otp', () => {
    cy.intercept('POST', '**/graphql', {
      body: {
        data: {
          isVerified: 'success',
        },
      },
    }).as('verifyOtp');

    cy.get('[data-testid="otp-slot"]').type('4321');
    cy.wait('@verifyOtp');
    cy.contains('Continue').click();

    cy.get('[data-testid="password-input"]').type('Password123!');
    cy.get('[data-testid="confirm-password-input"]').type('Mismatch123!');
    cy.contains('Continue').click();

    cy.contains('Password do not match', { timeout: 3000 }).should('exist');

    cy.log('Filling matching password fields...');
    cy.get('[data-testid="password-input"]').clear().type('Password123!');
    cy.get('[data-testid="confirm-password-input"]').clear().type('Password123!');
    cy.contains('Continue').click();
  });
});
