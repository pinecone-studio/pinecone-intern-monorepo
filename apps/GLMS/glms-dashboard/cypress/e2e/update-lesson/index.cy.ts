describe('Handle update-lesson page', () => {
  beforeEach(() => cy.visit('/update-lesson'));

  it('1. Update lesson page', () => {
    cy.get('[data-testid="update-lesson-container"]').should('exist');
  });

  it('2. check back to course page button click ', () => {
    cy.get('[data-cy="handle-back-page"]').should('exist');
    cy.get('[data-cy="handle-back-page"]').click();
    cy.url().should('include', '/${courseID}');
  });

  it('3.Should display update lesson container', () => {
    cy.get('[data-testid="update-lesson-form"]').should('exist');
    cy.get('[data-cy="update-lesson-title"]').should('exist').type('Java');
    cy.get('#file-test').selectFile('public/js.png', { force: true });
    cy.get('[data-cy="update-lesson-handle-btn"]').eq(1).click();
    cy.url().should('include', '/${courseID}');
  });
  it('4. updates form fields with data from API', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetLessonInId') {
        req.reply((res) => {
          res.send({
            data: {
              getLessonInId: {
                id: 'lesson-id',
                title: 'Mock Title',
                thumbnail: 'Mock Thumbnail',
              },
            },
          });
        });
      }
    }).as('GetLessonInId');
  });
});
