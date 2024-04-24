describe('Employee Details page', () => {
  beforeEach(() => cy.visit('/employee-details'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from HRMS dashboard Employee details Page1');
  });

  it('Should navigate to home page when clicks on the home page button', () => {
    cy.get('[data-cy="Home-Page-Button"]').should('exist').click();
    cy.url().should('contain', '/');
  });

  it('pagination component visible', () => {
    cy.get('[data-testid="page-button"]').should('exist').should('be.visible');
    cy.get('.MuiPaginationItem-root').eq(2).click();
    cy.get('.MuiPaginationItem-root').should('contain', '2');
    cy.get('.MuiPagination-ul ').find('li:last-child').click();
    cy.get('.MuiPaginationItem-root').eq(0).click();
  });
});
