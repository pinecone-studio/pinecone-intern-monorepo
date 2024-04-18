describe('createCoursePage', () => {
  before(() => cy.visit('/createCoursePage'));

  it('1. Should display create course form', () => {
    cy.get('[data-testid="create-course-container"]').should('exist').should('be.visible');
  });
  it('2. check create button and input', () => {
    cy.get('[data-cy="create-button"]').should('exist').click();
    cy.get('[data-cy="create-button"]').should('be.disabled');
    cy.get('[data-testid="title"]').type('html');
    cy.get('[data-testid="title"]').should('have.value', 'html');
  });
  it('3. check create button and input', () => {
    cy.get('[data-cy="create-button"]').should('exist').click();
    cy.get('[data-cy="create-button"]').should('be.disabled');
    cy.get('[data-testid="description"]').type('html');
    cy.get('[data-testid="description"]').should('have.value', 'html');
  });
  it('4. check create button and input', () => {
    cy.get('[data-cy="create-button"]').should('exist').click();
    cy.get('[data-cy="create-button"]').should('be.disabled');
    cy.get('[data-testid="file"]').selectFile('file.json', { action: 'drag-drop' });
    cy.document().selectFile('file.json', { action: 'drag-drop' });
  });
});
