describe('dashboard page', () => {
  beforeEach(() => cy.visit('/dashboard'));

  // Container
  it('1. Should exist container', () => {
    cy.get('[data-cy="dashboard-page-cy-id"]').should('exist').should('be.visible');
  });

  // Navbar
  it('1. Should exist navbar', () => {
    cy.get('[data-cy="navbar-cy-id"]').should('exist').should('be.visible');
  });

  // Search input
  it('1. Should exist search input', () => {
    cy.get('[data-cy="search-input-cy-id"]').should('exist').should('be.visible');
  });

  // Date input
  it('1. Should exist date input', () => {
    cy.get('[data-cy="filter-by-date-cy-id"]').should('exist').should('be.visible');
  });

  // Menu bar
  it('3. MenuBar should be visible', () => {
    cy.get('[data-cy="menu-bar-cy-id"]').should('exist').should('be.visible');
  });

  // Dashboard datble
  it('1. Should exist dashboard table', () => {
    cy.get('[data-cy="dashboard-table-cy-id"]').should('exist').should('be.visible');
  });

  // Morevert button
  it('2. Morevert button click', () => {
    cy.get('[data-cy="morevert-button-test-cy"]').eq(0).should('exist').click();
    cy.get('[data-cy="drop-down-menu-test-cy"]').eq(0).should('exist').click({ force: true });
  });
});
