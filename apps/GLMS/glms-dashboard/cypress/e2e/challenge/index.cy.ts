describe('Challenge page', () => {
  beforeEach(() => cy.visit('/challenge'));

  it('1. Should display welcome message', () => {
    cy.get('h1').contains('Welcome to Challenge page');
  });
  it('2. Should display progress bar', () => {
    cy.get('[data-testid="progress-bar"]').should('be.visible');
  });
  it('3. Should challenge title', () => {
    cy.get('[data-cy="Challenge-Result-Title"]').should('be.visible');
  });
});
