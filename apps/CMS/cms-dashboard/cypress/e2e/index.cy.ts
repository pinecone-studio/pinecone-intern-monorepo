describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should render home page text', () => {
    cy.contains('homePage').should('exist');
  });
});
