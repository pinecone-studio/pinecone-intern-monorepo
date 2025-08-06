describe('aboutus page', () => {
  it('should render the AboutUsComponent', () => {
    cy.visit('/about-us');
    cy.get('[data-cy="About-Us"]').should('exist');
  });
});
