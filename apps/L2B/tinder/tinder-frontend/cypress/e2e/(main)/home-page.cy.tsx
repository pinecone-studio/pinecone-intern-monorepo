describe('Main page', () => {
  it('renders all main components and triggers Page render logic', () => {
    cy.visit('/');

    cy.get('[data-testid="guest-header"]').should('be.visible');
    cy.get('[data-testid="main"]').should('be.visible');
    cy.get('[data-testid="footer"]').should('be.visible');

    cy.contains('Tinder').should('exist'); 
    cy.contains('Terms of Service').should('exist'); 
  });
});
