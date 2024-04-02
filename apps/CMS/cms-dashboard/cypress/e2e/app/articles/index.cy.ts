describe('articles page', () => {
  beforeEach(() => cy.visit('/articles'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from CMS dashboard Articles Page');
  });
});
