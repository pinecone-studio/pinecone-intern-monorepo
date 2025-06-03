describe('deleting an event', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/graphql').as('featuring');
    cy.visit('/admin/concerts');
  });

  it('should feature an event', () => {
    cy.get('[data-testid="favorite-btn-2"]').click();
    cy.contains('Түр хүлээнэ үү!').should('be.visible');
    cy.wait('@featuring');
  });

  it('should navigate through pages', () => {
    cy.wait('@featuring');
    cy.get('[data-testid="next-pagination"]').click();
    cy.get('[data-testid="next-pagination"]').click();
    cy.get('[data-testid="next-pagination"]').click();
    cy.get('[data-testid="prev-pagination"]').click();
    cy.get('[data-testid="prev-pagination"]').click();
    cy.get('[data-testid="prev-pagination"]').click();
    cy.get('[data-testid="pagination-1"]').click({ force: true });
  });
});
