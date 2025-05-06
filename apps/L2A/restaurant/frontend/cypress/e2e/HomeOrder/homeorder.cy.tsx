describe('HomeOrder and CartItem', () => {
    beforeEach(() => {
      cy.visit('/'); 
    });
  
    it('should opens the order drawer', () => {
      cy.get('[data-cy="Foods"]').first().click();
      cy.contains('Таны захиалга').should('be.visible');
      cy.contains('Taco Taco').should('be.visible');
      cy.contains('15.6k').should('be.visible');
      cy.get('img[alt="Taco Taco"]').should('be.visible');
    });
  
    it('should show increments and decrements', () => {
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
  