describe('dashboard page', () => {
  beforeEach(() => cy.visit('/dashboard'));

  // ArticleStatusTabs feature
  it('ArticleStatusTabs must be defined', () => {
    cy.get('[data-cy="article-status-tabs-feature-cy-id"]').should('exist');
  });

  // SearchInput component
  it('SearchInput component must be defined', () => {
    cy.get('[data-cy="search-input-cy-id"]').should('exist');
  });

  // AdminNavigateLinksFeature
  it('AdminNavigateLinksFeature must be defined', () => {
    cy.get('[data-cy="admin-navigate-links-feature-cy-id"]').should('exist');
  });
});
