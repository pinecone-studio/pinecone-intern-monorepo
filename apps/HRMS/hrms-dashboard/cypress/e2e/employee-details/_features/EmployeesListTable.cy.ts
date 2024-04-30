describe('All employee table', () => {
  beforeEach(() => cy.visit('/employee-details?employees=1'));

  it('Table header should be visible', () => {
    cy.get('[data-cy="employeesList"]').should('exist').should('be.visible');
    cy.get('[data-cy="tableHeader-0"]').should('be.visible').should('have.text', 'Ажилтан');
    cy.get('[data-cy="tableHeader-1"]').should('be.visible').should('have.text', 'Мэргэжил');
    cy.get('[data-cy="tableHeader-2"]').should('be.visible').should('have.text', 'И-мэйл');
    cy.get('.MuiTableBody-root').should('exist');
  });
});
