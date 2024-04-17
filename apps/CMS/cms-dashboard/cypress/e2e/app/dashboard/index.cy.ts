describe('dashboard page', () => {
  beforeEach(() => cy.visit('/dashboard'));

  it('Should display welcome message', () => {
    cy.get('[data-cy=Dashboard-Welcome-Message]').should('exist').should('be.visible');
  });
});
