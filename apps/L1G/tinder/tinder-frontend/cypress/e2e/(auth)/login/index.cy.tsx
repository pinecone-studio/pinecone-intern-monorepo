describe('Login Page', () => {
  //   beforeEach(() => {
  //     cy.visit('/login');
  //   });
  it('1. Should render login page', () => {
    cy.visit('/login');
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
    cy.get('[data-cy=Login-Form]').within(() => {
      cy.get('[data-cy=Sign-Up-Submit-Button]').click();
      cy.get('[data-cy=Form-Email-Input-Error-Message]').should('be.visible');
      cy.get('[data-cy=Form-Email-Input-Error-Message]').should('have.text', 'Please enter a valid email');
    });
  });
  it('7. When user enters invalid email, it should display error message', () => {
    cy.get('[data-cy=Login-Form]').within(() => {
      cy.get('[data-cy=Sign-Up-Submit-Button]').click();
      cy.get('[data-cy=Form-Email-Input-Error-Message]').should('be.visible');
      cy.get('[data-cy=Form-Email-Input-Error-Message]').should('have.text', 'Please enter a valid email');
    });
  });
  it('8. When user does not enter password, it should display error message', () => {
    cy.get('[data-cy=Login-Form]').within(() => {
      cy.get('[data-cy=Sign-Up-Submit-Button]').click();
      cy.get('[data-cy=Form-Password-Input-Error-Message]').should('be.visible');
      cy.get('[data-cy=Form-Password-Input-Error-Message]').should('have.text', 'Password must be at least 8 characters');
    });
  });
  it('9. When user enters less than 8 characters on password input, it should display error message', () => {
    cy.get('[data-cy=Login-Form]').within(() => {
      cy.get('[data-cy=Sign-Up-Submit-Button]').click();
      cy.get('input[name="password"]').type('123');
      cy.get('[data-cy=Form-Password-Input-Error-Message]').should('be.visible');
      cy.get('[data-cy=Form-Password-Input-Error-Message]').should('have.text', 'Password must be at least 8 characters');
    });
  });
  //or, create a new account btn, By clicking continue
});
