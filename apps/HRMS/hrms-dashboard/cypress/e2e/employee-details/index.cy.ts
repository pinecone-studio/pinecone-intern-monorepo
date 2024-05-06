describe('Employee Details page', () => {
  beforeEach(() => cy.visit('/employee-details'));

  it('pagination component visible', () => {
    cy.get('ul li:first').click();
    cy.get('ul li').eq(2).click();
    cy.url().should('include', 'employees=2');
    cy.get('ul li:last').click();
    cy.url().should('include', 'employees=2');
  });
  it('Modal should open when click on add employee button', () => {
    cy.get('[data-cy="addEmployeeBtn"]').should('exist').should('be.visible').click();
    cy.get('[data-cy="addEmployeeForm"]').should('exist').should('be.visible')
  });
});
