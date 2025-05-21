describe('RenderFood and HomeOrder flow', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('renders food items and opens HomeOrder drawer', () => {
      cy.get('[data-cy="Foods"]').should('exist').first().as('foodButton');

      cy.get('@foodButton').click();
      cy.contains('Таны захиалга').should('be.visible');
      cy.get('[data-testid="cart-item"]', { timeout: 5000 }).should('exist');
      cy.get('[data-testid="order-button"]').should('be.visible');
      cy.get('[data-testid="order-button"]').click();
    });
  
  

  });
  