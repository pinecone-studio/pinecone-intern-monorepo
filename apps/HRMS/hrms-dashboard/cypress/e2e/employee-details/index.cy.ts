describe('Employee Details page', () => {
  beforeEach(() => cy.visit('/employee-details'));

  it('pagination component visible', () => {
    cy.get('[data-testid="pagination"]').should('exist').should('be.visible');
    cy.get('[data-testid="before-button"]').should('exist').click();
    cy.get('[data-testid="page-button-2"]').should('exist').click();
    cy.get('[data-testid="after-button"]').should('exist').click();
  });
  it('Modal should open when click on add employee button', () => {
    cy.get('[data-cy="addEmployeeBtn"]').should('exist').should('be.visible').click();
    cy.get('[data-cy="addEmployeeForm"]').should('exist').should('be.visible');
  });
});
