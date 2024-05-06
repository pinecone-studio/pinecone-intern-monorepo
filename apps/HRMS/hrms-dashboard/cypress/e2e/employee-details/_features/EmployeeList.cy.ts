describe('Employee list page', () => {
  beforeEach(() => cy.visit('/employee-details?employees=1'));

  it('1.Page header should be visible', () => {
    cy.get('[data-cy="employeePageTitle"]').should('be.visible').should('have.text', 'Ажилчид');
    cy.get('[data-cy="addEmployeeBtn"]').should('be.visible');
  });

  it('2.should display the correct number of employees in the table', () => {
    cy.get('[data-cy="employeesList"]').should('be.visible');
  });

  it('3.should open create employee form when add employee button is clicked', () => {
    cy.get('[data-cy="addEmployeeBtn"]').click();
    cy.get('[data-testid=create-employee]').should('be.visible');
    cy.get('[data-testid="close-button"]').click()
  });

  it('4.should navigate to the correct page when pagination button is clicked', () => {
    cy.get('ul li:first').click();
    cy.get('ul li').eq(2).click();
    cy.url().should('include', 'employees=2');
    cy.get('ul li:last').click();
    cy.url().should('include', 'employees=2');
  });
});
