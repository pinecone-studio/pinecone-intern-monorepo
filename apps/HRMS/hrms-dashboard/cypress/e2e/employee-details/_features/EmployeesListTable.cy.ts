describe('All employee table', () => {
  beforeEach(() => cy.visit('/employee-details'));

  it('1.Table header should be visible', () => {
    cy.get('[data-cy="employeesList"]').should('exist').should('be.visible');
    cy.get('[data-cy="tableHeader-0"]').should('be.visible').should('have.text', 'Ажилтан');
    cy.get('[data-cy="tableHeader-1"]').should('be.visible').should('have.text', 'Мэргэжил');
    cy.get('[data-cy="tableHeader-2"]').should('be.visible').should('have.text', 'И-мэйл');
    cy.get('[data-cy="tableBody"]').should('exist');
  });

  it('2.displays employee data correctly after data is fetched', () => {
    cy.get('[data-testid="employee-search"]').type('ba');
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetEmployeesByPaginate') {
        req.reply((res) => {
          res.send({
            data: {
              getEmployeesByPaginate: {
                employees: [{ id: 1, firstName: 'John Doe', jobTitle: 'Software Engineer', email: 'john@example.com' }],
              },
            },
          });
        });
      }
    }).as('getEmployees');

    cy.wait('@getEmployees');
    cy.contains('John Doe').should('exist');
    cy.contains('Software Engineer').should('exist');
    cy.contains('john@example.com').should('exist');
  });
});
