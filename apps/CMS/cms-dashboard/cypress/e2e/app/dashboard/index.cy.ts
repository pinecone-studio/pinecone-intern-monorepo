describe('dashboard page', () => {
  beforeEach(() => cy.visit('/dashboard'));

  it('Should display welcome message', () => {
    cy.get('data-cy="dashboard-welcome-page-cy-id"').should('exist').should('be.visible');
  });
});
