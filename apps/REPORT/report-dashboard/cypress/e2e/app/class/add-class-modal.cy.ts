describe('AddClassModal', () => {
  beforeEach(() => {
    cy.visit('/class'); // Replace with the actual URL where the component is rendered
    cy.get('[data-testid="openModalButton"]').click(); // Assuming there's a trigger button to open the modal
  });

  it('renders the modal correctly', () => {
    cy.get('[data-testid="modal-content"]').should('be.visible');
    cy.get('[data-testid="modal-header"]').should('contain', 'Анги нэмэх');
  });

  it('validates form inputs', () => {
    cy.get('[data-testid="submit-button"]').click();
    cy.get('.text-red-500').should('have.length', 5); // Assuming all fields are required
  });

  it('allows input in all fields', () => {
    cy.get('[data-testid="class-name-input"]').type('Test Class');
    cy.get('[data-testid="teacher1-input"]').type('Teacher One');
    cy.get('[data-testid="teacher2-input"]').type('Teacher Two');
    cy.get('[data-testid="start-date-input"]').type('2024-07-01');
    cy.get('[data-testid="end-date-input"]').type('2024-12-31');
  });

  it('allows selection of class type', () => {
    cy.get('[data-testid="class-type-radio-group"]').within(() => {
      cy.get('[data-testid="coding-radio-button"]').should('exist');
      cy.get('[data-testid="design-radio-button"]').should('exist');
    });

    // Check initial state (Coding should be default)
    cy.get('[data-testid="coding-radio-container"]').should('have.class', 'bg-slate-100');
    cy.get('[data-testid="design-radio-container"]').should('have.class', 'bg-white');

    // Select Design
    cy.get('[data-testid="design-radio-button"]').click();
    cy.get('[data-testid="design-radio-container"]').should('have.class', 'bg-slate-100');
    cy.get('[data-testid="coding-radio-container"]').should('have.class', 'bg-white');

    // Select Coding
    cy.get('[data-testid="coding-radio-button"]').click();
    cy.get('[data-testid="coding-radio-container"]').should('have.class', 'bg-slate-100');
    cy.get('[data-testid="design-radio-container"]').should('have.class', 'bg-white');
  });

  // it('highlights selected class type', () => {
  //   cy.get('[data-testid="coding-radio-container"]').should('have.class', 'bg-slate-100');
  //   cy.get('[data-testid="design-radio-container"]').should('have.class', 'bg-white');
  //   cy.get('[data-testid="design-radio-button"]').click();
  //   cy.get('[data-testid="design-radio-container"]').should('have.class', 'bg-slate-100');
  //   cy.get('[data-testid="coding-radio-container"]').should('have.class', 'bg-white');
  // });

  // it('submits the form successfully and resets form', () => {
  //   cy.intercept('POST', '/your-graphql-endpoint', { statusCode: 200, body: { data: { createClass: { id: '1' } } } }).as('createClass');

  //   cy.get('[data-testid="class-name-input"]').type('Test Class');
  //   cy.get('[data-testid="teacher1-input"]').type('Teacher One');
  //   cy.get('[data-testid="teacher2-input"]').type('Teacher Two');
  //   cy.get('[data-testid="start-date-input"]').type('2024-07-01');
  //   cy.get('[data-testid="end-date-input"]').type('2024-12-31');
  //   cy.get('[data-testid="design-radio-button"]').click();
  //   cy.get('[data-testid="submit-button"]').click();

  //   cy.wait('@createClass');

  //   // Check if the modal is closed
  //   cy.get('[data-testid="modal-content"]').should('not.exist');

  //   // Reopen the modal to check if the form has been reset
  //   cy.get('[data-testid="modal-trigger"]').click();

  //   // Verify that all form fields are empty
  //   cy.get('[data-testid="class-name-input"]').should('have.value', '');
  //   cy.get('[data-testid="teacher1-input"]').should('have.value', '');
  //   cy.get('[data-testid="teacher2-input"]').should('have.value', '');
  //   cy.get('[data-testid="start-date-input"]').should('have.value', '');
  //   cy.get('[data-testid="end-date-input"]').should('have.value', '');

  //   // Verify that the class type has been reset to the default (Coding)
  //   cy.get('[data-testid="coding-radio-button"]').should('be.checked');
  //   cy.get('[data-testid="design-radio-button"]').should('not.be.checked');
  // });

  // it('displays error messages for invalid inputs', () => {
  //   cy.get('[data-testid="class-name-input"]').type('a').clear();
  //   cy.get('[data-testid="teacher1-input"]').type('a').clear();
  //   cy.get('[data-testid="teacher2-input"]').type('a').clear();
  //   cy.get('[data-testid="start-date-input"]').type('a').clear();
  //   cy.get('[data-testid="end-date-input"]').type('a').clear();

  //   cy.get('[data-testid="submit-button"]').click();

  //   cy.get('.text-red-500').should('have.length', 5);
  //   cy.contains('Class name is required');
  //   cy.contains('Teacher name is required').should('have.length', 2);
  //   cy.contains('Start date is required');
  //   cy.contains('End date is required');
  // });
});
