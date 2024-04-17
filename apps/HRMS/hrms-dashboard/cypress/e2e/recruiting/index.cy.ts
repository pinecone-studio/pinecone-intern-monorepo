describe('Recruiting page', () => {
  beforeEach(() => cy.visit('/recruiting'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from HRMS dashboard Recruiting Page');
  });
});
