describe('dashboard page', () => {
  beforeEach(() => cy.visit('/dashboard'));
  // AdminNavigateLinksFeature
  it('AdminNavigateLinksFeature must be defined', () => {
    cy.get('[data-cy="admin-navigate-links-feature-cy-id"]').should('exist');
  });
});
