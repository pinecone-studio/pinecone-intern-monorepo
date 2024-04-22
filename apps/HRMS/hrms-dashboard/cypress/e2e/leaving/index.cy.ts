describe('Leaving page', () => {
  beforeEach(() => cy.visit('/leaving'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from HRMS dashboard Leaving Page');
  });

  it('Should navigate to home page when clicks on the home page button', () => {
    cy.get('[data-cy="Home-Page-Button"]').should('exist').click();
    cy.url().should('contain', '/');
  });
});
