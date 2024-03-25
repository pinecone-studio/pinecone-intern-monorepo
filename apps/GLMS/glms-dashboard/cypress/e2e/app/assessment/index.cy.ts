describe('assessment page', () => {
  beforeEach(() => cy.visit('/assessment'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from GLMS dashboard Assessment Page');
  });
});
