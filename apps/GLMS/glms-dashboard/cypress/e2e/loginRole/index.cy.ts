describe('LoginRole Component', () => {
  it('renders LoginRole component correctly', () => {
    cy.visit('/login-role');

    cy.get('[data-cy=login-role-container]').should('exist');

    cy.get('[data-testid=RoleTableContainer]').should('exist');
    cy.get('[data-testid=RoleTableHeader]').within(() => {
      cy.contains('h1', 'Admin role update').should('exist');
    });
    cy.get('[data-testid=RoleTableContent]').should('exist');
  });

  it('checks the layout of the RoleTableFeature', () => {
    cy.visit('/login-role');

    cy.get('[data-testid=RoleTableHeader]').should('exist');
    cy.get('[data-testid=RoleTableContent]').should('exist');
  });
});
