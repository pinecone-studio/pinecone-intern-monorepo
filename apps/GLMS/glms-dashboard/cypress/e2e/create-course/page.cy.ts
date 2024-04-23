describe('createCoursePage', () => {
  beforeEach(() => cy.visit('/create-course'));

  it('1. Should display create course form', () => {
    cy.get('[data-testid="create-course-container"]').should('exist').should('be.visible');
  });
  it('3. check back to dashboard page button click and have url', () => {
    cy.get('[data-testid="test-back-stack"]').should('exist');
    cy.get('[data-testid="test-back-stack"]').click();
  });
  it('3. check back to dashboard page button click and have url', () => {
    cy.get('[data-testid="create-button"]').should('exist').should('be.disabled');
  });
  it('5', () => {
    cy.get('#title-test').type('some text');
    cy.get('#description-test').type('some more text');
    cy.get('#file-test').click();
    cy.get('#file-test').selectFile('public/js.png', { force: true });
    cy.get('[data-testid="create-button"]').should('be.enabled');
    cy.get('[data-testid="create-button"]').click();
  });
});
