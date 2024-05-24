describe('dashboard page', () => {
  it('sign in by user', () => {
    cy.visit('/sign-in');
    cy.get('input[name="emailOrPhoneNumber"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('Admin1234!');
    cy.get('[data-cy="Sign-In-Button"]').should('exist').click();
    cy.visit('/dashboard');

    // ArticleStatusTabs feature
    cy.get('[data-cy="article-status-tabs-feature-cy-id"]').should('exist');

    // SearchInput component
    cy.get('[data-cy="search-input-cy-id"]').should('exist');

    // AdminNavigateLinksFeature
    cy.get('[data-cy="admin-navigate-links-feature-cy-id"]').should('exist');

    // Dashboard table must be defined
    cy.get('[data-cy="dashboard-table-cy-id"]').should('exist').should('be.visible');

    // Filter by date must be defined
    cy.get('[data-cy="filter-by-date-cy-id"]').should('exist').should('be.visible');
    // Navbar must be defined
    cy.get('[data-cy="navbar-cy-id"]').should('exist').should('be.visible');

    // Dashboard table
    cy.get('[data-cy="dashboard-table-cy-id"]').should('exist').should('be.visible');

    // Morevert button click
    cy.get('[data-cy="morevert-button-test-cy"]').eq(0).should('exist').click();
    cy.get('[data-cy="drop-down-menu-test-cy"]').eq(0).should('exist').click({ force: true });

    // Pagination component
    cy.get('[data-cy="pagination-cy-id"]').eq(0).should('exist').click();
  });
  it('sign in by admin', () => {
    cy.visit('/sign-in');
    cy.get('input[name="emailOrPhoneNumber"]').type('testadmin@gmail.com');
    cy.get('input[name="password"]').type('@Pi72365');
    cy.get('[data-cy="Sign-In-Button"]').should('exist').click();
    cy.visit('/dashboard');

    // ArticleStatusTabs feature
    cy.get('[data-cy="article-status-tabs-feature-cy-id"]').should('exist');

    // SearchInput component
    cy.get('[data-cy="search-input-cy-id"]').should('exist');

    // AdminNavigateLinksFeature
    cy.get('[data-cy="admin-navigate-links-feature-cy-id"]').should('exist');

    // Dashboard table must be defined
    cy.get('[data-cy="dashboard-table-cy-id"]').should('exist').should('be.visible');

    // Filter by date must be defined
    cy.get('[data-cy="filter-by-date-cy-id"]').should('exist').should('be.visible');
    // Navbar must be defined
    cy.get('[data-cy="navbar-cy-id"]').should('exist').should('be.visible');

    // Dashboard table
    cy.get('[data-cy="dashboard-table-cy-id"]').should('exist').should('be.visible');

    // Morevert button click
    cy.get('[data-cy="morevert-button-test-cy"]').eq(0).should('exist').click();
    cy.get('[data-cy="drop-down-menu-test-cy"]').eq(0).should('exist').click({ force: true });

    // Pagination component
    cy.get('[data-cy="pagination-cy-id"]').eq(0).should('exist').click();
  });
});
