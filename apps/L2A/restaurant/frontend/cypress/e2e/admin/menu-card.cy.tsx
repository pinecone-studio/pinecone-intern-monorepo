describe('FoodCard component', () => {
    beforeEach(() => {
      cy.visit('/admin/menu');
    });
  
    it('should render food item correctly', () => {
      cy.get('[data-cy="food-card"]').each(($card) => {
        cy.wrap($card).within(() => {
          cy.get('[data-cy="food-image"]').should('have.attr', 'alt');
          cy.get('[data-cy="food-price"]').contains(/k$/);
          cy.get('[data-cy="edit-button"]').should('exist');
          cy.get('[data-cy="delete-button"]').should('exist');
        });
      });
    });
  
    it('should display food name, price and status', () => {
      cy.get('[data-cy="food-card"]').each(($card) => {
        cy.wrap($card).within(() => {
          cy.get('[data-cy="food-name"]').should('exist');
          cy.get('[data-cy="food-price"]').contains(/\d+k/);
          cy.get('[data-cy="food-status"]').should('have.class', 'text-gray-500');
        });
      });
    });
  });
  