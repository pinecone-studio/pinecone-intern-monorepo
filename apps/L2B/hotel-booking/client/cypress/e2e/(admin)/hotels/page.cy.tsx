describe('Hotels Page', () => {
  it(`Should render hotels page`, () => {
    cy.visit('/hotels');

    cy.contains('Hotels Page').should('be.visible');
  });
});
