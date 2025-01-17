describe('Search Page', () => {
  it('should render search page', () => {
    cy.visit('/search');
    cy.get('[data-cy="search-page"]').should('be.visible');
    cy.get('[data-cy="search-input"]').type('search');
    cy.get('[data-cy="search-input"]').should('have.value', 'search');
  });

  it('should show loading when data is being fetched', () => {
    cy.visit('/search');
    cy.get('[data-cy="search-page-get-data-loading"]').should('be.visible');
    cy.get('[data-cy="search-page-get-data-loading"]').should('have.text', 'loading');
  });
});
