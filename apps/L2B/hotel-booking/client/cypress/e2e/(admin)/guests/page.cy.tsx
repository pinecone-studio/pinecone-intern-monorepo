describe('Guests Page', () => {
  it(`Should render guests page`, () => {
    cy.visit('/guests');

    cy.contains('Guests Page').should('be.visible');
  });
});
