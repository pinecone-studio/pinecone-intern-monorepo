describe('login Page', () => {
  it('1. should render the Login Page', () => {
    cy.visit('/login');
    cy.get('[data-cy=login-page]').should('be.visible');
    cy.get('[data-cy=login-submit]').should('be.visible');
    cy.get('[data-cy=email-input]').type('jvk@gmail.com');
    cy.get('[data-cy=login-submit]').click();
    cy.get('[data-cy=login-otp-stage]').should('be.visible');
    cy.get('[data-cy=enter-input]').type('1111');
  });
  it('1. should render the Login Page error message', () => {
    cy.visit('/login');
    cy.get('[data-cy=login-page]').should('be.visible');
    cy.get('[data-cy=login-submit]').should('be.visible');
    cy.get('[data-cy=login-submit]').click();
    cy.get('[data-cy="error-message"]').should('be.visible');
  });
  it('1. should render the Login Page', () => {
    cy.visit('/login');
    cy.get('[data-cy=login-page]').should('be.visible');
    cy.get('[data-cy=login-submit]').should('be.visible');
    cy.get('[data-cy=email-input]').type('jvk11@gmail.com');
    cy.get('[data-cy=login-submit]').click();
    cy.get('[data-cy="error-message"]').should('be.visible');
  });
});
