describe('signin', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  it('successful signin', () => {
    cy.get('[data-cy="signin-email-input"]').should('be.visible');
    cy.get('[data-cy="signin-email-input"]').type('zaya@gmail.com');

    cy.get('[data-cy="signin-password-input"]').should('be.visible');
    cy.get('[data-cy="signin-password-input"]').type('111111');

    cy.get('[data-cy="signin-password-input"]').should('have.value', '111111');
    cy.get('[data-cy="signin-button"]').click();
  });

  it('wrong email address error message', () => {
    cy.get('[data-cy="signin-email-input"]').should('be.visible');
    cy.get('[data-cy="signin-email-input"]').type('zayamail.cc');

    cy.get('[data-cy="signin-password-input"]').should('be.visible');
    cy.get('[data-cy="signin-password-input"]').type('111111');

    cy.get('[data-cy="signin-button"]').click();
    cy.contains('Please enter a valid email address.').should('be.visible');
  });

  it('password error message', () => {
    cy.get('[data-cy="signin-email-input"]').should('be.visible');
    cy.get('[data-cy="signin-email-input"]').type('zaya@gmail.com');

    cy.get('[data-cy="signin-password-input"]').should('be.visible');
    cy.get('[data-cy="signin-password-input"]').type('11111');

    cy.get('[data-cy="signin-button"]').click();
    cy.contains('Password must be at least 6 characters.').should('be.visible');
  });

  it('toggles password visibility', () => {
    cy.get('[data-cy="signin-password-input"]').should('have.attr', 'type', 'password');
    cy.get('button:has(svg)').click();
    cy.get('[data-cy="signin-password-input"]').should('have.attr', 'type', 'text');
    cy.get('button:has(svg)').click();
    cy.get('[data-cy="signin-password-input"]').should('have.attr', 'type', 'password');
  });
});
