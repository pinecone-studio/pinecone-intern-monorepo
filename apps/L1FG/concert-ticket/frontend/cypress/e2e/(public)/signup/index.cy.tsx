describe('signup', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('should display validation errors on empty form submission', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Please enter a valid email address.').should('be.visible');
    cy.contains('Password must be at least 6 characters.').should('be.visible');
  });

  it('should allow toggling password visibility', () => {
    cy.get('input[placeholder="Нууц үг"]').should('have.attr', 'type', 'password');
    cy.get('input[placeholder="Нууц үг дахин оруулна уу"]').should('have.attr', 'type', 'password');

    cy.get('input[placeholder="Нууц үг"]').parent().find('button').click();
    cy.get('input[placeholder="Нууц үг"]').should('have.attr', 'type', 'text');

    cy.get('input[placeholder="Нууц үг дахин оруулна уу"]').parent().find('button').click();
    cy.get('input[placeholder="Нууц үг дахин оруулна уу"]').should('have.attr', 'type', 'text');
  });

  it('should show password mismatch error', () => {
    cy.get('input[placeholder="name@example.com"]').type('test@example.com');
    cy.get('input[placeholder="Нууц үг"]').type('password123');
    cy.get('input[placeholder="Нууц үг дахин оруулна уу"]').type('wrongpassword');

    cy.get('button[type="submit"]').click();
    cy.contains('Passwords do not match.').should('be.visible');
  });

  it('should submit the form successfully', () => {
    cy.get('input[placeholder="name@example.com"]').type('test@example.com');
    cy.get('input[placeholder="Нууц үг"]').type('password123');
    cy.get('input[placeholder="Нууц үг дахин оруулна уу"]').type('password123');

    cy.get('button[type="submit"]').click();

    cy.wait(500);
    cy.url().should('not.include', '/signup');
  });
});
