describe('sign-in-page', () => {
  beforeEach(() => cy.visit('/sign-in'));
  it('Should render home page', () => {
    cy.get('[data-cy="sign-in-page"]').should('exist');
  });
});
