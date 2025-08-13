describe('Admin delete table', () => {
  it('should delete table successfully', () => {
    cy.visit('/table');

    cy.get('[data-cy="Admin-Delete-Table-Dialog-Trigger"]').first().click();

    cy.get('[data-cy="Admin-Delete-Table-Button"]').click();

    cy.contains('Ширээ амжилттай устгагдлаа').should('be.visible');
  });
});
