describe('profile page', () => {
  beforeEach(() => cy.visit('/profile'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from GLMS dashboard Profile Page');
  });
});
