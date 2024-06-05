describe('createLessonPage', () => {
  beforeEach(() => cy.visit('/dashboard'));

  it('1. Should display fashboard page', () => {
    cy.get('[data-testid="create-lesson-container"]').should('exist').should('be.visible');
  });
});
