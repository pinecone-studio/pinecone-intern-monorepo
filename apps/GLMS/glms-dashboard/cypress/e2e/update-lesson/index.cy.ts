describe('Handle update-lesson page', () => {
  beforeEach(() => {
    cy.visit('/update-lesson');
    cy.window().then((win) => {
      win.localStorage.setItem('lessonID', 'lesson-id-123');
      win.localStorage.setItem('courseID', 'course-id-456');
    });
    cy.reload();
  });

  it('should set lessonID and courseID from localStorage on mount', () => {
    cy.window().then((win) => {
      expect(win.localStorage.getItem('lessonID')).to.eq('lesson-id-123');
      expect(win.localStorage.getItem('courseID')).to.eq('course-id-456');
    });
  });

  it('should display the update lesson container', () => {
    cy.get('[data-testid="update-lesson-container"]').should('exist');
  });

  it('should navigate back to the course page when back button is clicked', () => {
    cy.get('[data-testid="handle-back-page"]').should('exist').click();
    cy.url().should('include', '/course-id-456'); 
  });

  it('should display and interact with the update lesson form', () => {
    cy.get('[data-testid="update-lesson-form"]').should('exist');
    cy.get('[data-cy="update-lesson-title"]').should('exist').clear().type('Java');
    cy.get('#file-test').selectFile('public/js.png', { force: true });
    cy.get('[data-cy="update-lesson-handle-btn"]').click();
  });

  it('should update form fields with data from API', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetLessonInId') {
        req.reply({
          data: {
            getLessonInId: {
              id: 'lesson-id-123',
              title: 'Mock Title',
              thumbnail: 'Mock Thumbnail',
            },
          },
        });
      }
    }).as('GetLessonInId');
  });
});
