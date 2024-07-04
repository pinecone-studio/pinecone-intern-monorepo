describe('SignInModal', () => {
  beforeEach(() => {
    cy.visit('/sign-in');
  });

  it('1. Should render the sign-in page', () => {
    cy.get('[data-testid="sign-in-page"]').should('exist');
  });

  it('2. Should render the SignInModal component', () => {
    cy.contains('Report').should('be.visible');
    cy.contains('Таны имэйл эсвэл утасны дугаар').should('be.visible');
    cy.get('[data-testid="email-input"]').should('be.visible').and('have.attr', 'type', 'text');
    cy.contains('Нууц үг').should('be.visible');
    cy.get('[data-testid="password-input"]').should('be.visible').and('have.attr', 'type', 'password');
    cy.contains('Дараах').should('be.visible');
  });

  it('3. should display validation errors for empty fields', () => {
    cy.get('button[type="submit"]').contains('Дараах').click();
    cy.contains('Утас эсвэл имэйл хаяг оруулна уу').should('be.visible');
    cy.contains('Нууц үгээ оруулна уу').should('be.visible');
  });

  it('4. Inputs accept text', () => {
    const email = 'test@example.com';
    const password = 'Password123!';
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="email-input"]').should('have.value', email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="password-input"]').should('have.value', password);
  });

  it('5. Displays error messages for incalid inputs', () => {
    cy.get('[data-testid="email-input"]').type('invalid-email');
    cy.get('[data-testid="password-input"]').type('short');
    cy.get('button[type="submit"]').contains('Дараах').click();
    cy.contains('Утас эсвэл имэйл хаяг байх ёстой').should('be.visible');
    cy.contains('Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой').should('be.visible');
  });

  it('5. Navigates to home page on button click after successful form submission', () => {
    const email = 'test@example.com';
    const password = 'Password123!';
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('button[type="submit"]').contains('Дараах').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
