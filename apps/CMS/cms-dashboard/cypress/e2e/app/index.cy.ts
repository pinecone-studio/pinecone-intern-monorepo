describe('home page', () => {
  beforeEach(() => cy.visit('/dashboard'));

  // Menu bar feature
  it('MenuBar should exist', () => {
    cy.get('[data-cy="menu-bar-cy-id"]').should('exist').should('be.visible')
  })

  // Pagination footer feature
  it('Should render pagination footer', () => {
    cy.get('[data-cy=pagination-footer-cy-id]').should('exist').should('be.visible');
  });
});
