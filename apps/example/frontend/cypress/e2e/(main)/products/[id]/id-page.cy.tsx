describe('Product Page', () => {
  it('Should render product page with correct product ID', () => {
    cy.visit('/products/670f2befa8667cdceb765210');

    cy.get('[data-testid="product-details"]').should('exist');

    cy.get('[data-testid="related-products"]').should('exist');
  });
});
