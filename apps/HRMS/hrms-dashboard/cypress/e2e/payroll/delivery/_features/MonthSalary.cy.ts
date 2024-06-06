describe('Monthly Salary Page', () => {
  beforeEach(() => cy.visit('/payroll/delivery'));

  it('1.Page header should be visible', () => {
    cy.get('[data-cy="monthNumber"]').should('be.visible').should('have.text', '5 САР');
    cy.get('[data-cy="advanceSalary"]').should('be.visible').should('have.text', 'Урьдчилгаа цалин');
    cy.get('[data-cy="advanceSalaryDate"]').should('be.visible').should('have.text', '5/1 -с 5/15');
  });
  
});
