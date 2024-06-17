describe('home page', () => {
  beforeEach(() => cy.visit('/student'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from REPORT dashboard');
  });
});
