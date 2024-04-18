describe('assessment page', () => {
  beforeEach(() => cy.visit('/leaving'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from HRMS dashboard Leaving Page');
  });
});
