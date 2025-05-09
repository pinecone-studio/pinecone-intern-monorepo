describe('Forgot Password Page', () => {
  beforeEach(() => {
    cy.visit('/admin/forgot-password');

    cy.window().then((win) => {
      cy.stub(win.console, 'error').as('consoleError');
    });
  });

  it('should disable submit button when email is empty', () => {
    cy.get('input[placeholder="Имэйл хаяг"]').should('exist');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should show error for invalid email format', () => {
    cy.get('input[placeholder="Имэйл хаяг"]').type('invalid-email').blur();
    cy.contains('Имэйл хаяг буруу байна').should('exist');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should allow form submission and redirect with valid email', () => {
    cy.get('input[placeholder="Имэйл хаяг"]').type('test@example.com');
    cy.get('button[type="submit"]').click();
    cy.location('pathname').should('eq', '/admin/change-password');
  });

  it('should handle error during submission gracefully', () => {
    cy.get('input[placeholder="Имэйл хаяг"]').type('test@example.com');
    cy.get('button[type="submit"]').click();
  });
});
