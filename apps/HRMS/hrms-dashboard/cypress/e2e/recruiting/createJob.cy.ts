describe('AddJobPage', () => {
  it('should render the AddJobPageComponent', () => {
    cy.visit('/recruiting/add-job');
    cy.get('[data-testid="add-job-comp"]').should('be.visible');
  });
});
