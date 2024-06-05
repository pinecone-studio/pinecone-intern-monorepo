describe('profile page', () => {
  beforeEach(() => cy.visit('/payroll'));

  it('Should display welcome message', () => {
    cy.get('button').contains('/http://localhost:4200/employee-details').click();
  });
});
