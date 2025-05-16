describe('TicketFilterBar Component', () => {
  beforeEach(() => {
    // Visit the page where the TicketFilterBar component is rendered
    cy.visit('/admin/ticket');
  });

  it('renders the TicketFilterBar container', () => {
    cy.get('[data-testid="TicketFilterBarId"]').should('be.visible');
  });

  it('clears all filters when the "Цэвэрлэх" button is clicked', () => {
    // Check that there are filters displayed initially
    cy.get('[data-testid^="filter-badge-"]').should('have.length.greaterThan', 0);

    // Click the clear filters button
    cy.get('[data-testid="clear-filters-button"]').click();

    // Check that the filters have been cleared
    cy.get('[data-testid^="filter-badge-"]').should('have.length', 0);
  });

  it('selects a date and updates the button text', () => {
    // Click on the calendar button to open the date picker
    cy.get('[data-testid="calendar-button"]').should('be.visible');

    // Select a date (e.g., 2025-05-14)
    cy.get('[data-testid="hidden-date-input"]').type('2025-05-14');

    // Check that the button text is updated with the selected date
    cy.contains('May 14th, 2025').should('contain.text', 'May 14th, 2025');
  });
});
