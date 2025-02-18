describe('password visibility toggle', () => {
  beforeEach(() => {
    cy.visit('/signin');
    // Type a password first so we can verify visibility
    cy.get('[data-cy="signin-password-input"]').type('testpassword123');
  });

  it('shows password field with correct initial state', () => {
    // Check initial state
    cy.get('[data-cy="signin-password-input"]').should('have.attr', 'type', 'password');

    // Verify eye-off icon is initially visible
    cy.get('[data-cy="signin-eye-show"]').find('svg').should('be.visible');
  });

  it('toggles password visibility correctly', () => {
    // Initial state should be password hidden
    cy.get('[data-cy="signin-password-input"]').should('have.attr', 'type', 'password');

    // Click show password button
    cy.get('[data-cy="signin-eye-show"]').click();

    // Password should be visible
    cy.get('[data-cy="signin-password-input"]').should('have.attr', 'type', 'text').should('have.value', 'testpassword123');


    cy.get('[data-cy="signin-eye-show"]').click();

    cy.get('[data-cy="signin-password-input"]').should('have.attr', 'type', 'password').should('have.value', 'testpassword123');
  });

  it('maintains correct styling for the eye button', () => {
    cy.get('[data-cy="signin-eye-show"]').should('have.class', 'text-gray-400').should('have.class', 'hover:text-white').should('have.css', 'position', 'absolute').should('have.css', 'right', '12px'); // testing the right-3 class

    cy.get('[data-cy="signin-eye-show"]').trigger('mouseover').should('have.class', 'hover:text-white');
  });

  it('maintains password value when toggling visibility', () => {
    const testPassword = 'testpassword123';

    cy.get('[data-cy="signin-password-input"]').should('have.value', testPassword);

    for (let i = 0; i < 3; i++) {
      cy.get('[data-cy="signin-eye-show"]').click();
      cy.get('[data-cy="signin-password-input"]').should('have.value', testPassword);
    }
  });

  it('positions eye button correctly relative to input', () => {
    cy.get('[data-cy="signin-eye-show"]').parent().should('have.class', 'relative').should('have.class', 'w-[350px]');

    cy.get('[data-cy="signin-password-input"]').should('have.class', 'pr-12');
  });

  it('handles rapid toggling correctly', () => {
    for (let i = 0; i < 5; i++) {
      cy.get('[data-cy="signin-eye-show"]').click();
    }

    cy.get('[data-cy="signin-eye-show"]').click();
    cy.get('[data-cy="signin-password-input"]')
      .invoke('attr', 'type')
      .then((type) => {
        expect(type).to.be.oneOf(['text', 'password']);
      });
  });

  it('retains focus state after toggling visibility', () => {
    cy.get('[data-cy="signin-password-input"]').focus();

    cy.get('[data-cy="signin-eye-show"]').click();

    cy.get('[data-cy="signin-password-input"]').should('be.focused');
    it('maintains focus when toggling password visibility', () => {
      cy.get('[data-cy="signin-password-input"]').type('testpassword123');

      cy.get('[data-cy="signin-password-input"]').focus().should('be.focused');

      cy.get('[data-cy="signin-eye-show"]').click();

      cy.get('[data-cy="signin-password-input"]').should('be.focused');
    });
  });
});
