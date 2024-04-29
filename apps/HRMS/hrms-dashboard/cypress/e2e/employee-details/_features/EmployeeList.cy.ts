describe('Employee list page', () => {
  beforeEach(() => cy.visit('/employee-details'));

  it('1.Page header should be visible', () => {
    cy.get('[data-cy="employeePageTitle"]').should('be.visible').should('have.text', 'Ажилчид');
    cy.get('[data-cy="addEmployeeBtn"]').should('be.visible');
  });
});
