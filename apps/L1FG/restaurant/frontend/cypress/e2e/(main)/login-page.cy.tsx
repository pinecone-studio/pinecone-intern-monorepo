// cypress/e2e/login.spec.ts

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login'); // Change the URL if needed
  });

  it('should display error message when email or password is not provided', () => {
    cy.get('button').contains('Нэвтрэх').click();
    cy.get('.text-red-600').should('contain', 'Имэйл болон Нууц үг заавал оруулна уу.');
  });

  it('should allow user to input email and password', () => {
    const email = 'test@example.com';
    const password = 'password123';

    cy.get('input[placeholder="Имэйл хаяг"]').type(email);
    cy.get('input[placeholder="Нууц үг"]').type(password);

    cy.get('input[placeholder="Имэйл хаяг"]').should('have.value', email);
    cy.get('input[placeholder="Нууц үг"]').should('have.value', password);
  });

  it('should not show error message when both email and password are provided', () => {
    const email = 'test@example.com';
    const password = 'password123';

    cy.get('input[placeholder="Имэйл хаяг"]').type(email);
    cy.get('input[placeholder="Нууц үг"]').type(password);

    cy.get('button').contains('Нэвтрэх').click();

    cy.get('.text-red-600').should('not.exist'); // Error message should disappear
  });

  it('should handle the "Forgot password?" link correctly', () => {
    cy.get('h2').contains('Нууц үг мартсан?').should('be.visible');
  });

  it('should handle the "Sign up" button correctly', () => {
    cy.get('button').contains('Бүртгүүлэх').should('be.visible');
  });
});
