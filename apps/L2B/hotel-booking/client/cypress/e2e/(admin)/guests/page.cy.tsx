describe('Guests Page', () => {
  it(`Should render guests page`, () => {
    cy.visit('/guests');

    cy.get('[data-cy=Guests-Page]').should('have.text', 'Guests Page');
  });
});
