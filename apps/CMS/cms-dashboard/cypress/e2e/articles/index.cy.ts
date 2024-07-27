/// <reference types="cypress" />

describe('ArticlesPage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should render the Article-Page heading', () => {
    cy.get('[data-cy="Article-Page"]').should('exist');
    cy.get('[data-cy="Article-Page"]').should('contain.text', 'hello from ArticlesPage');
  });
});
