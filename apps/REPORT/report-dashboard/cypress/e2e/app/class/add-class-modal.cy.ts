// cypress/integration/addClassModal.spec.ts

describe('AddClassModal', () => {
  beforeEach(() => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'CreateClass') {
        req.reply({ data: { createClass: { id: '1' } } });
      }
      if (req.body.operationName === 'GetClasses') {
        req.reply({ data: { classes: [] } });
      }
    }).as('graphqlOperation');

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

    cy.get('[data-testid="class-name-input"]').parent().should('contain', 'This field is required');
    cy.get('[data-testid="teacher1-input"]').parent().should('contain', 'This field is required');
    cy.get('[data-testid="teacher2-input"]').parent().should('contain', 'This field is required');
    cy.get('[data-testid="start-date-input"]').parent().should('contain', 'This field is required');
    cy.get('[data-testid="end-date-input"]').parent().should('contain', 'This field is required');
  });

  it('allows input in all fields', () => {
    cy.get('[data-testid="class-name-input"]').should('be.visible').type('Test Cllass');
    cy.get('[data-testid="teacher1-input"]').should('be.visible').type('Teacher One');
    cy.get('[data-testid="teacher2-input"]').should('be.visible').type('Teacher Two');
    cy.get('[data-testid="start-date-input"]').should('be.visible').type('2024-01-01');
    cy.get('[data-testid="end-date-input"]').should('be.visible').type('2024-12-31');

    cy.get('[data-testid="class-name-input"]').should('have.value', 'Test Cllass');
    cy.get('[data-testid="teacher1-input"]').should('have.value', 'Teacher One');
    cy.get('[data-testid="teacher2-input"]').should('have.value', 'Teacher Two');
    cy.get('[data-testid="start-date-input"]').should('have.value', '2024-01-01');
    cy.get('[data-testid="end-date-input"]').should('have.value', '2024-12-31');
  });

  it('selects class types correctly', () => {
    cy.get('[data-testid="coding-radio-button"]').should('have.attr', 'aria-checked', 'true');
    cy.get('[data-testid="design-radio-button"]').should('have.attr', 'aria-checked', 'false');

    cy.get('[data-testid="design-radio-button"]').click();

    cy.get('[data-testid="coding-radio-button"]').should('have.attr', 'aria-checked', 'false');
    cy.get('[data-testid="design-radio-button"]').should('have.attr', 'aria-checked', 'true');

    cy.get('[data-testid="coding-radio-button"]').click();

    cy.get('[data-testid="coding-radio-button"]').should('have.attr', 'aria-checked', 'true');
    cy.get('[data-testid="design-radio-button"]').should('have.attr', 'aria-checked', 'false');
  });

  it('validates empty fields and submits the form with valid data', () => {
    cy.get('[data-testid="submit-button"]').click({ force: true });

    cy.get('div[role="dialog"]').within(() => {
      cy.contains('This field is required').should('be.visible');
      cy.contains('This field is required').should('be.visible');
      cy.contains('This field is required').should('be.visible');
      cy.contains('This field is required').should('be.visible');
      cy.contains('This field is required').should('be.visible');
    });

    cy.get('[data-testid="submit-button"]').click();

    cy.contains('This field is required').should('be.visible');
  });

  it('resets form after successful submission', () => {
    cy.get('[data-testid="class-name-input"]').type('Test Class');
    cy.get('[data-testid="teacher1-input"]').type('Teacher One');
    cy.get('[data-testid="teacher2-input"]').type('Teacher Two');
    cy.get('[data-testid="start-date-input"]').type('2024-01-01');
    cy.get('[data-testid="end-date-input"]').type('2024-12-31');

    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="openModalButton"]').click();

    cy.get('[data-testid="class-name-input"]').should('have.value', '');
    cy.get('[data-testid="teacher1-input"]').should('have.value', '');
    cy.get('[data-testid="teacher2-input"]').should('have.value', '');
    cy.get('[data-testid="start-date-input"]').should('have.value', '');
    cy.get('[data-testid="end-date-input"]').should('have.value', '');
    cy.get('[data-testid="coding-radio-button"]').should('have.attr', 'aria-checked', 'true');
  });

  it('handles GraphQL errors', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'CreateClass') {
        req.reply({
          statusCode: 200,
          body: {
            errors: [{ message: 'Failed to create class' }],
          },
          delayMs: 500,
        });
      }
    }).as('graphqlErrorOperation');

    cy.get('[data-testid="class-name-input"]').type('Test Class');
    cy.get('[data-testid="teacher1-input"]').type('Teacher One');
    cy.get('[data-testid="teacher2-input"]').type('Teacher Two');
    cy.get('[data-testid="start-date-input"]').type('2024-01-01');
    cy.get('[data-testid="end-date-input"]').type('2024-12-31');

    cy.get('[data-testid="submit-button"]').click();

    cy.wait('@graphqlErrorOperation');
  });
});
