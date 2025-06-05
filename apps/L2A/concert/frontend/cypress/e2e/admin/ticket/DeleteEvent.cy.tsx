describe('deleting an event', () => {
  beforeEach(() => {
    cy.visit('/admin/concerts');
  });

  it('should delete an event', () => {
    cy.intercept('POST', '**/api/graphql').as('deleting');
    cy.get('[data-testid="delete-btn-2"]').click();
    cy.contains('Түр хүлээнэ үү...').should('be.visible');
    cy.wait('@deleting');
  });
});
