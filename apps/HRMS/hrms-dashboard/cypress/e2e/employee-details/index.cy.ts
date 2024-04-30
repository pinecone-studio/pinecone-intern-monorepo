describe('Employee Details page', () => {
  beforeEach(() => cy.visit('/employee-details'));

  it('pagination component visible', () => {
    cy.get('[data-testid="page-button"]').should('exist').should('be.visible');
    cy.get('.MuiPaginationItem-root').eq(2).click();
    cy.get('.MuiPaginationItem-root').should('contain', '2');
    cy.get('.MuiPagination-ul ').find('li:last-child').click();
    cy.get('.MuiPaginationItem-root').eq(0).should('exist').click({ force: true });
  });
});
