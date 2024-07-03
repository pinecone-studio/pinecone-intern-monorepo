// cypress/integration/addClassModal.spec.ts

describe('AddClassModal', () => {
  beforeEach(() => {
    // Mock the GraphQL mutations and queries
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'CreateClass') {
        req.reply({ data: { createClass: { id: '1' } } });
      }
      if (req.body.operationName === 'GetClasses') {
        req.reply({ data: { classes: [] } });
      }
    }).as('graphqlOperation');

    // Visit the page containing the AddClassModal
    cy.visit('/class');

    cy.contains('Анги').click();

    cy.contains('Анги нэмэх').should('be.visible');

    cy.get('div[role="dialog"]').should('be.visible');
  });

  it('renders the modal correctly', () => {
    cy.get('[data-testid="modal-content"]').should('be.visible');
    cy.get('[data-testid="modal-header"]').should('contain', 'Анги нэмэх');
  });

  it('validates required fields', () => {
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="class-name-input"]').parent().should('contain', 'name is required');
    cy.get('[data-testid="teacher1-input"]').parent().should('contain', 'teacher1 is required');
    cy.get('[data-testid="teacher2-input"]').parent().should('contain', 'teacher2 is required');
    cy.get('[data-testid="start-date-input"]').parent().should('contain', 'startDate is required');
    cy.get('[data-testid="end-date-input"]').parent().should('contain', 'endDate is required');
  });

  it('allows input in all fields', () => {
    // Wait for all inputs to be visible before interacting
    cy.get('[data-testid="class-name-input"]').should('be.visible').type('Test Class');
    cy.get('[data-testid="teacher1-input"]').should('be.visible').type('Teacher One');
    cy.get('[data-testid="teacher2-input"]').should('be.visible').type('Teacher Two');
    cy.get('[data-testid="start-date-input"]').should('be.visible').type('2024-01-01');
    cy.get('[data-testid="end-date-input"]').should('be.visible').type('2024-12-31');

    // Verify the inputs
    cy.get('[data-testid="class-name-input"]').should('have.value', 'Test Class');
    cy.get('[data-testid="teacher1-input"]').should('have.value', 'Teacher One');
    cy.get('[data-testid="teacher2-input"]').should('have.value', 'Teacher Two');
    cy.get('[data-testid="start-date-input"]').should('have.value', '2024-01-01');
    cy.get('[data-testid="end-date-input"]').should('have.value', '2024-12-31');
  });

  it('selects class types correctly', () => {
    // Check initial state
    cy.get('[data-testid="coding-radio-button"]').should('have.attr', 'aria-checked', 'true');
    cy.get('[data-testid="design-radio-button"]').should('have.attr', 'aria-checked', 'false');

    // Click the design radio button
    cy.get('[data-testid="design-radio-button"]').click();

    // Check state after clicking
    cy.get('[data-testid="coding-radio-button"]').should('have.attr', 'aria-checked', 'false');
    cy.get('[data-testid="design-radio-button"]').should('have.attr', 'aria-checked', 'true');

    // Click the coding radio button again
    cy.get('[data-testid="coding-radio-button"]').click();

    // Check final state
    cy.get('[data-testid="coding-radio-button"]').should('have.attr', 'aria-checked', 'true');
    cy.get('[data-testid="design-radio-button"]').should('have.attr', 'aria-checked', 'false');
  });

  it('validates empty fields and submits the form with valid data', () => {
    // Try to submit the form without filling any fields
    cy.get('[data-testid="submit-button"]').click({ force: true });

    // Check for error messages
    cy.get('div[role="dialog"]').within(() => {
      cy.contains('name is required').should('be.visible');
      cy.contains('teacher1 is required').should('be.visible');
      cy.contains('teacher2 is required').should('be.visible');
      cy.contains('startDate is required').should('be.visible');
      cy.contains('endDate is required').should('be.visible');
    });

    cy.get('[data-testid="submit-button"]').click();

    cy.contains('name is required').should('be.visible');
  });

  it('resets form after successful submission', () => {
    cy.get('[data-testid="class-name-input"]').type('Test Class');
    cy.get('[data-testid="teacher1-input"]').type('Teacher One');
    cy.get('[data-testid="teacher2-input"]').type('Teacher Two');
    cy.get('[data-testid="start-date-input"]').type('2024-01-01');
    cy.get('[data-testid="end-date-input"]').type('2024-12-31');

    cy.get('[data-testid="submit-button"]').click();

    // Re-open the modal
    cy.get('[data-testid="open-modal-button"]').click();

    // Check if all fields are reset
    cy.get('[data-testid="class-name-input"]').should('have.value', '');
    cy.get('[data-testid="teacher1-input"]').should('have.value', '');
    cy.get('[data-testid="teacher2-input"]').should('have.value', '');
    cy.get('[data-testid="start-date-input"]').should('have.value', '');
    cy.get('[data-testid="end-date-input"]').should('have.value', '');
    cy.get('[data-testid="coding-radio-button"]').should('have.attr', 'aria-checked', 'true');
  });

  it('handles GraphQL errors', () => {
    // Intercept POST /graphql requests
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'CreateClass') {
        // Simulate a GraphQL error response for CreateClass operation
        req.reply({
          statusCode: 200,
          body: {
            errors: [{ message: 'Failed to create class' }],
          },
          delayMs: 500, // Optional delay to simulate server response time
        });
      }
    }).as('graphqlErrorOperation'); // Assigning an alias directly

    // Fill out the form
    cy.get('[data-testid="class-name-input"]').type('Test Class');
    cy.get('[data-testid="teacher1-input"]').type('Teacher One');
    cy.get('[data-testid="teacher2-input"]').type('Teacher Two');
    cy.get('[data-testid="start-date-input"]').type('2024-01-01');
    cy.get('[data-testid="end-date-input"]').type('2024-12-31');

    // Submit the form
    cy.get('[data-testid="submit-button"]').click();

    // Wait for the intercepted GraphQL error operation
    cy.wait('@graphqlErrorOperation');
  });
});
