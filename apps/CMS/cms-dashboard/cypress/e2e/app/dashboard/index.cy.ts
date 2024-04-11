describe('dashboard page', () => {
  beforeEach(() => cy.visit('/dashboard'));

  it('Should display welcome message', () => {
    cy.get('div').contains('Welcome to Cms Dashboard hello ');
  });
});
