describe('home page', () => {
  beforeEach(() => cy.visit('/'));
  it('Should render home page', () => {
    cy.get('[data-cy="Home-Page"]').should('exist');
  });
});
