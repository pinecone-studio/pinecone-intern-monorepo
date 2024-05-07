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

  it('Dashboard table must be defined', () => {
    cy.get('[data-cy="dashboard-table-cy"]').should('exist').should('be.visible');
  });

  it('Filter by date must be defined', () => {
    cy.get('[data-cy="filter-by-date-cy-id"]').should('exist').should('be.visible');
  });

  it('Navbar must be defined', () => {
    cy.get('[data-cy="navbar-cy-id"]').should('exist').should('be.visible');
  });

  it('Dashboard table', () => {
    cy.get('[data-cy="dashboard-table-cy-id"]').should('exist').should('be.visible');
  });

  it('2. Morevert button click', () => {
    cy.get('[data-cy="morevert-button-test-cy"]').eq(0).should('exist').click();
    cy.get('[data-cy="drop-down-menu-test-cy"]').eq(0).should('exist').click({ force: true });
  });

  // Pagination component
  it('Pagination component must be defined', () => {
    cy.get('[data-cy="pagination-cy-id"]').eq(0).should('exist').click();
  });
});
