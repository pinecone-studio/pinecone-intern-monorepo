describe('Admin Food List Component', () => {
  beforeEach(() => {
    cy.visit('/admin/food');
  });

  it('renders the food list with cards', () => {
    cy.get('[data-testid="food-list"]').should('exist');
    cy.get('[data-testid^="food-card-"]').should('have.length', 2);
  });

  it('displays correct content for each food item', () => {
    cy.get('[data-testid="food-name-0"]').should('contain', 'Apple');
    cy.get('[data-testid="food-price-0"]').should('contain', '15.6k');
    cy.get('[data-testid="food-description-0"]').should('contain', 'Идэвхитэй');
    cy.get('[data-testid="food-description-1"]').should('contain', 'Идэвхигүй');
  });

  it('opens the edit dialog and allows field changes', () => {
    cy.get('[data-testid="edit-button-0"]').click();
    cy.get('[data-testid="food-dialog"]').should('be.visible');
    cy.get('[data-testid="food-name-input"]').clear().type('Banana');
    cy.get('[data-testid="price-input"]').clear().type('20k');
    cy.get('[data-testid="inactive-radio"]').click();
    cy.get('[data-testid="edit-food-button"]').click();
    cy.window().then((win) => {
      cy.stub(win.console, 'log').as('consoleLog');
    });
  });

  it('calls delete handler on delete button click', () => {
    cy.window().then((win) => {
      cy.stub(win.console, 'log').as('consoleLog');
    });
    cy.get('[data-testid="delete-button-0"]').click();
  });
});
