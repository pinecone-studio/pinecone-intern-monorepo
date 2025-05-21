describe('Hotels Page', () => {
  it(`Should render sidebar`, () => {
    cy.visit('/hotels');

    cy.get('[data-cy=AdminSideBar]').should('exist').and('be.visible');
  });

  it(`Should render hotels page`, () => {
    cy.visit('/hotels');

    cy.get('[data-cy=Hotels-Page]').should('exist');
  });
});
