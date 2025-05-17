describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display the logo', () => {
    cy.get('[data-testid="Logo-image"]').should('be.visible');
  });

  it('should open the Clerk sign-in modal when login button is clicked', () => {
    cy.get('[data-cy="login-btn"]').click();
  });

  it('should redirect to home if already signed in', () => {
    cy.setCookie('__session', 'mocked-session-token');
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
