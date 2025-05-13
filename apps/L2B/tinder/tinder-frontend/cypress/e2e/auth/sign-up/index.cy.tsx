describe('SignUp Third Step', () => {
  beforeEach(() => {
    cy.visit('/auth/sign-up');

    cy.get('input[placeholder="name@example.com"]').type('test@example.com');
    cy.contains('Continue').click();

    cy.get('[data-testid="otp"]').type('1234');
    cy.contains('Continue').click();
  });

  it('shows error if passwords do not match', () => {
    cy.get('[data-testid="password-input"]').type('Password123!');
    cy.get('[data-testid="confirm-password-input"]').type('Mismatch123!');
    cy.contains('Continue').click();

    cy.contains('Password do not match').should('exist');
  });

  it('submits when password is valid and matches confirm', () => {
    cy.get('[data-testid="password-input"]').type('Password123!');
    cy.get('[data-testid="confirm-password-input"]').type('Password123!');
    cy.contains('Continue').click();

    cy.contains('test@example.com').should('exist');
  });
});
