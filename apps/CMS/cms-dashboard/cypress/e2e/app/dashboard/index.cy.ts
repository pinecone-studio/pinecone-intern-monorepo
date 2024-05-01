describe('dashboard page', () => {
  beforeEach(() => cy.visit('/dashboard'));
  // AdminNavigateLinksFeature
  it('AdminNavigateLinksFeature must be defined', () => {
    cy.get('[data-cy="admin-navigate-links-feature-cy-id"]').should('exist');
  });

  it('1. Should exist container', () => {
    cy.get('[data-cy="dashboard-page-cy"]').should('exist').should('be.visible');
  });
});
