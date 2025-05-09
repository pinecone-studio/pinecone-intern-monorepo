describe('sign in page', () => {
  it('should render sign in page', () => {
    cy.visit('/auth/sign-in');
    cy.get('[data-cy=Sign-In-Page]').should('have.text', 'page');
  });
});
