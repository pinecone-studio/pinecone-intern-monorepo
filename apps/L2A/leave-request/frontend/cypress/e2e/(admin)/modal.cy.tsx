describe('Register New Employee Modal', () => {
    beforeEach(() => {
      cy.visit('/admin'); 
    });
  
    it('should display the Register New Employee button', () => {
      cy.contains('+ Шинэ ажилтан бүртгэх').should('be.visible');
    });
  
    it('should open the modal when the button is clicked', () => {
      cy.contains('+ Шинэ ажилтан бүртгэх').click();
      cy.get('.fixed.inset-0.bg-black').should('exist');
    });
  
    it('should close the modal when the close button is clicked', () => {
      cy.contains('+ Шинэ ажилтан бүртгэх').click();
      cy.get('.fixed.inset-0.bg-black').should('exist');
      cy.get('button').contains('×').click();
      cy.get('.fixed.inset-0.bg-black').should('not.exist');
    });
  });
  