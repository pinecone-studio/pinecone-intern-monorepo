describe('Create Page', () => {
    it('should fill form and submit (dummy test)', () => {
      cy.visit('/create');
      cy.get('input[type="email"]').type('test@example.com');
      cy.contains('Continue').click();
    });
  
    it('should render sign in page', () => {
      cy.visit('/create');
      cy.contains('Log in').click();
      cy.url().should('include', '/signin');
    });
  });