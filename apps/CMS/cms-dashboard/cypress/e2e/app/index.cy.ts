describe('home page', () => {
  beforeEach(() => cy.visit('/'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from CMS dashboard');
  });
});
