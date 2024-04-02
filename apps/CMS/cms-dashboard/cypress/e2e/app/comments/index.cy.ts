describe('comments page', () => {
  beforeEach(() => cy.visit('/comments'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from CMS dashboard Comments Page');
  });
});
