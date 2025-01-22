describe('order page', () => {
  it('should render order page', () => {
    cy.visit('/orderHistory');
    cy.get('[data-cy="order-page"]').should('be.visible');
  });
});
