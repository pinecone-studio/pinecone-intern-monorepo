describe('CourseAdd component', () => {
  beforeEach(() => {
    cy.visit('/course-add');
  });
  it('Should display Course Add page', () => {
    cy.get('[data-cy="Course-Add-Page"]').should('exist').should('be.visible');
  });
});
