describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  it('1. Should render login page', () => {
    cy.get('[data-cy=Sing-in-page]').should('be.visible');
  });
  it('2. Should display the main header', () => {
    cy.get('[data-cy=Login-Main-header]').should('be.visible');
  });
  it('3. Should display the header text', () => {
    cy.get('[data-cy=Login-Header-text]').should('be.visible');
    cy.get('[data-cy=Login-Header-text]').should('have.text', 'Sign in');
  });
  it('4. Should display the subheader text', () => {
    cy.get('[data-cy=Login-Subheader-text]').should('be.visible');
    cy.get('[data-cy=Login-Subheader-text]').should('have.text', 'Enter your email below to sign in');
  });
  it('5. Should display the login form', () => {
    cy.get('[data-cy=Login-Form]').should('be.visible');
  });
  it('6. When user does not enter email, it should display error message', () => {
    cy.get('[data-cy=Sign-In-Submit-Button]').click();
    cy.get('[data-cy=Form-Email-Input-Error-Message]').should('be.visible');
    cy.get('[data-cy=Form-Email-Input-Error-Message]').should('have.text', 'Please enter a valid email');
  });
  it('7. When user enters invalid email, it should display error message', () => {
    cy.get('[data-cy=Login-Email-Input]').type('12');
    cy.get('[data-cy=Sign-In-Submit-Button]').click();
    cy.get('[data-cy=Form-Email-Input-Error-Message]').should('be.visible');
    cy.get('[data-cy=Form-Email-Input-Error-Message]').should('have.text', 'Please enter a valid email');
  });
  it('8. When user does not enter password, it should display error message', () => {
    cy.get('[data-cy=Sign-In-Submit-Button]').click();
    cy.get('[data-cy=Form-Password-Input-Error-Message]').should('be.visible');
    cy.get('[data-cy=Form-Password-Input-Error-Message]').should('have.text', 'Password must be at least 8 characters');
  });
  it('9. When user enters less than 8 characters on password input, it should display error message', () => {
    cy.get('[data-cy=Login-password-Input]').type('123');
    cy.get('[data-cy=Sign-In-Submit-Button]').click();
    cy.get('[data-cy=Form-Password-Input-Error-Message]').should('be.visible');
    cy.get('[data-cy=Form-Password-Input-Error-Message]').should('have.text', 'Password must be at least 8 characters');
  });
  it('10 Should render or text', () => {
    cy.get('[data-cy=Login-or-signup]').should('be.visible');
    cy.get('[data-cy=Login-or-signup]').should('have.text', 'OR');
  });
  it('11. Should display the create an account button', () => {
    cy.get('[data-cy=Create-an-account-Button]').should('be.visible');
    cy.get('[data-cy=Create-an-account-Button]').should('have.text', 'Create an account');
  });
  it('12. Should display the terms of service and privacy policy text', () => {
    cy.get('[data-cy=Login-long-text]').should('be.visible');
  });
  it('13. Should navigate to sign-up page when create an account button is clicked', () => {
    cy.get('[data-cy=Login-Email-Input]').type('test@gmail.com');
    cy.get('[data-cy=Login-password-Input]').type('12345678');
    cy.get('[data-cy=Sign-In-Submit-Button]').click();
    cy.url().should('include', 'signup');
  });
});