describe('Admin Dashboard Tests', () => {
  beforeEach(() => {
    // Navigate to Admin Dashboard page
    cy.visit('/admin');
  });

  it('should render the Container component', () => {
    // Check if the Container component is rendered and has the correct class
    cy.get('div').should('have.class', 'container'); // Check for the 'container' class
  });

  it('should render the Admin Dashboard component', () => {
    // Check if the Admin Dashboard component is rendered
    cy.get('[data-testid="Admin-Dash"]').should('exist'); // Ensure the Admin Dashboard exists in the DOM
  });

  it('should render the necessary admin dashboard elements', () => {
    // Check if the title of the dashboard exists and contains correct text
    cy.get('[data-testid="Admin-Dash"]')
      .find('h3') // Check for the heading
      .should('contain.text', 'Тасалбар'); // Ensure the title matches the expected text

    // Check if the description of the dashboard exists and contains the correct text
    cy.get('[data-testid="Admin-Dash"]')
      .find('p') // Check for the description
      .should('contain.text', 'Идэвхитэй зарагдаж буй тасалбарууд'); // Ensure the description matches the expected text
  });
});
