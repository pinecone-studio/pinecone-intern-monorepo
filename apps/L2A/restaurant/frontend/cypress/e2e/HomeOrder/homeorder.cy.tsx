describe('HomeOrder and CartItem E2E Test', () => {
    beforeEach(() => {
      cy.visit('/'); 
    });
  
    it('opens the order drawer and displays cart item details', () => {
      cy.get('[data-cy="Foods"]').first().click();
  
      cy.contains('Таны захиалга').should('be.visible');
      cy.contains('Taco Taco').should('be.visible');
      cy.contains('15.6k').should('be.visible');
      cy.get('img[alt="Taco Taco"]').should('be.visible');
    });
  
    it('increments and decrements quantity', () => {
      cy.get('[data-cy="Foods"]').first().click();
  
      cy.contains('Таны захиалга').should('be.visible');
      cy.contains('1').should('exist');
      cy.get('button').contains('+').click();
      cy.contains('2').should('exist');
      cy.get('button').contains('–').click();
      cy.contains('1').should('exist');
      cy.get('button').contains('–').click();
      cy.contains('1').should('exist');
    });
  
    it('deletes the item when 🗑️ is clicked', () => {
      cy.get('[data-cy="Foods"]').first().click();
      cy.get('button').contains('🗑️').click();
      cy.contains('Taco Taco').should('not.exist');
    });
  });
  