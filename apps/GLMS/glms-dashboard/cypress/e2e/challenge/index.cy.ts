describe('Challenge page', () => {
  beforeEach(() => cy.visit('/challenge'));

  it('1. Should display welcome message', () => {
    cy.get('h1').contains('Welcome to Challenge page');
  });
  it('2. Should challenge title', () => {
    cy.get('[data-cy="Challenge-Result-Title"]').should('be.visible');
  });
});
