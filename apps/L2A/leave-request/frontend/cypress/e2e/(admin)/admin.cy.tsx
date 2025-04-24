describe('Admin page tests', () => {
    beforeEach(() => {
      cy.visit('/admin');
    });
  
    it('should open and close the modal when the register button and close button are clicked', () => {
        cy.get('[data-cy="open-register-modal"]').click();
      
        cy.get('[data-cy="register-employee-modal"]').should('be.visible');
    
        cy.get('[data-cy="close-register-modal"]').click();
      
        cy.get('[data-cy="register-employee-modal"]').should('not.exist');
      });
  });
  