describe('Sign In Page', () => {
    beforeEach(() => {
      cy.visit('/signin');
    });
  
    it('should render sign in form', () => {
      cy.contains('Home Vault');
      cy.get('input[type="email"]').should('exist');
      cy.get('input[type="password"]').should('exist');
      cy.contains('Continue').should('exist');
    });
  
    it('should not submit empty form', () => {
      cy.contains('Continue').click();
     });
  
    it('should fill form and submit (dummy test)', () => {
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('password123');
      cy.contains('Continue').click();
     });
  });
  