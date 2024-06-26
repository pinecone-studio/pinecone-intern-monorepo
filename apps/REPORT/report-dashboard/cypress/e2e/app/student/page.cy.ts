describe('StudentAddModal', () => {
  beforeEach(() => {
    cy.visit('/student');
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
    cy.contains('Сурагч').click();
    cy.get('[data-testid="Student-code-input"]').type('23lp5157');
    cy.get('[data-testid="firstName-input"]').type('John');
    cy.get('[data-testid="lastName-input"]').type('Doe');
    cy.get('[data-testid="phone-number-input"]').type('88888888');
    cy.get('input[placeholder="email@example.com"]').type('john.doe@example.com');
    cy.get('[data-test="passive-radio-group-item"').click();
    cy.get('[data-testid="active-radio-group-item"').click();
    cy.get('[data-testid="add-student-button"]').contains('Хадгалах').click();
  });
  it('it should test loading state', () => {
    cy.get('[data-testid="Loading"]').contains('Loading...');
  });
});
