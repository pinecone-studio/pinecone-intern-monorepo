describe('dashboard page', () => {
  beforeEach(() => cy.visit('/dashboard'));

  // ArticleStatusTabs feature
  it('1. ArticleStatusTabs must be defined', () => {
    cy.get('[data-cy="article-status-tabs-feature-cy-id"]').should('exist');
  });

  // SearchInput component
  it('2. SearchInput component must be defined', () => {
    cy.get('[data-cy="search-input-cy-id"]').should('exist');
  });

  // AdminNavigateLinksFeature
  it('3. AdminNavigateLinksFeature must be defined', () => {
    cy.get('[data-cy="admin-navigate-links-feature-cy-id"]').should('exist');
  });

  it('4. Dashboard table must be defined', () => {
    cy.get('[data-cy="dashboard-table-cy"]').should('exist').should('be.visible');
  });

  it('5. Filter by date must be defined', () => {
    cy.get('[data-cy="filter-by-date-cy-id"]').should('exist').should('be.visible');
  });

  it('6. Navbar must be defined', () => {
    cy.get('[data-cy="navbar-cy-id"]').should('exist').should('be.visible');
  });

  it('7. Dashboard table', () => {
    cy.get('[data-cy="dashboard-table-cy-id"]').should('exist').should('be.visible');
  });

  it('8. Morevert button click', () => {
    cy.get('[data-cy="morevert-button-test-cy"]').eq(0).should('exist').click();
    cy.get('[data-cy="drop-down-menu-test-cy"]').eq(0).should('exist').click({ force: true });
  });

  // Pagination component
  it('9. Pagination component must be defined', () => {
    cy.get('[data-cy="pagination-cy-id"]').eq(0).should('exist').click();
  });
});
