describe('One article page', () => {
  beforeEach(() => {
    cy.visit('/articles/663097b58073930529faddfc');
  });
  it('1. Should display', () => {
    cy.get('[data-cy="one-article-content"]').should('exist');
    cy.get('[data-cy="one-article-container"]').should('exist');
    cy.get('[data-cy="one-article-back-cutton"]').should('exist').click({ force: true });
  });

  it('2. Should return articles filtered by title', () => {
    cy.get('[data-cy="search-input"]').should('exist').type('porsche');
    cy.get('[data-cy="searched-article-container"]', { timeout: 1000 }).should('exist');
    cy.get('[data-cy="search-input"]').should('exist').type('title that is not in the db');
    cy.get('[data-cy="searched-article-container"]').should('not.exist');
  });

  it('3. Should render articles filtered by category properly', () => {
    cy.get('[data-cy="header-container"]').should('exist');
    cy.get('[data-cy="category-text"]').should('exist').click({ force: true });
    cy.get('[data-cy="category-and-result"]').should('be.visible');
    cy.get('[data-cy="each-category"]').should('exist').click({ multiple: true });
    cy.get('[data-cy="header-article"]').should('be.visible');
    cy.get('[data-cy="each-category"]').should('exist').dblclick({ multiple: true });
    cy.get('[data-cy="header-article"]').should('not.be.visible');
    cy.get('[data-cy="search-input"]').should('exist').type('porsche');
    cy.get('[data-cy="category-and-result"]').should('be.visible');
  });

  it('4. Should jump into article pages with id', () => {
    cy.get('[data-cy="category-text"]').should('exist').click({ force: true });
    cy.get('[data-cy="category-and-result"]').should('be.visible');
    cy.get('[data-cy="each-category"]').should('exist').click({ multiple: true });
    cy.get('[data-cy="header-article"]').should('be.visible');
    // cy.get('[data-cy="each-header-article"]').first().click()
  });
});
