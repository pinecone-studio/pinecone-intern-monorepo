describe('SignInModal', () => {
  beforeEach(() => {
    cy.visit('/sign-in');
  });

  it('Should render the sign-in page', () => {
    cy.get('[data-testid="sign-in-form-container"]').should('exist');
  });

  it('Should render the SignInModal component', () => {
    cy.contains('Нэвтрэх').should('be.visible');
    cy.contains('Таны имэйл эсвэл утасны дугаар').should('be.visible');
    cy.get('[data-testid="email-input"]').should('be.visible').and('have.attr', 'type', 'text');
    cy.contains('Нууц үг').should('be.visible');
    cy.get('[data-testid="password-input"]').should('be.visible').and('have.attr', 'type', 'password');
    cy.contains('Нууц үг сэргээх').should('be.visible');
    cy.contains('Дараах').should('be.visible');
  });

  it('Inputs accept text', () => {
    const email = 'test@example.com';
    const password = 'Password123!';
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="email-input"]').should('have.value', email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="password-input"]').should('have.value', password);
  });

  it('Navigates to home page on button click after successful form submission', () => {
    const email = 'test@example.com';
    const password = 'Password123!';
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('button').contains('Дараах').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
