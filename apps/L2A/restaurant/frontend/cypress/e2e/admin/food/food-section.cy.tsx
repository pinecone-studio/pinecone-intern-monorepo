describe('FoodSecHead Layout', () => {
    beforeEach(() => {
      cy.visit('/admin/food'); 
    });
  
    it('renders header and form trigger', () => {
      cy.get('[data-testid="food-section-header"]').should('exist');
      cy.get('[data-testid="food-header-title"]').should('contain.text', 'Хоол');
      cy.get('[data-testid="add-food-button"]').should('exist');
    });
  
    it('renders toaster on page', () => {
      cy.get('[data-testid="food-toaster"]').should('exist');
    });
  });
  