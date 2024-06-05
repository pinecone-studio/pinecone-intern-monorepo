describe('dashboardPage', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('Clicking the button should trigger handleCreateAssessment function', () => {
    cy.get('[data-testid="assessment-btn"]').should('exist').click();
    cy.url().should('include', '/create-assessment');
  });
});
