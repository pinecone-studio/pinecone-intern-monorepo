describe('signup', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('1.successfull signup', () => {
    cy.get('[data-cy="signup-email-input"]').should('be.visible');
    cy.get('[data-cy="signup-email-input"]').type('zaya@gmail.com');

    cy.get('[data-cy="signup-password-input"]').should('be.visible');
    cy.get('[data-cy="signup-password-input"]').type('111111');

    cy.get('[data-cy="signup-repeat-password-input"]').should('be.visible');
    cy.get('[data-cy="signup-repeat-password-input"]').type('111111');

    cy.get('[data-cy="signup-button"]').click();
  });

  it('2.form error message', () => {
    cy.get('[data-cy="signup-email-input"]').should('be.visible');
    cy.get('[data-cy="signup-email-input"]').type('zaya@gmail.co');

    cy.get('[data-cy="signup-password-input"]').should('be.visible');
    cy.get('[data-cy="signup-password-input"]').type('11111');

    cy.get('[data-cy="signup-repeat-password-input"]').should('be.visible');
    cy.get('[data-cy="signup-repeat-password-input"]').type('11111');
    cy.get('[data-cy="signup-button"]').should('be.visible');
    cy.get('[data-cy="signup-button"]').click();
    cy.get('[data-cy="signup-submit-button"]').click();
    cy.contains('Password must be at least 6 characters.').should('be.visible');
    cy.contains('Password must be at least 6 characters').should('be.visible');
  });

  it('3.passwords do not match', () => {
    cy.get('[data-cy="signup-email-input"]').should('be.visible');
    cy.get('[data-cy="signup-email-input"]').type('zaya@gmail.com');

    cy.get('[data-cy="signup-password-input"]').should('be.visible');
    cy.get('[data-cy="signup-password-input"]').type('111111');

    cy.get('[data-cy="signup-repeat-password-input"]').should('be.visible');
    cy.get('[data-cy="signup-repeat-password-input"]').type('222222');
    cy.get('[data-cy="signup-button"]').should('be.visible');
    cy.get('[data-cy="signup-button"]').click();
    cy.get('[data-cy="signup-submit-button"]').click();
    cy.contains('Passwords do not match.').should('be.visible');
  });
});
