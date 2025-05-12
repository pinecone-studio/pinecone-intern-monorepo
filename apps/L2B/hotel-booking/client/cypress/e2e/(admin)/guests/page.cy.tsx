describe('Guests Page', () => {
  it(`Should render sidebar`, () => {
    cy.visit('/guests');

    cy.get('[data-cy=AdminSideBar]').should('exist').and('be.visible');
  });

  it(`Should render guests page`, () => {
    cy.visit('/guests');

    cy.get('[data-cy=Guests-Page]').should('have.text', 'Guests Page');
  });
});
