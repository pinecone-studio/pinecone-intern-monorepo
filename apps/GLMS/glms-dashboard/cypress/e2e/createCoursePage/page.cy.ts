describe('createCoursePage', () => {
  before(() => cy.visit('/createCoursePage'));

  it('1. Should display create course form', () => {
    cy.get('[data-testid="create-course-container"]').should('exist').should('be.visible');
  });
  //
});
