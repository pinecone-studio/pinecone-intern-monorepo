describe('deleting an event', () => {
  beforeEach(() => {
    cy.visit('/admin/concerts');
  });

  it('should feature an event', () => {
    cy.intercept('POST', '**/api/graphql').as('featuring');
    cy.get('[data-testid="favorite-btn-2"]').click();
    cy.contains('Түр хүлээнэ үү!').should('be.visible');
    cy.wait('@featuring');
  });
});
