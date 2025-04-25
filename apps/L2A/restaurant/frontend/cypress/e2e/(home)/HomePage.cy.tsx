describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should load the home page with categories and default food list', () => {
      cy.get('[data-cy="home-page"]').should('exist');
      cy.get('[data-cy="food"]').within(() => {
        cy.get('[data-cy="category-buttons"]').should('have.length.greaterThan', 0);
      });
      cy.get('[data-cy="Button"]').contains('Захиалах');
    });
  
    it('should switch categories and show new foods', () => {
      let initialFoodText = '';
      cy.get('[data-cy="foodsdiv"]')
        .first()
        .invoke('text')
        .then((text) => {
          initialFoodText = text.trim();
          cy.get('[data-cy="category-buttons"]').eq(1).click();
          cy.get('[data-cy="foodsdiv"]')
            .first()
            .invoke('text')
            .should((newText) => {
              expect(newText.trim()).not.to.eq(initialFoodText);
            });
        });
    });
  
    it('should highlight the selected category button', () => {
      cy.get('[data-cy="category-buttons"]').eq(2).click().should('have.class', 'bg-[#F4F4F5]');
    });
  });
  