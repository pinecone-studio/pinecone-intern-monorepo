describe('Home Page', () => {
  it(`Should render home page`, () => {
    cy.visit('/');
    cy.get('[data-testid="home-Body"]').should('exist');
  });
});
