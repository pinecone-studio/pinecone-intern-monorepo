describe('User Home Page', () => {
  it('1. Should render the Usur Home Page', () => {
    cy.visit('/?bedcount=1');
    cy.get('[data-cy=User-Home-Page]').should('be.visible');
  });
});
