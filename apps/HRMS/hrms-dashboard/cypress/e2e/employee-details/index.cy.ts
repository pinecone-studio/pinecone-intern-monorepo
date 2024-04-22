describe('Employee Details page', () => {
  beforeEach(() => cy.visit('/employee-details'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from HRMS dashboard Employee details Page1');
  });
});
