// studentAddModal.spec.js

/// <reference types="cypress" />

describe('StudentAddModal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/student'); // Replace with your application URL
  });

  it('renders the StudentAddModal component', () => {
    cy.get('[data-testid="add-student-modal"]').should('exist');
  });

  it('can type into the search input', () => {
    const typedText = 'John Doe';
    cy.get('input[placeholder="Сурагчийн Нэр, Код ..."]').type(typedText);
    cy.get('input[placeholder="Сурагчийн Нэр, Код ..."]').should('have.value', typedText);
  });

  it('opens the dialog when the add student button is clicked', () => {
    cy.contains('Сурагч').click();
    cy.get('[role="dialog"]').should('be.visible');
  });
  it('fills out the form and submits it', () => {
    // Click the add student button to open the dialog
    cy.contains('Сурагч').click();

    // Fill out the form inputs
    // cy.get('input[id="email"]').type('12345'); // Example input ID, adjust as per your actual IDs
    cy.get('[data-testid="Student-code-input"]').type('23lp5157'); // Example class-based input selection, adjust as per your actual class names
    cy.get('[data-testid="FirstName-input"]').type('John');
    cy.get('[data-testid="LastName-input"]').type('Doe');
    cy.get('[data-testid="phone-number-input"]').type('88888888');
    cy.get('[data-testid="email-input"]').type('john.doe@example.com');

    // cy.get('input[placeholder="email@example.com"]').type('john.doe@example.com');

    // // Select a radio button option
    // cy.contains('Идэвхитэй').click();

    // // Submit the form by clicking the save button
    // cy.get('[data-testid="add-student-button"]').click();

    // Optionally, assert that a success message or confirmation appears
    // cy.contains('Saved successfully').should('exist');
  });
});
