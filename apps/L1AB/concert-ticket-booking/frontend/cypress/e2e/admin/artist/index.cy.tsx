describe('artist Page', () => {
  beforeEach(() => {
    cy.visit('/admin/artist');
  });

  it('Should render the Container component', () => {
    cy.get('[data-cy="Container"]').should('be.visible');
  });
});
