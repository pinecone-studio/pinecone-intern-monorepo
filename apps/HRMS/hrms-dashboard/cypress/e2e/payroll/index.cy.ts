describe('payroll page on hrms', () => {
  // beforeEach(() => cy.visit('/payroll'));
  it('Should display button click', () => {
    // cy.get('button').contains('/employee-details').click();
    cy.visit('/payroll'),
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'User-Agent': 'axios/0.18.0',
        },
      };
  });
});
