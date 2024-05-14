describe(' course Id page should visit [id]', () => {
  beforeEach(() => {
    cy.visit(`/6633305c94d4584898bb049a`);
  });
  it('should display courseid page', () => {
    cy.get('[data-cy="idCourse"]').should('exist');
    cy.contains('Loading...').should('not.exist');
    cy.contains('Error:').should('not.exist');
  });
  describe('handleCreateLesson', () => {
    it('1. Should create lesson', () => {
      cy.get('[data-testid="add-lesson-button-test-id"]').should('exist').click();
      cy.url().should('include', '/create-lesson');
    });
  });
  it('2. Should navigate to update-course when id is present', () => {
    cy.get('[data-testid="edit-course-button"]').should('exist').click();
    cy.url().should('include', '/update-course');
  });

  it('3. Should navigate back to dashboard ', () => {
    cy.get('[data-cy="prev-button-test-id"]').should('exist').click();
    cy.url().should('include', '/dashboard');
  });

  it('4. Should set lessonID in localStorage and navigate to /section', () => {
    cy.get('[data-cy="lesson-test-id"]').eq(0).should('exist').click();
    cy.window().its('localStorage').invoke('getItem', 'lessonID');
    cy.url().should('include', '/section');
  });

  it('5. Should delete lesson', () => {
    cy.get('[data-testid="delete-button-test-id"]').eq(1).should('exist');
  });
});
