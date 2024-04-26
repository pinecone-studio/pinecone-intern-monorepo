describe('LessonAdd component', () => {
  beforeEach(() => {
    cy.visit('/lesson');
  });
  it('1. Should display Lesson Add page', () => {
    cy.get('[data-cy="Lesson-Add-Page"]').should('exist').should('be.visible');
  });
  it('2. check create button be enable and inputs', () => {
    cy.get('#title-test').type('some text');
    cy.get('#file-test').selectFile('public/js.png', { force: true });
    cy.get('[data-testid="create-button"]').should('not.be.disabled');
    cy.get('[data-testid="create-button"]').click();
  });
  it('3. check back to topics page button click ', () => {
    cy.get('[data-testid="test-back-stack"]').should('exist');
    cy.get('[data-testid="test-back-stack"]').click();
  });
});
