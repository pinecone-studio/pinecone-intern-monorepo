
describe('Main page', () => {
  it('renders all main components', () => {
    cy.visit('/'); 
cy.get('[data-testid="guest-header"]').should('be.visible');
cy.get('[data-testid="main"]').should('be.visible');
    cy.get('[data-testid="footer"]').should('be.visible');

  });
});

