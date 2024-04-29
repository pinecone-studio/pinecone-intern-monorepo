describe('Header component', () => {
  before(() => {
    cy.visit('/components');
  });
  it('renders with corrent structure', () => {
    cy.get('[data-testid="header-artivle-detail"]').should('exist');
    cy.get('[data-testid="header-artivle-detail"]').should('have.css', 'height', '48px');
  });
  it('display the corrent text', () => {
    cy.get('[data-testid="text-data-search"]').should('have.text').type('search');
  });
});
