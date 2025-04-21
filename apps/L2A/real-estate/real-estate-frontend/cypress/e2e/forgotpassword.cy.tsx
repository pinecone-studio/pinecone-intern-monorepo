describe('Forget Password Page', () => {
    beforeEach(() => {

      cy.visit('/forgetpassword');
    });
  
    it('should display the logo, heading, and input', () => {
      cy.contains('Home Vault').should('exist');
      cy.contains('Forget password').should('exist');
      cy.get('input[type="email"]').should('exist');
      cy.contains('Continue').should('exist');
    });
  
    it('should allow typing an email', () => {
      cy.get('input[type="email"]')
        .type('test@example.com')
        .should('have.value', 'test@example.com');
    });
  
    it('should submit the form when Continue is clicked', () => {


      cy.get('input[type="email"]').type('test@example.com');
      cy.contains('Continue').click();
    });
  
    it('should not submit if email is empty', () => {
      cy.contains('Continue').click();

    });
  });
  