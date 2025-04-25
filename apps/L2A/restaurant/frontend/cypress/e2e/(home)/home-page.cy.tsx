describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/HomePage');
  });

  it('Should render home page', () => {
    cy.get('[data-cy="home-page"]').should('exist');
  });

  it('Should display food items', () => {
    cy.get('[data-testid^="food-card-"]').should('have.length.at.least', 1);
  });

  it('Should display image, name, and price for each food item', () => {
    cy.get('[data-testid^="food-card-"]').each(($el) => {
      cy.wrap($el).find('img').should('exist');
      cy.wrap($el).find('div').eq(1).should('not.be.empty');
      cy.wrap($el).find('div').eq(2).should('contain.text', 'k'); 
    });
  });
});
