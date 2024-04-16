describe('update button', () => {
  beforeEach(() => cy.visit('/employee-details'));
  it('should update button', () => {
    cy.get('[data-testid="update-button"]').should('exist');
  });
});
