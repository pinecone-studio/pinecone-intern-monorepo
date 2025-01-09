describe('login Page', () => {
  it('1. should render the Login Page', () => {
    cy.visit('/login');
    cy.get('[data-cy=login-page]').should('be.visible');
    cy.get('[data-cy=login-submit]').should('be.visible');
    cy.get('[data-cy=login-submit]').click();
    cy.get('[data-cy=login-otp-stage]').should('be.visible');
  });
});
