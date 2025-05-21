describe('TicketFilterBar Component', () => {
  beforeEach(() => {
    cy.visit('/admin/ticket');
  });

  it('clears all filters when the "Цэвэрлэх" button is clicked', () => {
    cy.get('[data-testid^="filter-badge-"]').should('have.length.greaterThan', 0);
    cy.get('[data-testid="clear-filters-button"]').click();
    cy.get('[data-testid^="filter-badge-"]').should('have.length', 0);
  });
  it('selects a date and updates the button text', () => {
    cy.get('[data-testid="calendar-button"]').should('be.visible');
    cy.get('[data-testid="hidden-date-input"]').type('2025-05-14');
    cy.contains('May 14th, 2025').should('contain.text', 'May 14th, 2025');
  });
});
