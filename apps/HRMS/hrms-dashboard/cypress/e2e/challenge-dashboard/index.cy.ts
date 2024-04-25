describe('profile page', () => {
  beforeEach(() => cy.visit('/challenge-dashboard'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from GLMS dashboard');
  });
});
