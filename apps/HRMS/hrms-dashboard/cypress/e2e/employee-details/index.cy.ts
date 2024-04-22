describe('Employee Details page', () => {
  beforeEach(() => cy.visit('/employee-details'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from HRMS dashboard Employee details Page1');
  });

  it('Should navigate to home page when clicks on the home page button', () => {
    cy.get('[data-cy="Home-Page-Button"]').should('exist').click();
    cy.url().should('contain', '/');
  });
});
