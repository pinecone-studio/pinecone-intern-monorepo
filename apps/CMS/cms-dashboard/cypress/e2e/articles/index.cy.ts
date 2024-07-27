describe('ArticlesPage', () => {
  beforeEach(() => {
    cy.visit('/articles');
  });

  it('Should render the Article-Page heading', () => {
    cy.get('[data-cy="Article-Page"]').should('exist').and('contain.text', 'hello from ArticlesPage');
  });
});
