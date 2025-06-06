describe('Main page', () => {
  it('renders full layout and confirms Page component execution', () => {
    cy.visit('/');

    cy.get('[data-testid="main-page"]').should('exist');
    cy.get('[data-testid="guest-header"]').should('be.visible');
    cy.get('[data-testid="main"]').should('be.visible');
    cy.get('[data-testid="footer"]').should('be.visible');

    cy.contains('Tinder').should('exist'); 
    cy.contains('Terms of Service').should('exist'); 
  });
});
