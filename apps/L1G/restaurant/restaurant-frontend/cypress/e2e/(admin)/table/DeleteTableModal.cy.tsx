describe('Admin delete table', () => {
  beforeEach(() => {
    cy.visit('/table');
  });
  it('should delete table successfully', () => {
    cy.get('[data-testid="Admin-Create-Table-Dialog-Trigger"]').click();
    cy.get('[data-testid="Admin-Create-Table-Input"]').type('TEST_TEST');
    cy.get('[data-testid="Admin-Create-Table-Button"]').click().wait(3000);
    cy.get('[data-cy="Admin-Delete-Table-Dialog-Trigger"]').last().click();
    cy.get('[data-cy="Admin-Delete-Table-Button"]').click();
    cy.contains('Ширээ амжилттай устгагдлаа').should('be.visible');
  });

  it('should show error toast when deletion fails', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.operationName === 'DeleteTable') {
        req.reply({
          statusCode: 200,
          body: {
            errors: [{ message: 'Table not found' }],
            data: null,
          },
        });
      }
    }).as('deleteTableFail');
    cy.get('[data-testid="Admin-Create-Table-Dialog-Trigger"]').click();
    cy.get('[data-testid="Admin-Create-Table-Input"]').type('TEST_TEST');
    cy.get('[data-testid="Admin-Create-Table-Button"]').click().wait(3000);
    cy.get('[data-cy="Admin-Delete-Table-Dialog-Trigger"]').last().click();
    cy.get('[data-cy="Admin-Delete-Table-Button"]').click();
    cy.contains('Амжилтгүй').should('be.visible');
  });
  it('should delete test table', () => {
    cy.get('[data-cy="Admin-Delete-Table-Dialog-Trigger"]').last().click();
    cy.get('[data-cy="Admin-Delete-Table-Button"]').click();
  });
});
