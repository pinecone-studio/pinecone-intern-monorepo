describe('MainCard Component', () => {
  beforeEach(() => {
    cy.visit('/admin/menu'); 
  });

  it('renders MainCard with categories and foods', () => {
    cy.get('[data-cy="home-page"]').should('exist');
    cy.get('[data-cy="category-buttons"]').should('exist');
    cy.get('[data-cy="foodsdiv"]').children().should('exist');
  });

  it('shows foods when clicking a category', () => {
    cy.get('[data-cy="category-buttons"]').eq(1).click();
    cy.get('[data-cy="foodsdiv"]').children().should('have.length.greaterThan', 0);
  });
});
