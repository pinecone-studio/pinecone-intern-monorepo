describe('Employee list page', () => {
  beforeEach(() => cy.visit('/employee-details?employees=1'));

  it('1.Page header should be visible', () => {
    cy.get('[data-cy="employeePageTitle"]').should('be.visible').should('have.text', 'Ажилчид');
    cy.get('[data-cy="addEmployeeBtn"]').should('be.visible');
  });

  it('2.should display the correct number of employees in the table', () => {
    cy.get('[data-cy="employeesList"]').should('be.visible');
  });

  it('3.should navigate to the correct page when pagination button is clicked', () => {
    cy.get('.MuiPaginationItem-root').eq(2).click();
    cy.url().should('include', 'employees=2');
  });
});
