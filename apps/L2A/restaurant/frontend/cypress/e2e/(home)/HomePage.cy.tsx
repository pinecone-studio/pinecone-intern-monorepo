describe('HomeBody Component', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should render home page and category buttons', () => {
      cy.get('[data-cy="home-page"]').should('exist');
      cy.get('[data-cy="home-page"] button').should('have.length.greaterThan', 0);
    });
  
    it('should display food items for the default category', () => {
      cy.get('[data-cy="food"]').should('have.length.greaterThan', 0);
    });
  
    it('should change food items when a different category is clicked', () => {
      cy.get('[data-cy="category-button"]').first().invoke('text').as('initialFood');
      cy.get('[data-cy="home-page"] button').eq(1).click();
      cy.get('@initialFood').then((initialFood) => {
        cy.get('[data-cy="food"]').first().invoke('text').should('not.eq', initialFood);
      });
    });
  
    it('should display the sticky order button', () => {
      cy.contains('Захиалах').should('be.visible');
    });
  });
  