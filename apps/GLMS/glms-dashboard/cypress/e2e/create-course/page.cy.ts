describe('createCoursePage', () => {
  beforeEach(() => cy.visit('/create-course'));

  it('1. Should display create course form', () => {
    cy.get('[data-testid="create-course-container"]').should('exist').should('be.visible');
  });

  it('3. check back to dashboard page button click', () => {
    cy.get('[data-testid="test-back-stack"]').should('exist');
    cy.get('[data-testid="test-back-stack"]').click();
  });

  it('4. check create button', () => {
    cy.get('[data-testid="create-button"]').should('exist');
    cy.get('[data-testid="create-button"]').click();
  });
});
