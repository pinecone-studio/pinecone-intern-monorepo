describe('profile page', () => {
  beforeEach(() => cy.visit('/payroll'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from HRMS dashboard Payroll Page');
  });

  it('Should navigate to employee details page when button is clicked', () => {
    cy.get('button[data-testid="button"]').click();
    cy.url().should('include', '/employee-details');
  });
});
