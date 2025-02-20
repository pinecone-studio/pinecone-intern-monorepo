describe('Forget Password verify Component', () => {
  beforeEach(() => {
    cy.window().then((window) => {
      window.localStorage.setItem('forgetPasswordEmail', 'test@example.com');
    });

    cy.visit('/forget-password/password');
  });

  it('should fill in password inputs and submit correctly', () => {
    cy.get('input[placeholder="Password"]').type('Password123');

    cy.get('input[placeholder="Confirm password"]').type('Password123');

    cy.get('button').contains('Continue').click();

    cy.url().should('eq', `${window.origin}/`);
    cy.contains('The password has been successfully changed.').should('be.visible');
  });

  it('should show error when passwords do not match', () => {
    cy.get('input[placeholder="Password"]').type('Password123');

    cy.get('input[placeholder="Confirm password"]');

    cy.get('button').contains('Continue').click();

    cy.contains('Your password does not match').should('be.visible');
  });
});
