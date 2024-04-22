describe('dashboard page', () => {
  beforeEach(() => cy.visit('/dashboard'));

  it('1. Should display welcome message', () => {
    cy.get('[data-cy=dashboard-page-cy-id]').should('exist').should('be.visible');
  });
  it('2. Should render pagination footer component', () => {
    cy.get('[data-cy=pagination-footer-cy-id]').should('exist').should('be.visible');
  });
});
