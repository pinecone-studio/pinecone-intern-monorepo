describe('SignUp Page Flow', () => {
    let uniqueEmail: string;
  
    beforeEach(() => {
      uniqueEmail = `user_${Date.now()}@example.com`;
      cy.visit('/signup');
    });
  
    it('should render all initial elements', () => {
      cy.get('[data-cy=signup-page]').should('exist');
      cy.get('[data-cy=signup-container]').should('exist');
      cy.get('[data-cy=logo]').should('contain.text', '🏠');
      cy.get('[data-cy=title]').should('contain.text', 'Home Vault');
      cy.get('[data-cy=subtitle]').should('contain.text', 'Enter your email');
      cy.get('[data-cy=signup-or-section]').should('contain.text', 'OR');
      cy.get('[data-cy=signup-link]').should('have.attr', 'href', '/signup');
      cy.get('[data-cy=tos-link]').should('exist');
      cy.get('[data-cy=privacy-link]').should('exist');
      cy.get('[data-cy=copyright]').should('contain.text', '©2024');
    });
  
    it('should show error if email is empty and form submitted', () => {
      cy.get('[data-cy=email-input]').clear();
      cy.get('form').submit();
      cy.get('[data-testid=error-message]').should('contain.text', 'Email is required');
    });
  
    it('should go to step 3 after submitting a valid email', () => {
      cy.intercept('POST', '/api/graphql').as('graphql');
      cy.get('[data-cy=email-input]').type(uniqueEmail);
      cy.get('form').submit();
      cy.wait('@graphql');
      cy.get('[data-cy=password-input]').should('exist');
      cy.get('[data-cy=confirm-password-input]').should('exist');
    });
  
    it('should show error if passwords do not match', () => {
      cy.intercept('POST', '/api/graphql').as('graphql');
  
      // Step 1: Submit email to reach Step 3
      cy.get('[data-cy=email-input]').type(uniqueEmail);
      cy.get('form').submit();
      cy.wait('@graphql');
  
      // Step 3: Enter mismatching passwords
      cy.get('[data-cy=password-input]').type('12345678');
      cy.get('[data-cy=confirm-password-input]').type('wrongpassword');
      cy.get('form').submit();
  
      cy.contains('passwords do not match').should('exist');
    });
  });
  