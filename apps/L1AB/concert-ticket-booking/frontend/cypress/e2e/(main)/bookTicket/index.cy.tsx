describe('Book Ticket Page', () => {
  beforeEach(() => {
    cy.visit('/bookTicket'); // Navigate to the bookTicket page
  });

  it('should render the Container component', () => {
    // Check if the Container component is rendered with the correct class
    cy.get('div').should('have.class', 'container'); // Look for the 'container' class
  });

  it('should render the BookTicket component', () => {
    // Check if the BookTicket component exists inside the Container
    cy.get('[data-testid="Book-Ticket-Component"]').should('exist'); // Check that it exists on the page
  });
});
