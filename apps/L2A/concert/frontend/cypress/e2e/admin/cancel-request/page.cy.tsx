describe('a', () => {
  it('should navigate through pages', () => {
    cy.visit('/admin/cancel-request');

    cy.get('[data-testid="cancel-request-next-button"]').click();
    cy.get('[data-testid="cancel-request-prev-button"]').click();
  });
});
