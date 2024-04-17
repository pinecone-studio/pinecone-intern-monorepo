describe('Employee Details page', () => {
  beforeEach(() => cy.visit('/employee-details'));

  it('Should display welcome message', () => {
    cy.get('[data-cy="Employee-Details-Page"]').should('exist').should('be.visible');
  });
});
