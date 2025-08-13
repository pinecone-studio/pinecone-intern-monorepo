describe('Admin delete table', () => {
  it('should delete table successfully', () => {
    cy.visit('/table');

    cy.get('[data-cy="Admin-Delete-Table-Dialog-Trigger"]').first().click();

    cy.get('[data-cy="Admin-Delete-Table-Button"]').click();

    cy.contains('Ширээ амжилттай устгагдлаа').should('be.visible');
  });

  it('should show error toast when deletion fails', () => {
    cy.visit('/table');

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

    cy.get('[data-cy="Admin-Delete-Table-Dialog-Trigger"]').first().click();

    cy.get('[data-cy="Admin-Delete-Table-Button"]').click();

    cy.contains('Амжилтгүй').should('be.visible');
  });
});
