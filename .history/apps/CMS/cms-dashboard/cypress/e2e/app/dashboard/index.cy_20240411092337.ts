describe('dashboard page', () => {
  beforeEach(() => cy.visit('/dashboard'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hi footer pages');
  });
});
