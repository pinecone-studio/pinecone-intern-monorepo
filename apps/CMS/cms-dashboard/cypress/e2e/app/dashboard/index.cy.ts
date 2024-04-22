describe('dashboard page', () => {
  beforeEach(() => cy.visit('/dashboard'));

  it('Should display welcome message', () => {
    cy.get('[data-cy=dashboard-page-cy-test-id]').should('exist').should('be.visible');
  });
});
