describe('ClassCardTab component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/'); // Replace with actual path
  });

  it('renders correctly', () => {
    cy.get('[data-testid="class-card-tab"]').should('exist');
  });

  it('renders default tab content correctly', () => {
    cy.contains('Бүгд').click();
    cy.get('[data-testid="class-card"]').should('have.length', 5); // Assuming 5 items in data array
  });

  it('filters and renders Coding tab content correctly', () => {
    cy.contains('Coding').click();
    cy.get('[data-testid="class-card"]').should('have.length', 2); // Number of Coding classes in data array
  });

  it('filters and renders Design tab content correctly', () => {
    cy.contains('Design').click();
    cy.get('[data-testid="class-card"]').should('have.length', 3); // Number of Design classes in data array
  });

  it('searches correctly by input field', () => {
    const searchText = '1class'; // Example search text
    cy.get('[data-testid="search-input"]').type(searchText);
    cy.get('[data-testid="class-card"]').should('have.length', 1); // Only one class should match the search text
  });

  it('adds a new class when clicking the "Add" button', () => {
    cy.get('[data-testid="add-class-button"]').click();
    // Add assertions or interact with the modal/popup for adding a new class
  });

  // Add more specific tests as needed based on your component's functionality
});
