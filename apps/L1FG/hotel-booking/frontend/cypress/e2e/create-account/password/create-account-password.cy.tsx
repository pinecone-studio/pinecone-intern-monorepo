describe('CreateAccountPassword Component', () => {
  beforeEach(() => {
    cy.window().then((window) => {
      window.localStorage.setItem('email', 'test@example.com');
    });

    cy.visit('/create-account/password');
  });

  it('should fill in password inputs and submit correctly', () => {
    cy.get('input[placeholder="Password"]').type('Password123');

    cy.get('input[placeholder="Confirm password"]').type('Password123');

    cy.get('button').contains('Continue').click();

    cy.url().should('eq', 'http://localhost:4201/?bedcount=1');
    cy.contains('Successfully logged in').should('be.visible');
  });

  it('should show error when passwords do not match', () => {
    cy.get('input[placeholder="Password"]').type('Password123');

    cy.get('input[placeholder="Confirm password"]');

    cy.get('button').contains('Continue').click();

    cy.contains('Your password does not match').should('be.visible');
  });
});
