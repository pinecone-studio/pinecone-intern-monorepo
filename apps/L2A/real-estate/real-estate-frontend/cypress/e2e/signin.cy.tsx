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
      // Тухайн UI дээр validation мессеж байгаа тохиолдолд:
      // cy.contains('Email is required').should('exist');
      // cy.contains('Password is required').should('exist');
    });
  
    it('should fill form and submit (dummy test)', () => {
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('password123');
      cy.contains('Continue').click();
  
      // Тест болгож redirect эсвэл notification хүлээж болно
      // cy.url().should('include', '/dashboard');
    });
  });
  