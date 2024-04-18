describe('profile page', () => {
  beforeEach(() => cy.visit('/payroll'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from HRMS dashboard Payroll Page');
  });
});
