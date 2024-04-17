describe('Create employee form', () => {
  beforeEach(() => cy.visit('localhost:4200/employee-details'));

  it('Create new employee form', () => {
    cy.get('[data-testid="addEmployeeTitle"]').should('exist');
    cy.get('[data-testid="addEmployeeBtn"]').should('exist');
  });
});
