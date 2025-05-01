describe('Order History Page', () => {
    beforeEach(() => {
      cy.visit('/order-history');
    });
  
    it('should display the order history title', () => {
      cy.contains('Захиалгын түүх').should('be.visible');
    });
  
    it('should render all order cards', () => {
      cy.get('[data-testid="order-card"]').should('have.length', 2);
      cy.contains('#33998').should('exist');
      cy.contains('#33999').should('exist');
      cy.contains('Дууссан').should('exist');
      cy.contains('Бэлтгэгдэж буй').should('exist');
    });
  });
  