describe('Create Account Page', () => {
  beforeEach(() => {
    cy.visit('/create-account');
  });

  it('1. should render create account page ', () => {
    cy.get('[data-cy=Create-Account-Page]').should('be.visible');
  });
});
