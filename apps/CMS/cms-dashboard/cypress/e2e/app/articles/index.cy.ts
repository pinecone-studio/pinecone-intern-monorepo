describe('articles page', () => {
  beforeEach(() => cy.visit('/articles'));

  it('Should display login form', () => {
    cy.get('[data-testid="sign-up-form-container"]').should('exist').should('be.visible');
  });
});
