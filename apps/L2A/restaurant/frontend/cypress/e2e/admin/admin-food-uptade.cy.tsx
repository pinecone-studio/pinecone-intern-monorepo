describe('AdminFoodList (dummy uptade dialog)', () => {
  beforeEach(() => {
    cy.visit('/admin/food');
  });

  it('renders the food list container', () => {
    cy.get('[data-testid="food-list"]').should('exist');
  });

  it('renders food cards', () => {
    cy.get('[data-testid^="food-card-"]').should('have.length', 2);
  });

  it('renders edit and delete buttons for each card', () => {
    cy.get('[data-testid^="edit-button-"]').should('have.length', 2);
    cy.get('[data-testid^="delete-button-"]').should('have.length', 2);
  });

  it('renders food image for each card', () => {
    cy.get('[data-testid^="food-image-"]').should('have.length', 2);
  });

  it('opens dialog when clicking edit button', () => {
    cy.get('[data-testid="edit-button-0"]').click();
    cy.get('[data-testid="dialog-title"]').should('be.visible').and('contain', 'Хоол засах');
    cy.get('[data-testid="food-name-input"]').should('exist');
    cy.get('[data-testid="price-input"]').should('exist');
  });
});
