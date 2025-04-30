describe('HomeMain Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render the homepage correctly', () => {
    cy.get('[data-cy="home-page"]').should('exist');
    cy.contains('Хоолны цэс');
  });

  it('should render the category buttons', () => {
    cy.get('[data-cy="category-buttons"]').should('exist');
    cy.get('[data-cy="category-buttons"]').should('have.length', 3);
  });

  it('should render foods div', () => {
    cy.get('[data-cy="foodsdiv"]').should('be.visible');
  });
  it('should render the food items', () => {
    cy.get('[data-cy="Foods"]').should('be.visible');
  });
  it('should change the food items when a category is selected', () => {
    cy.get('[data-cy="category-buttons"]').first().click();
    cy.get('[data-cy="Foods"]').should('have.length', 5);
    cy.get('[data-cy="category-buttons"]').eq(1).click();
    cy.get('[data-cy="Foods"]').should('have.length', 4);
    cy.get('[data-cy="category-buttons"]').eq(2).click();
    cy.get('[data-cy="Foods"]').should('have.length', 4);
  });
});
