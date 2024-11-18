describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('/login');
    });
  
    it('should load the login page', () => {
      cy.get('[data-cy="Login-Page"]').should('exist');
      cy.get('[data-cy="Login-usernameOrEmail-Input"]').should('be.visible');
      cy.get('[data-cy="Login-Password-Input"]').should('be.visible');
      cy.get('[data-cy="Login-Submit-Button"]').should('be.visible');
      cy.get('[data-cy="forgot-password-button"]').should('exist');
      cy.get('[data-cy="sign-up-button"]').should('exist');
    });
  
  
    it('should navigate to forgot password page', () => {
      cy.get('[data-cy="forgot-password-button"]').click();
      cy.url().should('include', '/forgotpassword');
    });
  
    it('should navigate to sign-up page', () => {
      cy.get('[data-cy="sign-up-button"]').click();
      cy.url().should('include', '/signup');
    });
  });
  