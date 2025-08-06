describe('Login Page', () => {
  it('should render the login page', () => {
    cy.visit('/login');
    cy.get('[data-cy="Login-Hello-Message"]').should('be.visible');
    cy.get('[data-cy="Login-Hello-Message"]').should('have.text', 'Logn');
  });
});
