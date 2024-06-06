describe('Create Assessment Page', () => {
  beforeEach(() => {
    cy.visit('/create-assessment');
  });

  it('should display the create assessment container', () => {
    cy.get('[data-testid="create-assessment-container"]').should('be.visible');
  });

  it('should navigate back to the dashboard when the back button is clicked', () => {
    cy.get('[data-testid="test-back-page"]').should('be.visible').click();

    cy.url().should('include', '/dashboard');
  });
});
