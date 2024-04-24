describe('createCoursePage', () => {
  beforeEach(() => cy.visit('/create-course'));

  it('1. Should display create course form', () => {
    cy.get('[data-testid="create-course-container"]').should('exist').should('be.visible');
  });
  it('2. check back to dashboard page button click ', () => {
    cy.get('[data-testid="test-back-stack"]').should('exist');
    cy.get('[data-testid="test-back-stack"]').click();
  });
  it('3. create button', () => {
    cy.get('[data-testid="create-button"]').should('exist').should('be.disabled');
  });
  it('4. check create button be enable and inputs', () => {
    cy.get('#title-test').type('some text');
    cy.get('#description-test').type('some more text');
    cy.get('#file-test').click();
    cy.get('#file-test').selectFile('public/js.png', { force: true });
    cy.get('[data-testid="create-button"]').should('not.be.disabled');
    cy.get('[data-testid="create-button"]').click();
  });
});
