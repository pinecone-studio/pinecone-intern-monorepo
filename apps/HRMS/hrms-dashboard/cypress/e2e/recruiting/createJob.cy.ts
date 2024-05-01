describe('Add Job Page', () => {
  beforeEach(() => cy.visit('/recruiting/add-job'));

  it('Should display welcome message', () => {
    cy.get('h1').contains('hello from Recruiting Add Job Page');
  });
});
