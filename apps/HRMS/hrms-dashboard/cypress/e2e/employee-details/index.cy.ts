describe('Employee Details page', () => {
  beforeEach(() => cy.visit('/employee-details'));

  it('pagination component visible', () => {
    cy.get('[data-testid="page-button"]').should('exist').should('be.visible');
    cy.get('.MuiPaginationItem-root').eq(2).click();
    cy.get('.MuiPaginationItem-root').should('contain', '2');
    cy.get('.MuiPagination-ul ').find('li:last-child').click();
    cy.get('.MuiPaginationItem-root').eq(0).click();
  });

  it('should addtional information feature', () => {
    cy.get('[data-testid="phone-number"]').should('be.visible').contains('Яаралтай үед холбоо барих хүний дугаар');
    cy.get('[data-testid="update-button"]').should('exist').click();
    cy.get('[data-testid="dependent"]').should('be.visible').contains('Хэн болох');
  });
});
