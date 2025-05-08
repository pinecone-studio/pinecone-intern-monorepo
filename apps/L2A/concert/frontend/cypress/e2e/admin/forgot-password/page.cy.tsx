describe('Forgot Password Page', () => {
  beforeEach(() => {
    cy.visit('/admin/forgot-password');
  });

  it('should disable submit button when email is empty', () => {
    cy.get('form').should('exist');
    cy.get('input[placeholder="Имэйл хаяг"]').should('exist');

    cy.get('form').within(() => {
      cy.get('button[type="submit"]').should('be.disabled');
    });
  });

  it('should show error for invalid email format', () => {
    cy.get('input[placeholder="Имэйл хаяг"]').type('invalid-email').blur();

    cy.contains('Имэйл хаяг буруу байна').should('exist');

    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should allow form submission and redirect with valid email', () => {
    const testEmail = 'test@example.com';

    cy.get('input[placeholder="Имэйл хаяг"]').type(testEmail);

    cy.get('button[type="submit"]').should('not.be.disabled').click();

    cy.location('pathname').should('eq', '/admin/change-password');
  });

  it('should handle error during submission gracefully', () => {
    cy.window().then((win) => {
      cy.stub(win.console, 'error').as('consoleError');
    });

    cy.get('input[placeholder="Имэйл хаяг"]').type('test@example.com');
    cy.get('button[type="submit"]').click();
    cy.get('@consoleError').should('have.been.called');
  });
});
