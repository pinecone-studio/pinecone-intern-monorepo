describe('LoginRole', () => {
  beforeEach(() => {
    cy.visit('/login-role');
  });

  it('1. Should render the LoginRole page', () => {
    cy.get('[data-cy="login-role-container"]').should('exist');
  });
});
