describe('dashboardPage Component', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });
  it('should navigate to home page when "Төсөл" button is clicked', () => {
    cy.get('[data-testid="assessment-btn"]').should('exist').contains('Төсөл').should('be.visible');
    cy.get('[data-testid="assessment-btn"]').click();
    cy.url().should('include', '/create-assessment');
  });
});
