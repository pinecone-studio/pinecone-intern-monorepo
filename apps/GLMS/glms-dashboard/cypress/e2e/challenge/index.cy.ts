describe('Challenge page', () => {
  beforeEach(() => cy.visit('/challenge'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('Welcome to Challenge page');
  });
  it('Should display progress bar', () => {
    cy.get('[data-testid="progress-bar"]').should('be.visible');
  });
});
