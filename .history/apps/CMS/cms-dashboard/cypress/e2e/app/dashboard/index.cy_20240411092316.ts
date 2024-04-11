describe('dashboard page', () => {
  beforeEach(() => cy.visit('/dashboard'));

  it('Should display welcome message', () => {
<<<<<<< HEAD
    cy.get('h1').contains('hi footer page');
=======
    cy.get('h1').contains('hi footer pages');
>>>>>>> 6d333bb39af8ceaff0418463132861712fc53f56
  });
});
